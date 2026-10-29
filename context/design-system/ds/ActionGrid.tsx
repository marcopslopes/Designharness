import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type ActionTone = 'neutral' | 'brand' | 'premium' | 'amber' | 'leaf' | 'danger' | 'ink'

export type ActionTileProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  label: string
  tone?: ActionTone
}

export function ActionTile({ icon, label, tone = 'neutral', className, type = 'button', ...rest }: ActionTileProps) {
  return (
    <button
      type={type}
      className={['ds-action-tile', className].filter(Boolean).join(' ')}
      data-tone={tone}
      {...rest}
    >
      <span className="ds-action-tile__icon">{icon}</span>
      <span className="ds-action-tile__label">{label}</span>
    </button>
  )
}

export function ActionGrid({
  columns = 3,
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { columns?: 2 | 3 }) {
  return (
    <div className={['ds-action-grid', className].filter(Boolean).join(' ')} data-columns={columns} {...rest}>
      {children}
    </div>
  )
}
