# Cognitive accessibility — how it works

The **cognitive-accessibility** skill reviews mental load, wayfinding,
and decision complexity (COGA-style) — not just contrast/ARIA.

Agents load [`harness/skills/cognitive-accessibility/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/cognitive-accessibility/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` |
| Distinct from | `accessibility` (blocking focus/ARIA/contrast), `adaptive-interfaces` (system prefs) |

---

## What you say

- "Cognitive load check on this flow"
- "COGA review — can a stressed provider finish this?"
- "Wayfinding check — where am I / where can I go?"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Long multi-step form | "Is this too much to process per step?" |
| Busy-pro surface | "Mental load pass before we share with stakeholders" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 59.

---

## Related

| Doc | Role |
|-----|------|
| [`adaptive-interfaces`](../adaptive-interfaces/GUIDE.md) | Prefers-* adaptations |
| [`accessibility`](../accessibility/GUIDE.md) | Blocking technical a11y |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
