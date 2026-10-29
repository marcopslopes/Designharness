import React from 'react';
// All variants of a single calendar date cell — the atomic ".date picker / item"
// from the Figma. Each cell is a small rounded square showing the number plus
// optional dot indicator and color-coded fill.
type CellProps = {
  n: number;
  variant:
  'default' |
  'muted' |
  'past-appt' |
  'selected' |
  'today' |
  'teal' |
  'rose' |
  'amber' |
  'with-dot' |
  'today-dot';
  label: string;
};
function Cell({ n, variant, label }: CellProps) {
  const base =
  'relative size-10 rounded-lg flex items-center justify-center text-[14px] font-semibold tabular-nums transition-transform active:scale-[0.94]';
  const styles: Record<CellProps['variant'], string> = {
    default: 'text-ink',
    muted: 'text-muted',
    'past-appt': 'text-rose',
    selected: 'bg-ink text-paper',
    today: 'border-2 border-ink text-ink',
    teal: 'bg-teal text-paper',
    rose: 'bg-rose text-paper',
    amber: 'bg-amber text-paper',
    'with-dot': 'text-ink',
    'today-dot': 'bg-ink text-paper'
  };
  const dot =
  variant === 'with-dot' ?
  <span
    className="absolute bottom-1 size-1 rounded-full bg-teal"
    aria-hidden="true" /> :

  variant === 'today-dot' ?
  <span
    className="absolute bottom-1 size-1 rounded-full bg-paper/85"
    aria-hidden="true" /> :

  null;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        className={`${base} ${styles[variant]}`}
        aria-label={label}>
        
        {n}
        {dot}
      </button>
      <span className="text-[9px] font-medium uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>);

}
export function DateCell() {
  return (
    <div
      className="bg-paper rounded-2xl p-5"
      style={{
        boxShadow: 'var(--shadow-card)'
      }}>
      
      <div className="grid grid-cols-5 gap-y-4 gap-x-2 justify-items-center">
        <Cell n={20} variant="default" label="Idle" />
        <Cell n={20} variant="selected" label="Sel." />
        <Cell n={20} variant="muted" label="Mute" />
        <Cell n={20} variant="today" label="Today" />
        <Cell n={20} variant="past-appt" label="Past" />

        <Cell n={20} variant="with-dot" label="Dot" />
        <Cell n={20} variant="teal" label="Booked" />
        <Cell n={20} variant="rose" label="Cancel" />
        <Cell n={20} variant="amber" label="Hold" />
        <Cell n={20} variant="today-dot" label="Now" />
      </div>
    </div>);

}