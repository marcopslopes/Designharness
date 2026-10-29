import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import type { TablerIconComponent } from './Icon'
import { IconPhoto } from '@tabler/icons-react'

export type DashedButtonShape = 'circle' | 'square' | 'square-filled'

export type DashedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  shape?: DashedButtonShape
  icon?: TablerIconComponent
  children?: ReactNode
}

export function DashedButton({
  shape = 'circle',
  icon = IconPhoto,
  type = 'button',
  children = 'Add logo',
  className,
  ...rest
}: DashedButtonProps) {
  return (
    <button
      type={type}
      className={['ds-dashed-button', className].filter(Boolean).join(' ')}
      data-shape={shape}
      {...rest}
    >
      <Icon icon={icon} size="lg" />
      {children != null ? <span>{children}</span> : null}
    </button>
  )
}
