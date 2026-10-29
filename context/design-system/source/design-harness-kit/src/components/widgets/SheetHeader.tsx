import React from 'react';
// iOS bottom sheet header — drag handle, title centered, Cancel left,
// Done right (filled teal). Matches the native "form sheet" pattern.
export function SheetHeader() {
  return (
    <div
      className="bg-paper rounded-t-[28px] overflow-hidden pt-2"
      style={{
        boxShadow:
        '0 -8px 32px -8px rgba(20, 22, 26, 0.12), 0 -1px 0 0 rgba(20, 22, 26, 0.04)'
      }}>
      
      {/* Grabber */}
      <div className="flex justify-center pt-2 pb-3">
        <span
          className="block h-1 w-9 rounded-full bg-ink/20"
          aria-hidden="true" />
        
      </div>

      <div className="relative flex items-center justify-between px-4 pb-4">
        <button
          type="button"
          className="text-teal text-[15px] font-semibold active:scale-[0.96] transition-transform">
          
          Cancel
        </button>

        <h2 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-ink tracking-tight">
          New booking
        </h2>

        <button
          type="button"
          className="h-9 px-4 rounded-full bg-teal text-paper text-[14px] font-bold active:scale-[0.96] transition-transform"
          style={{
            boxShadow: '0 1px 0 rgba(255,255,255,0.2) inset'
          }}>
          
          Done
        </button>
      </div>

      <div className="mx-4 h-px bg-line" />

      <div className="px-5 py-4 text-[13px] text-muted">
        Pick a client and service to continue.
      </div>
    </div>);

}