# design-system

Validates all styles against your design tokens - the enforcer of consistency.

## What It Does

**Pre-build validation** that:
- Loads available tokens
- Checks component library
- Enforces three-layer CSS rules
- Blocks hardcoded values

**Runs automatically before `ui-agent` builds** - you don't call it directly.

---

## When It Runs

Automatically in:
- `ui-agent` (before building)
- `audit` (checking builds)
- `interface-change-review` (reviewing changes)

You typically don't invoke it manually - it's infrastructure.

---

## Three-Layer System

### Layer 1: Design System (`context/design-system/ds/`)
Shared primitives:
- Button, Card, Stack, Text, Badge, etc.
- Used across ALL prototypes
- Never modified per-project

### Layer 2: Design Harness Chrome (`src/design-harness/`)
App shell for prototypes:
- PhoneShell (phone frame and tab bar)
- DesktopShell (desktop browser frame)
- ProAppScreenChrome (headers and top bars)
- Used when prototyping in-app screens

### Layer 3: Per-Prototype CSS
Project-specific styles:
- Only for unique layouts not in DS
- Must still use tokens
- Lives in `src/design-harness/pages/[name].module.css`

---

## What It Checks

### Before Building
```
Available tokens:
✅ --kit-brand, --kit-premium, --kit-leaf
✅ --space-1 through --space-8
✅ --radius-2, --radius-3, --radius-4

Available components:
✅ Button, Card, Stack, Text, Badge
✅ PhoneShell, DesktopShell

Rules enforced:
✅ No hardcoded colors
✅ No hardcoded spacing
✅ Use DS components first
✅ Per-prototype CSS only for unique layouts
```

---

## Example Validation

### Valid ✅
```tsx
import { Card, Stack, Text } from 'context/design-system/ds'

<Card>
  <Stack direction="column" gap={4}>
    <Text size="lg">Title</Text>
  </Stack>
</Card>
```

```css
.customLayout {
  padding: var(--space-5);
  background: var(--kit-bg);
}
```

### Invalid ❌
```css
.bad {
  padding: 20px;        /* Hardcoded */
  background: #fafafa;  /* Hardcoded */
}
```

---

## Chains With

`design-system` is infrastructure for:
- `ui-agent` (pre-build check)
- `audit` (post-build check)
- `interface-change-review` (change validation)

---

## Customization

### Use YOUR Tokens
During harness setup:
```
"Do you have design tokens?"
→ Yes: paste path to tokens.css
→ design-system validates against YOUR tokens
```

---

## Tips

### 1. Don't Call Directly
`design-system` runs automatically - you work through `ui-agent`.

### 2. Check Available Tokens
```
Read: context/design-system/tokens.css
```
See what's available before building.

### 3. Request New Tokens
If you need a token that doesn't exist:
```
"Add --space-10 token for large layouts"
```

---

## Related Skills

- [ui-agent](ui-agent.md) - Uses design-system validation
- [audit](audit.md) - Also checks tokens
- [harness-setup](harness-setup.md) - Imports your tokens
