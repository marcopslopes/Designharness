import { useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { IconChevronLeft, IconChevronRight, IconClock, IconSearch, IconX } from '@tabler/icons-react'
import type { TablerIconComponent } from './Icon'
import { Icon } from './Icon'
import { Chip } from './Chip'

export type HeaderIconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: TablerIconComponent
  /** Accessible name. The icon is decorative. */
  label: string
  /** Notification dot. */
  badge?: boolean
}

/** Circular header action — profile, notifications, back, share. */
export function HeaderIconButton({
  icon,
  label,
  badge = false,
  className,
  type = 'button',
  ...rest
}: HeaderIconButtonProps) {
  return (
    <button
      type={type}
      className={['ds-header__icon-btn', 'ds-glass', className].filter(Boolean).join(' ')}
      aria-label={label}
      {...rest}
    >
      <Icon icon={icon} size="sm" />
      {badge ? <span className="ds-header__dot" /> : null}
    </button>
  )
}

export type LargeTitleHeaderProps = {
  title: string
  subtitle?: string
  /** Leading control, usually an avatar button. */
  leading?: ReactNode
  /** Trailing controls, usually icon buttons. */
  actions?: ReactNode
  searchLabel?: string
  onSearch?: () => void
  searchTrailing?: ReactNode
  className?: string
}

/** Home-screen chrome: action row, large title, inset search. */
export function LargeTitleHeader({
  title,
  subtitle,
  leading,
  actions,
  searchLabel = 'Search',
  onSearch,
  searchTrailing,
  className,
}: LargeTitleHeaderProps) {
  return (
    <header className={['ds-header', className].filter(Boolean).join(' ')}>
      <div className="ds-header__bar">
        {leading ?? <span />}
        {actions ? <div className="ds-header__actions">{actions}</div> : <span />}
      </div>
      <div className="ds-header__titles">
        <h1 className="ds-header__title" data-size="large">
          {title}
        </h1>
        {subtitle ? <p className="ds-header__subtitle">{subtitle}</p> : null}
      </div>
      {onSearch ? (
        <div className="ds-header__search-wrap">
          <button type="button" className="ds-header__search" onClick={onSearch}>
            <Icon icon={IconSearch} size="sm" />
            <span>{searchLabel}</span>
            {searchTrailing}
          </button>
        </div>
      ) : null}
    </header>
  )
}

export type NavBarHeaderProps = {
  title: string
  subtitle?: string
  onBack?: () => void
  backLabel?: string
  actions?: ReactNode
  className?: string
}

/** Compact bar: back, centered title, trailing actions. */
export function NavBarHeader({
  title,
  subtitle,
  onBack,
  backLabel = 'Back',
  actions,
  className,
}: NavBarHeaderProps) {
  return (
    <header className={['ds-header', 'ds-header--bar', className].filter(Boolean).join(' ')}>
      <div className="ds-header__nav">
        {onBack ? (
          <HeaderIconButton icon={IconChevronLeft} label={backLabel} onClick={onBack} />
        ) : (
          <span className="ds-header__spacer" />
        )}
        <div className="ds-header__nav-titles">
          <h1 className="ds-header__title">{title}</h1>
          {subtitle ? <p className="ds-header__subtitle">{subtitle}</p> : null}
        </div>
        {actions ? <div className="ds-header__actions">{actions}</div> : <span className="ds-header__spacer" />}
      </div>
    </header>
  )
}

export type SearchScope = { id: string; label: string }
export type SearchRecent = { id: string; label: string }

export type SearchHeaderProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onCancel?: () => void
  cancelLabel?: string
  placeholder?: string
  scopes?: SearchScope[]
  scope?: string
  defaultScope?: string
  onScope?: (id: string) => void
  recents?: SearchRecent[]
  onRecent?: (id: string) => void
  onRemoveRecent?: (id: string) => void
  className?: string
}

/** Active search: field, Cancel, scope chips, recent terms. */
export function SearchHeader({
  value,
  defaultValue = '',
  onChange,
  onCancel,
  cancelLabel = 'Cancel',
  placeholder = 'Search',
  scopes,
  scope,
  defaultScope,
  onScope,
  recents,
  onRecent,
  onRemoveRecent,
  className,
}: SearchHeaderProps) {
  const inputId = useId()
  const [internal, setInternal] = useState(defaultValue)
  const [internalScope, setInternalScope] = useState(defaultScope ?? scopes?.[0]?.id ?? '')
  const current = value ?? internal
  const currentScope = scope ?? internalScope

  const setValue = (next: string) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }
  const setScope = (id: string) => {
    if (scope === undefined) setInternalScope(id)
    onScope?.(id)
  }

  return (
    <header className={['ds-header', className].filter(Boolean).join(' ')}>
      <div className="ds-header__search-row">
        <label className="ds-header__search ds-header__search--field" htmlFor={inputId}>
          <Icon icon={IconSearch} size="sm" />
          <input
            id={inputId}
            type="search"
            value={current}
            placeholder={placeholder}
            onChange={(event) => setValue(event.target.value)}
          />
          {current ? (
            <button type="button" className="ds-header__clear" aria-label="Clear" onClick={() => setValue('')}>
              <Icon icon={IconX} size="xs" />
            </button>
          ) : null}
        </label>
        <button type="button" className="ds-header__cancel" onClick={onCancel}>
          {cancelLabel}
        </button>
      </div>
      {scopes && scopes.length > 0 ? (
        <div className="ds-header__scopes" role="group" aria-label="Search in">
          {scopes.map((item) => (
            <Chip key={item.id} size="sm" selected={item.id === currentScope} onClick={() => setScope(item.id)}>
              {item.label}
            </Chip>
          ))}
        </div>
      ) : null}
      {recents && recents.length > 0 ? (
        <div className="ds-header__recents">
          <h2 className="ds-header__kicker">Recent</h2>
          <ul>
            {recents.map((item) => (
              <li key={item.id}>
                <button type="button" className="ds-header__recent" onClick={() => onRecent?.(item.id)}>
                  <Icon icon={IconClock} size="xs" />
                  <span>{item.label}</span>
                </button>
                {onRemoveRecent ? (
                  <button
                    type="button"
                    className="ds-header__recent-remove"
                    aria-label={`Remove ${item.label}`}
                    onClick={() => onRemoveRecent(item.id)}
                  >
                    <Icon icon={IconX} size="xs" />
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}

export type HeaderTab = { id: string; label: string }

export type TabbedHeaderProps = {
  title: string
  tabs: HeaderTab[]
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  action?: ReactNode
  className?: string
}

/** Large title with an underline tab row. */
export function TabbedHeader({
  title,
  tabs,
  value,
  defaultValue,
  onChange,
  action,
  className,
}: TabbedHeaderProps) {
  const [internal, setInternal] = useState(defaultValue ?? tabs[0]?.id ?? '')
  const current = value ?? internal
  const select = (id: string) => {
    if (value === undefined) setInternal(id)
    onChange?.(id)
  }

  return (
    <header className={['ds-header', className].filter(Boolean).join(' ')}>
      {action ? <div className="ds-header__bar ds-header__bar--end">{action}</div> : null}
      <div className="ds-header__titles">
        <h1 className="ds-header__title" data-size="large">
          {title}
        </h1>
      </div>
      <div className="ds-header__tabs" role="tablist" aria-label={title}>
        {tabs.map((tab) => {
          const selected = tab.id === current
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className="ds-header__tab"
              onClick={() => select(tab.id)}
            >
              {tab.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}

export type ContextTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'
export type ContextStat = { label: string; value: string }

export type ContextHeaderProps = {
  eyebrow: string
  title: string
  tone?: ContextTone
  onBack?: () => void
  backLabel?: string
  stats?: ContextStat[]
  onDetails?: () => void
  detailsLabel?: string
  className?: string
}

/** Receipt strip: tinted eyebrow, title, and a row of facts. */
export function ContextHeader({
  eyebrow,
  title,
  tone = 'success',
  onBack,
  backLabel = 'Back',
  stats,
  onDetails,
  detailsLabel = 'View details',
  className,
}: ContextHeaderProps) {
  return (
    <header className={['ds-header', className].filter(Boolean).join(' ')} data-tone={tone}>
      <div className="ds-header__strip">
        {onBack ? (
          <HeaderIconButton icon={IconChevronLeft} label={backLabel} onClick={onBack} />
        ) : (
          <span className="ds-header__spacer" />
        )}
        <div className="ds-header__nav-titles">
          <p className="ds-header__eyebrow">{eyebrow}</p>
          <h1 className="ds-header__title">{title}</h1>
        </div>
        <span className="ds-header__spacer" />
      </div>
      {stats && stats.length > 0 ? (
        <div className="ds-header__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="ds-header__stat">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
          {onDetails ? (
            <button type="button" className="ds-header__details" aria-label={detailsLabel} onClick={onDetails}>
              <Icon icon={IconChevronRight} size="sm" />
            </button>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
