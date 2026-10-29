# Domain model and skill contracts — what we added and why

**Context:** Gaps in how this design harness teaches domain understanding
and enables skill composability.

This document tracks what was added, why, and how to use it.

---

## What this harness needs to teach

1. **System prompt focused on fundamentals** — communication style, hard
   boundaries, domain concepts, default opinions
2. **Tool design that encodes constraints** — makes invalid actions impractical
3. **Agent's model of the domain** — understands design taxonomy and semantics
4. **System skills as composition units** — bundled metadata + prompt + tools,
   loaded progressively
5. **Custom harness** — for dynamic tool injection, conditional approval, async
   sub-agents

**What we already had:**
- ✅ System skills (53 specialized skills)
- ✅ Progressive loading (routing table infers which skills to use)
- ✅ Hard boundaries (plan gates, fallback protocol, MCP gates)
- ✅ Conditional approval (plan gates, kickoff gates, confirm-before-create)

**What we were missing:**
- ❌ Explicit domain mental model (how to think about design work)
- ❌ Default opinions (so short prompts work without clarification)
- ❌ Declarative composability (skills CAN chain, but it's hardcoded)

---

## What we added

### 1. Design Thinking Model (`harness/references/design-thinking-model.md`)

**What it is:** A mental model for reasoning about design work — the three
modes (discovery, validation, iteration), fidelity choices, decision weight,
and when "good enough" is actually good enough.

**Why it matters:** The agent needs domain semantics for design work —
what discovery vs. iteration means, not just trigger-phrase routing.

**Where it's loaded:** ORCHESTRATOR.md §0.5 (new section) — after profile gate,
before intake. Should be read once per session, same as ORCHESTRATOR.md itself.

**What it teaches:**
- The three modes: discovery (what to build), validation (does it work),
  iteration (make it better)
- Fidelity ladder: talk-through → Design Harness prototype → coded spike
- Decision weight: reversible (spacing) vs. significant (flow) vs. load-bearing
  (nav model)
- When "good enough" stops: falsifiable PRD, known risks, ships with confidence
- Design intent vs. user outcome (the gap that matters)
- How to handle uncertainty (medium confidence, show options, admit gaps)

**Evidence it was needed:**
- Scattered tone guidance across multiple files
- No unified "here's how design decisions work" reference
- Agents sometimes asked "which loading pattern?" when the answer should be
  obvious from context (no default opinions)

---

### 2. Skill Contracts (`harness/references/skill-contracts.md`)

**What it is:** A frontmatter format that makes skill dependencies explicit —
inputs (required/optional/sources), outputs (primary/side effects), and
composability (can run after, can feed into, runs independently).

**Why it matters:** Tools should combine flexibly so a stronger model can
coordinate them on more complex tasks.
Currently, your skills CAN compose (design-kickoff calls workload-agent), but
it's **hardcoded** in skill files. Contracts make it **declarative and
discoverable**.

**Format:**
```yaml
inputs:
  required: [task_description]
  optional: [findings_path, decisions_path]
  sources: [tracker, chat]
  
outputs:
  primary: structured_critique
  side_effects: [findings.md_append, log.md_append]
  
composability:
  can_run_after: [research-agent, workload-agent]
  can_feed_into: [ui-agent, deck-builder]
  runs_independently: true
```

**What it enables:**
- Orchestrator can **validate** multi-skill chains before execution (check that
  inputs are satisfiable)
- Future better models can **discover** new valid combinations by reading
  contracts — e.g., "I'll run research-agent first to get findings, then feed
  that into ux-pattern" even if that exact chain isn't pre-scripted
- **Partial success handling** — when a skill's optional input is missing,
  proceed with reduced capability instead of failing hard

**Examples added:**
- `research-agent` contract in `harness/skills/research-agent/SKILL.md`
  (frontmatter updated)
- Example contracts for 6 core skills in `skill-contracts.md`
  (research-agent, ux-pattern, ui-agent, workload-agent, design-kickoff, audit)

**Migration plan:**
1. Phase 1: Document existing implicit contracts (done — skill-contracts.md)
2. Phase 2: Add contracts to all 53 skills (in progress — research-agent done)
3. Phase 3: Orchestrator reads contracts for validation
4. Phase 4: Model-discovered chains (future, needs better models)

---

### 3. Integration into Orchestrator

**ORCHESTRATOR.md §0.5 added:**
> After the profile gate (§0), before intake (§1) — read
> `harness/references/design-thinking-model.md` to understand how to reason
> about design work, not just which skills to route to.

This makes the design thinking model a **required read** on every session, same
weight as the routing table itself.

---

## What we explicitly chose NOT to do (and why)

These were considered but have more risk than value:

### ❌ Lazy skill loading
**Rejected option:** Loads skills just-in-time, can add more mid-run
**Why we don't:** Our multi-skill chains need full context upfront to show a
valid PLAN and wait for designer approval. Lazy loading would mean showing a
plan without verifying skills are actually compatible.

### ❌ Simplify the system prompt
**Rejected option:** Small set of fundamentals in prompt, details in tools
**Why we don't:** Our domain is legitimately more complex (53 skills across
research, design, building, management). The routing table IS the system.
"Simplify" would mean reducing scope, not reorganizing files.

### ❌ Intent-based routing (vs. explicit trigger phrases)
**Rejected option:** Let the model infer which skills to use more freely
**Why we don't:** Our explicit routing table is the main safety mechanism.
Trigger phrases make the system auditable (harness-audit can check routing
decisions). We already have medium-confidence routing for ambiguous cases.

### ❌ Tool-level parameter constraints
**Rejected option:** Encodes rules in tool design (makes invalid actions impossible)
**Why we don't:** Our rules are highly contextual (e.g., "can search private
#design-team channel but not random DMs for managers"). Hard to encode in
parameters. Current "rules in prose + logging violations" is more flexible.

### ❌ Contextual approval (auto-proceed on safe actions)
**Rejected option:** Can delete own creations without asking, pauses before
public actions
**Why we don't:** Session state is fragile in cloud agents. "Same session"
doesn't guarantee "safe." Our uniform plan gates are simpler and more robust.

---

## Comparison: Before vs. After

### Before (what we had)
| Aspect | Status |
|---|---|
| Domain understanding | Scattered across skill files, no unified model |
| Skill composability | Works but hardcoded in skill files (design-kickoff → workload-agent) |
| Default opinions | Inference rules for task metadata, not design judgments |
| Communication style | Scattered tone notes, no unified voice guidance |
| Evolution readiness | Optimized for current model, not designed to improve with better models |

### After (what we added)
| Aspect | Status |
|---|---|
| Domain understanding | ✅ Explicit design thinking model, loaded every session |
| Skill composability | ✅ Declarative contracts (in progress — 1 of 53 skills done) |
| Default opinions | ⚠️ Partially addressed (design thinking model has "when good enough stops") |
| Communication style | ⚠️ Covered in design thinking model § "How to handle uncertainty" |
| Evolution readiness | ✅ Contracts enable model-discovered chains as models improve |

---

## How to use the new references

### For the agent (you)
1. **Every session:** Read `design-thinking-model.md` via ORCHESTRATOR.md §0.5
2. **When routing:** Check if you understand the design mode (discovery,
   validation, iteration) before matching the routing table
3. **When proposing fidelity:** Reference the fidelity ladder (talk-through,
   Design Harness, coded spike) instead of guessing
4. **When uncertain:** Use the "How to handle uncertainty" decision tree

### For skill authors (adding contracts)
1. Read `skill-contracts.md` for the format
2. Add frontmatter to your SKILL.md with inputs, outputs, composability
3. Test: can another skill use your output as its input? Declare it in
   `can_feed_into`
4. Validate: does your skill call MCPs? List them in `inputs.sources`

### For the orchestrator (future enhancement)
1. **Phase 3 (next):** Before showing a §3 PLAN, validate inputs are
   satisfiable by reading contracts
2. **Phase 4 (future):** Let model propose chains by reading contracts,
   validate, proceed if valid

---

## Success metrics

How to know if these additions are working:

### Design thinking model
- **Fewer clarification questions** on fidelity ("should I build this or talk
  through it?")
- **More accurate mode classification** (discovery vs. iteration) in routing logs
- **Better handling of "good enough" decisions** (ships without over-polishing)

### Skill contracts
- **Earlier error detection** — catch incompatible chains at planning time, not
  mid-execution
- **Model-discovered chains** that are valid (when better models enable Phase 4)
- **Partial success handling** — skills proceed with reduced capability instead
  of hard failing when optional inputs are missing

---

## Next steps

1. **Add contracts to remaining 52 skills** — mechanical but necessary for
   composability to work
2. **Track routing confidence** — measure how often medium-confidence routes get
   corrected (validates that explicit routing is working)
3. **Test model-discovered chains** — once all contracts are in, test whether a
   model can propose "research-agent → ux-pattern → ui-agent" by reading
   contracts alone
4. **Consider default patterns reference** — the design thinking model has
   principles, but not "which loading pattern to use" defaults (identified gap,
   not yet addressed)

---

## Summary

**Core idea:** Design the system to get better as models improve —
don't over-script, don't lock into current model capabilities.

**What we learned:**
1. **Domain understanding matters** — you can't just route trigger phrases, you
   need to understand what design work IS (added design thinking model)
2. **Composability should be declarative** — skills that can combine should
   declare their contracts explicitly (added skill contracts)
3. **Evolution readiness is a design goal** — the system should improve with
   better models without changing the skills themselves (contracts enable this)

**What we kept:**
- Explicit routing (auditable, safe)
- Plan gates (show reasoning before execution)
- Observability (routing logs, task folders, decision trails)

**Trade-off:** We optimize for transparency, auditability, and predictability
over spontaneity within loose boundaries.
