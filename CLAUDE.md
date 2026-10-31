# CLAUDE.md

This file exists only because Claude Code auto-loads it by filename
convention. It carries two rules of its own, Git and the taste log, below.

**Git — every reply, unless the setting or the profile turns autopilot off:** on a chat's first reply, pass on any line from `node scripts/git-autopilot.mjs session` (run it if no hook did) as one sentence, then do the request — that line never blocks and is never a reason to ask a question or switch branches; never run `git switch`, `commit`, `revert`, `merge` or `push` yourself; starting or continuing a project, "wrap up", "undo the last change", "share this", "update my harness" and "work on another project in parallel" go through `harness/references/git-autopilot.md`. Never push unless they say share or suggest, never to `main`, never force.

**Taste log — every reply, even when you skip the orchestrator:** the trigger is the designer pushing back on output you already gave in this chat, with a rule that would apply next time too ("no borders on cards", "never more than one sentence when I ask to tighten text"). Then apply it and end that reply with exactly `Save as a preference? [Yes / Just this time]`. No pushback, no question: never on a first ask, never because a style guide made you change something. Save to `designer-context.local/preferences.md` only on Yes (`harness/references/designer-preferences.md`); never silently, never to the tool's own memory.

**All real instructions — routing, gates, hard rules on design tokens and
`context/design-system/ds` composition, the skill roster, state rules —
live in [`harness/ORCHESTRATOR.md`](harness/ORCHESTRATOR.md). Read that first, always,
before doing anything else in this repo.**

That includes the mandatory first check: `Read` `<repo root>/designer-profile.local.md` (next to this file, never under `harness/`); never Glob or search for it (gitignored files are skipped)
(`harness/ORCHESTRATOR.md` §0) — do not skip ahead to the user's request without
doing that check first.

See also [`AGENTS.md`](AGENTS.md) — the same pointer, for Cursor.
