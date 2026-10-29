# Scheduling — how it works

The **scheduling** skill finds a meeting slot, proposes it, and books it
only once you've explicitly confirmed — and, where real context exists,
drafts the ask with actual substance (a project's open questions, a
ticket's status, what you've already been discussing) instead of a bare
"got time to chat?"

It's a **standalone, on-demand capability** — not a builder, not a
research sweep, and **not a 5th mandatory MCP**. Calendar access is
checked only at the moment you actually ask to schedule something; if
it's not connected, the skill says so plainly and offers an alternative
instead of blocking anything else in the conversation.

This doc is the human-readable reference. Agents load the full protocol
from `harness/skills/scheduling/SKILL.md`.

---

## Quick reference

| What | Path |
|------|------|
| Agent skill (full protocol) | `harness/skills/scheduling/SKILL.md` |
| Calendar connection check (non-blocking, on-demand) | `harness/skills/scheduling/references/calendar-check.md` |
| Meeting context / grounded talking points | `harness/skills/scheduling/references/meeting-context.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Composed by (optional) | `harness/skills/manager-1on1-prep/SKILL.md` |
| Mandatory MCP gate — deliberately **not** this skill | `harness/designer-onboarding/references/mcp-check.md` |
| Acceptance scenarios | `tests/scenarios.md` Scenario 7 (Cases A–I) |

---

## What problem it solves

Two, actually:

1. **"Find time with someone" is a real, recurring ask** that had no home
   in this harness before — not a build task (`ui-agent`), not a research
   sweep (`research-agent`), not gated to managers
   (`manager-1on1-prep`). It needed its own standalone skill, the same
   shape as `workload-agent`: independently discoverable, callable
   directly or composed into by other skills.
2. **A bare scheduling ask produces a useless draft.** "Want to grab some
   time?" is logistics with no substance — the designer still has to
   write the actual message themselves. This skill pulls in whatever
   real context already exists (a project's decisions, a named ticket,
   the conversation itself) so a draft actually says *why*, without ever
   inventing something that isn't really there.

---

## What it does NOT do

- **Does not add a 5th mandatory MCP.** Calendar is never part of
  `mcp-check.md`'s gate (Atlassian + Slack + Figma + Miro, unchanged).
  Onboarding, `design-kickoff`, and every other flow work identically
  whether or not Calendar is connected.
- **Does not auto-book or auto-send anything.** A proposed slot waits for
  an explicit pick; a drafted Slack message waits for explicit approval
  or an edit before any send tool gets called.
- **Does not gate on role.** Unlike `manager-1on1-prep`, any designer —
  IC or manager — can call this directly.
- **Does not read anyone's event content.** Every calendar read (own
  calendar included) is a free/busy signal only — never a title,
  description, location, or attendee list.
- **Does not run a research sweep for context.** Grounded talking points
  come from a closed list (see § Meeting context below) — never a Slack
  search, a multi-ticket/project sweep, or Figma/Miro. If a request
  genuinely needs that depth, this skill says so and points at
  `research-agent` instead of quietly expanding its own reach.
- **Does not nag about Calendar.** One honest sentence plus an
  alternative, once, per request — never a repeated prompt in the same
  conversation.

---

## When it runs

### 1. You ask directly (standalone)

Use plain language in Cursor. No slash command required.

```
book a meeting with Priya next week, 30 minutes
find time with Sam tomorrow afternoon
schedule a sync with Ana about the settings IA project
when are we both free this week?
propose a time for the checkout redesign review
```

The orchestrator routes these to `scheduling` per `harness/ORCHESTRATOR.md`
§2 — a single-skill, on-demand row, not part of any mandatory chain.

### 2. Composed by `manager-1on1-prep`

After a 1:1 prep doc ships in full, that skill may add one optional
closing line — *"Want me to find a time? I can call the scheduling
skill."* — the same way it already composes `workload-agent` for its own
data. This fires only if Calendar is connected **and** no existing
meeting was found for the report. Declining, not responding, or Calendar
being unconnected leaves the prep doc completely unchanged either way —
see `harness/skills/manager-1on1-prep/SKILL.md` § Optional — compose
`scheduling`.

### 3. Any future caller

Any skill that hits a scheduling need mid-task should hand the whole
request off to `scheduling`'s Steps 0–4 rather than re-implementing
free/busy checks, slot proposals, or booking logic locally — the same
"own skill, composed by others" relationship `workload-agent` already
has with several callers.

---

## MCP required — and deliberately not required

| MCP | Required for this skill? | Why |
|-----|---------------------------|-----|
| **Calendar** (Google or otherwise) | **No — optional, on-demand only** | Checked at fire time via `references/calendar-check.md`. As of this repo's current environment, no Calendar MCP server ships by default. |
| **Atlassian** | Only if a ticket is named | One direct lookup for a named ticket's status — never a search |
| **Slack** | Only for the draft-message alternative | To send an approved draft, if the designer explicitly confirms sending it that way — never to search Slack for context |

**None of these are part of `mcp-check.md`'s mandatory gate.** That gate
is exactly Atlassian + Slack + Figma + Miro, checked once at onboarding,
completely unrelated to this skill. See
`harness/designer-onboarding/references/mcp-check.md`.

---

## The workflow (Steps 0–4)

### Step 0 — Check Calendar, once, on-demand

Probes for a connected Calendar MCP. **Not connected** → offers a choice
via `AskQuestion` (never chat-prose "reply 1/2/3"):

- Draft a Slack message to find a time
- Share your own availability — propose a few slots in chat
- Connect the Calendar MCP now (one short pointer, then stops — no
  install checklist, no "reply ready" gate language)

**Connected** → continue.

### Step 1 — Scope the request

Infers who, the rough time window, duration, and — critically — the
**topic and real context** (see § Meeting context below) all at once,
batching any genuinely missing pieces into one `AskQuestion` rather than
a back-and-forth.

**Name collisions** (e.g. two people sharing a first name) are resolved
from the **current conversation first** — if someone was already named
specifically, that match is used silently, no re-ask. A squad/topic hint
alone is never enough to silently guess between two real people; only
the conversation actually settling it, or an explicit answer, counts.

### Step 2 — Check free/busy

Own calendar always; the other person's only if a genuine cross-calendar
read is actually available — never assumed. Every read is a **free/busy
signal only** — this skill never sees or repeats an event's title,
description, or attendees, on any calendar, including the requester's
own.

### Step 3 — Propose, don't book

Shows 1–3 candidate slots via `AskQuestion` and **stops** — the same
plan-gate discipline every other action-that-commits-something follows
in this harness (`harness/ORCHESTRATOR.md` §3). Nothing gets created
before an explicit pick comes back.

### Step 4 — Book only on confirmation

Creates the event, invites the other person if confirmed wanted, and
confirms back with the real time and link. If Step 1 found grounded
context, offers to put it in the event's own description. If it didn't,
the booking still happens — a missing agenda never delays logistics —
and the confirmation says so plainly with a concrete next step (see
below).

---

## Meeting context — not just logistics

This is the part that makes a drafted message or event description
actually useful. Sources, an explicitly **closed** list:

1. **The current conversation** — the most immediate, most authoritative
   source.
2. **A matched `projects/<slug>/` task folder** — recent decisions, open
   questions, findings. Heuristic match (keyword/topic, not a structured
   field) — flagged as "likely" when it isn't a clean one.
3. **One explicitly named ticket** — a single status lookup, never a
   search.

**Explicitly out of scope, on purpose:** Slack search (any channel),
multi-ticket/multi-project sweeps, Figma/Miro. If a request genuinely
needs that depth, the skill says so and routes to `research-agent`
instead of quietly expanding its own reach.

**Hard rule:** every talking point cites its source. Never invents
something that merely "sounds plausible" for the topic. If nothing
groundable turns up, the draft (or booking confirmation) says so plainly
and stays logistics-only — an honest gap always beats padded filler.

```
Hey Priya — got 30 min this week to sync on the checkout redesign?

A few things that might be worth covering:
- projects/checkout-redesign/decisions.md logged the card-list layout
  on [date] — still holding?
- DES-482 "Checkout error states" is still In Progress — good time to
  check in on it?

(Pulled from the project folder and that one ticket — nothing beyond
that, so let me know if there's more you want to add.)
```

```
Booked with Ana, 2pm tomorrow — I didn't have enough context to draft
talking points, want me to pull from a specific project?
```

Full sourcing rules, honesty examples, and the exact "not enough
context" phrasing: `harness/skills/scheduling/references/meeting-context.md`.

---

## A drafted Slack message is a draft — always

**This skill never calls a Slack-send tool on its own.** A "draft a
Slack message" outcome is always shown in chat, verbatim, and waits for
one of:

- Explicit approval ("looks good," "send it")
- An edited version — which is what gets treated as approved, never a
  silent revert to the original draft

If no send tool is available, or the designer never says to send it, the
draft sitting in chat for them to copy/send themselves is a complete,
valid outcome on its own — this skill doesn't chase a "should I send
this?" follow-up if the conversation has moved on.

---

## Guardrails (what the agent will not do)

- Book or send anything without explicit confirmation
- Treat Calendar as a mandatory MCP, or add it to `mcp-check.md`'s gate
- Assume cross-calendar free/busy visibility works without verifying it
- Read or surface event titles/descriptions/attendees, on any calendar
- Nag about connecting Calendar, or re-probe every message once declined
- Gate this skill on `role: manager`
- Search Slack, sweep multiple tickets/projects, or pull Figma/Miro for
  context — route to `research-agent` instead
- Invent a talking point that isn't grounded in a real source
- Hold up a ready booking because there wasn't enough context for an
  agenda — book it, then say so plainly

---

## Example output — declined (Calendar not connected)

```
I don't have calendar access connected — how do you want to handle this?

(AskQuestion: "Draft a Slack message to find a time" /
"I'll share my availability — propose a few slots in chat" /
"I'll connect the Calendar MCP now")
```

## Example output — proposed, waiting on confirmation

```
Checked both calendars for this week — three options where you're both
free:

(AskQuestion: Tue 2:00–2:30pm / Wed 10:00–10:30am / Thu 3:30–4:00pm /
None of these)

Nothing gets booked until you pick one.
```

## Example output — booked, with grounded context offered

```
Booked with Priya, Tue 2:00–2:30pm — invite sent.

Want me to add these to the event description?
- projects/checkout-redesign/decisions.md logged the card-list layout
  on [date] — still holding?
- DES-482 is still In Progress — worth checking in on it there too?
```

---

## Scheduling vs `manager-1on1-prep` vs `workload-agent`

| | **scheduling** | **manager-1on1-prep** | **workload-agent** |
|---|---|---|---|
| **Question** | Can we find/book a real time? | What should I ask this report in our 1:1? | Who's on this? What's committed? |
| **Gated to role?** | No | Yes — `role: manager` only | No |
| **Sources** | Conversation, one `projects/` folder, one named ticket | `workload-agent` manager mode + `projects/` folders | Jira only (Polaris + `DES`/`UXR`) |
| **Sends/books anything?** | Yes — on explicit confirmation only | No | No |
| **Fires automatically?** | Never | Never | Auto-invoked at kickoff Step 1a |

`manager-1on1-prep` may **compose** `scheduling` (optional offer after a
prep doc); `scheduling` never composes either of the other two.

---

## Related reading

| Doc | Why |
|-----|-----|
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | How skills auto-trigger and chain; where `scheduling` sits in the full roster |
| [`onboarding.md`](../../../documentation/guides/onboarding.md) | The onboarding greeting's capability mention — confirms Calendar isn't part of the MCP gate |
| [`workload-agent`](../workload-agent/GUIDE.md) | The "own skill, composed by others" precedent `scheduling` follows |
| `harness/skills/manager-1on1-prep/SKILL.md` | The optional caller into this skill after a 1:1 prep doc |
| `harness/references/ask-question-ui.md` | The `AskQuestion` contract used for every fixed-choice moment in this skill |
| [`KNOWN-ISSUES.md`](../../../KNOWN-ISSUES.md) | Live-confirmed duplicate-"Other…" `AskQuestion` rendering bug this skill's payloads work around |
| [`harness/ORCHESTRATOR.md`](../../ORCHESTRATOR.md) | Full routing table |
