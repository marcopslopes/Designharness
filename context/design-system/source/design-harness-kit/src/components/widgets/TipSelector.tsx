import React, { useState } from 'react';
import { motion } from 'framer-motion';
const tips = [
{
  id: 'none',
  pct: 'No Tip',
  amt: '$0.00'
},
{
  id: '20',
  pct: '20%',
  amt: '$24.00'
},
{
  id: '25',
  pct: '25%',
  amt: '$30.00'
},
{
  id: 'custom',
  pct: 'Custom',
  amt: '•••'
}];

export function TipSelector() {
  const [activeId, setActiveId] = useState('20');
  const activeTip = tips.find((t) => t.id === activeId);
  return (
    <div>
      <div className="flex bg-surface-2 p-1 rounded-2xl relative z-0">
        {tips.map((tip) => {
          const isActive = activeId === tip.id;
          return (
            <button
              key={tip.id}
              onClick={() => setActiveId(tip.id)}
              aria-pressed={isActive}
              className="relative flex-1 flex flex-col items-center justify-center py-3 min-h-[64px] rounded-xl transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2 z-10">
              
              {isActive &&
              <motion.div
                layoutId="tip-active-bg"
                className="absolute inset-0 bg-white rounded-xl"
                style={{
                  boxShadow: 'var(--shadow-border)'
                }}
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.5
                }} />

              }
              <span
                className={`relative z-10 text-xs font-semibold mb-0.5 transition-colors duration-200 ${isActive ? 'text-ink-soft' : 'text-muted'}`}>
                
                {tip.pct}
              </span>
              <span
                className={`relative z-10 text-base font-bold tabular-nums transition-colors duration-200 ${isActive ? 'text-ink' : 'text-ink-soft'}`}>
                
                {tip.amt}
              </span>
            </button>);

        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm font-semibold text-ink">
          Tip:{' '}
          <span className="tabular-nums">
            {activeTip?.amt === '•••' ? '$0.00' : activeTip?.amt}
          </span>
        </p>
      </div>
    </div>);

}