import React from 'react';
import { MessageSquareIcon, CheckIcon } from 'lucide-react';
export function NextAppointmentCard() {
  return (
    <div className="bg-ink rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple/30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

      <div className="flex items-center justify-between mb-4 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
          Up Next
        </span>
        <span className="text-[11px] font-medium bg-white/10 px-2 py-1 rounded-md text-white/90 tabular-nums">
          in 45 min
        </span>
      </div>

      <div className="mb-5 relative z-10">
        <div className="flex items-baseline gap-3 mb-1">
          <h2 className="text-4xl font-bold tracking-tight tabular-nums">
            14:30
          </h2>
          <span className="text-lg font-medium text-white/80">Marco Silva</span>
        </div>
        <p className="text-sm text-white/60 tabular-nums">
          Paint mix + Timber cut · 45 min · $45
        </p>
      </div>

      <div className="flex items-center gap-2 relative z-10">
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/20 text-sm font-semibold hover:bg-white/10 transition-[transform,background-color] active:scale-[0.97] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          type="button">
          
          <MessageSquareIcon className="w-4 h-4" strokeWidth={2} /> Message
        </button>
        <button
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-ink text-sm font-semibold hover:bg-white/90 transition-[transform,background-color] active:scale-[0.97] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          type="button">
          
          <CheckIcon className="w-4 h-4" strokeWidth={2.5} /> Check in
        </button>
      </div>
    </div>);

}