import { useCallback, useState, type PointerEvent as ReactPointerEvent } from 'react'

export type RippleInk = 'light' | 'dark'

export type RippleSpec = {
  id: number
  x: number
  y: number
  size: number
}

let rippleSeq = 0

/**
 * Pointer-origin ripple for DS interactive surfaces.
 * Respects `prefers-reduced-motion` via CSS (animation disabled).
 */
export function useRipple(enabled = true) {
  const [ripples, setRipples] = useState<RippleSpec[]>([])

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!enabled) return
      if (event.button !== 0) return
      const host = event.currentTarget
      if (
        (host instanceof HTMLButtonElement && host.disabled) ||
        host.getAttribute('aria-disabled') === 'true'
      ) {
        return
      }

      const rect = host.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 2.2
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2
      const id = ++rippleSeq

      setRipples((prev) => [...prev, { id, x, y, size }])
    },
    [enabled],
  )

  const onRippleEnd = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  return { ripples, onPointerDown, onRippleEnd }
}
