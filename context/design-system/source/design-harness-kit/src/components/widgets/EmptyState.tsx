import React from 'react';
import { motion } from 'framer-motion';
import { CalendarPlusIcon, PlusIcon } from 'lucide-react';
export function EmptyState() {
  return (
    <div
      className="bg-paper rounded-2xl p-6 text-center"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Decorative glyph stack */}
      <div className="relative mx-auto mb-5 size-24 flex items-center justify-center">
        <motion.span
          className="absolute inset-0 rounded-3xl bg-teal/10"
          animate={{
            scale: [1, 1.04, 1]
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          aria-hidden="true" />
        
        <span
          className="absolute inset-3 rounded-2xl bg-teal/20"
          aria-hidden="true" />
        
        <span
          className="relative size-12 rounded-xl bg-teal text-paper flex items-center justify-center"
          style={{
            boxShadow: '0 6px 16px -6px rgba(0,112,120,0.6)'
          }}
          aria-hidden="true">
          
          <CalendarPlusIcon className="size-6" strokeWidth={2.2} />
        </span>
      </div>

      <h3 className="text-[18px] font-bold text-ink tracking-tight mb-1">
        Nothing on the books today
      </h3>
      <p className="text-[13px] text-muted leading-relaxed text-pretty max-w-[280px] mx-auto">
        Add a walk-in or block off time to keep your day organized.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="button"
          className="w-full h-12 rounded-2xl bg-ink text-paper text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
          
          <PlusIcon className="size-4" strokeWidth={2.5} />
          New booking
        </button>
        <button
          type="button"
          className="w-full h-11 rounded-2xl bg-sunken text-ink text-[14px] font-semibold active:scale-[0.98] transition-transform">
          
          Import from calendar
        </button>
      </div>
    </div>);

}