# Skill-output benchmarking over time (`skill-benchmarking.md`)

**Status: implemented 2026-08-04.** Live in
`harness/skills/audit/SKILL.md` Step 3.4 (logging step) and
`harness/logs/skill-benchmarking.md` (the append-only log itself).
Sparked by reading external agentic-AI/design articles on 2026-08-04
(see `designer-context.local/sources.md`), routed as a
harness-audit-adjacent ask with no exact §2 row — see
`harness/logs/routing-log.md` 2026-08-04. This doc stays as the
design-rationale record; the open questions below are still genuinely
open and worth revisiting once there's enough real usage to check them
against.

**Naming note:** this used to be called `audit-history.md` /
"HOWTO-AUDIT-HISTORY" — renamed 2026-08-04 because "audit" already means
the pre-share Design Harness screen sweep (`harness/skills/audit/SKILL.md`) in
this repo, and the name collided. Also **not** the same as
`harness/skills/benchmark/SKILL.md` (competitor gap analysis for one
the company screen against 2-3 best-in-class examples) — that's a comparison
against *other products*; this is a trend of *this repo's own skill
output quality* across runs, over time. Two different existing uses of
"benchmark"-shaped words in this repo; keep them distinct in
conversation.

Answers: *"Is skill output getting better or worse over many runs, over
time?"* — after the fact, across a history of runs. Complements
`harness-audit` (retrospective *routing*-log mining) — this is
retrospective *output-quality* mining instead.

---

## The gap

`audit` gives a per-run pass/fail. `harness-audit` mines
`routing-log.md` for *routing* misses. Nothing tracked whether a given
skill's *output quality* (not routing correctness) is trending up or
down across many runs — e.g., is `ui-agent`'s token-compliance rate
improving after a `design-system` tightening, or did a recent
`ORCHESTRATOR.md` §7 edit quietly make things worse three tasks later?

## Proposed shape (now live)

Piggyback on data that already exists rather than inventing new
telemetry:

- **Source of truth**: `audit`'s own pass/fail + flagged-issue list,
  already produced per run. `audit/SKILL.md` Step 3.4 appends one line
  per run — PASS or BLOCKED — to `harness/logs/skill-benchmarking.md`
  (same append-only shape as `routing-log.md`):

  ```
  YYYY-MM-DD | <skill(s)> | <task slug or —> | PASS/BLOCKED | <blocking>/<advisory> | <categories or —>
  ```

  Categories reuse the bracket tags `audit` already produces
  (`[DS-*]`, `[A11Y-*]`, `[COPY-*]`, `[PATTERN-*]`) — no parallel
  taxonomy invented.

- **Rollup, not real-time**: no script or skill reads
  `skill-benchmarking.md` automatically. When a trend is wanted (e.g.
  "is `ui-agent` getting cleaner since the `design-system` tightening"),
  read the file directly and summarize the requested slice on demand —
  same "no CI, every designer runs their own clone" trust model as
  everything else in this repo (`INSTALL.md` § Use it with a team).
- **Deliberately excludes** "speed" and "token cost" (the Storybook
  demo's other two metrics from the article that sparked this) — this
  repo has no shared infra to measure either meaningfully
  per-designer-clone. Issue count/category is the one metric that's
  genuinely comparable across runs without new instrumentation.

## Open questions

1. Is per-skill trend actually the useful cut, or per-token/pattern
   (e.g. "Sea accent misuse" specifically, regardless of which skill
   built the screen)? `KNOWN-ISSUES.md` already tracks some of this by
   issue, not by skill — may be redundant to also cut it by skill.
2. At what point does `skill-benchmarking.md` need an actual rollup
   script/skill rather than "read it and summarize on demand" — is there
   a run-count threshold where manual reading stops scaling?
3. Should `KNOWN-ISSUES.md` itself start cross-referencing
   `skill-benchmarking.md` rows once a known issue recurs enough times
   to be worth citing frequency, not just existence?

## Related

| Doc | Role |
|-----|------|
| [`harness/skills/audit/SKILL.md`](../../harness/skills/audit/SKILL.md) Step 3.4 | The live logging step this doc explains |
| [`harness/logs/skill-benchmarking.md`](../../harness/logs/skill-benchmarking.md) | The append-only log itself |
| [`harness/harness-audit/SKILL.md`](../../harness/harness-audit/SKILL.md) | Retrospective *routing*-log mining — the routing-side sibling of this output-side idea |
| [`harness/skills/benchmark/SKILL.md`](../../harness/skills/benchmark/SKILL.md) | **Different thing, similar name** — competitor gap analysis for one screen, not skill-output trend |
| [`KNOWN-ISSUES.md`](../../KNOWN-ISSUES.md) | Existing issue taxonomy — candidate categories/cross-reference target |
| [`documentation/guides/confidence-autonomy.md`](../guides/confidence-autonomy.md) | The companion confidence/autonomy idea from the same 2026-08-04 conversation |
| `designer-context.local/sources.md` | The external articles that sparked this (personal, gitignored) |
