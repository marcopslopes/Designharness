import type { ReactNode } from 'react'

export type TextVariant = 'display' | 'body-large' | 'body' | 'label' | 'muted'

export type TextProps = {
  children: ReactNode
  variant?: TextVariant
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'div'
  className?: string
  /** For dialog labelling / anchors — forwarded to the element. */
  id?: string
}

export function Text({ children, variant = 'body', as: Tag = 'p', className, id }: TextProps) {
  return (
    <Tag
      id={id}
      className={['ds-text', className].filter(Boolean).join(' ')}
      data-variant={variant}
    >
      {children}
    </Tag>
  )
}
