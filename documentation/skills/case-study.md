# case-study

<!-- generated-from-skill: do not edit -->

Writes a project's case study once, as content — the eight-chapter story (opening, problem, evidence, options, decision, live prototype, outcome, sources) — into `projects/<slug>/case-study.md`, sourced only from that task folder's `brief.md`, `findings.md` and `decisions.md`, plus the designer's journal entries for the project.

**Triggers:** "case study for this project" · "build the case study" · "tell the story of this project" · "write up how we got here" · "case study of <slug>" · "turn this project into a case study"

<!-- /generated-from-skill -->

Writes your project's story once — eight chapters, every line traced to the project folder — so slides and articles all tell the same story.

## What It Does

Reads `brief.md`, `findings.md` and `decisions.md` in `projects/<slug>/` and writes `projects/<slug>/case-study.md`:

1. Opening — framing, who, intro, RACI
2. Problem / why now
3. Evidence — numbers, voices, tables
4. Options considered, including rejected
5. The decision + why
6. Live prototype — real routes only
7. Outcome / expected change
8. Sources / links

Every chapter ends with a `Source:` line. Chapters the folder can't fill are skipped and listed — never invented.

---

## When to Use

- A project wrapped and you want the story written down
- Before a case-study deck or article, so both say the same thing

### Trigger Phrases
```
"Build the case study for [project]"
"Tell the story of this project"
"Write up how we got here"
```

---

## What Happens Next

After saving, it asks how to show the case study:

- **Slides** → [deck-builder](deck-builder.md) renders `case-study.md` as a deck
- **Prose** → [writing](writing.md) renders it as an article
- **Not now** → the file is enough

Asking for a case-study deck or article when no `case-study.md` exists runs both steps as one plan: case study first, then the format.

---

## Won't Do

- ❌ Build slides or HTML itself
- ❌ Invent quotes, numbers, options or outcomes
- ❌ Package one critique's findings — that's `review-report`
- ❌ Write the brief — that's [design-kickoff](design-kickoff.md)

---

## Related Skills

- [deck-builder](deck-builder.md) - Case study as slides
- [writing](writing.md) - Case study as prose
- [design-kickoff](design-kickoff.md) - The brief, at the start of the project
