# Workshop whiteboard — how it works

The **workshop-whiteboard** skill runs a timed research-scoping board in
a workshop: vague prompt → problem, goals, method, recruit, timeline —
in ~30 minutes, then discuss.

Adapted from UXR interview whiteboard drills for **workshop
facilitation**, not job interviews.

Agents load
[`harness/skills/workshop-whiteboard/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/workshop-whiteboard/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Often hands off to | `decision-first-research` · `design-kickoff` Step 1.5 |

---

## What problem it solves

"We need research on X" is not a plan. A live board forces problem
reframing, method reasoning, and timeline honesty in front of the room.

---

## What it does NOT do

- Does **not** replace a written Decision Brief (`decision-first-research`)
- Does **not** exist primarily for hiring-interview prep
- Does **not** pick a method once the decision is already locked (Step 1.5)

---

## What you say (plain language)

- "Whiteboard this research ask for the workshop"
- "Scope this study live with the team on a board"
- "30-minute research framing exercise on [prompt]"
- "Practice a research whiteboard for Friday's workshop"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Stakeholder dump in a workshop | "Whiteboard: 'we want more recurring bookings'" |
| Team stuck on method arguments | "Board the problem and goals before methods" |
| Tight deadline honesty check | "Whiteboard with a 1-week constraint — what do we cut?" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 31.

---

## Related

| Doc | Role |
|-----|------|
| [`decision-first-research`](../decision-first-research/GUIDE.md) | Durable brief after the board |
| [`research-shareout`](../research-shareout/GUIDE.md) | Later shareout |
| [`screener-builder`](../screener-builder/GUIDE.md) | After recruit criteria are on the board |
