import React from 'react';
export function RosterRow() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm mb-2">
        <h3 className="font-bold text-ink">Today's roster</h3>
        <p className="text-muted tabular-nums">2 staff · 0 booked</p>
      </div>

      <div
        className="bg-white rounded-2xl p-4 flex items-center justify-between"
        style={{
          boxShadow: 'var(--shadow-border)'
        }}>
        
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-sm tabular-nums text-ink-soft">
            <p className="font-bold">10:00</p>
            <p className="text-xs text-muted">9 hr</p>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-ink truncate">Justas Test</p>
            <p className="text-xs text-muted truncate">Senior advisor</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-teal-soft text-teal text-xs font-bold flex-shrink-0">
          Open
        </span>
      </div>

      <div className="bg-surface-2 rounded-2xl p-6 text-center">
        <p className="text-sm text-muted text-pretty">
          Wide-open day. Block focus time or tap + to add a booking.
        </p>
      </div>
    </div>);

}