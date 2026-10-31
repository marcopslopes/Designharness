# Project debt register (`projects/<slug>/debt.md`)

**Scope:** Per-project advisories from **`audit`** and **design-critique** (`ux-pattern` ± `content`) that are **not fixed in the current pass**.

**Not this file:** Repo / harness / DS structural debt → **`KNOWN-ISSUES.md`** only. Never route critique advisories there.

---

## When to write

**`audit`:** after PASS with open advisories (Checks 3–5), **ask once** (below). Do not auto-append audit rows.

**Design-critique** (`ux-pattern` ± `content`): non-blocking findings (Major, Minor, Note — anything not tagged `BLOCKING`, `[DS-*]`, or `[A11Y-*]`) are appended in the same turn. No question. Say exactly: `Logged the non-blocking findings in the project debt register.` Ask only when a finding is blocking (below).

The file is the project's own `debt.md`: `projects/<slug>/debt.md`, or `projects.local/<slug>/debt.md` when the project was saved locally. No project folder: leave the findings in the reply, skip the line, and do not start a project to hold them.

**BLOCKING semantics unchanged for audit.** `[DS-*]` / `[A11Y-*]` blockers must be fixed before PASS. Major / Minor / Note apply **only** to advisories.

---

## Critique — log non-blocking, ask only when blocking

Append one complete row per non-blocking finding (all columns, next `DD-NNN`). Then the one line above. Do not offer fix / log / not-worth-tracking for those rows.

A blocking finding (`BLOCKING`, `[DS-*]`, `[A11Y-*]`) is the only critique question. Use Cursor **`AskQuestion`** when available (`harness/references/ask-question-ui.md`). Do **not** declare an explicit `"Other…"` option — the tool adds its own.

| `title` | Blocking findings |
|---|---|
| `prompt` | These findings block the work. Fix them now? |
| Options | **Fix now** (`fix_now`) · **Not in this pass** (`not_now`) |

- **fix_now** — address in the same session; register a blocker only if it is still open after the attempt.
- **not_now** — append those rows as **Open**. Do not use the non-blocking sentence for them.

If `AskQuestion` is absent: plain-text degrade per `harness/references/ask-question-ui.md` (same two options).

---

## Fix-or-log prompt (audit only, once per PASS with open advisories)

Use Cursor **`AskQuestion`** when available (`harness/references/ask-question-ui.md`). Do **not** declare an explicit `"Other…"` option — the tool adds its own. Design-critique does not use this menu.

| `title` | Open advisories |
|---|---|
| `prompt` | These advisories aren't blocking. Fix now, log to the project debt register, or mark not worth tracking? |
| Options | **Fix now** (`fix_now`) · **Log to debt register** (`log_debt`) · **Not worth tracking** (`accept_not_tracking`) |

- **fix_now** — address in the same session; only register if still deferred after the fix attempt.
- **log_debt** — append one row per deferred advisory (all columns filled).
- **accept_not_tracking** — one **`Accepted`** row per item with a one-line rationale in **Finding** or a short note after the table; do not silently drop from `findings.md` without this.

If `AskQuestion` is absent: plain-text degrade per `harness/references/ask-question-ui.md` (same three options) — do not guess fix vs log; do not tell the designer to switch models.

---

## File format

Create `debt.md` from `projects/_template/debt.md` when the first row is logged. A tracked project's register is committed. A `projects.local/` project's register stays gitignored with that folder.

### Advisory severity (advisories only)

| Tag | Use when |
|---|---|
| **Major** | Significantly degrades experience; should fix before external handoff if possible |
| **Minor** | Real issue; safe to defer with tracking |
| **Note** | Observation or future polish; low urgency |

Keep two-layer labels in **Finding**: `[House: …]` / `[UX Heuristic: …]` plus the severity tag.

### Status

| Status | Meaning |
|---|---|
| **Open** | Deferred; promise to revisit |
| **Resolved** | Fixed later — keep row, update status |
| **Accepted** | Consciously not fixing — requires explicit designer acknowledgement |
| **Escalated** | Was Minor/Note; now needs PM/design lead decision |

### ID

Sequential per project: `DD-001`, `DD-002`, … never reuse.

---

## Table columns

| ID | Date | Source | Severity | Finding | Who's affected | Suggested fix | Status |

- **Source:** `audit` | `ux-pattern` | `content` | `figma-ux-audit` (if advisories only)
- **Who's affected:** provider archetype, persona, or user group — specific, not "users"

---

## Integration

| Skill | Action |
|---|---|
| `harness/skills/audit/SKILL.md` | Step 3.25 on PASS + open advisories |
| `harness/skills/ux-pattern/SKILL.md` | After critique output is appended to `findings.md`: log non-blocking rows, ask only for blockers |
| `harness/skills/content/SKILL.md` | Same automatic rows when chained in design-critique (`Source: content`) |
| `harness/skills/design-debt-tracker/SKILL.md` | **Standalone** review / triage / escalate / resolve of `debt.md` — "show me the design debt", aged-debt nudge. Does not replace `audit`'s fix-or-log question. Critique already wrote its non-blocking rows. |
| `harness/docs/critique-system.md` | Scope distinction vs `KNOWN-ISSUES.md` |
| `harness/skills/design-debt-tracker/GUIDE.md` | Designer-facing guide for the standalone skill |
