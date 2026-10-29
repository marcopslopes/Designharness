import type { HTMLAttributes, ReactNode } from 'react'
import { Badge, type BadgeIntent } from './Badge'

export type PromoTone = 'brand' | 'premium'

export type PromoCardProps = HTMLAttributes<HTMLDivElement> & {
  icon: ReactNode
  title: string
  body: string
  badge?: string
  tone?: PromoTone
}

const BADGE_INTENT: Record<PromoTone, BadgeIntent> = {
  brand: 'brand',
  premium: 'premium',
}

/** A soft card with an icon, a title, and an optional badge. Kit `PromoCard`. */
export function PromoCard({ icon, title, body, badge, tone = 'brand', className, ...rest }: PromoCardProps) {
  return (
    <div className={['ds-promo', className].filter(Boolean).join(' ')} data-tone={tone} {...rest}>
      <span className="ds-promo__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="ds-promo__copy">
        <span className="ds-promo__title-row">
          <span className="ds-promo__title">{title}</span>
          {badge ? <Badge intent={BADGE_INTENT[tone]}>{badge}</Badge> : null}
        </span>
        <span className="ds-promo__body">{body}</span>
      </span>
    </div>
  )
}
