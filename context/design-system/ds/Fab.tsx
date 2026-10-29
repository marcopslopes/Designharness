import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { IconPlus } from '@tabler/icons-react'
import { Icon } from './Icon'
import type { TablerIconComponent } from './Icon'
import { RippleLayer } from './RippleLayer'
import { useRipple } from './useRipple'

export type FabSize = 'xs' | 'sm' | 'lg'
/** @deprecated Prefer tone="ink" — "black" maps to ink. */
export type FabTone = 'ink' | 'paper' | 'black' | 'white'

export type FabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: FabSize
  tone?: FabTone
  icon?: TablerIconComponent
  /** Sustained selected / on state (`data-active`). */
  active?: boolean
  ripple?: boolean
  children?: ReactNode
}

function resolveTone(tone: FabTone): 'ink' | 'paper' {
  if (tone === 'white') return 'paper'
  if (tone === 'black') return 'ink'
  return tone
}

/**
 * Design Harness kit FAB (`source/design-harness-kit` FabMenu primary control).
 * Full-circle ink (or paper) control; sizes map to 48 / 56 / 64.
 */
export function Fab({
  size = 'sm',
  tone = 'ink',
  icon = IconPlus,
  active = false,
  ripple = true,
  type = 'button',
  children,
  className,
  disabled,
  onPointerDown,
  ...rest
}: FabProps) {
  const resolved = resolveTone(tone)
  const { ripples, onPointerDown: addRipple, onRippleEnd } = useRipple(ripple && !disabled)

  return (
    <button
      type={type}
      className={['ds-fab', 'ds-interactive', className].filter(Boolean).join(' ')}
      data-size={size}
      data-tone={resolved}
      data-active={active ? 'true' : undefined}
      data-ripple-ink={resolved === 'paper' ? 'dark' : 'light'}
      aria-pressed={active || undefined}
      disabled={disabled}
      onPointerDown={(event) => {
        addRipple(event)
        onPointerDown?.(event)
      }}
      {...rest}
    >
      <RippleLayer ripples={ripples} onRippleEnd={onRippleEnd} />
      <Icon icon={icon} size={size === 'lg' ? 'lg' : 'md'} />
      {children != null ? <span className="ds-fab__label">{children}</span> : null}
    </button>
  )
}
