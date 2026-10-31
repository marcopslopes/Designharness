# presenter

<!-- generated-from-skill: do not edit -->

Picks how to show a project's built screens to someone, from who's looking and what the designer wants back, then writes the small config file beside the screens that turns them into that view: Variants (one screen, a control panel to switch states, platforms and options), Compare (2–4 live frames side by side, numbered, with the chosen one marked), Stage (the prototype alone for research, with a hidden facilitator drawer) or Ideas (an index of independent ideas, one live at a time, with notes).

**Triggers:** "how should I show this" · "present this to <PM / eng / leadership>" · "let them play with the options" · "put these side by side" · "compare these directions live" · "show the states for review" · "let them flip through every state" · "set the prototype up for a research session" · "give me a participant view" · "show the team every idea we had"

<!-- /generated-from-skill -->

Picks the best way to show screens you've already built, from who's looking and what you want back, and sets it up in one small file.

## What It Does

Asks two things — who's looking, and what you want from them — then picks a format:

| Format | Best for | What it looks like |
|--------|----------|--------------------|
| **Variants** | Engineers, QA, other designers checking coverage | One screen with a control panel: switch platform, state and options |
| **Compare** | A PM or lead picking a direction | 2–4 live screens side by side, numbered, the chosen one marked |
| **Stage** | Research participants | The prototype alone. You press `\` for a hidden drawer to jump between tasks and switch scenario |
| **Ideas** | A team looking through many ideas | A list of ideas on the left, one live at a time, and why it was kept or dropped on the right |

It writes a config file beside your screens (`WalletHome.variants.ts`, `.compare.ts`, `.stage.ts`, `.ideas.ts`). The page shows up under **Present** in the project sidebar. Your real screens appear inside it, so every change to a screen shows up in every presentation.

---

## When to Use

- You need someone to pick between directions you've built
- Engineering needs to see every state before they build
- You want a link that opens on one exact combination
- You're running a research session and don't want participants to see any controls
- You want the team to see every idea, including the ones you dropped

### Trigger Phrases
```
"How should I show this to the PM?"
"Put balance-first and payout-first side by side"
"Let engineering flip through every state"
"Set the prototype up for Thursday's research session"
"Show the team every idea we had"
```

Writing the test script and tasks is [usability-test-guide](usability-test-guide.md). Ask for both and it plans them in that order, so the Stage steps come from the guide.

---

## Keys

- **Variants:** R resets, P hides the panel
- **Compare:** ← → move between comparisons, R goes back to the first, P hides the bar
- **Stage:** `\` opens and closes the facilitator drawer, R resets the step while it's open, Esc closes it
- **Ideas:** ← → move between ideas, R replays, P hides the side panels
Compare frames show numbers, not names, so the labels don't sway a first look. Names, notes and the chosen direction are behind **Notes** in the bar.

---

## Won't Do

- ❌ Copy a screen to make a variant — it adds an option to the real screen instead
- ❌ Mark a direction as chosen unless `decisions.md` says so
- ❌ Build slides — that's [deck-builder](deck-builder.md)
- ❌ Compare mockups before anything is built — that's the review board in [ui-agent](ui-agent.md)

---

## Related Skills

- [ui-agent](ui-agent.md) - Builds the screens and the storyboard walkthrough
- [deck-builder](deck-builder.md) - Slides
- [case-study](case-study.md) - The project's story
