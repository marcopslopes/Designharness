import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'
import { IconChevronRight } from '@tabler/icons-react'

export type AppSplitType = 'biz' | 'customer'

export type AppSplitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  appType?: AppSplitType
  title?: ReactNode
  subtitle?: ReactNode
}

const DEFAULTS: Record<AppSplitType, { title: string; subtitle: string }> = {
  biz: {
    title: 'I am a service provider',
    subtitle: 'Go to Northline Studio',
  },
  customer: {
    title: 'I am looking for services',
    subtitle: 'Go to Northline',
  },
}

export function AppSplitButton({
  appType = 'biz',
  title,
  subtitle,
  type = 'button',
  className,
  ...rest
}: AppSplitButtonProps) {
  const defaults = DEFAULTS[appType]

  return (
    <button
      type={type}
      className={['ds-app-split', className].filter(Boolean).join(' ')}
      data-type={appType}
      {...rest}
    >
      <span className="ds-app-split__body">
        <span className="ds-app-split__icon" aria-hidden>
          B
        </span>
        <span className="ds-app-split__copy">
          <span className="ds-app-split__title">{title ?? defaults.title}</span>
          <span className="ds-app-split__subtitle">{subtitle ?? defaults.subtitle}</span>
        </span>
      </span>
      <Icon icon={IconChevronRight} size="lg" />
    </button>
  )
}
