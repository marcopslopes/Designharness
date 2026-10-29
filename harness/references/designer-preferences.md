# Designer preferences (taste log)

Rules the designer taught the agent by correcting its output. They live
in `designer-context.local/preferences.md` (gitignored, one clone, one
designer). Start the file from
[`preferences-template.md`](preferences-template.md) the first time a
rule is saved.

## When to offer a save

Offer when the designer corrects the agent's output **and** the
correction is a reusable rule, not a one-off fix:

| Reusable — offer | One-off — don't offer |
|---|---|
| "no borders on cards" | "make this card 8px shorter" |
| "never more than one sentence when I ask to tighten text" | "change 'Book' to 'Reserve' here" |
| "don't open critiques with praise" | "drop the third finding" |

Apply the correction first, then ask once, in one line:

> Save as a preference? [Yes / Just this time]

Use `AskQuestion` with exactly those two options when it's available
(`harness/references/ask-question-ui.md`). Without it, ask the same line
in plain text and wait.

- **Yes** → append the rule to its section (below). Reply with one line:
  `Saved under Prototype: no borders on cards.`
- **Just this time** → apply it in this chat only. Don't ask again for
  the same rule in this chat.
- **Never save silently.** No answer means no save.
  That includes the tool's own memory: Claude Code's auto memory is off
  in this repo (`.claude/settings.json`), so rules only land here.
- Don't offer for a rule already in the file.

## File format

One rule per line, in the designer's words, dated. Grouped by work type.

```markdown
## Prototype
- No borders on cards. (2026-10-29)
```

| Section | Work it covers | Read by |
|---|---|---|
| `## Prototype` | Design Harness screens, `projects/<slug>/screens/` | `ui-agent` |
| `## Copy` | UI copy, labels, errors, empty states | `content` |
| `## Figma` | Figma and FigJam critiques and reviews | `ux-pattern` |
| `## Writing` | Articles, posts, case-study prose | `writing` |
| `## Slack/docs` | Slack messages, replies, email, Confluence / Notion / Google Docs pages | `docs-brief` (pages); answer-first drafts of a Slack message, reply, or email (`harness/ORCHESTRATOR.md` Fast lanes + §5 taste log) — both only when the section has rules |

Pick the section from the skill whose output was corrected. If that
doesn't settle it, add a third option to the save question naming the
two candidate sections.

## Reading

Each reader skill reads **only its own section**, as its **first step**,
before any other load. It doesn't read the other sections and doesn't
load the file for any other skill.

- **Missing file or empty section** → carry on; don't mention it.
  `## Slack/docs` readers check first and skip the read when it's empty —
  a one-line reply shouldn't pay for a file load.
- **Precedence:** the designer's ask in this turn > house hard rules
  (`harness/ORCHESTRATOR.md` §7, `COMPANY-*.md`, the content style
  guide) > preferences. When a preference loses, say so in one line.
- **In critique (`ux-pattern`):** a preference shapes what the agent
  writes and recommends (don't recommend borders on cards). It is never
  a finding against the work under review.

## Disclosure

**Required** whenever a saved rule applies to the output — it changed
something, or ruled something out that would otherwise be there. Say it
once per reply, in one line, before or with the output:

> Following your preference: no borders on cards.

Skip it only when no saved rule in that section applies to this output.
The rule covers the whole reply, including notes around the deliverable.

## Editing

"Forget that preference" / "remove the borders rule" → delete the line
and confirm in one line. The designer can also edit the file by hand.
