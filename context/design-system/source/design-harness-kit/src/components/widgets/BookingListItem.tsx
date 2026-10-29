import React from 'react';
import { MessageSquareIcon, CheckIcon } from 'lucide-react';
type Booking = {
  start: string;
  end: string;
  initials: string;
  name: string;
  service: string;
  status: 'confirmed' | 'pending' | 'arrived';
  tint: 'teal' | 'plum' | 'rose' | 'amber';
};
const tintBg: Record<Booking['tint'], string> = {
  teal: 'bg-teal/15 text-teal',
  plum: 'bg-plum/15 text-plum',
  rose: 'bg-rose/15 text-rose',
  amber: 'bg-amber/15 text-amber'
};
const accentBg: Record<Booking['tint'], string> = {
  teal: 'bg-teal',
  plum: 'bg-plum',
  rose: 'bg-rose',
  amber: 'bg-amber'
};
const statusPill: Record<
  Booking['status'],
  {
    label: string;
    cls: string;
  }> =
{
  confirmed: {
    label: 'Confirmed',
    cls: 'bg-leaf/12 text-leaf'
  },
  pending: {
    label: 'Pending',
    cls: 'bg-amber/12 text-amber'
  },
  arrived: {
    label: 'Arrived',
    cls: 'bg-ink text-paper'
  }
};
const bookings: Booking[] = [
{
  start: '10:00',
  end: '11:00',
  initials: 'PT',
  name: 'Patricia Taylor',
  service: 'Paint mix + Timber cut · $45',
  status: 'arrived',
  tint: 'teal'
},
{
  start: '11:30',
  end: '13:00',
  initials: 'MB',
  name: 'Michael Brown',
  service: 'Paint coloring · from $120',
  status: 'confirmed',
  tint: 'plum'
},
{
  start: '14:00',
  end: '14:30',
  initials: 'SK',
  name: 'Sarah Kim',
  service: 'Express key cutting · $22',
  status: 'pending',
  tint: 'rose'
}];

export function BookingListItem() {
  return (
    <div className="space-y-2">
      {bookings.map((b) =>
      <article
        key={b.start}
        className="relative bg-paper rounded-2xl pl-4 pr-3 py-3 flex items-center gap-3 overflow-hidden"
        style={{
          boxShadow: 'var(--shadow-card)'
        }}>
        
          {/* Left accent bar */}
          <span
          aria-hidden="true"
          className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${accentBg[b.tint]}`} />
        

          {/* Time block */}
          <div className="shrink-0 text-right tabular-nums">
            <div className="text-[14px] font-bold text-ink leading-tight">
              {b.start}
            </div>
            <div className="text-[11px] text-muted leading-tight">{b.end}</div>
          </div>

          {/* Avatar */}
          <div
          className={`shrink-0 size-9 rounded-full ${tintBg[b.tint]} flex items-center justify-center text-[11px] font-bold`}
          aria-hidden="true">
          
            {b.initials}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-semibold text-ink truncate">
                {b.name}
              </span>
              <span
              className={`shrink-0 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md ${statusPill[b.status].cls}`}>
              
                {statusPill[b.status].label}
              </span>
            </div>
            <div className="text-[12px] text-muted truncate tabular-nums">
              {b.service}
            </div>
          </div>

          {/* Actions */}
          <div className="shrink-0 flex items-center gap-1">
            <button
            type="button"
            aria-label="Message"
            className="size-8 rounded-lg bg-sunken text-ink flex items-center justify-center active:scale-[0.94] transition-transform">
            
              <MessageSquareIcon className="size-3.5" strokeWidth={2.2} />
            </button>
            <button
            type="button"
            aria-label="Check in"
            className="size-8 rounded-lg bg-ink text-paper flex items-center justify-center active:scale-[0.94] transition-transform">
            
              <CheckIcon className="size-4" strokeWidth={3} />
            </button>
          </div>
        </article>
      )}
    </div>);

}