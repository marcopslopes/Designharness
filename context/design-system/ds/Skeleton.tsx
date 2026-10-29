import type { HTMLAttributes } from 'react'
import { Stack } from './Stack'

export type SkeletonShape = 'bar' | 'square' | 'circle' | 'pill'

export type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: SkeletonShape
  /** When true, shimmer animates (respects prefers-reduced-motion). */
  animate?: boolean
}

/**
 * Design Harness kit skeleton atom (`source/design-harness-kit` SkeletonPrimitive).
 * Use width/height via className or style; shape sets radius.
 */
export function Skeleton({
  shape = 'bar',
  animate = true,
  className,
  ...rest
}: SkeletonProps) {
  return (
    <div
      className={['ds-skeleton', className].filter(Boolean).join(' ')}
      data-shape={shape}
      data-animate={animate ? 'true' : undefined}
      aria-hidden
      {...rest}
    />
  )
}

/** A loading list of avatar rows. Kit `SkeletonList`. */
export function SkeletonList({ rows = 4 }: { rows?: number }) {
  return (
    <div className="ds-skeleton-layout" role="status" aria-busy="true" aria-label="Loading list">
      {Array.from({ length: rows }, (_, index) => (
          <Stack key={index} direction="row" gap="var(--spacing-04)">
          <Skeleton shape="circle" style={{ width: 'var(--size-10)', height: 'var(--size-10)' }} />
          <Stack gap="var(--spacing-02)">
            <Skeleton shape="bar" style={{ height: 'var(--size-01)', width: 'calc(var(--size-12) * 2)' }} />
            <Skeleton shape="bar" style={{ height: 'var(--size-00)', width: 'calc(var(--size-12) * 1.5)' }} />
          </Stack>
        </Stack>
      ))}
    </div>
  )
}

/** A loading summary card. Kit `SkeletonCard`. */
export function SkeletonCard() {
  return (
    <div className="ds-skeleton-layout" role="status" aria-busy="true" aria-label="Loading card">
      <Stack direction="row" gap="var(--spacing-04)">
        <Skeleton shape="bar" style={{ height: 'var(--size-00)', width: 'calc(var(--size-12) + var(--size-05))' }} />
        <Skeleton shape="square" style={{ width: 'var(--size-11)', height: 'var(--size-06)' }} />
      </Stack>
      <Skeleton shape="bar" style={{ height: 'var(--size-10)', width: 'calc(var(--size-12) * 2)' }} />
      <Skeleton shape="square" style={{ height: 'calc(var(--size-12) + var(--size-05))', width: '100%' }} />
      <Stack direction="row" gap="var(--spacing-03)">
        <Skeleton shape="pill" style={{ height: 'var(--size-09)', flex: 1 }} />
        <Skeleton shape="pill" style={{ height: 'var(--size-09)', flex: 1 }} />
      </Stack>
    </div>
  )
}
