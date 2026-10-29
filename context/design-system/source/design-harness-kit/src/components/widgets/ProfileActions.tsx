import React from 'react';
import { ShareIcon, WalletIcon, TrendingUpIcon } from 'lucide-react';
export function ProfileActions() {
  return (
    <div
      className="grid grid-cols-3 bg-white rounded-2xl overflow-hidden divide-x divide-line"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <button className="flex flex-col items-center justify-center gap-2 py-4 px-2 transition-[background-color,transform] duration-150 ease-out hover:bg-surface active:bg-surface-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:-outline-offset-2">
        <div className="size-10 rounded-full bg-teal-soft text-teal flex items-center justify-center">
          <ShareIcon className="size-5" />
        </div>
        <span className="text-xs font-bold text-ink">Share</span>
      </button>

      <button className="flex flex-col items-center justify-center gap-2 py-4 px-2 transition-[background-color,transform] duration-150 ease-out hover:bg-surface active:bg-surface-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:-outline-offset-2">
        <div className="size-10 rounded-full bg-purple/10 text-purple flex items-center justify-center">
          <WalletIcon className="size-5" />
        </div>
        <span className="text-xs font-bold text-ink">Wallet</span>
      </button>

      <button className="flex flex-col items-center justify-center gap-2 py-4 px-2 transition-[background-color,transform] duration-150 ease-out hover:bg-surface active:bg-surface-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:-outline-offset-2">
        <div className="size-10 rounded-full bg-warning/10 text-warning flex items-center justify-center">
          <TrendingUpIcon className="size-5" />
        </div>
        <span className="text-xs font-bold text-ink">Reports</span>
      </button>
    </div>);

}