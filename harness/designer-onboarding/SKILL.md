---
name: designer-onboarding
description: >-
  One-time setup for a fresh clone — after the mandatory MCP gate, asks
  exactly **one** question (role focus) and writes a local, gitignored
  `designer-profile.local.md` at the repo root. Everything else that used
  to be asked upfront (name, platform, interaction style, experience level,
  squad assignment) is now resolved silently, deferred to first real use,
  or available on request via an opt-in full setup — see `references/
  onboarding-questions.md`. Enforced via the always-applied workspace rule
  in `AGENTS.md`/`CLAUDE.md` — see `harness/ORCHESTRATOR.md` §0. Never runs
  again once the profile exists unless the designer asks to update it.
---

# Designer onboarding

Every designer runs their own local clone of this repo (see `README.md`) —
there's no shared server, so nothing about *how a specific person likes to
work* carries over automatically. This skill captures the minimum needed
to stop re-asking standing questions, and gets a designer to a working
state fast: **one question**, not an interview.

This is different from the per-task "just do it" preference in
`harness/ORCHESTRATOR.md` §3, which is scoped to one task's `decisions.md`. This
profile is cross-task and lives for the lifetime of the clone.

**Design principle for this whole skill:** load-bearing stuff (the MCP
gate) is a hard blocker, not a question. Everything else is either cheap
enough to ask once upfront (role focus — one question), resolvable
silently from a tool call (name), or genuinely only answerable in the
context of a real task (platform, squad) — so it gets deferred there
instead of asked in the abstract before any task exists. Nothing is
deleted: a designer who wants the full original sequence upfront can
still ask for it in one line. See "Deferred and opt-in fields" below.

---

## When this fires

**Once per clone — not once per chat.** The agent **must `Read`
`designer-profile.local.md` first** (see `.cursor/rules/designer-profile-gate.mdc`).
Only a **not-found** read triggers this skill.

**No narration leak on that `Read`** — found live (2026-07-17) as "Checking
your designer profile, then I'll greet you back": a forward-looking clause
leaking into user-facing text before the `Read`'s result is even known.
Run the gate-check silently, or if you narrate it, stop at "Checking your
designer profile..." — nothing about what happens after. See
`.cursor/rules/designer-profile-gate.mdc` for the same rule.

- **File exists** (`ACTIVE` or `SKIPPED`) → **stop** — do not load this
  skill's steps, MCP gate, or handoff. Read the profile and continue with
  the user's task. **Forbidden:** onboarding greeting, MCP status table,
  profile `AskQuestion`, squad `AskQuestion`, handoff workload tables,
  handoff menu `AskQuestion`.
- **File missing** → **before calling any tool**, output the greeting
  from § The greeting below (verbatim, or close to it) as the first
  content of your response. Then run all numbered steps below (starting
  with the MCP probe), then handle the designer's request in the same
  turn. **The greeting is Step 0a of the numbered list below, not
  optional scene-setting** — see § The greeting and § Steps for why this
  needs to be stated this bluntly.
- **Designer explicitly says "skip this" / "don't ask me setup questions"**
  → write the file anyway with `Status: SKIPPED` (see template) so this
  never fires again for this clone. Respect the opt-out.

**A `sessionStart` hook also exists** for this
(`.cursor/hooks.json` → `.cursor/hooks/designer-onboarding-check.sh`),
implementing the same check per Cursor's documented hook schema. It's
currently a no-op in practice — Cursor has a confirmed platform bug where
`sessionStart`'s `additional_context` output isn't reliably injected into
the model's context (verified while testing this skill: the hook fires and
returns the correct JSON per Cursor's Hooks output channel, but a fresh
session showed no sign of it). It's kept in the repo so onboarding gets a
second, hook-based enforcement path for free once Cursor ships a fix — but
don't rely on it, and don't be surprised if a fresh session doesn't
visibly reflect it. The workspace-rule path above is what actually works.

---

## Execution order, unambiguous (read this before anything else below)

**Added 2026-07-17 after a live regression: greeting fired after the
role-focus question and the handoff menu, and the handoff menu fired
before the workload table — both orderings this skill already specifies
correctly elsewhere, but apparently not unmissably enough.** Everything
below this line explains and enforces this order in detail, in the order
the *document* happens to present it — which is **not** the same as the
order of *sections in this file*. Notably, § `AskQuestion` (next section)
discusses Step 2 and Step 5 by name **before** § The greeting defines
Step 0a and § Steps lists the full sequence — read that section for its
tool-call contract only, not as a sequencing cue. The actual, only,
correct order is this list, always:

1. Gate-check `Read` of `designer-profile.local.md` (silent).
2. **Greeting** (Step 0a) — before any other tool call.
3. MCP gate (Step 0b).
4. Silent name resolution (Step 1).
5. Role-focus question, and — same turn — the manager follow-up or
   silent squad resolve (Step 2).
6. Write the profile + verify (Step 3).
7. Workload snapshot (Step 4).
8. Handoff: confirm-save line → personalized headline → workload
   table(s) (Step 5, first half).
9. Handoff menu — **only after** step 8's table(s) are already rendered
   (Step 5, second half) — never before, never alongside.
10. Continue with the designer's request (Step 6).

If you notice yourself about to do any of these out of order — call
`AskQuestion` before the greeting text exists in this response, or
before the Step 8 table exists — that is itself the signal to stop and
fix the order before continuing, not a self-check to rationalize past.

---

## `AskQuestion` means a real tool call — not typed text (read this before Step 2)

**Bug this section exists to prevent:** the role-focus question has been
observed rendering as plain numbered text in chat ("1. Product design  2.
Content design  3. …  reply with a number"), asking the designer to type
an answer back — instead of Cursor's native interactive question UI
(clickable option cards). That is a failure, not a stylistic variant, and
it applies to **every** `AskQuestion` in this skill and its
`references/*.md` scripts — role focus (Step 2), the manager "who do you
oversee" follow-up (Step 1b), and the handoff menu (Step 5) — not just
whichever one happened to be observed failing.

**What `AskQuestion` refers to, concretely:** Cursor's built-in "Ask
questions" agent tool — the one that blocks on a real user response and
renders selectable option cards in the chat UI. Every `AskQuestion`
reference in this skill and its `references/` scripts is an instruction to
**invoke that tool**, with the prompt and options given, in a single-select
or multi-select shape as noted. It is never an instruction to write the
question and its options as chat prose and wait for a typed reply.

**Concretely, at each of the three call sites in this flow:**

1. Build the prompt and options exactly as scripted (`references/
   onboarding-questions.md` § Step 1, § Step 1b; `references/
   handoff-menu-question.md`).
2. Call the tool — do not print the prompt or a numbered/bulleted option
   list into the chat message first. The tool call itself is what renders
   the question; narrating it in prose duplicates it badly and is usually
   the sign this bug is happening again.
3. If the running surface genuinely does not expose this tool (e.g. some
   Grok sessions — see `KNOWN-ISSUES.md`), **plain-text degrade** per
   `harness/references/ask-question-ui.md`: one honesty line that
   `AskQuestion` is missing, then ask the **same question** with the
   options spelled out, and wait for a typed reply. **Do not** tell the
   designer to switch models/sessions. **Do not** guess or continue
   onboarding as if they answered. *(2026-07-17 briefly documented a
   STOP-and-Composer-switch rule to stop agents from silently dumping
   numbered menus when buttons exist; 2026-07-27 restored plain-text
   degrade when the tool is truly absent — blocking the whole flow for a
   nicer UI is the wrong failure mode.)*

This does not change what's asked, how many questions there are, or any
deferral/silent-resolve logic below — it's a rendering-mechanism fix, not
a content change.

---

## The greeting (Step 0a — mandatory output, before any tool call)

**This is a required step, not descriptive prose about tone.** Found in
practice (2026-07-16): a live run went straight from "profile missing" to
the MCP probe tool calls to the role-focus `AskQuestion`, with no greeting
at all — because the only instruction to say it lived in this section's
title ("say this before the questions") and a soft one-line preamble in
§ Steps ("**Greeting** — per section above, then:"), neither of which
reads as a hard, checked action the way the MCP gate's "STOP" language
does. Fixed by making this section's own output a numbered, enforced step
(0a, below) with the same imperative weight as the MCP gate (0b) — not by
changing what the greeting says.

**Concretely:** if you are about to call `GetMcpTools`, `GetDynamicTools`,
or any other tool for the MCP probe (Step 0b) and the greeting text below
is not already present in your output for this turn, **stop and output it
first**, in the same turn, before that tool call. This must be the literal
first content of your response whenever `designer-profile.local.md` was
missing on `Read` — the one exception being the gate-check `Read` itself
(§ When this fires above), which necessarily runs first to know whether to
greet at all, and must stay silent or stop at "Checking your designer
profile..." rather than narrating forward into this section.

**The name is Muse — decided, not proposed.** Use it here, and
consistently afterward everywhere this persona speaks in its own voice
(handoff, error/decline messages, the MCP-gate fallback protocol) — see
`harness/ORCHESTRATOR.md`'s intro note for how this doesn't collide with
**Design Harness** (the design-system catalog app this repo also ships — a
product name, not the agent).

Open with this on the **first turn** when the tool setup is not yet complete.
**Do not** run the role-focus `AskQuestion` in the same turn unless all
selected MCPs are already connected (or designer chose "None of these").
**No narrating preamble before it** — never a sentence like "Now let me
output the greeting" or "Here's the greeting" ahead of the text below. The
greeting text **is** the first content of the turn, not something announced
before it arrives — same "don't narrate the tool/step, just do it" rule this
repo already applies to tool calls (see top-level tone rules), extended to
this specific piece of scripted copy because it was observed happening here.

**Plain text, not a blockquote** (re-spec 2026-07-17 — an earlier version
of this doc rendered the greeting as a markdown blockquote, `>`-indented
and quote-styled; that was a formatting artifact of how the spec was
written, never an intentional style choice — Muse talks in normal chat
text like everything else this persona says, not quoted callouts).
**Two plain-text blocks, back to back, same message, before any tool
call — not one merged block:**

1. **Greeting + capabilities** — bold opener line (name + welcome), then
   a plain sentence introducing the capabilities line, then the
   capabilities themselves as a **short bullet list** (pulled from the
   real skill roster in `harness/logs/routing-standards.md`, not an
   aspirational list) — not a single run-on sentence:

   **I'm Muse — welcome to Design Harness.**

   A few things I can actually do:
   - Kick off new projects with real research behind them
   - Build screens from the company's real design system
   - Prep you for a 1:1 if you lead a team
   - Catch design-system or accessibility issues before you share something
   - Ask me to schedule a meeting — I'll pull in real context, not just find a slot

2. **Immediately after — what's about to happen and why**, as a plain
   paragraph (no bullets, no blockquote), including the explicit
   local-only reassurance (this is a deliberate transparency line, not
   filler — do not drop it in a future edit, it's what tells the designer
   *why* the MCP check and the profile file exist and that the file is
   never pushed):

   I'll check which of your team's tools are connected, then ask one
   question — after that I'll write a `designer-profile.local.md` file
   right here in your local clone (never pushed to GitHub, just this
   machine) so I don't have to ask you the same setup questions again.

**The scheduling bullet above does not add Calendar to this step's MCP
check.** Step 0b's gate below still covers only the work tools (docs, tracker,
roadmap, chat) plus Figma and Miro — the bullet describes a real, always-available capability
(`harness/skills/scheduling/SKILL.md`), not a fifth thing to verify here.
Calendar's own connection is checked later, on-demand, only if and when a
designer actually asks to schedule something — see
`harness/skills/scheduling/references/calendar-check.md`. If Calendar
isn't connected at that later moment, that skill declines plainly and
offers an alternative; nothing about that exchange involves this
greeting or this gate.

**The `npm install` ≠ MCP-config disclaimer moved out of this greeting**
(it used to be a third sentence here) **and now fires once, plainly, as
the first line of Step 0b's first probe instead** — see
`references/mcp-check.md` § Gate workflow A — Probe. This keeps that
information from being silently lost while keeping the greeting itself to
exactly the two blocks above, per this re-spec.

This follows `COMPANY-VOICE.md`: peer-to-peer, outcome-first,
no exclamation marks on a routine action, no emoji, no generic SaaS hype
("unlock your workflow", "let's get started!"). Adapt the wording slightly
if it reads awkwardly in context, but keep the tone, the name (bolded on
first mention, plain text otherwise — never a blockquote), and the
two-block shape above — **do not** replace it with something hyped or
cutesy, and **do not** merge the two blocks back into one, reintroduce
blockquote styling, or let either grow past 2–3 lines (the bullet list
counts as part of block 1's budget, not extra); this is "who's talking,
what they can do, and what's about to happen," not a full product tour.
If a designer opted out previously (`Status: SKIPPED`) and is now asking
to redo it, skip the "first time" framing and just say so plainly: "Let's
set up your profile."

---

## Steps

**Step 0 has two mandatory parts, in this exact order — 0a always
before 0b. Do not call any tool before 0a's greeting text is already in
your output for this turn.**

0a. **Greeting — output first, before any tool call.** Output **both**
   blocks from § The greeting above (verbatim, or close to it) —
   greeting + capabilities (bold opener, then a bullet list — plain
   text, never a blockquote), then the MCP-explanation/transparency
   line, back to back, same message — as the literal first content of
   this response. This is its own numbered, enforced step precisely
   because a bare preamble sentence was confirmed (2026-07-16) to get
   silently skipped — see § The greeting for the failure this fixes.
   **Self-check before every MCP-probe tool call in 0b:** if both blocks
   aren't already in this response, stop and output them first, same
   turn, in order. **Second self-check:** confirm what you're about to
   output (or already output) isn't wrapped in `>` blockquote syntax —
   found live (2026-07-17) rendering as an indented, quote-styled
   callout, a formatting artifact never intended by this spec.
0b. **Optional tool setup (flexible gate)** — follow
   `references/mcp-check.md`. First, call `AskQuestion` with tool-selection
   payload from `onboarding-questions.md` § Step 0b: "Which tools does your
   team use?" (multi-select: Atlassian, Notion, Linear, GitHub, Google Docs, Slack,
   Figma, Miro, or "None").
   Then probe only selected MCPs via `GetDynamicTools` (+ `atlassianUserInfo`
   if Atlassian selected). **If any selected MCP is not connected, STOP** — show
   install checklist for selected tools only, link
   `documentation/setup/mcp-setup.md`, ask designer to reply **ready** when
   done. **Do not run Step 1–5** until gate passes. Store selected tools as
   `MCP tools: notion, linear, slack, figma` (comma-separated) and the
   matching `Work tools:` line (`harness/references/work-tools.md`) in profile. Opt-out:
   explicit "skip onboarding" or "None of these".
1. **Resolve name silently (no question)** — ask the connected tracker
   who the current user is (Jira `atlassianUserInfo` + `lookupJiraAccountId`,
   Linear's current-user call, GitHub's authenticated user) and, if it
   returns a plausible display name, use it. Store that as `Name:` without asking. **Only ask** if
   resolution fails outright, or the company's duplicate-first-name problem
   makes the match ambiguous (see `references/onboarding-workload-scope.md`
   § Resolve assignee) — in that case, one quick free-text question:
   "What's your name as it appears in [tracker]?"
2. **The one question — role focus** — per § `AskQuestion` means a real
   tool call above (and `harness/references/ask-question-ui.md`). **Call
   Cursor's native `AskQuestion` tool** with the exact payload in
   `references/onboarding-questions.md` § How to ask + § Step 1 — including
   the one-sentence context line immediately before the tool call. That
   file owns the tool-input shape (`title`, `questions[].id` /
   `prompt` / `options` / `allow_multiple`). **Self-check before making
   this tool call:** the one-sentence context line from
   `references/onboarding-questions.md` § How to ask ("One thing helps me
   route your work correctly and skip the rest of the usual setup
   questions:") must already be in this response's text, in this same
   message, immediately before the `AskQuestion` call. This is the exact
   failure shape § The greeting's Step 0a fix (above) addressed — a line
   described only as narrative prose in a reference doc, with nothing
   forcing it to actually appear at the call site, silently disappears. If
   it isn't already in this response, stop and add it before calling the
   tool, not after. **Forbidden when `AskQuestion` is available:** writing
   the options as a numbered/bulleted list in chat. **If `AskQuestion` is
   absent from the session tool list — plain-text degrade** per
   `harness/references/ask-question-ui.md` (same options spelled out;
   wait for typed reply; do not switch-model block). See `KNOWN-ISSUES.md`
   + `.cursor/rules/ask-question-ui.mdc`.
   Options: Product design / Content design / Accessibility / Research /
   **Manager** / Mix / **Not sure yet** (stores `mix` as a default,
   flagged as unconfirmed — see `references/profile-template.md`).
   **Do not** ask what they are working on, their platform, squad,
   interaction style, or experience level here — see "Deferred and
   opt-in fields" below for where those go instead.

   **If they picked Manager — one immediate follow-up, same turn**, per
   `references/onboarding-questions.md` § Step 1b: search
   `COMPANY-SQUADS.md` § Design leadership for the resolved name;
   if found, offer the pre-filled reports list to confirm/edit
   (multi-select + Other…); if not found, ask free text ("who do you
   oversee?", "skip for now" allowed). Store as `Reports:`. **This is the
   one exception to "never a second guaranteed question" — there's no
   cheap safe default for org structure the way there is for
   platform/style/experience, and deferring it would leave the manager
   persona non-functional until first real use, a worse trade-off than
   for squad.** Manager profiles have no squad/domain sequence to skip in
   the first place (that only ever existed as a deferred/opt-in path for
   IC values) — Step 3 (write) proceeds directly with `Squad assignment:
   N/A — manager role, see Reports`.

   **If they picked a value that stores as `product` or `mix` (including
   "Not sure yet") — silent squad resolve, no question asked**, per
   `references/onboarding-questions.md` § Step 1c: check the already-
   resolved `Name` against `COMPANY-SQUADS.md`'s per-squad
   "Product designer" columns.
   - **Exactly one clean match** (the cell's value *is* the name — never
     an informal note like "embedded designers; Name on project X")
     → auto-fill `Squad assignment:` (`Mode: dedicated`, that squad's
     `Domains`, `Squads`, and `Primary squad`) — silently, no question,
     no confirmation needed for this one because it's sourced directly
     from the same canonical directory the rest of this repo already
     trusts for squad definitions.
   - **Zero matches, or the name only appears in an informal/parenthetical
     note** → leave `Squad assignment:` unset/deferred exactly as before
     — an informal note is not a clean directory value, don't treat it
     as one just to widen coverage (see `COMPANY-SQUADS.md`'s own
     note on this).
   - **More than one clean match** (not possible with current directory
     data, but defensive) → do **not** guess — leave unset/deferred and
     add one line to `Notes:` flagging the ambiguity for a human to
     resolve, rather than silently picking one.
   - **Content / accessibility / research role focus never runs this
     check** — the directory models single-owner *product* squads, not
     those roles' inherently multi-squad/embedded relationship, so a
     coincidental name match wouldn't mean what it looks like it means.
   - This never adds a question — it's silent either way. It just means
     some designers land with `Squad assignment:` already filled instead
     of deferred, for free, when the data safely supports it.
3. **Write the answers** into `designer-profile.local.md` at the repo root,
   copying the structure in `references/profile-template.md`. Platform,
   interaction style, and experience level are written as explicitly
   **unset** (not guessed, not silently defaulted to a fabricated value)
   — see the template for the exact placeholder text. **Squad assignment**
   follows the silent-resolve outcome above: filled in if a clean match
   was found, unset/deferred otherwise — never guessed either way. After
   the workload snapshot, append **Active work (auto)** from the tracker (top In
   Progress / Review tickets from their queue). **Verification, not an
   assumption:** after writing the file, run `git status --porcelain
   designer-profile.local.md` (shell/terminal tool call) and read the
   actual output — it must be empty. **If the file appears in that
   output, STOP before Step 4:** it isn't gitignored yet — add a
   `designer-profile.local.md` line to `.gitignore`, then re-run the same
   command until it prints nothing. Do not state or imply the file is
   ignored without having actually run this check in this turn.
3.5. **Harness customization (repo + design system setup)** — Auto-run
   `harness/skills/harness-setup/SKILL.md` to set up the full harness with
   their design system and company context. This includes: (a) checking if
   repo is cloned for preview (if plugin-only install, clone it now); (b)
   running `npm install` if needed; (c) asking the 6 customization
   questions (design tokens, brand voice, personas, patterns, company
   context, vocabulary); (d) importing their files OR using defaults
   (Northline/Design Harness kit); (e) creating `org-pack.local/` with
   customizations; (f) offering to start `npm run dev` for local preview.
   **This runs automatically after profile setup, same turn.** Follow the
   full harness-setup flow per that skill's instructions. The designer
   should answer each question naturally; for each "Yes" import their
   file, for each "No" use defaults. End with a summary showing what's
   using custom vs. default content.
4. **Workload snapshot** — auto-run `harness/skills/workload-agent/SKILL.md`
   scoped per `references/onboarding-workload-scope.md`. **IC role
   values:** resolve assignee (already done in Step 1) → **Your queue**
   on your design boards, always. Squad-scoped roadmap and execution legs run
   **too, immediately**, if squad ended up filled in above (silent
   resolve or full-setup opt-in) — no need to wait for a later task. If
   squad is still unset, those legs are skipped with one line noting
   they'll activate once a squad is known (deferred or opt-in — see
   below). **Manager:** run `workload-agent` **Step 2b′ (manager mode)**
   instead — never the personal-queue query, which is the wrong shape for
   a manager's own name (see § Manager role focus). Skip this step
   entirely only if no tracker is connected (or it's down) or profile is `SKIPPED`.
5. **Handoff** — **confirm-save line, then a personalized bolded
   headline, never a generic recap-table cold-open** (re-spec
   2026-07-17 — see `references/post-onboarding-handoff.md` § 1–2 for
   the exact copy per case: IC with/without a side thread, squad unset,
   manager with/without reports). **Self-check before rendering the
   first table:** the confirm-save line *and* the headline must already
   be in this response's text, above every table — this is the same
   failure shape § The greeting's Step 0a fix addressed — a "say this,
   then show that" instruction living only as narrative prose next to
   the thing it's supposed to precede, with nothing forcing it to
   actually appear. If either isn't already in this response, stop and
   add both before any table renders, in that order. **IC role values:**
   personal-queue **table**, plus squad/roadmap tables too if squad got
   filled in above (silent resolve or opt-in) — same "full" handoff
   shape either way, they're not distinguished in the output. **Manager:**
   **team snapshot table** (per-report, no personal-queue row — see §
   Manager role focus). Follow `references/post-onboarding-handoff.md`
   either way. **Link every ticket key** in workload tables per
   `harness/references/source-links.md`. **Then, and only then** — the
   table(s) must already be rendered above, never before or alongside —
   **call the `AskQuestion` tool once** for next step per
   `references/handoff-menu-question.md` (same tool contract as
   `references/onboarding-questions.md` § How to ask) — **never** bullet
   or number the menu in chat prose. **Self-check before this tool
   call:** at least one workload table must already be present above in
   this response; if not, render it first. Use **short** variant when
   their original message was already specific (tables optional, skip
   menu `AskQuestion`). This is the only point where a second question
   can happen, and only for vague opens.
6. **Continue with the designer's original request** when it was specific
   and actionable — same turn, after short handoff. When vague, wait for
   their pick from the menu.

**Worst case, this whole skill asks 8 questions** for IC role values:
1 role focus + up to 6 harness-setup questions (design tokens, brand voice,
personas, patterns, company context, vocabulary) + 1 handoff menu (vague
open only). **Common case: 7 questions** (role focus + 6 customization — 
handoff menu skipped when opening was specific). **Manager: 8 guaranteed**
(role focus + reports + 6 customization), **9 worst case** with vague-open
handoff menu. The harness-setup questions are one-time setup that
customizes the entire system with the designer's actual design system and
company context — critical for making skills immediately useful.
Compare: before this rewrite, the same first-time flow asked 8–10
sequential questions (5 in a single "about you" batch, 2–3 in squad
assignment, plus the handoff menu) before the designer's actual request
got handled — and had no honest option for a manager at all. The MCP
gate itself is unchanged either way — it's a blocking install step, not a
question, and stays exactly as load-bearing as before. **Silent squad
resolve (see § Silent squad resolve below) never changes any of these
counts** — it's a lookup against already-resolved data, not a question;
it just means some `product`/`mix` designers get `Squad assignment:`
filled in for free instead of deferred.

---

## Org-pack setup (first clone only, separate from the profile question)

This is a **repo-level**, once-per-clone check — independent of the
per-designer profile above. It resolves whether `context/org-pack.local/`
(your real company content — product, voice, patterns, archetypes, squads,
sources, **and domain vocabulary**) exists yet. See `harness/ORCHESTRATOR.md`
§0a for the full resolution model.

**Missing** (fresh clone, only the public `context/org-pack/` example
exists): after the handoff (Step 5), offer — via `AskQuestion`, one
question, never auto-run — "Want me to build your company context
automatically from your tools, or keep using the example ('Northline') pack for
now?" Options: **Build from my tools (recommended)** / **I'll answer
questions manually** / **Keep the example for now** / **Don't ask again this
clone**.

- **Build from my tools (recommended)** → Call
  `harness/skills/org-pack-builder/SKILL.md` in **Mode B (MCP extraction)**.
  This automatically extracts company context from already-connected MCPs
  (tracker, docs tool, chat, Figma) and builds all 7 org-pack files including
  `COMPANY-VOCABULARY.md` (domain mapping — the missing Layer 2 artifact). See
  that skill for full extraction workflow. **Extraction happens in the same
  turn** — no additional questions needed beyond the initial choice. Show
  extraction summary when done: sources used, files created, term counts.
  Mark all extracted content as `INFERRED` and offer review. Confirm gitignore
  check passes before treating as done.

- **I'll answer questions manually** → Call
  `harness/skills/org-pack-builder/SKILL.md` in **Mode A (guided interview)**.
  Ask in plain follow-up questions (not a giant form — one section at a time):
  business context, domain vocabulary (terms, conflicts, bounded contexts),
  voice rules, patterns, squads, archetypes, sources. Write answers into
  `context/org-pack.local/COMPANY-*.md` — 7 files total, including the new
  `COMPANY-VOCABULARY.md`. See org-pack-builder skill for full interview flow.
  Confirm gitignore check passes before treating as done.

- **Keep the example for now** → do nothing; skills keep resolving to
  `context/org-pack/` (Northline). Ask again next clone-level check (not every
  chat — same cadence as the designer-profile gate).

- **Don't ask again this clone** → never offer this again on this clone; note
  it doesn't affect other people's clones of the same repo.

**Never** run extraction or interview automatically without the `AskQuestion`
gate above, and never write real company facts into `context/org-pack/`
(public) — always `context/org-pack.local/`.

---

## Deferred and opt-in fields — platform, interaction style, experience level, squad

These four fields used to be asked upfront, in the abstract, before any
real task existed to answer them *about*. They still get answered — just
later, and cheaper, per field:

| Field | How it gets filled in now |
|---|---|
| **Primary platform** | Never asked at onboarding. `harness/ORCHESTRATOR.md` §1 already infers platform from the task folder, the repo, and the message before falling back to the profile — if the profile has nothing to fall back to, it just asks once, per task, same as it would for any designer without a profile at all. Whatever answer comes back gets written into the profile (see profile-template.md § Editing later) so it's asked at most once, ever. |
| **Interaction style** | Never asked at onboarding. `harness/ORCHESTRATOR.md` §3's existing standing-preference mechanism ("just do it for simple asks", logged the first time it's stated) already covers this independently of the profile — the profile field just mirrors that log once it exists, it doesn't gate it. |
| **Experience level** | Never asked at onboarding. Defaults to the "new" explanation depth (one extra line naming the token/primitive in use) until the designer says something like "skip the explainer," which gets written back as `experienced`. Safer default direction — an unwanted extra line costs nothing; a missing one can lose someone new to the repo. |
| **Squad assignment** (domain → squad → primary squad, `references/onboarding-questions.md` §§2a–2c) — **IC role focus values only** | **Three paths now, not two.** (1) **Silent resolve** (new — see § Silent squad resolve below): `product`/`mix` designers whose resolved name is a clean match in `COMPANY-SQUADS.md`'s directory get it filled in automatically, no question, no deferral. (2) **Deferred**: everyone else starts unset, filled in the first time a skill that actually needs it — `workload-agent`, `research-agent`, `design-kickoff` — can't infer it from the task itself (most can: `design-kickoff` Step 1a already infers domain from the task's own topic/keywords, no profile needed). If genuine ambiguity blocks a skill, it asks the domain→squad question **once, in context**, folded into that skill's own existing question budget (e.g. `design-kickoff` Step 0's 3-question cap) rather than as a bespoke onboarding detour — then writes the answer back to the profile. (3) **Opt-in**: full setup upfront, see below — skips re-asking if silent resolve already filled it in. **Does not apply to `manager` profiles** — they get `Reports:` instead, asked immediately (Step 2b), not deferred. See § Manager role focus below. |

**Opt-in — full setup in one go.** A designer who wants everything
personalized immediately (not deferred) can say so at any point — "set up
my full profile now" / "ask me the squad questions" — and the agent runs
the rest of the original sequence: platform, interaction style, experience
level (per `references/profile-template.md` § Step 1 — legacy full
batch), then squad assignment 2a→2b→2c (per
`references/onboarding-questions.md`) **only if silent resolve above
didn't already fill it in** — never re-ask what's already answered, even
if it was answered silently rather than by a question. This is opt-in,
not deleted — every question this skill used to ask on every clone is
still one sentence away for anyone who wants it that way.

---

## How the profile gets used afterwards

Once `designer-profile.local.md` exists, other steps in this repo should
read it instead of re-asking:

- **`harness/ORCHESTRATOR.md` §1 intake** — if a request doesn't state a platform,
  check the profile's primary platform first; if that's unset too, ask
  once per §1's normal rules and write the answer back into the profile
  (`references/profile-template.md` § Editing later) so it's never asked
  twice.
- **Vague follow-ups** ("continue where I left off", "let's keep going on
  that") — check `projects/` for a matching slug; also read **Active work
  (auto)** in the profile (populated from the tracker at onboarding handoff) or
  re-run a scoped `workload-agent` if stale. This is a hint, not proof:
  if no matching task folder exists, treat as net-new (§2a).
- **New task creation** — when opening a fresh `projects/<slug>/` folder,
  check whether it matches a ticket or theme in **Active work (auto)** and
  note that in `brief.md` if so — useful context for anyone resuming later.
- **`harness/ORCHESTRATOR.md` §3 plan gate** — if interaction style is "skip the
  plan for simple asks" (whether set at onboarding or picked up later from
  the standing per-task preference), treat that as the standing "just do
  it" preference for single-skill chains without asking again. Multi-skill
  chains still always show a plan — this profile setting does not override
  that rule, same as the existing standing-preference carve-out.
- **`harness/ORCHESTRATOR.md` §4 fallback protocol** — when guessing the closest
  matching skill, weight the guess toward the profile's role focus (e.g. an
  ambiguous ask from a content-focused designer leans toward `content`
  over `ui-agent`). Role focus is always set (it's the one onboarding
  question), so this weighting is never missing data — worst case it's
  the `mix` default from an unconfirmed "Not sure yet" answer.
- **Squad-aware research** — when `research-agent` or `design-kickoff`
  sweeps the tracker and roadmap boards, use the squad list from the profile **if set**
  against `COMPANY-SQUADS.md` (canonical org map) and
  `harness/skills/workload-agent/references/roadmap-boards.md` (board
  registry):
  - **If unset:** infer domain/squad from the task's own topic and
    keywords first (this is how `design-kickoff` Step 1a already works —
    it never depended on the profile). Only ask directly, once, if that
    inference is genuinely ambiguous — then write the answer back.
  - **`embedded` (content):** check **all** listed squads' boards; use
    `Primary squad` only to break ties when a topic could live on several.
  - **`dedicated` (product):** start with `Primary squad`'s board / tracker key, then
    widen only if the topic clearly spans domains.
  - Never treat squad list as exclusive — a content designer on `CORE` + `GROW`
    still gets trade-customer material if the topic is customer-side; squads narrow the
    *default*, not a hard wall.
- **Explanation depth** — if experience level is "new" (the default,
  whether set explicitly or just never overridden), briefly name the
  token/primitive being used and why (one line, not a lecture). If
  "experienced", skip that explanation and just build.

This skill does not edit any of those files itself — it only produces the
data they read. If a rule above isn't actually being followed in practice,
that's a `harness-audit` finding, not something this skill fixes directly.

---

## Manager role focus

**Resolved** (previously tracked as a known, accepted gap in
`KNOWN-ISSUES.md` — see that file's history for the original gap and this
skill's own routing-log entry for the fix). A design **manager** (e.g.
someone in the "design leadership" role noted against a domain in
`COMPANY-SQUADS.md`, not embedded as an IC in one squad) now has an
honest role-focus option (`manager`) instead of having to force-fit into
`mix` or `Not sure yet`. Three things changed together to make this real,
not just a label:

1. **Role focus** — `manager` is a 6th option, per § Steps above.
2. **Reports, not squad** — Step 2b asks who they oversee instead of
   running IC squad assignment; stored as `Reports:` in the profile.
   Correctly inferring the team from org data is the single most
   impressive thing this whole flow does — the copy should read that way,
   not like a generic follow-up question. See
   `references/onboarding-questions.md` § Step 1b for the exact framing.
3. **`workload-agent` manager mode** — replaces the personal-assignee
   query with a batched query across the `Reports:` list, output shaped
   per-person (active work, staleness flags, what's queued next) instead
   of a single flat ticket list. See `harness/skills/workload-agent/SKILL.md`
   § Manager mode.

`harness/skills/manager-1on1-prep/SKILL.md` is the corresponding
1:1-prep skill, gated to `role: manager` profiles, built on top of
`workload-agent` manager mode plus `projects/` task-folder data.
`harness/skills/people-coaching/SKILL.md` is the coaching sibling
(feedback / difficult conversation / growth plan), same gate — see that
skill for its own explicit sourcing rules and the hard Slack guardrail.

---

## Silent squad resolve

**IC squad assignment can now resolve the same way name already does** —
silently, from a canonical lookup, no question asked — for the subset of
designers where the data actually supports it safely.

**Applies only when role focus stores as `product` or `mix`** (including
"Not sure yet"). Content, accessibility, and research role focus never
run this check — `COMPANY-SQUADS.md`'s directory columns model
single-owner *product* squads, not those roles' inherently multi-
squad/embedded relationship, so a coincidental name match there wouldn't
mean what it looks like it means.

**Algorithm** (runs once, right after Step 2's role-focus answer, using
the `Name` already resolved silently in Step 1 — no new MCP calls):

1. Search `COMPANY-SQUADS.md`'s per-squad "Product designer"
   columns for the resolved name.
2. **Exactly one clean match** — the cell's value *is* the name, not a
   name mentioned only inside an informal note (e.g. "Team X — embedded
   designers; Name on project Y" does **not** count) —
   → auto-fill `Squad assignment:` (`Mode: dedicated`, that squad's
   domain, that squad, that squad as primary). No question, no
   confirmation step needed — sourced from the same canonical directory
   the rest of this repo already trusts for squad definitions without
   re-confirming per designer. **Use the same domain label Step 2a's
   `AskQuestion` would show** (e.g. `Store Growth`,
   `Core Product` — per `onboarding-questions.md` § Step 2a),
   **not** `COMPANY-SQUADS.md`'s official domain-table header
   string (e.g. `Domain: Store Growth`) — so a
   silently-resolved profile and an opt-in-answered profile store
   identical-looking values for the same domain.
3. **Zero matches, or the only mention is an informal note** — leave
   `Squad assignment:` unset/deferred, exactly as before this change.
   Never treat an informal note as a clean match just to widen coverage
   — see `COMPANY-SQUADS.md`'s own note on this.
4. **More than one clean match** (not possible with the directory's
   current data, but defensive) — do not guess; leave unset/deferred and
   add one `Notes:` line flagging the ambiguity.

**Real coverage depends entirely on your `COMPANY-SQUADS.md`'s data** — a
squad with a clean single-name cell resolves silently; a squad with no
name or only an informal note still defers, same as before. This is a
**known, accepted, data-driven limitation, not a logic bug** — see
`KNOWN-ISSUES.md`. Widening it means expanding your own org directory's
actual designer-per-squad data in `COMPANY-SQUADS.md`, not loosening the
match rule. Do not hardcode real names or squads in this skill file —
they belong only in the resolved `COMPANY-SQUADS.md` (§0a in
`harness/ORCHESTRATOR.md`).

**Never changes a question count** — this is a lookup, not a question.
It also means the workload snapshot and handoff (Steps 4–5 above) run
their **full** shape (squad-scoped roadmap + execution legs) immediately
for these designers, instead of the personal-queue-only shape that
otherwise applies while squad is unset.

**Correcting a wrong silent resolve:** say "that's not my squad" or
"update my profile" — same edit-in-place path as any other field, per
`references/profile-template.md` § Editing later.

---

## What this skill does NOT do

- Does not run on every session — only when the profile file is missing.
- Does not ask more than one question by default **for the 5 IC role
  values** (two, worst case, if the opening message was vague enough to
  need the handoff menu). **Manager is 2 guaranteed, 3 worst case** — see
  § Manager role focus for why that one extra question is load-bearing,
  not incidental. Every field beyond role focus (and, for managers,
  reports) is resolved silently, deferred to first real use, or available
  on explicit opt-in — see "Deferred and opt-in fields" above.
- Does not get pushed to the shared GitHub remote — it's personal to one
  designer's clone, unlike everything `harness/skills/audit/SKILL.md` Step 4
  prompts to push. If you ever see this file staged in a commit, that's a
  bug — stop and flag it.
- Does not replace per-task questions that are genuinely task-specific
  (feature name, Figma links, etc.) — those still come from
  `harness/ORCHESTRATOR.md` §1 / `harness/task-intake/SKILL.md`.
- Does not add Calendar to the mandatory MCP check. Step 0b's gate covers
  the work tools plus Figma and Miro, full stop, unchanged by the
  scheduling capability mentioned in the greeting's bullet list —
  Calendar is checked separately and only later, on-demand, per
  `harness/skills/scheduling/references/calendar-check.md`.
