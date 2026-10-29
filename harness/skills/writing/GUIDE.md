# Writing — how it works

The **writing** skill turns a real project into long-form prose — an
article, essay, case-study writeup, or short LinkedIn/blog post — without
the usual AI defaults: hedge stacks, empty superlatives, invented metrics,
and a voice that could belong to anyone.

It's a **standalone, on-demand capability** for prose only. It is not the
UI-copy skill (`content`) and not the slides skill (`deck-builder`). Every
claim has to trace to a dated source in `projects/<slug>/` (or a linked
Atlassian/Slack citation already in that folder). Every draft comes back
labeled **DRAFT** and waits for a human edit pass.

This doc is the human-readable reference. Agents load the full protocol
from `harness/skills/writing/SKILL.md`.

---

## Quick reference

| What | Path |
|------|------|
| Agent skill (full protocol) | `harness/skills/writing/SKILL.md` |
| Anti-slop checklist (mechanical pass, prose-specific) | `harness/skills/writing/references/slop-patterns.md` |
| Shared anti-AI-writing checklist (also used by PRDs/briefs/tickets/decks) | [`harness/references/anti-ai-writing.md`](../../references/anti-ai-writing.md) |
| Voice-DNA extraction template | `harness/skills/writing/references/voice-dna-template.md` |
| Personal voice profile (gitignored) | `designer-context.local/writing-voice-dna.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 (`writing` row) |
| Case-study story (shared with decks) | `projects/<slug>/case-study.md`, written by `case-study` — [`case-study`](../case-study/GUIDE.md) |
| Sibling skills (different jobs) | `content` (UI copy — [`content`](../content/GUIDE.md)) · `deck-builder` (slides) · `review-report` (HTML critique article — [`review-report`](../review-report/GUIDE.md)) |

---

## What problem it solves

Three, actually:

1. **"Write this up" had no home.** Long-form prose is not product UI copy
   (`content`) and not a deck (`deck-builder`). Without a dedicated skill,
   the agent freestyled — and freestyle prose from a model defaults to
   generic, hedge-heavy, superlative-stacked register.
2. **Plausible claims are not proof.** A readable essay that invents a
   metric, a quote, or a "typical" outcome is worse than a thin but honest
   one. This skill only narrates what already lives in the task folder.
3. **"Don't sound like AI" and "sound like me" are different jobs.**
   Stripping machine tells (anti-slop) is global. Matching a specific
   designer's structural habits (voice DNA) is personal and optional. The
   skill separates them on purpose so a fluent-human draft is the default,
   and personal-voice matching only runs when asked for.

---

## What it does NOT do

- **Does not write UI / product copy.** Buttons, banners, toasts, error
  states → `content`.
- **Does not build slide decks.** Even a case-study-shaped ask that wants
  slides → `deck-builder`. Same evidence discipline; different format.
- **Does not package a critique as an HTML report.** Findings from a live
  / Figma / flow review → `review-report`. Case-study prose stays here.
- **Does not invent findings.** It composes and narrates what
  `findings.md` / `log.md` / `decisions.md` (or already-cited sources)
  already contain. No new research sweep, no padded "typical" outcomes.
- **Does not publish or declare finished.** Output is always labeled
  DRAFT. The human edit pass is mandatory, not optional polish.
- **Does not treat "sound like me" as the default.** Default target is
  fluent human prose. Personal voice DNA only when the designer asks for
  it — and never by copying fluency artifacts (dropped articles, dictated
  run-ons) as if they were style.
- **Does not import a named third-party writing skill wholesale.** Learn
  patterns, rewrite them into this repo's own files, credit the source.
  Never route a task through someone else's licensed skill file under
  their name as if it were ours.

---

## When it runs

### 1. You ask directly (standalone)

Use plain language in Cursor. No slash command required.

```
write an article about how we got here on checkout
draft a LinkedIn post about the settings IA work
turn this into an essay — my take on AI critique loops
write a case-study writeup for the calendar experiment
write up how we decided the four-tab navigation
run anti-slop on this article
use the writing skill on this — how will it read after the pass
```

The orchestrator routes these to `writing` per `harness/ORCHESTRATOR.md`
§2 — a single-skill, on-demand row. It does **not** auto-fire after
`audit`, `deck-builder`, or a build.

**Existing article:** paste the piece and ask for the anti-slop pass.
The agent shows what it flagged, then a DRAFT rewrite. The paste is
the source — it will not invent a new argument or pull a task folder
unless you name one.

### 2. Redirects (wrong skill)

| You said something like… | Goes to instead |
|--------------------------|-----------------|
| "button copy / error message / banner text" | `content` |
| "turn this into a deck / slides / presentation" | `deck-builder` |
| "critique this screen / audit before share" | `audit` / critique path |

---

## The three modes (shared machinery, different shape)

Every mode shares evidence-only, anti-slop, DRAFT labeling, and voice
rules. They differ only in narrative structure:

| Mode | Shape | When |
|------|-------|------|
| **Essay / opinion** | Thesis → evidence → what changed → caveat | "my take on…", "how I think about…" |
| **Case-study writeup** | Problem → evidence → options → decision → outcome → what's next (renders `case-study.md` from `case-study` — same story as the case-study deck) | "write up how we got here", "case study" |
| **Short-form / social** | Hook-first, one idea, no chapter arc | LinkedIn-length, short post |
| **Existing-article pass** | Flagged-tells table + DRAFT rewrite of the paste | "run anti-slop on this", "how will this read after the pass" |

---

## The workflow (Steps 0–5)

### Step 0 — Scope the piece

Batched in one `AskQuestion` if anything is missing:

1. **Format/mode** — essay / case-study / short-form (infer when obvious)
2. **Anchor project(s)** — which `projects/<slug>/` is the evidence from?
3. **Audience** — internal vs external vs personal notes (what to redact)
4. **Length** — full article, short post, LinkedIn-length

**Step 0a — name the actual reader**, not just the audience category.
"External" tells you what to redact; it does not tell you how to open.
Who, concretely? What they already believe? What makes them bail?

### Step 1 — Voice anchor

Two different targets — pick one:

| Target | When | What runs |
|--------|------|-----------|
| **Fluent human** (default) | Always, unless told otherwise | Anti-slop + plain default register |
| **Sound like me specifically** | Only when explicitly asked | Read / build `designer-context.local/writing-voice-dna.md` from samples (1a) or a short interview (1b) |

Never mistake language-fluency artifacts for personal style. After the
first full draft of a personal-voice piece, ask **"Does this sound like
you?"** and fold the answer back into the DNA file.

### Step 2 — Evidence gathering

Read the anchor project's `brief.md`, `findings.md`, `log.md`,
`decisions.md` in full. Every stat, quote, or timeline claim must point
at a real dated line. If it can't → cut it or mark
`[UNVERIFIED — confirm before publishing]`. External audience: strip
ticket keys, Slack permalinks, and named colleagues unless told to keep
them.

### Step 2.5 — Propose structure, wait for go (essay / case-study only)

Before drafting the full piece:

```
Title options: [2-3]
Abstract: [2-3 sentences — what this piece argues or shows]
Outline: [section list, one line each]
```

Stop until the designer approves or edits. Skip for short-form/social.
Unclear brief → ask; do not fill gaps with a plausible-sounding guess.

### Step 3 — Draft, then anti-slop pass

1. Write the **opening alone** first; check it against the named reader
   and the Openings category in the voice DNA / template.
2. Write the rest.
3. Run the whole draft against every rule in
   `references/slop-patterns.md` **and**
   [`harness/references/anti-ai-writing.md`](../../references/anti-ai-writing.md)
   — mechanical, not optional judgment. Rewrite matches; don't soften
   them.

That checklist covers banned structures and vocabulary, human patterns
to actively use, fake specificity, structural tells, **fix-priority
tiers** (credibility killers → obvious tells → polish), and an
**overcorrection guardrail** (don't add fake first-person, manufactured
stakes, or invented specifics while "humanizing"). Shared tells also
include shallow -ing clauses, false from-X-to-Y ranges, knowledge-cutoff
guesses, heading restated below itself, unraised objections,
announce-then-state, clipped endings, chatbot leftover, formulaic
sayings, performed candor, and unused rejected alternatives (keep real
options in `decisions.md` / debate). Missing-actor and "current
behavior only" checks live on `design-handoff`, not on essays.

### Step 4 — Output format

Always return:

```
# [Title]

*Draft — needs your edit pass before publishing.*

[piece body]

---
**Sources used:** [projects/<slug>/ files + any external links claims traced to]
**Anti-slop pass:** run against references/slop-patterns.md
**Still needs:** [UNVERIFIED items, or sections the designer should rewrite]
```

### Step 5 — Log

If anchored to a `projects/<slug>/`: append one line to that task's
`log.md`, naming the file written. Save under `projects/<slug>/artifacts/` unless the
designer names another path.

---

## Anti-slop vs voice DNA — two passes, not one

| Pass | File | Job |
|------|------|-----|
| **Anti-slop** | `references/slop-patterns.md` | Catch machine tells that hold across writers — banned structures, empty hype words, fake specificity, uniform rhythm |
| **Voice DNA** | `designer-context.local/writing-voice-dna.md` | Match *this* designer's openings, closings, punctuation, stance habits — personal, gitignored, optional |

A draft can pass every anti-slop check and still not sound like you.
That's expected. Do both when personal voice is the goal; do anti-slop
alone for the default fluent-human target.

---

## Guardrails (what the agent will not do)

- Invent a metric, quote, date, or "typical" outcome to make a point land
- Present output as publish-ready (always DRAFT)
- Write UI copy or slide decks under this skill — redirect instead
- Skip the anti-slop pass
- Skip the structure proposal (Step 2.5) on essay / case-study mode
- Default to "sound like me" when the ask was only "don't sound like AI"
- Copy fluency mistakes from samples as if they were voice
- Add fake first-person, manufactured stakes, invented contrarianism, or
  fabricated specifics during a "humanize" rewrite
- Route writing tasks through a third-party named skill file wholesale

---

## Example output — structure gate (waiting on go)

```
Title options:
1. We stopped fixing UI from vibes
2. Logs before polish — what checkout taught us
3. The critique that actually stuck

Abstract:
We kept shipping checkout tweaks that looked fine in Figma and failed in
prod. The change that stuck was reading the evidence folder before any
visual pass — and turning each miss into a permanent harness rule.

Outline:
- The miss that looked "fine"
- What the logs actually said
- Options we considered
- The decision (and what we cut)
- What the harness remembers now

Nothing gets drafted until you pick / edit this.
```

## Example output — draft returned

```
# Logs before polish — what checkout taught us

*Draft — needs your edit pass before publishing.*

[body…]

---
**Sources used:** projects/checkout/findings.md, projects/checkout/decisions.md,
projects/checkout/log.md
**Anti-slop pass:** run against references/slop-patterns.md
**Still needs:** outcome metric in §4 is [UNVERIFIED — confirm before publishing]
```

---

## Writing vs `content` vs `deck-builder`

| | **writing** | **content** | **deck-builder** |
|---|---|---|---|
| **Question** | How do we tell this story in prose? | What should this UI say? | How do we tell this story in slides? |
| **Evidence** | `projects/<slug>/` dated sources | the company content rules + product context | Same task-folder evidence as writing |
| **Anti-slop / DRAFT** | Yes — mechanical pass + DRAFT label | Brand/voice rules for UI microcopy | Deck QA; different format |
| **Structure gate** | Yes (essay / case-study) | N/A | Template / outline for deck type |
| **Fires automatically?** | Never | Never | Never |

Same project can feed a written case study **and** a deck — reuse the
shared case-study arc so both tell the same story.

---

## Related reading

| Doc | Why |
|-----|-----|
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | How skills auto-trigger and chain; where `writing` sits in the roster |
| [`build-a-skill.md`](../../../documentation/maintainers/build-a-skill.md) | If you're extending writing or adding a related skill |
| [`designer-context-local.md`](../../../documentation/guides/designer-context-local.md) | Where `writing-voice-dna.md` lives and why it's gitignored |
| [`docs-freshness.md`](../../../documentation/maintainers/docs-freshness.md) | When overview docs need a refresh after skill changes |
| `harness/skills/writing/SKILL.md` | Full agent protocol |
| `harness/skills/writing/references/slop-patterns.md` | The mechanical anti-slop checklist (prose-specific rhythm/structure rules) |
| [`harness/references/anti-ai-writing.md`](../../references/anti-ai-writing.md) | Shared anti-AI checklist for stakeholder docs and this skill — also run by `design-kickoff`, `confluence-brief`, `ticket-create`, `research-agent`, `deck-builder`, `review-report`, `critique-prep`, `design-handoff` |
