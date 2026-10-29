import type { ButtonHTMLAttributes } from 'react'

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed'> & {
  selected?: boolean
  size?: 'sm' | 'md'
}

/** Filter pill. Selected fills with ink and reports `aria-pressed`. */
export function Chip({ selected = false, size = 'md', type = 'button', className, ...rest }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={['design-harness-chip', className].filter(Boolean).join(' ')}
      data-size={size}
      {...rest}
    />
  )
}
