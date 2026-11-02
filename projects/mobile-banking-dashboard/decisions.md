# Decisions — mobile-banking-dashboard

Append-only. Each entry is dated and states the decision plus its rationale. Check here before asking the designer something that may already be answered.

<!--
### YYYY-MM-DD — <decision>

**Rationale:** <why>
**Made by:** <designer / inferred by agent, and how>

### YYYY-MM-DD — ui-agent variant fork: <fork topic>

**Chosen:** <semantic label of winning variant>
**Rejected:**
- <semantic label> — <why not>
**Rationale:** <designer quote or summary>
**Artifacts:** `artifacts/<name>.html`
**Made by:** Designer, via `AskQuestion` variant-fork gate
-->

### 2026-10-15 — Kickoff Step 0 answers

- **What:** the app's home screen — balances, recent activity and quick actions at a glance.
- **Existing material:** none known to the designer.
- **PM / requester:** the designer, own initiative, no PM.

**Rationale:** design-kickoff Step 0 (3 framing questions).
**Made by:** designer, via AskQuestion.

### 2026-10-15 — Project is a fictional Northline example

The whole project lives in tracked `projects/mobile-banking-dashboard/` and is set at Northline, the harness's fictional company. Screens stay brand-neutral.

**Made by:** designer.

### 2026-10-15 — Framing: Northline Wallet home

The dashboard is the Northline Wallet home in Northline Studio — the provider's money screen (balance, payouts, transactions) — not a generic consumer bank.

**Rationale:** Slack sweep found Northline Wallet live with documented provider pain (blocked states, vanishing balances, missing transactions).
**Made by:** designer, via AskQuestion.

### 2026-10-15 — Research method: competitive teardown instead of Atlassian

Jira and Confluence stay unchecked (not connected); they're recorded as gaps in the PRD. Pattern evidence comes from banking apps such as Monzo instead.

**Rationale:** designer: "just do base on other like monzo".
**Made by:** designer.

### 2026-10-15 — Confluence copy: not offered

Step 2.5 skipped: Confluence isn't connected in this session. PRD stays chat-only in `brief.md`.

**Made by:** agent (tool unavailable).

### 2026-10-15 — Kickoff gate: PRD approved

The Northline Wallet home PRD (`brief.md`) is approved to design against. Open gaps stay listed in §7 (design ownership, block reasons, missing transactions, support volume, current wallet UI, markets).

**Made by:** designer, via AskQuestion at design-kickoff Step 3.

### 2026-10-15 — Screens: platform + structure
- Platform: both iOS and Android (designer pick). One shared body; platform layer only changes the top bar.
- Files flattened to `WalletHomePage.tsx` (iOS) + `WalletHomeAndroidPage.tsx` so the sidebar reads "Wallet home" / "Wallet home android" (folder `ios/` rendered as "Ios").
- Hold sheet gets × close per house modal rule (ux-pattern finding, fixed same session).

### 2026-10-15 — Review fixes (designer: fix now)
- Hero = Next payout; "Available" card dropped (removes repeated €1,284.50).
- Payout Settings visible as a row on both platforms; iOS gear removed.
- States built: Payouts paused, Failed payout, Not set up. Desktop deferred.

### 2026-10-15 — One copy, public example

One copy of the project, tracked in `projects/`, as a public worked example of the harness. Every company, person, channel and figure is fictional (Northline).

**Rationale:** designer: "not 2 copies, the one we have is fine"; "all needs to be fictional".
**Made by:** designer.

### 2026-10-16 — Platform: iOS only

The Android wallet home is removed. It was the shared body inside the iOS phone frame, with a different top bar. Prototypes stay on the Mobile system and the iOS frame.

**Chosen:** one iOS screen (`WalletHomePage.tsx`).
**Removed:** `WalletHomeAndroidPage.tsx`, the Variants platform control, the Compare "iOS and Android" pair, the Stage Android scenario, and the Android screenshot in "How this project ran".
**Made by:** designer ("remove all android artifacts").

### 2026-10-17 — Wallet tab bar is a bank, not the business app

The example is a banking wallet. The bottom bar was Today, Clients, Checkout, Business, Profile, from the old business-app chrome.

**Chosen:** Home, Activity, Wallet (selected), Cards, Account. The screen is the Wallet tab, so the back chevron is gone. The hold sheet no longer uses that chrome.
**Made by:** designer.

### 2026-10-17 — Desktop wallet home

The wallet example needs a desktop prototype as well as the phone.

**Chosen:** `screens/desktop/WalletHomeDesktopPage.tsx` in `DesktopShell`, with the same Home / Activity / Wallet / Cards / Account nav. The payout is on the left; settings, pending payments, and past payouts are on the right. Same states as the phone (`status`, `lead`).
**Made by:** designer.

### 2026-10-17 — Desktop wallet layout

The first desktop page stacked the phone screen into two columns. Web banking references (Mercury, Wise, Stripe payouts, Dub) put the figures in a row and the activity in a full-width table.

**Chosen:** page title and payout settings in the header. Next payout, pending, and on hold in one row. A full-width alert when payouts are paused or returned. Pending payments as a table (who, type, ready date, amount). Past payouts full width, still expandable. The phone screen stays a single column.
**Made by:** designer, after looking at Mobbin web screens.

### 2026-10-17 — Quartz informs Desktop, and a few Harness habits

Quartz (design.how) is a cold, dense system for agent tools. The wallet desktop is the Desktop system, which still borrows Mobile.

**Chosen:** use Quartz's shape when Desktop gains a table, filter bar, status word, and stats strip. Also on the Harness frame: sentence case, one primary action per view, status as a word. Leave Quartz's frost palette and type. Nothing rebuilt yet.
**Made by:** designer.

### 2026-11-01 — Autonomy on the profile screen

**Chosen:** Confirm each step.
**Rationale:** Hands-on dial for this screen only. Does not skip the plan approval.
**Made by:** designer, via AskQuestion.

## 2026-11-02 — Go wide: wallet home

**Picked:** #1 Show the hold reason on the On hold tile instead of always “Disputed payment · Why?”. (moves UX: say why money is on hold, and the next step) · #2 Under the Next payout amount, say what is still short of the €25 minimum and the date that payout will actually go out. (moves UX: time to answer when and how much) · #3 On the Next payout hero, show refunds and chargebacks already taken out of Friday’s amount. (moves UX: time to answer when and how much) · #4 On each collapsed Past payouts row, show the fee total next to the amount paid to the bank. (moves UX: match a payout to services, tips, fees and deductions) · #5 On the hold sheet, make the primary button the next step named in the sheet, and take Contact Support Team off that sheet. (moves Outcome: support contacts about balance, payouts or the wallet)
**Parked:** #6 Make each Pending row open that payment and the payout date it joins. — UX: time to answer when and how much, job story 2; findings 2026-10-13, day · #7 On the returned-payout alert, take Update bank details straight into the payout-settings handoff. — Guardrail: payout-settings completion, findings 2026-09-15, 2026-10-08, day · #8 When a pending payment changes Friday’s amount, mark the Next payout figure with what changed and why. — UX: time to answer when and how much, findings 2026-10-13, day · #9 Remove the Pending section total, which repeats the amount already on the Pending tile. — UX: time to answer when and how much, hunch, hour · #10 When payouts are paused or a payout is returned, notify the provider with the reason and the next step. — Outcome: support contacts about balance, payouts or the wallet, findings 2026-10-07, 2026-10-13, project
Source: ux-pattern go-wide; How we'd know status proposed; board artifacts/snapshots/wallet-home-ideas.html

### 2026-11-02 — Review board: wallet home directions

**Format:** review board
**On the board:** #1 hold reason on the tile, #2 minimum on next payout, #4 fees on the collapsed payout row, #5 next step on the hold sheet
**Not on this board:** #3 refunds on the hero — still picked, not mocked
**File:** `artifacts/snapshots/wallet-home-variants.html`
**Waiting:** a pick before any edit to the wallet home prototype
**Made by:** designer, via AskQuestion (the four to mock)

### 2026-11-02 — Build the four wallet home directions

**Chosen:** #1 hold reason on the On hold tile, #2 the €25 shortfall under Next payout, #4 fees on the collapsed payout row, #5 the hold sheet's main button is the next step
**Not in this build:** #3 refunds on the hero — still picked, not built
**Rationale:** designer picked all four mocked directions
**Made by:** designer, via AskQuestion

### 2026-11-02 — Text boards removed

**Removed:** `artifacts/snapshots/wallet-home-ideas.html` and `artifacts/snapshots/wallet-home-variants.html`. The idea list and picks above stay the record.
**Why:** the boards read as text-heavy. Go-wide now shows directions as real screens in Compare (`screens/WalletHome.compare.ts`).
**Made by:** designer, via AskQuestion.

## 2026-11-02 — Go wide: wallet home (UI and UX)

**Directions:** The payout is the page (#1, #2, #3 — moves match a payout to services, tips, fees and deductions) · The hold leads (#4, #5, #6 — moves say why money is on hold, and the next step. Depends on Finance.) · One list by Friday (#7, #8, #9 — moves time to answer when the next payout is, and how much)
**Chosen:** The payout is the page
**Ideas not in a chosen direction:** #4 Move On hold above Next payout — UX say why money is on hold, job story 1, findings 2026-10-07 and 2026-10-13, hour · #5 Open that row as a page — UX say why and the next step, job story 1, findings 2026-10-07, day · #6 Say the held amount is not in the next payout — UX time to answer when and how much, findings 2026-10-13, conceptual-model 2026-10-15, hour · #7 Group money by Friday — UX time to answer when and how much, job story 2, findings 2026-10-15, day · #8 Each Friday opens that payout — UX match a payout, job story 3, findings 2026-09-29, day · #9 Show a refund in the Friday it changed — UX match a payout, job story 4, findings 2026-09-25 and 2026-10-14, hour · #10 Move Payout Settings into the header — Guardrail: payout-settings completion, hunch, hour
**Ideas:** #1 Open a past payout as its own page, with payments, tips, refunds and fees — UX match a payout, job story 3, findings 2026-09-29, day · #2 Open Next payout and list the pending and held money that is not in it — UX time to answer when and how much, job story 2, findings 2026-10-13, day · #3 Show the latest payout's payments, tips, refunds and fees without an expand — UX match a payout, job story 3, findings 2026-09-29, hour · #4 Move On hold to a full-width row above Next payout — UX say why money is on hold, job story 1, findings 2026-10-07 and 2026-10-13, hour · #5 Open that row as a page, not a sheet — UX say why and the next step, job story 1, findings 2026-10-07, day · #6 Keep the Next payout figure alone, and say the held amount is not in it — UX time to answer when and how much, findings 2026-10-13, conceptual-model 2026-10-15, hour · #7 Group pending and past payouts by the Friday they belong to — UX time to answer when and how much, job story 2, findings 2026-10-15, day · #8 Each Friday shows what the bank receives or received, and opens that payout — UX match a payout, job story 3, findings 2026-09-29, day · #9 Show a refund as a line in the Friday it changed — UX match a payout, job story 4, findings 2026-09-25 and 2026-10-14, hour
Source: ux-pattern go-wide; How we'd know status proposed; Compare screens/WalletHome.compare.ts (directions)
