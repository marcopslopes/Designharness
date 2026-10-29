import React from 'react';
import { AlertTriangleIcon } from 'lucide-react';
export function ConfirmationSheet() {
  return (
    <div
      className="bg-paper rounded-[20px] overflow-hidden pt-2 pb-5"
      style={{
        boxShadow:
        '0 -8px 32px -8px rgba(20, 22, 26, 0.10), 0 0 0 1px rgba(20, 22, 26, 0.03)'
      }}>
      
      <div className="flex justify-center pb-3">
        <span
          className="block h-1 w-9 rounded-full bg-ink/20"
          aria-hidden="true" />
        
      </div>

      <div className="px-5">
        <div
          className="mx-auto mb-4 size-12 rounded-full bg-danger/10 flex items-center justify-center"
          aria-hidden="true">
          
          <AlertTriangleIcon className="size-6 text-danger" strokeWidth={2.2} />
        </div>

        <h2 className="text-center text-[18px] font-bold text-ink tracking-tight mb-1.5">
          Cancel this booking?
        </h2>
        <p className="text-center text-[13px] text-muted leading-relaxed mb-5 text-pretty">
          Patricia will be notified and the slot becomes available again. This
          can't be undone.
        </p>

        <div className="space-y-2">
          <button
            type="button"
            className="w-full h-12 rounded-2xl bg-danger text-paper text-[15px] font-bold active:scale-[0.99] transition-transform"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18)'
            }}>
            
            Yes, cancel booking
          </button>
          <button
            type="button"
            className="w-full h-12 rounded-2xl bg-sunken text-ink text-[15px] font-bold active:scale-[0.99] transition-transform">
            
            Keep it
          </button>
        </div>
      </div>
    </div>);

}