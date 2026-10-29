import React from 'react';
import {
  WalletIcon,
  BarChart2Icon,
  Share2Icon,
  CalendarIcon,
  UserIcon,
  SearchIcon,
  StarIcon,
  StoreIcon,
  ClockIcon,
  CheckIcon,
  HeartIcon,
  PlusIcon } from
'lucide-react';
interface NeutralTileProps {
  icon: React.ReactNode;
  label: string;
}
function NeutralTile({ icon, label }: NeutralTileProps) {
  return (
    <button
      className="bg-white rounded-2xl py-5 px-2 flex flex-col items-center justify-center gap-2 transition-[transform,box-shadow] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}
      type="button">
      
      <span className="text-ink-soft">{icon}</span>
      <span className="text-xs font-semibold text-ink">{label}</span>
    </button>);

}
interface TintedTileProps {
  icon: React.ReactNode;
  label: string;
  bg: string;
  text: string;
  iconColor: string;
  customBg?: React.CSSProperties;
}
function TintedTile({
  icon,
  label,
  bg,
  text,
  iconColor,
  customBg
}: TintedTileProps) {
  return (
    <button
      className={`${bg} rounded-2xl py-5 px-2 flex flex-col items-center justify-center gap-2 transition-[transform] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20`}
      style={customBg}
      type="button">
      
      <span className={iconColor}>{icon}</span>
      <span className={`text-xs font-semibold ${text}`}>{label}</span>
    </button>);

}
export function IconActionGrid() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-ink">Neutral · 3 across</h3>
        <span className="text-[10px] font-mono text-muted-soft">
          .ic-top-btn · default
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <NeutralTile
          icon={<WalletIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Wallet" />
        
        <NeutralTile
          icon={<BarChart2Icon className="w-5 h-5" strokeWidth={1.8} />}
          label="Reports" />
        
        <NeutralTile
          icon={<Share2Icon className="w-5 h-5" strokeWidth={1.8} />}
          label="Share" />
        
      </div>

      <div className="grid grid-cols-2 gap-2">
        <NeutralTile
          icon={<CalendarIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Schedule" />
        
        <NeutralTile
          icon={<UserIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Clients" />
        
      </div>

      <div className="grid grid-cols-2 gap-2">
        <NeutralTile
          icon={<SearchIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Discover" />
        
        <NeutralTile
          icon={<StarIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Reviews" />
        
      </div>

      <div className="h-px bg-line/60" />

      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-ink">
          Tinted · category-coded
        </h3>
        <span className="text-[10px] font-mono text-muted-soft">.tinted</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <TintedTile
          icon={<WalletIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Wallet"
          bg="bg-teal-soft"
          text="text-teal"
          iconColor="text-teal" />
        
        <TintedTile
          icon={<StoreIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Store"
          bg=""
          text="text-purple"
          iconColor="text-purple"
          customBg={{
            backgroundColor: 'rgba(115, 28, 216, 0.1)'
          }} />
        
        <TintedTile
          icon={<ClockIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Hours"
          bg=""
          text="text-warning"
          iconColor="text-warning"
          customBg={{
            backgroundColor: 'rgba(239, 105, 2, 0.12)'
          }} />
        
      </div>

      <div className="grid grid-cols-3 gap-2">
        <TintedTile
          icon={<CheckIcon className="w-5 h-5" strokeWidth={2} />}
          label="Verify"
          bg="bg-success-soft"
          text="text-success"
          iconColor="text-success" />
        
        <TintedTile
          icon={<HeartIcon className="w-5 h-5" strokeWidth={1.8} />}
          label="Saved"
          bg=""
          text="text-danger"
          iconColor="text-danger"
          customBg={{
            backgroundColor: 'rgba(222, 0, 59, 0.08)'
          }} />
        
        <button
          className="bg-ink rounded-2xl py-5 px-2 flex flex-col items-center justify-center gap-2 transition-[transform] active:scale-[0.97] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
          type="button">
          
          <PlusIcon className="w-5 h-5" strokeWidth={2} />
          <span className="text-xs font-semibold">More</span>
        </button>
      </div>
    </div>);

}