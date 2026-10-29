import type { AnimationEvent, ReactNode } from 'react'
import type { RippleSpec } from './useRipple'

export function RippleLayer({
  ripples,
  onRippleEnd,
}: {
  ripples: RippleSpec[]
  onRippleEnd: (id: number) => void
}): ReactNode {
  return ripples.map((ripple) => (
    <span
      key={ripple.id}
      className="ds-ripple"
      aria-hidden
      style={{
        width: ripple.size,
        height: ripple.size,
        left: ripple.x,
        top: ripple.y,
      }}
      onAnimationEnd={(event: AnimationEvent<HTMLSpanElement>) => {
        if (event.animationName.includes('ds-ripple-expand')) {
          onRippleEnd(ripple.id)
        }
      }}
    />
  ))
}
