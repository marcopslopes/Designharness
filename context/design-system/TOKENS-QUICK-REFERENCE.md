# Design tokens — quick reference

Moved from orchestrator §7.3 (now `harness/references/design-system-rules.md`).
Source of truth is `context/design-system/tokens.css`; this is the readable summary.

**Brand colour** (Design Harness — teal + plum + warm paper)

| Role | Token | Value | Notes |
|------|-------|-------|-------|
| Primary brand | `--color-surface-brand` / `--kit-brand` | `#007078` | Accents, tinted CTAs, links |
| Brand hover / deep | `--color-surface-brand-hover` / `--kit-brand-deep` | `#086c72` | Hover / deep |
| Dark brand panel | `--color-bg-brand-dark` | `#02282b` | Footer, hero dark sections |
| Premium | `--kit-premium` | `#4f3791` | Plum / premium intents |
| Primary button fill | `--kit-ink` | `#14161a` | Ink primary (ButtonShowcase) |
| Legacy “sea” (same teal) | `--ds-additional-background-sea` (+ aliases) | `#007078` | Name kept; value = brand |

**Typography** — Font: **Inter** (display + text) and **JetBrains Mono**
(`--font-family-mono`), loaded from Google Fonts in `index.html`, falling
back to `system-ui` / `ui-monospace`. Size steps kept; tracking
`--type-heading-tracking: -0.02em` for Inter.

| Style | Token | Size | Weight | Usage |
|-------|-------|------|--------|-------|
| H1 | `--type-h1-size` | 60px | 700 | Page hero titles |
| H2 | `--type-h2-size` | 48px | 700 | Major section headings |
| H3 | `--type-h3-size` | 40px | 700 | Subsection headings |
| H4 | `--type-h4-size` | 32px | 700 | Card titles, sidebar headers |
| Body Large | `--type-body-large-size` / `--font-size-body-large` | 20px / 18px | 400/500 | Lead paragraphs |
| Body | `--font-size-body` | 16px | 400/500 | Default copy |
| Label | `--font-size-label` | 14px | 500/600 | Form labels, button text |
| Label Small | `--font-size-label-small` | 12px | 400/500 | Captions, badges |

Use `<Text variant="display|body-large|body|label|muted">` from `context/design-system/ds` — do not compose raw `<p>` or `<span>` with inline type styles.

**Spacing** — scale `--spacing-00` (0) → `--spacing-12` (80px). Key steps:

| Token | Value | When to use |
|-------|-------|-------------|
| `--spacing-02` | 4px | Icon gaps, tight internal padding |
| `--spacing-03` | 8px | Small gaps, compact list items |
| `--spacing-04` | 12px | Component internal padding (compact) |
| `--spacing-05` | 16px | **Default gap** — most layouts start here |
| `--spacing-06` | 24px | Card padding, section spacing |
| `--spacing-07` | 32px | Generous whitespace, card groups |
| `--spacing-08` | 40px | Layout-level padding |
| `--spacing-09` | 48px | Page-level sections |

**Radius**

| Token | Value | Use |
|-------|-------|-----|
| `--radius-01` | 4px | Tags, badges, subtle rounding |
| `--radius-02` | 8px | **Cards, inputs, buttons** (most common) |
| `--radius-025` | 12px | In-between step — callouts/blockquotes that need more rounding than a card but less than a sheet |
| `--radius-03` | 16px | Modals, bottom sheets |
| `--radius-04` | 24px | Floating panels |
| `--radius-05` | 999px | Pill badges, full-round toggles |

`--radius-025` exists in `context/design-system/tokens.css` but was missing from this table until a token-drift audit found raw `12px` literals in Design Harness's own doc chrome that should have used it — added here so it's not invisible to whoever reaches for "the radius scale" next.

**Border widths**

| Token | Value | Use |
|-------|-------|-----|
| `--border-01` | 1px | Card borders, input outlines, dividers |
| `--border-02` | 2px | Focus rings, active states |
| `--border-03` | 4px | Selected state emphasis |

**Most-used semantic tokens**

```css
/* Text */
--color-text-default       #14161a   /* Primary copy */
--color-text-secondary     #4b5563   /* Supporting / subtitle text */
--color-text-muted         #6b7280   /* Placeholders, helper text */
--color-text-link-default  #007078   /* In-body links (teal) */
--color-text-error         #951c13   /* Error messages */
--color-text-success       #258438   /* Success messages */
--color-text-inverse       #fafaf7   /* Text on dark/brand surfaces */

/* Surfaces */
--color-surface-default    #ffffff   /* Cards, modals, panels */
--color-surface-brand      #007078   /* Brand accents / tinted */
--color-surface-brand-hover #086c72  /* Brand hover */
--color-surface-success    #dff5e4   /* Success banners */
--color-bg-muted           #f5f5f5   /* Sidebars, grouped sections */

/* Backgrounds */
--color-bg-default         #ffffff   /* Page canvas (paper) */
--color-bg-brand-dark      #02282b   /* Dark brand panels */

/* Borders */
--color-border-default     #9ca3af   /* Inputs, cards, dividers */
--color-border-muted       #f0f0f0   /* Subtle section dividers */
--color-border-brand       #007078   /* Brand highlight border */
--color-border-focus       #0ba3ad   /* Keyboard focus ring */
--color-border-error       #b42318   /* Invalid input border */
```

Full colour/spacing/radius/border/typography tables sourced from Figma live
in `context/design-system/FIGMA-FOUNDATIONS-*.md` — cross-check there when
extending a scale.
