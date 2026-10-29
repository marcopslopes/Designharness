# Accessibility decisions — how it works

The **accessibility-decisions** skill records accessibility choices,
tradeoffs, and engineering handoff specs so inclusive decisions survive
redesigns and handoffs — not a vague "make it accessible."

Agents load
[`harness/skills/accessibility-decisions/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/accessibility-decisions/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/decisions.md` (+ `debt.md` if deferred) |
| Distinct from | `design-rationale` (general decisions), `accessibility` (find bugs), `research-artifacts` Mode 4 (spectrum map) |

---

## What you say

- "Document this accessibility decision"
- "We can't do both — analyze the a11y tradeoff"
- "Accessibility handoff for eng on this sheet"
- "Why is a11y like this — write the ADR"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Locked an a11y pattern after debate | "Document why we went inline errors, not a banner" |
| Deadline vs full keyboard support | "Tradeoff analysis — ship partial keyboard now?" |
| Ready for ticket / eng | "Accessibility handoff for the accept sheet" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 68.

---

## Which mode

| Ask | Use |
|-----|-----|
| Record a pick + impact + WCAG | Document |
| Conflicting needs or scope cut | Tradeoff (then document the choice) |
| Implementable criteria for eng | Handoff |

---

## Related

| Doc | Role |
|-----|------|
| [`research-artifacts`](../research-artifacts/GUIDE.md) | Ability spectrum before a pick |
| [`design-rationale`](../design-rationale/GUIDE.md) | Non-a11y decision records |
| [`cognitive-accessibility`](../cognitive-accessibility/GUIDE.md) | Mental-load findings |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
