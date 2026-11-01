# Plan-then-execute gate

Moved from `harness/ORCHESTRATOR.md` §3. Read this when the matched chain is more than one skill. Show the plan and wait. One skill does not need this file.


## 3. Plan-then-execute gate

Before running anything with **more than one skill**, output a plan block and wait for approval.

Kickoff is not a plan block. `harness/skills/design-kickoff/SKILL.md`.

**Iterating (a small tweak, not kickoff):**

```
PLAN — [task name]
1. ui-agent → builds [screen] from context/design-system/ds + tokens
2. icon-usage → sources icons via Icon primitive
3. audit → design system + a11y + copy check before done
Estimated: ~X min. Reply "go", or edit the plan.
```

**Figma / design critique (iterating board or screen review — §2d):**

```
PLAN — [task name] (design critique)
1. ux-pattern → structure / archetype / the company patterns against the linked node or screen
2. content → CTA / banner / notification copy (omit only if no product copy)
3. (after complete) AskQuestion → optional figma-ux-audit canvas annotations
Estimated: ~X min. Reply "go", or edit the plan.
```

**Figma canvas annotations (`figma-ux-audit` — standalone or post-critique):**

```
PLAN — [task name] (figma-ux-audit)
1. Load ux-pattern (+ content if copy) context — reuse findings.md when present
2. figma-ux-audit → place labelled annotation cards on the linked node(s)
Estimated: ~X min. Reply "go", or edit the plan.
```

**Single-skill plans skip the gate** if the designer has stated a standing "just do it" preference (log this preference in `projects/<slug>/decisions.md` the first time it's stated) **or** if `designer-profile.local.md` (Step 0) already records interaction style as "just do it for simple asks". **Multi-skill chains always show the plan** — no exceptions, even with a standing preference or profile setting. Never execute before approval on a multi-skill chain.

### 3a. Autonomy dial (optional, per-task, offered only inside a plan block)

Default is plan gate only: show the plan, wait for "go". Offer the dial only when the profile's interaction style says to ask. It never skips the first plan approval. Kickoff: `harness/skills/design-kickoff/SKILL.md`. Read `harness/references/autonomy-dial.md` before offering it.

---
