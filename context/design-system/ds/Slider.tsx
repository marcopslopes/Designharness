import type { InputHTMLAttributes } from 'react'

export type SliderProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> & {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
  label: string
}

/** A labeled range with the current value above the track. Kit `SliderControl`. */
export function Slider({ value, onChange, min = 0, max = 100, unit = '', label, className, ...rest }: SliderProps) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100
  return (
    <div className={['ds-slider', className].filter(Boolean).join(' ')}>
      <div className="ds-slider__scale">
        <span>
          {min}
          {unit}
        </span>
        <span className="ds-slider__value">
          {value}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
      <div className="ds-slider__track">
        <span className="ds-slider__fill" style={{ width: `${pct}%` }} />
        <input
          {...rest}
          className="ds-slider__range"
          type="range"
          min={min}
          max={max}
          value={value}
          aria-label={label}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span className="ds-slider__thumb" style={{ left: `${pct}%` }} />
      </div>
    </div>
  )
}
