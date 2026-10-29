# Design System Usage Guide

How to use the harness's token-first design system.

## Core Principle: Token-First

**Every color, spacing value, and size comes from `context/design-system/tokens.css`.**

❌ **Never do this:**
```css
.card {
  padding: 20px;           /* Hardcoded value */
  background: #007078;     /* Hardcoded color */
}
```

✅ **Always do this:**
```css
.card {
  padding: var(--space-5);          /* Token reference */
  background: var(--kit-brand);     /* Token reference */
}
```

---

## Three Layers

The design system has 3 layers with clear boundaries:

### 1. Design System Primitives (`context/design-system/ds/`)
**What:** Core components used everywhere
- `Button`, `Card`, `Text`, `Stack`, `Badge`, `TextField`, `Toast`, `Icon`

**When to use:** Building any screen
**Import:** `import { Button, Card } from 'context/design-system/ds'`

### 2. Design Harness Chrome (`src/design-harness/shared/`)
**What:** Phone shell, navigation, app-level UI
- `PhoneShell` - Device frame with status bar and tab bar
- `DesktopShell` - Desktop browser frame
- `ProAppScreenChrome` - App headers and top bars
- `IosSettingsPrimitives` - iOS grouped settings rows

**When to use:** Wrapping prototypes in phone UI
**Import:** `import { PhoneShell } from 'src/design-harness/shared/PhoneShell'`

### 3. Per-Prototype CSS (`src/design-harness/pages/*Page.module.css`)
**What:** One-off styles for a specific screen
- Layout specific to that screen
- Overrides when DS doesn't fit
- Temporary experiments

**When to use:** Custom layouts that don't fit DS components
**File:** Create alongside the page component

---

## The Pre-Write Check

Before writing any CSS, the `design-system` skill runs automatically to verify:

1. ✅ **Is this a real token?** Check `tokens.css` first
2. ✅ **Which layer?** DS primitive vs Design Harness chrome vs per-prototype
3. ✅ **Existing component?** Reuse before rebuilding

This prevents:
- Inventing colors/spacing
- Recreating existing components
- Breaking the token-first rule

---

## Available Tokens

### Colors
```css
/* Brand */
--kit-brand          /* Teal: #007078 */
--kit-brand-deep
--kit-brand-soft

/* Premium */
--kit-premium        /* Plum: #4f3791 */
--kit-premium-deep
--kit-premium-soft

/* Neutrals */
--kit-bg             /* Warm paper */
--kit-paper
--kit-ink
--kit-ink-70, --kit-ink-50, --kit-ink-30

/* Semantic */
--kit-leaf           /* Success green */
--kit-amber          /* Warning orange */
--kit-danger         /* Error red */
```

### Spacing
```css
--space-1   /* 4px */
--space-2   /* 8px */
--space-3   /* 12px */
--space-4   /* 16px */
--space-5   /* 24px */
--space-6   /* 32px */
--space-7   /* 48px */
--space-8   /* 64px */
```

### Typography
```css
--text-xs, --text-sm, --text-md, --text-lg, --text-xl
--font-body          /* Inter */
--font-mono          /* JetBrains Mono */
```

### Radius
```css
--radius-2   /* 8px */
--radius-3   /* 12px */
--radius-4   /* 16px */
--radius-full /* 9999px */
```

---

## Common Patterns

### Building a Card
```tsx
import { Card, Stack, Text, Button } from 'context/design-system/ds'

<Card>
  <Stack direction="column" gap={4}>
    <Text size="lg" weight="semibold">Title</Text>
    <Text size="sm" color="subtle">Description</Text>
    <Button variant="primary">Action</Button>
  </Stack>
</Card>
```

### Phone Prototype
```tsx
import { PhoneShell } from 'src/design-harness/shared/PhoneShell'

<PhoneShell>
  {/* Your screen content */}
</PhoneShell>
```

### Custom Layout (Only When DS Doesn't Fit)
```css
/* MyFeaturePage.module.css */
.gridLayout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--space-5);           /* Still use tokens! */
  padding: var(--space-4);
  background: var(--kit-bg);
}
```

---

## The Audit

Every build runs `audit` automatically to catch:
- ❌ Hardcoded colors/spacing
- ❌ Reinvented components
- ❌ Missing tokens

If audit fails, **the build is blocked** until fixed. This prevents tech debt.

---

## Customizing Tokens

Want to use YOUR design system instead of Design Harness kit?

1. **During onboarding:** Say "set up my design system" → import your tokens
2. **Manually:** Edit `context/design-system/tokens.css` with your values
3. **Keep token names:** Change values, not names (components depend on `--kit-brand`, `--space-5`, etc.)

---

## Related Guides

- [ui-agent](../skills/ui-agent.md) - Building screens from the design system
- [audit](../skills/audit.md) - Checking a screen before you share it
- [Components quick reference](../../context/design-system/COMPONENTS-QUICK-REFERENCE.md)
