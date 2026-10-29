import React from 'react';
import { ShareIcon, WalletIcon, TrendingUpIcon, ZapIcon } from 'lucide-react';
const actions = [
{
  id: 'share',
  label: 'Share',
  icon: ShareIcon
},
{
  id: 'wallet',
  label: 'Wallet',
  icon: WalletIcon
},
{
  id: 'reports',
  label: 'Reports',
  icon: TrendingUpIcon
},
{
  id: 'boost',
  label: 'Boost',
  icon: ZapIcon
}];

export function ActionQuad() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-white transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2"
            style={{
              boxShadow: 'var(--shadow-border)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-border-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-border)';
            }}>
            
            <div className="size-9 rounded-xl bg-ink flex items-center justify-center text-white">
              <Icon className="size-5" />
            </div>
            <span className="text-xs font-bold text-ink">{action.label}</span>
          </button>);

      })}
    </div>);

}