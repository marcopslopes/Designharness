import React from 'react';
interface CheckoutLineProps {
  name: string;
  duration: string;
  price: string;
  tax: string;
}
function CheckoutItem({ name, duration, price, tax }: CheckoutLineProps) {
  return (
    <div className="py-3 border-b border-line last:border-0">
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-2">
          <h4 className="font-bold text-ink">{name}</h4>
          <span className="px-1.5 py-0.5 rounded bg-surface-2 text-[10px] font-bold text-muted uppercase tracking-wider">
            {duration}
          </span>
        </div>
        <span className="font-bold text-ink tabular-nums">{price}</span>
      </div>
      <p className="text-xs text-muted tabular-nums">Tax {tax}</p>
    </div>);

}
export function CheckoutLine() {
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <CheckoutItem
        name="Magda test 2"
        duration="2h"
        price="$120.00"
        tax="$6.00" />
      
      <CheckoutItem
        name="Steph Testing 2"
        duration="Skincare"
        price="$5.00"
        tax="$0.25" />
      
      <CheckoutItem
        name="Timber line-up"
        duration="30m"
        price="$35.00"
        tax="$1.75" />
      
    </div>);

}