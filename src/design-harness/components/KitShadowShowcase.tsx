import type { CSSProperties } from 'react'

type ShadowTier = {
  name: string
  token: string
  role: string
  surface: 'sunken' | 'paper' | 'glass'
  shadow?: string
}

const HERO_TIERS: ShadowTier[] = [
  {
    name: 'Flat',
    token: '--kit-shadow-0',
    role: 'Recessed wells · in-grid tiles',
    surface: 'sunken',
    shadow: 'var(--kit-shadow-0)',
  },
  {
    name: 'Shadow 1',
    token: '--kit-shadow-1',
    role: 'Cards · default chrome',
    surface: 'paper',
    shadow: 'var(--kit-shadow-1)',
  },
  {
    name: 'Shadow 2',
    token: '--kit-shadow-2',
    role: 'Sheets · popovers · floating',
    surface: 'paper',
    shadow: 'var(--kit-shadow-2)',
  },
  {
    name: 'Glass',
    token: 'blur 28 / sat 180',
    role: 'Tab bar · iOS sheets · scrims',
    surface: 'glass',
  },
]

const SUPPORT_TIERS: ShadowTier[] = [
  {
    name: 'Border',
    token: '--kit-shadow-border',
    role: 'Interactive tiles · list rows',
    surface: 'paper',
    shadow: 'var(--kit-shadow-border)',
  },
  {
    name: 'Border hover',
    token: '--kit-shadow-border-hover',
    role: 'Hover / press affordance on tiles',
    surface: 'paper',
    shadow: 'var(--kit-shadow-border-hover)',
  },
  {
    name: 'Press',
    token: '--kit-shadow-press',
    role: 'Pressed primary / ink buttons',
    surface: 'paper',
    shadow: 'var(--kit-shadow-press)',
  },
  {
    name: 'Lifted',
    token: '--kit-shadow-lifted',
    role: 'Floating CTAs · FAB rest',
    surface: 'paper',
    shadow: 'var(--kit-shadow-lifted)',
  },
]

function tierStyle(tier: ShadowTier): CSSProperties | undefined {
  if (tier.surface === 'glass') {
    return {
      boxShadow: 'var(--kit-edge-raised), var(--kit-shadow-1)',
      background: 'var(--kit-glass-bg)',
      backdropFilter: 'blur(var(--kit-glass-blur)) saturate(var(--kit-glass-saturate))',
      WebkitBackdropFilter: 'blur(var(--kit-glass-blur)) saturate(var(--kit-glass-saturate))',
    }
  }
  if (tier.shadow) return { boxShadow: tier.shadow }
  return undefined
}

function ShadowStage({ tiers, label }: { tiers: ShadowTier[]; label?: string }) {
  return (
    <div className="design-harness-kit-shadow__block">
      {label ? <h3 className="design-harness-kit-shadow__stage-label">{label}</h3> : null}
      <div className="design-harness-kit-shadow__stage">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className="design-harness-kit-shadow__card"
            data-surface={tier.surface}
            style={tierStyle(tier)}
          >
            {tier.surface === 'glass' ? <span className="design-harness-kit-shadow__glass-glow" aria-hidden /> : null}
            <h3 className="design-harness-kit-shadow__name">{tier.name}</h3>
            <code className="design-harness-kit-shadow__token">{tier.token}</code>
            <p className="design-harness-kit-shadow__role">{tier.role}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

/**
 * Design Harness kit Depth & shadow (`source/design-harness-kit` ShadowTokens + support tokens).
 */
export function KitShadowShowcase({ intro = true }: { intro?: boolean }) {
  return (
    <div className="design-harness-kit-shadow">
      {intro ? (
        <header className="design-harness-kit-shadow__intro">
          <h2 className="design-harness-kit-shadow__headline">
            Depth &amp; <em>shadow</em>.
          </h2>
          <p className="design-harness-kit-shadow__lede">
            Three tiers plus glass. Light mode uses soft, low-spread shadows. Dark mode swaps in tonal stacking and a
            top-edge highlight — the signature lifted-on-dark look. Support tokens cover hairline tiles, press, and
            lifted CTAs — not a Tailwind sm→2xl ladder.
          </p>
        </header>
      ) : null}

      <ShadowStage tiers={HERO_TIERS} />
      <ShadowStage tiers={SUPPORT_TIERS} label="Support · interaction" />
    </div>
  )
}
