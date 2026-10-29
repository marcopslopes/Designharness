---
name: Harness brand
badge: Platform
order: 5
platforms:
summary: Design Harness's own brand — warm paper, blue-black type, forest accents, big quiet headlines. For the harness's marketing pages, never for prototypes.
context: Harness system [context/design-system/systems/harness.md]
skills: ui-agent, design-system, content
theme: Colour [built: src/design-harness/styles/tokens.lab.css], Display type [planned], Spacing [planned], Imagery [planned]
assets: Wordmark [built: src/design-harness/components/MarketingParts.tsx], Display font [needs input]
components: Headline [built: src/design-harness/components/MarketingParts.tsx], Announcement bar [built: src/design-harness/components/MarketingParts.tsx], Hero [built: src/design-harness/components/MarketingParts.tsx], Split section [built: src/design-harness/components/MarketingParts.tsx], Feature row [built: src/design-harness/components/MarketingParts.tsx], Stat row [built: src/design-harness/components/MarketingParts.tsx], Quote [built: src/design-harness/components/MarketingParts.tsx], FAQ [built: src/design-harness/components/MarketingParts.tsx], CTA card [built: src/design-harness/components/DocParts.tsx], Footer [built: src/design-harness/components/MarketingParts.tsx], Hero with stats [built: src/design-harness/components/MarketingParts.tsx], Product cards [built: src/design-harness/components/MarketingParts.tsx], Benefit columns [built: src/design-harness/components/MarketingParts.tsx], Icon features [built: src/design-harness/components/MarketingParts.tsx], Quote band [built: src/design-harness/components/MarketingParts.tsx], Big stats [built: src/design-harness/components/MarketingParts.tsx], Story cards [built: src/design-harness/components/MarketingParts.tsx], Newsroom [built: src/design-harness/components/MarketingParts.tsx], Logo grid [built: src/design-harness/components/MarketingParts.tsx], Logo strip [built: src/design-harness/components/MarketingParts.tsx], Brand book [planned]
---

# Harness brand

How Design Harness presents itself: its own site, launch pages, and the brand
book. It shares the Harness system's palette and parts (arrow buttons, bands,
callouts) and adds the marketing blocks. It is the harness's own brand, not the
company's — company marketing uses the Brand system.

## Colour

The Harness system's warm palette — see Harness › Theme › Colour. Marketing
leans on the full-width surfaces more than the app does:

| Name | Token | Used for |
|------|-------|----------|
| Paper | `var(--design-harness-shell-canvas)` | Page background |
| Sand | `var(--design-harness-sand)` | Split sections, hero media |
| Band | `var(--design-harness-band)` | Dark bands, footer |
| Deep forest | `var(--design-harness-forest-surface)` | Closing CTA card |
| Forest | `var(--design-harness-accent)` | Highlighted words, announcement bar |
| Ink | `var(--kit-ink)` | Headlines and body |

## Wordmark

"Design Harness" set in Geist, medium weight, −0.04em tracking. No mark —
the harness never draws one. Three sizes: small (nav), medium (footer),
large (covers).

## Display font

Headlines use Geist at regular weight with tight tracking for now. A serif
display face (light weight, like a book title) would set marketing apart
from the app — needs a font package added.

## Headline

Big, regular weight, −0.04em tracking, balanced lines. Wrap a few words in
`*stars*` to highlight them in forest on a forest tint — two sale items at
most per headline.

## Announcement bar

A thin forest bar with one line and a link. Closes with ×; point it at the
newest release note.

## Hero

Kicker and headline on the left, lead and the one action on the right,
then a wide media panel. Media is a real Harness component on sand — not a
stock photo.

## Split section

Title on the left, one or two narrow columns of text on the right, on sand.
For "why" sections — the vision, the principles.

## Feature row

A row of cells split by hairlines, each with a title, a line of text, and an
icon at the bottom. Works on paper, sand, or inside the dark band with a
"↳ Read more" link above.

## Stat row

Big numbers over small labels, each under a hairline. Only real numbers —
the demo counts this repo live.

## Quote

A white card with the quote in large text and the person's name and role.
Only real quotes, with permission.

## FAQ

Native `<details>` rows split by hairlines, + and − on the right; one opens
at a time.

## CTA card

The Harness system's deep forest card, with an optional white media panel on
the right.

## Footer

The dark band with the wordmark, link columns, and one line of fine print.

## Hero with stats

Headline, lead and one action on the left; a stack of big numbers on the
right; a logo strip underneath. The numbers here are counted from the repo.

## Product cards

Four media cards — photo slot, name, one line, "Read more". A real Harness
component can sit on the photo where it helps explain the product.

## Benefit columns

Four short title-and-text columns with no borders, for the "why" under a
section headline.

## Icon features

Three columns: a line icon, a title and two lines of text.

## Quote band

A centred quote over a full-width photo. Until there's a real quote from a
real person, it shows a placeholder.

## Big stats

An intro on the left and big numbers stacked on the right, each with a short
label. Only numbers you can source.

## Story cards

Filter chips over portrait cards with a quote, name and role. The chips use
`Chip` from `ds/`. Quotes and portraits are placeholders until they're real.

## Newsroom

One lead story and four smaller ones, with date and headline over the photo.
On Harness it shows the latest release notes.

## Logo grid

A hairline grid of customer logos.

## Logo strip

A row of customer or partner logos. The slots show placeholders until you
bring real logos and permission to use them — the harness never draws them.

## Brand book

A long page that tells the brand in order: principles, wordmark, colour,
type, imagery, blocks, and examples. Next after the guidelines.

## What's missing

- Display font, spacing scale for long pages, and imagery rules.
- The brand book page.

## Rules

- Harness brand is for Design Harness's own pages. Never in a prototype; never
  for the company's marketing.
- Patterns only from references — no logos, imagery, or wording, and no
  naming the sources on these pages.
- Only real numbers, quotes, and logos.
