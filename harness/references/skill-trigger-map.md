# Skill trigger map — composed vs offered vs phrase-only

**Date:** 2026-08-31  
**Why:** Roster grew faster than composition. Skills that are only
phrase-triggered almost never run. This file is the operational map —
not a marketing catalog.

**How to read**

| Kind | Meaning |
|------|---------|
| **Composed** | Another skill's steps load it without the designer naming it |
| **Offered** | A prior skill recommends it (`AskQuestion` or "run X next"); designer still confirms |
| **Phrase** | Only fires if the designer (or §2) matches a trigger phrase |
| **Claimed, not wired** | Docs/frontmatter *say* it is composed; the host skill file does not call it |

A skill can be Phrase **and** Composed (e.g. `audit`). Primary = how it
actually gets used on a normal day.

---

## The pipeline that actually runs

```
design-kickoff
  → workload-agent (1a) + research-agent (1b) + assumption-mapper (1c)
  → PRD (+ job stories in §3)
  → gate
  → if jobs/objects/strategy missing: AskQuestion (diagnostic /
    conceptual-model / product-strategy / skip to screens)
  → else ui-agent → design-system → (mobile-shell / icon-usage) → audit
       audit also: OOUX (Check 6) + layer tags (Check 7)
```

---

## Claimed composition that is not in the host file

| Skill | Who claims it | Host file reality |
|-------|----------------|-------------------|
| *(none remaining for kickoff)* | — | Wired 2026-08-31: Step 1c `assumption-mapper`, Step 2 job stories, Step 4 offer |
| *(none remaining for breadboarding)* | — | Was: `breadboarding.md`'s own "Integration with ux-pattern" section claimed it fired on "structure this flow," but `ux-pattern/SKILL.md` never called it. Fixed 2026-08-31 — now a named § Breadboard mode with its own §2 row. |

---

## Map (66 skill files)

"Example phrase" is what a designer would actually type — not the skill
name. For **Composed** rows it's the phrase that starts the *host* skill
(the sub-skill just rides along, unasked). For **Phrase** rows it's the
wording that has to land close enough for §2 to route there.

| Skill | Primary | Also | Example phrase (what you'd actually say) | Notes |
|-------|---------|------|-------------------------------------------|-------|
| `design-kickoff` | Composed (front door) | Phrase | "Let's start a new project for X" / "kick off Y" | Newness, not vagueness. Checked first. |
| `workload-agent` | **Composed** (kickoff 1a, onboarding) | Phrase | (rides on kickoff) / "what's on my plate right now" | Actually runs. |
| `research-agent` | **Composed** (kickoff 1b) | Phrase (gap-fill, verdict) | (rides on kickoff) / "what do we already know about X" | Discovery sweep is the one that runs. |
| `ui-agent` | Phrase / iterating row | — | "build the screen" / "change this button's copy" | After approved PRD or existing prototype. |
| `design-system` | **Composed** (ui-agent, micro-edit) | Phrase | (rides on ui-agent) / "check this against our tokens" | Token gate before CSS. |
| `mobile-shell` | **Composed** (phone-frame ui-agent) | Phrase | (rides on ui-agent) / "show this in a phone frame" | |
| `icon-usage` | **Composed** (ui-agent when icons) | Phrase | (rides on ui-agent) / "which icon should I use for X" | |
| `audit` | **Composed** (end of build; deferred on micro-edit) | Phrase ("ready to share") | "is this ready to share" / "audit this screen" | Checks 6–7 (OOUX, layer) ride here. Check 8 (ethical, conditional-fire) added 2026-08-31. |
| `content` | **Offered/composed** (critique when copy in scope) | Phrase | "review the copy on this" / "is this CTA clear" | |
| `ux-pattern` | Phrase (critique / decide / debate / breadboard / go-wide) | Kickoff Step 4 "if structure question" | "should this be a modal or a page" / "critique this flow" / "breadboard this flow" / "show me 15 ways to make X better" | OOUX + layer tags on critique. Breadboard mode wired 2026-08-31 (was reference-only, claimed-not-wired). Not automatic on every kickoff. |
| `figma-ux-audit` | **Offered** (after written critique / drop-time) | Phrase (annotate) | "leave notes on the canvas" / "annotate this Figma" | |
| `review-report` | **Offered** (after written critique) | Phrase | "write this up as a report" | |
| `critique-prep` | Phrase | — | "prep me for critique" / "presenter script" / "frame this for design critique" | Never offered on a Figma drop. Never critiques. Ambiguous "I present Thursday" → AskQuestion. |
| `design-handoff` | Phrase | Offers `ticket-create` / `docs-brief` after | "design handoff this design" / "write the eng spec" | Composer. Never auto-files. Bare "handoff this" → AskQuestion. Not `session-handoff`. |
| `assumption-mapper` | **Composed** (kickoff 1c) | Phrase standalone | (rides on kickoff) / "what are we assuming about X" | Wired 2026-08-31. |
| `decision-first-research` | Phrase | Kickoff 1.5 when request still vague | "I don't know what to research yet, help me decide" | |
| `ia-methods` | Phrase | Kickoff 1.5 if card-sort/tree-test picked | "let's run a card sort" / "design a tree test" | |
| `usability-test-guide` | Phrase | Kickoff 1.5 if UT picked | "help me set up a usability test" | |
| `competitor-scan` | Phrase | Kickoff 1.5 "competitive teardown"; `benchmark` calls it | "how do competitors handle X" | |
| `org-pack-builder` | **Offered** (onboarding, missing local pack) | Phrase | (offered at onboarding) / "set up my company's context pack" | |
| `harness-setup` | **Composed** (onboarding first clone) | Phrase | (rides on first onboarding) | No §2 row; onboarding SKILL calls it. |
| `diagnostic` | Phrase | **Offers** jobs / objects / strategy | "where should I focus first" / "what's the bottleneck here" | Useless unless someone asks "where should I focus." |
| `research-artifacts` | Phrase + **Composed** Mode 5 at kickoff Step 2 | Diagnostic **offers**; Mode 4 from a11y asks | "write job stories for X" / (rides into PRD §3 automatically) / "service blueprint for X" | Job stories draft into the PRD. Mode 6 (service blueprint) added 2026-08-31 — closes a self-acknowledged gap. |
| `conceptual-model` | Phrase (object model / domain-mapping mode) | Diagnostic **offers**; audit Check 6/7 **offers**; kickoff Step 4 **offers** | "what are the objects here" / "is this one thing or two" / "map this domain" / "terminology audit" | Never auto-runs (correct — expensive). Domain-mapping mode added 2026-08-31 — earlier/looser pass feeding noun foraging. |
| `product-strategy` | Phrase | Diagnostic **offers**; kickoff Step 4 **offers** (never auto) | "map the opportunities for X" / "build an opportunity solution tree" | |
| `research-synthesis` | Phrase | — | "synthesize these sessions" / "what patterns are in this research" | After sessions exist. |
| `insight-writer` | Phrase | After synthesis | "write this up as an insight" | Sequential, not auto. |
| `research-question-sharpener` | Phrase | UT guide may call internally | "is this research question good enough" | |
| `screener-builder` | Phrase | — | "write a screener for this study" | |
| `research-summary` | Phrase | — | "summarize this research for stakeholders" | |
| `research-shareout` | Phrase | — | "put together a shareout deck for this research" | |
| `workshop-whiteboard` | Phrase | — | "run a workshop on X" | |
| `synthetic-user-testing` | Phrase | — | "simulate how a user would react to this" | |
| `accessibility` | Phrase | Audit Check 2 is the blocking a11y that actually runs | "deep-dive the accessibility of this flow" | Standalone deep-dive is phrase. |
| `accessibility-decisions` | Phrase | Spectrum Mode 4 **offers** | "what's the a11y tradeoff here" | |
| `cognitive-accessibility` | Phrase | — | "is this too much cognitive load" | |
| `adaptive-interfaces` | Phrase | — | "how should this adapt across devices" | |
| `responsive-patterns` | Phrase | — | "how should this behave responsively" | |
| `interaction-design` | Phrase | Audit layer tag **offers** | "design the interaction for this" / "confirm dialog or undo for this" | Error-prevention hierarchy + undo-vs-confirm added 2026-08-31 (Step 3.5). |
| `motion-choreography` | Phrase | — | "spec the animation/motion for this" | |
| `taste-feedback` | Phrase | — | "does this feel right" / "gut check this" | Mid-build; easy to skip. |
| `interface-change-review` | Phrase | — | "review this before/after change" | |
| `live-page-review` | Phrase (non-Figma URL + review) | — | "review this live page" (pasted URL) | |
| `benchmark` | Phrase | Never auto | "benchmark us against competitors on X" | |
| `inspiration-scouting` | Phrase | — | "find inspiration for X" | |
| `design-rationale` | Phrase | After a pick | "write up why we chose this approach" | |
| `design-debt-tracker` | Phrase | `audit` **offers** fix-or-log; critique logs non-blocking rows | "log this as design debt" / "what debt do we have on X" | Writing rows is composed; triage is phrase. "Any thoughts" is `ux-pattern`. |
| `design-retrospective` | Phrase | — | "let's do a retro on this project" | |
| `session-journal` | Phrase | `session-handoff` | "wrap up", "journal this", "write this session up" | Designer's judgment only; read back on resume and by `case-study`. |
| `roadmap-prioritization` | Phrase | — | "help me prioritize the roadmap" | |
| `okr-goal-setting` | Phrase | — | "help me set OKRs for this" | |
| `stakeholder-alignment` | Phrase | — | "help me align stakeholders on X" | |
| `ticket-create` | Phrase | — | "create a ticket for this" | On-demand, confirm-first. |
| `docs-brief` | Phrase | Kickoff **offers** after PRD | "write this up as a page" / "put this in Notion" / "Confluence brief" | Formerly `confluence-brief`. |
| `case-study` | Phrase | Offers slides / prose after saving | "build the case study for this project" | Runs first when a case-study deck or article is asked for with no `case-study.md`. |
| `presenter` | Phrase | — | "how should I show this to the PM?" / "put these side by side" / "set the prototype up for a research session" / "show the team every idea" | Built screens only; mockups before build stay on the `ui-agent` review board. The test script itself is `usability-test-guide`. |
| `deck-builder` | Phrase | — | "build a deck for this" | Case-study deck reads `case-study.md`. |
| `writing` | Phrase | — | "help me write this up" / "run anti-slop on this" / "use the writing skill on this article" | |
| `publish-project` | Phrase | After the ship packet (general) and an audit PASS, still on-demand | "publish this project" | |
| `session-handoff` | Phrase | Soft nudge after long sessions | "let's hand this off / wrap up the session" | |
| `scheduling` | Phrase | — | "help me schedule X" | Never a gate. |
| `manager-1on1-prep` | Phrase | Manager-gated | "help me prep for my 1:1 with X" | |
| `people-coaching` | Phrase | Manager-gated | "how should I coach X on this" | |
| `figma-token-sync` | Phrase | — | "sync tokens from Figma" | |
| `figma-asset-sync` | Phrase | — | "sync assets from Figma" | |
| `figma-code-sync` | Phrase | — | "sync this Figma component to code" | |
| `figma-library-manager` | Phrase | — | "manage our Figma library" | |
| `figma-effects-catalog` | Phrase | — | "catalog our Figma effects" | Lowest use; that's fine. |
| `harness-audit` | Phrase | Prospective after §2 edit (self-trigger, often skipped) | "audit the harness itself" | This run. |
| `designer-workload` | **Kept, no triggers** | — | — | No §2 row. Phrases live on `workload-agent`. Not deleted: nav, the skill package, and docs still name it. |

**Rough counts (primary):** Composed ~10 · Offered ~8 · Phrase ~45 · Dead 1 · Claimed-not-wired 2.

Phrase-only is not always a bug (`scheduling`, `ticket-create`, manager skills *should* be on-demand). It **is** a bug when the skill is load-bearing for every net-new project (jobs, objects, assumptions, strategy).

---

## What to compose next (priority)

Load-bearing discovery layer is **wired** (2026-08-31). Remaining is
optional, not a kickoff hole:

- Phrase-only on purpose: Figma sync suite, decks, tickets, coaching, motion spec.
- `designer-workload` stays, with no trigger phrases. Workload questions go to `workload-agent`.

## Coverage audit #2 against an external reference (2026-08-31)

Mapped this harness against `cuellarfr/design-skills` (10 skills, ~46,000
lines — dense reference/technique libraries for Claude Code/Cursor) to
check for gaps, same posture as the Layers audit below: comparison, not
adoption. Most of it overlaps with what we already cover in a leaner,
workflow-specific way (their generic `design-systems`/`design-ops`/
`design-elevation` skills teach frameworks and enterprise DS references
we don't need — we enforce one real, specific design system, not a
generic one). Three real gaps found and closed:

1. **Service blueprint was a self-acknowledged hole** —
   `research-artifacts` explicitly said "this repo doesn't have a skill
   for yet, say so and stop" for multi-channel/backstage service
   delivery. Fixed: Mode 6 + `references/service-blueprint.md`.
2. **No error-prevention/undo hierarchy** — `interaction-design` specced
   state matrices but had no structured way to decide "eliminate the
   error vs. prevent it vs. confirm vs. undo" for destructive actions.
   Fixed: Step 3.5 + `references/error-prevention.md`.
3. **No ethics/harm check anywhere in the repo** — nothing checked a
   design for dark patterns, exclusion, or extractive dynamics. Fixed:
   new shared `harness/references/ethical-design-check.md`, cited by
   `product-strategy` (Step 3, conditional), `audit` (Check 8,
   conditional-fire), `ux-pattern` (critique item 9, conditional).

## Coverage audit against an external reference (2026-08-31)

Mapped this harness against the 9-skill "Layers of Product Design"
toolkit (`layers.jamiemill.com/skills`) — a structured seven-layer design
framework — to check for gaps, not to copy it. Result: 6 of 9 layers were
already covered as well or better (`diagnostic`, `product-strategy`,
`conceptual-model`, `audit`). Three real gaps found and closed:

1. **Breadboarding (interaction-flow) wasn't directly triggerable** — it
   existed only as a reference file `ux-pattern` was supposed to call
   internally but never actually did. Fixed: § Breadboard mode + §2 row.
2. **Job stories collapsed candidate and prioritized into one pass** — no
   explicit "strip the mechanism" test, no separation between "every
   candidate we heard" and "the 1-2 we're prioritizing." Fixed:
   `research-artifacts` Mode 5 now runs Stage A (candidate, unprioritized)
   → Stage B (prioritized, mechanism stripped).
3. **No domain-mapping step before object modeling** — `conceptual-model`
   jumped straight to sorting nouns into product objects, with no earlier
   pass for the domain's own messy, contradictory vocabulary. Fixed: new
   § Domain-mapping mode + `references/domain-mapping.md`, feeding Step
   1's noun foraging.

---

## Related

| File | Role |
|------|------|
| `harness/ORCHESTRATOR.md` §2 | Phrase table (necessary, not sufficient) |
| `harness/skills/design-kickoff/SKILL.md` | The host that should compose 1–3 above |
| `harness/references/ooux-failure-modes.md` | Already composed into `audit` / `ux-pattern` |
