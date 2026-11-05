#!/usr/bin/env node
/**
 * Condenses this repo's past agent chats into a short digest the agent reads
 * to update `designer-context.local/how-i-work.md`
 * (`harness/references/transcript-digest.md`).
 *
 *   node scripts/transcript-digest.mjs              # new or continued chats only
 *   node scripts/transcript-digest.mjs --all        # every chat again
 *   node scripts/transcript-digest.mjs --mark-done  # record the last digest as read
 *
 * Reads Cursor (~/.cursor/projects/<repo>/agent-transcripts) and Claude Code
 * (~/.claude/projects/<repo>) transcripts. The digest is written to the OS
 * temp folder, never into the repo: it holds raw designer words.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { findTranscripts, readChat } from './transcripts.mjs'

const repo = process.cwd()
const statePath = path.join(repo, 'designer-context.local', 'transcript-digest-state.json')
const digestPath = path.join(os.tmpdir(), 'harness-transcript-digest.md')
const pendingPath = path.join(os.tmpdir(), 'harness-transcript-digest.pending.json')
const MAX_TEXT = 300

const args = process.argv.slice(2)

if (args.includes('--mark-done')) {
  if (!existsSync(pendingPath)) {
    console.log('Nothing to mark: run the digest first.')
    process.exit(0)
  }
  mkdirSync(path.dirname(statePath), { recursive: true })
  renameSync(pendingPath, statePath)
  console.log(`Marked as read. State: ${path.relative(repo, statePath)}`)
  process.exit(0)
}

const state =
  !args.includes('--all') && existsSync(statePath) ? JSON.parse(readFileSync(statePath, 'utf8')) : { processed: {} }

const PUSHBACK =
  /^(no|nope|nah)\b|\bi mean\b|not what i|\bwhy (did |do |are )?you\b|\bwrong\b|\b(don'?t|do not|stop|undo|revert)\b|\bthat'?s not\b|\binstead\b/i
const isPushback = (words) => words.length <= 240 && PUSHBACK.test(words)
const clip = (words) => (words.length > MAX_TEXT ? words.slice(0, MAX_TEXT) + '…' : words)

const chats = findTranscripts(repo)
const next = { lastRun: new Date().toISOString(), processed: { ...state.processed } }
const out = []
let newTurns = 0

for (const t of chats.sort((a, b) => a.mtime - b.mtime)) {
  const { turns, skills } = readChat(t.file)
  const seen = state.processed[t.id]?.turns ?? 0
  next.processed[t.id] = { turns: turns.length }
  if (turns.length <= seen) continue
  const date = new Date(t.mtime).toISOString().slice(0, 10)
  const fresh = turns.slice(seen)
  newTurns += fresh.length
  out.push(
    `## ${date} · ${t.host} · ${t.id.slice(0, 8)} · ${turns.length} turns${seen ? ` (${fresh.length} new)` : ''}`,
  )
  out.push(`Skills: ${skills.join(' → ') || 'none'}`)
  fresh.forEach((words, i) => {
    const n = seen + i
    const flag = n > 0 && isPushback(words) ? ' ⚑' : ''
    out.push(`${n + 1}.${flag} ${clip(words)}`)
  })
  out.push('')
}

const header = `# Transcript digest — ${next.lastRun.slice(0, 10)}\n\n${out.length ? out.filter((l) => l.startsWith('## ')).length : 0} chats, ${newTurns} new designer turns. ⚑ = possible pushback (a word match, not a verdict).\n\n`
writeFileSync(digestPath, header + out.join('\n'))
writeFileSync(pendingPath, JSON.stringify(next, null, 2))
console.log(`Digest: ${digestPath}`)
console.log(header.split('\n')[2])
if (!out.length) console.log('No new chats since the last digest.')
