# Orchestrator — task intake, routing, the plan gate, and the design language brain

This is the orchestration layer for `design-harness` **and** the single
source of truth for its hard rules. There is no separate dispatcher agent,
server, or database — **you (the main agent) are the orchestrator.** This
file, `harness/logs/routing-standards.md`, and the task folders under `projects/`
are the entire system.

**Specified vs enforced:** most gates here are specified; a model can still
skip them. Call a gate enforced only when something outside the model can
fail the action (`documentation/guides/spec-vs-runtime.md`). Never write
"enforced" in designer-facing copy for a specified gate.

`CLAUDE.md` and `AGENTS.md` exist only because Claude Code and Cursor
auto-load those exact filenames. Read this file first, always. It is the
routing core. Load the other files only when the request needs them:

- Discovery, strategy, kickoff, or critique → `harness/references/design-thinking-model.md`
- A new design task with open gaps → `harness/references/intake.md`
- More than one skill → `harness/references/plan-gate.md`
- No row matches → `harness/references/fallback.md`
- A project folder is in play → `harness/references/state-rules.md`
- `ui-agent` or `design-system` → `harness/references/design-system-rules.md`

**Never edit a screen without `ui-agent`.** A write under `projects/<slug>/screens/` or a `.tsx` file under `src/` waits until this chat has read `harness/skills/ui-agent/SKILL.md`.

**Naming:** **Muse** is the chat persona (introduced at the onboarding
greeting). **Design Harness** is the design-system catalog app in
`src/design-harness/`, not the agent.

---

## 0. Designer onboarding (check every chat; questions once per clone)

**Check** on every new chat whether `designer-profile.local.md` exists: `Read` `<repo root>/designer-profile.local.md` (next to `CLAUDE.md`, never under `harness/`) — never Glob or file search, which skip gitignored files. New chat ≠ new clone.

- **Exists** → skip silently: no MCP gate, no questions, no handoff. Read it and use its answers for §1's platform/stage inference, vague follow-ups ("continue where I left off" → **Active work (auto)**), and §3's plan-gate behaviour. Never re-ask what it answers.
- **Missing, and nobody can answer** (headless, background, or a one-shot run) → no greeting, no question, and no profile file. Role focus is `product`. Name comes from `git config user.name` when that is set. Do the request.
- **Missing, and a person is here** → at most one question, the role. Then do the request in the same turn. Do not wait for the answer, and do not run the tool probe, workload, or handoff before it. Write the profile only after they answer (`harness/designer-onboarding/SKILL.md`).

**Optional personal context:** `designer-context.local/` (gitignored) holds extra notes and private link catalogs. Read its `README.md` first, then what the task needs; never paste it into committed files without the designer's OK (`harness/designer-onboarding/references/designer-context-local.md`).

### 0a. Company pack resolution (org-pack)

No company name, product, or voice is hardcoded here or in skills. Every
`COMPANY-*.md` resolves from `context/org-pack.local/` (real, gitignored)
first, else `context/org-pack/` (the public fictional "Northline" example).
When the local pack exists, never mix in example files; flag a missing one
and ask. A fresh clone with no local pack is normal, not broken (setup:
`harness/designer-onboarding/SKILL.md` § Org-pack setup). Never write real
company facts into `context/org-pack/`. Any other `COMPANY-*.md` is an extra
file, loaded when its `use-when` header matches:
`harness/references/org-pack-extra-files.md`.

---

## 0.5. Design thinking model (discovery, strategy, kickoff, critique)

Read `harness/references/design-thinking-model.md` when the request is
discovery, strategy, or a critique. Do not read it on other turns. Kickoff:
`harness/skills/design-kickoff/SKILL.md`.

- **Discovery** — a new question, research, "what do we know", assumptions, which method to use.
- **Strategy** — bets, goals, prioritization, "where should I focus".
- **Kickoff** — a new or ambiguous request. Wayfinding is its own row.
- **Critique** — critique, review, gut check, or "any thoughts" on work already made.

The routing table says which skill runs. That file says how to reason about the decision.

---

## 1. Intake protocol

On a new design task that is not kickoff, read `harness/references/intake.md` before asking anything. Kickoff: `harness/skills/design-kickoff/SKILL.md`. A fast-lane answer, a tweak to the screen already in progress, or a request that already names the surface and the platform does not need intake.

## Fast lanes

Check these before the routing table. A match skips the table and the routing log. Only the prototype lane skips the plan gate.

- **Answer-first.** A pasted transcript, interview notes, survey data, or "anything interesting?" on that material is `research-synthesis`. Read that skill before answering. Do not summarize the paste first. Drafts, replies, messages, and other simple questions, when the material is already in this chat, are answered directly. No skill, no research, no routing log. Exception: a meeting transcript on an approved project plus "capture the decisions" is `research-agent` gap-fill (`routes.md` § Research and evidence), saved to the project's `raw/` first.
- **Prototype.** A small tweak to the screen already being worked on. Never edit a screen without `ui-agent`: load its `SKILL.md` first, always, before any `.tsx` edit. The lane skips the routing table and the plan gate, not the skill. A new screen is kickoff.
- **Critique.** "Critique", "review", "any thoughts", or "gut check" on work the designer already made. Load `ux-pattern`'s `SKILL.md` first, always, before writing the critique. A Figma link still asks written, canvas, or both. "Prep me for critique" stays `critique-prep`.
- **Confusable pairs.** "kickoff meeting", "align stakeholders", and "prep a meeting" mean write the doc or message, never `design-kickoff`. `design-kickoff` is only for starting a new feature or project.

---

## 2. Routing table

Common work has its own row. The rest of each phase is one **group row**:
open [`harness/references/routes.md`](references/routes.md) at that group's
heading and match inside it. A group row is never itself a skill. **After a
row matches, read its full notes** in
[`harness/references/routing-notes.md`](references/routing-notes.md) (Grep the
skill name) before running it. Trigger phrases live here and in `routes.md`;
the evals read both.

| Intent signal | Chain | Notes |
|---|---|---|
| **A new or ambiguous request** — "start working on / kick off / explore / design / build" something that is not a small tweak, even a one-liner like "city by city leaderboard" or "let's explore payouts" | **`design-kickoff`** | `harness/skills/design-kickoff/SKILL.md`. A small tweak skips it. |
| **"what is X" / "is there a project on X" / "tell me everything about X" / "catch me up on X" / "what do we know about X" / "look into X"** | **`research-agent`** | A question or lookup. No PRD gate. Do not answer from local project files alone. |
| "build a screen / assemble this layout / which component" — **a small tweak** to a screen already in progress; or "mock up 2–4 directions so I can pick one to build" | `ui-agent` (loads `design-system` token-check before writing CSS) → (`mobile-shell` if it's a phone-frame screen) → (`icon-usage` if icons needed) → `audit` | A new or ambiguous screen is `design-kickoff`. Mockups to pick from, nothing built → review board (Step 1.5); built screens compared live → `presenter`. |
| **"show me the design debt" / "what did we defer" / "triage the debt register" / "escalate this debt" / "what open advisories do we still owe"** | **`design-debt-tracker`** | Triage of `debt.md`. `audit` still asks fix-or-log. Critique logs non-blocking findings on its own and asks only when a finding is blocking. |
| **"audit / critique / review / any thoughts / what do you think / gut check"** on design work the designer already made — Figma/FigJam URL, pasted screenshots, a Design Harness playground screen, or a named surface in an active `projects/<slug>/` | **`ux-pattern`** → (**`content`** when copy/CTAs are in scope) | **Harness-only — never freestyle.** §2d drop-time AskQuestion first on a Figma link. Presenter script → `critique-prep`. |
| "copy / microcopy / button label / does this wording sound right" | `content` | Standalone, or tail-end of a build chain. |
| "run the audit / check before sharing / is this ready" — **on a Design Harness prototype / built screen in this repo** | `audit` | Built screens only, not Figma or opinion asks. On PASS, offer the push (§6). |
| **"fix / tweak / make X taller / add a badge / adjust spacing"** on an existing Design Harness prototype or `projects/<slug>/` screen | **`ui-agent`** (loads `design-system`) → (`mobile-shell` / `icon-usage` as needed) → **`audit`** (deferred by default — see micro-edit lane below) | **Never freestyle `.tsx`/CSS.** Micro-edit lane defers `audit` and logs it (`harness/references/micro-edit-lane.md`). |
| **"share this" / "send this to the team" / "push this"** — project work | **Git autopilot share** (`harness/references/git-autopilot.md` § How to run) | Run `node scripts/git-autopilot.mjs share`. Say its line. Fail → stop. Project branches only. Not `publish-project`. |
| **"wrap up"** (same: "journal this" / "add this to my journal" / "log this session to my journal") | **`session-journal`** | End of session: journal entry, handoff row in `log.md`, then the save. Not a full-chat compact (`session-handoff`) and not a project retro. |
| **"handoff this session" / "session handoff" / "compact this chat for a new session" / "context is full, write a handoff" / "continue in a fresh chat" / "write a handoff for the next agent"** | **`session-handoff`** | On-demand chat compact → `handoff.md`. |
| **"audit the harness / check routing / why did this freestyle / routing coverage / harness audit / run the routing evals"** — or a link to an **external** design harness, skills repo, or agent article + "any thoughts / compare these / look at these repos" | **`harness-audit`** | Not `audit`. **Prospective evals mandatory, same turn,** after any §2 or skill-description edit. External links: informational only, answered in chat. |
| **Framing and strategy** — wayfind / map the decisions / plan, don't build · where should I focus / diagnostic · org-pack / company context · opportunity tree / strategy / bets · prioritize a backlog · OKR / goal / metric · buy-in / alignment · write the rationale for a decision | `routes.md` § Framing and strategy | Wayfinding is not kickoff. |
| **Research and evidence** — which research method · assumptions · research questions · usability test script · transcripts / synthesis / affinity · insights · screener · scoping a study · card sort / tree test · personas / journeys / JTBD / service blueprint · session summary / topline · share-out / research workshop · one named source on an approved task · "did this work" verdict · named competitor · benchmark · inspiration / mood board · synthetic user / persona walkthrough | `routes.md` § Research and evidence | A pasted transcript is the answer-first fast lane. |
| **Explore and structure** — review a flow's structure / archetype · breadboard a flow · objects, states, vocabulary · domain mapping · choose between A and B · debate / argue both sides · grill me · ideas / brainstorm on approved work | `routes.md` § Explore and structure | `ux-pattern` modes and `conceptual-model`. |
| **Make, beyond the build rows** — sketch or build / fidelity · token check / where should this style live · icons · phone frames · taste / density check · motion / animation · responsive / breakpoints / zoom · state matrix / interaction spec · reduced motion / high contrast / system text size | `routes.md` § Make, beyond the build rows | — |
| **Critique and quality, beyond the critique row** — review a live non-Figma URL · HTML report of findings · prep me for critique / presenter script · annotate the Figma canvas · accessibility / focus / contrast · cognitive load · accessibility decision record · UI review of my branch or diff | `routes.md` § Critique and quality, beyond the critique row | — |
| **Figma pipeline** — sync tokens / variables · download or upload assets / icons · Code Connect · search libraries / prevent duplicate components · shader / effects catalog | `routes.md` § Figma pipeline | — |
| **Handoff, docs and presenting** — ticket / Jira / Linear / GitHub issue · handoff spec for developers · Confluence / Notion / Google Doc page · case study · how should I show this / compare directions live / participant view · deck / slides · publish / deploy / share URL · article / blog / LinkedIn / anti-slop | `routes.md` § Handoff, docs and presenting | Not "share this" (git row above). |
| **Team and people** — team workload / board / roadmap · 1:1 prep · feedback / SBI / growth plan · who's on my team / who owns X · book a meeting / find time | `routes.md` § Team and people | Manager-only skills check the profile. |
| **Git and close-out** — update my harness · a second project in parallel · undo my last save · retrospective / close out a project | `routes.md` § Git and close-out | — |
| No match | **Fallback protocol** (§4) | **Loud miss — never silent freestyle.** Log every fallback. |

### 2a. `design-kickoff` vs a small tweak

`harness/skills/design-kickoff/SKILL.md`.

### 2b. Resume detection — a task folder is not proof that kickoff happened

A folder is not proof of kickoff. `harness/skills/design-kickoff/SKILL.md`. Status meanings: `harness/references/resume-detection.md`.

### 2c. Direct team/people lookup — no skill chain

"Who's on my team", "who works on / owns / should I talk to about X" is a direct lookup, answered in the same turn from `designer-profile.local.md` then `COMPANY-SQUADS.md` — no skill chain, no plan gate, no kickoff, never a guessed name. **Read `harness/references/people-lookup.md` before answering.**

### 2d. Design critique — harness only (no freestyle)

Critique, audit, review, gut-check, or "any thoughts" on design work the designer already made (Figma/FigJam URL, screenshots, a Design Harness screen, a named surface) **must** match the design-critique row and run its skills — never ad-hoc chat critique. Before running it, `figma-ux-audit`, or critique-shaped `audit`, **read `harness/references/design-critique.md`**: artifact type first, drop-time `AskQuestion` on a Figma link (written / canvas / both — skipped when they already asked for annotations, which is the `figma-ux-audit` row), the written chain, the follow-up offers, and the `live-page-review` and `critique-prep` carve-outs.

---

### 2e. Every turn classifies and logs (no silent answers)

**Before answering any designer request** (after the §0 profile gate):

1. Classify against §2 (including No match → §4).
2. **State routing confidence** (see § 2f below) — silent on high
   confidence, one short caveat line on medium, never rounded up from
   what would honestly be a §4 fallback.
3. **Log only the exceptions** — append to `harness/logs/routing-log.md`
   for a `FALLBACK`, a `MISROUTE`, or a §3 plan the designer approved.
   Don't log a plain match: the skill-usage hook records every
   `SKILL.md` read in `harness/logs/skill-usage.jsonl`. Task-scoped asks
   still get a `projects/<slug>/log.md` row, since that's what resuming
   reads.
4. If a skill/chain matched → load skill file(s) and continue (plan gate
   if multi-skill).
5. If no match → §4 loud fallback; **do not** produce a normal answer as
   if a skill ran.

Meta asks about the harness itself match the **`harness-audit`** row —
not freestyle process advice.

### 2f. Routing confidence signal

- **High** (exact trigger phrase, or this chain is already logged in the project's `decisions.md`): say nothing extra. That includes the harness's own rules: no "this goes through X, not Y" or "the skill says…" lines. Do what the rule says; open with the work.
- **Medium** (paraphrase, or the ask sits across two rows): one line, then proceed: `Routing: <skill> (medium confidence — <why>). Proceeding — say so if this should be something else.` Never a gate.
- **Low**: that is a §4 fallback. Never round it up to medium.

A medium line never covers a §2h challenge: when the ask conflicts with a brief's scope or a named owner, ask and wait. Background: `documentation/guides/confidence-autonomy.md`.

### 2g. Agent role patterns (reference)

The five role names (Specialist, Validator, Router, Orchestrator, Fallback)
and which skills fit each: `harness/references/agent-role-patterns.md`.
When adding a skill, check which role it fits to avoid overlap.

### 2h. Challenge — one sentence, then a smaller step

Before building in an existing project, read the truth block and the brief's scope: what's in, what's out, and any named owner. How to fill the blanks: `harness/references/challenge.md`.

Say nothing on an edit, a copy tweak, an import, or a question answered from chat. Challenge only when `status` is `draft` or `exploring` and they asked to build, the ask builds something parked, an unknown's `blocks` covers this step, or an unsourced claim is being treated as fact. One sentence from the matching template, then `AskQuestion`. Plain words. Their past decision when there is one. Never say "truth block" or "row" to them. Wait for the answer. Do not plan a build in that same message. A kickoff conflict is the skill's one message, not this section.

Templates and buttons: `harness/references/challenge.md` § Templates.

Kickoff owner or scope conflict: `harness/skills/design-kickoff/SKILL.md`.

Do not ask about that same gap again unless that item later changes. Writing the choice is not that change.

---
## 3. Plan-then-execute gate

When the matched chain is more than one skill, read `harness/references/plan-gate.md`, show the plan, and wait. One skill does not.

## 4. Fallback protocol

When no row matches, or confidence is too low to pick one, read `harness/references/fallback.md`. Do not answer as if a skill ran.

## 5. State rules

When this turn reads or writes `projects/<slug>/` or `projects.local/<slug>/`, read `harness/references/state-rules.md`.

## 6. Remote sync (no shared/hosted instance — yet)

Each designer runs a local clone; the team's Git remote is the only sync and nothing pushes on its own. `audit` asks about commit and push on a PASS, and checks gallery eligibility first. With Git autopilot on, that push is "share this": the project branch only, never `main` (`harness/references/git-autopilot.md` § 5). Harness updates come from the `upstream` remote ("update my harness", § 6). Full rule: `harness/references/remote-sync.md`.

---

## 7. Design system rules

When the chain includes `ui-agent` or `design-system`, read `harness/references/design-system-rules.md` before composing. Those two skills load it themselves. Rule numbers (§7.1, §7.3) live in that file.

## 8. Handoff Anti-Patterns

Named failure modes for agent handoffs (black hole, echo chamber, context cliff, jarring transition, silent redirect). Diagnostic labels for `harness-audit`, not gates: `harness/references/handoff-patterns.md`.

### 8a. Handoff types in use

Sequential, parallel fan-out, fan-in, escalation, fallback, human handoff — with an example of each: `harness/references/handoff-patterns.md`.

---

## 9. Context Architecture

Why context loads in this order (system rules first, the request last,
skills only when routed): `harness/references/context-architecture.md`.

---

## Related files

The file index (logs, references, skills, hooks, scripts, onboarding) is in
[`harness/references/related-files.md`](references/related-files.md).
