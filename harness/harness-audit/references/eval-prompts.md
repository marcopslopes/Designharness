# Eval prompts — routing regression seed set

Read by `harness/harness-audit/SKILL.md` § Prospective routing check. Not
run automatically — CI doesn't run evals; this is a manually-run reference
list. See `documentation/maintainers/evals.md` for the full explainer/why.

**When to run it:** right after editing `harness/ORCHESTRATOR.md` §2 (any
row), a skill's frontmatter `description`, or adding a new skill — before
telling the designer the change is done.

**How to run it:** for each row below, run the prompt in a fresh chat (or
reason through it against the current §2 table and its full notes in
`harness/references/routing-notes.md`) and confirm the actual
`MATCHED <row>` equals `Expected match`. Log any mismatch the same way a
`harness-audit` finding gets logged — report, propose a diff, apply only
on explicit approval.

---

## Canonical cases — one per §2 row

| # | Prompt | Expected match | Why this one |
|---|--------|-----------------|--------------|
| 1 | "Let's start working on a referral leaderboard, city by city." | `design-kickoff` | Newness (no PRD yet) is the trigger, not vagueness — a specific-sounding one-liner still hits this row. Front door, checked first. |
| 2 | "Build the leaderboard screen from the approved PRD." | `ui-agent` (→ `design-system` → `mobile-shell`/`icon-usage` → `audit`) | Approved PRD already logged in `decisions.md` — iterating, not kickoff. |
| 3 | "Is this a real Foundations token or something I made up?" | `design-system` | Pre-write token check, not `audit` (that's reactive/post-write). |
| 4 | "Which icon should I use for share?" | `icon-usage` | Standalone if asked alone; usually rides inside a `ui-agent` chain otherwise. |
| 5 | "Does this screen's phone frame match navigation-profile's?" | `mobile-shell` | Device-chrome consistency only — not full `ui-agent` layout work. |
| 6 | "Does this flow match how the company normally structures onboarding?" | `ux-pattern` | Structure review, no build step. |
| 7 | "Any thoughts on this Figma?" (Figma URL pasted) | `ux-pattern` (+ drop-time `AskQuestion` first per §2d) | Design critique on existing work — never freestyle chat opinion. The critique gate is in `harness/skills/ux-pattern/SKILL.md`. |
| 8 | "Add annotations to this Figma with your feedback." | `figma-ux-audit` | Explicit canvas-annotation ask — different row from #7 even though both are critique-shaped. |
| 9 | "Give me ideas for the leaderboard's empty state." (task has an approved PRD) | `ux-pattern` (→ `research-agent` only if fresh discovery explicitly wanted) | Approved-task remainder — net-new "ideas for X" with no PRD would instead hit `design-kickoff` (#1). |
| 10 | "Does this button label sound right?" | `content` | Standalone or tail-end of a build chain. |
| 11 | "Check contrast and focus order on this screen." | `accessibility` | Standalone diagnostic — not the full pre-share `audit`. |
| 12 | "Run the audit before I share this prototype." | `audit` | Built Design Harness screen, not a raw Figma board (that's #7). |
| 13 | "Make this button taller and add a badge." (existing prototype) | `ui-agent` (loads `design-system` first) | Micro-edit size does not skip the chain — closes the account-settings freestyle-bypass failure mode. |
| 14 | "What's the design team's workload right now?" | `workload-agent` | Autonomous roadmap/DES/UXR snapshot, report-only. |
| 15 | "Help me prep for a 1:1 with Priya." | `manager-1on1-prep` if `role: manager`, else decline → point at `workload-agent`/`research-agent` | Gated row — expected match depends on profile, not just the phrase. |
| 16 | "Who works on referrals?" | Direct lookup, no skill chain (§2c) | Fast answer from profile + `COMPANY-SQUADS.md` — never a `research-agent` sweep. |
| 17 | "Book a meeting with Priya next week." | `scheduling` | On-demand, never a gate. |
| 18 | "What does Airbnb do for their waitlist flow?" | `competitor-scan` | Named competitor + named feature. |
| 19 | "Benchmark our checkout against 2-3 best-in-class examples." | `benchmark` | Explicit, requested — never auto-fires. Calls `competitor-scan` internally for named competitors. |
| 20 | "Create a design ticket for the profile banner placement." | `ticket-create` | Draft first, create only on explicit go — never a direct create. |
| 21 | "Make a stakeholder deck from the account-settings project." | `deck-builder` | Composes existing findings — never generates new analysis. |
| 22 | "Audit the harness — check routing coverage." | `harness-audit` | Self-audit of the orchestrator, not Design Harness `audit` (#12). |
| 23 | "What's a good restaurant near the office?" | Fallback (§4) — loud miss, never silent freestyle | Sanity check that true no-match cases still get logged, not answered straight. |
| 24 | "Can you put together a short write-up for my LinkedIn about the account-settings project?" | `writing` (short-form/social mode) | Added 2026-08-05 with the `writing` skill. Deliberately avoids the frontmatter's exact trigger phrasing ("draft a LinkedIn post") to test generalization beyond the description's literal wording, per `routing-standards.md`'s own untested-claim caveat on `design-kickoff`. |
| 25 | "Add a Confluence page under the Referrals folder about in-app entry points — what we have, what we did, and why." | `docs-brief` | Added 2026-08-05 with the skill. Team folder page, draft→go→create — not `research-agent` PRD scaffold, not `writing` essay. |
| 26 | "Check Slack #referrals for the icon bug thread." (task already approved) | `research-agent` (lightweight gap-fill mode) | Added 2026-08-06. Single named source, approved task — no docs draft, no PRD. |
| 27 | "Which research method should I use for validating the new onboarding flow?" (approved task, one open question) | `design-kickoff` (method recommendation mode, standalone) | Added 2026-08-06. Standalone trigger, not a full kickoff — reasons from constraints, not a generic method list. |
| 28 | "Help me choose between the toggle and the segment control for the profile tab." (both already exist as lab variants) | `ux-pattern` (decision framework mode) | Added 2026-08-06. Options already exist — different job from ideation (generating new ones) or critique (judging one alone). |
| 29 | "Should I sketch this or build it in Design Harness?" | `ui-agent` (fidelity check, Step 0.5) | Added 2026-08-06. Fires before committing to build — distinct from Step 1.5's review-board-vs-clickable-prototype, which only fires after that commitment. |
| 30 | "Did the change to the checkout flow actually help?" | `research-agent` (verdict synthesis mode) | Added 2026-08-06. Combines whatever qual+quant signal exists into one verdict — never fabricates a missing quant number. |
| 31 | "Before we start on the referral redesign, map out what we're assuming about users vs what we actually know." | `assumption-mapper` | Added 2026-08-08 with the skill. Composed into `design-kickoff` Step 0/1 when net-new — not a standalone kickoff trigger on its own. |
| 32 | "This list of stakeholder questions is way too vague, can you sharpen it before I run the interview?" | `research-question-sharpener` | Added 2026-08-08 with the skill. Rewrites via TEDW + transformation rules; does not build the session itself (`usability-test-guide`). |
| 33 | "Help me write a usability test script for the new checkout prototype." | `usability-test-guide` | Added 2026-08-08 with the skill. Fires standalone here (approved task + existing Design Harness prototype) — would instead be the *output* of `design-kickoff` Step 1.5 if the method hadn't already been decided. |
| 34 | "I just finished 6 interviews, help me tag and cluster the transcripts." | `research-synthesis` | Added 2026-08-08 with the skill (batch 2). Full tag+affinity mode — produces pattern candidates, not finished insights. |
| 35 | "Is 'users find checkout frustrating' a real insight or just an observation?" | `insight-writer` | Added 2026-08-08 with the skill. Insight-vs-finding assessment mode; would run the so-what check mode instead if a full draft insight/report were supplied for review. |
| 36 | "I need to recruit 8 people who've abandoned a cart in the last month." | `screener-builder` | Added 2026-08-08 with the skill. Behavior-first criteria, not demographics. |
| 37 | "Stakeholder wants a survey by Friday but hasn't said what decision it's for." | `decision-first-research` | Added 2026-08-08 with the skill. Runs the four-question knife before any method gets picked — would hand off to `design-kickoff` Step 1.5 once the decision/window is named. |
| 38 | "Can you plan a card sort for our settings navigation redesign?" | `ia-methods` | Added 2026-08-08 with the skill. Card sort mode; would run tree-test mode instead if the ask were about findability of an existing structure rather than categorization. |
| 39 | "Build a persona for the providers who track cancellations manually outside the app." | `research-artifacts` | Added 2026-08-09 with the skill. Persona mode; would run journey-map mode instead if the ask named a specific flow/stages, or empathy-map mode for a fast Says/Thinks/Does/Feels snapshot. |
| 40 | "Write up why we moved the cancellation policy from a modal to inline text — someone's going to ask in a month." | `design-rationale` | Added 2026-08-09 with the skill. Fires because the decision is already made; would route to `ux-pattern`'s decision framework mode instead if the choice were still open. |
| 41 | "Summarize today's interview with the solo provider — generative, no recommendations yet." | `research-summary` | Added 2026-08-09. Session mode; would run topline mode if ask were "executive one-pager for leadership." |
| 42 | "Stakeholders aren't acting on the cancellation study — plan a 30-min shareout for PM + eng." | `research-shareout` | Added 2026-08-09. Share-out plan; would hand to `deck-builder` only if they ask to build the HTML deck. |
| 43 | "Whiteboard this for Friday's workshop: we want more people using recurring appointments." | `workshop-whiteboard` | Added 2026-08-09. Workshop board; not interview-prep framing. |
| 44 | "I have five things on my plate and no time this sprint — help me figure out what matters first." | `roadmap-prioritization` | Added 2026-08-09 from a gap-scan against the roster. Ranks already-named items; would route to `design-kickoff` instead if the items were unscoped net-new ideas rather than already-named tasks. |
| 45 | "What should our goal be for the referral entry-points project?" | `okr-goal-setting` | Added 2026-08-09. Objective + key results; would route to `roadmap-prioritization` instead if a goal already existed and the ask was to rank work against it. |
| 46 | "PM wants the full redesign now, eng wants to stage it — help me get alignment." | `stakeholder-alignment` | Added 2026-08-09. Fires because agreement isn't yet reached; would route to `design-rationale` instead once alignment lands and a record is needed. |
| 47 | "Show me the design debt on referrals — anything aging?" | `design-debt-tracker` | Added 2026-08-09 from a gap-scan against the roster. Standalone triage; post-audit fix-or-log AskQuestion still lives in `audit`. |
| 48 | "Taste check this screen — is the density right?" | `taste-feedback` | Added 2026-08-09. Mid-build craft; not critique/`audit`. |
| 49 | "Motion spec for the success check — with reduced motion." | `motion-choreography` (Mode 1 Spec) | Added 2026-08-09. Specs only; `ui-agent` implements. Frequency gate required. |
| 62 | "What could be animated here — feel more alive but don't overdo it." | `motion-choreography` (Mode 3 Opportunities) | Added 2026-08-09. Opportunities + required Rejected; propose-only. |
| 63 | "Review the animations on this sheet transition." | `motion-choreography` (Mode 2 Review) | Added 2026-08-09 from a motion-craft fold-in. Before\|After\|Why table + Block/Approve; no implement. |
| 64 | "Audit the motion on this screen and write fix plans." | `motion-choreography` (Mode 4 Audit→plan) | Added 2026-08-09. Read-only; wait for pick; self-contained plans. |
| 50 | "Walk through this as a busy provider — synthetic UT." | `synthetic-user-testing` | Added 2026-08-09. Never claims validation; not `usability-test-guide`. |
| 51 | "Retro the referral entry-points project — what did we learn?" | `design-retrospective` | Added 2026-08-09. Not a metrics verdict (`research-agent`). |
| 52 | "Mood board for calm empty states — cross-domain OK." | `inspiration-scouting` | Added 2026-08-09. Not `competitor-scan` / `benchmark`. |
| 53 | "Debate wizard vs single-page onboarding — argue both sides." | `ux-pattern` (debate mode) | Added 2026-08-09. Distinct from decision-framework phrasing ("which should I pick?"). |
| 54 | "Cognitive load check on this multi-step form — stressed provider." | `cognitive-accessibility` | Added 2026-08-09. Not blocking `accessibility` alone. |
| 55 | "Breakpoint strategy for this layout — and a 200% zoom check." | `responsive-patterns` | Added 2026-08-09. Not `mobile-shell`. |
| 56 | "State matrix for the share CTA — include loading and error." | `interaction-design` | Added 2026-08-09. Specs only; `ui-agent` builds. |
| 57 | "Adaptive interface check — reduced motion and text size. Also dark mode?" | `adaptive-interfaces` | Added 2026-08-09. Must decline the company product dark mode. |
| 58 | "Ability spectrum for accept referral — who can and can't use this?" | `research-artifacts` (Mode 4) | Added 2026-08-09 from an accessibility gap-scan. Not inventing disability personas. |
| 59 | "Document this a11y decision and hand off to eng." | `accessibility-decisions` | Added 2026-08-09. Not general `design-rationale` alone; not diagnostic `accessibility`. |
| 60 | "Help me give feedback to Alex — SBI on the review handoff." (manager profile) | `people-coaching` | Added 2026-08-09 from a manager-role skill batch. Not `manager-1on1-prep`. |
| 61 | "Growth plan for Sam." (IC / product profile) | `people-coaching` (decline) | Added 2026-08-09. Must decline; same gate class as `manager-1on1-prep`. |
| 65 | "Review my branch for UI craft before I push." | `interface-change-review` | Added 2026-08-09 from a craft-review gap-scan. Not pre-share `audit`; must classify Introduced / Regression / Pre-existing. |
| 66 | "Context is full — write a handoff so I can continue in a fresh chat." | `session-handoff` | Added 2026-08-09 from a handoff-craft pass. State-first compact; not onboarding handoff menu; not `design-retrospective`. |
| 72 | "Review this live page: https://example.com/pricing — click Continue then Pay." | `live-page-review` | Added 2026-08-18. Non-Figma URL + review/click-through. Capture then hand off; not Figma critique; not Design Harness `audit` share PASS from capture alone. |
| 73 | "Turn this critique into an HTML report." (findings.md already written) | `review-report` | Added 2026-08-19. Packages existing findings as a scroll article. Not slides (`deck-builder`). Not a case-study story (`writing`). Not a new capture (`live-page-review`). |
| 74 | "Write job stories for providers filling a last-minute cancellation — JTBD, not a persona." | `research-artifacts` (Mode 5) | Added 2026-08-31. Jobs, not who (persona) and not bets (`product-strategy`). |
| 75 | "What is invites? Is there a project on that?" | `research-agent` | Added 2026-09-01 from a real live MISROUTE: the ask was answered from local file names instead of a live docs/tracker/chat sweep. Updated 2026-10-31: a lookup is not a new bet, so it does not open `design-kickoff`. Fail if it stops at the PRD gate or answers from `projects/` file names alone. |
| 76 | "Prep me for critique Thursday — here's the Figma." (Figma URL pasted) | `critique-prep` | Added 2026-09-02 with the skill. Presenter script, never a critique. Not #7 (`ux-pattern`), not #21 slides, not #24 case-study prose, not #42 research share-out. |
| 77 | "Design handoff this design — write the developer-ready spec." (Figma URL pasted) | `design-handoff` | Added 2026-09-04 with the skill. Eng spec composer → `handoff-spec.md`. Not #66 session compact, not #20 ticket, not #40 rationale, not #59 a11y ADR, not #56 state matrix alone. |
| 78 | "Use the writing skill on this article — run anti-slop and show how it will read." (full article pasted) | `writing` (existing-article pass) | Added 2026-09-06 from a live ask. Checklist on existing prose; paste is the source. Not #73 critique HTML report, not #21 slides, not a new essay from `projects/`. |
| 79 | "Continue the clients list redesign." | iterating row (`ui-agent` chain) **+ project stage line first** | Added 2026-10-11 with the stage line (§5, `harness/references/project-stage.md`). Folder has screens + findings → line reads `stage building/reviewing (…)`, then summary + next step. Not `design-kickoff` (brief approved), not `session-handoff`. Fail if the stage line is missing, is stored in a file, or blocks for an answer. |
| 80 | "Here's the transcript from today's referrals sync, capture the decisions." (transcript pasted, approved `invite-friends` task) | `research-agent` (lightweight gap-fill) **+ inbox save first** | Added 2026-10-11 with the project inbox (§5, `harness/references/project-inbox.md`). Transcript saved verbatim to `projects.local/<slug>/inbox/2026-10-11-…-transcript.md` with header, then synthesized into `findings.md` citing that path. Fail if saved under tracked `projects/<slug>/`, if only the summary survives, or if it routes to `design-kickoff` / `research-synthesis` (#34 is a multi-interview study). |
| 81 | "Build the case study for the account-settings project." | `case-study` | Added 2026-10-15 with the skill (split out of `deck-builder`). Writes `projects/<slug>/case-study.md` with a `Source:` line per chapter, then offers slides / prose / stop. Fail if it builds slides or prose directly, invents a chapter the folder can't fill, or routes to `review-report`. |
| 82 | "Make a case study deck for checkout." (no `case-study.md` in the folder yet) | §3 PLAN: `case-study` → `deck-builder` | Added 2026-10-15. The deck renders `case-study.md`; with none, both skills run, so the plan shows and waits for go. Fail if `deck-builder` writes the chapters itself or runs without the plan. |
| 83 | "Make me a short status video for leadership on account-settings." | `deck-builder` (stakeholder template) | Added 2026-10-15 when the narrated video mode was dropped. Builds the stakeholder deck and says in one line that narration isn't offered. Fail if it promises audio / timed playback or points at the retired status-overview video HOWTO. |
| 84 | "How should I show the wallet home to the PM? They need to pick between balance-first and payout-first." (screens built) | `presenter` → Compare | Added 2026-10-15 with the skill. Who and what-back are both in the ask, so no AskQuestion; writes `screens/WalletHome.compare.ts` with the rejected layout reached through a prop, `chosen` cited from `decisions.md`. Fail if it copies the screen, builds slides (`deck-builder`), or marks a frame chosen without a `decisions.md` entry. |
| 85 | "Let engineering flip through every state of the wallet on both platforms." | `presenter` → Variants | Added 2026-10-15. Writes `screens/WalletHome.variants.ts` (platform + state controls). Fail if it routes to the storyboard, builds one page per state, or edits the screens without `ui-agent` rules. |
| 86 | "Mock up three directions for the empty state so I can pick one to build." (nothing built) | `ui-agent` (review board) | Added 2026-10-15. Pre-build pick → static review board. Fail if it routes to `presenter` Compare, which needs built screens. |
| 87 | "Set the wallet prototype up for Thursday's research session. I don't want participants seeing any controls." (screens built) | `presenter` → Stage | Added 2026-10-15 with Stage. Writes `screens/WalletHome.stage.ts` with steps named as goals and tied to `brief.md` job stories. Fail if it writes a test script (`usability-test-guide`), or names steps after what to tap. |
| 88 | "Plan a usability test for the wallet and set up the prototype for it." | §3 PLAN `usability-test-guide` → `presenter` (Stage) | Added 2026-10-15. Stage steps come from the guide's tasks. Fail if one skill does both, or the Stage is written before the tasks exist. |
| 89 | "Show the team every idea we had for the wallet home, with why we kept or dropped each." | `presenter` → Ideas | Added 2026-10-15. Writes `screens/WalletHome.ideas.ts`; each Status note cites `decisions.md`. Fail if it routes to `case-study` or a deck. |
| 90 | "Build the wallet home screen on iOS." (approved brief, no screens yet, Settings defaults) | `ui-agent` (+ `mobile-shell`), plan lists the storyboard | Added 2026-10-15 when the storyboard became a default. Builds `screens/WalletHome.storyboard.ts` after the screen renders, without an `AskQuestion`. Fail if it asks yes/not-now with `storyboardOffer` on, or skips the storyboard. Pass if it asks when `storyboardOffer` is `false`. |
| 91 | "Go with next payout first, build that." (after a variant fork; `decisions.md` now has a **Chosen:** entry, no `case-study.md`) | `ui-agent` → `case-study` after-build mode | Added 2026-10-15. The build's plan lists the case study; it writes `case-study.md` as a DRAFT without waiting on the outline, then offers slides / prose / stop. Fail if it writes one before any decision exists, rewrites an existing `case-study.md`, or builds a deck. |
| 92 | "Add the empty state to the clients list — a manager with no clients yet." | `ui-agent` (+ `content` for the copy) | Added 2026-10-16 when states stopped being files. Adds an optional string prop with today's default (e.g. `clients="none"`) and links it as `screens/…Page.tsx?clients=none`. Fail if it writes a `screens/states/` file or copies the screen. |
| 93 | "Grill me on the payout-hold plan until we agree." (plan already in the task folder) | `ux-pattern` (grill mode) | Added 2026-10-18. One question at a time. Fail if it runs debate (#53), a criteria table (#28), critique findings, or a full kickoff. |
| 94 | "Wayfind the payouts work — map the decisions, plan don't build." | `design-kickoff` (wayfinding mode) | Added 2026-10-18. Writes the map into `decisions.md` only. Fail if it starts the PRD sequence (#1), drafts `brief.md`, writes `wayfinding.md`, or builds screens. |
| 95 | "Let's explore payouts." | `design-kickoff` (full sequence) | Added 2026-10-18 as the pair to #94. Vague explore stays the front door. Fail if it runs wayfinding mode. |
| 96 | "Is the settings sheet a persuade surface or an operate surface?" | `taste-feedback` | Added 2026-10-18. Names Operate/Read and stays inside tokens. Fail if it invents a palette (`design-system` token invention) or runs a full critique. |
| 97 | "Does the system already animate this sheet, or do we need custom motion?" | `motion-choreography` | Added 2026-10-18. Already-covered gate: sheet recipe wins when it covers the purpose. Fail if it specs a new curve before checking the catalog. |
| 98 | "Put three color tints of the wallet side by side so the PM can pick." (screens built) | `presenter` → Compare, then stop | Added 2026-10-18. Divergence: accent-only frames are one direction. Fail if it writes three configs that differ only by color, or routes to `deck-builder`. |
| 99 | "Put this decision write-up in Notion under Design / Briefs." | `docs-brief` | Added 2026-10-20 with the work-tools contract. Notion parent page, draft→go→create. Fail if it says it needs Confluence, or runs a `research-agent` sweep. |
| 100 | "Open a Linear issue for the empty-state fix and one for eng." | `ticket-create` (design + eng pair) | Added 2026-10-20. Linear teams as containers, "blocked by" link. Fail if it writes JQL, asks for a Jira project, or creates before go. |
| 101 | "Catch me up on checkout." (profile: `Work tools: docs=notion, tracker=github, chat=slack`) | `research-agent` | Added 2026-10-20. Sweep uses Notion + GitHub Issues + Slack. Updated 2026-10-31: a lookup does not open `design-kickoff`. Fail if it stops at the PRD gate, declines for lack of Atlassian, or files to Confluence. |
| 102 | "Journal this." (after a session on `invite-friends` where the designer overrode the agent once) | `session-journal` | Added 2026-10-29 when `session-journal` replaced `design-memory`. One entry under 20 lines in `designer-context.local/journal/YYYY-MM-DD-invite-friends.md`, override quoted verbatim. Not #66 `session-handoff` (no `handoff.md`), not `design-retrospective`. Fail on a transcript dump or a write to a tracked file. |
| 103 | "Wrap up." (on `invite-friends`, truth block has three `unknowns`, one with `blocks:`) | `session-journal` (wrap up) | Added 2026-10-29 with the handoff nudge. Journal entry, then one handoff row in `projects/invite-friends/log.md`: Done, Next as state, Open = the blocking unknown verbatim, then `+2 more in the brief`. Not #66 (no `handoff.md`), not #51 retro. Fail if Open invents a question or Next starts with a verb. |
| 104 | "Share this." (on `ana/invite-friends`, screens audited since the last change) | Git autopilot share (`harness/references/git-autopilot.md` § 5) | Added 2026-10-30. Save if needed, then `share`; reply with the branch link. Not `publish-project` (no deployed site). Fail if it pushes `main`, force pushes, or runs `git push` by hand. |
| 105 | "Undo the last change." (on `ana/invite-friends`, one autopilot save) | Git autopilot undo (§ 4) | Added 2026-10-30. Shows the save's summary and files, asks once, then `undo --yes`. Fail if it runs `git reset`, rewrites history, or undoes without asking. |
| 106 | "Update my harness." | Git autopilot update (§ 6) | Added 2026-10-30 with team mode. Runs `update`; says the line. Fail if it runs `git pull`/`merge` itself, touches `projects/`, or resolves a listed conflict without asking. |
| 107 | "I want to work on the payouts project in parallel." | Git autopilot worktree (§ 7) | Added 2026-10-30. Runs `worktree payouts`, gives the folder path, says to open it in its own window. Fail if it switches this folder's branch. |
| 108 | "Wrap up." (on `ana/invite-friends`, a skill file also edited) | `session-journal` → Git autopilot save (§ 3a) | Added 2026-10-30. Save stops and lists the harness file; one AskQuestion: Keep it local / Suggest it to the harness. Fail if it commits the skill file on the project branch. |
| 109 | "What is the wallet home for?" | `research-agent` | Added 2026-10-31. A question is not a new bet. Fail if it opens `design-kickoff` or stops at the PRD gate. |
| 110 | "Any thoughts on the wallet home?" (screens already built) | `ux-pattern` | Added 2026-10-31. A critique is not a new bet. Fail if it opens `design-kickoff` or stops at the PRD gate. |
| 111 | "Rewrite the wallet home empty-state line." | `content` | Added 2026-10-31. Copy is not a new bet. Fail if it opens `design-kickoff` or stops at the PRD gate. |
| 112 | "Import this Figma frame into the wallet project." (screens already exist) | `ui-agent` | Added 2026-10-31. An import is not a new bet. Fail if it opens `design-kickoff` or stops at the PRD gate. |
| 113 | "Where should I focus?" | `diagnostic` | Added 2026-10-31. Triage across layers. Fail if it opens `design-kickoff` or starts a build. |
| 114 | "Define the objects and map how they relate before we draw screens." | `conceptual-model` | Added 2026-10-31. Product object model, after kickoff language and before screens. Fail if it opens domain-mapping mode or `ui-agent`. |
| 115 | "Build our org-pack from the company docs." | `org-pack-builder` | Added 2026-10-31. Company-pack setup. Fail if it drafts a project brief. |
| 116 | "Build an opportunity solution tree for payouts." | `product-strategy` | Added 2026-10-31. OST, not a ranked roadmap. Fail if it opens `roadmap-prioritization` or `design-kickoff`. |
| 117 | "Publish this project." | `publish-project` | Added 2026-10-31. A deployed site, after an `audit` PASS. Fail if it runs Git autopilot share or `git push`. |
| 118 | "Sync tokens from Figma into tokens.css." | `figma-token-sync` | Added 2026-10-31. Variable drift. Fail if it exports icons or maps Code Connect. |
| 119 | "Download the icons from Figma." | `figma-asset-sync` | Added 2026-10-31. Asset pipeline. Fail if it syncs tokens or audits libraries. |
| 120 | "Map these Figma components to code with Code Connect." | `figma-code-sync` | Added 2026-10-31. Code Connect. Fail if it syncs tokens or downloads assets. |
| 121 | "What shader effects do we have?" | `figma-effects-catalog` | Added 2026-10-31. Shader catalog. Fail if it runs `figma-library-manager`. |
| 122 | "What libraries do we have in Figma?" | `figma-library-manager` | Added 2026-10-31. Library search before a new component. Fail if it catalogs shaders. |
---

## Known ambiguous pairs (worth re-checking after any related edit)

These are the rows most likely to regress into each other — re-run both
sides of a pair whenever either row changes:

| Pair | Distinguishing signal |
|------|------------------------|
| #7 `ux-pattern` critique vs #12 `audit` | Raw Figma/screenshot/opinion ask → `ux-pattern`. Built Design Harness screen + "ready to share" → `audit`. |
| #7 `ux-pattern` critique vs #8 `figma-ux-audit` | Written findings vs explicit canvas-annotation ask — see §2d's `AskQuestion` at drop-time. |
| #7 `ux-pattern` critique vs #76 `critique-prep` | "Audit / any thoughts / gut check" → #7. "Prep me for critique" / presenter script → #76 (never critiques). Ambiguous "I present Thursday" + Figma → AskQuestion prep vs critique vs both. |
| #21 `deck-builder` vs #76 `critique-prep` | Slides / deck / stakeholder presentation → #21. Speakable critique-room script → #76. Ambiguous "help me present this" with no format → ask script vs slides. |
| #24 `writing` vs #76 `critique-prep` | Prose case-study / essay → #24. Critique presenter script → #76. "Case study for critique" without format → ask. |
| #42 `research-shareout` vs #76 `critique-prep` | Research readout to stakeholders → #42. Design-critique presenter script → #76. |
| #1 `design-kickoff` vs #2 `ui-agent` iterating | Approved PRD/gate in `decisions.md` (or explicit kickoff opt-out) is the only thing that moves a request from #1 to #2 — not phrasing. |
| #13 micro-edit `ui-agent` vs freestyle chat fix | Any `.tsx`/CSS edit on `src/design-harness/**` must load `ui-agent` + `design-system` first, regardless of how small the ask sounds ("just tweak," "quick fix"). |
| #14 `workload-agent` vs #15 `manager-1on1-prep` | Named single report + manager profile → `manager-1on1-prep`. Team-wide or IC profile → `workload-agent`. |
| #81 `case-study` vs #21 `deck-builder` vs #24 `writing` (case-study mode) | All three touch "write up how we got here". No format named → #81 writes `case-study.md`, then offers a format. Slides named → #21, prose named → #24; either one with no `case-study.md` yet → PLAN with #81 first (#82). Neither renderer writes chapters itself. |
| #84 `presenter` vs #21 `deck-builder` vs #76 `critique-prep` | "Show / present this to <person>" on built screens with no format named → #84 (live frames). Slides named → #21. What to say in a crit → #76. |
| #84 `presenter` Compare vs #86 `ui-agent` review board | Built screens, compared live → #84. Mockups, picking which to build → #86. |
| #87 `presenter` Stage vs #33 `usability-test-guide` | Setting up the prototype participants see → #87. Tasks, script, questions → #33. Both named → PLAN, guide first (#88). |
| #89 `presenter` Ideas vs #81 `case-study` | Every idea, live, browsable → #89. The decision story told in order → #81. |
| #81 `case-study` vs #73 `review-report` | Project story (problem → options → decision → outcome) → #81. One critique's findings packaged as a report, no decision arc → #73. A report can feed chapter 3 evidence; it is never the case study. |
| #73 `review-report` vs #21 `deck-builder` | "Proper report" / HTML report of **these findings** → `review-report` (scroll article). Deck / slides / stakeholder presentation → `deck-builder`. Ambiguous "write this up as HTML" with no format → ask report vs slides. |
| #73 `review-report` vs #24 `writing` | Critique findings packaged as a report (no ship decision) → `review-report`. Project story as prose → `writing` case-study mode, rendering `case-study.md` (#81). |
| #78 `writing` existing-article vs #73 `review-report` | Pasted prose + anti-slop / "how will this read" → #78. Existing `findings.md` packaged as an HTML critique report → #73. |
| #73 `review-report` vs #72 `live-page-review` | Review this URL (no findings yet) → `live-page-review` first. Package the critique that already ran → `review-report`. |
| #25 `docs-brief` vs `research-agent` / `design-kickoff` | Explicit “add/put a page in this folder” for an in-flight topic → `docs-brief`. “Brief me / kick off / discover” → research/kickoff PRD scaffold. |
| #25 `docs-brief` vs #24 `writing` | Page under a docs parent (Confluence, Notion, or Google Docs) → `docs-brief`. Essay / LinkedIn / chat prose DRAFT → `writing`. |
| #26 `research-agent` lightweight gap-fill vs #1 `design-kickoff` | Already-approved task + one named source → lightweight gap-fill. Net-new topic, no approved task → `design-kickoff` front door, full sweep. |
| #27 `design-kickoff` method-rec vs `competitor-scan`/`benchmark` | "Which primary research method" → method-rec. "How do others solve this" (the method menu's own "competitive teardown only" branch) → routes onward to `competitor-scan` instead of recommending a study. |
| #28 `ux-pattern` decision-framework vs #13/variant-fork (`ui-agent`) | Options already exist, designer asks to choose *before/outside* a build session → decision-framework. Ambiguity surfaces *mid-build* with no existing steer → variant-fork builds the options itself. Both log to `decisions.md` — never both fire on the same choice. |
| #28 `ux-pattern` decision-framework vs #19 `benchmark` | Internal direction A vs. B → decision-framework. the company vs. *external* best-in-class examples → `benchmark`. |
| #29 `ui-agent` Step 0.5 fidelity check vs its own Step 1.5 (board vs. clickable) | Step 0.5 fires first, answers "should we build at all, and in what medium." Step 1.5 fires only after that's settled, answers "review board or clickable prototype" for a multi-screen build. Sequential, not competing — Step 0.5 recommending "clickable Design Harness prototype" is what lets Step 1.5 even become relevant. |
| #30 `research-agent` verdict-synthesis vs its own `testing/` formal-study ownership | A planned `test-plan.md` already exists for this question → append verdict as a new dated entry under its own `## Results`. No formal plan (ad-hoc quant+qual) → append straight to `findings.md`, don't retroactively manufacture a `test-plan.md`. |
| #31 `assumption-mapper` vs #1 `design-kickoff` | Net-new topic, no task folder yet → `design-kickoff` fires first (front door); it composes `assumption-mapper` internally at Step 0/1. Only fires as a standalone top-level match when a task folder already exists and a fresh open question surfaces mid-flight. |
| #27 `design-kickoff` method-rec vs #33 `usability-test-guide` | Method-rec (#27) answers "which method should I use" when it's still undecided. `usability-test-guide` fires once the method is already settled (either method-rec just recommended UT, or the designer already knows they want one) — sequential, same relationship as #29 Step 0.5 vs Step 1.5, not competing. |
| #32 `research-question-sharpener` vs #33 `usability-test-guide` | Sharpener rewrites/prioritizes a raw question list — no session structure. `usability-test-guide` builds the actual session (tasks/script) and may call the sharpener internally on its own draft questions. A request naming both ("here's a rough question list, plan the UT") runs sharpener first, then feeds the output into the guide. |
| #33 `usability-test-guide` vs #12 `audit` / `ui-agent` | Writing the test guide itself never touches `.tsx`/CSS — if the prototype doesn't exist yet, hand off to `ui-agent` first; once built and ready to share, `audit` is a separate, later gate, not something this skill runs. |
| #34 `research-synthesis` vs #35 `insight-writer` | Synthesis finds and tags patterns; it stops at "here's what's emerging and how strong." Insight-writer turns a pattern into a full key-learning/why/consequence writeup and pressure-tests it. A request naming both ("synthesize this and write up the insights") runs synthesis first, then feeds clusters into insight-writer. |
| #37 `decision-first-research` vs #27 `design-kickoff` method-rec | Decision-first fires when the *decision itself* hasn't been named yet ("we need research" with no framed call). Method-rec (#27) fires once the decision and open question are already clear and only the method is undecided. Decision-first's output (named decision + window) is method-rec's input when both are needed. |
| #38 `ia-methods` vs #27 `design-kickoff` method-rec | Method-rec's menu names "card sort / tree test" as one line item for structural/IA questions; `ia-methods` is what that line routes to once picked. Method-rec doesn't run the study itself. |
| #39 `research-artifacts` vs #34 `research-synthesis` | Synthesis finds and tags patterns from raw data; it never produces a persona/empathy-map/journey-map itself. `research-artifacts` takes synthesis's output (or a named the company archetype) and turns it into the shareable artifact. Sequential, not competing. |
| #40 `design-rationale` vs #28 `ux-pattern` decision-framework | Decision framework weighs options *before* a pick is made. `design-rationale` documents *after* the pick is final, for a record that survives being questioned later. A request naming both ("help me choose, then write it up") runs decision-framework first, then feeds the chosen option into `design-rationale`. |
| #41 `research-summary` vs #35 `insight-writer` | Session/topline summaries are scannable snapshots; insight-writer produces full key-learning/why/consequence. Topline may cite insights already written. |
| #42 `research-shareout` vs #21 `deck-builder` | Shareout designs audience + spine + format; deck-builder builds the HTML file when slides are the deliverable. |
| #43 `workshop-whiteboard` vs #37 `decision-first-research` | Whiteboard is the live/timed board exercise; Decision Brief is the durable written artifact. Board often feeds the brief. |
| #44 `roadmap-prioritization` vs #1/#2 `design-kickoff`/iterating | Kickoff decides *what* to build on net-new, unscoped work; `roadmap-prioritization` only ranks items that are already named/scoped, never picks new ones. |
| #45 `okr-goal-setting` vs #44 `roadmap-prioritization` | Goal-setting produces the objective/KRs; prioritization *consumes* a stated goal as one ranking axis. A request naming both ("set the goal, then rank these against it") runs goal-setting first. |
| #46 `stakeholder-alignment` vs #40 `design-rationale` | Alignment maps stakeholders and drafts asks *before* agreement is reached; rationale documents the pick *after* it's final. Sequential — alignment first, rationale once resolved. |
| #47 `design-debt-tracker` vs `audit` Step 3.25 | `audit` writes rows via fix-or-log. Critique writes non-blocking rows itself and asks only for a blocker. Debt-tracker *reviews/triages* the register standalone. "Any thoughts" stays #7 / #110 `ux-pattern`, not this skill. |
| #48 `taste-feedback` vs # design-critique `ux-pattern` | Taste is mid-build density/weight checkpoints; critique is full structure/heuristic review after (or instead). |
| #50 `synthetic-user-testing` vs # usability-test-guide | Synthetic is lab empathy walkthrough; UT guide plans real sessions with participants. |
| #52 `inspiration-scouting` vs `competitor-scan` / `benchmark` | Inspiration = feel + take/leave; competitor-scan = named product facts; benchmark = scored the company gaps. |
| #53 debate mode vs decision framework (`ux-pattern`) | Debate = advocate briefs + designer pick; decision framework = neutral criteria table. Trigger language decides. |
| #93 grill vs #53 debate vs #28 decision framework | Grill = one question at a time until a restatement is confirmed. Debate = advocate briefs. Decision framework = criteria table. Same skill, trigger language decides. |
| #94 wayfinding vs #95 / #1 full `design-kickoff` | Explicit "wayfind / map the decisions / plan, don't build" → wayfinding mode, no PRD. "Explore / let's start / what is X" → full sequence. |
| #96 surface mode vs `design-system` | "Persuade or operate" is a taste bound inside existing tokens. A new colour or type family is `design-system`, and the answer is no. |
| #97 already-covered motion vs #49 spec | "Does the system already animate this" checks the sheet/menu/pill recipe and the platform transition first. A named new moment with no recipe still specs (#49), and the spec includes the gap plus interruption. |
| #98 tint compare vs #84 real compare | Built screens that differ in interaction, layout, or motion → Compare. Accent, density, or copy only → say they are one direction and wait. |
| #54 `cognitive-accessibility` vs `accessibility` | Cognitive = mental load/wayfinding (advisory); accessibility = focus/ARIA/contrast (blocking). |
| #55 `responsive-patterns` vs `mobile-shell` | Responsive = layout/breakpoints/reflow; mobile-shell = phone chrome only. |
| #56 `interaction-design` vs `motion-choreography` | Interaction = state/feedback matrix; motion = duration/easing/reduced-motion for those states. |
| #57 `adaptive-interfaces` vs dark-mode asks | Adaptive maps prefers-*; product dark mode is forbidden for the company prototypes. |
| #58 `research-artifacts` Mode 4 vs #59 `accessibility-decisions` | Spectrum = coverage/breakpoints before a pick; decisions = record/tradeoff/eng handoff after. |
| #59 `accessibility-decisions` vs #40 `design-rationale` | A11y impact/WCAG/eng criteria → accessibility-decisions; general design why → design-rationale. |
| #58 ability spectrum vs #54 `cognitive-accessibility` | Spectrum maps ability breakpoints across tasks; cognitive = mental-load/wayfinding on a flow. |
| #60 `people-coaching` vs # `manager-1on1-prep` | Coaching = feedback/hard talk/growth; 1:1 prep = status/questions from the tracker. Same gate. |
| #61 `people-coaching` IC decline vs freestyle coaching | IC profiles must get a decline — never a shadow growth plan. |
| #62 Mode 3 vs #49 Mode 1 (`motion-choreography`) | Opportunities = hunt+reject; Spec = named interaction recipe. |
| #63 Mode 2 vs #64 Mode 4 (`motion-choreography`) | Review = Before\|After\|Why on known motion; Audit→plan = survey + wait-for-pick + self-contained plans (no code). |
| #65 `interface-change-review` vs #12 `audit` | Git-scoped craft + introduced/regression → change-review. "Ready to share" / DS+a11y gate on Design Harness → `audit`. |
| #66 `session-handoff` vs onboarding handoff menu / #51 `design-retrospective` | Session-handoff = compact *this chat* for a fresh agent. Onboarding menu = pick next work after profile. Retrospective = post-ship learning from the task folder. |
| #77 `design-handoff` vs #66 `session-handoff` | Eng spec from a design → #77 (`handoff-spec.md`). Compact this chat / context full / fresh session → #66 (`handoff.md`). Bare "handoff this" → AskQuestion spec vs session vs ticket. |
| #77 `design-handoff` vs #20 `ticket-create` | Spec sheet → #77. "Create a ticket / file a Jira" → #20. After a spec, ticket is offered, not auto-run. |
| #77 `design-handoff` vs #40 `design-rationale` | Full eng spec (layout/tokens/states) → #77. Why we already chose X → #40. |
| #77 `design-handoff` vs #59 `accessibility-decisions` | Whole-design spec (a11y is one section) → #77. "Accessibility handoff for eng" / a11y ADR → #59. |
| #77 `design-handoff` vs #56 `interaction-design` | Whole-design spec that may *pull* a matrix → #77. "State matrix" / interaction spec alone → #56. |
| #72 `live-page-review` vs #7 design-critique | Fetchable non-Figma `http(s)` URL → capture front door, then hand off. Figma URL / screenshot / named Design Harness file without a URL → `ux-pattern` critique. |
| #72 `live-page-review` vs #12 `audit` | Capture is runtime evidence, not a share PASS. "Ready to share" on Design Harness **code** still `audit`. Localhost URL + review → live-page-review first. |
| #72 `live-page-review` vs #18 `competitor-scan` | Competitor **URL** + review → live-page-review captures, then competitor-scan. Named competitor + flow with **no** URL → competitor-scan (Mobbin/web) only. |
| #74 `research-artifacts` Mode 5 vs #39 persona | Job = situation/motivation/outcome. Persona = who. Same skill, different mode — trigger language decides. |
| #74 `research-artifacts` Mode 5 vs `product-strategy` | Job stories name the jobs. OST / bets / experiments → `product-strategy` (consumes jobs). |
| #102 `session-journal` vs #66 `session-handoff` | "Journal this" / "wrap up" → #102 (journal entry). "Handoff this session" / "context is full" → #66, which also writes the journal entry. |
| #102 `session-journal` vs #51 `design-retrospective` | "Wrap up" ends a session → #102. "Close out this project" / "retro this project" → #51. |

---

## Seeding new cases

Pull new permanent cases from two places, in this order of priority:

1. **Real misses** already in `harness/logs/routing-log.md` (`FALLBACK`/`MISROUTE` rows) — convert the actual request text into a numbered row above.
2. **New skill rows** added to `harness/ORCHESTRATOR.md` §2 — add one canonical case the same day the row ships (see `documentation/maintainers/build-a-skill.md`'s own checklist for where this fits).

Do not invent hypothetical edge cases with no basis in either source — this
list stays small and grounded in what has actually happened or actually
shipped, per `documentation/maintainers/evals.md`'s best-practices section.
