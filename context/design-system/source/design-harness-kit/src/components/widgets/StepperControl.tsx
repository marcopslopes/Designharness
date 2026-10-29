import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
function Stepper({
  value,
  onChange,
  min = 0,
  max = 99





}: {value: number;onChange: (v: number) => void;min?: number;max?: number;}) {
  return (
    <div className="inline-flex items-center bg-sunken rounded-xl p-1 gap-1">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="size-9 rounded-lg bg-paper text-ink flex items-center justify-center active:scale-[0.94] transition-transform disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        style={{
          boxShadow: 'var(--shadow-border)'
        }}>
        
        <MinusIcon className="size-4" strokeWidth={2.5} />
      </button>
      <span className="min-w-[32px] text-center text-sm font-bold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="size-9 rounded-lg bg-paper text-ink flex items-center justify-center active:scale-[0.94] transition-transform disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal"
        style={{
          boxShadow: 'var(--shadow-border)'
        }}>
        
        <PlusIcon className="size-4" strokeWidth={2.5} />
      </button>
    </div>);

}
export function StepperControl() {
  const [qty, setQty] = useState(2);
  const [people, setPeople] = useState(1);
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-3"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-ink">Service quantity</div>
          <div className="text-xs text-muted">Paint mix</div>
        </div>
        <Stepper value={qty} onChange={setQty} max={10} />
      </div>
      <div className="h-px bg-line" />
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-ink">Group size</div>
          <div className="text-xs text-muted">1–8 people</div>
        </div>
        <Stepper value={people} onChange={setPeople} min={1} max={8} />
      </div>
    </div>);

}