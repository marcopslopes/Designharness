---
name: task-intake
description: >-
  Packages the orchestrator's intake protocol (harness/ORCHESTRATOR.md §1) as a
  reusable skill. Use at the start of any new design task request, before
  routing to a domain skill — infers what it can from the task folder and
  the repo, asks at most 3 batched clarifying questions for the rest, then
  opens or updates the task folder. Does not build UI or run any domain
  skill itself.
---

# Task intake

This is `harness/ORCHESTRATOR.md` §1, packaged so it can be invoked directly (e.g.
mid-conversation, when a request arrives without going through a fresh
orchestrator read).

## Steps

1. **Extract** from the request: feature/surface, platform, stage, sources.
2. **Infer before asking**, in this order:
   - Check `projects/<slug>/` — does a folder already exist for this feature?
     Read `brief.md` and `decisions.md` before assuming anything is unknown.
   - Check the repo — `src/design-harness/pages/`, `src/design-harness/routes.ts` — does
     this screen already exist? Don't ask "does this exist?" without
     looking first.
   - Check the request itself for stated or implied answers.
3. **If gaps remain**, ask at most 3 clarifying questions, batched into **one
   `AskQuestion` tool call** (up to 3 `questions[]` — clickable buttons,
   not chat prose). Never ask one at a time. Never ask something
   inferable from steps above. Contract:
   `harness/references/ask-question-ui.md`.
4. **Open or update the task folder:**
   - New task → copy `projects/_template/` to `projects/<slug>/`, fill `brief.md`.
   - Existing task → run `npm run -s harness:context -- <slug>` first (brief
     status, designer, gallery state, every screen/state with its route), then
     read all 4 files, and summarize current state back to the designer in
     1-2 sentences before proceeding (this is what makes "continue the X
     task" work across sessions). Unsure of the slug → run it with no slug
     to list projects.
   - **Gallery card enrichment (proactive, first eligibility):** after
     Ownership is written, if `Designer:` is a real name and
     `Gallery: visible`, and that designer is **not** yet in
     `src/design-harness/galleryData.ts`, run
     `harness/references/gallery-card-enrichment.md` immediately.
     - Success → write the enriched `GalleryDesigner` (+ route). The project
       appears from `brief.md` automatically once its case study lines are
       filled — never copy it into `galleryData.ts`.
     - Failure → emit `[GALLERY-ENRICHMENT]` and leave them unlisted; do
       **not** invent title/focusAreas/avatar and do **not** block intake.
     Audit Step 3.5 remains the safety net if this pass is skipped.
5. **Hand off to `harness/ORCHESTRATOR.md` §2** for routing — this skill only
   handles intake, not the routing decision itself.

## What this skill does NOT do

- Does not decide which domain skill(s) to run — that's the routing table
  in `harness/ORCHESTRATOR.md` §2.
- Does not build, write copy, or audit anything itself.
- Does not log routing decisions — that happens after routing, per
  `harness/ORCHESTRATOR.md` §5, into `harness/logs/routing-log.md` and (if a task folder
  exists) that task's `log.md`.
