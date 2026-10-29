# Routing log — format example

`harness/logs/routing-log.md` (the real, live file every skill/rule
appends to) is gitignored — same `.local`-style convention as
`context/org-pack.local/`, `designer-profile.local.md`, and
`projects.local/`, just enforced via the exact-path `.gitignore` rule
below instead of a `.local` suffix, because the filename is referenced
literally throughout `harness/` and `.cursor/rules/`.

**First run:** if `harness/logs/routing-log.md` doesn't exist yet, copy
this file to that path (or just create it) with the header below, then
start appending. It will never get committed.

---

# Routing log

Append-only. One line (or short dated block) per routing decision —
matched or fallback, task-scoped or not. Primary input for
`harness/harness-audit/SKILL.md`.

2026-08-05 — FALLBACK — org overview ask (product/content design teams by domain); answered from the team directory + COMPANY-SQUADS.md + weekly stand-up pages.
2026-08-06 — FALLBACK — Cursor license access for new hire; answered from Access Management Guidelines + SRE ticket pattern + design onboarding docs.
