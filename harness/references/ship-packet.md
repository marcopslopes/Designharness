# Ship packet

What a share or a public copy checks in the project's `brief.md` before anything moves. Most of it is already in the brief. The `## Ship` section adds only three lines: Review, Exposure, and Decision.

Callers:

- **Internal** — "share this" / "send this to the team" / "push this". `harness/references/git-autopilot.md`. **Advisory:** a gap is said in one line, and the share goes ahead.
- **General** — "publish" / "deploy" / "give me a share URL". `harness/skills/publish-project/SKILL.md`. **A gate:** a gap stops the copy.

Tests, security scans, and dependency ownership stay with engineering. This packet is the product half. `audit` stays the design-system and accessibility half.

## The block

```markdown
## Ship

- **Review:**
- **Exposure:**
- **Decision:** pending
```

Exposure is one of `prototype`, `internal`, `general`. Decision is one of `pending`, `kill`, `pivot`, `persevere`. Review is `YYYY-MM-DD`.

If `## Ship` is absent, add it at the end of the brief. Never overwrite a line that already has a value. Never invent a date.

## What it reads

Read each fact where it lives. Do not copy it into `## Ship`.

| Fact | Where it lives | It counts as missing when |
|---|---|---|
| Hypothesis | `## Why` → **Problem** and **What changes**. Older briefs: `## Case study summary`, else the PRD's "Why are we doing this?" | Empty, `UNKNOWN`, or only a request to build a screen ("I want to build a dashboard view") |
| Success | The Outcome row of `## How we'd know` (`harness/references/measurement-plan.md`). Older briefs: the PRD's primary metric | Empty, or only a delivery step ("ship the screen", "publish the deck"), or only describes the screen |
| Owner | `## Ownership` → **Designer** | Empty, `UNKNOWN`, `unassigned`, `none`, `TBD`, or `—` |
| Review | `## Ship` → **Review**, or a date the designer just named | No date. "Next Thursday" may be written as `YYYY-MM-DD`. A guessed date may not |
| Exposure | `## Ship` → **Exposure**, else the door they just asked for | — |
| Decision | `## Ship` → **Decision** | — |

Success has to name a person and something they do differently, or a measurable change in that behaviour. A metric with an unknown baseline passes.

No `## How we'd know` yet: propose it from the brief and `findings.md` as `measurement-plan.md` § Proposing it says, then read its Outcome row.

## Internal share

Write `internal` into Exposure when it is blank. Then one line before the script runs:

> Sharing \<project\> as internal. \<Owner\> reviews it on \<review\>.

If any fact is missing, the line names them instead, and the share still runs:

> Sharing \<project\> as internal. Not set yet: \<missing facts, comma-separated\>.

A Review date that has passed with Decision still `pending` adds: "Review date was \<date\>. Decision is still pending." The share still runs.

No `audit` line. Internal does not need one.

## General (publish)

Write `general` into Exposure when it is blank, or when it was `internal` and they asked to publish. Saved `prototype` and they asked to publish: `AskQuestion`, "Set exposure to general and publish" / "Keep it as prototype".

**Clear** when every fact above is present, Success passes its test, the Review date is today or later (or Decision is not `pending`), and the picked file has an `audit` PASS. Say one line, then copy:

> Publishing \<file\> as general. Hypothesis: \<Problem\>. \<Owner\> reviews it on \<review\>. Audit: PASS on \<date\>.

**Refuse** otherwise, in one message, with each gap and where to fix it:

- **Hypothesis** — "Write the problem and what changes under Why in the brief."
- **Success** — "Name what a person does differently, in the Outcome row of How we'd know."
- **Owner** — "Designer is \<value\>. Name who reviews the result."
- **Review** — "Add the date you will decide kill, pivot, or persevere, under Ship."
- **Audit** — "No audit PASS on \<file\>. Run audit on it. Publishing waits for PASS."

A file that changed since its PASS: offer a re-run, do not copy (`publish-project`).

No `brief.md`: stop. "This project has no brief, so there is nowhere to check what it's for." Do not create a project.

## Log

One row in the project's `log.md`. No line in `harness/logs/routing-log.md`.

| Date | Request | Intent classified | Chain run | Why |
|---|---|---|---|---|
| YYYY-MM-DD | their words | ship | shared | internal, not set: review |
| YYYY-MM-DD | their words | ship | refused | general, missing: review, audit |
| YYYY-MM-DD | their words | ship | cleared | general, review 2026-11-16 |

## What this does not check

Engineering minimums (tests, security, unowned dependencies). A reminder on the review date.
