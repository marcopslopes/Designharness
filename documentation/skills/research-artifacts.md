# research-artifacts

Turns synthesized research (or a named company archetype) into a
shareable understanding artifact. Six modes, one skill — same rule:
sourced data only, never invented.

## Modes

| Mode | Use when |
|------|----------|
| Persona | Memorable reference for a segment |
| Empathy map | Fast Says / Thinks / Does / Feels snapshot |
| Journey map | Stages, emotions, pain through a flow |
| Ability spectrum | Where a feature starts to exclude people |
| Job stories | The job (When / I want to / so I can), not the person |
| **Service blueprint** | A journey-map pain point needs its operational root cause |

Job stories feed `product-strategy` (opportunities) and `ux-pattern`
(JTBD-fit). They do **not** build an opportunity tree.

**Job stories run in two stages:** Stage A pulls every candidate
situation/motivation/outcome out of the source data, unprioritized,
labeled Observed / Inferred / Assumed. Stage B strips the mechanism from
each "When" clause (no naming your current feature/tool), ranks by
importance × how poorly served today, and narrows to the 1–2 stories
this decision must satisfy. Skipping straight to Stage B — picking
"the important jobs" before writing the full candidate set down — is how
a team favorite quietly becomes "the user need."

**Service blueprint** adds frontstage/backstage/support-process lanes
behind a journey map's touchpoints — five lanes, three lines (interaction,
visibility, internal interaction). Traces a pain point down through the
lanes to its operational root cause (often several lanes below where the
complaint appears). Requires a journey map underneath (run Mode 3 first).
Backstage/support rows with no real source get marked **unknown**, never
invented — that's the lane most tempting to guess at.

## Related

- [product-strategy](product-strategy.md) — consumes jobs as opportunities
- [research-synthesis](research-synthesis.md) — usual source of patterns
- [accessibility-decisions](accessibility-decisions.md) — after a spectrum breakpoint
