# usability-test-guide

<!-- generated-from-skill: do not edit -->

Builds a usability test discussion guide, task script, or session plan — quantitative (metrics: task success, time on task, SEQ, SUS) or qualitative (TEDW-based screen-by-screen feedback on a mid-fidelity design).

**Triggers:** "write a usability test script" · "help me plan a usability test" · "create tasks for usability testing" · "I need to test this prototype with users" · "build a UT plan" · "we're doing usability testing next week"

<!-- /generated-from-skill -->

Creates comprehensive test plans - participants, tasks, scripts, success metrics.

## What It Does

**Generates test plan** that includes:
- Participant criteria
- Task scenarios
- Moderator script
- Success metrics
- Analysis framework

**Ready to run** - no additional planning needed.

---

## When to Use

Use `usability-test-guide` when you want to:
- Test a new feature
- Validate a redesign
- Understand user behavior
- Gather feedback

### Trigger Phrases
```
"Create test plan for [feature]"
"Plan usability test"
"How should we test this?"
"Generate test script"
```

---

## How It Works

### Step 1: Context Gathering
Pulls from:
- Project brief (goals, users)
- Prototypes (what to test)
- Open questions (what to learn)

### Step 2: Participant Definition
Creates criteria:
```
## Participant Criteria
Primary users:
- Role: [user type]
- Experience: [level]
- Frequency: [usage]
- n=6 (recommended)

Screening questions:
1. [Question to qualify]
2. [Question to qualify]
```

### Step 3: Task Creation
Designs realistic scenarios:
```
## Tasks
Task 1: [Scenario-based task]
  Success criteria: [observable behavior]
  
Task 2: [Scenario-based task]
  Success criteria: [observable behavior]
```

### Step 4: Script Generation
Creates moderator guide:
```
## Moderator Script
Introduction: [what to say]
Tasks: [how to present each]
Probing questions: [what to ask]
Wrap-up: [closing questions]
```

### Step 5: Metrics Definition
Specifies measurement:
```
## Success Metrics
Task success rate: [target %]
Time on task: [target time]
Errors: [acceptable count]
Satisfaction: [SUS score target]
```

---

## Example Output

### Input
```
You: "Create test plan for city leaderboard"
```

### Generated Plan
```
# Usability Test Plan: City Leaderboard

## Objectives
1. Validate providers can discover the leaderboard
2. Assess understanding of ranking criteria
3. Measure emotional response (motivating vs demoralizing)
4. Identify edge cases or confusion points

## Participant Criteria
Target: Active providers (50+ bookings)
n = 6 participants

Screening:
- Must be active provider (20+ bookings/month)
- Mix of high and low city rankings
- Mix of iOS and Android users

Recruit:
- 3 from top-ranked cities
- 3 from lower-ranked cities
- 50/50 iOS/Android split

## Tasks

### Task 1: Discovery (Unmoderated)
Scenario: "You just opened the app. Take a moment to explore and tell me what you see."

Goal: Do they notice the leaderboard?
Success: Mentions leaderboard within 30 seconds

### Task 2: Understanding (Prompted)
Scenario: "Your friend asked how your city is performing. Show them."

Goal: Can they navigate to and interpret rankings?
Success:
- Finds leaderboard within 10 seconds
- Correctly identifies their city's rank
- Explains ranking criteria

### Task 3: Motivation Check (Qualitative)
Scenario: "How does seeing this information make you feel?"

Goal: Emotional response (motivation vs demoralization)
Success: Positive response OR constructive feedback

## Moderator Script

### Introduction (2 min)
"Thank you for joining today. We're testing a new feature in the provider app. There are no right or wrong answers - we're learning about the design, not about you.

Please think aloud as you go. Tell me what you're seeing, what you expect, and what you're thinking.

Do you have any questions before we start?"

### Task 1 (5 min)
"I'm going to give you a scenario. Imagine you just opened the app after a busy day of bookings. Take your time and explore. Tell me what you see."

[Let them discover naturally]

Probing questions:
- "What stands out to you?"
- "What would you do next?"
- "What is this showing you?"

### Task 2 (3 min)
"Your friend who's also a provider asked how your city is doing compared to others. Show them where you'd look."

[Watch for navigation path]

Probing questions:
- "What is this telling you?"
- "How is the ranking determined?"
- "Is this what you expected?"

### Task 3 (5 min)
"Now that you've seen the leaderboard, I'd like to understand your reaction."

Questions:
- "How does seeing this information make you feel?"
- "Would this motivate you to take any actions?"
- "Is there anything confusing or unclear?"
- "What would make this more useful to you?"

### Wrap-up (3 min)
- "If you could change one thing, what would it be?"
- "Anything else you'd like to share?"
- "Thank you for your time!"

## Success Metrics

### Quantitative
- Task 1 success: 80% notice leaderboard unprompted
- Task 2 success: 100% can find and interpret
- Task 2 time: <10 seconds to navigate

### Qualitative
- 70%+ report positive/motivating response
- <30% report negative/demoralizing response
- 0 critical usability issues

## Analysis Framework

After tests, synthesize:

### Findability
- How many discovered unprompted?
- How long to navigate when prompted?

### Comprehension
- Did they understand ranking criteria?
- Any confusion about their city's position?

### Emotional Response
- Motivating vs demoralizing
- Quotes to capture sentiment

### Issues
- Bugs encountered
- Confusion points
- Feature requests

## Logistics

### Format
Remote (Zoom/Meet) or in-person

### Duration
20 minutes per participant

### Incentive
$50 gift card per participant

### Schedule
Run 6 sessions over 2 days
- Day 1: 3 sessions
- Day 2: 3 sessions
- Allows for iteration if needed

## Deliverables
- Session recordings
- Notes per participant
- Synthesis report
- Recommendations
```

---

## Chains With

`usability-test-guide` works with:
- `screener-builder` (recruit participants)
- `research-synthesis` (analyze results)
- `research-shareout` (present findings)

---

## Tips

### 1. Test Early
Don't wait for final designs - test concepts and wireframes.

### 2. Focus on Behavior
Watch what they do, not just what they say.

### 3. Recruit Real Users
Test with your actual target audience, not colleagues.

### 4. Iterate Based on Findings
```
"Update city leaderboard based on test results"
```

---

## Related Skills

- [screener-builder](screener-builder.md) - Recruit participants
- [research-synthesis](research-synthesis.md) - Analyze findings
- [synthetic-user-testing](synthetic-user-testing.md) - AI-simulated tests
