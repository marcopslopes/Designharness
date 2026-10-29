import React from 'react';
import {
  ClockIcon,
  ScissorsIcon,
  DollarSignIcon,
  MessageSquareIcon,
  PhoneIcon } from
'lucide-react';
export function DetailSheet() {
  return (
    <div
      className="bg-paper rounded-t-[28px] overflow-hidden pt-2"
      style={{
        boxShadow:
        '0 -10px 36px -8px rgba(20, 22, 26, 0.14), 0 0 0 1px rgba(20, 22, 26, 0.03)'
      }}>
      
      <div className="flex justify-center pt-2 pb-3">
        <span
          className="block h-1 w-9 rounded-full bg-ink/20"
          aria-hidden="true" />
        
      </div>

      {/* Hero — client + status */}
      <div className="px-5 pb-4 flex items-center gap-3">
        <div
          className="shrink-0 size-12 rounded-full bg-teal/15 text-teal flex items-center justify-center text-[14px] font-bold"
          aria-hidden="true">
          
          PT
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-[17px] font-bold text-ink truncate tracking-tight">
            Patricia Taylor
          </h2>
          <p className="text-[12px] text-muted tabular-nums">
            VIP · 24 visits · last 3 days ago
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-leaf bg-leaf/12 px-2 py-1 rounded-md">
          Confirmed
        </span>
      </div>

      {/* Grouped facts */}
      <div className="mx-4 mb-4 rounded-xl bg-sunken divide-y divide-line/60">
        <div className="flex items-center gap-3 px-3.5 py-3">
          <ClockIcon className="size-4 text-muted shrink-0" strokeWidth={2.4} />
          <span className="text-[13px] text-muted flex-1">When</span>
          <span className="text-[13px] font-semibold text-ink tabular-nums">
            Wed, 12 Jun · 10:00 – 11:00
          </span>
        </div>
        <div className="flex items-center gap-3 px-3.5 py-3">
          <ScissorsIcon
            className="size-4 text-muted shrink-0"
            strokeWidth={2.4} />
          
          <span className="text-[13px] text-muted flex-1">Service</span>
          <span className="text-[13px] font-semibold text-ink">
            Paint mix + Timber cut
          </span>
        </div>
        <div className="flex items-center gap-3 px-3.5 py-3">
          <DollarSignIcon
            className="size-4 text-muted shrink-0"
            strokeWidth={2.4} />
          
          <span className="text-[13px] text-muted flex-1">Total</span>
          <span className="text-[13px] font-bold text-ink tabular-nums">
            $45.00
          </span>
        </div>
      </div>

      {/* Quick contact actions */}
      <div className="px-4 pb-3 flex gap-2">
        <button
          type="button"
          className="flex-1 h-11 rounded-xl bg-sunken flex items-center justify-center gap-1.5 text-ink text-[14px] font-semibold active:scale-[0.98] transition-transform">
          
          <MessageSquareIcon className="size-4" strokeWidth={2.2} />
          Message
        </button>
        <button
          type="button"
          className="flex-1 h-11 rounded-xl bg-sunken flex items-center justify-center gap-1.5 text-ink text-[14px] font-semibold active:scale-[0.98] transition-transform">
          
          <PhoneIcon className="size-4" strokeWidth={2.2} />
          Call
        </button>
      </div>

      {/* Primary action */}
      <div className="px-4 pb-5">
        <button
          type="button"
          className="w-full h-12 rounded-2xl bg-ink text-paper text-[15px] font-bold active:scale-[0.99] transition-transform"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
          
          Check in client
        </button>
      </div>
    </div>);

}