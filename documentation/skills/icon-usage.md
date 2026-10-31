# icon-usage

<!-- generated-from-skill: do not edit -->

Sources every icon through the `Icon` primitive in `context/design-system/ds` (wrapping Tabler Icons) — never hand-drawn SVG.

**Triggers:** "add an icon" · "which icon library"

<!-- /generated-from-skill -->

Sources icons from Tabler Icons library - consistent, accessible, on-brand.

## What It Does

**Manages icon usage** by:
- Sourcing from Tabler Icons (2800+ icons)
- Ensuring accessibility (ARIA labels)
- Maintaining consistency
- Optimizing for your design system

**Runs automatically when `ui-agent` needs icons** - you don't call it directly.

---

## When It Runs

Automatically when building:
```
You: "Build a screen with navigation icons"
→ ui-agent builds
→ icon-usage sources icons from Tabler
→ Adds proper accessibility
```

---

## Icon Library

Uses **Tabler Icons**:
- 2800+ icons
- Consistent stroke width
- Multiple sizes
- Open source

Common icons:
- Navigation: `IconHome`, `IconUser`, `IconSettings`
- Actions: `IconPlus`, `IconEdit`, `IconTrash`
- Status: `IconCheck`, `IconX`, `IconAlertCircle`
- Social: `IconBrandTwitter`, `IconShare`

---

## Example Usage

```tsx
import { IconHome, IconUser, IconSettings } from '@tabler/icons-react'

<Stack direction="row" gap={4}>
  <IconHome size={24} aria-label="Home" />
  <IconUser size={24} aria-label="Profile" />
  <IconSettings size={24} aria-label="Settings" />
</Stack>
```

---

## Tips

### 1. Be Descriptive
Tabler uses clear names:
```
"home icon" → IconHome
"settings icon" → IconSettings
"calendar icon" → IconCalendar
```

### 2. Check Accessibility
icon-usage adds ARIA labels automatically.

---

## Related Skills

- [ui-agent](ui-agent.md) - Uses icon-usage
- [accessibility](accessibility.md) - Validates icon labels
