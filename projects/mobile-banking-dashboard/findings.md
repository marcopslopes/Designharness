# Findings — mobile-banking-dashboard

Append-only. Each entry is dated and names the skill that produced it. Never delete or rewrite a prior entry.

**Fictional example.** Northline is a company invented for this harness (`context/org-pack/`). Every name, number, channel, date and quote in this project is made up.

<!--
### YYYY-MM-DD — <skill-name>

<What was found/produced/built. Link to files/lines if code was written.>
-->

### 2026-10-15 — research-agent (Leg B — partial: Slack only)

**Coverage:** Slack searched ("mobile banking", "banking dashboard", "balance payouts", "Northline Wallet"). **Atlassian (Jira + Confluence) not connected in this session — mandatory legs not run.** Figma/Miro: none linked from what was found.

**Verified (sourced):**
- Northline Wallet started as a pilot described as "kind of mobile banking for Northline Pay", to give providers clarity on the money flowing through Northline's rails — Nadia Brooks (product lead), #product, 2025-03-25.
- It is live: Production references in two markets (wallet transactions page, a wallet deep link for owners/managers) — #finance 2026-03-06, 2026-07-10; #payments 2026-06-01.
- Owned by the Finance team; wallet-api service, iOS work in #ios-payments (receipt navigation from the wallet 2026-09-29; restricted-access guard on the wallet entry 2026-09-22).
- A wallet entry point is being built on the new version of the profile screen — Profile squad, 2026-10-05.
- About 41% of providers open the wallet at least once a month — analytics dashboard, 2026-07-07.
- A Checkout-tab settings A/B test separates Payment settings (balance, payouts, card reader, tap to pay, transactions, verification) from Checkout settings — #experiments 2026-09-07, #releases 2026-09-14.
- Payouts policy under review: daily payouts on any positive balance vs a threshold with weekly payouts — #payouts-policy 2026-09-24.

**Provider signals (call summaries, #signal-studio-feedback, Aug–Oct 2026):**
- Wallet shown as "blocked" with no in-app reason or next step; providers call support repeatedly (2026-10-07, 2026-10-13).
- Balance and pending payouts change or vanish without explanation (2026-10-13); negative balance and blocked payouts not explained (2026-08-28).
- Payout lines unclear — a tip and a deduction not traceable on the payout screen (2026-09-29).
- Gift-card and pay-later payments not appearing in the wallet (2026-10-13; #payments 2026-09-03).
- Chargebacks and refunds: unclear how they affect balance and payouts (2026-09-25, 2026-10-14).
- €25 payout minimum confuses providers (2026-09-30).
- Updating payout details sends providers to the payment provider's portal / their bank; they get lost between apps (2026-09-15, 2026-10-08).

**Opinion (stated):** keep 3–4 most-used areas one tap away and group the rest in a menu, because the app will grow into a system of record — "invoices, insurances, loans" — Tomás Reyes (design lead), #product-design, 2026-09-29.

**Gap:** no design spec, research study or Figma for a wallet home / dashboard found in Slack. Jira and Confluence unchecked.

### 2026-10-15 — workload-agent (Leg A — not run)

Needs Jira (roadmap boards + DES/UXR search). Atlassian is not connected in this session, so ownership and roadmap status are unknown. Slack shows Finance owns Northline Wallet engineering; design ownership not found.

### 2026-10-15 — competitor-scan · Monzo · app home (balance, activity, quick actions)

**Source:** Mobbin (Monzo iOS — home, account detail, payments calendar, account switcher): [home stack](https://mobbin.com/screens/3bf008da-4e7f-467a-b556-64ebe1aa04fa), [home lower sections](https://mobbin.com/screens/57e00ab0-416f-4898-95d4-60fe291de184), [suggestions and rewards](https://mobbin.com/screens/a02cc6f7-1042-4790-99e0-91ec7ba371b9), [account detail](https://mobbin.com/screens/6c2bac17-2f8f-468d-bc8f-c77b4cf7ea5b), [connected account detail](https://mobbin.com/screens/6f88ae78-84d5-4e08-a56f-9f7f892cca96), [payments calendar](https://mobbin.com/screens/fc38868c-15e2-4acd-9a7f-df9a83ecbf9b), [account switcher sheet](https://mobbin.com/screens/f783c73d-c6ab-4b2c-8335-8e6738917c55)
**Mobbin status:** connected — real screenshots reviewed. No Monzo Business home on Mobbin; this describes the personal app.

**What they do**

1. Home opens on a stack of account cards. The front card shows the balance large, labelled "Balance", with two actions (add money, card) and an overflow menu. Other accounts (joint, connected banks) peek behind it.
2. Under the cards, an Activity card shows the latest 3 transactions with a "See all" link and a calendar shortcut.
3. Further down: savings and investments, pots, dismissable suggestions, rewards. Home is a scroll of cards, one topic per card.
4. Opening an account shows every transaction grouped by day, each day with its own total; money in is green with a plus sign.
5. A payments calendar answers "what's coming": total spent this month, amount still to pay with the next due date, and a month grid with each scheduled payment on its day.
6. Top bar: avatar (account switcher, settings, customise home), assistant, gifts, search, add. Bottom tabs: Home, Trends, Extra, Payments, Help.

**Notable choices**

- One number dominates (balance); everything else is a card underneath.
- Recent activity is a preview (3 rows), not the full list.
- Future money ("still to pay", next date) is shown alongside past money.
- Home can be customised from the account sheet.

**Not a recommendation** — factual reference only; nothing copied, no screenshots saved.

### 2026-10-15 — assumption-mapper

**What we know (sourced):**
1. Northline Wallet is live for providers (owners/managers) in two markets — Slack, see research-agent entry above.
2. About 41% of providers open the wallet at least once a month — analytics dashboard, 2026-07-07.
3. Providers call support because the wallet shows "blocked" without a reason, balances and pending payouts change without explanation, and some payments (gift card, pay-later) don't appear — #signal-studio-feedback Aug–Oct 2026.
4. Payout settings live in the payment provider's portal; providers get lost moving between apps — #signal-studio-feedback 2026-09-15, 2026-10-08.
5. Finance owns wallet engineering; a wallet entry point is being added to the new profile screen — Slack 2026-10-05.

**What we believe (no evidence yet):**
- User: we assume owners check the wallet on their phone, after a working day or when a payout is due.
- User: we assume a provider's first question is "how much is mine and when do I get it", not spending analysis.
- Problem: we assume the confusion is widespread, not a handful of loud cases (evidence is individual calls).
- Problem: we assume the cause is how the wallet presents money, not missing data in the backend.
- Solution: we assume a balance-first home with a next-payout date and a recent-activity preview (as in Monzo) suits a business wallet.
- Solution: we assume the reason for a block or a held payout is available to show in the app.
- Business: we assume Finance wants a redesign of the wallet home now.
- Business: we assume fewer "where is my money" support contacts is the outcome that matters.

**Research these first (low confidence, high impact):**
- Problem is presentation, not data → research goal: compare what the wallet shows today with what the payout and transactions data actually holds, for the cases in the call summaries.
- Block / hold reasons can be shown → research goal: ask Finance which reason codes the wallet receives from the payment provider.
- Confusion is widespread → research goal: count support contacts tagged balance / payout / wallet per month (data request).

**Challenge these (high confidence, high impact):**
- "A consumer banking home fits a business wallet." Matches the "users are like us" trap: Monzo is personal spending; a provider's money is income, fees, tips, holds and payouts.

**Business-vs-user-problem check:** the user problem is real and sourced (providers can't tell what happened to their money). The ask itself — "a dashboard" — is solution-first; the PRD keeps it as a hypothesis.

### 2026-10-15 — design-kickoff (Step 1.5 — method recommendation)

**Recommended next method: no new primary research yet — a data request plus a review of the current wallet screens.** The sweep already shows the problem exists; what's missing is how big it is and whether the cause is presentation or data. Support-contact counts and the current wallet UI answer both faster than interviews. Interviews were ruled out for now because the open questions are about volume and data, not motivation. Competitive teardown (Monzo) is done.

### 2026-10-15 — research-artifacts (job stories, Stage B, kickoff draft)

| # | When (situation) | I want to (motivation) | So I can (outcome) | Type | Evidence | Source |
|---|---|---|---|---|---|---|
| 1 | When money I expected isn't where I thought it would be | to see why, and what I can do about it | sort it out without calling support | F / E | Observed | #signal-studio-feedback 2026-10-07, 2026-10-13, 2026-08-28 |
| 2 | When I finish a day of appointments | to know how much I've earned and when it reaches my bank | plan what I can spend | F | Inferred | #signal-studio-feedback 2026-10-13 |
| 3 | When my bank deposit doesn't match what I charged | to see it split into services, tips, fees and deductions | reconcile my books | F | Observed | #signal-studio-feedback 2026-09-29 |
| 4 | When a client disputes a charge or I give a refund | to see how it changes what I'll be paid | avoid a surprise at payout | F / E | Observed | #signal-studio-feedback 2026-09-25, 2026-10-14 |
| 5 | When a client pays with a gift card or pay-later service | to find that payment | confirm the visit is paid | F | Observed | #signal-studio-feedback 2026-10-13; #payments 2026-09-03 |
| 6 | When my balance is below the payout minimum | to know when it will be paid | count on that money | F | Observed | #signal-studio-feedback 2026-09-30 |

Ranked by importance × how poorly served today. "Observed" = described by providers in support-call summaries.

### 2026-10-15 — conceptual-model

`conceptual-model.md` written (Provisional). Objects: Wallet, Transaction, Payout, Hold (provisional — needs hold reasons from the payment provider), Payout method. Balance is an attribute of Wallet (available / pending / on hold), not an object; tip, refund, chargeback and transaction fee are Transaction types. Vocabulary: "Payout", never "deposit" (Deposits = Northline Holds); "On hold" and "Payouts paused" instead of "blocked". OOUX: Payout isolated from its Transactions; payout method broken out to the payment provider's portal.

### 2026-10-15 — ui-agent + icon-usage (wallet home, iOS + Android)

Built `projects/mobile-banking-dashboard/screens/WalletHomePage.tsx` (iOS) and `WalletHomeAndroidPage.tsx` on one shared body (`wallet-home-shared.tsx`, data in `wallet-home-data.ts`, CSS `src/design-harness/styles/prototypes/wallet-home.css`). Tracked + brand-neutral (no company name, no payment-provider name).
- Order follows the brief's three questions: Available (+ Pending / On hold split) → Next payout with Scheduled / On the way / Arrived tracker → Pending transactions → Past payouts, each expandable into its breakdown (payments, tips, refunds, transaction fees → paid to your bank).
- On hold tile opens a sheet: who disputed, when, what happens next, by when.
- iOS: push header (‹ back, centred title, payout settings). Android: top app bar (← back, start title, ⋮ overflow). Hold reason = bottom sheet on both.
- Archetype (assumed — brief names none): Word-of-mouth Starter / Regulars Keeper — wary of paying for anything; fee shown openly in each payout breakdown.
- Assumptions in the sample data: weekly Friday payouts; "Usually ready in 2 days" for pending; dispute decision date. None sourced.
- Checks: tsc clean, eslint clean, design-detector 0 findings, all icons via `Icon` + Tabler.
- Gaps: `PhoneShell` has no Android frame (Android screen uses the iOS bezel); snapshot export not run. Audit deferred (`audit: on-share`).

### 2026-10-15 — ux-pattern (wallet home)

**Artifact:** Design Harness prototype · **Framing:** lab

First look: the screen answers "how much / when / why" in that order, and the hold reason is one labelled tap away — the core jobs are covered. The main weakness is that Available and Next payout show the same €1,284.50 under two labels, which invites "is that the same money twice?" — an object question (Wallet.available vs Payout.amount), not a spacing one.

- [House: Modal and sheet patterns] Hold sheet had no × close. **Fixed this session** (`aria-label="Close dialog"`). Minor.
- [UX Heuristic: Consistency / recognition] Available and Next payout repeat one figure. What if the next payout became the hero (amount + date + tracker) with Pending / On hold under it? `[Layer: objects]` → check against `conceptual-model.md` (is "Available" just "next payout so far"?). Major.
- [House: Anti-pattern 4 — verification walls] Payouts paused / Not set up / Failed payout states aren't built; each needs a visible reason + next step. `[Layer: interaction]` Major.
- [House: Anti-pattern 2 — hidden affordances] Android payout settings live only in the ⋮ overflow. Fine for a secondary action, but if payout settings is a frequent task it should be visible. `[Layer: unknown]` Note.
- [UX Heuristic: Visibility of system status] Pending rows don't say when each becomes available ("Usually ready in 2 days" is a blanket, unsourced claim). `[Layer: objects]` → needs the real availability rule. Minor.
- [House: Responsive device frames] Company pattern says every prototype ships mobile + desktop; no web wallet built. Scope call. Note.

### 2026-10-15 — ui-agent + content (states + review fixes)

Designer chose "fix now" for the open ux-pattern findings, plus the three missing states.
- **Repeated figure → fixed.** Separate "Available" card removed; the hero is now Next payout (amount, date, stage, tracker) with Pending / On hold under it. One number, one label.
- **Missing states → built** as `screens/states/`: Payouts paused (warning banner: confirm identity, balance safe), Failed payout (danger banner: bank returned the 10 Oct payout, returned money added to the next payout, "Returned by your bank" on that row), Not set up (path forward: 3 numbered steps + "Set up payouts").
- **Unsourced "ready in 2 days" → per-row "Ready <date>"** under each pending amount; Pending tile now says which payout it lands in ("In the 24 Oct payout"; "Not ready yet" when paused or failed). Dates are still sample data — needs the real availability rule.
- **Android settings only in ⋮ → fixed.** Visible "Payout Settings" row (schedule + account) on both platforms; iOS icon-only gear removed.
- **Desktop version → not built.** Out of scope for this pass; carry as an open note.
- content: priority guide per state applied; checked against style guide + vocabulary. "Payout Settings" title case (named feature, localization table); "Contact Support Team"; en dash rule; no "we" in error copy; buttons verb-first ≤3 words.
- Needs review: identity-check and closed-account reasons are placeholders until the payment provider's real pause and return reasons are known; DS `Alert` hardcodes `role="alert"` (house rule prefers `role="status"` for non-urgent); shared header back buttons are icon-only (style guide: no icon-only buttons) — chrome-wide, not this screen's.
- Checks: tsc, eslint, design-detector clean. States are iOS only.

### 2026-10-15 — mobile-shell storyboard (wallet home)

Added `projects/mobile-banking-dashboard/screens/WalletHome.storyboard.ts` (designer yes, ui-agent Step 6.5). 7 steps in 4 chapters: next payout hero, tracker, pending tile, per-payment ready dates, payout breakdown, Payout Settings row, hold sheet (last step opens it via setup click). Evidence cites the brief and conceptual model in brand-neutral words; timing steps marked as assumptions. All 7 spotlights verified in the browser. Opens at `#/playground/mobile-banking-dashboard/storyboard/wallet-home`.

### 2026-10-15 — case-study

`case-study.md` written (DRAFT), all 8 chapters. Skipped: RACI "Informed" (brief names no one). No verbatim provider quote exists; the two quotes are colleagues'.

### 2026-10-15 — deck-builder

Case-study deck built: `artifacts/decks/mobile-banking-dashboard-case-study.html`, 17 slides, light theme, speaker notes from `case-study.md`. Live phones on slides 11 (rejected vs chosen layout), 13 (iOS) and 14 (three states). Not published.

### 2026-10-16 — states moved to props

The `screens/states/` files are gone (harness rule change). Each state is now a link to the screen with a prop; see `case-study.md` and `about.md` for the new links.

### 2026-10-17 — Desktop wallet home

`screens/desktop/WalletHomeDesktopPage.tsx`. Same nav as the phone, browser frame, two columns. Audit deferred (on-share).

### 2026-10-17 — Desktop wallet layout

Rebuilt the desktop page from web banking references: summary row (next payout, pending, on hold), full-width alert on paused, pending payments as a table, past payouts full width. Phone layout unchanged. Audit deferred (on-share).

### 2026-10-17 — Quartz as inspiration (not built)

Looked at [Quartz](https://design.how/systems/quartz) (design.how, for agent and developer tools). The wallet desktop stays on the Desktop system, which borrows Mobile's tokens and components inside `DesktopShell`. Quartz is a reference for the Desktop pieces that are still missing (table, status, filter, stats), not a new palette for the Harness frame or the wallet.

**What to take, on Desktop:** status as a word; one frame with a stats strip; hue only on a label, a line, or the selected row; tabular figures; corners by role; one primary action per view; hairline frames.

**What to leave:** the frost navy and icy paper colours, Quartz's type scale, and the agent-only pieces (run traces, keys, prompt input). Do not copy its tokens.

**Locked (2026-10-17):** Desktop gets the table, filter, status word, and stats strip when those pieces are built. The Harness frame also takes sentence case, one primary action per view, and status as a word. No restyle yet.

### 2026-11-02 — ui-agent (wallet home, four directions)

Built the four directions the designer picked off the review board, on the shared phone and desktop body. The On hold tile names the dispute. A next payout under €25 says how much is short and which Friday is missed (`?sample=under-minimum`; the usual week stays €1,284.50). Each collapsed past payout shows its fee. The hold sheet's main button is "Wait until 24 Oct"; Contact Support Team is off that sheet. Idea 3 (refunds on the hero) stays picked and is not built. Audit deferred (on-share).

### 2026-10-16 — Android screen removed

`WalletHomeAndroidPage.tsx` is gone, along with the platform switch in Variants, the iOS/Android Compare, and the Stage Android scenario. The wallet home is the iOS screen only. Audit deferred (on-share).
