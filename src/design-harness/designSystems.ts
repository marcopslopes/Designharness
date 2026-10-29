/**
 * Design systems — every `context/design-system/systems/<id>.md` becomes a
 * card on `#/design-system/systems`, an overview at
 * `#/design-system/systems/<id>`, and its own sidebar. Front matter sets the
 * card and the sidebar; the body is the overview's notes:
 *
 *   ---
 *   name: Desktop
 *   badge: In progress
 *   order: 2
 *   platforms: desktop, web
 *   summary: One line for the card.
 *   context: Desktop web patterns [harness/skills/ui-agent/references/desktop-web-patterns.md]
 *   skills: ui-agent, design-system
 *   theme: Colour [from mobile], Layout grid [planned]
 *   assets: Icons [from mobile], Images [planned]
 *   components: Browser frame [built: src/design-harness/shared/DesktopShell.tsx], Data table [planned]
 *   ai: Message, Conversation
 *   ---
 *
 * Item brackets: `[planned]`, `[needs input]`, `[from mobile]`, `[built: <file>]`,
 * or a file path (context docs). No bracket → the catalog page with that name,
 * if there is one. Anything without a page opens a placeholder at
 * `#/design-system/systems/<id>/<group>/<item>`.
 *
 * A `## <item label>` section in the body becomes that item's page (tables
 * there can use a `var(--token)` cell for a live swatch) and leaves the overview.
 *
 * A prototype uses a system when its brief's **Platform** line mentions one of
 * that system's `platforms` words. With no match it uses the `Default` one.
 */
import { COMPONENT_PAGES } from './componentRoutes'
import { CONTEXT_DOCS } from './contextDocs'
import { FOUNDATION_DOCS, FOUNDATION_ROUTES } from './foundationDocs'
import { splitFrontMatter } from './projectFacts'
import { PROJECTS, type Project } from './projectsIndex'
import kitTokens from '../../context/design-system/tokens.css?raw'
import labTokens from './styles/tokens.lab.css?raw'

const sources = import.meta.glob<string>('../../context/design-system/systems/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const SYSTEMS_INDEX_ROUTE = 'design-system/systems'

/** Branded so a failed check doesn't rule out other `design-system/*` pages. */
export type DesignSystemRoute = `design-system/systems/${string}` & { readonly __kind: 'design-system' }

export const SYSTEM_GROUPS = ['context', 'skills', 'theme', 'assets', 'book', 'ai', 'components'] as const
export type SystemGroup = (typeof SYSTEM_GROUPS)[number]

export const SYSTEM_GROUP_LABEL: Record<SystemGroup, string> = {
  context: 'Context',
  skills: 'Skills',
  theme: 'Theme',
  assets: 'Assets',
  book: 'Brand book',
  ai: 'AI',
  components: 'Components',
}

export type SystemItemStatus = 'page' | 'built' | 'from-mobile' | 'planned' | 'needs-input' | 'doc'

export type SystemItem = {
  label: string
  group: SystemGroup
  status: SystemItemStatus
  /** Where it lives — a file for built items and context docs. */
  file?: string
  /** An existing page to open instead of a placeholder. */
  target?: string
  /** The placeholder page — every item has one, even when `target` wins in the sidebar. */
  route: DesignSystemRoute
  /** The system file's `## <label>` section, shown on the item's page instead of the overview. */
  notes?: string
}

export type DesignSystem = {
  id: string
  route: DesignSystemRoute
  name: string
  badge: string
  summary: string
  platforms: string[]
  source: string
  isDefault: boolean
  items: Record<SystemGroup, SystemItem[]>
  /** Custom properties the system itself declares. */
  tokenCount: number
}

const slug = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const words = (value = '') =>
  value
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean)

/** Catalog pages by name — foundations, DS colours, and components. */
const CATALOG_PAGES = new Map<string, string>([
  ...FOUNDATION_ROUTES.map((route): [string, string] => [FOUNDATION_DOCS[route].label.toLowerCase(), route]),
  ['ds colours', 'design-system/ds-colours'],
  ['icons', 'design-system/icons'],
  ['images', 'design-system/images'],
  ...COMPONENT_PAGES.map((page): [string, string] => [page.label.toLowerCase(), page.route]),
])

const CONTEXT_BY_PATH = new Map(CONTEXT_DOCS.map((doc) => [doc.path, doc.route as string]))
const CONTEXT_SKILLS = new Map(
  CONTEXT_DOCS.filter((doc) => doc.kind === 'skill').map((doc) => [doc.route.replace('context/skills/', ''), doc]),
)

function countTokens(css: string, prefix: string): number {
  return new Set(css.match(new RegExp(`${prefix}[\\w-]+(?=\\s*:)`, 'g')) ?? []).size
}

const TOKEN_COUNT: Record<string, number> = {
  mobile: countTokens(kitTokens, '--'),
  harness: countTokens(labTokens, '--design-harness-'),
  brand: countTokens(labTokens, '--brand-'),
}

function parseItem(systemId: string, group: SystemGroup, entry: string): SystemItem {
  const match = entry.match(/^(.+?)\s*(?:\[(.+)\])?$/)
  const label = match?.[1].trim() ?? entry
  const tag = match?.[2]?.trim() ?? ''
  const route = `design-system/systems/${systemId}/${group}/${slug(label)}` as DesignSystemRoute
  if (group === 'skills') {
    const doc = CONTEXT_SKILLS.get(label)
    return {
      label: doc?.label ?? label,
      group,
      status: doc ? 'doc' : 'planned',
      file: doc?.path,
      target: doc?.route,
      route,
    }
  }
  if (tag.startsWith('built:')) return { label, group, status: 'built', file: tag.slice(6).trim(), route }
  if (tag === 'planned') return { label, group, status: 'planned', route }
  if (tag === 'needs input') return { label, group, status: 'needs-input', route }
  if (tag === 'from mobile') {
    return { label, group, status: 'from-mobile', target: CATALOG_PAGES.get(label.toLowerCase()), route }
  }
  if (tag.includes('/')) return { label, group, status: 'doc', file: tag, target: CONTEXT_BY_PATH.get(tag), route }
  const page = CATALOG_PAGES.get(label.toLowerCase())
  return page ? { label, group, status: 'page', target: page, route } : { label, group, status: 'planned', route }
}

/** Pulls each `## <item label>` section out of the body; the rest stays on the overview. */
function splitItemNotes(body: string, labels: Set<string>): { overview: string; notes: Map<string, string> } {
  const notes = new Map<string, string>()
  const kept = body.split(/^(?=## )/m).filter((section) => {
    const title = section
      .match(/^## (.+)$/m)?.[1]
      .trim()
      .toLowerCase()
    if (!title || !section.startsWith('## ') || !labels.has(title)) return true
    notes.set(title, section.replace(/^## .+\n+/, '').trim())
    return false
  })
  return { overview: kept.join(''), notes }
}

export const DESIGN_SYSTEMS: DesignSystem[] = Object.entries(sources)
  .map(([path, raw]) => {
    const id = path.split('/').pop()!.replace(/\.md$/, '')
    const { meta, body } = splitFrontMatter(raw)
    const parsed = SYSTEM_GROUPS.flatMap((group) => words(meta[group]).map((entry) => parseItem(id, group, entry)))
    const { overview, notes } = splitItemNotes(body, new Set(parsed.map((item) => item.label.toLowerCase())))
    for (const item of parsed) item.notes = notes.get(item.label.toLowerCase())
    const items = Object.fromEntries(
      SYSTEM_GROUPS.map((group) => [group, parsed.filter((item) => item.group === group)]),
    ) as Record<SystemGroup, SystemItem[]>
    return {
      order: Number(meta.order) || Number.MAX_SAFE_INTEGER,
      system: {
        id,
        route: `design-system/systems/${id}` as DesignSystemRoute,
        name: meta.name || id,
        badge: meta.badge ?? '',
        summary: meta.summary ?? '',
        platforms: words(meta.platforms).map((word) => word.toLowerCase()),
        source: overview,
        isDefault: meta.badge === 'Default',
        items,
        tokenCount: TOKEN_COUNT[id] ?? 0,
      },
    }
  })
  .sort((a, b) => a.order - b.order || a.system.name.localeCompare(b.system.name))
  .map(({ system }) => system)

const BY_ROUTE = new Map<string, { system: DesignSystem; item?: SystemItem }>(
  DESIGN_SYSTEMS.flatMap((system) => [
    [system.route as string, { system }] as const,
    ...SYSTEM_GROUPS.flatMap((group) =>
      system.items[group].map((item) => [item.route as string, { system, item }] as const),
    ),
  ]),
)

export function isDesignSystemRoute(route: string): route is DesignSystemRoute {
  return BY_ROUTE.has(route)
}

export function resolveDesignSystemRoute(route: DesignSystemRoute): { system: DesignSystem; item?: SystemItem } {
  return BY_ROUTE.get(route)!
}

export const DEFAULT_SYSTEM = DESIGN_SYSTEMS.find((system) => system.isDefault)

/** Notes a system file attached to the catalog page with this route. Default system wins. */
export function guidanceForCatalogRoute(route: string): string | undefined {
  const systems = DEFAULT_SYSTEM
    ? [DEFAULT_SYSTEM, ...DESIGN_SYSTEMS.filter((system) => system !== DEFAULT_SYSTEM)]
    : DESIGN_SYSTEMS
  for (const system of systems) {
    for (const group of SYSTEM_GROUPS) {
      const notes = system.items[group].find((item) => item.target === route)?.notes
      if (notes) return notes
    }
  }
  return undefined
}

/** Which system's sidebar a design-system page belongs to — catalog pages are the default system's. */
export function systemForDesignRoute(route: string): DesignSystem | undefined {
  if (route === SYSTEMS_INDEX_ROUTE) return undefined
  return BY_ROUTE.get(route)?.system ?? DEFAULT_SYSTEM
}

/** Where in the brief's Platform line this system's first word appears, or -1. */
function platformMatch(system: DesignSystem, platform: string): number {
  const positions = system.platforms.map((word) => platform.search(new RegExp(`\\b${word}\\b`))).filter((i) => i >= 0)
  return positions.length ? Math.min(...positions) : -1
}

/** Every system a project's Platform line names, or the default system when it names none. */
export function systemsForProject(project: Project): DesignSystem[] {
  const platform = (project.facts.platform ?? '').toLowerCase()
  const matched = DESIGN_SYSTEMS.filter((system) => platformMatch(system, platform) >= 0)
  if (matched.length) return matched
  return DEFAULT_SYSTEM ? [DEFAULT_SYSTEM] : []
}

/** The system the brief names first — "Desktop web and phone" → Desktop. */
export function primarySystemForProject(project: Project): DesignSystem | undefined {
  const platform = (project.facts.platform ?? '').toLowerCase()
  return [...systemsForProject(project)].sort((a, b) => platformMatch(a, platform) - platformMatch(b, platform))[0]
}

export function projectsUsingSystem(system: DesignSystem): Project[] {
  return PROJECTS.filter((project) => systemsForProject(project).includes(system))
}

export const isRealItem = (item: SystemItem) =>
  item.status === 'page' ||
  item.status === 'built' ||
  item.status === 'doc' ||
  (item.status === 'from-mobile' && Boolean(item.target))
