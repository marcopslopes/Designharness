# Design system rules

Moved from `harness/ORCHESTRATOR.md` §7. `ui-agent` and `design-system` load this before composing. A citation of orchestrator §7, §7.1, or §7.3 means this file. Not loaded on other turns.


## 7. Design system rules — the design language brain

This section is the single home for the design rules (see "One source for
hard rules" at the end of this section). It supplies *how* to build once
§§0–4 have decided *what* to build. Load it before composing anything.

### 7.0 What this product is

This section resolves to your company's own product framing — read
`COMPANY-BUSINESS.md` (via `context/org-pack.local/` if it exists on this
machine, else the public `context/org-pack/` example) for the real facts:
what the product is, who it's for, the strategic pillars, and the brand
colour. Never hardcode a specific company's product description here in
the shared orchestrator — that keeps this file portable across clones.

The **design system** below (Design Harness kit) is genuinely generic — it ships
with this harness and isn't tied to any one company's product framing.

**Lab DS brand (2026-08-11):** Design Harness kit authority —
**teal** (`#007078` → `--color-surface-brand` / `--kit-brand`), **plum**
premium (`#4f3791`), warm paper canvas (`#fafaf7`). Type is **Inter** +
**JetBrains Mono**. Token *names* are stable; values follow
`STUDIO-OS-KIT-NOTES.md`.

### 7.1 Hard rules — never break these

1. **Tokens only, no raw values.** Every colour, spacing step, radius, and
   border width must come from a CSS variable in
   `context/design-system/tokens.css`. Never write `#rrggbb`, `px`, or
   `rem` literals in component styles. If a token is missing, add it to
   `tokens.css` first (extend it to match Figma — don't invent a one-off
   value instead).
2. **Compose from `context/design-system/ds`, not ad-hoc markup.** Import
   from the `context/design-system/ds` barrel (index) in app code so
   `ds.css` always loads. Available primitives: `Button`, `Card`, `Text`,
   `Stack`, `Badge`, `TextField`, `Toast`, `Icon`. Build screens from
   **Design Harness** (`npm run dev`) using these primitives before ad-hoc
   markup.
3. **Never invent components or brand marks. Never hand-draw icon SVGs.**
   If a component doesn't exist in `context/design-system/ds`, build it
   from existing primitives or request it explicitly. Do not hallucinate
   custom SVG logos or illustration assets — use text labels or assets
   the team provides. All icons come from
   [Tabler Icons](https://tabler.io/icons) (`@tabler/icons-react`) via
   the `Icon` primitive — see `harness/skills/icon-usage/GUIDE.md`.
4. **Brand teal is `--color-surface-brand` / `--kit-brand` (`#007078`).**
   Premium / plum is `--kit-premium` (`#4f3791`). Legacy token name “sea”
   (`--ds-additional-*-sea*`) keeps the name — value is the **same teal**.
   Prefer kit `Button` `intent="primary"` (ink fill) or `intent="tinted"`
   (teal soft). Secondary uses sunken fill; outline uses paper + line.
   Kit sizes: `xl`/`lg`/`md`/`sm`; radii 16px (sm 12px).
5. **Preserve accessibility.** Keep `:focus-visible` on every interactive
   element — never remove focus styles. Use semantic HTML (real
   `<button>`, labelled `<input>`, heading hierarchy) so elements are
   keyboard reachable.
6. **Documentation is the contract.** When extending tokens or components,
   cross-check `context/design-system/FIGMA-FOUNDATIONS-COLOUR.md`,
   `FIGMA-FOUNDATIONS-SPACING.md`, `FIGMA-FOUNDATIONS-RADIUS.md`,
   `FIGMA-FOUNDATIONS-BORDER.md`, `FIGMA-FOUNDATIONS-SIZE.md`, and
   typography/scaling docs so names and values stay consistent with Figma.
   For **Buttons**, use `context/design-system/FIGMA-DESIGN-SYSTEM-BUTTONS.md`
   and your Figma library's Buttons frame (recorded in your `COMPANY-BUSINESS.md`
   § Design system row — not hardcoded here).
   For **Toast**, use `context/design-system/FIGMA-DESIGN-SYSTEM-TOAST.md`
   and your Figma library's Alerts & Toast frame (same row).
7. **Dark mode is a real DS layer; prototypes stay light (updated
   2026-10-09).** `context/design-system/tokens.css` ships paired light/dark
   values for the Design Harness kit (`--kit-*`) — light on `:root` and
   `[data-theme='light']`, dark on `:root[data-theme='dark']`. The Design Harness
   theme toggle sets the root attribute, so catalog chrome and DS pages
   follow it. **Product prototypes do not:** playground routes and
   `PhoneShell` set `data-theme="light"` on `.design-harness-proto-surface`,
   because the product has no dark theme. A prototype follows the toggle
   only once its design system declares dark support (future, per-system).
   Still don't invent a *third*, one-off dark theme outside these tokens.
   See `context/design-system/STUDIO-OS-KIT-NOTES.md` for what's migrated
   vs. still pending (segment, sheets, headers — tracked in
   `KNOWN-ISSUES.md`).

### 7.2 Design sources

| What | Where |
|---|---|
| **Design Harness kit** (2026-08-11 — current colour/type/depth + button authority, light **and** dark) | `context/design-system/source/design-harness-kit/` → `tokens.css` (`--kit-*`); see `STUDIO-OS-KIT-NOTES.md` |
| **Foundations** — spacing, radius, border, type ramp *(geometry scales; colour superseded)* | Exported `FIGMA-FOUNDATIONS-*.md` — trust `tokens.css` for live hex |
| **Legacy component specs** — pending further kit migration | `FIGMA-DESIGN-SYSTEM-*.md` |
| **Systems** (2026-10-11) — Mobile (default), Desktop, Brand, Studio: what each has, what's missing, its rules; a project's brief **Platform** line picks one | `context/design-system/systems/*.md` → Design Harness `#/design-system/systems`; protocol in `harness/skills/design-system/SKILL.md` § Which system |

### 7.3 Design tokens reference

**Brand colour** (Design Harness — teal + plum + warm paper)

| Role | Token | Value | Notes |
|------|-------|-------|-------|
| Primary brand | `--color-surface-brand` / `--kit-brand` | `#007078` | Accents, tinted CTAs, links |
| Brand hover / deep | `--color-surface-brand-hover` / `--kit-brand-deep` | `#086c72` | Hover / deep |
| Dark brand panel | `--color-bg-brand-dark` | `#02282b` | Footer, hero dark sections |
| Premium | `--kit-premium` | `#4f3791` | Plum / premium intents |
| Primary button fill | `--kit-ink` | `#14161a` | Ink primary (ButtonShowcase) |
| Legacy “sea” (same teal) | `--ds-additional-background-sea` (+ aliases) | `#007078` | Name kept; value = brand |

Typography, spacing, radius, border-width and the most-used semantic
tokens: `context/design-system/TOKENS-QUICK-REFERENCE.md` (summary) and
`context/design-system/tokens.css` (source of truth). Use
`<Text variant="display|body-large|body|label|muted">` from
`context/design-system/ds` — never raw `<p>`/`<span>` with inline type styles.

### 7.4 Components — API quick reference

Prop and import cheat sheet for `Button`, `Text`, `Stack`, `Card`, `Badge`,
`TextField`, `Toast` and `Icon`: `context/design-system/COMPONENTS-QUICK-REFERENCE.md`.
Props of every other component, one line each, generated from the types:
`context/design-system/COMPONENTS-INDEX.md` (`npm run ds:index`; the build fails when it's stale).
New call sites use `Button`'s `intent` + `size` (`variant`/`tone` are deprecated).
Icons come only from `@tabler/icons-react` via `Icon` — never hand-drawn `<svg>`.

### 7.5 Stack and commands

Vite + React + TypeScript. No MUI, Tailwind, or other UI kit in this
MVP — the point is to prove **token-first** primitives. If production
later standardises on a kit, mirror these tokens into that kit's theme
rather than bypassing tokens.

| Command | Purpose |
|---------|---------|
| `npm run dev` | Run the lab locally (Design Harness MVP) |
| `npm run build` | Typecheck and production build |
| `npm run lint` | ESLint |

### 7.6 What this is not

- Do not use MUI, Tailwind, or any third-party component library output —
  this system is token-first and uses only `context/design-system/ds`
  primitives.
- Do not approximate the company with generic design system patterns. If a
  required component or token is missing, flag it rather than inventing a
  substitute.
- Do not generate placeholder logos, wordmarks, or illustration SVGs. Use
  text labels or assets the team provides.

### One source for hard rules

If you find a hard rule stated differently anywhere else in this repo,
that's a bug — fix it here and make the other location a pointer, not a
second copy.

---
