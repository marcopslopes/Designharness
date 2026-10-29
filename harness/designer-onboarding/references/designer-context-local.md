# Personal context folder (`designer-context.local/`)

Optional, **gitignored** directory at the repo root for extra markdown
context about you — preferences, squad notes, how you like feedback, links
you always want considered, etc. Same privacy model as
`designer-profile.local.md`: lives only on your machine, never pushed.

## Setup (once per clone)

1. Create `designer-context.local/` at the repo root (next to
   `designer-profile.local.md`).
2. Copy the starter files from this doc's § Starter layout, or add any
   `*.md` files you want.
3. Run `git status` — the folder should **not** appear as untracked (it's
   in `.gitignore`). If it does, don't force-add it.

## How agents use it

After reading `designer-profile.local.md`, agents should:

1. If `designer-context.local/` exists, read `README.md` inside it first
   (the index — including any nested folders listed there).
2. Read matching `.md` files **anywhere under** `designer-context.local/`,
   including nested folders the designer created by hand (e.g.
   `referrals/`, `1on1s/`, `research/`), when the task benefits from
   that standing context — or when they say "check my local context" /
   name a path or folder.
3. Prefer the root `README.md` (and any nested `README.md`) as the map;
   don't dump every file into context on a one-liner ask.
4. **Never** copy personal notes into committed repo files (`brief.md`,
   `decisions.md`, harness docs) without you asking.
5. **`design-record.md` is special:** read or update **only** when the
   designer asks for the design-memory report or explicitly opts in at
   project close (`harness/skills/design-memory/SKILL.md`). **Never** load
   it for `audit`, design-critique, `ui-agent`, or `design-kickoff`.
6. **`preferences.md` is read by section:** `ui-agent`, `content`,
   `ux-pattern`, `writing`, and `docs-brief` each read only their own
   section; nothing is written there without the designer's Yes
   (`harness/references/designer-preferences.md`).

Trivial one-liners don't require reading the whole tree every time.

## Nested folders (supported)

Designers may create any subfolders they want. The whole tree is
gitignored. Agents treat nested folders the same as the root: follow the
indexes, then open relevant `.md` files under those paths.

## Starter layout

```text
designer-context.local/
  README.md           # index — list files/folders and when to read them
  preferences.md      # taste log — rules by work type (agent-maintained)
  working-notes.md    # anything cross-project you want remembered
  sources.md          # optional — cross-cutting private link catalog
  referrals/          # optional nested topic folder (example)
    README.md
    sources.md        # private articles for this topic
    notes.md
  projects/           # optional — private notes about a shared project slug
    invite-friends/
      sources.md
      notes.md
```

Private link tables use the same row shape as
`projects/<slug>/sources.md`. Human guide:
[`documentation/guides/designer-context-local.md`](../../../documentation/guides/designer-context-local.md).
Three-scope map:
[`documentation/guides/company-sources.md`](../../../documentation/guides/company-sources.md).

### Example `README.md`

```markdown
# Personal context (local only)

Markdown in this folder (and nested folders) is gitignored.
Agents read it for standing context.

| Path | When to read |
|------|----------------|
| preferences.md | Only the matching work-type section, by its reader skill |
| sources.md | Cross-cutting private bookmarks |
| working-notes.md | Referrals, payments, or agent/harness work |
| referrals/ | Referral / growth topics |
| projects/<slug>/ | Private notes for that shared project |
```

### Example topic `sources.md`

```markdown
# Private sources — referrals

| Title | Kind | Why it matters | Link | Indexed |
|-------|------|----------------|------|---------|
```

**When the designer says a link is private / for me / local only:** append
under `designer-context.local/` (create `sources.md` if needed). **Do not**
write it into committed `projects/<slug>/sources.md` or
`COMPANY-SOURCES.md` without an explicit promote ask.