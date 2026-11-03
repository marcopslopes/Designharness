# Git autopilot

Git operations for a project. One script. Say its line. Stop.

A share link is not one of these. "Give me a share URL" is `publish-project`: a page someone can open. The push in § 5 may print a review page. That page is where the team looks at the branch. It is not a share link.

## How to run

Do not read past this section unless a section below is named, or the script asked a question. Do not open `scripts/git-autopilot.mjs`. Do not compare history. Do not add a remote.

| They said | Run |
|---|---|
| "wrap up" (after the journal) | `node scripts/git-autopilot.mjs save <slug> "<one-line summary>"` |
| "share this" / "push this" / "send this to the team" | Ship packet, exposure internal (`harness/references/ship-packet.md`): say its one line, then `node scripts/git-autopilot.mjs share`, then the script's line. |

Show the script's output. If it refuses or fails, stop.

Those two run even when Git autopilot is off. The rest (start, resume, catch-up, undo, update, a parallel folder) are team mode. Team mode is parked for phase two: it runs only when `behaviour.gitAutopilot` is on, or the profile says `- Git autopilot: on`. Off, they print `Git autopilot is off.` and touch nothing. `doctor` still runs when named.

In Cursor, do not run `session`.

Say the script's line. Never run `git switch`, `git commit`, `git merge`, `git reset`, `git revert`, or `git push` yourself.

## 1. Start — a new project

When `harness/skills/design-kickoff/SKILL.md` says to write a new folder, run `start <slug>` before creating it. Say `Working on ana/<slug>.`

A project from Slack, Jira, Confluence, Notion, or Google Drive, while `publicRepo` is on, is `projects.local/<slug>/`. Run `start <slug> --scaffold --local` and also say `Saved locally, since this repo is public.` Autopilot never commits that folder. No company source stays `projects/<slug>/`.

## 2. Resume — an existing project

On "continue <slug>", run `resume <slug>` before reading the folder. Say its line if it prints one.

### 2a. Catch-up — on request only

"Bring in the latest main" → `catch-up`. Not "catch me up on X". A conflict stops and lists the files. Pass the list on and ask before resolving anything.

## 3. Save — "wrap up"

Run the save command from How to run. Say `Saved on ana/<slug>: <summary>`, or `Nothing new to save.`

### 3a. Harness edits on a project branch

If the save stops and lists files outside the project, ask once (`AskQuestion`, no Other):

- **Keep it local** → `save … --keep-harness`
- **Suggest it to the harness** → `save … --suggest-harness`, then give the link it prints

## 4. Undo — "undo the last change" (on request only)

Run `undo`. Show what it names and ask once (`AskQuestion`: Undo it / Keep it — no Other). On yes, run `undo --yes`. An edit that was never saved is reverted in the file, not here.

## 5. Push — "share this"

The words are "share this". The operation is a push of the project branch, after the ship packet's line.

1. Run `harness/references/ship-packet.md` at exposure internal. It never stops a share. Say its one line, including anything not set yet.
2. Run `node scripts/git-autopilot.mjs share`. Show its output. If it refuses or fails, stop.

Don't read the script, other guides, or config. Before the script, read only the brief, plus `findings.md` when the packet has to propose How we'd know.

The line `Ready for review: <url>` is the review page for that push. It is not a share link.

On `main`, `simplify`, or `<name>/harness-<slug>`, the script says why and what to do next. Say that line and stop.

## 6. Update my harness (on request only)

"Update my harness" → `update`. A conflict stops and lists the files. Pass the list on and ask before resolving anything.

## 7. Work on another project in parallel (on request only)

"Work on another project in parallel" → `worktree <slug>`. Give the folder path and say to open it in its own window.

## 8. Doctor — "something's off with Git" (on request only)

`doctor`. Summarise its lines. Suggest the step that fixes the first problem.

## Failure lines

The script exits with one sentence. Say that sentence and stop. Don't paste Git output.
