import React from 'react';
import { CalendarIcon, UserPlusIcon, ShareIcon, Trash2Icon } from 'lucide-react';
type Action = {
  label: string;
  description?: string;
  icon: React.ReactNode;
  destructive?: boolean;
};
const actions: Action[] = [
{
  label: 'Reschedule booking',
  description: 'Pick a new time slot',
  icon: <CalendarIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  label: 'Add another client',
  description: 'Book a group together',
  icon: <UserPlusIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  label: 'Share booking',
  description: 'Send a calendar invite',
  icon: <ShareIcon className="size-[18px]" strokeWidth={2.2} />
},
{
  label: 'Cancel booking',
  icon: <Trash2Icon className="size-[18px]" strokeWidth={2.2} />,
  destructive: true
}];

export function ActionSheet() {
  return (
    <div className="space-y-2">
      {/* Main action group */}
      <div
        className="bg-paper rounded-[20px] overflow-hidden pt-2"
        style={{
          boxShadow:
          '0 -8px 32px -8px rgba(20, 22, 26, 0.10), 0 0 0 1px rgba(20, 22, 26, 0.03)'
        }}>
        
        <div className="flex justify-center pb-2.5">
          <span
            className="block h-1 w-9 rounded-full bg-ink/20"
            aria-hidden="true" />
          
        </div>

        <div className="px-5 pb-3 text-center">
          <div className="text-[13px] font-semibold text-muted">
            Wed, 12 Jun · 10:00 – 11:00
          </div>
          <div className="text-[11px] text-muted-soft tabular-nums">
            Patricia Taylor · Paint mix + Timber cut
          </div>
        </div>

        <div className="h-px bg-line" />

        <div className="divide-y divide-line">
          {actions.map((a) =>
          <button
            key={a.label}
            type="button"
            className={`w-full flex items-center gap-3 px-5 py-3.5 text-left active:bg-sunken/50 transition-colors ${a.destructive ? 'text-danger' : 'text-ink'}`}>
            
              <span
              className={`shrink-0 size-9 rounded-xl flex items-center justify-center ${a.destructive ? 'bg-danger/10' : 'bg-sunken'}`}
              aria-hidden="true">
              
                {a.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold leading-tight">
                  {a.label}
                </div>
                {a.description &&
              <div className="text-[12px] text-muted mt-0.5">
                    {a.description}
                  </div>
              }
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Detached Cancel button — iOS pattern */}
      <button
        type="button"
        className="w-full h-12 rounded-[20px] bg-paper text-[15px] font-bold text-ink active:scale-[0.99] transition-transform"
        style={{
          boxShadow: 'var(--shadow-card)'
        }}>
        
        Cancel
      </button>
    </div>);

}