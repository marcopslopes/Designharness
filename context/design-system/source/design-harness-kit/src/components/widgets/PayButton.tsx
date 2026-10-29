import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockIcon, CheckIcon } from 'lucide-react';
type Status = 'idle' | 'processing' | 'done';
export function PayButton() {
  const [status, setStatus] = useState<Status>('idle');
  const total = 79.84;
  const run = () => {
    if (status !== 'idle') return;
    setStatus('processing');
    setTimeout(() => setStatus('done'), 1400);
    setTimeout(() => setStatus('idle'), 3000);
  };
  return (
    <div
      className="bg-paper rounded-[20px] p-3 flex items-center gap-3"
      style={{
        boxShadow:
        '0 -8px 32px -8px rgba(20, 22, 26, 0.10), 0 0 0 1px rgba(20, 22, 26, 0.03)'
      }}>
      
      {/* Total block */}
      <div className="flex-1 min-w-0 pl-2">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted">
          Total
        </div>
        <div className="flex items-baseline gap-1.5 tabular-nums">
          <span className="text-[22px] font-bold text-ink tracking-tight leading-none">
            ${total.toFixed(2)}
          </span>
          <span className="text-[11px] text-muted">incl. tax</span>
        </div>
      </div>

      {/* Pay CTA */}
      <button
        type="button"
        onClick={run}
        disabled={status === 'processing'}
        className="relative h-14 min-w-[170px] rounded-2xl bg-ink text-paper text-[15px] font-bold overflow-hidden active:scale-[0.98] transition-transform disabled:cursor-wait"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)'
        }}
        aria-live="polite">
        
        <AnimatePresence mode="wait" initial={false}>
          {status === 'idle' &&
          <motion.span
            key="idle"
            initial={{
              opacity: 0,
              y: 4
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -4
            }}
            transition={{
              duration: 0.18
            }}
            className="absolute inset-0 flex items-center justify-center gap-2">
            
              <LockIcon className="size-4" strokeWidth={2.5} />
              Pay ${total.toFixed(2)}
            </motion.span>
          }
          {status === 'processing' &&
          <motion.span
            key="processing"
            initial={{
              opacity: 0,
              y: 4
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -4
            }}
            transition={{
              duration: 0.18
            }}
            className="absolute inset-0 flex items-center justify-center gap-2">
            
              <motion.span
              className="size-4 rounded-full border-2 border-paper/30 border-t-paper"
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: 'linear'
              }}
              aria-hidden="true" />
            
              Processing
            </motion.span>
          }
          {status === 'done' &&
          <motion.span
            key="done"
            initial={{
              opacity: 0,
              y: 4
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -4
            }}
            transition={{
              duration: 0.18
            }}
            className="absolute inset-0 flex items-center justify-center gap-2 bg-leaf">
            
              <CheckIcon className="size-5" strokeWidth={3} />
              Paid
            </motion.span>
          }
        </AnimatePresence>
      </button>
    </div>);

}