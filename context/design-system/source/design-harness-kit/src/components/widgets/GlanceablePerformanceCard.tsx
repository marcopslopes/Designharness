import React from 'react';
import { EyeIcon, TrendingUpIcon, ChevronRightIcon } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
const sparkRebook = [40, 45, 42, 50, 48, 55, 61].map((value) => ({
  value
}));
const sparkClients = [2, 4, 3, 7, 6, 10, 12].map((value) => ({
  value
}));
const sparkTicket = [110, 115, 112, 120, 118, 125, 128].map((value) => ({
  value
}));
interface MetricProps {
  value: string;
  label: string;
  delta: string;
  data: {
    value: number;
  }[];
}
function Metric({ value, label, delta, data }: MetricProps) {
  return (
    <div className="relative">
      <div className="text-2xl font-bold text-ink mb-1 tabular-nums">
        {value}
      </div>
      <div className="text-xs text-muted font-medium mb-2">{label}</div>
      <div className="flex items-center gap-1 text-[10px] font-semibold text-success bg-success-soft w-max px-1.5 py-0.5 rounded tabular-nums">
        <TrendingUpIcon className="w-3 h-3" strokeWidth={2.5} /> {delta}
      </div>
      <div
        className="absolute bottom-0 right-0 w-12 h-8 opacity-25 pointer-events-none"
        aria-hidden="true">
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#00A34B"
              fill="#00A34B"
              strokeWidth={2} />
            
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>);

}
export function GlanceablePerformanceCard() {
  return (
    <div
      className="bg-white rounded-2xl p-5"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-ink">
          Your performance{' '}
          <span className="text-muted-soft font-normal">· May</span>
        </h2>
        <div className="flex items-center gap-1.5 text-[11px] text-muted bg-surface-2 px-2 py-1 rounded-md">
          <EyeIcon className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Only you see this</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        <Metric value="61%" label="Rebook rate" delta="4%" data={sparkRebook} />
        <Metric value="+12" label="New clients" delta="2" data={sparkClients} />
        <Metric
          value="$128"
          label="Avg. ticket"
          delta="$5"
          data={sparkTicket} />
        
      </div>

      <button
        className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink transition-colors py-2 min-h-[44px] -mb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20 rounded-lg"
        type="button">
        
        See full stats <ChevronRightIcon className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>);

}