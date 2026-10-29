# Chips — Northline Design System (component spec)

**File key:** *(your Figma library's key — record it in `COMPANY-BUSINESS.md`, org-pack)*

## What this repo implements

| Area | Code |
|------|------|
| Tokens | `tokens.css` — `--ds-chip-height-*`, `--ds-additional-border-sea`, shared core/sea fills |
| Markup + props | `context/design-system/ds/Chip.tsx` |
| Visual rules | `ds.css` (`.ds-chip`) |
| Catalog | Design Harness `#/design-system/chip` |

## `Chip` API

| Prop | Values |
|------|--------|
| `size` | `sm` (24) \| `md` (32) \| `lg` (48) |
| `fill` | `gray` \| `black` \| `white` (Figma **Fill**) |
| `selected` | `false` \| `'black'` \| `'sea'` (Figma **Selected-Black** / **Selected-Sea**) |
| `rounded` | `true` (pill) \| `false` (8px) — Figma **Rounded** On/Off |
| `disabled` | Figma **Disabled** |
| `startIcon` / `endIcon` | optional `ReactNode` (Tabler via `Icon`) |
| `ripple` | default `true` |

### Token mapping (Figma → CSS)

| Figma | Token |
|-------|--------|
| Background/Core/backgroundSecondary | `--ds-core-background-secondary` |
| Background/Core/backgroundPrimary (White) | `--ds-button-contrast-fill` |
| Background/Additional/backgroundBlack | `--ds-additional-background-black` |
| Background/Additional/backgroundSeaLight | `--ds-additional-background-sea-light` |
| Background/Additional/backgroundDisabled | `--ds-additional-background-disabled` |
| Border/Core/borderPrimary | `--ds-core-border-primary` |
| Border/Additional/borderBlack | `--ds-additional-border-black` |
| Border/Additional/borderSea | `--ds-additional-border-sea` |
| Content/Core/contentPrimary | `--ds-core-content-primary` / contrast content |
| Content/Additional/contentDisabled | `--ds-additional-content-disabled` |
| Label/S (sm) | `--ds-font-label-s-*` |
| Label/M (md/lg) | `--ds-font-label-m-*` |

**Selected-Black** keeps the Gray/White fill and applies a black border.  
**Selected-Sea** uses sea-light fill + sea border (both Gray and White fills in Figma).

When values change in Figma, update **`tokens.css`** first, then **`ds.css`**, then refresh Design Harness.
