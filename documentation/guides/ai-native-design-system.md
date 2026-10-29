# How to build an AI-native design system (this repo’s workflow)

This document adapts the **guided prompt → visual truth → Design Harness catalog → sandbox → guardrails → audits** pattern to **Cursor + this lab**. It is the playbook for humans and agents working together on `design-harness`.

---

## 1. Start with a clear goal (guided prompt)

Open your agent with a concrete objective, not “make it pretty.” Good examples:

- “Walk me through a **token-first** design system I can extend in AI: Figma foundations + one component family (buttons) **pixel-matched** to company design system, plus a small Design Harness catalog/sandbox app.”
- “Add **TextField** states to `context/design-system/ds` using only `tokens.css` and patterns from existing primitives.”

The agent should know: **sources of truth** (which Figma files), **stack** (here: Vite, React, CSS variables, no MUI in MVP), and **deliverables** (tokens, components, docs).

---

## 2. Feed visual and structural truth (better than screenshots alone)

**Screenshots** help for layout, density, and “does this feel right.”

**Stronger inputs** (use whenever possible):

- **Figma links** with `node-id=` so the frame is unambiguous.
- **Exported foundations** in `context/design-system/FIGMA-FOUNDATIONS-*.md` (spacing, radius, colour, type).
- **Component file** in Figma — for buttons, use your own design system's canonical Buttons frame (recorded in `COMPANY-BUSINESS.md` § Design system, not hardcoded here). Repo notes: **`context/design-system/FIGMA-DESIGN-SYSTEM-BUTTONS.md`**.

Paste screenshots when you are comparing **gestalt**; paste **node URLs and names** when you are locking **numbers** (padding, font size, hex).

---

## 3. Build the coded catalog (components + docs)

**Design Harness** is the living catalog: reviewers and agents open it to see **all variants** without running product code.

In this repo:

- Run `npm run dev` (default port **3001**).
- Foundations pages render the eight `context/design-system/FIGMA-FOUNDATIONS-*.md` files as Markdown.
- Component pages live under `src/design-harness/pages/` and document the `context/design-system/ds` primitives.
- **Accessibility:** keep **focus-visible** and semantic labels in primitives. Add contrast checks for new colour pairs.

Treat the Design Harness component pages as **the contract** for how components are supposed to look and behave in isolation.

---

## 4. Build a local sandbox (“baby app”)

**Design Harness** (`npm run dev`) — **design system site**: sidebar, hash routes. **Foundations** includes the eight **`context/design-system/FIGMA-FOUNDATIONS-*.md`** files rendered as Markdown, plus a **live token preview** on the Foundations hub. **Components** pages document `context/design-system/ds`. **Playground** is a composed demo. Implementation: **`src/design-harness/`**; **`src/DesignHarnessApp.tsx`** re-exports the shell.

- Run `npm run dev` and exercise the **Component gallery** and **Example prototype** tabs.
- Rebuild slices of a real product here first; only promote patterns to shared libraries after they are stable.

---

## 5. Guardrails (this repo: `harness/ORCHESTRATOR.md` §7, not `cloud.md`)

Some workflows use a file named `cloud.md`. Here the equivalent is **`harness/ORCHESTRATOR.md`** §7: **non-negotiables**, Figma file keys, token rules, and commands. `AGENTS.md` (and `CLAUDE.md`) are thin, auto-loaded pointer files that exist only because Cursor/Claude Code require those exact filenames, at the repo root where those tools look — they defer to `harness/ORCHESTRATOR.md` for everything real.

When the model drifts (random hex, inline magic numbers, new components that skip `context/design-system/ds`), **edit `harness/ORCHESTRATOR.md` §7** with a short, testable rule: *what to use*, *what never to do*, *where to look*.

---

## 6. Keep guardrails short

Long instruction files get ignored or partially applied. Every few sessions:

- Remove duplicates and stale examples.
- Prefer **bullet rules** over essays.
- Aim for **under ~200 lines** while keeping critical links (Figma, token file, `context/design-system/ds` import rules).

---

## 7. Automate consistency (“skills” and checks)

**Cursor Skills** (or team scripts) can encode repeatable audits, for example:

- Lint or search for **`#` hex** outside `tokens.css`.
- Run `npm run lint` and `npm run build` before claiming work is done.
- Optional: a script that fails CI if new components do not export from `context/design-system/ds/index.ts` or do not load `ds.css`.

The point is the same as Allan’s “audit skill”: **force token and primitive usage** instead of one-off CSS.

In this repo that splits into two skills:

- **`design-system`** — pre-write token check + layer rule while building (see [`design-system/GUIDE.md`](../../harness/skills/design-system/GUIDE.md)).
- **`audit`** — reactive post-build sweep before sharing.

Both stay; neither replaces the other.

---

## Quick map: Allan steps → this repository

| Step | In this repo |
|------|----------------|
| Guided prompt | Clear chat goals + `harness/ORCHESTRATOR.md` context |
| Visual data | Figma URLs + `context/design-system/FIGMA-FOUNDATIONS-*.md` + screenshots when useful |
| Catalog + Sandbox | `npm run dev`, `src/design-harness/` (see `DesignHarnessApp.tsx` re-export) |
| Guardrails | `harness/ORCHESTRATOR.md` §7 |
| Trim rules | Periodic edit pass on `harness/ORCHESTRATOR.md` §7 |
| Audits | ESLint, build, optional custom scripts / Cursor skills |

---

## Commands cheat sheet

| Command | Purpose |
|---------|---------|
| `npm run dev` | Design Harness catalog + sandbox (Vite) |
| `npm run build` | Typecheck + production bundle |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (`format:check` in CI) |

---

## Canonical Figma URLs

| Doc | Link |
|-----|------|
| **Foundations** (tokens / scales) | Your own Foundations Figma file — see each `context/design-system/FIGMA-FOUNDATIONS-*.md` for the exact node. |
| **Design system — Buttons** | Your own design system's Buttons frame (record the link in `COMPANY-BUSINESS.md` § Design system) |

---

## Related files

- **`harness/ORCHESTRATOR.md`** §7 — agent and contributor non-negotiables (`AGENTS.md`/`CLAUDE.md` are thin pointers to it).
- **`context/design-system/tokens.css`** — design tokens (`:root` CSS variables).
- **`context/design-system/ds/`** — primitives and **`ds.css`** (component chrome).
- **`context/design-system/FIGMA-FOUNDATIONS-*.md`** — exported scales and semantics from Foundations Figma.
- **`context/design-system/FIGMA-DESIGN-SYSTEM-BUTTONS.md`** — your DS Buttons frame link + map to code.

When in doubt: **tokens first**, **`context/design-system/ds` second**, **Figma third**, **Design Harness to prove it**.
