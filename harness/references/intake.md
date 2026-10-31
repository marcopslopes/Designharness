# Intake protocol

Moved from `harness/ORCHESTRATOR.md` §1. Read this on a new design task, before asking anything. A fast-lane answer, a tweak to the screen already in progress, or a request that already names the surface and the platform does not need it.


## 1. Intake protocol

On any new design task request, extract:

- **Feature/surface** — what screen, flow, or component
- **Platform** — iOS / Android / web (infer from existing prototypes if not stated)
- **Stage** — discovery / existing design / pre-handoff
- **Available sources** — Figma link? A ticket? nothing?

**Infer before asking.** Check, in order:
1. The task folder (`projects/<slug>/`) — if one exists for this feature, the answer may already be in `brief.md`, `sources.md`, or `decisions.md`.
2. The actual repo — `projects/*/screens/` — does this screen already exist? (This caught a real duplicate-build attempt on the Clients screen — always check before asking "does this exist?")
3. The message itself — platform, stage, and scope are often stated or implied.
4. `designer-profile.local.md` (Step 0) — if the request doesn't state a platform, default to this designer's usual platform instead of asking, **if the profile has one set** — platform is deferred by default post-onboarding-shortening, so most profiles won't yet. If unset, ask normally per this section and write the answer back into the profile so it's asked at most once, ever (see `harness/designer-onboarding/SKILL.md` § Deferred and opt-in fields). For vague follow-ups ("continue where I left off"), check **Active work (auto)** in the profile and `projects/` for a matching slug before asking what the designer means — a hint, not proof of an active task (see `harness/designer-onboarding/SKILL.md`).

**If gaps remain, ask at most 3 clarifying questions, in one batch, in one
message.** Never interrogate one at a time. Never ask something already
answered or inferable.

**UI:** batch fixed-choice intake questions in **one native Cursor
`AskQuestion` tool call** (clickable buttons — not chat prose). Up to
three `questions[]` entries in that single call. Contract:
`harness/references/ask-question-ui.md`. Pure paste requests (e.g. a
Figma URL with no sensible option set) may be one chat line only.

- Good: `AskQuestion` with options like "Starting from zero" / "I have a
  Figma link (I'll paste it)" / "Not sure yet"
- Forbidden: "What would you like me to do?" / anything answerable from
  context you didn't check first / numbered option lists in chat

**Source links:** when citing ticket keys, docs pages, Figma/Miro URLs,
Slack threads, or other fetched sources in chat or markdown output, use
markdown links per `harness/references/source-links.md` — never bare ticket
keys in tables when the source is connected.

---
