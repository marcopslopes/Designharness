# Spacing — design tokens

## Summary

Spacing tokens are used **throughout the design system** for consistent layout and padding.


## Spacing tokens

| Token        | Desktop | Mobile | Usage |
|-------------|---------|--------|--------|
| `spacing/00` | 0px    | 0px    | Zero spacing. Remove gaps and reset padding between closely related elements. |
| `spacing/01` | 2px    | 2px    | Micro spacing. Hairline gaps and minimal separation between elements. |
| `spacing/02` | 4px    | 4px    | Tight spacing. Compact padding within dense UI components and inputs. |
| `spacing/03` | 8px    | 8px    | Small spacing. Tight internal padding and closely grouped element gaps. |
| `spacing/04` | 12px   | 12px   | Medium-small. Compact component padding and tight list item gaps. |
| `spacing/05` | 16px   | 16px   | Base spacing. Standard element padding and default layout gaps. |
| `spacing/06` | 24px   | 24px   | Medium spacing. Section padding and generous component internal spacing. |
| `spacing/07` | 32px   | 32px   | Large spacing. Card padding and generous whitespace between sections. |
| `spacing/08` | 40px   | 40px   | XL spacing. Layout-level padding and major content section separations. |
| `spacing/09` | 48px   | 48px   | Section spacing. Page-level padding and large content block gaps. |
| `spacing/10` | 56px   | 56px   | Wide spacing. Generous page margins and spacious layout sections. |
| `spacing/11` | 64px   | 64px   | Extra-wide. Page-top padding and large structural layout spacers. |
| `spacing/12` | 80px   | 80px   | Maximum spacing. Hero padding and full-page layout gutter spacing. |

## Semantic tokens referenced in the frame

| Token path       | Example fallback |
|------------------|------------------|
| `border/default` | `#a7aaae` |
| `surface/brand`  | `#4f46e5` (spacing swatches) |
| `bg/muted`       | `#eff0f0` |
| `surface/default`| `white` |
| `text/default`   | `#0c0d0e` |
| `text/secondary` | `#83878e` |
| `text/muted`     | `#60646b` |
| `text/link/primary/default` | `#025e64` |
| `radius/01`      | `4px` |

## Implementation notes

- **Desktop and mobile** values match for every step in this frame.
- Swatches visualize **width** of the spacing step (brand bars).

---

