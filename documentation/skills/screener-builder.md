# screener-builder

Creates participant screeners for research - recruiting surveys that qualify the right users.

## What It Does

**Generates recruitment screener** that includes:
- Qualifying questions
- Disqualifying criteria
- Demographic balance
- Incentive details

**Ready to deploy** in Typeform, Google Forms, or recruiting platform.

---

## When to Use

Use `screener-builder` when you want to:
- Recruit for usability tests
- Find interview participants
- Screen survey respondents
- Balance participant demographics

### Trigger Phrases
```
"Create screener for [research]"
"Build recruitment survey"
"How do we recruit for [study]?"
"Generate screener questions"
```

---

## How It Works

### Step 1: Criteria Definition
From test plan:
- Target participant profile
- Sample size needed
- Diversity requirements

### Step 2: Question Generation
Creates screening questions:
```
## Screener Questions

1. Qualifying Questions
   (Must answer "yes" to proceed)
   
2. Experience Questions
   (Segment by experience level)
   
3. Usage Questions
   (Segment by frequency)
   
4. Demographic Questions
   (For balanced sample)
   
5. Availability Questions
   (Schedule logistics)
```

### Step 3: Logic Rules
Defines qualification:
```
QUALIFY if:
- Q1 = Yes
- Q2 = "Active provider"
- Q3 = "Weekly" or "Daily"
- Diverse across demographics

DISQUALIFY if:
- Q1 = No
- Q2 = "Never used"
- Works for competitor
```

### Step 4: Export Format
Provides ready-to-use:
- Typeform JSON import
- Google Forms link
- UserTesting screener
- Plain text for any platform

---

## Example Output

### Input
```
You: "Create screener for city leaderboard test"

Context from test plan:
- Target: Active providers (50+ bookings)
- n=6, mix of high/low city ranks
```

### Generated Screener
```
# Participant Screener: City Leaderboard Test

## Study Details
- Duration: 20 minutes
- Format: Remote (Zoom)
- Incentive: $50 gift card
- Schedule: Week of Aug 29

## Screener Questions

### 1. Role Qualification
"Are you currently an active service provider on [Platform]?"
- [ ] Yes, I am an active provider
- [ ] No, I am not a provider
- [ ] I used to be a provider

Logic: DISQUALIFY if "No" or "used to be"

### 2. Activity Level
"How many bookings do you typically complete per month?"
- [ ] 0-10
- [ ] 11-20
- [ ] 21-50
- [ ] 50+

Logic: QUALIFY "21-50" or "50+" only

### 3. Platform Usage
"How often do you check the provider app?"
- [ ] Daily
- [ ] A few times per week
- [ ] Once a week
- [ ] Rarely

Logic: QUALIFY "Daily" or "A few times per week"

### 4. Device
"What device do you primarily use the app on?"
- [ ] iPhone
- [ ] Android phone
- [ ] iPad
- [ ] Desktop/web

Logic: QUALIFY "iPhone" or "Android phone"
Target: 3 iPhone, 3 Android

### 5. City Size (For Ranking Diversity)
"Approximately how many active providers are in your city?"
- [ ] Less than 50
- [ ] 50-100
- [ ] 100-500
- [ ] 500+

Logic: QUALIFY mix of small/large cities
Target: 3 from smaller cities, 3 from larger

### 6. Competitor Check
"Do you currently work for a competitor company in the booking space?"
- [ ] Yes
- [ ] No

Logic: DISQUALIFY if "Yes"

### 7. Availability
"Which time slots work for you? (Select all that apply)"
- [ ] Mon Aug 29, 10am-12pm
- [ ] Mon Aug 29, 2pm-4pm
- [ ] Tue Aug 30, 10am-12pm
- [ ] Tue Aug 30, 2pm-4pm
- [ ] None of these work

Logic: DISQUALIFY if "None of these work"

### 8. Consent
"We'll record the session for internal research purposes only. Do you consent?"
- [ ] Yes, I consent
- [ ] No, I do not consent

Logic: DISQUALIFY if "No"

## Qualification Summary

RECRUIT if:
✅ Active provider
✅ 20+ bookings/month
✅ Uses app weekly+
✅ iPhone or Android
✅ Not competitor employee
✅ Available during study dates
✅ Consents to recording

TARGET:
- 3 from smaller cities (<100 providers)
- 3 from larger cities (100+ providers)
- 3 iPhone users
- 3 Android users

## Next Steps After Screener

1. Qualified participants receive:
   - Calendar invite
   - Zoom link
   - Prep instructions

2. Confirmation email template:
```
Subject: You're invited: [Platform] Research Session

Hi [Name],

Thanks for your interest! You've been selected to participate in our research study.

Details:
- Date/Time: [from availability question]
- Duration: 20 minutes
- Format: Remote via Zoom
- Incentive: $50 gift card (sent within 5 days)

Zoom Link: [link]
Calendar Invite: Attached

What to expect:
We'll ask you to complete a few tasks in the provider app and share your thoughts. No preparation needed - just be yourself!

Questions? Reply to this email.

Looking forward to it!
[Your name]
```

## Export Formats

### Typeform
[Typeform JSON structure provided]

### Google Forms
[Link to duplicate template]

### UserTesting
[Screener criteria formatted for UT platform]

### Manual Recruiting
Use questions above in outreach emails/messages
```

---

## Chains With

`screener-builder` works with:
- `usability-test-guide` (defines participant criteria)
- `research-synthesis` (analyzes recruited participants)
- `scheduling` (coordinates sessions)

---

## Tips

### 1. Keep It Short
5-8 questions max - respect people's time.

### 2. Screen for Behavior, Not Demographics
Ask what they DO, not just who they ARE.

### 3. Over-Recruit
Recruit 8-10 to account for no-shows (target n=6).

### 4. Test Your Screener
Run through it yourself - are questions clear?

---

## Related Skills

- [usability-test-guide](usability-test-guide.md) - Defines criteria
- [research-synthesis](research-synthesis.md) - Analyzes findings
- [scheduling](scheduling.md) - Coordinates sessions
