import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const script = path.resolve(import.meta.dirname, '../../scripts/ui-agent-gate.mjs')

function run(host: string, input: object) {
  const result = spawnSync(process.execPath, [script, '--host', host], {
    input: JSON.stringify(input),
    encoding: 'utf8',
  })
  return JSON.parse(result.stdout)
}

function repoWith(log: string | null) {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-gate-'))
  mkdirSync(path.join(root, 'harness/logs'), { recursive: true })
  if (log !== null) writeFileSync(path.join(root, 'harness/logs/skill-usage.jsonl'), log)
  return root
}

const loaded = (cwd: string) => JSON.stringify({
  timestamp: new Date().toISOString(),
  skill: 'ui-agent',
  session: 'sess-1',
  cwd,
}) + '\n'

test('a screen edit is blocked until ui-agent was read this session', () => {
  const cwd = repoWith(null)
  const denied = run('claude', {
    session_id: 'sess-1',
    cwd,
    tool_name: 'Edit',
    tool_input: { file_path: 'projects/wallet/screens/HomePage.tsx' },
  })
  assert.equal(denied.hookSpecificOutput.permissionDecision, 'deny')
  assert.equal(denied.systemMessage, 'Load ui-agent first.')

  const allowed = run('claude', {
    session_id: 'sess-1',
    cwd: repoWith(loaded(cwd)),
    tool_name: 'Write',
    tool_input: { file_path: '/work/projects/wallet/screens/HomePage.tsx' },
  })
  assert.equal(allowed.hookSpecificOutput.permissionDecision, 'allow')
})

test('a read in another session does not unlock this one', () => {
  const cwd = repoWith(loaded('/elsewhere'))
  const denied = run('claude', {
    session_id: 'sess-2',
    cwd,
    tool_name: 'Edit',
    tool_input: { file_path: 'src/design-harness/App.tsx' },
  })
  assert.equal(denied.hookSpecificOutput.permissionDecision, 'deny')
})

test('files outside screens and src tsx pass', () => {
  const cwd = repoWith(null)
  const readme = run('claude', {
    session_id: 'sess-1',
    cwd,
    tool_name: 'Edit',
    tool_input: { file_path: 'README.md' },
  })
  const ts = run('claude', {
    session_id: 'sess-1',
    cwd,
    tool_name: 'Edit',
    tool_input: { file_path: 'src/design-harness/routes.ts' },
  })
  assert.equal(readme.hookSpecificOutput.permissionDecision, 'allow')
  assert.equal(ts.hookSpecificOutput.permissionDecision, 'allow')
})

test('Cursor denies with the same message', () => {
  const cwd = repoWith(null)
  const denied = run('cursor', {
    session_id: 'sess-1',
    cwd,
    tool_name: 'StrReplace',
    tool_input: { file_path: 'projects/wallet/screens/HomePage.tsx' },
  })
  assert.equal(denied.permission, 'deny')
  assert.equal(denied.agent_message, 'Load ui-agent first.')
})
