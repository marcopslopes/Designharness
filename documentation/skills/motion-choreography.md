# motion-choreography

<!-- generated-from-skill: do not edit -->

Specs, reviews, and plans purposeful animation for Design Harness / handoff — with frequency gating and mandatory reduced-motion alternatives.

**Triggers:** "motion spec for X" · "animate this transition" · "prototype this micro-interaction" · "reduced motion for this" · "choreograph the loading state" · "how should this celebrate completion" · "review these animations" · "motion review" · "what could be animated here" · "find animation opportunities" · "audit the motion" · "improve the animations" · "motion plan for X" · "what's it called when [motion feel]" · "animation vocabulary" · "list the motions" · "what motions do we have" · "scan this for motion" · "apply the sheet motion" · "apply the menu" · "apply the pill" · "add the right motion here" · "does the system already animate this" · "custom motion only if the platform doesn't"

<!-- /generated-from-skill -->

Complex animation sequences - coordinated motion across multiple elements.

## What It Does

**Creates animation sequences** that:
- Coordinate multiple elements
- Create narrative flow
- Guide attention
- Provide continuity
- Delight users

**Beyond microinteractions** - orchestrated motion design.

---

## When to Use

Use `motion-choreography` when you want to:
- Onboarding sequences
- Feature announcements
- Complex transitions
- Celebration moments
- Storytelling

### Trigger Phrases
```
"Create animation sequence for [flow]"
"Design onboarding animation"
"Choreograph [transition]"
"Add celebration animation"
```

---

## Animation Patterns

### Staggered Entry
```
Elements enter in sequence with delay:
1. Title (0ms)
2. Subtitle (100ms)
3. Card 1 (200ms)
4. Card 2 (300ms)
5. CTA (400ms)
```

### Sequential Reveal
```
Step-by-step reveal:
1. Background fade in
2. Hero image scale up
3. Text fade in from bottom
4. CTA pulse
```

### Coordinated Exit
```
All elements exit together:
1. Fade opacity
2. Scale down
3. Slide off-screen
(All happening simultaneously but with easing)
```

### Morphing Transition
```
One element becomes another:
- Icon → Screen
- Card → Modal
- Button → Loading spinner → Success checkmark
```

---

## Example

### Input
```
You: "Create celebration animation for reaching top 3"
```

### Output
```tsx
function Top3Celebration() {
  return (
    <AnimationSequence>
      {/* Step 1: Badge appears */}
      <Keyframe at={0}>
        <Badge
          color="brand"
          style={{
            transform: 'scale(0)',
            opacity: 0
          }}
        >
          🏆 Top 3!
        </Badge>
      </Keyframe>

      {/* Step 2: Badge scales in with bounce */}
      <Keyframe at={200}>
        <Badge
          style={{
            transform: 'scale(1.2)',
            opacity: 1,
            transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
          }}
        >
          🏆 Top 3!
        </Badge>
      </Keyframe>

      {/* Step 3: Badge settles to normal size */}
      <Keyframe at={600}>
        <Badge
          style={{
            transform: 'scale(1)',
            transition: 'all 0.2s ease-out'
          }}
        >
          🏆 Top 3!
        </Badge>
      </Keyframe>

      {/* Step 4: Confetti animation */}
      <Keyframe at={400}>
        <Confetti
          numberOfPieces={50}
          recycle={false}
          colors={['var(--kit-brand)', 'var(--kit-premium)', 'var(--kit-leaf)']}
        />
      </Keyframe>

      {/* Step 5: Success message fades in */}
      <Keyframe at={800}>
        <Text
          style={{
            opacity: 0,
            transform: 'translateY(10px)',
            transition: 'all 0.3s ease-out'
          }}
        >
          Congrats! Your city is in the top 3!
        </Text>
      </Keyframe>

      <Keyframe at={1100}>
        <Text
          style={{
            opacity: 1,
            transform: 'translateY(0)'
          }}
        >
          Congrats! Your city is in the top 3!
        </Text>
      </Keyframe>

      {/* Step 6: Haptic feedback (mobile) */}
      <Keyframe at={200}>
        <HapticFeedback type="success" />
      </Keyframe>
    </AnimationSequence>
  )
}
```

---

## Timing Principles

### Easing
```
Ease-out: Starting fast, ending slow (enter)
Ease-in: Starting slow, ending fast (exit)
Ease-in-out: Slow at both ends (movement)
Bounce: Overshoots then settles
```

### Duration
```
Fast: 100-200ms (state changes)
Medium: 200-400ms (transitions)
Slow: 400-600ms (reveals)
Very slow: 600ms+ (storytelling)
```

### Stagger
```
50-100ms: Tight sequence
100-200ms: Clear sequence
200ms+: Deliberate pacing
```

---

## Chains With

`motion-choreography` works with:
- `interaction-design` (combines with microinteractions)
- `ui-agent` (adds to screens)
- `accessibility` (validates motion preferences)

---

## Tips

### 1. Use Sparingly
Complex animations for key moments only.

### 2. Respect Reduced Motion
Always provide static fallback:
```css
@media (prefers-reduced-motion: reduce) {
  .animation {
    animation: none;
    transition: none;
  }
}
```

### 3. Test Performance
Complex animations can lag - test on real devices.

### 4. Prototype First
Use Figma/Principle to preview before coding.

---

## Related Skills

- [interaction-design](interaction-design.md) - Microinteractions
- [ui-agent](ui-agent.md) - Builds animated screens
- [accessibility](accessibility.md) - Motion accessibility
