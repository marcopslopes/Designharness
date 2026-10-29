import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Design Harness kit switch. Default size matches the
 * kit's 52×32 track; `sm` is a compact secondary size.
 */
export type ToggleSize = 'sm' | 'lg'

/**
 * @deprecated Pre-UI-Kit-v2. Kit switches use ink when on. `negative` still
 * maps to danger red for destructive confirms; prefer omitting.
 */
export type ToggleTone = 'positive' | 'negative'

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  size?: ToggleSize
  checked?: boolean
  /** @deprecated use default ink; `negative` → danger when checked */
  tone?: ToggleTone
  label?: ReactNode
}

export function Toggle({
  size = 'lg',
  checked = false,
  tone = 'positive',
  label,
  className,
  disabled,
  type = 'button',
  ...rest
}: ToggleProps) {
  return (
    <span className={['ds-toggle-wrap', className].filter(Boolean).join(' ')}>
      <button
        type={type}
        role="switch"
        className="ds-toggle"
        data-size={size}
        data-checked={checked ? 'true' : 'false'}
        data-tone={tone}
        aria-checked={checked}
        disabled={disabled}
        {...rest}
      >
        <span className="ds-toggle__thumb" aria-hidden />
      </button>
      {label != null && label !== false ? (
        <span className="ds-toggle__label">{label}</span>
      ) : null}
    </span>
  )
}
