# Onboarding questions — exact `AskQuestion` scripts

Load `COMPANY-SQUADS.md` for squad definitions and roadmap
routing. This file is the **UI script** — what to show, in what order.

**As of the onboarding shortening pass, only Step 1's role-focus question
runs by default.** Everything below Step 1 (squad assignment, plus the
legacy platform/interaction-style/experience-level questions) is **deferred
to first real use or opt-in only** — see `SKILL.md` § Deferred and opt-in
fields and `profile-template.md` § Legacy full batch. This file's scripts
still apply verbatim whenever those questions actually do run (opt-in, or
a downstream skill hits a genuine ambiguity it can't infer around) — the
UI content didn't change, only when it fires.

**Always use domain → squad (Steps 2a → 2b) whenever squad assignment
does run.** Never dump every squad into one flat list — it truncates in
Cursor and hides provider squads.

---

## How to ask — Cursor `AskQuestion` tool (mandatory)

Repo-wide contract: **`harness/references/ask-question-ui.md`** (also
`.cursor/rules/ask-question-ui.mdc`). Every fixed-choice question in this
file follows that contract — call the native `AskQuestion` tool; never
numbered/bulleted option lists in chat. See `SKILL.md` § `AskQuestion`
means a real tool call.

For Step 1 payloads below, use the exact JSON. For tool shape and
forbidden patterns, read the shared reference — not duplicated here.

**Say one sentence of context before the question — don't open cold.**
The point is to make the trade explicit (one question now, instead of the
8–10 this used to be), not just have the designer experience it silently:

> "One thing helps me route your work correctly and skip the rest of the
> usual setup questions:"

— then immediately the `AskQuestion` below, same message, no pause between
the sentence and the tool call.

---

## Step 1 — About you (default: one `AskQuestion`, one question)

Name is resolved **silently** from the connected tracker (Jira, Linear, or
GitHub — see `profile-template.md` § Name) before this question — no name question by default.
Only fall back to asking if that resolution fails or is ambiguous.

Then **call `AskQuestion`** with this payload (ids/labels exact):

```json
{
  "title": "Designer profile",
  "questions": [
    {
      "id": "role_focus",
      "prompt": "What's your role focus?",
      "allow_multiple": false,
      "options": [
        { "id": "product", "label": "Product design" },
        { "id": "content", "label": "Content design" },
        { "id": "accessibility", "label": "Accessibility" },
        { "id": "research", "label": "Research" },
        { "id": "manager", "label": "Manager" },
        { "id": "mix", "label": "Mix" },
        { "id": "not_sure", "label": "Not sure yet" }
      ]
    }
  ]
}
```

| Option id | Stored as | Notes |
|---|---|---|
| `product` | `product` | |
| `content` | `content` | |
| `accessibility` | `accessibility` | |
| `research` | `research` | |
| `manager` | `manager` | Immediate Step 1b follow-up — see below |
| `mix` | `mix` | |
| `not_sure` | `mix` *(flagged `— unconfirmed default`)* | See `profile-template.md` |

**Manager** triggers one immediate follow-up (Step 1b below) instead of
deferred squad assignment — see `SKILL.md` § Manager branch.

---

## Step 1b — Manager branch (only if role focus = Manager)

Unlike the 5 IC values, **Manager skips squad/domain assignment entirely**
— a manager isn't scoped to 1–2 squads the way an IC is. Instead, ask
this **immediately, same turn**, right after the role-focus pick (not
deferred — there's no cheap safe default for "who's on your team" the way
there is for platform/interaction-style/experience-level).

**This is the single most impressive thing this flow does — say so like
it, don't bury it as a generic follow-up.** Correctly inferring a
manager's team from org data, unprompted, deserves its own beat, not
just another item in the sequence:

1. **Search `COMPANY-SQUADS.md` § Design leadership** for the
   resolved name (from Step 1's silent tracker resolution).
2. **Match found** — one `AskQuestion` tool call, multi-select,
   pre-loaded with the table's reports list. The tool's own built-in
   "Other…" covers anyone missing — do not declare your own. Lead with
   the inference stated as a fact the designer can correct, not a guess
   they're being asked to validate from scratch.
   Example shape:

   ```json
   {
     "title": "Your team",
     "questions": [
       {
         "id": "reports",
         "prompt": "One more thing, since you're a manager — I can already see from the org data that you lead design across [domain(s)], which puts [Name A, Name B, …] on your team. Confirm or edit:",
         "allow_multiple": true,
         "options": [
           { "id": "name_a", "label": "Name A" },
           { "id": "name_b", "label": "Name B" }
         ]
       }
     ]
   }
   ```

   Deselecting a pre-loaded name removes them; the tool's own built-in
   **Other…** adds a free-text name not on the list.
3. **No match** — one `AskQuestion` tool call. Be upfront that the
   inference didn't land here — use this prompt in the tool call (not a
   numbered list in chat prose):

   ```json
   {
     "title": "Your team",
     "questions": [
       {
         "id": "reports",
         "prompt": "One more thing, since you're a manager — I don't have your team mapped from org data, so I'll need it from you: who do you oversee? List the designers who report to you.",
         "allow_multiple": false,
         "options": [
           { "id": "skip", "label": "Skip for now" }
         ]
       }
     ]
   }
   ```

   **Skip for now** leaves `Reports:` unset/deferred, same philosophy as
   every other optional field. `workload-agent` manager mode and
   `manager-1on1-prep` both say so plainly rather than silently failing
   when this is empty (see their own SKILL.md files).
4. Store the confirmed/edited list as `Reports: <Name A>, <Name B>, …` in
   the profile. `Squad assignment:` becomes `N/A — manager role, see
   Reports` (see `profile-template.md` § Manager profile shape).

Platform, interaction style, and experience level are **still deferred**
for manager profiles, exactly as for IC profiles — only squad is replaced
by this branch, nothing else changes.

---

## Step 1c — Silent squad resolve (no `AskQuestion` — a lookup, not a question)

**Only runs if role focus stores as `product` or `mix`** (including "Not
sure yet"). Never runs for content / accessibility / research (those
roles' squad relationship is inherently multi-squad/embedded — the
directory this checks against models single-owner *product* squads, not
that) or manager (handled entirely by Step 1b above instead).

Uses the `Name` already resolved silently in Step 1 — **no new tool
calls, no question, nothing shown to the designer unless a match is
found** (and even then, it's stated as a fact in the handoff recap, not
asked as a question):

1. Search `COMPANY-SQUADS.md`'s per-squad "**Product designer**"
   columns for the resolved name.
2. **Exactly one clean match** (the cell's literal value *is* the name —
   an informal note such as "— (embedded designers; Sam
   on referrals)" is **not** a clean match, even though the name
   appears there; neither is a `*(name)*` placeholder) → write `Squad assignment:` directly:
   - `Mode: dedicated`
   - `Domains:` — the **Step 2a picker label** for that squad's domain
     (e.g. `Store Growth`, `Core Product`),
     not `COMPANY-SQUADS.md`'s official domain-table header string — so
     this matches exactly what an opt-in answer to 2a would have stored
   - `Squads:` — that squad
   - `Primary squad:` — that squad
3. **Zero matches, or name only appears in an informal note** → leave
   `Squad assignment:` unset/deferred, exactly as if this step didn't
   exist. Do not loosen the match rule to "cover more designers" — that
   would mean asserting an org fact `COMPANY-SQUADS.md` doesn't
   actually have.
4. **More than one clean match** (not possible with current directory
   data) → do not pick one; leave unset/deferred, add a `Notes:` line
   flagging the ambiguity.

**Only squads whose designer cell holds a real name are eligible.** The
Northline example pack has placeholders only, so nothing auto-fills until
a local pack names designers. Coverage stays as narrow as the directory
is; never pattern-match wider.

**If this fills in `Squad assignment:`**, the onboarding workload
snapshot and handoff run their full shape immediately (roadmap + squad
execution legs), and the opt-in "set up my full profile now" path (below)
skips re-asking 2a–2c since it's already answered — it only asks the
remaining legacy-batch questions (platform, interaction style,
experience level).

---

**Legacy batch (opt-in only — not asked by default, IC roles only):**

| # | Question | Options | Notes |
|---|---|---|---|
| — | Primary platform? | iOS / Android / Web / All three | Deferred — `ORCHESTRATOR.md` §1 asks this per-task if needed and writes the answer back here. |
| — | For simple single-step asks… | Always show a plan first / Just go ahead | Deferred — `ORCHESTRATOR.md` §3's standing-preference log already covers this independently. |
| — | Experience with this repo's tokens & Figma? | New / Already fluent | Deferred — defaults to "new" explanation depth until told otherwise. |

---

## Step 2a — Domain (one `AskQuestion`, deferred/opt-in only — skipped entirely if Step 1c already resolved squad silently)

**Prompt by role:**

| Role | Prompt | `allow_multiple` |
|---|---|---|
| **content** | Which **domains** do you support as content? Pick all that apply. | `true` |
| **mix** (with content) | Same as content | `true` |
| **mix** (no content) | Which **domain** are you mainly in? | `false` |
| **product** | Which **domain** are you mainly in? | `false` |
| **accessibility** / **research** | Which **domain(s)** do you mainly partner with? | `true` |

**Options (always this set):** built from the resolved `COMPANY-SQUADS.md` domains. The labels below are the Northline example pack.

| ID | Label |
|---|---|
| `growth` | Store Growth (Onboarding, Launch, Plans) |
| `core` | Core Product (Stock, Suppliers, Counter) |
| `finance` | Finance (Payments, Wallet) |
| `trade` | Trade customers (Ordering) |
| `cross` | Cross-cutting (Content central, Design system, Research) |

If they pick **only** `cross` and role is **content**, skip to cross-cutting
squads in 2b. If role is **product** and they pick `cross`, clarify which
product domain they actually embed in.

---

## Step 2b — Squad (one `AskQuestion`, filtered by 2a)

Show **only** squads for domain(s) selected in 2a. `allow_multiple` same
rules as Step 2 in `profile-template.md` (multi for content/a11y/research).

### If `growth` selected

| Label |
|---|
| Onboarding |
| Launch |
| Plans |

### If `core` selected

| Label |
|---|
| Stock |
| Suppliers |
| Counter |
| Reports *(stream → Suppliers)* |
| Navigation *(stream → Counter)* |
| Referrals *(stream → Counter)* |

### If `finance` selected

| Label |
|---|
| Payments |
| Wallet |

### If `trade` selected

| Label |
|---|
| Ordering |

### If `cross` selected

| Label |
|---|
| Content design (central) |
| Design system |
| Research / Enablement |

**Always append:** a real `"Mix / multiple squads"` option (a meaningful
answer, not free text). Do not also add an explicit `"Other…"` entry — the
tool's own built-in "Other…" already covers anything not listed.

**Prompt examples:**
- Content: *"Which squads do you support? Pick all that apply."*
- Product: *"What's your primary squad?"*

---

## Step 2c — Primary squad (only if 2+ squads picked)

One `AskQuestion`, single-select, options = only what they picked in 2b:

> "Which do you spend the **most** time in?"

Skip if they picked exactly one squad.

---

## Step 0b — Tool selection (MCP gate — before role focus)

**When to ask:** Immediately after the greeting (Step 0a), before the role focus question (Step 1). This replaces the mandatory 4-MCP hard gate with a flexible tool-selection approach.

**One sentence of context before the question:**

> "First, which tools does your team use? I'll connect only the ones you need."

— then immediately the `AskQuestion` below, same message.

**Call `AskQuestion`** with this payload:

```json
{
  "title": "Tool setup",
  "questions": [
    {
      "id": "tools_used",
      "prompt": "Which tools does your team use?",
      "allow_multiple": true,
      "options": [
        { "id": "atlassian", "label": "Jira or Confluence (Atlassian)" },
        { "id": "notion", "label": "Notion (docs, wiki, or roadmap)" },
        { "id": "linear", "label": "Linear (tickets and projects)" },
        { "id": "github", "label": "GitHub Issues or Projects" },
        { "id": "google-docs", "label": "Google Docs or Drive" },
        { "id": "slack", "label": "Slack (team chat)" },
        { "id": "figma", "label": "Figma (design)" },
        { "id": "miro", "label": "Miro (boards)" },
        { "id": "none", "label": "None of these / I'll skip tool setup" }
      ]
    }
  ]
}
```

**Actions per selection:**

| Selected tools | Action |
|----------------|--------|
| **Any tools selected** (not "none") | Check each selected MCP via `GetDynamicTools`. For each one: if `needsAuth` or not installed, show install instructions. If all selected MCPs are connected, proceed to Step 1 (role focus). Store selected tools in profile as `MCP tools: atlassian, slack, figma` (comma-separated list) **and** the resolved jobs as `Work tools: docs=…, tracker=…, roadmap=…, chat=…` per `harness/references/work-tools.md`. If two picked tools could fill the same job (e.g. Notion and Confluence for docs), ask once which the team uses for that job. |
| **"None of these"** | Skip MCP setup entirely. Proceed to Step 1. Store `MCP tools: none` and `Work tools: docs=none, tracker=none, roadmap=none, chat=none`. Skills use the fallbacks in `work-tools.md` (Markdown files, or asking the designer to paste). |

**Install flow for selected tools:**

For each selected tool that needs setup:

1. Show status: `✓ Linear connected` or `✗ Figma (needs auth)`
2. Show install instructions for missing tools only (link `documentation/setup/mcp-setup.md`)
3. Wait for designer to reply **ready**
4. Re-check via `GetDynamicTools`
5. Repeat until all selected tools are connected

**Graceful degradation:**

Skills check the profile's `Work tools:` line (and `MCP tools:`) before running:
- `workload-agent` needs a tracker → if `tracker=none`, ask the designer to paste their open tickets
- `org-pack-builder` extracts from available tools only
- `research-agent` searches whichever docs tool, tracker, and chat are connected, and skips Miro scans if Miro isn't

**Never** block skills entirely if some MCPs are missing — degrade gracefully and explain what's skipped.

---

## Org-pack question (Step 3.5 — after handoff, if org-pack.local/ missing)

**When to ask:** After the handoff tables (Step 5 in `SKILL.md`), if
`context/org-pack.local/` doesn't exist yet (fresh clone). This is a
**repo-level** check, independent of the designer profile.

**One sentence of context before the question:**

> "One more thing — I can build your company context (vocabulary, voice,
> patterns) automatically from your tools, so every skill uses your real
> company info instead of the example pack."

— then immediately the `AskQuestion` below, same message.

**Call `AskQuestion`** with this payload:

```json
{
  "title": "Company context setup",
  "questions": [
    {
      "id": "org_pack_mode",
      "prompt": "How do you want to set up your company context?",
      "allow_multiple": false,
      "options": [
        { "id": "mcp_extraction", "label": "Build from your connected tools (recommended)" },
        { "id": "manual_interview", "label": "I'll answer questions manually" },
        { "id": "keep_example", "label": "Keep the example for now" },
        { "id": "dont_ask", "label": "Don't ask again this clone" }
      ]
    }
  ]
}
```

**Actions per option:**

| Option id | Action |
|-----------|--------|
| `mcp_extraction` | Call `harness/skills/org-pack-builder/SKILL.md` in **Mode B (MCP extraction)**. Auto-extract from whichever docs tool, tracker, Figma, and chat were connected in Step 0b. Show extraction summary when done. |
| `manual_interview` | Call `harness/skills/org-pack-builder/SKILL.md` in **Mode A (guided interview)**. Ask 6 sections of questions (business, vocabulary, voice, patterns, squads, archetypes). |
| `keep_example` | Do nothing. Skills resolve to `context/org-pack/` (Northline example). Offer again on next clone-level check. |
| `dont_ask` | Never offer this again on this clone. Note this doesn't affect other clones. |

**Why MCP extraction is recommended:** Extracts domain vocabulary,
terminology conflicts, and company context from real artifacts (tickets,
docs, Figma components) — less manual work, more accurate, includes
Layer 2 (domain mapping) that was historically missing.

---

## What to write in the profile

For each squad in 2b, store label + parent domain from `COMPANY-SQUADS.md`.
For stream labels (Reports, Navigation, Referrals), also note `parent_squad` in
profile Notes — e.g. `Reports → Suppliers`.

---

## Step 3 — Handoff (conversational, same turn)

After writing the profile, see `references/post-onboarding-handoff.md`
(tables) + `references/handoff-menu-question.md` (`AskQuestion` menu).
