# design-handoff

<!-- generated-from-skill: do not edit -->

Composes one developer-ready spec sheet from a design that is ready for engineering.

**Triggers:** "design handoff this design" · "handoff spec" · "developer-ready specifications" · "eng spec from this design" · "handoff this to developers"

<!-- /generated-from-skill -->

One developer-ready spec sheet from a design that is ready for
engineering — not a ticket, not a chat compact, not a critique.

## What it does

Composes a single reviewable spec from the design and whatever the
task folder already has:

1. **Overview** — what the screen does, who it is for
2. **Layout + tokens** — token names from the design system, not guessed hex
3. **Components + states** — what exists in the design; unknowns stay unknown
4. **Responsive + edge cases** — empty, long text, loading, error
5. **Motion + accessibility** — pulled from sibling specs when they exist
6. **Open questions** — anything an engineer would otherwise guess

The file is always **DRAFT — validate before send**. Review it before
anyone on eng uses it.

Overview prose names who acts, and describes what the design does
*now*. History ("this replaced overflow") stays in `decisions.md`,
not in the spec.

## When to use

```
"Design handoff this design"
"Handoff spec for this Figma"
"Write the developer-ready spec"
"Handoff this to developers"
```

Not this skill:

- "Handoff this session / context is full" → `session-handoff`
- "Create a ticket" → `ticket-create`
- "Put this on Confluence / Notion" → `docs-brief`
- "Why did we choose this" → `design-rationale`
- "Accessibility handoff for eng" → `accessibility-decisions`
- "Any thoughts on this Figma?" → written critique (`ux-pattern`)

Bare "handoff this" with no object will ask which of those jobs you mean.

## How it works

1. Drop the Figma URL, name the Design Harness screen, or point at the task.
2. Muse writes `projects/<slug>/handoff-spec.md` (not `handoff.md`).
3. Huge files get a "which screens?" ask — it will not spec the whole file.
4. After the draft, you can file a ticket or a wiki page. Neither happens
   unless you say so. The ticket links the spec; it does not paste it.

## Related

- [ticket-create](ticket-create.md) — lean tracker work order
- [docs-brief](docs-brief.md) — wiki page
- [design-rationale](../guides/understanding-skills.md) — why a decision stuck
- [session-handoff](../guides/understanding-skills.md) — compact this chat
