# design-retrospective

<!-- generated-from-skill: do not edit -->

Structured post-ship (or milestone) reflection — what worked, what didn't, what to carry forward.

**Triggers:** "design retrospective" · "retro this project" · "what did we learn from [slug]" · "reflect on this launch" · "close out this project"

<!-- /generated-from-skill -->

Post-launch review - what worked, what didn't, lessons learned.

## What It Does

**Facilitates retrospectives** by:
- Reviewing project outcomes
- Analyzing decisions
- Identifying lessons
- Documenting for future
- Celebrating wins

**Learning culture** - improve with each project.

---

## When to Use

Use `design-retrospective` when you want to:
- Review shipped project
- Learn from outcomes
- Document lessons
- Improve process

### Trigger Phrases
```
"Run retrospective on [project]"
"What did we learn from [project]?"
"Review [project] outcomes"
"Lessons from [project]"
```

---

## Retrospective Framework

### 1. Recap
What did we ship? When? Goals?

### 2. Outcomes
Metrics, feedback, impact

### 3. What Went Well
Celebrate successes

### 4. What Didn't
Honest assessment

### 5. Lessons Learned
Takeaways for next time

### 6. Actions
Changes to make

---

## Example Output

### Input
```
You: "Run retrospective on city leaderboard"
```

### Generated Retrospective
```
# Retrospective: City Leaderboard
Ship Date: 2026-09-15
Team: Daniel (design), Alex (PM), Jordan (eng)
Duration: 6 weeks (research → ship)

## What We Shipped
City leaderboard showing top 10 cities by booking count.
Prominent placement in home tab. Real-time data.

Goal: Increase provider engagement, reduce churn

## Outcomes (4 weeks post-launch)

### Metrics
✅ 68% providers viewed leaderboard (target: 60%)
✅ Home tab engagement +12% (target: stable)
✅ Churn rate -8% in test group (target: -5%)
⚠️ Daily active usage 15% (hoped for 20%)

### Qualitative Feedback
- 85% positive sentiment in survey (n=200)
- "Love seeing our city rank" (common theme)
- "Motivates me to work harder" (providers in top cities)
- "Wish I could see trends over time" (feature request)

### Business Impact
- ROI: Positive (reduced churn = $XXk savings)
- PM satisfied: Yes, exceeded goals
- Eng effort: 2 weeks (as estimated)

## What Went Well

### 1. Research-First Approach
Workload + discovery + competitor scan gave us confidence.
No surprises post-launch - validated assumptions.

Learning: Keep doing research upfront.

### 2. Empty State Fix
Caught empty state issue in usability testing (pre-launch).
Fixed before shipping - prevented bad first impression.

Learning: Usability testing catches critical issues.

### 3. Iterative Placement Decision
Debated home tab vs dedicated tab. Documented rationale.
Home tab placement was right call (68% views proves it).

Learning: Document decisions - they help post-launch.

### 4. PM-Design Alignment
Weekly syncs with Alex kept us aligned.
No surprises, no conflicts.

Learning: Over-communicate with PM.

## What Didn't Go Well

### 1. Ranking Criteria Confusion
Despite usability testing feedback, some users still confused.
Should have made explainer more prominent.

Learning: Don't just add tooltip - make it visible by default.

### 2. Performance Issues First Week
Slow loading first week (backend scaling issue).
Should have load-tested before launch.

Learning: Push for load testing on data-heavy features.

### 3. Android Layout Bug
Minor layout bug on Android (didn't catch in testing).
Fixed quickly but embarrassing.

Learning: Test on real Android devices, not just emulator.

### 4. No Trend Data
Users immediately requested historical trends.
Should have anticipated this in research.

Learning: Think one step ahead - what will users want next?

## Lessons Learned

### Process
1. Research upfront prevents rework ✓
2. Usability testing is non-negotiable ✓
3. Document decisions for post-launch clarity ✓
4. Over-communicate with stakeholders ✓

### Design
1. Tooltips are not enough - make explainers visible
2. Think ahead to V2 requests
3. Performance matters - design for loading states

### Execution
1. Push for load testing on data features
2. Test on real devices, especially Android
3. Ship small, iterate fast (worked well here)

## Actions for Next Project

### Keep Doing
- Research-first approach
- Usability testing pre-launch
- Weekly PM syncs
- Decision documentation

### Start Doing
- More prominent explainers (not tooltips)
- Push for load testing
- Real device testing earlier
- Think ahead to V2 features

### Stop Doing
- Relying on tooltips for critical info
- Skipping Android device testing
- Assuming performance is "engineering's problem"

## Celebration
This was a win! Exceeded goals, team worked well together,
users love it. Props to Jordan for fast fixes, Alex for
clear PM guidance, and the research that set us up for success.

---

Logged to: projects/city-leaderboard/RETROSPECTIVE.md
```

---

## Chains With

`design-retrospective` works with:
- `publish-project` (review after shipping)
- `session-journal` (journal entries as evidence)
- `design-rationale` (reviews decisions)

---

## Tips

### 1. Run Within 4 Weeks of Launch
While outcomes and memories are fresh.

### 2. Be Honest
Focus on learning, not blame.

### 3. Include Metrics
Qualitative feedback + quantitative data.

### 4. Share Learnings
Make retrospectives searchable for whole team.

---

## Related Skills

- [publish-project](publish-project.md) - Handoff first
- [session-journal](session-journal.md) - Your session journal
- [benchmark](benchmark.md) - Tracks metrics
