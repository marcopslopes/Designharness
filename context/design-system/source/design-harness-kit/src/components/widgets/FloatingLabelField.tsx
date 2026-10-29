import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
type State = 'idle' | 'focus' | 'filled' | 'success' | 'error';
function Field({
  label,
  value,
  onChange,
  state,
  message,
  type = 'text',
  trailing








}: {label: string;value: string;onChange: (v: string) => void;state: State;message?: string;type?: string;trailing?: React.ReactNode;}) {
  const [focused, setFocused] = useState(false);
  const elevated = focused || value.length > 0;
  const ringColor: Record<State, string> = {
    idle: 'ring-line',
    focus: 'ring-ink',
    filled: 'ring-line',
    success: 'ring-leaf/60',
    error: 'ring-danger/60'
  };
  const labelColor: Record<State, string> = {
    idle: 'text-muted',
    focus: 'text-ink',
    filled: 'text-muted',
    success: 'text-leaf',
    error: 'text-danger'
  };
  const effective: State = focused ? 'focus' : state;
  return (
    <div className="w-full">
      <div
        className={`relative h-14 rounded-2xl bg-sunken px-4 ring-1 ring-inset transition-all duration-200 ${ringColor[effective]} ${focused ? 'ring-2' : ''}`}>
        
        <motion.label
          className={`absolute left-4 pointer-events-none origin-left ${labelColor[effective]}`}
          animate={{
            y: elevated ? -10 : 0,
            scale: elevated ? 0.75 : 1,
            top: elevated ? 14 : 18
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 32
          }}>
          
          <span className="text-[15px] font-medium">{label}</span>
        </motion.label>

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full h-full pt-4 bg-transparent text-[15px] text-ink outline-none tabular-nums pr-9"
          aria-invalid={state === 'error'} />
        

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
          {trailing ?? (
          state === 'success' ?
          <CheckIcon className="size-[18px] text-leaf" strokeWidth={2.5} /> :
          state === 'error' ?
          <AlertCircleIcon
            className="size-[18px] text-danger"
            strokeWidth={2.5} /> :

          null)}
        </div>
      </div>
      {message &&
      <p
        className={`mt-1.5 text-[12px] px-1 ${state === 'error' ? 'text-danger' : state === 'success' ? 'text-leaf' : 'text-muted'}`}>
        
          {message}
        </p>
      }
    </div>);

}
export function FloatingLabelField() {
  const [name, setName] = useState('Patricia Taylor');
  const [email, setEmail] = useState('patricia@');
  const [phone, setPhone] = useState('+1 415 555 0119');
  const [pw, setPw] = useState('a-secret-pw');
  const [showPw, setShowPw] = useState(false);
  return (
    <div
      className="bg-paper rounded-2xl p-5 space-y-3"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <Field label="Full name" value={name} onChange={setName} state="filled" />
      <Field
        label="Email"
        value={email}
        onChange={setEmail}
        state="error"
        message="That doesn't look like a valid email." />
      
      <Field
        label="Phone"
        value={phone}
        onChange={setPhone}
        state="success"
        message="We'll text a confirmation here." />
      
      <Field
        label="Password"
        value={pw}
        onChange={setPw}
        state="idle"
        type={showPw ? 'text' : 'password'}
        trailing={
        <button
          type="button"
          aria-label={showPw ? 'Hide password' : 'Show password'}
          onClick={() => setShowPw((v) => !v)}
          className="text-muted active:scale-[0.9] transition-transform">
          
            {showPw ?
          <EyeOffIcon className="size-[18px]" strokeWidth={2.2} /> :

          <EyeIcon className="size-[18px]" strokeWidth={2.2} />
          }
          </button>
        } />
      
    </div>);

}