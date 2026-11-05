# What is the Design Harness?

An AI-native design workflow that takes you from vague idea to quality-checked prototype — with real research, real constraints, and real guardrails.

## The Problem It Solves

Working with AI design tools often means:
- ❌ Agents invent specs without research
- ❌ Generated code ignores your design system
- ❌ Quality checks are skipped
- ❌ Work isn't logged or resumable
- ❌ You repeat setup questions every chat

**The harness fixes this** with a specified process (routing, research,
human approval, audit) plus one mechanical token check at git commit.
See [spec vs runtime](spec-vs-runtime.md).

---

## What You Get

### 1. Autonomous Skills
55 specialized playbooks that know how to:
- Build screens using YOUR design system
- Run discovery across your docs, tickets, chat, Figma, and Miro
- Review work for UX, content, accessibility issues
- Create presentations, tickets, wiki pages
- And more...

**You use natural language** - the harness routes to the right skills automatically.

### 2. Token-First Design System
A real, working design system with:
- Complete token library (colors, spacing, type, radius)
- Primitive components (Button, Card, Stack, Text, etc.)
- Live preview app (Design Harness) at `localhost:3002`
- Pre-commit hook that blocks hardcoded values

**Your designs stay consistent** because everything uses tokens.

### 3. Quality gates (specified + one mechanical)
Before anything gets shared, the agent is specified to run:
- Design system check (no invented colors/spacing)
- Accessibility check (WCAG)
- Content review (house voice)
- UX pattern check (product fit)

**Audit is specified to run before share** — the agent can still skip
it. Raw token values in staged CSS are **mechanically** blocked at
`git commit` (bypassable with `--no-verify`).

### 4. Research-First Process
Net-new projects require:
1. Workload check (who's already working on this?)
2. Deep research (what exists in your docs, tickets, chat, and Figma?)
3. Evidence-based brief
4. Human approval gate

**Nothing gets built without research backing it.**

### 5. Logged & Resumable
Everything is saved to `projects/<slug>/`:
- `brief.md` - Approved project brief
- `findings.md` - Research results
- `decisions.md` - Choices made and why
- `log.md` - Complete timeline

**Any agent can pick up where you left off.**

---

## How It Works

### Simple Flow
```
You: "Build a city leaderboard screen"

Harness:
1. Routes to ui-agent (build skill)
2. Loads design-system (token check)
3. Builds screen using YOUR tokens
4. Runs audit (quality gate)
5. Shows result + saves to projects/
```

### Complex Flow
```
You: "Kick off discovery on referral improvements"

Harness:
1. Routes to design-kickoff
2. Runs workload-agent (who's on referrals?)
3. Runs research-agent (what exists?)
4. Drafts PRD from evidence
5. STOPS - waits for your approval
6. Only builds after you say "go"
```

**The harness specifies the process** — you are asked to approve the
PRD and the plan. A model can still skip those stops. Tokens at
commit are the mechanical exception.

---

## Core Principles

### 1. Natural Language Only
❌ Don't: `/ui-agent build screen`  
✅ Do: `"Build a screen"`

The orchestrator handles routing automatically.

### 2. Token-First Always
❌ Don't: Hardcoded `#007078` or `20px`  
✅ Do: `var(--kit-brand)` and `var(--space-5)`

Design system tokens are mechanical at commit (detector), and specified
in the skill before CSS is written.

### 3. Research Before Building
❌ Don't: Jump straight to building  
✅ Do: Run discovery first for net-new work

Evidence-based briefs prevent wasted builds.

### 4. Audit Before Sharing
❌ Don't: Share without checking  
✅ Do: Run audit first (it's automatic anyway)

Quality gates catch issues before they ship.

### 5. Everything is Logged
❌ Don't: Work in freestyle chat  
✅ Do: Use the harness (auto-logs everything)

Makes work resumable and auditable.

---

## What Makes It Different

### vs Normal AI Chat
| Normal Chat | Design Harness |
|-------------|----------------|
| Freestyles answers | Specified skill routing (agent-followed) |
| Invents specs | Research + human approval (specified) |
| Ignores design systems | Blocks raw CSS values at commit (mechanical) |
| No quality checks | Audit before share (specified) |
| Lost on new chat | Resumable from `projects/` |

### vs Design Tools
| Design Tools | Design Harness |
|--------------|----------------|
| Build UI only | Full workflow (research → build → audit) |
| Manual quality checks | Automated gates |
| No process specified | Process specified — skip is a live miss, not impossible |
| One-off outputs | Logged, resumable work |

---

## Who It's For

### Product Designers
- Build prototypes from your design system
- Run UX pattern checks
- Create stakeholder decks
- Research new features

### Content Designers
- Review copy against voice guidelines
- Check terminology consistency
- Draft wiki pages
- Audit content across flows

### Design Leads/Managers
- See team workload at a glance
- Prep for 1:1s with context
- Track project progress
- Ensure quality standards

### Researchers
- Run discovery across tools
- Synthesize findings
- Draft research plans
- Create screeners

---

## Getting Started

### 1. Install (5 minutes)
```
git clone https://github.com/marcopslopes/thedesignharness.git
cd design-harness && npm install
```
Open the folder in Cursor, Claude Code, or Codex and say `hi`.
[Full install guide →](../../INSTALL.md)

### 2. Connect MCPs (5 minutes)
Connect your docs tool, tracker, chat, Figma, and Miro for research skills.  
[MCP setup guide →](../setup/mcp-setup.md)

### 3. Onboarding (5-10 minutes)
Answer 1 role question + 6 customization questions.  
[Onboarding guide →](onboarding.md)

### 4. Start Using
```
"Build a screen"
"What's on the roadmap?"
"Check this design"
```
[Understanding skills →](understanding-skills.md)

---

## Customization

**Out of the box:** Works with "Northline" (fictional company) defaults

**Customize:** Import YOUR:
- Design tokens
- Brand voice
- User personas
- UX patterns
- Company context
- Terminology

During onboarding or anytime: "Set up my design system"

---

## What's Included

- **68 skills** across build, critique, research, process, and Figma
- **Design Harness design system** (teal + plum, token-first, live preview)
- **Northline example** (fictional booking platform for reference)
- **Complete docs** (guides, skill references, troubleshooting)

---

## Philosophy

The harness is **opinionated**:
- Research before building (specified — kickoff gate)
- Token-first design system (mechanical at commit)
- Quality gates before sharing (specified)
- Everything logged (specified)
- Natural language only (no slash-command UX)

**Why?** Because AI without constraints ships fast but ships wrong.
Specified gates are still worth having; they are not the same as a
runtime. [Spec vs runtime →](spec-vs-runtime.md)

---

## Next Steps

- **[Spec vs runtime](spec-vs-runtime.md)** - What is mechanical vs only specified
- **[Understanding Skills](understanding-skills.md)** - How skills work
- **[Agents vs Skills](agents-vs-skills.md)** - Concepts explained
- **[Design System Usage](design-system-usage.md)** - Token-first guide
- **[Browse Skills](../skills/)** - What each skill does
