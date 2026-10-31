# ux-pattern

<!-- generated-from-skill: do not edit -->

Reviews a flow's structure against how the company actually works, not just how it looks.

**Triggers:** "structure this flow" · "does this match how the company works" · "which archetype" · "modal vs bottom sheet" · "audit this Figma" · "critique this design" · "review this board" · "any thoughts on this work" · "what do you think of this screen" · "quick gut check" · "help me think through" · "brainstorm" · "give me ideas"

<!-- /generated-from-skill -->

Reviews flow structure against your product's UX patterns and best practices.

## What It Does

**Deep UX review** that checks:
- Navigation consistency
- Information architecture
- Interaction patterns
- Flow logic
- Mental models
- Object failure modes (shapeshifter / masked / broken / isolated) — advisory
- Surface vs deeper-layer tag on each finding

**Uses YOUR product patterns** (if customized) or industry best practices.

**Also runs a breadboard mode** — a different job from the review above.
Instead of critiquing a flow that exists, it *drafts* a new flow's
interaction logic (places, affordances, destinations, edge cases) in
text only, before any visual form — Shape Up-style breadboarding.
Triggers: "breadboard this flow", "map the interaction structure for X",
"where does this go". Uses `conceptual-model`'s objects/vocabulary when
that model exists. Saves to `projects/<slug>/breadboard.md`. See
`harness/skills/ux-pattern/references/breadboarding.md`.

---

## When to Use

Use `ux-pattern` when you want to:
- Review a flow before sharing
- Check if new pattern fits existing product
- Validate navigation decisions
- Get feedback on structure

### Trigger Phrases
```
"Review this flow"
"Check UX patterns"
"Does this fit our product?"
"Audit the navigation"
```

---

## What It Checks

### 1. Navigation Consistency
- Does tab bar placement match existing patterns?
- Are back buttons in expected locations?
- Is hierarchy clear?

### 2. Information Architecture
- Is content grouped logically?
- Are labels clear and consistent?
- Is depth appropriate (not too many taps)?

### 3. Interaction Patterns
- Do gestures match product standards?
- Are CTAs where users expect them?
- Is feedback clear (loading, success, error)?

### 4. Flow Logic
- Can users complete the task?
- Are edge cases handled?
- Is the happy path obvious?

### 5. Mental Models
- Does it match how users think?
- Are metaphors consistent?
- Is terminology familiar?

---

## How It Works

### Step 1: Pattern Loading
Loads from:
- `context/org-pack.local/COMPANY-PATTERNS.md` (your patterns)
- OR `context/org-pack/COMPANY-PATTERNS.md` (Northline defaults)

### Step 2: Screen Analysis
Reads your prototype:
- Component structure
- Navigation elements
- Layout choices
- Interaction design

### Step 3: Pattern Matching
Compares against:
- Your documented patterns
- Product conventions
- Platform standards (iOS HIG, Material Design)

### Step 4: Findings Report
Returns structured feedback:
```
## Navigation
✅ Tab bar placement matches product standard
⚠️ Back button on right (product uses left)

## Information Architecture  
✅ Content grouping is logical
⚠️ "Settings" label - product uses "Preferences"

## Interaction Patterns
✅ CTA placement matches product
❌ Missing loading state for async action

## Flow Logic
✅ Happy path is clear
⚠️ No error handling for API failure

## Mental Models
✅ Terminology matches product vocabulary
✅ Metaphor (leaderboard) is familiar
```

---

## Severity Levels

### 🔴 Critical (Must Fix)
- Breaks core product pattern
- Violates platform standards
- Blocks user from completing task

### 🟡 Advisory (Review)
- Minor inconsistency
- Optimization opportunity
- Alternative approach suggested

### 🟢 Aligned
- Matches product patterns
- Follows best practices
- No issues found

---

## Example Review

### Input
```
You: "Review city leaderboard flow"

Context:
- CityLeaderboardScreen.tsx built
- Uses tab bar navigation
- Card-based layout
```

### Output
```
UX Pattern Review: City Leaderboard

## Navigation ✅
- Tab bar placement: Bottom (matches product)
- Back button: Not needed (tab root)
- Hierarchy: Flat (appropriate for leaderboard)

## Information Architecture ✅
- Content grouped by rank
- Labels clear ("Top Cities", "Your City")
- Depth: 1 level (optimal)

## Interaction Patterns ⚠️
- CTA: "View Details" (matches product)
- Loading state: Missing (add skeleton)
- Pull to refresh: Not implemented (consider adding)

## Flow Logic ✅
- Happy path: User views rankings → taps city → sees details
- Edge case: No rank shown if new account (handled)
- Error case: Missing error state for API failure ❌

## Mental Models ✅
- "Leaderboard" metaphor is clear
- Terminology: "Top Cities" (matches product voice)
- Badge for top 3: Familiar pattern from other features

## Recommendations
1. Add loading skeleton for async data
2. Add error state for API failures
3. Consider pull-to-refresh (nice-to-have)

Overall: Strong alignment with product patterns.
Fix 2 critical items before shipping.
```

---

## Chains With

`ux-pattern` often runs after:
- `ui-agent` (build) → `ux-pattern` (review structure)
- `design-kickoff` (research) → `ux-pattern` (validate approach)

And before:
- `audit` (final quality gate)
- `deck-builder` (present with validation)

---

## Customization

### Use YOUR Patterns
During harness setup:
```
"Do you have UX pattern documentation?"
→ Yes: paste path or content
→ ux-pattern uses YOUR product standards
```

### Pattern Categories
Common categories to document:
- Navigation patterns (tabs, stack, modal)
- Form patterns (input, validation, submission)
- Feedback patterns (loading, success, error)
- Content patterns (cards, lists, grids)
- Empty states, errors, onboarding

---

## Common Patterns Checked

### Mobile App Patterns
- Tab bar vs bottom nav
- Stack navigation depth
- Modal presentation style
- Swipe gestures
- Pull to refresh

### Web App Patterns
- Sidebar navigation
- Breadcrumb usage
- Modal vs inline editing
- Pagination vs infinite scroll
- Responsive breakpoints

### Cross-Platform
- Back button placement
- Primary CTA positioning
- Search placement
- Settings location
- Profile access

---

## Tips

### 1. Document Your Patterns First
`ux-pattern` is most useful when you have:
```
context/org-pack.local/COMPANY-PATTERNS.md
```
Documenting your product's established patterns.

### 2. Use Early in Process
Run `ux-pattern` before building too much:
```
"Review this flow structure" (before coding)
vs
"Review this prototype" (after coding)
```
Catch issues earlier = less rework.

### 3. Combine With Content Review
```
"Review flow structure" (ux-pattern)
"Review copy" (content skill)
= Complete flow review
```

### 4. Iterate Based on Feedback
```
ux-pattern finds issue →
  fix it →
  re-run ux-pattern →
  verify fixed
```

---

## Limitations

### Won't Do:
- ❌ Visual design review (use audit or craft-reviewer)
- ❌ Copy review (use content skill)
- ❌ Accessibility review (use accessibility skill)
- ❌ Invent patterns for you

### Will Do:
- ✅ Check against documented patterns
- ✅ Flag inconsistencies
- ✅ Suggest alignment opportunities
- ✅ Validate flow logic

---

## Troubleshooting

### "No patterns defined"
**Problem:** Missing `COMPANY-PATTERNS.md`

**Fix:**
```
"Set up my UX patterns" →
  harness-setup prompts you →
  creates COMPANY-PATTERNS.md
```

### "Review says 'aligned' but I see issues"
**Problem:** ux-pattern checks structure, not visual polish

**Use:**
- `audit` for design system compliance
- `craft-reviewer` for visual quality
- `accessibility` for a11y issues

### "Pattern conflict: mobile vs web"
**Problem:** Different patterns for different platforms

**Solution:** Document platform-specific patterns:
```
## Navigation Patterns
### Mobile (iOS/Android)
- Tab bar at bottom
- Stack navigation

### Web
- Sidebar navigation
- Breadcrumbs
```

---

## Related Skills

- [ui-agent](ui-agent.md) - Builds flows (ux-pattern reviews them)
- [audit](audit.md) - Checks technical compliance
- [content](content.md) - Reviews copy
- [accessibility](accessibility.md) - Reviews a11y

---

## Related Guides

- [Understanding Skills](../guides/understanding-skills.md)
- [Design System Usage](../guides/design-system-usage.md)
