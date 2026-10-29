import type { Ideas } from '../../../src/design-harness/presentation'

const IOS = 'screens/WalletHomePage.tsx'

export const ideas: Ideas = {
  title: 'Wallet home · ideas',
  subtitle: 'The options the case study weighs, each live',
  items: [
    {
      id: 'payout-first',
      title: 'Next payout as the headline',
      group: 'What leads the screen',
      frame: { screen: IOS },
      prompt: 'How might we answer “how much, and when?” in one look?',
      notes: [
        { title: 'The idea', body: 'One figure with the day it lands and where it is now. Pending and On hold sit underneath it.' },
        { title: 'Status', body: 'Chosen in review. Source: decisions.md 2026-10-15, Review fixes.' },
      ],
    },
    {
      id: 'balance-first',
      title: 'Balance first, then the payout',
      group: 'What leads the screen',
      frame: { screen: IOS, props: { lead: 'balance' } },
      prompt: 'Does an Available balance on top, the usual banking-app pattern, work for a provider?',
      notes: [
        { title: 'The idea', body: 'An Available card first, with Next payout below it.' },
        {
          title: 'Status',
          body: 'Rejected. Both cards show €1,284.50 under two labels, which reads as the same money twice. Source: decisions.md 2026-10-15, Review fixes.',
        },
      ],
    },
    {
      id: 'paused',
      title: 'Paused: the reason and the next step first',
      group: 'When something’s wrong',
      frame: { screen: IOS, props: { status: 'paused' } },
      prompt: 'How might we stop “where is my money?” when payouts are stopped?',
      notes: [
        { title: 'The idea', body: 'An alert on top says why payouts stopped and what to do. The balance stays visible.' },
        { title: 'Status', body: 'Built. Source: decisions.md 2026-10-15, Review fixes.' },
      ],
    },
    {
      id: 'failed',
      title: 'Failed: the money comes back',
      group: 'When something’s wrong',
      frame: { screen: IOS, props: { status: 'failed' } },
      prompt: 'How might we show that a returned payout isn’t lost?',
      notes: [
        { title: 'The idea', body: 'The returned amount is added back into the next payout, and the alert asks for new bank details.' },
        { title: 'Status', body: 'Built. Source: decisions.md 2026-10-15, Review fixes.' },
      ],
    },
    {
      id: 'not-set-up',
      title: 'Not set up: a path, not an empty balance',
      group: 'When something’s wrong',
      frame: { screen: IOS, props: { status: 'not-set-up' } },
      prompt: 'What should a provider without a bank account see?',
      notes: [
        { title: 'The idea', body: 'Three steps to getting paid and one button, instead of €0.00 everywhere.' },
        { title: 'Status', body: 'Built. Source: decisions.md 2026-10-15, Review fixes.' },
      ],
    },
  ],
}
