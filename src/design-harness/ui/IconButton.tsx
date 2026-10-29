import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Square icon-only button — the rail, the sidebar's hide button, the mobile close. `label` is required. */
export function IconButton({
  label,
  active,
  className,
  title,
  children,
  ...rest
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
  label: string
  active?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      {...rest}
      className={['design-harness-ds-shell-rail__btn', className].filter(Boolean).join(' ')}
      aria-label={label}
      title={title ?? label}
      data-active={active ? 'true' : undefined}
    >
      {children}
    </button>
  )
}
