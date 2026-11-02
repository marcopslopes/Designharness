# Routing log — travel-app

Detailed, task-scoped view of every routing decision made within this task. Every line here also gets a matching one-line entry in the global `harness/logs/routing-log.md`.

| Date | Request | Intent classified | Chain run | Why |
|---|---|---|---|---|
| 2026-11-02 | "build a new project for a travel app using adaptive ui and AI" | new project | design-kickoff | Why picked: a few inputs produce a first itinerary (Trip.com). Parked: profile-shaped plan (Polarsteps), AI on an existing trip (Vrbo). Next: structure step (2 options) |
| 2026-11-02 | structure step | design-kickoff | itinerary: the first plan, three inputs summarized | You picked the itinerary. You give up the ask screen, where the inputs and both actions sit in reach before any plan exists. PLAN: ui-agent → design-system → mobile-shell → icon-usage; adaptive-interfaces on that screen; audit deferred (on-share). Waiting for go |
| 2026-11-02 | go | build | adaptive-interfaces → ui-agent → design-system → mobile-shell → icon-usage | ItineraryPage plus storyboard. Audit deferred (on-share). Manual create stays on the parked ask screen. |
