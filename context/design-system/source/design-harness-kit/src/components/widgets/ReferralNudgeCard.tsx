import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, ChevronRightIcon, XIcon } from 'lucide-react';
export function ReferralNudgeCard() {
  const [dismissed, setDismissed] = useState(false);
  return (
    <AnimatePresence initial={false}>
      {!dismissed &&
      <motion.div
        exit={{
          opacity: 0,
          scale: 0.96,
          transition: {
            duration: 0.18
          }
        }}
        className="relative bg-gradient-to-br from-purple via-purple to-fuchsia-600 rounded-2xl p-4 text-white overflow-hidden shadow-md cursor-pointer group transition-[transform,box-shadow] active:scale-[0.99]"
        role="button"
        tabIndex={0}>
        
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-fuchsia-300/20 rounded-full blur-2xl -ml-8 -mb-8 pointer-events-none" />

          <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
          }}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Dismiss"
          type="button">
          
            <XIcon className="w-3.5 h-3.5 text-white/80" strokeWidth={2.2} />
          </button>

          <div className="flex items-start gap-3 relative z-10 pr-7">
            <div
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0"
            aria-hidden="true">
            
              <SparklesIcon className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                  Great day
                </span>
                <span className="text-[10px] text-white/60">·</span>
                <span className="text-[10px] font-medium text-white/80 tabular-nums">
                  5 clients · $340
                </span>
              </div>
              <h3 className="text-sm font-semibold leading-snug mb-2 text-pretty">
                Know another hardware who'd love this? Refer them, earn{' '}
                <span className="font-bold tabular-nums">$50</span> each.
              </h3>
              <div className="flex items-center gap-1.5 text-xs font-medium text-white group-hover:translate-x-0.5 transition-transform">
                Invite a friend <ChevronRightIcon className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}