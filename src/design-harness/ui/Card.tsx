import type { ReactNode } from 'react'

/** Panel surface with a hairline: the base for gallery, project and summary cards. */
export function Card({
  as: Tag = 'section',
  className,
  children,
}: {
  as?: 'section' | 'div' | 'article'
  className?: string
  children: ReactNode
}) {
  return <Tag className={['design-harness-card', className].filter(Boolean).join(' ')}>{children}</Tag>
}
