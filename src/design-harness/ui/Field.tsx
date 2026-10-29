import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string
  invalid?: boolean
  /** Icon at the end of the input, e.g. a search glass. */
  trailing?: ReactNode
  /** Small link at the end of the label row, e.g. "Edit" on a value that is set once. */
  action?: { label: string; onClick: () => void }
}

/** Harness text field: label above, filled, no resting border, focus ring while typing. */
export function Field({ label, hint, invalid, trailing, action, id, className, ...rest }: FieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const hintId = hint ? `${inputId}-hint` : undefined
  return (
    <div
      className={['design-harness-field', className].filter(Boolean).join(' ')}
      data-invalid={invalid ? 'true' : undefined}
    >
      <div className="design-harness-field__label-row">
        <label className="design-harness-field__label" htmlFor={inputId}>
          {label}
        </label>
        {action ? (
          <button
            type="button"
            className="design-harness-field__action"
            aria-label={`${action.label} ${label.toLowerCase()}`}
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ) : null}
      </div>
      <div className="design-harness-field__shell">
        <input
          className="design-harness-field__input"
          id={inputId}
          aria-invalid={invalid || undefined}
          aria-describedby={hintId}
          {...rest}
        />
        {trailing ? (
          <span className="design-harness-field__trailing" aria-hidden>
            {trailing}
          </span>
        ) : null}
      </div>
      {hint ? (
        <span className="design-harness-field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}
