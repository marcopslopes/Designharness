import { useEffect, useState, type AnimationEvent } from 'react'

export type PresenceState = 'from' | 'open' | 'closed'

/**
 * Mounts a surface for its enter animation and keeps it mounted until
 * the exit animation (any name ending in `-out`) finishes.
 * `motion` false shows and hides on the next frame, with no animation.
 */
export function usePresence(open: boolean, motion: boolean) {
  const [mounted, setMounted] = useState(open)
  const [state, setState] = useState<PresenceState>(open ? (motion ? 'from' : 'open') : 'closed')
  const [prev, setPrev] = useState({ open, motion })

  if (prev.open !== open || prev.motion !== motion) {
    setPrev({ open, motion })
    if (open) {
      setMounted(true)
      setState(motion ? 'from' : 'open')
    } else {
      setState('closed')
      if (!motion) setMounted(false)
    }
  }

  useEffect(() => {
    if (!open || !motion || state !== 'from') return
    const timer = window.setTimeout(() => setState('open'), 32)
    return () => window.clearTimeout(timer)
  }, [open, motion, state])

  function onAnimationEnd(event: AnimationEvent<HTMLElement>) {
    if (open) return
    if (!event.animationName.endsWith('-out')) return
    setMounted(false)
  }

  return { mounted, state, onAnimationEnd }
}
