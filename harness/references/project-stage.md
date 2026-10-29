# Project stage line

One line that says where a project stands, worked out from its folder, shown
before task-scoped work starts. It is the cheapest correction the harness
has: if the stage is wrong, the designer fixes it in one sentence before any
skill runs.

**Read-only.** The stage is derived every time, never stored. There is no
`Stage:` field to keep in sync — `brief.md`'s truth-block `status` (§2b) stays the only
hand-written state.

## When to show it

- The first task-scoped reply in a session (any ask that resolves to a
  `projects/<slug>/`).
- Every "continue / pick up / where were we on X" ask, followed by the next
  step (§5).
- When this turn's work moves the project to a new stage.

Not on every turn after that. Not for asks with no project folder.

## The line

```
Project <slug> · stage <stage> (<evidence>) · <what runs now>
```

Examples:

```
Project clients-list-redesign · stage reviewing (3 screens, last findings 2026-09-02 audit) · running ui-agent
Project account-settings · stage building (brief APPROVED, 4 screens, no findings yet) · running ui-agent + design-system
Project checkout · stage kickoff (brief DRAFT, PRD awaiting gate) · resuming design-kickoff Step 3
```

Evidence is the one or two facts that decided the stage, not a file listing.
It sits above the routing line from §2f when both show.

## Where to look

Project paperwork may be in `projects.local/<slug>/` (real work) or
`projects/<slug>/` (legacy and public examples); screens are always in
`projects/<slug>/screens/` (see `projects/README.md`). Read both.

## Working out the stage

The template copies every file into a new folder, so **a file only counts
once it has real content** — not just the template heading, placeholder text
(`<task-slug>`, `YYYY-MM-DD`, bracket fields) or entries inside an HTML
comment.

Walk the list top to bottom; the **last** stage whose evidence is present
wins.

| Stage | Evidence |
|---|---|
| `kickoff` | truth-block `status` is `exploring` or `draft` (§2b decides what to resume) |
| `framed` | truth-block `status` is `approved` (or a gate approval is in `decisions.md`) |
| `modelling` | `conceptual-model.md`, `breadboard.md` or `strategy.md` has real content |
| `building` | At least one `*Page.tsx` anywhere under `screens/` (sub-folders like `desktop/` count) |
| `reviewing` | The newest `findings.md` entry is from `audit`, `ux-pattern`, `content`, `figma-ux-audit`, `live-page-review` or `synthetic-user-testing` |
| `handoff` | `handoff-spec.md`, or a `design-handoff` entry in `findings.md` (`handoff.md` is a `session-handoff` note and `artifacts/decks/` holds case studies — neither counts) |
| `testing` | `testing/` has a test plan or results |
| `closed` | A `design-retrospective` entry in `findings.md` |

Legacy folders with no truth block: an approved-looking brief with
screens counts as `building`; placeholder text counts as `kickoff` (§2b).

If two signals disagree (screens exist but `status` is `draft`), show
the later stage and name the gap in the evidence — the §2b bookkeeping rule
decides what to fix.

## What the stage does not do

- **It never forces the arc.** The designer's ask outranks the stage: a
  critique on a `framed` project runs the critique. Offer the next stage in
  one line only on a "continue" ask.
- **It never gates.** It is a disclosure, like §2f medium confidence — not
  a question and not a block.
- **It never replaces §2b.** `kickoff` hands straight to §2b's resume rules.
