import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, GiftIcon, SparklesIcon } from 'lucide-react';
const TOTAL = 10;
const FILLED = 7;
export function LoyaltyStamp() {
  const remaining = TOTAL - FILLED;
  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        boxShadow: 'var(--shadow-card-strong)',
        backgroundColor: 'rgb(var(--c-ink))'
      }}>
      
      {/* Atmospheric glow */}
      <div
        className="absolute -top-12 -right-12 size-40 rounded-full pointer-events-none"
        style={{
          background:
          'radial-gradient(circle, rgba(11,163,173,0.28), transparent 60%)'
        }}
        aria-hidden="true" />
      
      <div
        className="absolute -bottom-16 -left-12 size-44 rounded-full pointer-events-none"
        style={{
          background:
          'radial-gradient(circle, rgba(79,55,145,0.22), transparent 60%)'
        }}
        aria-hidden="true" />
      

      <div className="relative p-5 text-paper">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-lg bg-paper/10 backdrop-blur flex items-center justify-center">
              <SparklesIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-paper/70">
              Loyalty
            </span>
          </div>
          <span className="text-[11px] font-bold text-paper/60 tabular-nums">
            #BK-2049
          </span>
        </div>

        <h3 className="text-[18px] font-bold tracking-tight mt-2">
          {remaining} more visits
        </h3>
        <p className="text-[12px] text-paper/65 mt-0.5">
          Free paint mix on your 10th visit.
        </p>

        {/* Stamps grid */}
        <div className="mt-4 grid grid-cols-5 gap-2">
          {Array.from({
            length: TOTAL
          }).map((_, i) => {
            const filled = i < FILLED;
            const isReward = i === TOTAL - 1;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: filled ? 1 : 0.96
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 22,
                  delay: i * 0.02
                }}
                className={`relative aspect-square rounded-xl flex items-center justify-center ${filled ? isReward ? 'bg-amber text-ink' : 'bg-teal text-paper' : 'bg-paper/8 text-paper/30'}`}
                style={
                filled ?
                {
                  boxShadow:
                  'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 12px -6px rgba(0,0,0,0.4)'
                } :
                {
                  boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.12)'
                }
                }>
                
                {filled ?
                isReward ?
                <GiftIcon className="size-[16px]" strokeWidth={2.4} /> :

                <CheckIcon className="size-[16px]" strokeWidth={3} /> :


                <span className="text-[11px] font-bold tabular-nums">
                    {i + 1}
                  </span>
                }
              </motion.div>);

          })}
        </div>

        {/* Progress hairline */}
        <div className="mt-4 h-[3px] rounded-full bg-paper/10 overflow-hidden">
          <motion.span
            className="block h-full rounded-full bg-teal"
            initial={{
              width: 0
            }}
            animate={{
              width: `${FILLED / TOTAL * 100}%`
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 32
            }} />
          
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-paper/60 tabular-nums">
          <span>
            {FILLED} of {TOTAL}
          </span>
          <span className="text-paper/80 font-semibold">
            Park Avenue Hardware
          </span>
        </div>
      </div>
    </div>);

}