import type { HTMLAttributes, ReactNode } from 'react'

/**
 * Design Harness kit toast. Ink surface
 * (flips on dark), icon chip, message, optional action.
 */
export type ToastIntent = 'leaf' | 'amber' | 'danger' | 'brand' | 'neutral'

/**
 * @deprecated Pre-UI-Kit-v2 tones. Mapped onto `intent`. Prefer `intent`.
 */
export type ToastTone = 'positive' | 'warning' | 'negative' | 'sea' | 'informative'

export type ToastProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: ReactNode
  intent?: ToastIntent
  /** Leading icon (or any node). When omitted, a tone-coloured chip is still shown. */
  icon?: ReactNode
  /** Trailing action label (e.g. Undo). */
  actionLabel?: string
  onAction?: () => void
  /** @deprecated use `intent` */
  tone?: ToastTone
}

function resolveIntent(
  intent: ToastIntent | undefined,
  tone: ToastTone | undefined,
): ToastIntent {
  if (intent) return intent
  if (tone === 'warning') return 'amber'
  if (tone === 'negative') return 'danger'
  if (tone === 'sea') return 'brand'
  if (tone === 'informative') return 'neutral'
  return 'leaf'
}

export function Toast({
  children,
  intent,
  tone,
  icon,
  actionLabel,
  onAction,
  className,
  ...rest
}: ToastProps) {
  const resolved = resolveIntent(intent, tone)
  return (
    <div
      role="status"
      className={['ds-toast', className].filter(Boolean).join(' ')}
      data-intent={resolved}
      {...rest}
    >
      <span className="ds-toast__icon" aria-hidden={icon ? undefined : true}>
        {icon ?? null}
      </span>
      <p className="ds-toast__message">{children}</p>
      {actionLabel ? (
        <button type="button" className="ds-toast__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
