# Accessibility — how it works

The **accessibility** skill is the **blocking** diagnostic for focus,
semantics, ARIA, and contrast on a named screen. It is not the full
pre-share sweep (`audit`), not cognitive load (`cognitive-accessibility`),
and not an a11y decision record (`accessibility-decisions`).

Agents load [`harness/skills/accessibility/SKILL.md`](SKILL.md)
and the shared POUR checklist (`harness/skills/audit/references/a11y-pour-checklist.md`).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/accessibility/SKILL.md` |
| POUR checklist | `harness/skills/audit/references/a11y-pour-checklist.md` (same as audit Check 2) |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Distinct from | `audit` (DS + a11y + copy share gate), `cognitive-accessibility`, `adaptive-interfaces`, `accessibility-decisions` |

---

## What you say

- "Check accessibility on this screen"
- "Focus order / ARIA / contrast — not the full audit"
- "Is this keyboard accessible?"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Before share, a11y only | "Just the a11y pass on checkout — I'll run audit later" |
| Icon buttons | "Are the icon-only controls labeled?" |
| Modal | "Does this dialog trap and restore focus?" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 48.

---

## Blocking vs advisory

**Blocking** (must fix before handoff): unlabeled controls, `div onClick`,
naked `outline: none`, unlabeled icon buttons, dialog missing
`aria-labelledby`, placeholder-as-only-label.

**Advisory** (do not promote to BLOCKING without code evidence):

| Check | Rule of thumb |
|-------|----------------|
| Hover on touch | Gate hover styles with `@media (hover: hover)` so they don't stick after tap |
| Decorative layers | `pointer-events: none` + `aria-hidden` on glows/gradients — never `aria-hidden` on a focusable control |
| Submit | Stay enabled until the request starts; validate on submit; focus first error |
| Dialog | `inert` on background; restore focus to the trigger on close |
| Skip link | First focusable when repeated chrome precedes main (advisory in Design Harness unless full-page chrome) |
| Forced colors | Custom focus rings still show in Windows High Contrast |
| Toasts | Actions/errors stay until dismissed — no timed auto-dismiss |
| Paste | Never block paste on password / OTP fields |
| Language / bidi | Set `lang` (and `dir` where direction changes); never reverse digit order; isolate mixed-direction values |

Contrast, 200% zoom, and screen-reader behaviour stay **runtime/manual**
unless evidenced in code.

---

## Related

| Doc | Role |
|-----|------|
| [`cognitive-accessibility`](../cognitive-accessibility/GUIDE.md) | Mental load / wayfinding |
| [`adaptive-interfaces`](../adaptive-interfaces/GUIDE.md) | `prefers-*` / text size / density |
| [`accessibility-decisions`](../accessibility-decisions/GUIDE.md) | Document a pick + eng handoff |
| [`design-system`](../design-system/GUIDE.md) | Tokens + pre-share `audit` |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
