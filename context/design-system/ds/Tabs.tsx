import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type TabItem = {
  id: string
  label: string
  panel?: ReactNode
  disabled?: boolean
}

export type TabsProps = {
  items: TabItem[]
  value?: string
  defaultValue?: string
  onChange?: (id: string) => void
  'aria-label'?: string
  className?: string
}

/**
 * Design Harness kit underline tabs (`source/design-harness-kit` AnimatedTabs).
 * CSS underline indicator — no framer-motion.
 */
export function Tabs({
  items,
  value: valueProp,
  defaultValue,
  onChange,
  'aria-label': ariaLabel = 'Tabs',
  className,
}: TabsProps) {
  const baseId = useId()
  const first = items[0]?.id ?? ''
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? first)
  const value = valueProp ?? uncontrolled
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = Math.max(
    0,
    items.findIndex((t) => t.id === value),
  )
  const active = items[activeIndex]

  function select(id: string) {
    if (valueProp === undefined) setUncontrolled(id)
    onChange?.(id)
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight') next = (index + 1) % items.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length
    else return
    event.preventDefault()
    const target = items[next]
    if (!target || target.disabled) return
    select(target.id)
    refs.current[next]?.focus()
  }

  return (
    <div className={['ds-tabs', className].filter(Boolean).join(' ')}>
      <div role="tablist" aria-label={ariaLabel} className="ds-tabs__list">
        {items.map((item, index) => {
          const selected = item.id === value
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[index] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              className="ds-tabs__tab"
              data-selected={selected ? 'true' : undefined}
              onClick={() => select(item.id)}
              onKeyDown={(e) => onKeyDown(e, index)}
            >
              {item.label}
              {selected ? <span className="ds-tabs__underline" aria-hidden /> : null}
            </button>
          )
        })}
      </div>
      {active ? (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${active.id}`}
          aria-labelledby={`${baseId}-tab-${active.id}`}
          className="ds-tabs__panel"
        >
          {active.panel ?? null}
        </div>
      ) : null}
    </div>
  )
}
