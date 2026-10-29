import { IconCreditCard, IconHome, IconHomeFilled, IconListDetails, IconUser, IconWallet } from '@tabler/icons-react'
import { Icon, type IconSize, type TablerIconComponent } from '../../../context/design-system/ds'
import type { PhoneTab } from '../../../src/design-harness/shared/PhoneShell'

/** Banking sections shared by the phone tab bar and the desktop side nav. */
const WALLET_SECTIONS: { id: string; label: string; outline: TablerIconComponent; filled?: TablerIconComponent }[] = [
  { id: 'home', label: 'Home', outline: IconHome, filled: IconHomeFilled },
  { id: 'activity', label: 'Activity', outline: IconListDetails },
  { id: 'wallet', label: 'Wallet', outline: IconWallet },
  { id: 'cards', label: 'Cards', outline: IconCreditCard },
  { id: 'account', label: 'Account', outline: IconUser },
]

export function walletTabBarItems(size: IconSize = 'md') {
  return WALLET_SECTIONS.map((section) => ({
    id: section.id,
    label: section.label,
    icon: <Icon icon={section.outline} size={size} />,
  }))
}

export function walletTabs(active = 'wallet', size: IconSize = 'lg'): PhoneTab[] {
  return WALLET_SECTIONS.map((section) => {
    const on = section.id === active
    return {
      id: section.id,
      label: section.label,
      icon: <Icon icon={on && section.filled ? section.filled : section.outline} size={size} />,
      active: on,
      onClick: () => {},
    }
  })
}
