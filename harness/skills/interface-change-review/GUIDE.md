# Interface change review — how it works

The **interface-change-review** skill reviews **UI craft on a git change**
(uncommitted, branch, or range) and labels each finding
**Introduced / Regression / Pre-existing**. It is not the pre-share
`audit`.

Agents load
[`harness/skills/interface-change-review/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/interface-change-review/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Distinct from | `audit` (share gate), `ux-pattern` / `figma-ux-audit` (Figma critique), `taste-feedback` (mid-build checkpoints) |

---

## What problem it solves

You changed Design Harness / prototype UI and want a craft pass scoped to **what
this diff touched** — with honest labels for new issues vs. regressions vs.
stuff that was already broken — before you push or ask for share-ready
`audit`.

---

## What it does NOT do

- Does **not** replace pre-share `audit` (no PASS/BLOCK share gate)
- Does **not** critique Figma-only work — use design-critique /
  `figma-ux-audit`
- Does **not** invent findings on empty or non-UI diffs — it **asks**
  (last commit / named target / full `audit`) instead of guessing
  `HEAD~1`
- Does **not** check out a PR or mutate the working tree; fetch only
- Does **not** auto-fix; report only (hand fixes to `ui-agent` / you)

---

## What you say

- "Review my branch for UI craft"
- "Interface review on my uncommitted changes"
- "Design regression check before I push"
- "Quick craft review of this diff"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Before push | "Craft review my branch vs main — quick" |
| Dirty tree mid-build | "Interface review on uncommitted" |
| Ready to share | Still run `audit` after — this skill doesn't PASS/BLOCK |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 65.

---

## Modes

| Mode | Cap |
|------|-----|
| `quick` (default) | 5 findings |
| `full` | 10 findings |

Findings reuse craft bars from `taste-feedback`, `motion-choreography`,
`responsive-patterns`, and DS rules where the diff touches those areas.
Caps count **Introduced + Regression** only; pre-existing is listed
separately (max 3) and does not drive the verdict.

Also flags **incomplete vs. stated intent** (new variant missing hover /
loading / empty, or a control added on one sibling but not the others) —
not scope creep. Reports include a short **considered but rejected**
table so restraint is visible.

---

## Related

| Doc | Role |
|-----|------|
| [`design-system`](../design-system/GUIDE.md) | Tokens / pre-share audit path |
| [`taste-feedback`](../taste-feedback/GUIDE.md) | Mid-build craft checkpoints |
| [`motion-choreography`](../motion-choreography/GUIDE.md) | Motion restraint if the diff animates |
| [`responsive-patterns`](../responsive-patterns/GUIDE.md) | Breakpoint / reflow if layout changed |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
