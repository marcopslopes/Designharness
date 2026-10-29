# Nobody asked for a dashboard

*Draft — needs your edit pass before publishing.*

*Northline is a fictional company invented for this harness. Every name, number and quote here is made up.*

The brief I gave myself was one line: "I want to build a dashboard view for mobile banking." I pictured the usual home screen, with balances, recent activity and quick actions. One search through Slack later, the job was smaller and more useful. Providers on Northline didn't need a dashboard. They needed to know where their money was.

## What providers kept saying

Northline Wallet already existed. It started in March 2025 as a pilot that a colleague in #product described as "kind of mobile banking for Northline Pay", and by 2026 it was live in two markets. The analytics dashboard in July 2026 showed about 41% of providers opening it at least once a month.

The support-call summaries in #signal-studio-feedback told the other half of the story. Between August and October 2026 the same complaints kept coming back:

- The wallet showed "blocked" with no reason and no next step, and providers called support more than once about it.
- Balances and pending payouts changed or disappeared without explanation.
- A tip and a deduction couldn't be traced on the payout screen.
- Gift-card and pay-later payments didn't show up in the wallet.
- Nobody could tell how a refund or a chargeback would change the next payout.
- The €25 payout minimum confused people.
- Changing payout details sent providers to the payment provider's portal or their bank, and they got lost between apps.

None of these is a request for a dashboard. Each one is a version of the same three questions: how much of this is mine, when do I get it, and why is some of it stuck? That became the goal in the brief: a wallet home that answers "how much, when, and why" at a glance.

These are call summaries, not quotes, and nobody has watched a provider use the wallet. I also don't know how many support contacts are about money. The evidence shows the problem exists. It doesn't show how big it is.

## Taking a pattern without copying it

For reference I looked at Monzo's home screen. It leads with one large balance, previews three recent transactions, and shows money still to come next to money already spent. That last idea transferred well, because a provider plans around money that hasn't arrived yet.

The rest needed more care. Monzo is a personal account. A provider's wallet holds income, fees, tips, refunds, holds and payouts, and the balance isn't always the number that matters most. Before drawing anything I wrote a conceptual model of the objects involved: wallet, transaction, payout, hold and payout method. It also fixed the vocabulary. The screens say "Payout", never "deposit", and "On hold" or "Payouts paused" instead of "blocked", because "blocked" says something is wrong without saying what.

## What the first version got wrong

My first build followed Monzo more closely than it should have. An "Available" card sat at the top, with the next payout underneath it. The review pass caught the problem: both showed €1,284.50 under two different labels. A provider reading that screen has every reason to ask whether it's the same money twice.

That turned out to be a question about objects, not layout. Was "Available" anything more than the next payout so far? On this screen it wasn't. So I removed the card and made the next payout the hero: the amount, the date, and a tracker that moves from Scheduled to On the way to Arrived. Pending money and money on hold sit underneath it.

The second miss was payout settings. They hid behind a gear icon. Providers already get lost changing their payout details, so hiding the way in made the hardest task harder. Payout settings are now a visible row, showing the schedule and the account.

## The direction

The wallet home now opens on the next payout. Every hold is one tap from its reason: which payment was disputed, when, what happens next, and by when a decision is due. Past payouts expand into their breakdown, transaction fees included, so a provider can match a bank payment to what they charged.

The prototype is the iOS wallet home. Three states cover the moments when something is wrong, and each one gives a reason and a next step: payouts paused until the provider confirms their identity, a payout the bank returned, and a wallet with no payout account yet.

An Android screen was built and then removed: it was the same body inside the iPhone frame. The prototype now has the iOS home, the three states, and a seven-step storyboard. Every amount, date and name in it is sample data.

## What isn't known yet

Nothing has shipped and nothing has been measured. The metric in the brief is support contacts about balance, payouts or the wallet per 1,000 active wallet users. There's no baseline and no target until someone pulls the support data.

Whether this direction works depends on one question more than any other: does the wallet actually receive the reason for a hold or a pause from the payment provider? If it does, the home can answer "why", and providers have one less reason to call. If it only knows "paused", the screen can show the pause clearly but still can't explain it. Until someone answers that, the paused and failed-payout states use placeholder reasons.

Four more questions are open:

- The team that owns the wallet hasn't seen this work, and nobody has confirmed who owns wallet design. This could duplicate or clash with work already underway.
- The missing gift-card and pay-later payments may be a data problem that no screen can fix.
- When each pending payment becomes available is still sample data. The real rule isn't known.

The wallet home also has a desktop page: the same navigation down the left of a browser window. Next payout, pending, and on hold sit in a row. Pending payments are a table, and past payouts run full width.

The first step is a conversation with the wallet team, not more screens.

---
**Sources used:** `projects/mobile-banking-dashboard/case-study.md`, built from `brief.md`, `findings.md` (2026-10-15: research sweep, Monzo teardown, conceptual model, ux-pattern review, states and fixes, storyboard), `decisions.md` (2026-10-15), `conceptual-model.md`, `log.md`. The €1,284.50 figure comes from the prototype's sample data.
**Anti-slop pass:** run against `references/slop-patterns.md` and `harness/references/anti-ai-writing.md`.
**Still needs:** your voice in at least one section (written in first person from your own brief and decisions). The last line ("a conversation with the wallet team, not more screens") is an editorial call based on brief §1, which recommends coordinating with the wallet owner before design; keep it or cut it. Colleagues appear by role only. Everything is fictional (Northline).
