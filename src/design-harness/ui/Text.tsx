import type { ReactNode } from 'react'

export type TextVariant = 'display' | 'body-large' | 'body' | 'label' | 'muted'

/** Harness type in Geist. `display` = page titles, `label` = bold small headings, `muted` = secondary lines. */
export function Text({
  variant = 'body',
  as: Tag = 'p',
  id,
  className,
  children,
}: {
  variant?: TextVariant
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <Tag id={id} className={['design-harness-text', className].filter(Boolean).join(' ')} data-variant={variant}>
      {children}
    </Tag>
  )
}
