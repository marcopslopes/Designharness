# design-debt-tracker

<!-- generated-from-skill: do not edit -->

Standalone triage and review of the per-project design debt register (`projects/<slug>/debt.md`).

**Triggers:** "show me the design debt" · "what did we defer" · "triage the debt register" · "escalate this debt" · "what open advisories do we still owe" · "clean up debt.md"

<!-- /generated-from-skill -->

Tracks design debt - deferred issues, inconsistencies, technical debt.

## What It Does

**Manages design debt** by:
- Logging deferred issues
- Tracking inconsistencies
- Prioritizing fixes
- Planning paydown

**Debt register** - never forget what needs fixing.

---

## When to Use

Use when you:
- Defer audit findings
- Ship with known issues
- Identify inconsistencies
- Need to plan cleanup

### Trigger Phrases
```
"Log design debt for [issue]"
"Track this inconsistency"
"Add to debt register"
"Show design debt"
```

---

## Example

```
Design Debt Register: City Leaderboard

CRITICAL (Fix Next Sprint):
1. Empty state missing
   - Logged: 2026-08-20
   - Impact: Blocks new users
   - Effort: 2 hours
   - Owner: Daniel

HIGH (Fix Within Month):
2. Loading skeleton deferred
   - Logged: 2026-08-22
   - Impact: Poor perceived performance
   - Effort: 4 hours
   - Owner: Unassigned

MEDIUM (Plan for Q4):
3. Trend data missing
   - Logged: 2026-08-24
   - Impact: User request (nice-to-have)
   - Effort: 2 weeks
   - Owner: Backlog

Total debt: 3 items
Estimated paydown: 2 weeks effort
```

---

## Related Skills

- [audit](audit.md) - Identifies debt
- [design-retrospective](design-retrospective.md) - Reviews debt
- [publish-project](publish-project.md) - Logs known debt
