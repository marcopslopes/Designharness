/**
 * Foundation spec docs — every `context/design-system/FIGMA-FOUNDATIONS-<NAME>.md`
 * becomes `#/design-system/<name>`, labelled from the file name. Drop a new
 * file in and it appears in the sidebar and on the Foundations page.
 */
const sources = import.meta.glob<string>('../../context/design-system/FIGMA-FOUNDATIONS-*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Sidebar order for the original set; files not listed here follow alphabetically. */
const PREFERRED_ORDER = [
  'colour',
  'spacing',
  'size',
  'radius',
  'border',
  'font',
  'typography',
  'scaling',
  'shadows',
  'motion',
  'effects',
]

/** Branded so a failed `isFoundationDocRoute` check doesn't rule out other `design-system/*` pages. */
export type FoundationDocRoute = `design-system/${string}` & { readonly __kind: 'foundation-doc' }

type FoundationDoc = { label: string; source: string }

function rank(name: string): number {
  const i = PREFERRED_ORDER.indexOf(name)
  return i === -1 ? PREFERRED_ORDER.length : i
}

const entries = Object.entries(sources)
  .map(([path, source]) => {
    const name = (path.match(/FIGMA-FOUNDATIONS-(.+)\.md$/)?.[1] ?? '').toLowerCase()
    return { name, source }
  })
  .filter((e) => e.name)
  .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name))

export const FOUNDATION_ROUTES: FoundationDocRoute[] = entries.map(
  (e) => `design-system/${e.name}` as FoundationDocRoute,
)

export const FOUNDATION_DOCS: Record<FoundationDocRoute, FoundationDoc> = Object.fromEntries(
  entries.map((e) => [
    `design-system/${e.name}`,
    { label: e.name.charAt(0).toUpperCase() + e.name.slice(1), source: e.source },
  ]),
)

const ROUTE_SET = new Set<string>(FOUNDATION_ROUTES)

export function isFoundationDocRoute(route: string): route is FoundationDocRoute {
  return ROUTE_SET.has(route)
}
