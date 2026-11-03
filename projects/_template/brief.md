# Brief — <task-slug>

<!--
Each fact has one home. The problem and the goal: Why. Success: the How we'd know
table. The owner: Ownership → Designer. The Team Gallery, the board story, and the
ship packet read them from there. Don't repeat them in another section.
-->

## Why

**Problem:** <One sentence: the problem, and for whom. The gallery and the board show it.>
**For whom:** <Who this is for, in a few words.>
**What changes:** <One sentence: what is different once it works. The gallery shows it as the goal.>

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

## Intent

<What the designer actually asked for, in their words.>

## Scope

<What's in / out for this task. Update as scope shifts — don't rewrite history, append a dated note instead.>

## Constraints

<Anything that limits the approach: deadline, platform parity, existing pattern to match, etc.>

## How we'd know

<!--
Proposed by kickoff from its research. Correct any row.
Contract: harness/references/measurement-plan.md.
Never invent a baseline or a target.
-->

| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| Outcome | | | | |
| UX | | | | |
| Guardrail | | | | |

Status: proposed

## Ship

<!--
Read before a team share or a public copy. Contract: harness/references/ship-packet.md.
The hypothesis is Why, success is the Outcome row, the owner is Designer. Only these
three lines live here. Leave Review blank until a date is named.
-->

- **Review:**
- **Exposure:**
- **Decision:** pending
