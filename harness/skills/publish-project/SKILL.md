---
name: publish-project
description: >-
  Do not route here. Share links are out of the live table (2026-11-05)
  until a new sharing path exists. Kept on disk only. "Give me a link",
  "publish this", and "share URL" get one line from the share-this row:
  the harness doesn't publish a share link yet.
---

# Publish project

Turns a local `projects/<slug>/artifacts/` export into a public URL under
`public/projects/<slug>/` — the only folder the built site actually serves
project share pages from. Everything under `projects/<slug>/` stays
local/sandbox by default (see `projects/README.md`); this skill is the one
explicit, opt-in bridge from that sandbox to a deployable public copy.

**Invoke in Cursor:** "publish this to a share URL", "deploy the onboarding
case study", "make the entry-points board public"

**Never fires automatically.** Not after `ui-agent` finishes a build, not
after `deck-builder` saves a deck, not on an `audit` PASS. All three of
those stay local-only until the designer explicitly asks for this.

---

## Preconditions

1. **Resolve `<slug>`** from the conversation or the active project folder
   (`projects/<slug>/` or `projects.local/<slug>/`). If ambiguous, ask which
   project.

## Steps

1. **Pick the file(s).** List what's in `projects/<slug>/artifacts/decks/`
   (and `artifacts/snapshots/` if the designer named a specific snapshot
   explicitly, e.g. "publish the entry-points board"). If there's exactly
   one obvious candidate, confirm it in one line rather than asking. If
   there are 2+ with no clear single pick, ask via `AskQuestion`
   (plain-text degrade per `harness/references/ask-question-ui.md` if the
   tool is absent) — options named by content ("Case study v10", "Workshop
   slides v3", "Stakeholder update"), never "Option A/B".
2. **Ship packet, then audit, in one pass.** Run
   `harness/references/ship-packet.md` at exposure `general`, and check
   `findings.md` / `decisions.md` for a dated `audit` PASS on the picked
   files. If the packet refuses, the audit is missing, or the PASS is
   stale because the artifact changed, say it in **one** message and stop.
   Do not copy. A missing audit is: "No audit PASS on \<file\>. Run audit
   on it. Publishing waits for PASS." Do not publish BLOCKED work, ever.
3. **Copy into `public/projects/<slug>/`** — same filename, same relative
   folder shape as the source (e.g. a `decks/navigation-ia/` sub-hub stays
   `public/projects/<slug>/navigation-ia/`). Create the destination folder
   if it doesn't exist yet.
4. **Fix internal links.** Any absolute path inside the copied HTML that
   pointed at another file in the same publish set (e.g.
   `href="/navigation_ia_prototypes.html"`) must be rewritten to the new
   `/projects/<slug>/...` location. Relative same-folder references (e.g.
   a deck's own sibling `.jpg`s) need no change — they moved together.
5. **Log.** The ship packet writes the `cleared` row only after the copy
   succeeds. Put the public path in that row's Why
   (`general, review <date>, public/projects/<slug>/...`). If this is the
   project's first publish, a line in `decisions.md` notes the public URL
   now exists.
6. **State the result plainly** — the local path copied, the resulting
   `public/projects/<slug>/...` path, and the reminder below. Don't imply
   the site is live on the internet from this step alone.

## What this does *not* do

- **Does not deploy.** Copying into `public/` makes the file part of the
  next `npm run build` / container image — it does not push, build, or
  restart anything. If the designer wants it actually live, that's a
  separate hosting step (any static host, or the `Dockerfile` nginx
  image), not owned by this skill.
- **Does not touch `artifacts/snapshots/` or `artifacts/qa/` by default.**
  Those stay local working copies — QA screenshots and raw prototype-state
  exports are not deliverables, even if they happen to be `.html`.
- **Does not re-run `audit`.** If the artifact changed since the last PASS,
  say so and offer to re-run `audit` before publishing the new version —
  don't silently publish over a stale PASS.

## Removing a public page

If asked to un-publish / take something down: delete the file(s) under
`public/projects/<slug>/`, log the removal the same way as a publish
(dated line in `log.md`), and note that a prior deploy may still be live
until the next build ships — this only affects the next build.
