# AGENTS.md

This file exists only because Cursor auto-loads it by filename convention.
It carries two rules of its own, Git and the taste log, below.

**Git:** never run `git switch`, `commit`, `revert`, `merge` or `push` yourself. Never to `main`, never force.

**Taste log — every reply, even when you skip the orchestrator:** the trigger is the designer pushing back on output you already gave in this chat, with a rule that would apply next time too ("no borders on cards", "never more than one sentence when I ask to tighten text"). Then apply it and end that reply with exactly `Save as a preference? [Yes / Just this time]`. If the rule is already in the file's index, don't ask: bump its count and say so in one line. No pushback, no question: never on a first ask, never because a style guide made you change something. Save to `designer-context.local/preferences.md` only on Yes (`harness/references/designer-preferences.md`); never silently, never to the tool's own memory.

**Miss log — same trigger, plus redirects ("no, I mean…"):** unless it is only taste, append one `MISS` or `MISROUTE` row to `harness/logs/routing-log.md` with the designer's words verbatim. Wrap up drafts fixes from them; nothing is applied without "apply P<n>". Format and review: `harness/references/miss-log.md`.

**All real instructions — routing, gates, hard rules on design tokens and
`context/design-system/ds` composition, the skill roster, state rules —
live in [`harness/ORCHESTRATOR.md`](harness/ORCHESTRATOR.md). Read that first, always,
before doing anything else in this repo.**

That includes the mandatory first step: run `npm run -s harness:context` and use its output (no shell: `Read` `<repo root>/designer-profile.local.md`, next to this file, never under `harness/`) (`harness/ORCHESTRATOR.md` §0). Do not skip ahead to the user's request before it.

## Cursor-specific mechanics (can't live in `harness/ORCHESTRATOR.md`)

- `.cursor/rules/designer-profile-gate.mdc` repeats the §0 first step as an always-applied Cursor rule. Claude Code has no equivalent; the pointer above does that job.
- `.cursor/hooks.json` / `.cursor/hooks/designer-onboarding-check.sh` is a
  Cursor `sessionStart` hook attempting the same check via Cursor's hook
  schema. It is currently a no-op (confirmed Cursor platform bug — see the
  hook script's own comments) and is kept only as belt-and-suspenders for
  when that's fixed.
- `.cursor/hooks.json` / `.cursor/hooks/design-detector-preblock.mjs` is a
  Cursor `preToolUse` hook attempting to hard-block a new, mechanically
  provable design-token violation before it's written. Same "belt and
  suspenders, not the real gate" status as the hook above, for a
  different confirmed Cursor bug (a race condition can silently drop its
  `deny` response) — see `KNOWN-ISSUES.md`. The real, reliable
  enforcement layer is `harness/skills/design-system` and
  `harness/skills/audit` calling `scripts/design-detector` directly.

Claude Code loads [`CLAUDE.md`](CLAUDE.md), which points here. The rules above are the one copy.
