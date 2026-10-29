# Harness enforcement gaps — handoff for fix agent

**Date:** 2026-07-15  
**Reporter:** repo owner (account-settings session)  
**Audience:** Agent or engineer tasked with making the harness self-enforcing  
**Canonical failure case:** `projects/account-settings/` — prototype built across multiple chat turns without orchestrator discipline

---

## Problem statement

`design-harness` has a full agent harness (`harness/ORCHESTRATOR.md`, 10+ skills under `harness/skills/`, task folders under `projects/`). The harness is designed so the **main chat agent is the orchestrator** — not a separate runtime.

In practice, iterative build requests ("fix the tab bar", "add citations", "align with navigation-profile") cause the agent to **edit code directly** and skip:

1. Reading `harness/ORCHESTRATOR.md` §2 (intent classification)
2. Checking `projects/<slug>/` state before acting
3. Showing the plan gate (§3) — especially for designers with `always-show-plan` in `designer-profile.local.md`
4. Reading and executing matched skills (`ui-agent`, `mobile-shell`, `icon-usage`, `audit`, etc.) in order
5. Appending outputs to `findings.md`, routing to `log.md` and `harness/logs/routing-log.md`

Result: working prototypes with **no audit trail**, no skill findings, no routing log entries, and answers to questions (e.g. "are we using icon-usage?") inferred from code instead of from `findings.md`.

---

## Use case — account-settings

### What was done correctly (early session)

| Step | Evidence |
|------|----------|
| Task folder created | `projects/account-settings/` |
| Workload sweep | `findings.md` → `2026-07-15 — workload-agent (partial)` |
| Research sweep | `findings.md` → `2026-07-15 — research-agent (partial)` |
| IA taxonomy | `ia-taxonomy.md` v0.1, `findings.md` → `ui-agent (taxonomy doc only)` |
| One routing log row | `log.md` — single entry for taxonomy only |

### What was skipped (prototype iterations)

| Harness requirement | Expected | Actual |
|---------------------|----------|--------|
| Intent classification per request | Each turn: iterating vs net-new | Ad-hoc code edits |
| Plan gate (§3) | Multi-skill plan shown; wait for "go" | No plan blocks shown |
| `design-kickoff` PRD gate | Net-new → `brief.md` APPROVED + `decisions.md` gate entry | `brief.md` still "In progress"; no gate approval |
| `ui-agent` | Read skill; build per steps; log findings | Code written without skill protocol |
| `mobile-shell` | PhoneShell audit when phone-frame screen changes | `PhoneShell` used ad hoc; no skill run or findings |
| `icon-usage` | Tabler via `Icon`; document choices in findings | Icons picked inline in `ProAppScreenChrome.tsx`; no findings |
| `audit` | Mandatory close before share | Never run |
| `log.md` | One row per routing decision | 1 row total (taxonomy only) |
| `harness/logs/routing-log.md` | Global append for all decisions | No entries for account-settings prototype work |
| Static export | `projects/account-settings/artifacts/` via export script | Not generated |

### Designer profile violated

`designer-profile.local.md`:

```
Interaction style: always-show-plan
```

ORCHESTRATOR §3: multi-skill chains **always** show the plan — no exceptions for standing preferences. This was ignored on every prototype iteration.

### Misleading UX — Design Harness Agents nav

`src/design-harness/agentConfig.ts` exposes only 5 agents in Design Harness UI:

- ui-agent, content-agent, ux-pattern-agent, accessibility-agent, research-agent

**Not exposed** (but exist as skills and ORCHESTRATOR routing targets):

- `icon-usage`, `mobile-shell`, `audit`, `design-kickoff`, `workload-agent`

Designers and agents assume "Agents" in Design Harness = the full harness. It is not.

---

## Root causes (for fix agent)

### 1. No mechanical enforcement

Skills are markdown files. Nothing forces the agent to `Read` them before editing `.tsx` files. ORCHESTRATOR is not auto-injected every turn — only thin pointers in `AGENTS.md` / `CLAUDE.md`.

### 2. SessionStart hook is a no-op

`.cursor/hooks.json` → `designer-onboarding-check.sh` exists but Cursor has a confirmed bug: `sessionStart` `additional_context` is not reliably injected. Documented in `AGENTS.md` and `ORCHESTRATOR.md` §0.

### 3. Iterative requests bypass classification

Small-sounding edits ("make tab bar taller", "fix toggles") do not trigger re-read of ORCHESTRATOR §2. Agent treats them as direct implementation tasks.

### 4. No pre-build checklist in Cursor rules

`.cursor/rules/` has `designer-profile-gate.mdc` (onboarding only). There is **no** rule equivalent to: "On any build/edit → read ORCHESTRATOR → check projects folder → show plan → log routing."

### 5. Task folder status not enforced

`brief.md` for account-settings has informal status (`In progress — ia-taxonomy.md v0.1 drafted`) instead of the schema in ORCHESTRATOR §2b (`STUB` | `DRAFT` | `APPROVED`). Agent did not block or resume at the correct gate.

---

## Proposed fixes (prioritized)

### P0 — Cursor always-applied rule

Add `.cursor/rules/orchestrator-gate.mdc` (or extend `AGENTS.md` with stronger wording):

**Before any prototype/build/edit request:**

1. `Read` `harness/ORCHESTRATOR.md` §1–§3 (or confirm read this session)
2. `Read` `projects/<slug>/brief.md`, `decisions.md`, `log.md` if task folder exists
3. Classify intent per §2 routing table
4. If multi-skill chain → output `PLAN — [task]` block and wait for approval (honor `designer-profile.local.md` interaction style)
5. For each skill in chain → `Read` full `harness/skills/<name>/SKILL.md` before executing
6. Append dated entry to `findings.md`; append row to `log.md` and `harness/logs/routing-log.md`

**Acceptance:** A test prompt like "add a badge to account-settings" produces a plan block and a `log.md` row before any file edit.

### P1 — Design Harness visibility for chained skills

Add `AgentPage` entries (or a "Skills" hub) for:

- `icon-usage` (`/icons`)
- `mobile-shell`
- `audit` (`/audit`)
- `design-kickoff`

Mirror `agentConfig.ts` pattern used for ui-agent. Link each to `harness/skills/<name>/SKILL.md`.

### P1 — Normalize `brief.md` status field

Enforce `Status: STUB | DRAFT | APPROVED` in `projects/_template/brief.md`. Agent must check §2b before iterating.

### P2 — SessionStart hook workaround

Until Cursor fixes hook injection, consider:

- A `sessionStart` script that writes a ephemeral `.cursor/orchestrator-reminder.md` the agent is told to read (fragile)
- Or document in `AGENTS.md` first tool call = `Read harness/ORCHESTRATOR.md` (already suggested but not followed)

### P2 — Retroactive log backfill script

Optional: scan `git log` + `projects/*/prototype/` for unlogged work; template `log.md` rows. Human review required.

---

## Acceptance criteria — "harness enforcement fixed"

1. **Test scenario A (iterating):** Designer says "continue account-settings — run audit." Agent shows plan, reads `audit/SKILL.md`, runs audit, appends `findings.md`, updates `log.md` — no code edit unless audit finds blockers.

2. **Test scenario B (small edit):** Designer says "change checkout tab icon." Agent classifies as iterating + `icon-usage`, shows plan (always-show-plan profile), logs routing **before** editing `ProAppScreenChrome.tsx`.

3. **Test scenario C (net-new):** Designer says "kick off deposits settings IA." Agent fires `design-kickoff`, does not write prototype code before `decisions.md` gate approval.

4. **Visibility:** Design Harness Agents (or Skills) nav lists at least `icon-usage`, `mobile-shell`, `audit`.

5. **account-settings recovery:** After path A chain completes, `projects/account-settings/findings.md` has dated entries for `mobile-shell`, `icon-usage`, `ux-pattern`, `audit`; `log.md` has matching rows.

---

## Related files

| File | Role |
|------|------|
| `harness/ORCHESTRATOR.md` | Routing table, plan gate, state rules |
| `harness/logs/routing-log.md` | Global routing history (gaps visible here) |
| `projects/account-settings/brief.md` | Informal status — needs normalization |
| `projects/account-settings/log.md` | Only 1 row — prototype work unlogged |
| `projects/account-settings/findings.md` | Stops at taxonomy — no skill outputs for prototype |
| `designer-profile.local.md` | `always-show-plan` — violated |
| `.cursor/rules/designer-profile-gate.mdc` | Onboarding only — model for new orchestrator rule |

---

## Out of scope for fix agent

- Rebuilding the account-settings prototype from scratch
- Changing Tabler icon choices (handled by path A `icon-usage` pass in parent session)
- Fixing Cursor platform hook bug (document only)

---

## Parent session follow-up (path A)

The account-settings session continues with formal chain:

```
mobile-shell → icon-usage → ux-pattern → audit
```

Outputs append to `projects/account-settings/findings.md` and `log.md`. This handoff doc is independent — fix agent can work in parallel.
