#!/usr/bin/env node
/**
 * What the harness already has on a topic, before a project, screen or
 * insight is started (`harness/references/harness-recall.md`).
 *
 *   npm run -s harness:recall -- "<topic>"          # projects, your notes, past chats
 *   npm run -s harness:recall -- "<topic>" --json   # same, as JSON
 *
 * Searches every project folder (yours and other designers'), their raw
 * material, `designer-context.local/` and the agent chats saved for this
 * repo. Prints to stdout only; never writes.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { factsFor, projectSlugs } from './harness-context.mjs'
import { findTranscripts, readChat } from './transcripts.mjs'

const REPO = fileURLToPath(new URL('..', import.meta.url))
const LIMIT = 5
const SNIPPET = 140

const STOP = new Set(
  'the and for with that this from into about have has our your their what which when where will would could should can how why who are was were been being its it’s let lets make build some more most very just like want need also then than them they there here not but any all one two new screen page project insights insight design flow app'.split(
    ' ',
  ),
)

/** Topic words, at least 3 letters, without filler. A trailing "s" is dropped so plurals match. */
export function terms(topic) {
  const words = topic
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length >= 3 && !STOP.has(w))
  return [...new Set(words.map((w) => (w.length > 4 && w.endsWith('s') ? w.slice(0, -1) : w)))]
}

const hitsIn = (text, words) => {
  const lower = text.toLowerCase()
  return words.filter((w) => new RegExp(`(^|[^\\p{L}])${w}`, 'u').test(lower))
}

/** The line in `text` that matches the most topic words, clipped. */
function bestLine(text, words) {
  let best = { line: '', n: 0 }
  for (const raw of text.split('\n')) {
    const line = raw.replace(/^[\s#>*|-]+/, '').trim()
    if (line.length < 12) continue
    const n = hitsIn(line, words).length
    if (n > best.n) best = { line, n }
  }
  return best.line.length > SNIPPET ? best.line.slice(0, SNIPPET) + '…' : best.line
}

const enough = (found, words) => found.length >= Math.max(Math.min(2, words.length), Math.ceil(words.length / 2))

function filesUnder(dir, keep) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name)
    if (e.isDirectory()) return filesUnder(p, keep)
    return keep(e.name) ? [p] : []
  })
}

const PROJECT_FILES = ['brief.md', 'about.md', 'findings.md', 'decisions.md', 'case-study.md']

export function recallProjects(root, words, me = null) {
  const out = []
  for (const p of projectSlugs(root)) {
    const dir = join(root, p.folder, p.slug)
    const docs = [
      ...PROJECT_FILES.map((f) => join(dir, f)).filter(existsSync),
      ...filesUnder(join(dir, 'docs'), (n) => n.endsWith('.md')),
      ...filesUnder(join(dir, 'raw'), (n) => n.endsWith('.md')),
    ]
    const screens = filesUnder(join(dir, 'screens'), (n) => n.endsWith('Page.tsx'))
    const where = []
    const found = new Set()
    let snippet = ''
    let strong = false
    for (const file of docs) {
      const text = readFileSync(file, 'utf8')
      const h = hitsIn(text, words)
      if (!enough(h, words)) continue
      strong = true
      h.forEach((w) => found.add(w))
      where.push(relative(dir, file))
      if (!snippet && /findings|decisions|brief|raw\//.test(file)) snippet = bestLine(text, words)
    }
    const screenHits = screens.filter(
      (s) =>
        hitsIn(
          s
            .split('/')
            .pop()
            .replace(/Page\.tsx$/, '')
            .replace(/([a-z])([A-Z])/g, '$1 $2'),
          words,
        ).length,
    )
    const named = hitsIn([p.slug, ...screenHits].join(' ').replace(/[-/]/g, ' '), words)
    named.forEach((w) => found.add(w))
    if (!strong && !enough(named, words)) continue
    const facts = factsFor(root, p)
    const owner =
      facts.designer && me && facts.designer.trim().toLowerCase() === me.toLowerCase()
        ? 'yours'
        : facts.designer
          ? `by ${facts.designer}`
          : 'designer unknown'
    out.push({
      folder: `${p.folder}/${p.slug}`,
      title: facts.title,
      status: facts.status,
      example: facts.example,
      owner,
      score: found.size * 10 + where.length,
      matched: where,
      screens: screenHits.map((s) => s.split('/').pop()),
      snippet,
    })
  }
  return out.sort((a, b) => Number(a.example) - Number(b.example) || b.score - a.score).slice(0, LIMIT)
}

export function recallNotes(root, words) {
  const dir = join(root, 'designer-context.local')
  return filesUnder(dir, (n) => n.endsWith('.md') && n !== 'how-i-work.md' && n !== 'preferences.md')
    .map((file) => {
      const text = readFileSync(file, 'utf8')
      const found = hitsIn(text, words)
      return { file: relative(root, file), score: found.length, found, snippet: bestLine(text, words) }
    })
    .filter((n) => n.score && enough(n.found, words))
    .sort((a, b) => b.score - a.score)
    .slice(0, LIMIT)
    .map(({ found, ...n }) => n)
}

const PASTE = 400

/** A turn longer than this is pasted material, not the designer typing: never matched or quoted. Pastes are saved to `raw/` or the inbox, and found there. */
const quote = (turn) =>
  turn.length > PASTE
    ? `[pasted text, ${turn.split(/\s+/).length} words]`
    : turn.length > SNIPPET
      ? turn.slice(0, SNIPPET) + '…'
      : turn

/** The newest chat is the one running this, so it is skipped. */
export function recallChats(
  root,
  words,
  transcripts = findTranscripts(root)
    .sort((a, b) => b.mtime - a.mtime)
    .slice(1),
) {
  const out = []
  for (const t of transcripts) {
    const { turns } = readChat(t.file)
    const found = new Set()
    let best = { words: '', n: 0 }
    for (const turn of turns.filter((x) => x.length <= PASTE)) {
      const h = hitsIn(turn, words)
      if (!enough(h, words)) continue
      h.forEach((w) => found.add(w))
      if (h.length > best.n || (h.length === best.n && turn.length < best.words.length))
        best = { words: turn, n: h.length }
    }
    if (!best.n) continue
    out.push({
      chat: t.id.slice(0, 8),
      id: t.id,
      date: new Date(t.mtime).toISOString().slice(0, 10),
      score: found.size,
      firstAsk: quote(turns[0] ?? ''),
      match: quote(best.words),
    })
  }
  return out.sort((a, b) => b.score - a.score || b.date.localeCompare(a.date)).slice(0, LIMIT)
}

export function recall(topic, root = REPO) {
  const words = terms(topic)
  if (!words.length) return { topic, words, projects: [], notes: [], chats: [] }
  const me = existsSync(join(root, 'designer-profile.local.md'))
    ? readFileSync(join(root, 'designer-profile.local.md'), 'utf8')
        .match(/^(?:-\s+)?Name:\s*(.+)$/m)?.[1]
        ?.trim()
    : null
  return {
    topic,
    words,
    projects: recallProjects(root, words, me),
    notes: recallNotes(root, words),
    chats: recallChats(root, words),
  }
}

export function formatRecall({ topic, words, projects, notes, chats }) {
  const lines = [`Recall: "${topic}" · words: ${words.join(', ') || 'none'}`]
  if (!words.length) return [...lines, '  Nothing specific to search for.'].join('\n')
  lines.push(`Projects (${projects.length}):`)
  for (const p of projects) {
    const tags = [p.status ?? 'no status', p.owner, ...(p.example ? ['made-up sample'] : [])]
    lines.push(`  ${p.folder} — ${p.title} · ${tags.join(' · ')} · in: ${p.matched.join(', ') || 'screens'}`)
    if (p.screens.length) lines.push(`    screens: ${p.screens.join(', ')}`)
    if (p.snippet) lines.push(`    "${p.snippet}"`)
  }
  lines.push(`Your notes and inbox (${notes.length}):`)
  for (const n of notes) lines.push(`  ${n.file} — "${n.snippet}"`)
  lines.push(`Past chats (${chats.length}):`)
  for (const c of chats) lines.push(`  ${c.date} · chat ${c.chat} — started "${c.firstAsk}" · matched "${c.match}"`)
  lines.push(
    '  Leads, not facts: open a file before relying on it. Chat text stays in chat; never copy it into a file.',
  )
  return lines.join('\n')
}

function main(args) {
  const asJson = args.includes('--json')
  const topic = args.filter((a) => !a.startsWith('--')).join(' ')
  if (!topic) {
    console.error('Usage: npm run -s harness:recall -- "<topic>"')
    process.exit(1)
  }
  const result = recall(topic)
  console.log(asJson ? JSON.stringify(result, null, 2) : formatRecall(result))
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main(process.argv.slice(2))
