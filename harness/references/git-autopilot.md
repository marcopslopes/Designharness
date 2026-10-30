# Git autopilot — branches, saves and shares without Git words

Designers never type a Git command, and never see one unless something goes
wrong. Each project gets its own branch, `<first name>/<slug>` (so two
designers on one project never share a branch); "wrap up" saves it; "share
this" pushes it. Every step runs one script, which does the Git and prints
the one line to say:

```
node scripts/git-autopilot.mjs start <slug>
node scripts/git-autopilot.mjs resume <slug>
node scripts/git-autopilot.mjs save <slug> "<one-line summary>" [--keep-harness | --suggest-harness]
node scripts/git-autopilot.mjs undo            # preview
node scripts/git-autopilot.mjs undo --yes      # after the designer agrees
node scripts/git-autopilot.mjs share
node scripts/git-autopilot.mjs catch-up
node scripts/git-autopilot.mjs session         # first reply of a chat
node scripts/git-autopilot.mjs doctor          # "something's off with Git"
node scripts/git-autopilot.mjs update          # "update my harness"
node scripts/git-autopilot.mjs worktree <slug> # "work on another project in parallel"
```

Say the script's line as it is. Say nothing when it prints nothing. Never run
`git switch`, `git commit`, `git merge`, `git reset`, `git revert` or
`git push` yourself for these steps.

**On by default.** Two ways to turn it off, either one wins:
`behaviour.gitAutopilot: false` in `harness.config.local.json` (Settings,
"Handle Git for me"), or `- Git autopilot: off` in `designer-profile.local.md`.
Off → the script prints `Git autopilot is off.` and touches nothing. Skip
steps 1–5 and 7, say nothing about Git, and let the designer run it. `session`,
`doctor`, `update` and `worktree` still work when it's off.

**Whose name.** The branch uses the first name from the profile's `- Name:`.
Cloud sessions have no profile; there it uses `git config user.name`. Neither
→ it stops and says so.

## 0. Session start

On a chat's first reply, pass on any line `session` printed. Claude Code
runs it as a SessionStart hook (`.claude/settings.json`); in Cursor, run it
yourself on the first reply. It prints nothing when all is well, and warns
when:

- the folder is on `main`: `On main. Project work belongs on your own branch.`
- the branch is 50 or more commits behind `origin/main`.

It also runs catch-up (step 2a) when autopilot is on. The fetch gives up after
a few seconds and never asks for a password, so an offline laptop just gets
no warning.

## 1. Start — a new project

When `design-kickoff` opens a **new** `projects/<slug>/` folder (any new
project signal, including "start a project called X"), run `start <slug>`
**before** creating the folder, then say its line: `Working on ana/<slug>.`

- It branches from `main`, never from another project's branch.
- The current project's folder is saved on its own branch first
  (`Save work in progress before starting <slug>`). Nothing is ever
  committed on `main`.
- If the branch already exists, it switches to it.

The app's **New project** button (Prototypes page) runs the same start, also
copies `projects/_template/`, and opens the brief.

## 2. Resume — an existing project

On "continue <slug>" or any resume of an existing folder, run `resume <slug>`
before reading the folder. It switches to `<first name>/<slug>` if that
branch exists, saving the current project's folder first, and prints
`Working on ana/<slug>.` Say it. No branch (a project from before
autopilot, or someone else's) → it prints nothing; carry on where you are.

### 2a. Catch-up

`start`, `resume` and `session` merge `main` (`origin/main` when it's been
fetched) into the project branch once the branch is more than a day behind.
Say the line it adds. Uncommitted changes → it skips the merge and says so.
A conflict → it stops, lists the files and merges nothing. Pass the list on
and ask before resolving anything. `catch-up` runs it on its own.

## 3. Save — "wrap up"

After `session-journal` writes the journal entry and the handoff row, run:

```
node scripts/git-autopilot.mjs save <slug> "<the entry's one-line summary>"
```

- **What it commits:** `projects/<slug>/` (brief, screens, docs, `log.md`)
  plus any changed Team Gallery card or avatar
  (`src/design-harness/gallery-designers/`, `public/design-harness/avatars/`).
  Prototypes only ever live in the project folder (`ui-agent`), so there's no
  shared file to name.
- **Never committed**, even if unignored: `designer-context.local/`,
  `designer-profile.local.md`, `harness.config.local.json`,
  `context/org-pack.local/`, `harness/logs/`, `logs/`, `tmp/`, any `*.local`
  path.
- **Another designer's project.** If a project whose brief names a different
  `Designer:` has changes, it stops and lists them. Ask before going on.
- Say its line: `Saved on ana/<slug>: <summary>`, or `Nothing new to save.`
- On the wrong branch, it stops and says which one to continue. Pass that on.

### 3a. Harness edits on a project branch

Anything else changed outside `projects/` is a change to the harness itself (a
skill, a rule, the app). When there is any, `save` stops and lists the files.
Ask once (`AskQuestion`):

- **Keep it local** → `save … --keep-harness`. The project is saved; the
  harness files stay uncommitted in this copy, and it won't ask about those
  files again.
- **Suggest it to the harness** → `save … --suggest-harness`. The project
  is saved, then the harness files move to `<first name>/harness-<slug>`,
  branched from `main`, which is pushed and opened as a pull request against
  the harness repo (the `upstream` remote). With the GitHub CLI signed in it
  opens the PR and prints its link; otherwise it prints the link to the
  pull request form. Give the link. The project branch no longer has the
  change.

## 4. Undo — "undo the last change"

1. Run `undo` (no flag). It names the last autopilot save on this branch and
   lists its files. Show that, in plain words, and ask once
   (`AskQuestion`: Undo it / Keep it).
2. On yes, run `undo --yes`. It adds a new commit that takes the save back;
   history is never rewritten, so the undo can itself be undone by asking
   again later.
3. It only undoes autopilot commits on this project branch, never on
   `main`, never someone's manual commit. If files have unsaved changes
   since that save, it stops. Say so: wrap up or discard them first.

"Undo that" about an edit that hasn't been saved yet is not this. Revert the
edit in the file as usual.

## 5. Share — "share this"

Only on the designer's ask ("share this", "send this to the team", "push
this"). Never on your own, never as a side effect of wrap up.

1. Same gate as any share: if the project has built screens and `audit`
   hasn't passed since they last changed, run `audit` first. BLOCKED → don't
   share.
2. Save first if there's unsaved project work (step 3).
3. Run `share`. It pushes the branch and prints a link: the pull request
   form on GitHub, the branch page elsewhere. Give the link.

The script never pushes `main`, never force pushes, and only pushes the
current branch. No remote → it says so. Pass it on. A rejected push
(someone else pushed the branch) → say it needs a pull first. Never force.

"Publish this project / give me a share URL" is `publish-project` (a
deployed site), not this.

## 6. Update my harness

"Update my harness" / "get the latest harness" → `update`. It:

1. stops if there are uncommitted changes (wrap up first);
2. uses the `upstream` remote, or a remote already pointing at the harness
   repo, and adds `upstream` (the harness's GitHub repo) if there's neither;
3. merges the harness's `main` into the current branch, keeping the team's
   `projects/` exactly as it was (only `projects/_template/` and
   `projects/README.md` come from the harness). `*.local` files are never
   tracked, so they're untouched;
4. runs `npm install` if dependencies changed. Nothing else is generated
   and tracked: the app discovers projects, screens and gallery cards at
   dev, build and typecheck time;
5. on a real conflict, merges nothing and lists the files. Pass the list on
   and ask before resolving.

## 7. Work on another project in parallel

"Work on another project in parallel" / "open <slug> in a second window" →
`worktree <slug>`. It makes a second folder next to this one
(`<folder>-<slug>`) on `<first name>/<slug>`, and links in the profile,
`designer-context.local/`, settings, the local org pack and `node_modules`,
so the second window knows the same designer and skips onboarding. Give the
folder path and say to open it in its own window. Each folder has its own
branch, so the two never step on each other.

## 8. Doctor — "something's off with Git"

`doctor` lists uncommitted files and the branch each likely belongs to,
branches behind `main`, and whether `origin` and the harness answer. Summarise
it in plain words; suggest the step that fixes the first problem.

## Failure lines

The script exits non-zero with one plain sentence. Pass it on in one line,
then suggest the next step. Don't paste Git output. If Git itself is
missing, the folder isn't a repo, or there's no `main`, say the setup needs
a technical hand, and keep working without autopilot for this chat.
