# Adaptive interfaces — how it works

The **adaptive-interfaces** skill maps system/user preference support
(reduced motion, contrast, text size, density) — and **refuses the company
product dark mode**.

Agents load [`harness/skills/adaptive-interfaces/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/adaptive-interfaces/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` |
| Distinct from | `motion-choreography` (motion specs), `responsive-patterns` (breakpoints) |

---

## What you say

- "Adaptive interface check"
- "Does this respect reduced motion and system text size?"
- "High contrast / prefers-contrast pass"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Before share | "Preference map — motion, contrast, text size" |
| Someone asks for dark mode | Skill declines product dark mode (the company rule) |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 64.

---

## Related

| Doc | Role |
|-----|------|
| [`motion-choreography`](../motion-choreography/GUIDE.md) | Reduced-motion alternatives (spec / review / opportunities modes) |
| [`accessibility-decisions`](../accessibility-decisions/GUIDE.md) | When a prefers-* tradeoff needs an ADR / eng handoff |
| [`interface-change-review`](../interface-change-review/GUIDE.md) | Diff-scoped craft if the change regressed prefs support |
| [`cognitive-accessibility`](../cognitive-accessibility/GUIDE.md) | Mental load |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
