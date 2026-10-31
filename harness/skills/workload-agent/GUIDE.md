# Workload agent — how it works

The **workload agent** answers planning questions with **live Jira data
only** — what's committed on Polaris product-roadmap boards, who's doing
what on designer execution boards (`DES` + `UXR`), and where those two
views align or gap.

It never answers from memory, a previous chat, or a hardcoded initiative
list in this repo. Every snapshot states the query time and links tickets.

This doc is the human-readable reference. Agents load the full protocol from
`harness/skills/workload-agent/SKILL.md`.

---

## Quick reference

| What | Path |
|------|------|
| Agent skill (full protocol) | `harness/skills/workload-agent/SKILL.md` |
| Polaris board registry | `harness/skills/workload-agent/references/roadmap-boards.md` |
| Polaris JQL technique (Level 1 + Level 2) | `harness/skills/workload-agent/references/roadmap-check.md` |
| Designer execution boards (`DES` + `UXR`) | `harness/skills/workload-agent/references/design-board.md` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Auto-invoked at net-new kickoff | `harness/skills/design-kickoff/SKILL.md` Step 1a |
| PRD section fed by kickoff run | `harness/skills/design-kickoff/references/prd-template.md` §1 |
| Superseded skill (no trigger phrases; older links still resolve) | `harness/skills/designer-workload/SKILL.md` |

---

## What problem it solves

the company's design planning data is split across two Jira worlds:

1. **Polaris (Jira Product Discovery)** — what product has committed or is
   exploring (`CORE`, `PAY`, `GROW`, `CON`, …). Pipeline stages like
   `Wonder → Explore → Plan → Make`.
2. **Designer execution (Jira Software)** — what designers are actually
   working on today:
   - **`DES`** — Design board (most designers)
   - **`UXR`** — UX Designs (squad-linked work, e.g. payments squads)

A question like *"is anyone on Live Activity?"* can miss the answer if you
only check Polaris Opportunities **or** only check `DES`. Live Activity
showed up under `PAY` at Solution level **and** on `UXR-154` (Sam
Karluk) — not on `DES` at all.

The workload agent runs **both legs** and cross-references by default when
the question needs it.

---

## What it does (three legs)

| Leg | Source | Answers |
|-----|--------|---------|
| **Roadmap** | Polaris boards per domain | What initiatives are in `Make` / `Plan` / active discovery |
| **Execution** | `DES` + `UXR` | Who owns in-flight design tickets, by assignee |
| **Cross-reference** | Keyword overlap between legs | Aligned work, roadmap-without-design gaps, design-without-roadmap-parent |

It does **not**:

- Write PRDs or Confluence pages (that's `design-kickoff` / `research-agent`)
- Build UI (`ui-agent`)
- Estimate hours, velocity, or label someone "overloaded"
- Cache results — every run is a fresh query
- Run a manager's own personal-assignee query against their own name (see
  § Manager mode below)

---

## When it runs

### 1. You ask directly (standalone)

Use plain language in Cursor. No slash command required.

```
run the workload agent
what's on the roadmap for payments this quarter?
who's working on what on DES?
is anyone on Live Activity already?
do we have bandwidth for referrals?
check polaris for core SaaS initiatives
```

The orchestrator routes these to `workload-agent` per `harness/ORCHESTRATOR.md` §2.

### 2. Automatically on net-new kickoff (`design-kickoff` Step 1a)

Every net-new project that goes through `design-kickoff` runs the workload
agent **before** the deep `research-agent` sweep:

```
Step 0  → 3 routing questions (name, known material, PM)
Step 1a → workload-agent  (roadmap + DES/UXR + cross-ref)
Step 1b → research-agent    (Confluence, Slack, Figma, Miro, Jira bodies)
Step 2  → PRD in projects/<slug>/brief.md  (§1 Existing work & ownership)
Step 3  → human gate
```

Raw output is appended to `projects/<slug>/findings.md` (dated,
`workload-agent`). The PRD's **§1 Existing work & ownership** is
distilled from this leg.

### 3. After designer onboarding (personal queue)

Once per clone, after `designer-profile.local.md` is written, onboarding
can run a **personal** workload snapshot (your `DES`/`UXR` queue + squad-
scoped roadmap). See `documentation/guides/onboarding.md` and
`harness/designer-onboarding/references/onboarding-workload-scope.md`.

---

## MCP required

| MCP | Required? | Used for |
|-----|-----------|----------|
| **Atlassian** | **Yes** | Jira read — Polaris projects + `DES` + `UXR` |

Slack, Figma, and Miro are **not** used by this agent. If Atlassian fails,
the agent reports a partial snapshot — it does not invent tickets.

Setup: [`documentation/setup/mcp-setup.md`](../../../documentation/setup/mcp-setup.md).

---

## Polaris boards it knows about

Active team boards (verify quarterly — teams add/retire boards):

| Domain | Key | Typical use |
|--------|-----|-------------|
| Core SaaS | `CORE` | Provider product backbone |
| Payments | `PAY` | In-app payments, tap-to-pay, Live Activity, … |
| Provider Growth | `GROW` | Growth / acquisition initiatives |
| Consumer Domain | `CON` | Consumer-side |
| Consumer Promotions | `PROMO` | Promotions / marketing |
| Tech Initiatives | `TI` | Engineering-led (`Solution` only — different vocabulary) |
| Operations | `OPSRD` | Internal ops tooling (different status names) |

Full registry + per-board vocabulary quirks:
`harness/skills/workload-agent/references/roadmap-boards.md`.

**Provider vs consumer:** Provider-side questions prioritize `CORE`, `PAY`, `GROW`.
Include `CON`/`PROMO` only when the ask is explicitly consumer-side.

---

## Query technique (why Level 2 matters)

Polaris queries run at two levels:

| Level | Issue types | When |
|-------|-------------|------|
| **Level 1** | `Opportunity` in active pipeline stages | Broad domain sweep ("payment initiatives") |
| **Level 2** | `Solution` / `Experiment` + keyword `text ~` | Named features ("Live Activity", "in-app chat") |

**Level 1 alone is insufficient** for named features — proven miss on Live
Activity (only appeared at Level 2 under `PAY`).

**Quarter labels are unreliable** — the `Quarters` custom field often lags.
Prefer pipeline status (`Make`, `Plan`, active `Explore`) over `Q3 '26`
labels alone.

---

## Designer execution (`DES` + `UXR`)

| Project | Board / role |
|---------|----------------|
| `DES` | [Design board](https://your-org.atlassian.net/jira/software/c/projects/DES/boards/1) — most designers |
| `UXR` | UX Designs — squad execution (your squads) |

**Always query both** when checking workload or a named person. Never
`DES`-only.

If a **first name** is in the prompt (e.g. "Sam"), the agent runs
`lookupJiraAccountId` first — the company has multiple accounts with the same
first name.

---

## Manager mode (`role: manager` profiles)

A manager's `designer-profile.local.md` has no personal ticket queue that
means anything — querying `assignee = "<manager's own name>"` is the
wrong shape. When the requester's profile has `Role focus: manager` (or
the request names several specific reports directly), the agent:

1. Reads `Reports:` from the profile. Empty/unset → says so plainly and
   stops this leg — never guesses a team from squad/domain data.
2. Resolves every name via `lookupJiraAccountId`, then runs **one batched
   query** across all reports instead of N — cheaper against the real
   API:

   ```
   assignee in ("Name A", "Name B", "Name C") AND project in (DES, UXR)
   AND status NOT IN (Done, Closed, Canceled)
   ORDER BY assignee ASC, status ASC
   ```

3. Groups the output **per person**, not as one flat ticket list, and
   flags anything **stale** — active (`In Progress`/`Review`) but
   untouched past a threshold — rather than just listing it alongside
   everything else. `On Hold` is still called out by name regardless of
   age, same as always.

**The staleness threshold is defined in exactly one place** —
`harness/skills/workload-agent/references/design-board.md` § Manager mode
(`MANAGER_MODE_STALE_DAYS`, currently 7) — so it's easy to find and tune
without hunting across files. Every other doc that mentions "stale" in
this context points back there instead of restating the number.

This is a **snapshot for a conversation, not a verdict** — "hasn't moved
in 9 days" is the finding; whether that's a problem is for the manager to
ask, not for this agent to conclude.

See `harness/designer-onboarding/SKILL.md` § Manager role focus for where
`role: manager` and `Reports:` come from, and
`harness/skills/manager-1on1-prep/SKILL.md` for the 1:1-prep skill built
on top of this leg (scoped to one report at a time).

---

## Example output

```markdown
## Workload snapshot — 2026-07-14 11:00 UTC

### Roadmap (PAY)
**Make / Plan**
- PAY-407 Plan | Live Activity for iOS and Android
- PAY-443 Make | …

### Design execution (DES + UXR)
**Sam Rivera** — 1 in progress
- In Progress UXR-154 Live Activity for iOS and Android (project: UXR)

### Cross-reference
**Aligned:** Live Activity — PAY roadmap + UXR-154 in progress
**Roadmap → no design ticket yet:** …
**Design → no Polaris parent obvious:** …

Queries run: [JQL listed]
```

**Manager mode example:**

```markdown
## Team snapshot — 2026-07-16 09:00 UTC

### Ana Silva — 1 in progress
⚠ DES-201 "Waitlist redesign" — In Progress, no update in 9 days (past the staleness threshold — worth checking in)

### Sam Okafor — 1 in progress, 2 queued
- In Progress DES-140 Lite onboarding permissions polish (project: DES)

Staleness threshold: 7 days, see `references/design-board.md` § Manager mode.
Queries run: [batched JQL listed]
```

---

## Workload agent vs research-agent

| | **workload-agent** | **research-agent** |
|---|---|---|
| **Question** | Who's on this? What's committed? Any overlap? | What do we know about the problem? |
| **Sources** | Jira only (Polaris + `DES` + `UXR`) | Confluence, Jira, Slack, Figma, Miro |
| **Output** | Snapshot + cross-ref buckets | Findings + optional Confluence draft |
| **Kickoff role** | Step 1a — ownership & roadmap | Step 1b — deep discovery |

Both run on net-new kickoffs. Neither replaces the other.

---

## Guardrails (what the agent will not do)

- Hardcode initiative lists in markdown and treat them as current
- Guess capacity % or call someone overloaded without evidence
- Skip `UXR` when checking designer work
- Skip Level 2 when a specific feature name is in the prompt
- Draft a PRD in the same turn unless you explicitly ask

---

## File map for maintainers

Polaris reference files under `workload-agent/references/` are copies of
the research-agent versions. If you update board registry or JQL technique,
update **both** paths (or consolidate later):

- `harness/skills/workload-agent/references/`
- `harness/skills/research-agent/references/`

---

## Related reading

| Doc | Why |
|-----|-----|
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | How skills auto-trigger and chain |
| [`onboarding.md`](../../../documentation/guides/onboarding.md) | Personal workload at onboarding (and manager team snapshot for `role: manager`) |
| [`COMPANY-SQUADS.md`](../../../context/org-pack/COMPANY-SQUADS.md) | Squad → board mapping context; § Design leadership for manager pre-fill |
| `harness/skills/manager-1on1-prep/SKILL.md` | 1:1-prep skill built on top of this agent's manager mode, scoped to one report |
| [`harness/ORCHESTRATOR.md`](../../ORCHESTRATOR.md) | Full routing table |
