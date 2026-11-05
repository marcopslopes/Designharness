# accessibility

Deep WCAG compliance review - beyond what audit checks.

## What It Does

**Comprehensive a11y review** that checks:
- WCAG 2.2 AA compliance (minimum)
- AAA where possible
- Screen reader experience
- Keyboard navigation
- Focus management
- ARIA usage

**More thorough than `audit`** - this is the deep check.

---

## When to Use

Use `accessibility` when you want to:
- Ship to production (full compliance needed)
- Support assistive tech users
- Meet legal requirements
- Deep a11y audit

### Trigger Phrases
```
"Run accessibility check"
"WCAG audit"
"Check screen reader support"
"Full a11y review"
```

---

## What It Checks

### 1. Color Contrast
- Text: 4.5:1 minimum (AA)
- Large text: 3:1 minimum
- Graphics: 3:1 minimum

### 2. Alternative Text
- Images: descriptive alt text
- Icons: ARIA labels
- Decorative: marked properly

### 3. Keyboard Navigation
- All interactive elements focusable
- Focus order logical
- Focus visible
- No keyboard traps

### 4. Screen Readers
- Semantic HTML
- ARIA labels where needed
- Landmark regions
- Heading hierarchy

### 5. Forms
- Labels associated with inputs
- Error messages clear
- Required fields marked
- Instructions provided

### 6. Motion & Animation
- Respects prefers-reduced-motion
- No seizure-inducing flashing
- Auto-play can be paused

---

## Severity Levels

### 🔴 Critical (WCAG Violation)
Blocks users with disabilities - must fix.

### 🟡 Advisory (Best Practice)
Recommended improvements beyond WCAG minimum.

### 🟢 Pass
Meets or exceeds standards.

---

## Example Review

### Input
```tsx
<Button style={{ background: '#fafafa', color: '#999' }}>
  Submit
</Button>
```

### Output
```
Accessibility Review

❌ CRITICAL: Color contrast failure
- Current: 2.1:1 (#999 on #fafafa)
- Required: 4.5:1 (WCAG AA)
- Fix: Use --kit-ink-70 (7.2:1 contrast)

✅ Keyboard: Button is focusable
✅ Screen reader: Button has accessible name
⚠️ Advisory: Consider adding loading state announcement
```

---

## Difference from Audit

| Feature | audit | accessibility |
|---------|-------|---------------|
| Depth | Quick check | Comprehensive |
| WCAG Level | AA basics | AA + AAA where possible |
| Screen reader testing | Limited | Full simulation |
| When | After every build | Before production |
| Time | Fast | Thorough |

Use `audit` during iteration, `accessibility` before shipping.

---

## Chains With

`accessibility` runs:
- After `ui-agent` (pre-production check)
- With `audit` (belt and suspenders)
- Before `publish-project` (gate)

---

## Tips

### 1. Test Early
Don't wait until the end - a11y issues get expensive.

### 2. Use Semantic HTML
Divs with roles are harder than native elements.

### 3. Test With Real Tools
Use VoiceOver (Mac) or NVDA (Windows) to verify.

### 4. Check Focus Order
Tab through the flow - does it make sense?

---

## Related Skills

- [audit](audit.md) - Quick a11y check
- [cognitive-accessibility](cognitive-accessibility.md) - Cognitive load
- [ui-agent](ui-agent.md) - Builds with a11y in mind
