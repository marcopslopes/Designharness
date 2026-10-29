import { IconAlertTriangle, IconBulb, IconHelpCircle, IconInfoCircle, IconX } from '@tabler/icons-react'
import { useId, useState, type HTMLAttributes, type ReactNode } from 'react'
import { Icon } from './Icon'

export type HintTone = 'info' | 'tip' | 'warn'

const HINT_ICON = {
  info: IconInfoCircle,
  tip: IconBulb,
  warn: IconAlertTriangle,
} as const

export type HintBannerProps = HTMLAttributes<HTMLDivElement> & {
  tone?: HintTone
  title: string
  body: string
  dismissible?: boolean
  onDismiss?: () => void
}

/** A short note that can be dismissed. Kit `InlineHint` banners. */
export function HintBanner({
  tone = 'info',
  title,
  body,
  dismissible = true,
  onDismiss,
  className,
  ...rest
}: HintBannerProps) {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className={['ds-hint', className].filter(Boolean).join(' ')} data-tone={tone} {...rest}>
      <span className="ds-hint__icon" aria-hidden="true">
        <Icon icon={HINT_ICON[tone]} size="xs" />
      </span>
      <span className="ds-hint__copy">
        <span className="ds-hint__title">{title}</span>
        <span className="ds-hint__body">{body}</span>
      </span>
      {dismissible ? (
        <button
          type="button"
          className="ds-hint__dismiss"
          aria-label="Dismiss"
          onClick={() => {
            setOpen(false)
            onDismiss?.()
          }}
        >
          <Icon icon={IconX} size="xs" />
        </button>
      ) : null}
    </div>
  )
}

export type HintIconProps = {
  label: string
  content: string
}

/** A help mark that shows a short explanation. */
export function HintIcon({ label, content }: HintIconProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <span
      className="ds-hint-icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="ds-hint-icon__btn"
        aria-label={`Help: ${label}`}
        aria-describedby={open ? id : undefined}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon icon={IconHelpCircle} size="xs" />
      </button>
      {open ? (
        <span className="ds-hint-icon__pop" id={id} role="tooltip">
          {content}
        </span>
      ) : null}
    </span>
  )
}

export function HintCaption({ children, className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={['ds-hint-caption', className].filter(Boolean).join(' ')} {...rest}>
      <Icon icon={IconInfoCircle} size="xs" />
      <span>{children}</span>
    </p>
  )
}

export function HintField({
  label,
  hint,
  value,
  trailing,
}: {
  label: string
  hint?: string
  value: ReactNode
  trailing?: ReactNode
}) {
  return (
    <div className="ds-hint-field">
      <span className="ds-hint-field__label">
        {label}
        {hint ? <HintIcon label={label} content={hint} /> : null}
      </span>
      <span className="ds-hint-field__value">
        <span>{value}</span>
        {trailing ? <span className="ds-hint-field__trailing">{trailing}</span> : null}
      </span>
    </div>
  )
}
