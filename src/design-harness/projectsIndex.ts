/**
 * Project prototypes discovered from `projects/<slug>/` at build time — no
 * hand-maintained route list. Each project gets a page at `#/playground/<slug>`
 * (its `about.md`, or the brief's Intent until one exists), and each
 * `projects/<slug>/screens/*Page.tsx` (one folder deep, e.g. `desktop/`) opens at `#/playground/<slug>/<screen>`.
 *
 * PRIVACY BOUNDARY: only `about.md`, `brief.md`, `decisions.md`, `screens/**`
 * and `docs/**` are read; `decisions.md` from its first dated `### ` entry on.
 * `docs/` holds pages written for people; the agent's other working files
 * (`findings.md`, `log.md`, `sources.md`, `debt.md`, `raw/`, …) stay at the
 * project root and are never globbed — same rule as the Team Gallery. The Team
 * Gallery uses only the brief's Ownership and Case study summary fields.
 * Folders starting with `_` (e.g. `_template`) are skipped.
 *
 * A screen file must export a component named after the file
 * (`ClientsListPrototypePage.tsx` → `export function ClientsListPrototypePage`)
 * whose props are all optional. Other files in `screens/` are helpers.
 *
 * Screen-level states (empty, no results, error…) live one per file in
 * `screens/states/*Page.tsx`, same export rule, at
 * `#/playground/<slug>/state/<state>`.
 *
 * `docs/*.md` and `docs/*.mermaid` (one folder deep allowed) open at `#/playground/<slug>/doc/<name>`; the brief at `#/playground/<slug>/facts`;
 * the decisions at `#/playground/<slug>/decisions`.
 *
 * Titles, ownership, and screen routes/labels come from `projectFacts.ts`,
 * which `npm run harness:context` also uses.
 */
import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import {
  briefFacts,
  caseStudyFromBrief,
  docFileFacts,
  isUnfilledStarter,
  ownershipFromBrief,
  projectTitle,
  screenFileFacts,
  splitFrontMatter,
  type DocFileFacts,
  type ProjectBriefFacts,
  type ProjectCaseStudy,
  type ProjectOwnership,
} from './projectFacts'
import type { ProjectRoute } from './routes'
import type { Compare, Ideas, Stage, Variants } from './presentation'
import type { Storyboard } from './storyboard'

export type { ProjectBriefFacts, ProjectCaseStudy, ProjectOwnership } from './projectFacts'

const screenModules = import.meta.glob<Record<string, unknown>>([
  '/projects/*/screens/*Page.tsx',
  '/projects/*/screens/*/*Page.tsx',
  '!/projects/*/screens/states/**',
  '!/projects/_*/**',
])

const stateModules = import.meta.glob<Record<string, unknown>>([
  '/projects/*/screens/states/*Page.tsx',
  '!/projects/_*/**',
])

const storyboardModules = import.meta.glob<Storyboard>(
  ['/projects/*/screens/*.storyboard.ts', '/projects/*/screens/*/*.storyboard.ts', '!/projects/_*/**'],
  { import: 'storyboard', eager: true },
)

const variantsModules = import.meta.glob<Variants>(
  ['/projects/*/screens/*.variants.ts', '/projects/*/screens/*/*.variants.ts', '!/projects/_*/**'],
  { import: 'variants', eager: true },
)

const compareModules = import.meta.glob<Compare>(
  ['/projects/*/screens/*.compare.ts', '/projects/*/screens/*/*.compare.ts', '!/projects/_*/**'],
  { import: 'compare', eager: true },
)

const stageModules = import.meta.glob<Stage>(
  ['/projects/*/screens/*.stage.ts', '/projects/*/screens/*/*.stage.ts', '!/projects/_*/**'],
  { import: 'stage', eager: true },
)

const ideasModules = import.meta.glob<Ideas>(
  ['/projects/*/screens/*.ideas.ts', '/projects/*/screens/*/*.ideas.ts', '!/projects/_*/**'],
  { import: 'ideas', eager: true },
)

const briefSources = import.meta.glob<string>(['/projects/*/brief.md', '!/projects/_*/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const aboutSources = import.meta.glob<string>(['/projects/*/about.md', '!/projects/_*/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const decisionsSources = import.meta.glob<string>(['/projects/*/decisions.md', '!/projects/_*/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

/**
 * The dated entries only: the file's header and example comment are notes for the agent.
 * Each `**Label:**` line becomes its own paragraph, so it doesn't run into the list above it.
 */
function decisionEntries(raw: string | undefined): string | undefined {
  const body = raw?.replace(/<!--[\s\S]*?-->/g, '') ?? ''
  const start = body.search(/^### /m)
  if (start < 0) return undefined
  return body
    .slice(start)
    .replace(/\n(?=\*\*[^*\n]+:\*\*)/g, '\n\n')
    .trim()
}

const docSources = import.meta.glob<string>(
  ['/projects/*/docs/*.{md,mermaid}', '/projects/*/docs/*/*.{md,mermaid}', '!/projects/_*/**'],
  { query: '?raw', import: 'default', eager: true },
)

/** `case-study` skill output: the story, plus its prose and slide renders. */
const caseStudyStorySources = import.meta.glob<string>(['/projects/*/case-study.md', '!/projects/_*/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const caseStudyArticleSources = import.meta.glob<string>(['/projects/*/artifacts/*case-study.md', '!/projects/_*/**'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

const caseStudyDeckUrls = import.meta.glob<string>(
  ['/projects/*/artifacts/decks/*case-study.html', '!/projects/_*/**'],
  { query: '?url', import: 'default', eager: true },
)

/** `review-report` output: scrollable HTML reports, shown whole like the slide deck. */
const reportUrls = import.meta.glob<string>(['/projects/*/artifacts/reports/*.html', '!/projects/_*/**'], {
  query: '?url',
  import: 'default',
  eager: true,
})

type ProjectScreenBase = {
  route: ProjectRoute
  /** Source path, e.g. `/projects/clients-list-redesign/screens/ClientsListPrototypePage.tsx`. */
  file: string
  label: string
  Component: LazyExoticComponent<ComponentType>
}

export type ProjectScreen = ProjectScreenBase & {
  folder?: string
  /** States only — the screen this state belongs to, for nesting under it in the sidebar. */
  parentLabel?: string
  /** Set when this screen is one platform of a shared prototype, e.g. "iOS". */
  platform?: string
  /** Shared name of that prototype, e.g. "Wallet home". */
  platformBase?: string
}

export type ProjectDoc = {
  route: ProjectRoute
  /** Source path, e.g. `/projects/clients-list-redesign/docs/discovery/client-segments-flow.mermaid`. */
  file: string
  label: string
  kind: DocFileFacts['kind']
  folder?: string
  /** File text without front matter. */
  source: string
}

export type ProjectStoryboard = {
  route: ProjectRoute
  file: string
  label: string
  /** Folder under `screens/`, so it sits beside its screen in the sidebar. */
  folder?: string
  storyboard: Storyboard
}

/** A presentation format beside the screens — see `presentation.ts`. */
export type ProjectPresentation =
  | { kind: 'variants'; route: ProjectRoute; file: string; label: string; config: Variants }
  | { kind: 'compare'; route: ProjectRoute; file: string; label: string; config: Compare }
  | { kind: 'stage'; route: ProjectRoute; file: string; label: string; config: Stage }
  | { kind: 'ideas'; route: ProjectRoute; file: string; label: string; config: Ideas }

const PRESENTATION_LABEL: Record<ProjectPresentation['kind'], string> = {
  variants: 'variants',
  compare: 'compared',
  stage: 'stage',
  ideas: 'ideas',
}

export type ProjectCaseStudyPage = {
  route: ProjectRoute
  file: string
  kind: 'story' | 'slides' | 'article'
  label: string
  /** Markdown body (story, article) or the deck's URL (slides). */
  source: string
}

export type ProjectReport = {
  route: ProjectRoute
  file: string
  label: string
  /** The report's URL. */
  source: string
}

export type Project = {
  slug: string
  route: ProjectRoute
  /** `#/playground/<slug>/facts` — the brief, rendered as-is. */
  factsRoute: ProjectRoute
  /** `#/playground/<slug>/decisions` — chosen and rejected directions. */
  decisionsRoute: ProjectRoute
  /** `#/playground/<slug>/board` — every artifact as a page of one canvas. */
  boardRoute: ProjectRoute
  title: string
  brief?: string
  about?: string
  /** `decisions.md` entries; undefined until the first one is written. */
  decisions?: string
  facts: ProjectBriefFacts
  ownership: ProjectOwnership
  caseStudy?: ProjectCaseStudy
  screens: ProjectScreen[]
  states: ProjectScreen[]
  docs: ProjectDoc[]
  storyboards: ProjectStoryboard[]
  /** Variants, Compare — listed under "Present" in the sidebar. */
  presentations: ProjectPresentation[]
  /** Story, slides, article — in that order, whichever exist. */
  caseStudyPages: ProjectCaseStudyPage[]
  /** `artifacts/reports/*.html` — listed under "Reviews". */
  reports: ProjectReport[]
}

function buildProjects(): Project[] {
  const bySlug = new Map<string, Project>()

  const projectFor = (slug: string): Project => {
    let project = bySlug.get(slug)
    if (!project) {
      const brief = briefSources[`/projects/${slug}/brief.md`]
      const about = aboutSources[`/projects/${slug}/about.md`]
      project = {
        slug,
        route: `playground/${slug}`,
        factsRoute: `playground/${slug}/facts`,
        decisionsRoute: `playground/${slug}/decisions`,
        boardRoute: `playground/${slug}/board`,
        title: projectTitle(slug, brief),
        brief,
        about: about === undefined || isUnfilledStarter(about) ? undefined : splitFrontMatter(about).body,
        decisions: decisionEntries(decisionsSources[`/projects/${slug}/decisions.md`]),
        facts: briefFacts(brief),
        ownership: ownershipFromBrief(brief),
        caseStudy: caseStudyFromBrief(brief),
        screens: [],
        states: [],
        docs: [],
        storyboards: [],
        presentations: [],
        caseStudyPages: [],
        reports: [],
      }
      bySlug.set(slug, project)
    }
    return project
  }

  for (const path of [...Object.keys(briefSources), ...Object.keys(aboutSources)]) {
    const slug = path.match(/^\/projects\/([^/]+)\/(?:brief|about)\.md$/)?.[1]
    if (slug) projectFor(slug)
  }

  const loaders = { ...screenModules, ...stateModules }
  for (const facts of screenFileFacts(Object.keys(screenModules), Object.keys(stateModules))) {
    const load = loaders[facts.file]
    projectFor(facts.slug)[facts.kind].push({
      route: facts.route,
      file: facts.file,
      label: facts.label,
      folder: facts.folder,
      parentLabel: facts.parentLabel,
      platform: facts.platform,
      platformBase: facts.platformBase,
      Component: lazy(() => load().then((mod) => ({ default: mod[facts.exportName] as ComponentType }))),
    })
  }

  const docs = Object.entries(docSources)
    .filter(([, source]) => !isUnfilledStarter(source))
    .map(([file, source]) => ({ file, source }))
  for (const facts of docFileFacts(docs)) {
    const raw = docSources[facts.file]
    projectFor(facts.slug).docs.push({
      route: facts.route,
      file: facts.file,
      label: facts.label,
      kind: facts.kind,
      folder: facts.folder,
      source: facts.kind === 'markdown' ? splitFrontMatter(raw).body : raw,
    })
  }

  for (const [file, storyboard] of Object.entries(storyboardModules)) {
    const match = file.match(/^\/projects\/([^/]+)\/screens\/(?:([^/]+)\/)?([^/]+)\.storyboard\.ts$/)
    if (!match) continue
    const [, slug, folder, name] = match
    const kebab = name.replace(/(?<=[a-z0-9])(?=[A-Z])/g, '-').toLowerCase()
    projectFor(slug).storyboards.push({
      route: `playground/${slug}/storyboard/${kebab}`,
      file,
      label: storyboard.title.split(' · ')[0] + ' storyboard',
      folder,
      storyboard,
    })
  }

  type Unplaced<T> = T extends unknown ? Omit<T, 'route' | 'label'> : never
  const presentationFiles: Unplaced<ProjectPresentation>[] = [
    ...Object.entries(variantsModules).map(([file, config]) => ({ file, kind: 'variants' as const, config })),
    ...Object.entries(compareModules).map(([file, config]) => ({ file, kind: 'compare' as const, config })),
    ...Object.entries(stageModules).map(([file, config]) => ({ file, kind: 'stage' as const, config })),
    ...Object.entries(ideasModules).map(([file, config]) => ({ file, kind: 'ideas' as const, config })),
  ]
  for (const entry of presentationFiles) {
    const match = entry.file.match(
      /^\/projects\/([^/]+)\/screens\/(?:[^/]+\/)?([^/]+)\.(?:variants|compare|stage|ideas)\.ts$/,
    )
    if (!match) continue
    const [, slug, name] = match
    const kebab = name.replace(/(?<=[a-z0-9])(?=[A-Z])/g, '-').toLowerCase()
    const route: ProjectRoute = `playground/${slug}/${entry.kind}/${kebab}`
    const label = `${entry.config.title.split(' · ')[0]} ${PRESENTATION_LABEL[entry.kind]}`
    projectFor(slug).presentations.push({ ...entry, route, label } as ProjectPresentation)
  }

  const caseStudyFiles = [
    ...Object.entries(caseStudyStorySources).map(([file, raw]) => ({ file, kind: 'story' as const, raw })),
    ...Object.entries(caseStudyDeckUrls).map(([file, url]) => ({ file, kind: 'slides' as const, raw: url })),
    ...Object.entries(caseStudyArticleSources).map(([file, raw]) => ({ file, kind: 'article' as const, raw })),
  ]
  const caseStudyLabel = { story: 'Case study', slides: 'Slide deck', article: 'Article (draft)' } as const
  for (const { file, kind, raw } of caseStudyFiles) {
    const slug = file.match(/^\/projects\/([^/]+)\//)?.[1]
    if (!slug || (kind !== 'slides' && isUnfilledStarter(raw))) continue
    const project = projectFor(slug)
    if (project.caseStudyPages.some((p) => p.kind === kind)) continue
    project.caseStudyPages.push({
      route: kind === 'story' ? `playground/${slug}/case-study` : `playground/${slug}/case-study/${kind}`,
      file,
      kind,
      label: caseStudyLabel[kind],
      source: kind === 'slides' ? raw : splitFrontMatter(raw).body,
    })
  }

  for (const [file, url] of Object.entries(reportUrls)) {
    const match = file.match(/^\/projects\/([^/]+)\/artifacts\/reports\/([^/]+)\.html$/)
    if (!match) continue
    const [, slug, name] = match
    const label = name === slug ? 'Review report' : `${name.charAt(0).toUpperCase()}${name.slice(1).replace(/-/g, ' ')}`
    projectFor(slug).reports.push({ route: `playground/${slug}/report/${name}`, file, label, source: url })
  }

  const byLabel = <T extends { label: string }>(a: T, b: T) => a.label.localeCompare(b.label)
  return [...bySlug.values()]
    .map((p) => {
      const screens = p.screens.sort(byLabel)
      const states = p.states.sort(byLabel)
      const projectDocs = p.docs.sort(byLabel)
      return {
        ...p,
        screens,
        states,
        docs: projectDocs,
        storyboards: p.storyboards.sort(byLabel),
        presentations: p.presentations.sort(byLabel),
        reports: p.reports.sort(byLabel),
      }
    })
    .sort((a, b) => a.title.localeCompare(b.title))
}

export const PROJECTS: Project[] = buildProjects()

export type ResolvedProjectRoute = {
  project: Project
  screen?: ProjectScreen
  doc?: ProjectDoc
  /** The brief ("Project facts") page. */
  facts?: true
  /** The decisions page. */
  decisions?: true
  board?: true
  storyboard?: ProjectStoryboard
  presentation?: ProjectPresentation
  caseStudyPage?: ProjectCaseStudyPage
  report?: ProjectReport
}

const RESOLVED_ROUTES = new Map<string, ResolvedProjectRoute>(
  PROJECTS.flatMap((project) => [
    [project.route, { project }] as const,
    [project.factsRoute, { project, facts: true }] as const,
    ...(project.decisions ? [[project.decisionsRoute, { project, decisions: true }] as const] : []),
    [project.boardRoute, { project, board: true }] as const,
    ...[...project.screens, ...project.states].map((screen) => [screen.route, { project, screen }] as const),
    ...project.docs.map((doc) => [doc.route, { project, doc }] as const),
    ...project.storyboards.map((storyboard) => [storyboard.route, { project, storyboard }] as const),
    ...project.presentations.map((presentation) => [presentation.route, { project, presentation }] as const),
    ...project.caseStudyPages.map((caseStudyPage) => [caseStudyPage.route, { project, caseStudyPage }] as const),
    ...project.reports.map((report) => [report.route, { project, report }] as const),
  ]),
)

/** The project — and screen, doc or facts page — a `playground/…` route points at. */
export function resolveProjectRoute(route: string): ResolvedProjectRoute | undefined {
  return RESOLVED_ROUTES.get(route)
}

const SCREENS_BY_FILE = new Map(
  PROJECTS.flatMap((project) =>
    [...project.screens, ...project.states].map((screen) => [screen.file, screen] as const),
  ),
)

/**
 * The screen a markdown path points at. Accepts `projects/<slug>/screens/…`
 * from anywhere, or `screens/…` relative to `projectSlug` (a brief).
 */
export function resolveScreenFile(path: string, projectSlug?: string): ProjectScreen | undefined {
  const clean = path.replace(/^\.?\//, '')
  const full = clean.startsWith('projects/') ? clean : projectSlug ? `projects/${projectSlug}/${clean}` : clean
  return SCREENS_BY_FILE.get(`/${full}`)
}

const FORMATS_BY_FILE = new Map<string, { route: ProjectRoute; label: string }>(
  PROJECTS.flatMap((project) =>
    [...project.storyboards, ...project.presentations].map((entry) => [entry.file, entry] as const),
  ),
)

/**
 * The storyboard or presentation a markdown link points at, by its config
 * file (`screens/<Name>.compare.ts`, `.storyboard.ts`, …) — same path rules
 * as `resolveScreenFile`.
 */
export function resolveFormatFile(
  path: string,
  projectSlug?: string,
): { route: ProjectRoute; label: string } | undefined {
  const clean = path.replace(/^\.?\//, '')
  const full = clean.startsWith('projects/') ? clean : projectSlug ? `projects/${projectSlug}/${clean}` : clean
  return FORMATS_BY_FILE.get(`/${full}`)
}

const DOCS_BY_FILE = new Map(PROJECTS.flatMap((project) => project.docs.map((doc) => [doc.file, doc] as const)))

/**
 * The doc a markdown path points at — `projects/<slug>/docs/…` from anywhere, or, relative to
 * `projectSlug`, `docs/…` (from the project root) or a bare name (from inside `docs/`).
 */
export function resolveDocFile(path: string, projectSlug?: string): ProjectDoc | undefined {
  const clean = path.replace(/^\.?\//, '')
  if (clean.startsWith('projects/') || !projectSlug) return DOCS_BY_FILE.get(`/${clean}`)
  return (
    DOCS_BY_FILE.get(`/projects/${projectSlug}/${clean}`) ?? DOCS_BY_FILE.get(`/projects/${projectSlug}/docs/${clean}`)
  )
}
