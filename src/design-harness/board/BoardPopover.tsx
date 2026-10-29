import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'

/**
 * A native `popover` menu under (or above) its trigger — the same pattern and
 * `.design-harness-menu` look as `MenuButton` in DocParts. Light dismiss and
 * Esc come from the platform. The trigger is any button with
 * `popoverTarget={id}`.
 */
export function BoardPopover({
  id,
  label,
  placement = 'below',
  align = 'start',
  className,
  children,
}: {
  id: string
  label: string
  placement?: 'below' | 'above'
  align?: 'start' | 'end'
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const menu = ref.current
    if (!menu) return
    const onToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === 'open'
      const trigger = document.querySelector<HTMLElement>(`[popovertarget="${CSS.escape(id)}"]`)
      trigger?.setAttribute('aria-expanded', String(open))
      if (!open || !trigger) return
      const anchor = trigger.getBoundingClientRect()
      const gap = 8
      const top = placement === 'below' ? anchor.bottom + gap : anchor.top - menu.offsetHeight - gap
      const left = align === 'start' ? anchor.left : anchor.right - menu.offsetWidth
      menu.style.top = `${Math.max(gap, top)}px`
      menu.style.left = `${Math.max(gap, Math.min(left, window.innerWidth - menu.offsetWidth - gap))}px`
      menu.querySelector<HTMLElement>('[aria-checked="true"], [role^="menuitem"], button')?.focus()
    }
    menu.addEventListener('toggle', onToggle)
    return () => menu.removeEventListener('toggle', onToggle)
  }, [id, placement, align])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('[role^="menuitem"]')]
    const at = items.indexOf(document.activeElement as HTMLElement)
    const step = event.key === 'ArrowDown' ? 1 : -1
    items[(at + step + items.length) % items.length]?.focus()
  }

  return (
    <div
      ref={ref}
      id={id}
      className={['design-harness-menu', 'design-harness-board-menu', className].filter(Boolean).join(' ')}
      popover="auto"
      role="menu"
      aria-label={label}
      onKeyDown={onKeyDown}
    >
      {children}
    </div>
  )
}
