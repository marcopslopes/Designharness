# `public/` — deploy assets

This is Vite's static-asset root — everything here ships into `dist/` on
`npm run build` and gets served by whatever static host you publish to (see
`Dockerfile` for an nginx container example). Two
very different kinds of content live here; keep them separate.

## Schema

```
public/
├── fonts/            # optional licensed brand .woff2 — per-clone, gitignored;
│                       # see fonts/README.md
├── favicon.svg, icons.svg   # app chrome
├── design-harness/avatars/  # Team Gallery designer avatars
├── how-to/           # harness overview decks (designer-briefing.html,
│                       # system-map-agents-skills.html) — opened inside
│                       # Design Harness's How-to view
├── deck-builder/     # shared deck-builder runtime (presenter.js/html),
│                       # mirrored from harness/skills/deck-builder/assets/
└── projects/<slug>/  # opt-in publish mirror — see below
```

## `public/projects/<slug>/` — the only public-facing project mirror

**Never write here by hand.** Every file under `public/projects/<slug>/` is
a copy of a file that already exists in `projects/<slug>/artifacts/decks/`,
placed there by `harness/skills/publish-project/SKILL.md` — never
automatically, never on save, never on an `audit` PASS by itself. See
`projects/README.md` for the full local-vs-public split.

- `projects/<slug>/` (no `public/` prefix) is always the source of truth —
  full local history, every export, sandbox by default.
- `public/projects/<slug>/` is a curated, opt-in subset: only the
  `artifacts/decks/` files a designer explicitly asked to publish, and
  only after a complete Ship block (exposure general) and an `audit` PASS.
- If a file here looks stale or wrong, fix the source in
  `artifacts/decks/` and re-run `publish-project` — don't patch the copy
  directly, or the two will drift the next time someone republishes.

## Rules

- **Nothing else belongs at the `public/` root.** If you're about to drop
  a one-off HTML/image file directly under `public/`, it almost certainly
  belongs under `public/projects/<slug>/` instead — see the 2026-08-06
  audit that found exactly this drift (`harness/logs/routing-log.md`).
- **Chrome/runtime folders are not project output.** `fonts/`, `how-to/`,
  `deck-builder/`, `design-harness/` don't move or get touched when publishing a
  project.

## Related

| File | Role |
|---|---|
| [`../projects/README.md`](../projects/README.md) | The local-side schema this mirrors from — `artifacts/decks/` vs `snapshots/` vs `qa/` |
| [`../harness/skills/publish-project/SKILL.md`](../harness/skills/publish-project/SKILL.md) | The only supported way to add/update/remove anything under `projects/<slug>/` here |
| [`../harness/skills/deck-builder/SKILL.md`](../harness/skills/deck-builder/SKILL.md) | Builds the decks that `publish-project` later mirrors — saves to `artifacts/decks/` only, does not publish itself |
| [`fonts/README.md`](fonts/README.md) | Licensed webfont drop-in instructions |
