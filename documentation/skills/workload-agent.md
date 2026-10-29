# workload-agent

Live snapshot of your team's roadmap and current work - always fresh, never cached.

## What It Does

Shows **3 views** of design team workload:
1. **Roadmap** - What product initiatives are active
2. **Execution** - What designers are working on
3. **Overlap** - Where roadmap and design work align (or gap)

**Always live-queries your tracker** (Jira, Linear, or GitHub) - never uses stale data.

---

## When to Use

Use `workload-agent` when you want to know:
- What's on the roadmap?
- Who's working on what?
- Is anyone already on this feature?
- Do we have bandwidth for X?
- What's stuck in review?
- What's my team working on?

### Trigger Phrases
```
"What's on the roadmap?"
"Who's working on payments?"
"Check the project board"
"Is anyone on referrals already?"
"What's the design team capacity?"
"Show my queue"
"What's my team working on?" (managers)
```

---

## What You Get

### For Individual Contributors
```
Your Design Queue (live from tracker, 2026-08-27 14:30)

In Progress:
- [PROJ-123] City leaderboard design
- [PROJ-456] Settings IA improvements

Ready to Start:
- [PROJ-789] Referral entry points

Blocked/Waiting:
- [PROJ-234] Checkout flow (waiting on API)

Roadmap Context:
Payments initiative is active on roadmap (Make stage)
- Designer: You (PROJ-456 aligns)
- Gap: No designer on wallet integration yet
```

### For Managers
```
Team Snapshot (live from tracker, 2026-08-27 14:30)

Alex Chen:
- [PROJ-111] Navigation redesign (In Progress, 5 days)
- [PROJ-222] Mobile patterns (Review)
- Next: [PROJ-333] Onboarding (Ready)

Jordan Kim:
- [PROJ-444] Search improvements (In Progress, 2 days)
- Blocked: [PROJ-555] Filters (waiting on data)

Maria Garcia:
- [PROJ-666] Settings (In Progress, 8 days) ⚠️ Long-running
- Next: [PROJ-777] Profile (Ready)

Capacity: 2/3 active, 1 blocked
```

---

## How It Works

### Query 1: Roadmap Boards
Checks product roadmap:
- Active initiatives
- Pipeline stage (Make, Plan, Explore)
- Domain/squad ownership

### Query 2: Design Boards
Checks designer execution:
- Who's assigned what
- Status (In Progress, Review, Blocked)
- How long in current state

### Query 3: Cross-Reference
Compares roadmap vs design work:
- Alignment: Roadmap initiative HAS designer
- Gap: Roadmap initiative NO designer assigned
- Orphan: design work NOT on roadmap

---

## Use Cases

### Use Case 1: Starting New Work
```
You: "Is anyone working on referrals?"

workload-agent:
"No active design work on referrals.

Roadmap shows:
- Referral program initiative (Plan stage)
- No designer assigned yet

You could pick this up."
```

### Use Case 2: Checking Capacity
```
You: "Do we have bandwidth for checkout improvements?"

workload-agent:
"Team capacity:
- 3 designers with active work
- 1 designer blocked (waiting on eng)
- 2 tickets in Ready state

Roadmap context:
- Checkout optimization is in Make stage
- Currently no designer assigned

Recommend: Assign to designer who's blocked"
```

### Use Case 3: Manager Check-In
```
Manager: "What's my team working on?"

workload-agent:
(Shows per-person breakdown with:
 - Active work + duration
 - Blocked items
 - Next up
 - Flags for long-running or stale work)
```

---

## Manager Mode

If your profile has `role: manager`:
- **Different output** - per-report team snapshot
- **No personal queue** - shows your team, not your own tickets
- **Capacity view** - how loaded is each person

Triggers:
```
"What's my team working on?"
"Team workload"
"Who's available?"
```

---

## Roadmap Coverage

Checks these domains (configurable per company):
- Payments
- Growth
- Core product
- Platform
- Design system

**Your company's boards** are defined in `harness/skills/workload-agent/references/roadmap-boards.md`

---

## Freshness Guarantee

Every query:
- ✅ Hits your tracker live (via MCP)
- ✅ Shows query timestamp
- ✅ Never uses cached data
- ✅ Reflects current state

**Why?** Stale workload data leads to double-assignment and missed work.

---

## Chains With

`workload-agent` runs automatically in:
- `design-kickoff` Step 1a (who's already on this?)
- Manager onboarding handoff (team snapshot)
- `manager-1on1-prep` (individual workload)

You can also call it standalone anytime.

---

## Common Patterns

### Pattern 1: Before Starting Work
```
You: "Is anyone on city leaderboard?"

workload-agent: "No active work. Safe to start."

You: "Kick off discovery on city leaderboard"
```

### Pattern 2: Checking Blockers
```
You: "What's stuck?"

workload-agent:
"Blocked items:
- [PROJ-555] Filters (waiting on API, 4 days)
- [PROJ-789] Export (needs PM approval, 2 days)"
```

### Pattern 3: Finding Gaps
```
You: "What on the roadmap has no designer?"

workload-agent:
"Roadmap gaps:
- Wallet integration (Make stage) - no designer
- Search v2 (Plan stage) - no designer"
```

---

## Customization

During harness setup, your squad is:
- Auto-resolved from company directory (if name matches)
- Or asked first time you use a skill that needs it
- Or set via "update my profile"

**Squad affects:**
- Which boards `workload-agent` checks by default
- Which domains are prioritized
- Cross-reference logic

---

## Limitations

### Won't Do:
- ❌ Cache or predict future state
- ❌ Make assignments for you
- ❌ Update tickets (read-only)
- ❌ Show work outside configured boards

### Will Do:
- ✅ Live query every time
- ✅ Cross-reference roadmap vs design
- ✅ Flag gaps and orphans
- ✅ Show timestamp for freshness

---

## Tips

### 1. Check Before Starting
Avoid duplicate work:
```
"Is anyone on [feature]?" → workload-agent
```

### 2. Use for Planning
See what's coming:
```
"What's on the roadmap for Q3?"
```

### 3. Managers: Regular Snapshots
Weekly check:
```
"Team workload" → spot long-running or blocked work
```

---

## Troubleshooting

### "No results for my squad"
**Problem:** Squad not configured or boards not set up

**Fix:**
1. Check `designer-profile.local.md` has squad
2. Or run "update my profile"

### "Roadmap shows old data"
**Problem:** Shouldn't happen - workload-agent always queries live

**Check:**
- Did the query timestamp update?
- Is your tracker MCP (Atlassian, Linear, or GitHub) connected?

### "Missing my ticket"
**Problem:** Ticket might not be on configured boards

**Check:** Which board is your ticket on? Is it in the workload-agent board list?

---

## Related Skills

- [design-kickoff](design-kickoff.md) - Auto-runs workload check
- [manager-1on1-prep](manager-1on1-prep.md) - Uses workload for 1:1s
- [research-agent](research-agent.md) - Pulls context on found work

---

## Related Guides

- [Onboarding](../guides/onboarding.md) - Shows queue on first setup
- [Understanding Skills](../guides/understanding-skills.md)
