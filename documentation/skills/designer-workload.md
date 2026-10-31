# designer-workload

<!-- generated-from-skill: do not edit -->

Kept so older links still resolve.

<!-- /generated-from-skill -->

Personal workload view - your queue, priorities, blockers.

## What It Does

**Shows your work** including:
- In progress tickets
- Ready to start
- Blocked/waiting
- Recently completed
- Upcoming priorities

**Personal view** - just your queue, not team-wide.

---

## When to Use

This page is kept for old links. It has no trigger phrases. Workload and
roadmap questions go to `workload-agent`.

---

## Example Output

```
Your Design Queue (live from tracker, 2026-08-27 14:30)

## In Progress
1. [PROJ-111] Navigation redesign (5 days)
   Status: In design review
   
2. [PROJ-222] Mobile patterns library
   Status: Ready for approval

## Blocked / Waiting
1. [PROJ-333] Settings IA
   Blocked by: PM approval on structure
   Duration: 3 days
   Action: Follow up with Alex

## Ready to Start
1. [PROJ-444] Onboarding improvements
   Priority: High
   Est: 2 weeks

2. [PROJ-555] Icon system updates
   Priority: Medium
   Est: 3 days

## Recently Completed (last 2 weeks)
- [PROJ-199] Settings screen → Shipped
- [PROJ-200] Profile updates → Shipped

## Capacity
- Active: 2 tickets
- Blocked: 1 ticket
- Next up: 2 ready
- Velocity: 2 tickets/week (on pace)
```

---

## Chains With

`designer-workload` is a simpler version of `workload-agent`:
- `workload-agent` = team-wide + roadmap
- `designer-workload` = personal queue only

---

## Tips

### 1. Check Daily
Start your day with:
```
"What am I working on?"
```

### 2. Unblock Yourself
If blocked >2 days, escalate.

### 3. Prioritize Ready Items
Don't start new work if In Progress items need finishing.

---

## Related Skills

- [workload-agent](workload-agent.md) - Team-wide workload
- [manager-1on1-prep](manager-1on1-prep.md) - Manager uses this for 1:1s
