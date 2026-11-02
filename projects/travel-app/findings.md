# Findings — travel-app

Append-only. Each entry is dated and names the skill that produced it. Never delete or rewrite a prior entry.

### 2026-11-02 — adaptive-interfaces

## Adaptive interfaces — travel-app/itinerary — 2026-11-02

### Preference map

| Property | Supported? | How | Gaps |
|---|---|---|---|
| Motion | Yes | Sheet open and close use the catalog overlay. `prefers-reduced-motion: reduce` skips the slide (`usePresence` with motion off). Keyboard activation (`detail === 0`) does the same. No autoplay. | Durations stay the catalog's. No separate motion spec. |
| Contrast | Partial | Text labels carry time, day, and stop kind. Colour is not the only signal. Pairs are existing Foundations and kit tokens. | No extra `prefers-contrast` palette. Higher contrast stays on those tokens. |
| Transparency | Yes | The plan, the facts, and Change sit on solid surfaces. The tab bar is the catalog glass and keeps text labels, so it still works if translucency is removed. | None on this screen. |
| Text size | Partial | Rows, titles, and the three facts wrap (`overflow-wrap: anywhere`). No fixed height clips a label. Change stays a text button. | Type tokens in the header and tab bar are pixel sizes, so system text scaling may not enlarge them. Not changed here. |
| Density | Not offered | One spacing scale. | No compact mode. |
| Colour scheme | Out of scope | Product UI stays light inside the phone frame. | Product dark mode declined. |

### Reduced motion

- Status: wired. System reduced motion and keyboard activation both skip the sheet slide.
- Alternatives: the sheet appears and disappears without the slide. Stop detail uses the same path.

### Text size / density

- Long stop names wrap. The time stays text beside the name, not colour alone.
- Density modes are not offered.

### Explicitly out of scope

- Product dark mode (declined per house rule)

### Hand-offs

- Motion durations stay with the catalog. A motion spec would be `motion-choreography`.
- Contrast of the built screen is not an `audit` pass. Audit is deferred until share.
- The manual create path is still with the parked ask screen, so this screen does not yet cover that guardrail.

### 2026-11-02 — ui-agent

Built `projects/travel-app/screens/ItineraryPage.tsx` for iOS, Mobile system. Context header (facts), day list, Change as a form sheet, stop detail as a detail sheet, catalog tab bar. Explore and Saved are empty states on the same screen.

The example archetype pack names shop owners, not travelers. This screen is for the brief's traveler: they know the three facts and want the plan without building every stop.

Token check: prototype CSS only, existing spacing, radius, border, surface, text, and shadow tokens. `design:detect` on `travel-itinerary.css` was clean.

Audit deferred (`behaviour.audit` is `on-share`). Not run.

Storyboard: `projects/travel-app/screens/Itinerary.storyboard.ts`.

Snapshot: `projects/travel-app/artifacts/snapshots/itinerary.html` and `itinerary.png`.
