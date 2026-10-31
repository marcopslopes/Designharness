# adaptive-interfaces

<!-- generated-from-skill: do not edit -->

Specs how a surface respects user/system preferences — reduced motion, contrast, text sizing, transparency, density — without inventing product dark mode.

**Triggers:** "adaptive interfaces" · "prefers-reduced-motion" · "high contrast mode" · "does this respect system text size" · "density preference" · "prefers-contrast"

<!-- /generated-from-skill -->

Context-aware design - interfaces that adapt to user, device, environment.

## What It Does

**Creates adaptive UIs** that respond to:
- User preferences (dark mode, font size)
- Device capabilities (screen size, touch vs mouse)
- Environmental context (location, time, connectivity)
- User behavior (power user vs casual)

**Smart interfaces** - not one-size-fits-all.

---

## Adaptive Patterns

### Theme Adaptation
```tsx
<App theme={userPreference.theme}>
  {/* Auto light/dark mode */}
</App>
```

### Device Adaptation
```tsx
{isMobile ? <TouchOptimized /> : <MouseOptimized />}
```

### Connectivity Adaptation
```tsx
{isOnline ? <LiveData /> : <CachedData />}
```

### Personalization
```tsx
{userType === 'power' ? <AdvancedUI /> : <SimpleUI />}
```

---

## Example
```
You: "Create adaptive interface for city leaderboard"

Output:
- Light/dark mode support
- Compact mode for small screens
- Offline mode (cached rankings)
- Power user mode (filters, trends)
```

---

## Related Skills

- [responsive-patterns](responsive-patterns.md) - Screen sizes
- [ui-agent](ui-agent.md) - Builds adaptive screens
