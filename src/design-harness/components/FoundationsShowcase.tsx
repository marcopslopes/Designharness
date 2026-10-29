import type { ColourShowcaseEntry } from '../foundationsData'
import { colourShowcase, radiusSteps, spacingSteps } from '../foundationsData'
import {
  CALENDAR_LIGHT,
  CALENDAR_STRONG,
  PRIMITIVE_SCALES,
  PRIMITIVE_SHADE_STEPS,
  PRIMITIVE_SINGLES,
  calendarToken,
  primitiveToken,
} from '../dsColoursData'

function ColourStage({ entry }: { entry: ColourShowcaseEntry }) {
  const { name } = entry

  switch (entry.kind) {
    case 'text':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--text">
          <p
            className="design-harness-showcase-sample design-harness-showcase-sample--text"
            style={{
              color: `var(${name})`,
              fontSize: entry.size ?? 'var(--font-size-body)',
              fontWeight: entry.weight ?? 'var(--font-weight-regular)',
            }}
          >
            {entry.sample}
          </p>
        </div>
      )
    case 'link':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--text">
          <span
            className="design-harness-showcase-sample design-harness-showcase-sample--link"
            style={{ color: `var(${name})` }}
          >
            {entry.sample}
          </span>
        </div>
      )
    case 'surface':
      return (
        <div
          className="design-harness-showcase-stage design-harness-showcase-stage--surface"
          style={{
            background: `var(${name})`,
            border: `var(--border-01) solid var(--color-border-muted)`,
          }}
        >
          <span className="design-harness-showcase-sample design-harness-showcase-sample--on-surface">
            {entry.caption}
          </span>
        </div>
      )
    case 'brand-strip':
      return (
        <div
          className="design-harness-showcase-stage design-harness-showcase-stage--strip"
          style={{ background: `var(${name})` }}
        >
          <span className="design-harness-showcase-sample design-harness-showcase-sample--on-brand">
            {entry.caption}
          </span>
        </div>
      )
    case 'muted-panel':
      return (
        <div
          className="design-harness-showcase-stage design-harness-showcase-stage--panel"
          style={{ background: `var(${name})` }}
        >
          <span className="design-harness-showcase-sample design-harness-showcase-sample--on-muted">
            {entry.caption}
          </span>
        </div>
      )
    case 'border-card':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--border">
          <div
            className="design-harness-showcase-border-card"
            style={{ border: `var(--border-02) solid var(${name})` }}
          >
            <span className="design-harness-showcase-sample design-harness-showcase-sample--in-card">Input · idle</span>
          </div>
        </div>
      )
    case 'focus-ring':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--border">
          <div
            className="design-harness-showcase-border-card design-harness-showcase-border-card--focus"
            style={{ boxShadow: `0 0 0 var(--border-02) var(${name})` }}
          >
            <span className="design-harness-showcase-sample design-harness-showcase-sample--in-card">
              {entry.caption}
            </span>
          </div>
        </div>
      )
    case 'inverse-chip':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--chip">
          <div className="design-harness-showcase-chip" style={{ background: 'var(--color-surface-inverse)' }}>
            <span style={{ color: `var(${name})` }}>{entry.sample}</span>
          </div>
        </div>
      )
    case 'primary-cta':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--cta">
          <div className="design-harness-showcase-cta" style={{ background: `var(${name})` }}>
            {entry.label}
          </div>
        </div>
      )
    case 'ink':
      return (
        <div className="design-harness-showcase-stage design-harness-showcase-stage--text">
          <p
            className="design-harness-showcase-sample design-harness-showcase-sample--ink"
            style={{ color: `var(${name})` }}
          >
            {entry.sample}
          </p>
        </div>
      )
  }
}

export function ColourShowcaseGrid() {
  return (
    <div className="design-harness-showcase-grid">
      {colourShowcase.map((entry) => (
        <article key={entry.name} className="design-harness-showcase-card">
          <ColourStage entry={entry} />
          <div className="design-harness-showcase-card__body">
            <p className="design-harness-showcase-card__note">{entry.note}</p>
            <code className="design-harness-showcase-card__token">{entry.name}</code>
          </div>
        </article>
      ))}
    </div>
  )
}

export function SpacingShowcaseGrid() {
  return (
    <div className="design-harness-showcase-grid design-harness-showcase-grid--spacing">
      {spacingSteps.map(({ name, label }) => (
        <article key={name} className="design-harness-showcase-card design-harness-showcase-card--spacing">
          <div className="design-harness-showcase-stage design-harness-showcase-stage--spacing">
            <div className="design-harness-spacing-demo" style={{ gap: `var(${name})` }}>
              <span className="design-harness-spacing-demo__chip" />
              <span className="design-harness-spacing-demo__chip" />
              <span className="design-harness-spacing-demo__chip" />
            </div>
          </div>
          <div className="design-harness-showcase-card__body">
            <p className="design-harness-showcase-card__note">
              Three chips spaced with this token — common list / toolbar rhythm.
            </p>
            <p className="design-harness-showcase-card__metric">
              <strong>{label}px</strong> gap
            </p>
            <code className="design-harness-showcase-card__token">{name}</code>
          </div>
        </article>
      ))}
    </div>
  )
}

export function RadiusShowcaseGrid() {
  return (
    <div className="design-harness-showcase-grid design-harness-showcase-grid--radius">
      {radiusSteps.map(({ name, label, demoLabel }) => (
        <article key={name} className="design-harness-showcase-card design-harness-showcase-card--radius">
          <div className="design-harness-showcase-stage design-harness-showcase-stage--radius">
            <div className="design-harness-radius-demo" style={{ borderRadius: `var(${name})` }}>
              <span className="design-harness-radius-demo__label">{demoLabel}</span>
            </div>
          </div>
          <div className="design-harness-showcase-card__body">
            <p className="design-harness-showcase-card__note">
              Filled tile using the radius token — same curve as real cards and chips.
            </p>
            <p className="design-harness-showcase-card__metric">
              <strong>{label}</strong>
              {label === 'Pill' ? ' · full pill' : 'px corner'}
            </p>
            <code className="design-harness-showcase-card__token">{name}</code>
          </div>
        </article>
      ))}
    </div>
  )
}

export function PrimitiveScalesShowcase() {
  return (
    <div className="design-harness-primitive-scales">
      <div className="design-harness-primitive-scales__header" aria-hidden>
        <span className="design-harness-primitive-scales__family-spacer" />
        <div className="design-harness-primitive-scales__swatches">
          {PRIMITIVE_SHADE_STEPS.map((step) => (
            <span key={step} className="design-harness-primitive-scales__step-label">
              {step}
            </span>
          ))}
        </div>
      </div>
      {PRIMITIVE_SCALES.map(({ id, label }) => (
        <div key={id} className="design-harness-primitive-scales__row">
          <span className="design-harness-primitive-scales__family">{label}</span>
          <div className="design-harness-primitive-scales__swatches">
            {PRIMITIVE_SHADE_STEPS.map((step) => {
              const token = primitiveToken(id, step)
              return (
                <div key={token} className="design-harness-primitive-scales__cell" title={token}>
                  <span className="design-harness-primitive-scales__swatch" style={{ background: `var(${token})` }} />
                  <code className="design-harness-primitive-scales__token">{step}</code>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="design-harness-primitive-singles">
        {PRIMITIVE_SINGLES.map(({ label, token, kind }) => (
          <div key={token} className="design-harness-primitive-singles__item" title={token}>
            <span
              className={
                kind === 'gradient'
                  ? 'design-harness-primitive-singles__swatch design-harness-primitive-singles__swatch--gradient'
                  : 'design-harness-primitive-singles__swatch'
              }
              style={kind === 'gradient' ? { backgroundImage: `var(${token})` } : { background: `var(${token})` }}
            />
            <div className="design-harness-primitive-singles__meta">
              <span className="design-harness-primitive-singles__label">{label}</span>
              <code className="design-harness-primitive-singles__token">{token}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarWeightGrid({ weight, rows }: { weight: 'strong' | 'light'; rows: typeof CALENDAR_STRONG }) {
  return (
    <div className="design-harness-calendar-palette">
      {rows.map(({ family, steps }) => (
        <div key={`${weight}-${family}`} className="design-harness-calendar-palette__row">
          <span className="design-harness-calendar-palette__family">{family}</span>
          <div className="design-harness-calendar-palette__swatches">
            {steps.map((step) => {
              const token = calendarToken(weight, family, step)
              return (
                <div key={token} className="design-harness-calendar-palette__cell" title={token}>
                  <span className="design-harness-calendar-palette__swatch" style={{ background: `var(${token})` }} />
                  <code className="design-harness-calendar-palette__token">
                    {family}-{step}
                  </code>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function CalendarPaletteShowcase() {
  return (
    <div className="design-harness-calendar-palettes">
      <div>
        <p className="design-harness-calendar-palettes__heading">Strong</p>
        <CalendarWeightGrid weight="strong" rows={CALENDAR_STRONG} />
      </div>
      <div>
        <p className="design-harness-calendar-palettes__heading">Light</p>
        <CalendarWeightGrid weight="light" rows={CALENDAR_LIGHT} />
      </div>
    </div>
  )
}
