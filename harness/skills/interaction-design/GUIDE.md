# Interaction design — how it works

The **interaction-design** skill produces a state × screen-reader ×
keyboard × touch matrix plus feedback timing for interactive controls.
For destructive or error-prone actions, it also picks a level on the
**error-prevention hierarchy** and decides **undo vs. confirm**.

Agents load [`harness/skills/interaction-design/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/interaction-design/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` |
| Distinct from | `ui-agent` (implements), `motion-choreography` (duration/easing/reduced-motion modes), `accessibility` |

---

## What you say

- "State matrix for this control"
- "Interaction spec — loading and error feedback"
- "Map disabled / focus / error for this form"
- "Should this be a confirm dialog or should we just let them undo it?"
- "Error prevention for this delete action"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Before eng handoff | "Full interaction matrix for the share CTA" |
| Flaky prototype states | "What should loading and failure look like?" |
| Destructive action (delete, cancel, remove) | "Undo or confirm for deleting a saved card?" |
| Team defaults to a confirm modal for everything | "Check this against the error-prevention hierarchy first" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 61.

---

## Error prevention & destructive actions

When a control can destroy or lose user data, the skill picks a level on
a 6-level hierarchy before it writes the interaction spec —
**eliminate → prevent → detect early → recover gracefully → explain
clearly → diagnose** — always preferring the highest level that's
feasible, so "add a confirm dialog" isn't the reflexive first answer.

Once a level is picked, the skill decides **undo vs. confirm**: cheap,
reversible, low-blast-radius actions get an undo toast (never a modal);
expensive, irreversible, or high-blast-radius actions (billing, data
loss affecting others) get a confirm dialog — and confirm dialogs that
fire on every action, trained-out by habit, are a smell that the action
should have been made undoable instead.

Full hierarchy + recovery-flow templates (network error, server error,
session expiry, concurrent-edit conflict):
[`harness/skills/interaction-design/references/error-prevention.md`](references/error-prevention.md).

---

## Related

| Doc | Role |
|-----|------|
| [`motion-choreography`](../motion-choreography/GUIDE.md) | Motion timing for those states (spec / review / opportunities) |
| [`interface-change-review`](../interface-change-review/GUIDE.md) | When reviewing interaction regressions on a branch |
| [`documentation/skills/content.md`](../../../documentation/skills/content.md) | Error/confirm copy once the level + undo-vs-confirm decision is made |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
