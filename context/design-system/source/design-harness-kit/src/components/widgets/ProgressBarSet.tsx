import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcwIcon } from 'lucide-react';
export function ProgressBarSet() {
  const [replayCount, setReplayCount] = useState(0);
  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-paper rounded-[24px] shadow-sm border border-line p-6 flex flex-col gap-8">
      <button
        type="button"
        onClick={() => setReplayCount((c) => c + 1)}
        className="absolute top-4 right-4 z-10 size-8 rounded-xl bg-sunken hover:bg-line flex items-center justify-center text-muted transition-colors"
        aria-label="Replay animation">
        
        <RotateCcwIcon className="size-4" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div key={replayCount} className="space-y-8 mt-4">
          {/* Determinate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[13px] font-medium">
              <span className="text-ink">Profile completion</span>
              <span className="text-muted tabular-nums">64%</span>
            </div>
            <div className="h-2 w-full bg-sunken rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-teal rounded-full"
                initial={{
                  width: 0
                }}
                animate={{
                  width: '64%'
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                  delay: 0.1
                }} />
              
            </div>
          </div>

          {/* Indeterminate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[13px] font-medium">
              <span className="text-ink">Syncing data...</span>
            </div>
            <div className="h-2 w-full bg-sunken rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 bottom-0 bg-plum rounded-full w-[30%]"
                animate={{
                  left: ['-30%', '100%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }} />
              
            </div>
          </div>

          {/* Stepped */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[13px] font-medium">
              <span className="text-ink">Setup progress</span>
              <span className="text-muted tabular-nums">3/5</span>
            </div>
            <div className="flex gap-1 h-2 w-full">
              {[0, 1, 2, 3, 4].map((step) => {
                const isFilled = step < 3;
                const isAnimating = step === 3;
                return (
                  <div
                    key={step}
                    className="flex-1 rounded-full overflow-hidden bg-sunken relative">
                    
                    {isFilled &&
                    <motion.div
                      className="absolute inset-0 bg-leaf"
                      initial={{
                        scaleX: 0
                      }}
                      animate={{
                        scaleX: 1
                      }}
                      transition={{
                        duration: 0.4,
                        delay: step * 0.15
                      }}
                      style={{
                        originX: 0
                      }} />

                    }
                    {isAnimating &&
                    <motion.div
                      className="absolute inset-0 bg-leaf"
                      initial={{
                        scaleX: 0
                      }}
                      animate={{
                        scaleX: 1
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 3 * 0.15 + 0.2,
                        ease: 'easeOut'
                      }}
                      style={{
                        originX: 0
                      }} />

                    }
                  </div>);

              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}