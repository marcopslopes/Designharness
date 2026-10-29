import React, { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
export function FormSheet() {
  const [client, setClient] = useState('Patricia Taylor');
  return (
    <div
      className="bg-paper rounded-t-[28px] overflow-hidden pt-2"
      style={{
        boxShadow:
        '0 -10px 36px -8px rgba(20, 22, 26, 0.14), 0 0 0 1px rgba(20, 22, 26, 0.03)'
      }}>
      
      {/* Grabber */}
      <div className="flex justify-center pt-2 pb-3">
        <span
          className="block h-1 w-9 rounded-full bg-ink/20"
          aria-hidden="true" />
        
      </div>

      {/* Sheet header */}
      <div className="relative flex items-center justify-between px-4 pb-3">
        <button
          type="button"
          className="text-teal text-[15px] font-semibold active:scale-[0.96] transition-transform">
          
          Cancel
        </button>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-ink tracking-tight">
          New booking
        </h2>
        <button
          type="button"
          className="h-9 px-4 rounded-full bg-teal text-paper text-[14px] font-bold active:scale-[0.96] transition-transform"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
          }}>
          
          Done
        </button>
      </div>

      <div className="h-px bg-line" />

      {/* Form content */}
      <div className="px-4 py-3 space-y-3">
        {/* Field — text input */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5 px-1">
            Client
          </label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            className="w-full h-11 px-3 rounded-xl bg-sunken text-[15px] text-ink border-0 focus:outline-none focus:ring-2 focus:ring-ink/15" />
          
        </div>

        {/* Grouped list section */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5 px-1">
            Details
          </label>
          <div className="bg-sunken rounded-xl divide-y divide-line/60">
            <button
              type="button"
              className="w-full flex items-center justify-between gap-3 px-3.5 py-3 text-left active:bg-line/40 transition-colors">
              
              <span className="text-[14px] font-semibold text-ink">
                Service
              </span>
              <span className="flex items-center gap-1 text-[13px] text-muted tabular-nums">
                Paint mix + Timber cut
                <ChevronRightIcon
                  className="size-4 text-muted-soft"
                  strokeWidth={2.5} />
                
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between gap-3 px-3.5 py-3 text-left active:bg-line/40 transition-colors">
              
              <span className="text-[14px] font-semibold text-ink">Date</span>
              <span className="flex items-center gap-1 text-[13px] text-muted tabular-nums">
                Wed, 12 Jun
                <ChevronDownIcon
                  className="size-4 text-muted-soft"
                  strokeWidth={2.5} />
                
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-between gap-3 px-3.5 py-3 text-left active:bg-line/40 transition-colors">
              
              <span className="text-[14px] font-semibold text-ink">Staff</span>
              <span className="flex items-center gap-1 text-[13px] text-muted tabular-nums">
                Patricia Taylor
                <ChevronRightIcon
                  className="size-4 text-muted-soft"
                  strokeWidth={2.5} />
                
              </span>
            </button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5 px-1">
            Notes
          </label>
          <textarea
            rows={2}
            placeholder="Optional notes for this booking"
            className="w-full px-3 py-2.5 rounded-xl bg-sunken text-[14px] text-ink placeholder:text-muted resize-none border-0 focus:outline-none focus:ring-2 focus:ring-ink/15" />
          
        </div>
      </div>
    </div>);

}