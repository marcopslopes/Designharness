# Project files — one owner each

Read this before writing under `projects/<slug>/`. One fact lives in one file.

| File | Source of truth for |
|---|---|
| `brief.md` | The truth block: status, assumptions, unknowns, and evidence. An evidence row names its source and points at that source's `sources.md` line. |
| `findings.md` | The detail behind an evidence row. Append-only, dated, and named for the skill that wrote it. |
| `decisions.md` | Choices, including the wayfinding map. The map is an index of named decisions; a settled decision is an entry in this same file. Its `### ` entries show on the project page and board as **Decisions**, so write them for a reader: no internal names or quotes about people who aren't the designer. |
| `testing/<id>/results.md` | Raw test results. Summarise them into the truth block. The results file is not the only copy. |
| `testing/test-plan.md` | What the study is checking. Not the results. |
| `sources.md` | The project's index: outside links, plus one line per file in `raw/` and `docs/`. Read it first; open a file only when the task needs it. Not the finding those sources support. |
| `raw/` | Raw material, verbatim and gitignored (`raw/shared/` is committed when the team setting is on). Not a conclusion. Rules: `harness/references/project-inbox.md`. |
| `log.md` | What ran on this project. Not what is true. |
| `debt.md` | Deferred advisories. Not a finding and not a decision. |
| `about.md` | The public front page. It does not restate the brief. |
| `designer-context.local/journal/` | Personal notes. Never a project source. Do not cite a journal entry as evidence. |

There is no `wayfinding.md`. A wayfinding pass writes its map into `decisions.md` and does not create `brief.md`.
