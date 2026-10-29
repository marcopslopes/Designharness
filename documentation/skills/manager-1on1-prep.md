# manager-1on1-prep

Prepares context-rich 1:1 agendas with your reports - saves hours of prep.

## What It Does

**Generates 1:1 prep** that includes:
- Their current work (from your tracker)
- Recent progress and blockers
- Discussion topics
- Career context
- Suggested talking points

**Manager-only skill** - requires `role: manager` in profile.

---

## When to Use

Use `manager-1on1-prep` when you want to:
- Prep for upcoming 1:1
- Review someone's recent work
- Check for blockers
- Context before skip-level

### Trigger Phrases
```
"Prep for 1:1 with [name]"
"Get context on [name]'s work"
"What's [name] working on?"
"1:1 prep for [name]"
```

---

## How It Works

### Step 1: Workload Check
Uses `workload-agent` to pull:
- Current tickets (In Progress, Review, Blocked)
- How long in each state
- Next up in queue

### Step 2: Recent Activity
Searches last 2 weeks:
- Tickets completed
- Comments added
- Status changes
- Cross-team collaboration

### Step 3: Context Discovery
Uses `research-agent` to find:
- Slack mentions of their work
- Design files they've updated
- Miro boards they contributed to

### Step 4: Agenda Generation
Creates structured prep:
```
# 1:1 Prep: [Name]
Date: [today]

## Current Work
[What they're working on + status]

## Recent Progress
[What they shipped/completed]

## Blockers
[What's stuck + how long]

## Discussion Topics
[Suggested agenda items]

## Career Context
[Growth trajectory, interests]

## Talking Points
[Questions to ask]
```

---

## Example Output

### Input
```
Manager: "Prep for 1:1 with Alex"
```

### Output
```
# 1:1 Prep: Alex Chen
Date: 2026-08-27

## Current Work (from tracker, live)
In Progress:
- [PROJ-111] Navigation redesign (5 days)
  Status: In design review
  
In Review:
- [PROJ-222] Mobile patterns library (completed, awaiting approval)

Next Up:
- [PROJ-333] Onboarding improvements (ready to start)

## Recent Progress (last 2 weeks)
Completed:
- [PROJ-199] Settings screen (shipped)
- [PROJ-200] Icon system updates (shipped)

Velocity: 2 tickets/week (on pace)

## Blockers
⚠️ PROJ-111 in review for 3 days
- Waiting on PM approval for navigation changes
- Could unblock by Friday?

## Discovery Context (from research)
Slack:
- #design: Alex shared navigation prototypes (positive feedback)
- #product: PM asked for nav options (Alex provided 3)

Figma:
- Navigation redesign exploration (updated yesterday)
- Received comments from 2 teammates

Miro:
- Participated in onboarding workshop last week

## Discussion Topics
1. Navigation review status - can we unblock?
2. Celebrate: Settings screen shipped!
3. Mobile patterns library - ready to share?
4. Onboarding project - context needed?
5. Career: Growing towards senior IC role

## Talking Points
Questions to ask:
- "How do you feel about nav redesign progress?"
- "What would help unblock the PM approval?"
- "Ready to start onboarding, or need more context?"
- "Anything blocking you I haven't mentioned?"

Recognition:
- Velocity is strong (2/week sustained)
- Mobile patterns library is high-quality work
- Good cross-team collaboration (workshop participation)

## Career Context
- Senior IC track
- Strengths: Systems thinking, cross-platform design
- Growth area: Stakeholder communication (working on it)
- Next milestone: Lead a multi-sprint initiative

## Notes
- Last 1:1: Discussed wanting to lead larger projects
- Onboarding could be that opportunity
- Check in on PM communication skills
```

---

## Chains With

`manager-1on1-prep` uses:
- `workload-agent` (current work)
- `research-agent` (recent activity)
- Designer profiles (career context)

---

## Tips

### 1. Run Right Before 1:1
Data is live - run within 24 hours of meeting.

### 2. Add Your Own Context
Prep is a starting point - add personal notes:
```
"Add note to Alex's 1:1 prep: Discuss conference attendance"
```

### 3. Use for Skip-Levels
Works for any report:
```
"Prep for 1:1 with Jordan (skip-level)"
```

### 4. Track Over Time
Save prep files to see trends:
```
projects/1on1s/alex/2026-08-27.md
```

---

## Privacy

### What It Accesses
- ✅ Tickets (visible to you as manager)
- ✅ Slack in shared channels
- ✅ Figma in team workspace
- ✅ Miro in team boards

### What It Doesn't
- ❌ Private DMs
- ❌ Personal notes
- ❌ Calendar events
- ❌ Performance reviews (unless you add manually)

---

## Related Skills

- [workload-agent](workload-agent.md) - Team workload
- [research-agent](research-agent.md) - Context discovery
- [people-coaching](people-coaching.md) - Career development
