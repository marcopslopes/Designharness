# Case study — how it works

The **case-study** skill writes a project's story **once**, as content,
into `projects/<slug>/case-study.md`. Slides (`deck-builder`) and a prose
article (`writing`) both read that file, so every format tells the same
story.

Agents load
[`harness/skills/case-study/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/case-study/SKILL.md` |
| Chapters + file shape | `harness/skills/case-study/references/chapters.md` |
| Output | `projects/<slug>/case-study.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Distinct from | `deck-builder` (slides), `writing` (prose), `review-report` (one critique's findings), `design-kickoff` (the brief) |

---

## What problem it solves

The case study used to live inside `deck-builder`'s slide template, and
`writing` copied the same arc for prose. Two places held one story. Now
the story is one file, and the formats only decide how it looks.

The brief is the start of a project. The case study is the end: the frame
comes from `brief.md`, the evidence from `findings.md`, the call from
`decisions.md`.

---

## What it does NOT do

- Does **not** build slides or HTML — that is `deck-builder`
- Does **not** write the prose article — that is `writing`
- Does **not** package a critique — that is `review-report`
- Does **not** invent quotes, numbers, options or outcomes; empty chapters are skipped and listed
- Does **not** auto-run a format after saving — it offers one

---

## What you say

- "Build the case study for this project"
- "Tell the story of the checkout project"
- "Write up how we got here"
- "Case study of account-settings"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Project wrapped, you want the story down | "Build the case study for <project>" |
| You want slides straight away | "Make a case study deck" → `case-study` then `deck-builder` (one plan) |
| You want an article | "Write the case study as an article" → `case-study` then `writing` |
| You want one review written up | "HTML report of these findings" → `review-report` |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 79.

---

## The eight chapters

1. Opening — framing, who, intro, RACI
2. Problem / why now
3. Evidence — numbers, voices, tables
4. Options considered, including rejected
5. The decision + why
6. Live prototype — real routes only
7. Outcome / expected change
8. Sources / links

Each chapter ends with a `Source:` line. A project with only a brief gives
a short case study, with most chapters under **Skipped**.

---

## Related

- Slides: `harness/skills/deck-builder/SKILL.md`
- Prose: [`writing`](../writing/GUIDE.md)
- Critique report: [`review-report`](../review-report/GUIDE.md)
