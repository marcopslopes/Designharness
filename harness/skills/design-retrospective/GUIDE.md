# Design retrospective — how it works

The **design-retrospective** skill runs a structured post-ship (or
milestone) reflection from the task folder and your journal entries for
the project.

Agents load [`harness/skills/design-retrospective/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/design-retrospective/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` |
| Distinct from | `research-agent` verdict (metrics), `design-rationale` (one decision) |

---

## What you say

- "Retro this project"
- "What did we learn from referral entry-points?"
- "Close out this project — design retrospective"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| After share / ship | "Reflect on what worked before I start the next one" |
| Spike abandoned | "Retro the abandoned direction so we don't forget why" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 39.

---

## Related

| Doc | Role |
|-----|------|
| [`harness/skills/session-journal/SKILL.md`](../session-journal/SKILL.md) | Journal entries read as evidence |
| [`design-debt-tracker`](../design-debt-tracker/GUIDE.md) | Open promises to name |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
