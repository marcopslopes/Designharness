import { useId, useState } from 'react'
import {
  FrameArrowUpRight,
  FrameBook,
  FrameChartSquare,
  FrameChevronDown,
  FrameChevronRight,
  FrameClose,
  FrameCursor,
  FrameSticker,
  FrameMenu,
  FrameMoon,
  FrameSearch,
  FrameSettings,
  FrameSidebarClose,
  FrameSidebarOpen,
  FrameSun,
  FrameWand,
  FrameWidget,
} from '../harnessIcons'
import {
  isNavRouteActive,
  isTopNavAreaActive,
  MANUAL_COLLAPSIBLE_LABELS,
  STUDIO_OS_TOP_NAV,
  type NavItem,
  type NavSection,
  type SectionNavTab,
} from '../designHarnessNavConfig'
import { HARNESS_NAME } from '../harnessSettings'
import { HarnessLogo } from './HarnessLogo'
import type { DesignHarnessRoute } from '../routes'
import { Icon, IconButton, Tabs } from '../ui'

/** The frame's own pieces — the app renders these, and so do their system pages. */

function navItemActive(route: DesignHarnessRoute, item: NavItem): boolean {
  return isNavRouteActive(route, item.route) || (item.alsoActive?.includes(route) ?? false)
}

function NavButton({
  item,
  route,
  onNavigate,
}: {
  item: NavItem
  route: DesignHarnessRoute
  onNavigate: (route: DesignHarnessRoute) => void
}) {
  const active = navItemActive(route, item)
  return (
    <button
      type="button"
      className="design-harness-ds-section-nav__link"
      data-active={active}
      aria-current={active ? 'page' : undefined}
      onClick={() => onNavigate(item.route)}
    >
      {item.icon ? <Icon icon={item.icon} size="sm" className="design-harness-ds-shell-sidebar__icon" /> : null}
      <span>{item.label}</span>
    </button>
  )
}

const PRIMARY_NAV_ICONS = {
  work: FrameCursor,
  board: FrameSticker,
  'design-system': FrameWidget,
  skills: FrameWand,
  'how-to': FrameBook,
} as const

export function SkipLink() {
  return (
    <a href="#main" className="design-harness-ds-skip">
      Skip to content
    </a>
  )
}

export function MobileBar({
  open,
  area,
  onToggle,
  onHome,
}: {
  open: boolean
  area: string
  onToggle: () => void
  onHome: () => void
}) {
  return (
    <header className="design-harness-ds-mobile-bar">
      <button
        type="button"
        className="design-harness-ds-mobile-bar__menu"
        aria-expanded={open}
        aria-controls="design-harness-site-nav"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        onClick={onToggle}
      >
        <Icon icon={open ? FrameClose : FrameMenu} size="sm" />
      </button>
      <button type="button" className="design-harness-ds-mobile-bar__brand" onClick={onHome} title={HARNESS_NAME}>
        {HARNESS_NAME}
      </button>
      <span className="design-harness-ds-mobile-bar__area">{area}</span>
    </header>
  )
}

export function Rail({
  route,
  theme,
  showSettings,
  onNavigate,
  onToggleTheme,
  onShowNavigation,
  onCloseMobile,
}: {
  route: DesignHarnessRoute
  theme: 'light' | 'dark'
  showSettings: boolean
  onNavigate: (route: DesignHarnessRoute) => void
  onToggleTheme: () => void
  /** Shown only while the sidebar tree is hidden. */
  onShowNavigation?: () => void
  onCloseMobile: () => void
}) {
  return (
    <nav className="design-harness-ds-shell-rail" aria-label="Primary">
      <button
        type="button"
        className="design-harness-ds-shell-rail__brand"
        onClick={() => onNavigate('overview')}
        title={HARNESS_NAME}
        aria-label={HARNESS_NAME}
      >
        <span className="design-harness-ds-shell-sidebar__brand-mark" aria-hidden>
          <HarnessLogo size={20} />
        </span>
      </button>
      <ul className="design-harness-ds-shell-rail__list">
        {STUDIO_OS_TOP_NAV.map((item) => (
          <li key={item.id}>
            <IconButton
              label={item.label}
              active={isTopNavAreaActive(route, item.id)}
              aria-current={isTopNavAreaActive(route, item.id) ? 'page' : undefined}
              onClick={() => onNavigate(item.route)}
            >
              <Icon icon={PRIMARY_NAV_ICONS[item.id]} size="sm" />
            </IconButton>
          </li>
        ))}
      </ul>
      <div className="design-harness-ds-shell-rail__foot">
        <IconButton
          label="Usage dashboard"
          active={route === 'skills/usage'}
          aria-current={route === 'skills/usage' ? 'page' : undefined}
          onClick={() => onNavigate('skills/usage')}
        >
          <Icon icon={FrameChartSquare} size="sm" />
        </IconButton>
        {showSettings ? (
          <IconButton
            label="Settings"
            active={route === 'settings'}
            aria-current={route === 'settings' ? 'page' : undefined}
            onClick={() => onNavigate('settings')}
          >
            <Icon icon={FrameSettings} size="sm" />
          </IconButton>
        ) : null}
        <IconButton
          label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={theme === 'dark'}
          onClick={onToggleTheme}
        >
          <Icon icon={theme === 'dark' ? FrameSun : FrameMoon} size="sm" />
        </IconButton>
        {onShowNavigation ? (
          <IconButton label="Show navigation" onClick={onShowNavigation}>
            <Icon icon={FrameSidebarOpen} size="sm" />
          </IconButton>
        ) : null}
        <IconButton
          label="Close navigation"
          className="design-harness-ds-shell-sidebar__mobile-close"
          onClick={onCloseMobile}
        >
          <Icon icon={FrameClose} size="sm" />
        </IconButton>
      </div>
    </nav>
  )
}

/** The tree of links for one area. Groups marked `collapsible` open and close; a `searchable` group filters. */
export function SectionNav({
  title,
  sections,
  route,
  filterable,
  onNavigate,
}: {
  title: string
  sections: NavSection[]
  route: DesignHarnessRoute
  /** The searchable group's filter only applies on this tab. */
  filterable: boolean
  onNavigate: (route: DesignHarnessRoute) => void
}) {
  const [closed, setClosed] = useState<ReadonlySet<string>>(
    () =>
      new Set([
        'References',
        'Agents',
        'Platform',
        'Tools',
        'Harness tools',
        'Craft',
        'Product',
        'Harness',
        ...MANUAL_COLLAPSIBLE_LABELS,
      ]),
  )
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const toggle = (key: string) =>
    setClosed((prev) => {
      const next = new Set(prev)
      if (!next.delete(key)) next.add(key)
      return next
    })

  return (
    <nav className="design-harness-ds-section-nav" aria-label={title}>
      <ul className="design-harness-ds-section-nav__list">
        {sections.map((section, index) => {
          const key = section.label ?? `section-${index}`
          const q = filterable ? query.trim().toLowerCase() : ''
          const items = q ? section.items.filter((item) => item.label.toLowerCase().includes(q)) : section.items
          const sectionActive = section.items.some((item) => navItemActive(route, item))
          const isClosed = section.collapsible && !q && !sectionActive && closed.has(key)
          return (
            <li key={key} className="design-harness-ds-section-nav__section">
              {section.collapsible ? (
                <button
                  type="button"
                  className="design-harness-ds-section-nav__group-toggle"
                  aria-expanded={!isClosed}
                  onClick={() => toggle(key)}
                >
                  <Icon
                    icon={isClosed ? FrameChevronRight : FrameChevronDown}
                    size="sm"
                    className="design-harness-ds-section-nav__group-chevron"
                  />
                  {section.icon ? (
                    <Icon icon={section.icon} size="sm" className="design-harness-ds-shell-sidebar__icon" />
                  ) : null}
                  {section.label}
                </button>
              ) : section.label ? (
                <div className="design-harness-ds-section-nav__group-row">
                  <p className="design-harness-ds-section-nav__group">{section.label}</p>
                  {section.searchable ? (
                    <button
                      type="button"
                      className="design-harness-ds-section-nav__search"
                      aria-label="Search context and skills"
                      aria-pressed={searchOpen}
                      onClick={() => {
                        setSearchOpen((open) => !open)
                        setQuery('')
                      }}
                    >
                      <Icon icon={FrameSearch} size="sm" />
                    </button>
                  ) : null}
                </div>
              ) : null}
              {section.searchable && searchOpen ? (
                <input
                  className="design-harness-ds-section-nav__search-input"
                  aria-label="Search context and skills"
                  placeholder="Search context and skills"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              ) : null}
              {isClosed || items.length === 0 ? null : (
                <ul
                  className="design-harness-ds-section-nav__list"
                  data-nested={section.collapsible ? 'true' : 'false'}
                >
                  {items.map((item) => (
                    <li key={`${item.label}-${item.route}`}>
                      <NavButton item={item} route={route} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** The panel next to the rail: area title, hide button, optional context link and tabs, then the section nav. */
export function Sidebar({
  title,
  sections,
  route,
  tabs,
  context,
  docs,
  onNavigate,
  onHide,
}: {
  title: string
  sections: NavSection[]
  route: DesignHarnessRoute
  tabs?: SectionNavTab[]
  context?: { prefix: string; label: string; route: DesignHarnessRoute }
  docs?: boolean
  onNavigate: (route: DesignHarnessRoute) => void
  onHide: () => void
}) {
  const tabsId = useId()
  return (
    <div className="design-harness-ds-shell-tree" data-docs={docs ? 'true' : undefined}>
      <div className="design-harness-ds-shell-tree__top">
        <div className="design-harness-ds-shell-tree__heading">
          <div className="design-harness-ds-shell-tree__title-row">
            <p className="design-harness-ds-shell-tree__title">{title}</p>
            <IconButton label="Hide navigation" className="design-harness-ds-shell-tree__hide" onClick={onHide}>
              <Icon icon={FrameSidebarClose} size="sm" />
            </IconButton>
          </div>
          {context ? (
            <p className="design-harness-ds-shell-tree__context">
              {context.prefix} ·{' '}
              <a
                href={`#/${context.route}`}
                onClick={(event) => {
                  event.preventDefault()
                  onNavigate(context.route)
                }}
              >
                {context.label}
                <Icon icon={FrameArrowUpRight} size="sm" />
              </a>
            </p>
          ) : null}
        </div>

        {tabs ? (
          <Tabs
            id={tabsId}
            label={`${title} sections`}
            items={tabs.map((tab) => ({ value: tab.route, label: tab.label }))}
            value={(tabs.find((tab) => tab.active) ?? tabs[0]).route}
            onChange={onNavigate}
            hasPanel={false}
            className="design-harness-ds-shell-tree__tabs"
            tabClassName="design-harness-ds-shell-tree__tab"
          />
        ) : null}

        <SectionNav
          title={title}
          sections={sections}
          route={route}
          filterable={Boolean(tabs?.[1]?.active)}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  )
}
