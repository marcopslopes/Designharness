import React from 'react';
import { InfoIcon, CheckIcon, AlertTriangleIcon, XIcon } from 'lucide-react';
interface AlertIntent {
  bg: string;
  bgIcon: string;
  iconColor: string;
  text: string;
  cta: string;
}
const intents: Record<'info' | 'success' | 'warning' | 'danger', AlertIntent> =
{
  info: {
    bg: 'bg-teal-soft',
    bgIcon: 'bg-teal',
    iconColor: 'text-white',
    text: 'text-teal',
    cta: 'text-teal'
  },
  success: {
    bg: 'bg-success-soft',
    bgIcon: 'bg-success',
    iconColor: 'text-white',
    text: 'text-success',
    cta: 'text-success'
  },
  warning: {
    bg: '',
    bgIcon: 'bg-warning',
    iconColor: 'text-white',
    text: 'text-warning',
    cta: 'text-warning'
  },
  danger: {
    bg: '',
    bgIcon: 'bg-danger',
    iconColor: 'text-white',
    text: 'text-danger',
    cta: 'text-danger'
  }
};
interface AlertPillProps {
  intent: keyof typeof intents;
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
}
function AlertPill({ intent, icon, title, description, cta }: AlertPillProps) {
  const cfg = intents[intent];
  const customStyle: React.CSSProperties =
  intent === 'warning' ?
  {
    backgroundColor: 'rgba(239, 105, 2, 0.1)'
  } :
  intent === 'danger' ?
  {
    backgroundColor: 'rgba(222, 0, 59, 0.08)'
  } :
  {};
  return (
    <div
      className={`${cfg.bg} rounded-2xl pl-2 pr-4 py-2 flex items-center gap-3`}
      style={customStyle}
      role="alert">
      
      <div
        className={`w-10 h-10 rounded-full ${cfg.bgIcon} flex items-center justify-center flex-shrink-0 ${cfg.iconColor}`}
        aria-hidden="true">
        
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-semibold ${cfg.text} leading-tight`}>
          {title}
        </div>
        <div
          className={`text-xs ${cfg.text}/80 mt-0.5 leading-snug text-pretty`}>
          
          {description}
        </div>
      </div>
      <button
        className={`text-sm font-semibold ${cfg.cta} hover:underline tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/40 rounded px-1 min-h-[44px]`}
        type="button">
        
        {cta}
      </button>
    </div>);

}
interface ToastProps {
  icon: React.ReactNode;
  iconBg: string;
  message: string;
  action: string;
}
function Toast({ icon, iconBg, message, action }: ToastProps) {
  return (
    <div
      className="bg-ink text-white rounded-2xl pl-2 pr-5 py-2 flex items-center gap-3 shadow-lg"
      role="status">
      
      <div
        className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}
        aria-hidden="true">
        
        {icon}
      </div>
      <span className="text-sm font-medium flex-1 truncate">{message}</span>
      <button
        className="text-xs font-bold uppercase tracking-widest text-white hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded px-1 min-h-[44px] flex items-center"
        type="button">
        
        {action}
      </button>
    </div>);

}
export function AlertSet() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-ink">Alerts</h3>
          <span className="text-[10px] font-mono text-muted-soft tabular-nums">
            .alert · 4 intents
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <AlertPill
            intent="info"
            icon={<InfoIcon className="w-5 h-5" strokeWidth={2.5} />}
            title="Payouts scheduled"
            description="$2,847 transfers Friday morning"
            cta="View" />
          
          <AlertPill
            intent="success"
            icon={<CheckIcon className="w-5 h-5" strokeWidth={2.5} />}
            title="Profile published"
            description="Clients can now book online"
            cta="Share" />
          
          <AlertPill
            intent="warning"
            icon={<AlertTriangleIcon className="w-5 h-5" strokeWidth={2.5} />}
            title="Profile is private"
            description="Clients can't book until you enable it"
            cta="Enable" />
          
          <AlertPill
            intent="danger"
            icon={<XIcon className="w-5 h-5" strokeWidth={2.5} />}
            title="Payout failed"
            description="Update your bank details to retry"
            cta="Fix" />
          
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold text-ink">Toast</h3>
          <span className="text-[10px] font-mono text-muted-soft tabular-nums">
            .toast · transient
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <Toast
            icon={
            <CheckIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
            }
            iconBg="bg-success"
            message="Service archived"
            action="Undo" />
          
          <Toast
            icon={<XIcon className="w-5 h-5 text-white" strokeWidth={2.5} />}
            iconBg="bg-danger"
            message="Couldn't reach server. Retrying…"
            action="Retry" />
          
        </div>
      </div>
    </div>);

}