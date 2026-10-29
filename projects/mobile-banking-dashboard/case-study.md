# Case study — Northline Wallet home

Status: DRAFT — 2026-10-15 · Sources: brief.md, findings.md, decisions.md, conceptual-model.md, log.md

**Fictional example.** Northline is a company invented for this harness (`context/org-pack/`). Every name, number, channel, date and quote in this project is made up.

## 1. Opening

- **Framing:** Providers don't need a dashboard. They need to know where their money is.
- **Who:** Design, own initiative · PM: none · Status: discovery, PRD approved, prototype built
- **Intro:** The Northline Wallet home in Northline Studio, rebuilt around one question: when is my next payout, and how much is in it?
- **RACI:** R Design · A none named · C Finance (wallet owner, not yet consulted)

Source: brief.md (Ownership, Case study summary, §1, §7); decisions.md 2026-10-15 (Kickoff Step 0 answers)

## 2. Problem / why now

Owners and managers who take payments through Northline Pay can't tell from the wallet how much money is theirs, when it reaches their bank, or why some of it is held. So they call support. Some call several times about the same blocked wallet.

The ask started as "a dashboard view for mobile banking". The Slack sweep turned it into a narrower problem. The wallet is already live, and between August and October 2026 support-call summaries kept describing the same confusion. A wallet entry point is also being built on the new profile screen, which gives the wallet a new way in.

Source: brief.md (Intent, The three questions, §2); findings.md 2026-10-15 (research-agent)

## 3. Evidence

### Numbers

- **About 41%** of providers open the wallet at least once a month (analytics dashboard, 2026-07-07).
- No count of support contacts about money exists yet. That gap is why chapter 7 has no baseline.

### Voices

Both quotes come from colleagues, not providers. The provider evidence is paraphrased call summaries (table below); no verbatim provider quote is logged.

> "kind of mobile banking for Northline Pay" — Nadia Brooks (product lead), describing the wallet pilot, #product, 2025-03-25 (findings.md 2026-10-15)

> "invoices, insurances, loans" — Tomás Reyes (design lead), on what the app will grow to hold, #product-design, 2026-09-29 (findings.md 2026-10-15)

### What providers report

From support-call summaries in #signal-studio-feedback, Aug–Oct 2026:

| # | Signal | Dates |
|---|--------|-------|
| 1 | Wallet shown as "blocked" with no reason or next step in the app; providers call support repeatedly | 2026-10-07, 2026-10-13 |
| 2 | Balance and pending payouts change or vanish without explanation; negative balance not explained | 2026-10-13, 2026-08-28 |
| 3 | A tip and a deduction can't be traced on the payout screen | 2026-09-29 |
| 4 | Gift-card and pay-later payments don't appear in the wallet | 2026-10-13; #payments 2026-09-03 |
| 5 | Unclear how chargebacks and refunds change the balance and payouts | 2026-09-25, 2026-10-14 |
| 6 | The €25 payout minimum confuses providers | 2026-09-30 |
| 7 | Changing payout details sends providers to the payment provider's portal or their bank, and they get lost between apps | 2026-09-15, 2026-10-08 |

### Reference pattern

Monzo's personal app leads with one balance, previews three recent transactions, and shows money still to come next to money already spent. The assumption map challenged copying it directly: Monzo shows personal spending, while a provider's wallet holds income, fees, tips, holds and payouts.

Source: findings.md 2026-10-15 (research-agent, competitor-scan, assumption-mapper)

## 4. Options considered

**What the screen is.** A generic banking home (balances, recent activity, quick actions), which was the kickoff framing. Or the Northline Wallet home, a provider's money screen. **Chosen:** the wallet home, because the sweep found the wallet live and the pain already documented.

**What leads the screen.** The first build followed the Monzo pattern: an "Available" balance card, with Next payout below it. Review found both showing the same €1,284.50 under two labels, which invites "is that the same money twice?" **Rejected.** **Chosen:** Next payout as the hero (amount, date, stage tracker), with Pending and On hold underneath.

![Balance first, rejected in review](screens/WalletHomePage.tsx?lead=balance)

[Compare the two layouts side by side](screens/WalletHome.compare.ts).

**Where payout settings live.** A gear icon in the header, or a visible row on the home. The icon-only gear broke the style guide, and it hid a task providers already struggle with (signal 7). **Chosen:** a visible "Payout Settings" row, showing the schedule and account.

**Platform.** An Android screen was built on 15 October: the same body under a different top bar, inside the iPhone frame. **Chosen (2026-10-16):** iOS only. That Android screen was removed.

Source: decisions.md 2026-10-15 (Framing, Screens: platform + structure, Review fixes) and 2026-10-16 (iOS only); findings.md 2026-10-15 (ux-pattern)

## 5. The decision

**Direction built:** a wallet home led by the next payout, with its amount, date and progress from Scheduled to On the way to Arrived. Pending and On hold money sits underneath, and every hold is one tap from its reason and what happens next.

**Why:** it answers the brief's goal ("how much, when, and why") in that order, and it removes the repeated figure. This is a design direction against an approved PRD, not a validated decision. The wallet owner hasn't seen it.

Source: brief.md (Case study summary: Goal); decisions.md 2026-10-15 (Review fixes); findings.md 2026-10-15 (ui-agent + content)

## 6. Live prototype

![Wallet home](screens/WalletHomePage.tsx)

Tap the On hold tile to see why money is held; expand a past payout to see its breakdown.

- [Desktop](screens/desktop/WalletHomeDesktopPage.tsx): the same wallet in the browser frame. Next payout, pending, and on hold sit in a row. Pending payments are a table. Past payouts run full width.

- [Payouts paused](screens/WalletHomePage.tsx?status=paused): payouts stopped until the provider confirms their identity.
- [Failed payout](screens/WalletHomePage.tsx?status=failed): the bank returned a payout; the money goes into the next one.
- [Not set up](screens/WalletHomePage.tsx?status=not-set-up): no payout account yet, with three steps to set one up.

Other ways in:

- [Storyboard](screens/WalletHome.storyboard.ts): seven steps through the decision, ending on the hold sheet. Start it from a normal week, paused payouts or a returned payout.
- [Variants](screens/WalletHome.variants.ts): switch state and layout yourself.
- [Compare](screens/WalletHome.compare.ts): the two layouts and the three error states side by side.
- [Ideas](screens/WalletHome.ideas.ts): every idea considered, and why each was kept or dropped.
- [Research session](screens/WalletHome.stage.ts): the prototype alone, with four tasks in a hidden facilitator drawer.

All amounts, dates and names are sample data.

Source: screens/; findings.md 2026-10-15 (mobile-shell storyboard)

## 7. Outcome / expected change

Nothing has shipped and nothing has been measured.

- **Built:** iOS wallet home, desktop wallet home, three states, storyboard. Type check, lint and the design-token check are clean. The pre-share audit hasn't run yet.
- **Expected:** fewer support contacts about balance, payouts or the wallet per 1,000 active wallet users. Baseline and target are unknown until support data is pulled. Guardrails: wallet usage (about 41% of providers, July 2026) and payout-settings completion don't drop.
- **Still open:**
  - Who owns wallet design? This work may duplicate or clash with theirs.
  - Does the wallet receive hold and pause reasons from the payment provider? Without them the home can only say "paused", and the first job story stays unsolved.
  - Are the missing gift-card and pay-later payments a data problem?
  - When does each pending payment become available? The prototype's per-row dates are sample data.

Source: brief.md (§6, §7); findings.md 2026-10-15 (ui-agent + content, conceptual-model)

## 8. Sources

- **PRD:** `brief.md` (approved 2026-10-15)
- **Conceptual model:** `conceptual-model.md` (Wallet, Transaction, Payout, Hold, Payout method)
- **Research:** `findings.md` 2026-10-15 (Slack sweep, Monzo teardown, assumption map, job stories)
- **Decisions:** `decisions.md`
- **Project facts:** `#/playground/mobile-banking-dashboard/facts`
- **Ticket, Confluence, Figma:** none. Jira and Confluence weren't connected, and no Figma was found.

Source: brief.md (Sources); log.md

## Skipped

- **Chapter 1, RACI Informed:** the brief names no one to inform.
