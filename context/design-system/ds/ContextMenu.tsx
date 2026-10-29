import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'

export type ContextMenuProps = HTMLAttributes<HTMLDivElement> & {
  label?: string
}

/** iOS 26 glass contextual menu. */
export function ContextMenu({ label = 'Actions', className, children, ...rest }: ContextMenuProps) {
  return (
    <div
      role="menu"
      aria-label={label}
      className={['ds-menu', 'ds-glass', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}

export type ContextMenuItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  destructive?: boolean
  detail?: string
}

export function ContextMenuItem({ icon, destructive = false, detail, className, children, type = 'button', ...rest }: ContextMenuItemProps) {
  return (
    <button
      type={type}
      role="menuitem"
      className={['ds-menu__item', className].filter(Boolean).join(' ')}
      data-destructive={destructive ? 'true' : undefined}
      {...rest}
    >
      {icon ? <span className="ds-menu__icon">{icon}</span> : null}
      <span className="ds-menu__copy">
        <span>{children}</span>
        {detail ? <span className="ds-menu__detail">{detail}</span> : null}
      </span>
    </button>
  )
}
