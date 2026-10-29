import type { CSSProperties, ReactNode } from 'react'

const HEADING_SAMPLES: {
  tag: string
  sample: string
  size: string
  line: string
  figma: string
}[] = [
  {
    tag: 'H1',
    sample: 'This week at your studio',
    size: 'var(--type-h1-size)',
    line: 'var(--type-h1-line)',
    figma: 'size/10 · line-height/13',
  },
  {
    tag: 'H2',
    sample: 'Team schedule · March',
    size: 'var(--type-h2-size)',
    line: 'var(--type-h2-line)',
    figma: 'size/09 · line-height/11',
  },
  {
    tag: 'H3',
    sample: 'Tomorrow’s first appointment',
    size: 'var(--type-h3-size)',
    line: 'var(--type-h3-line)',
    figma: 'size/08 · line-height/10',
  },
  {
    tag: 'H4',
    sample: 'Client note',
    size: 'var(--type-h4-size)',
    line: 'var(--type-h4-line)',
    figma: 'size/07 · line-height/08',
  },
  {
    tag: 'H5',
    sample: 'Add-ons selected',
    size: 'var(--type-h5-size)',
    line: 'var(--type-h5-line)',
    figma: 'size/06 · line-height/06',
  },
  {
    tag: 'H6',
    sample: 'Last synced 2m ago',
    size: 'var(--type-h6-size)',
    line: 'var(--type-h6-line)',
    figma: 'size/05 · line-height/05',
  },
]

function TypeCard({
  label,
  sample,
  style,
  meta,
}: {
  label: string
  sample: ReactNode
  style: CSSProperties
  meta: string
}) {
  return (
    <article className="design-harness-type-card">
      <span className="design-harness-type-card__label">{label}</span>
      <div className="design-harness-type-card__sample" style={style}>
        {sample}
      </div>
      <footer className="design-harness-type-card__meta">{meta}</footer>
    </article>
  )
}

export function TypographyShowcase() {
  return (
    <div className="design-harness-type-showcase">
      <header className="design-harness-type-showcase__intro">
        <p className="design-harness-type-showcase__eyebrow">Live preview</p>
        <h2 className="design-harness-type-showcase__title">Typography in context</h2>
        <p className="design-harness-type-showcase__lede">
          Sizes and line heights follow the type scale in <code className="design-harness__code">tokens.css</code>. All
          samples use <strong>Inter</strong> via{' '}
          <code className="design-harness__code">--type-font-family-display</code> /{' '}
          <code className="design-harness__code">--type-font-family-text</code>.{' '}
          <code className="design-harness__code">system-ui</code> is the fallback.
        </p>
      </header>

      <section className="design-harness-type-block" aria-labelledby="design-harness-type-headings">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-type-headings">Headings</h3>
          <p>
            <code className="design-harness__code">font/family/display</code> ·{' '}
            <code className="design-harness__code">font/weight/700</code> ·{' '}
            <code className="design-harness__code">font/letter-spacing/01</code>
          </p>
        </div>
        <div className="design-harness-type-cards design-harness-type-cards--headings">
          {HEADING_SAMPLES.map((h) => (
            <TypeCard
              key={h.tag}
              label={h.tag}
              sample={h.sample}
              meta={`Figma · ${h.figma}`}
              style={{
                fontFamily: 'var(--type-font-family-display)',
                fontSize: h.size,
                lineHeight: h.line,
                fontWeight: 700,
                letterSpacing: 'var(--type-heading-tracking)',
              }}
            />
          ))}
        </div>
      </section>

      <section className="design-harness-type-block" aria-labelledby="design-harness-type-body-lg">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-type-body-lg">Body large</h3>
          <p>
            <code className="design-harness__code">font/family/text</code> ·{' '}
            <code className="design-harness__code">font/size/04</code> ·{' '}
            <code className="design-harness__code">font/line-height/05</code>
          </p>
        </div>
        <div className="design-harness-type-cards design-harness-type-cards--body">
          <TypeCard
            label="Bold"
            sample="Book more clients this season with smarter openings."
            meta="Body Large / Bold · weight/700"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              lineHeight: 'var(--type-body-large-line)',
              fontWeight: 700,
            }}
          />
          <TypeCard
            label="Regular"
            sample="Your calendar stays in sync across every device your team uses in the store."
            meta="Body Large / Regular · weight/400"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              lineHeight: 'var(--type-body-large-line)',
              fontWeight: 400,
            }}
          />
          <TypeCard
            label="Italic · bold"
            sample="“We saw a 20% bump in rebooks after turning on reminders.”"
            meta="Body Large / Italic / Bold"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              lineHeight: 'var(--type-body-large-line)',
              fontWeight: 700,
              fontStyle: 'italic',
            }}
          />
          <TypeCard
            label="Italic · regular"
            sample="Pull quote or editorial emphasis in marketing pages."
            meta="Body Large / Italic / Regular · weight/400"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              lineHeight: 'var(--type-body-large-line)',
              fontWeight: 400,
              fontStyle: 'italic',
            }}
          />
        </div>
      </section>

      <section className="design-harness-type-block" aria-labelledby="design-harness-type-body">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-type-body">Body</h3>
          <p>
            <code className="design-harness__code">font/size/03</code> ·{' '}
            <code className="design-harness__code">font/line-height/03</code>
          </p>
        </div>
        <div className="design-harness-type-row-pair">
          <TypeCard
            label="Regular"
            sample="Default paragraph for forms, confirmations, and help text inside cards."
            meta="Body / Regular"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-body-size)',
              lineHeight: 'var(--type-body-line)',
              fontWeight: 400,
            }}
          />
          <TypeCard
            label="Bold"
            sample="Emphasise the one action you want before the client taps Continue."
            meta="Body / Bold"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-body-size)',
              lineHeight: 'var(--type-body-line)',
              fontWeight: 700,
            }}
          />
        </div>
      </section>

      <section className="design-harness-type-block" aria-labelledby="design-harness-type-label">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-type-label">Label & label small</h3>
          <p>Dense UI: table headers, field labels, metadata.</p>
        </div>
        <div className="design-harness-type-row-pair">
          <TypeCard
            label="Label · 14/16"
            sample="SERVICE NAME"
            meta="font/size/02 · line-height/02 · bold"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-label-size)',
              lineHeight: 'var(--type-label-line)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          />
          <TypeCard
            label="Label small · 12/16"
            sample="Optional helper · max 120 chars"
            meta="font/size/01 · line-height/02 · regular"
            style={{
              fontFamily: 'var(--type-font-family-text)',
              fontSize: 'var(--type-label-sm-size)',
              lineHeight: 'var(--type-label-sm-line)',
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
            }}
          />
        </div>
      </section>
    </div>
  )
}
