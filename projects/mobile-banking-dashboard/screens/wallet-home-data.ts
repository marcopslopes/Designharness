/** Wallet home sample data and money formatting. */

export type PayoutStage = 'scheduled' | 'on-the-way' | 'arrived'

/** `paused` = payouts stopped until the provider acts; `failed` = the bank returned the last payout. */
export type WalletStatus = 'active' | 'paused' | 'failed' | 'not-set-up'

export type WalletTransaction = {
  id: string
  kind: 'Payment' | 'Tip' | 'Refund'
  client: string
  service?: string
  amount: number
  readyOn: string
}

export type PastPayout = {
  id: string
  date: string
  status: 'arrived' | 'returned'
  amount: number
  transactionCount: number
  breakdown: { label: string; amount: number }[]
}

export type WalletHomeData = {
  status: WalletStatus
  /** Money that goes out in the next payout. */
  available: number
  pending: number
  onHold: number
  nextPayout: { date: string; stage: PayoutStage; account: string; schedule: string }
  /** The payout after next — where pending money lands. */
  followingPayoutDate: string
  hold: { client: string; service: string; date: string; amount: number; decisionBy: string } | null
  pendingTransactions: WalletTransaction[]
  payouts: PastPayout[]
}

export const WALLET_HOME_DATA: WalletHomeData = {
  status: 'active',
  available: 1284.5,
  pending: 342,
  onHold: 60,
  nextPayout: { date: 'Fri, 17 Oct', stage: 'scheduled', account: '•••• 4821', schedule: 'Every Friday' },
  followingPayoutDate: '24 Oct',
  hold: { client: 'Sofia Moreno', service: 'Invoice 1842', date: '9 Oct', amount: 60, decisionBy: '24 Oct' },
  pendingTransactions: [
    { id: 'p1', kind: 'Payment', client: 'Emma Wilson', service: 'Invoice 1904', amount: 180, readyOn: 'Sat, 18 Oct' },
    { id: 'p2', kind: 'Payment', client: 'Chris Park', service: 'Consulting', amount: 95, readyOn: 'Sat, 18 Oct' },
    { id: 'p3', kind: 'Tip', client: 'Chris Park', amount: 15, readyOn: 'Sat, 18 Oct' },
    { id: 'p4', kind: 'Payment', client: 'Maya Chen', service: 'Workshop', amount: 52, readyOn: 'Mon, 20 Oct' },
  ],
  payouts: [
    {
      id: 'po-10-oct',
      date: 'Fri, 10 Oct',
      status: 'arrived',
      amount: 1106.4,
      transactionCount: 28,
      breakdown: [
        { label: 'Payments', amount: 1152 },
        { label: 'Tips', amount: 48 },
        { label: 'Refunds', amount: -60 },
        { label: 'Transaction fees', amount: -33.6 },
      ],
    },
    {
      id: 'po-3-oct',
      date: 'Fri, 3 Oct',
      status: 'arrived',
      amount: 987.1,
      transactionCount: 25,
      breakdown: [
        { label: 'Payments', amount: 1004 },
        { label: 'Tips', amount: 36 },
        { label: 'Refunds', amount: -23 },
        { label: 'Transaction fees', amount: -29.9 },
      ],
    },
  ],
}

const WALLET_STATUSES: WalletStatus[] = ['active', 'paused', 'failed', 'not-set-up']

/**
 * The sample wallet in a given state. `failed` also marks the last payout as returned and puts its
 * money back into the next one. Unknown values (from a URL) fall back to the data as given.
 */
export function walletDataFor(status: string | undefined, data: WalletHomeData = WALLET_HOME_DATA): WalletHomeData {
  if (!status || !WALLET_STATUSES.includes(status as WalletStatus) || status === data.status) return data
  if (status !== 'failed') return { ...data, status: status as WalletStatus }
  const [last, ...earlier] = data.payouts
  return {
    ...data,
    status: 'failed',
    available: data.available + last.amount,
    payouts: [{ ...last, status: 'returned' }, ...earlier],
  }
}

/** What leads the home: the next payout (chosen), or an Available balance card above it (first build, rejected). */
export type WalletLead = 'payout' | 'balance'

export const STAGES: { id: PayoutStage; label: string }[] = [
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'on-the-way', label: 'On the way' },
  { id: 'arrived', label: 'Arrived' },
]

export function formatMoney(amount: number, signed = false) {
  const abs = Math.abs(amount).toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  if (!signed) return `€${abs}`
  return amount < 0 ? `−€${abs}` : `+€${abs}`
}
