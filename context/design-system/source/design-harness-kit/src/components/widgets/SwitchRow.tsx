import React, { useState } from 'react';
import { motion } from 'framer-motion';
function Switch({
  on,
  onChange,
  label,
  description





}: {on: boolean;onChange: (v: boolean) => void;label: string;description?: string;}) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="w-full flex items-center gap-3 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 rounded-lg">
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-ink">{label}</div>
        {description &&
        <div className="text-xs text-muted truncate">{description}</div>
        }
      </div>
      <span
        className={`relative shrink-0 w-[44px] h-[26px] rounded-full transition-colors duration-200 ${on ? 'bg-teal' : 'bg-sunken'}`}
        aria-hidden="true">
        
        <motion.span
          className="absolute top-[2px] left-[2px] size-[22px] rounded-full bg-paper shadow-sm"
          animate={{
            x: on ? 18 : 0
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 32
          }} />
        
      </span>
    </button>);

}
export function SwitchRow() {
  const [push, setPush] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [sync, setSync] = useState(true);
  return (
    <div
      className="bg-paper rounded-2xl px-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="divide-y divide-line">
        <Switch
          on={push}
          onChange={setPush}
          label="Push notifications"
          description="Bookings, messages, reminders" />
        
        <Switch
          on={marketing}
          onChange={setMarketing}
          label="Marketing emails"
          description="Weekly digest & tips" />
        
        <Switch
          on={sync}
          onChange={setSync}
          label="Calendar sync"
          description="Google & Apple Calendar" />
        
      </div>
    </div>);

}