# ticket-create

Creates well-structured tickets from design work in Jira, Linear, or GitHub Issues - ready for handoff.

## What It Does

**Generates tickets** that include:
- Clear description
- Acceptance criteria
- Design screenshots
- Implementation notes
- Links to prototypes

**Ready for engineering handoff** - no back-and-forth needed.

---

## When to Use

Use `ticket-create` when you want to:
- Hand off design to engineering
- Create specs for implementation
- Document design decisions
- Track work in your tracker

### Trigger Phrases
```
"Create a ticket for [feature]"
"Hand this off to engineering"
"Make a Jira ticket" / "File this in Linear"
"Spec this out"
```

---

## How It Works

### Step 1: Content Gathering
Pulls from:
- `projects/<slug>/brief.md` (context)
- `projects/<slug>/decisions.md` (rationale)
- Screenshots of prototypes
- Design system references

### Step 2: Structure Generation
Creates a standard ticket body (same shape in every tracker):
```
## Summary
[One-line description]

## Description
[Background and context]

## User Story
As a [user type]
I want to [action]
So that [benefit]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Design
[Screenshot + Figma/prototype link]

## Implementation Notes
- Use component: [design system component]
- Token: [specific tokens]
- Edge cases: [list]

## Out of Scope
[What's NOT included]
```

### Step 3: Ticket Creation
Via your connected tracker (Jira, Linear, or GitHub):
- Creates ticket in the correct project, team, or repo
- Sets appropriate labels
- Links to the parent epic, project, or milestone (if known)
- Attaches screenshots
- Returns ticket key

---

## Example Output

### Input
```
You: "Create a ticket for city leaderboard"

Context:
- CityLeaderboardScreen prototype exists
- Brief in projects/city-leaderboard/
- Decisions documented
```

### Generated Ticket
```
PROJ-890: Build City Leaderboard Screen

## Description
Providers want to see how their city ranks against others.
This feature displays top 10 cities by booking count, with
the provider's city highlighted.

## User Story
As a provider
I want to see my city's ranking
So that I feel competitive motivation and community belonging

## Acceptance Criteria
- [ ] Display top 10 cities by booking count
- [ ] Highlight user's city (if in top 10)
- [ ] Show rank badge for top 3 cities
- [ ] Display "Your city: #X" if outside top 10
- [ ] Handle loading state (skeleton)
- [ ] Handle error state (retry button)
- [ ] Pull to refresh updates data

## Design
[Screenshot of CityLeaderboardScreen attached]
Prototype: http://localhost:3002/city-leaderboard
Figma: [link if exists]

## Implementation Notes
Components:
- Use Card from design-system
- Use Badge for ranks
- Use Stack for layout

Tokens:
- Spacing: var(--space-4), var(--space-5)
- Colors: var(--kit-brand) for highlight
- Radius: var(--radius-3)

Edge Cases:
- New account (no city set) → prompt to set city
- Tie in rankings → show both as same rank
- API failure → show cached data + error banner

## Out of Scope
- Historical trends (future iteration)
- Individual provider rankings (privacy concern)
- Filter by region (not in MVP)

## Dependencies
- API endpoint: /rankings/cities (backend ticket: PROJ-889)
```

---

## Chains With

`ticket-create` runs after:
- `ui-agent` (design built)
- `audit` (quality checked)
- `accessibility` (a11y verified)

---

## Tips

### 1. Include Edge Cases
Engineers appreciate thorough specs:
```
"What happens if...
- No data?
- API fails?
- User has no city set?"
```

### 2. Reference Design System
Don't say "blue button" - say:
```
"Use Button component with variant='primary'"
```

### 3. Link Everything
- Prototype URL
- Figma file
- Parent epic
- Related tickets

### 4. Specify Out of Scope
Prevents scope creep:
```
"This ticket does NOT include:
- Historical trends
- Export functionality"
```

---

## Customization

### Use YOUR tracker
During MCP setup:
```
Connect Atlassian, Linear, or GitHub MCP →
  ticket-create files into YOUR tracker
No tracker connected →
  ticket-create drafts the ticket for you to paste
```

### Use YOUR Template
During harness setup:
```
"Do you have ticket templates?"
→ Yes: ticket-create follows YOUR format
```

---

## Related Skills

- [ui-agent](ui-agent.md) - Creates designs to ticket
- [docs-brief](docs-brief.md) - Longer specs
- [publish-project](publish-project.md) - Full handoff
