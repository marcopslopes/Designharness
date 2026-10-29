# Designer onboarding — order and details

The full text of `harness/ORCHESTRATOR.md` §0. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

**Check** on every new chat whether `designer-profile.local.md` exists.
**Run** full onboarding only when missing. New chat ≠ new clone — if the
file exists, skip silently (no MCP gate, no questions, no handoff).

- **Missing** → run `harness/designer-onboarding/SKILL.md` first, **in
  this exact order — do not reorder, and do not start from the MCP
  gate:**

  1. **Step 0a — the Muse greeting**, verbatim or close, as the
     literal first content of the turn, **before any tool call at all**
     (including the MCP probe below). Two plain-text blocks — name +
     capabilities bullet list, then the MCP-explanation/transparency
     line — never a blockquote. See `SKILL.md` § The greeting and § The
     greeting's own "Execution order, unambiguous" section for the
     regression this ordering note exists to prevent: a live run that
     put the greeting *after* the role-focus question and the handoff
     menu, because a stale summary (this section, before this fix) never
     mentioned the greeting at all and described the sequence as
     starting from the MCP gate.
  2. **Step 0b — optional tool setup** — ask which tools the team uses
     (or "None"); only the tools picked must be connected before the one
     profile question. "None" skips the probe (`references/mcp-check.md` +
     `documentation/setup/mcp-setup.md`; the `npm install`-does-not-
     configure-MCPs line fires here, once, on the first probe).
  3. **One question** (role focus — 7 values: product / content /
     accessibility / research / **manager** / mix / **not sure yet**),
     preceded by one sentence of context; name resolved silently via
     the connected tracker first. **For `product`/`mix` (including "not sure
     yet"):** also runs **Step 1c — silent squad resolve** right after
     the role-focus answer, no question asked — checks the resolved
     name against `COMPANY-SQUADS.md`'s per-squad "Product
     designer" columns; a clean single-name match auto-fills `Squad
     assignment:` directly, no match leaves it unset. **For the 5 IC
     values:** write `designer-profile.local.md` with platform,
     interaction style, and experience level left explicitly unset —
     deferred to first real use, or opt-in via "set up my full profile
     now", per `harness/designer-onboarding/SKILL.md` § Deferred and
     opt-in fields. **Squad assignment is either already filled in
     (Step 1c above) or unset/deferred** the same way.
  4. **Write the profile, verify it's actually gitignored** (a real
     `git status --porcelain` check, not an assumed pass), **then**
     auto-run `workload-agent` scoped to the **personal queue plus
     squad-scoped legs if squad is already known, personal queue only
     otherwise** (`references/onboarding-workload-scope.md` —
     squad-scoped legs activate once squad is known, whether via Step
     1c, opt-in, or filled in later). **For manager:** one immediate
     follow-up ("who do you oversee," pre-filled from
     `COMPANY-SQUADS.md` § Design leadership) replaces squad
     assignment entirely, stored as `Reports:`; `workload-agent` runs
     **Step 2b′ manager mode** instead (batched per-report team
     snapshot, no personal queue at all) — see
     `harness/designer-onboarding/SKILL.md` § Manager role focus.
  5. **Then the handoff** (`references/post-onboarding-handoff.md`) —
     confirm-save line, then a **personalized bolded headline** (never a
     generic recap table — names the designer, their squad if known,
     and a specific "side thread" ticket only if
     `onboarding-workload-scope.md`'s detection rule finds one), then
     the workload table(s). **The next-step menu fires strictly after
     that table, only if the opening message was vague — never before
     or alongside it.**
  6. **Then** continue with whatever the designer actually asked for in
     that same turn when the ask was specific.

  Worst case this is 2 questions total for IC values (role focus + the
  vague-open handoff menu), common case 1; **manager is 2 guaranteed, 3
  worst case** (role focus + reports + the vague-open menu) — still far
  short of the pre-shortening 8–10.
- **Exists** → skip silently, read it, and use its answers to fill in
  Step 1's platform/stage inference, vague-follow-up disambiguation, and
  Step 3's plan-gate behaviour below. Never re-ask what it already answers.

**Optional personal context folder:** `designer-context.local/` at the repo
root (gitignored, same privacy as the profile file). Extra `.md` notes —
including **nested folders** and **private `sources.md` link catalogs** —
for standing context the designer does not want committed. See
`harness/designer-onboarding/references/designer-context-local.md` and
`documentation/guides/designer-context-local.md`. Read the root `README.md` first,
then relevant files/subfolders when a task benefits; don't paste into
committed files without the designer's OK.

This only happens once per clone. See `harness/designer-onboarding/SKILL.md`
for the full protocol, including the opt-out path.

## The sessionStart hook

**A `sessionStart` hook also exists** (`.cursor/hooks.json` →
`.cursor/hooks/designer-onboarding-check.sh`) doing the same check via
Cursor's documented hook schema — this is the theoretically cleaner
mechanism, but it does not currently work: Cursor has a confirmed platform
bug where `sessionStart`'s `additional_context` output isn't reliably
injected into the model's context (see the hook script's own comments for
sources). It's kept in place so onboarding gets hook-based enforcement for
free once that's fixed, but **the auto-loaded `AGENTS.md`/`CLAUDE.md`
pointer files — not the hook — are what actually get this section read
today**, since neither tool auto-loads `harness/ORCHESTRATOR.md` directly.
