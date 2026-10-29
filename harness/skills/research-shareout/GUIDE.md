# Research shareout — how it works

The **research-shareout** skill plans how findings get shared so people
act — audience-first spine (TL;DR → findings → recs → next steps),
compelling framing, and optional creative formats.

Agents load
[`harness/skills/research-shareout/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/research-shareout/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Builds slides? | No — hand off to [`HOWTO` deck / `deck-builder`](../deck-builder/SKILL.md) |

---

## What problem it solves

Good insights die in folders. Shareouts fail when they lead with method,
skip recommendations, or ignore who is in the room.

---

## What it does NOT do

- Does **not** write the insights (`insight-writer` / `research-summary`)
- Does **not** build the HTML deck (`deck-builder`)

---

## What you say (plain language)

- "Plan a shareout for this study"
- "Stakeholders aren't acting on the research"
- "Make this readout engaging for leadership"
- "Should we do insight auction or a normal deck?"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Standard 30-min readout | "Shareout plan — PM + design + eng" |
| Disengaged observers at UT | "Usability bingo setup for tomorrow's sessions" |
| Too many insights | "Insight auction to force priority" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 30.

---

## Related

| Doc | Role |
|-----|------|
| [`research-summary`](../research-summary/GUIDE.md) | Topline input |
| [`insight-writer`](../insight-writer/GUIDE.md) | Insight quality |
| [`workshop-whiteboard`](../workshop-whiteboard/GUIDE.md) | Scoping board earlier in the cycle |
