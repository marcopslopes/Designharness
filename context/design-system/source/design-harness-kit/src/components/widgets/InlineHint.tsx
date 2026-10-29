import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  InfoIcon,
  HelpCircleIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  XIcon } from
'lucide-react';
type Tone = 'info' | 'tip' | 'warn';
function InlineBanner({
  tone,
  title,
  body,
  dismissible = true





}: {tone: Tone;title: string;body: string;dismissible?: boolean;}) {
  const [open, setOpen] = useState(true);
  const map: Record<
    Tone,
    {
      bg: string;
      border: string;
      fg: string;
      icon: React.ReactNode;
    }> =
  {
    info: {
      bg: 'bg-teal-soft',
      border: 'ring-teal/20',
      fg: 'text-teal',
      icon: <InfoIcon className="size-3.5" strokeWidth={2.5} />
    },
    tip: {
      bg: 'bg-plum-soft',
      border: 'ring-plum/20',
      fg: 'text-plum',
      icon: <LightbulbIcon className="size-3.5" strokeWidth={2.5} />
    },
    warn: {
      bg: 'bg-amber-soft',
      border: 'ring-amber/20',
      fg: 'text-amber',
      icon: <AlertTriangleIcon className="size-3.5" strokeWidth={2.5} />
    }
  };
  const t = map[tone];
  return (
    <AnimatePresence>
      {open &&
      <motion.div
        initial={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto'
        }}
        exit={{
          opacity: 0,
          height: 0
        }}
        className="overflow-hidden">
        
          <div
          className={`flex items-start gap-2.5 p-2.5 rounded-xl ${t.bg} ring-1 ring-inset ${t.border}`}>
          
            <span
            className={`shrink-0 size-6 rounded-lg bg-paper/60 ${t.fg} flex items-center justify-center mt-0.5`}
            aria-hidden="true">
            
              {t.icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className={`text-[12px] font-bold ${t.fg} leading-tight`}>
                {title}
              </div>
              <div className="text-[12px] text-ink/80 leading-snug mt-0.5 text-pretty">
                {body}
              </div>
            </div>
            {dismissible &&
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
            className={`shrink-0 size-6 rounded-lg ${t.fg} hover:bg-paper/40 flex items-center justify-center`}>
            
                <XIcon className="size-3" strokeWidth={2.5} />
              </button>
          }
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}
function HintIcon({ label, content }: {label: string;content: string;}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`Help: ${label}`}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="size-4 rounded-full text-muted hover:text-ink transition-colors">
        
        <HelpCircleIcon className="size-4" strokeWidth={2.2} />
      </button>
      <AnimatePresence>
        {open &&
        <motion.span
          initial={{
            opacity: 0,
            y: 4,
            scale: 0.96
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 4,
            scale: 0.96
          }}
          transition={{
            duration: 0.14
          }}
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-20 w-[200px]">
          
            <span className="block relative bg-ink text-paper rounded-lg px-2.5 py-2 text-[11px] leading-snug text-left">
              {content}
              <span
              aria-hidden="true"
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 size-2 bg-ink rotate-45" />
            
            </span>
          </motion.span>
        }
      </AnimatePresence>
    </span>);

}
export function InlineHint() {
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Field with inline hint icon */}
      <div>
        <div className="flex items-center gap-1.5 mb-1.5 px-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Booking buffer
          </label>
          <HintIcon
            label="Booking buffer"
            content="Extra minutes added after each booking. Use it for cleanup or notes." />
          
        </div>
        <div className="flex items-center h-11 rounded-xl bg-sunken ring-1 ring-inset ring-line px-3.5">
          <span className="text-[14px] font-semibold text-ink tabular-nums flex-1">
            15 min
          </span>
          <span className="text-[11px] text-muted">
            added after each booking
          </span>
        </div>
      </div>

      {/* Field with caption hint */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5 px-1">
          Cancellation policy
        </label>
        <div className="flex items-center h-11 rounded-xl bg-sunken ring-1 ring-inset ring-line px-3.5">
          <span className="text-[14px] font-semibold text-ink flex-1">
            24 hours
          </span>
          <span className="text-[11px] text-muted">free cancel</span>
        </div>
        <p className="mt-1.5 px-1 flex items-start gap-1.5 text-[11px] text-muted leading-snug">
          <InfoIcon
            className="size-3 mt-0.5 shrink-0"
            strokeWidth={2.5}
            aria-hidden="true" />
          
          Clients who cancel within 24 h are charged 50% of the service price.
        </p>
      </div>

      {/* Inline banner family */}
      <div className="space-y-2">
        <InlineBanner
          tone="info"
          title="Heads up"
          body="Your hours sync to Northline every 5 minutes." />
        
        <InlineBanner
          tone="tip"
          title="Pro tip"
          body="Add a buffer of 10–15 minutes for color services to avoid rushing." />
        
        <InlineBanner
          tone="warn"
          title="Almost full"
          body="You're booked 90% for next week. Consider opening up more slots." />
        
      </div>
    </div>);

}