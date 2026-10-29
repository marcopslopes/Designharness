import type { CSSProperties, ReactNode } from 'react'

type StackDirection = 'column' | 'row'

export type StackProps = {
  children: ReactNode
  direction?: StackDirection
  gap?: CSSProperties['gap']
  className?: string
}

export function Stack({ children, direction = 'column', gap, className }: StackProps) {
  const style: CSSProperties | undefined =
    gap !== undefined ? ({ ['--ds-stack-gap' as string]: gap } as CSSProperties) : undefined

  return (
    <div
      className={['ds-stack', className].filter(Boolean).join(' ')}
      data-direction={direction}
      style={style}
    >
      {children}
    </div>
  )
}
