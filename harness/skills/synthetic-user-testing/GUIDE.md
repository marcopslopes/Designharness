# Synthetic user testing — how it works

The **synthetic-user-testing** skill walks a prototype through key tasks
*as* named personas / the company archetypes. Findings are advisory lab
friction — **not** validation.

Agents load [`harness/skills/synthetic-user-testing/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/synthetic-user-testing/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` |
| Distinct from | `usability-test-guide` (real UT), `research-artifacts` (builds personas) |

---

## What you say

- "Walk through this as a busy provider"
- "Synthetic UT on the referral banner"
- "Persona walkthrough — keyboard-only"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Before recruiting | "Stress-test this flow as Ceci before we book sessions" |
| After a fix round | "Re-walk the error path as a one-handed mobile user" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 38.

---

## Honest limit

Every report must say: synthetic only — not a substitute for real
participants.

---

## Related

| Doc | Role |
|-----|------|
| [`usability-test-guide`](../usability-test-guide/GUIDE.md) | Real UT next step |
| [`live-page-review`](../live-page-review/GUIDE.md) | Optional live/local capture so the walkthrough uses a real a11y tree |
| [`research-artifacts`](../research-artifacts/GUIDE.md) | Persona source |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
