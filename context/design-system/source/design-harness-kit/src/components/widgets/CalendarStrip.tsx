import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
const days = [
{
  day: 'SUN',
  date: 10,
  hasAppt: false
},
{
  day: 'MON',
  date: 11,
  hasAppt: true,
  isToday: true
},
{
  day: 'TUE',
  date: 12,
  hasAppt: false
},
{
  day: 'WED',
  date: 13,
  hasAppt: true
},
{
  day: 'THU',
  date: 14,
  hasAppt: false
},
{
  day: 'FRI',
  date: 15,
  hasAppt: true
},
{
  day: 'SAT',
  date: 16,
  hasAppt: false
}];

export function CalendarStrip() {
  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="flex items-center gap-1 mb-4">
        <h3 className="font-bold text-ink">May 2026</h3>
        <ChevronRightIcon className="size-4 text-muted" />
      </div>

      <div className="flex items-center justify-between bg-surface-2 p-1 rounded-2xl">
        {days.map((d) =>
        <button
          key={d.date}
          aria-label={`${d.isToday ? 'Today, ' : ''}${d.day} ${d.date}`}
          aria-current={d.isToday ? 'date' : undefined}
          className={`
              relative flex flex-col items-center justify-center py-2 px-1 min-w-[44px] rounded-xl
              transition-[background-color,transform] duration-150 ease-out active:scale-[0.96]
              focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2
              ${d.isToday ? 'bg-ink text-white shadow-sm' : 'text-ink hover:bg-surface-3'}
            `}>
          
            <span
            className={`text-[10px] font-bold mb-1 ${d.isToday ? 'text-white/80' : 'text-muted'}`}>
            
              {d.day}
            </span>
            <span className="text-base font-bold tabular-nums leading-none">
              {d.date}
            </span>

            {/* Appointment Dot */}
            <span
            className={`absolute bottom-1 size-1 rounded-full ${d.hasAppt ? d.isToday ? 'bg-white' : 'bg-teal' : 'bg-transparent'}`}
            aria-hidden="true" />
          
          </button>
        )}
      </div>
    </div>);

}