import type { Storyboard } from '../../../src/design-harness/storyboard'

const BRIEF = 'Project brief: providers say they can’t tell how much is theirs, when it arrives, or why some of it is held.'
const MODEL = 'Conceptual model: a Payout is made of Transactions and moves through Scheduled, On the way and Arrived.'
const ASSUMED = 'Assumption — sample dates and schedule, not real payout rules yet.'

export const storyboard: Storyboard = {
  title: 'Wallet home · phone',
  subtitle: 'How much, when, and why — in that order',
  screen: 'screens/WalletHomePage.tsx',
  starts: [
    { id: null, label: 'A normal week' },
    { id: 'paused', label: 'Payouts paused', props: { status: 'paused' } },
    { id: 'failed', label: 'Last payout returned', props: { status: 'failed' } },
  ],
  steps: [
    {
      id: 'hero',
      chapter: 'How much and when',
      title: 'The next payout is the headline',
      why: 'The first thing a provider wants is the amount that will reach their bank and the day it lands. One figure with one label — not a balance and a payout that show the same number twice.',
      evidence: BRIEF,
      notes: `The first build led with an Available balance, the Monzo pattern. Review found it and Next payout showing the same €1,284.50 under two labels.

- Rejected: balance first (decisions.md, Review fixes)
- The assumption map flagged copying a personal banking home: a provider's wallet holds income, fees, tips and holds, not spending`,
      targets: [{ selector: '.wallet-home__hero' }],
    },
    {
      id: 'tracker',
      chapter: 'How much and when',
      title: 'Where the payout is right now',
      why: 'Three stages, named the way the model names them. "On the way" covers the gap between leaving and arriving, which is when most "where is my money?" questions start.',
      evidence: MODEL,
      setup: [{ click: { selector: '.wallet-home__hero-hit' } }],
      targets: [{ selector: '.wallet-home__tracker' }],
    },
    {
      id: 'pending',
      chapter: 'What isn’t ready yet',
      title: 'Pending says which payout it joins',
      why: 'Money that isn’t ready yet gets its own amount and the payout it will land in, so it never looks missing from this week’s total.',
      evidence: ASSUMED,
      targets: [{ selector: '[aria-labelledby="wallet-outside-title"]' }],
    },
    {
      id: 'pending-rows',
      chapter: 'What isn’t ready yet',
      title: 'Each payment has its own ready date',
      why: 'A blanket "usually 2 days" was replaced with a date per payment, so a provider can match a client they just served to a day.',
      evidence: ASSUMED,
      notes: `Open question: when does each pending payment really become available? The dates here are sample data until someone confirms the rule.`,
      targets: [
        {
          selector: '.wallet-home__row',
          within: { selector: '[aria-labelledby="wallet-outside-title"]' },
        },
      ],
    },
    {
      id: 'payouts',
      chapter: 'Finding a payment',
      title: 'A payout opens into what it’s made of',
      why: 'Payments, tips, refunds and transaction fees add up to what reached the bank. This is where a provider checks that a tip arrived instead of asking support.',
      evidence: MODEL,
      try: 'tap the 10 Oct payout to open it',
      targets: [{ selector: '.wallet-home__statement', nth: 0 }],
    },
    {
      id: 'settings',
      chapter: 'Finding a payment',
      title: 'Payout Settings in plain sight',
      why: 'The schedule and account are shown as a row with a label, not tucked behind a gear or a ⋮ menu, so changing where money goes never depends on recognising an icon.',
      evidence: 'Design review: hidden affordances is a known anti-pattern for provider tools.',
      notes: `Support-call summaries describe providers getting lost between apps when they change payout details (Sep–Oct 2026).

- Before: a gear icon in the header
- Now: a visible row on the home`,
      targets: [{ selector: '.ds-settings-row', text: 'Payout Settings' }],
    },
    {
      id: 'hold',
      chapter: 'Why some is held',
      title: 'On hold, with the reason one tap away',
      why: 'Held money is listed with what is not in this payout. Opening it says who disputed the payment, what happens next, and by when.',
      evidence: BRIEF,
      notes: `Job story 4: when a client disputes a charge, providers want to see how it changes what they'll be paid.

Open question: does the wallet receive dispute and hold reasons from the payment provider? Without them this sheet can only say "On hold".`,
      setup: [{ click: { selector: '.wallet-home__row--button' } }],
      targets: [{ selector: '.wallet-home__sheet' }],
    },
  ],
}
