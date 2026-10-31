# assumption-mapper

<!-- generated-from-skill: do not edit -->

Surfaces and organizes team/stakeholder assumptions before research or a build begins — separating what's actually known (sourced) from what's believed (unsourced), so the work is designed to learn rather than confirm a decision already made.

**Triggers:** "what are our assumptions" · "map our assumptions" · "assumption workshop" · "we think we know what users want" · "before we start, what should we document" · "how do I challenge this stakeholder's assumption" · "hypothesis vs assumption" · "assumption audit"

<!-- /generated-from-skill -->

Identifies risky assumptions in your design - what needs validating?

## What It Does

**Maps assumptions** by:
- Extracting implicit beliefs
- Rating risk (high/medium/low)
- Suggesting validation methods
- Prioritizing what to test

**Risk mitigation** - test assumptions before shipping.

---

## When to Use

Use `assumption-mapper` when:
- Starting new projects
- Feeling uncertain
- Before big decisions
- Planning research

### Trigger Phrases
```
"Map assumptions for [project]"
"What are we assuming?"
"Identify risks in [design]"
"What should we validate?"
```

---

## Example Output

```
Assumptions: City Leaderboard

HIGH RISK:
1. Providers want to see city rankings
   Risk: Core value prop - if wrong, feature fails
   Validate: User interviews (n=10)
   
2. Leaderboard is motivating (not demoralizing)
   Risk: Could increase churn if demotivating
   Validate: Usability test with sentiment check

MEDIUM RISK:
3. Booking count is right metric
   Risk: Might prefer revenue or quality
   Validate: Survey with metric preferences
   
4. Real-time data matters (vs daily snapshot)
   Risk: Engineering cost vs user benefit
   Validate: Prototype testing with both

LOW RISK:
5. Top 10 is right number
   Risk: Easy to adjust post-launch
   Validate: A/B test

Recommendation: Validate HIGH risks before building.
```

---

## Related Skills

- [design-kickoff](design-kickoff.md) - Uses assumptions for research plan
- [decision-first-research](decision-first-research.md) - Validates assumptions
