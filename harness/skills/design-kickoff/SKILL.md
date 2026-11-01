---
name: design-kickoff
description: >-
  Front door for a new or ambiguous design request. Triggers on start, kick
  off, work on, explore, look into, design, or build something that is not a
  small tweak to a screen already in progress, including a one-line idea and
  a screen no brief already includes. A small tweak skips this and just does
  the change. Wayfinding and research-method questions are other rows. This
  file is the only copy of the kickoff rules.
---

# Design kickoff

Design partner. No folder, brief, branch, or screen until the why is answered.

## When this fires

A new or ambiguous request: start, kick off, explore, design, or build
something that does not exist yet, or a screen no existing brief includes.

A small tweak to a screen already in progress skips this. Do the change.

## Never ask

Name: default it from their words. Requester: the designer in the profile.
Hands-on level: the profile. Do not offer these.

## Step 0

1. Read only the designer profile, the existing project folders, and any brief that could own this. No writes, branches, or folders. Do not open git, the plan gate, templates, or another skill.
2. Research without asking permission. One search per source, in this order; skip a source that isn't connected or doesn't match the topic. Hard budget: 8 steps.
   - **Your own work.** A project or screen from step 1 on the same topic is a reference. Name it first: reuse it, or start fresh. When it is the same product (the same app or site), where the work goes is a question, even after "new project": ask it in the same `AskQuestion` as the why (add to <slug> (Recommended) / a separate project). A brief that left this screen out is a scope change on that project, not a reason for a new one.
   - **Mobbin search.** Screens; flows too when the ask is a journey of several steps (send money, onboarding). Not connected: the web, and say the search was degraded.
   - **Your Mobbin saves.** List the collections; open one only when its name matches the topic. A saved pick ranks above a search result.
   - **NotebookLM.** One question to a notebook whose name or topics match.
   - **Figma.** Only a file the designer linked.
   - **Team docs, tracker, chat.** Whatever `harness/references/work-tools.md` resolves: one topic search per connected tool, titles and links only, with the chat privacy guardrail in `harness/skills/research-agent/SKILL.md`. A full sweep stays `research-agent`.

   Keep 3 outside references, plus any of your own work. One line each: what it is and why it matters. Then one line: `Sources: <used>. Not used: <skipped, and why>.`
3. Send one message, in this order: a routing line (new project, or which existing one); the references and the Sources line; any owner or scope conflict with an existing brief, in one sentence; one why question (what problem, for whom, and what changes) with two or three options grounded in those references.
4. Push back once at most, then follow the designer.
5. Only then write. If gitAutopilot is on (`behaviour.gitAutopilot` in `harness.config.local.json`; a missing key means off; or the profile says it is on), run `node scripts/git-autopilot.mjs start <slug>` and say its line. If it is off, skip that. New project: copy `projects/_template/` except `strategy.md`, `breadboard.md` and `conceptual-model.md` (their own skill creates each one when that work happens), then write `brief.md` with the why at the top, a "How we'd know" line (one guessed success signal, for them to correct — do not ask it), and `sources.md` with the references. Existing project: write into that folder. From Slack, Jira, Confluence, Notion, or Google Drive while the repo is public, the folder is `projects.local/<slug>/` and the line is "Saved locally, since this repo is public."

Deleting or overwriting a folder or a brief: name it and wait for a yes.

## New surface

A plan for a new screen starts with a structure step: what is on the
screen, plus 2 options. The designer picks. Then the build runs. Do not
open a build plan that skips this.

After the pick, say one sentence: "You picked {B}. You give up {what the
other option did better}." Add the other option under `parked` in the
brief. Then show the stage line before the plan:
`Project <slug> · stage kickoff (Kickoff) · <evidence> · <what runs next>`
(`harness/references/project-stage.md`).
