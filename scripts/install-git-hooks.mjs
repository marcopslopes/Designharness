#!/usr/bin/env node
/**
 * Installs scripts/git-hooks/pre-commit.mjs into .git/hooks/pre-commit
 * so it runs automatically on every commit, no manual step per clone.
 * Wired to `npm install` via package.json's "prepare" script.
 *
 * Safe to re-run — overwrites only a hook this installer itself wrote
 * (checked via a marker comment), never a hook a designer wrote by hand.
 */
import { readFileSync, writeFileSync, existsSync, chmodSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const gitDir = resolve(repoRoot, '.git')
const hooksDir = resolve(gitDir, 'hooks')
const target = resolve(hooksDir, 'pre-commit')
const source = resolve(__dirname, 'git-hooks', 'pre-commit.mjs')

const MARKER = '// design-harness: installed by scripts/install-git-hooks.mjs'

function main() {
  if (!existsSync(gitDir)) {
    // Not a git checkout (e.g. npm install ran inside an extracted
    // tarball) — nothing to wire up, and nothing to warn about.
    process.exit(0)
  }
  if (!existsSync(source)) {
    console.warn('install-git-hooks: source hook missing at ' + source + ' — skipping.')
    process.exit(0)
  }
  if (!existsSync(hooksDir)) mkdirSync(hooksDir, { recursive: true })

  if (existsSync(target)) {
    const existing = readFileSync(target, 'utf8')
    if (!existing.includes(MARKER)) {
      console.warn(
        'install-git-hooks: .git/hooks/pre-commit already exists and was ' +
          'not written by this installer — leaving it alone. Merge ' +
          'scripts/git-hooks/pre-commit.mjs in by hand if you want the ' +
          'design-detector check too.',
      )
      process.exit(0)
    }
  }

  const wrapper = `#!/usr/bin/env node\n${MARKER}\n` + readFileSync(source, 'utf8').replace(/^#!.*\n/, '')
  writeFileSync(target, wrapper, 'utf8')
  chmodSync(target, 0o755)
  console.log('install-git-hooks: pre-commit design-detector check installed.')
}

main()
