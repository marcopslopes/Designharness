import { IconCheck, IconMinus } from '@tabler/icons-react'
import type { ButtonHTMLAttributes } from 'react'
import { Icon } from './Icon'

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate'

/**
 * @deprecated Pre-UI-Kit-v2. `black` → ink, `sea` → brand. Prefer omitting
 * (defaults to ink).
 */
export type CheckboxTone = 'black' | 'sea'

export type CheckboxProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  state?: CheckboxState
  /** @deprecated use default ink; `sea` → brand */
  tone?: CheckboxTone
  error?: boolean
}

export function Checkbox({
  state = 'unchecked',
  tone = 'black',
  error = false,
  className,
  disabled,
  type = 'button',
  ...rest
}: CheckboxProps) {
  const selected = state === 'checked' || state === 'indeterminate'
  const intent = tone === 'sea' ? 'brand' : 'ink'

  return (
    <button
      type={type}
      role="checkbox"
      className={['ds-checkbox', className].filter(Boolean).join(' ')}
      data-state={state}
      data-intent={intent}
      data-error={error && !selected ? 'true' : undefined}
      aria-checked={state === 'indeterminate' ? 'mixed' : selected}
      disabled={disabled}
      {...rest}
    >
      {state === 'checked' ? (
        <Icon icon={IconCheck} size="sm" className="ds-checkbox__mark" />
      ) : null}
      {state === 'indeterminate' ? (
        <Icon icon={IconMinus} size="sm" className="ds-checkbox__mark" />
      ) : null}
    </button>
  )
}
