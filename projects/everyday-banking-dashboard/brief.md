# Brief — everyday-banking-dashboard

**Concept project.** A fictional consumer banking app. Balances, names and transactions shown in screens are made up.

## Why

**Problem:** Everyday banking customers can't see at a glance how much they have and what just happened.
**For whom:** Everyday retail banking customers with a current account and maybe a savings pot.
**What changes:** One glance at the home answers "how much" and "what just happened". No extra tap needed.

<!--
Truth block — the index the next session reads. Add a row only when a
source says it. Never invent one. An empty list means not recorded.
status: exploring (nothing built) | draft (built, not approved) | approved | closed
assumptions: { text, source } — believed, not proven. source: none if unsourced
unknowns: a string, or { text, owner, blocks } — owner and blocks optional. explicitly missing
evidence: { text, source }
parked: a string — a direction that was not approved
-->

```yaml
status: draft
example: true
system: mobile
assumptions:
  - text: "Most home visits are a quick check of balance and recent activity, not a task."
    source: none
  - text: "Promos and product tiles on the home slow that check down."
    source: none
unknowns:
  - "See all — the full activity list is not a screen yet"
  - "Where savings and other accounts live — not on this home"
evidence:
  - text: "Monzo's home leads with the account balance, then a short activity preview."
    source: sources.md
  - text: "Chime's home puts available balance first, then upcoming money (next direct deposit)."
    source: sources.md
parked:
  - "Coaching-first home (budgets, goals, nudges, Cleo-style) — not the chosen why."
  - "Look-ahead home (payday, bills, safe-to-spend, Chime-style) — not the chosen why."
  - "Swipeable account cards (current, savings) — not the chosen layout; needs the multi-account answer first."
  - "Send list with the last three people first, then A–Z, and no search. A flat searchable list was picked. This one put recent payees in reach without typing."
  - "Login with a PIN or face, like unlocking the phone (bunq) — not the chosen why."
  - "Login that asks for the email or phone first, then the secret (Chime, Revolut) — not the chosen why."
  - "Login with no name on the screen, so someone else holding the phone doesn't see whose it is. A greeting with the name was picked."
```

- **Feature/surface:** Banking app home dashboard
- **Platform:** iOS (Mobile design system)
- **Stage:** discovery
- **Sources:** none from the designer. Mobbin references in `sources.md`
- **Requested by:** Marco Paulo Lopes
- **Date opened:** 2026-11-01

## Ownership (structured — feeds the Team Gallery, `#/gallery`)

- **Designer:** Marco Paulo Lopes
- **Squad:**
- **Gallery:** visible

## Intent

"i want to build z dashboard for my abnking app asd convetpt". In other words, a dashboard for a banking app, built as a concept.

## Scope

- **In:** the home dashboard. Balance, recent activity, and the entry points into them.
- **In since 2026-11-01:** the returning-customer login (password only). A correct password does not open the home yet.
- **Out (for now):** card management, onboarding (sign-up, a first login on a new phone, Forgot password), budgeting and coaching. The amount, review, and confirmation of a payment are still out.
- **2026-11-01:** Sending is in, as a saved-payee list behind Send. Phone contacts and in-app-only people were not chosen.
- Separate from `mobile-banking-dashboard` (Northline Wallet, a payouts wallet for business providers).

## Constraints

- Product UI from `context/design-system/ds` and tokens only. Compose the `#/design-system` (Mobile) header, tab bar and sheets. Don't redraw them.
- Screens go in `projects/everyday-banking-dashboard/screens/`.
- Concept only, so no real customer data.

## How we'd know

| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| UX | Participant says their available balance and their last transaction after opening the home | — | within 5 seconds | prototype test |

Status: proposed
