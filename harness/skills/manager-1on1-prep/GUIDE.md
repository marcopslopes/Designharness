# Manager 1:1 prep — how it works

The **manager-1on1-prep** skill builds a short prep doc for a manager's
1:1 with **one named report** — questions to ask from live work data,
never conclusions about the person, never Slack DMs.

Agents load
[`harness/skills/manager-1on1-prep/SKILL.md`](SKILL.md).

**Gated:** `Role focus: manager` in `designer-profile.local.md`, with a
`Reports:` list. IC profiles get a decline + pointer to
`workload-agent` / `research-agent`.

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/manager-1on1-prep/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Jira / team snapshot | `harness/skills/workload-agent/SKILL.md` (manager mode) |
| Coaching sibling | [`people-coaching`](../people-coaching/GUIDE.md) |
| Optional find-time | [`scheduling`](../scheduling/GUIDE.md) |

---

## What problem it solves

Managers need a fast, honest rundown before a 1:1 — what's stale on the
board, what's in their task folders, what to ask — without the agent
profiling anyone from private Slack or inventing a story about "how
they're doing."

---

## What it does NOT do

- Does **not** run for IC / product profiles
- Does **not** prep feedback, hard conversations, or growth plans — that's
  [`people-coaching`](../people-coaching/GUIDE.md)
- Does **not** query Slack DMs or private channels (ever)
- Does **not** state conclusions ("they're blocked because…") — only
  "worth asking…"
- Does **not** auto-fire or prep the whole team at once (use
  `workload-agent` for the team snapshot)

---

## What you say

- "Help me prep for a 1:1 with [name]"
- "What's [name] working on?"
- "Status check on [name] before our sync"
- "Quick rundown before my 1:1 with [name]"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Standing weekly 1:1 | "Prep me for my 1:1 with [name]" |
| Someone's tickets look quiet | "Status check on [name] — anything stale?" |
| Need the team overview, not one person | "What's my team working on?" → `workload-agent` |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 57.

---

## What you get

A short markdown prep doc with:

1. **Worth asking about** — tickets/facts framed as questions  
2. **From their task folders** — only if a heuristic match exists  
3. **Roadmap context** — for the conversation, not a verdict  
4. **Data sources** — mandatory plain list every time (so if the report
   ever saw the doc, sourcing is unambiguous)

Optionally, after the doc: "Want me to find a time?" →
[`scheduling`](../scheduling/GUIDE.md) only if Calendar is connected and you
say yes.

---

## Related

| Doc | Role |
|-----|------|
| [`people-coaching`](../people-coaching/GUIDE.md) | Feedback / difficult conversation / growth plan |
| [`workload-agent`](../workload-agent/GUIDE.md) | Team snapshot (manager mode) |
| [`scheduling`](../scheduling/GUIDE.md) | Book the 1:1 after prep |
| [`onboarding.md`](../../../documentation/guides/onboarding.md) | Setting `Role focus: manager` + `Reports:` |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
