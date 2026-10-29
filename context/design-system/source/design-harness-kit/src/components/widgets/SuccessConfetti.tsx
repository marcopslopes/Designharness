import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcwIcon, CheckIcon } from 'lucide-react';
const CONFETTI_COLORS = [
'var(--c-teal)',
'var(--c-plum)',
'var(--c-rose)',
'var(--c-amber)',
'var(--c-leaf)'];

export function SuccessConfetti() {
  const [replayCount, setReplayCount] = useState(0);
  // Generate random confetti pieces
  const confetti = Array.from({
    length: 30
  }).map((_, i) => {
    const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    const xOffset = (Math.random() - 0.5) * 200;
    const yOffset = -150 - Math.random() * 100;
    const rotation = Math.random() * 360;
    const delay = Math.random() * 0.2;
    const duration = 1.5 + Math.random() * 1;
    return {
      id: i,
      color,
      xOffset,
      yOffset,
      rotation,
      delay,
      duration
    };
  });
  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-paper rounded-[24px] shadow-sm border border-line overflow-hidden flex flex-col h-[480px]">
      <button
        type="button"
        onClick={() => setReplayCount((c) => c + 1)}
        className="absolute top-4 right-4 z-10 size-8 rounded-xl bg-sunken hover:bg-line flex items-center justify-center text-muted transition-colors"
        aria-label="Replay animation">
        
        <RotateCcwIcon className="size-4" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={replayCount}
            className="relative flex flex-col items-center w-full">
            
            {/* Confetti */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
              {confetti.map((c) =>
              <motion.div
                key={c.id}
                initial={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  opacity: [1, 1, 0],
                  x: c.xOffset,
                  y: c.yOffset,
                  scale: [0, 1, 1],
                  rotate: c.rotation
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  ease: 'easeOut'
                }}
                className="absolute w-2 h-4 rounded-full"
                style={{
                  backgroundColor: c.color
                }} />

              )}
            </div>

            {/* Badge */}
            <motion.div
              initial={{
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.1
              }}
              className="relative z-10 size-24 rounded-full bg-leaf-soft flex items-center justify-center mb-6">
              
              <svg
                className="size-10 text-leaf"
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
                    duration: 0.5,
                    delay: 0.3,
                    ease: 'easeOut'
                  }} />
                
              </svg>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{
                y: 20,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              transition={{
                duration: 0.4,
                delay: 0.4
              }}
              className="text-center w-full">
              
              <h3 className="text-xl font-bold text-ink mb-2">
                Booking confirmed
              </h3>
              <p className="text-[14px] text-muted">
                Tomorrow at 2:30 PM with Marta
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-line">
        <button className="w-full h-12 rounded-2xl bg-ink text-paper font-semibold text-[15px] hover:bg-ink/90 transition-colors">
          Done
        </button>
      </div>
    </div>);

}