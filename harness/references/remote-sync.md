# Remote sync — how work reaches the team

The full text of `harness/ORCHESTRATOR.md` §6. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

Every designer runs their own local clone; there is no server keeping `projects/`, `harness/logs/routing-log.md`, or guardrail edits (`CLAUDE.md`, `AGENTS.md`, `harness/skills/**`) in sync across people. The team's own Git remote (see `INSTALL.md` § Use it with a team) is the only sync mechanism, and nothing pushes to it automatically.

The harness does not run Git. Committing, branching, and pushing are the designer's own steps (`AGENTS.md` § Git). "Share this", "push this", "give me a link", or "publish this" gets one line: "The harness doesn't publish a share link yet."

`audit` also owns the Team Gallery (`#/gallery`) check: gallery projects are read from each committed `brief.md` at build time (Ownership + Why only), so nothing is mirrored by hand. On a **PASS**, Step 3.5 checks whether the brief is gallery-eligible (`Designer:` resolved, `Gallery: visible`, Why's Problem and What changes filled) and whether that designer has an enriched entry in `src/design-harness/galleryData.ts`  **Primary** designer-card enrichment (`title` / `focusAreas` / `avatar`) runs earlier at first eligibility via `task-intake` / `design-kickoff` using `harness/references/gallery-card-enrichment.md`; Step 3.5 is the safety net. See `harness/skills/audit/SKILL.md` Step 3.5.
