import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
type Preset = 'today' | '7d' | '30d' | 'mtd' | 'custom';
const presets: {
  id: Preset;
  label: string;
}[] = [
{
  id: 'today',
  label: 'Today'
},
{
  id: '7d',
  label: '7 days'
},
{
  id: '30d',
  label: '30 days'
},
{
  id: 'mtd',
  label: 'Month'
},
{
  id: 'custom',
  label: 'Custom'
}];

const rangeFor: Record<
  Preset,
  {
    from: string;
    to: string;
  }> =
{
  today: {
    from: 'Wed, 12 Jun',
    to: 'Wed, 12 Jun'
  },
  '7d': {
    from: 'Thu, 6 Jun',
    to: 'Wed, 12 Jun'
  },
  '30d': {
    from: 'Mon, 13 May',
    to: 'Wed, 12 Jun'
  },
  mtd: {
    from: 'Sat, 1 Jun',
    to: 'Wed, 12 Jun'
  },
  custom: {
    from: 'Mon, 1 Apr',
    to: 'Wed, 12 Jun'
  }
};
export function DateRangePicker() {
  const [active, setActive] = useState<Preset>('7d');
  const range = rangeFor[active];
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Preset chips */}
      <div className="relative flex items-center gap-1 bg-sunken rounded-2xl p-1">
        {presets.map((p) => {
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className="relative flex-1 h-9 rounded-xl text-[12px] font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal">
              
              {isActive &&
              <motion.span
                layoutId="drp-active"
                className="absolute inset-0 bg-paper rounded-xl"
                style={{
                  boxShadow: 'var(--shadow-border)'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 32
                }}
                aria-hidden="true" />

              }
              <span
                className={`relative ${isActive ? 'text-ink' : 'text-muted'}`}>
                
                {p.label}
              </span>
            </button>);

        })}
      </div>

      {/* Range fields */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="text-left rounded-xl bg-sunken p-3 ring-1 ring-inset ring-line hover:ring-ink/40 transition-colors">
          
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
            <CalendarIcon className="size-3" strokeWidth={2.5} />
            From
          </div>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[13px] font-semibold text-ink tabular-nums truncate">
              {range.from}
            </span>
            <ChevronDownIcon
              className="size-3.5 text-muted shrink-0"
              strokeWidth={2.5} />
            
          </div>
        </button>
        <button
          type="button"
          className="text-left rounded-xl bg-sunken p-3 ring-1 ring-inset ring-line hover:ring-ink/40 transition-colors">
          
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted mb-1 flex items-center gap-1">
            <CalendarIcon className="size-3" strokeWidth={2.5} />
            To
          </div>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[13px] font-semibold text-ink tabular-nums truncate">
              {range.to}
            </span>
            <ChevronDownIcon
              className="size-3.5 text-muted shrink-0"
              strokeWidth={2.5} />
            
          </div>
        </button>
      </div>

      {/* Compare toggle */}
      <div className="flex items-center justify-between gap-3 py-1">
        <div>
          <div className="text-[13px] font-semibold text-ink">Compare</div>
          <div className="text-[11px] text-muted tabular-nums">
            vs. previous{' '}
            {active === 'today' ? 'day' : active === '7d' ? 'week' : 'period'}
          </div>
        </div>
        <button
          role="switch"
          aria-checked="true"
          className="relative w-[44px] h-[26px] rounded-full bg-teal">
          
          <motion.span
            className="absolute top-[2px] right-[2px] size-[22px] rounded-full bg-paper"
            style={{
              boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
            }}
            initial={false}
            animate={{
              x: 0
            }} />
          
        </button>
      </div>
    </div>);

}