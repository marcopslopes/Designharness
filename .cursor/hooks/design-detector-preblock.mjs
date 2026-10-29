#!/usr/bin/env node
/**
 * preToolUse hook — best-effort pre-write block on a new, mechanically
 * provable design-token violation (2026-08-07).
 *
 * KNOWN UNRELIABLE — same class of platform limitation as
 * `.cursor/hooks/designer-onboarding-check.sh`'s sessionStart bug, just a
 * different bug: Cursor staff have confirmed a race condition where a
 * fast-exiting preToolUse hook's `deny` response can be silently dropped,
 * i.e. the write proceeds anyway ("please don't rely on a deny hook alone
 * as a hard block for risky commands right now" — Cursor forum, staff
 * reply, 2026). This hook is kept as belt-and-suspenders on top of the
 * *reliable* enforcement layer: `harness/skills/design-system` and
 * `harness/skills/audit` calling `scripts/design-detector` directly
 * (wired 2026-08-07) — that layer does not depend on this hook firing.
 * See `KNOWN-ISSUES.md` for the tracked entry.
 *
 * Also unconfirmed: the exact `tool_input` schema for `StrReplace` (no
 * Cursor doc publishes it). This hook guesses at `old_string`/`new_string`
 * and fails OPEN (allows the write) whenever it can't confidently
 * reconstruct the proposed file content — a missed block is the accepted
 * failure mode here, not a false block of a legitimate edit.
 *
 * Scope: only denies on TOKEN-RAW / TOKEN-INVALID findings that are NEW
 * as of this specific edit (i.e. weren't already true of the file on
 * disk) — never TOKEN-GAP, which needs a human judgment call, not a
 * block (same human-gate discipline as token-check.md).
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, extname, resolve as resolvePath, isAbsolute } from 'node:path'
import { execFileSync } from 'node:child_process'
import { findConfig } from '../../scripts/design-detector/core/config.mjs'

function readStdin() {
  return new Promise((resolvePromise) => {
    const chunks = []
    process.stdin.on('data', (c) => chunks.push(c))
    process.stdin.on('end', () => resolvePromise(Buffer.concat(chunks).toString('utf8')))
  })
}

function emit(result) {
  process.stdout.write(JSON.stringify(result))
}

/** Applies old_string -> new_string against `before`. Returns null if it can't. */
function applyStrReplace(before, toolInput) {
  const edits = Array.isArray(toolInput.edits) ? toolInput.edits : [toolInput]
  let content = before
  for (const edit of edits) {
    if (typeof edit.old_string !== 'string' || typeof edit.new_string !== 'string') return null
    if (!content.includes(edit.old_string)) return null
    const replaceAll = edit.replace_all === true
    content = replaceAll
      ? content.split(edit.old_string).join(edit.new_string)
      : content.replace(edit.old_string, edit.new_string)
  }
  return content
}

function runDetect(filePath, tokensPath) {
  try {
    const out = execFileSync(
      process.execPath,
      [resolvePath(process.cwd(), 'scripts/design-detector/detect.mjs'), '--json', '--tokens', tokensPath, filePath],
      { encoding: 'utf8' },
    )
    return JSON.parse(out).results[0]?.findings ?? []
  } catch (err) {
    // detect.mjs exits 2 on findings present (not an error) — its stdout is still valid JSON.
    if (err.stdout) {
      try { return JSON.parse(err.stdout).results[0]?.findings ?? [] } catch { /* fall through */ }
    }
    return null // genuine failure — caller fails open
  }
}

function findingKey(f) {
  return `${f.severity}|${f.property}|${f.value}`
}

async function main() {
  const raw = await readStdin()
  let input
  try { input = JSON.parse(raw) } catch { emit({ permission: 'allow' }); return }

  const { tool_name, tool_input, cwd } = input
  if (tool_name !== 'Write' && tool_name !== 'StrReplace') { emit({ permission: 'allow' }); return }

  const filePathRaw = tool_input?.file_path
  if (!filePathRaw || extname(filePathRaw) !== '.css') { emit({ permission: 'allow' }); return }

  const repoRoot = cwd || process.cwd()
  const absPath = isAbsolute(filePathRaw) ? filePathRaw : join(repoRoot, filePathRaw)

  const found = findConfig(repoRoot)
  if (!found) { emit({ permission: 'allow' }); return } // no config plugged in — nothing to check against
  const { configPath, config } = found
  const configDir = resolvePath(configPath, '..')
  const tokensPath = resolvePath(configDir, config.tokensPath)
  if (!existsSync(tokensPath) || absPath === tokensPath) { emit({ permission: 'allow' }); return }

  const before = existsSync(absPath) ? readFileSync(absPath, 'utf8') : ''
  let after
  if (tool_name === 'Write') {
    after = typeof tool_input.content === 'string' ? tool_input.content : null
  } else {
    after = applyStrReplace(before, tool_input)
  }
  if (after === null) { emit({ permission: 'allow' }); return } // can't reconstruct — fail open, not a false block

  const tmpDir = mkdtempSync(join(tmpdir(), 'design-detector-hook-'))
  const beforeTmp = join(tmpDir, 'before.css')
  const afterTmp = join(tmpDir, 'after.css')
  writeFileSync(beforeTmp, before, 'utf8')
  writeFileSync(afterTmp, after, 'utf8')

  const beforeFindings = runDetect(beforeTmp, tokensPath)
  const afterFindings = runDetect(afterTmp, tokensPath)
  if (beforeFindings === null || afterFindings === null) { emit({ permission: 'allow' }); return } // checker itself failed — fail open

  const beforeKeys = new Set(beforeFindings.map(findingKey))
  const newBlocking = afterFindings.filter(
    (f) => (f.severity === 'TOKEN-RAW' || f.severity === 'TOKEN-INVALID') && !beforeKeys.has(findingKey(f)),
  )

  if (newBlocking.length === 0) { emit({ permission: 'allow' }); return }

  const lines = newBlocking.map((f) => `- ${f.message}`).join('\n')
  emit({
    permission: 'deny',
    agent_message: `design-detector: this edit introduces ${newBlocking.length} new mechanically-provable token violation(s) in ${filePathRaw}:\n${lines}\n\nFix these (use the suggested var()) and retry. TOKEN-GAP findings are not blocked here — those need a human call, see token-check.md.`,
    user_message: `Blocked a write to ${filePathRaw}: it introduces ${newBlocking.length} raw value(s) that already have a matching design token.`,
  })
}

main().finally(() => {
  // Mitigation (not a fix) for a confirmed Cursor race condition where a
  // fast-exiting hook's response can be dropped before it's read.
  process.stdout.write('')
  setTimeout(() => process.exit(0), 60)
})
