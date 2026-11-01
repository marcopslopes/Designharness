# Understanding Skills

Skills are autonomous playbooks that know how to complete specific design tasks.

## What is a Skill?

A **skill** is a self-contained guide that tells the agent:
1. **What** the skill does
2. **When** to use it (trigger phrases)
3. **How** to execute it (step-by-step workflow)
4. **Where** to save outputs

Think of skills as expert consultants - each one knows how to do one thing really well.

---

## How Skills Work

### 1. You Use Natural Language
```
You: "Build a city leaderboard screen"
```

No need to know skill names or syntax!

### 2. Orchestrator Routes to Skills
The orchestrator (`harness/ORCHESTRATOR.md`) matches your request to the right skill(s):
- "build" → `ui-agent`
- "check" / "audit" → `audit`
- "what's on the roadmap" → `workload-agent`

### 3. Skills Execute
Each skill:
- Loads its required context
- Follows its step-by-step workflow
- Saves outputs to `projects/<slug>/`
- Logs what it did

### 4. Chains Automatically
Complex requests chain multiple skills:
```
"Build a screen" →
  ui-agent (builds) →
  design-system (checks tokens) →
  audit (quality gate)
```

---

## Skill Categories

### 🏗️ Build Skills
Create designs, prototypes, decks:
- `ui-agent` - Build screens using design system
- `deck-builder` - Create presentation decks
- `writing` - Long-form prose + anti-slop pass (always DRAFT)
- `mobile-shell` - Wrap prototypes in phone UI

### 🔍 Critique Skills  
Review and quality-check work:
- `audit` - Mandatory quality gate before sharing
- `ux-pattern` - Review flow structure
- `content` - Review copy and voice
- `accessibility` - Check WCAG compliance
- `critique-prep` - Presenter script for group critique (never critiques)

### 📊 Research Skills
Gather evidence and context:
- `research-agent` - Deep discovery (docs, tickets, chat, Figma, Miro)
- `workload-agent` - Live roadmap and team workload
- `competitor-scan` - What competitors do

### 📝 Process Skills
Manage workflow and documentation:
- `design-kickoff` - Start new projects (mandatory for net-new work)
- `ticket-create` - Draft tickets (Jira, Linear, or GitHub)
- `design-handoff` - Developer spec from a ready design
- `docs-brief` - Create wiki pages
- `session-handoff` - Compact chat for fresh session

### 🎨 Figma Skills
Bridge code and design:
- `figma-design-to-code` - Import designs from Figma
- `figma-use` - Create/update Figma files
- `figma-generate-library` - Build design systems in Figma

---

## Skill Anatomy

Every skill has:

### `SKILL.md` - The main playbook
```markdown
---
name: ui-agent
description: Builds screens using design system tokens
---

## What You Do
You build on-brand screens...

## Required Context
1. Load design-system SKILL.md first
2. Read COMPANY-VOICE.md
3. Check context/design-system/tokens.css

## Steps
1. Understand request
2. Check for existing components
3. Build using tokens only
4. Save to projects/<slug>/
```

### `/references/` - Supporting docs
```
harness/skills/ui-agent/
├── SKILL.md                  ← Main playbook
└── references/
    ├── token-check.md       ← Pre-write token validation
    └── component-library.md ← Available components
```

---

## How to Use Skills

### ❌ Don't Type Skill Names
```
Bad: "Run ui-agent on this"
Bad: "/ui-agent build a screen"
```

### ✅ Use Natural Language
```
Good: "Build a city leaderboard screen"
Good: "Check this design before I share it"
Good: "What's on the roadmap for payments?"
```

The orchestrator routes automatically!

---

## Common Patterns

### Simple Request (Single Skill)
```
You: "What's on my project board?"
→ workload-agent runs
→ Shows live tracker snapshot
```

### Build Request (Multi-Skill Chain)
```
You: "Build a referral screen"
→ ui-agent (builds the screen)
→ design-system (validates tokens)
→ audit (quality check)
→ Done!
```

### Research Request
```
You: "Kick off discovery on checkout improvements"
→ design-kickoff runs:
  → workload-agent (who's working on checkout?)
  → research-agent (what exists in your docs, tickets, chat, and Figma?)
  → Drafts PRD
  → Waits for your approval
```

---

## The Plan Gate

**Multi-skill chains show a plan first:**

```
PLAN — Referral screen build
1. ui-agent → build screen
2. design-system → validate tokens
3. audit → quality check

Say "go" to proceed.
```

This lets you:
- See what will happen
- Catch wrong routing early
- Approve before work starts

---

## Skill Outputs

Skills save everything to `projects/<slug>/`:

```
projects/referral-screen/
├── brief.md         ← Approved project brief
├── findings.md      ← Research & skill outputs
├── decisions.md     ← Choices made (logged)
├── log.md          ← What happened (timestamped)
└── screens/        ← Built prototypes
```

This makes work:
- **Resumable** - Any agent can pick up where you left off
- **Auditable** - Everything is logged
- **Traceable** - Know why decisions were made

---

## Creating Your Own Skills

Want to add a custom skill? See:
- [How to Build a Skill](../maintainers/build-a-skill.md)
- Template: copy an existing skill folder in `harness/skills/`
- Contribution guide: [CONTRIBUTING.md](../../CONTRIBUTING.md)

---

## Skill vs Agent?

There are only skills. See [Agents vs skills](agents-vs-skills.md).

---

## Related Guides

- [How the harness works](how-the-harness-works.md)
- [Design System Usage](design-system-usage.md)
- [audit](../skills/audit.md)
