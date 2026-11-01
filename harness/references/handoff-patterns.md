# Handoff patterns — anti-patterns and handoff types

The full text of `harness/ORCHESTRATOR.md` §8 and §8a. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

## Handoff anti-patterns (§8)

These are named failure modes for agent handoffs — what to watch for when auditing routing-log entries or debugging why a task felt bumpy. Your system already prevents most of these through explicit routing (§2) and state rules (§5), but naming them makes gaps easier to spot during harness audits.

| Anti-pattern | What it looks like | How your harness prevents it |
|---|---|---|
| **The black hole** | Work is handed off but never picked up — designer asks for X, routing fires a skill, but no output appears or the wrong skill ran | Explicit routing table (§2) + fallback protocol (§4) — every miss is logged loudly, never silent |
| **The echo chamber** | Agents hand work back and forth without progress — "critique this" → `ux-pattern` → "now build it" → `ui-agent` → "now critique it again" → loop with no new information | Plan gate (§3) breaks the loop — designer must approve direction before build; `audit` is final, not iterative |
| **The context cliff** | Critical information is lost in the handoff — `research-agent` finds key constraint, but `ui-agent` doesn't see it because it's not in `brief.md` or `decisions.md` | State rules (§5) — skills append to shared files (`findings.md`, `decisions.md`, `sources.md`); every skill reads the task folder first |
| **The jarring transition** | User experience changes dramatically at the handoff point — designer gets a roadmap snapshot from `workload-agent`, then a totally different interaction style when `research-agent` runs | Persona consistency (`harness/designer-onboarding/SKILL.md` § The greeting) — Muse voice across all skills; handoff menu uses same `AskQuestion` UI pattern |
| **The silent redirect** | User doesn't know they've been handed off and gets confused — designer asks vague question, gets routed to `workload-agent` but doesn't understand why | Handoff menu (`harness/designer-onboarding/references/handoff-menu-question.md`) explicitly names next options; `workload-agent` headlines state what's being shown (roadmap, execution, overlap); no silent skill-switching mid-turn |

**When to reference this:** During `harness-audit` retrospective mode (reading `routing-log.md` to propose fixes), or when a designer reports a task felt "off" but routing was technically correct.

**Not a gate.** These are diagnostic labels, not mandatory checks. If you spot one during an audit, log it in `harness/logs/routing-log.md` as a note and consider whether a routing-table or handoff-menu improvement would prevent recurrence.

## Handoff types in use (§8a)

Industry-standard vocabulary for *how* work moves between skills, complementing §2g's agent role patterns (which name *what* each skill is). Every chain in §2 is one of these six shapes — naming them makes it faster to spot which anti-pattern (§8 above) applies when a handoff feels wrong, since each type fails in a characteristic way.

| Type | What it means | Real example in this harness |
|---|---|---|
| **Sequential** | Agent A finishes, output feeds Agent B, relay-race style | `ui-agent` → `design-system` (token-check) → `icon-usage` → `audit` — each step's output is the next step's input; skipping order breaks the chain (raw CSS values get written before the token-check can catch them) |
| **Parallel fan-out** | One request distributes to multiple skills at once | Kickoff does not fan skills out. `harness/skills/design-kickoff/SKILL.md`. |
| **Parallel fan-in** | Multiple skills' results converge back into one artifact | Kickoff does not fan skills in. `harness/skills/design-kickoff/SKILL.md`. |
| **Escalation** | The harness can't confidently pick a skill, or a gated skill declines, so it hands the decision to the human | §4 fallback protocol's loud miss ("closest is X — run that or freestyle?"); `manager-1on1-prep` declining for an IC profile and pointing at `workload-agent`/`research-agent` instead |
| **Fallback** | A skill's primary path is unavailable, so a backup takes over automatically, without asking | `competitor-scan` uses the Mobbin MCP when a designer already has it connected, and falls back to web search automatically when it isn't — both paths valid, disclosed once per run, no interruption |
| **Human handoff** | The AI stops and hands the decision to a person before continuing | Kickoff's one why question. `harness/skills/design-kickoff/SKILL.md`. |

**Not a new mechanism.** Every example above already existed before this table — this just names the shape so a harness audit can ask "which type of handoff is this, and does it match the pattern's usual failure mode" instead of describing each chain from scratch.
