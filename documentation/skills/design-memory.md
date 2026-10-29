# design-memory

Long-term project memory - searchable archive of past work and decisions.

## What It Does

**Creates searchable archive** of:
- Past projects
- Design decisions
- Research findings
- What worked / didn't work
- Lessons learned

**Institutional knowledge** - never forget why you did something.

---

## When to Use

Use `design-memory` when you want to:
- Search past projects
- Learn from previous work
- Avoid repeating mistakes
- Find similar solutions

### Trigger Phrases
```
"Search design memory for [topic]"
"What did we learn about [feature]?"
"Find past work on [topic]"
"Design history of [feature]"
```

---

## How It Works

### Step 1: Index Projects
Scans `projects/` folder:
- All briefs, findings, decisions
- Prototypes and artifacts
- Timestamps and owners

### Step 2: Search
Query across:
- Project names
- Decision records
- Research findings
- Tags and keywords

### Step 3: Results
Returns relevant:
- Project summaries
- Key decisions
- Outcomes (shipped? abandoned?)
- Lessons learned

---

## Example

### Input
```
You: "Search design memory for referral programs"
```

### Output
```
Design Memory: Referral Programs

## Past Project: Referral MVP (2025-12)
Status: Closed / Abandoned
Designer: Previous designer
Duration: 6 weeks

Summary:
Initial attempt at referral feature. Built MVP with
copy-link sharing. Abandoned due to low engagement (5% use).

Key Decisions:
- Placed in settings (DECISION: Hidden placement)
- Copy-link only (DECISION: No social share buttons)
- Generic messaging (DECISION: No personalization)

What Went Wrong:
- Hidden placement = low discoverability
- Friction (copy-paste) too high
- No clear incentive upfront

Lessons Learned:
1. Don't hide growth features
2. Social share buttons matter
3. Lead with incentive, not feature

Artifacts:
- Brief: projects/referral-mvp/brief.md
- Prototype: Deprecated
- Jira: PROJ-567 (closed)

## Related Research: Growth Workshop (2025-11)
Topic: Referral incentive models
Findings:
- Fixed $ amount outperforms % discount
- Progress tracking increases completion
- Social proof (# referred) motivates

Miro: [link to workshop board]

## Recommendation for New Work:
Based on past learnings:
1. Use prominent placement (not settings)
2. Add social share buttons
3. Show incentive upfront
4. Include progress tracker
5. Test before full launch
```

---

## Chains With

`design-memory` helps:
- `design-kickoff` (check past work)
- `research-agent` (find internal precedent)
- `design-retrospective` (learn from past)

---

## Tips

### 1. Search Before Starting
```
"Search design memory before starting X"
```
Learn from past attempts.

### 2. Update After Shipping
```
"Add to design memory: [project] shipped successfully"
```
Record outcomes.

### 3. Tag Projects
Use consistent tags:
```
#growth, #onboarding, #navigation, #referrals
```

---

## Related Skills

- [design-retrospective](design-retrospective.md) - Learn from past
- [research-agent](research-agent.md) - Current context
- [design-rationale](design-rationale.md) - Record decisions
