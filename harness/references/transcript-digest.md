# Transcript digest — learn from past chats

Every chat in this repo is already recorded by the agent tool (Cursor:
`~/.cursor/projects/<repo>/agent-transcripts/`, Claude Code:
`~/.claude/projects/<repo>/`). Nothing read them. This job condenses them
into one short file the harness can use:
`designer-context.local/how-i-work.md`.

It runs on its own. `harness:context` prints `Digest: due` at session
start once 5 new chats piled up, or any new chat after 7 days, and the
agent runs it after the designer's request (`session-start.md`). The
first run happens the first time a chat exists and no digest does.
"Digest my chats" still forces a run. Runs under `harness-audit`; it only
writes local files, log rows and draft proposals.

The other half is automatic too: `harness:context` prints the misses seen
2+ times on every session start, so each request avoids the ones that
fit it.

## Steps

1. Run `node scripts/transcript-digest.mjs`. It reads only chats that are
   new or have new turns since the last run, and writes the digest to the
   OS temp folder (never the repo). Each chat shows its date, the skills
   it loaded, and the designer's own turns. `⚑` marks a likely pushback:
   a word match, not a verdict. `--all` re-reads everything.
2. Read the digest. For each `⚑` turn, read the turn before it and the
   skills line, and sort it with the table in `miss-log.md` § When to
   log: routing miss, skill miss, or taste. Turns without `⚑` feed only
   "How I work".
3. Update `designer-context.local/how-i-work.md` (format below). Merge,
   don't rewrite: bump `seen` and `last` on a pattern already there, add
   new ones, keep it under 80 lines.
4. Misses: append one row per real miss to `harness/logs/routing-log.md`,
   in the `miss-log.md` format, with the chat's date and `| backfill` at
   the end. Taste goes in the file's taste list, not the log. If a taste
   rule matches one already in `preferences.md`, bump its `seen` count.
5. A pattern seen 2+ times gets a proposal in
   `harness/logs/harness-proposals.md` (`miss-log.md` § Review on wrap
   up, steps 3–4). Applies nothing.
6. Run `node scripts/transcript-digest.mjs --mark-done`, then delete the
   temp digest.
7. One line to the designer: `<n> chats read. <n> misses, <n> recurring.
   Updated how-i-work.md; <n> proposals in harness-proposals.md.`

## Company content — hard rule

Transcripts hold real company material: pasted docs, ticket text, names,
links. None of it goes into `how-i-work.md`, the log, or a proposal. Write
the pattern, not the content: "pasted a company doc and asked for a
comparison", never what the doc said. In verbatim quotes, replace company,
product, customer and people names with `[company]`, `[product]`,
`[person]`, and drop URLs. If a quote is still company content after
that, write `wanted: [redacted]` and a short generic summary. Before
finishing, re-read every file you wrote for anything that survived.

## `how-i-work.md` format

```
# How I work — condensed from past chats

Last digest: YYYY-MM-DD · <n> chats · <n> turns. Rebuilt by
`harness/references/transcript-digest.md`. Edit freely.

## Where the harness goes wrong
- <pattern, one line> — seen <n>, last YYYY-MM-DD. Proposal: P<n> or none.

## How I work
- <working-style fact the agent should act on, one line>

## Taste I repeat but haven't saved
- <rule> — seen <n>. Say "save it" to move it to preferences.md.
```

## Who reads it

- `harness:context`, every session: the seen 2+ misses, as `Learned:`.
- `harness-audit` retrospective mode: "Where the harness goes wrong" is
  its evidence list.
- `miss-log.md` § Review on wrap up: a new miss that matches a pattern
  here cites it, so the proposal says "seen n times", not "seen once".
