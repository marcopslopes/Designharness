# ui-agent

<!-- generated-from-skill: do not edit -->

Build on-brand screens using only real design tokens and `context/design-system/ds` primitives.

**Triggers:** "build a screen" · "assemble this layout" · "which component should I use" · "does this match the design system" · "fix / tweak / make X taller / add a badge / adjust spacing"

<!-- /generated-from-skill -->

Builds on-brand screens using your design system tokens - never invented colors or spacing.

## What It Does

**Builds screens** from natural language descriptions, using:
- Real tokens from `context/design-system/tokens.css`
- Existing components from `context/design-system/ds/`
- Your company voice (if customized)
- Your user personas (if customized)

**Automatically loads `design-system` skill first** to validate every style before writing code.

---

## When to Use

Use `ui-agent` when you want to:
- Build a new screen or component
- Create a prototype
- Mock up a flow
- Iterate on existing screens

### Trigger Phrases
```
"Build a [feature] screen"
"Create a prototype for [feature]"
"Make a [screen type]"
"Design a [component]"
```

---

## How It Works

### 1. Understanding Phase
Asks clarifying questions if needed:
- Platform? (iOS, Android, web)
- User type? (which persona)
- Context? (where in the flow)

### 2. Token Check
Loads `design-system` skill to verify:
- Available tokens
- Existing components
- Three-layer rules (DS / Design Harness chrome / per-prototype CSS)

### 3. Build Phase
Creates the screen:
- Uses `var(--kit-*)` tokens for colors
- Uses `var(--space-*)` tokens for spacing
- Imports from `context/design-system/ds/` for components
- Never hardcodes values

### 4. Save Phase
Saves to `projects/<slug>/screens/` or `src/design-harness/pages/`

### 5. Audit Phase
Automatically runs `audit` skill to check quality

---

## Examples

### Example 1: Simple Request
```
You: "Build a city leaderboard screen"

ui-agent:
1. Clarifies: "For the provider app?"
2. Checks tokens and components
3. Builds screen using Card, Stack, Text, Badge
4. Saves to projects/city-leaderboard/
5. Runs audit
6. Shows result
```

### Example 2: With Context
```
You: "Build a referral entry point for the home tab"

ui-agent:
1. Checks existing home tab layout
2. Finds available space for entry point
3. Uses PhoneShell (Design Harness chrome)
4. Builds Card with icon + copy
5. Matches existing spacing/style
6. Runs audit
```

### Example 3: Iteration
```
You: "Make the leaderboard cards taller"

ui-agent:
1. Reads existing screen
2. Changes padding from --space-4 to --space-5
3. Keeps everything else
4. Runs audit (deferred for micro-edit)
5. Shows updated screen
```

---

## What You Get

### Screen Files
```
projects/city-leaderboard/screens/
└── CityLeaderboardScreen.tsx
```

or

```
src/design-harness/pages/
└── CityLeaderboardPage.tsx
└── CityLeaderboardPage.module.css (if needed)
```

### Documentation
```
projects/city-leaderboard/
├── brief.md (context)
├── findings.md (appended with "Built CityLeaderboardScreen")
├── decisions.md (logged choices like "Used Badge for rank")
└── log.md (timestamped build record)
```

---

## Design System Integration

### Uses Real Components
```tsx
import { Card, Stack, Text, Badge, Button } from 'context/design-system/ds'

<Card>
  <Stack direction="column" gap={4}>
    <Text size="lg" weight="semibold">Title</Text>
    <Badge color="brand">New</Badge>
    <Button variant="primary">Action</Button>
  </Stack>
</Card>
```

### Uses Real Tokens
```css
.customLayout {
  padding: var(--space-5);
  background: var(--kit-bg);
  border-radius: var(--radius-3);
  gap: var(--space-4);
}
```

### Never Does This ❌
```css
/* WRONG - will fail audit */
.bad {
  padding: 20px;           /* Hardcoded spacing */
  background: #fafafa;     /* Hardcoded color */
  border-radius: 12px;     /* Hardcoded radius */
}
```

---

## Chains With

`ui-agent` automatically chains with:
- **`design-system`** (pre-build) - Validates tokens exist
- **`mobile-shell`** (as needed) - Wraps in PhoneShell for mobile
- **`icon-usage`** (as needed) - Sources icons from Tabler
- **`audit`** (post-build) - Quality check before sharing

---

## Common Patterns

### Pattern 1: Net-New Screen
```
You: "Build a settings screen"

Flow:
design-kickoff (if net-new) →
  workload-agent (who's on settings?) →
  research-agent (what exists?) →
  approval gate →
  ui-agent (build) →
  audit (check)
```

### Pattern 2: Iterate Existing
```
You: "Add a filter to the leaderboard"

Flow:
ui-agent (reads existing, adds filter) →
  audit (deferred for small change)
```

### Pattern 3: Prototype
```
You: "Build a phone prototype for referrals"

Flow:
ui-agent (builds screen) →
  mobile-shell (wraps in PhoneShell) →
  audit (checks)
```

---

## Customization

### Use YOUR Design System
During harness setup:
```
"Do you have design tokens?"
→ Yes: paste path to your tokens.css
→ ui-agent will use YOUR colors/spacing
```

### Use YOUR Voice
During harness setup:
```
"Do you have brand voice guidelines?"
→ Yes: paste path to voice doc
→ ui-agent will match YOUR copy style
```

---

## Limitations

### Won't Do:
- ❌ Invent tokens that don't exist
- ❌ Create new design system components (uses existing only)
- ❌ Skip the audit gate
- ❌ Build without checking existing work first
- ❌ Recreate components that already exist

### Will Do:
- ✅ Use only real tokens
- ✅ Reuse existing components
- ✅ Check quality automatically
- ✅ Log all decisions
- ✅ Stay on-brand

---

## Tips

### 1. Be Specific
❌ Vague: "Build a screen"  
✅ Clear: "Build a city leaderboard screen for providers"

### 2. Mention Context
❌ No context: "Add a button"  
✅ With context: "Add a CTA button to the home tab for referrals"

### 3. Iterate in Small Steps
❌ Big change: "Redesign the entire flow"  
✅ Small change: "Make the cards taller, then let's review"

### 4. Review Before Sharing
Always check the prototype before sharing:
```
"Run audit on this"
```
(But audit already ran automatically!)

---

## Troubleshooting

### "Can't find token --color-custom"
**Problem:** Trying to use a token that doesn't exist

**Fix:** Check `context/design-system/tokens.css` or create the token first

### "Component X doesn't exist"
**Problem:** Trying to use a component not in the design system

**Fix:** Use existing components only, or build as per-prototype CSS

### "Failed audit - hardcoded value"
**Problem:** Direct px/color value in CSS

**Fix:** Replace with tokens:
- `20px` → `var(--space-5)`
- `#007078` → `var(--kit-brand)`

---

## Related Skills

- [design-system](design-system.md) - Token validation (auto-loads)
- [audit](audit.md) - Quality check (auto-runs)
- [mobile-shell](mobile-shell.md) - Phone prototypes
- [deck-builder](deck-builder.md) - Present your work

---

## Related Guides

- [Design System Usage](../guides/design-system-usage.md)
- [Understanding Skills](../guides/understanding-skills.md)
- [What is the Harness?](../guides/what-is-the-harness.md)
