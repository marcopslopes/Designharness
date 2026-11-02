import type { Storyboard } from '../../../src/design-harness/storyboard'

const TRIP_COM =
  'sources.md — Trip.com itinerary: a starting point, a destination, and how flexible the trip is, then AI Recommendations.'
const DECISION =
  'decisions.md, 2026-11-02 — the first screen is the itinerary, with those three inputs summarized so they can be changed.'
const ASSUMED = 'Assumption — the day-by-day list is a sample. The Trip.com reference showed the ask, not this result.'

export const storyboard: Storyboard = {
  title: 'Itinerary · phone',
  subtitle: 'The first plan, and the facts it came from',
  screen: 'screens/ItineraryPage.tsx',
  steps: [
    {
      id: 'facts',
      chapter: 'The plan',
      title: 'From, dates, and how many days',
      why: 'The traveler already knows where they are leaving from, where they are going, and how flexible the dates are. Those facts sit on the plan instead of on a form in front of it.',
      evidence: TRIP_COM,
      targets: [{ selector: '.ds-header__stats' }],
    },
    {
      id: 'change',
      chapter: 'The plan',
      title: 'Change stays on this screen',
      why: 'Editing the three facts is a sheet over the plan, so the itinerary stays in place. The ask screen, with AI Recommendations and Create Manually before any plan, was not the first screen.',
      evidence: DECISION,
      try: 'change the destination',
      targets: [{ selector: '.travel-itinerary__change' }],
    },
    {
      id: 'days',
      chapter: 'The days',
      title: 'A first pass, one day still open',
      why: 'The plan is something they can read immediately. The last day stays unfixed because the dates were flexible. The shape of these days is a sample, not a claim about how generation should work.',
      evidence: ASSUMED,
      targets: [{ selector: '.travel-itinerary__list' }],
    },
  ],
}
