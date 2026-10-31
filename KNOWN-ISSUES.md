# Known issues

Durable log of small, confirmed bugs that are deliberately **not** fixed at
the moment they're found — because fixing them isn't in scope for the pass
that found them, and "known in chat/a PR description" doesn't survive past
that conversation. Add an entry here instead of letting it get silently
re-discovered later as a "regression."

Fix any of these opportunistically the next time you're already editing
the affected file for an unrelated reason, or take them as their own
small pass. Remove the entry once actually fixed.

---

### Crowded, overlapping research-skill cluster (`research-summary` / `research-synthesis` / `research-shareout` / `research-agent` verdict mode)

**Found:** 2026-08-09, full-repo audit (`docs/FULL-REPO-AUDIT-2026-08-09.md`).

These four skills all touch adjacent territory in post-session research
capture and reporting — not accidental duplicates (each has a stated scope
boundary against its neighbors), but close enough that misrouting between
them is plausible as the roster keeps growing. No live misroute logged yet.

Needs a designer judgment call (merge two of them, tighten scope boundaries
further, or leave as-is and just watch `routing-log.md` for real confusion)
— not a mechanical fix. Revisit if a real misroute between these four shows
up in `harness/logs/routing-log.md`.

---

### ~13 skill guides are thin stub cards, near-duplicates of their own skill's frontmatter

**Found:** 2026-08-09, full-repo audit. Examples: the `GUIDE.md` in
`cognitive-accessibility`, `inspiration-scouting`, `interaction-design`,
`synthetic-user-testing`, `design-retrospective`, `responsive-patterns`,
`adaptive-interfaces`, `research-summary`, `research-shareout` (all under
`harness/skills/`).

A side effect of the "every skill gets a HOWTO" rule locked into
`documentation/maintainers/build-a-skill.md`'s checklist — these exist and aren't wrong,
just thin (1.4-2.5KB, pointer + quick-ref + scenario table, little beyond
what the skill's own frontmatter already says).

Not broken — the skills they document are real and routed correctly. A
judgment call on whether thin-but-consistent is fine (predictable shape for
every skill) or whether a few of these deserve real expansion. Fix
opportunistically when a designer actually needs deeper guidance from one
of these and finds it thin, rather than a blanket rewrite pass.

---

### Two parallel, un-cross-referenced agent stacks (`harness/skills/research-agent/` vs root `agents/research/` + `.cursor/agents.md`)

**Found:** 2026-08-09, full-repo audit.

Root `agents/research/` (Confluence briefing templates, feedback-synthesis-
scan spec) + `.cursor/agents.md` (a Slack/Confluence Cloud Agent "project
briefing" workflow) + `.cursor/skills/project-briefing/` and `.cursor/
skills/feedback-synthesis-scan/` form a second, parallel agent stack —
separate from `harness/skills/research-agent/`, not routed through
`ORCHESTRATOR.md` §2, and not mentioned in `harness/agents/researcher.md`'s
role file. Not dead (used as a Cursor Cloud Agent workflow), just confusing to have two
differently-shaped "research agent" concepts with no doc explaining how
they relate.

Needs a designer decision: fold the Cloud Agent briefing flow into the main
`ORCHESTRATOR.md` routing table as its own documented exception, or add one
clarifying paragraph to `harness/agents/researcher.md` explaining the
split, so a future reader doesn't have to reconstruct the relationship from
file layout alone. Not a mechanical fix.

---

### Some Cursor models lack the `AskQuestion` tool (Grok 4.5)

**Found:** 2026-07-16, during designer onboarding — role-focus rendered as
a plain numbered list instead of clickable buttons.

Fixed-choice questions **must** call Cursor's native `AskQuestion` tool
when it is in the session tool list (see
`harness/references/ask-question-ui.md` — **repo-wide contract** — plus
payloads in onboarding / figma-ux-audit / artifact-type docs). The tool is
platform-provided and **not exposed to every model**. As of this write-up,
**Cursor Grok 4.5** often does not receive `AskQuestion` (Cursor forum:
expected limitation; Composer / several other models do).

**Harness behaviour when the tool is absent (2026-07-27):** **plain-text
degrade** — state the miss in one line, ask the same question with options
spelled out, accept a typed reply. **Do not** block the task or tell the
designer to switch models/sessions. Still do not guess or freestyle
substance while waiting. (Regression 2026-07-27: FigJam workshop build
hit FALLBACK and told the user to switch to Composer — wrong; fixed by
restoring this degrade path in `ask-question-ui.md` + call-site copies.)

Remove this entry when Cursor ships `AskQuestion` for Grok (or when the
agent is pinned to a model that always has it).

---

### `preToolUse` deny hook (`design-detector-preblock.mjs`) can silently not block

**Found:** 2026-08-07, while adding a pre-write hard block on new
design-token violations — researched via the `cursor-guide` subagent
before building, not discovered by accident.

**What:** `.cursor/hooks/design-detector-preblock.mjs` (registered in
`.cursor/hooks.json` under `preToolUse`, matcher `Write|StrReplace`) runs
`scripts/design-detector` against the *proposed* new content of a `.css`
write and denies it if the edit introduces a new `TOKEN-RAW` or
`TOKEN-INVALID` finding that wasn't already true of the file on disk
(`TOKEN-GAP` is never blocked — that still needs a human call, same
discipline as `token-check.md`). Manually tested against 6 scenarios
(raw-colour `Write`, clean `Write`, raw-colour `StrReplace`, non-`.css`
passthrough, a genuine gap correctly *not* blocked, and a
can't-reconstruct-content fail-open case) — all six behaved correctly in
isolation.

**Why it's still unreliable in practice:** Cursor staff have confirmed an
open, unfixed race condition where a fast-exiting `preToolUse` hook's
`deny` response can be dropped before Cursor finishes reading it — the
write proceeds anyway despite a correct deny being emitted. Staff's own
words: "please don't rely on a deny hook alone as a hard block for risky
commands right now." This hook adds a 60ms delay + stdout flush before
exiting as the documented mitigation, but that reduces the odds of
hitting the race, it does not close it.

Separately, `StrReplace`'s `tool_input` schema (the tool used for most
real edits, unlike `Write` which is rarer) is **not published by Cursor**
— this hook guesses `old_string`/`new_string` field names and fails
*open* (allows the write) whenever it can't confidently reconstruct the
proposed content, by design (a missed block is the accepted failure
mode here, not a false block of a legitimate edit).

**Same class of issue as** the `sessionStart` designer-onboarding hook's
`additional_context` bug above — a real Cursor platform limitation, not
a bug in this hook's own logic. Kept as belt-and-suspenders on top of
the *reliable* enforcement layer: `harness/skills/design-system` and
`harness/skills/audit` already call `scripts/design-detector` directly
(wired 2026-08-07) — that layer does not depend on this hook firing at
all, and is what should actually be trusted.

Remove/downgrade this entry once Cursor ships a fix for the race
condition and publishes the `StrReplace` `tool_input` schema, or once
this hook's guessed schema is independently confirmed correct.

---

### The ui-agent edit gate cannot be enforced in Cursor

**Found:** 2026-10-31, while blocking screen edits until `ui-agent` is read.

**What:** Claude Code blocks `Edit` and `Write` on `projects/*/screens/**`
and `src/**/*.tsx` until this session's `harness/logs/skill-usage.jsonl`
contains a read of `harness/skills/ui-agent/SKILL.md`. The message is
"Load ui-agent first." The same check is registered for Cursor
(`preToolUse`, matcher `Write|StrReplace`, `scripts/ui-agent-gate.mjs`).

**Why Cursor still can't enforce it:** the same `preToolUse` race above
can drop a deny, so the write proceeds. Cursor also does not publish a
session id on the hook payload. When `CURSOR_SESSION_ID` is missing, the
gate can only match a recent log line for this folder, and a dropped deny
still lets the edit through. Claude Code's `session_id` makes the same
script a real block.

Remove this entry once Cursor keeps a deny response and sends a stable
session id on `preToolUse`.

---

### Cursor can't warn at 50% context — the handoff nudge counts turns instead

**Found:** 2026-10-29, while adding the context-window handoff nudge.

**What:** Claude Code passes `context_window.used_percentage` to the status
line, so `scripts/claude-statusline.mjs` warns at 50% and suggests "wrap
up" from 60%. Cursor IDE hooks get no equivalent:

- No hook payload carries the context window size or a used percentage.
- The `stop` hook's `input_tokens` (logged by
  `.cursor/hooks/token-usage-tracker.mjs`) sum every model call in the
  turn, so they aren't context use — logged turns exceed 470k on a
  200k-window model.
- A hook's only way into the chat after a reply is `followup_message`,
  which sends a new agent turn, not a line to the designer.

A percentage built from those numbers would be made up, so there isn't
one. In Cursor the orchestrator's turn-count nudge (`harness/ORCHESTRATOR.md`
§5, ~15–20 turns) stands in.

**Partial exception:** the Cursor CLI (`cursor-agent`) has a status line
with the same `context_window.used_percentage` field, but it's configured
per user in `~/.cursor/cli-config.json`, so a repo can't ship it. To use
it, point that file's `statusLine.command` at
`node <path-to-clone>/scripts/claude-statusline.mjs`.

Remove this entry once a Cursor IDE hook exposes context use and can show
the designer a line.

---

### Cursor runs the Git session check from a rule, not a hook

**Found:** 2026-10-30, while adding the session-start Git warning.

**What:** Claude Code runs `node scripts/git-autopilot.mjs session` as a
SessionStart hook (`.claude/settings.json`), and its line reaches the chat.
Cursor's `sessionStart` hook can't add context reliably (the same bug as the
onboarding hook above), so Cursor shows no "you're on main" warning. The
agent no longer runs the check on every first reply; that cost a step in
every chat.

Remove this entry once Cursor's `sessionStart` hook can add a line to the
chat.

---

### Harness interface has no token file of its own

**Found:** 2026-10-12, while building the Intro tour — the "Skip
introduction" and "Next" buttons turned out to be product `Button`s with a
Harness radius override, not Harness components.

**What:** full list in `context/design-system/HARNESS-INVENTORY.md`.

- ~~The interface imports 11 product components~~ — fixed 2026-10-12: the
  Harness kit in `src/design-harness/ui/` replaced them; only `Stack` and
  `Icon` are re-exported. The `frame-forms.css` overrides are gone.
- Harness tokens are split between `tokens.lab.css` (31) and
  `chrome.css` / `frame-forms.css` (59). Dark mode rewrites 149 product
  tokens inside `chrome.css`.
- ~~18 reused interface pieces had no entry in `systems/harness.md`~~ —
  fixed 2026-10-12: all 54 items are documented, built and demoed.
- Command search and the Intro tour each build their own dialog.
- ~~About 1,080 lines of unused CSS~~ — deleted 2026-10-12.

**Why deferred:** Phase 1 was inventory only (designer decision,
2026-10-12). Decided: the Harness owns every component it uses. Phase 2
builds Harness tokens and primitives (Button and Dialog first); Phase 3
migrates the pages and splits `chrome.css`. Components are done (2026-10-12). Remove
this entry when the Harness has its own token file and dark mode stops
overriding product tokens.

---

### DS replacement (UI Kit v2) — component-level migration pending

**Found/started:** 2026-08-11, designer decision to fully replace the DS
colour/type authority with the Design Harness kit (both light and dark) —
see `context/design-system/STUDIO-OS-KIT-NOTES.md`.

**What's done (Phase 1):** the semantic colour roles, tonal ramps, type
scale, and depth/glass tokens are extracted into `tokens.css` as `--kit-*`,
light on `:root` + dark on `:root[data-theme='dark']`. The old
"prototypes are always light" hard rule is updated
(`harness/references/design-system-rules.md` §7.1 rule 7).

**Foundations value rewrite (2026-08-11):** Design Harness kit adopted as
authority — teal `#007078` + plum `#4f3791` + warm paper; Inter kept.
Source at `context/design-system/source/design-harness-kit/`. See
`STUDIO-OS-KIT-NOTES.md`. Buttons aligned to kit ButtonShowcase
(ink primary, 16px radius, lifted CTAs).

**Phase 2 progress (2026-08-11):** migrated primitives so far:

- **`Button`** — `intent` + `size` (`xl`/`lg`/`md`/`sm`), geometry tokens
  `--kit-button-*`, CSS on `--kit-*` only. Deprecated `variant`/`tone` shim.
- **`Badge`** — 7 intents (`neutral`/`brand`/`premium`/`leaf`/`amber`/
  `danger`/`ink`), `md`/`lg`, optional `dot`. Deprecated `tone` shim
  (`brand`/`success`/`neutral`).
- **`Toast`** — kit ink surface + icon chip + optional action; intents
  `leaf`/`amber`/`danger`/`brand`/`neutral`. Deprecated `tone` shim
  (`positive`/`warning`/`negative`/`sea`/`informative`).
- **`Chip`** — paper + line / selected = ink; `--kit-chip-*` geometry.
  Deprecated `fill`/`rounded`/`selected:'sea'|'black'` still accepted.
- **`Card`** — `--kit-paper` / `--kit-shadow-1` / `--kit-card-*`.
- **`Toggle`** — kit 52×32 switch, ink when on (`--kit-toggle-*`).
  Deprecated `tone='negative'` → danger.
- **`Checkbox` / `Radio`** — `--kit-control-*`; ink default, `sea` → brand.
- **`TextField`** — kit 52pt / 16px radius / ink focus ring (`--kit-field-*`).
- **`ProgressBar`** — 8px sunken track, intents brand/premium/leaf/ink,
  indeterminate sweep (`--kit-progress-*`).
- **`Loader`** — ring / petals / dots variants (`--kit-loader-*`).
- **`SegmentedControl`** — sunken track + paper thumb (`--kit-segment-*`).
- **`EmptyState`** — brand glyph stack + title/body + CTA slots.
- **`Sheet` / `SheetHeader`** — grabber, Cancel/Done form header, detach cancel.
- **`Fab` / `FabExpanded`** — ink circle FABs + speed-dial chips (`--kit-fab-*`).
- **`Alert`** — soft intents + ink toast surface.
- **`Tabs` / `Skeleton`** — underline tabs + shimmer atoms.
- **`TextField`** — floating-label variant (`variant="floating"`).
- **`SettingsRow` / `SettingsGroup`** — tinted icon rows + section labels.
- **`Avatar` / `AvatarGroup`** — stacked initials + overflow count.
- **`Swiper` / `BackToTop`** — remapped onto `--kit-*`.
- **Dark kit tokens** — Design Harness theme toggle now sets `document.documentElement[data-theme]` so `:root[data-theme='dark']` kit vars apply in the lab.

**What's NOT done yet:**

1. **Remaining `ds/*.tsx` primitives** (specialized Square/Dashed/Brand
   buttons, domain calendars) still partly on legacy tokens.
2. **Platform bands** from the kit (iOS list cells, M3 fields) — not yet
   extracted as React primitives.
3. **Call-site cleanup** — consumers still mostly use deprecated shims;
   move to kit intents as files are touched.
4. **Prototype surfaces** still force `data-color-scheme="light"` on
   `design-harness-proto-surface` — kit dark applies to DS catalog chrome; product
   prototypes stay light until explicitly opted in.

**Why deferred:** doing all four in one pass without testing each
component against the kit's own preview would risk a half-broken DS
that's worse than the honest, tracked legacy state. Pick up per-component
(e.g. "migrate Button to `--kit-*` + add dark variant") rather than
attempting a full swap in one sitting. Remove sub-items as they're
migrated; remove this entry once `ds/` + Design Harness consumers are fully on
`--kit-*` and the old `--ds-*` legacy layer can be deleted.

---

### 11 off-scale size values (font-size/margin/gap/radius) in prototype CSS have no matching DS token

**Found:** 2026-08-07, first real-file run of the mechanical detector (`scripts/design-detector`, `npm run design:detect`).

**What:** values that fall between defined scale steps, not on them:

- `navigation-profile.css:175,726,750` — `font-size: 10px` (×3)
- `navigation-profile.css:553,591,714` — `font-size: 9px` (×3)
- `navigation-profile.css:632,719` — `font-size: 11px` (×2)
- `navigation-profile.css:648` — `gap: 3px`
- `navigation-profile.css:722,728` — `margin-top: 1px` (×2)

Most of the volume is `navigation-profile.css`'s dense tablet UI running
several font-sizes (9/10/11px) below the defined type scale's smallest
step — plausibly deliberate (a genuinely denser surface) rather than
drift, but that's a design call, not a mechanical one.

**Why deferred:** same reasoning and same designer decision (2026-08-07)
as the colour cluster above — real gaps, deferred rather than guessed,
per the same human-gate path in `token-check.md`.

Fix by running `npm run design:detect -- <file>` next time either file
is touched, and for each: either accept the nearest scale step (may
shift 1–3px visually — needs a look, not a blind swap) or confirm these
sizes are intentional and add them to the type/spacing scale properly.
Remove this entry once all 17 resolve clean.

---

_"Designer onboarding — role focus has no manager option" (found
2026-07-16 during the onboarding-shortening pass, tracked as "Track B gap
#3") was fixed the same week, in the dedicated manager-role pass —
`manager` is now a real role-focus option with its own `Reports:` field,
`workload-agent` manager mode (batched per-report query, staleness
flagging), and the gated `harness/skills/manager-1on1-prep/SKILL.md`
skill. See `harness/logs/routing-log.md` for the dated entry._

_The four broken relative links found on 2026-07-15 (one during the
harness-nesting pass, three more during the full IA audit) were fixed the
same day, once the fixes were reviewed and approved — see
`docs/ia-audit-2026-07-15.md` §2.1 for what they were._
