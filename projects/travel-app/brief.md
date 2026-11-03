# Brief — travel-app

**Concept project.** A fictional travel app. Places, dates and itineraries shown in screens are made up.

- **Feature/surface:** Itinerary — the first plan, with the three inputs summarized
- **Platform:** iOS
- **Stage:** discovery
- **Sources:** none from the designer. Mobbin references in `sources.md`
- **Requested by:** Marco Paulo Lopes
- **Date opened:** 2026-11-02

## Why

**Problem:** A traveler who knows where they're going still has no itinerary.
**For whom:** Someone who can name a starting point, a destination, and how flexible the dates are, and does not want to build every stop by hand.
**What changes:** Those three facts produce a first itinerary. Creating it manually stays available.

<!--
Truth block — the index the next session reads. Add a row only when a
source says it. Never invent one. An empty list means not recorded.
status: exploring (nothing built) | draft (built, not approved) | approved | closed
assumptions: { text, source } — believed, not proven. source: none if unsourced
unknowns: a string, or { text, owner, blocks } — owner and blocks optional. explicitly missing
evidence: { text, source }
parked: a string — a direction that was not approved
-->

```yaml
status: draft
assumptions:
  - text: "A traveler can name a starting point, a destination, and how flexible the dates are before they want an itinerary."
    source: "Marco Paulo Lopes, 2026-11-02"
  - text: "Those three inputs are enough to generate a useful first itinerary."
    source: none
unknowns: []
evidence:
  - text: "Trip.com's itinerary screen takes a starting point, a destination, and how flexible the trip is, then offers AI Recommendations, with Create Manually beside it."
    source: sources.md
parked:
  - "Plan shaped by a travel profile plus a destination (Polarsteps Travel DNA) — not the chosen why."
  - "AI suggestions on a trip that already exists, as a switch on the trip screen (Vrbo) — not the chosen why."
  - "The ask screen — starting point, destination, how flexible, then AI Recommendations and Create Manually. Not the first screen. It put those inputs and both actions in reach before any plan exists."
```

## Ownership (structured — feeds the Team Gallery, `#/gallery`)

- **Designer:** Marco Paulo Lopes
- **Squad:**
- **Gallery:** visible

## Intent

"I want to build a new project for a travel app using adaptive ui and AI." The chosen job is a first itinerary from a few facts.

## Scope

- **In:** an iOS concept for getting a first itinerary from a starting point, a destination, and how flexible the dates are. AI recommendations, and a manual way to create the itinerary.
- **2026-11-02:** The first screen is the itinerary. It shows the plan the AI returns, with the starting point, destination, and date flexibility summarized so they can be changed.
- **In:** the screen still works with larger text, reduced motion, and higher contrast.
- **Out (for now):** a plan generated from a travel profile. AI layered onto a trip that already has bookings. Product dark mode.

## Constraints

- Product UI from `context/design-system/ds` and tokens only. Compose the `#/design-system` (Mobile) header, tab bar and sheets. Don't redraw them.
- Screens go in `projects/travel-app/screens/`.
- Concept only, so no real traveler data.
- Light product UI. The app does not get a dark theme.

## How we'd know

| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| Outcome | Travelers who know a starting point, a destination, and how flexible the dates are leave with a first itinerary generated from those inputs | unknown | set once the baseline exists | needs instrumentation — an analytics event when AI recommendations complete |
| UX | Participant can produce a first itinerary from a starting point, a destination, and how flexible the dates are | — | set before the test | prototype test |
| UX | Time to produce that first itinerary | — | set before the test | prototype test |
| Guardrail | Participant can create an itinerary manually, without AI recommendations | unknown | set once the baseline exists | prototype test |

Status: proposed

## Ship

- **Review:**
- **Exposure:**
- **Decision:** pending
