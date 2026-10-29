# interaction-design

Microinteractions, transitions, and feedback patterns - the details that delight.

## What It Does

**Designs interactions** including:
- State transitions
- Loading animations
- Success/error feedback
- Hover/focus states
- Gestures and affordances

**The polish layer** - makes interfaces feel responsive and alive.

---

## When to Use

Use `interaction-design` when you want to:
- Add microinteractions
- Design state transitions
- Improve feedback
- Polish interactions

### Trigger Phrases
```
"Add interactions to [screen]"
"Design loading states"
"Create success animation"
"Improve feedback for [action]"
```

---

## Interaction Types

### Loading States
```
Skeleton screens
Spinners
Progress bars
Shimmer effects
```

### Success States
```
Checkmark animation
Success toast
Celebration animation
Haptic feedback (mobile)
```

### Error States
```
Error message
Shake animation
Red border
Clear retry path
```

### Hover/Focus
```
Scale up slightly
Color shift
Border highlight
Shadow increase
```

### Gestures (Mobile)
```
Swipe to delete
Pull to refresh
Long press menu
Pinch to zoom
```

---

## Error prevention & destructive actions

For destructive/consequential actions (delete, remove, send, publish) or
non-trivial failure paths (network drop, server error, session timeout,
concurrent-edit conflict): work the **error-prevention hierarchy**
(eliminate → prevent → detect early → recover → explain → diagnose —
never jump to a confirm dialog when a cheaper level would do), and
default to **undo-with-a-toast** over a confirm dialog unless the action
is truly irreversible, high-consequence, or affects other people. See
`harness/skills/interaction-design/references/error-prevention.md` for
the full hierarchy and recovery-flow templates.

---

## Example

### Input
```
You: "Add interactions to city leaderboard"
```

### Output
```tsx
// Loading State
{isLoading && (
  <Stack direction="column" gap={3}>
    {[1,2,3].map(i => (
      <SkeletonCard key={i} height={80} />
    ))}
  </Stack>
)}

// Success: Data Loaded
{!isLoading && cities.length > 0 && (
  <Stack direction="column" gap={3}>
    {cities.map((city, index) => (
      <Card
        key={city.id}
        style={{
          animation: `fadeInUp 0.3s ease ${index * 0.05}s both`
        }}
        hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Card content */}
      </Card>
    ))}
  </Stack>
)}

// Error State
{error && (
  <EmptyState
    icon={<IconAlertCircle />}
    title="Couldn't load rankings"
    description="Check your connection and try again"
    action={
      <Button
        onClick={retry}
        variant="primary"
      >
        Retry
      </Button>
    }
  />
)}

// Pull to Refresh (Mobile)
<PullToRefresh onRefresh={fetchRankings}>
  {/* Content */}
</PullToRefresh>

// Rank Badge Animation (Top 3)
{city.rank <= 3 && (
  <Badge
    color="brand"
    style={{
      animation: 'pulse 2s ease infinite'
    }}
  >
    #{city.rank}
  </Badge>
)}
```

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
```

---

## Principles

### 1. Provide Feedback
Every action should have a response:
```
Tap → Visual acknowledgment
Loading → Progress indicator
Success → Confirmation
Error → Clear message
```

### 2. Respect Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Keep It Subtle
Microinteractions should enhance, not distract.

### 4. Be Consistent
Same actions = same feedback patterns.

---

## Chains With

`interaction-design` works with:
- `ui-agent` (adds interactions to screens)
- `motion-choreography` (complex animations)
- `audit` (checks interaction quality)

---

## Tips

### 1. Start with States
Map all states first:
```
- Loading
- Success
- Error
- Empty
- Disabled
```

### 2. Use Design System
Leverage existing patterns:
```
<Button loading={true}>...</Button>
<Toast type="success">...</Toast>
```

### 3. Test on Device
Interactions feel different on real devices - test there.

### 4. Accessibility Matters
Ensure interactions work with keyboard, screen readers.

---

## Related Skills

- [motion-choreography](motion-choreography.md) - Advanced animations
- [ui-agent](ui-agent.md) - Builds interactive screens
- [accessibility](accessibility.md) - Validates interaction accessibility
