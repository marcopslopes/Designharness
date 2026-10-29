import React from 'react';
import {
  ShareIcon,
  WalletIcon,
  BarChart2Icon,
  ArrowUpRightIcon } from
'lucide-react';
interface TileProps {
  icon: React.ReactNode;
  label: string;
  primary: React.ReactNode;
  secondary: React.ReactNode;
}
function Tile({ icon, label, primary, secondary }: TileProps) {
  return (
    <button
      className="group bg-white rounded-xl p-3 text-left transition-[transform,box-shadow] duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}
      aria-label={`${label}, ${typeof primary === 'string' ? primary : ''}`}>
      
      <div className="flex items-start justify-between mb-2">
        <span className="text-ink-soft">{icon}</span>
        <ArrowUpRightIcon
          className="w-3.5 h-3.5 text-muted-soft group-hover:text-ink-soft transition-colors"
          strokeWidth={2} />
        
      </div>
      <div className="text-sm font-semibold text-ink mb-0.5">{label}</div>
      <div className="text-[11px] text-muted leading-tight tabular-nums">
        {primary}
        {secondary && <> {secondary}</>}
      </div>
    </button>);

}
export function QuickActionTiles() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Tile
        icon={<ShareIcon className="w-5 h-5" strokeWidth={2} />}
        label="Share"
        primary={<span>248 views</span>}
        secondary={<span className="text-success font-semibold">↑18%</span>} />
      
      <Tile
        icon={<WalletIcon className="w-5 h-5" strokeWidth={2} />}
        label="Wallet"
        primary={<span className="text-ink font-semibold">$3,720</span>}
        secondary={<span>available</span>} />
      
      <Tile
        icon={<BarChart2Icon className="w-5 h-5" strokeWidth={2} />}
        label="Reports"
        primary={<span className="text-success font-semibold">↑12%</span>}
        secondary={<span>this month</span>} />
      
    </div>);

}