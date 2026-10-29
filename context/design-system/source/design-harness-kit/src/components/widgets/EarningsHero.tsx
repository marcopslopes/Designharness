import React from 'react';
import { GiftIcon, ArrowUpRightIcon } from 'lucide-react';
export function EarningsHero() {
  return (
    <div className="relative bg-gradient-to-br from-purple via-purple to-fuchsia-700 rounded-2xl p-5 text-white overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-fuchsia-300/20 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur flex items-center justify-center"
            aria-hidden="true">
            
            <GiftIcon className="w-4 h-4 text-white" strokeWidth={2} />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">
            Total Earned
          </span>
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <h2 className="text-4xl font-bold tracking-tight tabular-nums">
            $150
          </h2>
          <span className="text-sm font-medium text-white/80 tabular-nums">
            / 3 friends joined
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-white/80">
          <ArrowUpRightIcon className="w-3 h-3" />
          <span>$50 each · paid to your wallet</span>
        </div>
      </div>
    </div>);

}