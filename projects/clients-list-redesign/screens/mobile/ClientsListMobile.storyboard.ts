import type { Storyboard } from '../../../../src/design-harness/storyboard'

const ASSUMED = 'Assumption — kickoff not run. See the project context for what still needs checking.'

export const storyboard: Storyboard = {
  title: 'Clients list · phone',
  subtitle: 'What is on screen and why',
  screen: 'screens/mobile/ClientsListMobilePage.tsx',
  steps: [
    {
      id: 'counts',
      chapter: 'At a glance',
      title: 'Counts before names',
      why: 'The first line says how big the book is and how many clients are new this week, so the manager knows if anything changed before reading a single row.',
      evidence: ASSUMED,
      targets: [{ selector: 'p', text: 'total ·' }],
    },
    {
      id: 'search',
      chapter: 'At a glance',
      title: 'Search sits on top',
      why: 'Most visits are likely to be about one person — a client just called — so finding them by name comes before browsing.',
      evidence: ASSUMED,
      try: 'type a name',
      targets: [{ selector: '.nav-profile__search' }],
    },
    {
      id: 'segments',
      chapter: 'Segments',
      title: 'Three segments, each with a count',
      why: 'Premium, New and Dormant split the book by what the manager should do next, not by product. The counts show where the work is without opening each tab.',
      evidence: ASSUMED,
      targets: [{ selector: '.nav-profile__segmented' }],
    },
    {
      id: 'dormant',
      chapter: 'Segments',
      title: 'Dormant: no contact in 6+ months',
      why: 'These are the clients most likely to move their money without saying anything. Putting them one tap away makes the quiet ones visible.',
      evidence: ASSUMED,
      setup: [{ click: { selector: '.nav-profile__segmented-btn', text: 'Dormant' } }],
      targets: [{ selector: '.nav-profile__client-list' }],
    },
    {
      id: 'row',
      chapter: 'Segments',
      title: 'Every row says when you last spoke',
      why: 'Last contact is the one fact that decides whether to call. The segment badge repeats it as a label, so the row reads without opening the client.',
      evidence: ASSUMED,
      targets: [{ selector: '.nav-profile__client-row' }],
    },
    {
      id: 'tip',
      chapter: 'Nudges',
      title: 'A check-in tip, only when it applies',
      why: 'The tip appears only if there are dormant clients, and suggests one small step — a short check-in — rather than a campaign.',
      evidence: ASSUMED,
      targets: [{ selector: '.ds-card', text: 'Check in with dormant clients' }],
    },
    {
      id: 'assistant',
      chapter: 'Nudges',
      title: 'An assistant instead of a + button',
      why: 'Adding clients is rare for a manager — clients are assigned. The floating button is kept for help drafting check-ins instead. What it does is not designed yet.',
      evidence: ASSUMED,
      targets: [{ selector: '.nav-profile__fab' }],
    },
  ],
}
