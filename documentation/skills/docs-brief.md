# docs-brief

Writes a short status or decision page in your team's docs tool —
Confluence, Notion, or Google Docs. Formerly `confluence-brief`.

## What It Does

**Drafts a lean, one-screen page** from what you already know:
- The problem, in 2–4 lines
- What exists today and what's been done
- Decisions and why
- Ideas, parked items, and links

It **publishes what's already decided** — it doesn't research anything.
For a fresh research sweep, use [research-agent](research-agent.md).

---

## When to Use

Use `docs-brief` when you want to:
- File a status brief under a team folder
- Write up a decision and the reasons behind it
- Share "what we have / what we did / what's next" with a team

### Trigger Phrases
```
"Add a page under Referrals about what we've done"
"Put this why brief in Notion"
"Create a wiki page for entry points"
"Write this up as a Google Doc"
"Confluence brief"
```

---

## How It Works

1. **Picks the tool.** Uses the docs tool in your profile, or the one in the
   URL you pasted. No docs tool connected → writes Markdown you can paste.
2. **Drafts in chat.** Shows the title, destination, status, and body.
3. **Waits for your go.** Nothing is created until you say so.
4. **Creates the page** under the folder or parent page you named, and
   returns the link.
5. **Logs it** in the project's `findings.md` and `sources.md`.

### Page shape
```markdown
**Status:** Draft for engineering · **Owner:** [Name] · **Updated:** YYYY-MM-DD

## The problem
## What we have today
## What we've done so far
## Decisions & why
## Ideas / next
## Park for later
## Links
```

Empty sections are dropped. Findings, chat transcripts, and research
catalogs never go into the page — link out instead.

---

## Not the same as research-agent

| | research-agent | docs-brief |
|---|---|---|
| Job | Researches a topic from zero | Publishes something already decided |
| Output | 17-section discovery draft | One-screen brief |
| Lands in | Your personal space, as a draft | The team folder you name |

---

## Chains With

- `design-kickoff` (offers a docs copy of the PRD)
- `design-handoff` (offers a brief after the spec)
- `ticket-create` (same draft → go → create posture, for tickets)

---

## Related Skills

- [ticket-create](ticket-create.md) - Tickets
- [research-agent](research-agent.md) - Discovery drafts
- [deck-builder](deck-builder.md) - Presentation format
- [publish-project](publish-project.md) - Full handoff
