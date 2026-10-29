import React from 'react';
import {
  CreditCardIcon,
  TagIcon,
  GiftIcon,
  ClockIcon,
  GlobeIcon,
  ChevronRightIcon } from
'lucide-react';
interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  hasToggle?: boolean;
  toggleValue?: boolean;
}
function SettingItem({
  icon,
  title,
  subtitle,
  iconBg,
  iconColor,
  hasToggle,
  toggleValue
}: SettingItemProps) {
  return (
    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white text-left transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2">
      <div
        className={`size-9 rounded-lg flex items-center justify-center ${iconBg} ${iconColor} flex-shrink-0`}>
        
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-ink text-sm mb-0.5">{title}</h4>
        <p className="text-xs text-muted truncate">{subtitle}</p>
      </div>
      {hasToggle ?
      <div
        className={`w-11 h-6 rounded-full transition-colors ${toggleValue ? 'bg-teal' : 'bg-surface-3'} relative flex-shrink-0`}>
        
          <div
          className={`absolute top-0.5 ${toggleValue ? 'right-0.5' : 'left-0.5'} size-5 bg-white rounded-full transition-all`} />
        
        </div> :

      <ChevronRightIcon className="size-5 text-muted-soft flex-shrink-0" />
      }
    </button>);

}
export function SettingsGroup() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2 px-2">
          Money
        </p>
        <div className="space-y-2">
          <SettingItem
            icon={<CreditCardIcon className="size-4" />}
            title="Payments & checkout"
            subtitle="All payment settings"
            iconBg="bg-teal/10"
            iconColor="text-teal" />
          
          <SettingItem
            icon={<TagIcon className="size-4" />}
            title="Memberships"
            subtitle="Recurring · 0 active"
            iconBg="bg-purple/10"
            iconColor="text-purple" />
          
          <SettingItem
            icon={<GiftIcon className="size-4" />}
            title="Gift cards"
            subtitle="Sell & share"
            iconBg="bg-warning/10"
            iconColor="text-warning" />
          
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-2 px-2">
          Schedule
        </p>
        <div className="space-y-2">
          <SettingItem
            icon={<ClockIcon className="size-4" />}
            title="Hours"
            subtitle="Mon – Sat · 10:00 – 19:00"
            iconBg="bg-success/10"
            iconColor="text-success" />
          
          <SettingItem
            icon={<GlobeIcon className="size-4" />}
            title="Online bookings"
            subtitle="Currently off"
            iconBg="bg-ink/10"
            iconColor="text-ink"
            hasToggle
            toggleValue={false} />
          
        </div>
      </div>
    </div>);

}