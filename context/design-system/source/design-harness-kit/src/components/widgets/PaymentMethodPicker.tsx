import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCardIcon,
  BanknoteIcon,
  GiftIcon,
  PlusIcon,
  CheckIcon } from
'lucide-react';
type MethodId = 'apple' | 'card' | 'cash' | 'gift';
const methods: {
  id: MethodId;
  label: string;
  sub: string;
  icon: React.ReactNode;
  badge?: string;
}[] = [
{
  id: 'apple',
  label: 'Apple Pay',
  sub: 'Face ID · iPhone',
  icon:
  // Tiny stylized Apple glyph
  <svg
    viewBox="0 0 24 24"
    className="size-[18px]"
    aria-hidden="true"
    fill="currentColor">
    
        <path d="M16.4 12.6c0-2 1.6-3 1.7-3-.9-1.3-2.3-1.5-2.8-1.5-1.2-.1-2.4.7-3 .7-.7 0-1.6-.7-2.6-.6-1.4 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7.9 1.4 2 2.5 2 1 0 1.4-.7 2.6-.7 1.2 0 1.6.7 2.6.7 1.1 0 1.8-1 2.4-2 .8-1.2 1.1-2.3 1.1-2.4 0-.1-2.2-.9-2.2-3.2zM14.5 6.5c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-1 1.5-.8 2.4.9.1 1.8-.4 2.3-1.1z" />
      </svg>,

  badge: 'Recommended'
},
{
  id: 'card',
  label: 'Visa · 4242',
  sub: 'Expires 09/27',
  icon: <CreditCardIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  id: 'cash',
  label: 'Cash',
  sub: 'Pay in person',
  icon: <BanknoteIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  id: 'gift',
  label: 'Gift card',
  sub: '$24.00 balance',
  icon: <GiftIcon className="size-[18px]" strokeWidth={2.2} />
}];

export function PaymentMethodPicker() {
  const [picked, setPicked] = useState<MethodId>('apple');
  return (
    <div
      className="bg-paper rounded-2xl p-2"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="space-y-1.5">
        {methods.map((m) => {
          const active = m.id === picked;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setPicked(m.id)}
              className={`relative w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${active ? 'bg-sunken' : 'hover:bg-sunken/60'}`}>
              
              {active &&
              <motion.span
                layoutId="pmp-active"
                className="absolute inset-0 rounded-xl ring-2 ring-ink"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 32
                }}
                aria-hidden="true" />

              }
              <span
                className={`relative shrink-0 size-9 rounded-lg flex items-center justify-center ${active ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}
                style={
                !active ?
                {
                  boxShadow: 'var(--shadow-border)'
                } :
                {}
                }
                aria-hidden="true">
                
                {m.icon}
              </span>
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-semibold text-ink truncate">
                    {m.label}
                  </span>
                  {m.badge &&
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-leaf bg-leaf/12 px-1.5 py-0.5 rounded-md">
                      {m.badge}
                    </span>
                  }
                </div>
                <div className="text-[12px] text-muted tabular-nums truncate">
                  {m.sub}
                </div>
              </div>
              <span
                className={`relative shrink-0 size-5 rounded-full flex items-center justify-center transition-colors ${active ? 'bg-ink' : 'border-2 border-line bg-paper'}`}
                aria-hidden="true">
                
                {active &&
                <CheckIcon className="size-3 text-paper" strokeWidth={3.5} />
                }
              </span>
            </button>);

        })}
      </div>

      <button
        type="button"
        className="mt-1.5 w-full flex items-center gap-2 p-3 rounded-xl text-teal text-[14px] font-semibold hover:bg-sunken/60 active:scale-[0.99] transition-all">
        
        <span className="size-9 rounded-lg bg-teal/10 flex items-center justify-center">
          <PlusIcon className="size-4" strokeWidth={2.5} />
        </span>
        Add a new card
      </button>
    </div>);

}