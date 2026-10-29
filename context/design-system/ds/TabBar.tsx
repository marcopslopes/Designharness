import type { HTMLAttributes, ReactNode } from 'react'

export type TabBarItem = {
  id: string
  label: string
  icon: ReactNode
}

export type TabBarProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  items: TabBarItem[]
  value: string
  onChange: (id: string) => void
  /** A separate control on the glass, such as search. */
  accessory?: ReactNode
  label?: string
}

/** iOS 26 floating glass tab bar. */
export function TabBar({ items, value, onChange, accessory, label = 'Sections', className, ...rest }: TabBarProps) {
  return (
    <div className={['ds-tab-bar', className].filter(Boolean).join(' ')} {...rest}>
      <div className="ds-tab-bar__tabs ds-glass" role="tablist" aria-label={label}>
        {items.map((item) => {
          const selected = item.id === value
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              className="ds-tab-bar__tab"
              aria-selected={selected}
              data-active={selected ? 'true' : undefined}
              onClick={() => onChange(item.id)}
            >
              <span className="ds-tab-bar__icon">{item.icon}</span>
              <span className="ds-tab-bar__label">{item.label}</span>
            </button>
          )
        })}
      </div>
      {accessory ? <div className="ds-tab-bar__accessory ds-glass">{accessory}</div> : null}
    </div>
  )
}
