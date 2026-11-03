# Measurement plan

How a project says it will know it worked. Kickoff proposes it from the research it already did, the designer corrects it, and everything after reads it. It lives in the project's `brief.md` under `## How we'd know`.

Readers:

- `harness/references/ship-packet.md` — Success comes from the Outcome row.
- `harness/skills/usability-test-guide/SKILL.md` and `research-agent`'s test plan — the UX rows become tasks and success criteria.
- `harness/skills/case-study/references/chapters.md` chapter 7 — expected, then measured.
- `harness/skills/okr-goal-setting/SKILL.md` — starts from this table when it exists.

## The block

```markdown
## How we'd know

| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| Outcome | | | | |
| UX | | | | |
| Guardrail | | | | |

Status: proposed
```

Status is `proposed` until the designer edits or confirms a row, then `agreed`. A later skill that reads a `proposed` plan says so in one clause ("from the proposed plan") and continues.

## Rows

- **Outcome** — one row. What a person does differently, or the business change that follows from it. The same idea as the why, made countable.
- **UX** — two or three rows a prototype test can measure before anything ships: task success on a named task, time on that task, SEQ after it. Each task comes from a job story or from the why. No job stories: write the task from the why.
- **Guardrail** — one or two rows that must not get worse.

Skip a metric that could improve by making the experience worse: time on screen, raw clicks, page views.

## Measured by

One of these, exactly:

| Label | When |
|---|---|
| `tracked — <source, date>` | A number for this metric appeared in the research this project already did, with a link or a message and a date |
| `prototype test` | Measurable in a usability session on the prototype |
| `needs instrumentation` | Nothing found records it. Say what would: an analytics event, a support-tag count, a data pull |

A number someone quotes in Slack or a doc counts as `tracked`, with that message as the source. Do not search again to fill this table. Use what kickoff's Step 0, a PRD sweep, or `research-agent` already found.

## Baseline and target

- **Baseline:** the tracked number with its date, or `unknown`. Never estimate one.
- **Target:** only a number the designer, the brief, or a source gave. Otherwise `set before the test` for UX rows, and `set once the baseline exists` for the others. A prototype test target is fixed before the session runs, never after.

## Proposing it

Kickoff writes the block with Status `proposed` in the same turn it writes the brief. Then the write message shows the table once, with one line: "Correct any row here or in the brief. Otherwise this is what the test and the ship packet will use." No `AskQuestion`, and no wait. The work continues.

An existing project with no `## How we'd know`: the first reader that needs it (Ship packet, test guide, case study chapter 7) proposes it the same way from the brief and `findings.md`, writes it, and says the same line.

Never invent a metric the research gives no reason for. A row with nothing behind it stays out. An Outcome row with no number says `needs instrumentation`.

## Example (fictional Northline Wallet)

| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| Outcome | Support contacts about balance, payouts or the wallet per 1,000 active wallet users | unknown | set once the baseline exists | needs instrumentation — a support-tag count |
| UX | Participants can say why money is held, unaided | — | set before the test | prototype test |
| UX | Time to answer "when is my next payout, and how much?" | — | set before the test | prototype test |
| Guardrail | Providers who open the wallet at least once a month | about 41% | no drop | tracked — analytics dashboard, 2026-07-07 |
