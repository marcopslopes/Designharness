# Sources — Clients list redesign

The project's **index**. Agents read this first to learn what the project
holds, and open a file only when the task needs it. Two tables: outside
links, and the project's own files in `raw/` and `docs/`.

**Links are canonical** — do not paste full article/Doc bodies here.
Synthesis and skill output still go in `findings.md`.

**Append rows, never delete prior ones** (strike or note “retired” in
Notes if a link goes bad).

## When to add a row

- Designer pastes an article, Doc, deck, competitor page, FigJam, etc.
  **for this project** → a link row
- A skill run cites a durable external URL worth finding again → a link row
- Raw material is saved to `raw/`, or a page is written in `docs/` → a file row
- Not global/team-wide → those go in `COMPANY-SOURCES.md` (org-pack)
- Not personal-only → those go in `designer-context.local/`

## Links

| Title | Kind | Why it matters | Link | Indexed |
|-------|------|----------------|------|---------|
| *(example)* Referral competitor article | Article | Pattern reference for entry points | https://… | YYYY-MM-DD |

<!-- Add rows below. Kind examples: Article · Competitor · Doc · FigJam · Miro · Confluence · Jira · Other -->

## Files

| File | What it is | Supports | Indexed |
|------|------------|----------|---------|
| `docs/discovery/client-segments-flow.mermaid` | Flow: a relationship manager opens Clients, filters by segment, checks in with dormant clients | The segment filter and empty-state screens | 2026-11-01 |

<!-- One row per file in raw/ or docs/. Gitignored files still get a row, so the index says they exist. -->
