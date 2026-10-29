#!/usr/bin/env node
/**
 * Validates the typed-verdict JSON block harness/skills/audit/SKILL.md
 * requires at the end of every audit report — the same "don't trust a
 * well-formed lie" contract as any structured reviewer output: presence
 * of a field is not permission, every value must be one of the allowed
 * set, and cross-field agreement (verdict vs. blocking_count) is checked
 * explicitly rather than assumed.
 *
 * Usage:
 *   echo '<json>' | node scripts/verify-audit-verdict.mjs
 *   node scripts/verify-audit-verdict.mjs path/to/verdict.json
 *
 * Exit codes: 0 = valid verdict, 1 = malformed/invalid (message on
 * stderr explains exactly which field failed and why — never a bare
 * "invalid", per this repo's own AX standard for hook/tool errors).
 */
import { readFileSync } from 'node:fs'

const ALLOWED_VERDICT = new Set(['PASS', 'BLOCKED'])
const ALLOWED_ARTIFACT_TYPE = new Set(['studio_os_prototype', 'figma_only', 'live_production', 'external'])

function fail(reason) {
  console.error(`verify-audit-verdict: INVALID — ${reason}`)
  process.exit(1)
}

function readInput() {
  const fileArg = process.argv[2]
  if (fileArg) return readFileSync(fileArg, 'utf8')
  try {
    return readFileSync(0, 'utf8')
  } catch {
    fail('no input given — pipe JSON via stdin or pass a file path')
  }
}

function main() {
  const raw = readInput()
  let verdict
  try {
    verdict = JSON.parse(raw)
  } catch (e) {
    fail(`not valid JSON (${e.message})`)
    return
  }

  if (typeof verdict !== 'object' || verdict === null || Array.isArray(verdict)) {
    fail('top-level value must be a JSON object')
  }

  const { verdict: v, blocking_count, advisory_count, categories, artifact_type, detector_exit_code } = verdict

  if (!ALLOWED_VERDICT.has(v)) {
    fail(`"verdict" must be exactly "PASS" or "BLOCKED" — got ${JSON.stringify(v)}`)
  }
  if (!Number.isInteger(blocking_count) || blocking_count < 0) {
    fail(`"blocking_count" must be a non-negative integer — got ${JSON.stringify(blocking_count)}`)
  }
  if (!Number.isInteger(advisory_count) || advisory_count < 0) {
    fail(`"advisory_count" must be a non-negative integer — got ${JSON.stringify(advisory_count)}`)
  }
  if (!Array.isArray(categories) || !categories.every((c) => typeof c === 'string')) {
    fail('"categories" must be an array of strings (empty array is fine on a clean run)')
  }
  if (!ALLOWED_ARTIFACT_TYPE.has(artifact_type)) {
    fail(
      `"artifact_type" must be one of ${[...ALLOWED_ARTIFACT_TYPE].join(', ')} — got ${JSON.stringify(artifact_type)}`,
    )
  }
  if (detector_exit_code !== null && !Number.isInteger(detector_exit_code)) {
    fail(`"detector_exit_code" must be an integer or null — got ${JSON.stringify(detector_exit_code)}`)
  }

  // Cross-field agreement — the exact "MAYBE is not PASS" class of bug:
  // presence and type can be perfect while the verdict still lies.
  if (v === 'PASS' && blocking_count !== 0) {
    fail(
      `verdict is "PASS" but blocking_count is ${blocking_count} — these must agree; a PASS with any blocking issue is not a valid verdict`,
    )
  }
  if (v === 'BLOCKED' && blocking_count === 0) {
    fail('verdict is "BLOCKED" but blocking_count is 0 — a BLOCKED verdict needs at least one blocking issue named')
  }
  if (detector_exit_code === 2 && v === 'PASS') {
    fail(
      'detector_exit_code is 2 (findings present) but verdict is "PASS" — Check 1\'s mechanical pre-check is authoritative; resolve the findings or correct the verdict',
    )
  }

  console.log('verify-audit-verdict: valid.')
  process.exit(0)
}

main()
