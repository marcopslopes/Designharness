import type { HTMLAttributes, ReactNode } from 'react'

export type AvatarSize = 'sm' | 'md' | 'lg'
export type AvatarTint = 'brand' | 'premium' | 'rose' | 'leaf' | 'amber' | 'ink' | 'sunken'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  size?: AvatarSize
  tint?: AvatarTint
  /** Initials or short label when no image/children. */
  initials?: string
  src?: string
  alt?: string
  children?: ReactNode
}

/**
 * Design Harness kit avatar atom (`source/design-harness-kit` AvatarGroup).
 */
export function Avatar({
  size = 'md',
  tint = 'brand',
  initials,
  src,
  alt = '',
  children,
  className,
  ...rest
}: AvatarProps) {
  return (
    <span
      className={['ds-avatar', className].filter(Boolean).join(' ')}
      data-size={size}
      data-tint={tint}
      {...rest}
    >
      {src ? <img className="ds-avatar__img" src={src} alt={alt} /> : null}
      {!src ? (children ?? initials ?? null) : null}
    </span>
  )
}

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  size?: AvatarSize
  /** Extra count shown as +N chip. */
  more?: number
  children: ReactNode
}

export function AvatarGroup({ size = 'sm', more, children, className, ...rest }: AvatarGroupProps) {
  return (
    <div
      className={['ds-avatar-group', className].filter(Boolean).join(' ')}
      data-size={size}
      {...rest}
    >
      {children}
      {more != null && more > 0 ? (
        <Avatar size={size} tint="sunken" initials={`+${more}`} aria-label={`${more} more`} />
      ) : null}
    </div>
  )
}
