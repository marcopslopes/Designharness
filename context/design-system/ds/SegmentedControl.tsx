import { useEffect, useId, useState, type CSSProperties, type ReactNode } from 'react'

export type SegmentOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SegmentedControlProps = {
  options: SegmentOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  /** Accessible name for the radiogroup */
  'aria-label'?: string
  className?: string
  fullWidth?: boolean
}

/**
 * Design Harness kit segmented control — sunken track + paper thumb
 * (`source/design-harness-kit` SegmentedControl). CSS-only thumb slide (no framer).
 */
export function SegmentedControl({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  'aria-label': ariaLabel = 'Options',
  className,
  fullWidth = true,
}: SegmentedControlProps) {
  const groupId = useId()
  const first = options[0]?.value ?? ''
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? first)
  const [snap, setSnap] = useState(false)
  const value = valueProp ?? uncontrolled
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
  const count = Math.max(1, options.length)

  useEffect(() => {
    if (!snap) return
    let second = 0
    const firstFrame = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setSnap(false))
    })
    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(second)
    }
  }, [snap, value])

  function select(next: string, fromKeyboard: boolean) {
    setSnap(fromKeyboard)
    if (valueProp === undefined) setUncontrolled(next)
    onChange?.(next)
  }

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={['ds-segment', className].filter(Boolean).join(' ')}
      data-full-width={fullWidth ? 'true' : undefined}
      data-motion={snap ? 'off' : undefined}
      style={
        {
          '--ds-segment-count': count,
          '--ds-segment-index': activeIndex,
        } as CSSProperties
      }
    >
      <span className="ds-segment__thumb" aria-hidden />
      {options.map((opt) => {
        const selected = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            id={`${groupId}-${opt.value}`}
            className="ds-segment__option"
            aria-checked={selected}
            disabled={opt.disabled}
            data-selected={selected ? 'true' : undefined}
            onClick={(event) => select(opt.value, event.detail === 0)}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export type EmptyStateProps = {
  title: string
  description?: string
  icon?: ReactNode
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
  className?: string
  children?: ReactNode
}

/** Design Harness kit empty state — brand glyph stack + title/body + CTA slot. */
export function EmptyState({
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div className={['ds-empty', className].filter(Boolean).join(' ')}>
      <div className="ds-empty__glyph" aria-hidden={icon ? undefined : true}>
        <span className="ds-empty__halo ds-empty__halo--outer" />
        <span className="ds-empty__halo ds-empty__halo--inner" />
        <span className="ds-empty__icon">{icon}</span>
      </div>
      <h3 className="ds-empty__title">{title}</h3>
      {description ? <p className="ds-empty__body">{description}</p> : null}
      {(primaryAction || secondaryAction) && (
        <div className="ds-empty__actions">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
      {children}
    </div>
  )
}
