import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcwIcon } from 'lucide-react';
export function CheckmarkDraw() {
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
          className="flex items-center justify-between mt-4 px-2">
          
          {/* Success */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              className="size-16 rounded-full bg-leaf flex items-center justify-center text-paper">
              
              <svg
                className="size-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round">
                
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{
                    pathLength: 0
                  }}
                  animate={{
                    pathLength: 1
                  }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                    ease: 'easeOut'
                  }} />
                
              </svg>
            </motion.div>
            <span className="text-[12px] font-semibold text-ink">Success</span>
          </div>

          {/* Error */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.1
              }}
              className="size-16 rounded-full bg-rose flex items-center justify-center text-paper">
              
              <svg
                className="size-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round">
                
                <motion.path
                  d="M18 6L6 18"
                  initial={{
                    pathLength: 0
                  }}
                  animate={{
                    pathLength: 1
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                    ease: 'easeOut'
                  }} />
                
                <motion.path
                  d="M6 6l12 12"
                  initial={{
                    pathLength: 0
                  }}
                  animate={{
                    pathLength: 1
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.45,
                    ease: 'easeOut'
                  }} />
                
              </svg>
            </motion.div>
            <span className="text-[12px] font-semibold text-ink">Error</span>
          </div>

          {/* Warning */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.2
              }}
              className="size-16 rounded-full bg-amber flex items-center justify-center text-paper">
              
              <svg
                className="size-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round">
                
                <motion.path
                  d="M12 8v4"
                  initial={{
                    pathLength: 0
                  }}
                  animate={{
                    pathLength: 1
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4,
                    ease: 'easeOut'
                  }} />
                
                <motion.path
                  d="M12 16h.01"
                  initial={{
                    pathLength: 0,
                    opacity: 0
                  }}
                  animate={{
                    pathLength: 1,
                    opacity: 1
                  }}
                  transition={{
                    duration: 0.2,
                    delay: 0.7
                  }} />
                
              </svg>
            </motion.div>
            <span className="text-[12px] font-semibold text-ink">Warning</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}