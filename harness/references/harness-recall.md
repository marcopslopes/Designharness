# Recall — what the harness already has, before starting

Before a new project, a new screen, or an insight, check what already
exists: your projects, other designers' projects in this repo, their raw
material, your notes and inbox, and your past chats. Then build on it
instead of starting cold.

```
npm run -s harness:recall -- "<topic in 2–5 words>"
```

It prints three groups, five hits each at most: **Projects** (with status,
whose it is, which files matched, matching screens, one line), **Your
notes and inbox** (`designer-context.local/`), and **Past chats** (date,
what the chat started with, the matching ask). Stdout only; it writes
nothing. About a second.

## When

- `design-kickoff` Step 0, as part of "Your own work".
- `ui-agent`, a new screen in an existing project.
- `research-agent` ("what do we know about X") and `insight-writer`, before
  writing a finding or an insight.

Not for a small tweak to a screen already in progress.

## Using the hits

- **Projects.** One that matches is a reference: name it first, with whose
  it is. The designer's own → reuse or extend it (kickoff asks where the
  work goes). Another designer's → reuse its screens, findings and
  decisions, credit it ("Builds on `<slug>` by <name>"), and never write
  into it. A `made-up sample` follows `resume-detection.md`.
- **Notes and inbox.** Read the file before relying on it. A dropped file
  in `designer-context.local/inbox/` that belongs to the project being
  started gets copied into its `raw/` and indexed in `sources.md`
  (`project-inbox.md`).
- **Past chats.** Leads, not facts. Say it in one line ("You asked about
  this on 20 Oct"), then check the repo for what came of it. Never copy chat
  text into a file; anything worth keeping should already be in a project.
- Add one line to the kickoff references or the reply:
  `Already in the harness: <hits, or "nothing on this">.` Nothing found →
  say it and move on.

## Limits

- Word match, not meaning. A topic with only generic words ("home",
  "card") matches loosely; re-run with the specific words.
- Past chats match only what the designer typed. Long pastes are skipped:
  with a project they live in `raw/`, without one in the inbox.
- The newest chat (the one running the search) is skipped.
- `preferences.md` § Harness still applies: a hit that is company content
  in a repo where that is not allowed is not used.
