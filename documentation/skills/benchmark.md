# benchmark

Quantitative comparison - measure your product against metrics and goals.

## What It Does

**Benchmarking analysis** that:
- Tracks key metrics
- Compares to goals
- Identifies trends
- Sale items gaps
- Recommends actions

**Data-driven design** - decisions backed by numbers.

---

## When to Use

Use `benchmark` when you want to:
- Measure feature performance
- Compare to goals
- Track improvement over time
- Prioritize based on data

### Trigger Phrases
```
"Benchmark [feature]"
"Track metrics for [feature]"
"Compare to goals"
"Performance analysis for [feature]"
```

---

## Example Output

### Input
```
You: "Benchmark city leaderboard"
```

### Generated Benchmark
```
# Benchmark Report: City Leaderboard
Date: 2026-10-15 (4 weeks post-launch)
Comparison: vs Goals & Pre-launch

## Summary
✅ Exceeded engagement goals
✅ Churn reduction successful
⚠️ Daily usage below target
❌ Low-rank city engagement gap

## Key Metrics

### Engagement
Metric: % providers who viewed leaderboard
- Current: 68%
- Goal: 60%
- Result: ✅ +8pp above goal

Metric: Average views per user per week
- Current: 2.3 views
- Goal: 3.0 views
- Result: ⚠️ -0.7 below goal

### Retention
Metric: Churn rate (test group)
- Pre-launch: 12.5%
- Post-launch: 11.5%
- Change: -8% reduction
- Goal: -5% reduction
- Result: ✅ Exceeded goal

### Satisfaction
Metric: Feature satisfaction (survey)
- Score: 4.2/5 (n=200)
- Goal: 4.0/5
- Result: ✅ Above goal

Sentiment: 85% positive, 12% neutral, 3% negative

## Segmentation

### By City Rank
Top 3 cities:
- Engagement: 92% view weekly
- Satisfaction: 4.7/5
- Churn: -15% vs baseline

Middle 4-7 cities:
- Engagement: 78% view weekly
- Satisfaction: 4.3/5
- Churn: -10% vs baseline

Bottom 8-10 cities:
- Engagement: 45% view weekly ⚠️
- Satisfaction: 3.5/5 ⚠️
- Churn: -2% vs baseline ⚠️

### By Platform
iOS:
- Engagement: 72%
- Satisfaction: 4.3/5

Android:
- Engagement: 64%
- Satisfaction: 4.1/5

Gap: iOS 8pp higher engagement

## Trends (4 weeks)

Week 1: 75% engagement (launch excitement)
Week 2: 68% engagement
Week 3: 66% engagement ⚠️ Declining
Week 4: 68% engagement (stable)

Daily usage:
Week 1: 20% DAU
Week 2: 17% DAU
Week 3: 15% DAU ⚠️ Declining
Week 4: 15% DAU (stable but below goal)

## Gaps & Issues

### Issue 1: Low-Rank City Disengagement
Low-ranked cities show 45% engagement (vs 92% for top).
Hypothesis: Demoralizing for low rankers
Impact: Missing on churn reduction for this segment

### Issue 2: Daily Usage Decline
Started at 20% DAU, now 15% (goal was 20%).
Hypothesis: Novelty wore off, lacks stickiness
Impact: Lower than expected repeat engagement

### Issue 3: Platform Disparity
Android 8pp lower engagement than iOS.
Hypothesis: Layout issue? Performance? User base?
Impact: Not serving Android users equally

## Recommendations (Priority Order)

### HIGH: Address Low-Rank Experience
Action: Add progress indicators ("Your city improved +3 spots")
Expected impact: +10pp engagement for low rankers
Timeline: 2 weeks

### MEDIUM: Increase Stickiness
Action: Add weekly summary notification
Expected impact: +5pp daily usage
Timeline: 3 weeks

### MEDIUM: Investigate Android Gap
Action: User research on Android providers
Expected impact: Close platform gap
Timeline: 4 weeks

### LOW: Add Trend Data
Action: Historical charts (V2 feature)
Expected impact: +3pp engagement
Timeline: 6 weeks

## Success Criteria (Next Review)

Next benchmark: 2026-11-15 (8 weeks post-launch)

Goals:
- Low-rank engagement: 60% (from 45%)
- Daily usage: 18% DAU (from 15%)
- Android gap: <5pp (from 8pp)
- Overall satisfaction: >4.2/5 (maintain)

---

Data sources:
- Analytics: [dashboard link]
- Survey: n=200 (2026-10-01)
- Jira: PROJ-890
```

---

## Chains With

`benchmark` works with:
- `publish-project` (sets success criteria)
- `design-retrospective` (uses metrics for review)
- `research-synthesis` (combines with qualitative)

---

## Tips

### 1. Define Metrics Upfront
Set goals before launching, measure after.

### 2. Segment Data
Averages hide insights - segment by user type, platform, etc.

### 3. Track Trends
Single snapshot is incomplete - watch over time.

### 4. Combine with Qualitative
Numbers tell what, research tells why.

---

## Related Skills

- [publish-project](publish-project.md) - Defines metrics
- [design-retrospective](design-retrospective.md) - Uses metrics
- [research-synthesis](research-synthesis.md) - Qualitative pair
