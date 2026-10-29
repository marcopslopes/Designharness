# Research summary — how it works

The **research-summary** skill writes scannable summaries at two
altitudes: a **post-session** write-up of one interview/UT, or an
**executive topline** (one-pager) for a finished study.

Agents load
[`harness/skills/research-summary/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/research-summary/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Feeds | `research-synthesis` (sessions) · `research-shareout` / `deck-builder` (toplines) |

---

## What problem it solves

Session notes rot if you wait until study end. Full reports go unread.
This skill captures what matters now — verbatim, scannable — at the
right altitude for the audience.

---

## What it does NOT do

- Does **not** write full insights (`insight-writer`)
- Does **not** plan the live share-out (`research-shareout`)
- Does **not** invent quotes

---

## What you say (plain language)

- "Summarize this interview session"
- "Write a UT session summary"
- "Write a topline for leadership"
- "One-pager of key takeaways from this study"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Just finished a session | "Session summary for P4 — generative" |
| Study done, exec wants 5 min | "Executive topline — 3 insights max" |
| Ahead of synthesis workshop | "Generative summary — no recommendations yet" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 29.

---

## Related

| Doc | Role |
|-----|------|
| [`research-synthesis`](../research-synthesis/GUIDE.md) | Uses session summaries |
| [`research-shareout`](../research-shareout/GUIDE.md) | After a topline |
| [`insight-writer`](../insight-writer/GUIDE.md) | Deeper insight writeups |
