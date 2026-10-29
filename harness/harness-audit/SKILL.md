---
name: harness-audit
description: >-
  Self-audit for the orchestration harness itself, not for design output.
  Triggers on: "audit the harness", "check routing accuracy", "routing
  coverage", "why did the agent freestyle", "why did the agent ask so many
  questions", "stop silent freestyling", "run the routing evals", or
  periodically (weekly/monthly) to catch drift, or right after any edit to
  harness/ORCHESTRATOR.md §2, a skill's frontmatter description, or a new
  skill being added. Two modes: **retrospective** (reads
  harness/logs/routing-log.md and every task's log.md, looks for
  misroutes, repeated clarifying questions, and fallback clusters) and
  **prospective** (runs the canonical prompt set in references/eval-
  prompts.md against the current routing table before a change ships).
  Proposes concrete fixes to harness/ORCHESTRATOR.md's routing table or
  harness/logs/routing-standards.md. When the designer explicitly asks to
  fix gaps (not only report), apply the approved edits. Does not touch
  design system code or domain skill content. Not the same as
  harness/skills/audit (Design Harness screen pre-share sweep).

  **Mandatory self-trigger (no exceptions, not just "self-triggered if
  remembered"):** any time this conversation identifies and fixes a real
  harness mistake — a designer-flagged misroute, a wrong/missing §2 row, a
  skill description or SKILL.md logic bug — prospective mode runs
  automatically, same turn, before saying the fix is done: seed the miss
  as a permanent case in references/eval-prompts.md, then verify the fix
  against it (and any known-ambiguous-pair it touches). Skipping this is a
  hard bug, same class as skipping the plan-gate (§3) — not something that
  needs a separate "run the routing evals" ask.
---

# Harness audit

This skill reviews the orchestrator's own performance — not a prototype,
not a design. Don't confuse this with `harness/skills/audit/SKILL.md`, which
audits a *screen* for design-system/a11y/copy violations before sharing.

## Two modes

- **Retrospective** (default — "audit the harness", "routing coverage",
  weekly/periodic) — reads real logged history, looks for patterns. §§
  below, unchanged.
- **Prospective** ("run the routing evals", or — **mandatory, no
  exceptions** — right after editing `harness/ORCHESTRATOR.md` §2 / a
  skill's frontmatter / adding a new skill / fixing any designer-flagged
  routing mistake) — runs the canonical prompt set in
  `references/eval-prompts.md` against the *current* routing table
  **before** telling the designer a routing change is done. This is not
  conditional on remembering to self-trigger or on the designer asking
  for evals separately — a fix to the harness's own routing/logic that
  ships without this check is the same class of bug as a multi-skill
  chain that ships without showing the §3 plan. See § below. Full
  rationale: `documentation/maintainers/evals.md`.

Both modes share the same output shape and the same trust posture: report
first, propose a diff, apply only on explicit approval.

## What to read (retrospective)

1. **`harness/logs/routing-log.md`** in full — the exceptions log.
   Fallback rows (no task folder, no clean match) are the most valuable:
   they're the requests the routing table didn't anticipate. Rows dated
   before 27 October 2026 also include plain `MATCHED` lines.
2. **`harness/logs/skill-usage.jsonl`** (and `skill-usage-summary.md`) — every
   `SKILL.md` the agent read, recorded by the hook. Use it for match counts
   and for skills that never load.
3. Every `projects/*/log.md` — task-scoped routing detail.
4. `harness/ORCHESTRATOR.md` §2 (routing table), `harness/references/routing-notes.md`
   (full row notes) and `harness/logs/routing-standards.md` — what the current
   rules actually say, to compare against what happened.
5. `harness/references/handoff-patterns.md` — the named handoff
   anti-patterns and handoff types, when a task felt bumpy even though
   routing was technically right.

## What to look for

- **Repeated fallbacks with a similar request shape** → missing routing
  table row. Propose the new row with real trigger phrases pulled from the
  logged requests, not invented ones.
- **Misroutes** (chain run didn't match what the request actually needed,
  caught later by the designer redirecting) → either the routing table row
  is too broad, or the matched skill's own description needs a tighter
  scope boundary (see `harness/logs/routing-standards.md`).
- **Clarifying-question clusters** — same question asked across multiple
  tasks → that answer should probably be inferable by default (update
  `harness/ORCHESTRATOR.md` §1's infer-before-ask list) or captured once in a
  standing decision.
- **Plan-gate skips or violations** — multi-skill chains that ran without a
  shown plan (should never happen per §3 — flag as a hard bug, not a
  suggestion).

## Prospective routing check (evals)

1. Open `references/eval-prompts.md` — the canonical seed set (one case
   per §2 routing row, plus a table of known ambiguous pairs).
2. For each case, determine what the **current** `harness/ORCHESTRATOR.md`
   §2 table would actually match it to — reason through it directly
   against the table's current wording (full row notes in
   `harness/references/routing-notes.md`), or run the prompt in a fresh
   chat if higher confidence is needed.
3. Compare to the case's `Expected match`. Any mismatch is a finding —
   same severity as a live misroute.
4. Pay extra attention to the **known ambiguous pairs** table when the
   edit that triggered this run touched either side of a pair.
5. If this run was triggered by a real live miss (not a routine
   post-edit check), add that miss as a new numbered case in
   `references/eval-prompts.md` per its own § Seeding new cases — so it
   can never silently regress back in. **This step is mandatory, not
   optional, whenever a live miss is the trigger** — a corrected mistake
   that isn't seeded as a permanent case is exactly the "learn from it so
   it doesn't happen again" failure mode this suite exists to close.

## Output

A short report (retrospective and prospective share this shape):

```
HARNESS AUDIT — <date range | "prospective check after <edit>">
- N routing decisions logged, N fallbacks, N misroutes   (retrospective)
- N eval cases run, N passed, N failed                    (prospective)
- Pattern / failing case(s): <observed pattern, or which case(s) mismatched and why>
- Proposed fix: <specific line edit to harness/ORCHESTRATOR.md or harness/logs/routing-standards.md>
```

Propose fixes as diffs the designer can approve — this skill does not edit
`harness/ORCHESTRATOR.md` unilaterally **unless** the designer’s request
explicitly asks to apply/fix the gaps (e.g. “fix silent freestyling”,
“add the missing rows”). In that case, apply the edits, log them, and
still show the audit report.

## External skill-pack scans — default informational-only

**Found 2026-08-09** (retrospective, triggered by a designer worry about
expansion pace): reading `harness/logs/routing-log.md`'s last two weeks
shows a repeated shape — designer shares an external reference,
agent scans it, and an open-ended follow-up ("worth adopting?") gets
read as implicit go-ahead to build. Roughly a dozen external
references each ended in shipped skills this way over ~5 days —
breadth-first expansion, not hardening, and never named as a
deliberate phase.

**Rule going forward:** an external skills-repo/article link, on its own,
is **informational-only** — read it, compare it to the current roster,
report gaps/overlaps, stop. Building a new skill (or extending an
existing one) from that comparison requires an **explicit, separate**
build ask afterward ("build the gap you found," "ship that," "yes,
adopt it") — not an open-ended "worth adopting?"/"anything good here?"
read into as a go-ahead. If the designer's follow-up is itself ambiguous
between "just curious" and "go build it," ask (`AskQuestion` if
available) rather than defaulting to build.

This does not undo the skills already shipped this way — it stops the
next one from happening on an implicit read, and gives the retrospective
audit above a real chance to catch up before the roster grows further.

## Docs freshness reminder (after §2 / new-skill changes)

If this run was triggered by (or itself applied) a change to
`harness/ORCHESTRATOR.md` §2, a skill frontmatter description, or a new
skill, check whether `harness/logs/docs-freshness.md` already has a
**same-day** line covering that change. If not, end the report with one
line:

> Docs freshness still due — run the checklist in
> `documentation/maintainers/docs-freshness.md` (README / harness-flow / HOWTO-SKILLS /
> Design Harness how-to decks / agents) and append to
> `harness/logs/docs-freshness.md`.

Do not silently skip overview docs when the routing table moved.
