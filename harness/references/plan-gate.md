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

**Go wide (`ux-pattern` go-wide → `ui-agent` → `presenter` Compare):**

```
PLAN — [X] (go wide)
1. ux-pattern → ideas from the brief, findings, decisions and How we'd know, grouped into 3 directions of the type you pick
2. ui-agent → each direction built into the real screen as an option (one string prop, today stays the default)
3. presenter → a Compare section in the project: today plus the 3 directions, a name and one-sentence why under each
4. You pick in Compare → that direction becomes the screen's default (audit deferred)
```

The plan's approval is the type `AskQuestion` (Content / UI / UX / UI and UX / Completely different directions). No separate "go", and no presenter question. The pick at step 4 runs under this approval. Full steps: `harness/skills/ux-pattern/SKILL.md` § Go-wide mode.

**Single-skill plans skip the gate** if the designer has stated a standing "just do it" preference (log this preference in `projects/<slug>/decisions.md` the first time it's stated) **or** if `designer-profile.local.md` (Step 0) already records interaction style as "just do it for simple asks". **Multi-skill chains always show the plan** — no exceptions, even with a standing preference or profile setting. Never execute before approval on a multi-skill chain.

### 3a. Autonomy dial (optional, per-task, offered only inside a plan block)

Default is plan gate only: show the plan, wait for "go". Offer the dial only when the profile's interaction style says to ask. It never skips the first plan approval. Kickoff: `harness/skills/design-kickoff/SKILL.md`. Read `harness/references/autonomy-dial.md` before offering it.

---
