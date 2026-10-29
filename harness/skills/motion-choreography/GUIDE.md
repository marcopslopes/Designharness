# Motion choreography — how it works

The **motion-choreography** skill specs, reviews, and plans purposeful
motion (duration, easing, frequency gating, reduced-motion alternatives)
for Design Harness prototypes or eng handoff.

Agents load [`harness/skills/motion-choreography/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/motion-choreography/SKILL.md` |
| Craft bar | `harness/skills/motion-choreography/references/motion-standards.md` |
| Vocabulary | `harness/skills/motion-choreography/references/animation-vocabulary.md` |
| Recipes | `harness/skills/motion-choreography/references/recipes/` (sheet, menu, pill) |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` or `decisions.md` |
| Distinct from | `ui-agent` (implements), `interaction-design` (state matrix), `interface-change-review` (diff craft), `accessibility` / `audit` |

---

## What problem it solves

Motion either clarifies the interface or gets in the way. This skill
forces a frequency + purpose gate first, then gives you a spec, a brutal
review, a short opportunity list (with rejects), a read-only fix plan, or
the right vocabulary word — without inventing a playful brand language.

---

## What it does NOT do

- Does **not** build the screen (`ui-agent` implements)
- Does **not** replace blocking a11y / DS `audit`
- Does **not** animate keyboard or all-day actions "for polish"
- Does **not** install Emil / ui-skills packs beside the orchestrator

---

## Modes

| Mode | What you say | What you get |
|------|----------------|--------------|
| **1 — Spec** | "Motion spec for the success check — with reduced motion" | Purpose + frequency + duration/easing + reduced-motion line |
| **2 — Review** | "Review the animations on this sheet" | Before \| After \| Why table + Block/Approve |
| **3 — Opportunities** | "What could be animated here?" | Short list + **required rejected** candidates |
| **4 — Audit → plan** | "Audit the motion on this screen and plan fixes" | Prioritized findings → you pick → self-contained plans (no code edits) |
| **5 — Vocabulary** | "What's it called when the menu grows from the button?" | Exact term from the glossary |
| **6 — List** | "List the motions" | Sheet, menu, and pill, with the tokens they already use |
| **7 — Scan** | "Scan this for motion" | Read-only table of hardcoded motion, matched to a recipe or marked no recipe |
| **8 — Apply** | "Apply the sheet motion" | One proposal, then a wait. After yes, `ui-agent` edits |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenarios 37, 62, 63, 80.

---

## Craft checklist (house tone)

| Check | Rule of thumb |
|-------|----------------|
| Frequency first | 100+/day or keyboard → **no animation** |
| Purpose | Named purpose + at least one of: what changed / where next / how related |
| High-frequency | Instant or ≤150ms — no custom choreography on every toggle |
| Enter easing | `ease-out` / strong custom curve — not `ease-in` |
| Physicality | Never `scale(0)`; popovers from trigger origin |
| Press scale | Optional `0.96–0.97`; **opt out** where motion distracts (dense toolbars, keyboard-primary) |
| Soft exit | Small travel (~12px / one spacing step); exit shorter than enter; remove immediately when motion adds nothing |
| First paint | Skip enter on default toggle/tab/icon state (`initial={false}`); keep intentional page/hero enters |
| Icon swap | Optional opacity + modest scale + light blur cross-fade; bounce always `0`; frequency gate still applies |
| Interruptible | Transitions for hover/press; keyframes for one-shot sequences |
| Dual channel | Motion + a static cue (color / icon / label) |
| Spec CSS | Name properties — never `transition: all` |
| `will-change` | Only after first-frame stutter; only `transform` / `opacity` / `filter`; never `will-change: all` |
| Reduced motion | Always a parallel line |
| Opportunities | Always list what you **rejected** and why |

Foundations stay the source of truth. Full recipes:
[`motion-standards.md`](references/motion-standards.md).

---

## Related

| Doc | Role |
|-----|------|
| [`taste-feedback`](../taste-feedback/GUIDE.md) | Intensity checkpoints |
| [`interaction-design`](../interaction-design/GUIDE.md) | State matrix (timing hands off here) |
| [`interface-change-review`](../interface-change-review/GUIDE.md) | When the ask is craft on a git diff |
| [`adaptive-interfaces`](../adaptive-interfaces/GUIDE.md) | System prefs map including reduced motion |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
