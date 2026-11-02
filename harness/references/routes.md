# Routes — the long tail of §2

`harness/ORCHESTRATOR.md` §2 keeps the common rows and one row per group.
When an ask matches a group row there, find that group's heading here and
match inside it. Full notes for any row: `harness/references/routing-notes.md`
(Grep the skill name). When a row changes, change both files in the same edit.

## Framing and strategy

| Intent signal | Chain | Notes |
|---|---|---|
| **"wayfind this" / "map the decisions" / "this is too big for one session" / "plan, don't build" / "the way isn't clear yet"** | **Wayfinding** | Write the decision map in `decisions.md` only. No brief. No build. Not kickoff. |
| **"where should I focus / what's the most important thing / where do I start / diagnostic / what's the bottleneck / which layer is weak / where are the gaps"** — triage across any situation (new, stuck, redesign, checking foundations) | **`diagnostic`** | Rates each design layer and names the bottleneck; recommends the next skill. |
| **"build org-pack" / "map our domain" / "extract company context" / "build vocabulary" / "refresh company context" / "update org-pack" / "add this to the company pack" / "the harness should know this doc"** — setup/maintenance of company knowledge foundation | **`org-pack-builder`** | Builds or extends `context/org-pack.local/`; "add this…" + one doc → § Add a file. |
| **"write the rationale for this decision" / "why did we choose this" / "document why we went with X" / "defend this decision in writing" / "explain the trade-offs on this choice"** | **`design-rationale`** | Documents a decision already made; logs to `decisions.md`. |
| **"build an OST / opportunity solution tree / connect needs to outcomes / which opportunities to pursue / what bets should we make / strategy tree / test assumptions cheaply / prioritize opportunities"** | **`product-strategy`** | OST and strategy frameworks; feeds `roadmap-prioritization`. |
| **"help me prioritize this backlog" / "which of these should I do first" / "rank these tickets" / "what should I work on next" / "we have 5 things and no time, which matters most"** | **`roadmap-prioritization`** | Ranks named items with visible reasoning; not what to build. |
| **"help me write an OKR for this" / "what should our goal be for X" / "set a goal for this project" / "what metric should we track" / "how do we know if this design worked" / "north star metric for X"** | **`okr-goal-setting`** | Falsifiable key results; no invented baselines. |
| **"how do I get buy-in on this" / "PM and eng disagree on this direction" / "how do I convince [stakeholder] this is the right call" / "I need alignment before I can ship this" / "this keeps stalling in review"** | **`stakeholder-alignment`** | Stakeholder map and sequenced asks; never sends without a go. |

## Research and evidence

| Intent signal | Chain | Notes |
|---|---|---|
| **"synthetic user test" / "walk through this as [persona]" / "persona walkthrough" / "stress-test this flow as a busy provider"** | **`synthetic-user-testing`** | Advisory only; never claims validation. |
| **"show me inspiration for X" / "mood board for this" / "aesthetic references" / "what could this feel like" / "cross-domain inspiration"** | **`inspiration-scouting`** | Take/leave references; not `competitor-scan` or `benchmark`. |
| **"which research method should I use for X" / "should I run interviews or a survey for X" / "how should I approach research for this" / "what's the right way to research X"** — on an already-approved `projects/<slug>/` task, one open question | **Research method** | One method from the real constraints. Not a menu. Not kickoff. |
| **"what are our assumptions about X" / "map our assumptions" / "we think we know what users want" / "assumption audit" / "hypothesis vs assumption"** | **`assumption-mapper`** | Known vs believed, before research or a build. |
| **"rewrite these research questions" / "are these good questions to ask" / "a stakeholder sent me a list of questions" / "this question isn't answerable in an interview" / "which questions should I actually ask"** | **`research-question-sharpener`** | Rewrites questions (TEDW); flags what qual can't answer. |
| **"write a usability test script" / "help me plan a usability test" / "create tasks for usability testing" / "I need to test this prototype with users" / "build a UT plan"** | **`usability-test-guide`** | Quant or qual test guide for an existing prototype. |
| **"run a research debrief" / "post-session debrief" / "lightning synthesis" / "synthesize these interviews" / "affinity diagram this data" / "find patterns in these transcripts" / "I have all this data now what" / "here's an interview" / "anything interesting?"** on a transcript, interview notes, or survey data | **`research-synthesis`** | Read the skill before answering. A paste already in the chat is not an exemption. Feeds `insight-writer`. |
| **"write insights from this data" / "is this an insight or a finding" / "my insights feel shallow" / "so-what check this report" / "will this land with stakeholders" / "pressure test my findings" / "is this actionable"** | **`insight-writer`** | Insights with a so-what check; takes patterns from `research-synthesis`. |
| **"write me a screener" / "help me recruit participants" / "screener survey" / "participant criteria" / "who should I recruit"** | **`screener-builder`** | Behaviour-first screener with knockout logic. |
| **"we have a week for research" / "stakeholder asked for a survey" / "how do I scope this study" / "decision brief" / "my research isn't getting used" / "our research sits on a shelf" / "how do I say no to a vague research request"** | **`decision-first-research`** | Decision, risk, blocking unknown before method. |
| **"card sort" / "card sorting" / "tree test" / "tree testing" / "information architecture research" / "can users find things in this nav" / "directness score"** | **`ia-methods`** | Card sort before tree test when both are needed. |
| **"build a persona from this research" / "make an empathy map" / "map this user's journey" / "journey map for X" / "who are we designing for" / "empathy map for this segment" / "ability spectrum" / "who can and can't use this" / "situational impairment" / "inclusive persona" / "job stories" / "JTBD" / "job to be done" / "what job is the user hiring this for" / "service blueprint" / "what's happening behind the scenes" / "backstage of this flow" / "why does this handoff keep breaking"** | **`research-artifacts`** | Six modes from sourced research only; never invents personas or jobs. |
| **"write a session summary" / "summarize this interview" / "usability test summary" / "post-session notes" / "write a topline" / "executive summary for this research" / "one-pager for leadership" / "key takeaways slide"** | **`research-summary`** | Session summary or executive topline. |
| **"how do I share these findings" / "research shareout" / "research presentation" / "stakeholders aren't acting on research" / "make this readout engaging" / "usability bingo" / "insight auction"** | **`research-shareout`** | Share-out plan; not the deck itself. |
| **"whiteboard this research ask" / "workshop research plan on a board" / "scope this study live with the team" / "research planning workshop" / "30-minute research framing exercise"** | **`workshop-whiteboard`** | Timed research-scoping board for workshops. |
| **"check Slack [channel] for X" / "what should I reply to this thread" / "does this Google Doc/Drive file add anything new to X" / "here's a meeting transcript, capture the decisions"** — on an **already-approved** `projects/<slug>/` task, naming **one concrete source** | **`research-agent`** (lightweight gap-fill mode) | One named source on an approved task; no new topic. |
| **"did this work" / "did the change actually help" / "what's the verdict on X" / "combine the [UT/survey] results with the [usage/click] numbers"** | **`research-agent`** (verdict synthesis mode) | Combines qual and quant into a verdict; never invents a number. |
| "what does [named competitor] do for [feature/flow] / how does [competitor] handle [flow] / compare this to [named competitor]" | **`competitor-scan`** | One named competitor + one feature. |
| "how does our X compare / benchmark our Y / is our Z any good compared to what's out there" | **`benchmark`** | Requested scored gap analysis; never automatic. |

## Explore and structure

| Intent signal | Chain | Notes |
|---|---|---|
| "structure this flow / does this match how the company works / which archetype" (reviewing a flow that already exists) | `ux-pattern` | Structure review, no build step. |
| **"breadboard this flow / map the interaction structure for X / where does this go / text-based flow before we design it / settle the places and affordances"** — flow doesn't exist yet, or is being restructured | **`ux-pattern`** (breadboard mode) | Drafts a new flow as text (`breadboard.md`); the row above reviews an existing one. |
| **"define the objects / map relationships / what states can this be in / object model / ubiquitous language / what does this thing mean / is this one thing or two things / how do these connect"** — between kickoff and screens | **`conceptual-model`** | Objects, relationships, states, vocabulary — after kickoff, before screens. |
| **"map this domain / what concepts exist in this domain / terminology audit / how does the domain talk about this before our product / domain event storming / bounded context for X"** — the real world's vocabulary, before any product decision | **`conceptual-model`** (domain-mapping mode) | Real-world vocabulary before product decisions; record contradictions, don't resolve them. |
| **"help me choose between [A] and [B]" / "which direction should we go" / "how do I decide between these options" / "is this choice defensible"** — options already exist (sketched/built/described) | **`ux-pattern`** (decision framework mode) | Weighs existing options on explicit criteria; logs to `decisions.md`. |
| **"debate this" / "argue both sides" / "advocate for each option" / "cross-examine these directions" / "I want productive conflict on this decision"** — options already exist or can be stated crisply | **`ux-pattern`** (debate mode) | Advocate briefs per option, then the designer picks. |
| **"grill me" / "question this plan until we agree" / "walk every branch" / "stress-test this plan with questions"** — a plan or design already exists | **`ux-pattern`** (grill mode) | One question at a time until the designer confirms a restatement. |
| **"give me ideas / brainstorm / help me think through" / "show me 15 ways to make X better" / "N ways to improve X" / "go wide on X"** on work that **already has** an approved PRD or prototype (iterating) | **`ux-pattern`** (go-wide mode for ideas, brainstorm, a count, or "go wide": type question, then 3 directions built into the screen and shown in Compare, then one pick; "help me think through" is structure/options grounded in the company patterns) → (**`research-agent`** only if they explicitly want a fresh discovery sweep) | **Never freestyle a brainstorm.** No PRD → `design-kickoff`. |

## Make, beyond the build rows

| Intent signal | Chain | Notes |
|---|---|---|
| **"should I sketch this or build it" / "do I need a real prototype for this yet" / "what fidelity should I use for X" / "is this worth building in Design Harness or just talking through"** | **`ui-agent`** (fidelity check, Step 0.5) | Recommends talk-through, sketch, or prototype; never a gate. |
| "check this token / where should this style live / is this a real Foundations token / design-system skill" | **`design-system`** | Token check + three-layer rule; not a replacement for `audit`. |
| "add an icon / which icon library" (standalone) | `icon-usage` | Usually rides inside a `ui-agent` chain. |
| "align the phone frames / why do the prototypes look different / does this match navigation-profile's frame" | `mobile-shell` | Phone-frame consistency, or inside a `ui-agent` chain. |
| **"taste check this" / "is this heading in the right direction visually" / "mid-build visual check" / "does this density feel right" / "is this a persuade or an operate surface" / "scale the ambition to the surface" / "should this be quieter"** | **`taste-feedback`** | Names the surface first; stays inside Foundations tokens. |
| **"motion spec for X" / "animate this transition" / "prototype this micro-interaction" / "reduced motion for this" / "choreograph the loading state" / "review these animations" / "what could be animated here" / "find motion opportunities" / "make this feel more alive" / "audit the motion" / "improve the animations" / "what's it called when [motion feel]" / "animation vocabulary" / "list the motions" / "what motions do we have" / "scan this for motion" / "scan the project for motion" / "apply the sheet motion" / "apply the menu" / "apply the pill" / "add the right motion here" / "does the system already animate this" / "custom motion only if the platform doesn't"** | **`motion-choreography`** | Spec / review / opportunities / audit→plan / vocabulary / list / scan / apply; reduced motion mandatory. |
| **"responsive patterns" / "breakpoint strategy" / "does this reflow" / "200% zoom check" / "what collapses at narrow widths" / "container queries for this"** | **`responsive-patterns`** | Breakpoints and reflow; hands build to `ui-agent`. |
| **"interaction design" / "map the states for this" / "state matrix" / "loading and error feedback" / "interaction spec for this control"** | **`interaction-design`** | State matrix specs only; `ui-agent` implements. |
| **"adaptive interfaces" / "prefers-reduced-motion" / "high contrast mode" / "does this respect system text size" / "prefers-contrast" / "density preference"** | **`adaptive-interfaces`** | Preference map; never invents a product dark mode. |

## Critique and quality, beyond the critique row

| Intent signal | Chain | Notes |
|---|---|---|
| **"review this live page" / "review this local URL" / "review localhost" / "click through this flow on this URL" / "capture this page and review it"** — a fetchable `http(s)` URL that is **not** figma.com | **`live-page-review`** | Non-Figma URL: capture, classify, hand off. This skill never uses Playwright MCP. |
| **"turn this critique into a report" / "HTML report of this review" / "proper report of these findings" / "write this up as a review report"** | **`review-report`** | HTML report from existing `findings.md`; never invents findings; never auto-run. |
| **"prep me for critique" / "critique presenter script" / "help me present this in UX review" / "frame this for design critique" / "walkthrough script for critique"** + Figma or a named frame set | **`critique-prep`** | Presenter script; never critiques the work. Ambiguous → AskQuestion. |
| **"annotate this Figma / add annotations to this Figma / audit with notes on the canvas / put feedback on the canvas / Figma canvas annotations"** | **`figma-ux-audit`** | Canvas annotation cards; never auto-run; plan then confirm. |
| **"accessibility decision" / "document this a11y tradeoff" / "a11y ADR" / "accessibility handoff for eng" / "why is a11y like this" / "we can't do both for accessibility" / "accessibility decision record"** | **`accessibility-decisions`** | A11y decision records and eng criteria; not the finding skills. |
| "check accessibility / focus order / aria / contrast" | `accessibility` | Standalone diagnostic, or tail-end of a build chain. |
| **"cognitive accessibility" / "cognitive load check" / "is this too much to process" / "wayfinding check" / "mental load on this flow" / "COGA review"** | **`cognitive-accessibility`** | Complements `accessibility` / `audit`. |
| **"review my branch for UI" / "interface review on this diff" / "craft review my uncommitted changes" / "design regression check on this PR" / "review UI changes before I push"** | **`interface-change-review`** | Git-scoped craft review; not the share gate. |

## Figma pipeline

| Intent signal | Chain | Notes |
|---|---|---|
| **"sync tokens from Figma / update tokens.css from Figma / check token drift / Figma variables to CSS / tokens out of sync / update Figma variables from code"** | **`figma-token-sync`** | Figma variables ↔ `tokens.css` drift and sync. |
| **"download assets from Figma / export icons from Figma / sync Figma assets / upload assets to Figma / generate icon bundle / update design assets"** | **`figma-asset-sync`** | Figma asset download/upload pipeline. |
| **"map Figma components to code / Code Connect setup / link design system to Figma / connect components / bulk Code Connect mapping"** | **`figma-code-sync`** | Code Connect mapping. |
| **"search Figma design system / find [component] in libraries / what libraries do we have / check before creating component / prevent duplicate components / library audit"** | **`figma-library-manager`** | Search libraries before creating a component. |
| **"document custom effects / what shader effects do we have / catalog Figma shaders / custom fill documentation / effects library audit"** | **`figma-effects-catalog`** | Catalog shader effects and fills. |

## Handoff, docs and presenting

| Intent signal | Chain | Notes |
|---|---|---|
| **"create a ticket / file a Jira / open a Linear issue / file a GitHub issue / design + eng ticket pair"** | **`ticket-create`** | On-demand; draft first, create only on go. |
| **"design handoff this design" / "handoff spec" / "developer-ready specifications" / "eng spec from this design" / "handoff this to developers"** | **`design-handoff`** | Composed eng spec, DRAFT; bare "handoff this" → AskQuestion. |
| **"create a page / add a wiki page / put this in Notion / put this in Confluence / write this up as a Google Doc / Confluence brief"** (named folder/space or pasted page URL) | **`docs-brief`** | On-demand; draft first, create only on go. |
| **"case study for this project" / "build the case study" / "tell the story of this project" / "write up how we got here" (no format named) / "turn this project into a case study"** | **`case-study`** | Eight-chapter story once; then offers slides or prose, never auto-runs them. |
| **"how should I show this" / "present this to <PM / eng / leadership>" / "let them play with the options" / "put these side by side" / "compare these directions live" / "show the states for review" / "let them flip through every state" / "set the prototype up for a research session" / "give me a participant view" / "show the team every idea we had"** on screens already built in `projects/<slug>/screens/` | **`presenter`** | One AskQuestion, then Variants / Compare / Stage / Ideas config beside the screens. Accent-only differences are one direction. Test script → `usability-test-guide`; both → §3 PLAN, guide first. |
| **"build me a presentation / make a deck / case study deck / put this PRD into slides / workshop deck / stakeholder deck / status video"** | **`deck-builder`** | Renders `case-study.md` or a PRD; saves to `artifacts/decks/` only. Case-study deck with no `case-study.md` → §3 PLAN, `case-study` first. |
| **"publish this project / deploy this / make it public / give me a share URL"** | **`publish-project`** | On-demand. Ship packet at exposure general, then a prior `audit` PASS. A deployed site, not "share this". |
| **"write an article / write a blog post / turn this into an essay / write up how we got here (prose) / draft a LinkedIn post / write a case-study writeup / run anti-slop on this / use the writing skill on this article / how will this read after the anti-ai pass"** | **`writing`** | Long-form prose from sourced evidence, always DRAFT. |

## Team and people

| Intent signal | Chain | Notes |
|---|---|---|
| "what's the design team's workload / who's working on what / check the project board / is anyone overloaded / what's stuck in review / what's on the roadmap / payment initiatives / do we have bandwidth / workload agent / roadmap / what's my team working on" | **`workload-agent`** | Live snapshot, report-only; manager profiles get the team view. |
| "help me prep for a 1:1 with [name] / what's [name] working on / status check on [name]" | **`manager-1on1-prep`** | **`role: manager` only**; one report; never DMs. |
| **"help me give feedback to [name]" / "SBI for [name]" / "prep a difficult conversation with [name]" / "hard conversation with [name]" / "growth plan for [name]" / "development plan for [name]" / "help me coach [name]"** | **`people-coaching`** | **`role: manager` only**; SBI / difficult conversation / growth plan. |
| "who's on my team / who works on [squad/domain/topic] / who should I talk to (or reach out to) about [topic] / what team owns [X]" | **Direct team/people lookup — no skill chain** | Profile + `COMPANY-SQUADS.md`; answers who, sends nothing. §2c. |
| "book a meeting with [name] / find time with [name] / schedule a sync with [name] / when are we both free / propose a time for [meeting]" | **`scheduling`** | On-demand; free/busy only; books only on confirmation. |

## Git and close-out

| Intent signal | Chain | Notes |
|---|---|---|
| **"design retrospective" / "retro this project" / "what did we learn from [slug]" / "reflect on this launch" / "close out this project"** | **`design-retrospective`** | Reflection from task-folder evidence; never auto-steers next work. |
| **"update my harness" / "get the latest harness" / "pull the harness updates"** | **Git autopilot update** (`harness/references/git-autopilot.md` § 6) | Only when `gitAutopilot` is on. Merges the harness's `main` into this branch; the team's `projects/` and `*.local` files stay. A conflict stops and lists files. |
| **"work on another project in parallel" / "open <slug> in a second window" / "two projects at once"** | **Git autopilot worktree** (`harness/references/git-autopilot.md` § 7) | Only when `gitAutopilot` is on. Second folder on its own branch, profile and context linked in. |
| **"undo the last change" / "undo my last save" / "take back the last save"** | **Git autopilot undo** (`harness/references/git-autopilot.md` § 4) | Only when `gitAutopilot` is on. Show what it undoes, ask once, then revert that save. An unsaved edit is undone in the file, not here. |
