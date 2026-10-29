import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarIcon,
  UsersIcon,
  PlusIcon,
  ReceiptIcon,
  StoreIcon } from
'lucide-react';
type TabId = 'appointments' | 'clients' | 'checkout' | 'profile';
interface TabItem {
  id: TabId;
  label: string;
  icon: typeof CalendarIcon;
  hasNotification?: boolean;
}
const items: TabItem[] = [
{
  id: 'appointments',
  label: 'Appointments',
  icon: CalendarIcon
},
{
  id: 'clients',
  label: 'Clients',
  icon: UsersIcon
},
{
  id: 'checkout',
  label: 'Checkout',
  icon: ReceiptIcon,
  hasNotification: true
},
{
  id: 'profile',
  label: 'Profile',
  icon: StoreIcon
}];

function TabButton({
  item,
  isActive,
  onClick




}: {item: TabItem;isActive: boolean;onClick: () => void;}) {
  const Icon = item.icon;
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{
        scale: 0.92
      }}
      className="relative flex-1 h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}>
      
      <div className="relative">
        <Icon
          className={`size-5 transition-colors ${isActive ? 'text-ink' : 'text-muted'}`}
          strokeWidth={isActive ? 2.2 : 1.8} />
        
        {item.hasNotification &&
        <span className="absolute -top-0.5 -right-1 size-1.5 rounded-full bg-teal ring-2 ring-paper" />
        }
      </div>
      <span
        className={`text-[10px] font-semibold tracking-tight transition-colors ${isActive ? 'text-ink' : 'text-muted'}`}>
        
        {item.label}
      </span>
    </motion.button>);

}
export function BizTabBar() {
  const [active, setActive] = useState<TabId>('appointments');
  return (
    <div className="w-full max-w-[360px] mx-auto">
      <div
        className="flex items-center justify-between gap-1 bg-paper rounded-[28px] px-3 py-2 border border-line"
        style={{
          boxShadow:
          '0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 28px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)'
        }}>
        
        {/* Left two items */}
        {items.slice(0, 2).map((item) =>
        <TabButton
          key={item.id}
          item={item}
          isActive={active === item.id}
          onClick={() => setActive(item.id)} />

        )}

        {/* Center FAB */}
        <motion.button
          type="button"
          whileTap={{
            scale: 0.9
          }}
          whileHover={{
            scale: 1.04
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 22
          }}
          className="size-12 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 mx-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          style={{
            boxShadow:
            '0 1px 0 rgba(255,255,255,0.1) inset, 0 6px 16px rgba(0,0,0,0.18)'
          }}
          aria-label="Quick add">
          
          <PlusIcon className="size-6" strokeWidth={2.4} />
        </motion.button>

        {/* Right two items */}
        {items.slice(2).map((item) =>
        <TabButton
          key={item.id}
          item={item}
          isActive={active === item.id}
          onClick={() => setActive(item.id)} />

        )}
      </div>
    </div>);

}