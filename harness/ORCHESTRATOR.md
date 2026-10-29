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
auto-load those exact filenames — they are thin pointers with no rules of
their own. Every real rule (routing, gates, hard rules on tokens/DS
composition/accessibility, the skill roster, state rules) lives here. Read
this file first, always, whichever pointer file got you here. §§0–6 decide
*what* to build and *which skill(s)* to run; §7 supplies the design
language and hard rules that govern *how* anything gets built.

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

**Check** on every new chat whether `designer-profile.local.md` exists. New chat ≠ new clone.

- **Exists** → skip silently: no MCP gate, no questions, no handoff. Read it and use its answers for §1's platform/stage inference, vague follow-ups ("continue where I left off" → **Active work (auto)**), and §3's plan-gate behaviour. Never re-ask what it answers.
- **Missing** → the Muse greeting (`harness/designer-onboarding/SKILL.md` § The greeting) is the literal first content of the turn; the profile check is the only tool call allowed before it — never start from the MCP gate. **After the greeting**, read `harness/references/onboarding-gate.md` and `SKILL.md` for the rest, in order: optional tools → one role question → write and verify the profile → workload → handoff, plus the manager path.

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

## 0.5. Design thinking model (load on every session)

**After the profile gate (§0), before intake (§1)** — read
`harness/references/design-thinking-model.md` to understand how to reason about
design work, not just which skills to route to.

This teaches you:
- The three modes of design work (discovery, validation, iteration)
- When to use which fidelity (talk-through, Design Harness prototype, coded spike)
- How design decisions compound (reversible vs. load-bearing)
- What "good enough" means at each stage
- Design intent vs. user outcome (the gap that matters)

**Why this exists:** You need to understand what discovery vs.
iteration means, not just route "kick off X" → design-kickoff.

Load this once per session, same as you load ORCHESTRATOR.md itself. The
routing table (§2) tells you WHAT to execute; the design thinking model tells
you HOW to reason about design decisions.

---

## 1. Intake protocol

On any new design task request, extract:

- **Feature/surface** — what screen, flow, or component
- **Platform** — iOS / Android / web (infer from existing prototypes if not stated)
- **Stage** — discovery / existing design / pre-handoff
- **Available sources** — Figma link? A ticket? nothing?

**Infer before asking.** Check, in order:
1. The task folder (`projects/<slug>/`) — if one exists for this feature, the answer may already be in `brief.md`, `sources.md`, or `decisions.md`.
2. The actual repo — `src/design-harness/pages/`, `src/design-harness/routes.ts` — does this screen already exist? (This caught a real duplicate-build attempt on the Clients screen — always check before asking "does this exist?")
3. The message itself — platform, stage, and scope are often stated or implied.
4. `designer-profile.local.md` (Step 0) — if the request doesn't state a platform, default to this designer's usual platform instead of asking, **if the profile has one set** — platform is deferred by default post-onboarding-shortening, so most profiles won't yet. If unset, ask normally per this section and write the answer back into the profile so it's asked at most once, ever (see `harness/designer-onboarding/SKILL.md` § Deferred and opt-in fields). For vague follow-ups ("continue where I left off"), check **Active work (auto)** in the profile and `projects/` for a matching slug before asking what the designer means — a hint, not proof of an active task (see `harness/designer-onboarding/SKILL.md`).

**If gaps remain, ask at most 3 clarifying questions, in one batch, in one
message.** Never interrogate one at a time. Never ask something already
answered or inferable.

**UI:** batch fixed-choice intake questions in **one native Cursor
`AskQuestion` tool call** (clickable buttons — not chat prose). Up to
three `questions[]` entries in that single call. Contract:
`harness/references/ask-question-ui.md`. Pure paste requests (e.g. a
Figma URL with no sensible option set) may be one chat line only.

- Good: `AskQuestion` with options like "Starting from zero" / "I have a
  Figma link (I'll paste it)" / "Not sure yet"
- Forbidden: "What would you like me to do?" / anything answerable from
  context you didn't check first / numbered option lists in chat

**Source links:** when citing ticket keys, docs pages, Figma/Miro URLs,
Slack threads, or other fetched sources in chat or markdown output, use
markdown links per `harness/references/source-links.md` — never bare ticket
keys in tables when the source is connected.

---

## Fast lanes

Check these before the routing table. A match skips the table and the routing log. Only the prototype lane skips the plan gate.

- **Answer-first.** Drafts, replies, messages, and simple questions, when the material is already in this chat. Answer directly. No skill, no research, no routing log. A transcript, interview notes, survey data, or "anything interesting?" on research material goes to `research-synthesis`.
- **Prototype.** A change to the screen already being worked on, not a new screen. Load `ui-agent`'s `SKILL.md` first, always, before any `.tsx` edit. The lane skips the routing table and the plan gate, not the skill. Adding a screen stays on the routing table and stops at the plan gate.
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
| **Any new project/feature signal** — "start working on / kick off / explore / look into / design / build" **or** a plain lookup/informational ask about a topic with **no approved `projects/<slug>/` task yet** — "what is X" / "is there a project on X" / "tell me everything about X" / "catch me up on X" / "what do we know about X" — even a specific-sounding one-liner like "city by city leaderboard" | **`design-kickoff`** (which internally runs `workload-agent` + `research-agent` in Step 1 → PRD → human gate → then routes onward) | Front door, checked first. Newness is the trigger; a question is not an exemption. Never answer a net-new lookup from local files alone. Explicit wayfinding phrases go to the next row. §2a. |
| **"wayfind this" / "map the decisions" / "this is too big for one session" / "plan, don't build" / "the way isn't clear yet"** | **`design-kickoff`** (wayfinding mode) | Decision map in `wayfinding.md`; no PRD, no build until the way is clear. |
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
| **"show me the design debt" / "what did we defer" / "triage the debt register" / "escalate this debt" / "what open advisories do we still owe"** | **`design-debt-tracker`** | Triage of `debt.md`; does not replace the fix-or-log question after audit/critique. |
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
| **"run a research debrief" / "post-session debrief" / "lightning synthesis" / "synthesize these interviews" / "affinity diagram this data" / "find patterns in these transcripts" / "I have all this data now what"** | **`research-synthesis`** | Tags and clusters raw session data; feeds `insight-writer`. |
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
| **"publish this project / deploy this / make it public / give me a share URL"** | **`publish-project`** | On-demand; needs a prior `audit` PASS. |
| **"write an article / write a blog post / turn this into an essay / write up how we got here (prose) / draft a LinkedIn post / write a case-study writeup / run anti-slop on this / use the writing skill on this article / how will this read after the anti-ai pass"** | **`writing`** | Long-form prose from sourced evidence, always DRAFT. |
| **"wrap up" / "journal this" / "add this to my journal" / "log this session to my journal"** | **`session-journal`** | Designer's judgment, under 20 lines, to `designer-context.local/journal/`. Read back on resume and by `case-study`. |
| **"handoff this session" / "session handoff" / "compact this chat for a new session" / "context is full, write a handoff" / "continue in a fresh chat" / "write a handoff for the next agent"** | **`session-handoff`** | On-demand chat compact → `handoff.md`. |
| **"audit the harness / check routing / why did this freestyle / routing coverage / harness audit / run the routing evals"** | **`harness-audit`** | Not `audit`. **Prospective evals mandatory, same turn,** after any §2 or skill-description edit. |
| No match | **Fallback protocol** (§4) | **Loud miss — never silent freestyle.** Log every fallback. |

### 2a. `design-kickoff` vs iterating — which row fires

Before matching any other row, check in order:
1. **Iterating** — prototype for this feature already exists under
   `src/design-harness/pages/` (registered in routes), **or**
   `projects/<slug>/decisions.md` already logs a kickoff-gate approval, **or**
   the designer explicitly opts out of the gate for this task → skip
   `design-kickoff`, use the **iterating** row.
2. **Net-new** — none of the above → **`design-kickoff` fires, no
   exceptions.** Explicit wayfinding language ("wayfind", "map the
   decisions", "plan, don't build", "too big for one session", "the way
   isn't clear") runs **wayfinding mode** inside this skill and does not
   start the PRD sequence. Vague "explore / let's start" still runs the
   full sequence. This absorbed the earlier "prepend `research-agent` on
   net-new builds" rule — `design-kickoff`'s Step 1 runs **both**
   `workload-agent` (Step 1a — roadmap + design board ownership) and
   `research-agent` (Step 1b — deep discovery), plus the PRD and
   human-approval gate this repo was missing. Full sequence in
   `harness/skills/design-kickoff/SKILL.md`.

`design-kickoff`'s own Step 0 (name, known material, PM — max 3 questions)
**replaces** this file's §1 intake questions for the request that triggers
it — never run both, that's up to 6 questions on one ask.

If mandatory legs (docs tool, tracker, chat) fail during `design-kickoff`'s
Step 1 sweeps, it marks findings as partial and still waits at the gate —
it does not invent specs, and `ui-agent` never starts before gate approval.
The workload leg (Step 1a) requires the tracker only; if it fails,
note partial ownership data in the PRD §1.

Chains compose after the gate. Example: *"build the clients list screen and
check it against the archetypes"* → `ui-agent` → `icon-usage` →
`ux-pattern` (explicit archetype check requested) → `audit` — **no**
`design-kickoff` because `ClientsListPrototypePage.tsx` already exists.

Full skill docs live in `harness/skills/<name>/SKILL.md` — read the matched one(s) in full before executing.

### 2b. Resume detection — a task folder is not proof that kickoff happened

Never treat a `projects/<slug>/` folder as already kicked off because it exists. **Before using the iterating row on an existing folder, read `harness/references/resume-detection.md`**: the truth block `status` in `brief.md` decides (`exploring` = no folder, `draft` = resume at the gate, `approved` = iterating). Old words still map: STUB → exploring, EXAMPLE or DRAFT → draft, APPROVED → approved. A dated approval in `decisions.md` wins a disagreement (fix the truth block to match and log the correction), and never end a turn with a folder left at `exploring`.

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

Before running anything with **more than one skill**, output a plan block and wait for approval.

**Net-new (design-kickoff fires):** the plan itself is just the kickoff sequence — there's nothing to approve upfront beyond starting it, since Step 3's PRD gate *is* the approval checkpoint:

```
PLAN — [task name] (net-new — design-kickoff)
1. design-kickoff Step 0 → 3 routing questions (name, known material, PM)
2. design-kickoff Step 1a → workload-agent (roadmap + design board ownership cross-ref)
3. design-kickoff Step 1b → research-agent sweep (docs + tracker + chat + linked Figma/Miro)
4. design-kickoff Step 1c → assumption-mapper (known vs believed from 1a/1b)
5. design-kickoff Step 2 → PRD + job stories into projects/<slug>/brief.md
6. design-kickoff Step 3 → THE GATE — presented for approval before any design work
7. (post-gate) Step 4 — if jobs/objects/strategy missing, AskQuestion; else ui-agent → icon-usage → audit
Starting with Step 0.
```

**Iterating (design-kickoff does not fire):**

```
PLAN — [task name]
1. ui-agent → builds [screen] from context/design-system/ds + tokens
2. icon-usage → sources icons via Icon primitive
3. audit → design system + a11y + copy check before done
Estimated: ~X min. Reply "go", or edit the plan.
```

**Figma / design critique (iterating board or screen review — §2d):**

```
PLAN — [task name] (design critique)
1. ux-pattern → structure / archetype / the company patterns against the linked node or screen
2. content → CTA / banner / notification copy (omit only if no product copy)
3. (after complete) AskQuestion → optional figma-ux-audit canvas annotations
Estimated: ~X min. Reply "go", or edit the plan.
```

**Figma canvas annotations (`figma-ux-audit` — standalone or post-critique):**

```
PLAN — [task name] (figma-ux-audit)
1. Load ux-pattern (+ content if copy) context — reuse findings.md when present
2. figma-ux-audit → place labelled annotation cards on the linked node(s)
Estimated: ~X min. Reply "go", or edit the plan.
```

**Single-skill plans skip the gate** if the designer has stated a standing "just do it" preference (log this preference in `projects/<slug>/decisions.md` the first time it's stated) **or** if `designer-profile.local.md` (Step 0) already records interaction style as "just do it for simple asks". **Multi-skill chains always show the plan** — no exceptions, even with a standing preference or profile setting. **The kickoff PRD gate (Step 3) is never skippable this way** — a standing "just do it" preference covers the plan-block formality, not the human-approval checkpoint on unverified specs. That “never skippable” is **specified** (you must stop), not mechanical — see `documentation/guides/spec-vs-runtime.md`.

Never execute before approval on a multi-skill chain.

### 3a. Autonomy dial (optional, per-task, offered only inside a plan block)

When a multi-skill plan block fires, offer one `AskQuestion` on how hands-on to be (just build + summarize / confirm each step / default), scoped to this task. Never skips the first plan approval or the kickoff PRD gate. Read `harness/references/autonomy-dial.md` before offering it.

---

## 4. Fallback protocol

When **no** row in the routing table matches — or confidence is too low
to pick one without guessing:

### Required script (loud miss — never silent freestyle)

1. **Say so plainly in the first sentence**, using this shape (adapt
   names, keep the honesty):

   > This doesn't match an existing skill — closest is **[skill/row]**.
   > Want me to run that, or freestyle **without** harness context?

2. **Do not** produce a normal design/product answer in the same turn as
   if a skill had run. No "helpful" freestyle first, confirm later.

3. Ask via **`AskQuestion`** when available, with options at least:
   - Run closest: `[skill/row]`
   - Freestyle without harness (explicit opt-in — no skill files, still logged)
   - Other…

   If `AskQuestion` is missing from the session tool list, **plain-text
   degrade** per `harness/references/ask-question-ui.md` — same options in
   chat, wait for a typed reply. **Do not** tell the designer to switch
   models. Still **do not** freestyle the substance while waiting.

4. **Log before or as you ask** — one line in
   `harness/logs/routing-log.md`:

   `YYYY-MM-DD | <intent paraphrase> | FALLBACK | closest=<skill or —> | asked user | Task: <slug or —>`

5. Only after the designer picks:
   - **Run closest** → load that skill and proceed (plan gate if multi-skill).
   - **Freestyle without harness** → answer, but prefix the answer with
     `Freestyle (no harness skill)` and keep the FALLBACK log line.
   - **Other** → one clarifying follow-up, still no silent skill claim.

### Also forbidden

- Pretending a skill ran when it didn't ("I ran ux-pattern…" without
  having read the skill file).
- Using §4 as a shortcut for design critique, ideation on approved work,
  micro-edits, or harness-ops asks — those have §2 rows now; re-check
  before declaring no match.
- Skipping the `FALLBACK` line because there is no task folder.

Every fallback is food for `harness/harness-audit/SKILL.md`.

---

## 5. State rules

Every task gets a folder at `projects/<task-slug>/` (schema: `projects/README.md`). Rules:

- **Check the task folder before asking the designer anything** — the answer may already be there (`brief.md`, `sources.md`, `decisions.md`, `findings.md`).
- Skills **append, never overwrite** `findings.md`, `decisions.md`, and **`sources.md`**. Every `findings`/`decisions` entry is dated and names the skill that produced it. Every `sources.md` row is dated in the Indexed column.
- **Project link catalog:** when the designer pastes an article, Doc, competitor page, or other durable URL **for this project**, append a row to `projects/<slug>/sources.md` in the same turn (create the file from `projects/_template/sources.md` if a legacy folder lacks it). Still cite and synthesise in `findings.md` when a skill runs. Team-wide links → `COMPANY-SOURCES.md`. Personal-only → `designer-context.local/`. See `documentation/guides/company-sources.md`.
- **Project inbox (2026-10-11):** when the designer pastes or attaches raw material for a project (transcript, thread text, doc text, a file), save it verbatim to `projects.local/<slug>/inbox/YYYY-MM-DD-<what>.md` with a short header **before** summarizing it — always the gitignored side, never edited afterwards, never loaded unless a claim needs checking. Links the source still holds stay `sources.md` rows. Rules: `harness/references/project-inbox.md`.
- **`ui-agent` variant forks** (`harness/skills/ui-agent/references/variant-fork.md`) log the chosen layout/structure **and rejected alternatives** to `decisions.md` after the designer picks via `AskQuestion` — this is the record for "gates are permission, not taste."
- **Taste log (2026-10-29):** when the designer corrects your output with a reusable rule ("no borders on cards"), apply it, then ask once — "Save as a preference? [Yes / Just this time]" — and append to `designer-context.local/preferences.md` only on Yes. Never save silently. An answer-first draft of a Slack message, reply, or email reads its `## Slack/docs` section first, only if that section has rules. Contract: `harness/references/designer-preferences.md`.
- **Routing records:** plain matches are recorded automatically by the skill-usage hook (`harness/logs/skill-usage.jsonl`). The agent writes to **`harness/logs/routing-log.md`** only for exceptions: a `FALLBACK`, a `MISROUTE`, or an approved §3 plan, including fallbacks that never get a task folder. Task-scoped work still gets a line in that task's own `log.md`.
- This is what makes work resumable: *"continue the clients list redesign task"* should read the folder (with `decisions.md` and the latest `designer-context.local/journal/*-<slug>.md` entry — `session-journal` § Read-back), summarize state, and propose the next step — asking nothing already answered.
- **Project stage line (2026-10-11):** on the first task-scoped reply in a session, on every "continue X" ask, and when the work moves a project to a new stage, show one line — `Project <slug> · stage <stage> (<evidence>) · <what runs now>` — worked out from which project files have real content (`kickoff` → `framed` → `modelling` → `building` → `reviewing` → `handoff` → `testing` → `closed`). Derived each time, never stored; a disclosure, never a gate; the designer's ask outranks it. Rules: `harness/references/project-stage.md`.
- **Release notes (2026-10-11):** when a change to the harness or Design Harness alters what a designer sees or does, add a bullet under today's date at the top of `RELEASE-NOTES.md` (repo root, shown at `#/how-to/release-notes`) in the same turn the change lands. Counts: a skill added, renamed, removed, or with changed behaviour; a §2 routing row or gate changed; a default or `harness.config` setting changed; a new Design Harness page or feature; a new check, script, or hook. Skip: refactors with no visible change, typo/link fixes, log-only edits, and work inside a single `projects/<slug>/` (that goes in the project's own `log.md`). Write for designers, in plain language — no company names, people, or outside sources (this file is public). The pre-commit hook prints a reminder when `harness/` or `src/design-harness/` changed without this file.
- **Harness settings (2026-10-10):** before auto-running `audit`, building a storyboard or writing the case study after a build, building variant forks, firing the mid-build taste checkpoint, or adding the handoff nudge below, read `harness.config.local.json` (written from Design Harness → Settings). Missing file or key = today's behaviour. Contract: `harness/references/harness-settings.md`.
- **Session-length nudge (2026-08-12, cost audit; off when `behaviour.handoffNudge` is `false`):** once a single chat has run **~15–20 turns on one task**, add one short line offering a handoff (e.g. "This session's getting long — want me to write a handoff so we can continue fresh?") the next time you'd otherwise reply. This is a **suggestion only** — `session-handoff` itself stays on-demand and never auto-fires or writes without an explicit go (per `harness/skills/session-handoff/SKILL.md`). Don't repeat the nudge more than once per ~10 additional turns if declined.

---

## 6. Remote sync (no shared/hosted instance — yet)

Each designer runs a local clone; the team's Git remote is the only sync and nothing pushes on its own. `audit` asks about commit and push on a PASS, and checks gallery eligibility first. Full rule: `harness/references/remote-sync.md`.

---

## 7. Design system rules — the design language brain

This section is the single home for the design rules (see "One source for
hard rules" at the end of this section). It supplies *how* to build once
§§0–4 have decided *what* to build. Load it before composing anything.

### 7.0 What this product is

This section resolves to your company's own product framing — read
`COMPANY-BUSINESS.md` (via `context/org-pack.local/` if it exists on this
machine, else the public `context/org-pack/` example) for the real facts:
what the product is, who it's for, the strategic pillars, and the brand
colour. Never hardcode a specific company's product description here in
the shared orchestrator — that keeps this file portable across clones.

The **design system** below (Design Harness kit) is genuinely generic — it ships
with this harness and isn't tied to any one company's product framing.

**Lab DS brand (2026-08-11):** Design Harness kit authority —
**teal** (`#007078` → `--color-surface-brand` / `--kit-brand`), **plum**
premium (`#4f3791`), warm paper canvas (`#fafaf7`). Type is **Inter** +
**JetBrains Mono**. Token *names* are stable; values follow
`STUDIO-OS-KIT-NOTES.md`.

### 7.1 Hard rules — never break these

1. **Tokens only, no raw values.** Every colour, spacing step, radius, and
   border width must come from a CSS variable in
   `context/design-system/tokens.css`. Never write `#rrggbb`, `px`, or
   `rem` literals in component styles. If a token is missing, add it to
   `tokens.css` first (extend it to match Figma — don't invent a one-off
   value instead).
2. **Compose from `context/design-system/ds`, not ad-hoc markup.** Import
   from the `context/design-system/ds` barrel (index) in app code so
   `ds.css` always loads. Available primitives: `Button`, `Card`, `Text`,
   `Stack`, `Badge`, `TextField`, `Toast`, `Icon`. Build screens from
   **Design Harness** (`npm run dev`) using these primitives before ad-hoc
   markup.
3. **Never invent components or brand marks. Never hand-draw icon SVGs.**
   If a component doesn't exist in `context/design-system/ds`, build it
   from existing primitives or request it explicitly. Do not hallucinate
   custom SVG logos or illustration assets — use text labels or assets
   the team provides. All icons come from
   [Tabler Icons](https://tabler.io/icons) (`@tabler/icons-react`) via
   the `Icon` primitive — see `harness/skills/icon-usage/GUIDE.md`.
4. **Brand teal is `--color-surface-brand` / `--kit-brand` (`#007078`).**
   Premium / plum is `--kit-premium` (`#4f3791`). Legacy token name “sea”
   (`--ds-additional-*-sea*`) keeps the name — value is the **same teal**.
   Prefer kit `Button` `intent="primary"` (ink fill) or `intent="tinted"`
   (teal soft). Secondary uses sunken fill; outline uses paper + line.
   Kit sizes: `xl`/`lg`/`md`/`sm`; radii 16px (sm 12px).
5. **Preserve accessibility.** Keep `:focus-visible` on every interactive
   element — never remove focus styles. Use semantic HTML (real
   `<button>`, labelled `<input>`, heading hierarchy) so elements are
   keyboard reachable.
6. **Documentation is the contract.** When extending tokens or components,
   cross-check `context/design-system/FIGMA-FOUNDATIONS-COLOUR.md`,
   `FIGMA-FOUNDATIONS-SPACING.md`, `FIGMA-FOUNDATIONS-RADIUS.md`,
   `FIGMA-FOUNDATIONS-BORDER.md`, `FIGMA-FOUNDATIONS-SIZE.md`, and
   typography/scaling docs so names and values stay consistent with Figma.
   For **Buttons**, use `context/design-system/FIGMA-DESIGN-SYSTEM-BUTTONS.md`
   and your Figma library's Buttons frame (recorded in your `COMPANY-BUSINESS.md`
   § Design system row — not hardcoded here).
   For **Toast**, use `context/design-system/FIGMA-DESIGN-SYSTEM-TOAST.md`
   and your Figma library's Alerts & Toast frame (same row).
7. **Dark mode is a real DS layer; prototypes stay light (updated
   2026-10-09).** `context/design-system/tokens.css` ships paired light/dark
   values for the Design Harness kit (`--kit-*`) — light on `:root` and
   `[data-theme='light']`, dark on `:root[data-theme='dark']`. The Design Harness
   theme toggle sets the root attribute, so catalog chrome and DS pages
   follow it. **Product prototypes do not:** playground routes and
   `PhoneShell` set `data-theme="light"` on `.design-harness-proto-surface`,
   because the product has no dark theme. A prototype follows the toggle
   only once its design system declares dark support (future, per-system).
   Still don't invent a *third*, one-off dark theme outside these tokens.
   See `context/design-system/STUDIO-OS-KIT-NOTES.md` for what's migrated
   vs. still pending (segment, sheets, headers — tracked in
   `KNOWN-ISSUES.md`).

### 7.2 Design sources

| What | Where |
|---|---|
| **Design Harness kit** (2026-08-11 — current colour/type/depth + button authority, light **and** dark) | `context/design-system/source/design-harness-kit/` → `tokens.css` (`--kit-*`); see `STUDIO-OS-KIT-NOTES.md` |
| **Foundations** — spacing, radius, border, type ramp *(geometry scales; colour superseded)* | Exported `FIGMA-FOUNDATIONS-*.md` — trust `tokens.css` for live hex |
| **Legacy component specs** — pending further kit migration | `FIGMA-DESIGN-SYSTEM-*.md` |
| **Systems** (2026-10-11) — Mobile (default), Desktop, Brand, Studio: what each has, what's missing, its rules; a project's brief **Platform** line picks one | `context/design-system/systems/*.md` → Design Harness `#/design-system/systems`; protocol in `harness/skills/design-system/SKILL.md` § Which system |

### 7.3 Design tokens reference

**Brand colour** (Design Harness — teal + plum + warm paper)

| Role | Token | Value | Notes |
|------|-------|-------|-------|
| Primary brand | `--color-surface-brand` / `--kit-brand` | `#007078` | Accents, tinted CTAs, links |
| Brand hover / deep | `--color-surface-brand-hover` / `--kit-brand-deep` | `#086c72` | Hover / deep |
| Dark brand panel | `--color-bg-brand-dark` | `#02282b` | Footer, hero dark sections |
| Premium | `--kit-premium` | `#4f3791` | Plum / premium intents |
| Primary button fill | `--kit-ink` | `#14161a` | Ink primary (ButtonShowcase) |
| Legacy “sea” (same teal) | `--ds-additional-background-sea` (+ aliases) | `#007078` | Name kept; value = brand |

Typography, spacing, radius, border-width and the most-used semantic
tokens: `context/design-system/TOKENS-QUICK-REFERENCE.md` (summary) and
`context/design-system/tokens.css` (source of truth). Use
`<Text variant="display|body-large|body|label|muted">` from
`context/design-system/ds` — never raw `<p>`/`<span>` with inline type styles.

### 7.4 Components — API quick reference

Prop and import cheat sheet for `Button`, `Text`, `Stack`, `Card`, `Badge`,
`TextField`, `Toast` and `Icon`: `context/design-system/COMPONENTS-QUICK-REFERENCE.md`.
New call sites use `Button`'s `intent` + `size` (`variant`/`tone` are deprecated).
Icons come only from `@tabler/icons-react` via `Icon` — never hand-drawn `<svg>`.

### 7.5 Stack and commands

Vite + React + TypeScript. No MUI, Tailwind, or other UI kit in this
MVP — the point is to prove **token-first** primitives. If production
later standardises on a kit, mirror these tokens into that kit's theme
rather than bypassing tokens.

| Command | Purpose |
|---------|---------|
| `npm run dev` | Run the lab locally (Design Harness MVP) |
| `npm run build` | Typecheck and production build |
| `npm run lint` | ESLint |

### 7.6 What this is not

- Do not use MUI, Tailwind, or any third-party component library output —
  this system is token-first and uses only `context/design-system/ds`
  primitives.
- Do not approximate the company with generic design system patterns. If a
  required component or token is missing, flag it rather than inventing a
  substitute.
- Do not generate placeholder logos, wordmarks, or illustration SVGs. Use
  text labels or assets the team provides.

### One source for hard rules

If you find a hard rule stated differently anywhere else in this repo,
that's a bug — fix it here and make the other location a pointer, not a
second copy.

---

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
