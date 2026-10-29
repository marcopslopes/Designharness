import React, { useState } from 'react';
type DayCell = {
  date: number;
  isOtherMonth?: boolean;
  isPast?: boolean;
  hasAppt?: boolean;
  apptColor?: 'teal' | 'rose' | 'amber';
};
const dayHeaders = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
// June 2024 (Sat=1) — five week rows
const monthGrid: DayCell[] = [
{
  date: 27,
  isOtherMonth: true,
  isPast: true
},
{
  date: 28,
  isOtherMonth: true,
  isPast: true
},
{
  date: 29,
  isOtherMonth: true,
  isPast: true
},
{
  date: 30,
  isOtherMonth: true,
  isPast: true
},
{
  date: 31,
  isOtherMonth: true,
  isPast: true
},
{
  date: 1,
  isPast: true,
  hasAppt: true,
  apptColor: 'rose'
},
{
  date: 2,
  isPast: true
},
{
  date: 3,
  isPast: true
},
{
  date: 4,
  isPast: true,
  hasAppt: true,
  apptColor: 'rose'
},
{
  date: 5,
  isPast: true
},
{
  date: 6,
  isPast: true,
  hasAppt: true,
  apptColor: 'rose'
},
{
  date: 7,
  isPast: true
},
{
  date: 8,
  isPast: true,
  hasAppt: true,
  apptColor: 'rose'
},
{
  date: 9,
  isPast: true
},
{
  date: 10,
  isPast: true,
  hasAppt: true,
  apptColor: 'rose'
},
{
  date: 11,
  isPast: true
},
{
  date: 12
},
{
  date: 13,
  hasAppt: true,
  apptColor: 'teal'
},
{
  date: 14
},
{
  date: 15,
  hasAppt: true,
  apptColor: 'teal'
},
{
  date: 16
},
{
  date: 17
},
{
  date: 18,
  hasAppt: true,
  apptColor: 'amber'
},
{
  date: 19
},
{
  date: 20,
  hasAppt: true,
  apptColor: 'teal'
},
{
  date: 21
},
{
  date: 22,
  hasAppt: true,
  apptColor: 'teal'
},
{
  date: 23
},
{
  date: 24
},
{
  date: 25
},
{
  date: 26,
  hasAppt: true,
  apptColor: 'teal'
},
{
  date: 27
},
{
  date: 28
},
{
  date: 29
},
{
  date: 30
}];

const weekStrip = monthGrid.slice(14, 21);
function GridCell({
  cell,
  selected,
  onClick




}: {cell: DayCell;selected: boolean;onClick: () => void;}) {
  const dotMap = {
    teal: 'bg-teal',
    rose: 'bg-rose',
    amber: 'bg-amber'
  } as const;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={selected ? 'date' : undefined}
      className={`
        relative aspect-square flex items-center justify-center rounded-lg
        text-[14px] font-semibold tabular-nums
        transition-transform active:scale-[0.94]
        ${selected ? 'bg-ink text-paper' : cell.isPast && cell.hasAppt ? 'text-rose' : cell.isOtherMonth || cell.isPast ? 'text-muted' : 'text-ink'}
      `}>
      
      {cell.date}
      {cell.hasAppt && !selected && cell.apptColor &&
      <span
        aria-hidden="true"
        className={`absolute bottom-1 size-1 rounded-full ${dotMap[cell.apptColor]}`} />

      }
      {selected &&
      <span
        aria-hidden="true"
        className="absolute bottom-1 size-1 rounded-full bg-paper/85" />

      }
    </button>);

}
export function CalendarPickerMobile() {
  const [selected, setSelected] = useState(12);
  return (
    <div className="space-y-3">
      {/* Week strip */}
      <div
        className="bg-paper rounded-2xl p-3"
        style={{
          boxShadow: 'var(--shadow-card)'
        }}>
        
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {dayHeaders.map((d) =>
          <div
            key={`wh-${d}`}
            className="text-center text-[10px] font-bold uppercase tracking-wider text-muted">
            
              {d}
            </div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weekStrip.map((cell) =>
          <GridCell
            key={`w-${cell.date}`}
            cell={cell}
            selected={cell.date === selected && !cell.isOtherMonth}
            onClick={() => !cell.isOtherMonth && setSelected(cell.date)} />

          )}
        </div>
      </div>

      {/* Full month */}
      <div
        className="bg-paper rounded-2xl p-3"
        style={{
          boxShadow: 'var(--shadow-card)'
        }}>
        
        <div className="grid grid-cols-7 gap-1 mb-1.5">
          {dayHeaders.map((d) =>
          <div
            key={`mh-${d}`}
            className="text-center text-[10px] font-bold uppercase tracking-wider text-muted">
            
              {d}
            </div>
          )}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {monthGrid.map((cell, i) =>
          <GridCell
            key={`m-${i}-${cell.date}`}
            cell={cell}
            selected={cell.date === selected && !cell.isOtherMonth}
            onClick={() => !cell.isOtherMonth && setSelected(cell.date)} />

          )}
        </div>
      </div>
    </div>);

}