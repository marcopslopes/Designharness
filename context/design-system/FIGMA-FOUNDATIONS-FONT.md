# Foundations — Font

Defines the **type scale**, **font families**, **weights**, **line heights**, and **letter spacing**. Table columns: **Swatch · Token · Desktop · Mobile · Usage**.

For **composed text styles** (H1–H6, Body, Label, etc.), see [`FIGMA-FOUNDATIONS-TYPOGRAPHY.md`](./FIGMA-FOUNDATIONS-TYPOGRAPHY.md).

### Web stack (`context/design-system/tokens.css`)

- **Inter** (display + text) and **JetBrains Mono** (`--font-family-mono`), loaded from Google Fonts in `index.html`.
- **`--font-family-display`** / **`--font-family-text`** → Inter, then `system-ui`.
- Composed type tokens **`--type-font-family-display`** / **`--type-font-family-text`** alias those families.

---

## Family

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|--------|
| `font/family/android` | Roboto | Roboto | Android system font. Use for interfaces targeting Android and Google Material Design. |
| `font/family/ios` | SF Pro | SF Pro | iOS system font. Use for interfaces built for Apple iOS and iPadOS. |
| `font/family/display` | Inter | Inter | Display font. Use for headings, hero text, and prominent display typography. |
| `font/family/text` | Inter | Inter | Text font. Use for body copy, labels, and general interface text. |

---

## Size

Numeric values are **px** (desktop and mobile match in this file).

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|--------|
| `font/size/01` | 12 | 12 | Minimum type size. Captions, footnotes, very small micro-copy. |
| `font/size/02` | 14 | 14 | Label size. Form labels, helper text, metadata, secondary UI text. |
| `font/size/03` | 16 | 16 | Body size. Primary body copy and default paragraph text. |
| `font/size/04` | 20 | 20 | Body large size. Intro paragraphs and prominent featured body text. |
| `font/size/05` | 20 | 20 | Lead size. Lead copy, featured paragraphs, introductory blocks. |
| `font/size/06` | 24 | 24 | Subheading size. Section subheadings and small display heading levels. |
| `font/size/07` | 32 | 32 | Heading size. **H4** level and prominent section heading typography. |
| `font/size/08` | 40 | 40 | Large heading. **H3** level and visually prominent section headings. |
| `font/size/09` | 48 | 48 | Display size. **H2** level and major section heading typography. |
| `font/size/10` | 60 | 60 | Hero display. **H1**, hero headings, primary page titles. |

**Design note:** `font/size/04` and `font/size/05` share **20px**; usage describes *role* (body large vs lead), not pixel difference.

---

## Weight

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|--------|
| `font/weight/400` | Regular | Regular | Body copy, labels, standard UI text. |
| `font/weight/700` | Bold | Bold | Headings, CTAs, emphasis, high-priority labels. |

---

## Italic

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|--------|
| `font/italic/400` | Italic | Italic | Quotes, emphasis, captions, decorative styling. |
| `font/italic/700` | Bold Italic | Bold Italic | Strong emphasis combining weight and italic. |

---

## Line height

Values are **px** (vertical swatch height in the spec).

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|--------|
| `font/line-height/01` | 14 | 14 | Tight. Pair with 12px type for compact layouts. |
| `font/line-height/02` | 16 | 16 | Compact. Pair with 14px label type. |
| `font/line-height/03` | 20 | 20 | Body. Pair with 16px body text. |
| `font/line-height/04` | 24 | 24 | Relaxed. Pair with 20px type for readable paragraphs. |
| `font/line-height/05` | 28 | 28 | Loose. Pair with 20px body-large for airy layouts. |
| `font/line-height/06` | 32 | 32 | Heading. Pair with 24px subheadings and section headings. |
| `font/line-height/07` | 36 | 36 | Medium heading. Pair with 28–32px heading type. |
| `font/line-height/08` | 40 | 40 | Large heading. Pair with 32–36px prominent headings. |
| `font/line-height/09` | 44 | 44 | Display. Pair with 40px display headings and large titles. |
| `font/line-height/10` | 48 | 48 | Display. Pair with 44–48px hero headings and large titles. |
| `font/line-height/11` | 56 | 56 | Hero. Pair with 48–52px hero and section display headings. |
| `font/line-height/12` | 60 | 60 | Large hero. Pair with 56–60px hero headlines. |
| `font/line-height/13` | 72 | 72 | Maximum. Pair with 60px+ display and oversized headlines. |

---

## Letter spacing

This frame documents one token; additional steps (e.g. `font/letter-spacing/02`) appear in other specs (e.g. Typography).

| Token | Desktop | Mobile | Usage |
|-------|---------|--------|--------|
| `font/letter-spacing/01` | 0 | 0 | Default tracking. Standard text without extra letter spacing. |
