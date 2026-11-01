# Review report — how it works

The **review-report** skill turns a **finished critique** into a
**scrollable HTML article** — a report someone who was not in the chat
can read. It is not slides and not a project case study.

Agents load
[`harness/skills/review-report/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/review-report/SKILL.md` |
| Templates | `harness/skills/review-report/references/templates.md` |
| Article chassis | `harness/skills/review-report/references/report-shell.html` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Distinct from | `deck-builder` (slides), `writing` (case-study / essay prose), `live-page-review` (capture + critique) |

---

## What problem it solves

Written findings live in chat and `findings.md`. You want a **proper
report** — one HTML file with First look, Top 5 fixes, a walkthrough of
the captured path, evidence, and labelled findings — without wrapping a
live review in a case-study story or a slide deck.

---

## What it does NOT do

- Does **not** run the critique — `live-page-review` / `ux-pattern` /
  `content` must already have written `findings.md`
- Does **not** build slides — that is `deck-builder`
- Does **not** write a case-study arc (problem → options → decision →
  outcome) — that is `case-study`, shown as slides by `deck-builder` or
  prose by `writing`
- Does **not** invent findings or a ship decision the folder does not have
- Does **not** auto-run after critique — wait for the offer or an explicit ask
- Does **not** copy the June `ux-review` /100 score or named personas — only the report sections (Top 5, walkthrough, matrix)
- Does **not** turn the HTML into a dashboard — format guardrails in the skill (≤500 lines, skip empty sections)

---

## What you say

- "Turn this critique into a report"
- "HTML report of this review"
- "Proper report of these findings"
- "Write this up as a review report"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| After a live URL review | "Package this as an HTML report" |
| After a Figma / screenshot critique | "HTML report of these findings" |
| After a click-path review | "Write this flow review up as a report" |
| You want slides instead | "Make a stakeholder deck" → `deck-builder` |
| You want the project story | "Build the case study for this project" → `case-study` |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 73.

---

## Templates

| Template | When |
|----------|------|
| **live-page** | Capture pack or live/local URL critique |
| **figma-or-screenshot** | Figma frames or pasted shots |
| **flow** | Named click path / journey |

The chassis is the paper article shell in
[`references/report-shell.html`](references/report-shell.html): same scroll
article, its own sections.

Reports save under `projects/<slug>/artifacts/reports/` (or
`projects.local/<slug>/artifacts/reports/` for real-company work). A report
in `projects/` opens on the project page under **Reviews**, and sits on the
project board with the screens.

---

## Related

- Critique chain: [`live-page-review`](../live-page-review/GUIDE.md)
- Slides: `harness/skills/deck-builder/SKILL.md`
- Case-study prose: [`writing`](../writing/GUIDE.md)
