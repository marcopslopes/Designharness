import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonIntent = 'primary' | 'secondary' | 'ghost'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: ButtonIntent
  size?: 'sm' | 'md'
  startIcon?: ReactNode
  endIcon?: ReactNode
}

/** Harness pill button: ink primary, sand secondary, quiet ghost. */
export function Button({
  intent = 'primary',
  size = 'md',
  type = 'button',
  startIcon,
  endIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={['design-harness-button', className].filter(Boolean).join(' ')}
      data-intent={intent}
      data-size={size}
      {...rest}
    >
      {startIcon ? <span className="design-harness-button__icon">{startIcon}</span> : null}
      {children}
      {endIcon ? <span className="design-harness-button__icon">{endIcon}</span> : null}
    </button>
  )
}
