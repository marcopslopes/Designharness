# Spec vs runtime — what is actually mechanical

**Status:** inventory. Not a runtime proposal and not a build plan.

Kordian’s point (2026-09-04): Markdown can specify routing, approvals,
state, validators, and evals. It cannot deterministically enforce hard
stops, permissions, or boundaries. Call a gate **enforced** only when
something *outside the model* can fail the action.

This page is the honesty contract. The orchestrator
(`harness/ORCHESTRATOR.md`) remains the **policy and workflow spec**.
There is still no separate harness runtime.

---

## Two layers

| Layer | What it is | What happens if the model ignores it |
|-------|------------|--------------------------------------|
| **Specified** | Markdown + Cursor rules + skill files the agent is told to follow | The action still happens. You find out later (or never). |
| **Mechanical** | A script, git hook, or verifier with an exit code | The action fails even if the agent wanted to proceed. |

Belt-and-suspenders hooks that **fail open** (Cursor `sessionStart` /
`preToolUse` — see `KNOWN-ISSUES.md`) are **not** mechanical. Do not
count them as enforcement.

---

## Mechanical today

These fail the process without needing the model to cooperate:

| Surface | What it blocks | Limit |
|---------|----------------|-------|
| `scripts/design-detector` via git `pre-commit` | Staged `.css` with raw token-shaped values | Bypassable with `--no-verify` locally. CI re-runs it on every push and pull request (`npm run build` → `design:check`). |
| `scripts/design-detector` via `audit` Check 1 | Share **PASS** if a touched `.css` file fails the detector | Only if `audit` actually runs. The *decision to run audit* is specified. |
| `scripts/verify-audit-verdict.mjs` | Malformed audit verdict JSON | Shape only. A well-formed lie still passes. |
| `.gitignore` on `context/org-pack.local/` | Real company pack leaking into git | Path-only. |

That is the entire mechanical set. Tokens at commit time are the one
gate we can honestly call enforced.

---

## Specified today (policy the agent follows)

Everything else in `harness/ORCHESTRATOR.md` is specified:

- §2 routing and the plan gate (§3)
- `design-kickoff` Step 3 PRD approval
- Skill `Read` before act, critique isolation, AskQuestion drop-time
- Routing log + task-folder state (`brief` / `decisions` / `findings`)
- Prospective evals (`eval-prompts.md`) — reasoned by an agent, not a runner
- `.cursor/rules/orchestrator-gate.mdc` and sibling always-applied rules

These are real process. They are not hard stops. A live miss (account-settings,
2026-07-15; “what is invites”, 2026-09-01) is what skip looks like.

The July 15 note `harness/harness-enforcement-handoff.md` already named
this gap. The P0 that shipped was more Cursor rules — still specified.
This page is the next honesty step, not a second rule file.

---

## Words we use from here

| Say | When |
|-----|------|
| **Specified** / **gated in-prompt** | Plan gate, PRD approval, “audit before share”, routing |
| **Mechanical** / **enforced** | Detector + pre-commit (and only that, until more exists) |
| **Fail-open** | Cursor hooks in `KNOWN-ISSUES.md` |

Do not write “can’t skip steps”, “enforced workflows”, or “the harness
enforces the process” in designer-facing docs unless the sentence is
about the commit-time detector.

---

## What this is not

- Not a runtime. Routing, approvals, state transitions, capabilities,
  and eval replay still live in the model + this spec.
- Not a marketplace / versioned-skill / handoff-contract design. Skills
  are versioned by git in this repo. Agent-to-agent handoff is
  `session-handoff`; designer-to-eng spec is `design-handoff`.
- Not an instruction to weaken the specified gates. Keep them. Just
  don’t claim they are mechanical.

A small runtime that owns those jobs is a later product decision, not
the next edit in this repo.
