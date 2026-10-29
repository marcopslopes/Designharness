import type { ComponentType, SVGProps } from 'react'
import { ICON_STROKE_BY_SIZE, type IconSize } from './iconSizes'

export type { IconSize }

/**
 * All icons render from `@tabler/icons-react` (5,900+ MIT-licensed icons,
 * https://tabler.io/icons). Never hand-draw new inline `<svg>` icon markup —
 * find the closest Tabler icon and pass it to this primitive instead.
 */
export type TablerIconComponent = ComponentType<
  Partial<Omit<SVGProps<SVGSVGElement>, 'stroke'>> & {
    size?: string | number
    stroke?: string | number
    title?: string
  }
>

export type IconProps = {
  /** A component imported from `@tabler/icons-react`, e.g. `IconCalendar`. */
  icon: TablerIconComponent
  size?: IconSize
  /** Stroke thickness override. Defaults to the size-scaled weight in ICON_STROKE_BY_SIZE. */
  stroke?: number
  className?: string
  title?: string
}

export function Icon({ icon: TablerIcon, size = 'md', stroke, className, title }: IconProps) {
  return (
    <TablerIcon
      className={['ds-icon', className].filter(Boolean).join(' ')}
      data-size={size}
      stroke={stroke ?? ICON_STROKE_BY_SIZE[size]}
      aria-hidden={title ? undefined : true}
      title={title}
    />
  )
}
