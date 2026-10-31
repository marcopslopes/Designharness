# content

Reviews copy, microcopy, and messaging against your brand voice guidelines.

## What It Does

**Deep content review** that checks:
- Brand voice alignment
- Terminology consistency
- Tone appropriateness
- Microcopy quality
- CTA effectiveness

**Uses YOUR voice guidelines** (if customized) or best practices.

---

## When to Use

Use `content` when you want to:
- Review copy before shipping
- Check voice consistency
- Validate button text
- Audit messaging

### Trigger Phrases
```
"Review this copy"
"Check the content"
"Does this match our voice?"
"Audit the messaging"
```

---

## What It Checks

### 1. Brand Voice
- Tone (friendly, professional, playful?)
- Personality (how you sound)
- Consistency with guidelines

### 2. Terminology
- Correct product terms
- Consistent labels
- No jargon (unless appropriate)

### 3. Clarity
- Simple language
- Clear CTAs
- No ambiguity

### 4. Microcopy
- Error messages helpful
- Empty states encouraging
- Loading states informative

### 5. Length
- Mobile-appropriate
- Scannable
- Not too wordy

### 6. Interface copy craft
House style guide wins if anything conflicts.

- Match labels already on the screen (menu vs toast)
- Tone by stakes: warm on empty/success, zero play on delete, serious on data loss
- Never "the user" on screen; no "we're having trouble" on errors
- One perspective per flow; possessives only when they disambiguate
- Link the setting, don't describe the path
- Format hints before the mistake, not only in the error
- Flow bookends: Get started / Continue / Done — never Next

Reviews of existing copy also get a Major / Minor / Note table
(Location / Before / After / Why). Not a second severity scale.

---

## Example Review

### Input
```tsx
<Card>
  <Text>Get More!</Text>
  <Button>Click Here</Button>
</Card>
```

### Output
```
Content Review: Promotion Card

Issues:
❌ "Get More!" - Vague, doesn't explain what user gets
❌ "Click Here" - Generic CTA, not action-oriented

Recommendations:
✅ Headline: "Unlock Premium Features"
✅ CTA: "Upgrade Now"

Voice check:
- Current: Generic/spammy
- Target: Clear, benefit-focused
- Gap: Be specific about value
```

---

## Chains With

`content` often runs with:
- `ux-pattern` (structure + copy review)
- `audit` (includes content check)
- `accessibility` (alt text, labels)

---

## Customization

### Use YOUR Voice
During harness setup:
```
"Do you have brand voice guidelines?"
→ Yes: content skill uses YOUR tone/terminology
```

---

## Tips

### 1. Review Early
Check copy in wireframes, not just final designs.

### 2. Test CTAs
Button text matters - be specific and action-oriented.

### 3. Check Empty States
Often overlooked - content skill catches these.

---

## Related Skills

- [ux-pattern](ux-pattern.md) - Structure review
- [audit](audit.md) - Quality gate
- [accessibility](accessibility.md) - Label review
- [writing](writing.md) - Long-form content
