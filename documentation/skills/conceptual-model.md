# Conceptual Model Skill

**Status:** Active
**Created:** 2026-08-28

---

## What it does

Defines the product's **objects** (what exists), **relationships** (how
they connect), **states** (what can happen over time), and **vocabulary**
(one name per concept) — independently of any interface.

This is the most load-bearing and most neglected layer of product design.
Skip it and you'll redesign screens because the underlying structure was
never thought through.

---

## When to use it

**Triggers:**
- "Define the objects"
- "What are the entities?"
- "Map the relationships"
- "What states can this be in?"
- "Ubiquitous language"
- "Is this one thing or two things?"
- "How do these connect?"

**Also runs a domain-mapping mode** — an earlier, looser pass than the
object decisions above. Triggers: "map this domain", "terminology
audit", "domain event storming", "bounded context for X". Records the
real world's messy, contradictory vocabulary *before* any product
decision — the governing rule is "record contradictions; don't settle
them." Feeds the noun harvest into Step 1 below. See
`harness/skills/conceptual-model/references/domain-mapping.md`.

**Position in workflow:**
- **After:** `design-kickoff` (problem and strategy defined)
- **Before:** `ui-agent` (building screens)

**Skip it when:**
- Objects are obvious and uncontested
- Iterating visual design on stable model
- Problem not yet defined (do design-kickoff first)

---

## What it produces

Saved to `projects/<slug>/conceptual-model.md`:

1. **Object definitions** — what exists, attributes, relationships, actions
2. **Vocabulary decisions** (ubiquitous language) — one name per concept
3. **State diagrams** — lifecycles and transitions
4. **Temporal decisions** — history, deletion, lag, intermediate states
5. **OOUX audit** — failure modes found
6. **Open questions** — what needs engineering input

---

## Key concepts

### Real objects only (discipline)

A true object is:
- **Instanceable** — you can have many
- **Structured** — has its own attributes
- **Useful** — users care about it as a thing

**Common errors:**
1. Attribute promoted to object (e.g., "Name" as object instead of User
   attribute)
2. Instances mistaken for objects (e.g., "CAC", "ROAS", "LTV" modeled as
   separate objects when **Metric** is the object and those are instances)

### Temporal decisions (often missed)

Time matters. For stateful objects, decide:
- Intermediate action states (saving, processing, pending)
- Read model lag (write vs visible delay)
- Relationship temporality (snapshot vs live view)
- Deletion semantics (archive, soft delete, hard delete, regulatory)
- History (what was it before)
- Optimistic vs pessimistic updates
- Concurrent edits
- Expiration / scheduled actions

See `harness/skills/conceptual-model/references/temporal-decisions.md`

### OOUX failure modes

Structural problems to check for:
- **Shapeshifter** — same object, different forms across contexts
- **Masked** — different objects look identical
- **Broken** — object data/actions scattered across screens
- **Isolated** — objects without visible relationships

---

## Techniques (technique library approach)

Don't run all techniques. Pick what fits the live decision:

| Technique | Use when |
|-----------|----------|
| **Noun foraging + OOUX** | Have research transcripts/domain notes to mine |
| **Object definition** | Objects known, need to pin down details |
| **Sketch flow first** (push forward, pull back) | Uncertain if something should persist — breadboard flow to see what needs to hold state |
| **Relational object map** (ERD) | Need to see relationships to catch missing/reversed connections |
| **State transition diagram** | Object has lifecycle — need to name states and transitions |
| **Action (CTA) inventory** | List all actions across objects to expose inconsistency |
| **Ubiquitous language list** | Vocabulary contested — need to resolve naming |
| **Walking existing product** | Redesign — current UI reveals implicit model |

---

## How it runs

1. **Step 0 — Find live decisions** (technique selection)
   - Which decisions are actually open?
   - Pick technique that fits
   
2. **Step 1 — Work the technique**
   - Execute chosen technique(s)
   - Apply disciplines throughout (real objects, named roles, verb
     precision, no speculation)
   
3. **Step 2 — Probe temporal decisions**
   - Work through checklist for objects where time matters
   
4. **Step 3 — Check for OOUX failure modes**
   - Audit for shapeshifter/masked/broken/isolated
   
5. **Step 4 — Capture the residue**
   - Write to `projects/<slug>/conceptual-model.md`
   - Only capture decisions made, not conversation transcript

---

## Integration with other skills

**Depends on (before):**
- **design-kickoff** — defines problem and strategy first
- **org-pack-builder** — extracts domain vocabulary (COMPANY-VOCABULARY)
- **research-agent** — can surface user domain language

**Feeds into (after):**
- **ux-pattern** — uses objects to structure flows
- **ui-agent** — builds screens based on objects and actions
- **content** — uses ubiquitous language for UI copy
- **interaction-design** — specs states and transitions

**Lives between strategy and screens:**
```
design-kickoff → conceptual-model → ui-agent
(problem)         (what exists)      (how it looks)
```

---

## Routing table entry

From `harness/ORCHESTRATOR.md`:

```
| "define the objects / map relationships / what states / object model / 
  ubiquitous language / what does this thing mean" | 
  conceptual-model | 
  Between kickoff and screens — settle what exists before visual design |
```

---

## Output format example

```markdown
## Conceptual model — referral-program — 2026-08-28

**Status:** Draft

### Objects
- **Referral** — relationship between two Users
- **User** — can be referrer and/or referred
- **Reward** — earned when referral converts

### Object definitions

#### Object: Referral

**What it is:** A relationship between two Users where one introduced the
other to the platform

**Relationships:**
- belongs to one User (as referrer)
- belongs to one User (as referred)
- has one Reward

**States:**
- Pending (invited, not signed up)
- Active (signed up, not converted)
- Completed (converted, reward earned)

**Actions:**
- Create referral (send invite)
- Track referral status
- Claim reward

### Ubiquitous language

| Concept | Chosen | Rejected | Why |
|---------|--------|----------|-----|
| Relationship | Referral | Invite, Link | Matches user + business language |

### Temporal decisions

- **Deletion:** Soft delete (preserve for billing)
- **History:** Track state transitions for audit
- **N/A:** Expiration, concurrent edits, scheduled actions
```

---

## Common mistakes (from HOWTO)

1. **Treating as database design** — talk about user view, not storage
2. **Modeling before knowing problem** — do design-kickoff first
3. **Inventing objects for unvalidated features** — mark provisional
4. **Ignoring temporal decisions** — "delete" means what exactly?
5. **Skipping vocabulary** — team uses 3 different names for same thing

---

## Why it matters

**The gap between conceptual model and what engineers build = UX debt +
technical debt.**

When you skip this:
- Same thing looks different everywhere (shapeshifter)
- Different things look identical (masked)
- Can't find related data when needed (isolated)
- Team argues about names (vocabulary never decided)
- "Delete" has 3 different meanings (temporal decisions skipped)
- Redesign screens because objects weren't thought through

An hour here saves days of rework later.

---

## Methodology

Based on object-oriented UX principles:
- Technique library approach (not script)
- Temporal decisions checklist
- Push forward, pull back pattern
- Capture decisions, not transcripts

Implemented for design-harness:
- Step-based structure
- Integration with existing skills (design-kickoff, ui-agent, etc.)
- Template in projects/_template/
- HOWTO for designers

Includes OOUX failure modes (shapeshifter, masked, broken, isolated).

---

## Self-improvement loop

After each use:
1. What decision was most valuable to surface?
2. What technique worked well?
3. What almost got missed?
4. What would you probe differently next time?

Capture in `harness/skills/conceptual-model/learnings.md`

---

## Files

- **Skill:** `harness/skills/conceptual-model/SKILL.md`
- **HOWTO:** `harness/skills/conceptual-model/HOWTO.md`
- **Reference:** `harness/skills/conceptual-model/references/temporal-decisions.md`
- **Reference:** `harness/skills/conceptual-model/references/domain-mapping.md`
- **Template:** `projects/_template/conceptual-model.md`
- **Documentation:** `documentation/skills/conceptual-model.md` (this file)
