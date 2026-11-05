# Context architecture

Moved from `harness/ORCHESTRATOR.md` §9 (background on why context loads
in this order — not needed to handle a request).

This explains **why** this harness loads context in the order it does, using industry-standard vocabulary from prompt engineering and retrieval-augmented generation (RAG) systems.

## Context budget

Every agent conversation has a finite token budget (Claude's context window). Your harness allocates it deliberately:

1. **System instructions** (5–10% of budget) — `AGENTS.md` / `CLAUDE.md` → `ORCHESTRATOR.md` (this file). Front-loaded because the model pays highest attention to the beginning of the context window.
2. **Company/design-system context** (10–15%) — `context/` folder (voice, patterns, archetypes, design tokens, components). Loaded early so all skills operate from the same house ground truth.
3. **Project-specific context** (10–20%) — `projects/<slug>/` folder when a task is active (`brief.md`, `sources.md`, `findings.md`, `decisions.md`). Loaded after company context but before the current request.
4. **Skill instructions** (5–10%) — The matched skill from §2's routing table. Loaded right before execution.
5. **User input** (5%) — The designer's current request. Placed at the end because recency = high attention.
6. **Working space** (50–60%) — Room for the model to generate its response, including tool calls, reasoning, and output.

**Why this order matters:**
- **Beginning** (system instructions, company context) = high attention — the model treats these as foundational rules
- **Middle** (project context, skill instructions) = lower attention but still retrieved when relevant
- **End** (user input) = highest attention — the model focuses on answering this

## Information architecture in context

The `AGENTS.md` → `ORCHESTRATOR.md` pointer pattern exists to optimize attention:
- Claude Code and Cursor auto-load `AGENTS.md` / `CLAUDE.md` at the start of every conversation
- Those files are thin pointers. `CLAUDE.md` is a pointer plus the mandatory first step, because Claude Code skipped the pointer on one-line questions. `AGENTS.md` (about 3 KB) adds the Git and taste-log rules, then says "read `harness/ORCHESTRATOR.md` first, always"
- What loads every turn in Cursor: `AGENTS.md`, `ORCHESTRATOR.md` (about 14 KB), and four always-applied `.cursor/rules/*.mdc` files (about 3.5 KB together). About 20 KB in all, down from about 30 KB. Check with `wc -c AGENTS.md harness/ORCHESTRATOR.md .cursor/rules/*.mdc`
- Facts come from a script, not from long rules. The first step of every chat is `npm run -s harness:context`. It prints the profile (found or missing, at the exact root path), the org pack (example, local, or partial), and one line per project. Rules that need those facts point at its output. The long text moved into `harness/references/session-start.md` and `harness/references/classify-and-log.md`
- This ensures the full orchestration rules (§§0–7) land at the **beginning** of the context window, where attention is highest
- If `ORCHESTRATOR.md` were buried in a folder and loaded mid-conversation, it would fall into the lower-attention middle zone

**Why not load everything at once?**
- Token budget is finite — loading all skills upfront (the full roster × ~500 lines each; run `ls harness/skills | wc -l` for the current count rather than trusting a number here) would crowd out project context and working space
- Routing (§2) selects only the relevant skill(s) per request, keeping the context window lean

## Context selection criteria

When skills load additional context (e.g., `research-agent` reading a Slack thread, `ux-pattern` reading a Figma file via `get_design_context`), they follow these criteria:

- **Relevance** — Does this information help answer the current question?
- **Recency** — Is this the most up-to-date information available? (live MCP queries > cached snapshots)
- **Specificity** — Is this specific enough to be useful, or too generic? (the company archetypes > generic UX principles)
- **Redundancy** — Is this already covered in `brief.md` / `context/`? (don't re-fetch what's already loaded)
- **Authority** — Is this from a reliable source? (`COMPANY-PATTERNS.md` > a random blog post)

## Live sources

Pasted content is not the only input. Connected MCPs (Slack, Figma,
Confluence, Linear, calendar, NotebookLM, Mobbin) let a skill pull live
content. Before saying "only what you paste", check which tools this
session lists.

## Why this matters for your marketing

This vocabulary (context budget, information architecture, attention zones, RAG) is **industry-standard** across prompt engineering, AI agents, and harness engineering. Using these terms in articles/course positions your Design Harness as technically rigorous, not just designer intuition packaged as a repo structure.

**Example framing for an article:**
> "The `AGENTS.md` → `ORCHESTRATOR.md` pointer pattern isn't just tidiness — it's **information architecture for the context window**. By front-loading orchestration rules at the beginning (high-attention zone) and loading skills on-demand (middle zone), the harness optimizes its finite context budget while keeping company-specific ground truth (design tokens, voice, patterns) consistently available."
