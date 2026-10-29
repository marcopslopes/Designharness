import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
type Staff = {
  initials: string;
  name: string;
  hours: string;
  tint: 'teal' | 'plum' | 'rose' | 'amber';
  online?: boolean;
};
const tintBg: Record<Staff['tint'], string> = {
  teal: 'bg-teal/15 text-teal',
  plum: 'bg-plum/15 text-plum',
  rose: 'bg-rose/15 text-rose',
  amber: 'bg-amber/15 text-amber'
};
function Avatar({ s }: {s: Staff;}) {
  return (
    <div
      className={`relative shrink-0 size-9 rounded-full ${tintBg[s.tint]} flex items-center justify-center text-[11px] font-bold`}
      aria-hidden="true">
      
      {s.initials}
      {s.online &&
      <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-leaf ring-2 ring-paper" />
      }
    </div>);

}
function PairRow({ a, b }: {a: Staff;b: Staff;}) {
  return (
    <div
      className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-paper p-2"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {[a, b].map((s, i) =>
      <div key={i} className="flex items-center gap-2 min-w-0">
          <Avatar s={s} />
          <div className="min-w-0">
            <div className="text-[12px] font-semibold text-ink truncate">
              {s.name}
            </div>
            <div className="text-[10px] text-muted tabular-nums">{s.hours}</div>
          </div>
        </div>
      )}
    </div>);

}
function AllWorkingRow({ s }: {s: Staff;}) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between gap-3 rounded-xl border border-line bg-paper p-2 pr-3 text-left active:scale-[0.99] transition-transform"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="flex items-center gap-2 min-w-0">
        <Avatar s={s} />
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-ink truncate">
            {s.name}
          </div>
          <div className="text-[10px] text-muted tabular-nums">{s.hours}</div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[12px] font-semibold text-ink shrink-0">
        All working staff
        <ChevronRightIcon className="size-4" strokeWidth={2.5} />
      </div>
    </button>);

}
export function StaffersBar() {
  return (
    <div className="space-y-2">
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted px-1">
        Staffers
      </div>
      <PairRow
        a={{
          initials: 'PT',
          name: 'Patricia Taylor',
          hours: '10:00–19:00',
          tint: 'teal',
          online: true
        }}
        b={{
          initials: 'MB',
          name: 'Michael Brown',
          hours: '10:00–19:00',
          tint: 'plum'
        }} />
      
      <PairRow
        a={{
          initials: 'AY',
          name: 'Anthony Y.',
          hours: '10:00–19:00',
          tint: 'amber',
          online: true
        }}
        b={{
          initials: 'PT',
          name: 'Patricia T.',
          hours: '10:00–19:00',
          tint: 'teal'
        }} />
      
      <AllWorkingRow
        s={{
          initials: 'PT',
          name: 'Patricia Taylor',
          hours: '10:00–19:00',
          tint: 'teal'
        }} />
      
    </div>);

}