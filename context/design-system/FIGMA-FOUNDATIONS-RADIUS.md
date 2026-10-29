# Radius — design tokens

## Summary

Defines the **corner rounding scale** used for buttons, cards, inputs, and container elements.


## Radius tokens

| Token       | Desktop | Mobile | Usage |
|------------|---------|--------|--------|
| `radius/00` | 0px    | 0px    | No radius. Use for sharp-cornered elements like tables, data grids, and dividers. |
| `radius/01` | 4px    | 4px    | Small radius. Use for tags, badges, and subtly rounded interactive elements. |
| `radius/02` | 8px    | 8px    | Medium radius. Use for cards, inputs, buttons, and standard UI containers. |
| `radius/03` | 16px   | 16px   | Large radius. Use for modals, bottom sheets, and prominent containers. |
| `radius/04` | 24px   | 24px   | XL radius. Use for floating panels and large pill-style containers. |
| `radius/05` | 999px  | 999px  | Full pill radius. Use for pill badges, toggle switches, and fully rounded buttons. |

## Semantic tokens referenced in the frame

| Token path        | Example fallback |
|-------------------|------------------|
| `border/default`  | `#a7aaae` |
| `border/brand`    | `#4f46e5` |
| `border/01`       | `1px` (swatch outline) |
| `bg/muted`        | `#eff0f0` |
| `surface/default` | `white` |
| `surface/muted`   | `#eff0f0` (swatch fill) |
| `text/default`    | `#0c0d0e` |
| `text/secondary`  | `#83878e` |
| `text/muted`      | `#60646b` |
| `text/link/primary/default` | `#025e64` |
| `radius/04`       | `16px` (outer documentation frame) |

## Implementation notes

- **Desktop and mobile** values match for every step in this frame.
- Swatches use a muted fill and brand border so corner radius reads clearly.

---

