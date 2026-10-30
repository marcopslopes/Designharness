# Skill contracts — inputs, outputs, and composability

**Purpose:** Make skill dependencies explicit so the orchestrator (and future
better models) can discover new valid combinations, not just execute
pre-scripted chains.

currently your skills CAN compose (design-kickoff calls workload-agent), but
it's hardcoded in skill files. This makes it **declarative and discoverable**.

---

## The contract format

Every `harness/skills/<name>/SKILL.md` should have this frontmatter
**in addition to** the existing `name` and `description`:

```yaml
---
name: skill-name
description: >-
  (existing description with trigger phrases)

# New contract fields:
inputs:
  required:
    - task_description   # or feature_name, or similar — what's mandatory
  optional:
    - findings_path      # e.g., projects/<slug>/findings.md
    - decisions_path     # e.g., projects/<slug>/decisions.md
    - figma_url
  sources:                 # jobs, resolved per harness/references/work-tools.md
    - tracker
    - chat
    
outputs:
  primary: structured_critique    # what this skill produces
  side_effects:
    - findings.md_append          # files it writes to
    - log.md_append
  
composability:
  can_run_after: [research-agent, workload-agent]   # what feeds into this
  can_feed_into: [ui-agent, deck-builder]           # what this feeds
  runs_independently: true                          # or false if must be chained
---
```

### Field definitions

| Field | Meaning | Required? |
|---|---|---|
| `inputs.required` | Must be provided for skill to work | Yes |
| `inputs.optional` | Skill works without these but is better with them | No |
| `inputs.sources` | Which MCPs this skill needs | If skill calls MCP tools |
| `outputs.primary` | The main thing this skill produces | Yes |
| `outputs.side_effects` | Files/state modified as side effects | If skill writes files |
| `composability.can_run_after` | Skills whose output makes this one better | No |
| `composability.can_feed_into` | Skills that benefit from this skill's output | No |
| `composability.runs_independently` | Can be called alone, or must be chained | Yes |

---

## Examples from existing skills

### research-agent

```yaml
---
name: research-agent
description: >-
  Deep discovery sweep across the docs tool, tracker, chat, and linked Google Docs to find
  existing knowledge before building. Triggers on: net-new topics (composed into
  design-kickoff Step 1b), "check Slack for X", "did this work" (verdict
  synthesis mode).

inputs:
  required:
    - topic                # what to research
  optional:
    - squad                # narrows tracker and roadmap scope
    - date_range           # for chat and docs recency
    - task_folder          # projects/<slug>/ if one exists
  sources:
    - docs                 # Confluence | Notion | Google Docs
    - tracker              # Jira | Linear | GitHub Issues
    - slack
    
outputs:
  primary: sourced_findings              # insights with dated citations
  side_effects:
    - findings.md_append                 # dated section
    - sources.md_append                  # new URLs discovered
    - log.md_append                      # routing line
  
composability:
  can_run_after: [workload-agent]        # squad context helps narrow search
  can_feed_into: [design-kickoff, ux-pattern, ui-agent, deck-builder]
  runs_independently: true               # can be called standalone
---
```

---

### ux-pattern

```yaml
---
name: ux-pattern
description: >-
  Structure review, decision framework, debate, or design critique grounded in
  the company patterns and archetypes. Triggers on: "structure this flow", "help me
  choose between A and B", "debate this", "audit/critique this design".

inputs:
  required:
    - design_artifact      # description, Figma URL, or Design Harness screen name
  optional:
    - findings             # prior research-agent output makes critique richer
    - archetypes           # specific archetype to check against
    - decisions            # past decisions to stay consistent with
  sources:
    - figma                # if Figma URL provided
    
outputs:
  primary: structured_critique           # or decision framework or debate briefs
  side_effects:
    - findings.md_append                 # dated critique section
    - decisions.md_append                # if decision framework picked a winner
    - log.md_append
  
composability:
  can_run_after: [research-agent, ui-agent, figma-ux-audit]
  can_feed_into: [ui-agent, content, deck-builder]
  runs_independently: true
---
```

---

### ui-agent

```yaml
---
name: ui-agent
description: >-
  Builds Design Harness prototypes using Foundations tokens. Triggers on: "build this
  screen", "assemble this layout", "fix/tweak X", micro-edits. Always loads
  design-system for token check before writing CSS.

inputs:
  required:
    - screen_description   # what to build
  optional:
    - findings             # research to inform structure
    - decisions            # approved patterns to follow
    - ux_structure         # from ux-pattern, if pre-analyzed
  sources:
    - none                 # builds locally, no MCP needed
    
outputs:
  primary: studio_os_prototype             # projects/<slug>/screens/<Name>Page.tsx (+ .css), discovered — no route edit
  side_effects:
    - log.md_append
    - decisions.md_append                # if major pattern choices made
  
composability:
  can_run_after: [design-kickoff, research-agent, ux-pattern, content]
  can_feed_into: [audit, mobile-shell, icon-usage]    # validation chain
  runs_independently: false              # should always run after kickoff or with existing task
---
```

---

### workload-agent

```yaml
---
name: workload-agent
description: >-
  Live snapshot of roadmap + designer execution on DES/UXR. Triggers on:
  "what's the team working on", "who's overloaded", "roadmap for X", auto-invoked
  by design-kickoff Step 1a.

inputs:
  required:
    - scope                # personal queue, squad, or team (for managers)
  optional:
    - squad_list           # from designer profile
    - reports_list         # for manager mode
  sources:
    - tracker              # design containers (Jira | Linear | GitHub)
    - roadmap              # optional — roadmap boards
    
outputs:
  primary: workload_snapshot             # formatted tables
  side_effects:
    - none                                # report only, doesn't write files
  
composability:
  can_run_after: []                      # runs first, no dependencies
  can_feed_into: [design-kickoff, research-agent, roadmap-prioritization]
  runs_independently: true               # often called standalone
---
```

---

### design-kickoff

```yaml
---
name: design-kickoff
description: >-
  Front-door skill for any net-new project. Runs workload-agent + research-agent,
  drafts PRD, waits at gate for approval before any building starts.

inputs:
  required:
    - feature_name         # the thing to kick off
  optional:
    - known_material       # Figma, tickets, docs already gathered
    - pm_name              # stakeholder to involve
  sources:
    - tracker              # for workload + research sweeps
    - docs
    - chat
    - figma
    
outputs:
  primary: prd                           # in projects/<slug>/brief.md
  side_effects:
    - projects/<slug>/_created           # whole task folder
    - findings.md                        # from research sweep
    - decisions.md                       # gate approval logged here
    - log.md
  
composability:
  can_run_after: []                      # front door, runs first
  can_feed_into: [ui-agent, ux-pattern]  # after gate approval
  runs_independently: true
---
```

---

### audit

```yaml
---
name: audit
description: >-
  Pre-share compliance check: tokens, accessibility, content, the company patterns.
  Runs on Design Harness prototypes only. Triggers on: "run the audit", "is this ready",
  or auto-appended after ui-agent builds.

inputs:
  required:
    - screen_path          # src/design-harness/pages/XPage.tsx
  optional:
    - task_folder          # projects/<slug>/ for context
  sources:
    - none                 # checks local files only
    
outputs:
  primary: audit_result                  # PASS / FAIL + findings
  side_effects:
    - findings.md_append                 # issues found
    - debt.md_append                     # deferred issues (if designer chooses)
  
composability:
  can_run_after: [ui-agent, mobile-shell, icon-usage]    # validation happens after build
  can_feed_into: [interface-change-review, publish-project]
  runs_independently: false              # must have something to audit
---
```

---

## How the orchestrator uses this

### Current (implicit) behavior
```python
# In design-kickoff SKILL.md Step 1:
# "Run workload-agent scoped to..."
# "Then run research-agent with..."

# Hardcoded, not discoverable
```

### Future (discoverable) behavior
```python
# In ORCHESTRATOR.md §2 or a future routing enhancement:

def find_valid_chains(intent, available_skills):
    """
    Given designer intent, find skills whose inputs can be satisfied
    and whose outputs feed the goal.
    """
    
    # Example: "audit the onboarding flow for Overbooked providers"
    
    # Step 1: Parse intent
    goal = "audit"
    subject = "onboarding flow"  
    constraint = "Waitlist Guardian archetype"
    
    # Step 2: Work backwards from goal skill
    audit_skill = skills["audit"]
    needs = audit_skill.inputs.required  # ["screen_path"]
    
    # Step 3: screen doesn't exist yet, need to build it
    ui_agent = skills["ui-agent"]
    ui_needs = ui_agent.inputs.optional  # ["findings", "ux_structure"]
    
    # Step 4: findings + structure would help — can we get them?
    research = skills["research-agent"]  # produces findings
    ux = skills["ux-pattern"]            # produces structure + archetype check
    
    # Step 5: Propose chain
    return [research-agent, ux-pattern, ui-agent, audit]
    
    # With reasoning:
    # "To audit the onboarding flow:
    #  1. research-agent: find existing onboarding research + Overbooked-provider needs
    #  2. ux-pattern: check structure against Waitlist Guardian archetype  
    #  3. ui-agent: build the flow (informed by 1+2)
    #  4. audit: check the built flow
    #
    # This matches design-kickoff's shape but you already have a task folder,
    # so running the chain directly. Proceeding — say stop if this is wrong."
```

**Key insight:** The model can now **discover** that research-agent's output
feeds into ux-pattern, which feeds into ui-agent, by reading the contracts —
without that chain being pre-scripted anywhere.

---

## Validation rules

When adding contracts to skills:

1. **Required inputs must be obtainable** — either from the designer's request,
   a prior skill's output, or a standing source (profile, task folder, MCP)
   
2. **can_run_after should be minimal** — list only skills whose output
   *significantly improves* this skill, not just "could theoretically be used"
   
3. **runs_independently: false means it's always chained** — use sparingly
   (audit, mobile-shell, icon-usage are the main cases)
   
4. **side_effects must list file modifications** — this is how the orchestrator
   knows what state changed

5. **MCP sources must be accurate** — if a skill calls Slack MCP, list it;
   this enables partial-success handling when MCPs are down

---

## Migration plan

### Phase 1: Document existing implicit contracts (this file)
- Examples above show contracts for 6 core skills
- Validates the format is expressive enough

### Phase 2: Add contracts to all 53 skills
- Systematically add frontmatter to each SKILL.md
- Use `harness-audit` to check completeness

### Phase 3: Orchestrator reads contracts for validation
- Before showing a §3 PLAN, verify inputs are satisfiable
- Catch "ux-pattern needs findings but research-agent isn't in the chain" earlier

### Phase 4: Model-discovered chains (future, needs better models)
- Let the model propose chains by reading contracts
- Orchestrator validates the proposal, proceeds if valid
- Only enable this when models are good enough to not hallucinate dependencies

---

## Why this matters

**Your current system:**
- Skills CAN be combined (good!)
- But combinations are hardcoded in skill files (limiting)
- A better model can't discover new valid combinations

**With contracts:**
- Skills declare their dependencies explicitly
- Orchestrator can validate new combinations before execution
- Better models can propose "research-agent → ux-pattern → ui-agent" even if
  that's not pre-scripted in design-kickoff
- You get composability without losing safety/validation

**Trade-off:**
- More frontmatter to maintain (every skill gets 10-15 extra lines)
- But you ALREADY know these dependencies (they're implicit in skill files)
- Making them explicit/machine-readable is the unlock

---

## Next steps

1. **Add contracts to the 6 core skills above** — validate format works
2. **Run a test**: can the orchestrator read contracts and propose a valid
   chain for "audit onboarding for Overbooked providers"?
3. **Systematically add to remaining 47 skills** — tedious but mechanical
4. **Update ORCHESTRATOR.md §2** — add "contracts must be declared" to routing
   standards
5. **Future: enable model-discovered chains** — only when models are capable

This is evolution-readiness. Your system gets better as models improve, without
changing the skills themselves.
