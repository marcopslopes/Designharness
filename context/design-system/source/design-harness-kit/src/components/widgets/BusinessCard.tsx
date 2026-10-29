import React from 'react';
export function BusinessCard() {
  return (
    <div className="bg-surface-2 rounded-2xl p-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="size-12 rounded-xl bg-teal flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          UB
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-0.5">
            Business
          </p>
          <h3 className="font-bold text-ink mb-1 truncate">US Northline Test</h3>
          <p className="text-xs text-success flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-success" />
            <span className="tabular-nums">Open today · 10:00 – 19:00</span>
          </p>
        </div>
      </div>
      <button className="px-3 py-1.5 bg-ink text-white text-xs font-bold rounded-lg transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2 flex-shrink-0">
        Edit
      </button>
    </div>);

}