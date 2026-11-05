# Related files

Moved from `harness/ORCHESTRATOR.md` (2026-10-20, token-cost audit). The
index of files the orchestrator refers to — open when you need to find one,
not on every request.


| File | Role |
|---|---|
| `harness/skills/workload-agent/SKILL.md` | Live roadmap + designer execution boards — autonomous workload snapshot |
| `harness/skills/design-kickoff/SKILL.md` | Kickoff. The only copy of those rules. |
| `harness/logs/routing-standards.md` | How skill descriptions must be written so routing works; live roster audit (count source of truth — do not hardcode a number here) |
| `harness/logs/routing-log.md` | Global exceptions log — fallbacks, wrong matches, and approved plans, including ones with no task folder. Plain matches are in `skill-usage.jsonl` |
| `harness/logs/skill-benchmarking.md` | Append-only per-run PASS/BLOCKED + issue log from `audit` Step 3.4 — passive data for skill-output benchmarking, no auto rollup. Not `harness/skills/benchmark/SKILL.md` (competitor comparison) |
| `harness/logs/docs-freshness.md` | Append-only log of broad-docs refreshes (README / harness-flow / skill maps). Contract: `documentation/maintainers/docs-freshness.md` |
| `documentation/guides/confidence-autonomy.md` | Design rationale behind §2f's routing-confidence signal and §3a's autonomy dial |
| `documentation/maintainers/skill-benchmarking.md` | Design rationale behind `skill-benchmarking.md`'s skill-output benchmarking |
| `documentation/maintainers/evals.md` | Prospective routing-correctness checks inside `harness-audit` — the "did the right skill fire" half; complements `skill-benchmarking.md`'s "was the output good" half |
| `documentation/guides/spec-vs-runtime.md` | Honesty inventory — specified (markdown/agent) vs mechanical (detector/pre-commit). Do not call specified gates “enforced”. |
| `documentation/maintainers/docs-freshness.md` | When/how to refresh overview documentation so diagrams and skill rosters don't drift week-to-week |
| `harness/task-intake/SKILL.md` | This intake protocol, packaged as a reusable skill |
| `harness/harness-audit/SKILL.md` | Weekly self-improvement — reads the logs, proposes fixes. Also runs a **mandatory prospective routing eval** (`references/eval-prompts.md`) — no exceptions, same turn — after a §2/skill-description edit or any live-miss fix — see `documentation/maintainers/evals.md` |
| `harness/harness-audit/references/benchmark.md` | Cost benchmark: six fixed tasks run as fresh Claude Code chats (`npm run benchmark`), recording steps, tokens, cost, time, and whether the right skill loaded. `--routing` runs the eval prompts the same way |
| `projects/_template/` | Per-task folder schema (`brief.md`, `sources.md`, `findings.md`, `decisions.md`, `log.md`) |
| `harness/references/project-files.md` | Which project file owns which fact. No `wayfinding.md`. |
| `harness/skills/design-system/SKILL.md` | Pre-write token check + three-layer stylesheet rule; owns DS structural debt in `KNOWN-ISSUES.md` — not a substitute for `audit` |
| `harness/skills/audit/SKILL.md` | Mandatory final gate; also owns the post-PASS remote-sync prompt (§6). Checks 6–7: object failure modes + surface-vs-deeper (advisory). Shared table: `harness/references/ooux-failure-modes.md` |
| `harness/skills/` | Full content for every real skill in this repo — see `harness/logs/routing-standards.md`'s table for the current count. §2 routes most skills directly. Kickoff is only `design-kickoff`. |
| `harness/skills/manager-1on1-prep/SKILL.md` | Gated to `role: manager` profiles — 1:1 prep docs for one named report, sourced from `workload-agent` manager mode + `projects/` task folders. Never queries Slack DMs/private channels; human guide `harness/skills/manager-1on1-prep/GUIDE.md` |
| `harness/skills/people-coaching/SKILL.md` | Gated to `role: manager` — feedback (SBI) / difficult conversation / growth plan; human guide `harness/skills/people-coaching/GUIDE.md` |
| `harness/skills/scheduling/SKILL.md` | Standalone, on-demand find/propose/book capability, plus grounded context in what it drafts/writes — never a gate, never mandatory, not manager-specific. Same "own skill, composed by others" shape as `workload-agent`. Free/busy signal only, never event content. Reachable from general chat or composed by `manager-1on1-prep` |
| `harness/skills/ticket-create/SKILL.md` | On-demand ticket draft→confirm→create (Jira, Linear, or GitHub Issues) — lean work orders only; human guide `harness/skills/ticket-create/GUIDE.md` |
| `harness/skills/docs-brief/SKILL.md` | On-demand docs-page draft→confirm→create (Confluence, Notion, or Google Docs; formerly `confluence-brief`) — lean team pages; not PRD discovery drafts; human guide `harness/skills/docs-brief/GUIDE.md` |
| `harness/skills/case-study/SKILL.md` | The eight-chapter case-study story written once into `projects/<slug>/case-study.md` from the task folder; `deck-builder` and `writing` render it. Human guide `harness/skills/case-study/GUIDE.md` |
| `harness/skills/presenter/SKILL.md` | Picks how to show built screens (Variants control panel, Compare side by side, Stage for research, Ideas index) from who's looking and what you want back; writes `<Name>.variants.ts` / `.compare.ts` / `.stage.ts` / `.ideas.ts` beside the screens. Pages: `src/design-harness/pages/PresentationPages.tsx` |
| `harness/skills/deck-builder/SKILL.md` | Self-contained HTML presentation decks (3 templates; the case-study deck renders `case-study.md`) from a task folder or PRD — reuses the existing dark presentation skin, embeds live Design Harness prototypes via chromeless `?embed=1` routes instead of hand-copied lookalike markup. Saves to `artifacts/decks/` only — never auto-mirrors to `public/` |
| `harness/skills/publish-project/SKILL.md` | On-demand only — copies a picked `artifacts/decks/` file into `public/projects/<slug>/`, the only folder actually served publicly. Requires the ship packet to clear at exposure general, then an `audit` PASS; never auto-fires after a build, export, or audit |
| `harness/skills/writing/SKILL.md` | On-demand long-form prose (essay / case-study / short-form) from task-folder evidence — anti-slop pass, optional voice DNA, structure gate, always DRAFT; human guide `harness/skills/writing/GUIDE.md` |
| `harness/skills/session-handoff/SKILL.md` | On-demand chat compact for a fresh agent session — state-first; saves to `projects/<slug>/handoff.md`; human guide `harness/skills/session-handoff/GUIDE.md` |
| `harness/skills/assumption-mapper/SKILL.md` | Separates sourced "known" from unsourced "believed" before research/a build starts. Not part of kickoff. Human guide `harness/skills/assumption-mapper/GUIDE.md` |
| `harness/skills/research-question-sharpener/SKILL.md` | Rewrites vague stakeholder research questions into TEDW story-based ones; flags what qual research can't answer. Feeds `usability-test-guide`; human guide `harness/skills/research-question-sharpener/GUIDE.md` |
| `harness/skills/usability-test-guide/SKILL.md` | Quant or qual usability test guide for an existing prototype — fires from `design-kickoff` Step 1.5 or standalone; human guide `harness/skills/usability-test-guide/GUIDE.md` |
| `harness/skills/research-synthesis/SKILL.md` | Debrief/lightning synthesis/full tag+affinity — turns raw session data into pattern candidates, feeds `insight-writer`; human guide `harness/skills/research-synthesis/GUIDE.md` |
| `harness/skills/insight-writer/SKILL.md` | Key learning + why + consequence insight writing, plus the 5-question so-what check before anything ships; human guide `harness/skills/insight-writer/GUIDE.md` |
| `harness/skills/screener-builder/SKILL.md` | Behavior-first recruitment screener — feeds `usability-test-guide` / `research-synthesis`; human guide `harness/skills/screener-builder/GUIDE.md` |
| `harness/skills/decision-first-research/SKILL.md` | Names the decision + blocking unknown before method selection; feeds `design-kickoff` Step 1.5; human guide `harness/skills/decision-first-research/GUIDE.md` |
| `harness/skills/ia-methods/SKILL.md` | Card sorting + tree testing for navigation/IA questions — what Step 1.5's IA method-menu line routes to; human guide `harness/skills/ia-methods/GUIDE.md`
| `harness/skills/research-artifacts/SKILL.md` | Persona / empathy map / journey map / ability spectrum / job stories from synthesized research; human guide `harness/skills/research-artifacts/GUIDE.md` |
| `harness/skills/design-rationale/SKILL.md` | Documents an already-made decision for the record; human guide `harness/skills/design-rationale/GUIDE.md` |
| `harness/skills/accessibility-decisions/SKILL.md` | A11y decision records, tradeoffs, eng handoff; human guide `harness/skills/accessibility-decisions/GUIDE.md` |
| `harness/skills/interface-change-review/SKILL.md` | Git-scoped UI craft review; human guide `harness/skills/interface-change-review/GUIDE.md` |
| `harness/skills/live-page-review/SKILL.md` | Live/local URL capture + click-through, then hand off; human guide `harness/skills/live-page-review/GUIDE.md` |
| `harness/skills/review-report/SKILL.md` | Scrollable HTML critique report from existing findings (not slides, not a case-study story); human guide `harness/skills/review-report/GUIDE.md` |
| `harness/skills/critique-prep/SKILL.md` | Presenter script for a group design critique (never critiques the work); designer guide `documentation/skills/critique-prep.md` |
| `harness/skills/design-handoff/SKILL.md` | Composer eng spec sheet (`handoff-spec.md`); validate-before-send; designer guide `documentation/skills/design-handoff.md`; human guide `harness/skills/design-handoff/GUIDE.md` |
| `harness/skills/research-summary/SKILL.md` | Session summary + executive topline; human guide `harness/skills/research-summary/GUIDE.md` |
| `harness/skills/research-shareout/SKILL.md` | Audience-first share-out plan; human guide `harness/skills/research-shareout/GUIDE.md` |
| `harness/skills/workshop-whiteboard/SKILL.md` | Timed research-scoping board for workshops; human guide `harness/skills/workshop-whiteboard/GUIDE.md` |
| `harness/skills/roadmap-prioritization/SKILL.md` | Ranks named backlog items on evidence/goal-fit/effort with visible reasoning; human guide `harness/skills/roadmap-prioritization/GUIDE.md` |
| `harness/skills/okr-goal-setting/SKILL.md` | Objective + falsifiable key results tied to a sourced priority, no invented baselines; human guide `harness/skills/okr-goal-setting/GUIDE.md` |
| `harness/skills/stakeholder-alignment/SKILL.md` | Maps stakeholders/motivations/real disagreement shape, drafts sequenced asks, never sends without a go; human guide `harness/skills/stakeholder-alignment/GUIDE.md` |
| `harness/skills/design-debt-tracker/SKILL.md` | Standalone triage of `projects/<slug>/debt.md`; human guide `harness/skills/design-debt-tracker/GUIDE.md`; format contract `harness/references/project-debt-register.md` |
| `harness/skills/taste-feedback/SKILL.md` | Mid-build aesthetic checkpoints within Foundations; human guide `harness/skills/taste-feedback/GUIDE.md` |
| `harness/skills/motion-choreography/SKILL.md` | Motion spec / review / opportunities / audit→plan / vocabulary / list / scan / apply (sheet, menu, pill); human guide `harness/skills/motion-choreography/GUIDE.md` |
| `harness/skills/synthetic-user-testing/SKILL.md` | Persona/archetype walkthroughs — advisory only; human guide `harness/skills/synthetic-user-testing/GUIDE.md` |
| `harness/skills/design-retrospective/SKILL.md` | Post-ship reflection; reads session-journal entries; human guide `harness/skills/design-retrospective/GUIDE.md` |
| `harness/skills/inspiration-scouting/SKILL.md` | Aesthetic/cross-domain refs with take/leave; human guide `harness/skills/inspiration-scouting/GUIDE.md` |
| `harness/skills/cognitive-accessibility/SKILL.md` | Mental load / wayfinding / COGA-style review; human guide `harness/skills/cognitive-accessibility/GUIDE.md` |
| `harness/skills/responsive-patterns/SKILL.md` | Content-driven breakpoints + 200% zoom/reflow; human guide `harness/skills/responsive-patterns/GUIDE.md` |
| `harness/skills/interaction-design/SKILL.md` | Interactive state matrix + feedback timing; human guide `harness/skills/interaction-design/GUIDE.md` |
| `harness/skills/adaptive-interfaces/SKILL.md` | Prefers-* / text-size / density map; no product dark mode; human guide `harness/skills/adaptive-interfaces/GUIDE.md` |
| `harness/references/interaction-laws.md` | Citable cognitive/UX principles (Fitts's, Hick's, Jakob's, etc.) for `ux-pattern` and `design-rationale` to cite by name |
| `harness/references/ui-craft-rules.md` | Citable visual-craft heuristics (focal point, scan path, type hierarchy, 60–30–10, MAYA, …) for `ux-pattern`, `figma-ux-audit`, `taste-feedback`, and `design-rationale` — sibling to interaction-laws; never a full-screen checklist |
| `scripts/git-hooks/pre-commit.mjs` + `scripts/install-git-hooks.mjs` | Real mechanical wall (not advisory): blocks a commit on any `design-detector` finding in staged `.css` files. Installed automatically via `npm install`'s `prepare` script. Bypassable with `--no-verify`, on purpose — local tripwire, not a CI merge gate |
| `scripts/verify-audit-verdict.mjs` | Validates `audit`'s required typed-verdict JSON block (PASS/BLOCKED, cross-field checks) — the "a well-formed lie is still a lie" contract |
| `harness/references/anti-ai-writing.md` | Shared anti-AI-slop checklist (vocabulary, vague attribution, significance inflation, hedge-stacked predictions, unfilled placeholders, excessive structure, shallow -ing, false ranges, knowledge-cutoff guesses, heading restated, unraised objections, announce-then-state, clipped endings, chatbot leftover, formulaic sayings, performed candor, unused rejected alternative) for every stakeholder-facing doc — `design-kickoff`, `docs-brief`, `ticket-create`, `research-agent`, `case-study`, `deck-builder`, `writing`, `review-report`, `critique-prep`, and `design-handoff` all run it. Prose-only rhythm rules stay in `writing`'s own `slop-patterns.md` (including repeated sentence openings). Em-dash *chained hedges* only — no full dash ban. Missing-actor + current-behavior slivers are `design-handoff` only. |
| `harness/skills/scheduling/references/calendar-check.md` | Non-blocking Calendar connection check + cross-calendar visibility honesty rule — deliberately separate from `mcp-check.md`'s mandatory gate |
| `harness/skills/scheduling/references/meeting-context.md` | Grounded topic + talking points sourced from conversation/`projects/`/one named ticket — never invented filler; feeds Slack drafts and event descriptions |
| `harness/skills/competitor-scan/SKILL.md` | Targeted, factual reference pull on one named competitor's shipped pattern for one feature/flow — Mobbin if a designer already has it connected (optional), web fallback otherwise. Never judges the company's own screens |
| `harness/skills/benchmark/SKILL.md` | Explicit, requested scored gap analysis of a real the company screen against 2-3 best-in-class examples — calls `competitor-scan` for named competitors, cross-checks every gap against `COMPANY-PATTERNS.md`/`COMPANY-ARCHETYPES.md` before flagging it |
| `harness/skills/mobile-shell/references/ios-interaction-patterns.md`, `.../android-interaction-patterns.md`, `harness/skills/ui-agent/references/desktop-web-patterns.md` | Platform interaction/behavior layer (gestures, sheets, hover, focus order) — applied by `ui-agent` under §7's tokens/component/voice rules, never overriding them |
| `INSTALL.md` § Use it with a team | How a team shares one copy through its own Git remote (§6) |
| `harness/designer-onboarding/SKILL.md` | One-time per-clone setup (§0) |
| `COMPANY-SQUADS.md` | Canonical domain and squad map — onboarding + research |
| `COMPANY-SOURCES.md` | Global external resource link index (strategy Docs + other team-wide sources) — open matching rows; not a dump of doc bodies |
| `harness/designer-onboarding/references/mcp-check.md` | Step 0b — **mandatory** MCP gate (blocks until all 4 connected) — runs *after* Step 0a's greeting, never before |
| `documentation/setup/mcp-setup.md` | Human guide — connect your docs tool, tracker, chat, Figma, and Miro |
| `harness/references/ask-question-ui.md` | Repo-wide `AskQuestion` contract — all fixed-choice designer questions |
| `harness/references/session-start.md` | §0 and §0a in full — the `harness:context` first step, the profile result table, the narration rule, and org-pack resolution |
| `harness/references/classify-and-log.md` | §2e and §2f in full — classify, log only exceptions, the forbidden shortcuts, and routing confidence |
| `harness/references/harness-recall.md` | `npm run -s harness:recall -- "<topic>"`: what projects (any designer's), raw material, the inbox and past chats already hold, before a project, screen or insight |
| `harness/references/transcript-digest.md` | "Digest my chats": condenses past agent chats into `designer-context.local/how-i-work.md` and backfills misses (`scripts/transcript-digest.mjs`) |
| `harness/references/miss-log.md` | `MISS` / `MISROUTE` rows on pushback, and the wrap-up review that drafts fixes into `harness/logs/harness-proposals.md` |
| `scripts/harness-context.mjs` | `npm run -s harness:context` — profile, org pack, and project facts; `--ask` lists literal trigger-phrase hits |
| `harness/references/onboarding-gate.md` | Pointer only: the first step is `session-start.md`, the questions are `harness/designer-onboarding/SKILL.md` |
| `harness/references/resume-detection.md` | §2b in full — `brief.md` `Status:` decides whether an existing folder is kicked off; the no-STUB-at-end-of-turn rule |
| `harness/references/challenge.md` | §2h templates and buttons, how to fill the blanks, and what each button writes |
| `harness/references/routes.md` | The long tail of §2, grouped by phase. Holds the group rows' trigger phrases. Opened only when a §2 group row matches |
| `harness/references/routing-notes.md` | Notes only, one entry per route, keyed by the Chain name. No trigger phrases. Read by `harness-audit` and route edits, not at routing time |
| `harness/references/people-lookup.md` | §2c in full — direct "who works on X" lookup from the profile and `COMPANY-SQUADS.md`; the honesty rule |
| `harness/references/skill-finder.md` | Direct "what can you do / is there a skill for X" answer from the routing phrases and skill front matter; same match as the in-app `#/skills/assistant` page (`src/design-harness/skillFinder.ts`) |
| `harness/references/design-critique.md` | §2d in full — artifact type, drop-time `AskQuestion`, written chain, follow-up offers, carve-outs |
| `harness/references/autonomy-dial.md` | §3a in full — the per-task "how hands-on" question inside a plan block |
| `harness/references/remote-sync.md` | §6 in full — Git remote as the only sync; `audit`'s push prompt and gallery check |
| `harness/references/handoff-patterns.md` | §8 and §8a in full — handoff anti-patterns and handoff types, for `harness-audit` |
| `harness/references/project-inbox.md` | Project raw material (§5) — pasted/attached material saved verbatim to gitignored `projects/<slug>/raw/` and indexed in `sources.md` before summarizing; never edited, opened only on demand |
| `harness/references/project-stage.md` | Project stage line (§5) — stage worked out from which `projects/<slug>/` files have real content; derived, never stored, never a gate |
| `harness/references/gallery-card-enrichment.md` | Team Gallery card profile lookup (title / focusAreas / avatar) — primary at first eligibility; audit Step 3.5 safety net |
| `harness/references/source-links.md` | Repo-wide rule — link tickets, docs pages, chat threads, Figma, and Miro when cited in output |
| `harness/references/work-tools.md` | Which docs tool / tracker / roadmap / chat this team uses, and how each skill searches, reads, and writes them |
| `harness/designer-onboarding/references/onboarding-questions.md` | Exact domain → squad `AskQuestion` scripts |
| `harness/designer-onboarding/references/onboarding-workload-scope.md` | Auto `workload-agent` after profile — squad-scoped tracker snapshot |
| `harness/designer-onboarding/references/post-onboarding-handoff.md` | Personalized headline (not a recap table) + workload tables after snapshot; next-step menu strictly after the tables |
| `harness/designer-onboarding/references/handoff-menu-question.md` | `AskQuestion` menu — not chat prose |
| `.cursor/hooks.json` / `.cursor/hooks/designer-onboarding-check.sh` | The `sessionStart` hook for §0. Currently a no-op (Cursor bug, see the script). The working first step is `npm run -s harness:context` |
| `harness/references/intake.md` | §1 intake — a new design task with open gaps |
| `harness/references/plan-gate.md` | §3 plan gate — more than one skill |
| `harness/references/fallback.md` | §4 fallback — no routing row matched |
| `harness/references/state-rules.md` | §5 state — a project folder is in play |
| `harness/references/design-system-rules.md` | §7 design-system rules — loaded by `ui-agent` and `design-system` |
| `CLAUDE.md` | Claude Code auto-loads it. It points at `AGENTS.md` and does not repeat it. |
| `AGENTS.md` | Cursor auto-loads it. Git, the taste log, and the pointer into the orchestrator. |
| `context/design-system/tokens.css`, `context/design-system/ds/` | Design tokens and component implementations — source of truth behind §7 |
