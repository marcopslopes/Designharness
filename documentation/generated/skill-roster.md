# Skill roster

Generated from each skill's description by `scripts/generate-skill-surfaces.mjs`. Do not edit.
Two pointer skills stay in `harness/skills/` so old links resolve, and are not in this list.

| Skill | What it does |
|---|---|
| `accessibility` | Blocking pre-share checks for focus order, semantics, contrast, and ARIA. |
| `accessibility-decisions` | Documents accessibility decisions, tradeoffs, and engineering handoff specs so inclusive choices survive redesigns and staff changes. |
| `adaptive-interfaces` | Specs how a surface respects user/system preferences — reduced motion, contrast, text sizing, transparency, density — without inventing product dark mode. |
| `assumption-mapper` | Surfaces and organizes team/stakeholder assumptions before research or a build begins — separating what's actually known (sourced) from what's believed (unsourced), so the work is designed to learn rather than confirm a decision already made. |
| `audit` | The mandatory final gate before sharing any prototype or component — scans design-system violations, accessibility failures, off-brand copy, house pattern conformance, and global UX craft quality across every file touched this session, then (on PASS) prompts to push changes to the shared GitHub remote so other designers' clones stay in sync. |
| `benchmark` | Scored gap analysis comparing the company's own existing implementation of a flow against best-in-class examples — a judgment call, not a reference pull. |
| `case-study` | Writes a project's case study once, as content — the eight-chapter story (opening, problem, evidence, options, decision, live prototype, outcome, sources) — into `projects/<slug>/case-study.md`, sourced only from that task folder's `brief.md`, `findings.md` and `decisions.md`, plus the designer's journal entries for the project. |
| `cognitive-accessibility` | Evaluates mental load, wayfinding, working-memory demand, and decision complexity — COGA-style cognitive accessibility, not just contrast/ARIA. |
| `competitor-scan` | Targeted reference pull on what one named competitor does for one specific feature or flow. |
| `conceptual-model` | Defines the product's objects, relationships, states, and vocabulary independently of any interface — the most load-bearing design layer. |
| `content` | Content design assistant for writing and reviewing product screen copy. |
| `critique-prep` | Turns Figma (+ brief/BRD/docs page) into a short presenter script for a group design critique — frame, walk order, feedback ask, lenses to invite, blank capture sheet. |
| `decision-first-research` | Scopes and frames a research request around the actual decision it needs to unblock, instead of a method or a vague ask — names the decision, the risk if wrong, what's already known, the one blocking unknown, and the smallest study that answers it within the deadline. |
| `deck-builder` | Builds self-contained HTML presentation decks (case study, workshop / options review, stakeholder update) from an existing `projects/<slug>/` task folder or a pasted PRD/brief. |
| `design-debt-tracker` | Standalone triage and review of the per-project design debt register (`projects/<slug>/debt.md`). |
| `design-handoff` | Composes one developer-ready spec sheet from a design that is ready for engineering. |
| `design-kickoff` | The mandatory front door for ANY new project, feature, initiative, or design request in this repo, no matter how vague. |
| `design-rationale` | Writes down why a design decision was made — the options considered, the evidence behind the pick, and the trade-offs accepted — so it survives being questioned weeks or months later. |
| `design-retrospective` | Structured post-ship (or milestone) reflection — what worked, what didn't, what to carry forward. |
| `design-system` | Governs where style values live and whether a value already exists in `tokens.css` before anything is written. |
| `diagnostic` | Rapid audit across all design layers to identify bottlenecks and recommend where to focus next. |
| `docs-brief` | On-demand page drafting and creation in the team's docs tool (Confluence, Notion, or Google Docs) for a lean status/decision brief — NOT a research pass, NOT a PRD. |
| `figma-asset-sync` | Automated asset pipeline between Figma and codebase. |
| `figma-code-sync` | Automated Code Connect mapping between Figma components and codebase components. |
| `figma-effects-catalog` | Documentation and cataloging of custom Figma shader effects and fills. |
| `figma-library-manager` | Design system library management using get_libraries and search_design_system. |
| `figma-token-sync` | Bidirectional sync between Figma design variables and context/design-system/tokens.css. |
| `figma-ux-audit` | Runs a structured UX audit on a Figma page and places colour-coded annotation cards directly next to each screen, connected by dotted lines. |
| `harness-setup` | Guides the designer through customizing the harness with their existing design system, brand guidelines, and company context. |
| `ia-methods` | Plans, runs, and analyzes card sorting (how users mentally categorize content) and tree testing (whether users can find content in a given navigation structure) — the two evaluative/generative methods for information architecture and navigation decisions. |
| `icon-usage` | Sources every icon through the `Icon` primitive in `context/design-system/ds` (wrapping Tabler Icons) — never hand-drawn SVG. |
| `insight-writer` | Writes and pressure-tests user research insights using the key learning + why + consequence framework, distinguishes real insights from findings/observations/bugs/opinions, and runs a stakeholder "so-what" check on a draft insight or full report before it ships. |
| `inspiration-scouting` | Curates aesthetic and interaction references — including cross-domain — with explicit "what to take / what to leave" for each. |
| `interaction-design` | Specs interactive component/flow states and feedback timing — default, hover, focus, active, disabled, error, loading, success — across visual, screen reader, keyboard, and touch. |
| `interface-change-review` | Change-scoped UI craft review of uncommitted work, the current branch, or a named commit range — classifies findings as introduced, regression, or pre-existing. |
| `live-page-review` | Front door for reviewing a fetchable live or local URL: capture screenshot + DOM + accessibility tree (optional click-through in one browser session), classify the artifact, then hand off to the existing review skill. |
| `manager-1on1-prep` | Prep-doc generator for 1:1s and status checks with a direct report. |
| `mobile-shell` | Wraps every mobile/phone-frame Design Harness prototype in the shared PhoneShell component (hardware bezel, notch, iOS status bar, floating pill tab bar, home indicator, 16px screen padding) instead of one-off chrome per file. |
| `motion-choreography` | Specs, reviews, and plans purposeful animation for Design Harness / handoff — with frequency gating and mandatory reduced-motion alternatives. |
| `okr-goal-setting` | Writes a measurable design goal (an OKR-shaped objective + key results, or a single north-star-style metric) tied to a real business outcome — so design work has something concrete to be judged against instead of "this feels better." |
| `org-pack-builder` | Systematically builds `context/org-pack.local/` files (company context, domain vocabulary, voice, patterns, squads, archetypes) through three modes: MCP extraction (auto-populate from the team's tracker, docs tool, chat, and Figma), guided interview, or file upload. |
| `people-coaching` | Manager-gated coaching prep for one named report: feedback delivery (SBI), difficult-conversation prep, or a co-created growth plan. |
| `presenter` | Picks how to show a project's built screens to someone, from who's looking and what the designer wants back, then writes the small config file beside the screens that turns them into that view: Variants (one screen, a control panel to switch states, platforms and options), Compare (2–4 live frames side by side, numbered, with the chosen one marked), Stage (the prototype alone for research, with a hidden facilitator drawer) or Ideas (an index of independent ideas, one live at a time, with notes). |
| `product-strategy` | Connects user opportunities to business outcomes and solution bets using Opportunity Solution Trees and other strategy frameworks. |
| `publish-project` | On-demand publishing of a project's share pages to a public deploy URL — NOT the default behavior of any build/export step. |
| `research-agent` | Design discovery kickoff PRD scaffold for product designers. |
| `research-artifacts` | Turns synthesized research into a shareable understanding artifact — a persona (composite archetype with goals/frustrations/behaviors), an empathy map (Says/Thinks/Does/Feels for one user or segment), a journey map (one persona's end-to-end stages, touchpoints, emotions, pain points), an ability-spectrum map (where a feature breaks across vision/hearing/motor/cognitive ability — permanent, temporary, and situational), job stories (situation → motivation → outcome, plus functional/emotional/social jobs), or a service blueprint (frontstage/ backstage/support-process lanes behind a journey map's touchpoints). |
| `research-question-sharpener` | Rewrites, evaluates, and prioritizes vague or unanswerable stakeholder research questions into focused, story-based questions that actually produce usable data — and flags questions research can't answer at all, redirecting to the right method. |
| `research-shareout` | Designs how to share research findings so stakeholders engage and act — audience-first presentation structure (TL;DR → findings → recommendations → next steps), compelling insight framing, and when useful a creative/workshop format (bingo, insight auction, remote gallery, etc.). |
| `research-summary` | Writes scannable research summaries at two altitudes — a post-session summary of one interview/UT (quotes, themes, cross-session notes), or an executive topline / one-pager for a finished study (3–5 consequence-focused insights with evidence + recommendation). |
| `research-synthesis` | Turns raw interview/UT recordings and transcripts into tagged data, affinity clusters, and pattern candidates — either as a per-session 30-minute debrief run right after each interview, or a full tagging + affinity-diagramming pass across a completed study. |
| `responsive-patterns` | Content-driven breakpoint strategy, reflow, priority shifting, and 200% zoom / WCAG 1.4.10 discipline for multi-width layouts. |
| `review-report` | Turns an existing design critique into a scrollable HTML report (not slides, not a case-study story). |
| `roadmap-prioritization` | Turns a flat list of design tickets/tasks into a ranked order, using explicit evidence (research, usage, business goal) and honest effort ("appetite") instead of gut feel or whoever asked loudest. |
| `scheduling` | Standalone, on-demand meeting-scheduling capability — finds a slot, proposes it, and books only on explicit confirmation, **and** pulls real, sourced context (`projects/<slug>/`, a named ticket, the current conversation) into whatever gets drafted or booked, framed as things to cover rather than invented filler. |
| `screener-builder` | Builds a recruitment screener survey that filters for the right participants by behavior, not demographics — criteria list, 5–10 questions with knockout logic, ordered so unqualified people are screened out early. |
| `session-handoff` | Compacts the current chat into a durable handoff so a fresh agent session can continue without re-asking, re-discovering, or repeating mistakes. |
| `session-journal` | Appends a short journal entry about the designer's judgment in this session — what they asked, what got built, where they changed direction or overrode the agent (in their words), decisions taken, and screenshot links — to `designer-context.local/journal/YYYY-MM-DD-<project>.md`. |
| `stakeholder-alignment` | Maps who needs to agree with a design direction, what each of them actually cares about, where the real disagreement is, and drafts the specific ask/message that would move each one to yes — for any designer (IC or manager) who needs cross-functional buy-in on a direction, not just a status update. |
| `synthetic-user-testing` | Walks a prototype through key tasks *as* named personas / the company archetypes to surface friction before a real usability test. |
| `taste-feedback` | Mid-build aesthetic checkpoints on a Design Harness / Figma prototype — catches density, weight, emphasis, and hierarchy mismatches early, before a full critique. |
| `ticket-create` | On-demand ticket drafting and creation in the team's tracker (Jira, Linear, or GitHub Issues). |
| `ui-agent` | Build on-brand screens using only real design tokens and `context/design-system/ds` primitives. |
| `usability-test-guide` | Builds a usability test discussion guide, task script, or session plan — quantitative (metrics: task success, time on task, SEQ, SUS) or qualitative (TEDW-based screen-by-screen feedback on a mid-fidelity design). |
| `ux-pattern` | Reviews a flow's structure against how the company actually works, not just how it looks. |
| `workload-agent` | Autonomous planning & workload agent for a design team. |
| `workshop-whiteboard` | Runs a timed research-scoping whiteboard in a design workshop (or practice run) — given a vague prompt, maps problem → business impact → goals → method → recruitment → sample questions → synthesis → outcomes → timeline → next steps on a board the room can scan. |
| `writing` | Long-form prose writing assistant — articles, essays, case-study writeups, LinkedIn/blog posts, "how I work" pieces. |
