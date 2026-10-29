import React from 'react';
import { EyeOffIcon, ArrowRightIcon } from 'lucide-react';
export function VisibilityAlertCard() {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: 'rgba(239, 105, 2, 0.08)',
        boxShadow: 'inset 0 0 0 1px rgba(239, 105, 2, 0.2)'
      }}
      role="alert">
      
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{
            backgroundColor: 'rgba(239, 105, 2, 0.15)'
          }}
          aria-hidden="true">
          
          <EyeOffIcon className="w-4 h-4 text-warning" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ink mb-1 text-pretty">
            Your profile is hidden from clients
          </h3>
          <p className="text-xs text-ink-soft/80 leading-relaxed text-pretty">
            Clients can't find or book you on Northline yet. Enable online booking
            to start receiving requests.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 mt-3 pl-11">
        <button
          className="text-xs font-medium text-warning hover:text-ink-soft flex items-center gap-1 transition-colors min-h-[44px] -my-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning/40 rounded"
          type="button">
          
          Why this matters <ArrowRightIcon className="w-3 h-3" />
        </button>
        <button
          className="bg-ink hover:bg-ink-soft text-white text-sm font-semibold py-2.5 px-5 rounded-lg transition-[transform,background-color] active:scale-[0.96] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          type="button">
          
          Enable online booking
        </button>
      </div>
    </div>);

}