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

- **Yes** → add one index line and append the rule to its section
  (below). Reply with one line:
  `Saved under Prototype: no borders on cards.`
- **Just this time** → apply it in this chat only. Don't ask again for
  the same rule in this chat. Nothing is written: no candidate list, no
  count. "Just this time" means don't keep it.
- **Never save silently.** No answer means no save.
  That includes the tool's own memory: Claude Code's auto memory is off
  in this repo (`.claude/settings.json`), so rules only land here.

## Already saved — bump, don't ask

If the pushback matches a rule already in the index, don't ask again.
Apply it, add 1 to its `seen` count, set `last` to today, and say so in
one line:

> Already a preference — bumped: no borders on cards (seen 3).

This edits a rule the designer already said Yes to, and the reply says
so, so it isn't a silent save. Match on meaning, not exact words. If
you're unsure it's the same rule, treat it as new and ask.

A rule with a high count is one the agent keeps breaking. That is worth
knowing, but the count never changes precedence (below).

## File format

Two parts. A short **index** at the top, one line per rule. It's the only
part every reader loads. The **detail** below it, grouped by work type,
holds the rule in the designer's words, the date saved, and any example.

```markdown
## Index
- [Prototype] No borders on cards. — seen 2, last 2026-11-03
- [Copy] One sentence max when asked to tighten. — seen 1, last 2026-10-30

## Prototype
- No borders on cards. Saved 2026-10-29. Applies to list rows too.

## Copy
- Never more than one sentence when I ask to tighten text. Saved 2026-10-30.
```

- Index line: `- [Section] short rule. — seen N, last YYYY-MM-DD`. Keep it
  under about 80 characters. A new rule starts at `seen 1`.
- Detail line: the full rule, `Saved YYYY-MM-DD`, and an optional short
  example. Skip the extra when the index line says it all.
- Keep the index sorted by section, in the order of the table below.

A file saved before the index existed has detail lines only. On the next
save, build the index from them, `seen 1` each, `last` = the saved date,
and say so in one line.

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

Each reader skill reads `<repo root>/designer-context.local/preferences.md` with the `Read` tool — never Glob or file search, which skip gitignored files, as its **first step**, before any other load.

1. Read the top of the file only (`limit: 40` covers the index).
2. Use only index lines tagged with its own section.
3. Open its detail section only when one of those lines applies to this
   output and the index line isn't enough.

It doesn't use the other sections and doesn't load the file for any
other skill.

- **Missing file or no index lines for its section** → carry on; don't
  mention it. A file with no `## Index` yet → read its own section, as
  before.
- **`## Slack/docs` readers** stop at the index when it has no
  `[Slack/docs]` line — a one-line reply shouldn't pay for more.
- **Precedence:** the designer's ask in this turn > house hard rules
  (`harness/references/design-system-rules.md` §7, `COMPANY-*.md`, the content style
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

"Forget that preference" / "remove the borders rule" → delete its index
line and its detail line, and confirm in one line. The designer can also
edit the file by hand.

## Tidy-up past ~30 rules

When a save pushes the index past about 30 lines, offer once, after the
save line, to tidy it. Use `AskQuestion` with two options: **Show me a
tidy-up** / **Not now**.

- **Show me a tidy-up** → propose merges (two rules that say the same
  thing) and drops (`seen 1`, with `last` older than 90 days). List each
  change in one line. Edit only what the designer approves. Merged rules
  add their counts and keep the newer `last`.
- **Not now** → don't offer again in this chat.

Never prune on your own. A count is a hint, not a reason to delete.
