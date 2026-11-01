#!/usr/bin/env node
/**
 * Git autopilot: one branch per project, so designers never type a git command.
 * Contract: `harness/references/git-autopilot.md`. Used by the agent (CLI below)
 * and by the app's "New project" button (`scripts/harness-settings-plugin.ts`).
 *
 *   node scripts/git-autopilot.mjs start <slug> [--scaffold] [--local]
 *   node scripts/git-autopilot.mjs resume <slug>
 *   node scripts/git-autopilot.mjs save <slug> "<one-line summary>" [--keep-harness | --suggest-harness]
 *   node scripts/git-autopilot.mjs undo [--yes]
 *   node scripts/git-autopilot.mjs share
 *   node scripts/git-autopilot.mjs catch-up
 *   node scripts/git-autopilot.mjs session      (Claude Code session hook; runs with autopilot off too)
 *   node scripts/git-autopilot.mjs doctor       (runs with autopilot off too)
 *   node scripts/git-autopilot.mjs update       ("update my harness"; runs with autopilot off too)
 *   node scripts/git-autopilot.mjs worktree <slug>  (runs with autopilot off too)
 *
 * Every commit it makes carries a `Git-Autopilot: <action>` trailer; undo only
 * touches those. It pushes only on "share this" or "suggest to the harness",
 * never to main, never with force.
 */
import { execFileSync, spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readlinkSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const BASE = 'main'
export const TRAILER = 'Git-Autopilot'
const REVERTS = 'Git-Autopilot-Reverts'
/** Where "update my harness" pulls from when the copy has no `upstream` remote yet. */
export const UPSTREAM_URL = 'https://github.com/marcopslopes/design-harness.git'
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DAY_SECONDS = 24 * 60 * 60
const BEHIND_WARNING = 50
/** Never committed, even if a .gitignore rule goes missing. */
export const NEVER = [
  'designer-context.local',
  'designer-profile.local.md',
  'harness.config.local.json',
  'context/org-pack.local',
  'projects.local',
  'harness/logs',
  'logs',
  'tmp',
]
/** Said once when a company-sourced project is created outside git. */
export const LOCAL_NOTICE = 'Saved locally, since this repo is public.'
/** Linked into a new worktree so the second folder knows the same designer. */
const LOCAL_LINKS = [
  'designer-profile.local.md',
  'designer-context.local',
  'harness.config.local.json',
  'context/org-pack.local',
  'node_modules',
]
/** Team data outside projects/: saved with the project, never asked about as a harness edit. */
const TEAM_DATA = ['src/design-harness/gallery-designers/', 'public/design-harness/avatars/']
const isTeamData = (file) => file.startsWith('projects/') || TEAM_DATA.some((dir) => file.startsWith(dir))
/** The harness ships these inside projects/; "update my harness" may change them. Everything else there is the team's. */
const UPSTREAM_PROJECT_FILES = ['projects/_template/', 'projects/README.md']

export function isNever(file) {
  const segments = file.split('/')
  return (
    NEVER.some((p) => file === p || file.startsWith(`${p}/`)) ||
    segments.some((s) => s.endsWith('.local') || s.includes('.local.'))
  )
}

const literal = (files) => files.map((file) => `:(literal)${file}`)
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`
const indent = (lines) => lines.map((line) => `  ${line}`).join('\n')

export class AutopilotError extends Error {}

function run(root, args, options = {}) {
  return spawnSync('git', args, { cwd: root, encoding: 'utf8', ...options })
}

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

const succeeds = (root, args) => run(root, args).status === 0

function gitValue(root, args) {
  const result = run(root, args)
  return result.status === 0 ? result.stdout.trim() : ''
}

function readLocal(root, file) {
  try {
    return readFileSync(path.join(root, file), 'utf8')
  } catch {
    return ''
  }
}

/** On unless `publicRepo` is exactly false. A missing file or key stays on, so this public repo is the default. */
export function isPublicRepo(root) {
  try {
    const config = JSON.parse(readLocal(root, 'harness.config.local.json') || '{}')
    return config?.publicRepo !== false
  } catch {
    return true
  }
}

/** Off unless `behaviour.gitAutopilot` is true or the profile says `- Git autopilot: on`. Wrap-up save and share still run when it's off. */
export function isEnabled(root) {
  if (gitValue(root, ['rev-parse', '--is-inside-work-tree']) !== 'true') return false
  try {
    const config = JSON.parse(readLocal(root, 'harness.config.local.json') || '{}')
    if (config?.behaviour?.gitAutopilot === true) return true
  } catch {
    // unreadable config: default off
  }
  return /^- Git autopilot:[ \t]*on[ \t]*$/im.test(readLocal(root, 'designer-profile.local.md'))
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

/** The profile's `- Name:`, else `git config user.name` (cloud sessions have no profile). */
export function designerName(root) {
  const fromProfile = readLocal(root, 'designer-profile.local.md').match(/^- Name:[ \t]*([^<\n]+?)[ \t]*$/m)?.[1]
  return fromProfile || gitValue(root, ['config', 'user.name'])
}

export function designerFirstName(root) {
  const first = slugify(designerName(root).split(/\s+/)[0] ?? '')
  if (!first)
    throw new AutopilotError("I don't know your name yet, so I can't name the branch. Add it to your profile.")
  return first
}

function checkSlug(slug) {
  if (!SLUG.test(slug ?? '') || slug.startsWith('_')) {
    throw new AutopilotError(`"${slug}" isn't a project name I can use.`)
  }
  return slug
}

/** `<first name>/<slug>`, so two designers on the same project never share a branch. */
export const branchFor = (root, slug) => `${designerFirstName(root)}/${checkSlug(slug)}`

export const currentBranch = (root) => git(root, ['branch', '--show-current'])

const branchExists = (root, branch) => succeeds(root, ['rev-parse', '--verify', '--quiet', `refs/heads/${branch}`])
const revExists = (root, rev) => succeeds(root, ['rev-parse', '--verify', '--quiet', `${rev}^{commit}`])

function changedFiles(root, paths = ['.']) {
  const status = run(root, ['status', '--porcelain', '-z', '--no-renames', '--untracked-files=all', '--', ...paths])
  if (status.status !== 0) throw new AutopilotError(`git status failed: ${status.stderr.trim()}`)
  return status.stdout
    .split('\0')
    .filter(Boolean)
    .map((entry) => entry.slice(3))
    .filter((file) => file && !isNever(file))
}

const isDirty = (root, paths) => changedFiles(root, paths).length > 0

/** A designer's clone may have no Git identity; commit as their profile name, without writing Git config. */
function identity(root) {
  if (gitValue(root, ['config', 'user.name']) && gitValue(root, ['config', 'user.email'])) return []
  return ['-c', `user.name=${designerName(root) || 'Designer'}`, '-c', 'user.email=designer@design-harness.invalid']
}

/** Drops staged files autopilot must never commit, even if they were staged by hand. */
function unstageNever(root) {
  const staged = git(root, ['diff', '--cached', '--name-only', '-z']).split('\0').filter(isNever)
  if (staged.length) git(root, ['reset', '-q', '--', ...literal(staged)])
}

/** Commits only `paths` (minus NEVER), whatever else is staged. Returns the sha, or null if nothing changed. */
function commit(root, paths, subject, action, extraTrailers = []) {
  unstageNever(root)
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

const normName = (value) =>
  String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

function samePerson(me, owner) {
  const [a, b] = [normName(me), normName(owner)]
  if (!a || !b) return false
  if (a === b) return true
  const [mine, theirs] = [a.split(' '), b.split(' ')]
  if (mine[0] !== theirs[0]) return false
  return theirs.length === 1 || mine.at(-1) === theirs.at(-1)
}

/** The brief's `Designer:`, or '' when it's unassigned or a placeholder. */
function projectOwner(root, slug) {
  const value =
    readLocal(root, `projects/${slug}/brief.md`)
      .match(/\*\*Designer:\*\*[ \t]*(.+)/)?.[1]
      ?.trim() ?? ''
  return /[<>]|unknown|unassigned|\bnone\b|\btbd\b/i.test(value) ? '' : value
}

/** Stops before committing anything inside another designer's project. */
function assertNoForeign(root) {
  const me = designerName(root)
  if (!me) return
  const foreign = changedFiles(root, ['projects']).filter((file) => {
    const slug = file.match(/^projects\/([^/_][^/]*)\//)?.[1]
    const owner = slug ? projectOwner(root, slug) : ''
    return owner && !samePerson(me, owner)
  })
  if (foreign.length) {
    throw new AutopilotError(
      `Stopped. Another designer's project has changes:\n${indent(foreign)}\nAsk before continuing.`,
    )
  }
}

/** The project this branch belongs to, from `<first>/<slug>`, or ''. */
function branchProject(root) {
  const match = currentBranch(root).match(/^[a-z0-9-]+\/([a-z0-9-]+)$/)
  return match && !match[1].startsWith('harness-') ? match[1] : ''
}

/** Before a switch, saves the current project's folder on its own branch. Never commits on main, never other files. */
function checkpoint(root, reason) {
  assertNoForeign(root)
  const slug = branchProject(root)
  if (!slug || !isDirty(root, [`projects/${slug}`])) return null
  return commit(root, [`projects/${slug}`], `Save work in progress before ${reason}`, 'checkpoint')
}

function scaffold(root, slug, title, local = false) {
  const folder = local && isPublicRepo(root) ? 'projects.local' : 'projects'
  const dir = path.join(root, folder, slug)
  if (existsSync(dir)) return false
  mkdirSync(path.join(root, folder), { recursive: true })
  cpSync(path.join(root, 'projects', '_template'), dir, { recursive: true })
  const brief = path.join(dir, 'brief.md')
  if (existsSync(brief)) {
    writeFileSync(brief, readFileSync(brief, 'utf8').replaceAll('<task-slug>', title || slug))
  }
  return true
}

function switchTo(root, branch) {
  if (branchExists(root, branch)) return git(root, ['switch', '-q', branch])
  if (!branchExists(root, BASE)) throw new AutopilotError(`There's no ${BASE} branch to start from.`)
  git(root, ['switch', '-q', '-c', branch, BASE])
}

/** New project: save the current project where it is, then branch `<first>/<slug>` from main. */
export function start(root, slug, { scaffold: makeFolder = false, title, local = false } = {}) {
  checkSlug(slug)
  const noticeFor = (made) => (local && isPublicRepo(root) && made ? LOCAL_NOTICE : null)
  if (!isEnabled(root)) {
    const made = makeFolder ? scaffold(root, slug, title, local) : false
    return { branch: null, checkpoint: null, message: noticeFor(made) }
  }
  const branch = branchFor(root, slug)
  let saved = null
  if (currentBranch(root) !== branch) {
    saved = checkpoint(root, `starting ${slug}`)
    switchTo(root, branch)
  }
  const made = makeFolder ? scaffold(root, slug, title, local) : false
  return {
    branch,
    checkpoint: saved,
    message: [`Working on ${branch}.`, noticeFor(made)].filter(Boolean).join('\n'),
  }
}

/** Existing project: switch to its branch if it has one. Silent otherwise. */
export function resume(root, slug) {
  checkSlug(slug)
  if (!isEnabled(root)) return { branch: null, checkpoint: null, message: null }
  const branch = branchFor(root, slug)
  if (!branchExists(root, branch)) return { branch: null, checkpoint: null, message: null }
  if (currentBranch(root) === branch) return { branch, checkpoint: null, message: null }
  const saved = checkpoint(root, `switching to ${slug}`)
  git(root, ['switch', '-q', branch])
  return { branch, checkpoint: saved, message: `Working on ${branch}.` }
}

const HARNESS_QUESTION = 'Keep them local, or suggest them to the harness?'

function keepLocalFile(root) {
  return path.resolve(root, git(root, ['rev-parse', '--git-path', 'design-harness-keep-local']))
}

function keptLocal(root) {
  const file = keepLocalFile(root)
  return new Set(existsSync(file) ? readFileSync(file, 'utf8').split('\n').filter(Boolean) : [])
}

/** Changes outside `projects/` on a project branch: the harness itself, not the designer's project. */
function harnessChanges(root) {
  const kept = keptLocal(root)
  return changedFiles(root, ['.']).filter((file) => !isTeamData(file) && !kept.has(file))
}

function snapshotTree(root, files) {
  return files.map((file) => {
    const abs = path.join(root, file)
    if (!existsSync(abs)) return { file, deleted: true }
    if (lstatSync(abs).isSymbolicLink()) return { file, link: readlinkSync(abs) }
    return { file, body: readFileSync(abs) }
  })
}

function applySnapshot(root, snap) {
  for (const item of snap) {
    const abs = path.join(root, item.file)
    if (item.deleted) {
      if (existsSync(abs)) unlinkSync(abs)
      continue
    }
    mkdirSync(path.dirname(abs), { recursive: true })
    if (existsSync(abs)) unlinkSync(abs)
    if (item.link) symlinkSync(item.link, abs)
    else writeFileSync(abs, item.body)
  }
}

function restoreTree(root, files) {
  const tracked = files.filter((file) => succeeds(root, ['ls-files', '--error-unmatch', '--', file]))
  for (const file of files) {
    if (!tracked.includes(file) && existsSync(path.join(root, file))) unlinkSync(path.join(root, file))
  }
  if (tracked.length) git(root, ['restore', '--source=HEAD', '--staged', '--worktree', '--', ...literal(tracked)])
}

/** `https://github.com/owner/repo` from any GitHub remote URL, or null. */
export function webUrl(remoteUrl) {
  const url = String(remoteUrl)
    .trim()
    .replace(/^git@([^:]+):/, 'https://$1/')
    .replace(/^ssh:\/\/git@([^/]+)\//, 'https://$1/')
    .replace(/\/\/[^@/]+@/, '//')
    .replace(/\.git$/, '')
    .replace(/\/$/, '')
  return /^https?:\/\//.test(url) ? url : null
}

const githubRepo = (remoteUrl) => webUrl(remoteUrl)?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)$/)?.[1] ?? null

/** A link that opens the review page for `branch`: GitHub's PR form, or the branch page elsewhere. */
export function branchLink(remoteUrl, branch, { base = BASE, into } = {}) {
  const url = webUrl(remoteUrl)
  if (!url) return null
  const repo = githubRepo(remoteUrl)
  if (!repo) return `${url}/tree/${branch}`
  const target = into ? githubRepo(into) : null
  const head = target && target !== repo ? `${repo.split('/')[0]}:${branch}` : branch
  return `https://github.com/${target ?? repo}/compare/${base}...${head}?expand=1`
}

/** Opens a PR with the GitHub CLI when it's installed and signed in; returns its URL, or null. */
function openPullRequest(root, { repo, head, title, body }) {
  if (!repo) return null
  const args = ['pr', 'create', '--repo', repo, '--base', BASE, '--head', head, '--title', title, '--body', body]
  const result = spawnSync('gh', args, { cwd: root, encoding: 'utf8', timeout: 30000 })
  return result.status === 0 ? (result.stdout.match(/https:\/\/\S+/)?.[0] ?? null) : null
}

/** Moves harness edits to `<first>/harness-<slug>` from main, pushes it and opens a PR to the upstream harness. */
function suggestToHarness(root, slug, files, { openPr = openPullRequest } = {}) {
  const projectBranch = currentBranch(root)
  const snap = snapshotTree(root, files)
  restoreTree(root, files)
  const first = designerFirstName(root)
  let branch = `${first}/harness-${slug}`
  for (let n = 2; branchExists(root, branch); n += 1) branch = `${first}/harness-${slug}-${n}`
  try {
    git(root, ['switch', '-q', '-c', branch, BASE])
  } catch (error) {
    applySnapshot(root, snap)
    throw error
  }
  const subject = `Suggest harness change from ${slug}`
  let message = `Moved the harness change to ${branch}.`
  try {
    applySnapshot(root, snap)
    commit(root, files, subject, 'suggest')
    const origin = gitValue(root, ['remote', 'get-url', 'origin'])
    if (!origin) {
      message += ' This copy has no remote, so nothing was pushed.'
    } else {
      git(root, ['push', '-u', 'origin', `${branch}:${branch}`])
      const upstream = remoteUrl(root, upstreamRemote(root)) || UPSTREAM_URL
      const [from, into] = [githubRepo(origin), githubRepo(upstream)]
      const head = from === into ? branch : `${from?.split('/')[0]}:${branch}`
      const body = `Suggested from a project branch (${projectBranch}).\n\nFiles:\n${files.map((f) => `- ${f}`).join('\n')}`
      const pr = from && into ? openPr(root, { repo: into, head, title: subject, body }) : null
      const link = pr ?? branchLink(origin, branch, { into: upstream })
      message += pr ? ` Pull request: ${pr}` : link ? ` Open the pull request: ${link}` : ` Pushed ${branch}.`
    }
  } finally {
    git(root, ['switch', '-q', projectBranch])
  }
  return { branch, message }
}

/**
 * Wrap up: commit this project's folder. Anything changed outside `projects/` is a harness
 * edit: stop and ask, then `harness: 'keep'` leaves it local or `'suggest'` sends it upstream.
 */
export function save(root, slug, summary, { harness, openPr } = {}) {
  checkSlug(slug)
  const subject = String(summary ?? '').trim()
  if (!subject || /[\r\n]/.test(subject)) throw new AutopilotError('The save needs a one-line summary.')
  assertNoForeign(root)
  const branch = branchFor(root, slug)
  const current = currentBranch(root)
  if (current !== branch) {
    if (branchExists(root, branch)) {
      throw new AutopilotError(`You're on ${current || 'no branch'}, not ${branch}. Say "continue ${slug}" first.`)
    }
    checkpoint(root, `saving ${slug}`)
    switchTo(root, branch)
  }
  const edits = harnessChanges(root)
  if (edits.length && harness !== 'keep' && harness !== 'suggest') {
    throw new AutopilotError(
      `These harness files changed on your project branch:\n${indent(edits)}\n${HARNESS_QUESTION}`,
    )
  }
  const cards = changedFiles(root, TEAM_DATA)
  const sha = commit(root, [`projects/${slug}`, ...cards], subject, 'save')
  const lines = [sha ? `Saved on ${branch}: ${subject}` : 'Nothing new to save.']
  if (edits.length && harness === 'suggest') lines.push(suggestToHarness(root, slug, edits, { openPr }).message)
  if (edits.length && harness === 'keep') {
    writeFileSync(keepLocalFile(root), [...new Set([...keptLocal(root), ...edits])].join('\n') + '\n')
    lines.push(`Kept ${plural(edits.length, 'harness file')} local; I won't ask about them again.`)
  }
  return { sha, message: lines.join('\n') }
}

function lastUndoable(root) {
  const branch = currentBranch(root)
  if (!branch || branch === BASE) throw new AutopilotError('Undo works on a project branch only.')
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
  if (!isEnabled(root)) return { target: null, files: [], message: 'Git autopilot is off.' }
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
    run(root, ['revert', '--abort'])
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

/** Pushes the current project branch. Only on "share this"; never main, never force. */
export function share(root) {
  const branch = currentBranch(root)
  if (!branch || branch === BASE) {
    throw new AutopilotError(`Share works from a project branch, not ${branch || 'no branch'}.`)
  }
  const remote = gitValue(root, ['remote', 'get-url', 'origin'])
  if (!remote) throw new AutopilotError('This copy has no remote to share to yet.')
  git(root, ['push', '-u', 'origin', `${branch}:${branch}`])
  const link = branchLink(remote, branch)
  return { link, message: link ? `Shared: ${link}` : `Shared ${branch} to ${remote}.` }
}

/** Fetches one branch with a short timeout and no password prompt. Tests pass their own. */
export function fetchBranch(root, remote, branch = BASE, timeout = 15000) {
  if (!remote || !gitValue(root, ['remote', 'get-url', remote])) return { ok: false, detail: `no ${remote} remote` }
  const result = run(root, ['fetch', '-q', remote, branch], {
    timeout,
    env: {
      ...process.env,
      GIT_TERMINAL_PROMPT: '0',
      GIT_SSH_COMMAND: process.env.GIT_SSH_COMMAND || 'ssh -o ConnectTimeout=10 -o BatchMode=yes',
    },
  })
  if (result.status === 0) return { ok: true, detail: '' }
  const detail = `${result.stderr || result.error?.message || 'the remote did not answer'}`.trim().split('\n').pop()
  return { ok: false, detail }
}

const count = (root, range) => Number(gitValue(root, ['rev-list', '--count', range])) || 0

/** Days since the oldest commit `ref` has that HEAD lacks. */
function behindDays(root, ref) {
  const oldest = gitValue(root, ['rev-list', '--reverse', `HEAD..${ref}`]).split('\n')[0]
  if (!oldest) return null
  const at = Number(gitValue(root, ['log', '-1', '--format=%ct', oldest]))
  return Number.isFinite(at) ? Math.floor((Date.now() / 1000 - at) / DAY_SECONDS) : null
}

const hasRemote = (root, name) => Boolean(gitValue(root, ['remote', 'get-url', name]))

const mainRef = (root) => (revExists(root, `origin/${BASE}`) ? `origin/${BASE}` : BASE)

/**
 * Merges main into a project branch that has been behind for more than a day.
 * A conflict stops the merge and lists the files; nothing is resolved.
 */
export function catchUp(root) {
  const none = { merged: false, conflicts: [], message: null }
  if (!hasRemote(root, 'origin')) return none
  const branch = currentBranch(root)
  if (!isEnabled(root) || !branch || branch === BASE) return none
  const ref = mainRef(root)
  if (!revExists(root, ref)) return none
  const days = behindDays(root, ref)
  if (days === null || days < 1) return none
  const behind = count(root, `HEAD..${ref}`)
  if (isDirty(root, ['.'])) {
    return {
      ...none,
      message: `${branch} is ${plural(behind, 'commit')} behind ${ref}. Uncommitted changes are in the way, so it wasn't merged.`,
    }
  }
  const merged = run(root, [...identity(root), 'merge', '-q', '--no-edit', ref])
  if (merged.status === 0)
    return { ...none, merged: true, message: `Merged ${ref} into ${branch} (${plural(behind, 'commit')}).` }
  const conflicts = gitValue(root, ['diff', '--name-only', '--diff-filter=U']).split('\n').filter(Boolean)
  run(root, ['merge', '--abort'])
  const list = conflicts.length ? conflicts : [`${merged.stderr || merged.stdout}`.trim().split('\n').pop()]
  return {
    ...none,
    conflicts,
    message: `Stopped. Merging ${ref} into ${branch} conflicts:\n${indent(list)}\nNothing was merged. Ask before resolving.`,
  }
}

/**
 * Claude Code session start. One warning line when on main or 50+ commits
 * behind origin/main. Empty when all is well. Catch-up runs only on request.
 */
export function sessionLine(root, { fetchMain = () => fetchBranch(root, 'origin', BASE, 8000) } = {}) {
  if (gitValue(root, ['rev-parse', '--is-inside-work-tree']) !== 'true') return ''
  if (!hasRemote(root, 'origin')) return ''
  const fetched = fetchMain()
  const branch = currentBranch(root)
  const behind =
    fetched.ok && revExists(root, `origin/${BASE}`) ? count(root, `${branch || 'HEAD'}..origin/${BASE}`) : 0
  const lines = []
  if (!branch || branch === BASE) {
    lines.push(
      behind >= BEHIND_WARNING
        ? `On main, ${behind} commits behind origin/main. Project work belongs on your own branch.`
        : 'On main. Project work belongs on your own branch.',
    )
  } else if (behind >= BEHIND_WARNING) {
    lines.push(`This branch is ${behind} commits behind origin/main.`)
  }
  return lines.join('\n')
}

const remoteUrl = (root, name) => (name ? gitValue(root, ['remote', 'get-url', name]) : '')

/** The remote that points at the harness: `upstream`, else any remote with the harness URL, else ''. */
function upstreamRemote(root) {
  if (remoteUrl(root, 'upstream')) return 'upstream'
  const target = githubRepo(UPSTREAM_URL)
  const names = gitValue(root, ['remote']).split('\n').filter(Boolean)
  return names.find((name) => githubRepo(remoteUrl(root, name)) === target) ?? ''
}

function projectFileFromUpstream(file) {
  return !file.startsWith('projects/') || UPSTREAM_PROJECT_FILES.some((keep) => file === keep || file.startsWith(keep))
}

function installIfNeeded(root, before) {
  const changed = gitValue(root, ['diff', '--name-only', before, 'HEAD', '--', 'package.json', 'package-lock.json'])
  if (!changed) return ''
  const result = spawnSync('npm', ['install', '--no-audit', '--no-fund'], { cwd: root, encoding: 'utf8' })
  return result.status === 0 ? ' Ran npm install.' : ' Dependencies changed; run npm install.'
}

/**
 * "Update my harness": merge the harness's main into this branch. The team's
 * `projects/` and every `*.local` file stay as they are; a real conflict stops
 * the merge and lists the files. Only when gitAutopilot is on.
 */
export function updateHarness(root, { fetch = fetchBranch, install = installIfNeeded } = {}) {
  if (!isEnabled(root)) return { message: 'Git autopilot is off.' }
  if (isDirty(root, ['.'])) throw new AutopilotError('Uncommitted changes are in the way. Wrap up first, then update.')
  let remote = upstreamRemote(root)
  let added = ''
  if (!remote) {
    git(root, ['remote', 'add', 'upstream', UPSTREAM_URL])
    remote = 'upstream'
    added = `Added the harness as "upstream" (${UPSTREAM_URL}). `
  }
  const fetched = fetch(root, remote, BASE)
  if (!fetched.ok) throw new AutopilotError(`${added}Couldn't reach the harness: ${fetched.detail}`)
  const ref = `${remote}/${BASE}`
  const branch = currentBranch(root) || 'HEAD'
  const incoming = count(root, `HEAD..${ref}`)
  if (!incoming) return { merged: false, conflicts: [], message: `${added}${branch} already has the latest harness.` }
  const before = git(root, ['rev-parse', 'HEAD'])
  const merged = run(root, [...identity(root), 'merge', '-q', '--no-ff', '--no-commit', ref])
  if (merged.status !== 0 && !existsSync(path.resolve(root, git(root, ['rev-parse', '--git-path', 'MERGE_HEAD'])))) {
    const detail = `${merged.stderr || merged.stdout}`.trim().split('\n').pop()
    throw new AutopilotError(`${added}Couldn't merge the harness: ${detail}`)
  }
  const base = gitValue(root, ['merge-base', 'HEAD', 'MERGE_HEAD'])
  const touched = base ? gitValue(root, ['diff', '--name-only', base, 'MERGE_HEAD', '--', 'projects']) : ''
  const conflicted = gitValue(root, ['diff', '--name-only', '--diff-filter=U'])
  const team = [...new Set([...touched.split('\n'), ...conflicted.split('\n')])].filter(
    (file) => file && !projectFileFromUpstream(file),
  )
  for (const file of team) {
    if (succeeds(root, ['cat-file', '-e', `HEAD:${file}`])) git(root, ['checkout', 'HEAD', '--', ...literal([file])])
    else git(root, ['rm', '-q', '-f', '--ignore-unmatch', '--', ...literal([file])])
  }
  const real = gitValue(root, ['diff', '--name-only', '--diff-filter=U']).split('\n').filter(Boolean)
  if (real.length) {
    run(root, ['merge', '--abort'])
    return {
      merged: false,
      conflicts: real,
      message: `${added}Stopped. The harness update conflicts with changes on ${branch}:\n${indent(real)}\nNothing was merged. Ask before resolving.`,
    }
  }
  git(root, [...identity(root), 'commit', '-q', '-m', `Update harness from ${ref}`, '-m', `${TRAILER}: update`])
  const kept = team.length
    ? ` Left out ${plural(team.length, 'change')} it had for projects/; yours stay as they were.`
    : ''
  return {
    merged: true,
    conflicts: [],
    message: `${added}Updated ${branch} with ${plural(incoming, 'harness commit')}.${kept}${install(root, before)}`,
  }
}

function mainWorktree(root) {
  const line = git(root, ['worktree', 'list', '--porcelain'])
    .split('\n')
    .find((row) => row.startsWith('worktree '))
  if (!line) throw new AutopilotError('Could not find the main working copy.')
  return line.slice('worktree '.length)
}

function linkLocal(fromRoot, destRoot, name) {
  const source = path.join(fromRoot, name)
  const dest = path.join(destRoot, name)
  if (!existsSync(source) || existsSync(dest)) return false
  mkdirSync(path.dirname(dest), { recursive: true })
  symlinkSync(path.relative(path.dirname(dest), source), dest)
  return true
}

/**
 * "Work on another project in parallel": a second folder on `<first>/<slug>`, with
 * this designer's profile, context and settings linked in. Only when gitAutopilot is on.
 */
export function addWorktree(root, slug) {
  if (!isEnabled(root)) return { dest: null, branch: null, linked: [], message: 'Git autopilot is off.' }
  const branch = branchFor(root, slug)
  if (currentBranch(root) === branch) throw new AutopilotError(`${slug} is already open in this folder.`)
  const main = mainWorktree(root)
  const dest = path.resolve(path.dirname(main), `${path.basename(main)}-${slug}`)
  if (existsSync(dest)) throw new AutopilotError(`${dest} already exists. Open that folder instead.`)
  if (branchExists(root, branch)) git(root, ['worktree', 'add', '-q', dest, branch])
  else git(root, ['worktree', 'add', '-q', '-b', branch, dest, BASE])
  const linked = LOCAL_LINKS.filter((name) => linkLocal(main, dest, name))
  return {
    dest,
    branch,
    linked,
    message: `Second working copy: ${dest}\nOpen that folder in its own window. Branch ${branch}.`,
  }
}

function likelyBranch(root, file) {
  const here = currentBranch(root)
  const slug = file.match(/^projects\/([^/_][^/]*)\//)?.[1]
  if (!slug) return here === BASE ? 'a harness change (main)' : `a harness change, not ${here}`
  const branches = gitValue(root, ['for-each-ref', '--format=%(refname:short)', 'refs/heads'])
    .split('\n')
    .filter((name) => name.endsWith(`/${slug}`))
  if (!branches.length) return `project ${slug}, no branch yet`
  return branches.includes(here) ? here : `${branches.join(', ')} (not this branch)`
}

/** Dirty files and where they belong, branches behind main, whether origin and the harness answer. */
export function doctor(root, { fetch = fetchBranch } = {}) {
  const here = currentBranch(root) || '(no branch)'
  const dirty = changedFiles(root, ['.'])
  const originRemote = hasRemote(root, 'origin')
  const origin = originRemote ? fetch(root, 'origin', BASE) : null
  const upstream = upstreamRemote(root)
  const harness = upstream ? fetch(root, upstream, BASE) : null
  const ref = mainRef(root)
  const behind = gitValue(root, ['for-each-ref', '--format=%(refname:short)', 'refs/heads'])
    .split('\n')
    .filter((name) => name && name !== BASE)
    .map((name) => [name, count(root, `${name}..${ref}`)])
    .filter(([, n]) => n > 0)
    .map(([name, n]) => `${name}  ${plural(n, 'commit')} behind ${ref}`)
  const harnessLine = !upstream
    ? 'Harness: no upstream remote yet ("update my harness" adds it).'
    : harness.ok
      ? `Harness (${upstream}): reachable, ${plural(count(root, `HEAD..${upstream}/${BASE}`), 'new commit')}.`
      : `Harness (${upstream}): not reachable (${harness.detail}).`
  return [
    `On ${here}. Git autopilot is ${isEnabled(root) ? 'on' : 'off'}.`,
    'Uncommitted files:',
    indent(dirty.length ? dirty.map((file) => `${file} — ${likelyBranch(root, file)}`) : ['none']),
    ...(origin ? [origin.ok ? 'origin: reachable.' : `origin: not reachable (${origin.detail}).`] : []),
    `Branches behind ${ref}:`,
    indent(behind.length ? behind : ['none']),
    harnessLine,
  ].join('\n')
}

function cli(argv) {
  const root = git(process.cwd(), ['rev-parse', '--show-toplevel'])
  const [command, ...rest] = argv
  const flags = new Set(rest.filter((a) => a.startsWith('--')))
  const args = rest.filter((a) => !a.startsWith('--'))
  if (command === 'session') return sessionLine(root)
  if (command === 'doctor') return doctor(root)
  if (!isEnabled(root) && command !== 'save' && command !== 'share') return 'Git autopilot is off.'
  if (command === 'update') return updateHarness(root).message
  if (command === 'worktree') return addWorktree(root, args[0]).message
  switch (command) {
    case 'start':
      return start(root, args[0], { scaffold: flags.has('--scaffold'), local: flags.has('--local') }).message
    case 'resume':
      return resume(root, args[0]).message ?? ''
    case 'save': {
      if (flags.has('--keep-harness') && flags.has('--suggest-harness')) {
        throw new AutopilotError('Pick one: keep the harness change local, or suggest it.')
      }
      const harness = flags.has('--keep-harness') ? 'keep' : flags.has('--suggest-harness') ? 'suggest' : undefined
      return save(root, args[0], args[1], { harness }).message
    }
    case 'undo': {
      const result = undo(root, { confirm: flags.has('--yes') })
      const list = indent(result.files)
      return result.files.length ? `${result.message}\n${list}` : result.message
    }
    case 'share':
      return share(root).message
    case 'catch-up':
      return catchUp(root).message ?? ''
    default:
      throw new AutopilotError('Use start, resume, save, undo, share, catch-up, session, doctor, update or worktree.')
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
