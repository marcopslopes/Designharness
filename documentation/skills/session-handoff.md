# session-handoff

Seamless continuity when switching chats - never start from scratch again.

## What It Does

**Creates resumable handoffs** that include:
- What was accomplished
- Current project state
- Open decisions
- Next steps
- Links to artifacts

**Any chat can pick up where you left off** - context preserved.

---

## When to Use

Use `session-handoff` when you want to:
- End a work session
- Switch to a new chat
- Hand off to another designer
- Document progress

### Trigger Phrases
```
"Create handoff"
"End session"
"Save progress"
"Prepare handoff"
```

---

## How It Works

### Step 1: Progress Summary
Reviews this session:
- Skills invoked
- Files created/modified
- Decisions made
- Research completed

### Step 2: State Capture
Documents current state:
- Project folder contents
- Open questions
- Blockers
- Approvals needed

### Step 3: Next Steps
Identifies what's next:
- Immediate actions
- Pending decisions
- Handoff recipients

### Step 4: Handoff File
Creates `projects/<slug>/HANDOFF.md`:
```
# Session Handoff: [Project Name]
Date: [timestamp]
Last worked by: [you]

## What Got Done
[Summary of progress]

## Current State
[Where the project is now]

## Open Decisions
[What needs deciding]

## Next Steps
[What to do next]

## How to Resume
[Instructions for next person]

## Files
[Links to all artifacts]
```

---

## Example Output

### Input
```
You: "Create handoff for city leaderboard"
```

### Generated Handoff
```
# Session Handoff: City Leaderboard
Date: 2026-08-27 14:45
Last worked by: Daniel Okafor

## What Got Done This Session
Research:
- Ran workload check (no existing work found)
- Deep research via research-agent (found 3 tickets, 2 chat threads)
- Competitor scan (analyzed 3 competitors)

Design:
- Built CityLeaderboardScreen using ui-agent
- Passed audit (design system compliant)
- Created phone prototype (iPhone 15 Pro)

Documentation:
- Created brief.md
- Logged findings in findings.md
- Documented decisions in decisions.md

## Current State
Status: Design complete, ready for handoff

Files created:
- projects/city-leaderboard/CityLeaderboardScreen.tsx
- projects/city-leaderboard/brief.md
- projects/city-leaderboard/findings.md
- projects/city-leaderboard/decisions.md
- projects/city-leaderboard/log.md

Prototype: http://localhost:3002/city-leaderboard
Audit: ✅ PASS (0 issues)

## Open Decisions
1. Placement: Home tab vs dedicated screen?
   → Needs PM input (Alex)
   
2. Ranking criteria: Booking count only, or weighted?
   → Needs data team input (analytics)
   
3. Refresh frequency: Real-time vs daily snapshot?
   → Engineering trade-off to discuss

## Next Steps (Priority Order)
1. [ ] PM sync on placement (Alex, by Friday)
2. [ ] Create ticket for implementation
3. [ ] Create docs page for handoff
4. [ ] Schedule design review with team
5. [ ] Plan A/B test (vs control)

## Blockers
None currently - dependencies identified but not blocking design work.

## How to Resume
Next person (or next session):
```
"Review city leaderboard handoff"
"Create a ticket for city leaderboard"
"Schedule review for city leaderboard"
```

## Files & Links
- Project folder: projects/city-leaderboard/
- Prototype: http://localhost:3002/city-leaderboard
- Research: findings.md (4 sections)
- Decisions: decisions.md (3 key choices)
- Brief: brief.md (full context)
```

---

## Chains With

`session-handoff` runs:
- At end of `design-kickoff` flow
- After major work completion
- Before switching contexts
- On explicit "end session" request

---

## Tips

### 1. Handoff Often
Don't wait until "done" - handoff at logical checkpoints:
```
"Handoff after research phase"
"Handoff after design complete"
```

### 2. Make It Actionable
Handoff should tell next person exactly what to do.

### 3. Resume from Handoff
Start new chat with:
```
"Resume city leaderboard from handoff"
```

### 4. Use for Team Handoffs
Not just for yourself - great for:
- Designer on vacation
- Cross-functional handoffs
- New teammate onboarding

---

## Resuming Work

### From Handoff
```
You: "Resume city leaderboard from handoff"

Harness:
1. Reads projects/city-leaderboard/HANDOFF.md
2. Loads context (brief, findings, decisions)
3. Shows "You're resuming [project]. Last worked: [date]"
4. Shows next steps
5. Asks: "Where do you want to start?"
```

### Without Explicit Handoff
Even without handoff, the harness can resume:
```
You: "Continue city leaderboard work"

Harness:
1. Finds projects/city-leaderboard/ folder
2. Reads existing files (brief, findings, etc.)
3. Infers current state
4. Shows context
5. Asks: "What's next?"
```

But explicit handoff is better - more context preserved.

---

## Related Skills

- [design-kickoff](design-kickoff.md) - Creates initial context
- [publish-project](publish-project.md) - Final handoff
- [session-journal](session-journal.md) - Journal entry written at every handoff
