---
name: session-journal
description: >-
  Appends a short journal entry about the designer's judgment in this
  session — what they asked, what got built, where they changed direction
  or overrode the agent (in their words), decisions taken, and screenshot
  links — to `designer-context.local/journal/YYYY-MM-DD-<project>.md`.
  Triggers on: "wrap up", "journal this", "add this to my journal", "log
  this session to my journal", and runs inside `session-handoff`. "Wrap
  up" also appends a handoff note (done, next, open questions from the
  truth block) to the project's `log.md`. Read
  back on resume with `decisions.md`, and by `case-study`. Not a
  transcript, not a handoff (`session-handoff` writes `handoff.md`), not a
  retrospective (`design-retrospective`), not taste rules
  (`harness/references/designer-preferences.md`).
---

# Session journal

A record of **the designer's judgment**, not the AI's output: what they
asked for, where they steered, what they decided. One short entry per
session, in a private file per day per project.

**Invoke in Cursor:** "journal this", "wrap up"

---

## Scope boundary

| This skill | Not this skill |
|---|---|
| The designer's asks, overrides, and decisions, in their words | A transcript or a summary of everything the agent said |
| `designer-context.local/journal/` (gitignored) | `projects/<slug>/handoff.md` — `session-handoff` |
| Read back on resume and by `case-study` | Post-ship lessons — `design-retrospective` |
| One-session record | Reusable rules — the taste log (`preferences.md`) |

---

## When it runs

| Trigger | What gets written |
|---|---|
| "journal this" | The journal entry |
| "wrap up" | The journal entry, then the handoff note (§ Wrap up) |
| `session-handoff` runs | The journal entry, alongside `handoff.md` |

Never on its own. No trigger, no entry.

---

## Where

`designer-context.local/journal/YYYY-MM-DD-<project>.md`

- `<project>` is the active `projects/<slug>/`. No task → `no-project`.
  Ambiguous → ask once (`AskQuestion`) which slug.
- Date from the system clock (`date +%F`), never guessed.
- Create the folder and file on first use. First line of a new file:
  `# Journal — <project> — YYYY-MM-DD`.
- Every trigger appends a **new** entry for this chat. An entry already in
  the file is from another session, even if it's about the same work.
- Check `git check-ignore designer-context.local/journal` passes before
  writing. If it doesn't, stop and say so.

---

## Entry format (under 20 lines)

```markdown
## HH:MM — <one-line summary: what this session moved, as a sentence>

**Asked:** <what the designer asked for, close to their words>
**Built:** <what got made — paths or URLs, one line each, max 3>
**Changed direction / overrode the agent:**
- "<designer's words, verbatim>" — <what the agent had done, in a few words>
**Decisions:**
- <decision> (decisions.md YYYY-MM-DD, if logged there)
**Screenshots:** <paths or links> | none captured
```

Rules:

1. **Their words.** Overrides are quoted verbatim from the chat. Don't
   paraphrase a correction into something softer or smarter.
2. **Judgment, not output.** One line for what got built. No code, no
   findings lists, no agent reasoning.
3. **No transcript dumps.** Over 20 lines → cut, don't wrap.
4. **Nothing invented.** No overrides → `None`. No decisions → `None`.
   Screenshots only if they were saved to disk or a URL this session
   (e.g. `capture-page` output, a saved browser screenshot); otherwise
   `none captured`.
5. **No secrets or third-party gossip.** Names only when the designer
   named them as the source of a decision.
6. **Lasting project rules go to `decisions.md` too.** An override that
   holds for the rest of this project, not just this one proposal ("don't
   use 'check in'", "no modals in this flow"), is also appended to
   `projects/<slug>/decisions.md` as a dated line with the designer's
   words, and the entry's **Decisions:** line points to it. A one-off pick
   stays in the journal only. A rule for every project is the taste log's
   job (`Save as a preference?`), not this one. No project → journal only.

Show the entry in chat after writing it, with the path.

---

## Wrap up

"Wrap up" ends a session so the next chat can start clean. Write the
journal entry, then append one handoff row to `projects/<slug>/log.md`:

```markdown
| YYYY-MM-DD | wrap up | session-journal | **Handoff.** Done: <what's finished>. Next: <what's not done yet, as state>. Open: <blocking unknowns verbatim>; +N more in the brief | journal/YYYY-MM-DD-<slug>.md |
```

- **Done / Next** come from this session's real work and the task folder.
  **Next describes state, never a command.** Write what is true now and
  what's still missing, with no verb aimed at anyone: "hold line agreed;
  `wallet-home-shared.tsx` still shows the old line", never "apply the
  hold line" or "update line 123". Reread Next before writing; if it
  starts with a verb, rewrite it.
- **Open** comes from `unknowns` in the truth block (read the whole fenced
  YAML block in `brief.md`, not a search hit). List the **blocking** ones
  first, the entries with a `blocks:` field, each `text` verbatim with
  `(blocks <what>)`, separated by `; `. Then `+N more in the brief` for
  the rest: N = every top-level `- ` item under `unknowns:` (plain strings
  count, not just `text:` entries) minus the blocking ones you listed. No blocking ones → `none blocking; N in the brief`. No
  unknowns → `none recorded`. Don't add questions that aren't in it; if
  the session raised a new one, say so in chat and offer to add it to
  `brief.md`.
- No task folder → journal entry only; say there was no `log.md` to write.
- **Save** (Git autopilot, default on): run
  `node scripts/git-autopilot.mjs save <slug> "<the entry's heading, without the time>"`
  and say its line (`harness/references/git-autopilot.md` § 3). It commits
  only the project's folder; the journal stays local. Never push here. If it
  lists harness files, ask keep local / suggest to the harness (§ 3a).
- Then end with one line: "Wrapped up. Start a new chat and say 'continue
  <slug>'."

Wrap up doesn't write `handoff.md`. "Handoff this session" still does
(`session-handoff`).

---

## Read-back

The journal steers later work. It is how the next session knows what the
designer decided and where they pushed back.

- **On resume** ("continue <slug>", the first task-scoped reply in a
  session): read `projects/<slug>/decisions.md` and the **latest**
  journal entry for that slug. Older entries only when the designer asks
  ("what did I say about X last week?").
- **Precedence:** the designer's ask now > `decisions.md` > the journal.
  The journal is context, not a gate. If it disagrees with
  `decisions.md`, follow `decisions.md` and mention the gap in one line.
- **`case-study`** reads every journal entry for the project (§ chapter
  sources in `harness/skills/case-study/references/chapters.md`).
- **`design-retrospective`** may read them as evidence of how the
  project went.
- Critique (`ux-pattern`, `audit`) does not read the journal. A past
  override of the designer's own is not a standard to judge new work by.

---

## Never do this

- Write an entry without a trigger
- Paste chat turns, code, or findings into the entry
- Paraphrase the designer's override instead of quoting it
- Invent a screenshot path, a decision, or an override
- Commit the journal or copy it into a tracked file without being asked

---

## Related files

| File | Role |
|------|------|
| `harness/skills/session-journal/GUIDE.md` | Designer guide |
| `harness/skills/session-handoff/SKILL.md` | `handoff.md` — also writes a journal entry |
| `harness/skills/case-study/SKILL.md` | Reads the journal for the project's arc |
| `harness/references/designer-preferences.md` | Reusable rules — a different file |
