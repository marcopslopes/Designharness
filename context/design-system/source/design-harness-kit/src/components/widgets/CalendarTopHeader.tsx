import React from 'react';
import {
  BellIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
  SlidersHorizontalIcon } from
'lucide-react';
export function CalendarTopHeader() {
  return (
    <div
      className="bg-paper rounded-2xl p-3 flex items-center justify-between gap-2"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <button
        type="button"
        aria-label="Notifications, 98 unread"
        className="relative size-10 rounded-xl flex items-center justify-center text-ink hover:bg-surface-2 active:scale-[0.96] transition-transform">
        
        <BellIcon className="size-5" strokeWidth={2} />
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-paper text-[10px] font-bold flex items-center justify-center tabular-nums"
          aria-hidden="true">
          
          98
        </span>
      </button>

      <button
        type="button"
        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl hover:bg-surface-2 active:scale-[0.98] transition-transform"
        aria-label="Choose date">
        
        <div className="text-center leading-tight">
          <div className="text-[15px] font-bold text-ink tracking-tight">
            Wed, 12 Jun
          </div>
          <div className="text-[11px] text-muted tabular-nums">
            10:00 – 19:00
          </div>
        </div>
        <ChevronDownIcon className="size-4 text-muted" strokeWidth={2.5} />
      </button>

      <button
        type="button"
        aria-label="Filters, 98 active"
        className="relative size-10 rounded-xl flex items-center justify-center text-ink hover:bg-surface-2 active:scale-[0.96] transition-transform">
        
        <SlidersHorizontalIcon className="size-5" strokeWidth={2} />
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-paper text-[10px] font-bold flex items-center justify-center tabular-nums"
          aria-hidden="true">
          
          98
        </span>
      </button>

      <button
        type="button"
        aria-label="More options"
        className="size-10 rounded-xl flex items-center justify-center text-ink hover:bg-surface-2 active:scale-[0.96] transition-transform">
        
        <MoreVerticalIcon className="size-5" strokeWidth={2} />
      </button>
    </div>);

}