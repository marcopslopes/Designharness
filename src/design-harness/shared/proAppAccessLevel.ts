/**
 * Staff access levels.
 *
 * Ladder: Staff < Advanced < Reception < Manager < Owner.
 * Most gates are "this level or higher" (priority >= minimum).
 */

export type ProAppAccessLevel = 'staff' | 'advanced' | 'reception' | 'manager' | 'owner'

export const PRO_APP_ACCESS_LEVELS: {
  id: ProAppAccessLevel
  label: string
  api: string
  priority: number
}[] = [
  { id: 'staff', label: 'Staff', api: 'staff', priority: 0 },
  { id: 'advanced', label: 'Advanced', api: 'advanced', priority: 1 },
  { id: 'reception', label: 'Reception', api: 'reception', priority: 2 },
  { id: 'manager', label: 'Manager', api: 'manager', priority: 3 },
  { id: 'owner', label: 'Owner', api: 'owner', priority: 4 },
]

const PRIORITY: Record<ProAppAccessLevel, number> = {
  staff: 0,
  advanced: 1,
  reception: 2,
  manager: 3,
  owner: 4,
}

export function accessAtLeast(current: ProAppAccessLevel, minimum: ProAppAccessLevel): boolean {
  return PRIORITY[current] >= PRIORITY[minimum]
}

/** Four-tab IA — maps to iOS tab bar enablement (Appointments/Profile always on). */
export type ProAppTabAccessId = 'calendar' | 'clients' | 'checkout' | 'business'

export function isProAppTabVisible(tab: ProAppTabAccessId, level: ProAppAccessLevel): boolean {
  switch (tab) {
    case 'calendar':
    case 'business':
      return true
    case 'clients':
    case 'checkout':
      return accessAtLeast(level, 'advanced')
    default:
      return false
  }
}

/** Business home surface gates for the lab prototype. */
export function businessAccess(level: ProAppAccessLevel) {
  return {
    gift: accessAtLeast(level, 'advanced'),
    bookingSite: accessAtLeast(level, 'reception'),
    settingsGear: accessAtLeast(level, 'manager'),
    stats: accessAtLeast(level, 'manager'),
    wallet: accessAtLeast(level, 'advanced'),
    serviceSetup: accessAtLeast(level, 'manager'),
    scheduleManagement: accessAtLeast(level, 'manager'),
    businessDetails: accessAtLeast(level, 'manager'),
    staffManagement: accessAtLeast(level, 'manager'),
    securitySubscription: level === 'owner',
  }
}

/** Calendar settings rows (iOS CalendarSettingsViewModel). */
export function calendarSettingsAccess(level: ProAppAccessLevel) {
  return {
    calendarImport: accessAtLeast(level, 'advanced'),
    scheduleManagement: accessAtLeast(level, 'manager'),
  }
}
