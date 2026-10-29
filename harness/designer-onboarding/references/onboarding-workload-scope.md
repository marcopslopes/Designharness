# Onboarding workload — scoped `workload-agent` run

After writing `designer-profile.local.md`, **automatically** run
`harness/skills/workload-agent/SKILL.md` before the handoff menu. This is not
optional when a tracker (Jira, Linear, or GitHub) is connected — designers should see **their
personal queue** on day one, even though squad is no longer collected at
onboarding by default.

**Links:** all ticket keys in handoff tables must be markdown links per
`harness/references/source-links.md` (Key column = `[KEY](<ticket URL>)`).

Skip only when:
- `Status: SKIPPED` on the profile
- No tracker is connected, or it fails (say so in one line; continue handoff)

Do **not** append to `projects/` — no task folder exists yet. Output is
**abbreviated** for chat (see format below), not the full kickoff findings dump.

---

## Squad unset (still the common case — but not universal anymore)

Since squad assignment is deferred by default (see `SKILL.md` § Deferred
and opt-in fields), most first-time onboarding runs will have no `Squad
assignment` to scope from **unless Step 1c's silent resolve already
filled it in** (see § Squad already known below — check this first).
When it's genuinely unset:

- **Run leg 0 only** (personal queue, below) — it needs nothing but the
  resolved name.
- **Skip legs 1–3** (roadmap, initiative keywords, squad execution) — they
  need a squad to map to roadmap boards and can't run without one.
- In the handoff, say so in one line rather than showing empty tables:
  *"Squad-matched work and roadmap will show up once I know your squad —
  mention it on your first real task, or say 'set up my full profile' to
  pick it now."*
- **Do not guess a squad** from name, title, or anything else to avoid
  this line — an empty-but-honest snapshot beats a wrong one.

---

## Squad already known — opt-in, filled in later, or Step 1c silent resolve

**Run all four legs below, same treatment regardless of *how* squad
became known** — opt-in full setup, a downstream skill filling it in
later, or `designer-onboarding/SKILL.md` § Silent squad resolve matching
the designer's name against `COMPANY-SQUADS.md`'s directory with
no question asked. The workload snapshot doesn't distinguish these paths
in its output — squad is either known or it isn't.

---

## Manager profiles (`Role focus: manager`) — different leg entirely

**Do not run leg 0 (personal queue) below for a manager profile** — a
manager's own assignee query is the wrong shape, per
`harness/designer-onboarding/SKILL.md` § Manager role focus. Instead:

1. Read `Reports:` from the profile.
2. **If set** — run `harness/skills/workload-agent/SKILL.md` **Step 2b′
   (Manager mode)**: one batched query across the `Reports:` list, output
   grouped per person with staleness flags (see
   `harness/skills/workload-agent/references/design-board.md` § Manager
   mode for the query and the staleness threshold — don't restate the
   number here).
3. **If unset** (manager said "skip for now" at onboarding) — skip this
   leg entirely and say so in the handoff: *"No reports on file yet — say
   'update my profile' to add your team."* Do not guess a team from
   domain/squad data.
4. Roadmap leg (§ 1 below) still runs normally for managers, scoped by
   their domain(s) from `COMPANY-SQUADS.md` § Design leadership —
   unaffected by the manager/IC distinction.

---

## How to scope from the profile (IC profiles only — role focus product / content / accessibility / research / mix)

Run legs in this order. **Personal queue first** — that's what the designer
is most likely working on, and it's the only leg that works when squad is
unset.

### 0. Resolve assignee (personal queue leg)

Who is this designer in the tracker?

1. **`Name:` in profile** — use as-is if it looks like a real name (not
   "Skip"). Prefer **first + last** as they appear in assignee fields.
2. **Else** ask the tracker for the connected account (Jira
   `atlassianUserInfo`, Linear's current user, GitHub's authenticated user) —
   use its display name.
3. **Else** skip the personal leg; in handoff add one line: *"I couldn't
   match you in [tracker] — tell me your name as it appears on your design
   tickets and I'll refresh your queue."*

Before querying tickets, resolve the name to a tracker identity
(`harness/references/work-tools.md` § Tracker → Find a person) — duplicate
first names happen at most orgs. Use the identity the tool returns.

**Personal queue query** (every design container, always) — the
single-assignee query from `harness/skills/workload-agent/references/design-board.md`,
e.g. in Jira:

```
assignee = "<accountId or Full Display Name>" AND project in (DES, UXR)
AND statusCategory != Done
ORDER BY status ASC, updated DESC
```

Per `design-board.md`: group output by status — **In Progress** and **Review**
first, then **To Do** / **Backlog**, call out **On Hold** by name. Cap
**10 tickets** in handoff (most recently updated within each status group).

If zero results after resolving the name, say *"nothing active assigned
to you on [design containers]"* — don't guess another assignee.

**Optional profile write-back:** if `Name` was skipped but the tracker
resolved a display name, store it under `Name:` when writing/updating the
profile so future sessions don't re-resolve.

### 1. Roadmap boards (roadmap leg)

**Requires squad assignment to be set** — skip per § Squad unset above if
it isn't. Map `Squad assignment.Squads` + `Domains` through
`COMPANY-SQUADS.md` § **Squad → roadmap boards** (older packs: § Squad → JPD / Jira). Union boards,
dedupe:

| Profile includes… | Query these roadmap keys |
|---|---|
| Onboarding, Launch, Plans | `CORE`, `GROW` |
| Stock, Suppliers, Counter, Reports, Navigation, Referrals | `CORE` |
| Payments, Wallet | `PAY` |
| Ordering | `CON` |
| Cross-cutting only (no product squad) | **Roadmap leg optional** — personal queue + execution leg only |

Widen one hop when profile lists **multiple domains** (e.g. Core Product + Finance → `CORE` +
`PAY`). Do not query `TECH` or `OPS` unless explicitly cross-cutting ops.

Per board: run Level 1 from `workload-agent/references/roadmap-check.md`.
Surface **Make** and **Plan** first; cap **5 items per board** in the handoff
(full detail available on request).

### 2. Initiative keywords (Level 2 — from queue + squad)

Derive keywords from **their personal queue** ticket summaries (In
Progress / Review first) for roadmap Level 2 / `text ~` searches on boards
from step 1. If queue is empty, use squad **Notes** keywords from
`COMPANY-SQUADS.md` (see squad table below).

### 3. Squad execution leg

Always run squad-keyword search on `DES` + `UXR` per squad in profile
(`COMPANY-SQUADS.md` terms):

| Squad / stream | Suggested `text ~` terms |
|---|---|
| Counter | referrals, navigation, loyalty, checkout |
| Stock | inventory, reorder |
| Suppliers | supplier orders, deliveries, reports |
| Onboarding | onboarding, permissions |
| Launch | launch, catalogue |
| Plans | pricing, plans |
| Payments | payments, card reader, tap to pay |
| Wallet | wallet, balance, payouts |
| Ordering | trade orders, accounts |

Cap **8 tickets** total in the squad-matched section (most recently updated
first). **Deduplicate** — if a ticket already appears in **Your queue**, do
not repeat it under squad-matched.

### 4. Cross-reference (when roadmap + squad legs ran)

Apply `workload-agent` Step 3 — **Worth a look**: one short paragraph below
the tables (max 3 sentences), not a bullet list.

---

## Side-thread detection (for the handoff headline)

Used by `references/post-onboarding-handoff.md` § 2's personalized headline
to decide whether to name a specific ticket as a "side thread" alongside
the designer's primary squad (e.g. "you're on the Counter team, and
it looks like you've also got the agents-design-playground work going").
**This is a rule against data already fetched in legs 0/1/3 above — it
never issues a new query, and it fails safe (skip the clause) whenever the
comparison data isn't available.** Concrete and checkable, not vibes:

A ticket from the designer's **personal queue** (leg 0, "Your queue")
counts as a side thread only if **all** of:

1. **Squad is known** for this designer (silently resolved, opt-in, or
   filled in later). No squad → no "usual work" baseline to measure
   against → **skip this clause entirely**, same as any other field this
   skill won't guess.
2. Its summary text does **not** match any of that squad's `text ~` terms
   in § 3's keyword table above (or squad `Notes` keywords in
   `COMPANY-SQUADS.md`) — i.e., leg 3's own search wouldn't have surfaced
   it as squad work in the first place.
3. It does **not** also appear in that designer's **Roadmap** (leg 1) or
   **Squad design in flight** (leg 3) tables — if it shows up there too
   under a different guise, it's core squad work, not a side thread,
   regardless of what #2 found.

**If more than one ticket qualifies,** use the single most recently
updated one — same recency tie-break already used to cap tickets
elsewhere in this file. **If zero qualify,** skip the clause — never
invent one to fill the sentence, same "an honest partial output beats a
fabricated one" principle as § Guardrails below.

This never widens or changes any query above — it only re-reads tickets
and keyword tables **already fetched** for legs 0, 1, and 3 of this same
onboarding run.

---

## Abbreviated handoff format

Insert **after** the personalized headline (`post-onboarding-handoff.md`
§ 2 — no separate recap table anymore, re-spec 2026-07-17), **before** the
`AskQuestion` menu. Use **markdown tables** — not bullet lists — for all
tracker data.

**Default (squad unset) — personal queue only:**

```markdown
### Workload snapshot — [date/time UTC]

*Live from [tracker] · [Full Display Name]. Say **refresh workload** for a full dump.*

#### Your queue (`DES` + `UXR`)

| Status | Key | Summary | Board |
|--------|-----|---------|-------|
| … | | | |

Squad-matched work and roadmap will show up once I know your squad —
mention it on your first real task, or say "set up my full profile" to
pick it now.
```

**Full (squad set — silent resolve, opt-in, or filled in later):**

```markdown
### Workload snapshot — [date/time UTC]

*Live from [tracker] · [Full Display Name] · [squad scope]. Say **refresh workload** for a full dump.*

#### Your queue (`DES` + `UXR`)

| Status | Key | Summary | Board |
|--------|-----|---------|-------|
| … | | | |

#### Roadmap ([board keys])

| Stage | Key | Summary |
|-------|-----|---------|
| … | | |

#### Squad design in flight ([squad label])

| Status | Key | Summary | Assignee | Board |
|--------|-----|---------|----------|-------|
| … | | | | |

**Worth a look:** [one short paragraph — cross-ref only]
```

**Manager (`Role focus: manager`, `Reports:` set) — team snapshot, not a personal queue:**

```markdown
### Team snapshot — [date/time UTC]

*Live from [tracker] · [Reports list]. Say **refresh workload** for a full dump.*

#### Your team (`DES` + `UXR`)

⚠ [Report] — [KEY] "[summary]" hasn't moved in [N]d (past the staleness threshold)
- [Report A] — N in progress, M in review, K queued
- [Report B] — N in progress, M in review, K queued

#### Roadmap ([board keys, from their led domain(s)])

| Stage | Key | Summary |
|-------|-----|---------|
| … | | |
```

If `Reports:` is unset, skip the team table entirely and say: *"No reports
on file yet — say 'update my profile' to add your team."* Never guess one.

**Headline (above snapshot)** — see `post-onboarding-handoff.md` § 2 for
the exact copy per case. No separate recap table.

**Menu:** `references/handoff-menu-question.md` — `AskQuestion` only, and
only after the table(s) above are already rendered (§ 5's self-check).

If a leg returned zero results after vocabulary retry per `roadmap-boards.md`,
say "quiet on [board]" — don't emit empty tables.

If MCP unavailable (should not happen post-gate):

> **Workload:** tracker unreachable — say **refresh workload** after re-auth.

---

## Guardrails (onboarding-specific)

- **Abbreviate** — this is orientation, not a quarterly planning doc
- **Never** block the handoff menu waiting on a perfect snapshot — partial is OK
- **Never** label anyone "overloaded" or estimate capacity %
- **Never** hardcode initiative lists — live query only
- **Never** guess a squad to unlock roadmap/execution legs — an honest
  personal-queue-only snapshot beats a wrong squad-scoped one
- **Never** run the personal-queue leg (leg 0) for a `role: manager`
  profile against their own name — check `Role focus` first
- **Never** guess a manager's `Reports:` list from squad/domain data —
  an honest "no reports on file" beats a wrong team
- Full `workload-agent` output on demand: "show full workload" / "refresh workload"
