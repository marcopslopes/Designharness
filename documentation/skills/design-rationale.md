# design-rationale

Documents WHY you made specific design choices - for stakeholders and future you.

## What It Does

**Creates decision records** that capture:
- What was decided
- Why this choice (rationale)
- What alternatives were considered
- Trade-offs accepted
- Supporting evidence

**Makes implicit thinking explicit** - prevents "why did we do this?" later.

---

## When to Use

Use `design-rationale` when you want to:
- Document a significant choice
- Explain your reasoning
- Record trade-offs
- Prevent future second-guessing

### Trigger Phrases
```
"Document decision on [choice]"
"Create rationale for [design]"
"Record why we chose [option]"
"Log design decision"
```

---

## How It Works

### Step 1: Decision Identification
Captures:
- What was decided
- When
- Context (constraints, goals)

### Step 2: Rationale Articulation
Documents:
- Why this choice
- What evidence supports it
- What alternatives were considered
- Why alternatives were rejected

### Step 3: Trade-off Documentation
Records:
- What we gained
- What we gave up
- Risks accepted

### Step 4: Artifact Creation
Saves to `projects/<slug>/decisions.md`:
```
## Decision: [Title]
Date: [date]
Decider: [who]

### Context
[Background, constraints, goals]

### Decision
We chose [option A] over [option B, C]

### Rationale
[Why option A]

Evidence:
- [Research finding]
- [Constraint]
- [Principle]

### Alternatives Considered
Option B: [description]
- Pros: [list]
- Cons: [list]
- Why rejected: [reason]

Option C: [description]
- Pros: [list]
- Cons: [list]
- Why rejected: [reason]

### Trade-offs
We gained: [benefit]
We gave up: [cost]
Risk: [accepted risk]

### Success Criteria
We'll know this was right if:
- [Observable outcome 1]
- [Observable outcome 2]

### Revisit if
- [Trigger for reconsidering]
```

---

## Example Output

### Input
```
You: "Document decision on leaderboard placement"
```

### Generated Rationale
```
## Decision: Leaderboard Placement
Date: 2026-08-27
Decider: Daniel Okafor (with PM Alex)

### Context
Providers want to see city rankings. Two placement options:
- Home tab (prominent)
- Dedicated rankings tab (separate)

Constraint: Can't add 5th tab (tab bar full)

### Decision
We chose HOME TAB PLACEMENT over dedicated tab

### Rationale
Home tab placement increases discoverability and engagement.

Evidence:
- Usability test: 5/6 noticed in home tab within 30s
- Analytics: Home tab is #1 visited screen (80% DAU)
- Competitor research: 4/5 use prominent placement
- Goal: Increase engagement (home tab serves this)

Principle: Put important features where users look first.

### Alternatives Considered

#### Option A: Dedicated Rankings Tab
Pros:
- More space for features (filters, trends)
- Doesn't clutter home
- Clear IA (rankings are their own thing)

Cons:
- Requires replacing existing tab (hard choice)
- Lower discoverability (users must seek it)
- Contradicts goal (engagement requires visibility)

Why rejected: Discoverability is priority. Can't replace
other tabs (all essential). Home tab placement serves goal better.

#### Option B: Settings Submenu
Pros:
- No IA changes needed
- Easy to implement

Cons:
- Hidden (low engagement)
- Not a "setting" (bad IA)
- Failed in prior attempt (PROJ-567 abandoned)

Why rejected: Hidden placement didn't work before. This is a
motivational feature, not a setting.

### Trade-offs

We gained:
- High discoverability
- Increased engagement (projected +15% views)
- Clear competitive positioning

We gave up:
- Home tab real estate (now more crowded)
- Flexibility (can't add another home tab item easily)
- Clean IA (home tab now multi-purpose)

Risk accepted: Home tab may feel cluttered to some users.
Mitigation: Use Card component (collapsible if needed later).

### Success Criteria
We'll know this was right if:
- 60%+ providers view leaderboard weekly
- Home tab engagement stays stable or increases
- Qualitative feedback is positive (usability test)
- Churn rate improves in test group (A/B)

### Revisit if:
- Home tab engagement drops >10%
- Users request "hide leaderboard" frequently
- Better placement emerges (e.g., 5th tab becomes available)
```

---

## Decision Types

### Strategic
High-level direction:
- Feature prioritization
- Platform choice
- UX paradigm

### Tactical
Specific implementation:
- Component choice
- Layout approach
- Interaction pattern

### Trade-off
Explicit sacrifice:
- Accessibility vs performance
- Simplicity vs power
- Speed vs quality

---

## Chains With

`design-rationale` works with:
- `design-kickoff` (early decisions)
- `research-synthesis` (evidence-based)
- `publish-project` (includes rationale)
- `docs-brief` (references rationale)

---

## Tips

### 1. Document Big Decisions
Not every choice needs rationale - focus on:
```
✅ Strategic direction
✅ Contentious choices
✅ Non-obvious trade-offs

Skip:
❌ Obvious choices
❌ Trivial styling
❌ Temporary scaffolding
```

### 2. Write for Future You
6 months from now, you'll forget why. Write clearly.

### 3. Include Alternatives
"Why not X?" is a common question - answer it upfront.

### 4. Define Success
How will you know if this was right?

---

## Related Skills

- [research-synthesis](research-synthesis.md) - Evidence source
- [design-retrospective](design-retrospective.md) - Look back at decisions
- [decision-first-research](decision-first-research.md) - Research for decisions
- [publish-project](publish-project.md) - Includes rationale
