import React, { useState } from 'react';
import { GripVerticalIcon, ClockIcon } from 'lucide-react';
import { motion } from 'framer-motion';
type Service = {
  name: string;
  duration: string;
  price: string;
  category: string;
  tint: 'teal' | 'plum' | 'rose' | 'amber';
  on: boolean;
};
const tintBg: Record<Service['tint'], string> = {
  teal: 'bg-teal/12 text-teal',
  plum: 'bg-plum/12 text-plum',
  rose: 'bg-rose/12 text-rose',
  amber: 'bg-amber/12 text-amber'
};
const initialServices: Service[] = [
{
  name: 'Paint mix + Timber cut',
  duration: '45 min',
  price: '$45',
  category: 'Paint',
  tint: 'teal',
  on: true
},
{
  name: 'Paint coloring',
  duration: '2 h 30 min',
  price: 'from $120',
  category: 'Color',
  tint: 'plum',
  on: true
},
{
  name: 'Blade sharpening',
  duration: '30 min',
  price: '$28',
  category: 'Tools',
  tint: 'amber',
  on: false
},
{
  name: 'Express key cutting',
  duration: '20 min',
  price: '$22',
  category: 'Screws',
  tint: 'rose',
  on: true
}];

function Toggle({ on, onChange }: {on: boolean;onChange: () => void;}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onChange}
      className={`relative shrink-0 w-[38px] h-[22px] rounded-full transition-colors ${on ? 'bg-teal' : 'bg-sunken'}`}>
      
      <motion.span
        className="absolute top-[2px] left-[2px] size-[18px] rounded-full bg-paper"
        style={{
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
        }}
        animate={{
          x: on ? 16 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 32
        }} />
      
    </button>);

}
export function ServiceListItem() {
  const [services, setServices] = useState(initialServices);
  const toggle = (i: number) =>
  setServices((s) =>
  s.map((row, idx) =>
  idx === i ?
  {
    ...row,
    on: !row.on
  } :
  row
  )
  );
  return (
    <div
      className="bg-paper rounded-2xl divide-y divide-line"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {services.map((svc, i) =>
      <div
        key={svc.name}
        className={`flex items-center gap-3 p-3 transition-opacity ${svc.on ? '' : 'opacity-60'}`}>
        
          <GripVerticalIcon
          className="size-4 text-muted-soft shrink-0 cursor-grab"
          aria-hidden="true" />
        
          <div
          className={`shrink-0 h-10 px-2.5 rounded-lg flex items-center justify-center text-[11px] font-bold uppercase tracking-wider ${tintBg[svc.tint]}`}
          aria-hidden="true">
          
            {svc.category}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-ink truncate">
              {svc.name}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-muted tabular-nums">
              <ClockIcon className="size-3" strokeWidth={2.5} />
              {svc.duration}
              <span className="text-muted-soft">·</span>
              <span className="font-semibold text-ink/80">{svc.price}</span>
            </div>
          </div>
          <Toggle on={svc.on} onChange={() => toggle(i)} />
        </div>
      )}
    </div>);

}