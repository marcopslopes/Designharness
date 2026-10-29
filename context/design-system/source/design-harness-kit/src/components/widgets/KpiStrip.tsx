import React from 'react';
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react';
interface KpiItemProps {
  label: string;
  value: string;
  delta: string;
  isPositive: boolean;
}
function KpiItem({ label, value, delta, isPositive }: KpiItemProps) {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-3xl font-bold text-ink tabular-nums leading-none mb-1">
        {value}
      </p>
      <p
        className={`text-xs font-semibold flex items-center gap-0.5 ${isPositive ? 'text-success' : 'text-danger'}`}>
        
        {isPositive ?
        <TrendingUpIcon className="size-3" /> :

        <TrendingDownIcon className="size-3" />
        }
        <span className="tabular-nums">{delta}</span>
      </p>
    </div>);

}
export function KpiStrip() {
  return (
    <div
      className="bg-white rounded-2xl p-4 flex items-start gap-4"
      style={{
        boxShadow: 'var(--shadow-border)'
      }}>
      
      <KpiItem label="Clients" value="214" delta="+12 this mo." isPositive />
      <KpiItem label="Rating" value="4.9" delta="86 reviews" isPositive />
      <KpiItem label="Rebook" value="68%" delta="-2pt" isPositive={false} />
    </div>);

}