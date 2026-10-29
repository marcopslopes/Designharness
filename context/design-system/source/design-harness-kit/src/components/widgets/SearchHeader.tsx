import React, { useState } from 'react';
import { SearchIcon, XIcon, ClockIcon } from 'lucide-react';
// iOS 26 active search — expanded field, Cancel, scope chips, recent searches.
export function SearchHeader() {
  const [value, setValue] = useState('paint mix');
  return (
    <div className="bg-paper w-full" role="banner">
      {/* Search Bar Row */}
      <div className="flex items-center gap-3 px-4 pt-3 pb-3">
        <div className="flex-1 flex items-center gap-2 h-11 px-3 rounded-2xl bg-sunken">
          <SearchIcon
            className="size-[18px] text-ink-50 shrink-0"
            strokeWidth={2.5} />
          
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-transparent text-[17px] text-ink placeholder:text-ink-50 outline-none min-w-0" />
          
          {value &&
          <button
            type="button"
            aria-label="Clear"
            onClick={() => setValue('')}
            className="shrink-0 size-5 rounded-full bg-ink/20 flex items-center justify-center text-paper active:scale-95 transition-transform">
            
              <XIcon className="size-3" strokeWidth={3} />
            </button>
          }
        </div>

        <button
          type="button"
          className="text-teal text-[17px] font-semibold active:scale-95 transition-transform">
          
          Cancel
        </button>
      </div>

      {/* Scope Chips Row */}
      <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button className="shrink-0 px-3 py-1.5 rounded-2xl bg-ink text-paper text-[14px] font-semibold">
          All
        </button>
        <button className="shrink-0 px-3 py-1.5 rounded-2xl bg-sunken text-ink-70 border border-line text-[14px] font-semibold">
          Services
        </button>
        <button className="shrink-0 px-3 py-1.5 rounded-2xl bg-sunken text-ink-70 border border-line text-[14px] font-semibold">
          Staff
        </button>
        <button className="shrink-0 px-3 py-1.5 rounded-2xl bg-sunken text-ink-70 border border-line text-[14px] font-semibold">
          Clients
        </button>
      </div>

      {/* Recent Searches */}
      <div className="px-4 pt-1">
        <h3 className="text-[12px] font-semibold text-ink-50 uppercase tracking-wider mb-1">
          Recent
        </h3>
        <div className="flex flex-col">
          {['paint mix', 'timber cut', 'color'].map((term, i) =>
          <div
            key={i}
            className="flex items-center justify-between h-11 border-b border-line/60 last:border-0">
            
              <div className="flex items-center gap-3">
                <ClockIcon className="size-4 text-ink-50" strokeWidth={2} />
                <span className="text-[15px] text-ink">{term}</span>
              </div>
              <button
              type="button"
              aria-label="Remove recent search"
              className="p-2 -mr-2">
              
                <XIcon className="size-4 text-ink-50" strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>);

}