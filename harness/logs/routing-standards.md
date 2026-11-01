# Routing standards

How a skill description must be written so the orchestrator (`harness/ORCHESTRATOR.md`
§2) can route to it correctly without reading the whole doc first. This file
is the contract; the audit below shows how skills have measured up as they
were added or changed — it's a running log, not a snapshot of the full
current roster. For the current skill count, run `ls harness/skills | wc -l`
rather than trusting a number written here (roster changes faster than this
file gets rewritten).

## The rule

Every skill at `harness/skills/<name>/SKILL.md` needs a routable description —
either YAML frontmatter (`name` + `description`) at the very top, or (at
minimum) a one-paragraph summary directly under the H1 — that answers, for a
router that has *not* read the rest of the file:

1. **What does this do**, in one sentence.
2. **What triggers it** — concrete phrases a designer would actually say,
   not abstract categories. "check contrast" routes; "accessibility
   concerns" doesn't.
3. **What it does NOT do** if there's a likely confusion (e.g. `accessibility`
   vs `audit` — both touch a11y, but only one is the full pre-share sweep).
4. **What it depends on**, if anything external (MCPs, other skills it
   chains after).

### Minimum viable description

```markdown
---
name: <skill-slug>
description: >-
  <One sentence on what it does.> Triggers on: "<phrase 1>", "<phrase 2>",
  "<phrase 3>". <One clause on scope boundary if one exists, e.g. "Does not
  run the full audit — see harness/skills/audit for that.">
---
```

Frontmatter is preferred because it's the part a router can read without
opening the full body — but a tight opening paragraph works too, as long as
it contains real trigger phrases, not just a topic name.

### Anti-patterns

- **Topic-only description** — "Handles accessibility." Doesn't tell the
  router what phrases to match against.
- **Buried trigger phrases** — putting the actual "Invoke in Cursor" phrases
  three sections down, past setup instructions the router doesn't need yet.
- **No scope boundary** — when two skills plausibly overlap (accessibility /
  audit; ux-pattern / ui-agent), the router needs one sentence to know which
  one to pick, or to pick both in sequence.

---

## Audit of the current skills

| Skill | Frontmatter? | Trigger phrases present? | Scope boundary stated? | Verdict |
|---|---|---|---|---|
| `content` | ✅ | ✅ (rich) | — | **Meets standard.** |
| `research-agent` | ✅ | ✅ | — | **Meets standard.** |
| `design-kickoff` | ✅ | ✅ (start / explore / design / build, not a small tweak) | ✅ — a small tweak skips it; wayfinding and research-method are other rows | **Meets standard.** Front door. Rebuilt 2026-11-01. |
| `ui-agent` | ✅ | ✅ | ✅ — points to `research-agent` for discovery; loads `design-system` before writing CSS | **Meets standard.** |
| `design-system` | ✅ | ✅ ("check this token", "where should this style live", "is this a real Foundations token") | ✅ — pre-write / layer rule; does not replace `audit`; not harness routing (`design-ops`) | **Meets standard.** Added 2026-07-21 after Design Harness DS audit found undefined tokens + three-layer `design-harness.css` mix. |
| `icon-usage` | ✅ | ✅ | ✅ — notes it usually rides inside a `ui-agent` chain | **Meets standard.** |
| `ux-pattern` | ✅ | ✅ (design critique + iterating ideation + decision framework + debate phrases) | ✅ — ui-agent / content / audit / design-kickoff boundaries; ORCHESTRATOR §2d; debate ≠ decision framework | **Meets standard.** Widened 2026-07-24 coverage audit; **debate mode** added 2026-08-09 from a gap-scan against the roster. |
| `ui-agent` | ✅ | ✅ (includes micro-edit: fix/tweak/make taller/add badge) | ✅ | **Meets standard.** Micro-edit triggers added 2026-07-24 (settings-ia bypass). |
| `competitor-scan` | ✅ | ✅ (includes "compare this to [competitor]") | ✅ | **Meets standard.** |
| `harness-audit` | ✅ | ✅ (routing coverage / freestyle / harness audit / run the routing evals) | ✅ — not Design Harness `audit`; two modes: retrospective log mining + prospective eval-prompts | **Meets standard.** Wired into ORCHESTRATOR §2 2026-07-24; prospective evals mode added 2026-08-04 (`documentation/maintainers/evals.md`). |
| `accessibility` | ✅ | ✅ | ✅ — points to `audit` for the full sweep | **Meets standard.** |
| `audit` | ✅ | ✅ | ✅ — points to `accessibility`/`content` for standalone deep dives; reactive vs `design-system` pre-write | **Meets standard.** |
| `workload-agent` | ✅ | ✅ (roadmap, DES/UXR, bandwidth, roadmap) | ✅ — report-only; not part of kickoff; does not write PRDs or build UI | **Meets standard.** Added 2026-07-14. Removed from kickoff 2026-11-01. |
| `mobile-shell` | ✅ | ✅ | ✅ — device chrome only, not content/layout (`ui-agent`) or full compliance (`audit`) | **Meets standard.** Added 2026-07-07 after auditing phone-frame prototypes found 10+ divergent hand-rolled chrome implementations against the `navigation-profile` reference. |
| `manager-1on1-prep` | ✅ | ✅ (1:1 prep, "what's [name] working on", "status check on [name]") | ✅ — explicitly gated to `role: manager` profiles, declines for ICs; points to `workload-agent`/`research-agent` when it doesn't fit | **Meets standard.** Added 2026-07-16 as the dedicated build-out of the manager-role gap flagged (not fixed) during the onboarding-shortening pass. Narrowest scope of any skill here by design — one report, one snapshot, never auto-fires. |
| `scheduling` | ✅ | ✅ ("book a meeting with [name]", "find time with [name] tomorrow afternoon", "schedule a sync with [name]") | ✅ — explicitly on-demand, never a gate, general-purpose (not manager-specific, unlike `manager-1on1-prep`); explicitly out of scope for its own context-gathering: Slack search, multi-ticket/project sweeps, Figma/Miro (routes to `research-agent` for that depth) | **Meets standard.** Added 2026-07-18 as a standalone skill — same "own skill, composed by others" shape as `workload-agent` — deliberately not wired into onboarding or `design-kickoff`. Calendar connection check (`harness/skills/scheduling/references/calendar-check.md`) is kept fully separate from the mandatory four-MCP gate. Restructured from an initial manager-1on1-prep-adjacent draft into this fully standalone form same day, per explicit follow-up. Extended 2026-07-19 with `references/meeting-context.md` — grounded talking points sourced from the conversation, a matched `projects/<slug>/` folder, or one named ticket, borrowing `manager-1on1-prep`'s "things to raise, not conclusions" framing — so drafts and event descriptions carry real substance instead of bare logistics, never invented filler. |
| `competitor-scan` | ✅ | ✅ ("what does Airbnb do for waitlist", "how does Dropbox handle referrals") | ✅ — explicitly excludes vague no-named-competitor sweeps (`research-agent`/`benchmark`) and never judges the company's own screens (`benchmark`) | **Meets standard.** Added 2026-07-18. Can optionally use the Mobbin MCP when a designer already has one connected — **not currently connected in this environment** (verified empty MCP catalog), and connecting it is never required or nudged toward. Works fully via web search either way, disclosing which path was used each run. |
| `benchmark` | ✅ | ✅ ("how does our X compare", "benchmark our Y", "is our Z any good compared to what's out there") | ✅ — calls `competitor-scan` rather than re-deriving competitor detail; explicitly requested only, never auto-fires | **Meets standard.** Added 2026-07-18 alongside `competitor-scan`. Mandatory cross-check against `COMPANY-PATTERNS.md`/`COMPANY-ARCHETYPES.md` before any gap is flagged, so intentional the company choices (e.g. the documented WhatsApp button exception, the "less visibility" archetype need) never get miscategorized as drift. Same optional, opt-in Mobbin usage as `competitor-scan` when a comparison point isn't a named competitor. |
| `ticket-create` | ✅ | ✅ ("create a ticket", "file a Jira", "open a DES", "design + eng ticket pair") | ✅ — draft→go→create; lean body only; not workload-agent / design-kickoff | **Meets standard.** Added 2026-08-04 after live miss: freestyle PROJ-190/PROJ-3732 dumps. Same confirm-first posture as `scheduling`. Guide: `harness/skills/ticket-create/GUIDE.md`. |
| `docs-brief` | ✅ | ✅ ("create a Confluence page", "add a wiki page", "put this in Confluence", "document this on Confluence") | ✅ — draft→go→create; lean team pages; not research-agent/design-kickoff PRD scaffolds; not writing essays | **Meets standard.** Added 2026-08-05 after FALLBACK cluster (weekly tracker → Confluence; entry-points page under Referrals). Twin of `ticket-create`. Renamed from `confluence-page` same day — designer flagged confusion with the research-agent PRD Confluence path; new name reads as "brief" (publish what's known), never "PRD". Guide: `harness/skills/docs-brief/GUIDE.md`. |
| `deck-builder` | ✅ | ✅ ("build me a presentation / deck / slides", "put this PRD into slides", "workshop / stakeholder deck") | ✅ — composes existing task-folder output; does not invent analysis; not `ui-agent` | **Meets standard.** Added 2026-08-04. Live Design Harness embeds via `?embed=1`. |
| `figma-ux-audit` | ✅ | ✅ ("annotate this Figma", "notes on the canvas", "annotation cards") | ✅ — canvas cards only; written critique stays `ux-pattern`/`content`; never auto-runs | **Meets standard.** Wired into ORCHESTRATOR §2 + §2d. |
| `session-journal` | ✅ | ✅ ("wrap up", "journal this", "add this to my journal") | ✅ — not a transcript, not `handoff.md`, not taste rules; not read by critique | **Meets standard.** Replaced `design-memory` 2026-10-29. |
| `session-handoff` | ✅ | ✅ ("handoff this session", "session handoff", "compact this chat", "context is full, write a handoff", "continue in a fresh chat") | ✅ — state-first chat compact; not onboarding handoff menu; not `design-retrospective`; on-demand only | **Meets standard.** Added 2026-08-09, adapted to `projects/<slug>/handoff.md`. Guide: `harness/skills/session-handoff/GUIDE.md`. |
| `writing` | ✅ | ✅ ("write an article", "write a blog post", "write up how we got here" (prose), "draft a LinkedIn post", "write a case-study writeup", "run anti-slop on this", "use the writing skill on this article") | ✅ — long-form prose only; not `content` or `deck-builder`; existing-article pass when a full piece is pasted | **Meets standard.** Added 2026-08-05. Existing-article pass 2026-09-06. |
| `publish-project` | ✅ | ✅ ("publish this project", "deploy this / make it public", "give me a share URL") | ✅ — on-demand only, never auto-fires after `ui-agent`/`deck-builder`/`audit`; requires a prior `audit` PASS; publishes only from `artifacts/decks/` into `public/projects/<slug>/`, never `artifacts/snapshots/` or `artifacts/qa/` | **Meets standard.** Added 2026-08-06 after a `projects/` vs `public/` structure audit found share pages landing ad hoc at the flat `public/` root with no opt-in gate. Twin of `ticket-create`/`docs-brief`'s draft-then-explicit-action posture, but the "draft" here is picking which artifact, not composing new content. |
| `assumption-mapper` | ✅ | ✅ ("map our assumptions", "we think we know what users want", "assumption audit") | ✅ — doesn't run research itself; not part of kickoff | **Meets standard.** Added 2026-08-08. Removed from kickoff 2026-11-01. |
| `research-question-sharpener` | ✅ | ✅ ("rewrite these research questions", "a stakeholder sent me a list of questions", "which questions should I actually ask") | ✅ — doesn't run the session; feeds `usability-test-guide` | **Meets standard.** Added 2026-08-08, batch 1. |
| `usability-test-guide` | ✅ | ✅ ("write a usability test script", "help me plan a usability test", "build a UT plan") | ✅ — doesn't build the prototype (`ui-agent`) or synthesize results (`research-agent` verdict mode) | **Meets standard.** Added 2026-08-08, batch 1. |
| `research-synthesis` | ✅ | ✅ ("run a research debrief", "lightning synthesis", "affinity diagram this data", "I have all this data now what") | ✅ — doesn't write the finished insight (`insight-writer`) or pick the method (`decision-first-research` / Research method row) | **Meets standard.** Added 2026-08-08, batch 2 (deferred from batch 1). Merges `research-debrief` + `affinity-synthesis` + `synthesis-process` from overlapping prior-art concepts — overlapping content, kept as one skill per designer's "merge closely related synthesis methods" instruction. |
| `insight-writer` | ✅ | ✅ ("write insights from this data", "is this an insight or a finding", "so-what check this report") | ✅ — doesn't find the pattern (`research-synthesis`) or run the mechanical prose pass (`harness/references/anti-ai-writing.md`) | **Meets standard.** Added 2026-08-08, batch 2. Merges an insight-writing mode with a so-what pressure-check into one skill (writing and pressure-testing an insight are the same job, per designer's merge instruction). |
| `screener-builder` | ✅ | ✅ ("write me a screener", "help me recruit participants", "participant criteria") | ✅ — doesn't run the session it recruits for | **Meets standard.** Added 2026-08-08, batch 2. |
| `decision-first-research` | ✅ | ✅ ("we have a week for research", "decision brief", "how do I say no to a vague research request") | ✅ — names the decision first; does not hand off to kickoff | **Meets standard.** Added 2026-08-08. Kickoff handoff removed 2026-11-01. |
| `ia-methods` | ✅ | ✅ ("card sort", "tree test", "information architecture research", "directness score") | ✅ — doesn't run interviews or usability tests, just the two structural IA methods | **Meets standard.** Added 2026-08-08, batch 2. Merges card-sorting + tree-testing — a fixed sequential pair (card sort builds structure, tree test validates it), not independent asks. |
| `research-artifacts` | ✅ | ✅ ("build a persona", "make an empathy map", "map this user's journey", "ability spectrum", "inclusive persona", "job stories", "JTBD") | ✅ — takes patterns from `research-synthesis`, doesn't run sessions or find patterns itself; explicitly punts service-blueprint scope; a11y decisions → `accessibility-decisions`; jobs ≠ bets (`product-strategy`) | **Meets standard.** Added 2026-08-09. Merges user-persona + empathy-map + journey-map; Mode 4 ability spectrum added 2026-08-09; Mode 5 job stories added 2026-08-31. |
| `design-rationale` | ✅ | ✅ ("write the rationale for this decision", "why did we choose this", "defend this decision in writing") | ✅ — explicit boundary against `ux-pattern`'s decision framework mode (before vs. after the pick) | **Meets standard.** Added 2026-08-09, rewritten with an added evidence-sourcing requirement and `decisions.md` persistence the original lacked. |
| `research-summary` | ✅ | ✅ ("session summary", "topline", "executive summary for this research", "one-pager for leadership") | ✅ — doesn't write full insights (`insight-writer`) or share-out plans (`research-shareout`) | **Meets standard.** Added 2026-08-09. Merges a session-summary mode with a topline mode. |
| `research-shareout` | ✅ | ✅ ("research shareout", "stakeholders aren't acting", "usability bingo", "insight auction") | ✅ — doesn't build HTML decks (`deck-builder`) or write insights | **Meets standard.** Added 2026-08-09 from a research-ops gap-scan. |
| `workshop-whiteboard` | ✅ | ✅ ("whiteboard this research ask", "research planning workshop", "scope this study live") | ✅ — workshop facilitation, not interview prep; hands off to decision-first / Step 1.5 | **Meets standard.** Added 2026-08-09. |
| `roadmap-prioritization` | ✅ | ✅ ("help me prioritize this backlog", "which of these should I do first", "rank these tickets") | ✅ — doesn't decide what to build (`design-kickoff`) or report what exists (`workload-agent`), just ranks already-named items | **Meets standard.** Added 2026-08-09. |
| `okr-goal-setting` | ✅ | ✅ ("help me write an OKR for this", "what should our goal be for X", "what metric should we track") | ✅ — doesn't rank work against the goal (`roadmap-prioritization`) or measure whether it moved (`research-agent` verdict mode) | **Meets standard.** Added 2026-08-09. Hard no-invented-baseline rule and a Goodhart's-law gaming check. |
| `stakeholder-alignment` | ✅ | ✅ ("how do I get buy-in on this", "PM and eng disagree on this direction", "this keeps stalling in review") | ✅ — distinct from `manager-1on1-prep` (manager-gated, one report) and `design-rationale` (documents after, not before); never sends without a go | **Meets standard.** Added 2026-08-09. Separates sourced vs. inferred stakeholder motivations (`assumption-mapper` honesty rule); explicit human go before sending any draft. |
| `design-debt-tracker` | ✅ | ✅ ("show me the design debt", "what did we defer", "triage the debt register") | ✅ — doesn't replace post-audit fix-or-log AskQuestion; never routes into `KNOWN-ISSUES.md` | **Meets standard.** Added 2026-08-09 from a gap-scan against the roster — promotes the existing `project-debt-register.md` + `debt.md` protocol into a standalone triage skill. |
| `taste-feedback` | ✅ | ✅ ("taste check this", "mid-build visual check", "does this density feel right") | ✅ — doesn't invent off-token brand; doesn't replace critique/`audit` | **Meets standard.** Added 2026-08-09, the company-adapted (Foundations-bound). |
| `motion-choreography` | ✅ | ✅ ("motion spec for X", "review these animations", "what could be animated here", "audit the motion", "what's it called when…") | ✅ — Modes 1 Spec / 2 Review / 3 Opportunities (propose-only + Rejected) / 4 Audit→plan / 5 Vocabulary; `ui-agent` implements; not a full a11y pass | **Meets standard.** Added 2026-08-09; 5-mode fold-in 2026-08-09 (the company-adapted). |
| `synthetic-user-testing` | ✅ | ✅ ("synthetic user test", "walk through this as [persona]", "persona walkthrough") | ✅ — never claims validation; never replaces `usability-test-guide` | **Meets standard.** Added 2026-08-09; hard honesty line required. |
| `design-retrospective` | ✅ | ✅ ("design retrospective", "retro this project", "what did we learn from [slug]") | ✅ — not a metrics verdict (`research-agent`); reads `session-journal` entries, never writes them | **Meets standard.** Added 2026-08-09. |
| `inspiration-scouting` | ✅ | ✅ ("show me inspiration for X", "mood board", "cross-domain inspiration") | ✅ — distinct from `competitor-scan` / `benchmark`; take/leave required | **Meets standard.** Added 2026-08-09. |
| `cognitive-accessibility` | ✅ | ✅ ("cognitive load check", "COGA review", "wayfinding check", "mental load") | ✅ — does not replace blocking `accessibility` / `audit` | **Meets standard.** Added 2026-08-09 from an accessibility/craft gap-scan. |
| `responsive-patterns` | ✅ | ✅ ("breakpoint strategy", "200% zoom check", "what collapses at narrow widths") | ✅ — not `mobile-shell` chrome; hands build to `ui-agent` | **Meets standard.** Added 2026-08-09 from an accessibility/craft gap-scan. |
| `interaction-design` | ✅ | ✅ ("state matrix", "interaction spec", "loading and error feedback") | ✅ — specs only; distinct from `motion-choreography` / `accessibility` | **Meets standard.** Added 2026-08-09 from an accessibility/craft gap-scan. |
| `adaptive-interfaces` | ✅ | ✅ ("adaptive interfaces", "prefers-reduced-motion", "prefers-contrast", "system text size") | ✅ — hard refuse of the company product dark mode | **Meets standard.** Added 2026-08-09 from an accessibility/craft gap-scan. |
| `accessibility-decisions` | ✅ | ✅ ("accessibility decision", "a11y ADR", "accessibility handoff for eng", "a11y tradeoff") | ✅ — distinct from `design-rationale` (general) and `accessibility` (diagnostic); spectrum before pick → `research-artifacts` Mode 4 | **Meets standard.** Added 2026-08-09 from an accessibility gap-scan. |
| `people-coaching` | ✅ | ✅ ("help me give feedback to [name]", "SBI for [name]", "difficult conversation with [name]", "growth plan for [name]") | ✅ — gated to `role: manager`; distinct from `manager-1on1-prep` (status); never invents performance; no Slack DMs | **Meets standard.** Added 2026-08-09 from a manager-role skill batch — three modes, one skill. |
| `interface-change-review` | ✅ | ✅ ("review my branch for UI", "interface review on this diff", "craft review my uncommitted changes", "design regression check on this PR") | ✅ — distinct from pre-share `audit`; Figma-only → `ux-pattern` / `figma-ux-audit`; empty/non-UI diff stops | **Meets standard.** Added 2026-08-09, the company-adapted. |
| `live-page-review` | ✅ | ✅ ("review this live page", "review this local URL", "review localhost", "click through this flow on this URL", "capture this page and review it") | ✅ — Figma → critique/`figma-ux-audit`; Design Harness share gate still `audit`; competitor URLs hand off to `competitor-scan` (no House audit); Playwright MCP never required | **Meets standard.** Added 2026-08-18 — capture + classify front door; judgment stays in existing skills. |
| `review-report` | ✅ | ✅ ("turn this critique into a report", "HTML report of this review", "proper report of these findings", "write this up as a review report") | ✅ — slides → `deck-builder`; case-study prose → `writing`; running the critique first → `live-page-review` / design-critique | **Meets standard.** Added 2026-08-19 — packages existing findings as a scroll article. |
| `critique-prep` | ✅ | ✅ ("prep me for critique", "critique presenter script", "help me present this in UX review", "frame this for design critique", "walkthrough script for critique") | ✅ — never critiques (`ux-pattern`); not slides (`deck-builder`); not case-study prose (`writing`); not research readout (`research-shareout`); never auto-offered on a Figma drop | **Meets standard.** Added 2026-09-02 — presenter-side of group critique; reviewer-side already existed. |
| `design-handoff` | ✅ | ✅ ("design handoff this design", "handoff spec", "developer-ready specifications", "eng spec from this design", "handoff this to developers") | ✅ — not `session-handoff` (`handoff.md`); not `ticket-create` / `docs-brief` (offered after); not `design-rationale`; not `accessibility-decisions`; not `interaction-design` alone; bare "handoff this" → AskQuestion | **Meets standard.** Added 2026-09-04 — composer spec sheet from Anthropic design-plugin gap. |

**Net:** all listed skills now have frontmatter with real trigger phrases and an
explicit scope boundary against their most likely confusion. The 5 that
previously relied only on a tight opening paragraph (`ui-agent`,
`icon-usage`, `ux-pattern`, `accessibility`, `audit`) were brought up to the
`content`/`research-agent` standard — applied 2026-07-06, after the
orchestrator's first acceptance-test run (`tests/scenarios.md`) confirmed
routing was already working against the prose form, so this was a
low-risk hardening pass rather than a response to an observed misroute.
`design-kickoff` was added 2026-07-07 after a live near-miss: a "build a
leaderboard" request almost skipped research entirely on a net-new,
zero-source feature — it now absorbs and supersedes the lighter
research-prepend rule that was drafted as the first attempt at a fix.

**Untested claim, flagged honestly:** `design-kickoff`'s description
includes the literal phrase "city by city leaderboard" as a trigger
example — this was the actual request that motivated writing the skill.
That means the one real-world test available (typing that exact phrase)
is not a fair trigger test, since the phrase is verbatim in what the
router reads. Confirm real generalization with a phrase absent from the
description, in a fresh conversation, before trusting this beyond the
one case that inspired it.

## Adding a new skill

1. Write the full skill at `harness/skills/<name>/SKILL.md`, following the
   minimum viable description above.
2. Add one row to the routing table in `harness/ORCHESTRATOR.md` §2 with real
   trigger phrases — not a paraphrase of the skill's topic — and one short
   line of notes. Put the full notes in the same row of
   `harness/references/routing-notes.md`.
3. No `.cursor/harness/skills/` file needed — every skill in this repo routes
   through the orchestrator directly, per `harness/ORCHESTRATOR.md`.
