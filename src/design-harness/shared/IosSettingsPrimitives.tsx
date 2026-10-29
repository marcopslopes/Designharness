import type { ReactNode } from 'react'
import { Text, Toggle } from '../../../context/design-system/ds'

/**
 * iOS-style grouped settings lists for phone prototypes. Rows belong inside
 * `.nav-profile__cal-settings-card`.
 * Switches use DS `Toggle` (never prototype-only switch chrome).
 */

export function SettingsGroup({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section className="nav-profile__cal-settings-group">
      {label ? (
        <Text as="p" variant="muted" className="nav-profile__cal-settings-group-label">
          {label}
        </Text>
      ) : null}
      <div className="nav-profile__cal-settings-card">{children}</div>
    </section>
  )
}

/** Single grouped card without a section label (iOS plain inset group). */
export function SettingsListCard({ children }: { children: ReactNode }) {
  return <div className="nav-profile__cal-settings-card">{children}</div>
}

export function IosSwitch({
  label,
  subtitle,
  checked,
  onChange,
  disabled,
}: {
  label: string
  subtitle?: string
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
}) {
  return (
    <div
      className={['nav-profile__settings-toggle-row', subtitle ? 'nav-profile__settings-toggle-row--sub' : null]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="nav-profile__settings-toggle-copy">
        <Text as="span" variant="body" className="nav-profile__settings-toggle-label">
          {label}
        </Text>
        {subtitle ? (
          <Text as="span" variant="muted" className="nav-profile__settings-toggle-sub">
            {subtitle}
          </Text>
        ) : null}
      </span>
      <Toggle
        size="sm"
        checked={checked}
        tone="positive"
        disabled={disabled}
        aria-label={label}
        onClick={() => onChange(!checked)}
      />
    </div>
  )
}

/** One switch inside a grouped card — matches Checkout tipping pattern. */
export function IosSwitchCard(props: React.ComponentProps<typeof IosSwitch>) {
  return (
    <SettingsListCard>
      <IosSwitch {...props} />
    </SettingsListCard>
  )
}

export function IosSliderRow({
  label,
  valueLabel,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string
  valueLabel: string
  value: number
  onChange: (next: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="ios-settings__slider-block">
      <div className="ios-settings__slider-header">
        <span className="nav-profile__settings-toggle-label">{label}</span>
        <span className="ios-settings__slider-value">{valueLabel}</span>
      </div>
      <input
        type="range"
        className="ios-settings__slider"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}
