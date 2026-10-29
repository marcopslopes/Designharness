import type { CSSProperties, HTMLAttributes } from 'react'

export type LoaderSize = 'default' | 'sm' | 'xs'
/** Design Harness kit LoadingSpinner treatments (CSS animation — no framer). */
export type LoaderVariant = 'ring' | 'petals' | 'dots'

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: LoaderSize
  variant?: LoaderVariant
  label?: string
}

const PETAL_COUNT = 12

/**
 * Design Harness kit loaders — ring (default), iOS-style petals, or bouncing dots.
 */
export function Loader({
  size = 'default',
  variant = 'ring',
  label = 'Loading',
  className,
  ...rest
}: LoaderProps) {
  return (
    <div
      className={['ds-loader', className].filter(Boolean).join(' ')}
      data-size={size}
      data-variant={variant}
      role="status"
      aria-label={label}
      {...rest}
    >
      {variant === 'ring' ? <span className="ds-loader__ring" aria-hidden /> : null}
      {variant === 'petals'
        ? Array.from({ length: PETAL_COUNT }, (_, i) => (
            <span
              key={i}
              className="ds-loader__petal"
              style={{ '--ds-loader-i': i } as CSSProperties}
              aria-hidden
            />
          ))
        : null}
      {variant === 'dots'
        ? [0, 1, 2].map((i) => (
            <span
              key={i}
              className="ds-loader__dot"
              style={{ '--ds-loader-i': i } as CSSProperties}
              aria-hidden
            />
          ))
        : null}
    </div>
  )
}
