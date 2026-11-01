import type { Storyboard } from '../../../src/design-harness/storyboard'

const DECISION =
  'Designer decision 2026-11-01: saved payees, with search, Add a recipient, and the account on each row. The amount screen stays out.'

export const storyboard: Storyboard = {
  title: 'Send list · phone',
  subtitle: 'Pick someone you have already paid',
  screen: 'screens/SendListPage.tsx',
  steps: [
    {
      id: 'search',
      chapter: 'Find them',
      title: 'Search by name',
      why: 'The list is people you have already sent money to. Search is how you reach one of them without scrolling a recent group.',
      evidence: DECISION,
      notes: `The other layout put the last three people first and had no search. That one is parked: it put a repeat payment in reach without typing.

- A flat list was picked
- Typing part of a name keeps only the matches`,
      try: 'type a name',
      targets: [{ selector: '.ds-field' }],
    },
    {
      id: 'add',
      chapter: 'Find them',
      title: 'Add a recipient stays on this screen',
      why: 'Someone new is a short form over the list, not another page. Done stays off until both the name and the account are filled.',
      evidence: 'Assumption — the mobile system uses a form sheet for a short add, not a new page. Not tested with anyone yet.',
      try: 'tap Add a recipient',
      setup: [{ click: { selector: '.ds-settings-row', text: 'Add a recipient' } }],
      targets: [{ selector: '.ds-sheet' }],
    },
    {
      id: 'row',
      chapter: 'The account',
      title: 'The account is on the row',
      why: 'You can tell Maya Chen’s current account from Priya Natarajan’s savings without opening a payment. Tapping a row does not start an amount.',
      evidence: DECISION,
      targets: [{ selector: '.ds-settings-row', text: 'Maya Chen' }],
    },
  ],
}
