---
name: Brand
badge: Example
order: 3
platforms:
summary: A full brand book — logo, colour, type, imagery, voice and marketing blocks. Shown with Northline, the fictional example company; swap in your own.
context: Voice [context/org-pack/COMPANY-VOICE.md], Business [context/org-pack/COMPANY-BUSINESS.md], Content guidelines [harness/skills/content/references/style-guide.md], Vocabulary [harness/skills/content/references/vocabulary.md], Localization [harness/skills/content/references/localization.md], Writing [harness/skills/writing/SKILL.md]
skills: content, writing, design-system
theme: Brand colours [built: src/design-harness/components/BrandBook.tsx], Display type [built: src/design-harness/components/BrandBook.tsx], Imagery [built: src/design-harness/components/BrandBook.tsx], Voice [built: src/design-harness/components/BrandBook.tsx], Spacing [planned]
assets: Logo [built: src/design-harness/components/BrandBook.tsx], Fonts [built: src/design-harness/components/BrandBook.tsx], Illustrations [needs input], Photography [needs input]
book: The book [built: src/design-harness/components/BrandBook.tsx], Principles [built: src/design-harness/components/BrandBook.tsx], Logo [built: src/design-harness/components/BrandBook.tsx], Colour [built: src/design-harness/components/BrandBook.tsx], Type [built: src/design-harness/components/BrandBook.tsx], Imagery [built: src/design-harness/components/BrandBook.tsx], Voice [built: src/design-harness/components/BrandBook.tsx], In use [built: src/design-harness/components/BrandBook.tsx]
components: Hero [built: src/design-harness/components/MarketingParts.tsx], Feature band [built: src/design-harness/components/DocParts.tsx], Split section [built: src/design-harness/components/MarketingParts.tsx], CTA band [built: src/design-harness/components/DocParts.tsx], Footer [built: src/design-harness/components/MarketingParts.tsx], Hero with stats [built: src/design-harness/components/MarketingParts.tsx], Product cards [built: src/design-harness/components/MarketingParts.tsx], Benefit columns [built: src/design-harness/components/MarketingParts.tsx], Icon features [built: src/design-harness/components/MarketingParts.tsx], Quote band [built: src/design-harness/components/MarketingParts.tsx], Big stats [built: src/design-harness/components/MarketingParts.tsx], Story cards [built: src/design-harness/components/MarketingParts.tsx], Newsroom [built: src/design-harness/components/MarketingParts.tsx], Logo grid [built: src/design-harness/components/MarketingParts.tsx], Testimonial [needs input]
---

# Brand

For marketing pages, campaigns and launch moments. This system is filled
with **Northline**, the fictional example company from `context/org-pack/`,
so you can see what a finished brand book looks like. Open the
[Brand book](#/design-system/systems/brand/book/the-book) to read it
end to end.

> [!IMPORTANT]
> Northline is made up. No prototype uses this system while it's an example —
> its Platform list is empty on purpose. A marketing prototype for your own
> company uses Mobile or Desktop, and says so in its brief, until you swap in
> your brand.

## What it has

- A type wordmark in Instrument Serif, with clear space, smallest size and
  misuse rules.
- Six colours with live hex values and measured contrast pairs.
- A display serif and Geist for text, on a seven-step scale.
- Imagery briefs, the voice rules, and the marketing blocks in brand colours.

## Swap in your brand

The harness won't invent a brand. To replace Northline, bring:

- Logo files (SVG) — or keep a type wordmark — and the space they need.
- Brand colours as hex, and which one is for action.
- Display and text typefaces, with licences.
- Real photography, or the rules for it.
- Your voice file — the resolved `COMPANY-VOICE.md`.

Then ask the harness to "swap the Brand system to our brand". It changes the
tokens, the name and the copy in one place, fills **platforms** so marketing
prototypes pick it up, and changes the badge.

## Brand colours

| Name | Swatch | Token | Use |
| --- | --- | --- | --- |
| Deep teal | `var(--color-bg-brand-dark)` | `--color-bg-brand-dark` | Covers, bands and the big moments |
| Teal | `var(--kit-brand)` | `--kit-brand` | The one thing to tap |
| Paper | `var(--brand-paper)` | `--brand-paper` | Page background |
| Sand | `var(--brand-sand)` | `--brand-sand` | Bands, cards and image frames |
| Ink | `var(--kit-ink)` | `--kit-ink` | Text, and the wordmark on light |
| Plum | `var(--kit-premium)` | `--kit-premium` | Premium features only |

Paper and sand are the brand's own tokens, in `tokens.lab.css`. The rest come
from the product's `tokens.css`, so the site and the app share one teal.

## Display type

Instrument Serif for headlines, the wordmark and big numbers; italic marks the
one word that matters. Geist for everything you read or tap. Both are
open-source and installed with the harness.

## Voice

From the brand's voice file: calm, specific, on your side. Say what changed,
then what to do; lead with the job, not the feature; numbers beat adjectives.

## Logo

The name is the logo, set in the display serif. There is no symbol, and the
harness won't draw one — bring an SVG if your brand has a mark.

## Rules

- Every line of copy comes from the brand's voice and business files. No
  invented quotes, numbers or customers.
- Teal is for action. Use it for one thing per screen.
- The brand book follows the tokens: change a colour and its swatch, hex and
  contrast ratios update.
