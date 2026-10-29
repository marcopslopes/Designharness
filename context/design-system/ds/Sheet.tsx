import { useEffect, useRef, useState, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { IconAlertTriangle, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react'
import { Avatar } from './Avatar'
import { Badge, type BadgeIntent } from './Badge'
import { Button } from './Button'
import { Icon } from './Icon'
import { Loader } from './Loader'

export type SheetProps = {
  children: ReactNode
  className?: string
  /** Detached cancel under the sheet. */
  cancelLabel?: string
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void
  variant?: 'form' | 'action'
}

/** Bottom-sheet chrome — grabber and paper surface. */
export function Sheet({ children, className, cancelLabel, onCancel, variant = 'form' }: SheetProps) {
  return (
    <div className={['ds-sheet-stack', className].filter(Boolean).join(' ')}>
      <div className="ds-sheet" data-variant={variant}>
        <div className="ds-sheet__grabber-wrap" aria-hidden>
          <span className="ds-sheet__grabber" />
        </div>
        {children}
      </div>
      {cancelLabel ? (
        <button type="button" className="ds-sheet__cancel" onClick={onCancel}>
          {cancelLabel}
        </button>
      ) : null}
    </div>
  )
}

export type SheetHeaderProps = {
  title: string
  cancelLabel?: string
  doneLabel?: string
  onCancel?: () => void
  onDone?: () => void
  description?: string
  className?: string
  doneProps?: ButtonHTMLAttributes<HTMLButtonElement>
  cancelProps?: ButtonHTMLAttributes<HTMLButtonElement>
}

/** Form-sheet header — Cancel, title, Done. */
export function SheetHeader({
  title,
  cancelLabel = 'Cancel',
  doneLabel = 'Done',
  onCancel,
  onDone,
  description,
  className,
  doneProps,
  cancelProps,
}: SheetHeaderProps) {
  return (
    <header className={['ds-sheet-header', className].filter(Boolean).join(' ')}>
      <div className="ds-sheet-header__bar">
        <button type="button" className="ds-sheet-header__cancel" onClick={onCancel} {...cancelProps}>
          {cancelLabel}
        </button>
        <h2 className="ds-sheet-header__title">{title}</h2>
        <button type="button" className="ds-sheet-header__done" onClick={onDone} {...doneProps}>
          {doneLabel}
        </button>
      </div>
      {description ? (
        <>
          <div className="ds-sheet-header__rule" />
          <p className="ds-sheet-header__desc">{description}</p>
        </>
      ) : null}
    </header>
  )
}

export function SheetBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={['ds-sheet-body', className].filter(Boolean).join(' ')}>{children}</div>
}

export type SheetMenuProps = {
  caption?: string
  detail?: string
  children: ReactNode
}

/** Caption and action rows inside an action sheet. */
export function SheetMenu({ caption, detail, children }: SheetMenuProps) {
  return (
    <div className="ds-sheet-menu">
      {caption || detail ? (
        <div className="ds-sheet-menu__caption">
          {caption ? <p className="ds-sheet-menu__title">{caption}</p> : null}
          {detail ? <p className="ds-sheet-menu__detail">{detail}</p> : null}
        </div>
      ) : null}
      <div className="ds-sheet-menu__rows">{children}</div>
    </div>
  )
}

export type SheetActionProps = {
  label: string
  description?: string
  icon?: ReactNode
  destructive?: boolean
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export function SheetAction({ label, description, icon, destructive = false, onClick }: SheetActionProps) {
  return (
    <button type="button" className="ds-sheet-action" data-destructive={destructive || undefined} onClick={onClick}>
      {icon ? (
        <span className="ds-sheet-action__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="ds-sheet-action__text">
        <span className="ds-sheet-action__label">{label}</span>
        {description ? <span className="ds-sheet-action__desc">{description}</span> : null}
      </span>
    </button>
  )
}

export function SheetGroup({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="ds-sheet-group">
      {label ? <p className="ds-sheet-group__label">{label}</p> : null}
      <div className="ds-sheet-group__rows">{children}</div>
    </div>
  )
}

export type SheetRowProps = {
  label: string
  value: string
  icon?: ReactNode
  onClick?: () => void
}

/** Label on the left, value on the right. Used inside a form sheet. */
export function SheetRow({ label, value, icon, onClick }: SheetRowProps) {
  return (
    <button type="button" className="ds-sheet-row" onClick={onClick}>
      <span>{label}</span>
      <span>
        {value}
        {icon}
      </span>
    </button>
  )
}

export type ConfirmationSheetProps = {
  title: string
  body?: string
  confirmLabel: string
  cancelLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  /** Filled danger confirm. Omit for a neutral primary. */
  destructive?: boolean
  icon?: ReactNode
  className?: string
}

/** Grabber, glyph, title, and two stacked actions. */
export function ConfirmationSheet({
  title,
  body,
  confirmLabel,
  cancelLabel = 'Keep it',
  onConfirm,
  onCancel,
  destructive = false,
  icon,
  className,
}: ConfirmationSheetProps) {
  return (
    <Sheet variant="action" className={className}>
      <SheetBody>
        <div className="ds-sheet-confirm">
          <span className="ds-sheet-confirm__glyph" data-destructive={destructive || undefined} aria-hidden>
            {icon ?? <Icon icon={IconAlertTriangle} size="lg" />}
          </span>
          <h2>{title}</h2>
          {body ? <p>{body}</p> : null}
          <Button intent={destructive ? 'danger' : 'primary'} size="lg" fullWidth onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button intent="secondary" size="lg" fullWidth onClick={onCancel}>
            {cancelLabel}
          </Button>
        </div>
      </SheetBody>
    </Sheet>
  )
}

export type PickerOption = { value: string; label: string }

export type PickerSheetProps = {
  title: string
  options: PickerOption[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onCancel?: () => void
  onDone?: () => void
  cancelLabel?: string
  doneLabel?: string
  className?: string
}

/** Form sheet whose body is a snapping list. The selected row sits in a band. */
export function PickerSheet({
  title,
  options,
  value,
  defaultValue,
  onChange,
  onCancel,
  onDone,
  cancelLabel,
  doneLabel,
  className,
}: PickerSheetProps) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? '')
  const current = value ?? internal
  const listRef = useRef<HTMLUListElement>(null)
  const select = (next: string) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }

  useEffect(() => {
    const list = listRef.current
    const selected = list?.querySelector<HTMLButtonElement>('[aria-selected="true"]')
    if (!list || !selected) return
    const top = selected.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop
    list.scrollTop = top - list.clientHeight / 2 + selected.offsetHeight / 2
  }, [current])

  return (
    <Sheet className={className}>
      <SheetHeader
        title={title}
        cancelLabel={cancelLabel}
        doneLabel={doneLabel}
        onCancel={onCancel}
        onDone={onDone}
      />
      <div className="ds-sheet-picker" role="listbox" aria-label={title}>
        <span className="ds-sheet-picker__band" aria-hidden />
        <ul ref={listRef}>
          {options.map((option) => {
            const selected = option.value === current
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => select(option.value)}
                >
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </Sheet>
  )
}

export type DetailFact = { label: string; value: string; icon?: ReactNode }
export type DetailQuickAction = { label: string; icon?: ReactNode; onClick?: () => void }

export type DetailSheetProps = {
  title: string
  meta?: string
  initials?: string
  status?: string
  statusIntent?: BadgeIntent
  facts?: DetailFact[]
  actions?: DetailQuickAction[]
  primaryLabel?: string
  onPrimary?: () => void
  className?: string
}

/** Grabber, person, facts, quick actions, and one primary. */
export function DetailSheet({
  title,
  meta,
  initials,
  status,
  statusIntent = 'leaf',
  facts,
  actions,
  primaryLabel,
  onPrimary,
  className,
}: DetailSheetProps) {
  return (
    <Sheet className={className}>
      <div className="ds-sheet-detail">
        <div className="ds-sheet-detail__hero">
          {initials ? <Avatar initials={initials} size="lg" tint="brand" /> : null}
          <div>
            <h2>{title}</h2>
            {meta ? <p>{meta}</p> : null}
          </div>
          {status ? (
            <Badge intent={statusIntent} size="md">
              {status}
            </Badge>
          ) : null}
        </div>
        {facts && facts.length > 0 ? (
          <ul className="ds-sheet-detail__facts">
            {facts.map((fact) => (
              <li key={fact.label}>
                {fact.icon}
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </li>
            ))}
          </ul>
        ) : null}
        {actions && actions.length > 0 ? (
          <div className="ds-sheet-detail__actions">
            {actions.map((action) => (
              <Button key={action.label} intent="secondary" size="md" fullWidth startIcon={action.icon} onClick={action.onClick}>
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
        {primaryLabel ? (
          <Button intent="primary" size="lg" fullWidth onClick={onPrimary}>
            {primaryLabel}
          </Button>
        ) : null}
      </div>
    </Sheet>
  )
}

export type StatusSheetVariant = 'loading' | 'success' | 'warning' | 'error' | 'info'
export type StatusSheetAction = {
  label: string
  tone?: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
}

export type StatusSheetProps = {
  variant: StatusSheetVariant
  title: string
  paragraph?: string
  actions?: StatusSheetAction[]
  onDismiss?: () => void
  dismissLabel?: string
  className?: string
}

const STATUS_ICON = {
  warning: IconAlertTriangle,
  success: IconCheck,
  error: IconX,
  info: IconInfoCircle,
} as const

/** Result card: glyph, title, and up to a few stacked actions. No grabber. */
export function StatusSheet({
  variant,
  title,
  paragraph,
  actions,
  onDismiss,
  dismissLabel = 'Dismiss',
  className,
}: StatusSheetProps) {
  return (
    <div className={['ds-status-sheet', className].filter(Boolean).join(' ')} data-variant={variant} role="dialog" aria-label={title}>
      {onDismiss ? (
        <button type="button" className="ds-status-sheet__close" aria-label={dismissLabel} onClick={onDismiss}>
          <Icon icon={IconX} size="sm" />
        </button>
      ) : null}
      <div className="ds-status-sheet__glyph" aria-hidden={variant === 'loading' ? undefined : true}>
        {variant === 'loading' ? <Loader label={title} /> : <Icon icon={STATUS_ICON[variant]} size="lg" />}
      </div>
      <h2>{title}</h2>
      {paragraph ? <p>{paragraph}</p> : null}
      {actions && actions.length > 0 ? (
        <div className="ds-status-sheet__actions">
          {actions.map((action, index) => (
            <Button
              key={action.label}
              intent={action.tone ?? (index === 0 ? 'primary' : 'secondary')}
              size="lg"
              fullWidth
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
