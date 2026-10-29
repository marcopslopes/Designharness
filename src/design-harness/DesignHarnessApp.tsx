import { Suspense, useCallback, useEffect, useState, type ComponentType } from 'react'
import { isFoundationDocRoute } from './foundationDocs'
import { isHowtoDocRoute, isHowtoHtmlRoute } from './howtoDocs'
import {
  getSectionNavContext,
  getSectionNavSections,
  getSectionNavTabs,
  getSectionNavTitle,
  platformSwitch,
  STUDIO_OS_AREA_LABEL,
  resolveDesignHarnessSiteArea,
} from './designHarnessNavConfig'
import type { DesignHarnessRoute } from './routes'
import {
  getDesignHarnessHashQuery,
  isGalleryDesignerRoute,
  isProjectRoute,
  parseDesignHarnessHash,
  setDesignHarnessHash,
} from './routes'
import { resolveProjectRoute } from './projectsIndex'
import { ProjectCaseStudyPageView, ProjectDocPage, ProjectFactsPage } from './pages/ProjectDocPage'
import { StoryboardPage } from './pages/StoryboardPage'
import { ComparePage, IdeasPage, StagePage, VariantsPage } from './pages/PresentationPages'
import { RESERVED_HASH_KEYS } from './presentation'
import { ProjectPage } from './pages/ProjectPage'
import { OverviewPage } from './pages/OverviewPage'
import { CommandSearch } from './components/CommandSearch'
import { Button, Segmented } from './ui'
import { TruthLayer } from './components/TruthLayer'
import { HarnessIntro } from './components/HarnessIntro'
import { hasSeenHarnessIntro } from './harnessIntro'
import { TeamGalleryPage } from './pages/TeamGalleryPage'
import { GalleryDesignerPage } from './pages/GalleryDesignerPage'
import { FoundationsPage } from './pages/FoundationsPage'
import { DsColoursPage } from './pages/DsColoursPage'
import { FoundationRoutePage } from './pages/foundationRoute'
import { ButtonHubPage } from './pages/ButtonHubPage'
import { ButtonFabPage } from './pages/ButtonFabPage'
import { ButtonBrandsPage } from './pages/ButtonBrandsPage'
import { ButtonSpecialPage } from './pages/ButtonSpecialPage'
import { ButtonPrimaryPage } from './pages/ButtonPrimaryPage'
import { ButtonSecondaryPage } from './pages/ButtonSecondaryPage'
import { ButtonGhostPage } from './pages/ButtonGhostPage'
import { IconsPage, ImagesPage } from './pages/AssetPages'
import { ChipPage } from './pages/ChipPage'
import { ControlsPage } from './pages/ControlsPage'
import { TextPage } from './pages/TextPage'
import { BadgePage } from './pages/BadgePage'
import { TextFieldPage } from './pages/TextFieldPage'
import { CardPage } from './pages/CardPage'
import { StackPage } from './pages/StackPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { DesignHarnessLabPlaceholderPage } from './pages/DesignHarnessLabPlaceholderPage'
import { AgentPage } from './pages/AgentPage'
import { SkillsGraphPage } from './pages/SkillsGraphPage'
import { SkillsHomePage } from './pages/SkillsHomePage'
import { SkillsAssistantPage } from './pages/SkillsAssistantPage'
import { SkillsUsagePage } from './pages/SkillsUsagePage'
import { HowToHubPage } from './pages/HowToHubPage'
import { HowToDocPage } from './pages/HowToDocPage'
import { HowToHtmlPage } from './pages/HowToHtmlPage'
import { SystemMapPage } from './pages/SystemMapPage'
import { ContextDocPage } from './pages/ContextDocPage'
import { isContextDocRoute } from './contextDocs'
import { isExtractedComponentRoute } from './componentRoutes'
import { isDesignSystemRoute, resolveDesignSystemRoute } from './designSystems'
import { ExtractedComponentPage } from './pages/extractedComponentPages'
import { SystemItemPage, SystemPage, SystemsPage } from './pages/SystemsPage'
import { BlueprintsPage } from './pages/BlueprintsPage'
import { SettingsPage } from './pages/SettingsPage'
import { BoardPage } from './board/BoardPage'
import { HARNESS_CONFIG } from './harnessSettings'

import '@fontsource-variable/geist/wght.css'
import '../design-harness.css'
import './styles/skills-ui.css'
import { MobileBar, Rail, Sidebar, SkipLink } from './components/Shell'

const STUDIO_OS_THEME_KEY = 'design-harness-theme'
const STUDIO_OS_SIDEBAR_KEY = 'design-harness-sidebar-collapsed'

export type DesignHarnessTheme = 'light' | 'dark'

function readStoredTheme(): DesignHarnessTheme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const v = window.localStorage.getItem(STUDIO_OS_THEME_KEY)
    if (v === 'dark' || v === 'light') return v
  } catch {
    /* ignore */
  }
  // Default from Settings → Harness; ignore OS preference until the user toggles.
  return HARNESS_CONFIG.harness.defaultTheme
}

function readStoredSidebarCollapsed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STUDIO_OS_SIDEBAR_KEY) === '1'
  } catch {
    return false
  }
}

const MOBILE_SHELL_MQ = '(max-width: 899px)'

function useMobileShell(): boolean {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(MOBILE_SHELL_MQ).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_SHELL_MQ)
    const onChange = () => setMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return mobile
}

function renderPage(route: DesignHarnessRoute, isEmbed: boolean) {
  if (isFoundationDocRoute(route)) return <FoundationRoutePage route={route} />
  if (isContextDocRoute(route)) {
    return <ContextDocPage route={route} />
  }
  if (isDesignSystemRoute(route)) {
    const { system, item } = resolveDesignSystemRoute(route)
    return item ? <SystemItemPage system={system} item={item} /> : <SystemPage system={system} />
  }
  if (route === 'how-to') {
    return <HowToHubPage />
  }
  if (route === 'how-to/harness-system-map') {
    return <SystemMapPage />
  }
  if (isHowtoHtmlRoute(route)) {
    return <HowToHtmlPage route={route} />
  }
  if (isHowtoDocRoute(route)) {
    return <HowToDocPage route={route} />
  }
  if (isGalleryDesignerRoute(route)) {
    return <GalleryDesignerPage route={route} />
  }
  if (isProjectRoute(route)) {
    const { project, screen, doc, facts, board, storyboard, presentation, caseStudyPage } = resolveProjectRoute(route)!
    if (board) return <BoardPage key={project.slug} project={project} />
    if (doc) return <ProjectDocPage project={project} doc={doc} />
    if (caseStudyPage) return <ProjectCaseStudyPageView project={project} page={caseStudyPage} />
    if (storyboard) return <StoryboardPage project={project} entry={storyboard} />
    if (presentation?.kind === 'variants') return <VariantsPage project={project} entry={presentation} />
    if (presentation?.kind === 'compare') return <ComparePage project={project} entry={presentation} />
    if (presentation?.kind === 'stage') return <StagePage project={project} entry={presentation} />
    if (presentation?.kind === 'ideas') return <IdeasPage project={project} entry={presentation} />
    if (facts) return <ProjectFactsPage project={project} />
    if (!screen) return <ProjectPage project={project} />
    const ProjectScreen = screen.Component as ComponentType<Record<string, string>>
    const screenView = (
      <Suspense fallback={null}>
        <ProjectScreen {...screenPropsFromHash()} />
      </Suspense>
    )
    const platforms = isEmbed ? undefined : platformSwitch(project, screen.route)
    if (!platforms) {
      return <TruthLayer brief={project.brief}>{screenView}</TruthLayer>
    }
    return (
      <div className="design-harness-proto-switch">
        <div className="design-harness-proto-switch__bar">
          <Segmented
            label="Platform"
            value={platforms.options.find((option) => option.current)?.route ?? platforms.options[0].route}
            options={platforms.options.map((option) => ({ value: option.route, label: option.label }))}
            onChange={(next) => setDesignHarnessHash(next)}
          />
          <Button
            intent="ghost"
            size="sm"
            onClick={() =>
              window.open(
                `${window.location.pathname}${window.location.search}${previewHash(screen.route)}`,
                '_blank',
                'noreferrer',
              )
            }
          >
            Preview
          </Button>
        </div>
        <TruthLayer brief={project.brief} framed>
          <div
            className="design-harness-proto-switch__stage design-harness-proto-surface"
            data-theme="light"
            data-color-scheme="light"
          >
            {screenView}
          </div>
        </TruthLayer>
      </div>
    )
  }
  if (isExtractedComponentRoute(route)) return <ExtractedComponentPage route={route} />
  switch (route) {
    case 'overview':
      return <OverviewPage />
    case 'gallery':
      return <TeamGalleryPage />
    case 'blueprints':
      return <BlueprintsPage />
    case 'design-system/systems':
      return <SystemsPage />
    case 'design-system/foundations':
      return <FoundationsPage />
    case 'design-system/ds-colours':
      return <DsColoursPage />
    case 'design-system/button':
      return <ButtonHubPage />
    case 'design-system/button/primary':
      return <ButtonPrimaryPage />
    case 'design-system/button/secondary':
      return <ButtonSecondaryPage />
    case 'design-system/button/ghost':
      return <ButtonGhostPage />
    case 'design-system/button/fab':
      return <ButtonFabPage />
    case 'design-system/button/brands':
      return <ButtonBrandsPage />
    case 'design-system/button/special':
      return <ButtonSpecialPage />
    case 'design-system/text':
      return <TextPage />
    case 'design-system/badge':
      return <BadgePage />
    case 'design-system/icons':
      return <IconsPage />
    case 'design-system/images':
      return <ImagesPage />
    case 'design-system/chip':
      return <ChipPage />
    case 'design-system/controls':
      return <ControlsPage />
    case 'design-system/text-field':
      return <TextFieldPage />
    case 'design-system/card':
      return <CardPage />
    case 'design-system/stack':
      return <StackPage />
    case 'design-system/toast':
      return (
        <DesignHarnessLabPlaceholderPage
          eyebrow="Components"
          title="Toast"
          status="coming-soon"
          description="Design Harness page for the Toast primitive (Alerts & Toast in Northline Design System) is not built yet. Until then, use `context/design-system/FIGMA-DESIGN-SYSTEM-TOAST.md` as the contract; the component already ships from `context/design-system/ds` for prototypes."
        />
      )
    case 'agents/ui-agent':
    case 'agents/content-agent':
    case 'agents/ux-pattern-agent':
    case 'agents/accessibility-agent':
    case 'agents/research-agent':
      return <AgentPage route={route} />
    case 'skills':
      return <SkillsHomePage />
    case 'skills/graph':
      return <SkillsGraphPage />
    case 'skills/assistant':
      return <SkillsAssistantPage />
    case 'skills/usage':
      return <SkillsUsagePage />
    case 'playground':
      return <PlaygroundPage />
    case 'board':
      return <BoardPage />
    case 'settings':
      return <SettingsPage />
    default: {
      const _exhaustive: never = route
      return _exhaustive
    }
  }
}

/** A screen's URL options (`?status=paused`) become its string props, so presentations can set them. */
/** Same screen, no lab chrome. Keeps state props such as `status=paused`. */
function previewHash(route: string): string {
  const query = new URLSearchParams(getDesignHarnessHashQuery())
  query.set('embed', '1')
  return `#/${route}?${query.toString()}`
}

function screenPropsFromHash(): Record<string, string> {
  const props: Record<string, string> = {}
  for (const [key, value] of getDesignHarnessHashQuery()) {
    if (!RESERVED_HASH_KEYS.has(key)) props[key] = value
  }
  return props
}

function isPrototypeRoute(route: DesignHarnessRoute): boolean {
  const resolved = resolveProjectRoute(route)
  if (resolved) return resolved.screen !== undefined
  return route.startsWith('playground/')
}

/**
 * `?embed=1` strips all Design Harness chrome (mobile bar, sidebar nav) so a
 * prototype route can be dropped into an `<iframe>` — e.g. a `deck-builder`
 * slide — and show only the prototype itself. Additive: every existing
 * route gets it for free, no per-prototype changes. See
 * `harness/skills/deck-builder/references/live-embed.md`.
 *
 * This is a hash-routed app, so the flag lives inside the hash fragment
 * (`#/playground/x?embed=1`), not `window.location.search` — read it via
 * `getDesignHarnessHashQuery`, not the plain query string.
 */
function readIsEmbed(): boolean {
  if (typeof window === 'undefined') return false
  return getDesignHarnessHashQuery().get('embed') === '1'
}

export function DesignHarnessApp() {
  const [route, setRoute] = useState<DesignHarnessRoute>(() =>
    typeof window !== 'undefined' ? parseDesignHarnessHash() : 'overview',
  )
  // Own state, not a plain per-render read: `route` strips the query string
  // (see `normalizeHashKey`), so a hash change that only flips `?embed=1`
  // never changes `route` — a plain `readIsEmbed()` call here would silently
  // never re-run past the first render for that case. Re-sync explicitly
  // alongside `route` in the hashchange effect below.
  const [isEmbed, setIsEmbed] = useState<boolean>(() => (typeof window !== 'undefined' ? readIsEmbed() : false))
  const [theme, setTheme] = useState<DesignHarnessTheme>(() =>
    typeof window !== 'undefined' ? (readIsEmbed() ? 'light' : readStoredTheme()) : 'dark',
  )
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    typeof window !== 'undefined' ? readStoredSidebarCollapsed() : false,
  )
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const isMobileShell = useMobileShell()

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseDesignHarnessHash())
      setIsEmbed(readIsEmbed())
    }
    onHashChange()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    try {
      if (!isEmbed) window.localStorage.setItem(STUDIO_OS_THEME_KEY, theme)
    } catch {
      /* ignore */
    }
    // Sync kit dark tokens (`:root[data-theme='dark']` in tokens.css).
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme, isEmbed])

  useEffect(() => {
    try {
      window.localStorage.setItem(STUDIO_OS_SIDEBAR_KEY, sidebarCollapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [sidebarCollapsed])

  // Desktop collapse doesn't apply on mobile — drawer is either open or closed.
  const [wasMobileShell, setWasMobileShell] = useState(isMobileShell)
  if (wasMobileShell !== isMobileShell) {
    setWasMobileShell(isMobileShell)
    if (!isMobileShell) setMobileNavOpen(false)
  }

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (isEmbed) return
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target
      const typing =
        target instanceof HTMLElement &&
        (target.isContentEditable || Boolean(target.closest('input, textarea, select')))
      const command = e.metaKey || e.ctrlKey
      if (command && e.key === 'Backspace' && !typing) {
        e.preventDefault()
        setCommandOpen(true)
        return
      }
      if (command && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isEmbed])

  const navigate = useCallback((next: DesignHarnessRoute) => {
    setDesignHarnessHash(next)
    setMobileNavOpen(false)
  }, [])

  const siteArea = resolveDesignHarnessSiteArea(route)
  const sections = getSectionNavSections(siteArea, route)
  const sectionNavTitle = getSectionNavTitle(siteArea, route)
  const sectionNavContext = getSectionNavContext(route)
  const sectionNavTabs = getSectionNavTabs(siteArea, route)
  // Home and the Prototypes list have no sidebar; a project, the design system and
  // the documentation do. Desktop collapse hides the tree; the icon rail stays.
  const showSectionNav = sections.length > 0
  const railCollapsed = isMobileShell ? false : sidebarCollapsed || !showSectionNav
  const wideMain = isPrototypeRoute(route) || railCollapsed || isMobileShell
  const platformBar = (() => {
    if (isEmbed || !isProjectRoute(route)) return undefined
    const resolved = resolveProjectRoute(route)
    return resolved?.screen ? platformSwitch(resolved.project, resolved.screen.route) : undefined
  })()
  const protoSurface = isPrototypeRoute(route) && !platformBar

  // Presentation formats take the whole window, like a tool, with their own way back.
  if (resolveProjectRoute(route)?.presentation) {
    return (
      <div className="design-harness design-harness-ds" data-design-harness-theme={theme}>
        {renderPage(route, isEmbed)}
      </div>
    )
  }

  return (
    <div
      className="design-harness design-harness-ds"
      data-design-harness-theme={theme}
      data-embed={isEmbed ? 'true' : undefined}
    >
      {!isEmbed ? <CommandSearch open={commandOpen} onClose={() => setCommandOpen(false)} /> : null}
      {!isEmbed && import.meta.env.DEV ? <HarnessIntro defaultOpen={!hasSeenHarnessIntro()} /> : null}
      {!isEmbed ? <SkipLink /> : null}

      <div className="design-harness-ds-site" data-mobile-nav={mobileNavOpen ? 'open' : 'closed'}>
        {!isEmbed ? (
          <MobileBar
            open={mobileNavOpen}
            area={route === 'skills/usage' ? 'Usage' : STUDIO_OS_AREA_LABEL[siteArea]}
            onToggle={() => setMobileNavOpen((open) => !open)}
            onHome={() => navigate('overview')}
          />
        ) : null}

        {!isEmbed && mobileNavOpen ? (
          <button
            type="button"
            className="design-harness-ds-mobile-scrim"
            aria-label="Close navigation"
            onClick={() => setMobileNavOpen(false)}
          />
        ) : null}

        {!isEmbed ? (
          <aside
            id="design-harness-site-nav"
            className="design-harness-ds-shell-sidebar"
            aria-label="Site"
            aria-hidden={isMobileShell && !mobileNavOpen ? true : undefined}
            data-collapsed={railCollapsed ? 'true' : 'false'}
            data-mobile-open={mobileNavOpen ? 'true' : 'false'}
          >
            <Rail
              route={route}
              theme={theme}
              showSettings={import.meta.env.DEV}
              onNavigate={navigate}
              onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              onShowNavigation={showSectionNav && sidebarCollapsed ? () => setSidebarCollapsed(false) : undefined}
              onCloseMobile={() => setMobileNavOpen(false)}
            />

            {!railCollapsed ? (
              <Sidebar
                title={sectionNavTitle}
                sections={sections}
                route={route}
                tabs={sectionNavTabs}
                context={sectionNavContext}
                docs={siteArea === 'how-to' || siteArea === 'skills'}
                onNavigate={navigate}
                onHide={() => setSidebarCollapsed(true)}
              />
            ) : null}
          </aside>
        ) : null}

        <div
          className={['design-harness-ds-shell-main', wideMain ? 'design-harness-ds-shell-main--wide' : '']
            .filter(Boolean)
            .join(' ')}
        >
          <main
            id="main"
            className={[
              'design-harness-ds__main',
              wideMain ? 'design-harness-ds__main--wide' : '',
              protoSurface ? 'design-harness-proto-surface' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-theme={protoSurface ? 'light' : undefined}
            data-color-scheme={protoSurface ? 'light' : undefined}
            tabIndex={-1}
          >
            {renderPage(route, isEmbed)}
          </main>
        </div>
      </div>
    </div>
  )
}
