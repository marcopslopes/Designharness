---
name: design-retrospective
description: >-
  Structured post-ship (or milestone) reflection — what worked, what
  didn't, what to carry forward. Reads the designer's journal entries
  for the project as evidence. Triggers on: "design retrospective", "retro
  this project", "what did we learn from [slug]", "reflect on this
  launch", "close out this project". Does not replace
  `research-agent` verdict synthesis for "did the change help users."
---

# Design retrospective

A retrospective examines the whole process — wins, misses, surprises —
and turns hindsight into a clearer next start. It is not a blame post-
mortem and not a verdict on product metrics.

**Invoke in Cursor:** "retro this project", "what did we learn from
referrals entry-points", "design retrospective"

---

## Scope boundary

- **Fires on:** after a meaningful close (ship, share, abandoned spike,
  end of phase) when the designer asks to reflect.
- **Does not fire on:** "did this move the metric" → `research-agent`
  verdict mode; "document why we chose X" → `design-rationale`; weekly
  team process retros outside a `projects/<slug>/`.
- **session-journal:** reads `designer-context.local/journal/*-<slug>.md`
  as evidence of where the designer changed direction. Never writes to it.

---

## Step 1 — Gather evidence

Read, in order:
1. `projects/<slug>/brief.md` (status, goal)
2. `decisions.md`, `findings.md`, `log.md`
3. `debt.md` if present (what stayed open)
4. Latest `audit` / critique outcomes if any

Do not invent wins or failures that aren't evidenced in those files.

---

## Step 2 — Facilitate (short)

Ask at most 3 questions via `AskQuestion` / plain text if needed — only
gaps the files can't answer (e.g. "what would you do differently on day
one?"). Infer the rest.

---

## Step 3 — Write the retro

```markdown
## Design retrospective — [slug] — YYYY-MM-DD

### What we set out to do
[From brief]

### What worked
- [Evidence-backed]

### What didn't / surprised us
- [Evidence-backed]

### Decisions that still look right
- [Pointers into decisions.md]

### Decisions we'd reopen
- [With why]

### Open debt we still owe
- [From debt.md — or "none"]

### Carry forward (for humans, not auto-applied)
- [1–5 practical notes for the next similar project]

```

---

## Step 4 — Persist

1. Append the retro to `projects/<slug>/findings.md` (dated).
2. One line in the task `log.md`.

---

## Never do this

- Never auto-apply carry-forward notes to the next `ui-agent` /
  `design-kickoff` run
- Never invent metrics outcomes ("conversion improved") without a sourced
  verdict
- Never skip open `debt.md` items — name them
- Never write to the designer's journal — it records their sessions, not retros

---

## Related files

| File | Role |
|------|------|
| `harness/skills/session-journal/SKILL.md` | Journal entries read as evidence |
| `harness/skills/design-debt-tracker/SKILL.md` | Open promises to surface |
| `harness/skills/research-agent/SKILL.md` | Product/outcome verdict (different job) |
| `harness/skills/design-retrospective/GUIDE.md` | Designer guide |
