# Northline Sources — global external resource index (example pack)

**Human guide:** `documentation/guides/company-sources.md` — when to add links, how agents open them, Strategy vs BUSINESS facts, and **per-project** `projects/<slug>/sources.md`.

Team-wide **link catalog** for living sources outside this repo (Google Docs,
Confluence, Notion, FigJam, Miro, decks, Drive). **Links are canonical**; this file
is the map. Do **not** paste full document bodies here.

**Confidence: EXAMPLE — empty on purpose. Add your own rows as you go; keep the row shape below.**

---

## What belongs here

- Cross-squad / company / multi-initiative — not one ticket's PRD
- Agents should rediscover it later without you pasting the URL again
- Any stable URL: Google Docs/Sheets/Slides, Confluence, Notion, FigJam/Figma, Miro, Drive folders

## What does not belong here

- Project-specific briefs → `projects/<slug>/sources.md`
- Personal notes → `designer-context.local/`
- Evergreen *facts* → distill into `COMPANY-BUSINESS.md` / `COMPANY-VOICE.md` / `COMPANY-ARCHETYPES.md` instead
- Secrets / private 1:1 material

## Row shape

| Title | Kind | When to open | Link | Indexed |
|-------|------|--------------|------|---------|
| Human title | Strategy / Content / Research / DS / Other | 1 line for agents | full URL | YYYY-MM-DD |

---

## Strategy / planning

*(Add your quarterly planning / OKR Docs here.)*

## Content

*(Add your style guide / vocabulary Docs here.)*

## Research

*(Add global research decks / study hubs here.)*

## Design system

*(Add team-wide DS OKRs / RFCs / FigJam hubs here.)*

## Other

*(Catch-all for global links that don't fit the sections above.)*

---

## Destinations

Where skills file pages they write (`docs-brief`, `research-agent`,
`design-kickoff` Step 2.5) when the designer names a shared location once.
Any docs tool — Confluence, Notion, or Google Docs.

| Destination | Tool | URL | Use for |
|---|---|---|---|
| Design team — briefs | *(example)* | *(paste the folder or parent page URL)* | Status and decision briefs |

---

## Roadmap boards

Read by `harness/skills/workload-agent/references/roadmap-boards.md`. The
example below is Jira Product Discovery; on Linear list projects or
initiatives, on Notion the roadmap database URL, on GitHub the Projects
boards. Leave this section out if your company has no roadmap tool — the
roadmap leg is skipped, not an error.

**Last verified:** *(example — replace with your date)*

| Project | Key | Ideas view |
|---|---|---|
| Core Product | `CORE` | `/jira/polaris/projects/CORE/ideas` |
| Payments Domain | `PAY` | `/jira/polaris/projects/PAY/ideas` |
| Consumer Domain | `CON` | `/jira/polaris/projects/CON/ideas` |
| Provider Growth | `GROW` | `/jira/polaris/projects/GROW/ideas` |

**Domain orientation:** `CORE` and `GROW` are store-side only, `PAY` is
mixed, `CON` is the trade-customer side only.
