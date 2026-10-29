import React, { Component } from 'react';
import { CreditCardIcon, CalendarPlusIcon } from 'lucide-react';
type Action = {
  label: string;
  tone?: 'primary' | 'ghost' | 'danger';
};
type Props = {
  icon: ComponentType<{
    className?: string;
    strokeWidth?: number;
  }>;
  eyebrow: string;
  title: string;
  caption: string;
  time: string;
  actions: Action[];
};
function Card({ icon: Icon, eyebrow, title, caption, time, actions }: Props) {
  return (
    <div
      className="rounded-2xl bg-paper p-4 flex flex-col gap-3"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {/* Body */}
      <div className="flex items-start gap-3">
        <div
          className="size-10 rounded-full shrink-0 flex items-center justify-center bg-sunken"
          aria-hidden="true">
          
          <Icon className="size-5 text-ink" strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[12px] leading-4 text-ink-50 font-semibold uppercase tracking-wider">
            {eyebrow}
          </div>
          <div className="text-[15px] font-semibold leading-5 text-ink mt-1">
            {title}
          </div>
          <div className="text-[13px] leading-[18px] text-ink-70 mt-1">
            {caption}
          </div>
        </div>

        <span className="shrink-0 text-[11px] tabular-nums text-ink-50">
          {time}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        {actions.map((action, i) => {
          const isPrimary =
          action.tone === 'primary' || !action.tone && i === 0;
          const isDanger = action.tone === 'danger';
          return (
            <button
              key={i}
              type="button"
              className={`flex-1 h-10 rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-transform ${isDanger ? 'bg-danger/15 text-danger' : isPrimary ? 'bg-ink text-paper' : 'bg-sunken text-ink border border-line'}`}>
              
              {action.label}
            </button>);

        })}
      </div>
    </div>);

}
export function NotificationActionCard() {
  return (
    <div className="flex flex-col gap-3 max-w-[400px]">
      {/* Case A — single primary action */}
      <Card
        icon={CreditCardIcon}
        eyebrow="Action Required"
        title="Payments Privacy Update"
        caption="Review and consent your data transfer."
        time="25m"
        actions={[
        {
          label: 'Review',
          tone: 'primary'
        }]
        } />
      

      {/* Case B — two actions (accept / decline) */}
      <Card
        icon={CalendarPlusIcon}
        eyebrow="New Booking Request"
        title="Sasha wants Tuesday at 3:00 PM"
        caption="Paint mix + Timber cut · 60 min · $45"
        time="2m"
        actions={[
        {
          label: 'Accept',
          tone: 'primary'
        },
        {
          label: 'Decline',
          tone: 'ghost'
        }]
        } />
      
    </div>);

}