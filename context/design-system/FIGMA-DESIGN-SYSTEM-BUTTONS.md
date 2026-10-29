# Buttons — Northline Design System (component spec)

**File key:** *(your Figma library's key — record it in `COMPANY-BUSINESS.md`, org-pack)*

## What this repo implements

| Area | Code |
|------|------|
| Tokens | `context/design-system/tokens.css` (`--ds-*` button + brand tokens) |
| Primary / Secondary / Tertiary | `ds/Button.tsx` + `.ds-button` in `ds.css` |
| FAB / Back to top | `ds/Fab.tsx`, `ds/FabExpanded.tsx`, `ds/BackToTop.tsx` |
| Brands | `ds/BrandButton.tsx` |
| Square / Dashed | `ds/SquareButton.tsx`, `ds/DashedButton.tsx` |
| App split / Complete setup / Toggle / Customer selector | `ds/AppSplitButton.tsx`, `ds/CompleteSetupButton.tsx`, `ds/ToggleSelectionButton.tsx`, `ds/AppointmentCustomerSelector.tsx` |
| Catalog | Design Harness `#/design-system/button` (+ primary, secondary, ghost, fab, brands, special) |

## `Button` API (text buttons)

| Prop | Values |
|------|--------|
| `variant` | `primary` \| `secondary` \| `ghost` (ghost = Figma Tertiary) |
| `size` | `sm` (24) \| `md` (32) \| `lg` (48) |
| `tone` (primary) | `sea` \| `black` \| `white` \| `gray` \| `legacy_brand` |
| `tone` (secondary) | `white` \| `destructive` \| `outlined` |
| `tone` (ghost) | `black` \| `gray` \| `sea` \| `white` |
| `startIcon` / `endIcon` | optional `ReactNode` |
| `active` | sustained selected / on (`data-active` + `aria-pressed`); hover + `:active` press still apply |
| `ripple` | pointer-origin ink ripple (default `true`; off with `ripple={false}`) |

**Primary Sea** uses `--ds-additional-background-sea` (`#218cac`), matching Figma Type=Sea — not Foundations brand teal.

### Interaction states

| State | How |
|-------|-----|
| **Hover** | `:hover` — DS `*-hover` fills + soft elevation (`--ds-button-shadow-hover`) |
| **Press** | `:active` — `*-press` fills, scale `0.97`, tighter shadow |
| **Ripple** | pointer-origin ink (`--ds-button-ripple-light` / `dark`); respects `prefers-reduced-motion` |
| **Active** | `active` prop / `data-active="true"` — sustained hover-level look |
| **Disabled** | `:disabled` — skips hover / press / ripple / active |

Same model on `Button`, `Fab`, `BrandButton`, and `BackToTop`.

## Specialized components

| Figma family | Component |
|--------------|-----------|
| FAB | `<Fab size="xs\|sm\|lg" tone="black\|white">` |
| FAB Expanded | `<FabExpanded actions={[…]} />` |
| Back to top | `<BackToTop size="sm\|lg" />` |
| Brands Buttons | `<BrandButton variant="apple-color\|…\|klarna" />` |
| Square Button | `<SquareButton tone="white\|black-selected\|sea-selected\|disabled" />` |
| Dashed Button | `<DashedButton shape="circle\|square\|square-filled" />` |
| App Split Button | `<AppSplitButton appType="biz\|customer" />` |
| Complete setup | `<CompleteSetupButton progress={70} />` |
| Toggle Selection | `<ToggleSelectionButton pressed />` |
| Appointment Customer Selector | `<AppointmentCustomerSelector />` |

## Light / dark

Design Harness theme (`data-design-harness-theme`) remaps Foundations + DS **page** tokens.
**Type White** / secondary white use `--ds-button-contrast-*` (always light fill + dark label).
**Type Black** keeps absolute black ink + `--ds-button-solid-ring` on dark for edge definition.
Do not bind White buttons to `--ds-core-background-primary` — that token is the page surface and flips in dark.

When values change in Figma, update **`tokens.css`** first, then **`ds.css`** / components, then refresh Design Harness.
