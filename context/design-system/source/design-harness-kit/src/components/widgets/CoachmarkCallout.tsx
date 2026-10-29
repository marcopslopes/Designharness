import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, ChevronRightIcon, XIcon } from 'lucide-react';
export function CoachmarkCallout() {
  const [step, setStep] = useState(0);
  const total = 3;
  const steps = [
  {
    title: 'Meet the new agenda view',
    body: 'See your whole day at a glance — pastel blocks show bookings color-coded by service.'
  },
  {
    title: 'Tap any block to manage',
    body: 'Reschedule, message, or check in your client right from the calendar.'
  },
  {
    title: 'Long-press to block off',
    body: "Drag-create busy time without leaving the screen. We'll keep your slots accurate."
  }];

  const current = steps[step % total];
  return (
    <div
      className="relative bg-sunken rounded-2xl p-5 overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Mock target the coachmark points to */}
      <div className="relative h-32 mb-3">
        <div
          className="absolute inset-0 rounded-xl bg-paper flex items-center gap-3 px-4"
          style={{
            boxShadow: 'var(--shadow-border)'
          }}>
          
          <div className="size-9 rounded-lg bg-teal/15 text-teal flex items-center justify-center">
            <SparklesIcon className="size-4" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-ink">Agenda view</div>
            <div className="text-[11px] text-muted">
              New · day timeline with pastels
            </div>
          </div>
        </div>

        {/* Spotlight ring — pulses around the target */}
        <motion.span
          className="absolute -inset-1 rounded-2xl ring-2 ring-teal pointer-events-none"
          aria-hidden="true"
          animate={{
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
        
        <motion.span
          className="absolute -inset-3 rounded-2xl ring-2 ring-teal/30 pointer-events-none"
          aria-hidden="true"
          animate={{
            opacity: [0.5, 0, 0.5],
            scale: [0.96, 1.04, 0.96]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
        
      </div>

      {/* Coachmark card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{
            opacity: 0,
            y: 6
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -6
          }}
          transition={{
            duration: 0.18
          }}
          className="relative bg-ink text-paper rounded-2xl p-4"
          style={{
            boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.08), 0 10px 24px -8px rgba(0,0,0,0.35)'
          }}>
          
          {/* Caret pointing up to the target */}
          <span
            aria-hidden="true"
            className="absolute -top-1.5 left-8 size-3 bg-ink rotate-45" />
          

          <div className="flex items-start gap-3">
            <span className="shrink-0 size-7 rounded-lg bg-paper/10 flex items-center justify-center">
              <SparklesIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <div className="text-[14px] font-bold tracking-tight">
                  {current.title}
                </div>
              </div>
              <p className="text-[12px] text-paper/70 leading-snug text-pretty">
                {current.body}
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss"
              className="shrink-0 size-7 rounded-lg text-paper/60 hover:bg-paper/10 hover:text-paper flex items-center justify-center">
              
              <XIcon className="size-3.5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Footer — step dots + next */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-paper/10">
            <div className="flex items-center gap-1.5">
              {Array.from({
                length: total
              }).map((_, i) =>
              <span
                key={i}
                className={`block h-1.5 rounded-full transition-all ${i === step ? 'w-5 bg-paper' : 'w-1.5 bg-paper/30'}`}
                aria-hidden="true" />

              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="text-[12px] font-semibold text-paper/60 hover:text-paper px-2 py-1">
                
                Skip
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => (s + 1) % total)}
                className="h-8 pl-3 pr-2 rounded-lg bg-paper text-ink text-[12px] font-bold flex items-center gap-1 active:scale-[0.97] transition-transform">
                
                {step === total - 1 ? 'Got it' : 'Next'}
                <ChevronRightIcon className="size-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}