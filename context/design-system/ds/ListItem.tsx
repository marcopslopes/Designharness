import { IconCheck, IconChevronRight, IconClock, IconGripVertical, IconMessage, IconStarFilled } from '@tabler/icons-react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { Avatar, type AvatarTint } from './Avatar'
import { Badge, type BadgeIntent } from './Badge'
import { Icon } from './Icon'
import { Toggle } from './Toggle'

export type ListTint = 'brand' | 'premium' | 'rose' | 'amber'

export function List({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['ds-list', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}

export type ServiceListItemProps = HTMLAttributes<HTMLDivElement> & {
  name: string
  duration: string
  price: string
  category: string
  tint?: ListTint
  on: boolean
  onToggle: () => void
}

export function ServiceListItem({
  name,
  duration,
  price,
  category,
  tint = 'brand',
  on,
  onToggle,
  className,
  ...rest
}: ServiceListItemProps) {
  return (
    <div className={['ds-list-item', className].filter(Boolean).join(' ')} data-off={on ? undefined : 'true'} {...rest}>
      <Icon icon={IconGripVertical} size="sm" />
      <span className="ds-list-item__chip" data-tint={tint}>
        {category}
      </span>
      <span className="ds-list-item__body">
        <span className="ds-list-item__title">{name}</span>
        <span className="ds-list-item__meta">
          <Icon icon={IconClock} size="xs" />
          {duration}
          <span aria-hidden="true"> · </span>
          <span className="ds-list-item__price">{price}</span>
        </span>
      </span>
      <Toggle size="sm" checked={on} onClick={onToggle} aria-label={name} />
    </div>
  )
}

export type ClientListItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  initials: string
  name: string
  phone: string
  lastVisit: string
  spend: string
  tint?: AvatarTint
  vip?: boolean
  badge?: string
}

export function ClientListItem({
  initials,
  name,
  phone,
  lastVisit,
  spend,
  tint = 'brand',
  vip,
  badge,
  className,
  type = 'button',
  ...rest
}: ClientListItemProps) {
  return (
    <button type={type} className={['ds-list-item', 'ds-list-item--button', className].filter(Boolean).join(' ')} {...rest}>
      <span className="ds-list-item__avatar">
        <Avatar size="md" tint={tint} initials={initials} />
        {vip ? (
          <span className="ds-list-item__vip" aria-label="VIP">
            <Icon icon={IconStarFilled} size="xs" />
          </span>
        ) : null}
      </span>
      <span className="ds-list-item__body">
        <span className="ds-list-item__title-row">
          <span className="ds-list-item__title">{name}</span>
          {badge ? <Badge intent="leaf">{badge}</Badge> : null}
        </span>
        <span className="ds-list-item__meta">
          {phone} · {lastVisit}
        </span>
      </span>
      <span className="ds-list-item__end">
        <span className="ds-list-item__spend">{spend}</span>
        <Icon icon={IconChevronRight} size="sm" />
      </span>
    </button>
  )
}

export type BookingStatus = 'confirmed' | 'pending' | 'arrived'

const STATUS_INTENT: Record<BookingStatus, BadgeIntent> = {
  confirmed: 'leaf',
  pending: 'amber',
  arrived: 'ink',
}

const STATUS_LABEL: Record<BookingStatus, string> = {
  confirmed: 'Confirmed',
  pending: 'Pending',
  arrived: 'Arrived',
}

export type BookingListItemProps = HTMLAttributes<HTMLElement> & {
  start: string
  end: string
  initials: string
  name: string
  service: string
  status: BookingStatus
  tint?: AvatarTint
  onMessage?: () => void
  onCheckIn?: () => void
}

export function BookingListItem({
  start,
  end,
  initials,
  name,
  service,
  status,
  tint = 'brand',
  onMessage,
  onCheckIn,
  className,
  ...rest
}: BookingListItemProps) {
  return (
    <article className={['ds-booking', className].filter(Boolean).join(' ')} data-tint={tint} {...rest}>
      <span className="ds-booking__time">
        <span className="ds-booking__start">{start}</span>
        <span className="ds-booking__end">{end}</span>
      </span>
      <Avatar size="sm" tint={tint} initials={initials} />
      <span className="ds-booking__body">
        <span className="ds-list-item__title-row">
          <span className="ds-list-item__title">{name}</span>
          <Badge intent={STATUS_INTENT[status]}>{STATUS_LABEL[status]}</Badge>
        </span>
        <span className="ds-list-item__meta">{service}</span>
      </span>
      <span className="ds-booking__actions">
        <button type="button" className="ds-booking__icon" aria-label={`Message ${name}`} onClick={onMessage}>
          <Icon icon={IconMessage} size="sm" />
        </button>
        <button type="button" className="ds-booking__icon ds-booking__icon--ink" aria-label={`Check in ${name}`} onClick={onCheckIn}>
          <Icon icon={IconCheck} size="sm" />
        </button>
      </span>
    </article>
  )
}

export function BookingList({ children, className, ...rest }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={['ds-booking-list', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </div>
  )
}
