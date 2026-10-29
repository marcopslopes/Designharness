# ux-review

Runs a multi-persona UX review of a live URL, a local HTML file, a screenshot,
or a Figma frame, and writes one scored report.

## What It Does

Five reviewers look at the same page in parallel:

- A configurable target user
- A mobile, low-tech user
- An NNG heuristics expert
- A UI quality and brand reviewer
- A jobs-to-be-done reviewer

The report combines them: a UX health score, a cognitive walkthrough, a
pattern gap analysis, a priority matrix, and the top 5 fixes.

---

## When to Use

Use `ux-review` when you want a broad outside-in read of a page and you name
the skill directly:

```
"Run ux-review on https://example.com/pricing"
"ux-review ./prototype.html"
```

It is not in the routing table yet, so plain requests like "review this
flow" go to `ux-pattern`, and "review this live page" goes to
`live-page-review`. See [KNOWN-ISSUES.md](../../KNOWN-ISSUES.md).

| Use instead | When |
|---|---|
| `ux-pattern` | Critique of your own flow against your product's patterns |
| `live-page-review` | Clicking through a live or local page and reviewing what happens |
| `audit` | Design system, accessibility, and copy checks before sharing |

---

## Requirements

Live URLs and local HTML need Python with Playwright and Chromium (about
500 MB, one time). The skill checks for it first and prints the install
commands if it's missing. Screenshots and Figma frames don't need it.

---

## Output

A Markdown report named after the page, with the score, each persona's
findings, and the prioritised fixes.

**Source:** [`harness/skills/ux-review/SKILL.md`](../../harness/skills/ux-review/SKILL.md)
