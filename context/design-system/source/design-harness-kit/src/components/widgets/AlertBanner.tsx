import React, { useState } from 'react';
import { AlertCircleIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function AlertBanner() {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          scale: 0.95
        }}
        animate={{
          opacity: 1,
          height: 'auto',
          scale: 1
        }}
        exit={{
          opacity: 0,
          height: 0,
          scale: 0.95,
          marginTop: 0
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
        className="overflow-hidden">
        
          <div
          role="alert"
          className="relative bg-warning/10 rounded-2xl p-4 flex items-start gap-3">
          
            <div className="flex-shrink-0 mt-0.5 text-warning">
              <AlertCircleIcon className="size-5" />
            </div>

            <div className="flex-1 min-w-0 pr-6">
              <h4 className="font-bold text-ink text-sm mb-0.5">
                Account balance: <span className="tabular-nums">$9.43</span>
              </h4>
              <p className="text-xs text-muted text-pretty mb-3">
                Add payout details to receive your money.
              </p>
              <button className="px-4 py-1.5 bg-ink text-white text-xs font-bold rounded-xl transition-transform duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2">
                Set up
              </button>
            </div>

            <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss alert"
            className="absolute top-3 right-3 size-8 flex items-center justify-center text-muted hover:text-ink transition-colors rounded-full focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:-outline-offset-2">
            
              <XIcon className="size-4" />
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}