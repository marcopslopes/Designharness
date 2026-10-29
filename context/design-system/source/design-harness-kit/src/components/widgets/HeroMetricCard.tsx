import React from 'react';
import { EyeIcon, ArrowRightIcon } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
const revenueData = [2800, 3100, 2900, 3400, 3200, 3600, 3840].map((value) => ({
  value
}));
export function HeroMetricCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] font-bold text-muted uppercase tracking-widest">
            May Revenue
          </span>
          <div className="flex items-center gap-1 text-[10px] text-muted">
            <EyeIcon className="w-3 h-3" strokeWidth={2} /> Only you
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <h2 className="text-4xl font-bold text-ink tracking-tight tabular-nums">
            $3,840
          </h2>
          <span className="text-xs font-semibold text-success bg-success-soft px-2 py-0.5 rounded-md tabular-nums">
            ↑ 12%
          </span>
        </div>
      </div>

      <div className="h-16 w-full mt-2" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="heroMetricRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#731CD8" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#731CD8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#731CD8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#heroMetricRev)" />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line/60 border-t border-line/60 bg-surface-2/50">
        <Stat value="61%" label="Rebook" />
        <Stat value="+12" label="New" />
        <Stat value="$128" label="Avg" />
      </div>

      <div className="p-4 border-t border-line/60">
        <button
          className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-purple hover:opacity-80 transition-opacity min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/40 rounded-lg"
          type="button">
          
          See full breakdown <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>);

}
function Stat({ value, label }: {value: string;label: string;}) {
  return (
    <div className="p-4 text-center">
      <div className="text-lg font-bold text-ink tabular-nums">{value}</div>
      <div className="text-[10px] text-muted uppercase tracking-widest mt-0.5 font-semibold">
        {label}
      </div>
    </div>);

}