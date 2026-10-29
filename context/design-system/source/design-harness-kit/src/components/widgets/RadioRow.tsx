import React, { useState } from 'react';
function Radio({
  on,
  onChange,
  label,
  disabled





}: {on: boolean;onChange?: () => void;label: string;disabled?: boolean;}) {
  return (
    <button
      role="radio"
      aria-checked={on}
      onClick={onChange}
      disabled={disabled}
      className={`flex items-center gap-2.5 py-2 text-left rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      
      <span
        aria-hidden="true"
        className={`shrink-0 size-5 rounded-full flex items-center justify-center transition-colors ${on ? 'border-[6px] border-ink bg-paper' : 'border-2 border-line bg-paper'}`} />
      
      <span className="text-sm text-ink">{label}</span>
    </button>);

}
export function RadioRow() {
  const [pick, setPick] = useState<'me' | 'staff' | 'all'>('staff');
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-1"
      role="radiogroup"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <Radio
        on={pick === 'me'}
        onChange={() => setPick('me')}
        label="Only me" />
      
      <Radio
        on={pick === 'staff'}
        onChange={() => setPick('staff')}
        label="Working staff members" />
      
      <Radio
        on={pick === 'all'}
        onChange={() => setPick('all')}
        label="All staff & resources" />
      
      <Radio on={false} label="Custom group (Pro)" disabled />
    </div>);

}