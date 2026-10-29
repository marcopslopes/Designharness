#!/usr/bin/env node
/**
 * Local pre-commit gate (harness "constrain + verify" wall, not just
 * advisory eyeballing) — when any .css file is staged, runs the same
 * known-debt check as `npm run build` (design-detector.baseline.json)
 * and blocks the commit on any raw value not already recorded as debt. Deliberately narrow (one deterministic tool,
 * staged .css files only) — this is the tripwire, not the full audit;
 * harness/skills/audit/SKILL.md's Check 1-5 still run before sharing.
 * Also prints a non-blocking RELEASE-NOTES.md reminder (ORCHESTRATOR.md §5).
 *
 * Installed into .git/hooks/pre-commit by scripts/install-git-hooks.mjs
 * (wired to `npm install` via package.json's "prepare" script, so every
 * designer's clone gets it with zero manual step — same philosophy as
 * the rest of this harness).
 *
 * Bypassable with `git commit --no-verify`, on purpose and documented —
 * a local git hook is a tripwire, not a merge gate. It is the first
 * line, not the last; there's no CI stage that re-runs this yet (see
 * scripts/design-detector/README.md).
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..', '..')
const detectScript = resolve(repoRoot, 'scripts/design-detector/detect.mjs')
const checkScript = resolve(repoRoot, 'scripts/design-detector/check-baseline.mjs')
// Deliberately does NOT hardcode a tokens path here — detect.mjs resolves
// it itself from design-detector.config.json's "tokensPath" (or a --tokens
// flag). That's what makes design-detector a portable engine + per-repo
// plug-in config instead of something wired to this repo's own DS path;
// a hardcoded path here would silently break the moment a different
// design system is plugged in via config.
const configPath = resolve(repoRoot, 'design-detector.config.json')

function stagedFiles() {
  const out = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMDR'], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
  return out
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
}

/** Reminder only — never blocks. The rule itself is harness/ORCHESTRATOR.md §5 "Release notes". */
function remindReleaseNotes(files) {
  if (files.includes('RELEASE-NOTES.md')) return
  const touched = files.some(
    (f) => (f.startsWith('harness/') && !f.startsWith('harness/logs/')) || f.startsWith('src/design-harness/'),
  )
  if (!touched) return
  console.warn(
    '\npre-commit: harness/ or src/design-harness/ changed but RELEASE-NOTES.md did not.\n' +
      "  If designers will notice this change, add a bullet under today's date at the top of RELEASE-NOTES.md.\n",
  )
}

function main() {
  const staged = stagedFiles()
  remindReleaseNotes(staged)

  if (!existsSync(detectScript) || !existsSync(checkScript) || !existsSync(configPath)) {
    // Never block a commit because the tool itself is missing/moved —
    // fail open, same posture as the beforeSubmitPrompt hooks in this repo.
    console.warn('pre-commit: design-detector not found — skipping check.')
    process.exit(0)
  }

  const files = staged.filter((f) => f.endsWith('.css') && existsSync(resolve(repoRoot, f)))
  if (files.length === 0) process.exit(0)

  try {
    execFileSync('node', [checkScript], { cwd: repoRoot, stdio: 'inherit' })
  } catch (err) {
    const code = err.status
    if (code === 2) {
      console.error(
        '\npre-commit: new raw values with no design token — see findings above.\n' +
          '  Fix mechanically:  npm run design:detect -- --fix ' +
          files.join(' ') +
          '\n' +
          '  Fix by hand, then: git add ' +
          files.join(' ') +
          ' && git commit\n' +
          '  Or skip this check (not recommended): git commit --no-verify\n',
      )
      process.exit(1)
    }
    // Non-2 exit (usage/runtime error) — don't block the commit on a
    // broken tool invocation, but say so loudly.
    console.warn(`pre-commit: design-detector errored (exit ${code}) — not blocking. Check the tool.`)
    process.exit(0)
  }
}

main()
