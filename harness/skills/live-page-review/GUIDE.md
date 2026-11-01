# Live page review — how it works

The **live-page-review** skill captures a **live or local URL** (screenshot,
DOM, accessibility tree, optional click-through) and then hands that
evidence to the skill that already owns the judgment.

Agents load
[`harness/skills/live-page-review/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/live-page-review/SKILL.md` |
| Capture script | `scripts/capture-page.mjs` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Distinct from | Figma critique, Design Harness `audit` share gate, git `interface-change-review` |

---

## What problem it solves

You want to review **what is actually on a page** — production, localhost
Design Harness, or a competitor URL — including clicking through a flow, not
guessing from a screenshot or from source alone.

---

## What it does NOT do

- Does **not** review Figma — use design-critique / `figma-ux-audit`
- Does **not** replace pre-share `audit` (no PASS/BLOCK from capture alone)
- Does **not** house-critique a competitor — it captures, then
  `competitor-scan`
- Does **not** use Playwright MCP or add a fifth onboarding MCP (agent persona runs on a test link are `test-this`, which may use it)
- Does **not** install Chromium for you — one-time `npx playwright install chromium` if capture is needed
- Does **not** invent a 0–100 score or five parallel personas
- Does **not** package the critique as HTML — after findings, ask for `review-report` if you want a scrollable report

---

## What you say

- "Review this live page: https://…"
- "Review http://localhost:3002/#/playground/invite-friends"
- "Click through checkout on this URL"
- "Capture this local prototype and review a11y"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Our production | "Review this live referrals landing — it's shipping" |
| Local Design Harness | "Review localhost:3002 this playground route — click the Notifications tab" |
| Competitor | "Review how Airbnb does its waitlist on this URL" (facts, not House audit) |
| Chromium missing | Capture skips; Figma or a screenshot still works |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 72.

---

## Modes

| Mode | What happens |
|------|----------------|
| **One-shot** (default) | One URL, one device, one capture pack |
| **Click-through** | Named steps in **one** browser session (Continue → Pay → …) |

Device defaults: iPhone 14 on phone product surfaces, Desktop Chrome on dashboards.

---

## One-time browser install

```bash
npx playwright install chromium
```

Same Playwright dependency the repo already uses for prototype export.
Not a new MCP.
