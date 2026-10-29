import type { HTMLAttributes } from 'react'

/**
 * Design Harness kit progress bar (source/design-harness-kit ProgressBarSet).
 * Determinate fill on sunken track; optional indeterminate sweep.
 */
export type ProgressBarSize = 'mobile' | 'desktop' | 'sm'
export type ProgressBarIntent = 'brand' | 'premium' | 'leaf' | 'ink'

export type ProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  /** 0–1 — ignored when `indeterminate` */
  value?: number
  size?: ProgressBarSize
  intent?: ProgressBarIntent
  indeterminate?: boolean
  label?: string
}

export function ProgressBar({
  value = 0.64,
  size = 'mobile',
  intent = 'brand',
  indeterminate = false,
  label,
  className,
  ...rest
}: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, value))

  return (
    <div
      className={['ds-progress', className].filter(Boolean).join(' ')}
      data-size={size}
      data-intent={intent}
      data-indeterminate={indeterminate ? 'true' : undefined}
      role="progressbar"
      aria-label={label}
      aria-valuemin={indeterminate ? undefined : 0}
      aria-valuemax={indeterminate ? undefined : 100}
      aria-valuenow={indeterminate ? undefined : Math.round(clamped * 100)}
      {...rest}
    >
      <div
        className="ds-progress__fill"
        style={indeterminate ? undefined : { width: `${clamped * 100}%` }}
      />
    </div>
  )
}
