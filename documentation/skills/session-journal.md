# session-journal

A short, private record of your judgment in each session — what you
asked, what got built, where you overrode the agent, what you decided.

## What It Does

Appends one entry (under 20 lines) to
`designer-context.local/journal/YYYY-MM-DD-<project>.md`:

- **Asked** — your request, close to your words
- **Built** — one line per thing made, with paths
- **Changed direction / overrode the agent** — your corrections, quoted
- **Decisions** — what you decided, linked to `decisions.md` when logged
- **Screenshots** — links, only if any were saved this session

The folder is gitignored. Nothing is pushed.

---

## When to Use

### Trigger Phrases
```
"wrap up"
"journal this" (same as wrap up)
"add this to my journal"
```

It also runs whenever `session-handoff` writes a handoff.

---

## How It's Read Back

- **Next session on the project** — reads `decisions.md` and the latest
  journal entry, so it knows where you pushed back last time.
- **`case-study`** — reads every entry for the project to tell the story
  of the decision with your actual turns and reasons.
- **Not critique** — `ux-pattern` and `audit` don't read it.

---

## Example

```markdown
## 16:40 — referral sheet copy

**Asked:** tighten the invite sheet and drop the second CTA
**Built:** projects/referrals/screens/InviteSheet.tsx
**Changed direction / overrode the agent:**
- "no, keep the reward amount in the title" — agent had moved it to the body
**Decisions:**
- One CTA on the invite sheet (decisions.md 2026-10-29)
**Screenshots:** none captured
```

---

## Related Skills

- [session-handoff](session-handoff.md) - Handoff for a fresh chat; writes a journal entry too
- [case-study](case-study.md) - Reads the journal
- [design-retrospective](design-retrospective.md) - Post-ship reflection
