import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import { Icon } from './Icon'

export type SelectorProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  options: string[]
  value: string
  onChange?: (value: string) => void
}

/**
 * Figma Selector — scroll-wheel style option list with selected band + edge fades.
 */
export function Selector({ options, value, onChange, className, ...rest }: SelectorProps) {
  const index = Math.max(0, options.indexOf(value))

  return (
    <div
      className={['ds-selector', className].filter(Boolean).join(' ')}
      role="listbox"
      aria-activedescendant={undefined}
      {...rest}
    >
      <span className="ds-selector__chevron" aria-hidden>
        <Icon icon={IconChevronUp} size="lg" />
      </span>
      <div className="ds-selector__fade ds-selector__fade--top" aria-hidden />
      <ul className="ds-selector__list">
        {options.map((opt, i) => {
          const selected = opt === value
          const dist = Math.abs(i - index)
          const tone = dist === 0 ? 'selected' : dist === 1 ? 'near' : 'far'
          return (
            <li key={opt}>
              <button
                type="button"
                role="option"
                className="ds-selector__option"
                data-tone={tone}
                data-selected={selected ? 'true' : 'false'}
                aria-selected={selected}
                onClick={() => onChange?.(opt)}
              >
                {opt}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="ds-selector__fade ds-selector__fade--bottom" aria-hidden />
      <span className="ds-selector__chevron" aria-hidden>
        <Icon icon={IconChevronDown} size="lg" />
      </span>
    </div>
  )
}
