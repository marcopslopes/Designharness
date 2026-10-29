# People coaching — how it works

The **people-coaching** skill helps managers prep **feedback (SBI)**, a
**difficult conversation**, or a **growth plan** for one named report —
from real work evidence, never vibes or private Slack.

Agents load
[`harness/skills/people-coaching/SKILL.md`](SKILL.md).

**Gated:** `Role focus: manager` in `designer-profile.local.md`. IC
profiles get a decline + pointer elsewhere.

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/people-coaching/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Sibling HOWTO | [`manager-1on1-prep`](../manager-1on1-prep/GUIDE.md) (status 1:1s) |

---

## What problem it solves

1:1 status prep tells you what to *ask about the work*. Coaching prep
helps you plan *how to talk about behaviour, hard news, or growth* —
still from tickets and task folders, never from private Slack or invented
performance stories.

---

## What it does NOT do

- Does **not** run for IC / product profiles
- Does **not** replace routine status 1:1 prep —
  [`manager-1on1-prep`](../manager-1on1-prep/GUIDE.md)
- Does **not** invent behaviours, motives, or ratings when evidence is thin
- Does **not** send messages, create tickets, or book meetings unless you
  explicitly chain another skill

---

## What you say

- "Help me give feedback to [name] — SBI on the review handoff"
- "Prep a difficult conversation with [name]"
- "Growth plan for [name] this quarter"
- "Help me coach [name]" → agent asks which mode

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Specific work behaviour to address | "SBI feedback for [name] on [ticket/topic]" |
| Hard news / underperformance talk | "Difficult conversation prep with [name]" |
| Stretch / next-level plan | "Growth plan for [name] — tie to current tickets" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenarios 69–70.

---

## Which mode

| Ask | Mode |
|-----|------|
| Feedback / SBI | Feedback delivery |
| Hard conversation | Difficult conversation |
| Development / stretch | Growth plan |

Routine "what's [name] working on" →
[`manager-1on1-prep`](../manager-1on1-prep/GUIDE.md), not this skill.

---

## Related

| Doc | Role |
|-----|------|
| [`manager-1on1-prep`](../manager-1on1-prep/GUIDE.md) | Status 1:1 prep (sibling) |
| [`scheduling`](../scheduling/GUIDE.md) | Optional find-time after prep |
| [`stakeholder-alignment`](../stakeholder-alignment/GUIDE.md) | Cross-functional buy-in (not people coaching) |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
