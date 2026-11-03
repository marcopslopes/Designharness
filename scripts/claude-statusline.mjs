#!/usr/bin/env node
/**
 * Claude Code status line: context-window use, and a handoff nudge from 50%.
 * Claude Code pipes session JSON on stdin; stdout is the status line.
 * Registered in `.claude/settings.json`. Off-switch: `behaviour.handoffNudge`
 * in `harness.config.local.json` (the percentage still shows).
 *
 *   echo '{"context_window":{"used_percentage":62}}' | node scripts/claude-statusline.mjs
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export const HANDOFF = "Want me to write this session up so a new chat can pick it up?"

export function statusLine(data, { nudge = true } = {}) {
  const used = data?.context_window?.used_percentage
  if (typeof used !== 'number') return 'Context —'
  const pct = Math.floor(used)
  if (!nudge || pct < 50) return `Context ${pct}%`
  if (pct < 60) return `Context ${pct}% · Half the context window is used.`
  return `Context ${pct}% · ${HANDOFF}`
}

function nudgeOn(root) {
  const file = path.join(root, 'harness.config.local.json')
  if (!existsSync(file)) return true
  try {
    return JSON.parse(readFileSync(file, 'utf8'))?.behaviour?.handoffNudge !== false
  } catch {
    return true
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  let raw = ''
  process.stdin.on('data', (chunk) => (raw += chunk))
  process.stdin.on('end', () => {
    let data = {}
    try {
      data = JSON.parse(raw)
    } catch {
      // Claude Code always sends JSON; anything else renders the empty state.
    }
    const root = data?.workspace?.project_dir || process.cwd()
    process.stdout.write(statusLine(data, { nudge: nudgeOn(root) }) + '\n')
  })
}
