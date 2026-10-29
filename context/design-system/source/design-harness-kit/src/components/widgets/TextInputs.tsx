import React, { useState } from 'react';
function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  hint







}: {label: string;value: string;onChange: (v: string) => void;placeholder?: string;error?: string;hint?: string;}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full h-11 px-3 rounded-xl bg-paper text-sm text-ink placeholder:text-muted-soft border-2 transition-colors focus:outline-none ${error ? 'border-danger focus:border-danger' : 'border-line focus:border-ink'}`} />
      
      {error ?
      <p className="mt-1 text-[11px] text-danger">{error}</p> :
      hint ?
      <p className="mt-1 text-[11px] text-muted">{hint}</p> :
      null}
    </div>);

}
export function TextInputs() {
  const [name, setName] = useState('Patricia Taylor');
  const [phone, setPhone] = useState('');
  return (
    <div
      className="bg-paper rounded-2xl p-4 space-y-3"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <Field
        label="Full name"
        value={name}
        onChange={setName}
        hint="Shown on bookings and receipts" />
      
      <Field
        label="Phone"
        value={phone}
        onChange={setPhone}
        placeholder="+1 (555) 000-0000" />
      
      <Field
        label="Email"
        value="not-an-email"
        onChange={() => {}}
        error="Enter a valid email address" />
      
    </div>);

}