# Variation review board — designer use case

**When you need to compare 2–4 UI directions before wiring one into Design Harness.**

Designers ask for this constantly: *“show me options”*, *“variation mockups”*,
*“side by side so I can pick.”* The harness answer is a **static review
board** — labeled cards, same seed content, compare-and-decide — **not** a
clickable multi-tab lab (that’s for walking a flow, not choosing a spine).

**Skill:** `ui-agent` (Step 1.5 — review board vs clickable)  
**Agent contract:** [`harness/skills/ui-agent/references/review-board.md`](../../harness/skills/ui-agent/references/review-board.md)  
**Related:** mid-build forks use [`variant-fork.md`](../../harness/skills/ui-agent/references/variant-fork.md) (different job)

---

## What you say (plain language)

Any of these should route here:

- “Can you do variation mockups?”
- “Show me A / B / C side by side”
- “Review board for the header options”
- “Mock the variants before we build”
- “I want to compare directions, not click through a prototype yet”

If you already ideated options in chat (e.g. with `ux-pattern`), say
**“mock those up as a review board”** so the agent doesn’t rebuild a full
interactive till.

---

## What you get

A dark lab page with **cards in a grid**. Each card has:

| Zone | Purpose |
|------|---------|
| **ID + title** | Option letter / name (e.g. `A + C`, `Today`) |
| **Why line** | One sentence — what this option optimizes |
| **Mock frame** | Light phone/till chrome showing *only* the contested UI (header, strip, etc.) |
| **Footer note** | Research / risk caveat (optional) |

One card can be marked **Lean** when there’s a research-backed preference —
that’s a recommendation, not a pick. You still choose.

Artifacts land under:

```text
projects/<slug>/artifacts/snapshots/<topic>-variants.html
```

Example: `projects/checkout/artifacts/snapshots/header-variants.html`.

Serve locally if needed:

```bash
npx serve projects/checkout/artifacts/snapshots -l 5188
# → http://127.0.0.1:5188/header-variants
```

---

## Layout designers liked (recipe)

Keep this shape — don’t invent a new board chrome every time:

1. **Page head** — title + one paragraph (“static mockups only… pick before we edit the live prototype”) + meta line (project · date · source of options).
2. **2×2 grid** (or 1×3) of cards on a dark background; light mock frames inside.
3. **Baseline card first** (“Today” / current) so the mess is visible next to fixes.
4. **Same seed data** across cards (same time, same “5 to close”, same More) so the eye only compares structure.
5. **Ghost placeholders** for content below the contested region (blurred appt cards) — don’t rebuild the whole product.
6. **Pick gate** — agent waits; you reply with a letter; then `ui-agent` wires the winner into Design Harness and logs `decisions.md`.

---

## Review board vs other formats

| Need | Format |
|------|--------|
| Compare 2–4 structural directions | **Review board** (this how-to) |
| Walk a flow end-to-end | Clickable Design Harness prototype |
| Mid-build “which layout?” with no prior steer | `variant-fork` (builds real DS variants + AskQuestion) |
| Stakeholder story / workshop | `deck-builder` slides |
| Critique one existing screen | `ux-pattern` (+ optional `figma-ux-audit`) |

**Anti-pattern:** building an interactive tabbed lab when you only needed a
compare board — wasteful rebuild (see referral entry-points, 2026-08-05).

---

## Worked example — checkout till header

**Problem:** Toolbar stacked Checkout title + register essay + multi-register
warn + “Finish today’s appointments” + pill + filters — four jobs, equal weight.

**Ideation:** `ux-pattern` produced options A+C / B / D.

**Ask:** “can you do variations mockups?”

**Output:** review board with Today · A+C (lean) · B · D.

**Next:** designer picks a letter → agent implements only that spine on
`CheckoutTabletScreen`.

---

## Checklist for agents (short)

- [ ] Confirm **review board** (not clickable) when the ask is mockups / compare / side-by-side
- [ ] Include a **Today / current** card when fixing existing chrome
- [ ] Same content across variants; only structure changes
- [ ] Save under `projects/<slug>/artifacts/snapshots/`
- [ ] Log format choice to `decisions.md`
- [ ] **Do not** wire all variants into Design Harness before a pick

---

## Why not a live-in-browser variant mode

2026-08-07: considered adding live-in-browser iteration (pick an element
in a running dev server, generate variants, hot-swap via HMR, accept into
source). **Decided against building it.** Breaking down
what it's actually for:

- **"Point at an element instead of describing it"** — not a real gap
  here. The agent's browser tool can already click/screenshot/inspect
  the live page, and a designer can just say "the third card" while
  looking at the running preview.
- **"See multiple variants fast, without a full rebuild each time"** —
  this is the real motivation, and it's already solved here, just via a
  different, cheaper mechanism: **this review board.** Static cards,
  same seed content, pick a letter, then only the winner gets wired into
  the real prototype. No live-DOM injection or dev-server tooling
  needed.

The only genuinely different thing a live mode offers is
seeing a variant *inside the real running app* (actual neighbors, actual
responsive behavior) instead of an isolated static card — a narrow,
speculative benefit that hasn't actually been hit as a limitation here.
Building it would mean real new infrastructure (style injection into the
dev server, an element-picker overlay, an accept-into-source diff path)
for a need this repo doesn't currently have. Revisit only if a concrete
case shows the static-snapshot review board genuinely falling short
(e.g. a variant that only makes sense to judge with real interaction/
state) — with a specific example in hand, not speculatively.

## Last updated

2026-08-07 — Captured from checkout till-header review board. Layout
pattern locked as the default designer-facing use case for variation asks.
2026-08-07 — Added the "why not a live mode" note (decided against — see
above).
