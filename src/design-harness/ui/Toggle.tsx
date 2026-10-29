import type { ButtonHTMLAttributes } from 'react'

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  checked: boolean
}

/** Harness switch. Name it with `aria-label` or `aria-labelledby`. */
export function Toggle({ checked, className, type = 'button', ...rest }: ToggleProps) {
  return (
    <button
      type={type}
      role="switch"
      aria-checked={checked}
      className={['design-harness-toggle', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="design-harness-toggle__thumb" aria-hidden />
    </button>
  )
}
