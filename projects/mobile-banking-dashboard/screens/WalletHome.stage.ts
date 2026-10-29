import type { Stage } from '../../../src/design-harness/presentation'

const IOS = 'screens/WalletHomePage.tsx'

export const stage: Stage = {
  title: 'Wallet home · research session',
  mode: 'linear',
  items: [
    {
      id: 'how-much',
      name: 'How much is coming, and when?',
      note: 'Job story 2. Do they read Next payout as everything they have? Ask: when will that reach your bank?',
      frame: { screen: IOS },
    },
    {
      id: 'held',
      name: 'Why isn’t all the money in the payout?',
      note: 'Job story 4. Watch for a tap on On hold. Ask what they think happens to the €60.',
      frame: { screen: IOS },
    },
    {
      id: 'paused',
      name: 'Payouts have stopped. What now?',
      note: 'Job story 1. Do they find Confirm identity unprompted? Do they believe the balance is safe?',
      frame: { screen: IOS, props: { status: 'paused' } },
    },
    {
      id: 'returned',
      name: 'Your last payout never arrived.',
      note: 'Job story 1. Do they connect the bigger Next payout with the returned €1,106.40?',
      frame: { screen: IOS, props: { status: 'failed' } },
    },
  ],
}
