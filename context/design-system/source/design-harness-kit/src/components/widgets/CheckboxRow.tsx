import React, { useState } from 'react';
import { CheckIcon, MinusIcon } from 'lucide-react';
type CheckState = 'unchecked' | 'checked' | 'indeterminate';
function Checkbox({
  state,
  onChange,
  label,
  disabled





}: {state: CheckState;onChange?: () => void;label: string;disabled?: boolean;}) {
  return (
    <button
      role="checkbox"
      aria-checked={state === 'indeterminate' ? 'mixed' : state === 'checked'}
      onClick={onChange}
      disabled={disabled}
      className={`flex items-center gap-2.5 py-2 text-left rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      
      <span
        aria-hidden="true"
        className={`shrink-0 size-5 rounded-md flex items-center justify-center transition-colors ${state !== 'unchecked' ? 'bg-ink' : 'bg-paper border-2 border-line'}`}>
        
        {state === 'checked' &&
        <CheckIcon className="size-3.5 text-paper" strokeWidth={3.5} />
        }
        {state === 'indeterminate' &&
        <MinusIcon className="size-3.5 text-paper" strokeWidth={3.5} />
        }
      </span>
      <span className="text-sm text-ink">{label}</span>
    </button>);

}
export function CheckboxRow() {
  const [a, setA] = useState<CheckState>('checked');
  const [b, setB] = useState<CheckState>('unchecked');
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-1"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <Checkbox
        state={a}
        onChange={() => setA(a === 'checked' ? 'unchecked' : 'checked')}
        label="Patricia Taylor" />
      
      <Checkbox
        state={b}
        onChange={() => setB(b === 'checked' ? 'unchecked' : 'checked')}
        label="Michael Brown" />
      
      <Checkbox
        state="indeterminate"
        onChange={() => {}}
        label="Select all staff" />
      
      <Checkbox state="checked" label="Working hours (locked)" disabled />
    </div>);

}