export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

/**
 * Stroke follows size: 1px at 16px through 1.75px at 28px. Applied per size
 * step so a bare `<Icon icon={IconGift} size="lg" />` always gets the right
 * weight without callers doing the math.
 */
export const ICON_STROKE_BY_SIZE: Record<IconSize, number> = {
  xs: 1, // 16px
  sm: 1.125, // 18px
  md: 1.25, // 20px
  lg: 1.5, // 24px
  xl: 1.75, // 28px
}
