import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import type { TablerIconComponent } from './Icon'
import { IconDeviceMobile } from '@tabler/icons-react'

export type SquareButtonTone = 'white' | 'black-selected' | 'sea-selected' | 'disabled'

export type SquareButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: SquareButtonTone
  icon?: TablerIconComponent
  title?: ReactNode
  subtitle?: ReactNode
  actionLabel?: ReactNode
}

export function SquareButton({
  tone = 'white',
  icon = IconDeviceMobile,
  title = 'Header Normal',
  subtitle = 'Subheader',
  actionLabel = 'Primary Button',
  type = 'button',
  className,
  disabled,
  ...rest
}: SquareButtonProps) {
  const isDisabled = disabled || tone === 'disabled'
  const primaryTone = tone === 'sea-selected' ? 'sea' : 'black'

  return (
    <button
      type={type}
      className={['ds-square-button', className].filter(Boolean).join(' ')}
      data-tone={tone}
      disabled={isDisabled}
      {...rest}
    >
      <Icon icon={icon} size="xl" />
      {title != null ? <p className="ds-square-button__title">{title}</p> : null}
      {subtitle != null ? <p className="ds-square-button__subtitle">{subtitle}</p> : null}
      {actionLabel != null ? (
        <span
          className="ds-button"
          data-variant="primary"
          data-size="sm"
          data-primary-tone={primaryTone}
          aria-hidden
        >
          <span className="ds-button__label">{actionLabel}</span>
        </span>
      ) : null}
    </button>
  )
}
