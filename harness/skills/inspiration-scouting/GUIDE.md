# Inspiration scouting — how it works

The **inspiration-scouting** skill curates aesthetic and interaction
references (including cross-domain) with explicit take/leave notes.

Agents load [`harness/skills/inspiration-scouting/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/inspiration-scouting/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` + `sources.md` |
| Distinct from | `competitor-scan` (named competitor facts), `benchmark` (scored gaps) |

---

## What you say

- "Show me inspiration for calm empty states"
- "Mood board for this checkout — cross-domain OK"
- "What could this feel like without leaving Foundations?"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Stuck on feel | "Aesthetic references for busy-pro efficiency" |
| Before `ui-agent` | "Inspiration pass, then I'll pick density" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 40.

---

## Related

| Doc | Role |
|-----|------|
| [`taste-feedback`](../taste-feedback/GUIDE.md) | Mid-build checks against chosen feel |
| [`harness/skills/competitor-scan/SKILL.md`](../competitor-scan/SKILL.md) | Named competitor pull |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
