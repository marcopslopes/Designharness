# How to build a skill (newcomer guide)

You are new to skills and want to build one — maybe a **notifications skill** for
Claude, or something else in the company design pipeline. This doc is the practical
companion to [`how-the-harness-works.md`](../guides/how-the-harness-works.md), which explains how the whole
orchestrator + harness system fits together.

**Start here if you want to write a skill.** Read [`how-the-harness-works.md`](../guides/how-the-harness-works.md)
if you want to understand routing, chains, and request flow first.

---

## What is a skill?

A **skill** is a markdown playbook that tells the AI agent *how* to do one specific
kind of design work — consistently, with the company rules baked in, instead of
improvising in chat.

Think of it as three things at once:

| Piece | What it is |
|---|---|
| **Recipe** | Ordered steps the agent must follow |
| **Checklist** | Context files to load before acting |
| **Guardrails** | Hard "never do this" rules for known failure modes |

Skills live in **`harness/skills/<name>/`**. They are **committed to git** — anyone
who clones this repo gets them. That is different from personal Cursor skills
(`~/.cursor/skills-cursor/`) or installed plugins, which live outside the repo.

The **orchestrator** (`harness/ORCHESTRATOR.md`) reads your plain-language request,
matches it to a skill (or chain of skills), and the agent **loads and follows**
`harness/skills/<name>/SKILL.md` in full.

Designers do **not** need to name skills. Say what you want; routing handles the rest.
You *can* invoke one directly: e.g. `Use the UI agent skill` or `/ui`.

---

## Mental model

| Without skills | With skills |
|---|---|
| AI improvises each time | Same playbook every time |
| "Looks fine" chat critique | Structured review with house ground truth |
| Random spacing/colors in prototypes | Real tokens + DS components |
| Work lives in chat | Work logged in `projects/<slug>/` |
| Easy to skip steps | Mandatory gates (e.g. `audit` before share) |

**Skills turn "talk to an AI" into a repeatable design pipeline.**

---

## Anatomy of a skill

Every skill in this repo follows the same shape. Open any of these as references:

| Skill | Good for learning… |
|---|---|
| [`ui-agent`](../../harness/skills/ui-agent/SKILL.md) | A build skill with chains, platform layers, variant forks |
| [`content`](../../harness/skills/content/SKILL.md) | A review skill with reference docs and intake questions |
| [`scheduling`](../../harness/skills/scheduling/SKILL.md) | Scope boundaries, optional MCP, composed by other skills |

### Folder layout

```
harness/skills/<skill-name>/
├── SKILL.md              ← required — the full playbook
└── references/           ← optional — deep contracts, examples, checklists
    ├── some-contract.md  ← recipe / lookup; the SKILL.md principle only links here
    ├── some-checklist.md
    └── review-output.md  ← optional; review format only (see authoring conventions)
```

### `SKILL.md` structure

```markdown
---
name: <skill-slug>
description: >-
  <One sentence: what it does.> Triggers on: "<phrase 1>", "<phrase 2>".
  <Scope boundary: what it does NOT do, and what skill to use instead.>
---

# Human-readable title

One paragraph: what this skill is for.

**Invoke in Cursor:** `Use the <name> skill` or `/slug`

---

## Quick Reference

| Category | When to use | Reference |
|----------|-------------|-----------|
| … | … | [file.md](references/file.md) |

The Quick Reference is the **only** listing of reference files. Do not also
append a "see also" file index at the bottom.

---

## Load before …

Numbered list of files/context the agent must read first.

---

## Workflow

1. Step one
2. Step two
3. …

---

## Never do this

- Hard rule 1
- Hard rule 2

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Agent tends to do X | Do Y instead |

---

## Reporting

A standalone review is finished only when findings are reported in
[review-output.md](references/review-output.md). When another skill
orchestrates this one (`audit`, `interface-change-review`), **that**
skill's format wins — ignore this file's Reporting section.

---

## Related files

| File | Role |
|------|------|
| … | … |
```

### The frontmatter is the routing contract

The orchestrator often decides which skill to run **before** reading the body.
Your `description` must answer four questions (see
[`harness/logs/routing-standards.md`](../../harness/logs/routing-standards.md)):

1. **What does this do?** — one sentence
2. **What triggers it?** — phrases a designer would actually say
3. **What does it NOT do?** — if another skill could be confused with it
4. **What does it depend on?** — MCPs, other skills it chains with

**Good trigger phrases:** `"write notification copy"`, `"review this push notification"`,
`"what should this in-app alert say?"`

**Bad trigger phrases:** `"notifications"`, `"handles messaging"` — too vague to route.

### Description = routing contract (not a workflow summary)

The `description` answers **"should I open this skill now?"** — not
**"what are the steps?"**

Include three elements:

1. **What** it does (one phrase)
2. **When** to use it (trigger phrases / situations)
3. **Differentiator** vs related skills (prevents routing conflicts)

**Never summarize the full workflow in the description.** If the
description contains a step-by-step *how*, agents tend to follow that
summary and **skip loading the body**. Put procedure in the SKILL.md
sections below — not in frontmatter.

**Trigger hygiene:** one trigger *family* per distinct job branch — not
six synonyms of the same ask. Extra phrasings belong in the §2 routing
row if matching needs them. Do not put identity the body already carries
into the description (which modes it supports, how it coordinates
siblings). Description = "should I open this?"; body = "how to run it."

---

## Authoring conventions (lean skills)

House-adapted from the [jakubkrehel/skills](https://github.com/jakubkrehel/skills)
`AGENTS.md` conventions (2026-08-18). Numbered workflows and §2 routing
stay; we do **not** copy their plugin YAML, `better-*` prefix, or
`disable-model-invocation` flag — on-demand vs auto-chain is a §2 row
note here (`scheduling`, `ticket-create`, `session-handoff`).

### One rule, one owner

Each hard rule lives in **exactly one** skill. Sibling skills name the
owner in backticks (`content`, `accessibility`) and state only the
handoff — they never restate the rule in shorter form. When a concern
crosses domains, keep the rule with the owner and mention secondary
effects in the **Why**.

### Principle vs recipe (do not restate)

- **SKILL.md** states the rule (one numbered principle or workflow step)
  and links out.
- **`references/`** holds the recipe, lookup table, or code pattern.
- The principle never restates the reference in shorter form; the
  reference never restates the principle in longer form.

Link from the **Quick Reference** table only — no trailing file index.

### Review format is a sidecar

Skills that both **build** and **review** keep the standalone review
shape in `references/review-output.md`, not in `SKILL.md`. Build
invocations should not pay for a findings table they will not use.

Two things must point at it, or the agent never fires it:

1. A Quick Reference row
2. A closing **Reporting** section (two lines: "standalone review is
   finished only in that format" + "when `audit` / `interface-change-review`
   orchestrates, their format wins")

The Reporting section sits where the agent lands before writing output.
The Quick Reference row alone is read while orienting and misses that
moment.

### Common Mistakes vs Never do this

| Section | Job |
|---------|-----|
| **Never do this** | Hard forbidden — ship-breaking or house-rule violations |
| **Common Mistakes** | What agents actually do wrong *during this job*, and the fix |

Both belong. A Common Mistakes table without Never do this leaves the
hard rules implicit; Never do this without Common Mistakes misses the
usual sloppy path.

### Match the project's idiom

Write every fix in the styling system already in use (Foundations tokens
+ `ds` primitives here). Do not introduce a second stack (Tailwind,
`oklch()` literals, a new radius system) to "improve" one value.

---

## Authoring anti-patterns

Avoid these when writing or editing a skill (adapted from common Agent
Skills craft guidance):

| Anti-pattern | Why it hurts | Do this instead |
|---|---|---|
| Re-teach what the model already knows | Burns tokens; dilutes House-specific rules | Only add context the model lacks (house patterns, gates, paths) |
| Human-facing README / CHANGELOG inside the skill folder | Agents read `SKILL.md`; designers read the skill's `GUIDE.md` on its Skills page | Keep playbook in `SKILL.md`; put the designer guide in `GUIDE.md` next to it |
| Vague description ("helpful for documents") | Skill never triggers, or steals other skills' traffic | What + when + differentiator + real trigger phrases |
| Workflow summary in the description | Agent skips the body and freestyles from the blurb | Description = route; body = execute |
| Monolithic mega-skill (design + research + build + audit) | Rigid; hard to route; overlaps half the table | One skill, one concern; compose via §2 / PLAN gate |
| Assume the agent will infer critical steps | Happy-path-only skills break in production | Explicit steps + failure branches + "Never do this" |
| Style-only / tone-only skill | Belongs in profile preferences, not a skill | Reserve skills for procedures with outputs + guardrails |
| Absolute machine paths | Breaks other clones / OSes | Repo-relative paths; forward slashes |
| Time-sensitive "as of Q4…" rules | Rots silently | Point at living context files or fetch live |
| Nested reference chains (`SKILL` → `advanced` → `details`) | Agent may skim and miss hard rules | One level deep from `SKILL.md`; TOC if a reference is long |
| Principle restates the recipe (or vice versa) | Double the tokens; the two copies drift | Rule in SKILL.md; recipe in `references/`; link once from Quick Reference |
| Review format inlined in a build skill | Format is dead weight on every build | Sidecar `references/review-output.md` + two-line Reporting pointer |
| Same rule copied into two skills | Conflicts; nobody knows which is source of truth | One owner; siblings name it in backticks |
| Six synonyms in the description | Burns discovery tokens; still misses the real branch | One trigger family per job; extra phrasings in the §2 row |

**Progressive disclosure (mental model):** discovery ≈ name+description;
activation = full `SKILL.md`; execution = `references/` / scripts only
when needed. Keep `SKILL.md` lean; push detail out until required.

**Validation loop:** for fragile workflows, state verify → fix →
re-verify explicitly (this repo's `audit` gate is the canonical example
for builds).

---

## How to build a skill — step by step

### 1. Name one job

One skill = one clear responsibility. If you find yourself writing "and also does
research and builds screens and audits", split it.

Ask:

- What is the **single outcome**? (e.g. "draft notification copy that follows House standards")
- Is this **build**, **review**, **research**, or **ops**?
- Does something similar already exist? Check
  [`harness/ORCHESTRATOR.md` §2](../../harness/ORCHESTRATOR.md) and
  [`how-the-harness-works.md`](../guides/how-the-harness-works.md) inventory first.

### 2. Define triggers and boundaries

Write the `description` frontmatter **first**. Include real phrases from Slack /
Jira / design reviews.

Always add a **scope boundary** when overlap is likely:

| Your new skill | Likely confusion with | Boundary clause |
|---|---|---|
| Notifications copy | `content` | "Notification-specific templates and channels; general UI copy → `content`" |
| Notifications UX review | `ux-pattern` | "Structure and timing of notification surfaces; full flow critique → `ux-pattern`" |
| Notification prototype | `ui-agent` | "Does not build Design Harness screens — see `ui-agent`" |

### 3. List what to load before acting

Agents skip context unless you tell them not to. Be explicit:

- the company context (`COMPANY-*.md`)
- Design system (`context/design-system/…`) if visual
- Existing skill references (`references/…` in sibling skills)
- MCP requirements (Jira, Figma, Slack) — and what to do if MCP is missing

### 4. Write the workflow as numbered steps

Each step should be **actionable** — "read X", "ask Y if missing", "append to
`findings.md`", "hard-stop for human approval".

Include decision points:

- When to use `AskQuestion` (Cursor's clickable option UI — not numbered lists in chat)
- When to hard-stop vs proceed with best guess + log assumption
- When to chain another skill

### 5. Add guardrails ("Never do this")

These are the failures you have already seen in the wild. For build skills, common
ones in this repo:

- No freestyle code edits without loading `ui-agent` + `design-system`
- No invented design tokens
- No sharing without `audit`
- No dark mode in product UI inside Design Harness prototypes

For review/copy skills:

- No freestyle critique without loading `ux-pattern` / `content`
- No recommending ship without logging to `findings.md`

### 6. Split long detail into `references/`

Keep `SKILL.md` scannable (~200–400 lines max). Move into `references/`:

- Channel-specific rules (push vs email vs in-app banner)
- Annotation/card formats
- Logging contracts
- Example outputs
- **Review output format** (findings table, cap, verdict) when the skill
  also reviews — see Authoring conventions above
- Recipes that would bloat a principle (exact CSS, lookup tables)

See [`ui-agent/references/variant-fork.md`](../../harness/skills/ui-agent/references/variant-fork.md)
for a deep contract pulled out of the main skill.

Add a **Quick Reference** table in `SKILL.md` that links to these files.
That table is the only file listing.

If a sibling skill already owns a rule, **do not copy it** — name the
owner (`accessibility`, `content`) and hand off.

### 7. Wire routing

1. Add a row to **`harness/ORCHESTRATOR.md` §2** with trigger phrases — not a
   paraphrase of the topic — and one short line of notes. The full notes go in
   the same row of **`harness/references/routing-notes.md`**
2. Add one case to **`harness/harness-audit/references/eval-prompts.md`**,
   and a page at `documentation/skills/<name>.md`. `npm run build` fails if
   the page is missing or a doc states the wrong skill count.
3. If it chains with existing skills, say so in both the orchestrator row and your
   skill's "Related files"

No `.cursor/skills/` file is needed in this repo — routing lives in the orchestrator.

### 8. Test with real requests

In a fresh chat, type requests a designer would actually say. Confirm:

- Correct skill loads (agent reads your `SKILL.md`)
- Workflow steps are followed (context loaded, output in right place)
- The skill shows up in `harness/logs/skill-usage.jsonl` (recorded automatically)
- If it touches a task, mirrored in **`projects/<slug>/log.md`**

Add a scenario to [`tests/scenarios.md`](../../tests/scenarios.md) for **every**
new skill (Request / Expected / Fail conditions). That file is the
designer-ask use-cases catalog the HOWTO’s “What you say” section links to.

### 9. Commit and share

```bash
git add harness/skills/<name>/ harness/ORCHESTRATOR.md harness/harness-audit/references/eval-prompts.md documentation/skills/<name>.md
git commit -m "feat: add <name> skill for …"
```

Once merged, everyone who pulls gets the skill — no install step.

---

## Worked example: sketching a notifications skill

Below is **not** a live skill in this repo — it shows how you would design one
before writing files. Adapt names and paths to your actual scope.

### Job statement

> Help designers write and review **notification copy and notification UI patterns**
> (push, in-app banner, email subject/preview) so they follow the company voice, legal
> constraints, and channel-specific best practices.

### Routing frontmatter (draft)

```yaml
---
name: notifications
description: >-
  Draft and review the company notification copy and notification-surface UX — push,
  in-app banners, email subject lines, and preview text. Triggers on: "write a
  push notification", "review this notification", "notification copy for",
  "in-app alert wording", "email notification subject". Does not replace
  `content` for general screen copy, `ux-pattern` for full-flow structure reviews,
  or `ui-agent` for building Design Harness prototypes. Chains to `content` when broader
  copy standards apply; chains to `audit` when tied to a built prototype.
---
```

### Load before responding

1. `harness/skills/content/references/style-guide.md` — voice and tone baseline
2. `harness/skills/content/references/vocabulary.md` — approved terms
3. `references/channels.md` — **your new file**: char limits, deep-link rules, opt-out copy
4. `COMPANY-VOICE.md` — if notification tone differs from in-app screens
5. Any linked Jira / Figma the designer pasted

### Workflow (draft)

1. **Gather context** — channel (push / in-app / email), audience (provider vs client),
   market/locale, trigger event, CTA destination. Ask via one batched `AskQuestion`
   only if missing.
2. **Check channel constraints** — character limits, title/body split, required legal
   footer, deep-link format (`references/channels.md`).
3. **Draft primary + fallback** — title, body, CTA label; flag anything needing legal
   or localization review.
4. **Review mode** — if designer pasted existing copy, score against checklist; label
   findings `[House: …]` vs `[UX Heuristic: …]` (same two-layer convention as
   [`audit`](../../harness/skills/audit/SKILL.md)).
5. **Log output** — append dated entry to `projects/<slug>/findings.md` when working
   inside a task folder.
6. **Chain if needed** — Design Harness prototype of the banner → hand off to `ui-agent` →
   `audit`.

### Never do this (draft)

- Never promise delivery timing the product cannot guarantee ("instant", "always")
- Never invent opt-out / legal language — flag for human review
- Never freestyle critique when `ux-pattern` or `content` should load first
- Never build `.tsx` without `ui-agent`

### Folder you would create

```
harness/skills/notifications/
├── SKILL.md
└── references/
    ├── channels.md          ← push vs in-app vs email rules
    ├── review-checklist.md
    └── review-output.md     ← findings table only; SKILL.md Reporting points here
```

Then add the orchestrator row and test with: *"Review this push notification copy
for the no-show reminder flow"*.

---

## Reference example: `ui-agent` (build skill)

When your skill **builds** something in Design Harness, read
[`harness/skills/ui-agent/SKILL.md`](../../harness/skills/ui-agent/SKILL.md) end to end.
It is the canonical build skill in this repo.

**What it does:** Build on-brand screens using only real tokens and
`context/design-system/ds` primitives.

**Typical chain:**

```
ui-agent → design-system (auto, before CSS) → mobile-shell (if phone) → icon-usage (if icons) → audit (mandatory)
```

**Simplified workflow:**

1. Name the screen — platform, provider vs client
2. Name the archetype — from `COMPANY-ARCHETYPES.md`
3. Compose from `context/design-system/ds`
4. Tokens only — run `design-system` token-check before writing CSS
5. Prototype in Design Harness — `src/design-harness/pages/` + scoped CSS
6. Platform behavior — iOS / Android / desktop interaction patterns
7. Run `audit` — mandatory before sharing
8. Export snapshot — `projects/<slug>/artifacts/` for shareable HTML/PNG

**Hard rules worth copying into any build-adjacent skill:**

- No raw hex or invented components
- No sharing without audit
- Log decisions to `decisions.md`, outputs to `findings.md`

---

## Checklist before you open a PR

- [ ] `SKILL.md` has YAML frontmatter with **real trigger phrases**
- [ ] Scope boundary names the skill(s) it does **not** replace
- [ ] "Load before …" lists every file the agent needs
- [ ] Workflow is numbered and actionable
- [ ] "Never do this" covers known failure modes
- [ ] Long detail lives in `references/`, not a 800-line `SKILL.md`
- [ ] **Quick Reference** table is the only listing of those reference files
- [ ] Each hard rule has **one owner**; siblings name it in backticks, they do not restate it
- [ ] If the skill both builds and reviews: review format lives in `references/review-output.md` + a two-line **Reporting** pointer
- [ ] **Common Mistakes** table (usual sloppy path) in addition to **Never do this** (hard forbidden)
- [ ] Row added to `harness/ORCHESTRATOR.md` §2
- [ ] One case added to `harness/harness-audit/references/eval-prompts.md`
- [ ] `npm run docs:check` passes (skill page exists, counts match)
- [ ] **Designer guide** — `harness/skills/<skill-name>/GUIDE.md` in the
      same shape as [`ticket-create`](../../harness/skills/ticket-create/GUIDE.md) /
      [`writing`](../../harness/skills/writing/GUIDE.md) (quick reference, what it
      solves / does not, **What you say** use cases, flow, related).
      It shows on the skill's page in Skills (not in Documentation). Link it
      from the `how-the-harness-works.md` inventory row and the §2 / Related-files notes. **Every new skill
      gets one** — not optional.
- [ ] **Use cases in the HOWTO** — a **What you say (plain language)**
      section (example phrases a designer would type) **plus** a short
      situations table. Match
      [`variation-review-board.md`](../guides/variation-review-board.md)
      / the UXR HOWTOs. Link the matching scenario below.
- [ ] **Acceptance scenario** — add a numbered scenario to
      [`tests/scenarios.md`](../../tests/scenarios.md) (Request / Expected /
      Fail conditions / link to the HOWTO). That file is the harness
      use-cases walkthrough catalog — not optional for a new skill.
- [ ] **Broad docs freshness pass** — update overview surfaces + append
      one line to `harness/logs/docs-freshness.md` (see
      [`docs-freshness.md`](docs-freshness.md))
- [ ] Tested with at least one fresh-chat request; shows up in `skill-usage.jsonl`
- [ ] If it outputs to a task folder, documents append-only rules for
      `findings.md` / `decisions.md`

---

## Who to sync with

| Question | Who / where |
|---|---|
| Does this overlap an existing skill? | Read §2 in [`harness/ORCHESTRATOR.md`](../../harness/ORCHESTRATOR.md); ask in #design-system-lab or your squad channel |
| Routing / harness conventions | Design ops / harness maintainers — [`harness/agents/design-ops.md`](../../harness/agents/design-ops.md) |
| Token / DS rules for build skills | [`design-system/GUIDE.md`](../../harness/skills/design-system/GUIDE.md) + Colin (design system) when back |
| Copy / voice for notification wording | `content` skill owners + content design |
| "Is this routable?" audit | [`harness/logs/routing-standards.md`](../../harness/logs/routing-standards.md) |

If you are building a **notifications skill for Claude** outside this repo, the same
shape applies — frontmatter triggers, load-before list, workflow, guardrails,
references folder. The difference here is you also wire it into **our orchestrator**
so the whole team gets consistent behavior on pull.

---

## One-liner to share

> A skill is a markdown playbook that teaches the AI how to do one design job the
> the company way. You write triggers in the frontmatter, a numbered workflow, hard
> guardrails, a Common Mistakes table, and optional reference docs (Quick Reference
> is the only file listing) — then add one row to the orchestrator routing table so
> plain-language requests find it automatically.

---

## Related docs

| Doc | When to read it |
|---|---|
| [`how-the-harness-works.md`](../guides/how-the-harness-works.md) | Full system architecture, chains, request-flow diagram |
| [`harness/logs/routing-standards.md`](../../harness/logs/routing-standards.md) | How to write routable descriptions |
| [`harness/ORCHESTRATOR.md`](../../harness/ORCHESTRATOR.md) | Routing table + plan gate + state rules |
| [`README.md`](../../README.md) | Skill inventory and harness overview |
| [`projects/README.md`](../../projects/README.md) | Task folder schema (`brief`, `findings`, `decisions`, `log`) |
| [`docs-freshness.md`](docs-freshness.md) | Overview docs when a new skill ships |
