import type { TablerIconComponent } from '../../context/design-system/ds'
import { FrameBook, FrameChartSquare, FrameSettings, FrameWand, FrameWidget, FrameWidgets } from './harnessIcons'
import { DESIGN_SYSTEMS, SYSTEM_GROUPS, SYSTEM_GROUP_LABEL } from './designSystems'
import { PROJECTS } from './projectsIndex'
import type { DesignHarnessRoute } from './routes'
import { getSectionNavSections, iconForSystemItem, type NavSection } from './designHarnessNavConfig'

/** One searchable page — the home search and command search both read this list. */
export type SearchRow = {
  label: string
  /** Where it lives, outermost first: Studio › Components. */
  path: string[]
  route: DesignHarnessRoute
  icon: TablerIconComponent
}

const fromSections = (
  area: string,
  sections: NavSection[],
  icon: TablerIconComponent,
  preferItemIcon = false,
): SearchRow[] =>
  sections.flatMap((section) =>
    section.items.map((item) => ({
      label: item.label,
      path: section.label ? [area, section.label] : [area],
      route: item.route,
      icon: preferItemIcon && item.icon ? item.icon : icon,
    })),
  )

const ROWS: SearchRow[] = [
  ...PROJECTS.map((project) => ({
    label: project.title,
    path: project.ownership.designer ? ['Prototypes', project.ownership.designer] : ['Prototypes'],
    route: project.route,
    icon: FrameWidget,
  })),
  ...DESIGN_SYSTEMS.flatMap((system): SearchRow[] => [
    { label: system.name, path: ['Systems'], route: system.route, icon: FrameWidgets },
    ...SYSTEM_GROUPS.filter((group) => group !== 'context' && group !== 'skills').flatMap((group) =>
      system.items[group].map((item) => ({
        label: item.label,
        path: [system.name, SYSTEM_GROUP_LABEL[group]],
        route: ((item.status === 'page' && item.target) || item.route) as DesignHarnessRoute,
        icon: iconForSystemItem(group, item.label, item.target),
      })),
    ),
  ]),
  ...fromSections('Documentation', getSectionNavSections('how-to', 'how-to'), FrameBook),
  ...fromSections('Skills', getSectionNavSections('skills', 'skills'), FrameWand, true),
  { label: 'Usage dashboard', path: ['Studio'], route: 'skills/usage', icon: FrameChartSquare },
  ...(import.meta.env.DEV
    ? [{ label: 'Settings', path: ['Studio'], route: 'settings' as DesignHarnessRoute, icon: FrameSettings }]
    : []),
]

/** First row per route wins, so a page listed in two places shows once. */
export const SEARCH_ROWS: SearchRow[] = ROWS.filter(
  (row, index) => ROWS.findIndex((other) => other.route === row.route) === index,
)

/** Rows whose name contains every word of the query, names that start with it first. */
export function searchStudio(query: string, limit = 20): SearchRow[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const first = words.join(' ')
  return SEARCH_ROWS.filter((row) => words.every((word) => row.label.toLowerCase().includes(word)))
    .sort((a, b) => Number(!a.label.toLowerCase().startsWith(first)) - Number(!b.label.toLowerCase().startsWith(first)))
    .slice(0, limit)
}
