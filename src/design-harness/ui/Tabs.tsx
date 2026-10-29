import { useRef, type KeyboardEvent } from 'react'
import { tabId } from './tabIds'

export type TabItem<T extends string> = { value: T; label: string }

/** Pill tabs on a quiet track. ← → move between tabs; pair a panel with `tabsPanelProps`. */
export function Tabs<T extends string>({
  id,
  label,
  items,
  value,
  onChange,
  className,
  tabClassName,
  hasPanel = true,
}: {
  id: string
  label: string
  items: TabItem<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  tabClassName?: string
  /** False when the tabs switch pages rather than a `tabsPanelProps` panel. */
  hasPanel?: boolean
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const active = Math.max(
    0,
    items.findIndex((item) => item.value === value),
  )

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const next = (active + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length
    onChange(items[next].value)
    refs.current[next]?.focus()
  }

  return (
    <div
      className={['design-harness-work-toggle', className].filter(Boolean).join(' ')}
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {items.map((item, index) => (
        <button
          key={item.value}
          ref={(node) => {
            refs.current[index] = node
          }}
          type="button"
          role="tab"
          id={tabId(id, item.value)}
          aria-selected={index === active}
          aria-controls={hasPanel ? `${id}-panel` : undefined}
          tabIndex={index === active ? 0 : -1}
          className={['design-harness-work-toggle__link design-harness-tabs__tab', tabClassName]
            .filter(Boolean)
            .join(' ')}
          data-active={index === active ? 'true' : 'false'}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
