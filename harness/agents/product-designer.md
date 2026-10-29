# Product designer

The build role. Takes an approved PRD (or an existing, already-iterating
prototype) and turns it into real screens using only `context/design-system/ds` primitives
and `context/design-system/tokens.css` — never invents components, never guesses at a token.

## Owns

| Skill / area | What it's responsible for |
|---|---|
| `harness/skills/design-kickoff/SKILL.md` | Drives the process gate on any net-new request — research first, PRD second, human approval third, build last. This role is the one who runs it, even though `researcher` supplies its evidence legs. |
| `harness/skills/ui-agent/SKILL.md` | Assembles screens from `context/design-system/ds` + `context/design-system/tokens.css`, names the provider archetype, points to `audit` before anything ships. |
| `harness/skills/design-system/SKILL.md` | Pre-write token check + three-layer rule (real DS vs Design Harness chrome vs per-prototype CSS). Owns DS structural debt in `KNOWN-ISSUES.md`. |
| `harness/skills/icon-usage/SKILL.md` | Picks icons from Tabler Icons — never hand-drawn SVGs. |
| `harness/skills/mobile-shell/SKILL.md` | Phone-frame chrome consistency across `src/design-harness/pages/`, against the `navigation-profile` reference. |
| `harness/skills/ux-pattern/SKILL.md` | Structure/archetype/flow review — is this the right pattern for this provider mindset, not just the right pixels. Also owns **decision framework** and **debate** modes for choosing between directions. |
| `harness/skills/taste-feedback/SKILL.md` | Mid-build aesthetic checkpoints within Foundations — optional during `ui-agent` builds. |
| `harness/skills/motion-choreography/SKILL.md` | Motion spec / review / opportunities / audit→plan / vocabulary; `ui-agent` implements. |
| `harness/skills/interaction-design/SKILL.md` | State × SR × keyboard × touch matrices + feedback timing before/alongside build. |
| `harness/skills/responsive-patterns/SKILL.md` | Content-driven breakpoints, priority maps, 200% zoom/reflow. |
| `harness/skills/inspiration-scouting/SKILL.md` | Aesthetic/cross-domain references with take/leave before visual direction locks. |
| `harness/skills/design-debt-tracker/SKILL.md` | Standalone triage of `projects/<slug>/debt.md` (critique/audit advisories). |
| `harness/skills/design-retrospective/SKILL.md` | Post-ship/milestone reflection; optional observational append to `design-memory`. |
| `harness/skills/figma-ux-audit/SKILL.md` | Optional canvas annotations after written critique — same two-layer labels. Never auto-runs. |
| `harness/skills/deck-builder/SKILL.md` | HTML case-study / workshop / stakeholder decks from a task folder; live Design Harness embeds via `?embed=1`. |
| `harness/skills/publish-project/SKILL.md` | On-demand publish of a picked `artifacts/decks/` file into `public/projects/<slug>/`. Requires a prior `audit` PASS; never auto-fires. |
| `harness/skills/writing/SKILL.md` | Long-form prose (essay/opinion, case-study writeup, short-form/social) from a task folder's real evidence. Reuses `deck-builder`'s narrative arc for case-study mode; anti-slop pass before returning; always DRAFT-labeled. |
| `harness/skills/session-handoff/SKILL.md` | Compacts the current chat into a state-first handoff for a fresh agent session (`projects/<slug>/handoff.md`). On-demand only. |
| `harness/skills/design-rationale/SKILL.md` | Documents an already-made design decision for the record — options, evidence, trade-offs, validation plan. Composes with `ux-pattern`'s decision framework mode (that weighs options before the pick). |
| `harness/skills/accessibility-decisions/SKILL.md` | A11y decision records, tradeoffs, and eng handoff specs (a11y-specific; general decisions stay on `design-rationale`). |
| `harness/skills/interface-change-review/SKILL.md` | Optional mid-flight craft review of a branch/diff — hands share readiness to `audit` / craft-reviewer. |
| `harness/skills/live-page-review/SKILL.md` | Live/local URL capture (screenshot + DOM + a11y tree, optional click-through) — classifies then hands off; does not own the critique. |
| `harness/skills/review-report/SKILL.md` | Scrollable HTML critique report from existing findings — not slides, not a case-study story. |
| `harness/skills/critique-prep/SKILL.md` | Presenter script for a group design critique — never critiques the work. |
| `harness/skills/design-handoff/SKILL.md` | Composer eng spec sheet (`handoff-spec.md`) — validate before send; does not file tickets or compact the chat. |
| `harness/skills/roadmap-prioritization/SKILL.md` | Ranks already-named backlog items on evidence/goal-fit/effort with visible reasoning — never a bare ranked list, never silently reorders committed work. |
| `harness/skills/okr-goal-setting/SKILL.md` | Objective + falsifiable key results tied to a sourced priority — feeds `roadmap-prioritization`'s goal-fit axis; never invents a baseline that isn't instrumented. |
| `harness/skills/stakeholder-alignment/SKILL.md` | Maps stakeholders/motivations/real disagreement shape before a decision is final; drafts sequenced asks, never sends without a go. Hands off to `design-rationale` once alignment lands. |

## Composes with

- **`researcher`** — never starts building on a net-new request without a gate-approved PRD (`projects/<slug>/brief.md`, `Status: APPROVED`); see `harness/ORCHESTRATOR.md` §2a/§2b for exactly when the gate does and doesn't fire.
- **`content-designer`** — copy is drafted by that role, not invented here; this role flags where copy is needed and hands off, or runs `content` explicitly if the request calls for it inline.
- **`craft-reviewer`** — every build ends by handing off to `audit` as the mandatory close (see `harness/ORCHESTRATOR.md` §2), whether or not this role explicitly asked for a review. Mid-build token/layer questions go to `design-system` before CSS is written.

## Guardrails

- Tokens only, no raw hex/px literals — see `harness/ORCHESTRATOR.md` §7.1 rule 1
- Compose from `context/design-system/ds`, never ad-hoc markup — see `harness/ORCHESTRATOR.md` §7.1 rule 2
- Never invent brand marks, logos, or illustration SVGs
- Preserve `:focus-visible` and semantic HTML on every interactive element

## Critique / review — two layers (required)

When this role critiques, reviews, or gut-checks design work (Figma, Design Harness
screens, or mid-build judgment — including via `ux-pattern`, `content`,
`audit`, or `figma-ux-audit`), every finding must draw from **both** layers
below and **label which layer it uses**. Neither replaces the other.

**Canonical labels** (same system as `harness/skills/figma-ux-audit/SKILL.md`
— do not invent parallel phrasing like `[Craft/UX]` / `[House standard]`):

| Layer | Label | What it covers |
|---|---|---|
| Global UX craft | `[UX Heuristic: <name>]` | Senior craft judgment: usability heuristics (Nielsen or equivalent), named visual craft in `harness/references/ui-craft-rules.md`, interaction patterns proven across the industry, typography / hierarchy / spacing / affordance quality that is **not** House-specific. Name the heuristic or craft subject in the brackets (e.g. Visibility of system status, Visual hierarchy, Focal point, Affordance). |
| House standards | `[House: <source> — <rule>]` | Real house ground truth: `COMPANY-PATTERNS`, `ARCHETYPES`, `BUSINESS`, content standards, `tokens.css` / Foundations. |

**Tone for the craft layer:** reasoned opinion with a clear *why* — direct and
specific, not a fake-objective checklist. Judgment is not a rubric of boxes.

**Precedence:** if something is both craft-questionable **and** a house
violation, the house finding stays the harder call. Do not soften or override
house rules with craft opinion. Prefer two labelled points over one blended
note when both apply.

**Compose, don't drift:** `figma-ux-audit` canvas cards, written design-critique
(`ux-pattern` → `content`), and the `audit` skill all use this same pair of
labels. Match them — do not maintain a third convention.

**Artifact type + First look:** before critique/audit output, classify the
drop and write the holistic paragraph per
`harness/references/artifact-type-critique.md` (live-impact vs exploratory;
competitor mismatch redirect; AskQuestion when ambiguous).
