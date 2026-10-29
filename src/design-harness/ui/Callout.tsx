import type { ReactNode } from 'react'
import { FrameDanger, FrameDangerCircle, FrameInfo } from '../harnessIcons'
import { Icon, type TablerIconComponent } from '../../../context/design-system/ds'

export type CalloutTone = 'info' | 'warning' | 'danger'

const CALLOUT_ICON: Record<CalloutTone, TablerIconComponent> = {
  info: FrameInfo,
  warning: FrameDanger,
  danger: FrameDangerCircle,
}

/** Forest tint for notes, amber for warnings, red for errors. `danger` is announced as an alert. */
export function Callout({
  tone = 'info',
  action,
  className,
  children,
}: {
  tone?: CalloutTone
  action?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <aside
      className={['design-harness-callout', className].filter(Boolean).join(' ')}
      data-tone={tone}
      role={tone === 'danger' ? 'alert' : 'note'}
    >
      <span className="design-harness-callout__icon">
        <Icon icon={CALLOUT_ICON[tone]} size="sm" />
      </span>
      <div className="design-harness-callout__body">{children}</div>
      {action ? <div className="design-harness-callout__action">{action}</div> : null}
    </aside>
  )
}
