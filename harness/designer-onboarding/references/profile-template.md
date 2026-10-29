# Designer profile template

Copy this structure into `designer-profile.local.md` at the repo root
(gitignored — this exact filename has its own `.gitignore` entry). Open
with the greeting from `SKILL.md`, then run onboarding per **Steps**
below. As of this rewrite, only **Step 1** is asked by default — Step 2
(squad assignment) and the rest of the original Step 1 batch (platform,
interaction style, experience level) are **deferred** or **opt-in**; see
`SKILL.md` § Deferred and opt-in fields. **Step 1c** (new) silently
resolves squad assignment for a subset of `product`/`mix` designers
without asking or deferring — see below.

---

## The greeting (verbatim, or close to it — see SKILL.md for the tone rationale)

**No narrating preamble before this** — the text below is the literal
first content of the turn, never preceded by a sentence announcing it
(e.g. "Now let me output the greeting"). **Plain text, never a
blockquote** — an earlier version of this doc wrote the greeting with
`>` markdown blockquote syntax, which rendered as an indented, quoted
callout live; that was a formatting artifact of how the spec was
written, not an intentional style choice (re-spec 2026-07-17). **Two
plain-text blocks, back to back, not one merged block** — see
`SKILL.md` § The greeting for why, and where the `npm install`
disclaimer moved to instead:

**I'm Muse — welcome to Design Harness.**

A few things I can actually do:
- Kick off new projects with real research behind them
- Build screens from the company's real design system
- Prep you for a 1:1 if you lead a team
- Catch design-system or accessibility issues before you share something

I'll check which of your team's tools are connected, then ask one
question — after that I'll write a `designer-profile.local.md` file
right here in your local clone (never pushed to GitHub, just this
machine) so I don't have to ask you the same setup questions again.

---

## Step 1 — The one question (default path)

Resolve name **silently first** — no question:

1. Ask the connected tracker who the current user is: Jira
   (`atlassianUserInfo`, then `lookupJiraAccountId` to confirm the match
   isn't ambiguous), Linear (the viewer / current user), or GitHub (the
   authenticated user). Teams often have duplicate first names, so confirm
   before storing. Store the confirmed display name as `Name:`.
2. **Only if that fails** (no tracker connected, or the match is genuinely
   ambiguous) — ask one free-text question: "What's your name as it
   appears in your team's tracker?" Skip is fine; leave `Name:` unset if they skip too.

Then one **`AskQuestion` tool call** (interactive buttons — never a
numbered list in chat), single-select, per
`references/onboarding-questions.md` § How to ask + § Step 1. In the same
message, one sentence of context before the tool call — not a cold
"What's your role focus?" (make the trade explicit: one question now
instead of the 8–10 this used to be):

> "One thing helps me route your work correctly and skip the rest of the
> usual setup questions: what's your role focus?"

| Option | Stored as | Notes |
|---|---|---|
| Product design | `product` | |
| Content design | `content` | |
| Accessibility | `accessibility` | |
| Research | `research` | |
| **Manager** | `manager` | Triggers Step 1b (below) instead of deferred squad assignment — no IC squad scoping applies |
| Mix | `mix` | |
| Not sure yet | `mix` *(flagged `— unconfirmed default`)* | Correctable any time; see § Editing later |

That's it (for the 5 IC values + "Not sure yet") — do **not** ask what
they are working on (the post-onboarding workload snapshot pulls that
from the tracker), their platform, squad, interaction style, or experience level
here. **Manager** is the one exception with a required immediate
follow-up — see § Manager profile shape below. Squad assignment for the
other values may still end up filled in — silently, not by a question —
via Step 1c immediately below.

---

## Step 1b — Manager branch (role focus = Manager only)

See `onboarding-questions.md` § Step 1b for the exact scripts — including
why this gets its own confident framing rather than reading as a generic
follow-up: correctly inferring a manager's team from org data, unprompted,
is the single most impressive thing this flow does. Summary:

1. Search `COMPANY-SQUADS.md` § Design leadership for the resolved
   name.
2. **Match found** → multi-select `AskQuestion`, pre-loaded with that
   entry's reports list, `allow_multiple: true`, plus **Other…** — lead
   with the inference as a stated fact to confirm/edit, not a blind ask.
3. **No match** → free-text `AskQuestion`, "Skip for now" allowed (leaves
   `Reports:` unset/deferred) — say plainly that org data didn't resolve
   it here rather than asking cold.
4. Store as `Reports:` in the profile — see § Manager profile shape.

This is the **only** role-focus value that gets an immediate second
question by default. Every other deferred field (platform, interaction
style, experience level) still applies to manager profiles exactly as it
does for ICs — only squad assignment is replaced by this branch.

---

## Step 1c — Silent squad resolve (`product`/`mix` only — no question, no `AskQuestion`)

Runs immediately after Step 1's role-focus answer, using the `Name`
already resolved silently — a lookup, not a question, and nothing is
shown to the designer unless it finds something. See
`onboarding-questions.md` § Step 1c for the full algorithm; summary:

1. Search `COMPANY-SQUADS.md`'s per-squad "Product designer"
   columns for the resolved `Name`.
2. **Exactly one clean match** (not an informal note) → write `Squad
   assignment:` directly (`Mode: dedicated`, that squad's domain, that
   squad, primary squad = that squad). See § Silently-resolved profile
   shape below.
3. **Zero matches, or informal-note-only** → leave unset/deferred, same
   as if this step didn't run.
4. **Multiple clean matches** (not possible today) → leave unset/deferred,
   flag the ambiguity in `Notes:`.

Only runs for `product`/`mix` (including "Not sure yet"). Never runs for
`content` / `accessibility` / `research` (directory models single-owner
product squads, not their multi-squad relationship) or `manager` (Step
1b already handles their equivalent — `Reports:` — separately).

**Eligible squads:** only those whose designer cell in `COMPANY-SQUADS.md`
holds a real name. Coverage stays as narrow as the directory is.

---

## Step 2 — Squad assignment (deferred by default — skipped if Step 1c already resolved it)

**This step does not run at onboarding by default.** It runs only if the
designer explicitly opts in ("set up my full profile now" / "ask me the
squad questions") **and** Step 1c didn't already fill `Squad assignment:`
silently — if Step 1c already resolved it, opt-in skips straight to the
legacy-batch questions (platform/style/experience) instead, since squad
is already answered. In the remaining default case (no opt-in, no Step
1c match), squad assignment is left unset and filled in later — either
inferred from a real task's own topic/keywords (how `design-kickoff`
already works, with no profile dependency), or asked once, in context,
by whichever skill hits a genuine ambiguity it can't resolve otherwise —
then written back here.

**If the designer opts in** ("set up my full profile now" / "ask me the
squad questions"), run the full domain → squad → optional primary-squad
sequence immediately, per `references/onboarding-questions.md` — **always
domain first, then squad**. Never one flat list of every squad (truncates
in Cursor and hid provider squads before we fixed this).

### 2a — Domain (`AskQuestion`)

Pick which **product domain(s)** they work in:

| Option | Squads underneath |
|---|---|
| Store Growth | Onboarding, Launch, Plans |
| Core Product | Stock, Suppliers, Counter + streams |
| Finance | Payments, Wallet |
| Trade customers | Ordering |
| Cross-cutting | Content central, DS, Research |

`allow_multiple`: **true** for content / a11y / research; **false** for product
(unless they genuinely span domains — then allow multi).

### 2b — Squad (`AskQuestion`)

Show **only** squads for domain(s) picked in 2a. Full label list per domain:
`references/onboarding-questions.md` § Step 2b. Canonical definitions:
`COMPANY-SQUADS.md`.

| Role | Wording | `allow_multiple` |
|---|---|---|
| **content** | "Which squads do you support? Pick all that apply." | `true` |
| **product** | "What's your primary squad?" | `false` |
| **accessibility** / **research** | "Which squad(s) do you mainly partner with?" | `true` |

Always include **Other / mix**.

### 2c — Primary squad (only if 2+ squads in 2b)

Single pick from their 2b answers: *"Which do you spend the most time in?"*
Skip if they picked exactly one squad.

---

## Legacy full batch (opt-in only) — platform, interaction style, experience level

These three used to be part of the mandatory Step 1 batch. They are now
**opt-in only** — ask them in the same breath as Step 2 if (and only if)
the designer asked for full setup upfront. Otherwise leave unset per
`SKILL.md` § Deferred and opt-in fields, and let them get filled in
opportunistically:

1. **Primary platform** — iOS / Android / Web / all three
2. **Interaction style** — always show a plan / just go for simple asks
3. **Experience level** — new to this repo's tokens & Figma / experienced

---

## File to write: `designer-profile.local.md`

```markdown
# Designer profile

Status: ACTIVE
Created: <YYYY-MM-DD>
Last updated: <YYYY-MM-DD>

- Name: <if resolved via the tracker, or given on ambiguity fallback; else omit>
- Role focus: <product | content | accessibility | research | manager | mix> <add "— unconfirmed default" if they picked "Not sure yet"> <if manager, see § Manager profile shape below instead of the rest of this block>
- Squad assignment: <unset — deferred, see SKILL.md § Deferred and opt-in fields — N/A for manager, see Reports instead>
- Primary platform: <unset — deferred>
- Interaction style: <unset — deferred; falls back to ORCHESTRATOR.md §3's standing-preference log>
- Experience level: <unset — deferred; defaults to "new" explanation depth until told otherwise>
- MCP tools: <comma-separated ids from Step 0b, or none>
- Work tools: docs=<confluence|notion|google-docs|none>, tracker=<jira|linear|github|none>, roadmap=<jira-product-discovery|linear|notion|github|none>, chat=<slack|teams|none>

## Active work (auto — from the tracker at last workload snapshot)

Snapshot: <YYYY-MM-DD>
- <KEY> <summary> (<status>) — top tickets from their queue, max 5
- …

## Notes

<anything else the designer volunteers unprompted — free text, append-only>
```

**If Step 1c found a clean match** (silent squad resolve — no question
asked, no opt-in needed), the profile looks like this instead — squad
assignment is real, everything else is still deferred:

```markdown
- Name: Priya Nair
- Role focus: product
- Squad assignment:
  - Mode: dedicated
  - Domains: Store Growth
  - Squads: Onboarding
  - Primary squad: Onboarding
- Primary platform: <unset — deferred>
- Interaction style: <unset — deferred>
- Experience level: <unset — deferred>
```

If the designer **opted in** to full setup at onboarding, the profile
looks like the pre-rewrite version instead — fill in real values, not
placeholders:

```markdown
- Name: <e.g. Daniel Okafor>
- Role focus: <product | content | accessibility | research | mix>
- Squad assignment:
  - Mode: <embedded | dedicated>
  - Domains: <from Step 2a — e.g. Core Product, Finance>
  - Squads: <from Step 2b — e.g. Counter, Wallet>
  - Primary squad: <from Step 2c if 2+ squads; else the single squad>
- Primary platform: <iOS | Android | Web | all>
- Interaction style: <always-show-plan | just-do-it-for-simple-asks>
- Experience level: <new | experienced>
```

### `Squad assignment.Mode` values

| Mode | When to set | How downstream skills use it |
|---|---|---|
| `embedded` | Role focus is **content**, or **mix** with content work | Weight **all** listed squads equally for copy/vocabulary context; use `Primary squad` only to break ties on ambiguous research routing |
| `dedicated` | **product**, or single-squad **research** / **accessibility** | `Primary squad` is the main roadmap filter; other squads in the list (if any) are secondary |

### Manager profile shape (role focus = Manager)

Squad assignment doesn't apply — a manager oversees people, not a squad
scope. Write `Reports:` instead, filled from Step 1b:

```markdown
- Name: <e.g. Hana Lindqvist Moreau>
- Role focus: manager
- Squad assignment: N/A — manager role, see Reports
- Reports: <Name A>, <Name B>, <Name C>, …
- Primary platform: <unset — deferred, same as ICs>
- Interaction style: <unset — deferred, same as ICs>
- Experience level: <unset — deferred, same as ICs>
```

If Step 1b's "no match" branch was used and the manager said "skip for
now," write `Reports: <unset — deferred, say "update my profile" to add
your team>` instead of a fabricated or guessed list. `workload-agent`
manager mode and `manager-1on1-prep` both check for this and say so
plainly rather than silently returning nothing.

If the designer opts out of onboarding entirely, write:

```markdown
# Designer profile

Status: SKIPPED
Created: <YYYY-MM-DD>

Designer opted out of onboarding questions. Do not ask again — treat all
values as unknown/default (ask per-task as normal, per harness/ORCHESTRATOR.md §1).
```

---

## Editing later

If the designer says something like "update my profile" or "I'm now
embedded in Payments too", update the relevant field in place, bump
`Last updated`, and confirm in one line. Re-run Step 2 squad logic if role
focus changes to or from **content**.

**Filling in a deferred field is the same "edit in place" action** — the
first time platform, interaction style, experience level, or squad get
answered (whether because a downstream skill asked once in context, or
the designer volunteered it), write the real value over the `<unset —
deferred>` placeholder and bump `Last updated`. This is what makes the
"asked at most once, ever" guarantee in `SKILL.md` actually hold.

**Active work (auto) goes stale** — refresh via workload-agent on vague
follow-ups if the list is weeks old.

**Squad assignment changes** when people rotate — more common for content
than product. If `research-agent` surfaces work on a squad not in the
profile, mention it once: "Want to add Payments to your squad list?"

**"Not sure yet" role focus** is a default, not a real answer — if a later
turn makes the real role focus clear (e.g. they mention managing several
squads' output), update the field and drop the "unconfirmed default" flag
rather than leaving it silently stale.

**Correcting a silent squad resolve (Step 1c)** is the same "update my
profile" path as any other field — if a designer says "that's not my
squad" or "I moved teams," edit `Squad assignment:` directly. Don't
re-run Step 1c to "double check" on every edit — once corrected, the
designer's stated answer always wins over the directory lookup.

**`Reports:` changes** when a manager's team changes (reorg, new hire,
someone rotates off). Same "update my profile" path — re-search
`COMPANY-SQUADS.md` § Design leadership for a refreshed pre-fill if
their domains changed too, otherwise just edit the list directly. If role
focus changes **to** `manager` from an IC value after onboarding already
happened, run Step 1b fresh rather than leaving `Reports:` unset forever.
