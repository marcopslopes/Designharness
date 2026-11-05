# Brief — mobile-banking-dashboard

**Fictional example.** Northline is a company invented for this harness (`context/org-pack/`). Every name, number, channel, date and quote in this project is made up.

<!--
Truth block. Status matches the kickoff gate (approved 2026-10-15).
The open assumptions are the ones the later decisions did not settle.
"Balance-first, like a consumer bank" is parked, not still assumed:
the hero became Next payout. Owner and blocks on an unknown are the
old risk-table columns. Two of those questions were not in the list,
so they are unknowns again. No owner was added where the table had none.
Blocks stay only where they stop the next build or decision. Design
already started, the home was already changed, other markets are not
the next screen, and missing transactions are out of scope.
Jira and Confluence being disconnected is this session's tools, not a question.
-->

```yaml
status: approved
example: true
system: mobile, desktop
assumptions:
  - text: "The confusion is common, not a handful of loud cases."
    source: brief.md#2
  - text: "The cause is how the wallet presents money, not missing data behind it."
    source: brief.md#2
  - text: "The reason for a block or a hold is available to show in the app."
    source: brief.md#2
  - text: "Owners check the wallet on their phone, after work or when a payout is due."
    source: brief.md#2
unknowns:
  - "Success metric — baseline and target are both UNKNOWN"
  - "PM of record — the designer opened this; no PM"
  - text: "Who owns wallet design"
    owner: "Design → Finance"
  - text: "What the current wallet home shows — not reviewed"
    owner: "Design"
  - text: "How many support contacts are about balance, payouts, or the wallet"
    owner: "Support / data"
    blocks: "Success metric"
  - text: "Which markets have the wallet beyond the first two"
    owner: "Finance"
  - text: "Does the wallet receive the reason for a block or hold from the payment provider?"
    owner: "Finance"
    blocks: "Job story 1"
  - text: "Are the missing transactions a data problem?"
    owner: "Finance"
evidence:
  - text: "Providers call support when the wallet shows blocked with no reason or next step."
    source: findings.md#2026-10-15
  - text: "About 41% of providers open the wallet at least once a month."
    source: brief.md#2
  - text: "PRD approved 2026-10-15. The unknowns were carried, not closed."
    source: decisions.md#2026-10-15
parked:
  - "Balance as the hero, copied from a consumer-bank home. Hero is Next payout; the Available card was dropped."
```

- **Feature/surface:** Northline Wallet home — the provider's money screen in Northline Studio (balance, payouts, transactions)
- **Platform:** mobile app (iOS) and desktop web
- **Stage:** discovery
- **Sources:** none named by the designer; Slack sweep + Monzo teardown (see `findings.md` 2026-10-15). Jira and Confluence not checked.
- **Requested by:** the designer (own initiative, no PM)
- **Date opened:** 2026-10-15

## Ownership (structured — feeds the Team Gallery, `#/gallery`)

- **Designer:** unassigned
- **Squad:**
- **Gallery:** visible

Squad left blank: wallet design ownership is unknown (see §1).

## Case study summary (feeds the Team Gallery — keep this short and clean)

- **Problem:** Providers can't tell from Northline Wallet how much money is theirs, when it arrives, or why it's held, so they call support.
- **Goal:** A wallet home that answers "how much, when, and why" at a glance.

## Intent

"I want to build a dashboard view for mobile banking." Framed at kickoff as the app's home screen — balances, recent activity and quick actions at a glance — then, after the Slack sweep, as the Northline Wallet home.

---

# PRD — Northline Wallet home

**Author:** designer + agent · **Date:** 2026-10-15
**Sources swept:** Confluence — not connected · Jira — not connected · Slack — 4 searches, ~20 relevant threads · Figma — none found · Miro — none found · workload snapshot — not run (needs Jira) · Monzo teardown via Mobbin — 2026-10-15

## The three questions

- **Why are we doing this?** Providers who use Northline Pay repeatedly call support to ask where their money is: a wallet marked "blocked" with no reason, balances and pending payouts that change without explanation, payments missing from the wallet. Source: #signal-studio-feedback call summaries, Aug–Oct 2026.
- **What problem does it solve, and for whom?** Owners and managers using Northline Pay can't see, in one place, what they've earned, what's held and why, and when it reaches their bank. Source: same, plus job stories in §3.
- **How will we know it worked?** UNKNOWN — no baseline yet. Candidate: fewer support contacts about balance, payouts and the wallet per active wallet user. Needs a support-data pull before this is a real metric.

## 1. Existing work & ownership

Leg A (workload-agent) **did not run**: Jira isn't connected in this session, so roadmap and DES/UXR tickets are unknown.

What Slack shows instead:

| Work | Team / person | Status | Source |
|---|---|---|---|
| Northline Wallet product + wallet-api | Finance team | Live (two markets) | #finance 2026 |
| Wallet entry point on the new profile screen | Profile squad | In build | Slack 2026-10-05 |
| iOS wallet work: receipt navigation, restricted-access guard | iOS payments team | Shipping | #ios-payments 2026-09-22, 2026-09-29 |
| Checkout-tab settings menu A/B test (balance and payouts move under Payment settings) | Experimentation | Running | #experiments 2026-09-07 |
| Payout threshold vs daily payouts | Payments finance | Being sized | #payouts-policy 2026-09-24 |

- **Aligned:** unknown without Jira.
- **Roadmap without design ticket yet:** unknown.
- **Design without obvious roadmap parent:** this project, until checked.
- **Recommendation for this kickoff:** coordinate with Finance before any design — they own the wallet, and design ownership for it wasn't found.

## 2. Problem & evidence

What we KNOW:
- Northline Wallet began as a pilot described as "kind of mobile banking for Northline Pay", to make the money flow through Northline clearer — #product, 2025-03-25.
- About 41% of providers open the wallet at least once a month — analytics dashboard, 2026-07-07.
- Providers see their wallet "blocked" with no reason or next step and call support several times — #signal-studio-feedback 2026-10-07, 2026-10-13.
- Balances and pending payouts change or disappear without explanation; negative balances aren't explained — #signal-studio-feedback 2026-10-13, 2026-08-28.
- A deposit can't be traced back to its service, tip and deduction — #signal-studio-feedback 2026-09-29.
- Gift-card and pay-later payments don't show in the wallet — #signal-studio-feedback 2026-10-13; #payments 2026-09-03.
- Refunds and chargebacks: unclear effect on balance and payouts — #signal-studio-feedback 2026-09-25, 2026-10-14.
- The €25 payout minimum confuses providers — #signal-studio-feedback 2026-09-30.
- Changing payout details sends providers to the payment provider's portal or their bank, and they get lost — #signal-studio-feedback 2026-09-15, 2026-10-08.
- Reference pattern: Monzo's home leads with one balance, previews 3 recent transactions, and shows future money (still to pay, next date) beside past money — Mobbin, 2026-10-15.

Assumptions and unknowns are the truth block at the top. They are not repeated here.

## 3. Users & context

Who is this for: owners and managers who take payments through Northline Pay and get paid out to their bank. Evidence of behaviour today: support calls about balances, holds and payouts (§2).
User goal: know how much money is theirs, when it arrives, and what to do when something is wrong.
Business outcome: fewer support contacts about money, and more trust in Northline Pay. Assumed — not stated by an owner.

**Job stories:**

| # | When (situation) | I want to (motivation) | So I can (outcome) | Type | Evidence | Source |
|---|---|---|---|---|---|---|
| 1 | When money I expected isn't where I thought it would be | to see why, and what I can do about it | sort it out without calling support | F / E | Observed | #signal-studio-feedback 2026-10-07, 2026-10-13 |
| 2 | When I finish a day of appointments | to know how much I've earned and when it reaches my bank | plan what I can spend | F | Inferred | #signal-studio-feedback 2026-10-13 |
| 3 | When my bank deposit doesn't match what I charged | to see it split into services, tips, fees and deductions | reconcile my books | F | Observed | #signal-studio-feedback 2026-09-29 |
| 4 | When a client disputes a charge or I give a refund | to see how it changes what I'll be paid | avoid a surprise at payout | F / E | Observed | #signal-studio-feedback 2026-09-25, 2026-10-14 |
| 5 | When a client pays with a gift card or pay-later service | to find that payment | confirm the visit is paid | F | Observed | #signal-studio-feedback 2026-10-13 |
| 6 | When my balance is below the payout minimum | to know when it will be paid | count on that money | F | Observed | #signal-studio-feedback 2026-09-30 |

"Observed" means providers described it in support-call summaries; nobody has watched them use the wallet.

## 4. History

Northline Wallet piloted in March 2025 and is live in 2026. No earlier wallet-home redesign found in Slack. Jira and Confluence unchecked.

## 5. Scope hypothesis

In:
- The wallet home on Northline Studio mobile: available balance, next payout (amount and date), money on hold with the reason and next step, a recent-activity preview, and a way into payout settings. Covers job stories 1, 2 and 6.
- How a single payout breaks down (services, tips, fees, deductions, refunds) — job stories 3 and 4.

Out:
- Payout settings inside the payment provider's portal — owned by the payment provider; only the hand-off into it is in scope.
- Payout policy (minimums, thresholds, frequency) — a business decision already being sized.
- Financing offers, cards, lending.
- Fixing missing gift-card / pay-later transactions — likely a data issue; flagged to Finance, not designed around.
- Northline Studio web and the client app.

Dependencies:
- Finance (wallet owner) — data available to show, design ownership.
- New profile screen wallet entry point — Slack 2026-10-05.
- Checkout-tab settings A/B test — moves balance and payouts settings.
- `account-settings` (app structure) — where the wallet sits in navigation.

## 6. Success metrics

Primary metric: support contacts about balance, payouts or the wallet, per 1,000 active wallet users. Baseline UNKNOWN. Target UNKNOWN.
Guardrails: wallet usage (about 41% of providers, July 2026) doesn't drop; payout-settings completion doesn't drop.

## How we'd know

| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| Outcome | Support contacts about balance, payouts or the wallet per 1,000 active wallet users | unknown | set once the baseline exists | needs instrumentation — a support-tag count |
| UX | Participants can say why money is on hold, and the next step, unaided | — | set before the test | prototype test |
| UX | Time to answer "when is my next payout, and how much?" | — | set before the test | prototype test |
| UX | Participants can match a payout to services, tips, fees and deductions | — | set before the test | prototype test |
| Guardrail | Providers who open the wallet at least once a month | about 41% (2026-07-07) | no drop | tracked — analytics dashboard, 2026-07-07 |
| Guardrail | Payout-settings completion | unknown | set once the baseline exists | needs instrumentation — an analytics event when payout settings is finished |

Status: proposed

## 7. Risks & open questions

The open questions are the truth block's unknowns. Owners and what each one blocks are on that row, from the old risk table. Two beliefs stay assumptions: that a block or hold reason can be shown, and that the cause is presentation rather than missing data.

## 8. Proposed process after approval

Per `design-kickoff` Step 4: check the jobs / objects / strategy flags. Jobs are present (5 Observed). Objects (balance, payout, hold, transaction) aren't modelled yet. Strategy is missing (metric UNKNOWN). So the next step is an AskQuestion: `conceptual-model`, `product-strategy`, `diagnostic`, or skip to screens (`ui-agent` → `icon-usage` → `ux-pattern` → `audit`).

---
**Confluence copy:** none — Confluence isn't connected in this session.

## Constraints

- Product UI from `context/design-system/ds` and tokens only; light mode only.
- Screens go in `projects/mobile-banking-dashboard/screens/` and stay brand-neutral. The project is a public, fictional example (decisions.md 2026-10-15).
- Money data shown must match what the wallet actually holds — no made-up balances in a way that suggests real data.
