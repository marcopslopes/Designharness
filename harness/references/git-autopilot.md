# Git autopilot — branches, saves and shares without Git words

Designers never type a Git command, and never see one unless something goes
wrong. Each project gets its own branch, `project/<slug>`; "wrap up" saves
it; "share this" pushes it. Every step runs one script, which does the Git
and prints the one line to say:

```
node scripts/git-autopilot.mjs start <slug>
node scripts/git-autopilot.mjs resume <slug>
node scripts/git-autopilot.mjs save <slug> "<one-line summary>" [src/… paths]
node scripts/git-autopilot.mjs undo            # preview
node scripts/git-autopilot.mjs undo --yes      # after the designer agrees
node scripts/git-autopilot.mjs share
```

Say the script's line as it is. Say nothing when it prints nothing. Never run
`git switch`, `git commit`, `git reset`, `git revert` or `git push` yourself
for these steps.

**Setting:** `behaviour.gitAutopilot` in `harness.config.local.json`, shown in
Settings as "Handle Git for me". Default on. Off → the script prints
`Git autopilot is off.` and touches nothing. Skip every step below, say
nothing about Git, and let the designer run it.

## 1. Start — a new project

When `design-kickoff` opens a **new** `projects/<slug>/` folder (any new
project signal, including "start a project called X"), run `start <slug>`
**before** creating the folder, then say its line: `Working on project/<slug>.`

- It branches from `main`, never from another project's branch.
- Uncommitted work is committed on the branch it was made on first
  (`Save work in progress before starting <slug>`). It never carries over.
- If the branch already exists, it switches to it.

The app's **New project** button (Prototypes page) runs the same start, also
copies `projects/_template/`, and opens the brief.

## 2. Resume — an existing project

On "continue <slug>" or any resume of an existing folder, run `resume <slug>`
before reading the folder. It switches to `project/<slug>` if that branch
exists, committing uncommitted work where it was made first, and prints
`Working on project/<slug>.` Say it. No branch (a project from before
autopilot) → it prints nothing; carry on where you are.

## 3. Save — "wrap up"

After `session-journal` writes the journal entry and the handoff row, run:

```
node scripts/git-autopilot.mjs save <slug> "<the entry's one-line summary>" <src files changed this session>
```

- **What it commits:** `projects/<slug>/` (brief, screens, docs, `log.md`)
  plus the `src/` paths you name. Name only files you changed in this
  session (registrations, nav entries, shared components). Never a file
  you didn't touch.
- **Never committed**, even if named or unignored: `designer-context.local/`,
  `designer-profile.local.md`, `harness.config.local.json`,
  `context/org-pack.local/`, `harness/logs/`, `logs/`, `tmp/`, any `*.local`
  path. The script refuses them.
- Say its line: `Saved on project/<slug>: <summary>`, or `Nothing new to save.`
- On the wrong branch, it stops and says which one to continue. Pass that on.

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
3. Run `share`. It pushes `project/<slug>` and prints the link. Give the
   link.

The script never pushes `main`, never force pushes, and only pushes the
current project branch. No remote → it says so. Pass it on. A rejected push
(someone else pushed the branch) → say it needs a pull first. Never force.

"Publish this project / give me a share URL" is `publish-project` (a
deployed site), not this.

## Failure lines

The script exits non-zero with one plain sentence. Pass it on in one line,
then suggest the next step. Don't paste Git output. If Git itself is
missing, the folder isn't a repo, or there's no `main`, say the setup needs
a technical hand, and keep working without autopilot for this chat.
