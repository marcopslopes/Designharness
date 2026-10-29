import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckIcon,
  CalendarIcon,
  MapPinIcon,
  DownloadIcon,
  ShareIcon } from
'lucide-react';
export function OrderConfirmation() {
  return (
    <div
      className="bg-paper rounded-2xl p-5 text-center"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Animated success mark */}
      <motion.div
        initial={{
          scale: 0.6,
          opacity: 0
        }}
        animate={{
          scale: 1,
          opacity: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 320,
          damping: 22
        }}
        className="mx-auto mb-4 size-16 rounded-full bg-leaf flex items-center justify-center relative"
        aria-hidden="true">
        
        <motion.span
          className="absolute inset-0 rounded-full bg-leaf/30"
          animate={{
            scale: [1, 1.5],
            opacity: [0.6, 0]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: 'easeOut'
          }} />
        
        <CheckIcon className="size-8 text-paper relative" strokeWidth={3} />
      </motion.div>

      <h2 className="text-[20px] font-bold text-ink tracking-tight">
        You're booked.
      </h2>
      <p className="text-[13px] text-muted mt-1 text-pretty">
        We've sent a confirmation and added it to your calendar.
      </p>

      <div className="mt-5 rounded-xl bg-sunken p-3 text-left space-y-2.5">
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-lg bg-paper text-ink flex items-center justify-center shrink-0">
            <CalendarIcon className="size-4" strokeWidth={2.4} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
              When
            </div>
            <div className="text-[13px] font-semibold text-ink tabular-nums">
              Wed, 12 Jun · 10:00 – 11:00
            </div>
          </div>
        </div>
        <div className="h-px bg-line" />
        <div className="flex items-center gap-3">
          <span className="size-8 rounded-lg bg-paper text-ink flex items-center justify-center shrink-0">
            <MapPinIcon className="size-4" strokeWidth={2.4} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Where
            </div>
            <div className="text-[13px] font-semibold text-ink truncate">
              Park Avenue Hardware · Patricia T.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-sunken p-3 text-left space-y-1.5 tabular-nums">
        <div className="flex justify-between text-[12px]">
          <span className="text-muted">Order</span>
          <span className="text-ink font-semibold">#BK-04812</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-muted">Paid with</span>
          <span className="text-ink font-semibold">Apple Pay</span>
        </div>
        <div className="h-px bg-line my-1" />
        <div className="flex justify-between">
          <span className="text-[12px] font-bold uppercase tracking-wider text-muted">
            Total
          </span>
          <span className="text-[14px] font-bold text-ink">$79.84</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="flex-1 h-11 rounded-xl bg-sunken text-ink text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform">
          
          <DownloadIcon className="size-4" strokeWidth={2.4} />
          Receipt
        </button>
        <button
          type="button"
          className="flex-1 h-11 rounded-xl bg-sunken text-ink text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform">
          
          <ShareIcon className="size-4" strokeWidth={2.4} />
          Share
        </button>
      </div>

      <button
        type="button"
        className="mt-2 w-full h-12 rounded-2xl bg-ink text-paper text-[14px] font-bold active:scale-[0.99] transition-transform"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
        
        Done
      </button>
    </div>);

}