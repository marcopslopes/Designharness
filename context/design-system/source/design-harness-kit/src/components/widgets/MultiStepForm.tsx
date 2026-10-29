import React, { useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ScissorsIcon,
  CalendarIcon,
  UserIcon,
  CheckIcon } from
'lucide-react';
type StepId = 'service' | 'when' | 'who' | 'review';
const steps: {
  id: StepId;
  label: string;
  icon: React.ReactNode;
}[] = [
{
  id: 'service',
  label: 'Service',
  icon: <ScissorsIcon className="size-3.5" strokeWidth={2.5} />
},
{
  id: 'when',
  label: 'When',
  icon: <CalendarIcon className="size-3.5" strokeWidth={2.5} />
},
{
  id: 'who',
  label: 'Who',
  icon: <UserIcon className="size-3.5" strokeWidth={2.5} />
},
{
  id: 'review',
  label: 'Review',
  icon: <CheckIcon className="size-3.5" strokeWidth={3} />
}];

export function MultiStepForm() {
  const [step, setStep] = useState<StepId>('when');
  const idx = steps.findIndex((s) => s.id === step);
  return (
    <div
      className="bg-paper rounded-2xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Stepper */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between gap-1">
          {steps.map((s, i) => {
            const done = i < idx;
            const active = i === idx;
            return (
              <Fragment key={s.id}>
                <button
                  type="button"
                  onClick={() => setStep(s.id)}
                  className="flex flex-col items-center gap-1.5 group">
                  
                  <span
                    className={`size-7 rounded-full flex items-center justify-center transition-colors ${done ? 'bg-ink text-paper' : active ? 'bg-ink text-paper ring-4 ring-ink/10' : 'bg-sunken text-muted'}`}>
                    
                    {done ?
                    <CheckIcon className="size-3.5" strokeWidth={3} /> :

                    s.icon
                    }
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-ink' : 'text-muted'}`}>
                    
                    {s.label}
                  </span>
                </button>
                {i < steps.length - 1 &&
                <div className="flex-1 h-[2px] bg-sunken rounded-full -mt-3 overflow-hidden">
                    <motion.div
                    className="h-full bg-ink rounded-full"
                    initial={false}
                    animate={{
                      width: i < idx ? '100%' : '0%'
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 220,
                      damping: 30
                    }} />
                  
                  </div>
                }
              </Fragment>);

          })}
        </div>
      </div>

      <div className="h-px bg-line" />

      {/* Step content */}
      <div className="px-5 py-5 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{
              opacity: 0,
              x: 12
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: -12
            }}
            transition={{
              duration: 0.2
            }}>
            
            {step === 'service' &&
            <div>
                <h3 className="text-[18px] font-bold text-ink tracking-tight mb-1">
                  Pick a service
                </h3>
                <p className="text-[12px] text-muted mb-4">
                  Choose what you're booking today.
                </p>
                <div className="space-y-2">
                  {[
                'Paint mix + Timber cut · $45',
                'Blade sharpening · $28',
                'Color refresh · $120'].
                map((l, i) =>
                <label
                  key={l}
                  className={`flex items-center gap-3 p-3 rounded-xl bg-sunken cursor-pointer ${i === 0 ? 'ring-2 ring-ink' : ''}`}>
                  
                      <input
                    type="radio"
                    name="svc"
                    defaultChecked={i === 0}
                    className="sr-only" />
                  
                      <span
                    className={`size-5 rounded-full flex items-center justify-center ${i === 0 ? 'border-[6px] border-ink bg-paper' : 'border-2 border-line bg-paper'}`} />
                  
                      <span className="text-[14px] font-semibold text-ink tabular-nums">
                        {l}
                      </span>
                    </label>
                )}
                </div>
              </div>
            }

            {step === 'when' &&
            <div>
                <h3 className="text-[18px] font-bold text-ink tracking-tight mb-1">
                  Pick a time
                </h3>
                <p className="text-[12px] text-muted mb-4 tabular-nums">
                  Wed, 12 Jun · open slots
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '09:30', '10:00', '10:30', '11:30', '14:00'].map(
                  (t, i) =>
                  <button
                    key={t}
                    type="button"
                    className={`h-10 rounded-xl text-[13px] font-bold tabular-nums transition-all active:scale-[0.97] ${i === 2 ? 'bg-ink text-paper' : 'bg-sunken text-ink hover:bg-line/60'}`}>
                    
                        {t}
                      </button>

                )}
                </div>
              </div>
            }

            {step === 'who' &&
            <div>
                <h3 className="text-[18px] font-bold text-ink tracking-tight mb-1">
                  Your details
                </h3>
                <p className="text-[12px] text-muted mb-4">
                  We'll text a confirmation.
                </p>
                <div className="space-y-2">
                  <input
                  placeholder="Full name"
                  className="w-full h-11 px-3 rounded-xl bg-sunken text-[14px] text-ink outline-none ring-1 ring-inset ring-line focus:ring-2 focus:ring-ink" />
                
                  <input
                  placeholder="Phone number"
                  className="w-full h-11 px-3 rounded-xl bg-sunken text-[14px] text-ink outline-none ring-1 ring-inset ring-line focus:ring-2 focus:ring-ink" />
                
                </div>
              </div>
            }

            {step === 'review' &&
            <div>
                <h3 className="text-[18px] font-bold text-ink tracking-tight mb-1">
                  Confirm
                </h3>
                <p className="text-[12px] text-muted mb-4">Everything good?</p>
                <div className="rounded-xl bg-sunken p-3 space-y-1.5 text-[13px] text-ink tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-muted">Service</span>
                    <span className="font-semibold">Paint mix + Timber</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">When</span>
                    <span className="font-semibold">Wed, 12 Jun · 10:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Total</span>
                    <span className="font-bold">$45.00</span>
                  </div>
                </div>
              </div>
            }
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="border-t border-line p-3 flex items-center gap-2">
        <button
          type="button"
          disabled={idx === 0}
          onClick={() => setStep(steps[Math.max(0, idx - 1)].id)}
          className="h-11 px-4 rounded-xl bg-sunken text-ink text-[14px] font-bold flex items-center gap-1.5 active:scale-[0.98] transition-transform disabled:opacity-40">
          
          <ArrowLeftIcon className="size-4" strokeWidth={2.5} />
          Back
        </button>
        <button
          type="button"
          onClick={() => {
            if (idx < steps.length - 1) setStep(steps[idx + 1].id);
          }}
          className="flex-1 h-11 rounded-xl bg-ink text-paper text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
          }}>
          
          {idx === steps.length - 1 ? 'Confirm booking' : 'Continue'}
          {idx < steps.length - 1 &&
          <ArrowRightIcon className="size-4" strokeWidth={2.5} />
          }
        </button>
      </div>
    </div>);

}