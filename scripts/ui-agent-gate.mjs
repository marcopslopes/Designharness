#!/usr/bin/env node
// Blocks a screen edit until this session has read harness/skills/ui-agent/SKILL.md.
// Claude Code: PreToolUse on Edit|Write. Cursor: preToolUse on Write|StrReplace.
// The read is recorded in harness/logs/skill-usage.jsonl by the skill-usage hook.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const host = process.argv.includes('--host') ? process.argv[process.argv.indexOf('--host') + 1] : 'claude'
const MESSAGE = 'Load ui-agent first.'

function readStdin() {
  return new Promise((resolve) => {
    const chunks = []
    process.stdin.on('data', (chunk) => chunks.push(chunk))
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    process.stdin.on('error', () => resolve(''))
  })
}

/** Screen files, and TSX under src/. Other writes pass. */
function isGatedPath(filePath) {
  const path = String(filePath ?? '').replaceAll('\\', '/')
  if (/\/projects\/[^/]+\/screens\//.test(`/${path}`) || /(^|\/)projects\/[^/]+\/screens\//.test(path)) return true
  return /(^|\/)src\/.+\.tsx$/.test(path)
}

function sessionOf(data) {
  return data.session_id || data.conversation_id || process.env.CURSOR_SESSION_ID || process.env.CLAUDE_SESSION_ID || 'unknown'
}

function filePathOf(input) {
  const toolInput = input.tool_input || input.toolInput || {}
  return toolInput.file_path || toolInput.path || toolInput.target_file || toolInput.filePath || ''
}

/** True when this session already logged a read of ui-agent. */
function uiAgentLoaded(logText, session, cwd, now = Date.now()) {
  if (!logText) return false
  for (const line of logText.split('\n')) {
    if (!line.trim()) continue
    let event
    try { event = JSON.parse(line) } catch { continue }
    if (event.skill !== 'ui-agent') continue
    if (session !== 'unknown' && event.session === session) return true
    if (session === 'unknown' && event.session === 'unknown' && event.cwd === cwd) {
      const age = now - Date.parse(event.timestamp)
      if (age >= 0 && age < 30 * 60 * 1000) return true
    }
  }
  return false
}

function emit(denied) {
  if (host === 'cursor') {
    process.stdout.write(JSON.stringify(denied
      ? { permission: 'deny', agent_message: MESSAGE, user_message: MESSAGE }
      : { permission: 'allow' }))
    return
  }
  const output = { hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: denied ? 'deny' : 'allow' } }
  if (denied) {
    output.hookSpecificOutput.permissionDecisionReason = MESSAGE
    output.systemMessage = MESSAGE
  }
  process.stdout.write(JSON.stringify(output))
}

async function main() {
  const raw = await readStdin()
  let input = {}
  try { input = JSON.parse(raw) } catch { emit(false); return }
  const filePath = filePathOf(input)
  if (!isGatedPath(filePath)) { emit(false); return }
  const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd()
  const logPath = join(cwd, 'harness/logs/skill-usage.jsonl')
  const logText = existsSync(logPath) ? readFileSync(logPath, 'utf8') : ''
  emit(!uiAgentLoaded(logText, sessionOf(input), cwd))
}

main().finally(() => {
  if (host === 'cursor') setTimeout(() => process.exit(0), 60)
})
