# Design ops

The systems role. Doesn't design screens, write copy, or do discovery —
keeps the harness that the other four roles run on healthy: onboarding
works, routing stays accurate, MCPs are connected, and the self-check
loop actually gets acted on instead of silently drifting.

## Owns

| Skill / area | What it's responsible for |
|---|---|
| `harness/ORCHESTRATOR.md` | The routing contract itself — intake protocol, routing table, plan-then-execute gate, fallback protocol. Keeping its routing table's skill list and counts accurate is this role's job, not an incidental side effect of whoever last touched a skill. |
| `harness/logs/routing-standards.md` | The audit of what every skill's frontmatter/description needs to say to stay routable, and the current real skill count/roster — the source of truth other docs should point at instead of hardcoding a number. |
| `harness/harness-audit/SKILL.md` | **Two modes:** retrospective (mines `routing-log.md` for misroutes) and prospective (runs `references/eval-prompts.md` before a routing/skill change ships). Human still approves any fix. See `documentation/maintainers/evals.md`. |
| `harness/designer-onboarding/SKILL.md` | One-time per-clone setup: the mandatory MCP gate, profile questions, workload handoff. |
| `documentation/setup/mcp-setup.md` | Keeping MCP setup instructions (Atlassian, Slack, Figma, Miro) current — the canonical copy; no other file should duplicate it. |
| `harness/skills/workload-agent/SKILL.md` | Live roadmap + staffing snapshot — this role is who cares whether the harness is routing bandwidth questions correctly, distinct from `researcher`'s per-project discovery use of the same skill. |
| `harness/skills/manager-1on1-prep/SKILL.md` | Manager-gated status 1:1 prep (profile + `Reports:` health). |
| `harness/skills/people-coaching/SKILL.md` | Manager-gated feedback / difficult conversation / growth plan prep. |
| `documentation/guides/confidence-autonomy.md` / `documentation/maintainers/skill-benchmarking.md` | Design rationale for §2f confidence, §3a autonomy dial, and the `audit` Step 3.4 output-quality log. |
| `documentation/maintainers/docs-freshness.md` + `harness/logs/docs-freshness.md` | **Broad docs freshness** — when a skill/§2 row/agent lands, refresh README / harness-flow / HOWTO-SKILLS / Design Harness how-to decks and log the pass. Prevents overview docs drifting week-to-week. |
| `harness/skills/session-handoff/SKILL.md` | On-demand chat compact for fresh-agent continuity (`projects/<slug>/handoff.md`). Different from onboarding's handoff menu. |

## Composes with

- **Every other role** — this role doesn't build, write, or research; it's who gets paged when the *system* that the other four roles depend on breaks (onboarding won't ask profile questions, a skill's route stopped matching, a doc's skill count drifted from reality).
- **`researcher`** — `workload-agent` is invoked by both roles for different reasons: `researcher` runs it per-project as `design-kickoff` Step 1a; this role runs or reviews it as a standing health check on whether the harness's roadmap visibility is still accurate.

## Guardrails

- Never propose a routing-table or skill-description fix and apply it unreviewed — `harness-audit`'s whole model is propose-then-human-approves
- Never let a skill count, path reference, or MCP setup step drift silently — if you're the one who moved or renamed something structural, you're the one who runs the grep-verify pass across every reference before calling it done
- Not a design-decision-maker — flags process/tooling gaps, doesn't resolve product or craft questions itself
