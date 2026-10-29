import React from 'react';
import { BellIcon, InfoIcon, ChevronUpIcon } from 'lucide-react';
type Pos = 'top' | 'right' | 'bottom' | 'left';
// Position-aware tooltip with caret. Always-visible for showcase.
function Tip({
  pos,
  label,
  detail,
  variant = 'dark'





}: {pos: Pos;label: string;detail?: string;variant?: 'dark' | 'light';}) {
  const wrapPos: Record<Pos, string> = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  };
  const caretPos: Record<Pos, string> = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1'
  };
  const bubble =
  variant === 'dark' ?
  'bg-ink text-paper' :
  'bg-paper text-ink ring-1 ring-line';
  return (
    <div className={`absolute ${wrapPos[pos]} z-10`}>
      <div
        className={`relative px-2.5 py-1.5 rounded-lg ${bubble} text-[12px] font-semibold whitespace-nowrap`}
        style={
        variant === 'light' ?
        {
          boxShadow: 'var(--shadow-card-strong)'
        } :
        {
          boxShadow: '0 6px 16px -6px rgba(0,0,0,0.35)'
        }
        }>
        
        {label}
        {detail &&
        <div
          className={`text-[11px] font-normal mt-0.5 ${variant === 'dark' ? 'text-paper/65' : 'text-muted'} tabular-nums`}>
          
            {detail}
          </div>
        }
        <span
          aria-hidden="true"
          className={`absolute size-2 rotate-45 ${variant === 'dark' ? 'bg-ink' : 'bg-paper ring-1 ring-line'} ${caretPos[pos]}`} />
        
      </div>
    </div>);

}
export function TooltipShowcase() {
  return (
    <div
      className="bg-paper rounded-2xl p-6"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="grid grid-cols-2 gap-y-10 gap-x-4 py-4">
        {/* TOP */}
        <div className="flex justify-center">
          <div className="relative">
            <Tip pos="top" label="Notifications" />
            <button
              type="button"
              className="size-10 rounded-xl bg-sunken flex items-center justify-center text-ink">
              
              <BellIcon className="size-[18px]" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex justify-center">
          <div className="relative">
            <button
              type="button"
              className="size-10 rounded-xl bg-ink text-paper flex items-center justify-center">
              
              <InfoIcon className="size-[18px]" strokeWidth={2.2} />
            </button>
            <Tip pos="bottom" label="Booking details" variant="light" />
          </div>
        </div>

        {/* RIGHT — with secondary detail line */}
        <div className="flex justify-end items-center pr-6">
          <div className="relative">
            <button
              type="button"
              className="size-10 rounded-xl bg-sunken flex items-center justify-center text-ink">
              
              <ChevronUpIcon className="size-[18px]" strokeWidth={2.5} />
            </button>
            <Tip pos="right" label="Move up" detail="⌘ + ↑" />
          </div>
        </div>

        {/* LEFT — light variant */}
        <div className="flex justify-start items-center pl-6">
          <div className="relative">
            <Tip pos="left" label="VIP client" variant="light" />
            <div
              className="size-10 rounded-full bg-teal/15 text-teal flex items-center justify-center text-[12px] font-bold"
              aria-hidden="true">
              
              PT
            </div>
          </div>
        </div>
      </div>
    </div>);

}