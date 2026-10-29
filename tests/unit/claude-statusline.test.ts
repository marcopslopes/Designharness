import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const script = path.resolve(import.meta.dirname, '../../scripts/claude-statusline.mjs')
const handoff = "Good moment for a handoff. Say 'wrap up' and start a new chat."

/** Runs the status line the way Claude Code does: session JSON on stdin. */
function render(used: number | null, config?: object) {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-status-'))
  if (config) writeFileSync(path.join(root, 'harness.config.local.json'), JSON.stringify(config))
  const input = JSON.stringify({ workspace: { project_dir: root }, context_window: { used_percentage: used } })
  return spawnSync(process.execPath, [script], { input, encoding: 'utf8' }).stdout.trim()
}

test('below half, it only shows the percentage', () => {
  assert.equal(render(49.9), 'Context 49%')
})

test('at half, it warns', () => {
  assert.equal(render(50), 'Context 50% · Half the context window is used.')
})

test('from 60%, every step suggests a handoff', () => {
  for (const used of [60, 70.4, 80, 95]) assert.equal(render(used), `Context ${Math.floor(used)}% · ${handoff}`)
})

test('early in a session the percentage is missing', () => {
  assert.equal(render(null), 'Context —')
})

test('the handoff nudge setting turns the warning off, not the percentage', () => {
  assert.equal(render(72, { behaviour: { handoffNudge: false } }), 'Context 72%')
})
