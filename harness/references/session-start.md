# Session start — the profile and the org pack

The full text behind `harness/ORCHESTRATOR.md` §0 and §0a. It also holds
the detail that used to sit in `.cursor/rules/designer-profile-gate.mdc`
and `.cursor/rules/org-pack-gate.mdc`. Read it when the short version in
§0 does not settle a case.

## The check

Run `npm run -s harness:context` before any reply or other tool call. Add
`-- --json` for the same facts as JSON. It prints these:

- `Profile: found — <path> · Status: … · Role focus: …`, or
  `Profile: missing — checked <path>`.
- `Org pack: example`, `Org pack: local · complete`, or
  `Org pack: local · partial, missing: …`.
- `Learned:` and the misses seen 2+ times in
  `designer-context.local/how-i-work.md`. Before the work, check which
  ones fit this request and act against them. Never quote them back.
- `Digest: due` when new chats piled up (5+, or any after 7 days). Do the
  request first, then run `harness/references/transcript-digest.md` and
  end with its one line. Nobody to answer (headless, benchmark) → skip.
- One line per project: status, `example` when the truth block says
  `example: true`, `system:` when set, and the last `log.md` date.

The script checks one path: `<repo root>/designer-profile.local.md`, next
to `AGENTS.md`. Never under `harness/`. A past run looked for
`harness/designer-profile.local.md`, decided the profile was missing, and
ran onboarding again.

No shell? `Read` that exact path. Never Glob or file search. They skip
gitignored files.

The filesystem is the only source of truth. Never infer "profile missing"
from memory, a new chat, or earlier turns. New chat is not new clone. Never
run onboarding because the user typed a short message (`df`, `hi`).

## What to do with the result

| Result | Action |
|---|---|
| **Found** (`Status: ACTIVE` or `SKIPPED`) | Stay silent. No onboarding, no MCP gate, no profile `AskQuestion`, no squad questions, no handoff tables, no handoff menu. Read the profile and use it for §1's platform and stage, for vague follow-ups ("continue where I left off" → **Active work (auto)**), and for §3's plan gate. Never re-ask what it answers. Then handle the message. |
| **Missing, and nobody can answer** (headless, background, one-shot) | No greeting, no question, no profile file. Role focus is `product`. Name comes from `git config user.name` when set. Do the request. |
| **Missing, and a person is here** | At most one question, the role (`harness/designer-onboarding/references/onboarding-questions.md`). Then do the request in the same turn. Do not wait for the answer. Do not run the tool probe, workload, or handoff before it. Write the profile only after they answer (`harness/designer-onboarding/SKILL.md`). |

## No narration leak

Found live on 2026-07-17. The check was narrated as "Checking your
designer profile, then I'll greet you back". That announced the next step
before the result was known. Run the check silently. If you narrate it,
stop at "Checking your designer profile...". Never add "...then I'll greet
you back" or "...then I'll continue". The result decides what happens
next.

## Optional personal context

`designer-context.local/` (gitignored) holds extra notes and private link
catalogs. Read its `README.md` first, then what the task needs. Never paste
it into committed files without the designer's OK
(`harness/designer-onboarding/references/designer-context-local.md`).

## Org pack (§0a)

This repo is generic and public. No company name, product, voice, or org
chart is hardcoded in `harness/ORCHESTRATOR.md`, any
`harness/skills/**/SKILL.md`, or other engine files. They reference the
resolved `COMPANY-*.md` files instead.

Any reference to `COMPANY-BUSINESS.md`, `COMPANY-VOICE.md`,
`COMPANY-ARCHETYPES.md`, `COMPANY-PATTERNS.md`, `COMPANY-SQUADS.md`,
`COMPANY-SOURCES.md`, `COMPANY-VOCABULARY.md`, or `COMPANY-STYLE-GUIDE.md`
resolves in this order:

1. `context/org-pack.local/COMPANY-*.md` — real company content, gitignored.
2. `context/org-pack/COMPANY-*.md` — the public fictional "Northline"
   example. It is the fallback and a worked-example template.

Rules:

- When the local pack exists, read only the local pack. Never mix in
  example files.
- A partial local pack (the script lists `missing:`) usually means a setup
  step did not finish. Flag the gap and ask. Do not fill it from the
  example. The script counts the seven files `org-pack-builder` writes;
  `COMPANY-STYLE-GUIDE.md` is optional.
- No local pack is the normal state on a fresh clone. Use the example pack
  silently. Setup: `harness/designer-onboarding/SKILL.md` § Org-pack setup.
- Never write real company facts into `context/org-pack/`.
- `designer-context.local/preferences.md` § Harness binds every skill. When
  it forbids company content, a skill about to pull from a company tool
  (Confluence, Slack, Jira) or reuse a company example stops and names the
  rule in one line instead.
- Any other `COMPANY-*.md` is an extra file. Read its `about:` /
  `use-when:` header and load it when `use-when` matches the skill or task
  (`harness/references/org-pack-extra-files.md`).
