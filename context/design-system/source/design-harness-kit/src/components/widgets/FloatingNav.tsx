import React, { useState } from 'react';
import {
  CalendarIcon,
  MapIcon,
  BookmarkIcon,
  UserIcon,
  SearchIcon } from
'lucide-react';
import { motion } from 'framer-motion';
interface NavItem {
  id: string;
  label: string;
  icon: typeof CalendarIcon;
}
const items: NavItem[] = [
{
  id: 'calendar',
  label: 'Calendar',
  icon: CalendarIcon
},
{
  id: 'discovery',
  label: 'Discovery',
  icon: MapIcon
},
{
  id: 'saved',
  label: 'Saved',
  icon: BookmarkIcon
},
{
  id: 'profile',
  label: 'Profile',
  icon: UserIcon
}];

export function FloatingNav() {
  const [active, setActive] = useState('calendar');
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-ink">Floating nav</h3>
        <span className="text-[10px] font-mono text-muted-soft">
          .bottom-nav · glass
        </span>
      </div>

      <div className="bg-surface-3/60 rounded-3xl p-5 flex items-center justify-center">
        <div
          className="flex items-center gap-1 bg-white/70 backdrop-blur-xl rounded-[20px] p-1.5 border border-white"
          style={{
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
          }}>
          
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className="relative flex flex-col items-center justify-center gap-0.5 w-14 h-14 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 transition-colors"
                type="button"
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}>
                
                <Icon
                  className={`w-5 h-5 ${isActive ? 'text-teal' : 'text-muted'}`}
                  strokeWidth={isActive ? 2.2 : 2} />
                
                <span
                  className={`text-[9px] font-semibold ${isActive ? 'text-teal' : 'text-muted'}`}>
                  
                  {item.label}
                </span>
              </button>);

          })}
          <motion.button
            whileTap={{
              scale: 0.94
            }}
            className="w-12 h-12 rounded-2xl bg-ink text-white flex items-center justify-center ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
            type="button"
            aria-label="Search">
            
            <SearchIcon className="w-5 h-5" strokeWidth={2.2} />
          </motion.button>
        </div>
      </div>
    </div>);

}