---
label: Give the harness company context
hint: Three ways to add docs the harness should know — Settings, chat, or a file.
---

# Company context — teach the harness about your company

Skills answer better when they know your product, your words, and your
rules. That knowledge lives in the **company pack**: a folder of Markdown
files skills read before they critique, write, or build.

There are three ways to add to it. They all end in the same place —
`context/org-pack.local/`, on your machine only — so pick whichever is
quickest for you.

## Pick a way

| Way | Best when | Where |
|-----|-----------|-------|
| **Settings** | You have a doc ready and want it in, now | Design Harness → Settings → Company context → **Add a file** |
| **Chat** | You're not sure where it belongs, or it's a link or a long doc | Ask the harness: "add this to the company pack" |
| **By hand** | You already work in the repo | Drop a file in `context/org-pack.local/` |

## 1. Add it in Settings

1. Open **Settings** (bottom of the left rail, only while the harness runs
   locally).
2. Scroll to **Company context** and choose **Add a file**.
3. Fill in:
   - **Name** — a short topic, like `Pricing`. Saved as
     `COMPANY-PRICING.md`.
   - **About** — one line on what's in it.
   - **Use when** — the skills or topics that should read it, separated by
     commas: `content, checkout, pricing`.
4. Choose a `.md` or `.txt` file, or paste the text.
5. Choose **Add to pack**.

The file shows up under **Extra files** with its "Used when" words. Settings
never overwrites a file that's already there.

## 2. Tell the harness in chat

Attach or paste the doc and say what it is:

> Add this to the company pack — it's our pricing rules.

> The harness should know this glossary.

The harness reads it and asks you one question before writing anything:

- **Merge** into a file you already have — new terms go into the vocabulary
  file, tone rules into the voice file.
- **Save as a new file** with its own about and use-when lines, which it
  suggests for you.

Use this when the doc is messy, mixes topics, or you'd rather not decide
where it goes.

## 3. Drop a file in by hand

Create `context/org-pack.local/COMPANY-<TOPIC>.md` — uppercase topic,
hyphens only — and start it with this header:

```markdown
---
about: Plan names, prices, and discount rules
use-when: content, checkout, pricing
---
```

Then the content, in plain Markdown. Without the header, skills see the file
but won't read it; Settings shows a warning next to it.

## How skills find your file

Every skill reads the standard pack files it needs. Then it checks the
header of each extra file and reads the full file when one of the
**use when** words matches the skill or the task. So `use-when: pricing`
gets picked up by a content review of a pricing screen, by a critique of the
checkout, and by a prototype build that shows plans — without anyone
editing those skills.

Good **use when** words:

- **Skill names** — `content`, `ux-pattern`, `ui-agent`, `design-kickoff`.
- **Topics people say out loud** — `pricing`, `checkout`, `onboarding`,
  `translations`.

Too broad (`design`, `all`) and it loads on every task; too narrow and it
never loads.

## Check it worked

- **Settings → Company context → Extra files** lists the file with its
  about line and "Used when" words.
- A red **No header** note means skills won't read it yet. Add the two
  lines, or ask the harness to.

## Rules that keep the pack safe

- Real company content only ever goes in `context/org-pack.local/`. It's
  gitignored and never pushed.
- `context/org-pack/` is the public example pack. Never put real facts
  there.
- The eight standard files (business, voice, archetypes, patterns, squads,
  sources, vocabulary, style guide) aren't added — edit them directly, or
  ask the harness to merge into them.
- No local pack yet? Ask the harness to **build your org-pack** first.

## Related

- [Extra pack files contract](../../harness/references/org-pack-extra-files.md)
- [Org-pack builder skill](../../harness/skills/org-pack-builder/SKILL.md)
- [Designer onboarding](onboarding.md)
