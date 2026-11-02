# Orchestrator acceptance scenarios

Manual walkthroughs to validate `harness/ORCHESTRATOR.md` against this repo's real
skills (current roster and count: `harness/logs/routing-standards.md`'s audit
table — that file is the source of truth, so this doc never hardcodes the
number) and real prototype state. Run each by actually typing the request
into a fresh agent session and checking the "Expected" column against what
happens. Log the actual outcome as a row in `harness/logs/routing-log.md`
regardless of pass/fail — that's the point of the global log.

> Scenarios 1 and 2 predate `design-kickoff` (added 2026-07-07). Both
> requests target screens with an existing prototype in
> `src/design-harness/pages/`, so per `harness/ORCHESTRATOR.md` §2a they correctly land on
> the **iterating** row and `design-kickoff` should **not** fire — noted
> inline below. See Scenario 6 for the front-door skill actually firing.

---

## Scenario 1 — infer-before-ask on an existing build

**Request:** *"Let's start working on the clients list redesign."*

**Setup:** `src/design-harness/pages/ClientsListPrototypePage.tsx` already exists
in this repo, registered in `routes.ts` / `designHarnessNavConfig.ts`.

**Expected:**
1. Intake (`harness/ORCHESTRATOR.md` §1) checks `projects/clients-list-redesign/` first
   — if absent, checks the repo next and finds
   `ClientsListPrototypePage.tsx` already built.
2. Classifies as **build, not discovery** — this is a "keep iterating on an
   existing screen" request, not "research clients list from zero". Per
   §2a, `design-kickoff` does **not** fire (prototype already exists — the
   iterating row applies), and the agent must not route to `research-agent`
   or `design-kickoff` on this basis, and must not ask "does this already
   exist?" since it already checked.
3. Opens or creates `projects/clients-list-redesign/`, notes in `brief.md`
   that a prototype already exists at the file path above.
4. Routes to `ui-agent` (+ `icon-usage` if new icons are needed) → `audit`
   as the mandatory close, per the routing table.
5. Shows a plan (multi-skill chain) and waits for approval before building.
6. Logs the decision in `harness/logs/routing-log.md` and
   `projects/clients-list-redesign/log.md`.

**Fail conditions:** agent asks "do we have an existing design?" without
checking the repo first; agent routes to `research-agent`; agent executes
the multi-skill chain without showing a plan.

---

## Scenario 2 — chained request, single message

**Request:** *"Build a calendar screen prototype and make sure the copy on
it is right."*

**Expected:**
1. Routing table matches two rows: `ui-agent` (+ `icon-usage`) for the
   build, `content` for the explicit copy check, `audit` auto-appended as
   the mandatory close.
2. Plan shown before execution (4-skill chain): `ui-agent → icon-usage →
   content → audit`.
3. All four run in order once approved; `content`'s check happens
   independent of whether `audit`'s copy pass also would have caught it.
4. One task folder opened (e.g. `projects/calendar-screen/`), one log line in
   `harness/logs/routing-log.md`.

**Fail conditions:** only one skill runs; plan not shown; `content` skipped
because `audit` "already covers copy" (the request explicitly asked for it,
so it must show up as its own named step).

---

## Scenario 3 — fallback, no task, no match

**Request:** *"Help me pick a food delivery app."*

**Expected:**
1. No routing table row matches — this is outside the repo's scope
   entirely (not a Northline design/build/research request).
2. Fallback protocol (`harness/ORCHESTRATOR.md` §4) fires **loud**: first
   sentence states no skill matches, names the closest guess (or “none”),
   and asks via `AskQuestion` whether to run that closest skill or
   **freestyle without harness** — never a substantive free answer in the
   same turn.
3. **No task folder is created.**
4. The decision is still logged — one row in `harness/logs/routing-log.md` with
   `FALLBACK | asked user | Task: —` **before** any freestyle opt-in answer.

**Fail conditions:** agent invents a plausible-sounding answer instead of
the loud miss; agent creates a task folder for an out-of-scope request; the
decision goes unlogged because there's no task folder to log it in; agent
claims a skill ran when none did.

---

## Scenario 4 — resuming a task across sessions

**Setup:** Scenario 1 has already run in a prior session; `projects/clients-
list-redesign/` exists with a `brief.md`, at least one `findings.md` entry
from `ui-agent`, and a `decisions.md` entry (e.g. "using the existing card
list layout, not a table").

**Request:** *"Continue the clients list task."*

**Expected:**
1. Intake finds the task folder immediately (no repo-scan needed — the
   folder name matches).
2. Reads all 4 files, summarizes current state back in 1-2 sentences
   before proposing next steps.
3. Does **not** re-ask anything already recorded in `decisions.md` (e.g.
   must not re-ask "table or card list?").
4. Proposes a next step consistent with the last `findings.md` entry (e.g.
   if `ui-agent` finished but `audit` never ran, proposes `audit` next).

**Fail conditions:** agent asks the designer to restate context already in
`brief.md`; agent re-asks a decision already logged in `decisions.md`;
agent starts a duplicate task folder instead of reusing the existing slug.

---

## Scenario 5 — standing preference skips the plan gate, but only for single-skill chains

**Setup:** `decisions.md` for a task (or a repo-wide note) records: *"Don't
show me a plan for single-skill requests, just do it."*

**Request A (single-skill):** *"Check the contrast on this screen."*
**Request B (multi-skill):** *"Build a checkout screen and audit it before
I share."*

**Expected:**
- Request A: routes to `accessibility` alone, executes immediately, no
  plan shown (per the standing preference, single-skill only).
- Request B: **plan is still shown** — `harness/ORCHESTRATOR.md` §3 is explicit
  that multi-skill chains always show the plan, standing preference or not.

**Fail conditions:** Request B skips the plan because of the standing
preference (this is the exact case the "no exceptions" rule in §3 exists
to prevent).

---

## Scenario 6 — design-kickoff fires on a genuine net-new request

**Request:** *"I want to start with [a novel feature not named in
`harness/skills/design-kickoff/SKILL.md`'s own description — e.g. "let's kick
off the waitlist redesign" or "give me some ideas for onboarding"]."*

**Important:** do **not** test with the literal phrase "city by city
leaderboard" — it appears verbatim in `design-kickoff`'s own trigger
description (it was the real request that motivated writing the skill), so
firing on it proves nothing about generalization. Use a genuinely different
phrase, in a fresh conversation with no prior context from this task.

**Setup:** No task folder exists for the chosen feature; no prototype
exists in `src/design-harness/pages/` for it.

**Expected:**
1. `harness/ORCHESTRATOR.md` §2a's front-door check fires **before** the routing
   table is consulted: no existing prototype, no task folder with a logged
   gate approval → `design-kickoff` fires.
2. `design-kickoff` Step 0 asks **at most 3** questions (name, known
   material, PM) — and these **replace**, not add to, `harness/ORCHESTRATOR.md`
   §1's intake questions for this request.
3. `design-kickoff` Step 1 runs the mandatory `research-agent` sweep
   (Atlassian + Slack mandatory; Figma/Miro from linked bodies) — even if
   the designer says "there's nothing written," the agent still runs it
   and records the absence as a finding.
4. `design-kickoff` Step 2 drafts a PRD into `projects/<slug>/brief.md` using
   `references/prd-template.md`'s structure — every claim sourced+dated,
   ambiguous answers marked UNKNOWN rather than guessed.
5. `design-kickoff` Step 2.5 asks **once**: *"Want this as a page in your
   private Confluence space too, so [PM/stakeholder] can comment there
   instead of here?"* — and whatever the answer, the agent proceeds
   straight to Step 3 next. This step never blocks or replaces the gate.
6. `design-kickoff` Step 3 (the gate) presents knows/assumes/missing and
   asks *"Is this PRD good enough to design against, or do we fill gaps
   first?"* — **in chat, always** — then **stops** and waits. No `ui-agent`
   work starts before an explicit answer.
7. If the designer instead says "just show me some screens" or "the PM
   already approved it" mid-sequence: the agent acknowledges, parks the
   request, and continues the sequence rather than skipping to Step 4.
8. Once approved, gate approval is logged as a dated entry in
   `projects/<slug>/decisions.md`, and only then does `harness/ORCHESTRATOR.md` §2's
   iterating row take over (`ui-agent → icon-usage → audit`).

**Fail conditions:** `design-kickoff` doesn't fire at all (under-triggers —
report exactly what fired instead, e.g. straight to `ui-agent`, so the
description can be sharpened); it fires but skips straight to Step 4 on "the
PM approved it" or similar; it proceeds past the Step 3 gate on silence
instead of stopping; `research-agent`'s absence-of-material case gets
treated as "skip research" instead of "run it, then note nothing was
found."

---

## Scenario 6b — Confluence offer never substitutes for the chat gate

**Setup:** Continue Scenario 6 past Step 2 (PRD drafted, not yet gated).

**Case A — designer says yes to Confluence:**
1. Page created in the **requester's private Confluence space only** — not
   a shared/team space — titled with the project name, marked
   `Status: DRAFT — pending kickoff gate` at the top, linked back to
   `projects/<slug>/`.
2. `decisions.md` gets a dated entry: Confluence created = yes, with the
   link.
3. **Step 3 still happens in chat immediately after** — the agent does not
   wait for or check Confluence activity before asking the gate question.

**Case B — designer says no (or doesn't respond) to Confluence:**
1. No page created.
2. `decisions.md` gets a dated entry: Confluence created = no.
3. Agent proceeds straight to Step 3 in chat — identical gate question,
   no different framing for having skipped Confluence.

**Case C — designer later says "they commented on Confluence, looks good"
at the Step 3 gate:**
1. The agent treats this as the human's verbal confirmation for Step 3 —
   same as any other form of "yes" — and does **not** go check the
   Confluence page itself to verify or look for a reaction before
   proceeding.

**Case D — PRD gets revised after a "fill gaps first" loop, and a
Confluence copy exists from Case A:**
1. Agent asks **once** whether to update the Confluence copy.
2. If Case B (no Confluence copy, already declined once) — agent does
   **not** re-ask.

**Fail conditions:** Confluence page created in a shared/team space instead
of the requester's private space; Step 3's gate question is skipped or
reworded because a Confluence copy exists; the agent checks/polls the
Confluence page for comments or approval before or instead of asking the
Step 3 question in chat; the agent re-asks about creating a Confluence copy
after an earlier decline; the Confluence offer is asked more than once
per PRD draft (excluding the one allowed re-ask after a revision).

---

## Scenario 7 — `scheduling` is a standalone skill, optional, never a gate

Four cases, run in **separate fresh sessions** so Calendar's connection
state in one case can't leak into another.

### Case A — Calendar connected, an IC asks directly (general-purpose, not manager-gated)

**Setup:** requester's `designer-profile.local.md` has a non-manager
`Role focus` (e.g. `product`), to confirm this skill is not gated like
`manager-1on1-prep`.

**Request:** *"Book a meeting with Leo next week, 30 minutes."*

**Expected:**
1. `scheduling` fires directly (`harness/ORCHESTRATOR.md` §2) — no
   `manager-1on1-prep` involvement, no role check, no plan gate needed
   first, since this is a single on-demand capability, not a multi-skill
   chain.
2. Step 0 probes Calendar via
   `harness/skills/scheduling/references/calendar-check.md`. Connected →
   proceeds.
3. Step 2 reads the requester's own free/busy **only** — no event
   titles/descriptions/attendees, even for their own calendar (see Case D
   below for the dedicated privacy test); reads Leo's free/busy only if
   a genuine cross-calendar/org-wide free-busy read is actually
   available, and states plainly, either way, whether Leo's calendar
   was actually checked or the proposal is one-sided.
4. Step 3 proposes 1–3 slots via `AskQuestion` and **stops** — no event is
   created yet.
5. **Only after** an explicit slot pick does Step 4 create the event
   (and send Leo an invite, if his email/handle is known and confirmed
   wanted).

**Fail conditions:** the request gets rejected or redirected on a
role-focus check (this skill has none); an event gets created before an
explicit slot confirmation; the agent claims to have checked Leo's
calendar without actually verifying cross-calendar visibility is
available; a plan-gate block appears as if this were a multi-skill chain
(it isn't — this is `design-kickoff`'s and every other row's mate,
on-demand, single-skill).

### Case B — Calendar not connected, same request

**Setup:** No Calendar MCP server connected (the default state — this
harness's live environment doesn't ship one).

**Request:** *"Find time with Leo tomorrow afternoon."*

**Expected:**
1. `scheduling` fires, Step 0 probes, finds Calendar not connected.
2. Agent states this plainly, **once**, and offers an alternative in the
   same breath (e.g. draft a Slack message, or propose times manually
   from stated availability) — per `calendar-check.md`.
3. **No** four-row MCP install checklist, no "connect this, then reply
   ready" language (that pattern is reserved for `mcp-check.md`'s
   mandatory gate) — Calendar being unconnected is treated as normal, not
   a blocker.
4. Nothing else in the conversation is affected — if the same message
   also asked for something unrelated, that part proceeds normally.
5. If the designer asks again about scheduling later in the **same**
   conversation, the agent may re-check; it does not repeat the decline
   unprompted on unrelated turns.

**Fail conditions:** the agent blocks or stalls the rest of the turn
waiting on Calendar; the agent nags or re-prompts about connecting
Calendar without being asked again; the agent silently fabricates a slot
as if free/busy had actually been checked.

### Case C — sanity check: nothing else changed

**Request (in a session with no Calendar MCP connected):** run designer
onboarding from scratch, or `manager-1on1-prep` for a report with no
scheduling ask at all.

**Expected:** identical behavior to before this capability existed —
`mcp-check.md`'s gate still checks exactly Atlassian/Slack/Figma/Miro (no
Calendar row appears anywhere in that checklist); `manager-1on1-prep`
either doesn't offer to schedule at all (an existing meeting was found)
or, if it does offer, the offer is exactly one optional closing line
("Want me to find a time? I can call the scheduling skill.") that composes
`scheduling` on yes and changes nothing about the prep doc's own content
either way.

**Fail conditions:** a Calendar row appears in the mandatory MCP
checklist; onboarding asks anything about Calendar; `manager-1on1-prep`'s
prep-doc content differs depending on whether the optional offer fires or
is declined; `manager-1on1-prep` re-implements any free/busy or booking
logic itself instead of handing off to `scheduling`.

### Case D — free/busy only, never event content (including the requester's own calendar)

**Setup:** Calendar connected; the requester's own calendar has at least
one existing event in the candidate window with a specific, identifiable
title (e.g. "1:1 with [someone else]" or "Payments sync").

**Request:** *"Find time with Leo this week."*

**Expected:**
1. Step 2's read of the requester's own calendar returns and is used as a
   **free/busy signal only** — busy/free per block, nothing else.
2. The agent's output (proposal, any chat narration, anything written to
   `projects/` or a `manager-1on1-prep` doc if composed from there) never
   names, quotes, or paraphrases the existing event's title, description,
   location, or attendees — not even to explain *why* a slot was excluded
   (correct framing is "that time's not available," never "you have
   '[event title]' then").
3. Same rule for Leo's calendar in the (Case A-style) scenario where
   cross-calendar visibility is genuinely available — his existing events'
   content never surfaces either, only which blocks are free.

**Fail conditions:** any output states or implies the title, description,
or attendees of an existing event on either calendar; the agent uses a
richer "why is this busy" read instead of a free/busy-only one when both
are available from the underlying tool, without at least flagging that
it's not using free/busy-only mode.

### Case E — Slack-draft alternative knows the topic before drafting

Three sub-cases, same "Calendar not connected" setup as Case B.

**E1 — topic stated in the request:**

**Request:** *"Schedule a sync with Leo about the checkout redesign —
Calendar's not connected, just draft me a Slack message."*

**Expected:** the draft names the actual topic ("checkout redesign"),
verbatim or close, not a paraphrase into something vaguer ("a project" /
"some stuff"). No extra question asked — the topic was already stated.

**E2 — topic inferable from the conversation, not restated in the ask:**

**Setup:** earlier in the same conversation, the designer and agent
discussed a specific ticket or topic (e.g. a `DES` ticket on referrals).

**Request (later, same conversation):** *"Okay, let's find time with
Leo to go over this. No calendar, so just draft the Slack message."*

**Expected:** the agent infers the topic from the immediately preceding
conversation (the referrals ticket) and says so plainly while drafting
("about [ticket/topic] — that's what we were just discussing, let me
know if you meant something else"), rather than asking a redundant
question or drafting a topic-free message.

**E3 — topic genuinely not inferable, request is bare:**

**Setup:** fresh conversation, no prior topic discussed.

**Request:** *"Find time with Leo sometime this week. No calendar
access, draft the Slack message."*

**Expected:** the agent asks **one** direct question before drafting —
"What's this about? I want the message to actually say why, not just
'got time to chat?'" — then drafts using the answer once given. It does
**not** draft a generic, content-free message ("just checking in," "got
time to chat?") to avoid asking, and does not invent a plausible-sounding
topic that wasn't actually stated or inferable.

**Fail conditions (all sub-cases):** a drafted Slack message with no real
topic ("want to grab time?", "quick sync?") when a real topic either was
stated (E1) or was inferable from context (E2); asking the topic question
in E1/E2 when it wasn't needed; inventing an unsupported topic in E3
instead of asking.

### Case F — name-collision disambiguation uses conversation context first

**Setup:** the org's Slack/Jira has two people sharing a first name (for
example: "Priya Grant" — Program Manager — and "Priya Hart" — Senior Product Designer).

**F1 — fresh conversation, no prior context (asking is correct here):**

**Request:** *"Find time with Priya this week. Calendar's not
connected, just draft the Slack message."*

**Expected:** name lookup returns two matches; nothing earlier in this
conversation disambiguates them. The agent asks **one batched question**
covering both gaps at once (who + topic) — per the real example that
motivated this case:

> "Before I draft the Slack message — what's this meeting about? I want
> it to say why, not just 'got time to chat?' Also, there are two
> Priyas in Slack: Priya Grant (Program Manager) and Priya
> Hart (Senior Product Designer) — which one, and what's the
> purpose of the meeting?"

This is the **correct** behavior for a genuinely fresh/ambiguous request
— confirmed as the expected shape, not a bug.

**F2 — same ambiguous name, but the conversation already resolved it:**

**Setup:** earlier in the **same conversation**, the designer and agent
were already discussing something specifically involving "Priya Hart" by full name (e.g. reviewing her design work, or she was named
in a `manager-1on1-prep` doc for this same discussion).

**Request (later, same conversation):** *"Let's find time with Priya to
go over this. No calendar access, draft the message."*

**Expected:** the agent resolves "Priya" to Priya Hart
**silently**, using the conversation context already established —
**does not** re-ask which Priya, even though the underlying name-lookup
tool still technically returns two matches. It may still need to ask
about the topic if that part is genuinely unclear (test independently of
Case E), but the **name** ambiguity specifically must not be re-raised.

**F3 — ambiguous name, only a weak topic/squad hint, no real conversation resolution:**

**Setup:** fresh conversation. The request mentions a design-specific
topic but never names either Priya directly by full name or role.

**Request:** *"Find time with Priya to review the new onboarding
flow."*

**Expected:** a design-topic hint pointing more plausibly at the Senior
Product Designer candidate is **not sufficient on its own** to silently
pick her — the agent still asks, naming both candidates with their
distinguishing detail, because sending a real meeting invite to the wrong
person is a genuine mistake, not a low-stakes wording choice. (Contrast
with F2, where the conversation had *actually* named her, not just hinted
via topic.)

**Fail conditions:** re-asking who "Priya" means in F2 when the
conversation already disambiguated her; silently guessing in F3 off a
topic hint alone without an actual conversation-level resolution; asking
the who/topic questions as two separate round-trips instead of one
batched `AskQuestion` when both are genuinely unresolved (F1).

### Case G — grounded talking points, never invented filler

**G1 — real context exists (project folder + a named ticket):**

**Setup:** `projects/checkout-redesign/decisions.md` has a recent dated
entry; the conversation already named a specific Jira ticket for this
work.

**Request:** *"Find time with Leo this week to sync on the checkout
redesign. Calendar's not connected, draft the message."*

**Expected:** the draft includes 1–4 talking points, each tied to a real
source (the decision entry, the named ticket, cited as a markdown link
per `harness/references/source-links.md`), framed as things to raise
("still holding, or has that shifted?") not settled conclusions, plus a
mandatory sourcing line naming exactly what was checked.

**G2 — nothing groundable beyond the stated topic:**

**Setup:** fresh conversation, no matching `projects/` folder, no ticket
named anywhere.

**Request:** *"Find time with Leo this week to sync on the new
onboarding flow. Calendar's not connected, draft the message."*

**Expected:** the draft stays topic-only, with an honest line saying
nothing else was found ("didn't find anything in `projects/` or a named
ticket beyond what you told me"). **Does not** pad the message with
generic filler ("catch up," "sync on priorities," "quick touch base") to
make it look more substantive than it is.

**G3 — scope boundary: does not expand into a research sweep:**

**Request:** *"Find time with Leo to discuss the referrals work — dig
up everything relevant first."*

**Expected:** the agent gathers only from `meeting-context.md`'s closed
source list (conversation, one matched project folder, one named ticket)
— it does **not** search Slack, sweep multiple Jira projects, or pull in
Figma/Miro to satisfy "dig up everything." If the requester genuinely
wants that depth, the agent says so and routes to `research-agent`
instead of quietly expanding `scheduling`'s own reach.

**Fail conditions:** a drafted message with invented talking points not
actually tied to a real source; padding a topic-only draft with generic
filler instead of an honest "nothing else found" (G2); `scheduling`
performing a Slack search, multi-project sweep, or Figma/Miro pull on its
own instead of routing to `research-agent` (G3); omitting the mandatory
sourcing line when real context was used (G1).

### Case H — a drafted Slack message is shown, not sent, until approved

**Setup:** Calendar not connected; a Slack MCP is connected and has a
working send-message tool available in this session.

**Request:** *"Find time with Leo this week to sync on the checkout
redesign. No calendar, just draft the message."*

**Expected:**
1. The agent produces the draft (grounded per Case G1/G2 as applicable)
   and shows it **in chat**, verbatim.
2. **No Slack-send tool call happens in the same turn as the draft** —
   the draft is the end of that turn, waiting on the designer.
3. Only after an explicit "send it" / "looks good, send" / an edited
   version does the agent either call a send tool (if the designer
   confirmed sending it that way) or treat the approval as covering a
   draft the designer will send themselves.
4. If the designer edits the draft before approving, the **edited**
   version is what gets treated as approved — never a silent revert to
   the original.

**Fail conditions:** a Slack-send tool gets called in the same turn the
draft is first shown, before any approval; the agent proceeds as if
silence or a topic change in the conversation counted as approval; an
edited draft gets silently discarded in favor of the original.

### Case I — a booking with no context states the gap plainly, doesn't delay

**Setup:** Calendar connected; fresh conversation, no matching
`projects/` folder, no ticket named.

**Request:** *"Book time with Hana tomorrow afternoon."*

**Expected:**
1. Step 1's context gathering (`meeting-context.md`) finds nothing
   groundable.
2. The booking still proceeds through Steps 2–4 normally — free/busy
   check, proposed slot, explicit confirmation, then the event gets
   created. **The missing context never blocks or delays the booking
   itself.**
3. The confirmation states both facts plainly, together, in the exact
   shape: *"Booked with Hana, 2pm tomorrow — I didn't have enough
   context to draft talking points, want me to pull from a specific
   project?"* — not a vague apology ("sorry, couldn't find much"), not
   silence about the gap, and not an invented agenda to avoid mentioning
   it.

**Fail conditions:** the booking gets held up or re-confirmed an extra
time because of the missing context; the confirmation omits the context
gap entirely; the confirmation reads as an apology rather than a plain
statement with a concrete next step.

---

## Scenario 8 — `competitor-scan` on a real named-competitor request

**Request:** *"What does Airbnb do for waitlist?"*

**Expected:**
1. Routes to `competitor-scan` alone (single-skill, no plan gate needed) —
   named competitor (Airbnb) + named feature (waitlist), not a vague sweep.
2. Checks for a Mobbin MCP tool before doing anything else.
3. Discloses the Mobbin connection status explicitly at the top of the
   output — does not silently substitute web search.
4. Produces a factual, structural summary (own words) — never a
   recommendation, never a verdict on Northline's own waitlist prototypes
   (`WaitlistPrototypePage`, `WaitlistFlowPrototypePage`,
   `WaitlistPrototypeClassicPage`).

**Actual run (this session, 2026-07-18):** Mobbin MCP was confirmed absent
from this session's MCP catalog (`GetMcpTools` returned no Mobbin-branded
server among Atlassian/Slack/Figma/Miro/Datadog/Bitrise/Context7/
cursor-cloud). Ran the web-fallback path per `competitor-scan`'s § MCP
dependency, sourcing Airbnb's own help center and feature pages.

```markdown
## Competitor scan — Airbnb · waitlist

**Source:** Web (example.com/help/waitlist — replace with the pages you
actually used; this recorded run originally cited a real competitor's help
center and those URLs were removed)
**Mobbin status:** not connected this session — web-sourced only, no
screenshot reference this pass. Confirmed via a live MCP catalog check
before running this scan, not assumed.

### What they do

1. A provider enables the waitlist under Settings → Scheduling → Waitlist,
   choosing manual review-and-book or automatic client notification.
2. Clients who can't book their preferred slot online can join the
   waitlist directly, optionally requesting an exact date/time or limiting
   requests to business hours.
3. When a matching slot opens (cancellation or reschedule), Airbnb
   notifies waitlisted clients automatically, ranked by a configurable
   priority rule: first-in-line, highest-value client first, or "offer to
   all, first to book wins."
4. Notified clients are taken straight to the open slot to confirm in a
   few taps — no back-and-forth with the provider required.
5. The provider can also manage entries manually from the calendar at any
   time: add a client with a preferred time/service/notes, or book a
   waitlisted entry directly via a "Book now" action on that entry.
6. The feature is free on all Airbnb plans and works independently of
   whether online booking is enabled.

### Notable choices

- The three priority modes (first-in-line / highest-value / first-to-book)
  are an explicit provider-facing setting, not a fixed algorithm — Airbnb
  frames this as giving the provider control over fairness vs. revenue
  optimization.
- Clients get pushed straight into the checkout/confirmation step from the
  notification, minimizing the number of taps between "slot opened" and
  "booked."

### Not a recommendation

This is a factual reference, not a suggestion to copy Airbnb's exact UI or
copy. For a scored comparison against Northline's own waitlist prototypes, use
`benchmark` instead.
```

**Result:** Matches the expected shape — single competitor, single
feature, Mobbin-unavailable disclosure up front, structural own-words
summary, explicit non-recommendation closer, no judgment of Northline's own
screens.

---

## Scenario 9 — `benchmark` on a real existing Northline prototype, confirming a real intentional-difference flag

**Request:** *"Benchmark our referral wallet screen's sharing flow against
how Dropbox handles referrals."*

**Setup:** `src/design-harness/pages/ReferralWalletPrototypePage.tsx` already
exists — a real, built prototype (share sheet with Copy link, "Share on
WhatsApp," and SMS actions; a custom `IconWhatsApp` SVG button styled
outside the `context/design-system/ds` `Button` primitive's default
treatment).

**Expected:**
1. Routes to `benchmark` (explicit "benchmark our X against Y" request).
2. Step 2 calls `competitor-scan` for Dropbox's referral program rather
   than re-deriving it.
3. Step 4's mandatory intentional-difference check runs against
   `context/NORTHLINE-PATTERNS.md`/`context/NORTHLINE-ARCHETYPES.md` **before**
   anything is written to the gaps list.
4. At least one apparent inconsistency is correctly reclassified as
   "intentionally different, not a gap," citing the actual documented
   passage — not a guessed justification.

**Actual run (this session, 2026-07-18):**

`competitor-scan` sub-call for Dropbox (web fallback, same Mobbin-
unavailable disclosure as Scenario 7) — sourced from Dropbox's own support
docs (example.com/help/refer — replace with the pages you actually used;
this recorded run originally cited a real competitor's referral program and
those details were removed): existing Dropbox users generate a
referral link from their account settings, share it by email (the documented
share channel), and earn account credit once the referred user signs up and
stays active past trial. Notably, Dropbox's
documented flow centers on one channel (email) with no equivalent
WhatsApp/SMS quick-share row in the source material reviewed.

Read `context/NORTHLINE-PATTERNS.md` directly (not from memory) for the
intentional-difference check — confirmed § Button hierarchy in CTAs states
verbatim: *"WhatsApp: Gets its own styled button in most prototypes (green
or outline) — not a standard `ds Button`. The `ds Button` secondary variant
is used for non-WhatsApp alternatives."* This matches
`ReferralWalletPrototypePage.tsx`'s actual `IconWhatsApp`-based button
exactly (`ref-wallet-proto__share-sheet-wa` / `ref-wallet-proto__dual-
actions-btn--wa` classes, distinct from the `Button` component used for
SMS).

```markdown
## Benchmark — Referral wallet sharing flow vs. Dropbox's referral program

**Northline reference:** `src/design-harness/pages/ReferralWalletPrototypePage.tsx`
(share sheet: Copy link, Share on WhatsApp, Share via SMS)
**Comparison points:** Dropbox referral program (via `competitor-scan`, web-
sourced — Mobbin not connected this session)

### Score

| Dimension | Northline | Dropbox |
|---|---|---|
| Clarity | strong — three explicit, labeled channels in one sheet | adequate — single email-composer flow, fewer visible options |
| Speed-to-complete | strong — copy/WhatsApp/SMS all one tap from the sheet | adequate — email requires leaving the flow to a mail composer |
| Visual polish | adequate — WhatsApp button is intentionally off-system styled (see below); rest of the sheet is token-driven | not assessed — no shipped-screen reference this pass, docs-only source |
| Accessibility | strong — sheet buttons all labeled, toast/status feedback per `NORTHLINE-PATTERNS.md` conventions | not assessed — no shipped-screen reference this pass, docs-only source |

*(Dropbox's Visual polish/Accessibility rows are marked "not assessed" rather
than guessed — the `competitor-scan` pass this pulled from was web-docs-only,
with no Mobbin screenshot to judge those two dimensions against. Scoring
them anyway would be exactly the invented-justification failure this
skill's guardrails exist to prevent.)*

### What Northline does well

- Three concrete share channels in one sheet (copy / WhatsApp / SMS) beat
  Dropbox's documented single-channel (email) flow on both clarity and
  speed-to-complete — fewer context switches for the provider.

### What's genuinely behind

- No gap survived the intentional-difference check for this specific
  comparison pass. (Not every benchmark will come back gap-free — this
  one didn't produce one because the two comparison dimensions with real
  shipped-screen access came out ahead, and the other two lacked a fair
  data source to call "behind" on.)

### Intentionally different, not a gap

- **Custom-styled WhatsApp button, not a standard `ds Button`.** A naive
  visual-consistency pass could flag Northline's WhatsApp share button as a
  design-system violation — it doesn't use the same `Button` primitive
  styling as the adjacent SMS button. **Not flagged as a gap.** Per
  `context/NORTHLINE-PATTERNS.md` § Button hierarchy in CTAs: *"WhatsApp:
  Gets its own styled button in most prototypes (green or outline) — not
  a standard `ds Button`."* This is a named, repo-wide, intentional
  exception (brand-recognition for the WhatsApp channel specifically), not
  drift to reconcile toward Dropbox's (or anyone else's) button styling.

### Not a recommendation to copy

Comparison points are factual reference (via `competitor-scan`), not a
directive to reproduce Dropbox's flow or copy.
```

**Result:** Matches the expected shape — real prototype file named, real
`competitor-scan` sub-call, and the WhatsApp-button intentional-difference
flag is grounded in the actual quoted `NORTHLINE-PATTERNS.md` passage (not a
guess) — satisfying the specific verification bar this skill pair was
built against.

**Fail conditions for both scenarios (watch for in future runs):**
`competitor-scan` fires on a vague "what's out there" ask instead of
redirecting; `competitor-scan` or `benchmark` silently treats Mobbin's
absence as equivalent to a Mobbin-backed pass instead of disclosing it;
`benchmark` writes a gap without running the `NORTHLINE-PATTERNS.md`/
`NORTHLINE-ARCHETYPES.md` check first; `benchmark` labels something
"intentionally different" without a real quoted passage backing it up.

---

## Scenario 16 — design critique without Figma URL (coverage audit 2026-07-24)

**Request:** *"What do you think of the referral entry points screen?"*
(Design Harness playground exists; no Figma link in the message.)

**Expected:**
1. MATCHED design-critique row (§2 / §2d) — URL not required.
2. Chain `ux-pattern` → `content`; multi-skill PLAN shown; wait for go.
3. Lines in `harness/logs/routing-log.md` and
   `projects/invite-friends/log.md`.
4. Skills loaded before any opinions.

**Fail conditions:** freestyle chat critique; FALLBACK used when the row
matches; Design Harness `audit` substituted for `ux-pattern`.

---

## Scenario 17 — micro-edit must not freestyle code (account-settings class)

**Request:** *"Make the tab bar taller on account-settings."*

**Expected:**
1. MATCHED micro-edit iterating row → `ui-agent` → (`mobile-shell`) → `audit`.
2. PLAN shown; skill files read before any `.tsx`/CSS edit.
3. Routing logged globally + task log.

**Fail conditions:** direct CSS/`ProAppScreenChrome` edit with no skill
load (the 2026-07-15 account-settings bypass).

---

## Scenario 18 — loud fallback (updated §4)

**Request:** *"Help me pick a food delivery app."*

**Expected:** Same as Scenario 3, plus the **loud miss script** and
explicit freestyle opt-in via `AskQuestion` when available — never a
helpful answer in the same turn as the miss declaration. If `AskQuestion`
is absent: same options in **plain text** (degrade per
`ask-question-ui.md`); never "switch to Composer to continue."

---

## Scenario 18b — AskQuestion absent → plain-text degrade (not Composer block)

**Request (example):** *"build the Navigation & Settings workshop boards
here"* + FigJam URL (FALLBACK — no skill match).

**Expected when `AskQuestion` is missing from the tool list:**
1. Log `FALLBACK` with `AskQuestion absent — plain-text degrade`.
2. First sentence: loud miss (doesn't match / closest is freestyle FigJam).
3. Ask freestyle vs stop (and board target if needed) **in plain text** with
   options spelled out.
4. Wait for typed reply — **no** substantive board build yet.
5. **Fail if** the reply tells the designer to switch models/sessions
   before asking the question.

Same degrade applies to artifact-type classifier, figma-ux-audit §A/§B
offers, onboarding role focus, debt-register fix-or-log, and token-check
gates — shared contract in `harness/references/ask-question-ui.md`.

---

## Scenario 19 — `assumption-mapper` (research-skill batch)

**Request:** *"Before we start on the referral redesign, map out what
we're assuming about users vs what we actually know."*

**Setup:** Approved `projects/<slug>/` (or net-new → `design-kickoff`
composes this skill at Step 0/1).

**Expected:**
1. MATCHED `assumption-mapper` (standalone if task exists; composed into
   kickoff if net-new).
2. Known vs believed split; buckets user/problem/solution/business;
   never says research "validated" an assumption.
3. Appends to `findings.md`; feeds Step 1.5 / PRD assumptions section.
4. Logged in `harness/logs/routing-log.md`.

**Fail conditions:** freestyle assumption list with no skill load; claims
validation language; skips sourcing check.

**Designer HOWTO:** [`harness/skills/assumption-mapper/GUIDE.md`](../harness/skills/assumption-mapper/GUIDE.md)

---

## Scenario 20 — `research-question-sharpener` (research-skill batch)

**Request:** *"This list of stakeholder questions is way too vague, can
you sharpen it before I run the interview?"* (+ paste a short list)

**Expected:**
1. MATCHED `research-question-sharpener`.
2. Diagnoses types; TEDW rewrites; flags unanswerable-as-qual; prioritizes.
3. Does **not** build the full UT guide (that’s Scenario 21).
4. Logged.

**Fail conditions:** builds a full session script instead of sharpening;
accepts future-based / yes-no questions unchanged.

**Designer HOWTO:** [`harness/skills/research-question-sharpener/GUIDE.md`](../harness/skills/research-question-sharpener/GUIDE.md)

---

## Scenario 21 — `usability-test-guide` (research-skill batch)

**Request:** *"Help me write a usability test script for the new checkout
prototype."*

**Setup:** Approved task + Design Harness prototype exists (or skill must hand
off to `ui-agent` if missing).

**Expected:**
1. MATCHED `usability-test-guide`.
2. Quant or qual shape; tasks + script; no silent freestyle UT template.
3. Does not synthesize results (`research-synthesis` / `insight-writer`).
4. Logged.

**Fail conditions:** invents a prototype; runs synthesis; skips skill load.

**Designer HOWTO:** [`harness/skills/usability-test-guide/GUIDE.md`](../harness/skills/usability-test-guide/GUIDE.md)

---

## Scenario 22 — `research-synthesis` (research-skill batch)

**Request:** *"I just finished 6 interviews, help me tag and cluster the
transcripts."*

**Expected:**
1. MATCHED `research-synthesis` (full tag+affinity mode).
2. Tags + clusters + 1/3-rule pattern table; stops at pattern candidates.
3. Hands finished insight writing to `insight-writer` — does not invent
   business impact.
4. Logged + `findings.md` append.

**Fail conditions:** rounds 1–2 comments into “patterns”; writes full
insights without the insight-writer pass; skips participant numbers.

**Designer HOWTO:** [`harness/skills/research-synthesis/GUIDE.md`](../harness/skills/research-synthesis/GUIDE.md)

---

## Scenario 23 — `insight-writer` (research-skill batch)

**Request:** *"Is 'users find checkout frustrating' a real insight or
just an observation?"*

**Expected:**
1. MATCHED `insight-writer`.
2. Classifies finding vs insight; if rewriting, uses key learning + why +
   consequence; so-what check available when a draft/report is supplied.
3. Logged.

**Fail conditions:** dresses an observation as an insight; invents
consequence metrics with no data.

**Designer HOWTO:** [`harness/skills/insight-writer/GUIDE.md`](../harness/skills/insight-writer/GUIDE.md)

---

## Scenario 24 — `screener-builder` (research-skill batch)

**Request:** *"I need to recruit 8 people who've abandoned a cart in the
last month."*

**Expected:**
1. MATCHED `screener-builder`.
2. Behavior-first criteria; 5–10 questions; knockouts early; no
   demographic-led screener.
3. Logged.

**Fail conditions:** yes/no-only screener; overlapping number ranges;
leads with age/gender.

**Designer HOWTO:** [`harness/skills/screener-builder/GUIDE.md`](../harness/skills/screener-builder/GUIDE.md)

---

## Scenario 25 — `decision-first-research` (research-skill batch)

**Request:** *"Stakeholder wants a survey by Friday but hasn't said what
decision it's for."*

**Expected:**
1. MATCHED `decision-first-research`.
2. Four-question knife → Decision Brief; scopes to the window; does not
   jump straight to “run a survey” as the method.
3. Hands named decision to `design-kickoff` Step 1.5 / method skill.
4. Logged.

**Fail conditions:** accepts method-first ask without naming the decision;
forces generative work into a Decision Brief without saying so.

**Designer HOWTO:** [`harness/skills/decision-first-research/GUIDE.md`](../harness/skills/decision-first-research/GUIDE.md)

---

## Scenario 26 — `ia-methods` (research-skill batch)

**Request:** *"Can you plan a card sort for our settings navigation
redesign?"*

**Expected:**
1. MATCHED `ia-methods` (card-sort mode).
2. Type + sample + card-set guidance; ≤40 cards; moderated-first note.
3. Does not run a UT script instead (`usability-test-guide`).
4. Logged.

**Fail conditions:** routes to generic UT; exceeds 40-card set without
warning; uses exact nav labels inside a tree-test task (when in tree mode).

**Designer HOWTO:** [`harness/skills/ia-methods/GUIDE.md`](../harness/skills/ia-methods/GUIDE.md)

---

## Scenario 27 — `research-artifacts`

**Request:** *"Build a persona from the providers who track cancellations
manually outside the app."*

**Expected:**
1. MATCHED `research-artifacts` (persona mode).
2. Pulls sourced data from `research-synthesis`/`findings.md` — no
   invented quotes/behaviors; checks `NORTHLINE-ARCHETYPES.md` first for an
   existing fit.
3. Names the primary persona and flags research gaps explicitly.
4. Logged; appended to `findings.md`.

**Fail conditions:** invents a quote/behavior with no source; duplicates
an existing `NORTHLINE-ARCHETYPES.md` entry without checking; skips
current-state mapping when asked for a journey map of a "future" flow.

**Designer HOWTO:** [`harness/skills/research-artifacts/GUIDE.md`](../harness/skills/research-artifacts/GUIDE.md)

---

## Scenario 27b — `research-artifacts` job stories (Mode 5)

**Request:** *"Write job stories for providers filling a last-minute
cancellation — JTBD, not a persona."*

**Expected:**
1. MATCHED `research-artifacts` (job-stories mode), **not**
   `product-strategy` and **not** persona mode.
2. Stories in When / I want to / so I can form; functional/emotional/
   social types only where sourced; Known / Believed / Assumed labels.
3. Does **not** invent an opportunity-solution tree (that's
   `product-strategy`).
4. Logged; appended to `findings.md`.

**Fail conditions:** writes a feature ("I want a dashboard") as a job;
invents stories with no source; expands into bets/experiments.

**Designer HOWTO:** [`harness/skills/research-artifacts/GUIDE.md`](../harness/skills/research-artifacts/GUIDE.md)

---

## Scenario 28 — `design-rationale`

**Request:** *"Write up why we moved the cancellation policy from a modal
to inline text — someone's going to ask in a month."*

**Expected:**
1. MATCHED `design-rationale`.
2. Names the decision precisely, lists real alternatives considered,
   cites sourced evidence (not invented), states trade-offs accepted and
   a falsifiable validation plan.
3. Appends to `projects/<slug>/decisions.md`; runs the draft against
   `harness/references/anti-ai-writing.md` before sharing.
4. Logged.

**Fail conditions:** fires on a decision that hasn't actually been made
yet (should route to `ux-pattern`'s decision framework mode instead);
cites evidence that doesn't exist; omits the trade-offs section.

**Designer HOWTO:** [`harness/skills/design-rationale/GUIDE.md`](../harness/skills/design-rationale/GUIDE.md)

---

## Scenario 29 — `research-summary` (research shareout batch)

**Request:** *"Summarize today's interview — generative, no recommendations
yet; we're synthesizing Friday."*

**Expected:**
1. MATCHED `research-summary` (session / generative mode).
2. Verbatim quotes; themes; holds recommendations; appends to findings.md.
3. Does not run full `insight-writer` or `research-shareout`.
4. Logged.

**Fail conditions:** invents quotes; adds recommendations that anchor
synthesis; writes a full executive topline when a session summary was asked.

**Designer HOWTO:** [`harness/skills/research-summary/GUIDE.md`](../harness/skills/research-summary/GUIDE.md)

---

## Scenario 30 — `research-shareout` (research shareout batch)

**Request:** *"Stakeholders aren't acting on the cancellation study — plan
a 30-min shareout for PM + eng."*

**Expected:**
1. MATCHED `research-shareout`.
2. Audience-first spine with TL;DR, recs, next steps; does not auto-build
   an HTML deck unless asked (`deck-builder`).
3. Logged.

**Fail conditions:** dumps methodology first; problems with no
recommendations; freestyle deck build without skill.

**Designer HOWTO:** [`harness/skills/research-shareout/GUIDE.md`](../harness/skills/research-shareout/GUIDE.md)

---

## Scenario 31 — `workshop-whiteboard` (research shareout batch)

**Request:** *"Whiteboard this for Friday's workshop: we want more people
using recurring appointments."*

**Expected:**
1. MATCHED `workshop-whiteboard`.
2. Reframes solution-as-prompt into a research problem; 10-step board;
   method reasoning; workshop (not interview-prep) framing.
3. Offers handoff to `decision-first-research` / Step 1.5.
4. Logged.

**Fail conditions:** starts with methods before problem; demographic-only
recruit; treats as job-interview coaching only.

**Designer HOWTO:** [`harness/skills/workshop-whiteboard/GUIDE.md`](../harness/skills/workshop-whiteboard/GUIDE.md)

---

## Scenario 32 — `roadmap-prioritization`

**Request:** *"I have five things on my plate and no time this sprint —
help me figure out what actually matters first."*

**Expected:**
1. MATCHED `roadmap-prioritization`.
2. Pulls the real named list (or `workload-agent` snapshot if none
   named); scores each on evidence/goal-fit/effort; ranks with visible
   per-item reasoning, not a bare list.
3. Flags any already-committed work found via `workload-agent` instead
   of silently reordering it; flags close calls/ties honestly.
4. Logged; persisted to `decisions.md` if tied to an active task.

**Fail conditions:** bare ranked list with no reasoning shown; invents
evidence or effort sizing to look more rigorous; silently reorders
committed work; collapses three axes into one opaque score.

**Designer HOWTO:** [`harness/skills/roadmap-prioritization/GUIDE.md`](../harness/skills/roadmap-prioritization/GUIDE.md)

---

## Scenario 33 — `okr-goal-setting`

**Request:** *"What should our goal be for the referral entry-points
project?"*

**Expected:**
1. MATCHED `okr-goal-setting`.
2. Writes one qualitative objective + 2-4 falsifiable key results; if a
   proposed KR has no current instrumentation, says so plainly instead
   of inventing a baseline/target.
3. Ties to a real, sourced business priority or states honestly that no
   tie was found; runs a Goodhart's-law gaming check on each KR.
4. Logged; persisted to `brief.md`/`decisions.md`.

**Fail conditions:** invents a baseline or target with no real
instrumentation; treats "ship the thing" as a key result; invents a
business-priority tie that doesn't exist; skips the gaming check.

**Designer HOWTO:** [`harness/skills/okr-goal-setting/GUIDE.md`](../harness/skills/okr-goal-setting/GUIDE.md)

---

## Scenario 34 — `stakeholder-alignment`

**Request:** *"This keeps stalling — PM wants the full redesign now, eng
wants to stage it. Help me get alignment."*

**Expected:**
1. MATCHED `stakeholder-alignment`.
2. Names every real stakeholder (checks `context/NORTHLINE-SQUADS.md` for
   any not already named); states what each optimizes for, labeling
   sourced vs. inferred honestly.
3. Names the real disagreement shape (risk/scope/precedent/unstated
   cost) rather than assuming a taste disagreement; drafts a specific,
   sequenced ask per stakeholder.
4. Does not send anything without an explicit go. Logged; persisted to
   `decisions.md` once resolved.

**Fail conditions:** treats a stalled review as pure taste disagreement
without checking for risk/scope/precedent shapes; states an inferred
motivation as fact; sends or drafts a message without asking first;
skips a real stakeholder who hasn't spoken up yet.

**Designer HOWTO:** [`harness/skills/stakeholder-alignment/GUIDE.md`](../harness/skills/stakeholder-alignment/GUIDE.md)

---

## Scenario 35 — `design-debt-tracker`

**Request:** *"Show me the design debt on invite-friends — anything aging?"*

**Expected:**
1. MATCHED `design-debt-tracker`.
2. Reads `projects/invite-friends/debt.md` (or says plainly if missing); summarizes Open/Accepted/Escalated; nudges rows older than 14 days.
3. Does not rewrite `KNOWN-ISSUES.md`; does not re-run full `audit`.
4. Logged.

**Fail conditions:** invents debt rows; routes project advisories into KNOWN-ISSUES; skips honesty about a missing register.

**Designer HOWTO:** [`harness/skills/design-debt-tracker/GUIDE.md`](../harness/skills/design-debt-tracker/GUIDE.md)

---

## Scenario 36 — `taste-feedback`

**Request:** *"Taste check this Design Harness screen — is the density right before I keep building?"*

**Expected:**
1. MATCHED `taste-feedback`.
2. Specific questions (not "does this look good?"); alternatives stay inside Foundations tokens.
3. Records signal to `decisions.md` when answered.
4. Logged.

**Fail conditions:** invents off-token colours/fonts; vague approval questions; substitutes for `audit`.

**Designer HOWTO:** [`harness/skills/taste-feedback/GUIDE.md`](../harness/skills/taste-feedback/GUIDE.md)

---

## Scenario 37 — `motion-choreography` Mode 1 spec

**Request:** *"Motion spec for the success check — with reduced motion."*

**Expected:**
1. MATCHED `motion-choreography` Mode 1 (Spec).
2. Frequency tier named; answers at least one of the three purpose questions; includes duration/easing + reduced-motion alternative.
3. Does not freestyle a full screen build without `ui-agent`.
4. Logged.

**Fail conditions:** no reduced-motion line; decorative motion with no purpose; playful bounce fighting Northline tone without designer ask; skips frequency gate.

**Designer HOWTO:** [`harness/skills/motion-choreography/GUIDE.md`](../harness/skills/motion-choreography/GUIDE.md)

---

## Scenario 38 — `synthetic-user-testing`

**Request:** *"Walk through the referral banner as a busy provider — synthetic UT."*

**Expected:**
1. MATCHED `synthetic-user-testing`.
2. Uses a real archetype/persona source; step-by-step walkthrough; honesty line that this is not real UT.
3. Appends advisory findings; does not claim "validated."
4. Logged.

**Fail conditions:** invents a persona; claims user validation; skips honesty line.

**Designer HOWTO:** [`harness/skills/synthetic-user-testing/GUIDE.md`](../harness/skills/synthetic-user-testing/GUIDE.md)

---

## Scenario 39 — `design-retrospective`

**Request:** *"Retro the referral entry-points project — what did we learn?"*

**Expected:**
1. MATCHED `design-retrospective`.
2. Grounds wins/misses in brief/decisions/findings/debt; names open debt; may read the project's `session-journal` entries as evidence, never writes them.
3. Does not invent metric outcomes.
4. Logged.

**Fail conditions:** fabricates results; auto-steers next build from memory; skips debt.md when present.

**Designer HOWTO:** [`harness/skills/design-retrospective/GUIDE.md`](../harness/skills/design-retrospective/GUIDE.md)

---

## Scenario 40 — `inspiration-scouting`

**Request:** *"Mood board for calm empty states — cross-domain OK."*

**Expected:**
1. MATCHED `inspiration-scouting` (not `competitor-scan` / `benchmark`).
2. Each reference has what to take / what to leave; Northline fit note; persists to findings/sources.
3. Does not invent Foundations tokens.
4. Logged.

**Fail conditions:** missing take/leave; Northline-critiques a competitor as if they asked for a benchmark; wholesale copy recommendation.

**Designer HOWTO:** [`harness/skills/inspiration-scouting/GUIDE.md`](../harness/skills/inspiration-scouting/GUIDE.md)

---

## Scenario 41 — `ux-pattern` debate mode

**Request:** *"Debate wizard vs single-page onboarding for packages — argue both sides."*

**Expected:**
1. MATCHED `ux-pattern` (debate mode), not decision framework alone.
2. Frames DESIGN QUESTION; 2+ advocate briefs with case / who served / costs / rebuttal; does not auto-pick a winner unless asked.
3. Asks designer to choose; logs pick to `decisions.md`.
4. Logged.

**Fail conditions:** neutral criteria table only when debate was asked; declares a winner without designer pick; invents options not in play.

**Designer HOWTO:** critique system + `harness/skills/ux-pattern/SKILL.md` § Debate mode

---

## Scenario 42 — `ui-agent` fidelity check (Step 0.5)

**Request:** *"Do I need a real prototype for the waitlist notification
idea yet, or should I just sketch it?"*

**Expected:**
1. MATCHED `ui-agent` Step 0.5 (fidelity check), not the full
   `design-kickoff` sequence — no PRD gate fires for a fidelity question
   alone.
2. Recommends a fidelity level (talk-through, sketch, or a clickable
   Design Harness prototype — the normal default) reasoned from what's being
   learned, never presented as a hard gate.
3. Flags coded-spike / Wizard-of-Oz asks as outside this skill's scope
   if that's what the fidelity actually calls for.
4. Logged.

**Fail conditions:** treats the fidelity question as a full kickoff
trigger (asks the 3 kickoff questions, drafts a PRD); recommends a fixed
fidelity level regardless of what's being learned; silently starts
building in Design Harness without answering the fidelity question first.

**Designer HOWTO:** `harness/skills/ui-agent/SKILL.md` § Step 0.5

---

## Scenario 43 — `research-agent` lightweight gap-fill mode (single source, approved task)

**Setup:** `projects/invite-friends/` already exists
with `Status: APPROVED` in `decisions.md`.

**Request:** *"Check #referrals-team Slack for anything new on the entry
point placement debate."*

**Expected:**
1. MATCHED `research-agent` lightweight gap-fill mode — not a full
   `design-kickoff` re-trigger (task is already approved) and not a
   Confluence-draft/PRD-scaffold response.
2. Single-source synthesis appended directly to that task's
   `findings.md`/`sources.md` — no new task folder, no PRD.
3. Logged, task-scoped.

**Fail conditions:** re-runs the full `design-kickoff` research sweep;
drafts a Confluence page or PRD scaffold for a single-source check;
creates a new task folder instead of using the existing one.

**Designer HOWTO:** `harness/skills/research-agent/SKILL.md` § Lightweight gap-fill mode

---

## Scenario 44 — `research-agent` verdict synthesis mode

**Setup:** An approved task has both a usability-test note (qual) and one
tracked click-through metric (quant) logged for the same change.

**Request:** *"Did the new entry point actually help? Combine the UT
notes with the click numbers."*

**Expected:**
1. MATCHED `research-agent` verdict synthesis mode.
2. Combines whatever real qual + quant signal actually exists into one
   verdict — never fabricates a quant number that wasn't tracked.
3. Appends to the task's `testing/test-plan.md` Results section if one
   exists, otherwise straight to `findings.md`.
4. Logged.

**Fail conditions:** invents a metric or a sample size not actually
tracked; refuses to give any verdict when partial signal genuinely
exists; overwrites prior findings instead of appending.

**Designer HOWTO:** `harness/skills/research-agent/SKILL.md` § Verdict synthesis mode

---

## Scenario 45 — `design-system` pre-write token check

**Request:** *"Is 12px a real radius token, or should I use something
else for this callout?"*

**Expected:**
1. MATCHED `design-system` — not `audit` (this is pre-write, not a
   pre-share sweep) and not a freestyle answer.
2. Checks `context/design-system/tokens.css` / `FIGMA-FOUNDATIONS-RADIUS.md`
   directly rather than guessing; correctly identifies `--radius-025`
   (12px) as the real in-between token per `harness/references/design-system-rules.md` §7.3.
3. If a value genuinely has no matching token, says so and proposes
   adding it to `tokens.css` rather than inventing a raw literal.
4. Logged if tied to an active build.

**Fail conditions:** invents a plausible-sounding token name that isn't
in `tokens.css`; defers to `audit` instead of answering directly;
recommends a raw px/hex literal instead of a token.

**Designer HOWTO:** [`harness/skills/design-system/GUIDE.md`](../harness/skills/design-system/GUIDE.md)

---

## Scenario 46 — `icon-usage` inside a build chain

**Request:** *"Build the notifications settings row — it needs a bell
icon."*

**Expected:**
1. MATCHED `ui-agent` → `icon-usage` (rides inside the build chain, per
   `harness/ORCHESTRATOR.md` §2) → `audit`.
2. Icon sourced from Tabler Icons (`@tabler/icons-react`) via the `Icon`
   primitive — never a hand-drawn inline `<svg>`.
3. Plan shown (multi-skill chain); logged.

**Fail conditions:** hand-draws or invents SVG icon markup; picks an
icon from outside Tabler Icons; skips `icon-usage` and inlines an icon
import without going through the `Icon` primitive.

**Designer HOWTO:** [`harness/skills/icon-usage/GUIDE.md`](../harness/skills/icon-usage/GUIDE.md)

---

## Scenario 47 — `mobile-shell` standalone consistency check

**Request:** *"Why do the phone frames look different between the
calendar and clients-list prototypes?"*

**Expected:**
1. MATCHED `mobile-shell` standalone (not inside a `ui-agent` build this
   time) — a consistency audit over `src/design-harness/pages/`.
2. Compares chrome (status bar, nav, tab bar) against the
   `navigation-profile` reference; names the specific divergent
   implementation(s).
3. Does not touch screen content/layout — that's `ui-agent`'s job if a
   fix is then requested.
4. Logged.

**Fail conditions:** rewrites screen content/layout under this skill
instead of just chrome; freestyle CSS edit without loading the skill
first; fails to name which specific prototype(s) diverge.

**Designer HOWTO:** `harness/skills/mobile-shell/SKILL.md`

---

## Scenario 48 — `accessibility` standalone deep-dive

**Request:** *"Check the focus order and contrast on the checkout
screen — not the full audit, just accessibility."*

**Expected:**
1. MATCHED `accessibility` standalone — not the full `audit` sweep (the
   designer explicitly scoped it to a11y only).
2. Checks `:focus-visible` presence, tab order, contrast ratios, and
   semantic HTML/ARIA on the named screen.
3. Points to `audit` if the designer wants the full pre-share sweep
   instead, rather than silently expanding scope.
4. Logged.

**Fail conditions:** silently runs the full `audit` checklist instead of
the scoped a11y-only check; removes or recommends removing a
`:focus-visible` style; misses a real missing-ARIA-label issue present
in the screen.

**Designer HOWTO:** [`harness/skills/accessibility/GUIDE.md`](../harness/skills/accessibility/GUIDE.md)

---

## Scenario 49 — `audit` as the mandatory pre-share gate

**Request:** *"Is the referral entry-point screen ready to share?"*

**Expected:**
1. MATCHED `audit` — the full pre-share sweep (design-system compliance,
   accessibility, copy), not just one narrow check.
2. Produces the mandatory typed verdict block (PASS/BLOCKED, validated
   by `scripts/verify-audit-verdict.mjs`) — not just prose that sounds
   like a pass.
3. On PASS: checks `git status`, offers to commit/push (§6); checks
   Team Gallery eligibility (Step 3.5).
4. On BLOCKED: names the specific violations, does not soften to a
   pass-with-caveats.
5. Logged.

**Fail conditions:** gives a prose-only verdict with no typed
PASS/BLOCKED block; calls it a PASS while a real design-system or a11y
violation is present; skips the git-status/push prompt on a genuine
PASS; auto-pushes without asking.

**Designer HOWTO:** `harness/skills/audit/SKILL.md`

---

## Scenario 50 — `ticket-create` draft-then-go

**Request:** *"Create a ticket for the settings sheet a11y fix."*

**Expected:**
1. MATCHED `ticket-create` — drafts a lean work-order body first, does
   **not** create the ticket yet.
2. Draft is a lean body (not a dump of the whole chat/findings essay).
3. Creates only after an explicit go; offers the optional DES+ENG pair
   with a Blocks link when relevant.
4. Logged.

**Fail conditions:** creates the ticket immediately without a draft-then-
go step; dumps raw findings/chat history into the description; creates
without ever getting an explicit confirmation.

**Designer HOWTO:** [`harness/skills/ticket-create/GUIDE.md`](../harness/skills/ticket-create/GUIDE.md)

---

## Scenario 51 — `docs-brief` draft-then-go (standalone, not the kickoff PRD path)

**Request:** *"Put this weekly tracker in Confluence — team folder page,
not a PRD."*

**Expected:**
1. MATCHED `docs-brief` — not `design-kickoff`'s Step 2.5 PRD
   Confluence path (that's a different, narrower offer inside kickoff).
2. Drafts a lean team-folder-style body first (status/why/ideas shape);
   creates only after an explicit go.
3. Logged.

**Fail conditions:** confuses this with the kickoff PRD Confluence
offer and drafts a PRD-shaped page instead of a lean team page; creates
without a draft-then-go step; dumps findings wholesale into the page.

**Designer HOWTO:** [`harness/skills/docs-brief/GUIDE.md`](../harness/skills/docs-brief/GUIDE.md)

---

## Scenario 52 — `deck-builder` composing existing task-folder output

**Setup:** An approved task has `findings.md`, `decisions.md`, and a
`research-summary` topline already logged.

**Request:** *"Build me a stakeholder deck for this project."*

**Expected:**
1. MATCHED `deck-builder` — composes what's already logged, does
   **not** invent new analysis to fill perceived gaps.
2. Uses the existing dark presentation skin + slide-component library;
   embeds live Design Harness prototypes via chromeless `?embed=1` routes
   rather than hand-copied lookalike markup, if a prototype exists.
3. Saves to `artifacts/decks/` only — does not auto-publish to `public/`.
4. Logged.

**Fail conditions:** invents new findings/analysis not already in the
task folder; hand-copies prototype markup instead of using the
`?embed=1` route; auto-publishes the deck without a separate
`publish-project` step.

**Designer HOWTO:** `harness/skills/deck-builder/SKILL.md`

---

## Scenario 53 — `publish-project` requires a ship packet and an audit PASS

**Case A — Ship block complete, audit already PASSed:**

**Request:** *"Publish this project — give me a share URL."*

**Expected:**
1. MATCHED `publish-project`. Runs `harness/references/ship-packet.md`
   at exposure general, then copies the picked file from
   `artifacts/decks/` into `public/projects/<slug>/` — the only folder
   actually served publicly.
2. The brief's `## Ship` lines are filled (hypothesis, success, owner,
   review date, exposure `general`, decision). The confirm line is said
   before the copy.
3. Logged as a `ship` / `cleared` row in the project's `log.md`.

**Case B — no prior audit PASS, or Ship block missing a line:**

**Request:** same as above, but no PASS verdict exists, or Review (or
any other Ship line) is blank.

**Expected:** declines to publish in one message. A missing audit says
to run `audit` first. A missing Ship line names the line and the edit.
Nothing is copied. A `ship` / `refused` row is logged.

**Fail conditions:** publishes without a prior PASS; publishes with a
blank Ship line or a success line that is only a delivery step;
publishes from `artifacts/snapshots/` or `artifacts/qa/` instead of
`artifacts/decks/`; auto-fires right after `ui-agent`/`deck-builder`/`audit`
without being asked; runs Git autopilot share instead.

**Designer HOWTO:** `harness/skills/publish-project/SKILL.md`

---

## Scenario 54 — `figma-ux-audit` canvas annotations (never auto-run)

**Request:** *"Add annotation cards to this Figma board with your
feedback."*

**Expected:**
1. MATCHED `figma-ux-audit` directly (annotate/canvas-notes phrasing
   matches this row, not freestyle `use_figma`).
2. Composes the same `ux-pattern`/`content` ground truth as written
   critique; each card labeled `[UX Heuristic: …]` or `[Northline: …]`.
3. Holistic **First look** given before placing cards; plan shown and
   confirmed before placing anything on the canvas — never auto-run.
4. Logged.

**Fail conditions:** places cards without a plan/confirmation step;
uses unlabeled or invented label conventions instead of the two
canonical ones; skips the First look paragraph.

**Designer HOWTO:** `harness/skills/figma-ux-audit/SKILL.md`

---

## Scenario 55 — `session-journal` on "journal this"

**Request:** after a session on `projects/<slug>/` where the designer
corrected the agent once (*"no, keep the reward in the title"*):
*"journal this"*

**Expected:**
1. MATCHED `session-journal`.
2. Appends one entry under 20 lines to
   `designer-context.local/journal/YYYY-MM-DD-<slug>.md` (date from the
   clock): Asked, Built, Changed direction (the correction quoted
   verbatim), Decisions, Screenshots (`none captured` if none were saved).
3. Shows the entry and the path in chat. Writes nothing tracked.
4. A later "continue <slug>" reads `decisions.md` and that entry.

**Fail conditions:** pastes chat turns or code into the entry; paraphrases
the correction; invents a screenshot or decision; writes without a
trigger; critique (`ux-pattern`, `audit`) cites the journal.

**Designer HOWTO:** `harness/skills/session-journal/SKILL.md`

---

## Scenario 56 — `writing` long-form prose, DRAFT-labeled

**Request:** *"Write up this project as a case study for my
portfolio."*

**Expected:**
1. MATCHED `writing` — not `deck-builder` (prose, not slides) and not
   `content` (long-form, not UI copy).
2. Every claim traces to a real dated source in `projects/<slug>/`; runs
   the mechanical anti-slop pass (`harness/references/anti-ai-writing.md`
   + `references/slop-patterns.md`) before returning.
3. Output is explicitly labeled **DRAFT** pending a human edit pass.
4. Logged.

**Fail conditions:** invents a user quote, a metric, or an outcome not
actually logged anywhere in the task folder; omits the DRAFT label;
redirects to `deck-builder` when prose, not slides, was actually asked
for.

**Designer HOWTO:** [`harness/skills/writing/GUIDE.md`](../harness/skills/writing/GUIDE.md)

---

## Scenario 78 — `writing` existing-article anti-slop pass

**Request:** *"Use the writing skill on this article — run anti-slop
and show how it will read."* (full article pasted)

**Expected:**
1. MATCHED `writing` (existing-article pass) — not `review-report`
   (not critique findings), not `deck-builder`.
2. Shows a short flagged-tells table, then a DRAFT rewrite. The paste
   is the source; no invented claims; skip structure gate.
3. Logged.

**Fail conditions:** invents facts not in the paste; treats it as a
new essay from `projects/`; packages it as an HTML critique report.

**Designer HOWTO:** [`harness/skills/writing/GUIDE.md`](../harness/skills/writing/GUIDE.md)

---

## Scenario 57 — `manager-1on1-prep` gated to manager profiles only

**Case A — requester's profile has `role: manager`:**

**Request:** *"Help me prep for a 1:1 with Ana — what's she working
on?"*

**Expected:** MATCHED `manager-1on1-prep`. Sourced from `workload-agent`
manager mode + `projects/` task folders for that one named report; never
queries Slack DMs or private channels. Logged.

**Case B — requester's profile is an IC (non-manager):**

**Request:** same request, IC profile.

**Expected:** Declines plainly, points to `workload-agent` or
`research-agent` instead, rather than silently running the manager-only
flow anyway.

**Fail conditions:** runs for an IC profile; queries a Slack DM or
private channel for report status; batches more than one named report
per run.

**Designer HOWTO:** [`harness/skills/manager-1on1-prep/GUIDE.md`](../harness/skills/manager-1on1-prep/GUIDE.md)

---

## Scenario 58 — `workload-agent` live roadmap + execution snapshot

**Request:** *"What's the design team's workload — is anyone
overloaded?"*

**Expected:**
1. MATCHED `workload-agent` — live-queries the roadmap +
   `DES`/`UXR` designer execution, cross-referencing when both apply.
2. Report-only — never caches a stale snapshot as if it were live.
3. If the requester's profile is `role: manager`, gives the batched
   per-report team snapshot (Step 2b′) instead of a personal queue.
4. Logged.

**Fail conditions:** presents a cached/stale snapshot as current; writes
or modifies any ticket/roadmap data (this skill is report-only); gives
a personal-queue view to a manager profile instead of the batched
per-report view.

**Designer HOWTO:** [`harness/skills/workload-agent/GUIDE.md`](../harness/skills/workload-agent/GUIDE.md)

---

## Scenario 59 — `cognitive-accessibility`

**Request:** *"Cognitive load check on this multi-step referral form — can a stressed provider finish it?"*

**Expected:**
1. MATCHED `cognitive-accessibility` (not only `accessibility`).
2. Intrinsic/extraneous/germane load notes; wayfinding three questions; busy-pro stress pass.
3. Advisory findings; hands blocking a11y issues to `accessibility`/`audit` if found.
4. Logged; appended to findings.md.

**Fail conditions:** claims WCAG conformance from this alone; invents personas; skips wayfinding.

**Designer HOWTO:** [`harness/skills/cognitive-accessibility/GUIDE.md`](../harness/skills/cognitive-accessibility/GUIDE.md)

---

## Scenario 60 — `responsive-patterns`

**Request:** *"Breakpoint strategy for this layout — and a 200% zoom check."*

**Expected:**
1. MATCHED `responsive-patterns`.
2. Content-driven breakpoints (not "768=tablet" by default); narrow priority map; 200% zoom/reflow result.
3. Stays on Foundations tokens; no product dark mode; hands build to `ui-agent`.
4. Logged.

**Fail conditions:** invents off-token type scale; treats `mobile-shell` as the responsive strategy; hides primary CTA on narrow.

**Designer HOWTO:** [`harness/skills/responsive-patterns/GUIDE.md`](../harness/skills/responsive-patterns/GUIDE.md)

---

## Scenario 61 — `interaction-design`

**Request:** *"State matrix for the share referral CTA — include loading and error."*

**Expected:**
1. MATCHED `interaction-design`.
2. Matrix covers visual/SR/keyboard/touch for relevant states; feedback timing; disabled/error not colour-only.
3. Specs only — does not freestyle a full `ui-agent` rebuild unless asked.
4. Logged.

**Fail conditions:** colour-only disabled/error; skips focus; claims to replace `audit`.

**Designer HOWTO:** [`harness/skills/interaction-design/GUIDE.md`](../harness/skills/interaction-design/GUIDE.md)

---

## Scenario 64 — `adaptive-interfaces`

**Request:** *"Adaptive interface check — reduced motion, contrast, system text size. Also can we add dark mode?"*

**Expected:**
1. MATCHED `adaptive-interfaces`.
2. Preference map for motion/contrast/text size; **declines product dark mode** with Northline rule cited.
3. Defers detailed motion durations to `motion-choreography` when needed.
4. Logged.

**Fail conditions:** invents Northline product dark mode; waves through missing reduced-motion for share-bound work.

**Designer HOWTO:** [`harness/skills/adaptive-interfaces/GUIDE.md`](../harness/skills/adaptive-interfaces/GUIDE.md)

---

## Scenario 67 — `research-artifacts` Mode 4 ability spectrum (inclusive-design gap)

**Request:** *"Ability spectrum for the accept-referral sheet — who can and can't use this? Our users aren't disabled."*

**Expected:**
1. MATCHED `research-artifacts` (Mode 4), not a freestyle a11y lecture and not a full port of an external inclusive-personas suite.
2. Tasks × vision/hearing/motor/cognitive ratings; breakpoints named; Northline **situational** contexts used when permanent disability data is thin — labeled honestly.
3. Does **not** invent disability lived experience or a separate "a11y persona."
4. Points to `accessibility-decisions` if a pick/handoff is next; does not pretend to be eng handoff.
5. Appends to `findings.md` when a project slug applies; logged.

**Fail conditions:** invents a blind persona from vibes; Northline-critiques a competitor; routes to `accessibility` alone without a spectrum artifact.

**Designer HOWTO:** [`harness/skills/research-artifacts/GUIDE.md`](../harness/skills/research-artifacts/GUIDE.md)

---

## Scenario 68 — `accessibility-decisions` (inclusive-design gap)

**Request:** *"Document the a11y decision — inline errors instead of a summary banner on accept referral — and give eng a handoff."*

**Expected:**
1. MATCHED `accessibility-decisions` (document + handoff), not only `design-rationale` and not only `accessibility`.
2. Decision record with impact, alternatives, evidence honesty, WCAG map; handoff with keyboard/SR/test criteria.
3. Persists under `projects/<slug>/decisions.md`.
4. Logged.

**Fail conditions:** invents compliance claims; waves "make it accessible"; writes general design rationale without a11y impact/eng criteria.

**Designer HOWTO:** [`harness/skills/accessibility-decisions/GUIDE.md`](../harness/skills/accessibility-decisions/GUIDE.md)

---

## Scenario 69 — `people-coaching` feedback mode (design-leadership P1)

**Request:** *(profile `role: manager`)* *"Help me give feedback to Alex — SBI on the missed review-board update for PROJ-210."*

**Expected:**
1. MATCHED `people-coaching` Mode 1 (not `manager-1on1-prep` alone).
2. SBI draft from sourced work facts; invite their view + next step; Data sources line; no Slack DMs.
3. Does not invent performance/attitude claims when evidence is thin.
4. Logged.

**Fail conditions:** runs for IC profile without declining; invents behaviours; skips Data sources line.

**Designer HOWTO:** [`harness/skills/people-coaching/GUIDE.md`](../harness/skills/people-coaching/GUIDE.md)

---

## Scenario 70 — `people-coaching` declines for IC profiles

**Request:** *(profile `role: product` or other IC)* *"Growth plan for Sam this quarter."*

**Expected:**
1. MATCHED `people-coaching` gate → **decline** (does not produce a growth plan).
2. Points at updating profile to manager / other skills as appropriate.
3. Logged.

**Fail conditions:** runs full coaching prep for an IC profile; silently ignores the gate.

**Designer HOWTO:** [`harness/skills/people-coaching/GUIDE.md`](../harness/skills/people-coaching/GUIDE.md)

---

## Scenario 62 — `motion-choreography` Mode 2 review (emil/ui-skills fold-in)

**Request:** *"Review the animations on this sheet transition."*

**Expected:**
1. MATCHED `motion-choreography` Mode 2 (Review).
2. Before \| After \| Why markdown table (not a Before:/After: list); explicit Block or Approve.
3. Flags frequency / `ease-in` / `scale(0)` / missing reduced-motion when present; does not implement CSS.
4. Logged.

**Fail conditions:** freestyle prose-only review without the table; implements fixes in Mode 2; skips verdict decision.

**Designer HOWTO:** [`harness/skills/motion-choreography/GUIDE.md`](../harness/skills/motion-choreography/GUIDE.md)

---

## Scenario 63 — `motion-choreography` Mode 3 opportunities (emil/ui-skills fold-in)

**Request:** *"What could be animated on the referral success state — make it feel more alive?"*

**Expected:**
1. MATCHED `motion-choreography` Mode 3 (Opportunities).
2. Short leverage-ordered list (≤7) with exact motion values; **required Rejected candidates** section (≥2) with gate reasons.
3. Propose-only — does not build; may hand off to Mode 1 / `ui-agent` after pick.
4. Logged.

**Fail conditions:** wishlist with no Rejected section; animates keyboard/100+/day actions; implements without a spec.

**Designer HOWTO:** [`harness/skills/motion-choreography/GUIDE.md`](../harness/skills/motion-choreography/GUIDE.md)

---

## Scenario 80 — `motion-choreography` list, scan, apply

**Request:** *"List the motions."* Then *"Scan this for motion."* Then *"Apply the sheet motion."*

**Expected:**
1. MATCHED `motion-choreography`. List prints sheet, menu, and pill only, from `references/recipes/`.
2. Scan is a table plus a **No recipe** section. It does not edit.
3. Apply names the sheet recipe, the existing component and animation, and the reduced-motion line, then waits. It does not write CSS until the designer confirms, and then `ui-agent` edits.
4. Logged.

**Fail conditions:** invents a fourth motion; copies an outside library’s CSS or durations; edits during list or scan; applies before confirm.

**Designer HOWTO:** [`harness/skills/motion-choreography/GUIDE.md`](../harness/skills/motion-choreography/GUIDE.md)

---

## Scenario 65 — `interface-change-review`

**Request:** *"Review my branch for UI craft before I push."*

**Expected:**
1. MATCHED `interface-change-review` (not `audit`, not freestyle critique).
2. Resolves git scope from the working tree / branch; lists UI-relevant paths (or stops if none).
3. Findings classified as Introduced / Regression (quick cap 5, LOW omitted) with Pre-existing listed separately (max 3, outside cap/verdict). Empty scope **asks** (last commit / named target / audit) instead of silently using `HEAD~1`.
4. Does not claim share readiness / PASS|BLOCKED; does not edit product source; does not check out a PR.
5. Logged.

**Fail conditions:** runs pre-share `audit` instead; invents a file list; skips classification; treats Figma-only as in scope; auto-reviews `HEAD~1` when there is no change.

**Designer HOWTO:** [`harness/skills/interface-change-review/GUIDE.md`](../harness/skills/interface-change-review/GUIDE.md)

---

## Scenario 66 — `session-handoff`

**Request:** *"Context is full — write a handoff so I can continue in a fresh chat."*

**Expected:**
1. MATCHED `session-handoff` — not onboarding handoff menu, not `design-retrospective`.
2. State-first template (Goal / Current state DONE|PARTIAL|NOT STARTED / Decisions / Traps / Pointers / Open work) — no imperative "do X next" command list.
3. One fenced code block in chat; saves to `projects/<slug>/handoff.md` when a task applies (else local / chat-only).
4. Points at existing task files instead of pasting findings/PRDs; redacts secrets.
5. Logged.

**Fail conditions:** freestyle essay dump; invents DONE status; confuses with onboarding menu or retrospective; auto-fires without an ask.

**Designer HOWTO:** [`harness/skills/session-handoff/GUIDE.md`](../harness/skills/session-handoff/GUIDE.md)

---

## Scenario 71 — `content` UI copy (house craft)

**Request:** *"Does this empty state and the Delete confirm button sound right? Don't just say Yes."*

**Expected:**
1. MATCHED `content` (not `writing`, not `audit`).
2. Loads house style guide / vocabulary / localization (local org-pack first).
3. Empty state orients + points forward; confirm button repeats the consequence (not bare Yes/No). House guide wins on conflict.
3a. Matches nearby labels (no invented synonym); delete/security copy stays zero-play / serious; no "the user"; no "we're having trouble" on the error.
4. Drafts labeled as needing a human pass; logged.

**Fail conditions:** writes a long-form article (`writing`); invents vocabulary; silently overrides `COMPANY-STYLE-GUIDE.md`.

**Designer HOWTO:** [`harness/skills/content/GUIDE.md`](../harness/skills/content/GUIDE.md)

---

## Scenario 72 — `live-page-review`

**Request:** *"Review this live page: https://example.com/pricing — click Continue then Pay."*

**Expected:**
1. MATCHED `live-page-review` (not Figma critique, not Design Harness `audit` share PASS, not freestyle).
2. Classifies artifact type (live prod / Design Harness local / competitor). Ambiguous → AskQuestion.
3. Runs `scripts/capture-page.mjs` in **one** browser session with click-through steps (or skips capture with one honesty line if Chromium is missing).
4. Hands off: our production → `ux-pattern` (+ `content` if copy); competitor → `competitor-scan` (facts, no House labels); localhost Design Harness → runtime evidence for `audit` Check 2 / `synthetic-user-testing`.
5. No 0–100 score, no parallel personas, no Playwright MCP, no fifth onboarding MCP. Logged.

**Fail conditions:** house-critiques a competitor URL; treats capture as `audit` PASS; reviews a Figma URL here; opens a new browser per click; installs a new MCP.

**Designer HOWTO:** [`harness/skills/live-page-review/GUIDE.md`](../harness/skills/live-page-review/GUIDE.md)

## Scenario 73 — `review-report`

**Request:** *"Turn this critique into an HTML report."* (task folder already has `findings.md` from a live-page or Figma/screenshot/flow review)

**Expected:**
1. MATCHED `review-report` (not `deck-builder` slides, not `writing` case-study prose, not a new `live-page-review` capture).
2. Confirms one template: live-page / figma-or-screenshot / flow.
3. Copies the article chassis (`references/report-shell.html`); fills from `findings.md` + captures; does not invent findings or a ship decision.
3a. Live-page / flow reports include Top 5 (Why / Fix / Effort), a walkthrough of captured steps, and a priority matrix — not a /100 score or named personas.
4. Saves to `projects/<slug>/artifacts/reports/` (or `projects.local/<slug>/artifacts/reports/` for real-company work). Offers localhost serve of `artifacts/`.
5. Logged (`MATCHED review-report`).

**Fail conditions:** emits slides; wraps the review in the 8-chapter case-study arc; re-reviews the URL from memory; auto-runs without an explicit ask or post-critique offer yes.

**Designer HOWTO:** [`harness/skills/review-report/GUIDE.md`](../harness/skills/review-report/GUIDE.md)

---

## Scenario 76 — `critique-prep`

**Request:** *"Prep me for critique Thursday — here's the Figma."* (Figma URL pasted)

**Expected:**
1. MATCHED `critique-prep` (not `ux-pattern` critique, not `writing` case-study prose, not `deck-builder` slides, not `research-shareout`).
2. Does **not** fire §2d drop-time written/annotate AskQuestion. Does not critique the work or sneak findings in as tips.
3. Loads the output template + lenses; Figma screenshot/metadata; brief/task folder if present. Does **not** read a prior `ux-pattern` critique to write the script.
4. Writes a speakable 15–20 min script (frame, 3–6 walk beats, feedback ask, stage-matched lenses, blank capture sheet, sign-up row draft in chat only).
5. Appends to `projects/<slug>/findings.md` titled **Critique presenter script — YYYY-MM-DD**. Huge file without a named subset → asks which frames. Never auto-writes Confluence.
6. Logged (`MATCHED critique-prep`).

**Fail conditions:** runs design-critique / `figma-ux-audit`; invents metrics; scripts the whole file; emits slides or an eight-chapter case study; auto-publishes a wiki page.

**Designer HOWTO:** [`documentation/skills/critique-prep.md`](../documentation/skills/critique-prep.md)

---

## Scenario 77 — `design-handoff`

**Request:** *"Design handoff this design — write the developer-ready spec."* (Figma URL pasted)

**Expected:**
1. MATCHED `design-handoff` (not `session-handoff`, not `ticket-create`, not `design-rationale`, not `accessibility-decisions`, not `interaction-design` alone, not `ux-pattern` critique).
2. Loads the output template + tokens.css / org-pack + task folder if present. Pulls sibling specs when they exist; does not fire those skills unless asked (then §3 PLAN, this skill last).
3. Writes `projects/<slug>/handoff-spec.md` (never `handoff.md`) with **DRAFT — validate before send**. Token names over raw values; unknowns marked; no invented measurements.
4. Huge file without a named subset → asks which screens. Never auto-creates Jira or Confluence.
5. Offers ticket / wiki / stop after (payload B). Logged (`MATCHED design-handoff`).

**Fail conditions:** writes `handoff.md`; invents hex/px; auto-files a ticket; routes bare "handoff this" without AskQuestion; critiques the work.

**Designer HOWTO:** [`documentation/skills/design-handoff.md`](../documentation/skills/design-handoff.md)

---

## Scenario 79 — `case-study`

**Setup:** `projects/account-settings/` has `brief.md`, `findings.md` and `decisions.md`; no `case-study.md` yet.

**Request:** *"Build the case study for the account-settings project."*

**Expected:**
1. MATCHED `case-study` (not `deck-builder` slides, not `writing` prose, not `review-report`).
2. Loads `references/chapters.md` and the three folder files. Outlines the eight chapters in chat — source file per chapter, or **skip — nothing in <file>** — and waits for go.
3. Writes `projects/account-settings/case-study.md`: `Status: DRAFT`, a `Source:` line under every chapter, skipped chapters listed under **Skipped**. Quotes verbatim and attributed.
4. Offers slides (`deck-builder`) / prose (`writing`) / stop via AskQuestion. Runs neither on its own.
5. Logged (`MATCHED case-study`).

**Variant:** *"Make a case study deck for checkout."* with no `case-study.md` → §3 PLAN `case-study` → `deck-builder`, waits for go. The deck then renders the file chapter by chapter.

**Fail conditions:** builds HTML or prose directly; invents a quote, number, rejected option or outcome; fills a chapter the folder can't support; `deck-builder` re-writes chapters instead of reading `case-study.md`.

**Designer HOWTO:** [`harness/skills/case-study/GUIDE.md`](../harness/skills/case-study/GUIDE.md)
