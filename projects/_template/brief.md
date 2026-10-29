# Brief — <task-slug>

<!--
Truth block — the index the next session reads. Add a row only when a
source says it. Never invent one. An empty list means not recorded.
status: exploring (nothing built) | draft (built, not approved) | approved | closed
assumptions: { text, source } — believed, not proven. source: none if unsourced
unknowns: a string, or { text, owner, blocks } — owner and blocks optional. explicitly missing
evidence: { text, source }
parked: a string — a direction that was not approved
-->

```yaml
status: exploring
assumptions: []
unknowns: []
evidence: []
parked: []
```

- **Feature/surface:**
- **Platform:** iOS / Android / web
- **Stage:** discovery / existing design / pre-handoff
- **Sources:** (Figma link, Jira ticket, Confluence page — or "none, starting from zero")
- **Requested by:**
- **Date opened:** YYYY-MM-DD

## Ownership (structured — feeds the Team Gallery, `#/gallery`)

- **Designer:** <Full name, or "UNKNOWN — flagged, see note below" if it genuinely can't be determined from this project's own content. Never guess.>
- **Squad:** <Squad name from `COMPANY-SQUADS.md` (org-pack), if known — leave blank if the squad can't be cleanly cross-referenced. Don't invent a squad name that isn't a clean directory match.>
- **Gallery:** visible <or `hidden` — set to `hidden` to keep this project out of the Team Gallery even though it exists in the repo (e.g. early-stage/exploratory work not ready for a team-wide view). Defaults to visible once Designer is set; projects with no resolved Designer never appear in the gallery regardless of this flag.>

*First time this designer becomes gallery-eligible:* `task-intake` /
`design-kickoff` run `harness/references/gallery-card-enrichment.md` and
fill `title`, `focusAreas`, and `avatarUrl` on their `GalleryDesigner`
entry (Atlassian + Confluence; avatar under `public/design-harness/avatars/`).
Never invent — if enrichment fails, they stay unlisted until sources exist.
Audit Step 3.5 is the safety net.

*If Designer is UNKNOWN:* add one line here stating why ownership can't be
determined (e.g. "Requested by" field only says 'designer', no name given
anywhere in this folder) — this is what makes the gap visible to a human,
instead of it only being known in a chat transcript that won't survive.

## Case study summary (feeds the Team Gallery — keep this short and clean)

These two lines are the **only** case-study copy the Team Gallery reads.
Status is the truth block above, not a third line here. Keep them short —
no raw rationale, no named-individual gossip, nothing that belongs in
`findings.md` / `decisions.md` / `log.md`. If you can't fill them from the
rest of this brief, the brief needs better structure before this project
is gallery-ready.

- **Problem:** <One sentence — the problem this project addresses, for whom.>
- **Goal:** <One sentence — what this project is trying to achieve/prove.>

## Intent

<What the designer actually asked for, in their words.>

## Scope

<What's in / out for this task. Update as scope shifts — don't rewrite history, append a dated note instead.>

## Constraints

<Anything that limits the approach: deadline, platform parity, existing pattern to match, etc.>
