import type { HTMLAttributes } from 'react'

export type CountDownSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type CountDownProps = HTMLAttributes<HTMLDivElement> & {
  size?: CountDownSize
  /** Display string, e.g. "45s". */
  label?: string
  /** Remaining fraction 0–1 (full ring = 1). */
  progress?: number
}

const SIZE_ATTR: Record<CountDownSize, string> = {
  xl: 'xl',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs',
}

export function CountDown({
  size = 'xl',
  label = '45s',
  progress = 0.75,
  className,
  ...rest
}: CountDownProps) {
  const clamped = Math.min(1, Math.max(0, progress))
  /* SVG circle: stroke-dashoffset from full circumference */
  const r = 45
  const c = 2 * Math.PI * r
  const offset = c * (1 - clamped)

  return (
    <div
      className={['ds-countdown', className].filter(Boolean).join(' ')}
      data-size={SIZE_ATTR[size]}
      role="timer"
      aria-label={label}
      {...rest}
    >
      <svg className="ds-countdown__svg" viewBox="0 0 100 100" aria-hidden>
        <circle className="ds-countdown__track" cx="50" cy="50" r={r} />
        <circle
          className="ds-countdown__progress"
          cx="50"
          cy="50"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="ds-countdown__label">{label}</span>
    </div>
  )
}
