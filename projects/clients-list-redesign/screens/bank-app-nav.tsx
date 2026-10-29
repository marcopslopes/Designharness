import { IconChartBar, IconHome, IconMessageCircle, IconUsers } from '@tabler/icons-react'
import { Icon } from '../../../context/design-system/ds'
import type { PhoneTab } from '../../../src/design-harness/shared/PhoneShell'

/** The relationship manager app's main sections — the phone tab bar and the desktop side nav. */
const BANK_APP_SECTIONS = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'clients', label: 'Clients', icon: IconUsers },
  { id: 'pipeline', label: 'Pipeline', icon: IconChartBar },
  { id: 'inbox', label: 'Inbox', icon: IconMessageCircle },
] as const

export function bankAppTabs(active: (typeof BANK_APP_SECTIONS)[number]['id']): PhoneTab[] {
  return BANK_APP_SECTIONS.map((section) => ({
    id: section.id,
    label: section.label,
    icon: <Icon icon={section.icon} size="md" />,
    active: section.id === active,
    onClick: () => {},
  }))
}
