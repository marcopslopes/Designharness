import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MinusIcon,
  PlusIcon,
  ScissorsIcon,
  SparklesIcon,
  BrushIcon } from
'lucide-react';
type Item = {
  id: string;
  name: string;
  detail: string;
  unitPrice: number;
  qty: number;
  tint: 'teal' | 'plum' | 'amber' | 'rose';
  icon: React.ReactNode;
};
const tintBg: Record<Item['tint'], string> = {
  teal: 'bg-teal/12 text-teal',
  plum: 'bg-plum/12 text-plum',
  amber: 'bg-amber/12 text-amber',
  rose: 'bg-rose/12 text-rose'
};
const initial: Item[] = [
{
  id: 'paint mix',
  name: 'Paint mix + Timber cut',
  detail: '45 min · Patricia T.',
  unitPrice: 45,
  qty: 1,
  tint: 'teal',
  icon: <ScissorsIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  id: 'sharpen',
  name: 'Blade sharpening',
  detail: '30 min · Patricia T.',
  unitPrice: 28,
  qty: 1,
  tint: 'amber',
  icon: <BrushIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  id: 'tonic',
  name: 'Premium tonic',
  detail: 'Take-home product',
  unitPrice: 18,
  qty: 1,
  tint: 'plum',
  icon: <SparklesIcon className="size-[18px]" strokeWidth={2.2} />
}];

function MicroStepper({
  value,
  onChange



}: {value: number;onChange: (v: number) => void;}) {
  return (
    <div className="inline-flex items-center bg-sunken rounded-lg h-7 p-[2px] gap-[2px]">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="size-[26px] rounded-[6px] bg-paper text-ink flex items-center justify-center active:scale-[0.92] transition-transform"
        style={{
          boxShadow: 'var(--shadow-border)'
        }}>
        
        <MinusIcon className="size-3" strokeWidth={2.8} />
      </button>
      <span className="min-w-[18px] text-center text-[12px] font-bold tabular-nums text-ink">
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(value + 1)}
        className="size-[26px] rounded-[6px] bg-paper text-ink flex items-center justify-center active:scale-[0.92] transition-transform"
        style={{
          boxShadow: 'var(--shadow-border)'
        }}>
        
        <PlusIcon className="size-3" strokeWidth={2.8} />
      </button>
    </div>);

}
export function CartSummary() {
  const [items, setItems] = useState(initial);
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  return (
    <div
      className="bg-paper rounded-2xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Items */}
      <div className="divide-y divide-line">
        {items.map((it) =>
        <motion.div
          key={it.id}
          layout
          className={`flex items-center gap-3 p-3 ${it.qty === 0 ? 'opacity-50' : ''}`}>
          
            <div
            className={`shrink-0 size-11 rounded-xl flex items-center justify-center ${tintBg[it.tint]}`}
            aria-hidden="true">
            
              {it.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-ink truncate">
                {it.name}
              </div>
              <div className="text-[12px] text-muted truncate tabular-nums">
                {it.detail}
              </div>
            </div>
            <MicroStepper
            value={it.qty}
            onChange={(v) =>
            setItems((arr) =>
            arr.map((x) =>
            x.id === it.id ?
            {
              ...x,
              qty: v
            } :
            x
            )
            )
            } />
          
            <div className="shrink-0 w-[60px] text-right text-[14px] font-bold text-ink tabular-nums">
              ${(it.unitPrice * it.qty).toFixed(2)}
            </div>
          </motion.div>
        )}
      </div>

      {/* Totals */}
      <div className="px-4 py-3 bg-sunken/40 space-y-1.5">
        <div className="flex justify-between text-[13px] tabular-nums">
          <span className="text-muted">Subtotal</span>
          <span className="text-ink font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[13px] tabular-nums">
          <span className="text-muted">Tax</span>
          <span className="text-ink font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="h-px bg-line my-1.5" />
        <div className="flex items-baseline justify-between tabular-nums">
          <span className="text-[12px] font-bold uppercase tracking-wider text-muted">
            Total
          </span>
          <span className="text-[22px] font-bold text-ink tracking-tight">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>);

}