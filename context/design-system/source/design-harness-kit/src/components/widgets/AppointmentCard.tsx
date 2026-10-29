import React from 'react';
interface AppointmentProps {
  time: string;
  client: string;
  service: string;
  accentColor: string;
  avatarUrl?: string;
  initials?: string;
}
function AppointmentItem({
  time,
  client,
  service,
  accentColor,
  avatarUrl,
  initials
}: AppointmentProps) {
  return (
    <button
      className="w-full relative flex items-center justify-between p-4 pl-5 rounded-2xl bg-white text-left transition-[box-shadow,transform] duration-150 ease-out active:scale-[0.96] focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal focus-visible:outline-offset-2 overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-border)';
      }}>
      
      {/* Accent Bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentColor}`} />

      <div className="flex-1 min-w-0 pr-4">
        <h4 className="font-bold text-ink tabular-nums mb-1">{time}</h4>
        <p className="text-sm text-muted truncate">
          <span className="font-semibold text-ink-soft">{client}</span> •{' '}
          {service}
        </p>
      </div>

      <div className="flex-shrink-0 size-10 rounded-full bg-surface-2 flex items-center justify-center outline outline-1 -outline-offset-1 outline-black/10 overflow-hidden">
        {avatarUrl ?
        <img
          src={avatarUrl}
          alt={client}
          className="w-full h-full object-cover" /> :


        <span className="text-sm font-bold text-muted">{initials}</span>
        }
      </div>
    </button>);

}
export function AppointmentCard() {
  return (
    <div className="space-y-3">
      <AppointmentItem
        time="10:00 - 10:40"
        client="Walk-in"
        service="lalalala"
        accentColor="bg-warning"
        initials="W" />
      
      <AppointmentItem
        time="11:30 - 12:00"
        client="Sarah K."
        service="Timber cut"
        accentColor="bg-purple"
        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
      
      <AppointmentItem
        time="12:10 - 15:40"
        client="Walk-in"
        service="test service 232"
        accentColor="bg-success"
        initials="W" />
      
    </div>);

}