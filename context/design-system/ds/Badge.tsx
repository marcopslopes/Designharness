import type { ReactNode } from 'react'

/**
 * Design Harness kit badges. Pill label with optional
 * status dot. Seven intents; two sizes.
 */
export type BadgeIntent =
  | 'neutral'
  | 'brand'
  | 'premium'
  | 'leaf'
  | 'amber'
  | 'danger'
  | 'ink'

export type BadgeSize = 'md' | 'lg'

/**
 * @deprecated Pre-UI-Kit-v2 tones. Mapped onto `intent` — prefer `intent`.
 * `brand` → brand, `success` → leaf, `neutral` → neutral.
 */
export type BadgeTone = 'neutral' | 'brand' | 'success'

export type BadgeProps = {
  children: ReactNode
  intent?: BadgeIntent
  size?: BadgeSize
  /** Status dot before the label. */
  dot?: boolean
  className?: string
  /** @deprecated use `intent` */
  tone?: BadgeTone
}

function resolveIntent(
  intent: BadgeIntent | undefined,
  tone: BadgeTone | undefined,
): BadgeIntent {
  if (intent) return intent
  if (tone === 'success') return 'leaf'
  if (tone === 'brand') return 'brand'
  return 'neutral'
}

export function Badge({
  children,
  intent,
  tone,
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  const resolved = resolveIntent(intent, tone)
  return (
    <span
      className={['ds-badge', className].filter(Boolean).join(' ')}
      data-intent={resolved}
      data-size={size}
    >
      {dot ? <span className="ds-badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}
