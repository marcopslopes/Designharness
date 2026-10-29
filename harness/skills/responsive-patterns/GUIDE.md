# Responsive patterns — how it works

The **responsive-patterns** skill defines content-driven breakpoints,
narrow priority maps, and 200% zoom / reflow checks.

Agents load [`harness/skills/responsive-patterns/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/responsive-patterns/SKILL.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Persists to | `projects/<slug>/findings.md` |
| Distinct from | `ui-agent` (builds), `mobile-shell` (phone chrome only) |

---

## What you say

- "Breakpoint strategy for this layout"
- "200% zoom check"
- "What collapses at narrow widths?"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| Web + phone | "Content-driven breakpoints before we build both" |
| Dense dashboard | "Priority map — what stays vs collapses" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 60.

---

## Layout craft at narrow

| Check | Rule of thumb |
|-------|----------------|
| Collapse | Always a disclosure cue — never silent hide |
| Targets | Clear gaps; icon-only needs more space than filled buttons |
| CTAs | Inset from viewport / safe-area unless intentional chrome |
| Groups | Inter-group gap still reads larger than intra after stack |
| Direction | Logical properties (`padding-inline-*`) unless geometry is physical |
| Safe area | Media may bleed; controls/text stay inside margins / safe-area |
| i18n | Text containers wrap; critical actions not clip-prone |

Foundations tokens only.

---

## Related

| Doc | Role |
|-----|------|
| [`taste-feedback`](../taste-feedback/GUIDE.md) | Mid-build density / grouping checkpoints |
| [`adaptive-interfaces`](../adaptive-interfaces/GUIDE.md) | Text size / contrast prefs |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
