# Project raw material (`raw/`)

Raw material the designer hands over for a project — a pasted transcript,
Slack thread text, doc text, an attached file — is saved word for word
before anything summarizes it. `findings.md` keeps the conclusions; `raw/`
keeps the original, so "who said that" and "was it decided or just said"
can still be checked weeks later.

## Where

`projects/<slug>/raw/` — next to the project, and **gitignored**: raw pastes
carry people's names and words, and `projects/` is public. A project saved
locally keeps it in `projects.local/<slug>/raw/`. Create the folder on the
first save; never pre-create it.

**Sharing with a team.** `behaviour.shareRaw` in `harness.config.local.json`
(Settings → "Share raw notes with the team", default off). On: a file with
no people's names or words in it saves to `raw/shared/`, which is committed.
Anything with names, quotes, or screenshots of people still saves to `raw/`
unless the designer says to share that file. Off: everything stays in `raw/`.

Older projects may still have `projects.local/<slug>/inbox/` or a hand-made
raw folder (e.g. `projects.local/checkout/context/`). Those count as that
project's raw material — read them, don't move them.

## What gets saved

| Save | Don't save |
|---|---|
| Pasted text: transcripts, thread text, doc excerpts, notes, survey answers | A link the source still holds (Slack permalink, Doc URL) — that's a `sources.md` link row |
| An attached file — **copied**, never moved | Anything with no project in play (that goes to the inbox, § No project in play) |
| A link plus the parts that mattered, when the source may not last | Secrets, credentials, personal DMs the designer didn't ask to use |

## File shape

`YYYY-MM-DD-<what-it-is>.md` (e.g. `2026-10-11-pricing-sync-transcript.md`),
the content verbatim under a short header:

```
---
kind: transcript | thread | doc | note | file
source: pasted | <original path> | <url>
date: <when it happened, or "unknown">
people: [<names that appear>]
filed: YYYY-MM-DD
---
```

## Rules

- **Save first, then summarize**, in the same turn. The `findings.md`
  entry cites the `raw/` path.
- **Index it.** Add one line to the **Files** table in `sources.md`: the
  path, what it is, and what it supports. That line is what agents read;
  the file itself is opened only when a claim needs checking.
- **Never edit or delete a filed item.** Misfiled → move it, update its
  `sources.md` line, and say so.
- One line in chat when saving: `Saved to raw/<file>.`

## No project in play

The same drop with no project open (a meeting transcript, a doc, a file
"just to look at") still gets saved, so it isn't lost in chat history:
`designer-context.local/inbox/`, same file name and header as above,
gitignored. No `sources.md` line; `harness:recall` searches the inbox
directly. One line in chat: `Saved to your inbox: <file>.`

When a project starts on that topic, kickoff's recall finds the file:
copy it (never move it) into the project's `raw/` and add its `sources.md`
line. The inbox copy stays.

Same "don't save" column as above. And if `preferences.md` § Harness rules
the material out of this repo (company content in a personal harness),
don't save it anywhere; say so in one line.
