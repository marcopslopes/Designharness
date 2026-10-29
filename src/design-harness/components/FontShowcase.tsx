/** Size ladder — each step maps to real tokens in `context/design-system/tokens.css`. */
const SIZE_LADDER: { figma: string; size: string; line: string; note: string }[] = [
  {
    figma: 'font/size/01',
    size: 'var(--font-size-label-small)',
    line: 'var(--type-label-sm-line)',
    note: 'Captions · footnotes',
  },
  {
    figma: 'font/size/02',
    size: 'var(--font-size-label)',
    line: 'var(--type-label-line)',
    note: 'Labels · helper text',
  },
  { figma: 'font/size/03', size: 'var(--font-size-body)', line: 'var(--type-body-line)', note: 'Body default' },
  {
    figma: 'font/size/04',
    size: 'var(--type-body-large-size)',
    line: 'var(--type-body-large-line)',
    note: 'Body large',
  },
  { figma: 'font/size/06', size: 'var(--type-h5-size)', line: 'var(--type-h5-line)', note: 'Subheading' },
  { figma: 'font/size/07', size: 'var(--type-h4-size)', line: 'var(--type-h4-line)', note: 'H4 scale' },
  { figma: 'font/size/08', size: 'var(--type-h3-size)', line: 'var(--type-h3-line)', note: 'H3 scale' },
  { figma: 'font/size/09', size: 'var(--type-h2-size)', line: 'var(--type-h2-line)', note: 'H2 scale' },
  { figma: 'font/size/10', size: 'var(--type-h1-size)', line: 'var(--type-h1-line)', note: 'H1 · hero' },
]

export function FontShowcase() {
  return (
    <div className="design-harness-type-showcase">
      <section className="design-harness-type-block" aria-labelledby="design-harness-font-families">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-font-families">Families</h3>
          <p>
            Display and text both resolve to Inter via{' '}
            <code className="design-harness__code">--font-family-display</code> /{' '}
            <code className="design-harness__code">--font-family-text</code>. Mono labels use{' '}
            <code className="design-harness__code">--font-family-mono</code> (JetBrains Mono).
          </p>
        </div>
        <div className="design-harness-font-family-row">
          <div className="design-harness-font-family-card">
            <p className="design-harness-font-family-card__glyph" style={{ fontFamily: 'var(--font-family-display)' }}>
              Aa
            </p>
            <p className="design-harness-font-family-card__sample" style={{ fontFamily: 'var(--font-family-display)' }}>
              Display · headings
            </p>
          </div>
          <div className="design-harness-font-family-card">
            <p className="design-harness-font-family-card__glyph" style={{ fontFamily: 'var(--font-family-text)' }}>
              Aa
            </p>
            <p className="design-harness-font-family-card__sample" style={{ fontFamily: 'var(--font-family-text)' }}>
              Text · UI & body
            </p>
          </div>
        </div>
      </section>

      <section className="design-harness-type-block" aria-labelledby="design-harness-font-sizes">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-font-sizes">Size ladder</h3>
          <p>
            Each row is one line set in <code className="design-harness__code">font/family/text</code> at that step.
          </p>
        </div>
        <ul className="design-harness-font-ladder">
          {SIZE_LADDER.map((step) => (
            <li key={step.figma} className="design-harness-font-ladder__row">
              <span className="design-harness-font-ladder__meta">
                <code className="design-harness__code">{step.figma}</code>
                <span className="design-harness-font-ladder__hint">{step.note}</span>
              </span>
              <span
                className="design-harness-font-ladder__line"
                style={{
                  fontFamily: 'var(--font-family-text)',
                  fontSize: step.size,
                  lineHeight: step.line,
                  fontWeight: 'var(--ds-font-weight-semibold)',
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="design-harness-type-block" aria-labelledby="design-harness-font-weights">
        <div className="design-harness-type-block__head">
          <h3 id="design-harness-font-weights">Weights</h3>
          <p>Same size, different emphasis — only the three weights shipped in tokens.</p>
        </div>
        <div className="design-harness-font-weight-row">
          <p
            style={{
              fontFamily: 'var(--font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              fontWeight: 'var(--font-weight-regular)',
            }}
          >
            Regular · font/weight/400
          </p>
          <p
            style={{
              fontFamily: 'var(--font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              fontWeight: 'var(--ds-font-weight-semibold)',
            }}
          >
            Semibold · font/weight/600
          </p>
          <p
            style={{
              fontFamily: 'var(--font-family-text)',
              fontSize: 'var(--type-body-large-size)',
              fontWeight: 'var(--font-weight-bold)',
            }}
          >
            Bold · font/weight/700
          </p>
        </div>
      </section>
    </div>
  )
}
