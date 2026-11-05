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

1. Read only the designer profile, the existing project folders, and any brief that could own this, and run `npm run -s harness:recall -- "<topic>"` (`harness/references/harness-recall.md`): other designers' projects, raw material, your inbox and past chats on the topic. No writes, branches, or folders. Do not open git, the plan gate, templates, or another skill.
2. Research only on request. By default, use only your own work from step 1 and go to step 3. Run the sweep below when the ask says research, references, inspiration, or discovery, or when the designer picks "Look for references first" in step 3. One search per source, in this order; skip a source that isn't connected or doesn't match the topic. Hard budget: 8 steps.
   - **Your own work.** A project or screen from step 1 on the same topic is a reference. Name it first: reuse it, or start fresh. Another designer's project is a reference too: reuse it and credit it, never write into it. Inbox and past-chat hits are leads: one line, then check the repo. When it is the same product (the same app or site), where the work goes is a question, even after "new project": ask it in the same `AskQuestion` as the why (add to <slug> (Recommended) / a separate project). A brief that left this screen out is a scope change on that project, not a reason for a new one. A project with `example: true` in its truth block is a made-up sample, not their work: never resume it or offer to add to it, unless the designer named it (slug or title) or opened it. Start a new project, and if the sample is on the same topic, say once: "There's a made-up example on this topic, `<slug>`. I'm starting your own project instead." (`harness/references/resume-detection.md`).
   - **Mobbin search.** Screens; flows too when the ask is a journey of several steps (send money, onboarding). Not connected: the web, and say the search was degraded.
   - **Your Mobbin saves.** List the collections; open one only when its name matches the topic. A saved pick ranks above a search result.
   - **NotebookLM.** One question to a notebook whose name or topics match.
   - **Figma.** Only a file the designer linked.
   - **Team docs, tracker, chat.** Whatever `harness/references/work-tools.md` resolves: one topic search per connected tool, titles and links only, with the chat privacy guardrail in `harness/skills/research-agent/SKILL.md`. A full sweep stays `research-agent`.

   Keep 3 outside references, plus any of your own work. One line each: what it is and why it matters. A reference that comes from memory, not a search, says so on its line. Then one line, with both labels even when one side is short: `Sources: <used>. Not used: <each skipped source, and why>.` Example: `Sources: your work (everyday-banking-dashboard), Mobbin. Not used: NotebookLM (no matching notebook), Figma (no link).`
3. Send one message, in this order: a routing line (new project, or which existing one); the references and the Sources line; any owner or scope conflict with an existing brief, in one sentence; one why question (what problem, for whom, and what changes) with two or three options grounded in those references. When the sweep did not run, add the option "Look for references first"; the Sources line then reads `Sources: your work (…). Not used: outside sources (not asked for).`
4. Push back once at most, then follow the designer.
5. Only then write. New project: copy `projects/_template/` except `strategy.md`, `breadboard.md` and `conceptual-model.md` (their own skill creates each one when that work happens), then write `brief.md`: the why under `## Why` (Problem, For whom, What changes, one sentence each), the `## How we'd know` table proposed from the Step 0 references (`harness/references/measurement-plan.md`; no new searches, Status `proposed`), `system:` in the truth block when the platform is known (mobile, desktop), and `sources.md` with the references. Each fact goes in its one place in the template; do not repeat the why, the success line, or the owner elsewhere. Show the table once in the write message with its one correction line. Do not ask it and do not wait. Leave `## Ship` as the template has it. End that message with the plain next step (`harness/references/state-rules.md`). Existing project: write into that folder. From Slack, Jira, Confluence, Notion, or Google Drive while the repo is public, the folder is `projects.local/<slug>/` and the line is "Saved locally, since this repo is public."

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
