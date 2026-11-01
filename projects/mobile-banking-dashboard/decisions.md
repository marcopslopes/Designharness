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
