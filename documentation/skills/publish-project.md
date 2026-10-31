# publish-project

<!-- generated-from-skill: do not edit -->

On-demand publishing of a project's share pages to a public deploy URL — NOT the default behavior of any build/export step.

**Triggers:** "publish this project" · "deploy this / make it public" · "give me a share URL for [project]" · "put this online"

<!-- /generated-from-skill -->

Final handoff package - everything needed to ship, all in one place.

## What It Does

**Creates complete handoff** that includes:
- Ticket in your tracker (implementation)
- Docs page in Confluence, Notion, or Google Docs (full spec)
- Presentation deck (stakeholder share)
- Prototype links
- Design files
- Decision log

**One command = full handoff** - nothing left out.

---

## When to Use

Use `publish-project` when you want to:
- Hand off to engineering
- Share with stakeholders
- Archive completed work
- Create single source of truth

### Trigger Phrases
```
"Publish [project]"
"Create full handoff for [project]"
"Package [project] for shipping"
"Final handoff for [project]"
```

---

## How It Works

### Step 1: Validation
Checks completeness:
- ✅ Audit passed?
- ✅ Accessibility checked?
- ✅ Decisions documented?
- ✅ Research complete?

Blocks if critical gaps.

### Step 2: Artifact Generation
Creates:
- Ticket (via `ticket-create`)
- Docs page (via `docs-brief`)
- Presentation deck (via `deck-builder`)
- Handoff file (via `session-handoff`)

### Step 3: Links & References
Cross-links everything:
```
Ticket ←→ Docs page
Docs page ←→ Deck
Deck ←→ Prototype
All ←→ Figma (if exists)
```

### Step 4: Archive
Saves complete package to:
```
projects/<slug>/PUBLISHED.md
```

With:
- Timestamp
- All artifact links
- Sign-off checklist
- Post-launch tracking

---

## Example Output

### Input
```
You: "Publish city leaderboard"
```

### Validation Check
```
Validating city leaderboard for publish...

✅ Audit: PASS (0 issues)
✅ Accessibility: Checked (WCAG AA compliant)
✅ Decisions: Documented (3 key decisions)
✅ Research: Complete (workload + discovery + competitor)
⚠️ Approval: PM approval pending on placement

ADVISORY: Consider PM approval before publishing.
Proceed anyway? [Yes / Wait]
```

### Generated Package
```
Publishing city leaderboard...

Created:
✅ Jira ticket: PROJ-890
   https://jira.company.com/browse/PROJ-890
   
✅ Confluence page: City Leaderboard Spec
   https://confluence.company.com/pages/city-leaderboard
   
✅ Presentation deck: CityLeaderboard_Handoff_2026-08-27.pdf
   projects/city-leaderboard/deck.pdf
   
✅ Handoff file: PUBLISHED.md
   projects/city-leaderboard/PUBLISHED.md

All artifacts cross-linked.
```

### PUBLISHED.md Contents
```
# Published: City Leaderboard
Date: 2026-08-27
Designer: Daniel Okafor
Status: Ready for Implementation

## Handoff Artifacts

### Jira
Ticket: PROJ-890
URL: https://jira.company.com/browse/PROJ-890
Status: Ready for Dev

### Confluence
Page: City Leaderboard Spec
URL: https://confluence.company.com/pages/city-leaderboard
Includes: Full context, research, decisions, implementation notes

### Presentation
Deck: CityLeaderboard_Handoff_2026-08-27.pdf
Location: projects/city-leaderboard/deck.pdf
Stakeholder-ready

### Prototype
URL: http://localhost:3002/city-leaderboard
Status: Live (requires local Design Harness)

### Figma
File: [link if exists]

## Sign-Off Checklist

Design:
- [x] Audit passed
- [x] Accessibility checked (WCAG AA)
- [x] Design system compliant
- [x] Decisions documented

Product:
- [ ] PM approval (pending on placement)
- [ ] Success metrics defined
- [ ] A/B test plan

Engineering:
- [ ] Ticket refined
- [ ] API dependencies identified (PROJ-889)
- [ ] Estimate provided

## Post-Launch Tracking

Metrics to watch:
- Engagement: % providers viewing leaderboard
- Retention: Impact on churn rate
- Sentiment: Qualitative feedback

Follow-up research:
- [ ] Usability test post-launch (n=6)
- [ ] Survey competitive motivation (n=100)

## Launch Blockers

1. PM approval on placement (Alex, by Friday)
2. Backend API (PROJ-889) completion

## Contact

Questions? Reach out:
- Designer: Daniel Okafor
- PM: Alex (for placement decision)
- Eng Lead: [name] (for PROJ-889 status)
```

---

## Validation Gates

`publish-project` blocks if:
- ❌ Audit failed (critical issues)
- ❌ Accessibility violations (WCAG)
- ❌ No research conducted (net-new work)
- ❌ No decisions documented

Advisory (warns but doesn't block):
- ⚠️ PM approval pending
- ⚠️ Missing success metrics
- ⚠️ No test plan

---

## Chains With

`publish-project` uses:
- `audit` (validation)
- `accessibility` (validation)
- `ticket-create` (Jira, Linear, or GitHub)
- `docs-brief` (wiki)
- `deck-builder` (presentation)
- `session-handoff` (archive)

---

## Tips

### 1. Publish When Ready
Don't publish prematurely - wait for:
```
- Design complete
- Quality checked
- Approvals secured
- Decisions documented
```

### 2. Use for Major Work
Publish is heavyweight - for:
```
✅ Net-new features
✅ Redesigns
✅ Complex flows

Not for:
❌ Micro-edits
❌ Bug fixes
❌ Copy tweaks
```

### 3. Track Post-Launch
PUBLISHED.md includes tracking plan - use it.

### 4. Archive Old Projects
```
projects/
├── city-leaderboard/       ← Published
│   └── PUBLISHED.md
├── referrals/              ← Published
│   └── PUBLISHED.md
└── account-settings/            ← In progress (no PUBLISHED yet)
```

---

## Related Skills

- [ticket-create](ticket-create.md) - Tracker handoff
- [docs-brief](docs-brief.md) - Wiki spec
- [deck-builder](deck-builder.md) - Presentation
- [session-handoff](session-handoff.md) - Session archive
