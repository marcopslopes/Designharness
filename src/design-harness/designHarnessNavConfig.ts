import type { TablerIconComponent } from '../../context/design-system/ds'
import {
  FrameAddCircle,
  FrameArrowUpRight,
  FrameBell,
  FrameBone,
  FrameBolt,
  FrameBook,
  FrameBox,
  FrameBulb,
  FrameCarousel,
  FrameChat,
  FrameChevronRight,
  FrameClipboard,
  FrameChartSquare,
  FrameCheckCircle,
  FrameChecklist,
  FrameCheckSquare,
  FrameCircleDot,
  FrameCode,
  FrameCode2,
  FrameColumns,
  FrameColumns3,
  FrameCursor,
  FrameDanger,
  FrameDocument,
  FrameDownload,
  FrameEye,
  FrameFile,
  FrameFileAdd,
  FrameFilter,
  FrameFineText,
  FrameFolder,
  FrameGallery,
  FrameGift,
  FrameGrid,
  FrameGrip,
  FrameInfo,
  FrameKeyboard,
  FrameLayers,
  FrameLike,
  FrameLink,
  FrameList,
  FrameListDown,
  FrameSlider,
  FrameMaximize,
  FrameMedal,
  FrameMenuDots,
  FrameMenu,
  FrameMonitor,
  FrameNotes,
  FramePalette,
  FramePanelBottom,
  FramePanelLeft,
  FramePanelRight,
  FramePersonCircle,
  FramePlay,
  FrameCursorPointer,
  FramePanelTop,
  FramePhone,
  FramePresentation,
  FrameProgress,
  FrameQuestion,
  FrameRadius,
  FrameRefreshCircle,
  FrameRoundArrow,
  FrameRoute,
  FrameRuler,
  FrameSearch,
  FrameSeparator,
  FrameSettings,
  FrameSidebar,
  FrameSkip,
  FrameSpacing,
  FrameStars,
  FrameStepper,
  FrameStopwatch,
  FrameStructure,
  FrameSubtitles,
  FrameTable,
  FrameTablet,
  FrameTag,
  FrameTarget,
  FrameText,
  FrameTextArea,
  FrameTextField,
  FrameTextLink,
  FrameToggle,
  FrameToolbar,
  FrameTransfer,
  FrameTuning,
  FrameType,
  FrameUser,
  FrameUserRounded,
  FrameWand,
  FrameWidget,
  FrameWidget4,
  FrameWidget3,
  FrameWidgets,
  FrameWide,
  FrameWindow,
} from './harnessIcons'
import { COMPONENT_PAGES } from './componentRoutes'
import { contextDocsOfKind, getContextDoc, isContextDocRoute, type ContextDoc } from './contextDocs'
import {
  DESIGN_SYSTEMS,
  isDesignSystemRoute,
  primarySystemForProject,
  SYSTEM_GROUP_LABEL,
  SYSTEM_GROUPS,
  systemForDesignRoute,
  type DesignSystem,
  type SystemGroup,
} from './designSystems'
import { isFoundationDocRoute } from './foundationDocs'
import {
  GUIDE_TOPICS,
  HOWTO_DOCS,
  HOWTO_GUIDE_ROUTES,
  HOWTO_HARNESS_ROUTES,
  HOWTO_HTML,
  HOWTO_MCP_ROUTES,
  HOWTO_TOPIC_ROUTES,
  isHowtoRoute,
  type HowtoDocRoute,
} from './howtoDocs'
import { sentenceCase } from './projectFacts'
import { skillIcon } from './skillIcons'
import { PLATFORM_ORDER } from './projectFacts'
import { resolveProjectRoute, type Project } from './projectsIndex'
import type { DesignHarnessRoute } from './routes'
import { AGENT_ROUTES, isGalleryDesignerRoute } from './routes'

/** One sidebar link. */
export type NavItem = {
  label: string
  route: DesignHarnessRoute
  icon?: TablerIconComponent
  /** Other routes that should light this item up — platform variants of one prototype. */
  alsoActive?: DesignHarnessRoute[]
}

/** A run of links under an optional heading; `collapsible` headings fold their links away. */
export type NavSection = {
  label?: string
  icon?: TablerIconComponent
  collapsible?: boolean
  searchable?: boolean
  items: NavItem[]
}

/**
 * Five places: **Home** (the logo) · **Prototypes** · **Design system** · **Skills** · **Documentation**.
 * Home and the Prototypes list have no sidebar; a project, the design system, skills, and the
 * documentation each get their own.
 */
export type DesignHarnessSiteArea = 'overview' | 'work' | 'board' | 'design-system' | 'skills' | 'how-to'

export function isNavRouteActive(active: DesignHarnessRoute, target: DesignHarnessRoute): boolean {
  if (active === target) return true
  if (target === 'design-system/button' && active.startsWith('design-system/button/')) return true
  return false
}

/** The rail, below the logo and search. Home is the logo. */
export const STUDIO_OS_TOP_NAV: {
  id: Exclude<DesignHarnessSiteArea, 'overview'>
  label: string
  route: DesignHarnessRoute
}[] = [
  { id: 'work', label: 'Prototypes', route: 'playground' },
  { id: 'board', label: 'Design board', route: 'board' },
  { id: 'design-system', label: 'Design system', route: 'design-system/systems' },
  { id: 'skills', label: 'Skills', route: 'skills' },
  { id: 'how-to', label: 'Documentation', route: 'how-to' },
]

export const STUDIO_OS_AREA_LABEL: Record<DesignHarnessSiteArea, string> = {
  overview: 'Home',
  work: 'Prototypes',
  board: 'Design board',
  'design-system': 'Design system',
  skills: 'Skills',
  'how-to': 'Documentation',
}

const COMPONENT_ITEMS: NavItem[] = COMPONENT_PAGES.map((item) => ({
  ...item,
  route: item.route as DesignHarnessRoute,
  icon: FrameWidgets,
}))

function isComponentRoute(route: DesignHarnessRoute): boolean {
  return COMPONENT_ITEMS.some((item) => isNavRouteActive(route, item.route))
}

/** A skill file or the skills home. Usage lives on the rail, next to Settings. */
function isSkillRoute(route: DesignHarnessRoute): boolean {
  if (route === 'skills/usage') return false
  if (route === 'skills' || route.startsWith('skills/')) return true
  return isContextDocRoute(route) && getContextDoc(route).kind === 'skill'
}

/** Platform, references, agents, and blueprints stay with Documentation. */
function isDocumentationContext(route: DesignHarnessRoute): boolean {
  if (route === 'blueprints' || (AGENT_ROUTES as readonly string[]).includes(route)) return true
  return isContextDocRoute(route) && getContextDoc(route).kind !== 'skill'
}

export function resolveDesignHarnessSiteArea(route: DesignHarnessRoute): DesignHarnessSiteArea {
  if (route === 'overview') return 'overview'
  if (route === 'board') return 'board'
  if (route === 'gallery' || isGalleryDesignerRoute(route)) return 'work'
  if (route === 'playground' || route.startsWith('playground/')) return 'work'
  if (
    route === 'design-system/systems' ||
    isDesignSystemRoute(route) ||
    route === 'design-system/foundations' ||
    route === 'design-system/ds-colours' ||
    route === 'design-system/icons' ||
    route === 'design-system/images' ||
    isFoundationDocRoute(route)
  ) {
    return 'design-system'
  }
  if (isComponentRoute(route)) return 'design-system'
  if (isSkillRoute(route)) return 'skills'
  if (isDocumentationContext(route) || isHowtoRoute(route)) return 'how-to'
  return 'overview'
}

export function isTopNavAreaActive(route: DesignHarnessRoute, area: DesignHarnessSiteArea): boolean {
  return resolveDesignHarnessSiteArea(route) === area
}

const ARTIFACT_ICON = { screen: FrameCode, doc: FrameFile, diagram: FrameStructure } as const

const CASE_STUDY_ICON = { story: FrameFile, slides: FramePresentation, article: FrameDocument } as const

const PRESENTATION_ICON = {
  variants: FrameTuning,
  compare: FrameColumns,
  stage: FrameUser,
  ideas: FrameBulb,
} as const

const PLATFORM_ICON: Record<string, TablerIconComponent> = {
  iOS: FramePhone,
  Mobile: FramePhone,
  Android: FramePhone,
  Desktop: FrameMonitor,
  Tablet: FrameTablet,
}

/** The phone variant is the Mobile system. The sidebar and breadcrumb say Mobile. */
function platformNavLabel(platform?: string): string {
  if (platform === 'iOS') return 'Mobile'
  return platform ?? 'Screen'
}

/**
 * A project's sidebar: an Artifacts list — About this prototype, Project facts, docs and
 * top-level screens — then Present (Variants, Compare, Stage, Ideas), then Case study (the story, its slide deck,
 * its article), then one section per `screens/<folder>/` (e.g. Desktop, Mobile), then States.
 */
function byPlatform<T extends { platform?: string }>(items: T[]): T[] {
  const rank = (platform?: string) => {
    const at = PLATFORM_ORDER.indexOf(platform ?? '')
    return at < 0 ? PLATFORM_ORDER.length : at
  }
  return [...items].sort((a, b) => rank(a.platform) - rank(b.platform))
}

/**
 * One sidebar row per screen. A prototype on two platforms lists Mobile and
 * Desktop as their own rows, each with its device icon — no extra name row.
 */
function listedScreens(
  screens: Project['screens'],
): { screen: Project['screens'][number]; label: string; platforms?: Project['screens'] }[] {
  const seen = new Set<string>()
  const listed: { screen: Project['screens'][number]; label: string; platforms?: Project['screens'] }[] = []
  for (const screen of screens) {
    if (!screen.platformBase) {
      listed.push({ screen, label: screen.label })
      continue
    }
    if (seen.has(screen.platformBase)) continue
    seen.add(screen.platformBase)
    const group = byPlatform(screens.filter((other) => other.platformBase === screen.platformBase))
    const folders = new Set(group.map((other) => other.folder))
    const lead = group[0]
    listed.push({
      screen: { ...lead, folder: folders.size === 1 ? lead.folder : undefined },
      label: screen.platformBase,
      platforms: group.length > 1 ? group : undefined,
    })
  }
  return listed
}

/** Platforms of the prototype open on this route, in switch order. Empty when it has only one. */
export function platformSwitch(
  project: Project,
  route: string,
):
  | { base: string; options: { label: string; route: Project['screens'][number]['route']; current: boolean }[] }
  | undefined {
  const screen = project.screens.find((item) => item.route === route)
  if (!screen?.platformBase) return undefined
  const options = byPlatform(project.screens.filter((item) => item.platformBase === screen.platformBase))
  if (options.length < 2) return undefined
  return {
    base: screen.platformBase,
    options: options.map((item) => ({
      label: platformNavLabel(item.platform),
      route: item.route,
      current: item.route === route,
    })),
  }
}

/** The sidebar's sections and artifacts, minus the board itself and screen states — one board row each. */
export function projectArtifactSections(
  project: Project,
): { label: string; items: { label: string; route: DesignHarnessRoute }[] }[] {
  return projectSections(project)
    .filter((section) => section.label !== 'States')
    .map((section) => ({
      label: section.label ?? project.title,
      items: section.items
        .filter((item) => item.route !== project.boardRoute)
        .map((item) => ({ label: item.label, route: item.route })),
    }))
    .filter((section) => section.items.length)
}

function projectSections(project: Project): NavSection[] {
  const docs = project.docs.map((doc): NavItem => ({
    label: doc.label,
    route: doc.route,
    icon: doc.kind === 'mermaid' ? ARTIFACT_ICON.diagram : ARTIFACT_ICON.doc,
  }))
  const screens = listedScreens(project.screens)
  const screenItems = (entry: (typeof screens)[number]): NavItem[] =>
    entry.platforms
      ? entry.platforms.map((platform) => ({
          label: platformNavLabel(platform.platform),
          route: platform.route,
          icon: (platform.platform && PLATFORM_ICON[platform.platform]) || ARTIFACT_ICON.screen,
        }))
      : [
          {
            label: entry.label,
            route: entry.screen.route,
            icon: ARTIFACT_ICON.screen,
          },
        ]
  const storyboardItem = (s: Project['storyboards'][number]): NavItem => ({
    label: s.label,
    route: s.route,
    icon: FramePresentation,
  })
  const folders = [
    ...new Set(
      [...screens.map((entry) => entry.screen), ...project.storyboards].flatMap((s) => (s.folder ? [s.folder] : [])),
    ),
  ].sort()
  return [
    {
      label: 'Artifacts',
      items: [
        { label: 'About this prototype', route: project.route, icon: FrameFile },
        { label: 'Project facts', route: project.factsRoute, icon: FrameList },
        ...(project.decisions ? [{ label: 'Decisions', route: project.decisionsRoute, icon: FrameRoute }] : []),
        ...docs,
        ...screens.filter((entry) => !entry.screen.folder).flatMap(screenItems),
        ...project.storyboards.filter((s) => !s.folder).map(storyboardItem),
      ],
    },
    ...(project.presentations.length
      ? [
          {
            label: 'Present',
            items: project.presentations.map((p): NavItem => ({
              label: p.label,
              route: p.route,
              icon: PRESENTATION_ICON[p.kind],
            })),
          },
        ]
      : []),
    ...(project.caseStudyPages.length
      ? [
          {
            label: 'Case study',
            items: project.caseStudyPages.map((p): NavItem => ({
              label: p.label,
              route: p.route,
              icon: CASE_STUDY_ICON[p.kind],
            })),
          },
        ]
      : []),
    ...(project.reports.length
      ? [
          {
            label: 'Reviews',
            items: project.reports.map((p): NavItem => ({ label: p.label, route: p.route, icon: FrameChecklist })),
          },
        ]
      : []),
    ...folders.map((folder): NavSection => ({
      label: sentenceCase(folder.split('-')),
      items: [
        ...screens.filter((entry) => entry.screen.folder === folder).flatMap(screenItems),
        ...project.storyboards.filter((s) => s.folder === folder).map(storyboardItem),
      ],
    })),
    ...(project.states.length
      ? [
          {
            label: 'States',
            items: project.states.map((s): NavItem => ({ label: s.label, route: s.route, icon: FrameCode2 })),
          },
        ]
      : []),
  ]
}

const FOUNDATION_ICON: Record<string, TablerIconComponent> = {
  colour: FramePalette,
  spacing: FrameSpacing,
  size: FrameRuler,
  radius: FrameRadius,
  border: FrameGrid,
  font: FrameText,
  typography: FrameType,
  scaling: FrameMaximize,
  motion: FramePlay,
}

const SYSTEMS_INDEX_SECTIONS: NavSection[] = [
  {
    label: 'Systems',
    items: [
      { label: 'All systems', route: 'design-system/systems', icon: FrameWidget },
      ...DESIGN_SYSTEMS.map((system): NavItem => ({ label: system.name, route: system.route, icon: FrameWidgets })),
    ],
  },
]

const GROUP_ICON: Record<SystemGroup, TablerIconComponent> = {
  context: FrameFile,
  skills: FrameWand,
  theme: FramePalette,
  assets: FrameGallery,
  book: FrameBook,
  ai: FrameStars,
  components: FrameWidgets,
}

/** Solar line-duotone glyph for a component row, matched to the label. */
const COMPONENT_ICON: Record<string, TablerIconComponent> = {
  'Action grid': FrameWidget4,
  Activity: FrameRoute,
  Alert: FrameDanger,
  Avatar: FrameUserRounded,
  Badge: FrameMedal,
  'Browser frame': FrameWindow,
  Button: FrameCursor,
  Card: FrameNotes,
  Checkbox: FrameCheckSquare,
  Chip: FrameTag,
  Coachmark: FrameTarget,
  'Context menu': FrameMenuDots,
  Conversation: FrameChat,
  'Conversation screen': FrameLayers,
  Controls: FrameTuning,
  'Count down': FrameStopwatch,
  'Data table': FrameTable,
  'Drag handle': FrameGrip,
  'Empty state': FrameBox,
  'Empty screen': FrameMaximize,
  Fab: FrameAddCircle,
  'Filter bar': FrameFilter,
  Header: FramePanelTop,
  Hint: FrameInfo,
  'List item': FrameList,
  Loader: FrameRefreshCircle,
  Message: FrameChat,
  'Page header': FrameDocument,
  Pagination: FrameTransfer,
  'Phone frame': FramePhone,
  'Progress bar': FrameProgress,
  'Prompt input': FrameKeyboard,
  'Promo card': FrameGift,
  Radio: FrameCircleDot,
  Reasoning: FrameBulb,
  Response: FrameText,
  Result: FrameGallery,
  'Segmented control': FrameColumns3,
  Selector: FrameListDown,
  Separator: FrameSeparator,
  'Settings row': FrameSettings,
  'Setup checklist': FrameChecklist,
  Sheet: FramePanelBottom,
  'Sheet screen': FrameLayers,
  'Side panel': FramePanelRight,
  Skeleton: FrameBone,
  Slider: FrameSlider,
  Sources: FrameLink,
  Stack: FrameLayers,
  Stepper: FrameStepper,
  Stat: FrameChartSquare,
  Status: FrameCheckCircle,
  Swiper: FrameCarousel,
  'Tab bar': FrameWidget3,
  Tabs: FrameFolder,
  'This or that': FrameColumns,
  Text: FrameText,
  'Text field': FrameTextField,
  Toast: FrameBell,
  Toggle: FrameToggle,
  'Tool call': FrameBolt,
  Toolbar: FrameToolbar,
  Tooltip: FrameQuestion,
  Working: FrameRefreshCircle,
  'Icon button': FrameCursorPointer,
  'Arrow button': FrameRoundArrow,
  'Menu button': FrameMenu,
  Field: FrameTextField,
  'Field action link': FrameLink,
  Select: FrameListDown,
  Textarea: FrameTextArea,
  'File picker': FrameFileAdd,
  'Toggle row': FrameList,
  'Text link': FrameTextLink,
  'Fine print': FrameFineText,
  Callout: FrameChat,
  'Skip link': FrameSkip,
  Rail: FramePanelLeft,
  Sidebar: FrameSidebar,
  'Section nav': FrameStructure,
  'Mobile bar': FramePhone,
  'Command search': FrameKeyboard,
  'Intro tour': FramePlay,
  'Doc page layout': FrameColumns,
  'Table of contents': FrameClipboard,
  Breadcrumb: FrameChevronRight,
  Kicker: FrameSubtitles,
  'Doc actions': FrameDownload,
  'Previous and next': FrameTransfer,
  'Page feedback': FrameLike,
  'Placeholder page': FrameBox,
  Markdown: FrameCode,
  'Doc table': FrameTable,
  'Diagram frame': FramePresentation,
  'Screen embed': FrameMonitor,
  'Demo stage': FrameEye,
  Band: FrameWide,
  'CTA card': FrameArrowUpRight,
  'Home search': FrameSearch,
  'Help card': FrameQuestion,
  'Project card': FrameWidget,
  'Skill card': FrameWand,
  'Summary tiles': FrameGrid,
  'Showcase cards': FrameGallery,
  'Project facts': FrameFile,
  'Designer avatar': FramePersonCircle,
  'Setting row': FrameSettings,
  'Settings section': FrameLayers,
  'Fact list': FrameChecklist,
}

const ASSET_ICON: Record<string, TablerIconComponent> = {
  font: FrameType,
  fonts: FrameType,
  icons: FrameWidgets,
  images: FrameGallery,
  logo: FrameWidget,
}

/** Sidebar glyph for one system item. Components and assets match the label; theme pages keep their foundation glyph. */
export function iconForSystemItem(group: SystemGroup, label: string, target?: string): TablerIconComponent {
  if ((group === 'components' || group === 'ai') && COMPONENT_ICON[label]) return COMPONENT_ICON[label]
  if (group === 'assets' && ASSET_ICON[label.toLowerCase()]) return ASSET_ICON[label.toLowerCase()]
  const foundation = target && FOUNDATION_ICON[target.replace('design-system/', '')]
  return foundation || GROUP_ICON[group]
}

/** A system's sidebar: overview, then its context, skills, theme, assets, brand book, AI, and components. */
function systemSections(system: DesignSystem): NavSection[] {
  const sections: NavSection[] = [
    {
      items: [
        { label: 'All systems', route: 'design-system/systems', icon: FrameWidget },
        { label: 'Overview', route: system.route, icon: FrameInfo },
      ],
    },
    ...SYSTEM_GROUPS.map((group): NavSection => ({
      label: SYSTEM_GROUP_LABEL[group],
      collapsible: true,
      items: system.items[group].map((item) => {
        const target = item.status === 'page' ? item.target : undefined
        return {
          label: item.label,
          route: (target ?? item.route) as DesignHarnessRoute,
          icon: iconForSystemItem(group, item.label, target),
        }
      }),
    })),
  ]
  return sections.filter((section) => section.items.length > 0)
}

const howtoItem = (route: HowtoDocRoute): NavItem => ({ label: HOWTO_DOCS[route].label, route })

/** Start here stays open; every other topic folds, and opens itself when one of its pages is showing. */
export const MANUAL_SECTIONS: NavSection[] = (
  [
    {
      label: 'Start here',
      items: [
        { label: 'Overview', route: 'how-to' },
        ...HOWTO_HARNESS_ROUTES.map((r): NavItem => ({ label: HOWTO_HTML[r].label, route: r })),
        ...HOWTO_TOPIC_ROUTES['Start here'].map(howtoItem),
      ],
    },
    ...GUIDE_TOPICS.filter((topic) => topic !== 'Start here').flatMap((topic): NavSection[] =>
      topic === 'Harness internals'
        ? [
            {
              label: 'Connect your tools',
              collapsible: true,
              items: [...HOWTO_GUIDE_ROUTES, ...HOWTO_MCP_ROUTES].map(howtoItem),
            },
            { label: topic, collapsible: true, items: HOWTO_TOPIC_ROUTES[topic].map(howtoItem) },
          ]
        : [{ label: topic, collapsible: true, items: HOWTO_TOPIC_ROUTES[topic].map(howtoItem) }],
    ),
  ] satisfies NavSection[]
).filter((section) => section.items.length > 0)

export const MANUAL_COLLAPSIBLE_LABELS = MANUAL_SECTIONS.filter((s) => s.collapsible).map((s) => s.label ?? '')

const fileItem = (label: string, route: DesignHarnessRoute): NavItem => ({ label, route, icon: FrameFile })
const contextItem = (doc: ContextDoc): NavItem => ({
  label: doc.label,
  route: doc.route,
  icon:
    doc.kind === 'skill'
      ? skillIcon(doc.route.replace('context/skills/', ''))
      : doc.path.endsWith('SKILL.md')
        ? FrameWand
        : FrameFile,
})

/** Skills sidebar, same shape as the manual topics. A skill not listed lands in Product. */
const SKILL_MENU = {
  Craft: [
    'accessibility',
    'accessibility-decisions',
    'adaptive-interfaces',
    'audit',
    'cognitive-accessibility',
    'content',
    'design-system',
    'figma-asset-sync',
    'figma-code-sync',
    'figma-effects-catalog',
    'figma-library-manager',
    'figma-token-sync',
    'icon-usage',
    'interaction-design',
    'interface-change-review',
    'mobile-shell',
    'motion-choreography',
    'responsive-patterns',
    'taste-feedback',
  ],
  Product: [
    'assumption-mapper',
    'benchmark',
    'case-study',
    'competitor-scan',
    'conceptual-model',
    'docs-brief',
    'critique-prep',
    'decision-first-research',
    'deck-builder',
    'design-debt-tracker',
    'design-handoff',
    'design-kickoff',
    'design-rationale',
    'design-retrospective',
    'diagnostic',
    'figma-ux-audit',
    'ia-methods',
    'insight-writer',
    'inspiration-scouting',
    'live-page-review',
    'okr-goal-setting',
    'presenter',
    'product-strategy',
    'research-agent',
    'research-artifacts',
    'research-question-sharpener',
    'research-shareout',
    'research-summary',
    'research-synthesis',
    'review-report',
    'roadmap-prioritization',
    'screener-builder',
    'stakeholder-alignment',
    'synthetic-user-testing',
    'ticket-create',
    'ui-agent',
    'usability-test-guide',
    'ux-pattern',
    'workshop-whiteboard',
    'writing',
  ],
  Harness: [
    'designer-workload',
    'harness-setup',
    'manager-1on1-prep',
    'org-pack-builder',
    'people-coaching',
    'publish-project',
    'scheduling',
    'session-handoff',
    'session-journal',
    'workload-agent',
  ],
} as const

const SKILL_MENU_ORDER = ['Craft', 'Product', 'Harness'] as const

export const SKILL_GROUP_ORDER = SKILL_MENU_ORDER
export type SkillGroup = (typeof SKILL_GROUP_ORDER)[number]

/** Craft, Product, or Harness. A skill that isn't listed lands in Product. */
export function skillGroupForRoute(route: string): SkillGroup {
  const slug = route.replace('context/skills/', '')
  if ((SKILL_MENU.Craft as readonly string[]).includes(slug)) return 'Craft'
  if ((SKILL_MENU.Harness as readonly string[]).includes(slug)) return 'Harness'
  return 'Product'
}

const SKILL_GROUP_ICON: Record<SkillGroup, TablerIconComponent> = {
  Craft: FramePalette,
  Product: FrameTarget,
  Harness: FrameSettings,
}

function skillMenuSections(): NavSection[] {
  const skills = contextDocsOfKind('skill')
  return SKILL_MENU_ORDER.map((label) => ({
    label,
    icon: SKILL_GROUP_ICON[label],
    collapsible: true,
    items: skills.filter((doc) => skillGroupForRoute(doc.route) === label).map(contextItem),
  }))
}

/** Platform, references, and agents stay in Documentation, after the manual. */
function documentationContextSections(): NavSection[] {
  return [
    { label: 'Platform', collapsible: true, items: contextDocsOfKind('platform').map(contextItem) },
    { label: 'References', collapsible: true, items: contextDocsOfKind('reference').map(contextItem) },
    {
      label: 'Agents',
      collapsible: true,
      items: [
        ...contextDocsOfKind('agent').map(contextItem),
        fileItem('UI agent', 'agents/ui-agent'),
        fileItem('Content agent', 'agents/content-agent'),
        fileItem('UX pattern agent', 'agents/ux-pattern-agent'),
        fileItem('Accessibility agent', 'agents/accessibility-agent'),
        fileItem('Research agent', 'agents/research-agent'),
      ],
    },
    { items: [fileItem('Blueprints', 'blueprints')] },
  ]
}

/** Skills sidebar: the catalog, then the three groups. Usage is a rail icon. */
function skillSections(): NavSection[] {
  return [{ items: [{ label: 'All skills', route: 'skills', icon: FrameWand }] }, ...skillMenuSections()]
}

/** Kept so older callers still type-check. The sidebar no longer has tabs. */
export type SectionNavTab = { label: string; route: DesignHarnessRoute; active: boolean }

export function getSectionNavTabs(
  _area: DesignHarnessSiteArea,
  _route: DesignHarnessRoute,
): SectionNavTab[] | undefined {
  return undefined
}

export function getSectionNavSections(area: DesignHarnessSiteArea, route?: DesignHarnessRoute): NavSection[] {
  if (route && resolveProjectRoute(route)) return []
  switch (area) {
    case 'overview':
    case 'work':
    case 'board':
      return []
    case 'design-system': {
      const system = route ? systemForDesignRoute(route) : undefined
      return system ? systemSections(system) : SYSTEMS_INDEX_SECTIONS
    }
    case 'skills':
      return skillSections()
    case 'how-to':
      return [...MANUAL_SECTIONS, ...documentationContextSections()]
    default: {
      const _exhaustive: never = area
      return _exhaustive
    }
  }
}

/** Every link in a set of sections, in order. */
export const sectionItems = (sections: NavSection[]): NavItem[] => sections.flatMap((section) => section.items)

/** Sidebar heading — the project's name inside a project, otherwise the place's name. */
export function getSectionNavTitle(area: DesignHarnessSiteArea, route?: DesignHarnessRoute): string {
  const project = route ? resolveProjectRoute(route)?.project : undefined
  if (project) return project.title
  if (area === 'design-system' && route) return systemForDesignRoute(route)?.name ?? 'Systems'
  return STUDIO_OS_AREA_LABEL[area]
}

/** Under a project's name: the design system it's built with, as a link. */
export function getSectionNavContext(
  route: DesignHarnessRoute,
): { prefix: string; label: string; route: DesignHarnessRoute } | undefined {
  const project = resolveProjectRoute(route)?.project
  if (!project) return undefined
  const system = primarySystemForProject(project)
  return system
    ? { prefix: 'System', label: system.name, route: system.route }
    : { prefix: 'System', label: 'Design system', route: 'design-system/systems' }
}
