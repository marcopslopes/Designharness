import type { Storyboard } from '../../../src/design-harness/storyboard'

const BRIEF =
  'Brief assumption: most home visits are a quick check of balance and recent activity, and promos on the home slow that check down.'
const DECISION = 'Designer decision 2026-11-01: one balance, Add money / Send / Card, then the last five transactions grouped by day.'

export const storyboard: Storyboard = {
  title: 'Banking home · phone',
  subtitle: 'How much, then what just happened',
  screen: 'screens/BankingHomePage.tsx',
  steps: [
    {
      id: 'balance',
      chapter: 'At a glance',
      title: 'The balance is the first thing',
      why: 'The home exists so someone can say how much they have without hunting past product tiles. One figure, labelled Available, on the current account.',
      evidence: BRIEF,
      targets: [{ selector: '.everyday-home__hero' }],
    },
    {
      id: 'actions',
      chapter: 'At a glance',
      title: 'Three actions, not a menu',
      why: 'Add money, Send and Card are the moves that follow a balance check. They sit under the figure so they do not compete with it.',
      evidence: DECISION,
      targets: [{ selector: '.ds-action-grid' }],
    },
    {
      id: 'recent',
      chapter: 'What just happened',
      title: 'Five transactions, grouped by day',
      why: 'The second question is what just happened. The last five rows, split into Today and Yesterday, answer it without opening another screen. See all has no list of its own yet.',
      evidence: DECISION,
      notes: `One merchant name is long on purpose (Borough Market Coffee Roasters) so the row has to wrap.

- See all is on the screen and does not go anywhere yet
- Savings and other accounts are not on this home`,
      targets: [{ selector: '.everyday-home__activity' }],
    },
    {
      id: 'row',
      chapter: 'What just happened',
      title: 'A row opens as a sheet',
      why: 'The detail of one payment is a short task, so it stays over the home instead of pushing a new page. Done, or the dimmed area, closes it.',
      evidence: 'Assumption — the mobile system uses a sheet for a self-contained detail. Not tested with anyone yet.',
      try: 'tap a transaction',
      setup: [{ click: { selector: '.everyday-home__row' } }],
      targets: [{ selector: '.ds-sheet-detail' }],
    },
  ],
}
