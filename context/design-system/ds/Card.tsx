import type { ReactNode } from 'react'

/**
 * UI Kit v2 card — paper surface, optional elevation (`--kit-shadow-1`).
 */
export type CardProps = {
  children: ReactNode
  elevated?: boolean
  className?: string
}

export function Card({ children, elevated = false, className }: CardProps) {
  return (
    <section
      className={['ds-card', className].filter(Boolean).join(' ')}
      data-elevated={elevated ? 'true' : 'false'}
    >
      {children}
    </section>
  )
}
