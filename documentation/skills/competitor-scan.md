# competitor-scan

<!-- generated-from-skill: do not edit -->

Targeted reference pull on what one named competitor does for one specific feature or flow.

**Triggers:** "what does Airbnb do for waitlist" · "how does Dropbox handle referrals" · "how does [competitor] handle [flow]" · "compare this to [named competitor]"

<!-- /generated-from-skill -->

Research how competitors solve similar problems - with screenshots and analysis.

## What It Does

**Competitor analysis** that:
- Identifies relevant competitors
- Screenshots their solutions
- Analyzes patterns
- Extracts learnings (not copying)

**Evidence-based inspiration** - not blind imitation.

---

## When to Use

Use `competitor-scan` when you want to:
- See how others solve a problem
- Understand market standards
- Validate your approach
- Find inspiration

### Trigger Phrases
```
"What do competitors do for [feature]?"
"Scan competitor [feature] flows"
"How does [competitor] handle [problem]?"
"Research competitor patterns"
```

---

## How It Works

### Step 1: Competitor Identification
Asks which competitors to scan:
- Direct competitors
- Adjacent products
- Inspiration sources

### Step 2: Feature Discovery
Uses browser automation to:
- Navigate to competitor products
- Find relevant features
- Screenshot key screens
- Capture interactions

### Step 3: Pattern Analysis
Identifies:
- Common patterns (industry standard?)
- Unique approaches (differentiation)
- Best practices (what works?)
- Gaps (what's missing?)

### Step 4: Synthesis
Returns structured findings:
```
## Competitor A
- Approach: [description]
- Strengths: [what works well]
- Weaknesses: [what doesn't]
- Screenshots: [attached]

## Competitor B
...

## Patterns Observed
- 3/5 use tab navigation
- All show empty state differently
- None handle [edge case]

## Recommendations
- Consider: [pattern that works]
- Avoid: [pattern that fails]
- Differentiate: [opportunity]
```

---

## Example

### Request
```
You: "What do competitors do for referral programs?"
```

### Output
```
Competitor Scan: Referral Programs

## Competitor A (Company X)
Approach: Dedicated tab in app, copy-link primary CTA
Strengths:
- Simple, one-tap share
- Clear incentive ($10 per referral)
- Progress tracker visible

Weaknesses:
- Hidden behind settings
- No social proof
- Generic messaging

Screenshots: [3 screens attached]

## Competitor B (Company Y)
Approach: Modal prompt after key action
Strengths:
- Contextual timing (post-booking)
- Social share buttons
- Celebration animation

Weaknesses:
- Dismissable (easy to skip)
- Incentive not clear upfront

Screenshots: [2 screens attached]

## Patterns Observed
- 4/5 use incentive messaging upfront
- 3/5 show progress/streak
- 2/5 use modal, 3/5 use dedicated screen
- All provide copy-link fallback

## Recommendations
Consider:
- Upfront incentive messaging (proven pattern)
- Contextual timing (when engaged)

Differentiate:
- None show community impact
- Opportunity: "X providers joined through you"

Avoid:
- Hidden placement (reduces engagement)
```

---

## Ethical Use

### Do:
- ✅ Learn from patterns
- ✅ Understand best practices
- ✅ Validate your approach
- ✅ Find gaps/opportunities

### Don't:
- ❌ Copy exact designs
- ❌ Steal proprietary features
- ❌ Ignore your users' needs
- ❌ Follow blindly without testing

**Inspiration, not imitation.**

---

## Chains With

`competitor-scan` works with:
- `research-agent` (internal + external research)
- `design-kickoff` (validates approach)
- `deck-builder` (presents findings)

---

## Tips

### 1. Be Specific
❌ "Scan competitor apps"  
✅ "Scan competitor referral flows"

### 2. Include Adjacent Products
Don't just look at direct competitors - adjacent markets innovate too.

### 3. Focus on Patterns, Not Pixels
Learn the structure, adapt to your context.

### 4. Test Your Assumptions
Just because competitors do it doesn't mean it works.

---

## Related Skills

- [research-agent](research-agent.md) - Internal research
- [benchmark](benchmark.md) - Quantitative comparison
- [design-kickoff](design-kickoff.md) - Uses competitor research
