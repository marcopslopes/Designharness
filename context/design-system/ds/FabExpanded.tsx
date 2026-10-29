import type { HTMLAttributes, ReactNode } from 'react'
import { Fab } from './Fab'
import type { FabSize } from './Fab'
import { Icon } from './Icon'
import type { TablerIconComponent } from './Icon'
import { IconX } from '@tabler/icons-react'

export type FabExpandedAction = {
  id: string
  label: ReactNode
  icon?: TablerIconComponent
  onClick?: () => void
}

export type FabExpandedProps = HTMLAttributes<HTMLDivElement> & {
  size?: FabSize
  actions: FabExpandedAction[]
  /** Closing / primary control at the bottom of the stack. */
  closeLabel?: ReactNode
  onClose?: () => void
  open?: boolean
}

/**
 * Design Harness kit speed-dial (`source/design-harness-kit` FabMenu items).
 * Label chips + icon circles above a primary Fab — no framer-motion.
 */
export function FabExpanded({
  size = 'sm',
  actions,
  closeLabel,
  onClose,
  open = true,
  className,
  ...rest
}: FabExpandedProps) {
  return (
    <div
      className={['ds-fab-expanded', className].filter(Boolean).join(' ')}
      data-open={open ? 'true' : undefined}
      {...rest}
    >
      {open ? (
        <div className="ds-fab-expanded__menu" role="menu">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              role="menuitem"
              className="ds-fab-menu-item"
              onClick={action.onClick}
            >
              <span className="ds-fab-menu-item__label">{action.label}</span>
              <span className="ds-fab-menu-item__icon" aria-hidden>
                {action.icon ? <Icon icon={action.icon} size="sm" /> : null}
              </span>
            </button>
          ))}
        </div>
      ) : null}
      <Fab
        size={size}
        tone="ink"
        icon={IconX}
        onClick={onClose}
        aria-label={typeof closeLabel === 'string' ? closeLabel : 'Close'}
      >
        {closeLabel && typeof closeLabel !== 'string' ? closeLabel : null}
      </Fab>
    </div>
  )
}
