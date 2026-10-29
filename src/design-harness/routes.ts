import { isContextDocRoute, type ContextDocRoute } from './contextDocs'
import { isDesignSystemRoute, type DesignSystemRoute } from './designSystems'
import { isFoundationDocRoute, type FoundationDocRoute } from './foundationDocs'
import { HOWTO_ROUTES, isHowtoDocRoute, skillGuideRedirect, type HowtoDocRoute } from './howtoDocs'
import { BUTTON_ROUTES, EXTRACTED_COMPONENT_ROUTES } from './componentRoutes'
import { resolveProjectRoute } from './projectsIndex'

/**
 * Example prototypes — add your own work here.
 * Each route here must have a corresponding page component in `src/design-harness/pages/`.
 *
 * Example:
 * export const PLAYGROUND_ROUTES = [
 *   'playground/my-feature',
 * ] as const
 */
export const PLAYGROUND_ROUTES = [] as const

export const AGENT_ROUTES = [
  'agents/ui-agent',
  'agents/content-agent',
  'agents/ux-pattern-agent',
  'agents/accessibility-agent',
  'agents/research-agent',
] as const

export const SKILLS_ROUTES = ['skills', 'skills/graph', 'skills/assistant', 'skills/usage'] as const

/**
 * One route per designer in `src/design-harness/galleryData.ts` — hand-maintained in
 * sync with that file's `GALLERY_DESIGNERS[].slug`, same convention as
 * `PLAYGROUND_ROUTES` staying in sync with `src/design-harness/pages/`. Each opens
 * that designer's own Team Gallery page instead of everything being inlined
 * on the `gallery` index, same relationship `playground` has to
 * `playground/<slug>`.
 */
export const GALLERY_DESIGNER_ROUTES = ['gallery/abigail', 'gallery/alex', 'gallery/sam'] as const

export type PlaygroundDesignHarnessRoute = (typeof PLAYGROUND_ROUTES)[number]
export type AgentDesignHarnessRoute = (typeof AGENT_ROUTES)[number]
export type SkillsDesignHarnessRoute = (typeof SKILLS_ROUTES)[number]
export type GalleryDesignerDesignHarnessRoute = (typeof GALLERY_DESIGNER_ROUTES)[number]

const GALLERY_DESIGNER_ROUTE_SET = new Set<string>(GALLERY_DESIGNER_ROUTES)

export function isGalleryDesignerRoute(route: string): route is GalleryDesignerDesignHarnessRoute {
  return GALLERY_DESIGNER_ROUTE_SET.has(route)
}

/** Legacy hash paths → canonical Design Harness routes (keep in sync with docs / bookmarks). */
export const LEGACY_ROUTE_MAP: Record<string, string> = {
  foundations: 'design-system/foundations',
  'foundations/colour': 'design-system/colour',
  'foundations/spacing': 'design-system/spacing',
  'foundations/size': 'design-system/size',
  'foundations/radius': 'design-system/radius',
  'foundations/border': 'design-system/border',
  'foundations/font': 'design-system/font',
  'foundations/typography': 'design-system/typography',
  'foundations/scaling': 'design-system/scaling',
  'components/button': 'design-system/button',
  'components/button/primary': 'design-system/button/primary',
  'components/button/secondary': 'design-system/button/secondary',
  'components/button/ghost': 'design-system/button/ghost',
  'components/text': 'design-system/text',
  'components/badge': 'design-system/badge',
  'components/text-field': 'design-system/text-field',
  'components/card': 'design-system/card',
  'components/stack': 'design-system/stack',
  'how-to/setup-mcp': 'how-to/setup-mcp-in-cursor',
  'how-to/custom-mcps': 'how-to/install-custom-mcps',
  'how-to/guides/skills': 'how-to/guides/how-the-harness-works',
  'how-to/guides/designer-onboarding': 'how-to/guides/onboarding',
}

export const STUDIO_OS_ROUTES = [
  'overview',
  'gallery',
  ...GALLERY_DESIGNER_ROUTES,
  'blueprints',
  'design-system/systems',
  'design-system/foundations',
  'design-system/ds-colours',
  'design-system/icons',
  'design-system/images',
  ...BUTTON_ROUTES,
  'design-system/text',
  'design-system/badge',
  'design-system/chip',
  'design-system/controls',
  ...EXTRACTED_COMPONENT_ROUTES,
  'design-system/text-field',
  'design-system/card',
  'design-system/stack',
  'design-system/toast',
  ...AGENT_ROUTES,
  ...SKILLS_ROUTES,
  ...HOWTO_ROUTES,
  'playground',
  ...PLAYGROUND_ROUTES,
  'board',
  'settings',
] as const

/** A project page or screen discovered under `projects/<slug>/` — see `projectsIndex.ts`. */
export type ProjectRoute = `playground/${string}`

export type DesignHarnessRoute =
  | (typeof STUDIO_OS_ROUTES)[number]
  | ProjectRoute
  | FoundationDocRoute
  | HowtoDocRoute
  | ContextDocRoute
  | DesignSystemRoute

const ROUTE_SET = new Set<string>(STUDIO_OS_ROUTES)

/** Routes found from files at build time (foundation specs, how-to articles, harness context). */
function isDiscoveredDocRoute(
  route: string,
): route is FoundationDocRoute | HowtoDocRoute | ContextDocRoute | DesignSystemRoute {
  return isFoundationDocRoute(route) || isHowtoDocRoute(route) || isContextDocRoute(route) || isDesignSystemRoute(route)
}

export function isProjectRoute(route: string): route is ProjectRoute {
  return resolveProjectRoute(route) !== undefined
}

function normalizeHashKey(raw: string): string {
  // Strip a query string appended inside the hash (e.g. `#/playground/x?embed=1`)
  // before matching against the route table — the query belongs to
  // `getDesignHarnessHashQuery`, not the route key.
  const withoutQuery = raw.split('?')[0] ?? raw
  return withoutQuery.replace(/^#\/?/, '').replace(/\/$/, '')
}

export function parseDesignHarnessHash(): DesignHarnessRoute {
  if (typeof window === 'undefined') return 'overview'
  const raw = normalizeHashKey(window.location.hash) || 'overview'
  if (ROUTE_SET.has(raw)) return raw as DesignHarnessRoute
  if (isDiscoveredDocRoute(raw)) return raw
  if (isProjectRoute(raw)) {
    const project = resolveProjectRoute(raw)!.project
    const embedded = getDesignHarnessHashQuery().get('embed') === '1'
    if (raw === project.route && !embedded) {
      window.history.replaceState(null, '', `#/${project.boardRoute}`)
      return project.boardRoute
    }
    return raw
  }
  const mapped = LEGACY_ROUTE_MAP[raw] ?? skillGuideRedirect(raw)
  if (mapped && (ROUTE_SET.has(mapped) || isDiscoveredDocRoute(mapped))) {
    const next = `#/${mapped}`
    if (window.location.hash !== next) {
      window.history.replaceState(null, '', next)
    }
    return mapped as DesignHarnessRoute
  }
  return 'overview'
}

export function setDesignHarnessHash(route: DesignHarnessRoute) {
  window.location.hash = `#/${route}`
}

/**
 * Query params living inside the hash fragment (e.g. `#/playground/x?embed=1`).
 * A hash router's `?...` never reaches `window.location.search`, which only
 * covers the part of the URL before `#` — this is the hash-router equivalent.
 * See `harness/skills/deck-builder/references/live-embed.md` for the `embed`
 * flag this exists for.
 */
export function getDesignHarnessHashQuery(): URLSearchParams {
  if (typeof window === 'undefined') return new URLSearchParams()
  const raw = window.location.hash || ''
  const qIndex = raw.indexOf('?')
  return new URLSearchParams(qIndex >= 0 ? raw.slice(qIndex + 1) : '')
}

/** Updates keys in the hash's query without a hashchange, so the page keeps its state and doesn't re-route. */
export function replaceDesignHarnessHashQuery(params: Record<string, string | null>) {
  const [path] = window.location.hash.split('?')
  const query = getDesignHarnessHashQuery()
  for (const [key, value] of Object.entries(params)) {
    if (value === null) query.delete(key)
    else query.set(key, value)
  }
  const qs = query.toString()
  window.history.replaceState(null, '', `${path}${qs ? `?${qs}` : ''}`)
}
