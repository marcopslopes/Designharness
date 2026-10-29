import { useRef, type KeyboardEvent } from 'react'

export type SegmentedOption<T extends string> = { value: T; label: string; disabled?: boolean }

/** Pick one of a few values: a sand track with a paper thumb. ← → move the choice. */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  fullWidth = false,
  className,
}: {
  label: string
  options: SegmentedOption<T>[]
  value: T
  onChange: (value: T) => void
  fullWidth?: boolean
  className?: string
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const active = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
    if (!step) return
    event.preventDefault()
    for (let i = 1; i <= options.length; i++) {
      const next = (active + step * i + options.length) % options.length
      if (options[next].disabled) continue
      onChange(options[next].value)
      refs.current[next]?.focus()
      return
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={['design-harness-segmented', className].filter(Boolean).join(' ')}
      data-full-width={fullWidth ? 'true' : undefined}
      onKeyDown={onKeyDown}
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          ref={(node) => {
            refs.current[index] = node
          }}
          type="button"
          role="radio"
          aria-checked={index === active}
          tabIndex={index === active ? 0 : -1}
          disabled={option.disabled}
          className="design-harness-segmented__option"
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
