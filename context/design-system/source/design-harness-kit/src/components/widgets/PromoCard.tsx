import React from 'react';
import { ShoppingCartIcon, ClockIcon } from 'lucide-react';
export function PromoCard() {
  return (
    <div className="space-y-3">
      <div className="bg-purple/10 rounded-2xl p-4 flex items-start gap-3">
        <div className="size-12 rounded-xl bg-purple flex items-center justify-center text-white flex-shrink-0">
          <ShoppingCartIcon className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-ink">Store</h3>
            <span className="px-2 py-0.5 rounded-md bg-purple text-white text-[10px] font-bold uppercase tracking-wide">
              New
            </span>
          </div>
          <p className="text-sm text-ink-soft text-pretty">
            Buy products for your business directly from well-known brands.
          </p>
        </div>
      </div>

      <div className="bg-teal-soft rounded-2xl p-4 flex items-start gap-3">
        <div className="size-12 rounded-xl bg-teal flex items-center justify-center text-white flex-shrink-0">
          <ClockIcon className="size-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-ink">Auto-rebook reminders</h3>
            <span className="px-2 py-0.5 rounded-md bg-teal text-white text-[10px] font-bold uppercase tracking-wide">
              Beta
            </span>
          </div>
          <p className="text-sm text-ink-soft text-pretty">
            Northline texts your clients 6 weeks after their last visit. Set once,
            never miss a rebook.
          </p>
        </div>
      </div>
    </div>);

}