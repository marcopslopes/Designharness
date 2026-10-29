import { IconMinus, IconPlus } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import { Icon } from './Icon'

export type StepperProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  /** Names the control for assistive tech. */
  label: string
}

/** Plus and minus around a number. Kit `StepperControl`. */
export function Stepper({ value, onChange, min = 0, max = 99, label, className, ...rest }: StepperProps) {
  return (
    <div className={['ds-stepper', className].filter(Boolean).join(' ')} role="group" aria-label={label} {...rest}>
      <button
        type="button"
        className="ds-stepper__btn"
        aria-label="Decrease"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Icon icon={IconMinus} size="sm" />
      </button>
      <span className="ds-stepper__value">{value}</span>
      <button
        type="button"
        className="ds-stepper__btn"
        aria-label="Increase"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Icon icon={IconPlus} size="sm" />
      </button>
    </div>
  )
}
