# Design Harness kit — new DS visual authority (2026-08-11)

**Source:** `context/design-system/source/design-harness-kit/`  
(copied from designer zip `76f0cfc5-7cbc-4cbd-a7a5-44679d555d75.zip` —
Design Harness DS component showcase; not an external product brand).

**Decision (2026-08-11):** replace Zinc/indigo lab palette with this kit’s
**teal + plum + warm paper** role-token system (designer choice **1**).
UI Kit v2 HTML remains as a secondary visual reference; **this kit is the
stronger foundations + component pattern authority**.

## What we take

| Layer | From kit | Into harness |
|-------|----------|--------------|
| Surfaces | `--c-paper` / sunken / canvas `#FAFAF7` | `--kit-paper` / `--kit-sunken` / `--kit-bg` |
| Ink | `#14161A` + muted ladder | `--kit-ink` / `--kit-ink-70` / `--kit-ink-50` |
| Brand | Teal `#007078` | `--kit-brand` / `--color-surface-brand` |
| Premium | Plum `#4F3791` | `--kit-premium` |
| Feedback | Rose / leaf / amber / danger | `--kit-rose` / leaf / amber / danger |
| Depth | `--shadow-card`, `--shadow-card-strong`, `--edge-raised` | `--kit-shadow-*` |
| Themes | `data-theme` light/dark (+ optional high-contrast later) | `:root` + `:root[data-theme='dark']` |
| Buttons | Ink primary, lifted CTAs, 16px radius family | `ds/Button` + `--kit-button-*` |

## Depth

The kit uses one deliberate shadow scale (whisper shadows in light; tonal stack + edge highlight in dark), not a generic sm→2xl ladder.

| Generic shadow | Use instead |
|----------------|-------------|
| none | `--kit-shadow-0` |
| small | `--kit-shadow-1` |
| medium to extra large | `--kit-shadow-2` (one floating tier) |
| largest | `--kit-shadow-2` or `--kit-shadow-lifted*` for CTAs |
| inset | sunken surface (`--kit-sunken`), not an inset shadow |
| glass / frosted chrome | `--kit-glass-*` + `--kit-edge-raised` |
| hairline card / list row | `--kit-shadow-border` → `--kit-shadow-border-hover` |
| pressed button | `--kit-shadow-press` |

Do **not** reintroduce a long generic shadow scale into `tokens.css`.

## What we do **not** take as-is

- A utility-class framework as a DS dependency — demos stay in `source/`; production primitives stay CSS-var + `ds.css`.
- **Proxima / Mulish** — keep **Inter** + JetBrains Mono unless revisited.
- **Domain widgets** (POS, Klarna, referral, Biz tab) — pattern library only, not core `ds/` exports.
- Raw hex in demos — extract into tokens first.

## Migration order

1. Foundations tokens — done  
2. Buttons — done  
3. Segment / EmptyState / Loader / Progress / Sheet — done  
4. FAB / Alert / Tabs / Skeleton / floating TextField — done  
5. SettingsRow / SettingsGroup / Avatar / Swiper / BackToTop + kit `data-theme` wire — done  
6. Depth & shadow showcase on DS Colours (`KitShadowShowcase` + `--kit-shadow-0` / glass blur tokens) — done  
7. Depth support tokens (`--kit-shadow-border-hover` + Border/Press/Lifted showcase + shadow map) — done  
8. Remaining kit patterns (calendars, domain cards, specialized buttons) — deferred as patterns  

See also `KNOWN-ISSUES.md` → DS replacement notes.
