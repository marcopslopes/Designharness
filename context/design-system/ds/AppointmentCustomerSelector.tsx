import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import { IconUser, IconX, IconAlertTriangle, IconStar, IconUserPlus, IconBan } from '@tabler/icons-react'

export type AppointmentCustomerSelectorProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  name?: ReactNode
  phone?: ReactNode
  selected?: boolean
  removable?: boolean
  allergies?: ReactNode
  showBadges?: boolean
  onRemove?: () => void
}

export function AppointmentCustomerSelector({
  name = 'Jane Doe',
  phone = '+1 (123) 456-789',
  selected = true,
  removable = true,
  allergies,
  showBadges = true,
  onRemove,
  type = 'button',
  className,
  ...rest
}: AppointmentCustomerSelectorProps) {
  return (
    <button
      type={type}
      className={['ds-customer-selector', className].filter(Boolean).join(' ')}
      data-selected={selected ? 'true' : 'false'}
      {...rest}
    >
      <span className="ds-customer-selector__row">
        <span className="ds-customer-selector__main">
          <span className="ds-customer-selector__avatar" aria-hidden>
            <Icon icon={IconUser} size="lg" />
          </span>
          <span className="ds-customer-selector__copy">
            <span className="ds-customer-selector__name">{name}</span>
            {phone != null ? <span className="ds-customer-selector__meta">{phone}</span> : null}
          </span>
        </span>
        <span className="ds-customer-selector__end">
          {showBadges ? (
            <>
              <Icon icon={IconBan} size="lg" />
              <Icon icon={IconStar} size="lg" />
              <Icon icon={IconUserPlus} size="lg" />
              <Icon icon={IconAlertTriangle} size="lg" />
            </>
          ) : null}
          {removable ? (
            <span
              role="presentation"
              onClick={(e) => {
                e.stopPropagation()
                onRemove?.()
              }}
            >
              <Icon icon={IconX} size="lg" />
            </span>
          ) : null}
        </span>
      </span>
      {allergies != null ? (
        <span className="ds-customer-selector__allergies">
          <span className="ds-customer-selector__allergies-label">Allergies</span>
          <span className="ds-customer-selector__allergies-value">{allergies}</span>
        </span>
      ) : null}
    </button>
  )
}
