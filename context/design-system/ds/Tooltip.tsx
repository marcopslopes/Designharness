import type { HTMLAttributes, ReactNode } from 'react'

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
  children?: ReactNode
}

export function Tooltip({ children = 'Tooltip', className, ...rest }: TooltipProps) {
  return (
    <span className={['ds-tooltip', className].filter(Boolean).join(' ')} role="tooltip" {...rest}>
      {children}
    </span>
  )
}
