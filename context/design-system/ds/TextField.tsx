import type { InputHTMLAttributes, ReactNode } from 'react'

/**
 * Design Harness kit text field — default outlined label-above, or floating
 * (`source/design-harness-kit` FloatingLabelField) with CSS elevation (no framer).
 */
export type TextFieldVariant = 'default' | 'floating'

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  invalid?: boolean
  /** Success affordance for floating fields (leaf ring + message tone). */
  success?: boolean
  variant?: TextFieldVariant
  trailing?: ReactNode
}

export function TextField({
  label,
  hint,
  id,
  invalid,
  success,
  variant = 'default',
  trailing,
  className,
  placeholder,
  ...inputProps
}: TextFieldProps) {
  const inputId = id ?? label.replace(/\s+/g, '-').toLowerCase()
  const floating = variant === 'floating'

  return (
    <div
      className={['ds-field', className].filter(Boolean).join(' ')}
      data-invalid={invalid ? 'true' : 'false'}
      data-success={success ? 'true' : undefined}
      data-variant={variant}
    >
      {floating ? (
        <div className="ds-field__shell">
          <input
            className="ds-field__input"
            id={inputId}
            placeholder={placeholder ?? ' '}
            aria-invalid={invalid || undefined}
            aria-describedby={hint ? `${inputId}-hint` : undefined}
            {...inputProps}
          />
          <label className="ds-field__label" htmlFor={inputId}>
            {label}
          </label>
          {trailing ? <span className="ds-field__trailing">{trailing}</span> : null}
        </div>
      ) : (
        <>
          <label className="ds-field__label" htmlFor={inputId}>
            {label}
          </label>
          <div className="ds-field__shell">
            <input
              className="ds-field__input"
              id={inputId}
              placeholder={placeholder}
              aria-invalid={invalid || undefined}
              aria-describedby={hint ? `${inputId}-hint` : undefined}
              {...inputProps}
            />
            {trailing ? <span className="ds-field__trailing">{trailing}</span> : null}
          </div>
        </>
      )}
      {hint ? (
        <span className="ds-field__hint" id={`${inputId}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
