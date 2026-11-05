# Miss log — record when the output didn't work

The routing log used to record only which route was picked, never whether
the answer worked. A miss row is the missing signal: the designer pushed
back or redirected, so the harness got something wrong. Wrap up reviews
the day's misses and drafts fixes. Nothing is applied without a yes.

## When to log

The designer pushes back on output you already gave in this chat, or
redirects it ("no, I mean…", "that's not what I asked"). Same trigger as
the taste log, plus redirects. Log it in the reply that applies the
correction, before the answer. Never on a first ask.

| Kind | What went wrong | Row |
|---|---|---|
| Routing | Wrong skill, wrong scope, or a fast lane that should have routed | `MISROUTE` |
| Skill | Right skill, but the output broke its own rules or missed the ask | `MISS` |
| Taste | The designer's personal style, not a harness bug | No row. The taste log handles it |

Unsure between skill and taste → log `MISS`. A row too many costs a line in
the review. A row too few is a lesson lost.

## Format

One line, appended to `harness/logs/routing-log.md`:

```
YYYY-MM-DD | <the ask, short> | MISS or MISROUTE | ran=<skill or fast lane> | did: <what the agent did, a few words> | wanted: "<designer's words, verbatim>" | Task: <slug or —>
```

- `wanted:` is quoted from the chat, never paraphrased.
- Date from the system clock (`date +%F`).
- No row for the correction itself working out. One row per miss.

Rows from past chats, added by `transcript-digest.md`, use the chat's date
and end with `| backfill`. Their quotes go through that file's company
content rule first.

## Review on wrap up

`session-journal` § Wrap up runs this after the journal entry.

1. Read `harness/logs/routing-log.md`. Take today's `MISS`, `MISROUTE`, and
   `FALLBACK` rows. Skip rows already listed in
   `harness/logs/harness-proposals.md` (match on the row text), and rows
   ending `| backfill`: the digest already proposed their patterns.
2. None → say nothing about it.
3. For each row, read the file that caused it (the §2 row, `routes.md`
   section, or `SKILL.md` that ran). If the row matches a pattern in
   `designer-context.local/how-i-work.md` § Where the harness goes wrong,
   say "seen <n>" in the proposal. Then draft:
   - **Fix:** one file, one change, in a line. A fix you can't name in a
     line is a finding, not a fix: write `Fix: none yet — <why>`.
   - **Eval:** for `MISROUTE` and `FALLBACK`, the case to add to
     `harness/harness-audit/references/eval-prompts.md` (prompt text from
     the row, expected match). For `MISS`, the check that would have caught
     it, or `none`.
4. Append to `harness/logs/harness-proposals.md` (gitignored; create it with
   a `# Harness proposals` heading on first use):

   ```markdown
   ## YYYY-MM-DD — <n> proposals
   ### P<n> — <row text, verbatim>
   - Fix: <file> — <change>
   - Eval: <case> | none
   - Status: open
   ```

5. Tell the designer in one line: `<n> misses today. Proposed fixes are in harness/logs/harness-proposals.md. Say "apply P<n>" to apply one.`

Never apply a proposal during wrap up. "Apply P<n>" runs `harness-audit`
in fix mode: make the change, seed the eval, run the prospective check,
then set `Status: applied YYYY-MM-DD`. "Drop P<n>" sets `Status: dropped`.

## Never

- Log a miss on a first ask, or because a style guide made you change something
- Paraphrase the designer's words in `wanted:`
- Apply a proposal without "apply P<n>" or an equal explicit yes
- Commit or share the miss log or the proposals file
