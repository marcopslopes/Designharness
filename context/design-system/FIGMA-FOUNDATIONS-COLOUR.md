# Foundations — Colour

Semantic colour tokens for backgrounds, surfaces, borders, text, and icons.
**Live values** live in `context/design-system/tokens.css` (Design Harness:
teal + plum + warm paper). Token *names* in the tables below are stable.

Groups: **background** (`bg/*`), **surface** (`surface/*`), **overlay** scrims, **border**, **text**, and **icon**.
Each table: **Token · CSS variable · Light fallback · Class · Usage**.

### Lab authority

- **Brand teal** — `--color-surface-brand` / `--kit-brand` (`#007078`). Hover: `--color-surface-brand-hover` (`#086c72`). Dark brand panels: `--color-bg-brand-dark` (`#02282b`).
- **Premium plum** — `--kit-premium` (`#4f3791`).
- **Primary buttons** — ink fill (`--kit-ink` `#14161a`), not brand teal (see ButtonShowcase).
- Legacy name “sea” — same teal as brand. See `STUDIO-OS-KIT-NOTES.md`.

---

## Background (`bg/*`)

Page- and region-level backgrounds (canvas, wells, brand panels).

| Token | CSS variable | Light fallback | Class | Usage |
|-------|----------------|----------------|-------|-------|
| `bg/brand/dark` | `--bg/brand/dark` | #02282b | `.bg-brand-dark` | Dark brand background. Use for high-contrast brand panels and footer regions. |
| `bg/brand/red` | `--bg/brand/default` | #007078 | `.bg-brand-red` | Legacy token name “red”; light fallback is **brand teal** (same as `surface/brand`). Use for promotional banners and brand-forward UI sections. |
| `bg/default` | `--bg/default` | #ffffff | `.bg-default` | Default page background. Use for the main canvas and full-width layout areas. |
| `bg/muted` | `--bg/muted` | #f5f5f5 | `.bg-muted` | Subtle off-white (Zinc-100). Use for sidebars, grouped sections, or content wells. |

---

## Surface (`surface/*`)

Fills for **components** (cards, buttons, chips, banners, states) — raised above `bg/*`.

| Token | CSS variable | Light fallback | Class | Usage |
|-------|----------------|----------------|-------|-------|
| `surface/brand` | `--surface/brand` | #007078 | `.surface-brand` | Brand **teal** surface; primary brand colour. Use for components that need strong brand presence. |
| `surface/danger/active` | `--surface/danger/active` | #b42318 | `.surface-danger-active` | Danger action surface in the active state. Use for focused destructive buttons. |
| `surface/danger/hover` | `--surface/danger/hover` | #951c13 | `.surface-danger-hover` | Danger action surface on hover. Provides hover feedback on destructive actions. |
| `surface/danger/pressed` | `--surface/danger/pressed` | #991b1b | `.surface-danger-pressed` | Danger surface when pressed. Used for tactile feedback on destructive actions. |
| `surface/default` | `--surface/default` | #ffffff | `.surface-default` | Default surface for cards, modals, panels, and all raised UI components. |
| `surface/disabled` | `--surface/disabled` | #f5f5f5 | `.surface-disabled` | Surface for disabled UI components. Signals non-interactive state to users. |
| `surface/discovery` | `--surface/discovery` | #fee2e2 | `.surface-discovery` | Use for discovery flows, onboarding prompts, and promotional UI surfaces. |
| `surface/error` | `--surface/error` | #f9e3df | `.surface-error` | Error state surface. Use for error banners, inline errors, and form validation. |
| `surface/highlight` | `--surface/highlight` | #e5e7eb | `.surface-highlight` | Highlighted surface for featured cards, promoted content, or callout areas. |
| `surface/info` | `--surface/info` | #e5f6f7 | `.surface-info` | Informational surface. Use for info banners, inline tips, and callout cards. |
| `surface/inverse` | `--surface/inverse` | #14161a | `.surface-inverse` | Dark inverted surface for components displayed against light backgrounds. |
| `surface/muted` | `--surface/muted` | #f5f5f5 | `.surface-muted` | Muted surface. Use for secondary cards or sidebar panels. |
| `surface/overlay/dark` | `--surface/primary/active` | #086c72 | `.surface-overlay-dark` | Dark brand overlay. Use for inactive states and pressed interactions. |
| `surface/overlay/light` | `--surface/overlay/light` | rgba(255,255,255,0.2) | `.surface-overlay-light` | Light semi-transparent overlay on dark content. Use for hover and focus states. |
| `surface/primary/active` | `--surface/primary/active` | #086c72 | `.surface-primary-active` | Primary interactive surface in the active state. Use for focused CTA buttons. |
| `surface/primary/hover` | `--surface/primary/hover` | #054f54 | `.surface-primary-hover` | Primary interactive surface on hover. Provides hover feedback on CTA buttons. |
| `surface/primary/pressed` | `--surface/primary/pressed` | #02282b | `.surface-primary-pressed` | Primary interactive surface when pressed. Use for tactile CTA press feedback. |
| `surface/secondary` | `--surface/secondary` | #086c72 | `.surface-secondary` | Secondary action surface. Use for secondary brand-tinted actions. |
| `surface/success` | `--surface/success` | #dff5e4 | `.surface-success` | Success state surface. Use for success banners, toasts, and confirmation UI. |
| `surface/success-bold` | `--surface/success-bold` | #2ea043 | `.surface-success-bold` | Bold success surface for high-emphasis confirmations and status indicators. |
| `surface/transparent` | `--surface/transparent` | rgba(255,255,255,0) | `.surface-transparent` | Fully transparent surface. Use to reset backgrounds on overlapping elements. |
| `surface/warning` | `--surface/warning` | #fef3c7 | `.surface-warning` | Warning state surface. Use for caution banners, alerts, and warning messages. |

---

## Overlay (`overlay/*`)

Full-viewport **scrims** behind modals and drawers (separate from `surface/overlay/*` on components).

| Token | CSS variable | Light fallback | Class | Usage |
|-------|----------------|----------------|-------|-------|
| `overlay/dark` | `--border/default` | #9ca3af | `.overlay-dark` | Dark scrim cue. Use to dim backgrounds behind modals, drawers, and popovers. |
| `overlay/light` | `--overlay/light` | rgba(255,255,255,0.4) | `.overlay-light` | Light scrim. Use over dark content to reduce contrast and focus attention. |

---

## Border (`border/*`)

Strokes and outlines for inputs, cards, selection, focus, and inverse contexts.

| Token | CSS variable | Light fallback | Class | Usage |
|-------|----------------|----------------|-------|-------|
| `border/brand` | `--border/brand` | #007078 | `.border-brand` | Brand-coloured border. Use to highlight brand elements or active states. |
| `border/default` | `--border/default` | #9ca3af | `.border-default` | Standard border for inputs, cards, and dividers. The most commonly used border. |
| `border/disabled` | `--border/disabled` | #9ca3af | `.border-disabled` | Border for disabled form inputs and interactive elements. Pair with disabled fill. |
| `border/error` | `--border/error` | #b42318 | `.border-error` | Error state border for form inputs, selections, and other validated elements. |
| `border/focus` | `--border/focus` | #0ba3ad | `.border-focus` | Keyboard accessibility focus ring. Always visible for all keyboard nav states. |
| `border/highlight` | `--border/highlight` | #6b7280 | `.border-highlight` | Emphasised border for callout boxes, selected rows, or highlighted elements. |
| `border/inverse/default` | `--border/inverse/default` | #ffffff | `.border-inverse-default` | Default border for elements displayed on dark or brand-coloured inverse surfaces. |
| `border/inverse/muted` | `--border/inverse/muted` | #f5f5f5 | `.border-inverse-muted` | Subtle border for use on dark or brand-coloured inverse surfaces. |
| `border/muted` | `--border/muted` | #e5e7eb | `.border-muted` | Subtle low-emphasis border. Use for section dividers that sit behind content. |
| `border/outline/active` | `--border/outline/active` | #9ca3af | `.border-outline-active` | Active outline for interactive elements. Used alongside primary focus states. |
| `border/outline/hover` | `--border/outline/hover` | #6b7280 | `.border-outline-hover` | Outline shown on hover. Provides visual feedback for hoverable interactive items. |
| `border/outline/pressed` | `--border/outline/pressed` | #52525b | `.border-outline-pressed` | Outline shown on press. Used to provide tactile feedback for interactive elements. |
| `border/selected` | `--border/selected` | #4b5563 | `.border-selected` | Border indicating the selected or active state of a navigable or selectable item. |
| `border/success` | `--border/success` | #258438 | `.border-success` | Success state border. Use on validated form fields or success confirmation UI. |

---

## Text (`text/*`)

Copy, links, and semantic text colours.

| Token | CSS variable | Light fallback | Class | Usage |
|-------|----------------|----------------|-------|-------|
| `text/brand` | `--text/brand` | #007078 | `.text-brand` | Brand-coloured text. Use sparingly for brand emphasis or inline sale items. |
| `text/danger` | `--text/danger` | #ffffff | `.text-danger` | Danger text for use within destructive components like delete confirmations. |
| `text/dark` | `--text/dark` | #02282b | `.text-dark` | Dark brand text for reversed layouts or emphasis on light brand-tinted surfaces. |
| `text/default` | `--text/default` | #14161a | `.text-default` | Primary text colour for body copy, headings, labels, and all core content. |
| `text/disabled` | `--text/disabled` | #6b7280 | `.text-disabled` | Disabled state text. Signals a field or element is inactive and non-editable. |
| `text/error` | `--text/error` | #951c13 | `.text-error` | Error message text for form validation, inline errors, and destructive feedback. |
| `text/info` | `--text/info` | #2cb9c0 | `.text-info` | Informational text. Use alongside info icons in banners and tooltip copy. |
| `text/inverse` | `--text/inverse` | #fafaf7 | `.text-inverse` | Text for use on dark, brand-coloured, or high-contrast inverse backgrounds. |
| `text/light` | `--text/light` | #ffffff | `.text-light` | Light-coloured text for dark backgrounds, hero sections, or brand panels. |
| `text/link/primary/default` | `--text/link/primary/default` | #007078 | `.text-link-primary-default` | Primary link colour in the default state. Use for in-body and nav link text. |
| `text/link/primary/hover` | `--text/link/primary/hover` | #054f54 | `.text-link-primary-hover` | Primary link colour on hover. Provides hover feedback for interactive links. |
| `text/link/secondary/default` | `--text/link/secondary/default` | #14161a | `.text-link-secondary-default` | Secondary link on dark surfaces. Use for links within inverse or brand panels. |
| `text/link/secondary/hover` | `--text/link/secondary/hover` | #6b7280 | `.text-link-secondary-hover` | Secondary link on hover, on dark surfaces. Use for inverse panel link feedback. |
| `text/muted` | `--text/muted` | #6b7280 | `.text-muted` | Low-emphasis text for placeholder copy, helper hints, and metadata labels. |
| `text/secondary` | `--text/secondary` | #4b5563 | `.text-secondary` | Secondary supporting text. Use for subtitles, captions, and supplementary copy. |
| `text/success` | `--text/success` | #258438 | `.text-success` | Success state text. Use in confirmation messages, toasts, and status labels. |

---

## Icon (`icon/*`)

Icon strokes and fills — parallel to **Text** where names align (`default`, `muted`, `link/*`, etc.).

| Token | CSS variable | Light fallback | Class | Usage |
|-------|----------------|----------------|-------|-------|
| `icon/brand` | `--icon/brand` | #007078 | `.icon-brand` | Brand-coloured icon. Use for primary brand icons and high-emphasis elements. |
| `icon/danger` | `--icon/danger` | #ffffff | `.icon-danger` | Danger icon colour for destructive actions, error indicators, and alerts. |
| `icon/dark` | `--icon/dark` | #02282b | `.icon-dark` | Dark brand icon for reversed-contrast layouts and light brand-tinted backgrounds. |
| `icon/default` | `--icon/default` | #14161a | `.icon-default` | Default icon colour. Use for all standard icons in core UI contexts. |
| `icon/disabled` | `--icon/disabled` | #6b7280 | `.icon-disabled` | Disabled icon colour. Use when the associated action or feature is unavailable. |
| `icon/error` | `--icon/error` | #b42318 | `.icon-error` | Error icon colour. Use in error messages, failed validations, and alert indicators. |
| `icon/info` | `--icon/info` | #2cb9c0 | `.icon-info` | Informational icon colour. Use in info banners, tooltips, and status indicators. |
| `icon/inverse` | `--icon/inverse` | #ffffff | `.icon-inverse` | Icon colour for use on dark, brand-coloured, or high-contrast inverse surfaces. |
| `icon/light` | `--icon/light` | #ffffff | `.icon-light` | Light icon for dark backgrounds, brand panels, and inverse hero sections. |
| `icon/link/danger` | `--icon/link/danger` | #b42318 | `.icon-link-danger` | Danger icon colour for destructive link elements and hazard-related actions. |
| `icon/link/default` | `--icon/link/default` | #007078 | `.icon-link-default` | Icon colour for link elements in the default state. Matches primary link colour. |
| `icon/link/inverse` | `--icon/link/inverse` | #ffffff | `.icon-link-inverse` | Icon colour for links on inverse surfaces. Matches secondary link text colour. |
| `icon/muted` | `--icon/muted` | #6b7280 | `.icon-muted` | Muted icon colour for subtle, low-emphasis, or purely decorative icon elements. |
| `icon/secondary` | `--icon/secondary` | #6b7280 | `.icon-secondary` | Secondary icon colour. Use for supporting or decorative icons beside primary text. |
| `icon/success` | `--icon/success` | #2ea043 | `.icon-success` | Success icon colour. Use in success toasts, confirmations, and status indicators. |
| `icon/warning` | `--icon/warning` | #b86a00 | `.icon-warning` | Warning icon colour. Use in caution banners and indicators needing user attention. |
