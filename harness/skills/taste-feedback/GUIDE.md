# Taste feedback — how it works

The **taste-feedback** skill runs mid-build aesthetic checkpoints so
"on-token but feels wrong" gets caught before a full critique.

Agents load [`harness/skills/taste-feedback/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/taste-feedback/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/decisions.md` |
| Distinct from | `ux-pattern` critique, `audit`, the taste log (`preferences.md`) |

---

## What you say

- "Taste check this screen"
- "Does this density feel right?"
- "Mid-build visual check before I keep going"
- "Polish this" / "UI craft review" (existing surface — optional findings table)

**Situations:**

| Situation | What you say |
|-----------|----------------|
| First styled Design Harness pass | "Is heading weight + card density heading the right way?" |
| Unsure about CTA loudness | "Taste check — is Sea primary too loud on this quiet list?" |
| Nested cards look pinched | "Taste check — concentric radii on this card stack?" |
| Photo sits flat on the surface | "Does this image need a neutral edge token?" |
| Existing screen polish pass | "Polish review this settings sheet — non-motion only" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 36.

---

## Craft checklist (Foundations-bound)

Useful mid-build prompts — still only Foundations / `ds` tokens:

| Check | Ask |
|-------|-----|
| Nested corners | Do radii look concentric (`outer ≈ inner + padding`)? |
| Airy nesting | If the gap is large (~two spacing steps / ~24px+), pick radii independently — don't force concentric math |
| Icon + label | Is alignment optical, not just geometrically centered? (Slightly less padding on the icon side via the nearest spacing token when it looks off) |
| Depth | Shadow for elevation, border for structure/state? |
| Image edge | Do photos need a neutral Foundations border/outline token so they don't dissolve into the surface? (Never invent `oklch` / accent-tinted rings) |
| Icon weight | Does a hairline icon look broken next to bold label text? Flag it — don't override `Icon` stroke defaults |
| States | Walked hover / focus / active / loading / empty? |
| Grouping | Space groups content (inter ≥ ~2× intra); separators last? |
| Controls | Actions look interactive; static text doesn't look tappable? |
| Disclosure | Hidden content has a peek / chevron / "Show N more"? |
| Type | Heading hierarchy descends; updating numbers don't jump width (prefer `font-variant-numeric` over raw feature tags)? |
| Wrap | `balance`/`pretty` where appropriate; `overflow-wrap` on long URLs/IDs; `nowrap` on chips/badges that shouldn't break? |
| Justify | Interface copy is start-aligned — not justified? |
| Underlines | Descenders clear (`from-font` / skip-ink when supported)? |
| Size floors | Body on Foundations body; labels on label tokens — nothing below the smallest Foundations step? |
| Leading | Headings tight, body looser; wrapping copy not `leading-none`? |
| Weight | UI text below ~18px at regular+; thin weights display-only? Loaded faces (not faux-bold)? |
| Inputs | Mobile fields still ≥16px equivalent? If design wants smaller, ask size-up vs scale() — don't silently pick |
| Selection | Useful text still selectable? |
| Primary fill | Only one filled primary action in the view? |
| Real lengths | Checked wrap/truncation with realistic strings and widths? |

### Polish review (existing surface, non-motion)

Say "polish this" / "UI craft review" when you want a findings table instead of
mid-build questions:

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|

Motion findings stay with [`motion-choreography`](../motion-choreography/GUIDE.md)
Mode 2 — don't mix them into this table.

---

## Related

| Doc | Role |
|-----|------|
| [`inspiration-scouting`](../inspiration-scouting/GUIDE.md) | Pre-build feel references |
| [`motion-choreography`](../motion-choreography/GUIDE.md) | When the question is motion (frequency gate + 5 modes) |
| [`interface-change-review`](../interface-change-review/GUIDE.md) | Craft review scoped to a git diff |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
