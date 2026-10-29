import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcwIcon, TimerIcon } from 'lucide-react';
export function CircularProgress() {
  const [replayCount, setReplayCount] = useState(0);
  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-paper rounded-[24px] shadow-sm border border-line p-6">
      <button
        type="button"
        onClick={() => setReplayCount((c) => c + 1)}
        className="absolute top-4 right-4 z-10 size-8 rounded-xl bg-sunken hover:bg-line flex items-center justify-center text-muted transition-colors"
        aria-label="Replay animation">
        
        <RotateCcwIcon className="size-4" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={replayCount}
          className="flex items-end justify-between mt-4">
          
          {/* Goal Ring */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-20">
              <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-sunken)"
                  strokeWidth="8" />
                
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-teal)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{
                    strokeDashoffset: 251.2
                  }}
                  animate={{
                    strokeDashoffset: 251.2 * (1 - 0.68)
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut'
                  }} />
                
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-ink tabular-nums">
                  68%
                </span>
              </div>
            </div>
            <span className="text-[12px] font-medium text-muted">Booked</span>
          </div>

          {/* Multi-segment Ring */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-20">
              <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-sunken)"
                  strokeWidth="8" />
                
                {/* Segment 1: Teal (40%) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-teal)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{
                    strokeDashoffset: 251.2
                  }}
                  animate={{
                    strokeDashoffset: 251.2 * (1 - 0.4)
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut'
                  }} />
                
                {/* Segment 2: Plum (30%) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-plum)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{
                    strokeDashoffset: 251.2
                  }}
                  animate={{
                    strokeDashoffset: 251.2 * (1 - 0.3)
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut',
                    delay: 0.2
                  }}
                  style={{
                    transformOrigin: 'center',
                    rotate: `${0.4 * 360 + 5}deg`
                  }} />
                
                {/* Segment 3: Amber (15%) */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-amber)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{
                    strokeDashoffset: 251.2
                  }}
                  animate={{
                    strokeDashoffset: 251.2 * (1 - 0.15)
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut',
                    delay: 0.4
                  }}
                  style={{
                    transformOrigin: 'center',
                    rotate: `${0.7 * 360 + 10}deg`
                  }} />
                
              </svg>
            </div>
            <span className="text-[12px] font-medium text-muted">Sources</span>
          </div>

          {/* Countdown Ring */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative size-16">
              <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-sunken)"
                  strokeWidth="8" />
                
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--c-rose)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="251.2"
                  initial={{
                    strokeDashoffset: 251.2 * (1 - 0.88)
                  }}
                  animate={{
                    strokeDashoffset: 251.2
                  }}
                  transition={{
                    duration: 5,
                    ease: 'linear'
                  }} />
                
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-rose">
                <TimerIcon className="size-5" />
              </div>
            </div>
            <span className="text-[12px] font-medium text-muted">Expiring</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}