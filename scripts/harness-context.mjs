#!/usr/bin/env node
/**
 * Facts about projects in `projects/<slug>/` — the agent runs this instead of
 * re-deriving them from files or from always-on rules.
 *
 *   npm run harness:context                  # one line per project
 *   npm run harness:context -- <slug>        # one project in detail
 *   npm run harness:context -- <slug> --json # same, as JSON
 *
 * Reads only `brief.md`, `about.md`, file names under `screens/` and `docs/`
 * (same privacy boundary as Design Harness — never decisions.md / findings.md / log.md). Parsing comes from
 * `src/design-harness/projectFacts.ts`, so routes and gallery answers match the app.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  briefStatus,
  caseStudyFromBrief,
  docFileFacts,
  isUnfilledStarter,
  galleryBlocker,
  ownershipFromBrief,
  projectTitle,
  screenFileFacts,
} from '../src/design-harness/projectFacts.ts'

const ROOT = new URL('..', import.meta.url).pathname
const PROJECTS_DIR = join(ROOT, 'projects')
const GALLERY_CARDS = join(ROOT, 'src/design-harness/gallery-designers')

const args = process.argv.slice(2)
const asJson = args.includes('--json')
const slugArg = args.find((a) => !a.startsWith('--'))

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

function projectSlugs() {
  return readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .filter((d) => ['brief.md', 'about.md', 'screens'].some((f) => existsSync(join(PROJECTS_DIR, d.name, f))))
    .map((d) => d.name)
    .sort()
}

const galleryDesignerNames = (() => {
  const files = existsSync(GALLERY_CARDS) ? readdirSync(GALLERY_CARDS).filter((f) => f.endsWith('.ts')) : []
  const names = files.map((f) => readFileSync(join(GALLERY_CARDS, f), 'utf8').match(/^\s+name:\s*'([^']+)'/m)?.[1])
  return new Set(names.filter(Boolean).map((name) => name.trim().toLowerCase()))
})()

function factsFor(slug) {
  const dir = join(PROJECTS_DIR, slug)
  const briefPath = join(dir, 'brief.md')
  const brief = existsSync(briefPath) ? readFileSync(briefPath, 'utf8') : undefined
  const ownership = ownershipFromBrief(brief)
  const caseStudy = caseStudyFromBrief(brief)
  const allScreens = filesIn(join(dir, 'screens'), `/projects/${slug}/screens`, (name) => name.endsWith('Page.tsx'))
  const isState = (file) => file.includes('/screens/states/')
  const screenFiles = screenFileFacts(
    allScreens.filter((f) => !isState(f)),
    allScreens.filter(isState),
  )
  const docFiles = docFileFacts(
    filesIn(join(dir, 'docs'), `/projects/${slug}/docs`, (name) => /\.(md|mermaid)$/.test(name))
      .map((file) => ({ file, source: readFileSync(join(ROOT, file), 'utf8') }))
      .filter(({ source }) => !isUnfilledStarter(source)),
  )
  const entry = ({ label, route, file, folder }) => ({
    label,
    route: `#/${route}`,
    file: file.slice(1),
    ...(folder ? { group: folder } : {}),
  })
  const byLabel = (a, b) => a.label.localeCompare(b.label)
  const list = (kind) =>
    screenFiles
      .filter((s) => s.kind === kind)
      .map(entry)
      .sort(byLabel)

  const blocker =
    galleryBlocker(ownership, caseStudy) ??
    (galleryDesignerNames.has(ownership.designer.trim().toLowerCase())
      ? undefined
      : `no designer card for "${ownership.designer}" in src/design-harness/gallery-designers/ (run gallery-card-enrichment)`)

  return {
    slug,
    title: projectTitle(slug, brief),
    page: `#/playground/${slug}`,
    brief: brief ? `projects/${slug}/brief.md` : null,
    about:
      existsSync(join(dir, 'about.md')) && !isUnfilledStarter(readFileSync(join(dir, 'about.md'), 'utf8'))
        ? `projects/${slug}/about.md`
        : null,
    status: briefStatus(brief) ?? null,
    designer: ownership.designer ?? null,
    squad: ownership.squad ?? null,
    gallery: { setting: ownership.gallery, shows: !blocker, reason: blocker ?? null },
    caseStudy: caseStudy ?? null,
    screens: list('screens'),
    states: list('states'),
    docs: docFiles.map(entry).sort(byLabel),
  }
}

const count = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

function printSummary(all) {
  for (const p of all) {
    const status = (p.status ?? 'no brief').split(' — ')[0]
    console.log(
      `${p.slug} — ${p.title} · ${status} · designer: ${p.designer ?? 'unresolved'} · ` +
        `${count(p.screens.length, 'screen')}, ${count(p.states.length, 'state')}, ${count(p.docs.length, 'doc')} · ` +
        `gallery: ${p.gallery.shows ? 'shows' : p.gallery.reason}`,
    )
  }
}

const line = (s) => `  ${s.group ? `[${s.group}] ` : ''}${s.label} — ${s.route} — ${s.file}`

function printDetail(p) {
  const lines = [
    `${p.title} (${p.slug})`,
    `Page: ${p.page}`,
    `About: ${p.about ?? 'missing — add projects/' + p.slug + '/about.md (the front page)'}`,
    `Brief: ${p.brief ?? 'missing — add projects/' + p.slug + '/brief.md'}`,
    `Status: ${p.status ?? 'not set'}`,
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
  ]
  console.log(lines.join('\n'))
}

const slugs = projectSlugs()

if (slugArg) {
  if (!slugs.includes(slugArg)) {
    console.error(`No project "${slugArg}". Projects: ${slugs.join(', ') || 'none'}`)
    process.exit(1)
  }
  const facts = factsFor(slugArg)
  if (asJson) console.log(JSON.stringify(facts, null, 2))
  else printDetail(facts)
} else {
  const all = slugs.map(factsFor)
  if (asJson) console.log(JSON.stringify(all, null, 2))
  else printSummary(all)
}
