import React from 'react';
import { motion } from 'framer-motion';
export function LoadingSpinner() {
  return (
    <div className="w-full max-w-[320px] mx-auto bg-paper rounded-[24px] shadow-sm border border-line p-6">
      <div className="grid grid-cols-2 gap-6">
        {/* iOS Style Spinner */}
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 relative flex items-center justify-center">
            {Array.from({
              length: 12
            }).map((_, i) =>
            <motion.div
              key={i}
              className="absolute w-[3px] h-[10px] bg-ink rounded-full origin-[50%_20px]"
              style={{
                top: 0,
                left: 'calc(50% - 1.5px)',
                transform: `rotate(${i * 30}deg)`
              }}
              animate={{
                opacity: [1, 0.2]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 1 / 12
              }} />

            )}
          </div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            iOS Style
          </span>
        </div>

        {/* Bouncing Dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 flex items-center justify-center gap-1.5">
            {[0, 1, 2].map((i) =>
            <motion.div
              key={i}
              className="size-2.5 bg-ink rounded-full"
              animate={{
                y: [0, -8, 0]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15
              }} />

            )}
          </div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Bouncing
          </span>
        </div>

        {/* Segmented Ring */}
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 relative flex items-center justify-center">
            <svg className="size-full" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="var(--c-sunken)"
                strokeWidth="4" />
              
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="var(--c-ink)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset="75"
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="origin-center" />
              
            </svg>
          </div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Ring
          </span>
        </div>

        {/* Pulsing Circles */}
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 relative flex items-center justify-center">
            {[0, 1].map((i) =>
            <motion.div
              key={i}
              className="absolute size-full bg-ink rounded-full"
              initial={{
                scale: 0,
                opacity: 0.8
              }}
              animate={{
                scale: 1,
                opacity: 0
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.75
              }} />

            )}
          </div>
          <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
            Pulse
          </span>
        </div>
      </div>
    </div>);

}