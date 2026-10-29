import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DeleteIcon } from 'lucide-react';
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];
export function POSKeypad() {
  // Amount stored as cents
  const [cents, setCents] = useState(0);
  const press = (k: string) => {
    if (k === '⌫') {
      setCents((c) => Math.floor(c / 10));
      return;
    }
    if (k === '.') return; // already handled by base-10 cents model
    const digit = parseInt(k, 10);
    if (Number.isNaN(digit)) return;
    setCents((c) => Math.min(c * 10 + digit, 99999999));
  };
  const dollars = (cents / 100).toFixed(2);
  return (
    <div
      className="bg-paper rounded-2xl p-5"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Amount display */}
      <div className="text-center mb-5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1">
          Charge amount
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={dollars}
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
              duration: 0.12
            }}
            className="text-[44px] font-bold text-ink tracking-tight tabular-nums leading-none">
            
            <span className="text-muted">$</span>
            {dollars}
          </motion.div>
        </AnimatePresence>
        <div className="mt-1 inline-flex h-6 items-center gap-1 px-2 rounded-md bg-sunken text-[11px] text-muted">
          Cash sale · No tax
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((k) =>
        <button
          key={k}
          type="button"
          onClick={() => press(k)}
          className={`h-14 rounded-2xl text-[20px] font-bold tabular-nums transition-all active:scale-[0.96] ${k === '⌫' ? 'bg-sunken text-ink flex items-center justify-center' : k === '.' ? 'bg-sunken text-muted' : 'bg-sunken text-ink hover:bg-line/50'}`}
          aria-label={k === '⌫' ? 'Delete' : k}>
          
            {k === '⌫' ?
          <DeleteIcon className="size-5" strokeWidth={2.2} /> :

          k
          }
          </button>
        )}
      </div>

      {/* Charge CTA */}
      <button
        type="button"
        disabled={cents === 0}
        className="mt-4 w-full h-13 py-3.5 rounded-2xl bg-ink text-paper text-[15px] font-bold active:scale-[0.99] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
        }}>
        
        Charge ${dollars}
      </button>
    </div>);

}