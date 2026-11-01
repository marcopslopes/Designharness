import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const script = path.resolve(import.meta.dirname, '../../scripts/check-docs-facts.mjs')

/** A minimal repo with one skill, run through the docs check. Without `git`, it's a ZIP download. */
function check(files: Record<string, string> = {}, { git = true } = {}) {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-docs-'))
  const all: Record<string, string> = {
    'vite.config.ts': 'export default { server: { port: 3002 } }\n',
    'harness/skills/audit/SKILL.md': '# Audit\n',
    'documentation/skills/audit.md': '# Audit\n',
    'README.md': 'Open http://localhost:3002. See [install](INSTALL.md).\n',
    'INSTALL.md': '# Install\n',
    'PITCH.md': '# Pitch\n',
    'CONTRIBUTING.md': '# Contributing\n',
    ...files,
  }
  for (const [file, content] of Object.entries(all)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), content)
  }
  mkdirSync(path.join(root, 'scripts'))
  copyFileSync(script, path.join(root, 'scripts/check-docs-facts.mjs'))
  if (git) {
    spawnSync('git', ['init', '-q'], { cwd: root })
    spawnSync('git', ['add', '-A'], { cwd: root })
  }
  const run = spawnSync(process.execPath, ['scripts/check-docs-facts.mjs'], { cwd: root, encoding: 'utf8' })
  return { ok: run.status === 0, output: run.stdout + run.stderr }
}

test('a repo whose links and facts match passes', () => {
  const result = check()
  assert.ok(result.ok, result.output)
})

test('a link to a missing file fails the check', () => {
  const result = check({ 'documentation/guides/start.md': 'Read [the setup](../setup/missing.md).\n' })
  assert.ok(!result.ok)
  assert.match(result.output, /documentation\/guides\/start\.md:1 links \.\.\/setup\/missing\.md/)
})

test('a link to a gitignored file the harness creates later passes', () => {
  const result = check({
    '.gitignore': 'designer-profile.local.md\n',
    'documentation/guides/start.md': 'Your [profile](../../designer-profile.local.md).\n',
  })
  assert.ok(result.ok, result.output)
})

test('without git, the check still runs and does not fail on links', () => {
  const result = check({ 'documentation/guides/start.md': 'Read [the setup](../setup/missing.md).\n' }, { git: false })
  assert.ok(result.ok, result.output)
  const skills = check({ 'README.md': 'Ships with 40 skills.\n' }, { git: false })
  assert.match(skills.output, /says 40 skills/)
})

test('links inside code are not checked', () => {
  const result = check({
    'documentation/guides/start.md': 'Write `[x](nope.md)` like this.\n\n```\n[y](nope.md)\n```\n',
  })
  assert.ok(result.ok, result.output)
})

test('a wrong skill count or port in the docs fails the check', () => {
  const skills = check({ 'README.md': 'Ships with 40 skills.\n' })
  assert.match(skills.output, /says 40 skills; 1 route \(1 on disk, pointers omitted\)/)
  const port = check({ 'INSTALL.md': 'Open http://localhost:3005.\n' })
  assert.match(port.output, /says localhost:3005; vite.config.ts serves 3002/)
})

test('a skill without its documentation page fails the check', () => {
  const result = check({ 'harness/skills/content/SKILL.md': '# Content\n' })
  assert.match(result.output, /documentation\/skills\/content\.md is missing/)
})
