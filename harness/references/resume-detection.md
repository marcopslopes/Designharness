# Resume detection — a task folder is not proof that kickoff happened

The full text of `harness/ORCHESTRATOR.md` §2b. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

**Never infer completion from a folder's mere existence.** Before treating any `projects/<slug>/` as "already handled" (iterating row, or "already answered, don't re-ask"), read `status` in the truth block at the top of `brief.md`. Old words on a leftover `Status:` line map the same way: STUB → `exploring`, EXAMPLE or DRAFT → `draft`, APPROVED → `approved`.

| Status | Meaning | What to do |
|---|---|---|
| `exploring` | Folder was created (or copied from `projects/_template/`) but Step 0 never ran, or the turn that created it ended before Step 1/2 completed | Treat exactly as if **no task folder exists**. Restart at `design-kickoff` Step 0. Do not ask "haven't we already started this?" — exploring carries zero answered questions. |
| `draft` | PRD exists (Step 2 done) but Step 3's gate was never explicitly approved | Resume at Step 3 — present the PRD, ask the gate question. Do not skip to building. |
| `approved` | Gate passed, logged in `decisions.md` | Iterating row applies — safe to skip `design-kickoff`. |
| `closed` | Exploration ended with no winner, or the work was closed | Do not reopen it into a build unless the designer asks. |

**A sample is not the designer's work.** A truth block with `example: true` is a made-up sample that ships with the harness. Never resume it, never treat it as "already started", and never write into it, whatever its `status` says. The exception: the designer names it (its slug or its title) or opens it. Then it resumes like any project. A new request that sounds like a sample starts a new project. If the sample is relevant, say it once, in plain words: "There's a made-up example on this topic, `<slug>`. I'm starting your own project instead." Do not offer to add to it.

The project stage line (§5, `harness/references/project-stage.md`) reads this `status` as its `kickoff`/`framed` signal — it never overrides this table.

If `brief.md` has no truth block and no old `Status:` line (a legacy folder from before this rule existed), inspect it directly: literal placeholder text (`<task-slug>`, `<What the designer...>`, unfilled bracket fields) means treat it as `exploring`.

**Truth-block `status` vs. `decisions.md` disagreement is a bookkeeping gap, not proof the gate was bypassed.** If the truth block still says `draft` but `decisions.md` has a dated gate-approval entry (and/or `log.md`/`findings.md` show post-gate skill output like `ui-agent`/`audit`), treat `decisions.md`'s dated entry as authoritative — it is the append-only, harder-to-silently-edit record — and set the truth block to `approved` rather than treating the artifacts as an unauthorized pre-approval build. Log the correction itself as a new dated `decisions.md` entry so the fix is traceable. Only treat it as an actual gate bypass if `decisions.md` has **no** approval entry at all for that build.

Kickoff folders, writes, and deletions: `harness/skills/design-kickoff/SKILL.md`.

A folder that exists at `exploring` still restarts there. Empty folders used to get mistaken for a finished kickoff (`ai-receptionist`, `in-app-chat`).
