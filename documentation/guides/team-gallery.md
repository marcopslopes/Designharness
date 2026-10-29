# Team Gallery — how designer cards appear

Design Harness’s Team Gallery (`#/gallery`) is a **local development** view of
design work grouped by person. It only ever shows data that is **committed
in the repo** — never anything from a designer’s local-only profile.

This is the human guide. Projects come straight from each committed
`brief.md` — nothing is copied by hand. Designer profiles are enriched into
`src/design-harness/galleryData.ts` via
`harness/references/gallery-card-enrichment.md` (proactive at first
eligibility), with `harness/skills/audit/SKILL.md` Step 3.5 as the safety net.

---

## Quick reference

| What | Path |
|------|------|
| Live UI | `#/gallery` (and `#/gallery/<designer-slug>`) |
| Projects (read at build time) | `projects/<slug>/brief.md` — Ownership + Case study summary only |
| Designer profiles | `src/design-harness/galleryData.ts` |
| Designer routes (must stay in sync) | `GALLERY_DESIGNER_ROUTES` in `src/design-harness/routes.ts` |
| Card profile enrichment | `harness/references/gallery-card-enrichment.md` |
| When enrichment runs (primary) | `task-intake` / `design-kickoff` at first eligibility |
| Safety-net check | `audit` Step 3.5 (on PASS) |
| Avatars | `public/design-harness/avatars/<slug>.png` |
| Local profile (never used here) | `designer-profile.local.md` — gitignored, never pushed |

---

## The trigger (one sentence)

A designer’s card appears in `#/gallery` as soon as they have **at least one
committed `brief.md`** with:

- a resolved **`Designer:`** name matching their `galleryData.ts` entry, and
- **`Gallery: visible`**, and
- all three **Case study summary** lines filled, and
- a **fully enriched** card profile (`title`, `focusAreas`, `avatarUrl`)

**One project is enough.** There is no “wait until a second project” rule,
and no empty “no projects yet” placeholder card. Incomplete enrichment →
**unlisted**, never a blank or guessed card.

---

## What shows up on a card

**From brief.md (project):**

- Ownership — `Designer:`, optional `Squad:`, `Gallery:`
- Case study — `Problem:` and `Goal:`. Status is the truth block's `status`, not a third line.
- Tap the card to open a detail modal (case study + a link to the project
  page when it has screens). Still brief-only; never `findings.md` /
  `decisions.md` / `log.md`.

**From Atlassian / Confluence (designer profile, via enrichment):**

- Job **title**
- **Focus areas** (2–4 public labels)
- **Avatar** (committed under `public/design-harness/avatars/`)

Raw working notes in `decisions.md`, `findings.md`, and `log.md` **never**
appear. Stand-ups and 1:1 notes are not enrichment sources.

---

## Privacy boundary

`designer-profile.local.md` is **local-only** — never used for gallery cards.

**Also never:**

- Pre-list names from `COMPANY-SQUADS.md` just to fill the gallery
- Invent empty placeholder designers “for layout”
- Guess a `Designer:`, title, focus area, or avatar

---

## How a project gets onto the gallery

```text
1. Work lives in projects/<slug>/ with brief.md filled in
2. Ownership: Designer: <real name>   Gallery: visible
3. Case study summary: Problem / Goal / Status (short, clean)
4. First eligibility → gallery-card-enrichment.md
   - OK → write GalleryDesigner (title/focus/avatar) + route
   - FAIL → [GALLERY-ENRICHMENT] flag, leave unlisted
5. The project shows automatically — Design Harness reads the brief
6. Build / iterate → audit PASSes; Step 3.5 backfills a missing designer card
7. Commit + push so other clones see it
```

---

## Checklist for designers

1. [ ] `brief.md` has **`Designer:`** = real name  
2. [ ] **`Gallery: visible`**  
3. [ ] Case study **Problem / Goal / Status** filled  
4. [ ] Card enrichment succeeded (or fix Atlassian/Confluence profile)  
5. [ ] `brief.md` (+ `galleryData.ts`, `routes.ts`, avatar if the designer is new) **committed and pushed**

---

## Verification fixture on this branch

`projects/gallery-card-trigger-verify/` + designer **Jordan Hale** prove the
≥1 project trigger. Fixture may omit a real avatar (initials fallback).

---

## Related files

| File | Role |
|------|------|
| `src/design-harness/galleryData.ts` | Designer profiles; attaches brief projects |
| `src/design-harness/projectsIndex.ts` | Reads `brief.md` Ownership + Case study |
| `harness/references/gallery-card-enrichment.md` | Shared lookup |
| `harness/task-intake/SKILL.md` | Primary trigger |
| `harness/skills/design-kickoff/SKILL.md` | Primary trigger |
| `harness/skills/audit/SKILL.md` § Step 3.5 | Safety net |
| `documentation/guides/team-gallery.md` | This guide |
