#!/usr/bin/env node
/**
 * Fails when the docs state a skill count or local port that doesn't match
 * the repo, or when any tracked Markdown file links a file a fresh clone
 * doesn't have. Runs in `npm run build`.
 *
 *   node scripts/check-docs-facts.mjs
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const read = (f) => readFileSync(path.join(repo, f), 'utf8')
const git = (...args) => execFileSync('git', ['-C', repo, ...args], { stdio: ['ignore', 'pipe', 'ignore'] }).toString()

const skills = readdirSync(path.join(repo, 'harness/skills')).filter((name) =>
  existsSync(path.join(repo, 'harness/skills', name, 'SKILL.md')),
)
const counted = skills.filter((name) => {
  const text = read(`harness/skills/${name}/SKILL.md`)
  const fm = text.match(/^---\n([\s\S]*?)\n---/)
  return !/do not route here/i.test(fm?.[1] || '')
})
const skillPages = new Set(readdirSync(path.join(repo, 'documentation/skills')).map((f) => f.replace(/\.md$/, '')))
const port = read('vite.config.ts').match(/port:\s*(\d+)/)?.[1]

const walk = (dir) =>
  readdirSync(path.join(repo, dir)).flatMap((f) => {
    const rel = path.join(dir, f)
    return statSync(path.join(repo, rel)).isDirectory() ? walk(rel) : rel.endsWith('.md') ? [rel] : []
  })
const files = ['README.md', 'INSTALL.md', 'PITCH.md', 'CONTRIBUTING.md', ...walk('documentation')]

// Counts below 20 are prose ("chains 3 skills"), not roster claims.
const countClaim = /(?<![\d.])(\d{2,3})\+?(?:\*\*)?\s+(?:specialized\s+|autonomous\s+)?skills\b/gi
// Only the 30xx range is the app; other ports in docs are unrelated servers.
const localhost = /localhost:(30\d\d)\b/g

const problems = []
for (const file of files) {
  read(file)
    .split('\n')
    .forEach((line, i) => {
      for (const [, n] of line.matchAll(countClaim)) {
        if (Number(n) >= 20 && Number(n) !== counted.length) {
          problems.push(`${file}:${i + 1} says ${n} skills; ${counted.length} route (${skills.length} on disk, pointers omitted)`)
        }
      }
      for (const [, p] of line.matchAll(localhost)) {
        if (port && p !== port) problems.push(`${file}:${i + 1} says localhost:${p}; vite.config.ts serves ${port}`)
      }
    })
}

// Every relative link in a tracked Markdown file must resolve on a fresh clone.
// Gitignored targets the harness creates on first use (logs, `.local` files)
// are fine; the gitignored root `docs/` is a private archive and never is.
const allFiles = (dir) =>
  readdirSync(path.join(repo, dir)).flatMap((f) => {
    const rel = dir ? `${dir}/${f}` : f
    if (['.git', 'node_modules', 'dist'].includes(f)) return []
    return statSync(path.join(repo, rel)).isDirectory() ? allFiles(rel) : [rel]
  })
// A ZIP download has no .git; its files are exactly what a clone would track.
const listTracked = () => {
  try {
    return git('ls-files', '-z').split('\0').filter(Boolean)
  } catch {
    return allFiles('')
  }
}
const tracked = new Set(listTracked())
const trackedDirs = new Set()
for (const f of tracked) {
  for (let d = path.posix.dirname(f); d !== '.'; d = path.posix.dirname(d)) trackedDirs.add(d)
}
const missing = []
for (const file of tracked) {
  // `scripts/skills-package/` holds templates whose links resolve in the generated package, not here.
  if (!/\.(md|mdc)$/.test(file) || file.startsWith('scripts/skills-package/') || !existsSync(path.join(repo, file)))
    continue
  let fenced = false
  read(file)
    .split('\n')
    .forEach((line, i) => {
      if (/^\s*(```|~~~)/.test(line)) fenced = !fenced
      if (fenced) return
      for (const [, href] of line.replace(/`[^`]*`/g, '').matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
        const link = href.split(/[?#]/)[0]
        if (!link || /^[a-z]+:/i.test(link) || link.startsWith('/') || /[<[…]/.test(link)) continue
        const target = path.posix
          .normalize(path.posix.join(path.posix.dirname(file), decodeURI(link)))
          .replace(/\/$/, '')
        if (tracked.has(target) || trackedDirs.has(target)) continue
        if (target === 'docs' || target.startsWith('docs/')) {
          problems.push(`${file}:${i + 1} links ${href} — root docs/ is a gitignored local archive`)
        } else {
          missing.push({ file, line: i + 1, href, target })
        }
      }
    })
}
const checkIgnore = (paths) => {
  try {
    return execFileSync('git', ['-C', repo, 'check-ignore', '--stdin'], {
      input: paths.join('\n'),
      stdio: ['pipe', 'pipe', 'ignore'],
    }).toString()
  } catch (error) {
    // Exit 1 means none of the paths are ignored.
    if (error.status === 1) return ''
    // Not a git checkout (ZIP download): no way to tell, so don't fail the build.
    if (error.status === 128) return paths.join('\n')
    throw error
  }
}
const ignored = new Set(missing.length ? checkIgnore(missing.map((m) => m.target)).split('\n') : [])
for (const { file, line, href, target } of missing) {
  if (!ignored.has(target)) problems.push(`${file}:${line} links ${href}, which a fresh clone doesn't have`)
}

for (const name of skills) {
  if (!skillPages.has(name)) problems.push(`documentation/skills/${name}.md is missing`)
}

if (problems.length) {
  console.error(`docs:check — ${problems.length} problem(s):`)
  for (const p of problems) console.error(`  ${p}`)
  process.exit(1)
}
console.log(`docs:check — ${counted.length} skills (${skills.length} on disk), port ${port}, every Markdown link resolves.`)
