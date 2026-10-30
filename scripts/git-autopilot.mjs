#!/usr/bin/env node
/**
 * Git autopilot: one branch per project, so designers never type a git command.
 * Contract: `harness/references/git-autopilot.md`. Used by the agent (CLI below)
 * and by the app's "New project" button (`scripts/harness-settings-plugin.ts`).
 *
 *   node scripts/git-autopilot.mjs start <slug> [--scaffold]
 *   node scripts/git-autopilot.mjs resume <slug>
 *   node scripts/git-autopilot.mjs save <slug> "<one-line summary>" [src/… paths]
 *   node scripts/git-autopilot.mjs undo [--yes]
 *   node scripts/git-autopilot.mjs share
 *
 * Every commit it makes carries a `Git-Autopilot: <action>` trailer; undo only
 * touches those. It never pushes unless asked to share, never to main, never with force.
 */
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const BASE = 'main'
export const TRAILER = 'Git-Autopilot'
const REVERTS = 'Git-Autopilot-Reverts'
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
/** Never committed, even if a .gitignore rule goes missing. */
export const NEVER = [
  'designer-context.local',
  'designer-profile.local.md',
  'harness.config.local.json',
  'context/org-pack.local',
  'harness/logs',
  'logs',
  'tmp',
]

export function isNever(file) {
  const segments = file.split('/')
  return (
    NEVER.some((p) => file === p || file.startsWith(`${p}/`)) ||
    segments.some((s) => s.endsWith('.local') || s.includes('.local.'))
  )
}

const literal = (files) => files.map((file) => `:(literal)${file}`)

export class AutopilotError extends Error {}

function git(root, args) {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
  } catch (error) {
    const detail = String(error.stderr || error.message)
      .trim()
      .split('\n')
      .pop()
    throw new AutopilotError(`git ${args[0]} failed: ${detail}`, { cause: error })
  }
}

export function isEnabled(root) {
  try {
    const config = JSON.parse(readFileSync(path.join(root, 'harness.config.local.json'), 'utf8'))
    if (config?.behaviour?.gitAutopilot === false) return false
  } catch {
    // no config file: default on
  }
  try {
    return git(root, ['rev-parse', '--is-inside-work-tree']) === 'true'
  } catch {
    return false
  }
}

export function slugify(name) {
  return String(name)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '')
}

function checkSlug(slug) {
  if (!SLUG.test(slug ?? '') || slug.startsWith('_'))
    throw new AutopilotError(`"${slug}" isn't a project name I can use.`)
  return `project/${slug}`
}

export const currentBranch = (root) => git(root, ['branch', '--show-current'])

function branchExists(root, branch) {
  try {
    git(root, ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`])
    return true
  } catch {
    return false
  }
}

function changedFiles(root, paths = ['.']) {
  return git(root, ['status', '--porcelain', '-z', '--no-renames', '--untracked-files=all', '--', ...paths])
    .split('\0')
    .filter(Boolean)
    .map((entry) => entry.slice(3))
    .filter((file) => file && !isNever(file))
}

const isDirty = (root, paths) => changedFiles(root, paths).length > 0

function configured(root, key) {
  try {
    return git(root, ['config', key]) !== ''
  } catch {
    return false
  }
}

/** A designer's clone may have no Git identity; commit as their profile name, without writing Git config. */
function identity(root) {
  if (configured(root, 'user.name') && configured(root, 'user.email')) return []
  let name = 'Designer'
  try {
    const profile = readFileSync(path.join(root, 'designer-profile.local.md'), 'utf8')
    name = profile.match(/^- Name:[ \t]*([^<\n]+?)[ \t]*$/m)?.[1] || name
  } catch {
    // no profile yet
  }
  return ['-c', `user.name=${name}`, '-c', 'user.email=designer@design-harness.invalid']
}

/** Commits only `paths` (minus NEVER), whatever else is staged. Returns the sha, or null if nothing changed. */
function commit(root, paths, subject, action, extraTrailers = []) {
  paths = paths.filter((p) => existsSync(path.join(root, p)) || git(root, ['ls-files', '--', p]) !== '')
  if (!paths.length) return null
  git(root, ['add', '-A', '--', ...paths])
  const staged = git(root, ['diff', '--cached', '--name-only', '-z', '--', ...paths])
    .split('\0')
    .filter(Boolean)
  const blocked = staged.filter(isNever)
  if (blocked.length) git(root, ['reset', '-q', '--', ...literal(blocked)])
  const files = staged.filter((file) => !isNever(file))
  if (!files.length) return null
  const trailers = [`${TRAILER}: ${action}`, ...extraTrailers].join('\n')
  git(root, [...identity(root), 'commit', '-q', '-m', subject, '-m', trailers, '--', ...literal(files)])
  return git(root, ['rev-parse', '--short', 'HEAD'])
}

/** Uncommitted work belongs to the branch it was made on: commit it there before switching. */
function checkpoint(root, reason) {
  if (!isDirty(root)) return null
  const branch = currentBranch(root)
  if (!branch) throw new AutopilotError("You're not on a branch, so I can't save your changes before switching.")
  return commit(root, ['.'], `Save work in progress before ${reason}`, 'checkpoint')
}

function scaffold(root, slug, title) {
  const dir = path.join(root, 'projects', slug)
  if (existsSync(dir)) return false
  cpSync(path.join(root, 'projects', '_template'), dir, { recursive: true })
  const brief = path.join(dir, 'brief.md')
  if (existsSync(brief)) {
    writeFileSync(brief, readFileSync(brief, 'utf8').replace('<task-slug>', title || slug))
  }
  return true
}

/** New project: commit leftovers where they are, then branch `project/<slug>` from main. */
export function start(root, slug, { scaffold: makeFolder = false, title } = {}) {
  const branch = checkSlug(slug)
  if (!isEnabled(root)) {
    if (makeFolder) scaffold(root, slug, title)
    return { branch: null, checkpoint: null, message: null }
  }
  let saved = null
  if (currentBranch(root) !== branch) {
    saved = checkpoint(root, `starting ${slug}`)
    if (branchExists(root, branch)) git(root, ['switch', '-q', branch])
    else {
      if (!branchExists(root, BASE)) throw new AutopilotError(`There's no ${BASE} branch to start from.`)
      git(root, ['switch', '-q', '-c', branch, BASE])
    }
  }
  if (makeFolder) scaffold(root, slug, title)
  return { branch, checkpoint: saved, message: `Working on ${branch}.` }
}

/** Existing project: switch to its branch if it has one. Silent otherwise. */
export function resume(root, slug) {
  const branch = checkSlug(slug)
  if (!isEnabled(root) || !branchExists(root, branch) || currentBranch(root) === branch) {
    return { branch: null, checkpoint: null, message: null }
  }
  const saved = checkpoint(root, `switching to ${slug}`)
  git(root, ['switch', '-q', branch])
  return { branch, checkpoint: saved, message: `Working on ${branch}.` }
}

function checkExtraPath(slug, file) {
  const clean = path.posix.normalize(file.replaceAll('\\', '/'))
  const blocked = isNever(clean)
  const allowed = clean.startsWith('src/') || clean.startsWith(`projects/${slug}/`)
  if (clean.startsWith('..') || path.posix.isAbsolute(clean) || blocked || !allowed) {
    throw new AutopilotError(`I only save projects/${slug}/ and src/ files, not ${file}.`)
  }
  return clean
}

/** Wrap up: commit this project's folder plus the src files changed this session. */
export function save(root, slug, summary, extraPaths = []) {
  const branch = checkSlug(slug)
  if (!isEnabled(root)) return { sha: null, message: null }
  const subject = String(summary ?? '').trim()
  if (!subject || /[\r\n]/.test(subject)) throw new AutopilotError('The save needs a one-line summary.')
  const current = currentBranch(root)
  if (current !== branch) {
    if (branchExists(root, branch)) {
      throw new AutopilotError(`You're on ${current || 'no branch'}, not ${branch}. Say "continue ${slug}" first.`)
    }
    git(root, ['switch', '-q', '-c', branch])
  }
  const paths = [`projects/${slug}`, ...extraPaths.map((file) => checkExtraPath(slug, file))]
  const sha = commit(root, paths, subject, 'save')
  return { sha, message: sha ? `Saved on ${branch}: ${subject}` : 'Nothing new to save.' }
}

function lastUndoable(root) {
  const branch = currentBranch(root)
  if (!branch.startsWith('project/')) throw new AutopilotError('Undo works on a project branch only.')
  const format = `%H%x1f%s%x1f%(trailers:key=${TRAILER},valueonly,separator=)%x1f%(trailers:key=${REVERTS},valueonly,separator=)%x1e`
  const log = git(root, ['log', `--format=${format}`, `${BASE}..HEAD`])
  const commits = log
    .split('\x1e')
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => {
      const [sha, subject, action, reverts] = row.split('\x1f')
      return { sha, subject, action: action.trim(), reverts: reverts.trim() }
    })
  const undone = new Set(commits.map((c) => c.reverts).filter(Boolean))
  return commits.find((c) => (c.action === 'save' || c.action === 'checkpoint') && !undone.has(c.sha)) ?? null
}

/** Shows what the last autopilot commit on this branch changed; with `confirm`, reverts it. */
export function undo(root, { confirm = false } = {}) {
  const target = lastUndoable(root)
  if (!target) return { target: null, files: [], message: 'Nothing to undo on this branch.' }
  const files = git(root, ['show', '--name-status', '--format=', target.sha]).split('\n').filter(Boolean)
  if (!confirm) return { target, files, message: `This will undo "${target.subject}"` }
  const touched = files.map((line) => line.split('\t').pop())
  if (isDirty(root, touched)) {
    throw new AutopilotError('Some of those files have changes since the last save. Wrap up or discard them first.')
  }
  try {
    git(root, [...identity(root), 'revert', '--no-commit', target.sha])
  } catch (error) {
    try {
      git(root, ['revert', '--abort'])
    } catch {
      // nothing to abort
    }
    throw error
  }
  git(root, [
    ...identity(root),
    'commit',
    '-q',
    '-m',
    `Undo: ${target.subject}`,
    '-m',
    `${TRAILER}: undo\n${REVERTS}: ${target.sha}`,
  ])
  return { target, files, message: `Undid "${target.subject}"` }
}

export function branchLink(remoteUrl, branch) {
  const url = remoteUrl
    .trim()
    .replace(/^git@([^:]+):/, 'https://$1/')
    .replace(/^ssh:\/\/git@([^/]+)\//, 'https://$1/')
    .replace(/\/\/[^@/]+@/, '//')
    .replace(/\.git$/, '')
  if (!/^https?:\/\//.test(url)) return null
  return url.includes('gitlab') ? `${url}/-/tree/${branch}` : `${url}/tree/${branch}`
}

/** Pushes the current project branch. Only on "share this"; never main, never force. */
export function share(root) {
  if (!isEnabled(root)) return { link: null, message: null }
  const branch = currentBranch(root)
  if (!branch.startsWith('project/'))
    throw new AutopilotError(`Share works from a project branch, not ${branch || 'no branch'}.`)
  let remote
  try {
    remote = git(root, ['remote', 'get-url', 'origin'])
  } catch {
    throw new AutopilotError('This copy has no remote to share to yet.')
  }
  git(root, ['push', '-u', 'origin', `${branch}:${branch}`])
  const link = branchLink(remote, branch)
  return { link, message: link ? `Shared: ${link}` : `Shared ${branch} to ${remote}.` }
}

function cli(argv) {
  const root = git(process.cwd(), ['rev-parse', '--show-toplevel'])
  const [command, ...rest] = argv
  const flags = new Set(rest.filter((a) => a.startsWith('--')))
  const args = rest.filter((a) => !a.startsWith('--'))
  if (!isEnabled(root)) return 'Git autopilot is off.'
  switch (command) {
    case 'start':
      return start(root, args[0], { scaffold: flags.has('--scaffold') }).message
    case 'resume':
      return resume(root, args[0]).message ?? ''
    case 'save':
      return save(root, args[0], args[1], args.slice(2)).message
    case 'undo': {
      const result = undo(root, { confirm: flags.has('--yes') })
      const list = result.files.map((line) => `  ${line}`).join('\n')
      return list ? `${result.message}\n${list}` : result.message
    }
    case 'share':
      return share(root).message
    default:
      throw new AutopilotError('Use start, resume, save, undo or share.')
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const out = cli(process.argv.slice(2))
    if (out) console.log(out)
  } catch (error) {
    console.error(error instanceof AutopilotError ? error.message : String(error))
    process.exit(1)
  }
}
