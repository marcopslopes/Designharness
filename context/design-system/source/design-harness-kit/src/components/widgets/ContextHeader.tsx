import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// Northline 'Context' header — success state with stats bar.
// Tinted top strip + uppercase eyebrow + title, followed by a key-stats row.
// The canonical "confirmation / receipt" pattern. Use variants in code:
// neutral, success, warning, danger, info — shown here as success.
export function ContextHeader() {
  return (
    <div className="bg-paper w-full" role="banner">
      {/* Tinted strip */}
      <div className="bg-leaf/15">
        <div className="relative flex items-center justify-between h-[60px] px-2">
          {/* Back */}
          <button
            type="button"
            aria-label="Back"
            className="flex items-center justify-center w-11 h-11 active:scale-95 transition-transform">
            
            <div className="flex items-center justify-center size-9 rounded-full bg-ink/[0.06] dark:bg-paper/[0.08] border border-line/40 text-ink">
              <ChevronLeftIcon className="size-5" strokeWidth={2.5} />
            </div>
          </button>

          {/* Eyebrow + Title */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <div className="text-[11px] font-bold text-leaf uppercase tracking-[0.1em] leading-tight mb-0.5">
              Booking Confirmed
            </div>
            <div className="text-[17px] font-semibold text-ink leading-tight tracking-tight">
              Appointment Set
            </div>
          </div>

          {/* Right spacer for visual balance */}
          <div className="w-11" />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center px-4 py-3 border-b border-line/60 bg-paper">
        <div className="flex-1 flex items-center justify-between">
          <Stat label="Date" value="12 Jun" />
          <div className="w-px h-9 bg-line/60" />
          <Stat label="Time" value="10:00" />
          <div className="w-px h-9 bg-line/60" />
          <Stat label="Total" value="$45" />
        </div>
        <button
          type="button"
          aria-label="View details"
          className="pl-3 active:scale-95 transition-transform">
          
          <ChevronRightIcon className="size-5 text-ink-50" strokeWidth={2.5} />
        </button>
      </div>
    </div>);

}
function Stat({ label, value }: {label: string;value: string;}) {
  return (
    <div className="flex flex-col items-center px-2">
      <span className="text-[10px] text-ink-50 uppercase font-semibold tracking-wider mb-0.5">
        {label}
      </span>
      <span className="text-[17px] font-bold text-ink tabular-nums leading-none">
        {value}
      </span>
    </div>);

}