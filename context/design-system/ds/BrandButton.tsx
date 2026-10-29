import type { ButtonHTMLAttributes, ReactNode } from 'react'
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconGift,
  IconCreditCard,
} from '@tabler/icons-react'
import { Icon } from './Icon'
import { RippleLayer } from './RippleLayer'
import { useRipple } from './useRipple'

export type BrandButtonVariant =
  | 'apple-color'
  | 'apple-white'
  | 'facebook-color'
  | 'facebook-white'
  | 'google-color'
  | 'google-white'
  | 'blik'
  | 'klarna'

export type BrandButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: BrandButtonVariant
  ripple?: boolean
  children?: ReactNode
}

const DEFAULT_LABEL: Record<BrandButtonVariant, string> = {
  'apple-color': 'Sign up with Apple',
  'apple-white': 'Sign up with Apple',
  'facebook-color': 'Sign up with Facebook',
  'facebook-white': 'Sign up with Facebook',
  'google-color': 'Sign up with Google',
  'google-white': 'Sign up with Google',
  blik: 'Pay with BLIK',
  klarna: 'Pay with Klarna',
}

const LIGHT_INK: BrandButtonVariant[] = [
  'apple-color',
  'facebook-color',
  'blik',
  'klarna',
]

function BrandGlyph({ variant }: { variant: BrandButtonVariant }) {
  if (variant === 'klarna') {
    return (
      <span className="ds-brand-button__badge" aria-hidden>
        <Icon icon={IconGift} size="sm" />
      </span>
    )
  }
  if (variant.startsWith('apple')) {
    return <Icon icon={IconBrandApple} size="md" />
  }
  if (variant.startsWith('facebook')) {
    return <Icon icon={IconBrandFacebook} size="md" />
  }
  if (variant.startsWith('google')) {
    return <Icon icon={IconBrandGoogle} size="md" />
  }
  return <Icon icon={IconCreditCard} size="md" />
}

export function BrandButton({
  variant = 'apple-color',
  ripple = true,
  type = 'button',
  children,
  className,
  disabled,
  onPointerDown,
  ...rest
}: BrandButtonProps) {
  const { ripples, onPointerDown: addRipple, onRippleEnd } = useRipple(ripple && !disabled)

  return (
    <button
      type={type}
      className={['ds-brand-button', 'ds-interactive', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-ripple-ink={LIGHT_INK.includes(variant) ? 'light' : 'dark'}
      disabled={disabled}
      onPointerDown={(event) => {
        addRipple(event)
        onPointerDown?.(event)
      }}
      {...rest}
    >
      <RippleLayer ripples={ripples} onRippleEnd={onRippleEnd} />
      <BrandGlyph variant={variant} />
      <span>{children ?? DEFAULT_LABEL[variant]}</span>
    </button>
  )
}
