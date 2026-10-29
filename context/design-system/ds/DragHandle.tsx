import { IconGripVertical } from '@tabler/icons-react'
import type { HTMLAttributes } from 'react'
import { Icon } from './Icon'

export type DragHandleProps = HTMLAttributes<HTMLSpanElement>

/** Figma Drag — reorder grip. */
export function DragHandle({ className, ...rest }: DragHandleProps) {
  return (
    <span className={['ds-drag-handle', className].filter(Boolean).join(' ')} {...rest}>
      <Icon icon={IconGripVertical} size="md" />
    </span>
  )
}
