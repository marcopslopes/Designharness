import React from 'react';
export function InvertedStatGrid() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Regular stat cards */}
      <div className="bg-surface-2 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
          Services
        </p>
        <p className="text-3xl font-bold text-ink tabular-nums">$0</p>
        <p className="text-xs text-muted tabular-nums mt-1">0% vs yest.</p>
      </div>

      <div className="bg-surface-2 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
          Tips
        </p>
        <p className="text-3xl font-bold text-ink tabular-nums">$0</p>
        <p className="text-xs text-muted tabular-nums mt-1">0% today</p>
      </div>

      <div className="bg-surface-2 rounded-2xl p-4">
        <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
          Gift Cards
        </p>
        <p className="text-3xl font-bold text-ink tabular-nums">$0</p>
      </div>

      {/* Inverted card - key insight */}
      <div className="bg-ink rounded-2xl p-4">
        <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
          Lost Rev.
        </p>
        <p className="text-3xl font-bold text-white tabular-nums">$0</p>
      </div>
    </div>);

}