# Foundations — Typography

Text styles map to font family, weight, size, and line height tokens. Size steps are unchanged; faces are **Inter** (display + text).

In code, `context/design-system/tokens.css` maps **`--font-family-display`** / **`--font-family-text`** (and **`--type-font-family-*`**) to Inter; mono labels use **`--font-family-mono`** (JetBrains Mono). See `FIGMA-FOUNDATIONS-FONT.md`.

---

## Headings

All use `font/family/display`, `font/weight/700`, `font/letter-spacing/01`.

| Style | Size token | Line height token | Usage |
|-------|------------|-------------------|-------|
|-------|------------|-------------------|---------------------|
| H1 | `font/size/10` | `font/line-height/13` | Primary page headings and hero titles; maximum hierarchy. |
| H2 | `font/size/09` | `font/line-height/11` | Major section titles and sub-page headings. |
| H3 | `font/size/08` | `font/line-height/10` | Subsection headings within content. |
| H4 | `font/size/07` | `font/line-height/08` | Card titles, sidebar headers, tertiary headings. |
| H5 | `font/size/06` | `font/line-height/06` | Compact section labels, feature card titles. |
| H6 | `font/size/05` | `font/line-height/05` | Smallest heading level, metadata, micro-headings in dense UI. |

---

## Body Large

Shared: `font/family/text`, `font/size/04`, `font/line-height/05`, `font/letter-spacing/01` (per table cells). Weights and decoration vary by row.

| Style | Weight | Notes |
|-------|--------|--------|
| Body Large/Bold | `font/weight/700` | Intro paragraphs, key copy, bold CTA emphasis. |
| Body Large/Regular | `font/weight/400` | Lead paragraphs, feature descriptions, long readable blocks. |
| Body Large/Italic/Bold | `font/weight/700` | Bold italic emphasis, pull quotes. |
| Body Large/Italic/Regular | `font/weight/400` | Italic lead text, editorial emphasis. |
| Body Large/Underline/Bold | `font/weight/700` | Underlined bold links in large body. |
| Body Large/Underline/Regular | `font/weight/400` | Underlined links in large body. |

The preview row for **Body Large/Underline/Regular** uses `font/size/04` in the token column; the sample text may apply `font/letter-spacing/02` for visual polish.

---

## Body

Shared: `font/family/text`, `font/size/03`, `font/line-height/03`, `font/letter-spacing/01`.

| Style | Weight |
|-------|--------|
| Body/Bold | `font/weight/700` |
| Body/Regular | `font/weight/400` |
| Body/Italic/Bold | `font/weight/700` |
| Body/Italic/Regular | `font/weight/400` |
| Body/Underline/Bold | `font/weight/700` |
| Body/Underline/Regular | `font/weight/400` |

---

## Label

Shared: `font/family/text`, `font/size/02`, `font/line-height/02`, `font/letter-spacing/01`.

| Style | Weight |
|-------|--------|
| Label/Bold | `font/weight/700` |
| Label/Regular | `font/weight/400` |
| Label/Italic/Bold | `font/weight/700` |
| Label/Italic/Regular | `font/weight/400` |
| Label/Underline/Bold | `font/weight/700` |
| Label/Underline/Regular | `font/weight/400` |

**Label/Underline/Regular:** the design layer uses Roman with underline; token column still lists `font/weight/400`. Align implementation with your token pipeline.

---

## Label Small

Shared in table: `font/family/text`, `font/size/01`, `font/line-height/02`, `font/letter-spacing/01` for most rows.

| Style | Weight |
|-------|--------|
| Label Small/Bold | `font/weight/700` |
| Label Small/Regular | `font/weight/400` |
| Label Small/Italic/Bold | `font/weight/700` |
| Label Small/Italic/Regular | `font/weight/400` |
| Label Small/Underline/Bold | `font/weight/700` |
| Label Small/Underline/Regular | `font/weight/400` |

Two legacy style names used the typo **Itatic** instead of *Italic* — use **Italic** in code and docs.

---

## Semantic variables (examples)

Examples: `--text/default`, `--text/secondary`, `--text/muted`, `--text/link/primary/default`, `--surface/default`, `--border/default`, `--bg/muted`, `--spacing/*`, `--radius/04`.
