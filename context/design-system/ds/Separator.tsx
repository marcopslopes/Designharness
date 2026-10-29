import type { HTMLAttributes, ReactNode } from 'react'

export type SeparatorType = 'basic' | 'or' | 'dark-text'

export type SeparatorProps = HTMLAttributes<HTMLDivElement> & {
  type?: SeparatorType
  /** Center label for Or / Dark text. Default "Text". */
  label?: ReactNode
  paddingTop?: boolean
  paddingBottom?: boolean
}

export function Separator({
  type = 'basic',
  label = 'Text',
  paddingTop = true,
  paddingBottom = true,
  className,
  ...rest
}: SeparatorProps) {
  const withLabel = type === 'or' || type === 'dark-text'

  return (
    <div
      className={['ds-separator', className].filter(Boolean).join(' ')}
      data-type={type}
      data-pad-top={paddingTop ? 'true' : 'false'}
      data-pad-bottom={paddingBottom ? 'true' : 'false'}
      role="separator"
      {...rest}
    >
      {paddingTop ? <div className="ds-separator__pad" aria-hidden /> : null}
      {withLabel ? (
        <div className="ds-separator__row">
          <span className="ds-separator__line" aria-hidden />
          <span className="ds-separator__label">{label}</span>
          <span className="ds-separator__line" aria-hidden />
        </div>
      ) : (
        <span className="ds-separator__line ds-separator__line--full" aria-hidden />
      )}
      {paddingBottom ? <div className="ds-separator__pad" aria-hidden /> : null}
    </div>
  )
}
