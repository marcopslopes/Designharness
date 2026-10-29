import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { IconAntennaBars5, IconBattery4Filled, IconWifi } from '@tabler/icons-react'
import { Icon } from '../../../context/design-system/ds'

/** Floor so the frame stays readable on very short laptop viewports. */
const PHONE_FIT_MIN_SCALE = 0.55
const PHONE_FIT_PAD_PX = 32
/** Design Harness playground chrome above the stage (approx). */
const PHONE_FIT_PLAYGROUND_CHROME_PX = 72

function usePhoneFitScale(enabled: boolean) {
  const fitRef = useRef<HTMLDivElement>(null)
  const deviceRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [natural, setNatural] = useState({ w: 0, h: 0 })
  const [ready, setReady] = useState(!enabled)

  useLayoutEffect(() => {
    if (!enabled) return

    const fit = fitRef.current
    const device = deviceRef.current
    if (!fit || !device) return

    const measure = () => {
      const prevTransform = device.style.transform
      const prevOrigin = device.style.transformOrigin
      const prevMaxWidth = device.style.maxWidth
      const prevFitWidth = fit.style.width
      const prevFitHeight = fit.style.height
      // Measure unconstrained — max-width:100% on a already-scaled fit box
      // collapses natural width (deck iframe miss 2026-08-04).
      device.style.transform = 'none'
      device.style.transformOrigin = 'top left'
      device.style.maxWidth = 'none'
      fit.style.width = 'auto'
      fit.style.height = 'auto'
      const w = device.offsetWidth
      const h = device.offsetHeight
      device.style.transform = prevTransform
      device.style.transformOrigin = prevOrigin
      device.style.maxWidth = prevMaxWidth
      fit.style.width = prevFitWidth
      fit.style.height = prevFitHeight
      if (w > 0 && h > 0) setNatural({ w, h })

      const stage = fit.closest('.nav-profile__lab-stage, .design-harness-proto-switch__stage') as HTMLElement | null
      const standalone = fit.closest('.standalone-proto') as HTMLElement | null
      const box = stage ?? standalone
      // Deck / Design Harness `?embed=1` iframes have no playground chrome — don't
      // subtract PHONE_FIT_PLAYGROUND_CHROME_PX or the phone shrinks to a stub.
      const isEmbed = Boolean(document.querySelector('.design-harness-ds[data-embed="true"]'))
      const pad = isEmbed ? 8 : PHONE_FIT_PAD_PX
      const availW = (box?.clientWidth ?? window.innerWidth) - pad * 2
      const availH =
        (box?.clientHeight ?? window.innerHeight) - pad * 2 - (!box && !isEmbed ? PHONE_FIT_PLAYGROUND_CHROME_PX : 0)

      // Phone stage only — lab toolbar sits outside and must not shrink the device.
      const next = Math.min(1, availW / w, availH / h)
      const minScale = isEmbed ? 0.35 : PHONE_FIT_MIN_SCALE
      const clamped = Number.isFinite(next) && next > 0 ? Math.max(minScale, next) : 1
      setScale(clamped)
      setReady(true)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.documentElement)
    const stage = fit.closest('.nav-profile__lab-stage, .design-harness-proto-switch__stage')
    const standalone = fit.closest('.standalone-proto')
    if (stage) ro.observe(stage)
    else if (standalone) ro.observe(standalone)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [enabled])

  return { fitRef, deviceRef, scale: enabled ? scale : 1, natural, ready: enabled ? ready : true }
}

/**
 * Shared mobile device chrome for Design Harness prototypes — hardware bezel, notch,
 * iOS status bar, floating pill tab bar, home indicator, and the standard
 * 16px screen padding. Originated in the Navigation / Profile prototype
 * (Figma lKsNe3YlWnsb9P07e9ZSLv, node 4083-31947); extracted so every mobile
 * screen in this repo gets the same chrome instead of inventing its own.
 * See `harness/skills/mobile-shell/SKILL.md`.
 *
 * Usage:
 * ```tsx
 * <PhoneShell
 *   tabs={[{ id: 'a', label: 'Tab A', icon: <Icon icon={IconGift} size="md" />, active: true, onClick: () => {} }]}
 *   floating={<button className="phone-shell__fab">+</button>}
 *   overlays={toast ? <Toast tone="positive">{toast}</Toast> : null}
 * >
 *   <div className="phone-shell__screen">...screen content...</div>
 * </PhoneShell>
 * ```
 */

export type PhoneTab = {
  id: string
  label: string
  icon: ReactNode
  active: boolean
  onClick: () => void
}

/** `floating` = phase-2 nav pill (4 tabs). `today` = prod bottom bar (5 tabs). */
export type PhoneTabBarVariant = 'floating' | 'today'

export function PhoneStatusBar({ time = '12:30' }: { time?: string }) {
  return (
    <div className="phone-shell__ios-status" aria-hidden>
      <span className="phone-shell__ios-time">{time}</span>
      <div className="phone-shell__ios-signals">
        <Icon icon={IconAntennaBars5} size="sm" stroke={2.25} className="phone-shell__ios-signal-icon" />
        <Icon icon={IconWifi} size="sm" stroke={2.25} className="phone-shell__ios-wifi-icon" />
        <Icon icon={IconBattery4Filled} size="md" className="phone-shell__ios-battery-icon" />
      </div>
    </div>
  )
}

export function PhoneTabBar({
  tabs,
  ariaLabel = 'Main',
  variant = 'floating',
}: {
  tabs: PhoneTab[]
  ariaLabel?: string
  variant?: PhoneTabBarVariant
}) {
  return (
    <nav
      className={['phone-shell__tabbar', variant === 'today' ? 'phone-shell__tabbar--today' : null]
        .filter(Boolean)
        .join(' ')}
      aria-label={ariaLabel}
    >
      {tabs.map((t) => (
        <button
          type="button"
          key={t.id}
          className="phone-shell__tab"
          data-active={t.active ? 'true' : 'false'}
          aria-current={t.active ? 'page' : undefined}
          onClick={t.onClick}
        >
          {t.icon}
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}

export function PhoneShell({
  children,
  tabs,
  tabBarLabel,
  time,
  floating,
  overlays,
  notch = true,
  tabBarVariant = 'floating',
  fit = true,
}: {
  /** Scrollable screen content — wrap it in a `<div className="phone-shell__screen">` for the standard 16px padding. */
  children: ReactNode
  /** Bottom pill tab bar entries. Omit for single-screen flows (modals, onboarding) that don't need one. */
  tabs?: PhoneTab[]
  tabBarLabel?: string
  /** Status bar clock text. Defaults to `12:30`, matching the rest of the repo's prototypes. */
  time?: string
  /** FABs or other controls anchored above the tab bar (e.g. an "Add" button). */
  floating?: ReactNode
  /** Toasts, modals, or sheets rendered above the screen but inside the device frame. */
  overlays?: ReactNode
  /** Set false for landscape/tablet-style frames that don't have a notch. */
  notch?: boolean
  /** Prod (`today`) vs phase-2 floating pill (`floating`). */
  tabBarVariant?: PhoneTabBarVariant
  /**
   * Uniformly scale the device down when the viewport is shorter/narrower than
   * the canonical frame (small laptops). Keeps internal 402×812 layout intact.
   * Default on — set false only for capture/export that needs 1:1 pixels.
   */
  fit?: boolean
}) {
  const { fitRef, deviceRef, scale, natural, ready } = usePhoneFitScale(fit)
  const fitStyle = {
    '--phone-fit-scale': String(scale),
    opacity: ready ? 1 : 0,
    ...(natural.w > 0
      ? {
          width: natural.w * scale,
          height: natural.h * scale,
        }
      : null),
  } as CSSProperties

  return (
    <div className="phone-shell__fit" ref={fitRef} style={fitStyle} data-phone-fit={fit ? 'true' : 'false'}>
      <div className="phone-shell__device" ref={deviceRef}>
        <span className="phone-shell__device-btn phone-shell__device-btn--action" aria-hidden />
        <span className="phone-shell__device-btn phone-shell__device-btn--vol-up" aria-hidden />
        <span className="phone-shell__device-btn phone-shell__device-btn--vol-down" aria-hidden />
        <span className="phone-shell__device-btn phone-shell__device-btn--power" aria-hidden />

        <div
          className="phone-shell__screen-frame design-harness-proto-surface"
          data-theme="light"
          data-color-scheme="light"
          data-tabbar={tabs && tabs.length > 0 ? tabBarVariant : undefined}
        >
          {notch ? <span className="phone-shell__notch" aria-hidden /> : null}
          <PhoneStatusBar time={time} />

          <div className="phone-shell__body">{children}</div>

          {floating}
          {overlays}

          {tabs && tabs.length > 0 ? <PhoneTabBar tabs={tabs} ariaLabel={tabBarLabel} variant={tabBarVariant} /> : null}

          <span className="phone-shell__home-indicator" aria-hidden />
        </div>
      </div>
    </div>
  )
}
