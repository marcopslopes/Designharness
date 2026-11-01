# Case study — Everyday banking home

Status: DRAFT — 2026-11-01 · Sources: brief.md, findings.md, decisions.md

## 1. Opening

- **Framing:** The home should say how much you have, and what just happened, before it sells anything else.
- **Who:** Marco Paulo Lopes (Design). No PM. No squad. Status: draft.
- **Intro:** A concept home for a consumer banking app, and the list behind Send.
- **RACI:** Merged with Who. The brief names the designer and nobody else, so there is no accountable owner, no consultees, and no informed list.

Source: brief.md (Ownership, Case study summary, Intent)

## 2. Problem / why now

Everyday customers open a banking app to see how much they have and what just happened. A home full of promos and product tiles makes that check take longer. This concept puts the balance and the recent activity first.

Sending was not in the first brief. On 2026-11-01 it was added as the list behind Send, for people you have already paid. The amount, the review, and the confirmation of a payment stay out.

Source: brief.md (Why, Scope)

## 4. Options considered

**What the home is for.** Balance and recent activity, so one look answers both questions. Not a look-ahead home (next payday, upcoming bills, safe-to-spend). Not a coaching home (budgets, goals, nudges).

**What the home shows.** One balance, then Add money, Send, and Card, then the last five transactions grouped by day. Not swipeable cards for a current account and a savings account.

**Who the send list is for.** People you have already sent money to, so the next payment is a pick. Not everyone in the phone contacts, including someone never paid. Not only people already on this bank.

**How the send list is arranged.** Search, an Add a recipient row, then a flat list with the account on each row. Not the last three people first, then everyone else A–Z, with no search. That layout put a repeat payment in reach without typing. This one asks you to search.

Source: decisions.md 2026-11-01; brief.md (parked)

## 5. The decision

**The decision.** The home leads with one balance and the last five transactions. Send opens a searchable list of people you have already paid, with the account on the row.

**Why.** The home has to answer how much and what just happened. A payment to someone known should start as a pick, not as setting them up. Tapping a person does not open an amount screen.

Source: decisions.md 2026-11-01; brief.md (Goal, Scope)

## 6. Live prototype

![Banking home](screens/BankingHomePage.tsx)

The balance is first. Tap a transaction to open its detail. See all does not open a list.

![Send list](screens/SendListPage.tsx)

Open this from Send on the home. Search a name. Add a recipient. A payee row stays on this screen.

- [Banking home storyboard](screens/BankingHome.storyboard.ts): why the balance is first.
- [Send list storyboard](screens/SendList.storyboard.ts): search, add, and the account on the row.

Source: findings.md 2026-11-01; screens/BankingHomePage.tsx; screens/SendListPage.tsx

## 7. Outcome / expected change

Nothing has shipped, and nothing has been measured.

Expected: in a quick test, a person can say their available balance and their last transaction within 5 seconds of opening the home. The brief calls those 5 seconds a guess, not a result.

Still open: See all has no activity list. Savings and other accounts are not on this home. A payment still has no amount, review, or confirmation.

Source: brief.md (How we'd know, unknowns, Scope)

## 8. Sources

- [Project brief](brief.md)
- [Mobbin references](sources.md) — home and send-list precedents. No ticket.
- [Banking home](screens/BankingHomePage.tsx)
- [Send list](screens/SendListPage.tsx)

Source: brief.md (Sources); sources.md

## Skipped

- Chapter 3, Evidence — findings.md has build notes only. No quotes, numbers, or tables.
- Journal — no `designer-context.local/journal` entries for this project.
