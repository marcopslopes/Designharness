import type { ReactNode } from 'react'
import { FrameAdd, FrameChevronLeft, FrameChevronRight, FrameLock, FrameShare } from '../harnessIcons'
import { Icon } from '../../../context/design-system/ds'
import type { PhoneTab } from './PhoneShell'

/**
 * Desktop counterpart to `PhoneShell`: a browser window with the pro app's web
 * nav down the left, so a desktop screen reads as a page inside the app rather
 * than a loose document. Pass the same tabs the phone uses
 * (`buildProAppPhoneTabs`) so both platforms share one nav.
 *
 * ```tsx
 * <DesktopShell tabs={buildProAppPhoneTabs('clients', () => {})} url="app/clients">
 *   <div className="design-harness-ds-page">...screen content...</div>
 * </DesktopShell>
 * ```
 */
export function DesktopShell({
  tabs,
  url,
  navLabel = 'Main',
  children,
}: {
  tabs: PhoneTab[]
  /** Path shown in the address bar, e.g. `app/clients`. */
  url?: string
  navLabel?: string
  children: ReactNode
}) {
  return (
    <div className="desktop-shell">
      <div className="desktop-shell__titlebar" aria-hidden>
        <span className="desktop-shell__lights">
          <span data-light="close" />
          <span data-light="minimize" />
          <span data-light="zoom" />
        </span>
        <span className="desktop-shell__history">
          <Icon icon={FrameChevronLeft} size="sm" />
          <Icon icon={FrameChevronRight} size="sm" />
        </span>
        <span className="desktop-shell__url">
          <Icon icon={FrameLock} size="xs" />
          {url}
        </span>
        <span className="desktop-shell__toolbar">
          <Icon icon={FrameShare} size="sm" />
          <Icon icon={FrameAdd} size="sm" />
        </span>
      </div>
      <div className="desktop-shell__app">
        <nav className="desktop-shell__nav" aria-label={navLabel}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className="desktop-shell__nav-item"
              data-active={tab.active}
              aria-current={tab.active ? 'page' : undefined}
              onClick={tab.onClick}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <main className="desktop-shell__screen">{children}</main>
      </div>
    </div>
  )
}
