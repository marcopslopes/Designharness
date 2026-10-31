# Plan-then-execute gate

Moved from `harness/ORCHESTRATOR.md` §3. Read this when the matched chain is more than one skill. Show the plan and wait. One skill does not need this file.


## 3. Plan-then-execute gate

Before running anything with **more than one skill**, output a plan block and wait for approval.

**Net-new (design-kickoff fires):** the plan itself is just the kickoff sequence — there's nothing to approve upfront beyond starting it, since Step 3's PRD gate *is* the approval checkpoint:

```
PLAN — [task name] (net-new — design-kickoff)
1. design-kickoff Step 0 → 3 routing questions (name, known material, PM)
2. design-kickoff Step 1a → workload-agent (roadmap + design board ownership cross-ref)
3. design-kickoff Step 1b → research-agent sweep (docs + tracker + chat + linked Figma/Miro)
4. design-kickoff Step 1c → assumption-mapper (known vs believed from 1a/1b)
5. design-kickoff Step 2 → PRD + job stories into projects/<slug>/brief.md
6. design-kickoff Step 3 → THE GATE — presented for approval before any design work
7. (post-gate) Step 4 — if jobs/objects/strategy missing, AskQuestion; else ui-agent → icon-usage → audit
Starting with Step 0.
```

**Iterating (design-kickoff does not fire):**

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

**Single-skill plans skip the gate** if the designer has stated a standing "just do it" preference (log this preference in `projects/<slug>/decisions.md` the first time it's stated) **or** if `designer-profile.local.md` (Step 0) already records interaction style as "just do it for simple asks". **Multi-skill chains always show the plan** — no exceptions, even with a standing preference or profile setting. **The kickoff PRD gate (Step 3) runs only for a new product bet.** A question, a lookup, an iteration, a critique, copy, or an import never reaches it. On a bet, a standing "just do it" preference does not skip it — that stop is **specified**, not mechanical (`documentation/guides/spec-vs-runtime.md`).

Never execute before approval on a multi-skill chain.

### 3a. Autonomy dial (optional, per-task, offered only inside a plan block)

When a multi-skill plan block fires, offer one `AskQuestion` on how hands-on to be (just build + summarize / confirm each step / default), scoped to this task. Never skips the first plan approval or the kickoff PRD gate. Read `harness/references/autonomy-dial.md` before offering it.

---
