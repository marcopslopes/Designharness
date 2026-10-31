# deck-builder

<!-- generated-from-skill: do not edit -->

Builds self-contained HTML presentation decks (case study, workshop / options review, stakeholder update) from an existing `projects/<slug>/` task folder or a pasted PRD/brief.

**Triggers:** "build me a presentation / deck / slides about this project" · "case study deck" · "put this PRD into slides" · "make a deck for the workshop / for leadership"

<!-- /generated-from-skill -->

Builds self-contained HTML slide decks from your project folder — dark presentation skin, keyboard navigation, live prototypes embedded on the slides.

## What It Does

Three templates:

| Template | For | Source |
|----------|-----|--------|
| **Case study** | The story of a decision, start to finish | `case-study.md`, written by [case-study](case-study.md) |
| **Workshop / options review** | Deciding between options live with the team | `brief.md`, `findings.md`, `decisions.md` |
| **Stakeholder / status update** | Where things stand, what's next, asks | `brief.md`, `findings.md`, `decisions.md` |

Prototypes are embedded as the real, interactive Design Harness screens (`?embed=1`), never as copied lookalikes.

Decks save to `projects/<slug>/artifacts/decks/`. Publishing a public URL is a separate step ([publish-project](publish-project.md)).

---

## When to Use

### Trigger Phrases
```
"Make a case study deck for [project]"
"Make a workshop deck to review these options"
"Build a stakeholder deck for leadership"
"Put this PRD into slides"
```

A case-study deck needs `case-study.md`. If it isn't there yet, the harness plans both steps: [case-study](case-study.md) first, then the deck.

---

## How It Works

1. Picks the template from your phrasing and confirms it in one line
2. Outlines the slides in chat — the cheap point to catch missing evidence
3. Builds the deck from the existing skin and slide components
4. Screenshots every slide and fixes clipped text, empty embeds and broken layouts before calling it done

---

## Won't Do

- ❌ Write or change the case-study story — that's [case-study](case-study.md)
- ❌ Invent stats, quotes or outcomes the folder doesn't support
- ❌ Copy a prototype's markup instead of embedding the real screen
- ❌ Narrated or timed video decks
- ❌ Publish automatically

---

## Related Skills

- [case-study](case-study.md) - Writes the story the case-study deck shows
- [writing](writing.md) - The same case study as prose
- [publish-project](publish-project.md) - Public URL for a finished deck
- [ui-agent](ui-agent.md) - Builds the prototypes the deck embeds
