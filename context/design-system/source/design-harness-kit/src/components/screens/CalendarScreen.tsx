import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BellIcon,
  ChevronDownIcon,
  MoreVerticalIcon,
  SlidersHorizontalIcon,
  PlusIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  UsersIcon,
  ReceiptIcon,
  MegaphoneIcon,
  StoreIcon,
  SignalHighIcon,
  WifiIcon,
  BatteryFullIcon } from
'lucide-react';
// ────────────────────────────────────────────────────────────────
// CalendarScreen — composed Northline calendar view
// Rebuilds the production calendar screen using the kit's tokens
// and the same building blocks as the standalone widgets:
//   - Status bar
//   - Gradient payout banner (kit-style alert)
//   - CalendarTopHeader chrome (bell · date · filter · overflow)
//   - 7-day calendar strip with rose "today" highlight
//   - Horizontally scrollable staffer row
//   - Day agenda with pastel appointment blocks + unavailable hatching
//   - Floating clipboard FAB
//   - Five-up tab bar with center-emphasized FAB
// ────────────────────────────────────────────────────────────────
const days = [
{
  day: 'SUN',
  date: 10
},
{
  day: 'MON',
  date: 11,
  isToday: true
},
{
  day: 'TUE',
  date: 12
},
{
  day: 'WED',
  date: 13
},
{
  day: 'THU',
  date: 14
},
{
  day: 'FRI',
  date: 15
},
{
  day: 'SAT',
  date: 16
}];

const staffers = [
{
  initials: 'JN',
  name: 'Johnny',
  hours: '08:00–15:00',
  tint: 'teal',
  avatarUrl:
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face'
},
{
  initials: 'JT',
  name: 'Justas Test',
  hours: '08:00–15:00',
  tint: 'plum'
},
{
  initials: 'S',
  name: 'Sarah',
  hours: '08:00–15:00',
  tint: 'rose'
}] as
const;
type Tone = 'rust' | 'amber' | 'unavailable';
const tone: Record<
  Tone,
  {
    bg: string;
    fg: string;
  }> =
{
  rust: {
    bg: 'bg-[#C04D2C]',
    fg: 'text-white'
  },
  amber: {
    bg: 'bg-[#E8A93C]',
    fg: 'text-ink'
  },
  unavailable: {
    bg: '',
    fg: ''
  }
};
// Hours we render in the timeline (08–15)
const DAY_START_H = 8;
const DAY_END_H = 15;
const ROW_H = 56; // px per hour
const HOUR_COUNT = DAY_END_H - DAY_START_H;
type Block = {
  startMin: number; // minutes since DAY_START_H
  durationMin: number;
  label?: string;
  subtitle?: string;
  tone: Tone;
  cols?: [number, number]; // [startCol, endCol] across 3-staffer grid (0..3)
};
const blocks: Block[] = [
// 10:00 – 10:40, Johnny column
{
  startMin: (10 - DAY_START_H) * 60,
  durationMin: 40,
  label: '10:00 – 10:40',
  subtitle: 'Walk-in • lalalala',
  tone: 'rust',
  cols: [0, 1]
},
// 11:00 – 12:00, all 3 staff unavailable (hatched)
{
  startMin: (11 - DAY_START_H) * 60,
  durationMin: 60,
  tone: 'unavailable',
  cols: [0, 3]
},
// 12:10 – 15:40, Justas column
{
  startMin: (12 - DAY_START_H) * 60 + 10,
  durationMin: 210,
  label: '12:10 – 15:40',
  subtitle: 'Walk-in • test service 232',
  tone: 'amber',
  cols: [1, 2]
}];

// ── Status bar ─────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 text-ink">
      <span className="text-[15px] font-semibold tabular-nums tracking-tight">
        08:06
      </span>
      <div className="flex items-center gap-1.5">
        <SignalHighIcon className="size-[15px]" strokeWidth={2.5} />
        <WifiIcon className="size-[14px]" strokeWidth={2.5} />
        <BatteryFullIcon className="size-[17px]" strokeWidth={2} />
      </div>
    </div>);

}
// ── Gradient payout banner ─────────────────────────────────────
function PayoutBanner() {
  return (
    <div
      role="alert"
      className="rounded-2xl px-4 py-3"
      style={{
        background:
        'linear-gradient(105deg, #B6A8F4 0%, #9DB5F0 55%, #93BCEC 100%)',
        boxShadow: '0 1px 2px rgba(20,22,26,0.04)'
      }}>
      
      <p className="text-[13px] font-bold text-ink leading-snug text-pretty">
        Hey, there's <span className="tabular-nums">$9.43</span> in your
        account. Tap here to add payout details now to receive your money.
      </p>
    </div>);

}
// ── Top header (bell · date · filter · overflow) ──────────────
function TopHeader() {
  return (
    <div className="flex items-center gap-1 px-1">
      <button
        type="button"
        aria-label="Notifications"
        className="size-11 rounded-xl flex items-center justify-center text-ink active:scale-[0.96] transition-transform">
        
        <BellIcon className="size-6" strokeWidth={2} />
      </button>

      <div className="h-8 w-px bg-line mx-1" aria-hidden="true" />

      <button
        type="button"
        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl active:scale-[0.98] transition-transform"
        aria-label="Choose date — Today, 08:00 to 15:00">
        
        <div className="text-center leading-tight">
          <div className="flex items-center justify-center gap-1">
            <span className="text-[18px] font-bold text-ink tracking-tight">
              Today
            </span>
            <ChevronDownIcon className="size-4 text-ink" strokeWidth={2.5} />
          </div>
          <div className="text-[12px] text-muted tabular-nums mt-0.5">
            08:00 – 15:00
          </div>
        </div>
      </button>

      <button
        type="button"
        aria-label="Filters"
        className="size-11 rounded-xl flex items-center justify-center text-ink active:scale-[0.96] transition-transform">
        
        <SlidersHorizontalIcon className="size-5" strokeWidth={2} />
      </button>

      <button
        type="button"
        aria-label="More options"
        className="size-11 rounded-xl flex items-center justify-center text-ink active:scale-[0.96] transition-transform">
        
        <MoreVerticalIcon className="size-5" strokeWidth={2} />
      </button>
    </div>);

}
// ── Week strip ─────────────────────────────────────────────────
function WeekStrip() {
  return (
    <div className="px-1">
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((d) =>
        <button
          key={d.date}
          aria-label={`${d.isToday ? 'Today, ' : ''}${d.day} ${d.date}`}
          aria-current={d.isToday ? 'date' : undefined}
          className="relative flex flex-col items-center justify-center py-1.5 rounded-xl active:scale-[0.96] transition-transform">
          
            <span className="text-[10px] font-semibold text-muted tracking-wider mb-1">
              {d.day}
            </span>
            <span
            className={`relative flex items-center justify-center size-9 text-[15px] font-semibold tabular-nums ${d.isToday ? 'text-rose' : 'text-ink'}`}>
            
              {d.isToday &&
            <span
              className="absolute inset-0 rounded-full bg-rose/15"
              aria-hidden="true" />

            }
              <span className="relative">{d.date}</span>
            </span>
          </button>
        )}
      </div>
    </div>);

}
// ── Staff column header ────────────────────────────────────────
function StaffRow() {
  return (
    <div className="grid grid-cols-3 gap-2 px-1">
      {staffers.map((s) =>
      <div key={s.name} className="flex items-center gap-2 min-w-0">
          {'avatarUrl' in s && s.avatarUrl ?
        <img
          src={s.avatarUrl}
          alt=""
          className="size-9 rounded-full object-cover shrink-0" /> :


        <div
          className={`shrink-0 size-9 rounded-full flex items-center justify-center text-[11px] font-bold ${s.tint === 'teal' ? 'bg-teal/15 text-teal' : s.tint === 'plum' ? 'bg-surface-3 text-ink/60' : 'bg-surface-3 text-ink/60'}`}
          aria-hidden="true">
          
              {s.initials}
            </div>
        }
          <div className="min-w-0">
            <div className="text-[12px] font-bold text-ink truncate">
              {s.name}
            </div>
            <div className="text-[10px] text-muted tabular-nums">{s.hours}</div>
          </div>
        </div>
      )}
    </div>);

}
// ── Agenda timeline ────────────────────────────────────────────
function Agenda() {
  const gridHeight = HOUR_COUNT * ROW_H;
  const timeColWidth = 36;
  // 15-minute substeps per hour for left labels (00,15,30,45)
  const subSteps = [0, 15, 30, 45];
  return (
    <div
      className="relative"
      style={{
        height: gridHeight + 8
      }}>
      
      {/* Time gutter */}
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: timeColWidth
        }}
        aria-hidden="true">
        
        {Array.from({
          length: HOUR_COUNT + 1
        }).map((_, i) =>
        <div
          key={i}
          className="absolute -translate-y-1/2"
          style={{
            top: i * ROW_H
          }}>
          
            <div className="text-[10px] font-semibold text-ink tabular-nums">
              {String(DAY_START_H + i).padStart(2, '0')}:00
            </div>
            {/* sub-step labels except after last hour */}
            {i < HOUR_COUNT &&
          subSteps.slice(1).map((m, j) =>
          <div
            key={m}
            className="absolute text-[9px] text-muted tabular-nums"
            style={{
              top: (j + 1) * ROW_H / 4
            }}>
            
                  {m}
                </div>
          )}
          </div>
        )}
      </div>

      {/* Timeline grid + blocks */}
      <div
        className="absolute inset-y-0 right-0"
        style={{
          left: timeColWidth
        }}>
        
        {/* hour separators (solid) */}
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
        {/* 15-min ticks (dashed) */}
        {Array.from({
          length: HOUR_COUNT * 3
        }).map((_, i) => {
          const hourIdx = Math.floor(i / 3);
          const subIdx = i % 3 + 1; // 1,2,3 → 15,30,45
          const top = hourIdx * ROW_H + subIdx * ROW_H / 4;
          return (
            <div
              key={`sub-${i}`}
              className="absolute left-0 right-0 border-t border-dashed border-line/70"
              style={{
                top
              }}
              aria-hidden="true" />);


        })}

        {/* Appointment blocks */}
        {blocks.map((b, i) => {
          const top = b.startMin / 60 * ROW_H;
          const height = b.durationMin / 60 * ROW_H;
          const colCount = 3;
          const [c0, c1] = b.cols ?? [0, colCount];
          const left = `${c0 / colCount * 100}%`;
          const right = `${(colCount - c1) / colCount * 100}%`;
          if (b.tone === 'unavailable') {
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  top,
                  height,
                  left,
                  right,
                  backgroundImage:
                  'repeating-linear-gradient(45deg, var(--line) 0 1px, transparent 1px 9px)',
                  backgroundColor: 'var(--surface-2)',
                  borderRadius: 2
                }}
                aria-label="Unavailable" />);


          }
          const t = tone[b.tone];
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
                delay: i * 0.05,
                type: 'spring',
                stiffness: 280,
                damping: 28
              }}
              className={`absolute ${t.bg} px-2.5 py-2`}
              style={{
                top,
                height,
                left,
                right,
                borderRadius: 2
              }}>
              
              <div className={`text-[12px] font-bold ${t.fg} leading-tight`}>
                {b.label}
              </div>
              <div
                className={`text-[11px] ${t.fg} leading-tight mt-0.5 truncate`}>
                
                {b.subtitle}
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}
// ── Bottom tab bar (Northline 5-up) ───────────────────────────────
function TabBar() {
  const [active, setActive] = useState<
    'appointments' | 'clients' | 'checkout' | 'marketing' | 'profile'>(
    'appointments');
  const items = [
  {
    id: 'appointments' as const,
    label: 'Appointments',
    icon: CalendarIcon
  },
  {
    id: 'clients' as const,
    label: 'Clients',
    icon: UsersIcon
  },
  {
    id: 'checkout' as const,
    label: 'Checkout',
    icon: ReceiptIcon
  },
  {
    id: 'marketing' as const,
    label: 'Marketing',
    icon: MegaphoneIcon
  },
  {
    id: 'profile' as const,
    label: 'Profile',
    icon: StoreIcon
  }];

  return (
    <div className="bg-ink pt-2 pb-7 px-2">
      <div className="flex items-stretch justify-between">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => setActive(it.id)}
              aria-label={it.label}
              aria-current={isActive ? 'page' : undefined}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-1 rounded-xl active:scale-[0.96] transition-transform">
              
              <div
                className={`size-9 rounded-lg flex items-center justify-center ${isActive ? 'bg-paper/10' : ''}`}>
                
                <Icon
                  className={`size-5 ${isActive ? 'text-paper' : 'text-paper/55'}`}
                  strokeWidth={isActive ? 2.2 : 1.8} />
                
              </div>
              <span
                className={`text-[10px] font-semibold ${isActive ? 'text-paper' : 'text-paper/55'}`}>
                
                {it.label}
              </span>
            </button>);

        })}
      </div>
    </div>);

}
// ── Composed screen ────────────────────────────────────────────
export function CalendarScreen() {
  return (
    <div
      className="relative w-full max-w-[380px] mx-auto rounded-[44px] overflow-hidden bg-paper border border-line flex flex-col"
      style={{
        height: 780,
        boxShadow:
        '0 1px 2px rgba(20,22,26,0.04), 0 24px 60px -20px rgba(20,22,26,0.18)'
      }}>
      
      <StatusBar />

      {/* Scrollable content area */}
      <div className="flex-1 overflow-hidden flex flex-col gap-3 px-3 pt-3">
        <PayoutBanner />
        <TopHeader />
        <WeekStrip />
        <StaffRow />
        <div className="flex-1 overflow-y-auto pt-2 -mx-3 px-3">
          <Agenda />
        </div>
      </div>

      {/* Floating clipboard FAB (left) */}
      <button
        type="button"
        aria-label="Quick view"
        className="absolute left-3 bottom-[88px] size-12 rounded-full bg-paper border border-line flex items-center justify-center text-ink active:scale-[0.94] transition-transform"
        style={{
          boxShadow: '0 8px 20px rgba(20,22,26,0.12)'
        }}>
        
        <ClipboardCheckIcon className="size-5" strokeWidth={2} />
      </button>

      {/* Primary "+" FAB (right) */}
      <button
        type="button"
        aria-label="New appointment"
        className="absolute right-3 bottom-[88px] size-14 rounded-full bg-ink text-paper flex items-center justify-center active:scale-[0.94] transition-transform"
        style={{
          boxShadow: '0 10px 24px rgba(20,22,26,0.25)'
        }}>
        
        <PlusIcon className="size-6" strokeWidth={2.4} />
      </button>

      <TabBar />
    </div>);

}