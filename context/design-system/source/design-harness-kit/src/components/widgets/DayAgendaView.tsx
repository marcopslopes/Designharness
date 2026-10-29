import React from 'react';
import { motion } from 'framer-motion';
type Tone = 'teal' | 'plum' | 'rose' | 'amber' | 'leaf';
type Appt = {
  startMin: number; // minutes since dayStart
  durationMin: number;
  client: string;
  service: string;
  initials: string;
  tone: Tone;
  col?: 0 | 1; // for adjacent/overlap stacking
};
// Pastel surface + darker accent bar + colored fg
const tone: Record<
  Tone,
  {
    bg: string;
    bar: string;
    fg: string;
    chip: string;
  }> =
{
  teal: {
    bg: 'bg-teal-soft',
    bar: 'bg-teal',
    fg: 'text-teal',
    chip: 'bg-teal/15 text-teal'
  },
  plum: {
    bg: 'bg-plum-soft',
    bar: 'bg-plum',
    fg: 'text-plum',
    chip: 'bg-plum/15 text-plum'
  },
  rose: {
    bg: 'bg-rose-soft',
    bar: 'bg-rose',
    fg: 'text-rose',
    chip: 'bg-rose/15 text-rose'
  },
  amber: {
    bg: 'bg-amber-soft',
    bar: 'bg-amber',
    fg: 'text-amber',
    chip: 'bg-amber/15 text-amber'
  },
  leaf: {
    bg: 'bg-leaf-soft',
    bar: 'bg-leaf',
    fg: 'text-leaf',
    chip: 'bg-leaf/15 text-leaf'
  }
};
const DAY_START_H = 9;
const DAY_END_H = 17;
const ROW_H = 56; // px per hour
const HOUR_COUNT = DAY_END_H - DAY_START_H;
// Current "now" indicator — pin at 10:24 for the snapshot
const NOW_MIN = (10 - DAY_START_H) * 60 + 24;
const appts: Appt[] = [
{
  startMin: 0,
  durationMin: 45,
  client: 'Patricia Taylor',
  service: 'Paint mix + Timber cut',
  initials: 'PT',
  tone: 'teal'
},
{
  startMin: 60,
  durationMin: 90,
  client: 'Michael Brown',
  service: 'Paint coloring',
  initials: 'MB',
  tone: 'plum',
  col: 0
},
{
  startMin: 90,
  durationMin: 30,
  client: 'Sarah Kim',
  service: 'Express key cutting',
  initials: 'SK',
  tone: 'rose',
  col: 1
},
{
  startMin: 180,
  durationMin: 30,
  client: 'Lunch',
  service: 'Break',
  initials: '🥪',
  tone: 'amber'
},
{
  startMin: 240,
  durationMin: 60,
  client: 'Anthony Y.',
  service: 'Blade sharpening',
  initials: 'AY',
  tone: 'leaf'
},
{
  startMin: 330,
  durationMin: 75,
  client: 'Jenny L.',
  service: 'Balayage refresh',
  initials: 'JL',
  tone: 'teal'
}];

function hourLabel(h: number) {
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12} ${period}`;
}
function minToTimeLabel(min: number) {
  const totalMin = DAY_START_H * 60 + min;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
export function DayAgendaView() {
  const gridHeight = HOUR_COUNT * ROW_H;
  const timeColWidth = 48;
  const gutter = 8;
  return (
    <div
      className="bg-paper rounded-2xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Header */}
      <div className="px-4 py-3 flex items-baseline justify-between border-b border-line">
        <div>
          <div className="text-[18px] font-bold text-ink tracking-tight">
            Wednesday
          </div>
          <div className="text-[12px] text-muted tabular-nums">
            12 June · 6 appointments
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Booked
          </div>
          <div className="text-[14px] font-bold text-ink tabular-nums">
            5h 30m
          </div>
        </div>
      </div>

      {/* Agenda body */}
      <div
        className="relative px-3 py-3"
        style={{
          height: gridHeight + 24
        }}>
        
        {/* Time column + hour lines */}
        <div
          className="absolute inset-y-3 left-3"
          style={{
            width: timeColWidth
          }}
          aria-hidden="true">
          
          {Array.from({
            length: HOUR_COUNT + 1
          }).map((_, i) =>
          <div
            key={i}
            className="absolute -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-muted tabular-nums"
            style={{
              top: i * ROW_H
            }}>
            
              {hourLabel(DAY_START_H + i)}
            </div>
          )}
        </div>

        <div
          className="absolute inset-y-3 right-3"
          style={{
            left: timeColWidth + gutter
          }}>
          
          {/* Hour separators */}
          {Array.from({
            length: HOUR_COUNT + 1
          }).map((_, i) =>
          <div
            key={`hr-${i}`}
            className="absolute left-0 right-0 h-px bg-line"
            style={{
              top: i * ROW_H
            }}
            aria-hidden="true" />

          )}

          {/* Appointment blocks */}
          {appts.map((a, i) => {
            const top = a.startMin / 60 * ROW_H + 2;
            const height = a.durationMin / 60 * ROW_H - 4;
            const split = appts.some(
              (b) => b !== a && b.col != null && a.col != null
            );
            const isStacked = a.col != null;
            const isShort = a.durationMin < 40;
            const t = tone[a.tone];
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 4
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i * 0.04,
                  type: 'spring',
                  stiffness: 280,
                  damping: 28
                }}
                className={`absolute rounded-xl pl-2.5 pr-2 py-1.5 ${t.bg} overflow-hidden`}
                style={{
                  top,
                  height,
                  left: isStacked && a.col === 1 ? 'calc(50% + 3px)' : 0,
                  right: isStacked && a.col === 0 ? 'calc(50% + 3px)' : 0,
                  boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.6), 0 1px 2px rgba(20,22,26,0.04)'
                }}>
                
                {/* Left accent bar */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full ${t.bar}`} />
                

                {isShort ?
                <div className="flex items-center gap-2 min-w-0 h-full">
                    <span
                    className={`shrink-0 text-[10px] font-bold tabular-nums ${t.fg}`}>
                    
                      {minToTimeLabel(a.startMin)}
                    </span>
                    <span className="text-[12px] font-semibold text-ink truncate">
                      {a.client}
                    </span>
                  </div> :

                <>
                    <div
                    className={`text-[10px] font-bold tabular-nums ${t.fg} leading-tight`}>
                    
                      {minToTimeLabel(a.startMin)} ·{' '}
                      {a.durationMin >= 60 ?
                    `${Math.floor(a.durationMin / 60)}h${a.durationMin % 60 ? ` ${a.durationMin % 60}m` : ''}` :
                    `${a.durationMin}m`}
                    </div>
                    <div className="text-[13px] font-bold text-ink leading-tight truncate mt-0.5">
                      {a.client}
                    </div>
                    {height > 50 &&
                  <div className="text-[11px] text-ink/70 truncate mt-0.5">
                        {a.service}
                      </div>
                  }
                  </>
                }
              </motion.div>);

          })}

          {/* Now line */}
          <div
            className="absolute left-0 right-0 flex items-center pointer-events-none z-10"
            style={{
              top: NOW_MIN / 60 * ROW_H
            }}
            aria-label="Current time">
            
            <span
              className="size-2.5 rounded-full bg-rose -ml-1"
              style={{
                boxShadow: '0 0 0 3px rgba(194,74,110,0.18)'
              }} />
            
            <span className="h-[2px] bg-rose flex-1 rounded-full" />
            <span
              className="ml-1 text-[10px] font-bold tabular-nums text-rose bg-paper px-1.5 py-0.5 rounded-md"
              style={{
                boxShadow: 'var(--shadow-border)'
              }}>
              
              10:24
            </span>
          </div>
        </div>
      </div>
    </div>);

}