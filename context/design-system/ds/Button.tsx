import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { RippleLayer } from './RippleLayer'
import { useRipple } from './useRipple'

/**
 * Design Harness kit buttons
 * (`context/design-system/source/design-harness-kit` → ButtonShowcase).
 * Ink primary, lifted floating CTAs, 16px radius family, tinted intents.
 * See context/design-system/STUDIO-OS-KIT-NOTES.md.
 */
export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm'
export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'tinted'
  | 'premium'
  | 'danger'
  | 'outline'
  | 'ghost'

/**
 * @deprecated Pre-UI-Kit-v2 API (Figma Primary/Secondary/Tertiary "Type"
 * columns). Still accepted — mapped onto `intent` below — so the ~130
 * existing `<Button variant tone>` call sites across `src/design-harness` and
 * `projects/**` keep compiling and rendering (not byte-identical colours;
 * see `KNOWN-ISSUES.md` → "DS replacement (UI Kit v2)"). New/edited call
 * sites should use `intent` + `size` directly instead.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type PrimaryTone = 'sea' | 'black' | 'white' | 'gray' | 'legacy_brand'
export type SecondaryTone = 'white' | 'destructive' | 'outlined'
export type GhostTone = 'black' | 'gray' | 'sea' | 'white'
export type ButtonTone = PrimaryTone | SecondaryTone | GhostTone

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: ButtonIntent
  size?: ButtonSize
  /** Floating-CTA press shadow — `intent="primary"` only. */
  lifted?: boolean
  fullWidth?: boolean
  /** Square, no label — pairs with `aria-label`. */
  iconOnly?: boolean
  /** Sustained selected / on state (`data-active`). Hover and `:active` (press) still apply on top via CSS. */
  active?: boolean
  /** Pointer-origin ripple. Default true. */
  ripple?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  children?: ReactNode
  /** @deprecated use `intent` — see `ButtonVariant` note above. */
  variant?: ButtonVariant
  /** @deprecated use `intent` — see `ButtonVariant` note above. */
  tone?: ButtonTone
}

function resolveIntent(
  intent: ButtonIntent | undefined,
  variant: ButtonVariant | undefined,
  tone: ButtonTone | undefined,
): ButtonIntent {
  if (intent) return intent
  if (!variant) return 'primary'
  if (variant === 'secondary') {
    if (tone === 'destructive') return 'danger'
    if (tone === 'outlined') return 'outline'
    return 'secondary'
  }
  if (variant === 'ghost') return 'ghost'
  // legacy primary — sea / legacy_brand → brand-tinted; black → ink primary
  if (tone === 'white' || tone === 'gray') return 'secondary'
  if (tone === 'sea' || tone === 'legacy_brand') return 'tinted'
  return 'primary'
}

function resolveRippleInk(intent: ButtonIntent): 'light' | 'dark' {
  return intent === 'primary' ? 'light' : 'dark'
}

export function Button({
  intent,
  variant,
  tone,
  size,
  lifted = false,
  fullWidth = false,
  iconOnly = false,
  active = false,
  ripple = true,
  type = 'button',
  startIcon,
  endIcon,
  children,
  className,
  disabled,
  onPointerDown,
  ...rest
}: ButtonProps) {
  const resolvedIntent = resolveIntent(intent, variant, tone)
  const resolvedSize = size ?? 'md'
  const ink = resolveRippleInk(resolvedIntent)
  const { ripples, onPointerDown: addRipple, onRippleEnd } = useRipple(ripple && !disabled)

  return (
    <button
      type={type}
      className={['ds-button', 'ds-interactive', className].filter(Boolean).join(' ')}
      data-intent={resolvedIntent}
      data-size={resolvedSize}
      data-lifted={lifted ? 'true' : undefined}
      data-full-width={fullWidth ? 'true' : undefined}
      data-icon-only={iconOnly ? 'true' : undefined}
      data-active={active ? 'true' : undefined}
      data-ripple-ink={ink}
      aria-pressed={active || undefined}
      disabled={disabled}
      onPointerDown={(event) => {
        addRipple(event)
        onPointerDown?.(event)
      }}
      {...rest}
    >
      <RippleLayer ripples={ripples} onRippleEnd={onRippleEnd} />
      {iconOnly ? (
        <span className="ds-button__icon">{startIcon ?? children ?? endIcon}</span>
      ) : (
        <>
          {startIcon ? <span className="ds-button__icon">{startIcon}</span> : null}
          {children != null && children !== false ? (
            <span className="ds-button__label">{children}</span>
          ) : null}
          {endIcon ? <span className="ds-button__icon">{endIcon}</span> : null}
        </>
      )}
    </button>
  )
}
