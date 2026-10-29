import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { RippleLayer } from './RippleLayer'
import { useRipple } from './useRipple'

/**
 * Design Harness kit chips. Paper + line border;
 * selected = ink fill. One size matching the kit (padding 10×16, radius 14).
 */
export type ChipSize = 'sm' | 'md' | 'lg'

/**
 * @deprecated Pre-UI-Kit-v2 Figma Fill. Mapped for compat — prefer omitting.
 */
export type ChipFill = 'gray' | 'black' | 'white'
/**
 * @deprecated Pre-UI-Kit-v2 selected modes. `false` → off; any truthy → on.
 */
export type ChipSelected = false | 'black' | 'sea' | true

export type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ChipSize
  /** Selected / on state (ink fill). */
  selected?: ChipSelected
  ripple?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  children?: ReactNode
  /** @deprecated ignored — kit chips are a single surface treatment */
  fill?: ChipFill
  /** @deprecated ignored — kit chips use fixed 14px radius */
  rounded?: boolean
}

function isOn(selected: ChipSelected | undefined): boolean {
  return selected === true || selected === 'black' || selected === 'sea'
}

export function Chip({
  size = 'md',
  fill: _fill = 'gray',
  selected = false,
  rounded: _rounded = true,
  ripple = true,
  type = 'button',
  startIcon,
  endIcon,
  children,
  className,
  disabled,
  onPointerDown,
  ...rest
}: ChipProps) {
  const on = isOn(selected)
  const { ripples, onPointerDown: addRipple, onRippleEnd } = useRipple(ripple && !disabled)
  const ink = on ? 'light' : 'dark'

  return (
    <button
      type={type}
      className={['ds-chip', 'ds-interactive', className].filter(Boolean).join(' ')}
      data-size={size}
      data-selected={on ? 'true' : undefined}
      data-ripple-ink={ink}
      disabled={disabled}
      aria-pressed={on || undefined}
      onPointerDown={(event) => {
        addRipple(event)
        onPointerDown?.(event)
      }}
      {...rest}
    >
      <RippleLayer ripples={ripples} onRippleEnd={onRippleEnd} />
      {startIcon ? <span className="ds-chip__icon">{startIcon}</span> : null}
      {children != null && children !== false ? (
        <span className="ds-chip__label">{children}</span>
      ) : null}
      {endIcon ? <span className="ds-chip__icon">{endIcon}</span> : null}
    </button>
  )
}
