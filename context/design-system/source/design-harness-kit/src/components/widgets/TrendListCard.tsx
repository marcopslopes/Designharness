import React from 'react';
import { EyeIcon, ChevronRightIcon } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer } from 'recharts';
interface TrendRowData {
  label: string;
  value: string;
  delta: string;
  data: number[];
}
const rows: TrendRowData[] = [
{
  label: 'Rebook rate',
  value: '61%',
  delta: '↑ 4%',
  data: [40, 45, 42, 50, 48, 55, 61]
},
{
  label: 'New clients',
  value: '+12',
  delta: '↑ 2',
  data: [2, 4, 3, 7, 6, 10, 12]
},
{
  label: 'Avg. ticket',
  value: '$128',
  delta: '↑ $5',
  data: [110, 115, 112, 120, 118, 125, 128]
}];

export function TrendListCard() {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div className="p-4 border-b border-line/60 flex items-center justify-between bg-surface-2/50">
        <h2 className="text-sm font-semibold text-ink">May Performance</h2>
        <div className="flex items-center gap-1 text-[10px] text-muted uppercase tracking-widest font-bold">
          <EyeIcon className="w-3 h-3" strokeWidth={2} /> Private
        </div>
      </div>

      <ul className="divide-y divide-line/60">
        {rows.map((row, i) =>
        <li key={i}>
            <button
            className="w-full p-4 flex items-center justify-between hover:bg-surface-2/60 transition-colors group focus-visible:outline-none focus-visible:bg-surface-2/60"
            type="button">
            
              <div className="w-1/3 text-left">
                <div className="text-sm font-medium text-ink">{row.label}</div>
                <div className="text-xs text-muted mt-0.5">vs last month</div>
              </div>
              <div className="w-1/3 text-center">
                <div className="text-lg font-bold text-ink tabular-nums">
                  {row.value}
                </div>
              </div>
              <div className="w-1/3 flex items-center justify-end gap-3">
                <div className="h-6 w-12" aria-hidden="true">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                    data={row.data.map((value) => ({
                      value
                    }))}>
                    
                      <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00A34B"
                      strokeWidth={2}
                      dot={false} />
                    
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs font-semibold text-success bg-success-soft px-1.5 py-0.5 rounded tabular-nums">
                  {row.delta}
                </div>
                <ChevronRightIcon className="w-4 h-4 text-muted-soft group-hover:text-ink-soft transition-colors" />
              </div>
            </button>
          </li>
        )}
      </ul>
    </div>);

}