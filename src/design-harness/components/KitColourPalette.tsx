import { useEffect, useState } from 'react'
import {
  KIT_ACCENTS,
  KIT_NEUTRALS,
  KIT_TONAL_ROWS,
  KIT_TONAL_SCALE,
  kitStopIsDark,
  type KitAccentSwatch,
  type KitNeutralSwatch,
} from '../kitColourPaletteData'
import { KitShadowShowcase } from './KitShadowShowcase'

type PaletteTheme = 'light' | 'dark'
type PaletteContrast = 'aa' | 'aaa'

function ContrastBadge({ label, onDark }: { label: string; onDark?: boolean }) {
  return (
    <span className="design-harness-kit-colour__badge" data-on-dark={onDark ? 'true' : undefined}>
      {label}
    </span>
  )
}

function NeutralCard({ swatch }: { swatch: KitNeutralSwatch }) {
  return (
    <article className="design-harness-kit-colour__card">
      <div className="design-harness-kit-colour__swatch" style={{ background: swatch.hex }}>
        <ContrastBadge label={swatch.badge} onDark={!swatch.badgeOnDark} />
      </div>
      <div className="design-harness-kit-colour__meta">
        <h3 className="design-harness-kit-colour__name">{swatch.name}</h3>
        <div className="design-harness-kit-colour__row">
          <span className="design-harness-kit-colour__role">{swatch.role}</span>
          <code className="design-harness-kit-colour__hex">{swatch.hex}</code>
        </div>
      </div>
    </article>
  )
}

function AccentCard({ swatch }: { swatch: KitAccentSwatch }) {
  return (
    <article className="design-harness-kit-colour__card">
      <div className="design-harness-kit-colour__swatch" style={{ background: swatch.hex }}>
        <ContrastBadge label={swatch.contrast} onDark />
      </div>
      <div className="design-harness-kit-colour__meta">
        <h3 className="design-harness-kit-colour__name">
          {swatch.name}
          <span className="design-harness-kit-colour__role-inline"> · {swatch.role}</span>
        </h3>
        <div className="design-harness-kit-colour__row">
          <span className="design-harness-kit-colour__role">{swatch.description}</span>
          <code className="design-harness-kit-colour__hex">{swatch.hex}</code>
        </div>
      </div>
      <div className="design-harness-kit-colour__mini-ramp" aria-hidden>
        {swatch.ramp.map((stop) => (
          <span key={stop} className="design-harness-kit-colour__mini-stop" style={{ background: stop }} />
        ))}
      </div>
    </article>
  )
}

function PaletteThemeControls({
  theme,
  contrast,
  onThemeChange,
  onContrastChange,
}: {
  theme: PaletteTheme
  contrast: PaletteContrast
  onThemeChange: (t: PaletteTheme) => void
  onContrastChange: (c: PaletteContrast) => void
}) {
  return (
    <div className="design-harness-kit-colour__toggles" role="group" aria-label="Palette preview">
      <div className="design-harness-kit-colour__segment" role="radiogroup" aria-label="Theme">
        {(['light', 'dark'] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={theme === value}
            className="design-harness-kit-colour__seg-btn"
            data-active={theme === value ? 'true' : undefined}
            onClick={() => onThemeChange(value)}
          >
            {value === 'light' ? 'Light' : 'Dark'}
          </button>
        ))}
      </div>
      <span className="design-harness-kit-colour__seg-divider" aria-hidden />
      <div className="design-harness-kit-colour__segment" role="radiogroup" aria-label="Contrast">
        {(['aa', 'aaa'] as const).map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={contrast === value}
            className="design-harness-kit-colour__seg-btn"
            data-active={contrast === value ? 'true' : undefined}
            onClick={() => onContrastChange(value)}
          >
            {value.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export function KitColourPalette() {
  const [theme, setTheme] = useState<PaletteTheme>(() =>
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'dark'
      : 'light',
  )
  const [contrast, setContrast] = useState<PaletteContrast>('aa')

  useEffect(() => {
    // Preview chrome only — swatches stay on documented light hexes.
    const root = document.querySelector('.design-harness-kit-colour')
    root?.setAttribute('data-preview-theme', theme)
    root?.setAttribute('data-preview-contrast', contrast)
  }, [theme, contrast])

  return (
    <div
      className="design-harness-kit-colour"
      data-preview-theme={theme}
      data-preview-contrast={contrast}
      data-theme={theme}
    >
      <header className="design-harness-kit-colour__intro">
        <h2 className="design-harness-kit-colour__headline">
          Color tokens &amp; <em>tonal</em> ramps.
        </h2>
        <p className="design-harness-kit-colour__lede">
          Twelve semantic roles. Teal anchors brand, plum carries premium, the rest cover feedback. Tonal ramps drive
          adaptive components so dark mode flips the same role without renaming.
        </p>
      </header>

      <section className="design-harness-kit-colour__section">
        <div className="design-harness-kit-colour__section-head">
          <h3 className="design-harness-kit-colour__section-title">
            Neutrals <span>· paper to ink</span>
          </h3>
          <PaletteThemeControls
            theme={theme}
            contrast={contrast}
            onThemeChange={setTheme}
            onContrastChange={setContrast}
          />
        </div>
        <div className="design-harness-kit-colour__grid">
          {KIT_NEUTRALS.map((n) => (
            <NeutralCard key={n.name} swatch={n} />
          ))}
        </div>
      </section>

      <section className="design-harness-kit-colour__section">
        <div className="design-harness-kit-colour__section-head">
          <h3 className="design-harness-kit-colour__section-title">
            Brand &amp; semantic
            <br />
            accents
          </h3>
          <p className="design-harness-kit-colour__section-meta">TEAL · PLUM · ROSE · LEAF · AMBER · DANGER</p>
        </div>
        <div className="design-harness-kit-colour__grid">
          {KIT_ACCENTS.map((a) => (
            <AccentCard key={a.name} swatch={a} />
          ))}
        </div>
      </section>

      <section className="design-harness-kit-colour__section">
        <div className="design-harness-kit-colour__section-head">
          <h3 className="design-harness-kit-colour__section-title">
            Tonal ramps <span>· 11 stops</span>
          </h3>
          <p className="design-harness-kit-colour__section-meta">98 → 0</p>
        </div>
        <div className="design-harness-kit-colour__ramps">
          {KIT_TONAL_ROWS.map((row) => (
            <div key={row.name} className="design-harness-kit-colour__ramp">
              <div className="design-harness-kit-colour__ramp-label">{row.name}</div>
              <div className="design-harness-kit-colour__ramp-stops">
                {row.stops.map((stop, i) => (
                  <div
                    key={`${row.name}-${stop}`}
                    className="design-harness-kit-colour__ramp-stop"
                    style={{ background: stop }}
                    data-dark={kitStopIsDark(stop) ? 'true' : undefined}
                  >
                    <span>{KIT_TONAL_SCALE[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="design-harness-kit-colour__section design-harness-kit-colour__section--shadow">
        <KitShadowShowcase />
      </section>
    </div>
  )
}
