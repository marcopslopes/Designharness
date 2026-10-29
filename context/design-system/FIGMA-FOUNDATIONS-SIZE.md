# Size — design tokens

## Summary

Defines the **sizing scale** used for icons, buttons, interactive targets, and component dimensions across platforms.


## Size tokens

| Token     | Desktop | Mobile | Usage |
|-----------|---------|--------|--------|
| `size/00` | 10px   | 10px   | Tiny indicators, dots, and very compact interactive targets. |
| `size/01` | 12px   | 12px   | Small badges, status dots, and micro interactive targets. |
| `size/02` | 14px   | 14px   | Icon buttons, small tags, and compact interactive elements. |
| `size/03` | 16px   | 16px   | Small action buttons and icon-only interactive hit areas. |
| `size/04` | 18px   | 18px   | Secondary action buttons and icon container frames. |
| `size/05` | 20px   | 20px   | Standard icon dimensions, toggles, and control elements. |
| `size/06` | 24px   | 24px   | Primary icon size and standard interactive touch targets. |
| `size/07` | 28px   | 28px   | Prominent icons and standard button component heights. |
| `size/08` | 32px   | 32px   | Large icons, avatar thumbnails, and standard button dimensions. |
| `size/09` | 36px   | 36px   | Large interactive elements, spacious controls, and form inputs. |
| `size/10` | 40px   | 40px   | Primary action buttons and standard large interactive components. |
| `size/11` | 48px   | 48px   | Prominent CTAs and oversized interactive button components. |
| `size/12` | 60px   | 60px   | Display-scale icons and hero call-to-action buttons. |

## Semantic tokens referenced in the frame

| Token path        | Example fallback |
|-------------------|------------------|
| `border/default`  | `#a7aaae` |
| `border/brand`    | `#4f46e5` |
| `border/01`       | `1px` |
| `bg/muted`        | `#eff0f0` |
| `surface/default` | `white` |
| `surface/muted`   | `#eff0f0` |
| `text/default`    | `#0c0d0e` |
| `text/secondary`  | `#83878e` |
| `text/muted`      | `#60646b` |
| `text/link/primary/default` | `#025e64` |
| `radius/01`       | `4px` (swatch corners) |

## Implementation notes

- **Desktop and mobile** values are identical for all tokens in this frame.
- Swatches are square frames sized to the token value.

---

