import React from 'react';
import { ChevronLeftIcon, ShareIcon, MoreHorizontalIcon } from 'lucide-react';
// iOS 26 compact nav bar — post-scroll state with translucent material.
// Back chevron left, centered two-line title, share + more on the right.
export function NavBarHeader() {
  return (
    <div
      className="bg-paper/80 backdrop-blur-2xl border-b border-line/60 w-full"
      role="banner">
      
      <div className="relative flex items-center justify-between h-[52px] px-2">
        {/* Back */}
        <button
          type="button"
          aria-label="Back"
          className="flex items-center justify-center w-11 h-11 active:scale-95 transition-transform">
          
          <div className="flex items-center justify-center size-9 rounded-full bg-ink/[0.06] dark:bg-paper/[0.08] border border-line/40 text-ink">
            <ChevronLeftIcon className="size-5" strokeWidth={2.5} />
          </div>
        </button>

        {/* Centered Title + Subtitle */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="text-[17px] font-semibold text-ink leading-tight tracking-tight">
            Patricia Taylor
          </div>
          <div className="text-[13px] text-ink-70 leading-tight mt-0.5">
            Wed · 10:00 AM
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Share"
            className="flex items-center justify-center w-11 h-11 active:scale-95 transition-transform">
            
            <div className="flex items-center justify-center size-9 rounded-full bg-ink/[0.06] dark:bg-paper/[0.08] border border-line/40 text-ink">
              <ShareIcon className="size-[18px]" strokeWidth={2.2} />
            </div>
          </button>
          <button
            type="button"
            aria-label="More"
            className="flex items-center justify-center w-11 h-11 active:scale-95 transition-transform">
            
            <div className="flex items-center justify-center size-9 rounded-full bg-ink/[0.06] dark:bg-paper/[0.08] border border-line/40 text-ink">
              <MoreHorizontalIcon className="size-[18px]" strokeWidth={2.2} />
            </div>
          </button>
        </div>
      </div>
    </div>);

}