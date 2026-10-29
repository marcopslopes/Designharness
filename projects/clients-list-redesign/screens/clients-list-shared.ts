/**
 * Shared clients-list prototype data — a relationship manager's client book at a bank.
 * Used by the desktop page, the phone page and the layout-fork comparison.
 */

export type ClientSegment = 'all' | 'premium' | 'new' | 'dormant'

export const SEGMENTS: { id: ClientSegment; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'premium', label: 'Premium' },
  { id: 'new', label: 'New' },
  { id: 'dormant', label: 'Dormant' },
]

export type Client = {
  name: string
  initials: string
  /** The products the client holds with the bank, e.g. "Mortgage · Savings". */
  products: string
  lastContact: string
  segment: Exclude<ClientSegment, 'all'>
}

export const CLIENTS: Client[] = [
  {
    name: 'Patricia Taylor',
    initials: 'PT',
    products: 'Private banking · Investments',
    lastContact: '2 days ago',
    segment: 'premium',
  },
  {
    name: 'Michael Brown',
    initials: 'MB',
    products: 'Mortgage · Investments',
    lastContact: '1 week ago',
    segment: 'premium',
  },
  { name: 'Jack Doe', initials: 'JD', products: 'Current account', lastContact: 'Today', segment: 'new' },
  { name: 'Elena Novak', initials: 'EN', products: 'Current account · Savings', lastContact: 'Today', segment: 'new' },
  { name: 'Marcus Lee', initials: 'ML', products: 'Savings', lastContact: '7 months ago', segment: 'dormant' },
  { name: 'Sofia Ramirez', initials: 'SR', products: 'Mortgage', lastContact: '9 months ago', segment: 'dormant' },
]

export type ClientsListLayout = 'card-container' | 'flat-dividers' | 'per-row-cards'

export const LAYOUT_FORK_OPTIONS: { id: ClientsListLayout; label: string }[] = [
  { id: 'card-container', label: 'Single card, rows with dividers' },
  { id: 'flat-dividers', label: 'Flat row list with hairline dividers' },
  { id: 'per-row-cards', label: 'Individual card per client row' },
]

export function segmentBadgeTone(segment: Client['segment']): 'brand' | 'success' | 'neutral' {
  switch (segment) {
    case 'premium':
      return 'brand'
    case 'new':
      return 'success'
    case 'dormant':
      return 'neutral'
    default: {
      const _exhaustive: never = segment
      return _exhaustive
    }
  }
}

export function segmentBadgeLabel(segment: Client['segment']): string {
  return SEGMENTS.find((s) => s.id === segment)?.label ?? segment
}

export function countBySegment(clients: Client[] = CLIENTS): Record<ClientSegment, number> {
  const counts: Record<ClientSegment, number> = { all: clients.length, premium: 0, new: 0, dormant: 0 }
  for (const c of clients) counts[c.segment] += 1
  return counts
}
