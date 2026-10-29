import React from 'react';
import {
  ChevronRightIcon,
  CheckCircleIcon,
  CreditCardIcon,
  CalendarIcon } from
'lucide-react';
interface SettingsRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  iconColorClass: string;
  iconBgClass: string;
}
function SettingsRowItem({
  icon,
  title,
  description,
  badge,
  iconColorClass,
  iconBgClass
}: SettingsRowProps) {
  return (
    <button
      className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white text-left transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-border)';
      }}>
      
      <div
        className={`flex-shrink-0 size-10 rounded-xl flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
        
        {icon}
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-semibold text-ink leading-tight">{title}</h3>
          {badge &&
          <span className="px-2 py-0.5 rounded-md bg-purple text-white text-[10px] font-bold uppercase tracking-wide">
              {badge}
            </span>
          }
        </div>
        <p className="text-sm text-muted leading-tight truncate">
          {description}
        </p>
      </div>
      <ChevronRightIcon className="flex-shrink-0 size-5 text-muted-soft ml-2" />
    </button>);

}
export function SettingsRow() {
  return (
    <div className="space-y-3">
      <SettingsRowItem
        icon={<CheckCircleIcon className="size-5" />}
        title="Loyalty Cards"
        description="Create stamp cards and track rewards"
        badge="New"
        iconColorClass="text-purple"
        iconBgClass="bg-purple/10" />
      
      <SettingsRowItem
        icon={<CreditCardIcon className="size-5" />}
        title="Payments & Checkout"
        description="All payment settings in one place"
        iconColorClass="text-teal"
        iconBgClass="bg-teal/10" />
      
      <SettingsRowItem
        icon={<CalendarIcon className="size-5" />}
        title="Schedule Management"
        description="Edit opening hours and time-off"
        iconColorClass="text-warning"
        iconBgClass="bg-warning/10" />
      
    </div>);

}