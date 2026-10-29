import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcwIcon, AwardIcon, StarIcon } from 'lucide-react';
export function CelebrationScreen() {
  const [replayCount, setReplayCount] = useState(0);
  // Rays for the background burst
  const rays = Array.from({
    length: 12
  }).map((_, i) => i * 30);
  return (
    <div className="relative w-full max-w-[320px] mx-auto bg-paper rounded-[24px] shadow-sm border border-line overflow-hidden flex flex-col h-[480px]">
      <button
        type="button"
        onClick={() => setReplayCount((c) => c + 1)}
        className="absolute top-4 right-4 z-10 size-8 rounded-xl bg-sunken hover:bg-line flex items-center justify-center text-muted transition-colors"
        aria-label="Replay animation">
        
        <RotateCcwIcon className="size-4" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={replayCount}
            className="relative flex flex-col items-center w-full">
            
            {/* Rotating Rays */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: 0
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 360
              }}
              transition={{
                opacity: {
                  duration: 0.5
                },
                scale: {
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-64 pointer-events-none z-0">
              
              {rays.map((deg) =>
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-gradient-to-t from-amber-soft/0 via-amber-soft to-amber-soft/0 origin-bottom"
                style={{
                  transform: `translate(-50%, -100%) rotate(${deg}deg)`
                }} />

              )}
            </motion.div>

            {/* Center Trophy/Badge */}
            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: [0, 1.2, 1]
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: 0.2
              }}
              className="relative z-10 size-28 rounded-full bg-gradient-to-br from-amber-soft to-plum-soft flex items-center justify-center mb-6 shadow-lg shadow-amber/20">
              
              <AwardIcon className="size-12 text-amber" strokeWidth={2} />

              {/* Popping Stars */}
              {[
              {
                top: '-10%',
                left: '10%',
                delay: 0.4,
                size: 16
              },
              {
                top: '20%',
                left: '90%',
                delay: 0.5,
                size: 20
              },
              {
                top: '80%',
                left: '-5%',
                delay: 0.6,
                size: 14
              }].
              map((star, i) =>
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  opacity: 0,
                  rotate: -45
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 15,
                  delay: star.delay
                }}
                className="absolute text-amber"
                style={{
                  top: star.top,
                  left: star.left
                }}>
                
                  <StarIcon size={star.size} fill="currentColor" />
                </motion.div>
              )}
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
                delay: 0.5
              }}
              className="text-center w-full relative z-10">
              
              <h3 className="text-2xl font-bold text-ink mb-2 tracking-tight">
                You earned a badge!
              </h3>
              <p className="text-[14px] text-muted font-medium">
                Top Rated · 100 bookings
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-line space-y-3">
        <button className="w-full h-12 rounded-2xl bg-ink text-paper font-semibold text-[15px] hover:bg-ink/90 transition-colors">
          View Badge
        </button>
        <button className="w-full h-12 rounded-2xl bg-sunken text-ink font-semibold text-[15px] hover:bg-line transition-colors">
          Share
        </button>
      </div>
    </div>);

}