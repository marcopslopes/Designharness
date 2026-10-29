import React, { useState } from 'react';
function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  unit






}: {value: number;onChange: (v: number) => void;min?: number;max?: number;unit?: string;}) {
  const pct = (value - min) / (max - min) * 100;
  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-xs text-muted tabular-nums">
          {min}
          {unit}
        </span>
        <span className="text-2xl font-bold text-ink tabular-nums tracking-tight">
          {value}
          {unit}
        </span>
        <span className="text-xs text-muted tabular-nums">
          {max}
          {unit}
        </span>
      </div>
      <div className="relative h-[6px] bg-sunken rounded-full">
        <div
          className="absolute inset-y-0 left-0 bg-ink rounded-full"
          style={{
            width: `${pct}%`
          }} />
        
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label="Slider" />
        
        <div
          className="absolute top-1/2 -translate-y-1/2 size-[22px] rounded-full bg-paper border-2 border-ink pointer-events-none"
          style={{
            left: `calc(${pct}% - 11px)`,
            boxShadow: 'var(--shadow-card)'
          }} />
        
      </div>
    </div>);

}
export function SliderControl() {
  const [duration, setDuration] = useState(45);
  return (
    <div
      className="bg-paper rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">
        Duration
      </div>
      <Slider
        value={duration}
        onChange={setDuration}
        min={15}
        max={120}
        unit=" min" />
      
    </div>);

}