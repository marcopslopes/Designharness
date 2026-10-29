import React, { useState } from 'react';
import { motion } from 'framer-motion';
const periods = ['Today', 'Week #19', 'May', '2026'];
export function PeriodFilter() {
  const [activePeriod, setActivePeriod] = useState(periods[0]);
  return (
    <div className="flex items-center gap-1 bg-surface-2 p-1.5 rounded-[20px] overflow-x-auto no-scrollbar">
      {periods.map((period) => {
        const isActive = activePeriod === period;
        return (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            aria-pressed={isActive}
            className={`
              relative px-5 py-2 rounded-2xl text-sm font-bold whitespace-nowrap
              transition-colors duration-200 ease-out active:scale-[0.96]
              focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2
              ${isActive ? 'text-white' : 'text-muted hover:text-ink'}
            `}>
            
            {isActive &&
            <motion.div
              layoutId="period-active-bg"
              className="absolute inset-0 bg-ink rounded-2xl"
              initial={false}
              transition={{
                type: 'spring',
                bounce: 0.2,
                duration: 0.5
              }} />

            }
            <span className="relative z-10">{period}</span>
          </button>);

      })}
    </div>);

}