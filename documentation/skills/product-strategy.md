# Product Strategy Skill

**Status:** Active
**Created:** 2026-08-29

---

## What it does

Builds **Opportunity Solution Trees** (OST) and other strategy frameworks
to connect user opportunities → business outcomes → solution bets →
experiments.

Makes strategy explicit and testable before building anything.

---

## When to use it

**Triggers:**
- "Build an OST"
- "Opportunity solution tree"
- "Connect needs to outcomes"
- "Which opportunities should we pursue?"
- "What bets should we make?"
- "Test assumptions cheaply"

**Use cases:**
- Have business outcome, unclear which user opportunities connect
- Have user needs, unclear which to prioritize
- Need multiple solution bets for an opportunity
- Need cheapest experiments to test assumptions
- Strategy feels like "exec said so"

**Skip when:**
- Still gathering research (do `research-agent` first)
- Outcome unclear (do `okr-goal-setting` first)
- Already know what to build (do `roadmap-prioritization`)
- Deep into building/iterating

---

## What it produces

**Opportunity Solution Tree** saved to `projects/<slug>/strategy.md`:

```markdown
Outcome: 40% → 60% activation (90 days)

Opportunities (journey: Setup):
├─ "I don't know what to charge" (60% blocker)
├─ "Not sure how to describe services" (40% edit 3+ times)
└─ "Don't have photos yet" (25% empty)

Solution bets (for pricing):
├─ Market rate suggestions
├─ Price calculator
└─ Competitive insights

Experiments:
├─ Fake door + interviews (5 days)
├─ Wizard of Oz (1 week)
└─ Provider interviews (3 days)

Priority: #1 (pricing) — highest size + outcome connection
```

---

## Core methodology: Opportunity Solution Trees

### The four levels

1. **Outcome** (one) — measurable business metric with baseline, target,
   timeframe
2. **Opportunities** (5-10) — user needs/pains/desires grouped by journey
   moment
3. **Solution bets** (2-4 per opportunity) — multiple ways to serve each
   need
4. **Experiments** (per bet) — cheapest tests of riskiest assumptions
   (days, not months)

### Key disciplines

**Outcome is measurable, meaningful, bounded**
- Not "improve onboarding"
- Yes "increase signup → first booking from 40% to 60% (90 days)"

**Opportunities are needs, not features**
- Apply flip test: can it be restated as a feature? If yes, it's a
  solution
- Group by journey moment to expose vague opportunities and gaps

**Multiple bets per opportunity**
- 2-4 bets before picking
- Early convergence skips better alternatives

**Name riskiest assumption per bet**
- What must be true for this to work?
- Usually "users will..." or "we can build..."
- For bets with a growth loop, notification, pricing, or default that
  shapes behavior at scale: also name one **ethical assumption** (harm /
  access / sustainability) — see `harness/references/ethical-design-check.md`

**Experiments test assumptions, not features**
- Days, not months
- Fake door, concierge, Wizard of Oz, prototype, interviews, data analysis

---

## How it runs

1. **Step 0 — Settle outcome**
   - Metric, baseline, target, timeframe
   - Routes to `okr-goal-setting` if unclear

2. **Step 1 — Map opportunities**
   - Extract from research, job stories, analytics
   - Group by journey moment
   - Apply flip test

3. **Step 2 — Generate solution bets**
   - Multiple per opportunity (2-4)
   - Format: "We could X because Y"

4. **Step 3 — Name riskiest assumption**
   - Per bet: what must be true?

5. **Step 4 — Design experiments**
   - Cheapest test per assumption
   - Days, not months

6. **Step 5 — Prioritize**
   - Size, outcome connection, evidence, bet clarity, experiment cost
   - Show reasoning

---

## Other frameworks available

| Framework | Use when |
|-----------|----------|
| **OST** | Default — connects outcome to opportunities to bets |
| **Impact Mapping** | B2B with multiple stakeholders who must change behavior |
| **Jobs Portfolio** | Many job stories — prioritize by frequency/severity/fit |
| **Kano Analysis** | Sort features into hygiene/performance/delight |
| **HEART / North Star** | Choosing the outcome metric itself |
| **Wardley Mapping** | Build/buy/partner decisions based on evolution curve |
| **Bundling / Unbundling** | Should product own more workflow or one job precisely? |

---

## Integration with other skills

**Depends on (before):**
- **design-kickoff** — often calls product-strategy in Step 1/2
- **research-agent** — provides user needs that become opportunities
- **okr-goal-setting** — settles outcome metric

**Feeds into (after):**
- **roadmap-prioritization** — sequences OST priorities
- **conceptual-model** — defines objects the bets require
- **ui-agent** — builds experiments needing prototypes

**Related:**
- **assumption-mapper** — separates known from believed before strategy

---

## Example output

```markdown
## OST — provider-activation — 2026-08-29

### Outcome
Increase signup → first booking from 40% to 60% (90 days)
Why: Activation predicts revenue; 40% below benchmark

### Opportunities (journey: Setup)

1. "I don't know what to charge" (pricing uncertainty)
   - Size: 60% stalled signups cite as blocker
   - Connection: Pricing is last step before go-live

### Solution bets (pricing)

**Bet 1: Market rate suggestions**
- Display avg rates for similar services in area
- Belief: Seeing others' rates reduces uncertainty
- Assumption: Providers trust crowd-sourced data
- Experiment: Fake door + 5 interviews (5 days)

**Bet 2: Price calculator**
- Guided questions → suggested rate
- Belief: Structured input > guessing
- Assumption: Can self-assess experience accurately
- Experiment: Wizard of Oz with 10 users (1 week)

### Priority
#1 (pricing) — highest size + outcome connection + testable bets

Next: Run Bet 1 fake door (5 days), then decide
```

---

## Common patterns

**Most common use:** Design-kickoff calls this in Step 1/2 to build OST as
part of PRD

**Most valuable discipline:** Multiple bets per opportunity (prevents early
convergence)

**Most commonly skipped:** Experiments (teams jump to building without
testing assumptions)

**Fastest experiment:** Fake door test (3-5 days)

---

## Routing table entry

From `harness/ORCHESTRATOR.md`:

```
| "build an OST / opportunity solution tree / connect needs to outcomes / 
  which opportunities to pursue / what bets should we make / strategy tree / 
  test assumptions cheaply" |
  product-strategy |
  Builds Opportunity Solution Trees and other strategy frameworks |
```

---

## Methodology

Based on Opportunity Solution Trees (product discovery framework):
- Four-level structure (outcome → opportunities → bets → experiments)
- Grouped by journey moment
- Multiple bets resist early convergence
- Experiments test assumptions cheaply
- Makes strategy explicit and testable

Applied to design-harness:
- Integration with existing skills (design-kickoff, research-agent,
  okr-goal-setting)
- Step-based structure
- Multiple framework options (OST, Impact Mapping, Kano, etc.)
- Template in projects/_template/

---

## Self-improvement loop

After each use:
1. Which opportunities were most valuable to surface?
2. Which bet assumptions were hardest to identify?
3. Which experiments were cheapest and most informative?
4. What would you structure differently next time?

Capture in `harness/skills/product-strategy/learnings.md`

---

## Files

- **Skill:** `harness/skills/product-strategy/SKILL.md`
- **HOWTO:** `harness/skills/product-strategy/HOWTO.md`
- **Documentation:** `documentation/skills/product-strategy.md` (this file)
