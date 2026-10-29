import React from 'react';
import { BellIcon, SearchIcon, MicIcon } from 'lucide-react';
// iOS 26 large title — the canonical home-screen chrome.
// Avatar left, action cluster right, big bold title, inset search field.
export function LargeTitleHeader() {
  return (
    <div className="bg-paper w-full" role="banner">
      {/* Top Action Row */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <button
          type="button"
          aria-label="Profile"
          className="size-9 rounded-full overflow-hidden bg-sunken active:scale-95 transition-transform">
          
          <img
            src="https://i.pravatar.cc/150?u=northline-owner"
            alt="Profile"
            className="w-full h-full object-cover" />
          
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative size-9 rounded-full bg-ink/[0.06] dark:bg-paper/[0.08] border border-line/40 backdrop-blur-xl flex items-center justify-center text-ink active:scale-95 transition-transform">
          
          <BellIcon className="size-[18px]" strokeWidth={2.2} />
          <span className="absolute top-1 right-1 size-2 rounded-full bg-danger ring-2 ring-paper" />
        </button>
      </div>

      {/* Large Title */}
      <div className="px-4 pt-2 pb-3">
        <h1 className="text-[34px] font-extrabold text-ink leading-[1.1] tracking-tight">
          Today
        </h1>
        <p className="text-[15px] text-ink-70 mt-1 tabular-nums">
          12 appointments
        </p>
      </div>

      {/* Inset Search Field */}
      <div className="px-4 pb-3">
        <div className="w-full flex items-center gap-2 h-11 px-3 rounded-2xl bg-sunken">
          <SearchIcon className="size-[18px] text-ink-50" strokeWidth={2.5} />
          <span className="text-[16px] text-ink-50 flex-1 text-left">
            Search
          </span>
          <MicIcon className="size-[18px] text-ink-50" strokeWidth={2.5} />
        </div>
      </div>
    </div>);

}