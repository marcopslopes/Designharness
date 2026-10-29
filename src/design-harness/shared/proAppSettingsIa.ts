/**
 * Contextual gear menus per bottom tab.
 */
export type ProAppSettingsRow = {
  title: string
  subtitle?: string
}

export type ProAppSettingsSection = {
  label: string
  rows: ProAppSettingsRow[]
}

/** Appointments tab → Calendar settings gear */
export const PRO_APP_CALENDAR_SETTINGS_SECTIONS: ProAppSettingsSection[] = [
  {
    label: 'Availability',
    rows: [
      { title: 'Business hours' },
      { title: 'Breaks' },
      { title: 'Time-off management', subtitle: 'Staff Member Time Off' },
      { title: 'Opening calendar', subtitle: 'Opening Calendar & Shifts' },
      { title: 'Staff working hours', subtitle: 'Staff Member Working Hours' },
    ],
  },
  {
    label: 'Booking rules',
    rows: [
      { title: 'Confirmation', subtitle: 'Automatically confirm bookings' },
      { title: 'Booking window', subtitle: 'Booking Rules' },
      { title: 'Online booking visibility', subtitle: 'Online Booking' },
      { title: 'Calendar color scheme' },
      { title: 'Calendar import' },
    ],
  },
  {
    label: 'Display',
    rows: [{ title: 'Calendar display', subtitle: 'Your calendar settings' }],
  },
]

/**
 * Clients tab gear — Loyalty Program + Custom Forms.
 * (Loyalty Program + Custom Forms). Enable is a toggle in the sheet UI,
 * not a chevron row.
 */
export const PRO_APP_CLIENT_SETTINGS_SECTIONS: ProAppSettingsSection[] = [
  {
    label: 'Loyalty program',
    rows: [
      {
        title: 'Loyalty cards',
        subtitle: 'Manage cards · details · add-edit · pick client',
      },
      {
        title: 'Loyalty settings',
        subtitle: 'Stamp deadline · reward expiration · auto-issue · card design',
      },
      { title: 'Terms & conditions' },
      { title: 'Share loyalty program' },
    ],
  },
  {
    label: 'Custom forms',
    rows: [
      {
        title: 'Custom forms',
        subtitle: 'Same coordinator as Business Details → Custom Forms today',
      },
    ],
  },
]

export const PRO_APP_CLIENT_LOYALTY_SETTINGS_ROWS: ProAppSettingsRow[] = [
  { title: 'Stamp deadline' },
  { title: 'Reward expiration' },
  { title: 'Stamp awarded' },
  { title: 'Free stamps / issue to new client' },
  { title: 'Auto-issue' },
  { title: 'Edit design / score calculation / card design editor' },
]

/**
 * Checkout tab gear — sale-adjacent only.
 * Northline Payments (balance, readers, verification, payouts) live in Business → Wallet.
 */
export const PRO_APP_CHECKOUT_HUB_SECTIONS: ProAppSettingsSection[] = [
  {
    label: 'Checkout',
    rows: [
      { title: 'Payment Methods' },
      { title: 'Tip Settings' },
      { title: 'Tax Settings' },
      { title: 'Platform fee settings' },
      { title: 'Receipt Footer' },
    ],
  },
]

/** @deprecated Prefer PRO_APP_CHECKOUT_HUB_SECTIONS */
export const PRO_APP_CHECKOUT_HUB_ROWS: ProAppSettingsRow[] = PRO_APP_CHECKOUT_HUB_SECTIONS.flatMap((s) => s.rows)

export const PRO_APP_CHECKOUT_PAYMENTS_SETTINGS_ROWS: (ProAppSettingsRow & {
  badge?: 'new' | 'not-verified'
})[] = [
  {
    title: 'Payments Balance',
    subtitle: 'See your available balance and request a payout',
  },
  { title: 'Mobile Payments' },
  { title: 'No-Show Protection' },
  { title: 'Northline Card Reader' },
  { title: 'Tap to Pay on iPhone', badge: 'new' },
  { title: 'All Transactions' },
]

export const PRO_APP_CHECKOUT_ACCOUNT_VERIFICATION_ROWS: ProAppSettingsRow[] = [
  { title: 'Account Verification' },
  { title: 'Account details' },
  { title: 'Payout Settings' },
]

/** @deprecated Prefer hub sections above */
export const PRO_APP_CHECKOUT_SETTINGS_L1: ProAppSettingsSection[] = PRO_APP_CHECKOUT_HUB_SECTIONS

export const PRO_APP_BUSINESS_SETTINGS_SECTIONS: ProAppSettingsSection[] = [
  {
    label: 'Services setup',
    rows: [{ title: 'Services & combo services' }, { title: 'Add-ons' }],
  },
  {
    label: 'Business details',
    rows: [
      { title: 'Business name & info', subtitle: 'Tax info' },
      { title: 'Workplace photos & logo' },
      { title: 'Location & mobile services' },
      { title: 'Amenities' },
      { title: 'Category' },
      { title: 'Health & safety / policies & safety' },
    ],
  },
  {
    label: 'Subscription & billing',
    rows: [
      { title: 'Current subscription / plan' },
      { title: 'Billing details · history · invoices' },
      { title: 'Text messages settings' },
      { title: 'Boost / web views' },
    ],
  },
  {
    label: 'Personal settings',
    rows: [
      { title: 'Notifications' },
      { title: 'Change language' },
      { title: 'Select business' },
      { title: 'Sign-in methods' },
      { title: 'Logout' },
    ],
  },
  {
    label: 'Northline App',
    rows: [
      { title: 'Your data protection' },
      { title: 'Terms of use' },
      { title: 'Privacy policy' },
      { title: 'Delete account' },
      { title: 'Application licenses' },
      { title: 'Rate Northline' },
      { title: 'Analytics consents' },
    ],
  },
]
