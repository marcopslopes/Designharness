import React, { useState } from 'react';
import { motion } from 'framer-motion';
export function SegmentedControl() {
  const [seg, setSeg] = useState<'staff' | 'resources'>('staff');
  const options: {
    value: typeof seg;
    label: string;
  }[] = [
  {
    value: 'staff',
    label: 'Staff'
  },
  {
    value: 'resources',
    label: 'Resources'
  }];

  return (
    <div
      className="bg-paper rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="relative inline-flex bg-sunken rounded-xl p-1 w-full">
        {options.map((opt) => {
          const active = opt.value === seg;
          return (
            <button
              key={opt.value}
              onClick={() => setSeg(opt.value)}
              className="relative flex-1 h-9 rounded-lg text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2">
              
              {active &&
              <motion.span
                layoutId="segctrl-active"
                className="absolute inset-0 bg-paper rounded-lg"
                style={{
                  boxShadow: 'var(--shadow-border)'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 32
                }} />

              }
              <span
                className={`relative ${active ? 'text-ink' : 'text-muted'}`}>
                
                {opt.label}
              </span>
            </button>);

        })}
      </div>
    </div>);

}