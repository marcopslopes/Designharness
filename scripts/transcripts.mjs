/**
 * The agent chats Cursor and Claude Code saved for this repo, outside it:
 * `~/.cursor/projects/<repo>/agent-transcripts/` and `~/.claude/projects/<repo>/`.
 * Shared by `transcript-digest.mjs`, `harness-recall.mjs` and `harness-context.mjs`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/** `{ id, file, host, mtime }` for every saved chat. Stats only. */
export function findTranscripts(root = process.cwd(), home = os.homedir()) {
  const slug = path.resolve(root).replace(/^\//, '').replace(/[/.]/g, '-')
  const files = []
  const cursorDir = path.join(home, '.cursor', 'projects', slug, 'agent-transcripts')
  if (existsSync(cursorDir)) {
    for (const id of readdirSync(cursorDir)) {
      const file = path.join(cursorDir, id, `${id}.jsonl`)
      if (existsSync(file)) files.push({ id, file, host: 'cursor', mtime: statSync(file).mtimeMs })
    }
  }
  const claudeDir = path.join(home, '.claude', 'projects', '-' + slug)
  if (existsSync(claudeDir)) {
    for (const name of readdirSync(claudeDir).filter((f) => f.endsWith('.jsonl'))) {
      const file = path.join(claudeDir, name)
      files.push({ id: name.slice(0, -6), file, host: 'claude', mtime: statSync(file).mtimeMs })
    }
  }
  return files
}

const SYSTEM_TURN =
  /^(Briefly inform the user|Perform any necessary follow-up|If an MCP-backed namespace)|<\/[a-z_]+>\s*$/

function textOf(content) {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .filter((c) => c.type === 'text')
    .map((c) => c.text)
    .join('\n')
}

/** The designer's own words in a user turn: the `<user_query>` body, without attachments or system text. */
export function designerWords(raw) {
  const query = raw.match(/<user_query>([\s\S]*?)<\/user_query>/)
  let text = query ? query[1] : raw
  if (!query && /<(system|attached|hooks_context|user_info|rules)/.test(text)) return ''
  text = text
    .replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, ' ')
    .replace(/\[Image\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return SYSTEM_TURN.test(text) ? '' : text
}

/** The designer's turns, in order, and the skills the agent loaded (`SKILL.md` reads). */
export function readChat(file) {
  const turns = []
  const skills = []
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim()) continue
    let row
    try {
      row = JSON.parse(line)
    } catch {
      continue
    }
    const role = row.role || row.type
    const content = row.message?.content
    if (role === 'user') {
      const words = designerWords(textOf(content))
      if (words && turns.at(-1) !== words) turns.push(words)
    } else if (role === 'assistant' && Array.isArray(content)) {
      for (const c of content) {
        const p = c.type === 'tool_use' && (c.input?.path || c.input?.file_path)
        const m = typeof p === 'string' && p.match(/harness\/(?:skills\/)?([\w-]+)\/SKILL\.md$/)
        if (m && skills.at(-1) !== m[1]) skills.push(m[1])
      }
    }
  }
  return { turns, skills }
}
