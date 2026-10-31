# audit

The mandatory quality gate - checks design system, accessibility, and content before anything gets shared.

## What It Does

**Runs automatically** at the end of every build chain to check:
- ✅ Design system compliance (no hardcoded colors/spacing)
- ✅ Accessibility (WCAG AA minimum)
- ✅ Content quality (matches your voice)

**Blocks sharing** if critical issues are found.

---

## When It Runs

### Automatically (You Don't Call It)
```
"Build a screen" →
  ui-agent (builds) →
  audit (runs automatically) ✓
```

### Manually (On Demand)
```
"Audit this prototype"
"Check this before I share"
"Run the quality gate"
```

---

## What It Checks

### 1. Design System Layer
**Scans for:**
- Hardcoded colors (must use `var(--kit-*)`)
- Hardcoded spacing (must use `var(--space-*)`)
- Hardcoded radius (must use `var(--radius-*)`)
- Invented components (must use `context/design-system/ds/`)

**Fails if:** Any hardcoded value found

### 2. Accessibility Layer
**Scans for:**
- Missing alt text on images
- Color contrast failures (WCAG AA)
- Keyboard navigation issues
- Missing ARIA labels
- Focus order problems

**Fails if:** WCAG AA violations found

### 3. Content Layer
**Scans for:**
- Off-brand voice/tone
- Inconsistent terminology
- Missing microcopy
- Button text issues

**Warns if:** Voice mismatches (not blocking)

### 6. Object failure modes (advisory)
Same four signals as conceptual-model, on the **built screen**: shapeshifter, masked, broken, isolated. Never blocking. Don't "fix" with colour.

### 7. Surface vs deeper layer (advisory)
Each advisory is tagged `surface` / `interaction` / `objects` / `jobs` / `strategy` / `unknown`. Non-surface findings point at conceptual-model, job stories, product-strategy, or diagnostic — not a spacing tweak.

### 8. Ethical design (advisory, conditional)
Only fires when the surface has a growth mechanic, dark-pattern-prone element, or consequential default — skipped silently otherwise. Checks harm / access / sustainability using `harness/references/ethical-design-check.md`. Never blocking; never a compliance substitute.

---

## Output Format

### ✅ PASS Example
```
AUDIT PASS ✓

Design System: 0 issues
Accessibility: 0 issues  
Content: 0 issues

Safe to share.
```

### ⚠️ PASS with Advisories
```
AUDIT PASS ✓

Design System: 0 issues
Accessibility: 0 issues
Content: 2 advisories

Advisories (non-blocking):
- Consider more action-oriented CTA copy
- "Settings" vs "Preferences" - check terminology

Safe to share, but review advisories.
```

### ❌ FAIL Example
```
AUDIT FAIL ❌

Design System: 3 issues (BLOCKING)
- Line 45: Hardcoded #007078 (use var(--kit-brand))
- Line 67: Hardcoded 20px (use var(--space-5))
- Line 89: Hardcoded 12px radius (use var(--radius-3))

Accessibility: 1 issue (BLOCKING)
- Missing alt text on hero image

Content: 0 issues

BLOCKED - Fix issues before sharing.
```

---

## Severity Levels

### 🔴 Blocking (Must Fix)
- Hardcoded design values
- WCAG AA violations
- Missing accessibility labels
- Critical content issues

### 🟡 Advisory (Review)
- Voice/tone suggestions
- Terminology recommendations
- UX pattern suggestions
- Optimization opportunities

### 🟢 Pass
- All checks passed
- Safe to share

---

## Audit Modes

### Full Audit (Default)
Checks everything:
```
audit →
  design-system check
  accessibility check
  content check
```

### Deferred Audit (Micro-Edits)
For tiny changes (one style value, copy tweak):
- Still runs design-system/accessibility/content checks
- Just doesn't block immediately
- Runs when you stack 3+ micro-edits or say "share"

---

## Common Failures

### 1. Hardcoded Color
```css
/* ❌ FAIL */
.card {
  background: #007078;
}

/* ✅ FIX */
.card {
  background: var(--kit-brand);
}
```

### 2. Hardcoded Spacing
```css
/* ❌ FAIL */
.container {
  padding: 24px;
  gap: 16px;
}

/* ✅ FIX */
.container {
  padding: var(--space-5);
  gap: var(--space-4);
}
```

### 3. Missing Alt Text
```tsx
/* ❌ FAIL */
<img src="hero.jpg" />

/* ✅ FIX */
<img src="hero.jpg" alt="City leaderboard showing top providers" />
```

### 4. Contrast Failure
```css
/* ❌ FAIL - fails WCAG AA */
.text {
  color: #999;
  background: #fff;
}

/* ✅ FIX */
.text {
  color: var(--kit-ink-70);  /* Sufficient contrast */
  background: var(--kit-paper);
}
```

---

## Fixing Failures

### Step 1: Read the Output
Audit tells you exactly what's wrong and where:
```
Line 45: Hardcoded #007078 (use var(--kit-brand))
```

### Step 2: Fix the Issue
Replace the hardcoded value with the suggested token.

### Step 3: Re-Run (Automatic)
`ui-agent` re-runs audit automatically after fixes.

---

## Deferring Audit

For **non-critical projects** or **exploration work**:
```
You: "Skip audit for now, I'm just exploring"

Response: "Audit deferred. Saved to projects/<slug>/debt.md.
You can run it later with 'audit this project'"
```

**Deferred issues are tracked** - not forgotten.

---

## Design Debt

When you defer audit findings:
```
projects/<slug>/debt.md

# Design Debt Register

## Deferred Audit Findings (2026-08-27)

### Design System
- Line 45: Hardcoded #007078 → var(--kit-brand)
- Line 67: Hardcoded 20px → var(--space-5)

### Accessibility
- Missing alt text on CTA image

Reason deferred: Exploration phase, pre-approval
Review by: Before stakeholder share
```

---

## Chains With

`audit` runs after:
- `ui-agent` (builds)
- `content` (reviews copy)
- `ux-pattern` (reviews structure)
- `accessibility` (deep a11y check)

---

## Skipping Audit?

**You can't skip audit on purpose for production work.**

The harness enforces quality gates because:
- Catches issues early (cheaper to fix)
- Prevents tech debt accumulation
- Ensures brand consistency
- Protects accessibility standards

**For exploration:** You can defer (tracked as debt), not skip.

---

## Tips

### 1. Fix Design System Issues First
They're easiest - just replace values with tokens.

### 2. Use Available Tokens
Check `context/design-system/tokens.css` for what exists:
```
--kit-brand, --kit-premium, --kit-leaf
--space-1 through --space-8
--radius-2, --radius-3, --radius-4
```

### 3. Test Contrast
If audit fails contrast, try:
- Darker text: `--kit-ink-70` instead of `--kit-ink-50`
- Lighter bg: `--kit-paper` instead of `--kit-bg`

### 4. Write Good Alt Text
Describe what's in the image + why it matters:
```
❌ Bad: alt="image"
✅ Good: alt="Top 3 providers celebrating milestone"
```

---

## Troubleshooting

### "Audit keeps failing on the same line"
**Problem:** Fix wasn't saved or incorrect token used

**Check:**
- Did you save the file?
- Did you use the exact suggested token?
- Is the token defined in `tokens.css`?

### "Audit passed but screen looks wrong"
**Problem:** Audit checks technical compliance, not design quality

**Next:** Run `ux-pattern` or `content` for deeper review

### "Want to share but audit failed"
**Problem:** Critical issues found

**Options:**
1. Fix the issues (recommended)
2. Defer to debt register (tracked)
3. Discuss with team lead

---

## Related Skills

- [ui-agent](ui-agent.md) - Builds screens (audit runs after)
- [accessibility](accessibility.md) - Deep a11y review
- [content](content.md) - Content-specific review
- [ux-pattern](ux-pattern.md) - Flow structure review

---

## Related Guides

- [Design System Usage](../guides/design-system-usage.md)
- [Understanding Skills](../guides/understanding-skills.md)
