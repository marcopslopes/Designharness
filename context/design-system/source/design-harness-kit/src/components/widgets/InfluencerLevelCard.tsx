import React from 'react';
import { TrophyIcon, ChevronRightIcon, ImageIcon } from 'lucide-react';
export function InfluencerLevelCard() {
  return (
    <div
      className="group bg-white rounded-xl p-4 transition-[transform,box-shadow] duration-200 active:scale-[0.99] cursor-pointer"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}
      role="button"
      tabIndex={0}>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple/10 flex items-center justify-center flex-shrink-0">
            <TrophyIcon className="w-5 h-5 text-purple" strokeWidth={2} />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-purple mb-0.5">
              Level 2
            </div>
            <h3 className="text-base font-semibold text-ink">Influencer</h3>
          </div>
        </div>
        <div className="text-[11px] font-medium text-muted bg-surface-2 px-2 py-1 rounded-md tabular-nums">
          Step 1 of 3
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="font-medium text-ink-soft">Progress to Pro</span>
          <span className="text-muted tabular-nums">33%</span>
        </div>
        <div className="h-2 w-full bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-purple w-1/3 rounded-full" />
        </div>
      </div>

      <div className="bg-surface-2 rounded-lg p-3 flex items-center justify-between group-hover:bg-purple/5 transition-colors">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-muted group-hover:text-purple transition-colors" />
          <span className="text-xs font-medium text-ink-soft">
            Add portfolio photos
          </span>
        </div>
        <ChevronRightIcon className="w-4 h-4 text-muted group-hover:text-purple transition-colors" />
      </div>
    </div>);

}