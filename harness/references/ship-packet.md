# Ship packet

Six lines on the project's `brief.md`, under `## Ship`. A team share and a public copy both read them before anything moves. The builder is the person those lines have to serve: a complete packet clears in the same turn, and a gap comes back in the same turn with the exact line to fill.

Callers:

- **Internal** — "share this" / "send this to the team" / "push this". `harness/references/git-autopilot.md`.
- **General** — "publish" / "deploy" / "give me a share URL". `harness/skills/publish-project/SKILL.md`.

Prototype is a level on the same block, not a third command. Tests, security scans, and dependency ownership stay with engineering. This packet is the product half. `audit` stays the design-system and accessibility half.

## The block

```markdown
## Ship

- **Hypothesis:**
- **Success:**
- **Owner:**
- **Review:**
- **Exposure:**
- **Decision:** pending
```

Exposure is one of `prototype`, `internal`, `general`. Decision is one of `pending`, `kill`, `pivot`, `persevere`. Review is `YYYY-MM-DD`.

Write derived lines into the brief before refusing, so the next attempt only has to fill the blanks. Never overwrite a line that already has a real value. Never invent a hypothesis, a success line, an owner, or a date.

## Where each line comes from

Look only in this project's `brief.md`, including a PRD written inside it, then a separate PRD file in the same folder if one exists.

| Line | Use this, in order | It counts as missing when |
|---|---|---|
| Hypothesis | The Ship line, else the brief's **Problem**, else the PRD's "Why are we doing this?", else `## Intent` | Every source is empty, `UNKNOWN`, or only a request to build a screen ("I want to build a dashboard view") |
| Success | The Ship line, else the Outcome row of `## How we'd know` (`harness/references/measurement-plan.md`), else the brief's **Goal**, else PRD §6 primary metric, else the PRD's "How will we know it worked?" | Every source is empty, `UNKNOWN`, only a delivery step ("ship the screen", "get it in the build", "launch the feature", "publish the deck"), or only describes the screen ("a wallet home that answers how much, when, and why") |
| Owner | The Ship line, else **Designer** | Empty, or the value is `UNKNOWN`, `unassigned`, `none`, `TBD`, or `—` (any case, any trailing text) |
| Review | The Ship line, else a date the designer just named | No date. "Next Thursday" may be written as `YYYY-MM-DD`. A guessed date may not |
| Exposure | The Ship line, else the door they just asked for | Saved value and the door disagree. See Widening |
| Decision | The Ship line, else `pending` | — |

Try each source in order. A source that is present but fails its test is skipped, not reported. Report the line as missing only when every source fails.

Success has to name a person and something they do differently, or a measurable change in that behavior. A screen, a deck, or a ship date does not pass. A metric with an unknown baseline passes. Write `Baseline unknown.` after it.

Owner is who looks at the result on the review date. Clearance does not wait for that person to reply. The confirm line names them. If the designer does not correct it, the send stands.

## Doors

| They asked | Exposure to write when the line is blank | What may happen after a clear |
|---|---|---|
| Share / send to the team / push | `internal` | The git share script. An `audit` PASS is not required |
| Publish / deploy / share URL | `general` | The copy into `public/`. Requires an `audit` PASS on the picked file |
| Keep it local / prototype cohort, as a correction on one of those doors | `prototype` | Write the block. No copy, no push |

Empty exposure is not a conflict. Write the door's level.

**Narrowing** (saved `general`, they asked to share) updates Exposure to `internal` and continues. The confirm line says the exposure was general and this share is internal. The review date stays.

**Widening** (saved `prototype` and they asked to share or publish, or saved `internal` and they asked to publish) does not change Exposure yet.

- Other lines are also missing: one refusal, and name the exposure conflict in that same message. No buttons.
- The exposure conflict is the only gap: `AskQuestion`, two options, nothing else. Share: "Set exposure to internal and share" / "Keep it as prototype". Publish from prototype: "Set exposure to general and publish" / "Keep it as prototype". Publish from internal: "Set exposure to general and publish" / "Keep it internal". On prototype, write `prototype` and stop. On the wider level, write it and continue.

## Clear

All six lines are filled, Success passes the test above, and today is on or before Review, or Decision is already `kill`, `pivot`, or `persevere`.

Say one line, then run the door:

> Sharing \<project or file\> as \<exposure\>. Hypothesis: \<hypothesis\>. \<Owner\> reviews it on \<review\>. Audit: \<status\>.

Audit status:

- General: `PASS on <date>` (no date on the PASS entry: `PASS`).
- Internal, latest verdict BLOCKED: `BLOCKED — internal share still allowed`.
- Internal, no verdict: `none yet — internal share still allowed`.
- Prototype: `not required`.

Then the caller runs its door. Log `cleared` only after that door succeeds. A script or copy failure is that door's failure line, not a packet refusal.

Prototype clear does not run a door. Log `cleared` with Why `prototype, no copy, no push`, and say nothing was copied or pushed.

## Refuse

One message. Every missing line, each with its next edit:

- **Hypothesis** — "Write what you believe will change, and for whom, under Ship in the brief."
- **Success, blank** — "Name what a person does differently once this is in their hands, under Success."
- **Success, delivery step** — "Success only names a delivery step. Name what a person does differently once this is in their hands."
- **Owner** — "Designer is \<the brief's value, e.g. unassigned\>. Name who reviews the result on the review date."
- **Review** — "Add the date you will decide kill, pivot, or persevere."

General also states a missing or stale `audit` in that same message: "No audit PASS on \<file\>. Run audit on it. Publishing waits for PASS." Publishing a file that changed since its PASS stays the rule already in `publish-project` (offer a re-run, do not copy).

Review date already passed, Decision still `pending`:

> Review date was \<date\> and Decision is still pending. Write kill, pivot, or persevere, or set a new date and say why.

No `brief.md`: stop. "This project has no brief, so there is nowhere to put the ship packet." Do not create a project.

Write the `refused` row in this same turn, then stop.

If `## Ship` is absent, add it at the end of the brief, then fill what you can.

## Log

Append one row to the project's `log.md` table. Do not add a plain match to `harness/logs/routing-log.md`.

| Date | Request | Intent classified | Chain run | Why |
|---|---|---|---|---|
| YYYY-MM-DD | their words | ship | refused | general, missing: review date, success |
| YYYY-MM-DD | their words | ship | cleared | internal, review 2026-11-16 |

Why for a refusal starts with the exposure, then `missing:` and the field names. Why for a clear starts with the exposure, then `review` and the date. Create the table from `projects/_template/log.md` when the file has none.

Before writing a refusal row, read the earlier `ship` / `refused` rows. For each missing field that already appears in one of them, add this sentence to the chat message:

> This has stopped on \<field\> before.

## What this does not check

Engineering minimums (tests, security, unowned dependencies). Time-to-feedback as a dashboard. A reminder on the review date. Those stay out of this file.
