# org-pack-builder

<!-- generated-from-skill: do not edit -->

Systematically builds `context/org-pack.local/` files (company context, domain vocabulary, voice, patterns, squads, archetypes) through three modes: MCP extraction (auto-populate from the team's tracker, docs tool, chat, and Figma), guided interview, or file upload.

**Triggers:** see the routing table

<!-- /generated-from-skill -->

**Auto-extract company context from your tools**

Builds `context/org-pack.local/` (your company's real context — business info, domain vocabulary, voice rules, UX patterns, team structure, user types) automatically from whichever docs tool, tracker, Figma, and chat you have connected. No more filling out forms manually.

---

## When to use

- **First clone setup:** Onboarding offers this automatically when `context/org-pack.local/` is missing
- **Explicit request:** "build org-pack", "extract company context", "map our domain"
- **Context refresh:** "update vocabulary", "refresh org-pack" when company context changes

---

## What it builds

Creates 7 files in `context/org-pack.local/` (gitignored — never pushed):

| File | Contains | Extracted from |
|------|----------|----------------|
| **COMPANY-BUSINESS.md** | What your product is, strategic pillars, key areas, user segments | Epic or project descriptions, strategy docs |
| **COMPANY-VOCABULARY.md** ⭐ | **Domain terms, terminology conflicts, bounded contexts** (Layer 2: domain mapping) | Ticket terms (frequency analysis), Figma component names, docs glossaries |
| **COMPANY-VOICE.md** | Brand personality, voice rules, tone guidelines | Notion brand docs, Slack message tone analysis |
| **COMPANY-PATTERNS.md** | Recurring UX patterns, common edge cases | Bug patterns, Figma component reuse |
| **COMPANY-SQUADS.md** | Team structure, squad ownership | Tracker team or project structure, chat channels |
| **COMPANY-ARCHETYPES.md** | User types, goals, behaviors | User story patterns in tickets |
| **COMPANY-SOURCES.md** | External research sources, strategy docs | Notion/Confluence linked docs |

**⭐ COMPANY-VOCABULARY.md is new** — it's the historically missing domain-mapping artifact. Before this, the harness had no systematic way to capture:
- Domain terms and definitions
- Terminology conflicts ("pickup" vs "collection")
- Bounded contexts (same term, different meanings)
- Deprecated terms

---

## Three modes

### Mode B: MCP extraction (recommended)

**Automatic extraction from your tools**

If you have a docs tool (Confluence, Notion, Google Docs), a tracker (Jira, Linear, GitHub), Figma, or chat (Slack, Teams) connected, this mode automatically extracts company context:

- Searches tracker tickets → domain terms (frequency analysis), business context, patterns
- Scans docs pages → glossaries, voice rules, strategy docs
- Reads Figma components → UI terminology, design patterns
- Analyzes chat tone → how your team actually talks

**Result:** 7 files created in 30-60 seconds

**Example output:**
```
✓ Built org-pack.local/ from your tools

Extracted from:
- Linear: 47 issues, 12 projects, 4 teams
- Figma: Design System (127 components)
- Slack: 3 channels (tone analysis)

Skipped (not connected):
- Notion (would add glossary/docs coverage)

Files created:
→ COMPANY-VOCABULARY.md (89 domain terms, 5 terminology conflicts)
→ COMPANY-VOICE.md (brand personality, voice rules)
→ COMPANY-BUSINESS.md (business context, strategic pillars)
→ ...

⚠️ INFERRED from available tools — review and correct before production use
```

**Graceful degradation:**
- Works with 1 tool, 3 tools, or 5 tools
- Shows what was skipped
- Explains coverage gaps

---

### Mode A: Guided interview

**Step-by-step questions when MCPs aren't available**

If you don't have any of these tools connected (or prefer manual input), answer 6 sections of questions:

1. **Business context** (5 questions) — what your product is, who uses it
2. **Domain vocabulary** (5 questions) — core terms, conflicts, deprecated words
3. **Voice rules** (4 questions) — brand personality, tone, writing standards
4. **Patterns** (3 questions) — recurring UX flows, edge cases
5. **Squads** (2 questions) — team structure, ownership
6. **Archetypes** (3 questions) — user types, goals, behaviors

Takes ~10-15 minutes. Can defer any section.

---

### Mode C: File upload

**Parse existing docs when you already have them**

Upload brand guidelines (PDF), glossaries (spreadsheet), Notion exports, or wiki pages. The skill parses and maps content to org-pack structure.

**Good for:**
- Companies with formal brand guidelines
- Glossaries already exist in spreadsheets
- Notion workspace exports

---

## How other skills use org-pack

Once built, every skill uses your real company context instead of the Northline example:

| Skill | Uses | Example |
|-------|------|---------|
| `ux-pattern` | `COMPANY-VOCABULARY.md` + `COMPANY-VOICE.md` | Catches "you used 'collection' but we say 'pickup'" |
| `content` | `COMPANY-VOICE.md` | Enforces tone rules: "no exclamation marks on routine actions" |
| `design-kickoff` | `COMPANY-BUSINESS.md` + `COMPANY-ARCHETYPES.md` | Uses real user types, not generic personas |
| `workload-agent` | `COMPANY-SQUADS.md` | Knows your squad structure for scoped queries |
| `research-agent` | `COMPANY-ARCHETYPES.md` | Research synthesis uses your actual user segments |

**Resolution order** (per `harness/ORCHESTRATOR.md` §0a):
1. Check `context/org-pack.local/` first (your real company)
2. Fall back to `context/org-pack/` (Northline example) if local doesn't exist

---

## Integration with onboarding

**Onboarding Step 3.5** (after handoff, if `context/org-pack.local/` is missing):

```
"One more thing — I can build your company context (vocabulary, voice, 
patterns) automatically from your tools, so every skill uses your real 
company info instead of the example pack."

How do you want to set up your company context?

○ Build from my connected tools (recommended)
○ I'll answer questions manually
○ Keep the example for now
○ Don't ask again this clone
```

If you pick **"Build from tools"**, it runs Mode B (MCP extraction) in the same turn. No additional questions needed.

---

## Graceful degradation

**Works with whatever tools you have:**

- **Every job covered** (docs + tracker + Figma + chat + Miro) → complete extraction
- **3 tools** (e.g. Linear + Figma + Slack) → good coverage, note what's missing
- **1 tool** (e.g. Jira only) → extracts what it can, recommends connecting more
- **0 tools** → offers Mode A (interview) instead

**Never blocks** — extracts from available tools only, explains what was skipped.

---

## Update mode

**When to refresh:**
- Company rebrand or voice change
- New domain terms introduced
- Squad restructure
- Terminology conflicts surface

**How to refresh:**

1. Say: "refresh org-pack" or "update COMPANY-VOCABULARY.md"
2. Choose which files to update (checkbox `AskQuestion`)
3. Pick mode: MCP extraction / interview / file upload
4. Only selected files rebuilt, others preserved
5. Review diff summary

---

## Domain mapping methodology

This skill focuses on **domain mapping** — terminology, concepts, and bounded contexts that form the foundation for conceptual modeling.

**Design framework layers:**
1. Observed behaviour (user research)
2. **Domain (terminology, concepts, bounded contexts)** ← This skill
3. User needs (opportunities)
4. Product strategy (business outcomes)
5. Conceptual model (objects, relationships)
6. Interaction flow (structure, affordances)
7. Surface (visual design)

**Why Layer 2 matters:**

Domain mapping is the **raw material** a conceptual model is built from. Without systematic vocabulary capture:
- Terminology drifts ("pickup" in some places, "collection" in others)
- Same term means different things in different contexts
- Agents guess definitions instead of using canonical ones

`COMPANY-VOCABULARY.md` makes domain knowledge explicit and editable.

---

## Example: COMPANY-VOCABULARY.md

**What gets extracted:**

```markdown
## Core vocabulary

| Term | Definition | Synonyms | Usage context | Source |
|------|------------|----------|---------------|--------|
| order | A trade customer's request for stock, collected at the counter | purchase, request | Trade-facing | Tracker (47 mentions), Figma |
| store | An independent hardware shop using Northline | shop, branch, location | Counter-side | Tracker (89 mentions) |
| pickup | Collecting a ready order at the counter | collection, click and collect | Trade flow | Figma components |

## Terminology conflicts

| Conflict | Options | Decision | Rationale |
|----------|---------|----------|-----------|
| pickup vs collection | pickup, collection, click and collect | **pickup** | Trade customers say "pickup" on the phone |
| store vs branch | store, shop, branch | **store** | "Branch" only makes sense for small chains |

## Bounded contexts

| Term | Context A meaning | Context B meaning | How to handle |
|------|-------------------|-------------------|---------------|
| stock | Units on the shelf (Counter) | Units available to order (Trade) | Say "on the shelf" vs "available" |

## Deprecated terms

| Old term | Use instead | Reason |
|----------|-------------|--------|
| purchase | order | Trade customers don't pay at the time of ordering |
| branch | store | Align with single-store owners |
```

---

## Technical details

**Files:**
- Skill logic: `harness/skills/org-pack-builder/SKILL.md`
- Usage guide: `harness/skills/org-pack-builder/HOWTO.md`
- Extraction engine: `scripts/extract-org-pack-from-mcps.mjs`

**Routing:**
- `harness/ORCHESTRATOR.md` §2: "build org-pack" / "map our domain" → `org-pack-builder`

**Profile integration:**
- Onboarding stores your tools in the profile: `Work tools: docs=notion, tracker=linear, roadmap=linear, chat=slack`
- org-pack-builder checks this list to know which tools are available

**Gitignore:**
- `context/org-pack.local/` is gitignored (real company data never pushed)
- `context/org-pack/` is public (Northline example for reference)

---

## Limitations

### 1. Extraction is a starting point, not ground truth
All extracted content is marked `INFERRED` — review before trusting in production work. Especially:
- Terminology conflict resolution needs human judgment
- Bounded contexts may be incomplete
- Definitions inferred from frequency, not explicit statements

### 2. Quality varies by source structure
- **Good:** Companies with explicit glossaries, structured ticket labels
- **Poor:** Inconsistent terminology, ad-hoc wikis, no design system

### 3. No automatic refresh
Once built, org-pack is static. If company context changes, manually run "refresh org-pack" or edit files directly.

---

## Related skills

- **`ux-pattern`** — uses org-pack for terminology and voice critique
- **`content`** — enforces voice rules from org-pack
- **`design-kickoff`** — uses business context and archetypes from org-pack
- **`figma-token-sync`** — similar extraction pattern (Figma variables → CSS)

---

## See also

- [Understanding Skills](../guides/understanding-skills.md)
- [Onboarding Guide](../guides/onboarding.md)
- [Design System Usage](../guides/design-system-usage.md)
- [What is the Harness](../guides/what-is-the-harness.md)
