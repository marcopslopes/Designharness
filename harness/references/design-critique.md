# Design critique — harness only (no freestyle)

The full text of `harness/ORCHESTRATOR.md` §2d. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

**The gap this closes:** a live miss on 2026-07-24 — designer pasted a
Figma Entry-points URL and asked "audit this / any thoughts?" The agent
answered from Figma MCP + memory of the task brief **without** loading
`ux-pattern` / `content`, without appending to `findings.md`, and without
a routing-log line. Same class of miss as informal "what do you think of
this screen?" / "quick gut check" with no URL.

**Hard rule:** if the ask is to critique, audit, review, gut-check, or give
thoughts on **design work the designer already produced** (Figma/FigJam
URL, screenshots, Design Harness playground screen, or a named surface in an
active project), you **must** match the design-critique row in §2 and run
those skills. Forbidden: ad-hoc chat critique that skips skill files,
required context loads, and task-folder logging.

**Artifact type first (additive front door):** before running
design-critique, `audit`, or `figma-ux-audit`, classify the drop per
`harness/references/artifact-type-critique.md` — Figma pre-build /
Design Harness prototype / live production / external competitor. Obvious cases
proceed silently; ambiguous → `AskQuestion`. External + “audit/critique”
→ mismatch redirect to `competitor-scan`/`benchmark`, not the company house
rules on their product. Live production → real-user-impact framing;
Figma pre-build → exploratory (skip Design Harness DS/`audit` code checks).

**Live / local http(s) URL (not figma.com):** match **`live-page-review`**
first — capture + classify + hand off. Do not freestyle a screenshot
guess of a running page. Figma drop-time AskQuestion below still applies
only when a Figma/FigJam link is present.

**Drop-time (Figma/FigJam link present — before critique runs):** ask via
`AskQuestion` which output mode they want — written findings, Figma canvas
annotations, or both. Canonical payload:
`harness/skills/figma-ux-audit/references/offer-questions.md` § A. Skip it
only when they already asked for annotations ("annotate", "notes on the
canvas") — that is the `figma-ux-audit` row, matched directly.
Do **not** auto-run either path. Route:

| Choice | Chain |
|---|---|
| Written findings | design-critique below → then **post-critique offer** |
| Figma canvas annotations | **`figma-ux-audit`** row (compose ux-pattern/content context) |
| Both | design-critique → then **`figma-ux-audit`** (one PLAN; wait for go) |

**Written critique chain shape:**
1. Match / open the closest `projects/<slug>/`. Classify artifact type
   (`artifact-type-critique.md`).
2. `ux-pattern` — always (structure, archetype, the company patterns).
3. `content` — when product copy/CTAs are in scope.
4. Multi-skill → show the §3 PLAN and wait for go.
5. Output **First look** holistic paragraph, then itemized two-layer
   findings; append dated skill output to `findings.md`; append any new durable
   external URLs from the critique to `sources.md` (create from template
   if missing); one line in `projects/<slug>/log.md`.
6. **After design-critique completes** (and canvas annotations were not
   already part of the run): offer **`figma-ux-audit`** as an optional
   follow-up via `AskQuestion` — payload § B in
   `harness/skills/figma-ux-audit/references/offer-questions.md`
   (“Want these findings added as annotation cards directly on the Figma
   canvas too?”). Never auto-run; on yes → match the **`figma-ux-audit`**
   row, place cards grounded in the findings just written, log the second
   routing line.
7. **After written critique completes** (and they did not already ask for
   a report in the same turn): offer **`review-report`** via `AskQuestion`
   — payload in
   `harness/skills/review-report/references/offer-questions.md`
   (“Package these findings as a scrollable HTML report?”). Never auto-run;
   on yes → match the **`review-report`** row. This is the report, not a
   case study and not slides.

**Annotation basis (when `figma-ux-audit` runs):** every card labels
`[UX Heuristic: …]` or `[House: …]` — general heuristics vs the same
house ground truth design-critique uses. See
`harness/skills/figma-ux-audit/SKILL.md`. Holistic **First look** in the
chat/findings note before listing cards.

**Do not** route these asks to Design Harness `audit` unless they also point at
built code (`src/design-harness/pages/…`) and explicitly want the pre-share
code sweep.

**Presenter prep is a different row.** "Prep me for critique" / presenter
script / "help me present this in UX review" matches **`critique-prep`**,
not this section — do not fold it into drop-time written/annotate. If they
want both a script and a review, show a §3 PLAN (`critique-prep` first,
then this chain); the script must not read the critique findings.

## Two layers (required on every critique)

Every finding from `ux-pattern`, `content`, `audit`, or `figma-ux-audit`
draws from **both** layers and **labels which layer it uses**. Neither
replaces the other.

| Layer | Label | What it covers |
|---|---|---|
| Global UX craft | `[UX Heuristic: <name>]` | Senior craft judgment: usability heuristics (Nielsen or equivalent), named visual craft in `harness/references/ui-craft-rules.md`, interaction patterns proven across the industry, typography / hierarchy / spacing / affordance quality that is **not** house-specific. Name the heuristic or craft subject in the brackets (e.g. Visibility of system status, Visual hierarchy, Focal point, Affordance). |
| House standards | `[House: <source> — <rule>]` | Real house ground truth: `COMPANY-PATTERNS`, `ARCHETYPES`, `BUSINESS`, content standards, `tokens.css` / Foundations. |

**Tone for the craft layer:** reasoned opinion with a clear *why* — direct
and specific, not a fake-objective checklist.

**Precedence:** if something is both craft-questionable **and** a house
violation, the house finding stays the harder call. Do not soften or
override house rules with craft opinion. Prefer two labelled points over
one blended note when both apply.

**One convention:** `figma-ux-audit` cards, written critique (`ux-pattern`
→ `content`), and `audit` all use these labels. Do not invent parallel
phrasing like `[Craft/UX]` or `[House standard]`.

**Artifact type + First look:** before critique/audit output, classify the
drop and write the holistic paragraph per
`harness/references/artifact-type-critique.md`.
