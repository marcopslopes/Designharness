import type { GalleryDesigner } from '../galleryData'

function designerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase()
}

export type DesignerAvatarProps = {
  designer: GalleryDesigner
  /** Larger size for detail headers; default is the compact card/list size. */
  large?: boolean
  /** Even smaller size for dense rows, e.g. a prototype-card byline. */
  small?: boolean
  className?: string
}

/**
 * Designer photo (the card file's `avatarUrl`) or initials fallback —
 * shared between the Team Gallery directory and any other surface that
 * attributes work to a designer (e.g. the Playground prototype grid).
 */
export function DesignerAvatar({ designer, large = false, small = false, className }: DesignerAvatarProps) {
  const classes = [
    'design-harness-gallery__avatar',
    large ? 'design-harness-gallery__avatar--lg' : '',
    small ? 'design-harness-gallery__avatar--sm' : '',
    designer.avatarUrl ? '' : 'design-harness-gallery__avatar--fallback',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const size = large ? 64 : small ? 24 : 48

  if (designer.avatarUrl) {
    return <img className={classes} src={designer.avatarUrl} alt="" width={size} height={size} decoding="async" />
  }

  return (
    <span className={classes} aria-hidden>
      {designerInitials(designer.name)}
    </span>
  )
}
