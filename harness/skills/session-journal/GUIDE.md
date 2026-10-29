# Session journal — how it works

Say **"journal this"** or **"wrap up"** and the agent writes a short
entry about your judgment in this session: what you asked, what got
built, where you changed direction or overrode it (quoted in your words),
what you decided, and links to any screenshots it saved.

Agents load the full protocol from
[`harness/skills/session-journal/SKILL.md`](SKILL.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/session-journal/SKILL.md` |
| Where entries go | `designer-context.local/journal/YYYY-MM-DD-<project>.md` (gitignored) |
| Length | Under 20 lines per entry |
| Read back by | The next session on that project (with `decisions.md`), `case-study` |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |

---

## What it's for

- **Picking up tomorrow.** The next chat on the project reads the latest
  entry and `decisions.md`, so it knows where you pushed back.
- **Case studies.** `case-study` reads every entry for the project, so
  the story has your actual turns and reasons, not a reconstruction.

## What it isn't

- Not a transcript. The agent's output gets one line.
- Not your rules. Reusable rules ("no borders on cards") go to
  `preferences.md` when you say Yes to saving them.
- Not shared. The folder is gitignored and never pushed.

Replaced `design-memory` on 29 October 2026. An old
`designer-context.local/design-record.md` is left alone; nothing reads
or writes it any more.
