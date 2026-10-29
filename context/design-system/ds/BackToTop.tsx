import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { IconChevronUp } from '@tabler/icons-react'
import { Icon } from './Icon'
import { RippleLayer } from './RippleLayer'
import { useRipple } from './useRipple'

export type BackToTopSize = 'sm' | 'lg'

export type BackToTopProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: BackToTopSize
  ripple?: boolean
  children?: ReactNode
}

export function BackToTop({
  size = 'sm',
  ripple = true,
  type = 'button',
  children = 'Back to top',
  className,
  disabled,
  onPointerDown,
  ...rest
}: BackToTopProps) {
  const { ripples, onPointerDown: addRipple, onRippleEnd } = useRipple(ripple && !disabled)

  return (
    <button
      type={type}
      className={['ds-back-to-top', 'ds-interactive', className].filter(Boolean).join(' ')}
      data-size={size}
      data-ripple-ink="light"
      disabled={disabled}
      onPointerDown={(event) => {
        addRipple(event)
        onPointerDown?.(event)
      }}
      {...rest}
    >
      <RippleLayer ripples={ripples} onRippleEnd={onRippleEnd} />
      <Icon icon={IconChevronUp} size="lg" />
      <span>{children}</span>
    </button>
  )
}
