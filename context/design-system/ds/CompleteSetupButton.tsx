import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import { IconChevronRight } from '@tabler/icons-react'

export type CompleteSetupButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** 0–100 progress fill. Use `null` for invite / non-percent states. */
  progress?: number | null
  label?: ReactNode
  progressLabel?: ReactNode
}

export function CompleteSetupButton({
  progress = 70,
  label = 'Complete setup',
  progressLabel,
  type = 'button',
  className,
  ...rest
}: CompleteSetupButtonProps) {
  const pct = progress == null ? null : Math.max(0, Math.min(100, progress))
  const fillWidth = pct == null ? '0%' : `${pct}%`
  const shown = progressLabel ?? (pct == null ? null : `${pct}%`)

  return (
    <button
      type={type}
      className={['ds-complete-setup', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="ds-complete-setup__fill" style={{ width: fillWidth }} aria-hidden />
      <span className="ds-complete-setup__content">
        {shown != null ? <span className="ds-complete-setup__pct">{shown}</span> : null}
        <span className="ds-complete-setup__label">{label}</span>
        <span className="ds-complete-setup__chevron" aria-hidden>
          <Icon icon={IconChevronRight} size="lg" />
        </span>
      </span>
    </button>
  )
}
