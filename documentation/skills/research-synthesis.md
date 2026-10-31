# research-synthesis

<!-- generated-from-skill: do not edit -->

Turns raw interview/UT recordings and transcripts into tagged data, affinity clusters, and pattern candidates — either as a per-session 30-minute debrief run right after each interview, or a full tagging + affinity-diagramming pass across a completed study.

**Triggers:** "run a research debrief" · "post-session debrief" · "lightning synthesis" · "how do I synthesize these interviews" · "affinity diagram this data" · "find patterns in these transcripts" · "synthesis is taking too long" · "I have all this data now what" · "tag these transcripts" · "cluster these findings" · "here's an interview" · "anything interesting?"

<!-- /generated-from-skill -->

Analyzes qualitative research - turns notes into insights and recommendations.

## What It Does

**Synthesizes research** by:
- Analyzing session notes
- Identifying patterns
- Extracting insights
- Prioritizing findings
- Generating recommendations

**Turns raw data into actionable insights** - the "so what?"

---

## When to Use

Use `research-synthesis` when you want to:
- Analyze usability test results
- Synthesize interview notes
- Find patterns in feedback
- Create research reports

### Trigger Phrases
```
"Synthesize research from [study]"
"Analyze test results"
"What did we learn from [research]?"
"Create research report"
```

---

## How It Works

### Step 1: Data Ingestion
Takes in:
- Session transcripts
- Notes from tests/interviews
- Survey responses
- Observation logs

### Step 2: Pattern Identification
Finds:
- Common themes (3+ participants)
- Outliers (unique insights)
- Severity (blockers vs nice-to-haves)
- Confidence (strong vs weak signal)

### Step 3: Insight Extraction
Creates:
```
## Insight 1: [Finding]
Evidence: [Quote/observation]
Frequency: X/N participants
Severity: Critical / High / Medium / Low
Confidence: Strong / Moderate / Weak

## Insight 2: [Finding]
...
```

### Step 4: Recommendations
Generates:
```
## Recommendations (Priority Order)
1. [Action] - Addresses [insight]
2. [Action] - Addresses [insight]
3. [Action] - Addresses [insight]
```

---

## Example Output

### Input
```
You: "Synthesize city leaderboard test results"

Context: 6 usability test sessions completed
```

### Generated Synthesis
```
# Research Synthesis: City Leaderboard
Study: Usability Test (n=6)
Date: 2026-08-27

## Executive Summary
Overall positive response. Leaderboard is discoverable and
motivating for most providers. Two critical findability issues
and one comprehension gap require fixing before launch.

## Key Insights

### 1. Discoverability is Strong
5/6 participants noticed leaderboard unprompted within 30s
Evidence:
- P1: "Oh, there's a leaderboard! That's cool."
- P3: "I see rankings right away"
- P5: "This is new - city rankings"

Severity: None (working well)
Confidence: Strong

### 2. Ranking Criteria Unclear
4/6 participants didn't understand "booking count" as criteria
Evidence:
- P2: "Is this revenue or number of bookings?"
- P4: "I thought it was customer ratings"
- P6: "How is the rank calculated?"

Severity: HIGH
Confidence: Strong
Recommendation: Add explainer text or tooltip

### 3. Motivating for High Rankers, Mixed for Low
Top 3 cities: 3/3 reported motivation
Bottom 7 cities: 1/3 motivated, 2/3 neutral/negative

Evidence (positive):
- P1 (top city): "This makes me proud of my city"
- P3 (top city): "We're crushing it!"

Evidence (negative):
- P4 (low rank): "This just makes me feel bad"
- P5 (low rank): "What's the point if we're not top?"

Severity: MEDIUM
Confidence: Moderate
Recommendation: Highlight progress/improvement, not just rank

### 4. Empty State Confusing
2/2 new providers (no city set) were blocked
Evidence:
- P2: "Why don't I see anything?"
- P5: "Is this broken?"

Severity: CRITICAL
Confidence: Strong
Recommendation: Add empty state: "Set your city to see rankings"

### 5. Positive Emotional Response Overall
4/6 reported positive/motivating feelings
2/6 reported neutral (not negative)
0/6 reported purely negative

Confidence: Strong

## Recommendations (Priority Order)

### CRITICAL (Block Launch)
1. Fix empty state for providers without city
   - Add: "Set your city to see rankings" with CTA
   - Impact: Blocks 2/6 users currently

### HIGH (Ship Soon After)
2. Clarify ranking criteria
   - Add: Tooltip or subtitle "Ranked by booking count"
   - Impact: 4/6 confused

3. Emphasize progress over rank
   - Add: "Your city improved +3 spots this month"
   - Impact: Makes low rankers feel motivated

### MEDIUM (Future Iteration)
4. Add filters (time range, metric type)
   - Requested by 2/6 participants
   - "Can I see last month's rankings?"

## Quotes

Positive:
- "This is exactly what I needed to see" (P1)
- "I'll definitely check this regularly" (P3)
- "Makes me feel part of a bigger community" (P5)

Critical:
- "I don't understand how this is calculated" (P2, P4, P6)
- "What do I do if my city isn't here?" (P2)

## Confidence & Sample Size

n = 6 (target achieved)
Mix:
- 3 high-ranked cities
- 3 low-ranked cities
- 3 iOS, 3 Android

Strong confidence in:
- Discoverability (5/6 consistent)
- Criteria confusion (4/6 consistent)
- Empty state issue (2/2 blocked)

Moderate confidence in:
- Motivation by rank (small sample per segment)

## Next Steps

Immediate:
- [ ] Implement empty state (designer + eng, 1 day)
- [ ] Add ranking criteria explainer (designer, 2 hours)
- [ ] Design progress indicator (designer, 4 hours)

Follow-up:
- [ ] Retest empty state with 3 new providers
- [ ] Monitor sentiment post-launch (survey)
```

---

## Severity Levels

### Critical
Blocks task completion - must fix before launch.

### High
Causes confusion or frustration - fix soon.

### Medium
Nice-to-have improvement - future iteration.

### Low
Minor observation - log for consideration.

---

## Chains With

`research-synthesis` works with:
- `usability-test-guide` (creates test plan)
- `screener-builder` (recruits participants)
- `research-shareout` (presents findings)
- `design-rationale` (documents why changes were made)

---

## Tips

### 1. Synthesize Soon After Testing
While sessions are fresh in memory.

### 2. Look for Patterns, Not Anecdotes
1 person's issue = observation
3+ people's issue = pattern

### 3. Prioritize by Impact × Frequency
```
High impact + high frequency = CRITICAL
High impact + low frequency = Monitor
Low impact + high frequency = Nice-to-have
Low impact + low frequency = Ignore
```

### 4. Include Quotes
Quotes bring findings to life for stakeholders.

---

## Related Skills

- [usability-test-guide](usability-test-guide.md) - Creates plan
- [research-shareout](research-shareout.md) - Presents findings
- [design-rationale](design-rationale.md) - Documents changes
