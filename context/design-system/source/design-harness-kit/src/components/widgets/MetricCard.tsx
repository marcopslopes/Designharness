import React from 'react';
import { ArrowUpIcon } from 'lucide-react';
interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  sparklinePoints: string;
}
function MetricItem({
  label,
  value,
  change,
  sparklinePoints
}: MetricCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex flex-col justify-between"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <div>
        <h3 className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
          {label}
        </h3>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-2xl font-bold text-ink tabular-nums leading-none">
            {value}
          </span>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-success-soft text-success text-xs font-bold tabular-nums">
            <ArrowUpIcon className="size-3" />
            {change}
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-8 w-full mt-auto">
        <svg
          viewBox="0 0 100 30"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none">
          
          <path
            d={sparklinePoints}
            fill="none"
            stroke="currentColor"
            className="text-teal"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round" />
          
        </svg>
      </div>
    </div>);

}
export function MetricCard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <MetricItem
        label="Revenue"
        value="$1,240"
        change="12%"
        sparklinePoints="M 0 25 L 20 20 L 40 28 L 60 15 L 80 18 L 100 5" />
      
      <MetricItem
        label="Tips"
        value="$180"
        change="8%"
        sparklinePoints="M 0 20 L 25 22 L 50 15 L 75 10 L 100 2" />
      
    </div>);

}