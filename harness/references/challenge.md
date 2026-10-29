# Challenge — how to fill §2h

The four sentences and their buttons are in `harness/ORCHESTRATOR.md` §2h. This file is how to fill the blanks and what each button writes. It is not loaded every session.

Say the sentence in plain words. Never say "truth block", "row", "parked list", or "unknown" as a label. Braces are blanks, not text to print. `{, because {reason}}` and `{. {owner} owns it}` are included only when that blank has a value.

## What to read

The fenced YAML at the top of `projects/<slug>/brief.md`, and `decisions.md` for the date, what they chose, and whether this was already answered. Do not open `log.md`. Open `findings.md` only for the unsourced-claim template, to see if the claim is already there.

## When to say nothing

An edit, a copy tweak, an import, or a question answered from chat. Also say nothing when `decisions.md` already records a choice on this same gap and that item has not changed since. Writing the choice is not a change.

## Which template

1. **Unknown that blocks** — an unknown whose `blocks` is the decision this step would lock (what the screen optimizes for, shows, or commits). On an approved project, skip a broader "should this work start" unknown.
2. **Parked** — the ask would build a direction listed under `parked`.
3. **Draft / exploring** — `status` is `draft` or `exploring` and they asked to build, and neither of the above matched.
4. **Unsourced claim** — they are treating a claim as fact and `findings.md` has nothing behind it.

## Blanks

- `{date}` `{current}` `{reason}` come from the `decisions.md` entry that chose what stands now. Say the date as a person would (15 Oct 2026). `{direction}` is the idea they set aside, in a few of their own words, not the whole note and not a repeat of `{current}`. Drop `, because {reason}` when that entry gives no reason.
- `{unknown}` is that item's `text`. `{owner}` is its `owner` only. Never invent one. Drop `{. {owner} owns it}` when there is no owner.
- `{top unknown}` is the first unknown that has `blocks`, otherwise the first unknown. `{status}` is `draft` or `exploring`.
- `{claim}` is the claim they just made.

## What the buttons do

Log the choice in `decisions.md`, dated, in their words. The heading names the idea or the open question so the next session can match it.

**Parked.** "Compare both, low-fi" compares the two and does not reopen it. "Reopen it and build" removes that line from `parked` and logs why, then builds. "Stay with {current}" leaves it parked and does not build the other one.

**Unknown that blocks.** "Draft a question for {owner}" (or "List what would settle it") stays in chat and does not build. "Build with it as a visible gap" sets `status` to `draft`, leaves the open question in place, and does not invent the answer. "Build anyway (marked draft)" sets `status` to `draft` and leaves that question as what the work depends on.

**Draft / exploring.** "Critique what exists first" does not build. "One screen, low-fi" is one screen, not the set. "Build anyway (marked draft)" sets `status` to `draft`.

**Unsourced claim.** "Check production or data first" does not treat the claim as fact. "Mark it as an assumption and continue" adds it under `assumptions` with `source: none`, then continues.

## Same gap

The same gap is the same open question or the same parked idea. Ask again only if its text, owner, or what it blocks changed after the decision.
