# Step 0b — Optional tool setup (flexible gate)

**Only when `designer-profile.local.md` is missing.** If the profile file
exists, **do not run this step** — not on new chats, not for "verification".

Run **immediately after the greeting** (Step 0a) on first-time onboarding only.

`npm install` does **not** configure MCPs — say that once, plainly. **This
now fires here, not in the greeting** (moved out per the 2026-07-17
greeting re-spec, which keeps the greeting to exactly its two plain-text
blocks — bold opener + bullet list, never a blockquote, see `SKILL.md`
§ The greeting): **on the very first probe of a session only**, say this
one line before calling the tool-selection `AskQuestion`:

> `npm install` only sets up Design Harness — connecting your team's tools comes
> next.

Do not repeat this line on a later `ready`/re-probe turn (§ C below) — say
it once, on the first probe, then move straight to the tool selection.

Full human doc: `documentation/setup/mcp-setup.md`.

---

## Available MCPs (designer selects which ones to use)

Each tool fills one or more **jobs** (docs, tracker, roadmap, chat). Which
tool does which job is resolved by `harness/references/work-tools.md` —
skills never assume one vendor.

| MCP | Jobs | Connect in | Verify with |
|-----|------|------------|-------------|
| **Atlassian** (Jira, Confluence, Product Discovery) | tracker, docs, roadmap | Cursor Settings → MCP → Atlassian (your work account) | `atlassianUserInfo` succeeds |
| **Notion** | docs, roadmap | Cursor Settings → MCP → Notion | `GetDynamicTools` → connected |
| **Linear** | tracker, roadmap | Cursor Settings → MCP → Linear | `GetDynamicTools` → connected |
| **GitHub** | tracker, roadmap | Cursor Settings → MCP → GitHub | `GetDynamicTools` → connected |
| **Google Drive / Docs** | docs | Cursor Settings → MCP → Google Drive | `GetDynamicTools` → connected |
| **Slack** | chat | Cursor Settings → MCP → Slack (your work workspace) | `GetDynamicTools` → connected |
| **Figma** | design | Cursor Settings → MCP → Figma (your work account) | `GetDynamicTools` → connected |
| **Miro** | boards | Cursor Settings → MCP → Miro — or [Miro MCP for Cursor](https://miro.com/marketplace/miro-mcp-for-cursor/) | `GetDynamicTools` → connected |

Server IDs vary by install — match by name (`atlassian`, `notion`, `linear`,
`github`, `google`, `slack`, `figma`, `miro`).

**Graceful degradation:** Skills check which tools are connected and adapt:
- `workload-agent` reads whichever tracker is connected; with none, it asks for a paste of open tickets
- `org-pack-builder` extracts from available tools only
- `research-agent` searches the connected docs tool, tracker, and chat, and skips Miro scans if not connected
- **No skill blocks entirely** — they explain what's skipped and continue

---

## Gate workflow (every time profile is missing)

### A — Tool selection

1. Say the npm-install disclaimer line (first probe only).
2. **Call `AskQuestion`** with the tool-selection payload from
   `onboarding-questions.md` § Step 0b: "Which tools does your team use?"
   Multi-select, options: Atlassian (Jira or Confluence), Notion, Linear,
   GitHub, Google Docs, Slack, Figma, Miro, or "None of these".
3. Store designer's answer.

### B — Probe selected tools

1. If they picked **"None of these"** → skip to Step C (no MCPs).
2. Otherwise, call **`GetDynamicTools`** — read `namespaceStatus` for each
   selected tool.
3. If Atlassian is selected and shows connected, call
   **`atlassianUserInfo`** — auth must succeed, not just "listed". For other
   trackers, one cheap read (the current user, or a one-item list) confirms
   auth the same way.

### C — If any selected MCP is missing, `needsAuth`, or `error`

**Show progress, not just a blocker.** Present selected tools as a checklist
filling in, not a flat pass/fail table repeated unchanged on every reply.
Whatever's already connected on this first probe (a designer may have set
some of these up before the chat even started) gets its checkmark immediately
— never present an already-connected MCP as if it were still pending.

Output in this order:

1. **Status checklist** — only selected tools, ✓ for connected, plain status
   text for the rest (`needs auth`, `not installed`, `error`).
2. **Install checklist** — numbered steps for missing tools only; link
   `documentation/setup/mcp-setup.md`.
3. **Current blocker** — name the **first** disconnected MCP and give the
   exact action (e.g. "Open Cursor Settings → MCP → Atlassian → Sign in
   with your work account").
4. **Close** — one line only:

> Connect the MCPs above, then reply **ready** (or **MCPs connected**) and
> I'll check off whatever's newly connected.

**Forbidden while gate is open:** the profile question, squad assignment,
workload snapshot, handoff menu, or routing to other skills.

### D — When designer replies `ready` / `MCPs connected` / similar

Re-run **B** (probe selected tools). This is the live-progress moment —
**don't just reprint the same table fresh.** Show the checklist again with
any newly-passing MCP's box now checked, and say which ones flipped since
last time (e.g. "Figma and Slack just connected — 2 of 3 now, Linear's still
the holdout"), not a context-free restatement. If everything but one MCP is
already connected, say so plainly rather than re-listing the ones that are
fine.

If still failing, name what's still broken and **stay on the gate**. If all
selected MCPs pass → say one line: "All your selected tools are connected —
setup done." — then proceed to **Step 1** (role focus) in the same turn.

### E — Store selected tools in profile

After gate passes (or if "None of these" was chosen), write to
`designer-profile.local.md`:

```markdown
- MCP tools: notion, linear, slack, figma
- Work tools: docs=notion, tracker=linear, roadmap=linear, chat=slack
```

`MCP tools:` is the comma-separated list of selected tool ids, or `none`.
`Work tools:` maps each job to a tool per `harness/references/work-tools.md`
— if two picked tools could fill the same job, ask once which one the team
uses for it.

Skills read these lines to check availability before running MCP-dependent
operations.

### F — Opt-out (only explicit)

If they say **skip onboarding** / **don't ask setup questions** → write
`Status: SKIPPED` per template and stop (MCP gate waived). Do **not** treat
"I'll connect later" as opt-out — stay on the gate.

If they **cannot get access** (no MCP permission at their org): explain what's
blocked, link `cursor-mcp-setup.md`, offer IT/access path, or opt out of
onboarding entirely. Do not run partial profile setup.

---

## Tone

Peer-to-peer, checklist-clear, no hype, no exclamation marks. This is
flexible tool setup, not a rigid gate. Frame tool connection as progress
accumulating based on what the designer actually needs, not a wall you're
reporting back on — see the checklist filling in across the example turns
below.

**Example A (designer selects Linear + Figma only, one already connected):**

> `npm install` only sets up Design Harness — connecting your team's tools comes
> next.
>
> *(tool-selection `AskQuestion`: designer picks Linear, Figma)*
>
> Checking Linear and Figma:
>
> | Tool | Status |
> |------|--------|
> | Linear | needs auth |
> | Figma | ✓ connected |
>
> **Install:**
> 1. Cursor Settings → MCP → **Linear** — your work account
>
> Full guide: `documentation/setup/mcp-setup.md`
>
> **Next:** connect **Linear** — reply **ready** when done.

**Example B (designer replies `ready` after connecting Linear — live update):**

> Linear just connected:
>
> | Tool | Status |
> |------|--------|
> | Linear | ✓ connected |
> | Figma | ✓ connected |
>
> All your selected tools are connected — setup done.
>
> *(Step 1 `AskQuestion` — role focus)*

**Example C (designer selects "None of these" — no MCP setup):**

> `npm install` only sets up Design Harness — connecting your team's tools comes
> next.
>
> *(tool-selection `AskQuestion`: designer picks "None of these")*
>
> Skipping MCP setup. Skills that need external tools (like `workload-agent`
> for tickets) will explain what's unavailable when you try to use them.
>
> *(Step 1 `AskQuestion` — role focus)*

**Example D (designer selects all 5 tools, all already connected):**

> `npm install` only sets up Design Harness — connecting your team's tools comes
> next.
>
> *(tool-selection `AskQuestion`: designer picks all 5)*
>
> All five tools are already connected — setup done.
>
> *(Step 1 `AskQuestion` — role focus)*

---

## After profile exists

Tool selection and MCP gate do not re-run. If a later skill hits MCP auth
errors or finds a needed tool isn't in the `MCP tools:` list, that skill
should:

1. Check the profile's `MCP tools:` list first
2. If the needed tool isn't listed, decline plainly: "I need a tracker (Jira, Linear, or GitHub) to run
   this, but it wasn't set up during onboarding. Want to connect it now?"
3. If listed but auth fails, point to `documentation/setup/mcp-setup.md`

**Never** re-run full onboarding. Offer to add a tool to the profile's list
if the designer wants to expand their setup later.
