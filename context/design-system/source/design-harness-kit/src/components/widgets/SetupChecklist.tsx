import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
export function SetupChecklist() {
  return (
    <button
      className="w-full bg-white rounded-2xl p-4 text-left transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-border)';
      }}>
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-ink">Setup checklist</h3>
        <span className="text-sm font-bold text-muted tabular-nums">3 / 6</span>
      </div>
      <div className="h-1 bg-surface-2 rounded-full overflow-hidden mb-4">
        <div className="h-full w-1/2 bg-teal rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Add a service</span>
        <ChevronRightIcon className="size-5 text-muted" />
      </div>
    </button>);

}