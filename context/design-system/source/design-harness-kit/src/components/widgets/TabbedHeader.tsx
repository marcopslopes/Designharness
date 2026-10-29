import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BellIcon } from 'lucide-react';
// iOS 26 large title + sliding-underline tabs.
// Canonical pattern for screens with 4+ tabs (Reports, Library, Inbox).
const tabs = ['Overview', 'Sales', 'Clients', 'Services', 'Staff'] as const;
export function TabbedHeader() {
  const [active, setActive] = useState<(typeof tabs)[number]>('Overview');
  return (
    <div className="bg-paper w-full" role="banner">
      {/* Top Action Row */}
      <div className="flex items-center justify-end px-4 pt-3 pb-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative size-9 rounded-full bg-ink/[0.06] dark:bg-paper/[0.08] border border-line/40 backdrop-blur-xl flex items-center justify-center text-ink active:scale-95 transition-transform">
          
          <BellIcon className="size-[18px]" strokeWidth={2.2} />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-danger ring-2 ring-paper" />
        </button>
      </div>

      {/* Large Title */}
      <div className="px-4 pt-1 pb-3">
        <h1 className="text-[32px] font-extrabold text-ink leading-[1.1] tracking-tight">
          Reports
        </h1>
      </div>

      {/* Sliding Underline Tabs */}
      <div className="relative flex items-end gap-4 px-4 overflow-x-auto no-scrollbar border-b border-line/60">
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative shrink-0 pt-2 pb-3 active:scale-95 transition-transform">
              
              <span
                className={`text-[15px] font-semibold tracking-tight ${isActive ? 'text-ink' : 'text-ink-50'}`}>
                
                {tab}
              </span>
              {isActive &&
              <motion.div
                layoutId="tab-underline"
                className="absolute left-0 right-0 -bottom-px h-[2px] rounded-t-full bg-teal"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6
                }} />

              }
            </button>);

        })}
      </div>
    </div>);

}