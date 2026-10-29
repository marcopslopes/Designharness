import React from 'react';
import { ChevronRightIcon, CheckCircle2Icon, CircleIcon } from 'lucide-react';
export function ProgressCard() {
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
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-ink text-lg leading-tight">
            Influencer
          </h3>
          <p className="text-sm text-muted">Grow your audience</p>
        </div>
        <ChevronRightIcon className="size-5 text-muted-soft" />
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-1 mb-4">
        <div className="h-2 flex-1 rounded-full bg-teal" />
        <div className="h-2 flex-1 rounded-full bg-surface-2" />
        <div className="h-2 flex-1 rounded-full bg-surface-2" />
      </div>

      {/* Micro-steps */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <CheckCircle2Icon className="size-4 text-teal flex-shrink-0" />
          <span className="text-xs font-semibold text-ink truncate">
            Profile complete
          </span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <CircleIcon className="size-4 text-muted-soft flex-shrink-0" />
          <span className="text-xs font-medium text-muted truncate">
            Add portfolio
          </span>
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <CircleIcon className="size-4 text-muted-soft flex-shrink-0" />
          <span className="text-xs font-medium text-muted truncate">
            Get 5 reviews
          </span>
        </div>
      </div>
    </button>);

}