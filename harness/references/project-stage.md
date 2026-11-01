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
Project <slug> · stage <stage> (<phase>) · <evidence> · <what runs now>
```

Examples:

```
Project clients-list-redesign · stage reviewing (Critique) · 3 screens, last findings 2026-09-02 audit · running ui-agent
Project account-settings · stage building (Make) · brief APPROVED, 4 screens, no findings yet · running ui-agent + design-system
Project checkout · stage kickoff (Kickoff) · brief DRAFT, PRD awaiting gate · resuming design-kickoff Step 3
```

Evidence is the one or two facts that decided the stage, not a file listing.
It sits above the routing line from §2f when both show.

If a connector this step needs is missing, end the line with
`· degraded: <what's missing>`. Never run the step as if it were whole.

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

| Stage | Phase | Evidence | Challenge |
|---|---|---|---|
| `kickoff` | Kickoff | truth-block `status` is `exploring` or `draft` (§2b decides what to resume) | `design-kickoff` Step 0: references, then one why question |
| `framed` | Kickoff | truth-block `status` is `approved` (or a gate approval is in `decisions.md`) | §2h: draft or blocking unknown |
| `modelling` | Explore | `conceptual-model.md`, `breadboard.md` or `strategy.md` has real content | `design-kickoff` § New surface (2 options) and §2h parked. **Draft:** when they pick, "You picked {B}. You give up {what A did better}." The other option goes under `parked` |
| `building` | Make | At least one `*Page.tsx` anywhere under `screens/` (sub-folders like `desktop/` count) | **Draft:** when the screen departs from a pattern in `COMPANY-PATTERNS.md` or the design-system catalog, "This breaks {pattern}. Intentional?" |
| `reviewing` | Critique | The newest `findings.md` entry is from `audit`, `ux-pattern`, `content`, `figma-ux-audit`, `live-page-review` or `synthetic-user-testing` | **Draft:** the critique opens with "Where this fails, and for whom: {one sentence}", then the findings |
| `handoff` | Handoff | `handoff-spec.md`, or a `design-handoff` entry in `findings.md` (`handoff.md` is a `session-handoff` note and `artifacts/decks/` holds case studies — neither counts) | **Draft:** "These {n} states aren't designed yet: {list}." Count states named in the brief or spec that have no screen or prop |
| `testing` | — | `testing/` has a test plan or results | — |
| `closed` | Learn | A `design-retrospective` entry in `findings.md` | **Draft:** when `decisions.md` across projects shows the same override 3 times, "Last 3 projects you overrode {X}. Make it a rule?" Yes saves via `harness/references/designer-preferences.md` |

**Draft** lines are first versions, to try in real use. Say one only when
its blank can be filled from the project's files; never invent {pattern},
{states} or {X}. One challenge per stage, at most once, then follow the
designer. After a draft fires, add a short note to the project's `log.md`:
fired, and whether it helped.

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
