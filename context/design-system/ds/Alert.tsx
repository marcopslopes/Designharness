import type { HTMLAttributes, ReactNode } from 'react'

export type AlertIntent = 'info' | 'success' | 'warning' | 'danger'

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  intent?: AlertIntent
  title: string
  description?: string
  icon?: ReactNode
  actionLabel?: string
  onAction?: () => void
  /** Ink toast-style surface (kit AlertSet “toast” row) */
  surface?: 'soft' | 'ink'
}

/**
 * Design Harness kit alert pill (`source/design-harness-kit` AlertSet).
 * Soft tinted surface or ink toast with optional CTA.
 */
export function Alert({
  intent = 'info',
  title,
  description,
  icon,
  actionLabel,
  onAction,
  surface = 'soft',
  className,
  ...rest
}: AlertProps) {
  return (
    <div
      role="alert"
      className={['ds-alert', className].filter(Boolean).join(' ')}
      data-intent={intent}
      data-surface={surface}
      {...rest}
    >
      <span className="ds-alert__icon" aria-hidden={icon ? undefined : true}>
        {icon}
      </span>
      <div className="ds-alert__body">
        <div className="ds-alert__title">{title}</div>
        {description ? <div className="ds-alert__desc">{description}</div> : null}
      </div>
      {actionLabel ? (
        <button type="button" className="ds-alert__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
