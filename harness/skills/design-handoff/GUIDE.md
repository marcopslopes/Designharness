# Design handoff — how it works

The **design-handoff** skill composes one developer-ready spec sheet
from a design that is ready for engineering. It pulls tokens, states,
and decisions from sources that already exist. It does not invent
measurements, and it does not send the file to anyone.

Agents load the full protocol from
[`harness/skills/design-handoff/SKILL.md`](SKILL.md).

Designer-facing short guide:
[`documentation/skills/design-handoff.md`](../../../documentation/skills/design-handoff.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/design-handoff/SKILL.md` |
| Spec template | `harness/skills/design-handoff/references/output-template.md` |
| Preferred save | `projects/<slug>/handoff-spec.md` |
| Session compact (different file) | `projects/<slug>/handoff.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |

---

## What problem it solves

Handoff used to mean a long chat, a Figma link, and hope. This skill
makes "write the eng spec" a routed compose step: one file, token-first,
unknowns marked, validate-before-send.

It is the missing composer around specs you already have
(`interaction-design`, `motion-choreography`, `accessibility-decisions`,
`design-rationale`) — not a replacement for those skills.

---

## What it does NOT do

- Compact this chat → `session-handoff`
- File Jira → `ticket-create` (offered after, on go)
- Publish Confluence → `confluence-brief` (offered after, on go)
- Defend a decision → `design-rationale`
- Record an a11y ADR → `accessibility-decisions`
- Critique the work → `ux-pattern`

---

## Spec prose slivers (this skill only)

Two checks that do **not** run on essays or PRDs:

- **Missing actor** — name who does the thing ("the spec stores
  results when the user taps Save"), not "results are preserved
  automatically." Error copy and tickets stay as they are.
- **Current behavior** — the spec says what the design does now.
  History ("this replaced overflow") stays in `decisions.md` or a
  retro.

Shared anti-slop still runs on overview/why-notes
(`harness/references/anti-ai-writing.md`).

---

## Validate before send

The first line of every spec is **DRAFT — validate before send.**
Treat the file like Anthropic's own advice on this job: review it,
correct it, then share. The skill will not create a ticket or a wiki
page unless you ask.
