# `context/org-pack/` — bring your own company

This folder is the **generic, public example** of a company content pack.
Everything in it is fictional ("Northline," a hardware-store stock system) — it exists
so a new clone of this harness has a real, filled-in worked example
instead of empty templates.

## How resolution works

Skills and `harness/ORCHESTRATOR.md` never hardcode a company name. They
load `COMPANY-*.md` through one convention:

1. If `context/org-pack.local/` exists on this machine (gitignored, never
   pushed), use it.
2. Otherwise, fall back to this folder — the public Northline example.

See `harness/ORCHESTRATOR.md` §0a and `.cursor/rules/org-pack-gate.mdc`.

## Files in this pack

| File | What it holds |
|------|----------------|
| `COMPANY-BUSINESS.md` | Product model, strategic pillars, key product areas, design system pointers |
| `COMPANY-VOICE.md` | Voice, tone, writing rules, vocabulary |
| `COMPANY-PATTERNS.md` | Interaction conventions (modals, feedback, navigation) |
| `COMPANY-ARCHETYPES.md` | User/customer segmentation model |
| `COMPANY-SQUADS.md` | Team/org map for onboarding + research routing |
| `COMPANY-SOURCES.md` | Global external link catalog (Docs, Confluence, Notion, FigJam, etc.) |

The `content` skill also reads three optional local files —
`COMPANY-STYLE-GUIDE.md`, `COMPANY-VOCABULARY.md`, `COMPANY-LOCALIZATION.md`
— and falls back to the Northline samples in
`harness/skills/content/references/` when they're missing.

## Adding your own files

Anything beyond the standard files (pricing rules, locale tables, legal
copy) goes in `context/org-pack.local/` as `COMPANY-<TOPIC>.md`, starting
with a two-line header so skills know when to read it:

```markdown
---
about: Approved feature names per market, by locale
use-when: copy, translations, content, localisation
---
```

Add one from Design Harness Settings, by asking the harness ("add this to the
company pack"), or by hand. Full contract:
`harness/references/org-pack-extra-files.md`.

Same document genre throughout: a short **Prevents** line (what drift this
file stops), a **Confidence** line (how locked the content is), and a
**Never do this** list at the end. Keep that shape when you replace the
content with your own company's facts — it's what makes the file useful
to an agent, not just a wiki page.

## Plug in your own company

Two ways to replace this example with your real company:

1. **Run the setup interview** — first chat on a fresh clone (no
   `context/org-pack.local/` yet) offers a short `AskQuestion` walkthrough
   that scaffolds `context/org-pack.local/COMPANY-*.md` from your answers.
   See `harness/designer-onboarding/SKILL.md` § Org-pack setup.
2. **Copy and edit by hand** — copy this folder to
   `context/org-pack.local/` and rewrite each file with your own product,
   voice, patterns, team map, and links. Nothing else in the repo needs
   to change — the resolver picks it up automatically.

Either way, `context/org-pack.local/` is covered by this repo's `*.local`
gitignore rule, so your real company content never gets pushed to a
public fork.
