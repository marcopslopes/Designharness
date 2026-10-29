# Agents vs skills — what each word means here

This repo uses both words a lot, and they don't mean what "agent" usually
means elsewhere (a separate AI persona with its own memory and tools). Here
they're two layers of the same system. Mixing them up is the most common
confusion for anyone new to the harness.

---

## The short version

| | Skills (`harness/skills/`) | Agents (`harness/agents/`) |
|---|---|---|
| **What it is** | An executable playbook: triggers, workflow steps, output format | A short grouping file: "who would reach for this skill" |
| **How many** | One per folder in `harness/skills/` | 5 |
| **Runs on its own?** | Yes. The orchestrator routes a request straight to it | No. It has no workflow, triggers, or tools |
| **Where the logic lives** | Here | Never here |
| **Analogy** | The tool in the toolbox | The label on the drawer |

**One AI (Cursor, Claude Code, Codex, whichever is in the chat) reads the
orchestrator and runs whichever skills match, regardless of which agent
role a skill is filed under.** There is only one AI doing the work in a
chat. The five agents are not personas taking turns; they're an org chart
drawn over the skill roster for humans.

---

## Skills — the real unit of work

A skill is a file, `harness/skills/<name>/SKILL.md`, with:

- **Frontmatter** naming what it does and the phrases a designer would
  actually type. The contract is in `harness/logs/routing-standards.md`.
- **A scope boundary**: what it does not do, and which neighbouring skill
  to use instead.
- **A workflow**: steps, modes, templates, or a decision tree.
- **A persistence rule**: where its output is written, usually
  `projects/<slug>/findings.md` or `decisions.md`.

When you type a request, `harness/ORCHESTRATOR.md` §2 matches it against
those phrases, and the AI loads and follows the matched skill. Skills don't
know which agent role they're filed under; routing never reads that.

Every skill has a page in [documentation/skills/](../skills/).

---

## Agents — the org chart over the roster

`harness/agents/*.md` are five short files, each answering one question:
**"if I were this kind of person, which skills would I reach for?"**

| Agent file | Role | Owns or composes |
|---|---|---|
| `researcher.md` | Discovery and evidence | `research-agent`, `workload-agent`, `competitor-scan`, research methods |
| `product-designer.md` | Building and shaping screens | `design-kickoff`, `ui-agent`, `design-system`, `ux-pattern`, `deck-builder`, `writing`, most build and craft skills |
| `content-designer.md` | Copy and voice | `content` |
| `craft-reviewer.md` | Quality gates | `audit`, `accessibility`, `benchmark` |
| `design-ops.md` | The harness itself | `ORCHESTRATOR.md`, routing standards, onboarding, `harness-audit` |

Each file lists which skills that role owns and which roles it hands off
to. That's all: no separate prompting, tool access, or memory.

**Why it exists:** a flat list of dozens of skills is hard to browse.
Grouping them the way a product org has a researcher, a designer, a
content person, and a reviewer makes the roster legible without changing
how anything routes.

**Cross-cutting exception:** `audit` is filed under `craft-reviewer`, but
every build chain hands off to it, whoever built the thing. Agent
ownership is a browsing aid, not a routing dependency.

---

## When your role does matter

Your role lives in your profile, not in an agent file. It changes a few
things:

- **Manager profiles** unlock `manager-1on1-prep` and `people-coaching`,
  and `workload-agent` shows your team instead of only your own queue.
- **Squad**, when set, decides which boards `workload-agent` checks and
  which roadmap projects `research-agent` searches.

You never pick an agent. You say what you want, and the orchestrator picks
the skill.

---

## The one thing not to confuse this with

This repo does **not** run a multi-agent system where separate AI
instances hand off to each other in conversation (the "cast of
specialists" pattern: strategist, scout, builder, critic). One AI reads
the orchestrator, matches your request to the right skills, and runs
them: in sequence when they depend on each other, in parallel when they
don't. The roles in `harness/agents/` describe a division of
*responsibility*, not a cast of *characters*.

---

## Related

| File | Role |
|------|------|
| [How the harness works](how-the-harness-works.md) | Architecture, routing, and the request flow end to end |
| [Understanding skills](understanding-skills.md) | What a skill is and how skills chain |
| `harness/ORCHESTRATOR.md` §2 | The routing table skills are matched against |
| `harness/logs/routing-standards.md` | The contract every skill description must meet |
| `harness/agents/*.md` | The five agent-role files |
