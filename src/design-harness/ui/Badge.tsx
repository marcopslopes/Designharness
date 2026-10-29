import type { ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'positive' | 'accent'

/** Small status pill. `positive` = built / ready, `accent` = in progress, `neutral` = everything else. */
export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: BadgeTone
  className?: string
  children: ReactNode
}) {
  return (
    <span className={['design-harness-badge', className].filter(Boolean).join(' ')} data-tone={tone}>
      {children}
    </span>
  )
}
