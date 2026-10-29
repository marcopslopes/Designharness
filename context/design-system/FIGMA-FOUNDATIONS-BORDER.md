# Border — design tokens

## Summary

Defines the **border thickness scale** used for outlines, dividers, and interactive states.


## Border thickness tokens

| Token       | Desktop | Mobile | Usage |
|------------|---------|--------|--------|
| `border/01` | 1px   | 1px    | Hairline border. Use for subtle dividers, input outlines, and card borders. |
| `border/02` | 2px   | 2px    | Standard border. Use for focused inputs, active states, and emphasis outlines. |
| `border/03` | 4px   | 4px    | Bold border. Use for strong emphasis, selected states, and highlight outlines. |

## Semantic tokens referenced in the frame

These names appear in the exported layout as CSS variables / token paths (values shown are fallbacks from the design export):

| Token path        | Example fallback |
|-------------------|------------------|
| `border/default`  | `#a7aaae` |
| `border/brand`    | `#4f46e5` |
| `bg/muted`        | `#eff0f0` |
| `surface/default` | `white` |
| `text/default`    | `#0c0d0e` |
| `text/secondary`  | `#83878e` |
| `text/muted`      | `#60646b` |
| `text/link/primary/default` | `#025e64` |
| `radius/04`       | `16px` (outer container) |
| `radius/01`       | `4px` (swatch frames) |
| `spacing/*`       | Various (e.g. `12` → 80px horizontal padding in header) |

## Typography styles (from design spec)

- **H3:** `font/family/display`, weight 700, `Font/h3/size`, line height 1.2, `font/letter-spacing/01`
- **Body large / regular:** `font/family/text`, weight 400, `Font/body large/size`, line height 1.4
- **Body large / underline:** `font/family/text`, weight 400, `font/size/04`, line height 1.4, `font/letter-spacing/02`
- **Label / bold & regular:** `font/family/text`, `Font/label/size`, line height 1.4
- **Body / bold:** `font/family/text`, `Font/body/size`, weight 700, line height 1.5

## Implementation notes

- Map token names (`border/01` … `border/03`) to your design token JSON, CSS custom properties, or theme object; **desktop and mobile match** for all three rows in this frame.
- Swatches use a transparent fill with a **brand-colored** border to illustrate thickness only.

---

