# figma-ux-audit

<!-- generated-from-skill: do not edit -->

Runs a structured UX audit on a Figma page and places colour-coded annotation cards directly next to each screen, connected by dotted lines.

**Triggers:** "annotate this Figma" · "add annotations to this Figma" · "audit this Figma with notes on the canvas" · "put feedback on the canvas" · "Figma canvas annotations" · "annotation cards on the board"

<!-- /generated-from-skill -->

Adds annotation cards directly to Figma canvas - visual UX review with notes.

## What It Does

**Creates Figma annotations** that:
- Add comment cards to canvas
- Highlight issues visually
- Organize by severity
- Link to evidence
- Enable async review

**After written critique completes** - visual layer on top.

---

## When to Use

Use `figma-ux-audit` when you want to:
- Annotate Figma files
- Visual review on canvas
- Share feedback asynchronously
- Collaborate in Figma

### Trigger Phrases
```
"Add annotations to Figma"
"Annotate this Figma file"
"Put notes on the canvas"
"Create annotation cards"
```

---

## How It Works

### Step 1: Written Critique First
Runs `ux-pattern` or `content` or `accessibility` first.
Generates findings.

### Step 2: Annotation Placement
For each finding:
- Places comment card near issue
- Color-codes by severity
- Adds description + recommendation
- Links to full findings doc

### Step 3: Figma Sync
Via Figma MCP:
- Creates auto-layout frames (annotation cards)
- Positions near relevant screens
- Organizes in "Annotations" page

---

## Annotation Card Format

```
[🔴 CRITICAL] or [🟡 ADVISORY] or [🟢 ALIGNED]

Issue: [One-line description]

Why: [Brief rationale]

Fix: [Recommendation]

Reference: [Link to findings.md]
```

---

## Example

### After UX Pattern Review
```
Written findings:
1. Navigation: Back button on right (should be left)
2. Loading state: Missing skeleton
3. Error state: No retry button
```

### Figma Annotations Created
```
3 annotation cards added to canvas:

Card 1 (near nav):
🔴 CRITICAL
Issue: Back button on right
Why: Product standard is left placement
Fix: Move to left, match other screens
Reference: projects/city-leaderboard/findings.md#navigation

Card 2 (near content):
🟡 ADVISORY
Issue: Missing loading skeleton
Why: Async data needs feedback
Fix: Add skeleton while loading
Reference: projects/city-leaderboard/findings.md#interaction-patterns

Card 3 (near CTA):
🔴 CRITICAL
Issue: No error state
Why: API failures block users
Fix: Add error message + retry button
Reference: projects/city-leaderboard/findings.md#flow-logic
```

---

## Severity Colors

### 🔴 Critical (Red)
Must fix before shipping.

### 🟡 Advisory (Yellow)
Recommended improvement.

### 🟢 Aligned (Green)
Working well - note for reference.

---

## Chains With

`figma-ux-audit` runs after:
- `ux-pattern` (structure review)
- `content` (copy review)
- `accessibility` (a11y review)
- `audit` (design system review)

---

## Tips

### 1. Written Critique First
Always run written findings first - annotations reference them.

### 2. Use for Async Review
Annotations let stakeholders review on their own time.

### 3. Organize Annotations
Figma creates "Annotations" page - keep it organized.

### 4. Update After Fixes
```
"Update Figma annotations after fixes"
```

---

## Related Skills

- [ux-pattern](ux-pattern.md) - Generates findings
- [content](content.md) - Generates findings
- [accessibility](accessibility.md) - Generates findings
- [audit](audit.md) - Generates findings
