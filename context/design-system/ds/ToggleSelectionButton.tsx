import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import type { TablerIconComponent } from './Icon'
import { IconCheck } from '@tabler/icons-react'

export type ToggleSelectionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean
  icon?: TablerIconComponent
  children?: ReactNode
}

export function ToggleSelectionButton({
  pressed = false,
  icon = IconCheck,
  type = 'button',
  children = 'Selected',
  className,
  ...rest
}: ToggleSelectionButtonProps) {
  return (
    <button
      type={type}
      className={['ds-toggle-selection', className].filter(Boolean).join(' ')}
      data-pressed={pressed ? 'true' : 'false'}
      aria-pressed={pressed}
      {...rest}
    >
      <Icon icon={icon} size="xs" />
      <span>{children}</span>
    </button>
  )
}
