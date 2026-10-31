# Diagnostic Skill

**Status:** Active
**Created:** 2026-08-28

---

## What it does

Rapid audit across all design layers (research, strategy, model,
structure, surface) to identify the **bottleneck** — the weakest
foundational layer — and recommend which skill to run next.

Front-door triage for "where should I focus first?"

---

## When to use it

**Triggers:**
- "Where should I focus?"
- "What's the most important thing to do?"
- "Where do I start?"
- "What's the bottleneck?"
- "Something feels off but I can't tell what"

**Use cases:**
- Starting a new project
- Stuck or spinning
- Want to check foundations before building up
- Multiple things feel wrong but can't prioritize

**Skip it when:**
- Already know exactly what needs work
- Deep into execution (not time to step back)
- Problem is tactical, not foundational

---

## What it produces

**Diagnostic table** showing each layer's state + **recommendation** for
next skill:

```markdown
| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior / Domain | Weak | No user research |
| 2. User needs | Not started | No job stories |
| 3. Product strategy | Partial | Have goal but no bets |
| 4. Conceptual model | Weak | Objects undefined |
| 5. Interaction structure | Not started | No flows |
| 6. Surface | Not started | No screens |

Bottleneck: Layer 1 → Run research-agent
```

---

## Design layers (audit framework)

Design layers framework:

### Layer 1: Observed behavior / Domain
- **What it settles:** User research, domain vocabulary
- **Harness skills:** `research-agent`, `org-pack-builder`, `research-synthesis`
- **Weak signals:** "We think users...", no research, contested terms

### Layer 2: User needs
- **What it settles:** Job stories, what users are trying to achieve
- **Harness skills:** `research-artifacts`, needs from `design-kickoff`
- **Weak signals:** Generic goals, no JTBD, needs trace to strategy not
  users

### Layer 3: Product strategy
- **What it settles:** Outcome, opportunity→bet, why this
- **Harness skills:** `design-kickoff`, `roadmap-prioritization`,
  `okr-goal-setting`
- **Weak signals:** No outcome metric, "exec said so", bets untested

### Layer 4: Conceptual model (most commonly missed)
- **What it settles:** Objects, relationships, states, vocabulary
- **Harness skills:** `conceptual-model`
- **Weak signals:** "One thing or two?", 3 names for same concept, "what
  happens when I delete?"

### Layer 5: Interaction structure
- **What it settles:** Flows, places, affordances, edge cases
- **Harness skills:** `ux-pattern`, `interaction-design`
- **Weak signals:** "Where does this go?", missing error states, can't
  narrate journey

### Layer 6: Surface
- **What it settles:** Screens, design system, copy, accessibility
- **Harness skills:** `ui-agent`, `design-system`, `content`,
  `accessibility`, `audit`
- **Weak signals:** Token violations, copy inconsistent, inaccessible

---

## How it runs

1. **Step 1 — Gather context**
   - What you're working on
   - What stage
   - Why now

2. **Step 2 — Audit layers** (1-2 questions each)
   - Fast, conversational
   - Rate: Strong / Partial / Assumed / Weak / Not started / N/A

3. **Step 3 — Output audit table**

4. **Step 4 — Identify bottleneck**
   - Lowest (most foundational) layer with gaps
   - Flag assumed layers (treated as done but not verified)

5. **Step 5 — Recommend next skill**
   - Specific skill to run and why
   - Consider constraints (deadline, etc.)

---

## Bottleneck → Skill mapping

| Bottleneck layer | Recommended skill | Why |
|------------------|-------------------|-----|
| Observed behavior / Domain | `research-agent`, `org-pack-builder` | Need evidence/vocabulary before building |
| User needs | `design-kickoff`, `research-artifacts` | Can't pick strategy without knowing needs |
| Product strategy | `design-kickoff`, `roadmap-prioritization`, `okr-goal-setting` | Can't decide what to build without outcome |
| Conceptual model | `conceptual-model` | Can't design flows if objects undefined |
| Interaction structure | `ux-pattern`, `interaction-design` | Can't design surface if flows unclear |
| Surface | `ui-agent`, `design-system`, `content`, `audit` | Foundations solid — build/fix UI |

---

## Key principles

### The dependency rule
Lower layers are foundations for upper ones. Weak Layer 4 undermines every
Layer 6 screen built on it. Fix foundation before building up.

### Assumed vs Weak
- **Weak:** Known gap (honest, clear what to do)
- **Assumed:** Hidden gap (treated as done but not verified — more
  dangerous)

Both get flagged.

### Not a gate
Diagnostic is advice, not a blocker. Designer decides whether to follow
it.

---

## Example outputs

### Example 1: Net-new project

```markdown
## Diagnostic — referral-program — 2026-08-28

Context: Starting referral feature, no work done yet

| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior | Weak | No research on referrals |
| 2. User needs | Not started | Why do providers refer? |
| 3. Strategy | Partial | Have growth goal but no bet |
| 4. Conceptual model | Weak | Is referral a person or action? |
| 5. Interaction structure | Not started | No flows |
| 6. Surface | Not started | No screens |

Bottleneck: Layer 1

Recommendation: Run research-agent → talk to providers who refer
informally. Then conceptual-model → define objects before building.
```

### Example 2: Redesign (feels off)

```markdown
## Diagnostic — checkout-flow — 2026-08-28

Context: Checkout feels clunky but can't tell why

| Layer | State | Notes |
|-------|-------|-------|
| 1. Observed behavior | Strong | Analytics + interviews |
| 2. User needs | Strong | Job stories documented |
| 3. Strategy | Strong | Clear outcome (conversion) |
| 4. Conceptual model | Assumed | Order vs Booking vs Appointment? |
| 5. Interaction structure | Weak | Missing cancellation flow |
| 6. Surface | Partial | Screens exist but inconsistent |

Bottleneck: Layer 4 (flagged as Assumed)

Recommendation: Run conceptual-model → settle objects/vocabulary. Team
thinks it's clear but it's not. Once stable, ux-pattern fixes flow, then
ui-agent rebuilds screens.
```

---

## Common patterns

### Most commonly missed bottleneck
**Layer 4 (Conceptual model)** — teams jump to screens without defining
objects. Wonder why screens feel wrong or require constant rework.

### Most dangerous state
**Assumed** — team thinks layer is done but it's not. Hidden gaps are
riskier than known gaps.

### Most common constraint
"Can't do research right now" — diagnostic acknowledges constraint and
recommends next-best move with debt logged.

---

## Integration with other skills

**Front door:** Routes to other skills based on bottleneck

**Different from design-kickoff:**
- `design-kickoff`: Net-new projects (research + PRD + gate)
- `diagnostic`: Triage across any situation (new, stuck, redesign)

**Complements:**
- `design-kickoff` — often the recommended skill for net-new
- `conceptual-model` — often the most neglected bottleneck
- `research-agent` — often the foundational bottleneck

---

## Routing table entry

From `harness/ORCHESTRATOR.md`:

```
| "where should I focus / what's the most important thing / where do I 
  start / diagnostic / what's the bottleneck / which layer is weak" |
  diagnostic |
  Rapid audit across layers to find bottleneck and recommend next skill |
```

---

## Methodology

Based on a 6-layer design framework:
- 6-layer model (problem space → solution space)
- Bottleneck identification (lowest weak layer)
- Assumed vs weak distinction
- Fast triage approach

Applied to design-harness:
- Mapped to harness skill landscape
- Added harness-specific weak signals per layer
- Integration with existing skills (research-agent, conceptual-model,
  ui-agent, etc.)
- Step-based structure

---

## Self-improvement loop

After each use:
1. Which layer was the actual bottleneck? (vs initial guess)
2. What signal revealed it?
3. Did the recommended skill address it?
4. What almost got missed?

Capture in `harness/skills/diagnostic/learnings.md`

---

## Files

- **Skill:** `harness/skills/diagnostic/SKILL.md`
- **HOWTO:** `harness/skills/diagnostic/HOWTO.md`
- **Documentation:** `documentation/skills/diagnostic.md` (this file)
