#!/usr/bin/env node
/**
 * Session facts the agent runs instead of re-deriving them from files or from
 * always-on rules: the designer profile, the org pack, and the projects.
 *
 *   npm run -s harness:context                       # profile, org pack, one line per project
 *   npm run -s harness:context -- --json             # same, as JSON
 *   npm run -s harness:context -- --ask "<request>"  # adds literal trigger-phrase hits
 *   npm run -s harness:context -- <slug>             # one project in detail
 *   npm run -s harness:context -- <slug> --json      # same, as JSON
 *
 * Reads `brief.md`, `about.md`, file names under `screens/` and `docs/`, and
 * only the dates in `log.md` (never decisions.md / findings.md or log text).
 * Brief parsing comes from `src/design-harness/projectFacts.ts`, so routes and
 * gallery answers match the app.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { findTranscripts } from './transcripts.mjs'
import {
  briefIsExample,
  briefStatus,
  briefSystems,
  caseStudyFromBrief,
  docFileFacts,
  isUnfilledStarter,
  galleryBlocker,
  ownershipFromBrief,
  projectTitle,
  screenFileFacts,
} from '../src/design-harness/projectFacts.ts'

const REPO = fileURLToPath(new URL('..', import.meta.url))

const read = (file) => readFileSync(file, 'utf8')
const isDir = (path) => existsSync(path) && statSync(path).isDirectory()

// ---------------------------------------------------------------- profile

export const PROFILE_FILE = 'designer-profile.local.md'

/** The profile lives at the repo root, next to AGENTS.md. Never under `harness/`. */
export function profileFacts(root = REPO) {
  const path = join(root, PROFILE_FILE)
  if (!existsSync(path)) return { found: false, path, status: null, role: null }
  const text = read(path)
  const line = (label) => text.match(new RegExp(`^(?:-\\s+)?${label}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? null
  return { found: true, path, status: line('Status'), role: line('Role focus') }
}

// ---------------------------------------------------------------- org pack

/** The files a full local pack has (`harness/skills/org-pack-builder`). Others are extra files. */
export const ORG_PACK_FILES = [
  'COMPANY-ARCHETYPES.md',
  'COMPANY-BUSINESS.md',
  'COMPANY-PATTERNS.md',
  'COMPANY-SOURCES.md',
  'COMPANY-SQUADS.md',
  'COMPANY-VOCABULARY.md',
  'COMPANY-VOICE.md',
]

/** Local pack when `context/org-pack.local/` exists, else the public example. Never a mix. */
export function orgPackFacts(root = REPO) {
  const local = isDir(join(root, 'context/org-pack.local'))
  const folder = local ? 'context/org-pack.local' : 'context/org-pack'
  const present = isDir(join(root, folder))
    ? readdirSync(join(root, folder))
        .filter((f) => /^COMPANY-.+\.md$/.test(f))
        .sort()
    : []
  return {
    source: local ? 'local' : 'example',
    folder,
    files: present,
    missing: local ? ORG_PACK_FILES.filter((f) => !present.includes(f)) : [],
    extra: present.filter((f) => !ORG_PACK_FILES.includes(f)),
  }
}

// ---------------------------------------------------------------- learned

export const HOW_I_WORK = 'designer-context.local/how-i-work.md'
const DIGEST_STATE = 'designer-context.local/transcript-digest-state.json'
const DIGEST_DUE_CHATS = 5
const DIGEST_DUE_DAYS = 7

/** Saved agent chats for this repo (Cursor, Claude Code), as `{ id, mtime }`. Stats only, never reads them. */
export const transcriptFiles = (root = REPO, home = homedir()) => findTranscripts(root, home)

/** Recurring misses from `how-i-work.md` (seen 2+, most seen first) and whether a new digest is due. */
export function learnedFacts(root = REPO, transcripts = transcriptFiles(root), now = Date.now()) {
  const file = join(root, HOW_I_WORK)
  const text = existsSync(file) ? read(file) : ''
  const section = text.split(/^## Where the harness goes wrong$/m)[1]?.split(/^## /m)[0] ?? ''
  const patterns = [...section.matchAll(/^- (.+?) — seen (\d+)/gm)]
    .map(([, pattern, seen]) => ({ pattern, seen: Number(seen) }))
    .filter((p) => p.seen >= 2)
    .sort((a, b) => b.seen - a.seen)
  const statePath = join(root, DIGEST_STATE)
  const lastRun = existsSync(statePath) ? Date.parse(JSON.parse(read(statePath)).lastRun ?? '') || null : null
  const newChats = transcripts.filter((t) => !lastRun || t.mtime > lastRun).length
  const days = lastRun ? Math.floor((now - lastRun) / 86_400_000) : null
  const due = newChats > 0 && (lastRun === null || newChats >= DIGEST_DUE_CHATS || days >= DIGEST_DUE_DAYS)
  return {
    file: existsSync(file) ? HOW_I_WORK : null,
    lastDigest: lastRun ? new Date(lastRun).toISOString().slice(0, 10) : null,
    patterns,
    newChats,
    due,
  }
}

// ---------------------------------------------------------------- projects

const PROJECT_FOLDERS = ['projects', 'projects.local']

/** Files in `dir` and its direct subfolders (one level, like the app's globs) that pass `keep`. */
function filesIn(dir, prefix, keep) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isFile()) return keep(entry.name) ? [`${prefix}/${entry.name}`] : []
    if (!entry.isDirectory()) return []
    return readdirSync(join(dir, entry.name))
      .filter(keep)
      .map((name) => `${prefix}/${entry.name}/${name}`)
  })
}

/** `{ slug, folder }` for every project folder, tracked first, then local. */
export function projectSlugs(root = REPO) {
  return PROJECT_FOLDERS.flatMap((folder) => {
    const base = join(root, folder)
    if (!isDir(base)) return []
    return readdirSync(base, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
      .filter((d) => ['brief.md', 'about.md', 'screens'].some((f) => existsSync(join(base, d.name, f))))
      .map((d) => ({ slug: d.name, folder }))
      .sort((a, b) => a.slug.localeCompare(b.slug))
  })
}

function galleryDesignerNames(root) {
  const dir = join(root, 'src/design-harness/gallery-designers')
  const files = isDir(dir) ? readdirSync(dir).filter((f) => f.endsWith('.ts')) : []
  const names = files.map((f) => read(join(dir, f)).match(/^\s+name:\s*'([^']+)'/m)?.[1])
  return new Set(names.filter(Boolean).map((name) => name.trim().toLowerCase()))
}

/** Latest `YYYY-MM-DD` that opens a `log.md` table row. */
export function lastLogDate(log) {
  const dates = [...(log ?? '').matchAll(/^\|\s*(\d{4}-\d{2}-\d{2})/gm)].map((m) => m[1])
  return dates.sort().at(-1) ?? null
}

export function factsFor(root, { slug, folder }, designers = galleryDesignerNames(root)) {
  const dir = join(root, folder, slug)
  const file = (name) => (existsSync(join(dir, name)) ? read(join(dir, name)) : undefined)
  const brief = file('brief.md')
  const about = file('about.md')
  const ownership = ownershipFromBrief(brief)
  const caseStudy = caseStudyFromBrief(brief)
  const tracked = folder === 'projects'
  const allScreens = filesIn(join(dir, 'screens'), `/${folder}/${slug}/screens`, (name) => name.endsWith('Page.tsx'))
  const isState = (f) => f.includes('/screens/states/')
  const screenFiles = screenFileFacts(
    allScreens.filter((f) => !isState(f)),
    allScreens.filter(isState),
  )
  const docFiles = docFileFacts(
    filesIn(join(dir, 'docs'), `/${folder}/${slug}/docs`, (name) => /\.(md|mermaid)$/.test(name))
      .map((f) => ({ file: f, source: read(join(root, f)) }))
      .filter(({ source }) => !isUnfilledStarter(source)),
  )
  const entry = ({ label, route, file: f, folder: group }) => ({
    label,
    route: `#/${route}`,
    file: f.slice(1),
    ...(group ? { group } : {}),
  })
  const byLabel = (a, b) => a.label.localeCompare(b.label)
  const list = (kind) =>
    screenFiles
      .filter((s) => s.kind === kind)
      .map(entry)
      .sort(byLabel)

  const systems = briefSystems(brief)
  const blocker = !tracked
    ? 'local project — the app and the gallery read projects/ only'
    : (galleryBlocker(ownership, caseStudy) ??
      (designers.has(ownership.designer.trim().toLowerCase())
        ? undefined
        : `no designer card for "${ownership.designer}" in src/design-harness/gallery-designers/ (run gallery-card-enrichment)`))

  return {
    slug,
    folder: `${folder}/${slug}`,
    title: projectTitle(slug, brief),
    page: tracked ? `#/playground/${slug}` : null,
    brief: brief ? `${folder}/${slug}/brief.md` : null,
    about: about && !isUnfilledStarter(about) ? `${folder}/${slug}/about.md` : null,
    status: briefStatus(brief) ?? null,
    example: briefIsExample(brief),
    ...(systems.length ? { systems } : {}),
    lastLog: lastLogDate(file('log.md')),
    designer: ownership.designer ?? null,
    squad: ownership.squad ?? null,
    gallery: { setting: ownership.gallery, shows: !blocker, reason: blocker ?? null },
    caseStudy: caseStudy ?? null,
    screens: list('screens'),
    states: list('states'),
    docs: docFiles.map(entry).sort(byLabel),
  }
}

// ---------------------------------------------------------------- ask

/** Quoted strings in `text`, each split on ` / ` into separate phrases. */
function quotedPhrases(text) {
  return [...text.matchAll(/"([^"]+)"/g)].flatMap(([, q]) => q.split(/\s+\/\s+/)).map((p) => p.trim())
}

const firstCell = (row) => row.split('|')[1] ?? ''
const chainName = (row) => {
  const chain = row.split('|')[2] ?? ''
  return chain.match(/`([^`]+)`/)?.[1] ?? chain.replace(/\*/g, '').trim()
}

/**
 * Trigger phrases as the docs write them: the fast lanes' first sentence and
 * the common rows in ORCHESTRATOR.md, the group rows in routes.md.
 * Returns `{ phrase, target }`. Group rows in ORCHESTRATOR are pointers, so skipped.
 */
export function triggerPhrases(orchestrator, routes) {
  const out = []
  const lanes = orchestrator.split(/^## Fast lanes$/m)[1]?.split(/^---$/m)[0] ?? ''
  for (const [, name, body] of lanes.matchAll(/^- \*\*([^*]+?)\.\*\*\s+(.+)$/gm)) {
    const first = body.split(/(?<=[.?])\s+(?=["A-Z])/)[0]
    for (const phrase of quotedPhrases(first)) out.push({ phrase, target: `${name} fast lane` })
  }
  const table = orchestrator.split(/^## 2\. Routing table$/m)[1]?.split(/^### /m)[0] ?? ''
  for (const row of table.split('\n').filter((l) => l.startsWith('| **') || l.startsWith('| "'))) {
    if (/routes\.md/.test(row.split('|')[2] ?? '')) continue
    for (const phrase of quotedPhrases(firstCell(row))) out.push({ phrase, target: chainName(row) })
  }
  for (const section of routes.split(/^## /m).slice(1)) {
    const heading = section.split('\n')[0].trim()
    for (const row of section.split('\n').filter((l) => l.startsWith('| **') || l.startsWith('| "'))) {
      for (const phrase of quotedPhrases(firstCell(row))) {
        out.push({ phrase, target: `${chainName(row)} (routes.md § ${heading})` })
      }
    }
  }
  return out
}

const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')

/** `X`, `N`, and `[persona]` stand for any words. */
function phraseRegex(phrase) {
  const words = normalize(phrase)
    .replace(/[.*+?^${}()|\\]/g, '\\$&')
    .replace(/\\?\[[^\]]+\\?\]|\b[xn]\b/g, '\u0000')
  const body = words.replace(/\u0000/g, '.+?').replace(/[\s,]+$/, '')
  return new RegExp(`(?:^|\\W)${body}(?=\\W|$)`)
}

/** Words in a phrase, not counting `X`, `N`, or `[persona]`. */
const realWords = (phrase) => phrase.split(/\s+/).filter((w) => !/^(?:[XN]|\[[^\]]+\])[?,.]*$/.test(w)).length

/**
 * Which targets the ask hits literally. Longest phrase first. Not a routing decision.
 * One-word phrases ("review", "design", "build") are skipped: they sit in too many
 * rows to mean anything alone.
 */
export function matchAsk(ask, phrases) {
  const text = normalize(ask)
  const hits = new Map()
  for (const { phrase, target } of phrases) {
    if (realWords(phrase) < 2 || !phraseRegex(phrase).test(text)) continue
    const best = hits.get(target)
    if (!best || phrase.length > best.length) hits.set(target, phrase)
  }
  return [...hits].map(([target, phrase]) => ({ target, phrase })).sort((a, b) => b.phrase.length - a.phrase.length)
}

// ---------------------------------------------------------------- output

export function sessionContext(root = REPO, { ask } = {}) {
  const designers = galleryDesignerNames(root)
  const context = {
    profile: profileFacts(root),
    orgPack: orgPackFacts(root),
    learned: learnedFacts(root),
    projects: projectSlugs(root).map((p) => factsFor(root, p, designers)),
  }
  if (ask !== undefined) {
    const doc = (f) => (existsSync(join(root, f)) ? read(join(root, f)) : '')
    const phrases = triggerPhrases(doc('harness/ORCHESTRATOR.md'), doc('harness/references/routes.md'))
    context.ask = { text: ask, hits: matchAsk(ask, phrases) }
  }
  return context
}

const count = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

export function formatLearned({ file, lastDigest, patterns, newChats, due }) {
  const lines = []
  if (patterns.length) {
    lines.push(
      `Learned: ${file} · last digest ${lastDigest ?? 'never'} · apply the ones that fit this request, silently:`,
    )
    lines.push(...patterns.map((p) => `  - ${p.pattern} (seen ${p.seen})`))
  }
  if (due) {
    lines.push(
      `Digest: due — ${count(newChats, 'chat')} new since ${lastDigest ?? 'never'}. ` +
        'After this request is done, run harness/references/transcript-digest.md; one line at the end. Skip if nobody can answer.',
    )
  }
  return lines
}

export function formatSession({ profile, orgPack, learned, projects, ask }) {
  const lines = []
  lines.push(
    profile.found
      ? `Profile: found — ${profile.path} · Status: ${profile.status ?? 'not set'} · Role focus: ${profile.role ?? 'not set'}`
      : `Profile: missing — checked ${profile.path}`,
  )
  if (orgPack.source === 'example') {
    lines.push(`Org pack: example — ${orgPack.folder}/ (no context/org-pack.local/)`)
  } else {
    lines.push(
      `Org pack: local — ${orgPack.folder}/` +
        (orgPack.missing.length
          ? ` · partial, missing: ${orgPack.missing.join(', ')} (flag it and ask; never fill from the example)`
          : ' · complete'),
    )
  }
  if (orgPack.extra.length) lines.push(`  extra files: ${orgPack.extra.join(', ')}`)
  if (learned) lines.push(...formatLearned(learned))
  lines.push(`Projects (${projects.length}):`)
  for (const p of projects) {
    const tags = [
      p.status ?? 'no status',
      ...(p.example ? ['example'] : []),
      ...(p.systems ? [`system: ${p.systems.join(', ')}`] : []),
      `last log: ${p.lastLog ?? 'none'}`,
    ]
    lines.push(
      `  ${p.folder} — ${p.title} · ${tags.join(' · ')} · designer: ${p.designer ?? 'unresolved'} · ` +
        `${count(p.screens.length, 'screen')}, ${count(p.states.length, 'state')}, ${count(p.docs.length, 'doc')} · ` +
        `gallery: ${p.gallery.shows ? 'shows' : p.gallery.reason}`,
    )
  }
  if (ask) {
    lines.push(`Ask: "${ask.text}"`)
    lines.push(
      ...(ask.hits.length
        ? ask.hits.map((h) => `  literal hit: ${h.target} — "${h.phrase}"`)
        : ['  no literal trigger phrase. Classify against §2 by meaning.']),
    )
    lines.push('  Text matches only, not a routing decision. Confirm against §2.')
  }
  return lines.join('\n')
}

const line = (s) => `  ${s.group ? `[${s.group}] ` : ''}${s.label} — ${s.route} — ${s.file}`

export function formatDetail(p) {
  return [
    `${p.title} (${p.folder})`,
    `Page: ${p.page ?? 'none — local project'}`,
    `About: ${p.about ?? `missing — add ${p.folder}/about.md (the front page)`}`,
    `Brief: ${p.brief ?? `missing — add ${p.folder}/brief.md`}`,
    `Status: ${p.status ?? 'not set'}${p.example ? ' · example' : ''}${p.systems ? ` · system: ${p.systems.join(', ')}` : ''}`,
    `Last log: ${p.lastLog ?? 'none'}`,
    `Designer: ${p.designer ?? 'unresolved'}${p.squad ? ` · Squad: ${p.squad}` : ''}`,
    `Team Gallery: ${p.gallery.shows ? 'shows' : `not shown — ${p.gallery.reason}`} (setting: ${p.gallery.setting})`,
    `Case study: ${p.caseStudy ? 'filled' : 'incomplete'}`,
    '',
    `Screens (${p.screens.length}):`,
    ...p.screens.map(line),
    `States (${p.states.length}):`,
    ...(p.states.length ? p.states.map(line) : ['  none']),
    `Docs (${p.docs.length}):`,
    ...(p.docs.length ? p.docs.map(line) : ['  none']),
  ].join('\n')
}

function main(args) {
  const asJson = args.includes('--json')
  const askAt = args.findIndex((a) => a === '--ask' || a.startsWith('--ask='))
  const ask = askAt < 0 ? undefined : args[askAt].startsWith('--ask=') ? args[askAt].slice(6) : (args[askAt + 1] ?? '')
  const skip = askAt >= 0 && !args[askAt].startsWith('--ask=') ? askAt + 1 : -1
  const slugArg = args.find((a, i) => !a.startsWith('--') && i !== skip)

  if (slugArg) {
    const project = projectSlugs().find((p) => p.slug === slugArg)
    if (!project) {
      const all = projectSlugs().map((p) => p.slug)
      console.error(`No project "${slugArg}". Projects: ${all.join(', ') || 'none'}`)
      process.exit(1)
    }
    const facts = factsFor(REPO, project)
    console.log(asJson ? JSON.stringify(facts, null, 2) : formatDetail(facts))
    return
  }
  const context = sessionContext(REPO, { ask })
  console.log(asJson ? JSON.stringify(context, null, 2) : formatSession(context))
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) main(process.argv.slice(2))
