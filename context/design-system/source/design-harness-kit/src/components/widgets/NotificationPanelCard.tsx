import React from 'react';
import { BellIcon } from 'lucide-react';
type State = 'new' | 'active' | 'archived';
type Props = {
  state: State;
  title: string;
  subtitle: string;
  caption: string;
};
function Card({ state, title, subtitle, caption }: Props) {
  const dim = state === 'archived';
  return (
    <div
      className="relative bg-paper rounded-2xl p-3"
      style={{
        boxShadow: 'var(--shadow-card)',
        opacity: dim ? 0.5 : 1
      }}>
      
      {state === 'new' &&
      <span
        className="absolute top-2 left-2 size-2 rounded-full bg-danger"
        aria-label="Unread" />

      }

      <div className="flex items-start gap-3 pl-2">
        <BellIcon
          className={`size-5 shrink-0 mt-0.5 ${state === 'new' ? 'text-ink' : 'text-muted'}`}
          strokeWidth={2} />
        
        <div className="flex-1 min-w-0">
          <div
            className={`text-[14px] leading-5 ${state === 'new' ? 'font-semibold text-ink' : 'text-muted'}`}>
            
            {title}
          </div>
          <div
            className={`text-[12px] leading-4 mt-0.5 ${state === 'new' ? 'text-ink' : 'text-muted'}`}>
            
            {subtitle}
          </div>
          <div className="text-[12px] leading-4 text-muted-soft mt-1">
            {caption}
          </div>
        </div>
      </div>
    </div>);

}
export function NotificationPanelCard() {
  return (
    <div className="flex flex-col gap-3 max-w-[360px]">
      <Card
        state="new"
        title="Want to turn your followers into bookings?"
        subtitle="Northline's tools can help"
        caption="Step up your social media game!" />
      
      <Card
        state="active"
        title="Want to turn your followers into bookings?"
        subtitle="Northline's tools can help"
        caption="Step up your social media game!" />
      
      <Card
        state="archived"
        title="Want to turn your followers into bookings?"
        subtitle="Northline's tools can help"
        caption="Step up your social media game!" />
      
    </div>);

}