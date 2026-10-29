import React from 'react';
interface AvatarConfig {
  initials: string;
  className: string;
}
// Branded avatar tints use semantic tokens so they brighten in
// dark mode (teal → bright teal, plum → light plum, rose → rose).
const avatars: AvatarConfig[] = [
{
  initials: 'JT',
  className: 'bg-teal text-paper'
},
{
  initials: 'SA',
  className: 'bg-plum text-paper'
},
{
  initials: 'MR',
  className: 'bg-rose text-paper'
}];

interface AvatarStackProps {
  size: 'sm' | 'lg';
  more: number;
}
function AvatarStack({ size, more }: AvatarStackProps) {
  const dims = size === 'lg' ? 'w-12 h-12 text-sm' : 'w-7 h-7 text-[10px]';
  const overlap = size === 'lg' ? '-ml-3' : '-ml-2';
  const ringSize = size === 'lg' ? 'ring-[3px]' : 'ring-2';
  return (
    <div className="flex items-center">
      {avatars.map((a, i) =>
      <div
        key={a.initials}
        className={`${dims} ${ringSize} ring-paper rounded-full flex items-center justify-center font-bold tabular-nums ${a.className} ${i > 0 ? overlap : ''}`}
        style={{
          zIndex: avatars.length - i
        }}
        aria-label={`Member ${a.initials}`}>
        
          {a.initials}
        </div>
      )}
      <div
        className={`${dims} ${ringSize} ring-paper ${overlap} rounded-full flex items-center justify-center font-bold bg-sunken text-ink-70 tabular-nums`}>
        
        +{more}
      </div>
    </div>);

}
export function AvatarGroup() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-ink">Avatar groups</h3>
        <span className="text-[10px] font-mono text-muted-soft">
          .avatar-group
        </span>
      </div>

      <div className="flex items-center justify-between gap-6">
        <AvatarStack size="sm" more={5} />
        <AvatarStack size="lg" more={12} />
      </div>
    </div>);

}