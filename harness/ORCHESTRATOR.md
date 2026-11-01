# Orchestrator — task intake, routing, the plan gate, and the design language brain

This is the orchestration layer for `design-harness` **and** the single
source of truth for its hard rules. There is no separate dispatcher agent,
server, or database — **you (the main agent) are the orchestrator.** This
file, `harness/logs/routing-standards.md`, and the task folders under `projects/`
are the entire system.

**Specified vs mechanical:** this file is the **policy and workflow
spec**. Most gates here (routing, plan gate, PRD approval, “audit
before share”) are *specified* — you must follow them; a model can
still skip them. Call a gate **enforced** only when something outside
the model can fail the action. The inventory — and the only mechanical
set today — is `documentation/guides/spec-vs-runtime.md`. Do not write
“enforced” / “can’t skip” in designer-facing copy for specified gates.

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

**Naming note:** this repo now has two distinct names that are easy to
conflate — **Muse** is the conversational persona a designer talks to in
chat (introduced at the onboarding greeting, `harness/designer-onboarding/
SKILL.md` § The greeting, and used consistently afterward in handoff and
decline/error copy); **Design Harness** is the unrelated design-system catalog
app this repo ships (`src/design-harness/`), a product name, not the agent. Before
this pass, the agent had no name anywhere in this repo's docs — this is
the first and only place it's introduced; if you find a *different* name
or a de-personalized "the agent" in designer-facing copy elsewhere, treat
that as drift from this note, not an alternate source of truth.

---

## 0. Designer onboarding (check every chat; questions once per clone)

**Check** on every new chat whether `designer-profile.local.md` exists: `Read` `<repo root>/designer-profile.local.md` (next to `CLAUDE.md`, never under `harness/`) — never Glob or file search, which skip gitignored files. New chat ≠ new clone.

- **Exists** → skip silently: no MCP gate, no questions, no handoff. Read it and use its answers for §1's platform/stage inference, vague follow-ups ("continue where I left off" → **Active work (auto)**), and §3's plan-gate behaviour. Never re-ask what it answers.
- **Missing, and nobody can answer** (headless, background, or a one-shot run) → no greeting, no question, and no profile file. Role focus is `product`. Name comes from `git config user.name` when that is set. Do the request.
- **Missing, and a person is here** → at most one question, the role. Then do the request in the same turn. Do not wait for the answer, and do not run the tool probe, workload, or handoff before it. Write the profile only after they answer (`harness/designer-onboarding/SKILL.md`).

**Optional personal context:** `designer-context.local/` (gitignored) holds extra notes and private link catalogs. Read its `README.md` first, then what the task needs; never paste it into committed files without the designer's OK (`harness/designer-onboarding/references/designer-context-local.md`).

### 0a. Company pack resolution (org-pack)

This repo ships **generic and portable**: no company name, product, or
voice is hardcoded in the orchestrator or skills. Every reference to
`COMPANY-BUSINESS.md`, `COMPANY-VOICE.md`, `COMPANY-ARCHETYPES.md`,
`COMPANY-PATTERNS.md`, `COMPANY-SQUADS.md`, `COMPANY-SOURCES.md`,
`COMPANY-VOCABULARY.md`, or `COMPANY-STYLE-GUIDE.md` resolves the same
way, checked in this order:

1. `context/org-pack.local/COMPANY-*.md` — your real company content.
   Gitignored (`*.local` rule) — created once per clone, never pushed.
2. `context/org-pack/COMPANY-*.md` — the public, fictional "Northline"
   example pack shipped with the harness. Used only if step 1 doesn't
   exist yet (fresh clone, no setup run).

**On a fresh clone** (no `context/org-pack.local/` yet), designer
onboarding (`harness/designer-onboarding/SKILL.md` § Org-pack setup)
offers a short one-time interview to scaffold your real pack from step
1's example shape. Skipping it is fine — the harness stays fully
functional against the public example the whole time; skills will just
be reasoning about a fictional company until you plug in your own.

**Never** paste real company facts directly into `context/org-pack/` —
that folder is public. Real content only ever goes in
`context/org-pack.local/`.

**Extra files (2026-10-10).** Any other `COMPANY-*.md` in the resolved
pack folder is an extra file. It starts with an `about:` / `use-when:`
header; when a skill loads company context it reads the headers and pulls
in every extra file whose `use-when` matches the skill or the task topic.
Headerless extras are flagged once, not guessed at. Contract and the three
ways to add one: `harness/references/org-pack-extra-files.md`.

---

## 0.5. Design thinking model (discovery, strategy, kickoff, critique)

Read `harness/references/design-thinking-model.md` when the request is
discovery, strategy, a kickoff, or a critique. Do not read it on other turns.

- **Discovery** — a new question, research, "what do we know", assumptions, which method to use.
- **Strategy** — bets, goals, prioritization, "where should I focus".
- **Kickoff** — a new product bet, or wayfinding.
- **Critique** — critique, review, gut check, or "any thoughts" on work already made.

The routing table says which skill runs. That file says how to reason about the decision.

---

## 1. Intake protocol

On a new design task, read `harness/references/intake.md` before asking anything. A fast-lane answer, a tweak to the screen already in progress, or a request that already names the surface and the platform does not need it.

## Fast lanes

Check these before the routing table. A match skips the table and the routing log. Only the prototype lane skips the plan gate.

- **Answer-first.** A pasted transcript, interview notes, survey data, or "anything interesting?" on that material is `research-synthesis`. Read that skill before answering. Do not summarize the paste first. Drafts, replies, messages, and other simple questions, when the material is already in this chat, are answered directly. No skill, no research, no routing log.
- **Prototype.** A change to the screen already being worked on, not a new screen. Never edit a screen without `ui-agent`: load its `SKILL.md` first, always, before any `.tsx` edit. The lane skips the routing table and the plan gate, not the skill. Adding a screen stays on the routing table and stops at the plan gate.
- **Critique.** "Critique", "review", "any thoughts", or "gut check" on work already made. Load `ux-pattern`'s `SKILL.md` first, always, before writing the critique. A Figma link still asks written, canvas, or both. "Prep me for critique" stays `critique-prep`.
- **Confusable pairs.** "kickoff meeting", "align stakeholders", and "prep a meeting" mean write the doc or message, never `design-kickoff`. `design-kickoff` is only for starting a new feature or project.

---

## 2. Routing table

Each row is the short form. **After a row matches, read its full notes** in
[`harness/references/routing-notes.md`](references/routing-notes.md) (Grep the
skill name) before running it — boundaries, modes, and the history behind
each rule live there. Trigger phrases stay here; the evals read this table.

| Intent signal | Chain | Notes |
|---|---|---|
| **A new product bet** — "start working on / kick off / explore / design / build" a feature that does not exist yet, even a one-liner like "city by city leaderboard" or "let's explore payouts" | **`design-kickoff`** (which internally runs `workload-agent` + `research-agent` in Step 1 → PRD → human gate → then routes onward) | Front door for a new bet only. A question, lookup, iteration, critique, copy edit, or import never reaches Step 3. Explicit wayfinding phrases go to the next row. §2a. |
| **"what is X" / "is there a project on X" / "tell me everything about X" / "catch me up on X" / "what do we know about X" / "look into X"** | **`research-agent`** | A question or lookup. No PRD gate. Do not answer from local project files alone. |
| **"wayfind this" / "map the decisions" / "this is too big for one session" / "plan, don't build" / "the way isn't clear yet"** | **`design-kickoff`** (wayfinding mode) | Decision map in `decisions.md`; no PRD, no build until the way is clear. |
| **"where should I focus / what's the most important thing / where do I start / diagnostic / what's the bottleneck / which layer is weak / where are the gaps"** — triage across any situation (new, stuck, redesign, checking foundations) | **`diagnostic`** | Rates each design layer and names the bottleneck; recommends the next skill. |
| **"build org-pack" / "map our domain" / "extract company context" / "build vocabulary" / "refresh company context" / "update org-pack" / "add this to the company pack" / "the harness should know this doc"** — setup/maintenance of company knowledge foundation | **`org-pack-builder`** | Builds or extends `context/org-pack.local/`; "add this…" + one doc → § Add a file. |
| "build a screen / assemble this layout / which component" — **iterating** (prototype already in repo, **or** `projects/<slug>/brief.md` already has an approved PRD/gate-approval logged in `decisions.md`, **or** designer explicitly opts out of kickoff) | `ui-agent` (loads `design-system` token-check before writing CSS) → (`mobile-shell` if it's a phone-frame screen) → (`icon-usage` if icons needed) → `audit` | Repo + task folder are the source of truth — no `design-kickoff` re-trigger. |
| **"should I sketch this or build it" / "do I need a real prototype for this yet" / "what fidelity should I use for X" / "is this worth building in Design Harness or just talking through"** | **`ui-agent`** (fidelity check, Step 0.5) | Recommends talk-through, sketch, or prototype; never a gate. |
| "check this token / where should this style live / is this a real Foundations token / design-system skill" | **`design-system`** | Token check + three-layer rule; not a replacement for `audit`. |
| "add an icon / which icon library" (standalone) | `icon-usage` | Usually rides inside a `ui-agent` chain. |
| "align the phone frames / why do the prototypes look different / does this match navigation-profile's frame" | `mobile-shell` | Phone-frame consistency, or inside a `ui-agent` chain. |
| "structure this flow / does this match how the company works / which archetype" (reviewing a flow that already exists) | `ux-pattern` | Structure review, no build step. |
| **"breadboard this flow / map the interaction structure for X / where does this go / text-based flow before we design it / settle the places and affordances"** — flow doesn't exist yet, or is being restructured | **`ux-pattern`** (breadboard mode) | Drafts a new flow as text (`breadboard.md`); the row above reviews an existing one. |
| **"define the objects / map relationships / what states can this be in / object model / ubiquitous language / what does this thing mean / is this one thing or two things / how do these connect"** — between kickoff and screens | **`conceptual-model`** | Objects, relationships, states, vocabulary — after kickoff, before screens. |
| **"map this domain / what concepts exist in this domain / terminology audit / how does the domain talk about this before our product / domain event storming / bounded context for X"** — the real world's vocabulary, before any product decision | **`conceptual-model`** (domain-mapping mode) | Real-world vocabulary before product decisions; record contradictions, don't resolve them. |
| **"help me choose between [A] and [B]" / "which direction should we go" / "how do I decide between these options" / "is this choice defensible"** — options already exist (sketched/built/described) | **`ux-pattern`** (decision framework mode) | Weighs existing options on explicit criteria; logs to `decisions.md`. |
| **"debate this" / "argue both sides" / "advocate for each option" / "cross-examine these directions" / "I want productive conflict on this decision"** — options already exist or can be stated crisply | **`ux-pattern`** (debate mode) | Advocate briefs per option, then the designer picks. |
| **"grill me" / "question this plan until we agree" / "walk every branch" / "stress-test this plan with questions"** — a plan or design already exists | **`ux-pattern`** (grill mode) | One question at a time until the designer confirms a restatement. |
| **"show me the design debt" / "what did we defer" / "triage the debt register" / "escalate this debt" / "what open advisories do we still owe"** | **`design-debt-tracker`** | Triage of `debt.md`. `audit` still asks fix-or-log. Critique logs non-blocking findings on its own and asks only when a finding is blocking. |
| **"taste check this" / "is this heading in the right direction visually" / "mid-build visual check" / "does this density feel right" / "is this a persuade or an operate surface" / "scale the ambition to the surface" / "should this be quieter"** | **`taste-feedback`** | Names the surface first; stays inside Foundations tokens. |
| **"motion spec for X" / "animate this transition" / "prototype this micro-interaction" / "reduced motion for this" / "choreograph the loading state" / "review these animations" / "what could be animated here" / "find motion opportunities" / "make this feel more alive" / "audit the motion" / "improve the animations" / "what's it called when [motion feel]" / "animation vocabulary" / "list the motions" / "what motions do we have" / "scan this for motion" / "scan the project for motion" / "apply the sheet motion" / "apply the menu" / "apply the pill" / "add the right motion here" / "does the system already animate this" / "custom motion only if the platform doesn't"** | **`motion-choreography`** | Spec / review / opportunities / audit→plan / vocabulary / list / scan / apply; reduced motion mandatory. |
| **"synthetic user test" / "walk through this as [persona]" / "persona walkthrough" / "stress-test this flow as a busy provider"** | **`synthetic-user-testing`** | Advisory only; never claims validation. |
| **"design retrospective" / "retro this project" / "what did we learn from [slug]" / "reflect on this launch" / "close out this project"** | **`design-retrospective`** | Reflection from task-folder evidence; never auto-steers next work. |
| **"show me inspiration for X" / "mood board for this" / "aesthetic references" / "what could this feel like" / "cross-domain inspiration"** | **`inspiration-scouting`** | Take/leave references; not `competitor-scan` or `benchmark`. |
| **"review this live page" / "review this local URL" / "review localhost" / "click through this flow on this URL" / "capture this page and review it"** — a fetchable `http(s)` URL that is **not** figma.com | **`live-page-review`** | Non-Figma URL: capture, classify, hand off. Never Playwright MCP. |
| **"audit / critique / review / any thoughts / what do you think / gut check"** on design work the designer already made — Figma/FigJam URL, pasted screenshots, a Design Harness playground screen, or a named surface in an active `projects/<slug>/` | **`ux-pattern`** → (**`content`** when copy/CTAs are in scope) | **Harness-only — never freestyle.** §2d drop-time AskQuestion first on a Figma link. Presenter script → `critique-prep`. |
| **"turn this critique into a report" / "HTML report of this review" / "proper report of these findings" / "write this up as a review report"** | **`review-report`** | HTML report from existing `findings.md`; never invents findings; never auto-run. |
| **"prep me for critique" / "critique presenter script" / "help me present this in UX review" / "frame this for design critique" / "walkthrough script for critique"** + Figma or a named frame set | **`critique-prep`** | Presenter script; never critiques the work. Ambiguous → AskQuestion. |
| **"annotate this Figma / add annotations to this Figma / audit with notes on the canvas / put feedback on the canvas / Figma canvas annotations"** | **`figma-ux-audit`** | Canvas annotation cards; never auto-run; plan then confirm. |
| **"sync tokens from Figma / update tokens.css from Figma / check token drift / Figma variables to CSS / tokens out of sync / update Figma variables from code"** | **`figma-token-sync`** | Figma variables ↔ `tokens.css` drift and sync. |
| **"download assets from Figma / export icons from Figma / sync Figma assets / upload assets to Figma / generate icon bundle / update design assets"** | **`figma-asset-sync`** | Figma asset download/upload pipeline. |
| **"map Figma components to code / Code Connect setup / link design system to Figma / connect components / bulk Code Connect mapping"** | **`figma-code-sync`** | Code Connect mapping. |
| **"search Figma design system / find [component] in libraries / what libraries do we have / check before creating component / prevent duplicate components / library audit"** | **`figma-library-manager`** | Search libraries before creating a component. |
| **"document custom effects / what shader effects do we have / catalog Figma shaders / custom fill documentation / effects library audit"** | **`figma-effects-catalog`** | Catalog shader effects and fills. |
| **"give me ideas / brainstorm / help me think through"** on work that **already has** an approved PRD or prototype (iterating) | **`ux-pattern`** (structure/options grounded in the company patterns) → (**`research-agent`** only if they explicitly want a fresh discovery sweep) | **Never freestyle a brainstorm.** No PRD → `design-kickoff`. |
| **"which research method should I use for X" / "should I run interviews or a survey for X" / "how should I approach research for this" / "what's the right way to research X"** — on an already-approved `projects/<slug>/` task, one open question | **`design-kickoff`** (method recommendation mode, standalone) | One method from real constraints; never a generic menu. |
| **"what are our assumptions about X" / "map our assumptions" / "we think we know what users want" / "assumption audit" / "hypothesis vs assumption"** | **`assumption-mapper`** | Known vs believed, before research or a build. |
| **"rewrite these research questions" / "are these good questions to ask" / "a stakeholder sent me a list of questions" / "this question isn't answerable in an interview" / "which questions should I actually ask"** | **`research-question-sharpener`** | Rewrites questions (TEDW); flags what qual can't answer. |
| **"write a usability test script" / "help me plan a usability test" / "create tasks for usability testing" / "I need to test this prototype with users" / "build a UT plan"** | **`usability-test-guide`** | Quant or qual test guide for an existing prototype. |
| **"run a research debrief" / "post-session debrief" / "lightning synthesis" / "synthesize these interviews" / "affinity diagram this data" / "find patterns in these transcripts" / "I have all this data now what" / "here's an interview" / "anything interesting?"** on a transcript, interview notes, or survey data | **`research-synthesis`** | Read the skill before answering. A paste already in the chat is not an exemption. Feeds `insight-writer`. |
| **"write insights from this data" / "is this an insight or a finding" / "my insights feel shallow" / "so-what check this report" / "will this land with stakeholders" / "pressure test my findings" / "is this actionable"** | **`insight-writer`** | Insights with a so-what check; takes patterns from `research-synthesis`. |
| **"write me a screener" / "help me recruit participants" / "screener survey" / "participant criteria" / "who should I recruit"** | **`screener-builder`** | Behaviour-first screener with knockout logic. |
| **"we have a week for research" / "stakeholder asked for a survey" / "how do I scope this study" / "decision brief" / "my research isn't getting used" / "our research sits on a shelf" / "how do I say no to a vague research request"** | **`decision-first-research`** | Decision, risk, blocking unknown before method. |
| **"card sort" / "card sorting" / "tree test" / "tree testing" / "information architecture research" / "can users find things in this nav" / "directness score"** | **`ia-methods`** | Card sort before tree test when both are needed. |
| **"build a persona from this research" / "make an empathy map" / "map this user's journey" / "journey map for X" / "who are we designing for" / "empathy map for this segment" / "ability spectrum" / "who can and can't use this" / "situational impairment" / "inclusive persona" / "job stories" / "JTBD" / "job to be done" / "what job is the user hiring this for" / "service blueprint" / "what's happening behind the scenes" / "backstage of this flow" / "why does this handoff keep breaking"** | **`research-artifacts`** | Six modes from sourced research only; never invents personas or jobs. |
| **"write the rationale for this decision" / "why did we choose this" / "document why we went with X" / "defend this decision in writing" / "explain the trade-offs on this choice"** | **`design-rationale`** | Documents a decision already made; logs to `decisions.md`. |
| **"accessibility decision" / "document this a11y tradeoff" / "a11y ADR" / "accessibility handoff for eng" / "why is a11y like this" / "we can't do both for accessibility" / "accessibility decision record"** | **`accessibility-decisions`** | A11y decision records and eng criteria; not the finding skills. |
| **"write a session summary" / "summarize this interview" / "usability test summary" / "post-session notes" / "write a topline" / "executive summary for this research" / "one-pager for leadership" / "key takeaways slide"** | **`research-summary`** | Session summary or executive topline. |
| **"how do I share these findings" / "research shareout" / "research presentation" / "stakeholders aren't acting on research" / "make this readout engaging" / "usability bingo" / "insight auction"** | **`research-shareout`** | Share-out plan; not the deck itself. |
| **"whiteboard this research ask" / "workshop research plan on a board" / "scope this study live with the team" / "research planning workshop" / "30-minute research framing exercise"** | **`workshop-whiteboard`** | Timed research-scoping board for workshops. |
| **"build an OST / opportunity solution tree / connect needs to outcomes / which opportunities to pursue / what bets should we make / strategy tree / test assumptions cheaply / prioritize opportunities"** | **`product-strategy`** | OST and strategy frameworks; feeds `roadmap-prioritization`. |
| **"help me prioritize this backlog" / "which of these should I do first" / "rank these tickets" / "what should I work on next" / "we have 5 things and no time, which matters most"** | **`roadmap-prioritization`** | Ranks named items with visible reasoning; not what to build. |
| **"help me write an OKR for this" / "what should our goal be for X" / "set a goal for this project" / "what metric should we track" / "how do we know if this design worked" / "north star metric for X"** | **`okr-goal-setting`** | Falsifiable key results; no invented baselines. |
| **"how do I get buy-in on this" / "PM and eng disagree on this direction" / "how do I convince [stakeholder] this is the right call" / "I need alignment before I can ship this" / "this keeps stalling in review"** | **`stakeholder-alignment`** | Stakeholder map and sequenced asks; never sends without a go. |
| **"check Slack [channel] for X" / "what should I reply to this thread" / "does this Google Doc/Drive file add anything new to X" / "here's a meeting transcript, capture the decisions"** — on an **already-approved** `projects/<slug>/` task, naming **one concrete source** | **`research-agent`** (lightweight gap-fill mode) | One named source on an approved task; no new topic. |
| **"did this work" / "did the change actually help" / "what's the verdict on X" / "combine the [UT/survey] results with the [usage/click] numbers"** | **`research-agent`** (verdict synthesis mode) | Combines qual and quant into a verdict; never invents a number. |
| "copy / microcopy / button label / does this wording sound right" | `content` | Standalone, or tail-end of a build chain. |
| "check accessibility / focus order / aria / contrast" | `accessibility` | Standalone diagnostic, or tail-end of a build chain. |
| **"cognitive accessibility" / "cognitive load check" / "is this too much to process" / "wayfinding check" / "mental load on this flow" / "COGA review"** | **`cognitive-accessibility`** | Complements `accessibility` / `audit`. |
| **"responsive patterns" / "breakpoint strategy" / "does this reflow" / "200% zoom check" / "what collapses at narrow widths" / "container queries for this"** | **`responsive-patterns`** | Breakpoints and reflow; hands build to `ui-agent`. |
| **"interaction design" / "map the states for this" / "state matrix" / "loading and error feedback" / "interaction spec for this control"** | **`interaction-design`** | State matrix specs only; `ui-agent` implements. |
| **"adaptive interfaces" / "prefers-reduced-motion" / "high contrast mode" / "does this respect system text size" / "prefers-contrast" / "density preference"** | **`adaptive-interfaces`** | Preference map; never invents a product dark mode. |
| "run the audit / check before sharing / is this ready" — **on a Design Harness prototype / built screen in this repo** | `audit` | Built screens only, not Figma or opinion asks. On PASS, offer the push (§6). |
| **"review my branch for UI" / "interface review on this diff" / "craft review my uncommitted changes" / "design regression check on this PR" / "review UI changes before I push"** | **`interface-change-review`** | Git-scoped craft review; not the share gate. |
| **"fix / tweak / make X taller / add a badge / adjust spacing"** on an existing Design Harness prototype or `projects/<slug>/` screen | **`ui-agent`** (loads `design-system`) → (`mobile-shell` / `icon-usage` as needed) → **`audit`** (deferred by default — see micro-edit lane below) | **Never freestyle `.tsx`/CSS.** Micro-edit lane defers `audit` and logs it (`harness/references/micro-edit-lane.md`). |
| "what's the design team's workload / who's working on what / check the project board / is anyone overloaded / what's stuck in review / what's on the roadmap / payment initiatives / do we have bandwidth / workload agent / roadmap / what's my team working on" | **`workload-agent`** | Live snapshot, report-only; manager profiles get the team view. |
| "help me prep for a 1:1 with [name] / what's [name] working on / status check on [name]" | **`manager-1on1-prep`** | **`role: manager` only**; one report; never DMs. |
| **"help me give feedback to [name]" / "SBI for [name]" / "prep a difficult conversation with [name]" / "hard conversation with [name]" / "growth plan for [name]" / "development plan for [name]" / "help me coach [name]"** | **`people-coaching`** | **`role: manager` only**; SBI / difficult conversation / growth plan. |
| "who's on my team / who works on [squad/domain/topic] / who should I talk to (or reach out to) about [topic] / what team owns [X]" | **Direct team/people lookup — no skill chain** | Profile + `COMPANY-SQUADS.md`; answers who, sends nothing. §2c. |
| "book a meeting with [name] / find time with [name] / schedule a sync with [name] / when are we both free / propose a time for [meeting]" | **`scheduling`** | On-demand; free/busy only; books only on confirmation. |
| "what does [named competitor] do for [feature/flow] / how does [competitor] handle [flow] / compare this to [named competitor]" | **`competitor-scan`** | One named competitor + one feature. |
| "how does our X compare / benchmark our Y / is our Z any good compared to what's out there" | **`benchmark`** | Requested scored gap analysis; never automatic. |
| **"create a ticket / file a Jira / open a Linear issue / file a GitHub issue / design + eng ticket pair"** | **`ticket-create`** | On-demand; draft first, create only on go. |
| **"design handoff this design" / "handoff spec" / "developer-ready specifications" / "eng spec from this design" / "handoff this to developers"** | **`design-handoff`** | Composed eng spec, DRAFT; bare "handoff this" → AskQuestion. |
| **"create a page / add a wiki page / put this in Notion / put this in Confluence / write this up as a Google Doc / Confluence brief"** (named folder/space or pasted page URL) | **`docs-brief`** | On-demand; draft first, create only on go. |
| **"case study for this project" / "build the case study" / "tell the story of this project" / "write up how we got here" (no format named) / "turn this project into a case study"** | **`case-study`** | Eight-chapter story once; then offers slides or prose, never auto-runs them. |
| **"how should I show this" / "present this to <PM / eng / leadership>" / "let them play with the options" / "put these side by side" / "compare these directions live" / "show the states for review" / "let them flip through every state" / "set the prototype up for a research session" / "give me a participant view" / "show the team every idea we had"** on screens already built in `projects/<slug>/screens/` | **`presenter`** | One AskQuestion, then Variants / Compare / Stage / Ideas config beside the screens. Accent-only differences are one direction. Test script → `usability-test-guide`; both → §3 PLAN, guide first. |
| **"build me a presentation / make a deck / case study deck / put this PRD into slides / workshop deck / stakeholder deck / status video"** | **`deck-builder`** | Renders `case-study.md` or a PRD; saves to `artifacts/decks/` only. Case-study deck with no `case-study.md` → §3 PLAN, `case-study` first. |
| **"publish this project / deploy this / make it public / give me a share URL"** | **`publish-project`** | On-demand; needs a prior `audit` PASS. A deployed site, not "share this". |
| **"share this" / "send this to the team" / "push this"** — project work, Git autopilot on | **Git autopilot share** (`harness/references/git-autopilot.md` § 5) | `audit` first if screens changed since its last PASS, then save and push the project branch; reply with the link. Never `main`, never force. Not `publish-project`. |
| **"update my harness" / "get the latest harness" / "pull the harness updates"** | **Git autopilot update** (`harness/references/git-autopilot.md` § 6) | Merges the harness's `main` into this branch; the team's `projects/` and `*.local` files stay. A conflict stops and lists files. Works with autopilot off. |
| **"work on another project in parallel" / "open <slug> in a second window" / "two projects at once"** | **Git autopilot worktree** (`harness/references/git-autopilot.md` § 7) | Second folder on its own branch, profile and context linked in. Works with autopilot off. |
| **"undo the last change" / "undo my last save" / "take back the last save"** — Git autopilot on | **Git autopilot undo** (`harness/references/git-autopilot.md` § 4) | Show what it undoes, ask once, then revert that save. An unsaved edit is undone in the file, not here. |
| **"write an article / write a blog post / turn this into an essay / write up how we got here (prose) / draft a LinkedIn post / write a case-study writeup / run anti-slop on this / use the writing skill on this article / how will this read after the anti-ai pass"** | **`writing`** | Long-form prose from sourced evidence, always DRAFT. |
| **"wrap up"** (same: "journal this" / "add this to my journal" / "log this session to my journal") | **`session-journal`** | End of session: journal entry, handoff row in `log.md`, then the save. Not a full-chat compact (`session-handoff`) and not a project retro. |
| **"handoff this session" / "session handoff" / "compact this chat for a new session" / "context is full, write a handoff" / "continue in a fresh chat" / "write a handoff for the next agent"** | **`session-handoff`** | On-demand chat compact → `handoff.md`. |
| **"audit the harness / check routing / why did this freestyle / routing coverage / harness audit / run the routing evals"** | **`harness-audit`** | Not `audit`. **Prospective evals mandatory, same turn,** after any §2 or skill-description edit. |
| No match | **Fallback protocol** (§4) | **Loud miss — never silent freestyle.** Log every fallback. |

### 2a. `design-kickoff` vs iterating — which row fires

Before matching any other row, check in order:
1. **Iterating** — prototype for this feature already exists under
   `projects/<slug>/screens/`, **or**
   `projects/<slug>/decisions.md` already logs a kickoff-gate approval, **or**
   the designer explicitly opts out of the gate for this task → skip
   `design-kickoff`, use the **iterating** row.
2. **New product bet** — "let's start", "kick off", "explore", "design",
   or "build" something with no task yet → **`design-kickoff`**, including
   Step 3. A question, a lookup, an iteration, a critique, copy, or an
   import is not a bet and never reaches Step 3. Explicit wayfinding
   language ("wayfind", "map the decisions", "plan, don't build", "too big
   for one session", "the way isn't clear") runs **wayfinding mode** and
   does not start the PRD sequence. Vague "explore / let's start" still
   runs the full sequence. The step list, the failed-leg rule, and the
   worked chain live in `harness/references/routing-notes.md` under
   "Kickoff, after the row matches".

### 2b. Resume detection — a task folder is not proof that kickoff happened

A folder is not proof of kickoff. Before the iterating row on an existing folder, read `harness/references/resume-detection.md`. `draft` resumes at the gate; `approved` iterates.

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

**The gap this closes:** routing used to be binary — a row either
matched (silently, full confidence implied) or it was a §4 fallback.
There was no honest middle ground for "I'm fairly sure this is X, could
also be Y" — a shaky match only surfaced as wrong *after* the wrong
skill had already run. See `documentation/guides/confidence-autonomy.md` for the
full proposal this codifies.

Classify every §2 match into one of three tiers, based on **how** the
match happened — never a model-internal score, never a new API call:

| Tier | When | What to show |
|---|---|---|
| **High** | Exact trigger phrase from the §2 table, or an existing `projects/<slug>/decisions.md` gate already logged this exact chain before | Nothing extra — stay silent, don't add noise to the common case |
| **Medium** | Matched by inferred intent/paraphrase (no exact trigger phrase), or the ask genuinely sits across two adjacent rows | One line before proceeding: `Routing: <skill> (medium confidence — <why>). Proceeding — say so if this should be something else.` |
| **Low** | This is honestly a §4 fallback in disguise | Don't round up to medium — run §4 for real |

Medium-confidence still proceeds (this is not a new gate, and never
blocks a single-skill auto-run) — it's a one-line disclosure, not a
question. If it's wrong, the designer says so in the same turn and
re-routing is cheap because nothing irreversible happened yet.

### 2g. Agent role patterns (reference)

The five role names (Specialist, Validator, Router, Orchestrator, Fallback)
and which skills fit each: `harness/references/agent-role-patterns.md`.
When adding a skill, check which role it fits to avoid overlap.

### 2h. Challenge — one sentence, then a smaller step

Before building in an existing project, read the truth block only. How to fill the blanks: `harness/references/challenge.md`.

Say nothing on an edit, a copy tweak, an import, or a question answered from chat. Challenge only when `status` is `draft` or `exploring` and they asked to build, the ask builds something parked, an unknown's `blocks` covers this step, or an unsourced claim is being treated as fact. One sentence from the matching template, then `AskQuestion`. Plain words. Their past decision when there is one. Never say "truth block" or "row" to them.

**Parked** — "You parked this on {date}: {direction}. You went with {current} instead{, because {reason}}." Buttons: "Compare both, low-fi" · "Reopen it and build" · "Stay with {current}". Reopen moves it out of parked and logs why.

**Unknown that blocks** — "This depends on something still open: {unknown}{. {owner} owns it}." Buttons: "Draft a question for {owner}" (or "List what would settle it" if no owner) · "Build with it as a visible gap" · "Build anyway (marked draft)".

**Draft / exploring, and they asked to build** — "This is still {status}. The biggest open question is {top unknown}." Buttons: "Critique what exists first" · "One screen, low-fi" · "Build anyway (marked draft)".

**Unsourced claim** — "{claim} isn't backed by anything in findings yet." Buttons: "Check production or data first" · "Mark it as an assumption and continue".

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
