# Resume detection — a task folder is not proof that kickoff happened

The full text of `harness/ORCHESTRATOR.md` §2b. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

**Never infer completion from a folder's mere existence.** Before treating any `projects/<slug>/` as "already handled" (iterating row, or "already answered, don't re-ask"), read `status` in the truth block at the top of `brief.md`. Old words on a leftover `Status:` line map the same way: STUB → `exploring`, EXAMPLE or DRAFT → `draft`, APPROVED → `approved`.

| Status | Meaning | What to do |
|---|---|---|
| `exploring` | Folder was created (or copied from `projects/_template/`) but Step 0 never ran, or the turn that created it ended before Step 1/2 completed | Treat exactly as if **no task folder exists**. Restart at `design-kickoff` Step 0. Do not ask "haven't we already started this?" — exploring carries zero answered questions. |
| `draft` | PRD exists (Step 2 done) but Step 3's gate was never explicitly approved | Resume at Step 3 — present the PRD, ask the gate question. Do not skip to building. |
| `approved` | Gate passed, logged in `decisions.md` | Iterating row applies — safe to skip `design-kickoff`. |
| `closed` | Exploration ended with no winner, or the work was closed | Do not reopen it into a build unless the designer asks. |

The project stage line (§5, `harness/references/project-stage.md`) reads this `status` as its `kickoff`/`framed` signal — it never overrides this table.

If `brief.md` has no truth block and no old `Status:` line (a legacy folder from before this rule existed), inspect it directly: literal placeholder text (`<task-slug>`, `<What the designer...>`, unfilled bracket fields) means treat it as `exploring`.

**Truth-block `status` vs. `decisions.md` disagreement is a bookkeeping gap, not proof the gate was bypassed.** If the truth block still says `draft` but `decisions.md` has a dated gate-approval entry (and/or `log.md`/`findings.md` show post-gate skill output like `ui-agent`/`audit`), treat `decisions.md`'s dated entry as authoritative — it is the append-only, harder-to-silently-edit record — and set the truth block to `approved` rather than treating the artifacts as an unauthorized pre-approval build. Log the correction itself as a new dated `decisions.md` entry so the fix is traceable. Only treat it as an actual gate bypass if `decisions.md` has **no** approval entry at all for that build.

**Atomicity rule — never leave a folder at `exploring` past the end of your turn.** If you create/open a task folder because a designer said "let's start on X," you must either:
- complete Step 0 (ask + log the 3 questions) and move into Step 1 in the same turn, setting the truth block to `draft` once the PRD lands, **or**
- if something blocks you from finishing (missing MCP access, ambiguous request, etc.), say so explicitly to the designer rather than going silent — never let a turn end with a stubbed folder and no explanation.

This exists because two real task folders (`ai-receptionist`, `in-app-chat`) were created as empty template copies when a session ended right after the designer's opening message, before Step 0 ever ran — and a later resume nearly mistook the folder's existence for "already kicked off."
