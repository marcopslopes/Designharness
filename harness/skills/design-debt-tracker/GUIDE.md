# Design debt tracker — how it works

The **design-debt-tracker** skill reviews and triages the per-project
debt register (`projects/<slug>/debt.md`) so deferred critique/audit
advisories stay visible across iterations.

Agents load the full protocol from
[`harness/skills/design-debt-tracker/SKILL.md`](SKILL.md).
Row format + the post-pass fix-or-log prompt live in
[`harness/references/project-debt-register.md`](../../references/project-debt-register.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/design-debt-tracker/SKILL.md` |
| Register format | `harness/references/project-debt-register.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/debt.md` |
| Distinct from | `KNOWN-ISSUES.md` (DS/harness structural debt only) |

---

## What problem it solves

Minor and Note findings get a shrug ("fix if time allows") and disappear.
This skill makes those promises reviewable, escalatable, and closable.

---

## What it does NOT do

- Does **not** replace the AskQuestion after `audit` / design-critique that
  offers fix-now / log / accept — that still writes the first rows
- Does **not** hold DS structural debt — that's `KNOWN-ISSUES.md`

---

## What you say (plain language)

- "Show me the design debt on referrals"
- "What did we defer on this project?"
- "Triage debt.md — anything aging?"
- "Mark DD-003 resolved — fixed in yesterday's pass"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Before planning next iteration | "What open debt do we still owe?" |
| A11y minor keeps slipping | "Escalate the toast timeout debt" |
| Cleaning after a ship | "Accept DD-004 — one-time setup, not worth it" |

Acceptance walkthrough: [`tests/scenarios.md`](../../../tests/scenarios.md)
Scenario 35.

---

## Related

| Doc | Role |
|-----|------|
| [`roadmap-prioritization`](../roadmap-prioritization/GUIDE.md) | Rank named debt items as backlog |
| [`harness/docs/critique-system.md`](../../docs/critique-system.md) | Critique → debt scope |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
