# Remote sync — how work reaches the team

The full text of `harness/ORCHESTRATOR.md` §6. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

Every designer runs their own local clone; there is no server keeping `projects/`, `harness/logs/routing-log.md`, or guardrail edits (`CLAUDE.md`, `AGENTS.md`, `harness/skills/**`) in sync across people. The team's own Git remote (see `INSTALL.md` § Use it with a team) is the only sync mechanism, and nothing pushes to it automatically.

`audit` — the mandatory last step of every build chain — is the designated point to ask about this: on a **PASS**, it checks `git status` and, if there are uncommitted changes, asks the designer whether to commit and push. See `harness/skills/audit/SKILL.md` Step 4. This is a nudge, not a gate — the designer can always say no and keep working locally.

`audit` also owns the Team Gallery (`#/gallery`) check: gallery projects are read from each committed `brief.md` at build time (Ownership + Case study summary only), so nothing is mirrored by hand. On a **PASS**, before the Step 4 push prompt, Step 3.5 checks whether the brief is gallery-eligible (`Designer:` resolved, `Gallery: visible`, case-study lines filled) and whether that designer has an enriched entry in `src/design-harness/galleryData.ts` — the brief rides along in the same push as its build output. **Primary** designer-card enrichment (`title` / `focusAreas` / `avatar`) runs earlier at first eligibility via `task-intake` / `design-kickoff` using `harness/references/gallery-card-enrichment.md`; Step 3.5 is the safety net. See `harness/skills/audit/SKILL.md` Step 3.5.
