# roadmap-prioritization

<!-- generated-from-skill: do not edit -->

Turns a flat list of design tickets/tasks into a ranked order, using explicit evidence (research, usage, business goal) and honest effort ("appetite") instead of gut feel or whoever asked loudest.

**Triggers:** "help me prioritize this backlog" · "which of these should I do first" · "rank these tickets" · "what should I work on next" · "we have 5 things and no time, which matters most" · "is this actually more important than that"

<!-- /generated-from-skill -->

Prioritizes design work - what to do first, based on impact and effort.

## What It Does

**Prioritization framework** that scores:
- User impact (high/medium/low)
- Business value (high/medium/low)
- Design effort (high/medium/low)
- Engineering effort (high/medium/low)
- Strategic alignment

**Data-driven prioritization** - not gut feelings.

---

## Example

```
You: "Prioritize Q4 roadmap"

Output:
Priority 1: City leaderboard
- Impact: High (engagement, retention)
- Effort: Medium (2 weeks design, 2 weeks eng)
- Score: 9/10

Priority 2: Settings IA
- Impact: Medium (reduces support tickets)
- Effort: Low (1 week design, 1 week eng)
- Score: 7/10

Priority 3: Advanced filters
- Impact: Low (power user feature)
- Effort: High (4 weeks design, 6 weeks eng)
- Score: 3/10

Recommendation: Do 1, then 2. Defer 3 to Q1.
```

---

## Related Skills

- [okr-goal-setting](okr-goal-setting.md) - Defines goals
- [workload-agent](workload-agent.md) - Checks capacity
