# Design discovery kickoff — draft page (PRD scaffold)

> **Legacy copy.** The maintained template is
> `harness/skills/research-agent/references/brief-template.md`.

Use this structure for every **draft** page the agent creates. The goal is a
**design discovery / kickoff PRD**: enough structure that a designer can walk
into a workshop with a single page — **filled where sources exist**, **blank
slots where they do not** — instead of a ticket index or status-only scan.

Dense tables and short bullets over long prose. **Never publish** without user
confirmation.

---

## Scaffold rules (non-negotiable)

1. **Keep every `##` section below** (header line through appendix, **1–17**)
   in the draft, in this order. **Do not delete or renumber headings** because a
   subsection is empty.
2. When sources have **nothing** for a section, **leave the body intentionally
   sparse**: keep the heading, keep the table **column headers**, add **one
   placeholder row** (empty cells or `—`) and a single italic line such as
   `_(Fill in during discovery — no sources found in this pass.)_` or
   `_(Paste link to dashboard / deck / owner.)_`. Never invent metrics or quotes.
3. When sources are **partial**, fill rows you can cite; leave additional
   placeholder rows for the designer to extend.
4. **Insight over catalogue** — but a visible empty slot is more useful than
   skipping the topic entirely.

---

## 1 · Header line

One line at the top:

`Topic: [Topic] · Design discovery kickoff (draft) · [YYYY-MM-DD] · Sources scanned: [docs tool] · [tracker] · [chat] [· Figma if used] [· Web if competitor benchmark]`

---

## 2 · Discovery kickoff header _(fill blanks if unknown)_

| Field | Value |
| --- | --- |
| Product / surface |  |
| Team / squad |  |
| PM |  |
| Design lead |  |
| Eng lead _(if known)_ |  |
| Primary market / segment |  |
| Target milestone / phase |  |

---

## 3 · What this page is

2–3 sentences: this is a **starting-point PRD for design discovery**, assembled
from internal sources; gaps are **intentional blanks** for the team to fill in
kickoff. State scope (what is in / out) in one line if clear from sources.

---

## 4 · Executive summary

3–4 sentences:

- Where things stand today
- The single biggest open question
- One concrete next step for discovery or alignment
- **Confidence:** **High** / **Medium** / **Low** for the *whole* page (sources
  density + recency + conflicts)

---

## 5 · The opportunity

Why this matters; gap or risk; headline numbers **only if sourced**.

| Dimension | What we know | Source |
| --- | --- | --- |
|  |  |  |

_(If empty: one placeholder row + italic “Fill in — no opportunity framing found in sources.”)_

---

## 6 · Problem statement _(for kickoff)_

One tight paragraph or bullet list: what is broken for users or the business,
**only from evidence** in sources. If none: heading stays +

`_(Fill in — no single problem statement found; pull from research or PM brief.)_`

---

## 7 · Target users & jobs to be done

One subsection per user type when known. Template per type:

**[User type]**

- **Job to be done:**  
- **Behaviour to change:**  
- **What they need:**  
- **Source:**  

If no users found: keep one block with all bullets empty or `—` and the italic
fill-in line.

---

## 8 · Data & BI we know

**Every number needs a named source and date.** Conflicting sources → two rows +
note in Notes.

| Metric | Value | Source | Date | Notes |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

_(If empty: placeholder row + “Fill in — link dashboard / query / owner.”)_

---

## 9 · User research insights

Actual findings (not just study titles). Quote lightly when the source supports
it.

| Artifact | Type | Who / when | Key findings |
| --- | --- | --- | --- |
|  |  |  |  |

_(If empty: placeholder row + “Fill in — paste study links or Miro summary.”)_

---

## 10 · Design insights & exploration

Decisions, hypotheses, Figma / FigJam links, what is validated vs open.

| Surface / decision | Status | Insight or rationale | Link |
| --- | --- | --- | --- |
|  |  |  |  |

_(If empty: placeholder row + “Fill in — link Figma / crit notes.”)_

---

## 11 · Current state — delivery & confirmed problems

### 11a · Active work

| Theme | Status | Owner | Source |
| --- | --- | --- | --- |
|  |  |  |  |

### 11b · Confirmed problems _(evidence-based)_

| Problem | Evidence | Source |
| --- | --- | --- |
|  |  |  |

_(If 11b empty: placeholder row + “Fill in — link support theme, research quote, or metric.”)_

---

## 12 · Competitive / market context _(optional)_

**Only when** the user asked for external benchmark **or** sources already
contain a benchmark section. Otherwise keep the heading and write:

`_(Skipped — not requested. Add competitor rows in kickoff if needed.)_`

| Product | Pattern | Relevance | Link |
| --- | --- | --- | --- |
|  |  |  |  |

---

## 13 · Open questions & decisions _(kickoff board)_

| Question | Owner | Status | Source |
| --- | --- | --- | --- |
|  |  |  |  |

_(If empty: placeholder row + “Fill in — workshop parking lot.”)_

---

## 14 · Recommendations _(from sources only)_

| Action | Rationale | Owner | When |
| --- | --- | --- | --- |
|  |  |  |  |

_(If empty: placeholder row + “Fill in after kickoff.”)_

---

## 15 · Who's involved

| Name | Role | Latest activity | Source |
| --- | --- | --- | --- |
|  |  |  |  |

---

## 16 · Conflicts, staleness, or data gaps

If nothing: keep heading + one row:

| Topic | Conflict / gap | Preferred source (recency) | Notes |
| --- | --- | --- | --- |
| — | No conflicts flagged in this pass | — | — |

If something was found, replace with real rows.

---

## 17 · Appendix — relevant links

Grouped: **Docs** · **Tickets** · **Chat** · **Figma** · **Other**. Note
searches that returned thin noise (helps the next pass).
