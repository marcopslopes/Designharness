# design-kickoff

<!-- generated-from-skill: do not edit -->

The mandatory front door for ANY new project, feature, initiative, or design request in this repo, no matter how vague.

**Triggers:** see the routing table

<!-- /generated-from-skill -->

Research-first discovery process for net-new projects - enforces evidence before building.

## What It Does

**Structured discovery workflow** that:
1. Checks who's already working on this
2. Researches existing solutions and context
3. Maps assumptions (known vs believed) from that sweep
4. Drafts job stories into the brief (from evidence, Assumed if thin)
5. Waits for your approval BEFORE building
6. After approval: offers diagnostic / objects / strategy if those are still empty — does not jump straight to screens

**Prevents wasted builds** by requiring research upfront.

---

## When to Use

Use `design-kickoff` when:
- Starting a net-new project
- Exploring a new feature
- Revisiting an old idea
- Responding to a new ask

### Trigger Phrases
```
"Kick off discovery on [feature]"
"Start a project for [feature]"
"Research [topic]"
"What do we know about [feature]?"
```

---

## How It Works

### Step 1: Workload Check
Uses `workload-agent` to answer:
- Is anyone already working on this?
- Is this on the roadmap?
- Where does it fit in priorities?

**Stops here if work exists** - avoids duplication.

### Step 2: Deep Research
Uses `research-agent` to search:
- Tickets (past and present)
- Slack channels (discussions, decisions)
- Figma files (existing designs)
- Miro boards (workshops, research)

**Gathers evidence** - doesn't invent.

### Step 3: Evidence Synthesis
Drafts structured brief:
```
## Context
(Background from research)

## What Exists
(docs pages, tickets, chat threads, Figma files)

## What We Know
(Decisions, constraints, goals)

## Open Questions
(Gaps in knowledge)

## Recommended Next Steps
(Research-backed suggestions)
```

### Step 4: Approval Gate
**STOPS and waits for you to say "go"**

You review the brief and either:
- ✅ Approve: "Looks good, build it"
- ❌ Revise: "Add more research on X"
- ⏸️ Pause: "Not ready yet"

### Step 5: Build (If Approved)
Only after approval:
- Routes to `ui-agent` (or appropriate build skill)
- Builds using evidence from brief
- Saves to `projects/<slug>/`

---

## Example Flow

### Request
```
You: "Kick off discovery on referral improvements"
```

### Step 1: Workload Check
```
workload-agent results:
- No active design work on referrals
- Referral program is in Plan stage on roadmap
- Last work: 6 months ago (PROJ-567 - abandoned)
```

### Step 2: Research
```
research-agent results:

Tracker:
- PROJ-567: Referral MVP (closed, 2025-12)
- PROJ-234: Growth roadmap mentions referrals
- 3 bugs on existing referral flow

Slack:
- #growth: "Referral drop-off at 60%" (2026-01)
- #product: PM approved referral v2 (2026-03)

Figma:
- Referral Entry Points exploration (outdated)
- No approved comps for v2

Miro:
- Workshop: Referral incentive models (2025-11)
```

### Step 3: Brief
```
# Referral Improvements Project

## Context
Existing referral flow has 60% drop-off. PM approved v2 in Q1.
Prior MVP (PROJ-567) closed without shipping.

## What Exists
- Old Figma exploration (not approved)
- Workshop materials on incentive models
- 3 open bugs on current flow

## What We Know
- Drop-off point: After initial share
- Goal: Reduce friction, improve completion
- Constraint: Can't change incentive model (legal)

## Open Questions
- Which platform to prioritize? (iOS vs Android vs web)
- Should we fix bugs first or redesign?
- What does PM consider success?

## Recommended Next Steps
1. Sync with PM on success criteria
2. Fix critical bugs first
3. Then explore entry point improvements
```

### Step 4: Approval
```
WAITING FOR YOUR REVIEW

Options:
✅ "Looks good, build entry points"
🔄 "Add research on competitor referral flows"
⏸️ "Let me sync with PM first"
```

### Step 5: Build (After Approval)
```
You: "Looks good, build entry points"

→ ui-agent kicks off
→ Builds referral entry points using brief context
→ Saves to projects/referral-improvements/
```

---

## What You Get

### Saved Files
```
projects/referral-improvements/
├── brief.md         ← Evidence-based brief
├── findings.md      ← Research results
├── decisions.md     ← Choices made during discovery
└── log.md           ← Timeline of the process
```

### Clear Next Steps
You know:
- What research backs this
- What constraints exist
- What open questions remain
- Whether to build, wait, or pivot

---

## Chains With

`design-kickoff` uses these skills:
1. **`workload-agent`** - Check for existing work
2. **`research-agent`** - Deep discovery
3. **`ui-agent`** (post-approval) - Build screens
4. **`deck-builder`** (optional) - Present findings

---

## When It Skips Research

### Scenario 1: Iteration on Existing
```
You: "Add a filter to the leaderboard"

→ Skips kickoff (not net-new)
→ Goes straight to ui-agent
```

### Scenario 2: Explicit Build Request
```
You: "Build a settings screen (no research needed)"

→ Respects your directive
→ Skips kickoff
→ Goes to ui-agent
```

### Scenario 3: Already in Project Folder
```
You're in projects/referrals/ folder
You: "Build the entry point now"

→ Assumes kickoff already happened
→ Uses existing brief.md
→ Goes to ui-agent
```

---

## Benefits

### Prevents Waste
❌ Before: Build first, discover constraints later (rework)  
✅ After: Research first, build once with confidence

### Evidence-Based
❌ Before: "I think users want X"  
✅ After: "Chat thread + ticket show users want X"

### Avoids Duplication
❌ Before: Two designers unknowingly work on same thing  
✅ After: Workload check catches overlap

### Clear Handoffs
❌ Before: New chat = start from scratch  
✅ After: Brief saved to `projects/`, resumable

---

## Customization

### Research Scope
Configure which tools to search:
- Tracker projects or teams (default: all design boards)
- Docs spaces or teamspaces (default: everything you can read)
- Chat channels (default: #product, #design, #growth)
- Figma teams (default: your org)
- Miro boards (default: design team)

Set in `harness/skills/research-agent/references/`

### Approval Workflow
Bypass approval for trusted patterns:
```
"Kick off referrals (skip approval)"
```
Still runs research, just doesn't stop.

---

## Tips

### 1. Use for Net-New Only
Don't kickoff for iterations:
```
❌ "Kick off card height change"
✅ "Kick off city leaderboard feature"
```

### 2. Review Brief Carefully
The brief drives everything after approval - make sure it's right.

### 3. Ask for More Research
If the brief feels thin:
```
"Add research on competitor referral flows"
```
research-agent runs again, updates brief.

### 4. Save Time: Skip if You Know
If you already have full context:
```
"Build referral entry points (skip research)"
```

---

## Troubleshooting

### "No research results found"
**Problem:** Might be truly net-new, or search scope too narrow

**Options:**
1. Expand search (add Slack channels, Figma teams)
2. Accept it's net-new (brief will say "no prior work")

### "Research found too much"
**Problem:** Overwhelming results (common for big topics)

**Fix:** Narrow scope:
```
"Kick off discovery on referral entry points (iOS only)"
```

### "Waiting for approval but I want to build now"
**Problem:** Approval gate blocking you

**Options:**
1. Review brief, then approve
2. Or: "Skip approval, build now" (bypasses gate)

---

## Related Skills

- [workload-agent](workload-agent.md) - Used in Step 1
- [research-agent](research-agent.md) - Used in Step 2
- [ui-agent](ui-agent.md) - Used in Step 5 (post-approval)
- [deck-builder](deck-builder.md) - Present findings to stakeholders

---

## Related Guides

- [Understanding Skills](../guides/understanding-skills.md)
- [What is the Harness?](../guides/what-is-the-harness.md)
