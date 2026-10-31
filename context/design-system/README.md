# `context/design-system/`

Token-first design system source of truth for this repo — see `harness/ORCHESTRATOR.md`
§7 for the actual hard rules and component API, `AGENTS.md`/`CLAUDE.md` for
the thin pointers that load it into every agent session.

**2026-08-11 — colour/type/depth authority: Design Harness kit** (teal +
plum + warm paper), light + dark. Source:
`source/design-harness-kit/` — see `STUDIO-OS-KIT-NOTES.md`. Inter
type stack kept. Headers and sheets are in `ds/Header.tsx` and
`ds/Sheet.tsx`. Segmented control is in `ds/SegmentedControl.tsx`.

- `tokens.css` — `--kit-*` (teal/plum/warm paper) **plus** remapped `--ds-*` /
  `--color-*` + kept geometry scales (button radii aligned to 16px family).
- `source/design-harness-kit/` — visual/component pattern authority.
- `ds/` — primitives; Button matched to kit ButtonShowcase; other kit-migrated
  controls still on `--kit-*` with new palette.
- `FIGMA-FOUNDATIONS-*.md` — taxonomy docs; trust `tokens.css` for live values.

**Lab / prototype-only CSS variables** (referral heroes, phone-frame sizes,
waitlist one-offs, etc.) live in
[`src/design-harness/styles/tokens.lab.css`](../../src/design-harness/styles/tokens.lab.css)
— not in this folder. Promote into `tokens.css` only when Figma-backed.

Moved here from `src/ds` + `src/tokens.css` + `docs/FIGMA-*.md` by the IA
migration (`!4`) — see `harness/references/design-system-rules.md` §7's migration note for the
before/after path map.

## How agents enforce this

The **design-system** skill runs a pre-write token check and the three-layer
rule (real DS vs Design Harness chrome vs per-prototype CSS) whenever `ui-agent`
builds a screen — and on direct asks like “is this a real token?”

- Human guide: [`harness/skills/design-system/GUIDE.md`](../../harness/skills/design-system/GUIDE.md)
- Agent protocol: [`harness/skills/design-system/SKILL.md`](../../harness/skills/design-system/SKILL.md)
- Hard rules: [`harness/ORCHESTRATOR.md`](../../harness/ORCHESTRATOR.md) §7

## No Storybook

This repo used Storybook (`.storybook/`, `src/stories/`) as a component
catalog through mid-2026. It was **deliberately removed** (`!2`, "chore:
remove Storybook") — not accidentally dropped — once Design Harness
(`src/design-harness/`, run via `npm run dev`) became the single living catalog
and sandbox for these primitives, covering the same "browse every
component/token" need without a second, separately-maintained tool. If you
find a stray "see Storybook" reference outside a dated historical doc, it's
stale — point it at Design Harness instead.
