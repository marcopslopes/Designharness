import React from 'react';
import {
  CalendarCheckIcon,
  StarIcon,
  MessageSquareIcon,
  DollarSignIcon,
  UserPlusIcon } from
'lucide-react';
type Item = {
  id: string;
  icon: React.ReactNode;
  tint: 'teal' | 'plum' | 'amber' | 'rose' | 'leaf';
  title: React.ReactNode;
  detail: string;
  time: string;
  unread?: boolean;
};
const tintBg: Record<Item['tint'], string> = {
  teal: 'bg-teal/15 text-teal',
  plum: 'bg-plum/15 text-plum',
  amber: 'bg-amber/15 text-amber',
  rose: 'bg-rose/15 text-rose',
  leaf: 'bg-leaf/15 text-leaf'
};
const today: Item[] = [
{
  id: '1',
  icon: <CalendarCheckIcon className="size-[18px]" strokeWidth={2.2} />,
  tint: 'teal',
  title:
  <>
        <b className="text-ink">Patricia Taylor</b> booked Paint mix + Timber cut
      </>,

  detail: 'Wed, 12 Jun · 10:00 – 11:00',
  time: 'Just now',
  unread: true
},
{
  id: '2',
  icon: <DollarSignIcon className="size-[18px]" strokeWidth={2.2} />,
  tint: 'leaf',
  title:
  <>
        Payout of <b className="text-ink">$1,240.18</b> sent to your bank
      </>,

  detail: 'Chase ··· 4242',
  time: '2h',
  unread: true
},
{
  id: '3',
  icon: <StarIcon className="size-[18px]" strokeWidth={2.2} />,
  tint: 'amber',
  title:
  <>
        <b className="text-ink">Michael Brown</b> left a 5-star review
      </>,

  detail: '"Best fade in town. Patricia is a wizard."',
  time: '5h'
}];

const earlier: Item[] = [
{
  id: '4',
  icon: <MessageSquareIcon className="size-[18px]" strokeWidth={2.2} />,
  tint: 'plum',
  title:
  <>
        New message from <b className="text-ink">Sarah Kim</b>
      </>,

  detail: 'Hey! Any chance I can move my Friday slot to…',
  time: 'Yesterday'
},
{
  id: '5',
  icon: <UserPlusIcon className="size-[18px]" strokeWidth={2.2} />,
  tint: 'rose',
  title:
  <>
        <b className="text-ink">Anthony Y.</b> joined via your referral link
      </>,

  detail: 'You earned 250 referral points',
  time: '2d'
}];

function Row({ item }: {item: Item;}) {
  return (
    <button
      type="button"
      className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-sunken/50 active:bg-sunken transition-colors">
      
      <div className="relative shrink-0">
        <span
          className={`size-10 rounded-xl flex items-center justify-center ${tintBg[item.tint]}`}
          aria-hidden="true">
          
          {item.icon}
        </span>
        {item.unread &&
        <span
          className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-danger ring-2 ring-paper"
          aria-label="Unread" />

        }
      </div>
      <div className="flex-1 min-w-0 pt-0.5">
        <div className="text-[13px] text-muted leading-snug">{item.title}</div>
        <div className="text-[12px] text-muted-soft truncate mt-0.5 tabular-nums">
          {item.detail}
        </div>
      </div>
      <span className="shrink-0 text-[11px] text-muted tabular-nums pt-1">
        {item.time}
      </span>
    </button>);

}
export function NotificationFeed() {
  return (
    <div
      className="bg-paper rounded-2xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="px-4 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted">
        Today
      </div>
      <div className="divide-y divide-line">
        {today.map((i) =>
        <Row key={i.id} item={i} />
        )}
      </div>

      <div className="px-4 pt-4 pb-2 text-[10px] font-bold uppercase tracking-widest text-muted">
        Earlier
      </div>
      <div className="divide-y divide-line">
        {earlier.map((i) =>
        <Row key={i.id} item={i} />
        )}
      </div>

      <button
        type="button"
        className="w-full h-11 text-center text-[13px] font-semibold text-teal border-t border-line hover:bg-sunken/40 transition-colors">
        
        Mark all as read
      </button>
    </div>);

}