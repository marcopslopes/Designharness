import { IconChevronRight } from '@tabler/icons-react'
import type { ButtonHTMLAttributes } from 'react'
import { Icon } from './Icon'
import { ProgressBar } from './ProgressBar'

export type SetupChecklistProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  title: string
  done: number
  total: number
  next: string
}

/** Progress through a short setup list, with the next step. Kit `SetupChecklist`. */
export function SetupChecklist({ title, done, total, next, className, type = 'button', ...rest }: SetupChecklistProps) {
  const value = total === 0 ? 0 : done / total
  return (
    <button type={type} className={['ds-setup', className].filter(Boolean).join(' ')} {...rest}>
      <span className="ds-setup__head">
        <span className="ds-setup__title">{title}</span>
        <span className="ds-setup__count">
          {done} / {total}
        </span>
      </span>
      <ProgressBar size="sm" intent="brand" value={value} label={title} />
      <span className="ds-setup__next">
        <span>{next}</span>
        <Icon icon={IconChevronRight} size="sm" />
      </span>
    </button>
  )
}
