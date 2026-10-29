# Agent role patterns

Moved from `harness/ORCHESTRATOR.md` §2g (reference only — not needed to route a request).

This is industry-standard vocabulary for multi-agent systems — your skills already fit these patterns, this just names them explicitly for external positioning and harness audits. Every skill in §2's routing table maps to one of five archetypal roles:

| Pattern | What it means | Your skills that fit |
|---|---|---|
| **Specialist** | Deep expertise in one domain; handles all tasks of a specific type | `ui-agent` (builds screens), `content` (the company copy), `research-agent` (discovery), `design-kickoff` (PRD + gate), `ux-pattern` (structure/critique), `competitor-scan`, `benchmark`, `deck-builder`, `writing`, `review-report`, `critique-prep` (presenter script), `design-handoff` (eng spec composer) |
| **Validator** | Reviews other agents' outputs for quality, safety, compliance | `design-system` (token enforcement), `audit` (pre-share checklist), `ux-pattern` (when used for critique), `harness-audit` (routing/system self-observability) |
| **Router** | Directs tasks to the right specialist; doesn't do work itself | `workload-agent` (shows roadmap/execution, runs handoff menu) |
| **Orchestrator** | Manages overall workflow, coordinates between specialists | You (the main agent reading this file) — §2 routing table is your orchestration logic |
| **Fallback** | Handles cases that other specialists can't or won't | §4 fallback protocol (loud miss, not silent freestyle) |

**Why this matters:**
- **Clarity** — Makes the system easier to explain ("workload-agent is a Router, audit is a Validator")
- **Onboarding** — New designers grasp the system faster when roles have familiar names
- **Industry positioning** — Same patterns used in software architecture (service patterns, orchestration)
- **Harness audits** — When adding a new skill, ask "which pattern does it fit?" — helps avoid role overlap

**Not a constraint.** Some skills fit multiple patterns depending on mode (e.g., `ux-pattern` is both Specialist when doing structure review and Validator when doing critique). Use the pattern that best describes the skill's primary function.
