import React from 'react';
interface BadgeProps {
  label: string;
  tone: 'neutral' | 'teal' | 'purple' | 'success' | 'warning' | 'danger' | 'ink';
  dot?: boolean;
  size?: 'sm' | 'md';
}
// Squared-off badges — rounded-lg (8px) on small, rounded-xl (12px)
// on medium. The dot inside stays a true circle.
function Badge({ label, tone, dot, size = 'sm' }: BadgeProps) {
  const toneClasses: Record<BadgeProps['tone'], string> = {
    neutral: 'bg-sunken text-ink',
    teal: 'bg-teal-soft text-teal',
    purple: 'bg-plum-soft text-plum',
    success: 'bg-leaf-soft text-leaf',
    warning: 'bg-amber-soft text-amber',
    danger: 'bg-danger-soft text-danger',
    ink: 'bg-ink text-paper'
  };
  const dotClasses: Record<BadgeProps['tone'], string> = {
    neutral: 'bg-ink-50',
    teal: 'bg-teal',
    purple: 'bg-plum',
    success: 'bg-leaf',
    warning: 'bg-amber',
    danger: 'bg-danger',
    ink: 'bg-paper'
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold whitespace-nowrap ${toneClasses[tone]} ${size === 'md' ? 'text-sm px-3 py-1.5 rounded-xl' : 'text-xs px-2.5 py-1 rounded-lg'}`}>
      
      {dot &&
      <span
        className={`w-1.5 h-1.5 rounded-full ${dotClasses[tone]}`}
        aria-hidden="true" />

      }
      {label}
    </span>);

}
export function BadgeSet() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-ink">Badges</h3>
        <span className="text-[10px] font-mono text-muted-soft tabular-nums">
          .badge · 7 intents · 2 sizes
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge label="Draft" tone="neutral" />
        <Badge label="Active" tone="teal" dot />
        <Badge label="Premium" tone="purple" />
        <Badge label="Live" tone="success" dot />
        <Badge label="Pending" tone="warning" />
        <Badge label="Failed" tone="danger" />
        <Badge label="New" tone="ink" />
      </div>

      <div className="h-px bg-line/60" />

      <div className="flex flex-wrap items-center gap-2">
        <Badge label="Open today" tone="teal" size="md" />
        <Badge label="Influencer tier" tone="purple" size="md" />
      </div>
      <div>
        <Badge label="+18% bookings" tone="ink" size="md" />
      </div>
    </div>);

}