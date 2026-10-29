# Toast — Northline Design System (component spec)

**File key:** *(your Figma library's key — record it in `COMPANY-BUSINESS.md`, org-pack)*

## What this repo implements

| Area | Code |
|------|------|
| Tokens (fills per tone, border, shadow, pill radius) | `context/design-system/tokens.css` (`--ds-toast-*`) |
| Markup + `tone` prop | `context/design-system/ds/Toast.tsx` |
| Visual rules | `context/design-system/ds/ds.css` (`.ds-toast`) |
| Catalog | Design Harness → Components section (`npm run dev`) |

**Tones** map to Figma **Toast** variants: **Positive** (green), **Warning**, **Negative**, **Sea**, **Informative**. The pill uses a **white** border and **Label/L** white text per spec. In this lab, the **Sea** tone’s fill uses **brand teal** (`--color-surface-brand`) so it aligns with Foundations primary colour authority, not the DS Sea accent hex.

Positioning (top-center, bottom, etc.) is left to the host screen — wrap `<Toast>` in a positioned container (see referral wallet prototype).

When values change in Figma, update **`tokens.css`** first, then **`ds.css`**, then refresh Design Harness (`npm run dev`).
