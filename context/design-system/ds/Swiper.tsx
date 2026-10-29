import type { HTMLAttributes } from 'react'

export type SwiperColor = 'white' | 'black' | 'black-bg'

export type SwiperProps = HTMLAttributes<HTMLDivElement> & {
  count?: number
  activeIndex?: number
  color?: SwiperColor
}

export function Swiper({
  count = 6,
  activeIndex = 0,
  color = 'black',
  className,
  ...rest
}: SwiperProps) {
  const dots = Array.from({ length: count }, (_, i) => i)

  return (
    <div
      className={['ds-swiper', className].filter(Boolean).join(' ')}
      data-color={color}
      role="tablist"
      aria-label="Carousel pages"
      {...rest}
    >
      {dots.map((i) => (
        <span
          key={i}
          className="ds-swiper__dot"
          data-active={i === activeIndex ? 'true' : 'false'}
          role="presentation"
        />
      ))}
    </div>
  )
}
