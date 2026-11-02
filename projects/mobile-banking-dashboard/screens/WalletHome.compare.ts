import type { Compare } from '../../../src/design-harness/presentation'

const IOS = 'screens/WalletHomePage.tsx'

export const compare: Compare = {
  title: 'Wallet home · compared',
  subtitle: 'The choices behind the screen, side by side',
  comparisons: [
    {
      id: 'lead',
      title: 'What leads the screen',
      question: 'Should the home open on the balance or on the next payout?',
      frames: [
        {
          label: 'Balance first',
          frame: { screen: IOS, props: { lead: 'balance' } },
          note: 'Available and Next payout show the same €1,284.50 — two labels for one figure.',
        },
        {
          label: 'Next payout first',
          frame: { screen: IOS },
          note: 'One figure, with the day it lands and where it is now.',
          chosen: true,
        },
      ],
      source: 'decisions.md — 2026-10-15, Review fixes',
    },
    {
      id: 'states',
      title: 'When something’s wrong',
      question: 'Is the reason and the next step clear in each state?',
      frames: [
        { label: 'Payouts paused', frame: { screen: IOS, props: { status: 'paused' } } },
        { label: 'Failed payout', frame: { screen: IOS, props: { status: 'failed' } } },
        { label: 'Not set up', frame: { screen: IOS, props: { status: 'not-set-up' } } },
      ],
      source: 'brief.md — job story 1',
    },
    {
      id: 'directions',
      title: 'Ways to make the home clearer',
      question: 'Which home makes it easier to see where your money is, and what to do next?',
      frames: [
        {
          label: 'Today',
          frame: { screen: IOS, props: { direction: 'today' } },
          note: 'The previous home.',
        },
        {
          label: 'Payout is the page',
          frame: { screen: IOS, props: { direction: 'payout' } },
          note: "The payout opens as its own page, with fees and refunds. Providers can't match a payout to what they charged.",
          chosen: true,
        },
        {
          label: 'The hold leads',
          frame: { screen: IOS, props: { direction: 'hold' } },
          note: 'On hold moves above the payout and opens as a page. Providers call when a hold has no next step.',
        },
        {
          label: 'One list by Friday',
          frame: { screen: IOS, props: { direction: 'fridays' } },
          note: 'Money is grouped by the Friday it lands. Providers want to know when a payout reaches the bank.',
        },
      ],
      source: 'decisions.md 2026-11-02 — Go wide: wallet home',
    },
  ],
}
