import type { HTMLAttributes, ReactNode } from 'react'

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /** The status in the middle, such as “3 selected”. */
  status: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  label?: string
}

/** iOS 26 floating glass toolbar with a status in the center. */
export function Toolbar({ status, leading, trailing, label = 'Toolbar', className, ...rest }: ToolbarProps) {
  return (
    <div role="toolbar" aria-label={label} className={['ds-toolbar', 'ds-glass', className].filter(Boolean).join(' ')} {...rest}>
      <div className="ds-toolbar__side">{leading}</div>
      <p className="ds-toolbar__status">{status}</p>
      <div className="ds-toolbar__side ds-toolbar__side--end">{trailing}</div>
    </div>
  )
}
