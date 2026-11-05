# Design Harness: The Operating System for AI-Assisted Product Design

## The Problem: AI Ships Fast, But Ships the Wrong Thing

You've seen it happen. A designer asks an AI agent to "build a checkout screen." Ten minutes later, they have something that looks impressive. But when you look closer:

**Product Strategy Failures:**
- Someone already started this three weeks ago (duplicate work)
- Solves the wrong problem (no one checked strategic pillars or user archetypes)
- Ignores customer pain signals (12 Slack threads about this exact friction)
- Conflicts with the roadmap (PM scoped this differently in Q1)
- Wrong patterns for the user type (consumer UX applied to provider workflows)
- No rationale logged (the decision dies when the chat window closes)

**Design Execution Failures:**
- Colors don't match design system (invented `#1a73e8` instead of `var(--kit-brand)`)
- Spacing is inconsistent (raw `24px` instead of `var(--spacing-06)`)
- Components are reinvented (custom button instead of existing `Button` primitive)
- Copy doesn't match brand voice (generic SaaS speak, not your terminology)
- Accessibility is missing (no focus states, wrong heading hierarchy)

**You need to prevent both.** Building the wrong thing with perfect tokens is still wrong. Building the right thing with design system drift creates technical debt and visual inconsistency.

**AI without constraints ships fast. It ships the wrong thing, built wrong, for the wrong users.**

The promise of AI-assisted design was supposed to be "move faster without sacrificing quality." Instead, most teams get "move faster by skipping the process that ensures quality." Every generated screen is a potential design system violation. Every AI critique is vibes-only unless you manually cross-check it against your house standards. Every chat conversation dies when the context window fills up.

Generic AI can't tell the difference between a rough sketch and a production-ready spec. It can't know that your company calls them "providers" not "vendors." It won't stop you from building something your PM started three weeks ago. And it definitely won't enforce your design tokens.

## The Solution: Product Strategy + Design System = Enforceable

**Design Harness is an operating system for AI-assisted product design.** Not a prompt library. Not a skill pack. An actual system with:

- **Strategic grounding** (your business model, user archetypes, product roadmap, customer pain signals)
- **67 specialized skills** that compose into workflows
- **Research-first gates** you can't bypass (workload check → discovery → PRD → human approval)
- **Product decision tools** (prioritization, OKR setting, stakeholder alignment, assumption mapping)
- **Your company brain** (voice, UX patterns, interaction conventions)
- **Design system enforcement** (tokens, components, accessibility)
- **Resumable work** that survives beyond a single chat session
- **Living catalog** (Design Harness) + mechanical blockers (pre-commit hooks)

Natural language still works. Skipping research doesn't. Building without checking the roadmap doesn't. Inventing design tokens doesn't. Ignoring customer pain signals doesn't. Freestyling critiques that skip your house standards doesn't.

### The Two Layers That Both Matter

**Layer 1: Product Strategy (Build the Right Thing)**
Before any pixels are pushed, the system ensures:
- ✅ **Strategic fit** — Does this map to your business pillars?
- ✅ **User understanding** — Which archetype is this for, and what's their context?
- ✅ **Evidence-based** — What customer pain signals support this?
- ✅ **Roadmap-aware** — Who else is working on this? Does it conflict with committed work?
- ✅ **Decision clarity** — What's the actual decision, and what's the risk if we're wrong?
- ✅ **Assumption audit** — What do we know (sourced) vs what do we believe (unsourced)?

**Layer 2: Design Execution (Build It Right)**
In parallel (not after), the system enforces:
- ✅ **Token compliance** — Design system variables, not raw values (mechanically blocked at git commit)
- ✅ **Component reuse** — Existing primitives, not invented UI
- ✅ **Interaction patterns** — Your conventions, not generic SaaS
- ✅ **Content voice** — Your terminology, not ChatGPT's defaults
- ✅ **Accessibility** — WCAG AA, focus order, ARIA (checked before share)
- ✅ **Audit gate** — PASS before share (BLOCKING violations, not suggestions)

**Perfect tokens on the wrong feature = waste. Right feature with design drift = debt. You need both layers, specified together — tokens also mechanical at commit.**

**Most AI design tools barely do Layer 2. Almost none do Layer 1.**

### What Makes It Different

Most AI design tools are assistants. Design Harness is infrastructure.

| What Others Do | What Design Harness Does |
|---|---|
| **Strategy:** "Build checkout" → Generates UI immediately | **Strategy:** "Build checkout" → **Stops.** Checks roadmap, researches pain signals, drafts PRD, waits for approval |
| **Intelligence:** Generic ChatGPT summarizes Slack | **Intelligence:** Sweeps your docs, tracker, and chat, and cites every finding in `findings.md` and `sources.md` |
| **Tokens:** "Here's a nice blue" (suggestion) | **Tokens:** **Physically blocks git commit** on `#007078` — must use `var(--kit-brand)` |
| **Memory:** Stores chat history (lost on reset) | **Memory:** Logs decisions to `projects/<slug>/` with rationale, alternatives, trade-offs |
| **Roles:** One persona for everyone | **Roles:** Role-gated — managers get roadmap/coaching; ICs get build/research |
| **Enforcement:** Advice after the fact | **Specified gates** (roadmap / PRD / audit — agent-followed) plus **mechanical** token block at git commit |

The core insight: **companies don't need smarter AI. They need AI that is specified to follow institutional process — and a few gates that are actually mechanical.** Routing, PRD approval, and audit are specified. Raw tokens at `git commit` are mechanical. See `documentation/guides/spec-vs-runtime.md`.

### Why Both Layers Matter: A Real Scenario

**Scenario:** Designer asks to "build a provider referral leaderboard"

**If you only enforce design tokens:**
- ✅ Uses `var(--kit-brand)` correctly
- ✅ Components from DS primitives
- ❌ But someone already built this (PROJ-174 in backlog)
- ❌ And it conflicts with a Q2 pivot away from gamification
- ❌ And user research showed providers don't want public rankings

**Result:** Perfect visual execution of the wrong feature. Engineering builds it, ships it, user feedback is negative, work gets reverted. Total waste.

**If you only enforce product strategy:**
- ✅ Checks roadmap (finds PROJ-174)
- ✅ Researches pain signals (finds anti-gamification sentiment)
- ✅ Drafts PRD with strategic concerns
- ❌ But prototype uses `#1a73e8` (invented blue)
- ❌ And spacing is inconsistent (`23px`, `17px` magic numbers)
- ❌ And custom button components (not DS primitives)

**Result:** Right feature, but creates design debt. Engineering has to refactor before shipping. Design system drifts. 6 months later, the codebase has 47 variations of "blue."

**With both layers specified (tokens also mechanical at commit):**
- ✅ Roadmap check catches PROJ-174 overlap → sync with owner first
- ✅ Signals research surfaces anti-gamification concerns → PRD includes mitigation
- ✅ Human gate approval before build starts
- ✅ Prototype uses only `var(--*)` tokens → pre-commit hook blocks raw values
- ✅ Components from DS primitives → no invented UI
- ✅ Audit gate checks DS + a11y + copy → PASS before share

**Result:** Right feature, built right, approved with eyes open, no debt, no surprises.

## How It Actually Works

### The Architecture (Five Layers)

```
┌─────────────────────────────────────────────┐
│ Natural Language (You talk to "Muse")       │
├─────────────────────────────────────────────┤
│ Orchestrator (Routes to the right skills)   │
├─────────────────────────────────────────────┤
│ 67 Skills (Composable workflows)            │
├─────────────────────────────────────────────┤
│ Company Brain (Your context, not generic)   │
│  • Business model & user archetypes         │
│  • Brand voice & UX patterns                │
│  • Design system tokens & components        │
│  • Project history & decisions              │
├─────────────────────────────────────────────┤
│ Enforcement (Mechanical + human gates)      │
│  • Pre-commit hook blocks raw values        │
│  • Audit gate before sharing                │
│  • PRD approval before building             │
└─────────────────────────────────────────────┘
```

## Product Intelligence Before Visual Polish

Before we talk about enforcing design tokens, let's talk about enforcing **product strategy**. This is what differentiates Design Harness from every other AI design tool.

### Research Before Building: Cited, Not Summarized

Instead of "search Slack for complaints," `design-kickoff` runs a sweep across the tools you connected — docs, tracker, chat, and any linked Figma or Miro — before anything is designed:

- Every finding lands in `projects/<slug>/findings.md` with the source it came from
- Durable links go in `sources.md`, dated, so the next person starts from them
- Gaps are named, not filled: if a leg fails, the brief says the findings are partial
- The workload leg checks the roadmap, so you learn someone already started this before you duplicate it

**When a designer says "build booking flexibility,"** the brief shows what the team already knows, who owns it, and what's still unanswered — and it waits for approval before design starts.

### Strategic Pillars: "Does This Even Belong in the Product?"

From `COMPANY-BUSINESS.md`:

| Pillar | Direction |
|--------|-----------|
| **Calm calendar** | "Fewer gaps, fewer surprises." |
| **Repeat clients** | "Your regulars, kept." |
| **Clear money** | "Know what you earned and what's owed." |

**Every feature must map to one.** If it doesn't, the system asks "Why does this exist?" before building it.

A designer says "build a social feed for providers." The system loads the business model and says: *"This doesn't map to any strategic pillar. Closest is Repeat clients, but that's about rebooking regulars, not provider social. Confirm this is intentional or clarify the product goal."*

### User Archetypes: "Who Is This Actually For?"

Not demographics. Mental models:

- **Independent contractor** — Solo, manages everything, low tolerance for complexity
- **Multi-staff store** — Team management, delegation patterns
- **Establishing provider** — Onboarding phase, needs fast activation
- **Mature provider** — Optimization and growth tools

When the system reviews a design, it asks: **"Which archetype is this for, and does the interaction match their context?"**

Example: A multi-step configuration wizard for a setting. The system flags: *"Solo providers work alone and are often mid-service. This 5-step flow assumes desktop focus time. Recommendation: Single-screen with defaults."*

### Roadmap Awareness: "Someone Already Started This"

`workload-agent` runs automatically in `design-kickoff` Step 1:
- Queries your roadmap boards (Jira, Linear, Notion, or GitHub)
- Checks designer execution boards
- Cross-references squad ownership

**Before any build,** you see:
```
⚠️ OVERLAP DETECTED
   PROJ-203 (Calendar, In Progress, Alex)
   Title: Booking rescheduling flexibility
   Status: Design in progress (started 2 weeks ago)
   
   Recommendation: Sync with Alex before starting parallel work.
```

This prevents the **most expensive design failure**: building the right thing that someone else already built.

### Example: "Build a City Leaderboard"

Without a harness, the AI immediately starts generating components. With Design Harness:

**Step 1: Automatic Research (Can't Skip This)**
- Queries your tracker: "Is anyone already working on this?"
- Searches Slack: "Have we discussed leaderboards before?"
- Checks Figma: "Do we have existing leaderboard designs?"
- Finds linked Miro boards: "Is there strategy work on this?"

**Step 2: Evidence-Based PRD**
The system drafts a PRD in `projects/city-leaderboard/brief.md`:
- **§1 Existing Work & Ownership** (from workload check)
- Problem statement (from your business model)
- User needs (from your archetypes)
- Success criteria
- Constraints (from Slack discussions)

**Step 3: Human Gate (Can't Skip This Either)**
The system **stops** and presents the PRD. You must explicitly approve before any design work starts. No "I'll just sketch something real quick" bypass.

**Step 4: Build with Guardrails**
Once approved, `ui-agent` builds the screen:
- Uses only tokens from `context/design-system/tokens.css`
- Composes from existing primitives (Button, Card, Stack, Text)
- Loads platform interaction patterns (iOS gestures, web hover states)
- Icons from Tabler only (5,900 icons; never hand-draws SVG)

**Step 5: Pre-Commit Check**
You try to commit. Git hook runs `design-detector`:
```bash
❌ BLOCKED: Found raw values in leaderboard.css
   Line 47: background: #007078
   Should be: background: var(--kit-brand)
   
   Fix: npm run design:detect -- --fix leaderboard.css
```

**Step 6: Pre-Share Audit**
Before you can share with PM or engineering:
- ✅ Design system check (mechanical via `design-detector`)
- ✅ Accessibility check (WCAG AA, focus order, ARIA)
- ✅ Content check (matches brand voice)
- ✅ UX pattern check (fits company conventions)
- ⚠️ Craft review (advisory observations)

**Result:** `PASS` or `BLOCKED` (not "suggestions").

**Step 7: Gallery & Push**
On `PASS`, the system:
- Mirrors the project to Team Gallery (visible work across designers)
- Offers to commit and push to shared GitHub remote
- Logs the full chain to `projects/city-leaderboard/log.md`

### Example: "Any Thoughts on This Figma?"

Designer pastes a Figma URL and asks for feedback. Without a harness, you get an ad-hoc opinion. With Design Harness:

**Artifact Classification**
First, the system asks: "Is this exploratory (Figma), a working prototype (Design Harness), live production, or a competitor screen?" Because tone and standards differ:
- Exploratory = supportive, opportunity-focused
- Production = real user impact, urgent tone

**Output Mode Selection**
"Want written findings, Figma canvas annotations, or both?"

**If Written:**
1. Loads `ux-pattern` skill (structure, archetype fit, company patterns)
2. Loads `content` skill (CTA copy, voice, terminology)
3. Outputs "First Look" holistic paragraph
4. Then itemized two-layer findings:
   - **[House: COMPANY-PATTERNS — modal usage]** (BLOCKING if Design Harness)
   - **[UX Heuristic: Recognition over recall]** (ADVISORY)
5. Appends dated findings to `projects/<slug>/findings.md`
6. Logs routing decision to `harness/logs/routing-log.md`

**If Canvas Annotations:**
Places color-coded annotation cards on Figma with dotted connectors:
- 🟦 Blue = UX Heuristic
- 🟨 Yellow = House standard
- 🟥 Red = Accessibility blocker

Downloads annotated screenshots to `artifacts/qa/` for evidence trail.

**After Complete:**
"Package these findings as a scrollable HTML report?" (real example: ES homepage live review → professional critique article with DOM snapshots)

## The Company Brain: Why Generic AI Can't Do This

Design Harness ships with "Northline" — a fictional booking platform — so a fresh clone works immediately. But the system is built for you to **bring your own company**:

### The Org Pack (8 Files That Define Your Company)

```
context/org-pack.local/  (gitignored — your real company)
├── COMPANY-BUSINESS.md     What you build, for whom, why
├── COMPANY-VOICE.md        Tone, writing rules, vocabulary
├── COMPANY-PATTERNS.md     Modal behavior, navigation rules
├── COMPANY-ARCHETYPES.md   User segments (not personas yet)
├── COMPANY-SQUADS.md       Org map for routing and ownership
├── COMPANY-SOURCES.md      Global link catalog (Confluence, Notion, Google Docs)
├── COMPANY-VOCABULARY.md   Terminology (provider vs vendor)
└── COMPANY-STYLE-GUIDE.md  Visual/editorial standards
```

Every skill reads these files. When `content` checks copy, it checks against YOUR voice. When `ux-pattern` reviews structure, it checks against YOUR patterns. When `workload-agent` shows roadmap, it queries YOUR tracker.

**This is why it works:** The system has institutional memory, not just model memory.

### The Design System Brain

Not documentation. A living system:

- `tokens.css` — Single source of truth (colors, spacing, radius, typography)
- `ds/` primitives — Button, Card, Stack, Text, Badge, TextField, Toast, Icon
- **Design Harness catalog** — Browse your design system at `localhost:3002`
- **Three-layer rule** — Real DS vs Design Harness chrome vs per-prototype CSS
- **Figma sync** — Bidirectional token/asset/Code Connect mapping

### Project Memory (Resumable Work)

Every task gets a folder:
```
projects/city-leaderboard/
├── brief.md         PRD, status (STUB/DRAFT/APPROVED)
├── sources.md       Dated, linked references
├── findings.md      Append-only research/critique
├── decisions.md     What was chosen and why
├── log.md           Chronological skill execution
├── screens/         Design Harness prototypes (public)
└── artifacts/       Decks, reports, QA snapshots
```

"Continue the leaderboard project" works because the agent reads the folder, sees where you left off, and proposes next steps. **No re-asking questions already answered.**

## The 67 Skills: Not a Menu, a System

Skills aren't prompts you choose from. They're triggered by intent and compose into chains.

### The Front Door (You Can't Skip Research)

**`design-kickoff`** — Mandatory for any net-new project.
- Step 0: 3 routing questions (feature name, known material, PM)
- Step 1a: `workload-agent` (who's working on what)
- Step 1b: `research-agent` deep sweep (docs + tickets + chat + Figma + Miro)
- Step 2: Draft PRD
- Step 3: **HUMAN GATE** (must explicitly approve)
- Step 4+: Route to build chain or method recommendation

Even if you say "just build X", if no prototype exists and no PRD is approved, kickoff fires. **Newness, not vagueness, is the trigger.**

### Build & Iterate

- **`ui-agent`** — Builds screens using your design system
- **`design-system`** — Pre-write token check (before CSS is written)
- **`mobile-shell`** — Phone chrome, four-tab navigation, settings sheets
- **`icon-usage`** — Tabler icons via Icon primitive
- **`taste-feedback`** — Mid-build aesthetic checkpoints (not a critique)

### Quality Gates

- **`audit`** — Mandatory before sharing (DS + a11y + copy + patterns + craft)
- **`interface-change-review`** — Git-scoped UI review (introduced vs regression)
- **`publish-project`** — Copies to public/ only after audit PASS

### Critique & Review

- **`ux-pattern`** — Structure, archetype fit, company patterns
- **`content`** — Voice, CTAs, terminology
- **`figma-ux-audit`** — Canvas annotations with house/heuristic labels
- **`live-page-review`** — Capture live URL (DOM + screenshot + a11y tree)
- **`review-report`** — Scrollable HTML critique article
- **`taste-feedback`** — Aesthetic checkpoints within Foundations

### Research Stack (Full UXR Lifecycle)

- **`research-agent`** — Deep discovery across all MCPs
- **`assumption-mapper`** — Sourced vs unsourced beliefs
- **`decision-first-research`** — Decision + risk + blocking unknown
- **`research-question-sharpener`** — Shallow → TEDW story-based
- **`screener-builder`** — Behavior-first (not demographic)
- **`usability-test-guide`** — Quant or qual session plan
- **`ia-methods`** — Card sort + tree test
- **`research-synthesis`** — Debrief → patterns (1/3 rule threshold)
- **`insight-writer`** — Key learning + why + consequence + so-what check
- **`research-summary`** — Session notes or executive topline
- **`research-shareout`** — Audience-first presentation plan
- **`research-artifacts`** — Persona, empathy map, journey map, ability spectrum

### Competitive Intelligence

- **`competitor-scan`** — Factual reference for one competitor + one feature
- **`benchmark`** — Scored gap analysis vs best-in-class (2-3 examples)
- **`inspiration-scouting`** — Aesthetic/cross-domain refs (not competitor facts)

### Process & PM Tools

- **`workload-agent`** — Live roadmap + execution boards (autonomous)
- **`ticket-create`** — Draft tickets in Jira, Linear, or GitHub (lean work orders, no essay dumps)
- **`docs-brief`** — Draft wiki page (team status, not PRDs)
- **`roadmap-prioritization`** — Ranked backlog with visible reasoning
- **`okr-goal-setting`** — Objective + falsifiable KRs (no invented baselines)
- **`stakeholder-alignment`** — Maps motivations, drafts sequenced asks
- **`scheduling`** — Find/propose/book (free/busy only, grounded context)

### Manager-Only (Role-Gated)

- **`manager-1on1-prep`** — Per-report prep from workload + projects
- **`people-coaching`** — Feedback (SBI), difficult conversations, growth plans

### Output Formats

- **`case-study`** — the project's story written once into `case-study.md`
- **`deck-builder`** — HTML presentation (3 templates: case study, workshop, stakeholder)
- **`writing`** — Long-form prose (essay, blog, case study) with anti-slop pass
- **`review-report`** — Scrollable HTML critique article (not slides)

### Accessibility & Craft

- **`accessibility`** — WCAG AA, focus order, ARIA, contrast
- **`cognitive-accessibility`** — Mental load, wayfinding, COGA
- **`responsive-patterns`** — Breakpoints, 200% zoom, reflow
- **`interaction-design`** — State matrix + feedback timing
- **`adaptive-interfaces`** — Prefers-* media queries, text-size
- **`accessibility-decisions`** — A11y tradeoff documentation for eng
- **`motion-choreography`** — Spec/review/opportunities/audit/vocabulary

### Memory & Ops

- **`session-journal`** — Your judgment per session, read back next time
- **`design-retrospective`** — Post-ship reflection
- **`design-debt-tracker`** — Triage project debt register
- **`design-rationale`** — Document decisions after they're made
- **`session-handoff`** — Compact chat for fresh agent session
- **`harness-setup`** — One-time configuration help
- **`harness-audit`** — Self-audit (routing correctness + skill output quality)

### Figma Design System Ops

- **`figma-token-sync`** — Bidirectional Figma variables ↔ CSS tokens
- **`figma-asset-sync`** — Download/upload/optimize/sprite generation
- **`figma-code-sync`** — Bulk Code Connect mapping (design ↔ code)
- **`figma-library-manager`** — Search before creating, prevent duplication
- **`figma-effects-catalog`** — Document custom shader effects

## The Enforcement Stack: Why It Actually Works

### Layer 1: Process (Soft But Loud)

- Routing table with trigger phrases
- Plan gate for multi-skill chains
- PRD gate at design-kickoff Step 3
- Loud fallback when nothing matches ("closest is X — run that or freestyle?")
- Routing log captures every decision

**You can say no.** But you can't silently skip.

### Layer 2: Skill Judgment

- `design-system` skill: three-layer rule (DS vs chrome vs prototype)
- `audit` Checks 1-5: BLOCKING (DS + a11y in code) + ADVISORY (craft)
- Two-layer labeling: `[House: COMPANY-PATTERNS]` vs `[UX Heuristic: name]`

### Layer 3: Mechanical (Zero-LLM Facts)

**`scripts/design-detector`** — Portable engine + per-repo config:
- Reads your `tokens.css`
- Scans `.css` files for raw hex/px/rem literals
- Category-aware matching (radius token can't fix a spacing literal)
- Exit code 2 = findings present
- `--fix` flag rewrites `#007078` → `var(--kit-brand)`

```bash
npm run design:detect -- src/design-harness/styles/checkout.css
```

**Deterministic.** Not advisory. Not LLM judgment.

### Layer 4: Git Hook (Physical Wall)

`scripts/git-hooks/pre-commit.mjs` (installed via `npm prepare`):
- Runs detector on every staged `.css` file
- **Blocks commit on exit code 2**
- Shows fix command in error message
- Bypassable with `--no-verify` (documented as tripwire, not merge gate)

**This is the differentiator.** Generic Company Brains suggest. Design Harness physically stops bad code from entering version control.

### Layer 5: Self-Audit

- **`harness-audit`** — Reads routing logs, proposes §2 table fixes
- **Prospective evals** — Runs eval prompts after table edits
- **Usage telemetry** — Tracks which skills fire, how often
- **Skill benchmarking** — Append-only PASS/BLOCKED log from audit runs

The system improves from its own FALLBACK clusters.

## Real Examples From Production Use

### ES Homepage Live Review

**Input:** URL to live production homepage + "review this"

**Chain:**
1. `live-page-review` — Playwright capture (screenshot + DOM + a11y tree)
2. Classify: live production (real users)
3. `ux-pattern` + `content` critique (live-impact tone)
4. Generate stakeholder deck
5. `review-report` — HTML article with DOM evidence

**Output:** Professional scrollable critique report in `artifacts/reports/`, dated findings in `findings.md`, logged chain in `log.md`.

### Referral Entry Points Review Board

**Input:** "Evaluate four notification placement options"

**Chain:**
1. `ui-agent` variant fork mode
2. Builds A–D layouts in review-board format
3. `ux-pattern` decision framework (explicit criteria table)
4. Designer picks option C via `AskQuestion`
5. Logs chosen layout + rejected alternatives to `decisions.md`

**Result:** Documented decision with visible reasoning. "Gates are permission, not taste."

### Checkout Tablet Exploration

**Input:** "Build tablet checkout flow"

**Artifacts:**
- Four-tab navigation prototype (`CheckoutTabletScreen.tsx`)
- Navigation profile defines device type + posture
- Settings IA canvas integration
- Citations tracking for product requirements
- Multi-surface design (tablet + desktop patterns)

### City Leaderboard (The Kickoff That Matters)

**Why this example is famous internally:** Designer said "just build it" as a one-liner. Harness recognized it was net-new (no prototype, no PRD), fired `design-kickoff` automatically:
- Found overlapping work in the tracker
- Surfaced 3-month-old Slack discussion about gamification concerns
- Linked PM's Miro board from Q1 strategy
- Drafted PRD with §1 ownership conflicts flagged
- **Stopped before any screen was built**

Designer said "this saved us from building the wrong thing twice."

## Positioning: What Category Is This?

### Not a Prompt Library
V0, Galileo AI, Uizard — these generate UI from text. Design Harness generates **researched, approved, token-compliant, logged UI** from text.

### Not a Linter
ESLint, Stylelint, a11y-linters — these flag violations. Design Harness **blocks commits** and routes work through company-specific validation (your patterns, your voice, your archetypes).

### Not a Multi-Agent Startup
Devin, Factory, Codegen platforms — these are new runtimes. Design Harness is **markdown orchestration in your existing IDE**. Adoptable as a Cursor plugin, not a product switch.

### Not a Design Tool
Figma, Framer, Webflow — these are canvases. Design Harness is **the workflow wrapper**: research before Figma, audit before shipping Figma to eng, token sync between Figma and code.

### Not a Generic Company Brain
Slite Agent, GBrain, mem0, Zep — these handle generic knowledge. Design Harness handles **design-specific knowledge with design-specific enforcement** (tokens, patterns, fidelity, critique rigor).

### What It Actually Is

**The operating system for AI-assisted product design.**

- Skills = the programs you run
- Org-pack + DS + project memory = the filesystem (your company's context)
- Design Harness = the desktop environment (visual catalog)
- Detector + audit + gates = the kernel (enforcement)
- MCPs = the I/O layer (docs, tracker, chat, Figma, Miro)
- Orchestrator = the scheduler (routes work to skills)

## Who It's For

### Individual Contributors (Designers)
- Natural language works: "kick off leaderboard," "check this before sharing"
- No command memorization, no CLI, no config files
- Resumable projects that survive chat resets
- Your work is automatically logged and gallery-eligible

### Design Systems Teams
- Mechanical token enforcement (not just docs)
- Figma ↔ code sync (variables, assets, Code Connect)
- Design Harness as living catalog (not Storybook)
- Three-layer rule prevents DS sprawl

### Design Leaders
- Process compliance without process theater
- Manager skills (1:1 prep, coaching) separate from IC skills
- Workload visibility across team (autonomous snapshots)
- Gallery of shipped work (auto-mirrored on audit PASS)
- Self-auditing system (routing logs, usage telemetry, benchmarking)

### Researchers
- Full method chain (assumption → screener → guide → synthesis → insight → shareout)
- Not just "summarize this Slack thread"
- Sourced-evidence-only rules (never invents personas or quotes)
- Research artifacts (persona, empathy map, journey map, ability spectrum)

### Platform/AI Engineers
- Context-budget information architecture (§9 in orchestrator)
- Routing evals (prospective correctness checks)
- Portable `design-detector` (other companies plug their tokens.css)
- Plugin distribution (Cursor marketplace)
- Usage telemetry and skill benchmarking

## The Honest Pitch: What It Isn't

### It's Not Magic
You still need to approve PRDs. You still need to pick which design direction. You still need to review audit findings. Design Harness enforces process; it doesn't replace judgment.

### It's Not Production Engineering
Design Harness prototypes prove structure and interaction. Engineering still rebuilds for production (documented in `projects/README.md`). This is a design tool, not a code generator.

### It's Not Foolproof
It depends on:
- IDE agent quality (Cursor, Claude Code)
- MCP auth working
- Designers reading the audit report
- Git hooks not being bypassed with `--no-verify`

Some Cursor hooks are buggy (documented in `KNOWN-ISSUES.md`). The system is empirically hardened from real misses, not theoretically perfect.

### It's Not Free
It requires:
- Setup time (connect 4 MCPs, populate org-pack)
- Learning curve (skill vocabulary, when to defer audit)
- Maintenance (tokens.css stays in sync with Figma)

But the alternative — unconstrained AI — has higher hidden costs: design system drift, duplicated work, lost chat history, freestyled critiques.

## Why Now: The Company Brain Moment

From the PDF you found:
- **71% of teams expect self-maintaining knowledge**
- **92% expect a Company Brain to serve people, not just agents**
- **77% worried about accuracy**
- **58% worried about maintenance burden**
- **Top builders agree: "AI can't autonomously write to knowledge base yet"**

**Design Harness's answer:**
- Self-maintaining where provable (detector blocks stale tokens)
- Serves people first (67 skills designed for designers, not backend agents)
- Accuracy enforced mechanically (exit code 2 on commit)
- Maintenance via self-audit (harness-audit + routing evals)
- Human gates before knowledge changes (PRD approval, audit PASS)

You built a **specified process plus one mechanical token wall** — not a full runtime. Generic Company Brains are still figuring out both.

## The Bottom Line

AI design tools promise speed. Design Harness promises **speed without institutional amnesia**.

Your company brain is portable (`org-pack.local`), your design system is mechanical at commit (pre-commit hook), your research is structured (full UXR lifecycle), your decisions are logged (`projects/`), and share quality is a specified audit gate (`audit` PASS — agent-followed, not a runtime).

**This is not a skill pack. It's not a prompt library. It's an operating system.**

And unlike generic Company Brains that try to handle every domain, Design Harness handles **one domain deeply**: product design work with mechanical rigor, compositional skills, and company-specific grounding.

---

## How to Adopt It

1. **Clone** → `git clone marcopslopes/thedesignharness`
2. **Install** → `npm install` (sets up pre-commit hook automatically)
3. **Connect** → the MCPs your team uses (docs, tracker, chat, Figma, Miro) via Cursor settings
4. **Onboard** → First chat triggers profile setup + org-pack interview
5. **Build** → Natural language: "kick off X," "build Y," "check Z"

**5 minutes to clone. 15 minutes to connect MCPs. One hour to populate org-pack. Then you have an AI that can't skip your process.**

---

*Design Harness: Process as product. Enforcement as feature. Your company brain, mechanically grounded.*
