import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import { Icon } from './Icon'
import { Badge } from './Badge'
import { Toggle } from './Toggle'

export type SettingsRowTint = 'brand' | 'premium' | 'leaf' | 'amber' | 'rose' | 'ink'

export type SettingsRowProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string
  description?: string
  icon?: ReactNode
  tint?: SettingsRowTint
  badge?: string
  /** When set, shows a toggle instead of a chevron. */
  toggle?: boolean
  toggleOn?: boolean
  onToggleChange?: (on: boolean) => void
  /** Compact SettingsGroup geometry (size-9 icon). */
  density?: 'default' | 'compact'
}

/**
 * Design Harness kit settings list row (`source/design-harness-kit` SettingsRow / SettingsGroup).
 */
export function SettingsRow({
  title,
  description,
  icon,
  tint = 'brand',
  badge,
  toggle,
  toggleOn = false,
  onToggleChange,
  density = 'default',
  className,
  type = 'button',
  onClick,
  ...rest
}: SettingsRowProps) {
  return (
    <button
      type={type}
      className={['ds-settings-row', className].filter(Boolean).join(' ')}
      data-tint={tint}
      data-density={density}
      onClick={(event) => {
        if (toggle) {
          onToggleChange?.(!toggleOn)
        }
        onClick?.(event)
      }}
      {...rest}
    >
      {icon ? (
        <span className="ds-settings-row__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="ds-settings-row__body">
        <span className="ds-settings-row__title-row">
          <span className="ds-settings-row__title">{title}</span>
          {badge ? (
            <Badge intent="premium" size="md">
              {badge}
            </Badge>
          ) : null}
        </span>
        {description ? <span className="ds-settings-row__desc">{description}</span> : null}
      </span>
      {toggle ? (
        <Toggle
          size="sm"
          checked={toggleOn}
          aria-label={title}
          onClick={(event) => {
            event.stopPropagation()
            onToggleChange?.(!toggleOn)
          }}
        />
      ) : (
        <Icon icon={IconChevronRight} size="md" className="ds-settings-row__chevron" />
      )}
    </button>
  )
}

export type SettingsGroupProps = HTMLAttributes<HTMLElement> & {
  label: string
  children: ReactNode
}

export function SettingsGroup({ label, children, className, ...rest }: SettingsGroupProps) {
  return (
    <section className={['ds-settings-group', className].filter(Boolean).join(' ')} {...rest}>
      <h3 className="ds-settings-group__label">{label}</h3>
      <div className="ds-settings-group__list">{children}</div>
    </section>
  )
}
