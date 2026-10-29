/** Foundations hub — rich previews + token names (aligned to `context/design-system/tokens.css`). */

export type ColourShowcaseEntry =
  | {
      name: string
      note: string
      kind: 'text'
      sample: string
      /** CSS font-size — always a `var(--…)` from tokens.css */
      size?: string
      /** CSS font-weight — always a `var(--…)` from tokens.css */
      weight?: string
    }
  | { name: string; note: string; kind: 'link'; sample: string }
  | { name: string; note: string; kind: 'surface'; caption: string }
  | { name: string; note: string; kind: 'brand-strip'; caption: string }
  | { name: string; note: string; kind: 'muted-panel'; caption: string }
  | { name: string; note: string; kind: 'border-card' }
  | { name: string; note: string; kind: 'focus-ring'; caption: string }
  | { name: string; note: string; kind: 'inverse-chip'; sample: string }
  | { name: string; note: string; kind: 'primary-cta'; label: string }
  | { name: string; note: string; kind: 'ink'; sample: string }

export const colourShowcase: ColourShowcaseEntry[] = [
  {
    name: '--color-text-default',
    note: 'Primary reading — titles, body, UI labels',
    kind: 'text',
    sample: 'Tuesday · 2:30 PM',
    size: 'var(--type-h6-size)',
    weight: 'var(--ds-font-weight-semibold)',
  },
  {
    name: '--color-text-secondary',
    note: 'Secondary line under a heading or metadata',
    kind: 'text',
    sample: 'Main Street studio · 12 min away',
    size: 'var(--font-size-body)',
    weight: 'var(--font-weight-regular)',
  },
  {
    name: '--color-text-muted',
    note: 'Hints, captions, de-emphasised copy',
    kind: 'text',
    sample: 'Last updated 3 days ago',
    size: 'var(--font-size-label-small)',
    weight: 'var(--font-weight-regular)',
  },
  {
    name: '--color-text-link-default',
    note: 'Interactive text — links in paragraphs',
    kind: 'link',
    sample: 'View full policy',
  },
  {
    name: '--color-text-inverse',
    note: 'Text on dark or saturated surfaces',
    kind: 'inverse-chip',
    sample: 'Confirmed',
  },
  {
    name: '--color-border-default',
    note: 'Default outline for inputs and cards',
    kind: 'border-card',
  },
  {
    name: '--color-border-muted',
    note: 'Softer dividers and resting field borders',
    kind: 'border-card',
  },
  {
    name: '--color-border-brand',
    note: 'Focus / emphasis ring (keyboard and brand)',
    kind: 'focus-ring',
    caption: 'Email address',
  },
  {
    name: '--color-surface-default',
    note: 'Primary surface — cards and sheets',
    kind: 'surface',
    caption: 'Card · default surface',
  },
  {
    name: '--color-surface-brand',
    note: 'Brand teal — accents, tinted CTAs, brand strips',
    kind: 'brand-strip',
    caption: 'Promo strip',
  },
  {
    name: '--color-bg-muted',
    note: 'Grouped regions and subtle panels',
    kind: 'muted-panel',
    caption: 'Section background',
  },
  {
    name: '--ds-additional-background-sea',
    note: 'Legacy name “sea” — same teal as brand (taxonomy kept)',
    kind: 'surface',
    caption: 'Sea accent surface',
  },
  {
    name: '--ds-core-content-primary',
    note: 'Core ink on light fills (#14161A)',
    kind: 'ink',
    sample: 'Sign in with email',
  },
  {
    name: '--ds-primitive-mosque-800',
    note: 'Primitive scale (name kept) — plum deep step',
    kind: 'surface',
    caption: 'Mosque · 800',
  },
  {
    name: '--ds-additional-background-legacy-brand',
    note: 'Northline Pay fill (Pink-900 #bd4580) — content pink stays #e33c8e',
    kind: 'brand-strip',
    caption: 'Northline Pay',
  },
  {
    name: '--ds-calendar-strong-green-3',
    note: 'Calendar Strong tile — appointment colour catalog',
    kind: 'surface',
    caption: 'Calendar · Strong Green-3',
  },
  {
    name: '--ds-calendar-light-blue-4',
    note: 'Calendar Light tile — soft appointment wash',
    kind: 'muted-panel',
    caption: 'Calendar · Light Blue-4',
  },
]

export const spacingSteps: { name: string; label: string }[] = [
  { name: '--spacing-02', label: '4' },
  { name: '--spacing-03', label: '8' },
  { name: '--spacing-04', label: '12' },
  { name: '--spacing-05', label: '16' },
  { name: '--spacing-06', label: '24' },
  { name: '--spacing-07', label: '32' },
]

export const radiusSteps: { name: string; label: string; demoLabel: string }[] = [
  { name: '--radius-01', label: '4', demoLabel: 'Tight' },
  { name: '--radius-02', label: '8', demoLabel: 'Fields' },
  { name: '--radius-03', label: '16', demoLabel: 'Cards' },
  { name: '--radius-05', label: 'Pill', demoLabel: 'FAB' },
]
