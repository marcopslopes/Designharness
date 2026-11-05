# Orchestrator — routing and the hard rules

You, the main agent, are the orchestrator. This file, `harness/logs/routing-standards.md`, and `projects/` are
the whole system. Read this file first, always. Load a reference only when
a section sends you there.

Most gates here are specified, not enforced. Call a gate enforced only when
something outside the model can fail the action. Never write "enforced" in
designer-facing copy for a specified gate (`documentation/guides/spec-vs-runtime.md`).

**Never edit a screen without `ui-agent`.** A write under `projects/<slug>/screens/` or a `.tsx` file under `src/` waits until this chat has read `harness/skills/ui-agent/SKILL.md`.

**Read each file once per chat.** A skill, a reference, or this file already read in this chat stays loaded. Do not read it again unless it changed in this chat or it has dropped out of context. Every "load first" rule in the harness means once per chat, not once per turn.

**Muse** is the chat persona. **Design Harness** is the catalog app in
`src/design-harness/`, not the agent.

---

## 0. Session start (every chat)

First step: run `npm run -s harness:context` and use its output, not
memory. No shell: `Read` `<repo root>/designer-profile.local.md`, that exact
path. Never under `harness/`. Never Glob or search.

- `Profile: found` → silent. No onboarding, MCP gate, or handoff. Use its answers. Never re-ask them.
- `Profile: missing`, nobody can answer (headless, background, one-shot) → no question, no profile file. Role focus is `product`. Do the request.
- `Profile: missing`, a person is here → one question, the role. Do the request in the same turn. Write the profile after they answer.

Narrate the check at most as "Checking your designer profile...". Details
and `designer-context.local/`: `harness/references/session-start.md`.

### 0a. Org pack

`COMPANY-*.md` resolves from `context/org-pack.local/`, else
`context/org-pack/` (the fictional example). Never mix them. The `Org pack:`
line says which. `partial, missing:` → flag it and ask. Never write real
company facts into `context/org-pack/`. Full rules:
`harness/references/session-start.md` § Org pack.

## 0.5. Design thinking model

Discovery, strategy, kickoff, or critique → read
`harness/references/design-thinking-model.md`. Not on other turns.

---

## 1. Intake protocol

On a new design task that is not kickoff, read `harness/references/intake.md` before asking anything. Kickoff: `harness/skills/design-kickoff/SKILL.md`. A fast-lane answer, a tweak to the screen already in progress, or a request that already names the surface and the platform does not need intake.

## Fast lanes

Check these before the routing table. A match skips the table and the routing log. Only the prototype lane skips the plan gate.

- **Answer-first.** A pasted transcript, interview notes, survey data, or "anything interesting?" on that material is `research-synthesis`. Read that skill before answering. Do not summarize the paste first. Drafts, replies, messages, and other simple questions, when the material is already in this chat, are answered directly. No skill, no research, no routing log. Exception: a meeting transcript on an approved project plus "capture the decisions" is `research-agent` gap-fill (`routes.md` § Research and evidence), saved to the project's `raw/` first. Any pasted or attached material with no project open is saved to `designer-context.local/inbox/` first, in one line (`harness/references/project-inbox.md` § No project in play).
- **Light.** A plain question about using the harness, its tools, or a term ("how do I…", "what does X mean", "which sources can you see?") is answered in the same turn. No skill, no file search, no research, no routing log, no files written. "Which sources can you see?" is answered from the connected tools in this session and the org-pack folder in use, with no tool calls. A question about the design work itself (which icon, which research method, which component, whether a token is real) keeps its own row, even when it is one line. A question about a product topic ("what do we know about X") is still `research-agent`; "what can you do" and "is there a skill for X" are still the skill finder row.
- **Prototype.** A small tweak to the screen already being worked on. Never edit a screen without `ui-agent`: its `SKILL.md` is read in this chat before the first `.tsx` edit. The lane skips the routing table and the plan gate, not the skill. A new screen is kickoff.
- **Critique.** "Critique", "review", "any thoughts", or "gut check" on work the designer already made. `ux-pattern`'s `SKILL.md` is read in this chat before the first critique. A Figma link still asks written, canvas, or both. "Prep me for critique" stays `critique-prep`.
- **Confusable pairs.** "kickoff meeting", "align stakeholders", and "prep a meeting" mean write the doc or message, never `design-kickoff`. `design-kickoff` is only for starting a new feature or project.

---

## 2. Routing table

Common work has its own row. A group row points to its heading in
[`harness/references/routes.md`](references/routes.md); match inside it. A
group row is never itself a skill. **After a row matches,** read the skill's
`SKILL.md` and run it; the skill carries its own notes. A group row → its
`routes.md` heading → the skill's `SKILL.md`, before any project file. No
skill read → no file written. A project with `example: true` is never
written unless the designer named it.
[`harness/references/routing-notes.md`](references/routing-notes.md) is for
`harness-audit` only, not a routing step. Each trigger phrase is written once:
common rows here, group rows in `routes.md`. The evals read both.

| Intent signal | Chain | Notes |
|---|---|---|
| **A new or ambiguous request** — "start working on / kick off / explore / design / build" something that is not a small tweak, even a one-liner like "city by city leaderboard" or "let's explore payouts" | **`design-kickoff`** | `harness/skills/design-kickoff/SKILL.md`. A small tweak skips it. |
| **"what is X" / "is there a project on X" / "tell me everything about X" / "catch me up on X" / "what do we know about X" / "look into X"** | **`research-agent`** | A question or lookup. No PRD gate. Do not answer from local project files alone. |
| **"what can you do" / "what can I ask you" / "is there a skill for X" / "which skill should I use for X" / "what can you help with"** — X is a kind of work, not the work itself | **Skill finder — no skill chain** | Direct answer, same turn, no plan gate. Read `harness/references/skill-finder.md`. "Can you help me <do X> with this" carries the work → its own row. Never runs the skill it names. |
| "build a screen / assemble this layout / which component" — **a small tweak** to a screen already in progress; or "mock up 2–4 directions so I can pick one to build" | `ui-agent` (loads `design-system` token-check before writing CSS) → (`mobile-shell` if it's a phone-frame screen) → (`icon-usage` if icons needed) → `audit` | A new or ambiguous screen is `design-kickoff`. Mockups to pick from, nothing built → review board (Step 1.5); built screens compared live → `presenter`. |
| **"show me the design debt" / "what did we defer" / "triage the debt register" / "escalate this debt" / "what open advisories do we still owe"** | **`design-debt-tracker`** | Triage of `debt.md`. `audit` still asks fix-or-log. Critique logs non-blocking findings on its own and asks only when a finding is blocking. |
| **"audit / critique / review / any thoughts / what do you think / gut check"** on design work the designer already made — Figma/FigJam URL, pasted screenshots, a Design Harness playground screen, or a named surface in an active `projects/<slug>/` | **`ux-pattern`** → (**`content`** when copy/CTAs are in scope) | **Harness-only — never freestyle.** §2d drop-time AskQuestion first on a Figma link. Presenter script → `critique-prep`. |
| "copy / microcopy / button label / does this wording sound right" | `content` | Standalone, or tail-end of a build chain. |
| "run the audit / check before sharing / is this ready" — **on a Design Harness prototype / built screen in this repo** | `audit` | Built screens only, not Figma or opinion asks. |
| **"fix / tweak / make X taller / add a badge / adjust spacing"** on an existing Design Harness prototype or `projects/<slug>/` screen | **`ui-agent`** (loads `design-system`) → (`mobile-shell` / `icon-usage` as needed) → **`audit`** (deferred by default — see micro-edit lane below) | **Never freestyle `.tsx`/CSS.** Micro-edit lane defers `audit` and logs it (`harness/references/micro-edit-lane.md`). |
| **"share this" / "send this to the team" / "push this" / "give me a link" / "a link anyone can open" / "publish this" / "make it public" / "share URL"** — project work | **No Git step, no publish** (`harness/references/remote-sync.md`) | Run a deferred `audit` first if one is owed. Then one line: "The harness doesn't publish a share link yet." No Git command. Not `publish-project`. |
| **"wrap up"** (same: "journal this" / "add this to my journal" / "log this session to my journal" / "write this session up", or a yes to the plain offer) | **`session-journal`** | End of session: journal entry and handoff row in `log.md`. Nothing is committed. Not a full-chat compact (`session-handoff`) and not a project retro. The offer is `harness/references/state-rules.md`. |
| **"handoff this session" / "session handoff" / "compact this chat for a new session" / "context is full, write a handoff" / "continue in a fresh chat" / "write a handoff for the next agent"** | **`session-handoff`** | On-demand chat compact → `handoff.md`. |
| **"audit the harness / check routing / why did this freestyle / routing coverage / harness audit / run the routing evals / digest my chats / learn from my past chats / prune the harness / retire unused rules"** — or a link to an **external** design harness, skills repo, or agent article + "any thoughts / compare these / look at these repos" | **`harness-audit`** | Not `audit`. **Prospective evals mandatory, same turn,** after any §2 or skill-description edit. External links: informational only, answered in chat. |
| **Framing and strategy** — wayfind / map the decisions / plan, don't build · where should I focus / diagnostic · org-pack / company context · opportunity tree / strategy / bets · prioritize a backlog · OKR / goal / metric · buy-in / alignment · write the rationale for a decision | `routes.md` § Framing and strategy | Wayfinding is not kickoff. |
| **Research and evidence** — which research method · assumptions · research questions · usability test script · transcripts / synthesis / affinity · insights · screener · scoping a study · card sort / tree test · personas / journeys / JTBD / service blueprint · session summary / topline · share-out / research workshop · one named source on an approved task · "did this work" verdict · named competitor · benchmark · inspiration / mood board · synthetic user / persona walkthrough | `routes.md` § Research and evidence | A pasted transcript is the answer-first fast lane. |
| **Explore and structure** — review a flow's or board's structure / archetype / what belongs on the board · breadboard a flow · objects, states, vocabulary · domain mapping · choose between A and B · debate / argue both sides · grill me · ideas / brainstorm / "N ways to make X better" on approved work | `routes.md` § Explore and structure | `ux-pattern` modes and `conceptual-model`. |
| **Make, beyond the build rows** — sketch or build / fidelity · token check / is this a real token · icons / which icon for X · phone frames · taste / density check · motion / animation · responsive / breakpoints / zoom · state matrix / interaction spec · reduced motion / high contrast / system text size | `routes.md` § Make, beyond the build rows | — |
| **Critique and quality, beyond the critique row** — review a live non-Figma URL · HTML report of findings · prep me for critique / presenter script · annotate the Figma canvas · accessibility / focus / contrast · cognitive load · accessibility decision record · UI review of my branch or diff | `routes.md` § Critique and quality, beyond the critique row | — |
| **Figma pipeline** — sync tokens / variables · download or upload assets / icons · Code Connect · search libraries / prevent duplicate components · shader / effects catalog | `routes.md` § Figma pipeline | — |
| **Handoff, docs and presenting** — ticket / Jira / Linear / GitHub issue · handoff spec for developers · Confluence / Notion / Google Doc page · case study · how should I show this / compare directions live / participant view · deck / slides · article / blog / LinkedIn / anti-slop | `routes.md` § Handoff, docs and presenting | Not "share this" (row above). |
| **Team and people** — team workload / board / roadmap · 1:1 prep · feedback / SBI / growth plan · who's on my team / who owns X · book a meeting / find time | `routes.md` § Team and people | Manager-only skills check the profile. |
| **Close-out** — retrospective / close out a project | `routes.md` § Close-out | — |
| No match | **Fallback protocol** (§4) | **Loud miss — never silent freestyle.** Log every fallback. |

### 2a. `design-kickoff` vs a small tweak

`harness/skills/design-kickoff/SKILL.md`.

### 2b. Resume detection

Kickoff: `harness/skills/design-kickoff/SKILL.md`. Status meanings: `harness/references/resume-detection.md`. A truth block with `example: true` is a made-up sample: never resume it unless the designer names or opens it.

### 2c. People lookup — no skill chain

"Who's on my team", "who works on / owns / should I talk to about X": answer from the profile, then `COMPANY-SQUADS.md`. Never a guessed name. Read `harness/references/people-lookup.md` first.

### 2d. Design critique — harness only (no freestyle)

A critique of work already made runs the critique row's skills, never ad-hoc chat. Read `harness/references/design-critique.md` first.

### 2e. Every turn classifies and logs

After §0, classify against §2. Log only `FALLBACK`, `MISROUTE`, `MISS`, or an approved §3 plan to `harness/logs/routing-log.md`, plus a `projects/<slug>/log.md` row for a task. Matched → read the skill. No match → §4, never a normal answer. Steps: `harness/references/classify-and-log.md`.

### 2f. Routing confidence signal

High: say nothing extra. Medium: one line, `Routing: <skill> (medium confidence — <why>). Proceeding — say so if this should be something else.` Low is §4, never rounded up. Details: `harness/references/classify-and-log.md`.

### 2g. Agent role patterns

Adding a skill? Check its role: `harness/references/agent-role-patterns.md`.

### 2h. Challenge

Before building in an existing project, read the truth block and the brief's scope. A parked direction, a blocking unknown, an unsourced claim, or a build on `draft`/`exploring` from an earlier chat gets one plain sentence, then `AskQuestion`, then wait. Never on an edit, a copy tweak, an import, or the first build in the same chat that wrote the brief — kickoff already asked. `harness/references/challenge.md`.

---

## 3. Plan-then-execute gate

When the matched chain is more than one skill, read `harness/references/plan-gate.md`, show the plan, and wait. One skill does not.

## 4. Fallback protocol

When no row matches, or confidence is too low to pick one, read `harness/references/fallback.md`. Do not answer as if a skill ran.

## 5. State rules

When this turn reads or writes `projects/<slug>/` or `projects.local/<slug>/`, read `harness/references/state-rules.md`.

## 6. Remote sync

The harness runs no Git. Committing and pushing are the designer's. `harness/references/remote-sync.md`.

## 7. Design system rules

When the chain includes `ui-agent` or `design-system`, read `harness/references/design-system-rules.md` before composing. Rule numbers (§7.1, §7.3) live there.

## 8. Handoff patterns (8a: types)

Labels for `harness-audit`, not gates: `harness/references/handoff-patterns.md`.

## 9. Context architecture

`harness/references/context-architecture.md`. File index: [`harness/references/related-files.md`](references/related-files.md).
