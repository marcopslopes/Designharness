import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';
export type Theme = 'light' | 'dark';
export type Contrast = 'standard' | 'high';
interface ThemeControlsProps {
  theme: Theme;
  contrast: Contrast;
  onThemeChange: (theme: Theme) => void;
  onContrastChange: (contrast: Contrast) => void;
}
// ─────────────────────────────────────────────────────────────
// Floating theme + contrast controls.
//
// Two compact segmented toggles in a single glass pill, fixed
// to the top-right. Animated indicator slides between options.
// ─────────────────────────────────────────────────────────────
function Segment<T extends string>({
  value,
  options,
  onChange,
  label









}: {value: T;options: {value: T;icon?: React.ReactNode;label: string;}[];onChange: (v: T) => void;label: string;}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="relative flex items-center rounded-2xl p-0.5"
      style={{
        backgroundColor: 'var(--page-toggle-track)'
      }}>
      
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            onClick={() => onChange(opt.value)}
            className="relative z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-semibold transition-colors active:scale-[0.96]"
            style={{
              color: active ? 'var(--page-toggle-fg)' : 'var(--page-muted)'
            }}>
            
            {active &&
            <motion.span
              layoutId={`seg-${label}`}
              className="absolute inset-0 rounded-xl -z-10"
              style={{
                backgroundColor: 'var(--page-toggle-bg)'
              }}
              transition={{
                type: 'spring',
                bounce: 0.15,
                duration: 0.4
              }} />

            }
            {opt.icon}
            <span>{opt.label}</span>
          </button>);

      })}
    </div>);

}
export function ThemeControls({
  theme,
  contrast,
  onThemeChange,
  onContrastChange
}: ThemeControlsProps) {
  return (
    <div
      className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex items-center gap-2 rounded-[20px] p-1.5 backdrop-blur-xl"
      style={{
        backgroundColor: 'var(--page-toggle-bg)',
        boxShadow:
        '0 1px 2px rgba(20,22,26,0.06), 0 12px 32px -8px rgba(20,22,26,0.18)',
        border: '1px solid var(--page-line)'
      }}>
      
      <Segment
        label="Theme"
        value={theme}
        onChange={onThemeChange}
        options={[
        {
          value: 'light',
          label: 'Light',
          icon: <SunIcon className="w-3.5 h-3.5" strokeWidth={2} />
        },
        {
          value: 'dark',
          label: 'Dark',
          icon: <MoonIcon className="w-3.5 h-3.5" strokeWidth={2} />
        }]
        } />
      

      <span
        className="w-px h-5"
        style={{
          backgroundColor: 'var(--page-line)'
        }} />
      

      <Segment
        label="Contrast"
        value={contrast}
        onChange={onContrastChange}
        options={[
        {
          value: 'standard',
          label: 'AA'
        },
        {
          value: 'high',
          label: 'AAA'
        }]
        } />
      
    </div>);

}