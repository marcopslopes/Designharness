import type { ReactNode } from 'react'
import {
  IconBuildingStore,
  IconCalendar,
  IconCalendarFilled,
  IconCoins,
  IconIdBadge2,
  IconReceipt,
  IconSpeakerphone,
  IconUser,
  IconUsers,
} from '@tabler/icons-react'
import { Icon, type TablerIconComponent } from '../../../context/design-system/ds'
import type { PhoneTab } from './PhoneShell'
import { isProAppTabVisible, type ProAppAccessLevel } from './proAppAccessLevel'

export type ProAppTabId = 'calendar' | 'clients' | 'checkout' | 'business' | 'profile'

/** Prod bottom nav tab ids (5 tabs — pre phase-2 nav). */
export type TodayProTabId = 'appointments' | 'clients' | 'checkout' | 'marketing' | 'profile'

const PRO_APP_TABS: { id: Exclude<ProAppTabId, 'profile'>; label: string }[] = [
  { id: 'calendar', label: 'Today' },
  { id: 'clients', label: 'Clients' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'business', label: 'Business' },
]

const TODAY_PRO_APP_TABS: { id: TodayProTabId; label: string }[] = [
  { id: 'appointments', label: 'Appointments' },
  { id: 'clients', label: 'Clients' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'profile', label: 'Profile' },
]

/** Tab bar glyphs — filled active only when Tabler ships `Icon{Name}Filled` for the same outline. */
const PRO_APP_TAB_ICON_SET: Record<ProAppTabId, { outline: TablerIconComponent; filled: TablerIconComponent }> = {
  calendar: { outline: IconCalendar, filled: IconCalendarFilled },
  clients: { outline: IconIdBadge2, filled: IconIdBadge2 },
  checkout: { outline: IconCoins, filled: IconCoins },
  business: { outline: IconBuildingStore, filled: IconBuildingStore },
  profile: { outline: IconUser, filled: IconUser },
}

function proAppTabIcon(tabId: ProAppTabId, active: boolean) {
  const set = PRO_APP_TAB_ICON_SET[tabId]
  const glyph = active ? set.filled : set.outline
  return <Icon icon={glyph} size="lg" stroke={active && glyph === set.outline ? 2 : undefined} />
}

export function buildProAppPhoneTabs(
  activeTab: ProAppTabId,
  onTabChange: (id: ProAppTabId) => void,
  options?: {
    accessLevel?: ProAppAccessLevel
    includeProfileTab?: boolean
    /** Staff lab override — show Checkout even when accessLevel is staff. */
    checkoutOverride?: boolean
    labels?: Partial<Record<ProAppTabId, string>>
  },
): PhoneTab[] {
  const accessLevel = options?.accessLevel ?? 'owner'
  const labels = options?.labels
  const tabs: { id: ProAppTabId; label: string }[] = [
    ...PRO_APP_TABS.filter((t) => {
      if (t.id === 'checkout' && options?.checkoutOverride && accessLevel === 'staff') {
        return true
      }
      return isProAppTabVisible(t.id, accessLevel)
    }).map((t) => ({
      id: t.id,
      label: labels?.[t.id] ?? t.label,
    })),
    ...(options?.includeProfileTab ? [{ id: 'profile' as const, label: labels?.profile ?? 'Profile' }] : []),
  ]
  return tabs.map((t) => ({
    id: t.id,
    label: t.label,
    icon: proAppTabIcon(t.id, activeTab === t.id),
    active: activeTab === t.id,
    onClick: () => onTabChange(t.id),
  }))
}

const TODAY_PRO_APP_TAB_ICONS: Record<TodayProTabId, ReactNode> = {
  appointments: <Icon icon={IconCalendar} size="md" />,
  clients: <Icon icon={IconUsers} size="md" />,
  checkout: <Icon icon={IconReceipt} size="md" />,
  marketing: <Icon icon={IconSpeakerphone} size="md" />,
  profile: <Icon icon={IconBuildingStore} size="md" />,
}

/** Prod bottom nav — Appointments · Clients · Checkout · Marketing · Profile. */
export function buildTodayProPhoneTabs(activeTab: TodayProTabId, onTabChange: (id: TodayProTabId) => void): PhoneTab[] {
  return TODAY_PRO_APP_TABS.map((t) => ({
    id: t.id,
    label: t.label,
    icon: TODAY_PRO_APP_TAB_ICONS[t.id],
    active: activeTab === t.id,
    onClick: () => onTabChange(t.id),
  }))
}
