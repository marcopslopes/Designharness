import type { ButtonHTMLAttributes } from 'react'

/**
 * @deprecated Pre-UI-Kit-v2. `black` → ink, `sea` → brand. Prefer omitting.
 */
export type RadioTone = 'black' | 'sea'

export type RadioProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  checked?: boolean
  /** @deprecated use default ink; `sea` → brand */
  tone?: RadioTone
  error?: boolean
}

export function Radio({
  checked = false,
  tone = 'black',
  error = false,
  className,
  disabled,
  type = 'button',
  ...rest
}: RadioProps) {
  const intent = tone === 'sea' ? 'brand' : 'ink'

  return (
    <button
      type={type}
      role="radio"
      className={['ds-radio', className].filter(Boolean).join(' ')}
      data-checked={checked ? 'true' : 'false'}
      data-intent={intent}
      data-error={error && !checked ? 'true' : undefined}
      aria-checked={checked}
      disabled={disabled}
      {...rest}
    >
      <span className="ds-radio__dot" aria-hidden />
    </button>
  )
}
