/**
 * How-to docs — Markdown under `documentation/` becomes Design Harness articles:
 * `documentation/setup/<NN>-<name>.md` → `#/how-to/<name>` (Workflow group),
 * `documentation/setup/mcps/<name>.md` → `#/how-to/mcps/<name>` (Methods group),
 * `documentation/{guides,maintainers}/<name>.md` → `#/how-to/guides/<name>`.
 * `documentation/README.md` is the hub's index source.
 *
 * Optional front matter at the top of a file sets what the file can't say
 * itself; without it the H1 is the label and the first paragraph the hint:
 *
 *   ---
 *   label: Figma
 *   hint: Read/write designs and DS lookup.
 *   order: 1
 *   tint: rose
 *   ---
 */
import { splitFrontMatter } from './projectFacts'

const sources = import.meta.glob<string>(['../../documentation/setup/**/*.md', '../../documentation/README.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** General guides → `#/how-to/guides/<name>`, filed under a Manual topic. */
const guideSources = import.meta.glob<string>(
  ['../../documentation/guides/*.md', '../../documentation/maintainers/*.md'],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
)

/** Root `INSTALL.md` → `#/how-to/guides/install`, so docs linking it stay in the app. */
const installSources = import.meta.glob<string>('../../INSTALL.md', { query: '?raw', import: 'default', eager: true })

/** `harness/skills/<name>/GUIDE.md` → the guide view on that skill's page (not a Documentation entry). */
const skillGuideSources = import.meta.glob<string>('../../harness/skills/*/GUIDE.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Root `RELEASE-NOTES.md` → `#/how-to/release-notes`, linked from the docs home header. */
const releaseNotesSources = import.meta.glob<string>('../../RELEASE-NOTES.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Sidebar order. Guides missing from `GUIDE_TOPIC` land in the last one; all of `maintainers/` does. */
export const GUIDE_TOPICS = ['Start here', 'Working with the harness', 'Harness internals'] as const

export type GuideTopic = (typeof GUIDE_TOPICS)[number]

const GUIDE_TOPIC: Record<string, GuideTopic> = {
  manual: 'Start here',
  'what-is-the-harness': 'Start here',
  onboarding: 'Start here',
  'how-the-harness-works': 'Start here',
  'agents-vs-skills': 'Start here',
  'company-context': 'Start here',
  'understanding-skills': 'Working with the harness',
  'design-system-usage': 'Working with the harness',
  'ai-native-design-system': 'Working with the harness',
  'variation-review-board': 'Working with the harness',
  'team-gallery': 'Working with the harness',
  hosting: 'Working with the harness',
  'company-sources': 'Working with the harness',
  'designer-context-local': 'Working with the harness',
  'spec-vs-runtime': 'Working with the harness',
  'confidence-autonomy': 'Working with the harness',
}

/** "Writing — how it works" → "Writing"; "How to build a skill (newcomer guide)" → "How to build a skill". */
function guideLabel(h1: string): string {
  return plainText(h1)
    .split(/\s+—\s+/)[0]
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
}

export const HOWTO_TINTS = [
  'sky',
  'mint',
  'rose',
  'violet',
  'blue',
  'yellow',
  'slate',
  'green',
  'peach',
  'amber',
  'teal',
  'coral',
  'orange',
] as const

export type HowtoTint = (typeof HOWTO_TINTS)[number]

function isHowtoTint(value: string | undefined): value is HowtoTint {
  return (HOWTO_TINTS as readonly string[]).includes(value ?? '')
}

function plainText(markdown: string): string {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function fallbackLabel(body: string, name: string): string {
  const h1 = body.match(/^#\s+(.+)$/m)?.[1]
  return h1 ? plainText(h1).replace(/^\d+\s*[—–-]\s*/, '') : name.replace(/-/g, ' ')
}

function fallbackHint(body: string): string {
  const para = body
    .replace(/^#\s+.+$/m, '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('>'))
  const text = plainText(para ?? '')
  return text.length > 90 ? `${text.slice(0, 89).trimEnd()}…` : text
}

/** Branded so a failed `isHowtoDocRoute` check doesn't rule out the other `how-to/*` pages. */
export type HowtoDocRoute = `how-to/${string}` & { readonly __kind: 'howto-doc' }

export type HowtoDocMeta = {
  label: string
  /** Short tile blurb on the hub */
  hint: string
  source: string
  /** Repo folder the file lives in, so its relative links resolve. */
  dir: string
  group: 'start' | 'mcp' | 'guide' | 'release'
  /** Manual topic — guides only. */
  topic?: GuideTopic
  tint: HowtoTint
}

type DiscoveredDoc = Omit<HowtoDocMeta, 'tint'> & {
  route: HowtoDocRoute
  basename: string
  order: number
  tint?: HowtoTint
}

let indexSource = ''
const discovered: DiscoveredDoc[] = []

for (const [path, raw] of Object.entries(sources)) {
  const { meta, body } = splitFrontMatter(raw)
  if (path.endsWith('/documentation/README.md')) {
    indexSource = body
    continue
  }
  const rel = path.split('/documentation/setup/')[1] ?? ''
  const basename = rel.split('/').pop() ?? ''
  const inMcps = rel.startsWith('mcps/')
  if (rel.includes('/') && !inMcps) continue
  const name = basename.replace(/\.md$/, '').replace(/^\d+-/, '')
  const prefix = Number(basename.match(/^(\d+)-/)?.[1])
  discovered.push({
    route: (inMcps ? `how-to/mcps/${name}` : `how-to/${name}`) as HowtoDocRoute,
    basename,
    label: meta.label || fallbackLabel(body, name),
    hint: meta.hint || fallbackHint(body),
    source: body,
    dir: inMcps ? 'documentation/setup/mcps' : 'documentation/setup',
    group: inMcps ? 'mcp' : 'start',
    order: Number(meta.order) || prefix || Number.MAX_SAFE_INTEGER,
    tint: isHowtoTint(meta.tint) ? meta.tint : undefined,
  })
}

discovered.sort((a, b) => a.order - b.order || a.basename.localeCompare(b.basename))

const guides: DiscoveredDoc[] = [...Object.entries(guideSources), ...Object.entries(installSources)].map(
  ([path, raw]) => {
    const atRoot = path === '../../INSTALL.md'
    const folder = path.split('/').at(-2) ?? ''
    const basename = path.split('/').pop() ?? ''
    const key = atRoot ? 'install' : basename.replace(/\.md$/, '')
    const { meta, body } = splitFrontMatter(raw)
    const h1 = body.match(/^#\s+(.+)$/m)?.[1]
    return {
      route: `how-to/guides/${key}` as HowtoDocRoute,
      basename,
      label: meta.label || (h1 ? guideLabel(h1) : key.replace(/-/g, ' ')),
      hint: meta.hint || fallbackHint(body),
      source: body,
      dir: atRoot ? '' : `documentation/${folder}`,
      group: 'guide',
      topic: atRoot ? 'Start here' : (folder === 'guides' && GUIDE_TOPIC[key]) || 'Harness internals',
      order: atRoot ? 2 : Number(meta.order) || Number.MAX_SAFE_INTEGER,
    }
  },
)
guides.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
discovered.push(...guides)

/** Each `- **Title.**` entry under its date heading (`## 0.1.0 — date` or `### date`), newest first. */
export const RELEASE_NOTE_ENTRIES: { date: string; title: string }[] = Object.values(releaseNotesSources).flatMap(
  (raw) => {
    let date = ''
    return raw.split('\n').flatMap((line) => {
      const heading = line.match(/^###? (.+)/)
      if (heading) date = heading[1].replace(/^v?\d+\.\d+\.\d+\s*—\s*/, '').trim()
      const entry = line.match(/^- \*\*(.+?)\.?\*\*/)
      return entry && date ? [{ date, title: entry[1] }] : []
    })
  },
)

const releaseNotes: DiscoveredDoc[] = Object.values(releaseNotesSources).map((raw) => {
  const { meta, body } = splitFrontMatter(raw)
  return {
    route: 'how-to/release-notes' as HowtoDocRoute,
    basename: 'RELEASE-NOTES.md',
    label: meta.label || fallbackLabel(body, 'release-notes'),
    hint: meta.hint || fallbackHint(body),
    source: body,
    dir: '',
    group: 'release',
    order: Number.MAX_SAFE_INTEGER,
  }
})
discovered.push(...releaseNotes)

/** Undefined when the file is missing, so the header link hides instead of pointing nowhere. */
export const HOWTO_RELEASE_NOTES_ROUTE: HowtoDocRoute | undefined = releaseNotes[0]?.route

/** Interactive HTML embeds — harness IA / designer briefing (served from public/). */
/** Each `href` must exist in `public/how-to/` — a missing file falls back to the Design Harness home page. */
export const HOWTO_HARNESS_ROUTES = ['how-to/harness-system-map'] as const

export const HOWTO_GUIDE_ROUTES: HowtoDocRoute[] = discovered.filter((d) => d.group === 'start').map((d) => d.route)

export const HOWTO_MCP_ROUTES: HowtoDocRoute[] = discovered.filter((d) => d.group === 'mcp').map((d) => d.route)

export const HOWTO_TOPIC_ROUTES: Record<GuideTopic, HowtoDocRoute[]> = Object.fromEntries(
  GUIDE_TOPICS.map((topic) => [topic, discovered.filter((d) => d.topic === topic).map((d) => d.route)]),
) as Record<GuideTopic, HowtoDocRoute[]>

export const HOWTO_DOC_ROUTES: HowtoDocRoute[] = [
  ...HOWTO_GUIDE_ROUTES,
  ...HOWTO_MCP_ROUTES,
  ...GUIDE_TOPICS.flatMap((topic) => HOWTO_TOPIC_ROUTES[topic]),
  ...releaseNotes.map((d) => d.route),
]

export const HOWTO_ROUTES = ['how-to', ...HOWTO_HARNESS_ROUTES] as const

export type HowtoHtmlRoute = (typeof HOWTO_HARNESS_ROUTES)[number]
export type HowtoRoute = (typeof HOWTO_ROUTES)[number]

const HTML_ROUTE_SET = new Set<string>(HOWTO_HARNESS_ROUTES)
const DOC_ROUTE_SET = new Set<string>(HOWTO_DOC_ROUTES)
const ALL_ROUTE_SET = new Set<string>([...HOWTO_ROUTES, ...HOWTO_DOC_ROUTES])

export function isHowtoHtmlRoute(route: string): route is HowtoHtmlRoute {
  return HTML_ROUTE_SET.has(route)
}

export function isHowtoDocRoute(route: string): route is HowtoDocRoute {
  return DOC_ROUTE_SET.has(route)
}

export function isHowtoRoute(route: string): route is HowtoRoute | HowtoDocRoute {
  return ALL_ROUTE_SET.has(route)
}

export type HowtoHtmlMeta = {
  label: string
  hint: string
  /** Vite public URL for the static HTML file */
  href: string
  group: 'harness'
}

export const HOWTO_HTML: Record<HowtoHtmlRoute, HowtoHtmlMeta> = {
  'how-to/harness-system-map': {
    label: 'System map — agents & skills',
    hint: 'Orchestrator, roles, skills, and human gates — harness IA.',
    href: `${import.meta.env.BASE_URL}how-to/system-map-agents-skills.html`,
    group: 'harness',
  },
}

export const HOWTO_DOCS: Record<HowtoDocRoute, HowtoDocMeta> = Object.fromEntries(
  discovered.map(({ route, label, hint, source, dir, group, topic, tint }, i) => [
    route,
    { label, hint, source, dir, group, topic, tint: tint ?? HOWTO_TINTS[i % HOWTO_TINTS.length] },
  ]),
)

export const HOWTO_INDEX_SOURCE = indexSource

export type SkillGuide = { source: string; label: string }

const SKILL_GUIDES: Record<string, SkillGuide> = Object.fromEntries(
  Object.entries(skillGuideSources).map(([path, raw]) => {
    const skill = path.split('/').at(-2) ?? ''
    const { meta, body } = splitFrontMatter(raw)
    const h1 = body.match(/^#\s+(.+)$/m)?.[1]
    return [skill, { source: body, label: meta.label || (h1 ? guideLabel(h1) : skill.replace(/-/g, ' ')) }]
  }),
)

/** The designer guide for a skill folder name, when `harness/skills/<skill>/GUIDE.md` exists. */
export function skillGuide(skill: string): SkillGuide | undefined {
  return SKILL_GUIDES[skill]
}

/** Old `how-to/guides/<name>` bookmarks → the skill page that now carries that guide. */
export function skillGuideRedirect(route: string): string | undefined {
  const name = route.match(/^how-to\/guides\/([^/]+)$/)?.[1]
  const skill = name === 'icons' ? 'icon-usage' : name
  return skill && SKILL_GUIDES[skill] ? `context/skills/${skill}` : undefined
}

/** Map markdown filenames / relative paths → in-app hash routes. */
const MD_BASENAME_TO_ROUTE: Record<string, string> = Object.fromEntries([
  ['README.md', 'how-to'],
  ...discovered.map((d) => [d.basename, d.route]),
])

/** `harness/…` files open on their Documentation or Skills page (routes match `contextDocs.ts`). */
function harnessFileRoute(path: string): string | undefined {
  if (/(^|\/)harness\/ORCHESTRATOR\.md$/.test(path)) return 'context/orchestrator'
  const skillDoc = path.match(/(?:^|\/)documentation\/skills\/([^/]+)\.md$/)?.[1]
  if (skillDoc) return `context/skills/${skillDoc}`
  const skill = path.match(/(?:^|\/)harness\/(?:skills\/)?([^/]+)\/(?:SKILL|GUIDE)\.md$/)?.[1]
  if (skill) return `context/skills/${skill}`
  const kind = path.match(/(?:^|\/)harness\/(agents|references)\/([^/]+)\.md$/)
  return kind ? `context/${kind[1]}/${kind[2]}` : undefined
}

/** `../content/GUIDE.md` read from `harness/skills/writing` → `harness/skills/content/GUIDE.md`. */
function resolveRepoPath(fromDir: string, href: string): string {
  const parts = fromDir ? fromDir.split('/') : []
  for (const seg of href.split('/')) {
    if (seg === '..') parts.pop()
    else if (seg && seg !== '.') parts.push(seg)
  }
  return parts.join('/')
}

/**
 * Rewrites relative `.md` links in how-to docs to Design Harness hash routes so
 * in-app navigation works. Leaves http(s) and already-hash links alone.
 * `fromDir` is the repo folder the markdown lives in, so `../` links resolve.
 */
export function rewriteHowtoMarkdownLinks(source: string, fromDir = 'documentation'): string {
  return source.replace(/\]\(([^)]+)\)/g, (full, rawHref: string) => {
    const href = rawHref.trim()
    if (!href || href.startsWith('http') || href.startsWith('#/') || href.startsWith('mailto:')) {
      return full
    }
    const [pathPart] = href.split('#')
    const base = pathPart.split('/').pop() ?? ''
    const route = MD_BASENAME_TO_ROUTE[base] ?? harnessFileRoute(resolveRepoPath(fromDir, pathPart))
    if (!route) return full
    return `](#/${route})`
  })
}

export type HowtoArticleSection = {
  id: string
  title: string
  body: string
}

export type HowtoArticleModel = {
  titleMain: string
  titleEm: string | null
  sections: HowtoArticleSection[]
}

function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)
}

function stripLeadingH1(source: string): { title: string | null; body: string } {
  const match = source.match(/^#\s+(.+)\n+/)
  if (!match) return { title: null, body: source }
  return { title: match[1].trim(), body: source.slice(match[0].length) }
}

/**
 * Split a how-to markdown file into article sections (by `##` headings)
 * for the sticky TOC + readable column layout.
 */
export function prepareHowtoArticle(source: string, fallbackTitle: string): HowtoArticleModel {
  const { title: h1, body } = stripLeadingH1(source.trim())
  const displayTitle = (h1 ?? fallbackTitle).replace(/\s*·\s*/g, ' · ').trim()

  // Prefer "Title · subtitle" or "Title — subtitle" for italic second line.
  const split = displayTitle.split(/\s+[·—–-]\s+/)
  const titleMain = split[0] ?? fallbackTitle
  const titleEm = split.length > 1 ? split.slice(1).join(' · ') : null

  const parts = body.split(/\n(?=##\s+)/)
  const sections: HowtoArticleSection[] = []
  const usedIds = new Set<string>()

  for (const part of parts) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const headingMatch = trimmed.match(/^##\s+(.+)\n?/)
    if (!headingMatch) {
      // Lead content before first ## — keep as intro section.
      if (sections.length === 0) {
        sections.push({
          id: 'overview',
          title: 'Overview',
          body: trimmed,
        })
        usedIds.add('overview')
      }
      continue
    }
    const title = headingMatch[1].replace(/\*\*/g, '').trim()
    let id = slugifyHeading(title) || `section-${sections.length + 1}`
    let n = 2
    while (usedIds.has(id)) {
      id = `${slugifyHeading(title)}-${n}`
      n += 1
    }
    usedIds.add(id)
    const sectionBody = trimmed.replace(/^##\s+.+\n?/, '').trim()
    sections.push({ id, title, body: sectionBody })
  }

  if (sections.length === 0) {
    sections.push({ id: 'overview', title: 'Overview', body })
  }

  return { titleMain, titleEm, sections }
}
