import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TagIcon, XIcon, SparklesIcon } from 'lucide-react';
export function DiscountCodeField() {
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<{
    code: string;
    off: number;
  } | null>({
    code: 'NEWCLIENT15',
    off: 11.98
  });
  const [error, setError] = useState<string | null>(null);
  const apply = () => {
    const c = code.trim().toUpperCase();
    if (!c) return;
    if (c === 'INVALID') {
      setError("That code isn't valid anymore.");
      return;
    }
    setApplied({
      code: c,
      off: 8.5
    });
    setCode('');
    setError(null);
  };
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-3"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="flex items-center gap-2">
        <span className="size-8 rounded-lg bg-teal/12 text-teal flex items-center justify-center">
          <TagIcon className="size-4" strokeWidth={2.5} />
        </span>
        <h3 className="text-[14px] font-bold text-ink tracking-tight">
          Promo or gift code
        </h3>
      </div>

      <div
        className={`flex items-stretch h-12 rounded-2xl bg-sunken ring-1 ring-inset transition-all ${error ? 'ring-danger/60' : 'ring-line focus-within:ring-2 focus-within:ring-ink'}`}>
        
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') apply();
          }}
          placeholder="Enter code"
          className="flex-1 min-w-0 bg-transparent px-3.5 text-[14px] font-semibold tracking-wide text-ink placeholder:text-muted-soft placeholder:font-normal outline-none" />
        
        <button
          type="button"
          onClick={apply}
          disabled={!code.trim()}
          className="my-1.5 mr-1.5 px-4 rounded-xl bg-ink text-paper text-[13px] font-bold active:scale-[0.97] transition-transform disabled:opacity-40">
          
          Apply
        </button>
      </div>

      {error && <p className="text-[12px] text-danger px-1">{error}</p>}

      <AnimatePresence>
        {applied &&
        <motion.div
          initial={{
            opacity: 0,
            y: -4
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-leaf/10">
          
            <span className="size-7 rounded-lg bg-leaf/20 text-leaf flex items-center justify-center">
              <SparklesIcon className="size-3.5" strokeWidth={2.5} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-bold text-leaf tracking-wide">
                {applied.code}
              </div>
              <div className="text-[11px] text-leaf/80 tabular-nums">
                –${applied.off.toFixed(2)} applied at checkout
              </div>
            </div>
            <button
            type="button"
            aria-label="Remove code"
            onClick={() => setApplied(null)}
            className="shrink-0 size-7 rounded-lg text-leaf hover:bg-leaf/15 flex items-center justify-center active:scale-[0.92] transition-all">
            
              <XIcon className="size-3.5" strokeWidth={2.5} />
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}