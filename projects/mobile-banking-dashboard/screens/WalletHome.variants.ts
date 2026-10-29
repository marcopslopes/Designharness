import type { Variants } from '../../../src/design-harness/presentation'

const SCREEN = 'screens/WalletHomePage.tsx'

export const variants: Variants = {
  title: 'Wallet home · variants',
  subtitle: 'One screen, every state — switch and compare',
  sections: [
    {
      label: 'Content',
      controls: [
        {
          id: 'status',
          label: 'State',
          options: [
            { id: 'active', label: 'Active' },
            { id: 'paused', label: 'Paused' },
            { id: 'failed', label: 'Failed' },
            { id: 'not-set-up', label: 'Not set up' },
          ],
          default: 'active',
          note: 'Paused and Failed keep the balance visible and put the reason first.',
        },
        {
          id: 'lead',
          label: 'What leads',
          options: [
            { id: 'payout', label: 'Next payout' },
            { id: 'balance', label: 'Balance' },
          ],
          default: 'payout',
          note: 'Decided: Next payout. Balance-first showed €1,284.50 twice and was dropped in review.',
        },
      ],
    },
  ],
  frame: (v) => ({
    screen: SCREEN,
    props: { status: v.status, lead: v.lead },
  }),
  note: (v) => {
    if (v.status === 'not-set-up' && v.lead === 'balance')
      return 'Not set up has no balance or payout yet, so What leads changes nothing here.'
    if (v.lead === 'balance') return 'Showing the rejected direction — for comparison, not for build.'
    return undefined
  },
}
