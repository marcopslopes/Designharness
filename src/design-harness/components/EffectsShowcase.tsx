import { useEffect, useRef } from 'react'
import { mountMetal } from './metalFx'

function MetalSample({ mode, label }: { mode: 'ring' | 'fill'; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    return mountMetal(host)
  }, [])
  return (
    <div
      ref={ref}
      className={`ds-effects-metal ds-effects-metal--${mode}`}
      data-metal-mode={mode === 'fill' ? 'fill' : undefined}
    >
      <span>{label}</span>
    </div>
  )
}

/** Glass tokens, plus the personal-site metal shader. */
export function EffectsShowcase() {
  return (
    <div className="ds-effects-showcase">
      <div className="ds-effects-showcase__card">
        <p className="ds-effects-showcase__label">Glass</p>
        <div className="ds-effects-glass">
          <span className="ds-effects-glass__wash ds-effects-glass__wash--brand" />
          <span className="ds-effects-glass__wash ds-effects-glass__wash--premium" />
          <span className="ds-effects-glass__chip">Today</span>
        </div>
      </div>
      <div className="ds-effects-showcase__card">
        <p className="ds-effects-showcase__label">Metal ring</p>
        <MetalSample mode="ring" label="Continue" />
      </div>
      <div className="ds-effects-showcase__card">
        <p className="ds-effects-showcase__label">Metal fill</p>
        <MetalSample mode="fill" label="Tile" />
      </div>
    </div>
  )
}
