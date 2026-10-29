import React from 'react';
import { ChevronRightIcon, StarIcon } from 'lucide-react';
type Client = {
  initials: string;
  name: string;
  phone: string;
  lastVisit: string;
  spend: string;
  tint: 'teal' | 'plum' | 'rose' | 'amber';
  isVip?: boolean;
  isNew?: boolean;
};
const tintBg: Record<Client['tint'], string> = {
  teal: 'bg-teal/15 text-teal',
  plum: 'bg-plum/15 text-plum',
  rose: 'bg-rose/15 text-rose',
  amber: 'bg-amber/15 text-amber'
};
const clients: Client[] = [
{
  initials: 'PT',
  name: 'Patricia Taylor',
  phone: '+1 (415) 555-0119',
  lastVisit: '3 days ago',
  spend: '$1,240',
  tint: 'teal',
  isVip: true
},
{
  initials: 'MB',
  name: 'Michael Brown',
  phone: '+1 (415) 555-0142',
  lastVisit: '2 weeks ago',
  spend: '$480',
  tint: 'plum'
},
{
  initials: 'AY',
  name: 'Anthony Y. Macintosh',
  phone: '+1 (415) 555-0177',
  lastVisit: 'Never',
  spend: '—',
  tint: 'amber',
  isNew: true
},
{
  initials: 'SK',
  name: 'Sarah Kim',
  phone: '+1 (415) 555-0163',
  lastVisit: '5 weeks ago',
  spend: '$360',
  tint: 'rose'
}];

export function ClientListItem() {
  return (
    <div
      className="bg-paper rounded-2xl divide-y divide-line"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      {clients.map((c) =>
      <button
        key={c.name}
        type="button"
        className="w-full flex items-center gap-3 p-3 text-left active:bg-sunken/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-[-2px]">
        
          <div
          className={`relative shrink-0 size-11 rounded-full ${tintBg[c.tint]} flex items-center justify-center text-[13px] font-bold`}
          aria-hidden="true">
          
            {c.initials}
            {c.isVip &&
          <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-amber flex items-center justify-center ring-2 ring-paper">
                <StarIcon
              className="size-2.5 text-paper fill-paper"
              strokeWidth={2.5} />
            
              </span>
          }
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[14px] font-semibold text-ink truncate">
                {c.name}
              </span>
              {c.isNew &&
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-leaf bg-leaf/12 px-1.5 py-0.5 rounded-md">
                  New
                </span>
            }
            </div>
            <div className="text-[12px] text-muted tabular-nums truncate">
              {c.phone} · {c.lastVisit}
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1.5">
            <span className="text-[13px] font-bold tabular-nums text-ink">
              {c.spend}
            </span>
            <ChevronRightIcon
            className="size-4 text-muted-soft"
            strokeWidth={2.5} />
          
          </div>
        </button>
      )}
    </div>);

}