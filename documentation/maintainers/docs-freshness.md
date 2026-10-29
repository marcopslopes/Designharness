# Docs freshness — keep the broad documentation current

This repo’s **broad** docs (what the harness is, which skills/agents exist,
the flow diagram, Design Harness how-to decks) drift whenever we ship a new skill
or change routing. Skills get updated in the moment; the overview docs
often don’t — until someone notices weeks later.

This how-to is the **contract** for not losing that work. The append-only
log is [`harness/logs/docs-freshness.md`](../../harness/logs/docs-freshness.md).

---

## What “broad documentation” means

Surfaces that describe the **system as a whole** — not a single skill’s
internals:

| Surface | Path | Must stay accurate about |
|---------|------|---------------------------|
| Flow diagram | `documentation/guides/how-the-harness-works.md` | End-to-end request path, gates, harness-audit modes |
| Skills how-to | `documentation/guides/how-the-harness-works.md` | Architecture diagram + full skill inventory |
| Root README | `README.md` | Skills table, agent roles, first prompts, key-docs index |
| How-to index | `documentation/README.md` | Links to every designer-facing HOWTO |
| Install and team use | `INSTALL.md` | Install paths, team sharing, taking updates |
| Design Harness briefing deck | `public/how-to/designer-briefing.html` | At-a-glance skill chips |
| Design Harness system map | `public/how-to/system-map-agents-skills.html` | Roles + skills cards |
| Agent role files | `harness/agents/*.md` | What each role owns / composes |
| Routing standards | `harness/logs/routing-standards.md` | Live roster audit table (count source of truth) |
| Orchestrator related-files | `harness/ORCHESTRATOR.md` § Related files | Pointers to HOWTOs / logs |

Per-skill `SKILL.md` files and single-topic HOWTOs (`HOWTO-TICKET-CREATE`,
`HOWTO-SCHEDULING`, …) are **not** “broad” — update those when that skill
changes. This tracker is for the **overview layer** that lists or diagrams
many skills at once.

**Standing rule:** every new skill ships with its own
`harness/skills/<name>/GUIDE.md` in the same PR / same day — see
[`build-a-skill.md`](build-a-skill.md) checklist. That guide
is the designer-facing page; this freshness pass still covers the
overview surfaces that *list* it.

---

## When to refresh (triggers)

Run a broad-docs pass when **any** of these land:

1. **New skill** added under `harness/skills/` (or a skill deleted/renamed)
2. **New §2 routing row** in `harness/ORCHESTRATOR.md` (or a row’s meaning changes)
3. **New agent role** or a role’s ownership list changes
4. **New designer-facing HOWTO** that belongs in the how-to index / README key-docs
5. **Harness-audit / evals / confidence / benchmarking** behaviour changes
6. Designer says: *“update the documentation”*, *“refresh the diagrams”*,
   *“docs are stale”*, *“docs freshness”*

Also: **periodic** — at least once a week if any of the above happened and
no freshness log line was written (design-ops / harness-audit should catch
this).

---

## Checklist (every broad-docs pass)

Copy this mentally; tick in the log entry’s notes if useful:

- [ ] `harness/logs/routing-standards.md` — new/changed skills have a row
- [ ] `documentation/guides/how-the-harness-works.md` — inventory + architecture diagram
- [ ] `documentation/guides/how-the-harness-works.md` — diagram still true (skills named, gates, audit modes)
- [ ] `README.md` — skills table + agent roles + key-docs + first prompts
- [ ] `documentation/README.md` — index links + “Last reviewed” date
- [ ] `INSTALL.md` — install, team, and update steps still match
- [ ] `public/how-to/designer-briefing.html` — skill chips
- [ ] `public/how-to/system-map-agents-skills.html` — skill cards (no dead skills)
- [ ] `harness/agents/*.md` — ownership tables
- [ ] `harness/ORCHESTRATOR.md` Related files — no “proposal only” drift for shipped things
- [ ] Append one line to `harness/logs/docs-freshness.md`

Do **not** hardcode a skill count in prose docs — point at
`routing-standards.md` instead.

---

## Log format

Append-only, one line per pass, in
[`harness/logs/docs-freshness.md`](../../harness/logs/docs-freshness.md):

```
YYYY-MM-DD | <trigger> | <surfaces touched, comma-separated> | <one-line what changed>
```

Example:

```
2026-08-04 | new skills deck-builder + ticket-create; evals; craft merge | harness-flow, HOWTO-SKILLS, README, how-to/README, public/how-to/*, agents, routing-standards, REPOSITORY-GUIDE | Full roster refresh after Aug 4 ship
```

---

## Who owns this

| Role | Duty |
|------|------|
| **design-ops** (`harness/agents/design-ops.md`) | Owns the contract; greps for drift when structure moves |
| **Whoever ships a new skill** | Broad-docs pass (or explicit handoff to design-ops) in the **same** PR / same day — see `build-a-skill.md` checklist |
| **harness-audit** | After a prospective eval pass that adds/changes a §2 row, remind: “docs freshness still due?” if no same-day log line |

---

## Related

| File | Role |
|------|------|
| [`harness/logs/docs-freshness.md`](../../harness/logs/docs-freshness.md) | Append-only history of broad-docs passes |
| [`documentation/guides/how-the-harness-works.md`](../guides/how-the-harness-works.md) | Skills architecture + inventory |
| [`documentation/guides/how-the-harness-works.md`](../guides/how-the-harness-works.md) | One-diagram process explainer |
| [`documentation/maintainers/build-a-skill.md`](build-a-skill.md) | New-skill checklist includes this pass |
| [`harness/agents/design-ops.md`](../../harness/agents/design-ops.md) | Systems role that owns harness health |
| [`harness/logs/routing-standards.md`](../../harness/logs/routing-standards.md) | Live skill roster (count source of truth) |
