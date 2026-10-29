# AGENTS.md

This file exists only because Cursor auto-loads it by filename convention.
It carries one rule of its own, the taste log below.

**Taste log — every reply, even when you skip the orchestrator:** the trigger is the designer pushing back on output you already gave in this chat, with a rule that would apply next time too ("no borders on cards", "never more than one sentence when I ask to tighten text"). Then apply it and end that reply with exactly `Save as a preference? [Yes / Just this time]`. No pushback, no question: never on a first ask, never because a style guide made you change something. Save to `designer-context.local/preferences.md` only on Yes (`harness/references/designer-preferences.md`); never silently, never to the tool's own memory.

**All real instructions — routing, gates, hard rules on design tokens and
`context/design-system/ds` composition, the skill roster, state rules —
live in [`harness/ORCHESTRATOR.md`](harness/ORCHESTRATOR.md). Read that first, always,
before doing anything else in this repo.**

That includes the mandatory first check for `designer-profile.local.md`
(`harness/ORCHESTRATOR.md` §0) — do not skip ahead to the user's request without
doing that check first.

## Cursor-specific mechanics (can't live in `harness/ORCHESTRATOR.md`)

- `.cursor/rules/designer-profile-gate.mdc` is a second, independent
  always-applied Cursor rule that enforces the same `designer-profile.local.md`
  check described in `harness/ORCHESTRATOR.md` §0. It exists because Cursor rules
  (`.mdc` files) are a Cursor-only mechanism with no Claude Code
  equivalent — this file's pointer above is what does the equivalent job
  for Claude Code.
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

See also [`CLAUDE.md`](CLAUDE.md) — the same pointer, for Claude Code.
