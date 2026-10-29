# Skill-output benchmarking log — append-only

Every `harness/skills/audit/SKILL.md` run logs one line here (Step 3.4),
PASS or BLOCKED, every time — passive data collection for the
skill-output-benchmarking idea in
`documentation/maintainers/skill-benchmarking.md`. No automatic rollup runs against
this file — read it directly and summarize the requested slice on
demand.

Not to be confused with `harness/skills/benchmark/SKILL.md` (competitor
gap analysis for a single screen) — this file tracks skill *output
quality* trend across runs, over time, not a competitor comparison.

This file accumulates real per-run task data, so — same convention as
`harness/logs/routing-log.md` — the live file at this path is
gitignored; copy this header to start it. This tracked copy stays
template-only.

Format: `YYYY-MM-DD | <skill(s)> | <task slug or —> | PASS/BLOCKED | <blocking>/<advisory> | <categories or —>`

---
