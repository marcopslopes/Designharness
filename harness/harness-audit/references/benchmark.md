# Harness benchmark

Measures what the harness costs on real work, so routing changes can be
compared before and after. Each task runs as a fresh Claude Code chat in a
throwaway copy of the repo, with no MCP servers and a spending cap.

Run it with `npm run benchmark` (all tasks) or
`npm run benchmark -- --task small-edit`. Results append to
`harness/logs/benchmark-results.jsonl` (gitignored) and print as a table.
Add `--routing` to run the canonical cases in `eval-prompts.md` instead:
each one stops as soon as the first skill file is read. `--cases eval-1,eval-141`
runs only those. `--dirty` tests the working tree: uncommitted edits and new
untracked files.

Needs the Claude Code CLI, signed in (`claude` once, then `/login`).

## Tasks

| ID | Kind of work | Prompt | Expected skill |
|---|---|---|---|
| `research` | Research | "Here's an interview from our Northline research. Anything interesting?" plus [the transcript](../benchmark/interview-transcript.md) | `research-synthesis` |
| `kickoff` | Thinking and strategy | "Let's start a new project from this brief." plus [the brief](../benchmark/new-project-brief.md) | `design-kickoff` |
| `small-edit` | Prototype, small | "In the mobile-banking-dashboard project, swap the order of the two header buttons on the wallet home screen." | `ui-agent` |
| `new-screen` | Prototype, new | "In the mobile-banking-dashboard project, add a transaction details screen that opens when you tap a transaction on wallet home." | `ui-agent` |
| `review` | Review | "Critique the wallet home screen in the mobile-banking-dashboard project before I share it." | `ux-pattern` |
| `writing` | Writing | "Improve the copy and button labels on the wallet home screen in the mobile-banking-dashboard project." | `content` |
| `stakeholder-message` | Fast lane, writing | "Write the kickoff meeting message to align stakeholders, from these notes." plus [the notes](../benchmark/stakeholder-notes.md) | none — no skill, no web search |
| `reply` | Fast lane, answer | "Reply to this question." plus [the question](../benchmark/pasted-question.md) | none — no skill, no web search |
| `tweak` | Fast lane, prototype | "In the mobile-banking-dashboard project, we're working on the wallet home screen. Make the balance label 2px larger." | `ui-agent` only, no web search |
| `fresh-clone` | First message | The same wallet-button swap, with no profile, on `main` | `ui-agent` |
| `quick-question` | Answer-first | "Quick question: what is 15% of 80?" | none |
| `challenge-fires` | Challenge | "In the mobile-banking-dashboard project, build the consumer-bank hero again." | a question that names the parked hero |
| `challenge-quiet` | Challenge | The wallet-button swap | `ui-agent`, and no challenge |
| `cloud-session` | Cloud, no profile | The wallet-button swap, no profile, on `bench/run` | `ui-agent`, and no profile file written |

Normal tasks copy `benchmark/designer-profile.fixture.md` into the throwaway clone and run on branch `bench/run`. `fresh-clone` copies no profile and checks out `main` at the same commit. `cloud-session` also copies no profile, and stays on `bench/run`. All material is fictional, so the benchmark can stay in the public repo.

## What each run records

- **Steps:** tool calls the agent made before it stopped.
- **Tokens:** input, cached input, and output, from the CLI's own report.
- **Cost and time:** as reported by the CLI.
- **Skill hit:** whether the expected skill's `SKILL.md` was read, and which
  skill was read first.
- **Ended on a question:** a fresh chat that stops to ask (a plan, a choice)
  counts as a finished run; the steps up to that point are what it cost.

## Reading results

Compare the same task, model, and harness commit across runs. One run per
task is noisy; run each task three times before drawing conclusions.
