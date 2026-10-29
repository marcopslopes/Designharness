#!/usr/bin/env node
/**
 * Build gate around detect.mjs: fails only on findings that aren't in the
 * committed known-debt list (`design-detector.baseline.json` at repo root).
 *
 *   npm run design:check             # exit 2 on new findings, else 0
 *   npm run design:check -- --update # rewrite the list from what's on disk
 *
 * Findings are matched by file + property + value + severity and counted,
 * not by line number, so moving code around doesn't trip the gate. Only run
 * `--update` after a human decided the remaining values are accepted debt
 * (see harness/skills/design-system/references/token-check.md) — never to
 * silence a new raw value.
 *
 * Scope is whatever design-detector.config.json's targetDirs cover.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('../..', import.meta.url).pathname
const BASELINE = join(ROOT, 'design-detector.baseline.json')
const update = process.argv.includes('--update')

function runDetector() {
  try {
    return JSON.parse(
      execFileSync('node', [join(ROOT, 'scripts/design-detector/detect.mjs'), '--json'], {
        cwd: ROOT,
        encoding: 'utf8',
      }),
    )
  } catch (error) {
    if (error.status === 2) return JSON.parse(error.stdout)
    process.stderr.write(error.stderr || String(error))
    process.exit(1)
  }
}

const keyOf = (e) => `${e.file} | ${e.property} | ${e.value} | ${e.severity}`

const findings = runDetector().results.flatMap(({ file, findings: list }) =>
  list.map((f) => ({
    file: relative(ROOT, file),
    line: f.line,
    property: f.property,
    value: f.value,
    severity: f.severity,
    message: f.message,
  })),
)

const current = new Map()
for (const f of findings) current.set(keyOf(f), [...(current.get(keyOf(f)) ?? []), f])

if (update) {
  const entries = [...current.values()]
    .map((list) => ({
      file: list[0].file,
      property: list[0].property,
      value: list[0].value,
      severity: list[0].severity,
      count: list.length,
    }))
    .sort((a, b) => keyOf(a).localeCompare(keyOf(b)))
  const body = {
    _note:
      'Known design-token debt accepted by a human. The build fails on anything not listed here. Regenerate with `npm run design:check -- --update` only after a token-check decision — see scripts/design-detector/check-baseline.mjs.',
    total: findings.length,
    entries,
  }
  writeFileSync(BASELINE, `${JSON.stringify(body, null, 2)}\n`)
  console.log(
    `design:check — known-debt list updated: ${findings.length} finding(s) in ${new Set(entries.map((e) => e.file)).size} file(s).`,
  )
  process.exit(0)
}

const known = new Map()
if (existsSync(BASELINE)) {
  for (const e of JSON.parse(readFileSync(BASELINE, 'utf8')).entries ?? []) known.set(keyOf(e), e.count)
}

const fresh = []
for (const [key, list] of current) {
  const allowed = known.get(key) ?? 0
  if (list.length > allowed)
    fresh.push(
      ...(allowed === 0
        ? list
        : list.slice(allowed).map((f) => ({ ...f, line: `${list.map((x) => x.line).join(', ')} (one is new)` }))),
    )
}
const knownTotal = [...known.values()].reduce((a, b) => a + b, 0)
const shrunk = knownTotal - (findings.length - fresh.length)

if (fresh.length > 0) {
  console.error(`design:check — ${fresh.length} new raw value(s) with no design token:\n`)
  for (const f of fresh)
    console.error(`  ${f.file}:${f.line}  [${f.severity}] ${f.property}: ${f.value}\n    ${f.message}\n`)
  console.error(
    'Use a token (harness/skills/design-system/references/token-check.md). Do not add these to the known-debt list to pass the build.',
  )
  process.exit(2)
}

console.log(`design:check — no new raw values. Known debt: ${findings.length} finding(s).`)
if (shrunk > 0)
  console.log(`  ${shrunk} known finding(s) are gone — run \`npm run design:check -- --update\` to lock that in.`)
