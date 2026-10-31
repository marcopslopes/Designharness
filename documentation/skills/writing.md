# writing

<!-- generated-from-skill: do not edit -->

Long-form prose writing assistant — articles, essays, case-study writeups, LinkedIn/blog posts, "how I work" pieces.

**Triggers:** "write an article" · "write a blog post" · "turn this into an essay" · "write up how we got here" · "draft a LinkedIn post" · "write a case-study writeup" · "run anti-slop on this" · "use the writing skill on this article" · "how will this read after the anti-ai pass"

<!-- /generated-from-skill -->

Long-form prose — articles, essays, case-study writeups, short posts —
with a mechanical anti-slop pass. Always a **DRAFT**.

## What it does

Turns real evidence into prose, or runs the anti-AI checklist on a
piece you already wrote.

- New piece: claims come from `projects/<slug>/` (or a source already
  cited there). No invented metrics or quotes.
- Existing article: paste the text and ask for the pass. You get a
  short list of what was flagged, then a DRAFT rewrite. The paste is
  the source.
- Output is always labeled **DRAFT** until you edit it.

Not UI copy (`content`). Not slides (`deck-builder`). Not an HTML
critique report (`review-report`).

## When to use

```
"Write an article about how we got here on checkout"
"Draft a LinkedIn post about the settings IA work"
"Write a case-study writeup for the calendar experiment"
"Run anti-slop on this article"
"Use the writing skill on this — how will it read after the pass"
```

Not this skill:

- Button / banner / error copy → `content`
- "Turn this into a deck" → `deck-builder`
- "HTML report of these findings" → `review-report`

## Modes

| Mode | Shape |
|------|--------|
| Essay / opinion | Thesis → evidence → what changed → caveat |
| Case-study writeup | Same arc as a case-study deck, in prose |
| Short-form / social | One idea, hook first |
| Existing-article pass | Flagged tells + DRAFT rewrite of the paste |

## What the anti-slop pass checks

Shared file: `harness/references/anti-ai-writing.md` (also used on
PRDs, briefs, tickets, decks). Extra prose rules:
`harness/skills/writing/references/slop-patterns.md`.

Typical flags: not-X-but-Y, announce-then-state, colon reveals,
formulaic sayings, heading restated below itself, shallow -ing
clauses, chatbot leftover, performed candor.

It will **not** flatten a deliberate repeated beat, or strip company /
product / named proof you actually used.

Eng specs have two extra checks that do **not** run on essays:
missing actor, and "describe current behavior" (`design-handoff`).

## Related

- Private HOWTO: `harness/skills/writing/GUIDE.md`
- [content](content.md) — UI copy
- [deck-builder](deck-builder.md) — slides
- [review-report](review-report.md) — critique HTML report
- [design-handoff](design-handoff.md) — eng spec (own prose slivers)
