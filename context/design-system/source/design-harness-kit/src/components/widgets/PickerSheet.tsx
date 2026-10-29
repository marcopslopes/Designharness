import React, { useState } from 'react';
const options = [
'15 min',
'20 min',
'30 min',
'45 min',
'1 h',
'1 h 15 min',
'1 h 30 min',
'2 h',
'2 h 30 min'];

export function PickerSheet() {
  const [selected, setSelected] = useState('45 min');
  return (
    <div
      className="bg-paper rounded-t-[28px] overflow-hidden pt-2"
      style={{
        boxShadow:
        '0 -10px 36px -8px rgba(20, 22, 26, 0.14), 0 0 0 1px rgba(20, 22, 26, 0.03)'
      }}>
      
      <div className="flex justify-center pt-2 pb-3">
        <span
          className="block h-1 w-9 rounded-full bg-ink/20"
          aria-hidden="true" />
        
      </div>

      <div className="relative flex items-center justify-between px-4 pb-3">
        <button
          type="button"
          className="text-teal text-[15px] font-semibold active:scale-[0.96] transition-transform">
          
          Cancel
        </button>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-[16px] font-bold text-ink tracking-tight">
          Duration
        </h2>
        <button
          type="button"
          className="h-9 px-4 rounded-full bg-teal text-paper text-[14px] font-bold active:scale-[0.96] transition-transform"
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
          }}>
          
          Done
        </button>
      </div>

      <div className="h-px bg-line" />

      {/* Wheel-like picker — center row highlighted with hairlines */}
      <div className="relative px-4 py-4">
        {/* Selection band */}
        <div
          className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-9 rounded-xl bg-sunken pointer-events-none"
          aria-hidden="true" />
        

        <div
          className="relative h-[180px] overflow-y-auto snap-y snap-mandatory no-scrollbar"
          style={{
            maskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
          }}>
          
          <ul className="flex flex-col items-center py-[72px]">
            {options.map((o) => {
              const isActive = o === selected;
              return (
                <li key={o} className="snap-center w-full">
                  <button
                    type="button"
                    onClick={() => setSelected(o)}
                    className={`w-full h-9 flex items-center justify-center text-[16px] tabular-nums transition-colors ${isActive ? 'text-ink font-bold' : 'text-muted font-medium'}`}>
                    
                    {o}
                  </button>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </div>);

}