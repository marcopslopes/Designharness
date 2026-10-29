import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import {
  FrameArrowLeft,
  FrameArrowRight,
  FrameArrowUpRight,
  FrameCheck,
  FrameChevronDown,
  FrameDislike,
  FrameLike,
} from '../harnessIcons'
import { setDesignHarnessHash, type DesignHarnessRoute } from '../routes'
import { Card, Icon, Text, type TablerIconComponent } from '../ui'

/** Doc and page building blocks for the frame — shown live on the Harness system's pages. */

const go = (route: DesignHarnessRoute) => (event: MouseEvent) => {
  event.preventDefault()
  setDesignHarnessHash(route)
}

export type Crumb = { label: string; route?: DesignHarnessRoute; current?: boolean }

/** The trail to the page's parent — the page itself is the title below it. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="design-harness-crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.route && !item.current ? (
              <a href={`#/${item.route}`} onClick={go(item.route)}>
                {item.label}
              </a>
            ) : (
              <span aria-current={item.current ? 'page' : undefined}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return <p className="design-harness-ds-doc-kicker">{children}</p>
}

export function PageFeedback({
  question = 'Was this page helpful?',
  onAnswer,
}: {
  question?: string
  onAnswer?: (helpful: boolean) => void
}) {
  const [answer, setAnswer] = useState<boolean | null>(null)
  const pick = (helpful: boolean) => {
    setAnswer(helpful)
    onAnswer?.(helpful)
  }
  return (
    <div className="design-harness-feedback" role="group" aria-label={question}>
      <p className="design-harness-feedback__question">{question}</p>
      {answer === null ? (
        <div className="design-harness-feedback__answers">
          <button type="button" className="design-harness-feedback__pill" onClick={() => pick(true)}>
            <Icon icon={FrameLike} size="sm" />
            Yes
          </button>
          <button type="button" className="design-harness-feedback__pill" onClick={() => pick(false)}>
            <Icon icon={FrameDislike} size="sm" />
            No
          </button>
        </div>
      ) : (
        <p className="design-harness-feedback__thanks" role="status">
          {answer ? 'Thanks — glad it helped.' : 'Thanks — noted.'}
        </p>
      )}
    </div>
  )
}

export type MenuOption<T extends string> = { value: T; label: string; icon?: TablerIconComponent }

/** A button that opens a native `popover` menu of choices; the current one is ticked. */
export function MenuButton<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: MenuOption<T>[]
  onChange: (value: T) => void
}) {
  const id = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const current = options.find((option) => option.value === value)

  useEffect(() => {
    const menu = menuRef.current
    const trigger = triggerRef.current
    if (!menu || !trigger) return
    const onToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === 'open'
      trigger.setAttribute('aria-expanded', String(open))
      if (!open) return
      const box = trigger.getBoundingClientRect()
      menu.style.top = `${box.bottom + 6}px`
      menu.style.left = `${box.left}px`
      menu.querySelector<HTMLElement>('[aria-checked="true"]')?.focus()
    }
    menu.addEventListener('toggle', onToggle)
    return () => menu.removeEventListener('toggle', onToggle)
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitemradio"]')]
    const at = items.indexOf(document.activeElement as HTMLElement)
    const step = event.key === 'ArrowDown' ? 1 : -1
    items[(at + step + items.length) % items.length]?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="design-harness-menu__trigger"
        popoverTarget={`${id}-menu`}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        {current?.icon ? <Icon icon={current.icon} size="sm" /> : null}
        <span>
          {label}: {current?.label}
        </span>
        <Icon icon={FrameChevronDown} size="sm" />
      </button>
      <div
        ref={menuRef}
        id={`${id}-menu`}
        className="design-harness-menu"
        popover="auto"
        role="menu"
        aria-label={label}
        onKeyDown={onKeyDown}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="menuitemradio"
            aria-checked={option.value === value}
            className="design-harness-menu__item"
            onClick={() => {
              onChange(option.value)
              menuRef.current?.hidePopover()
            }}
          >
            {option.icon ? <Icon icon={option.icon} size="sm" /> : null}
            <span>{option.label}</span>
            {option.value === value ? <Icon icon={FrameCheck} size="sm" /> : null}
          </button>
        ))}
      </div>
    </>
  )
}

export type ArrowTone = 'ink' | 'forest' | 'light'

/** A pill with a round arrow at the end — for the one action that moves you forward. */
export function ArrowButton({
  children,
  route,
  onClick,
  tone = 'ink',
}: {
  children: ReactNode
  route?: DesignHarnessRoute
  onClick?: () => void
  tone?: ArrowTone
}) {
  const content = (
    <>
      <span>{children}</span>
      <span className="design-harness-arrow-button__circle" aria-hidden="true">
        <Icon icon={FrameArrowRight} size="sm" />
      </span>
    </>
  )
  return route ? (
    <a className="design-harness-arrow-button" data-tone={tone} href={`#/${route}`} onClick={go(route)}>
      {content}
    </a>
  ) : (
    <button type="button" className="design-harness-arrow-button" data-tone={tone} onClick={onClick}>
      {content}
    </button>
  )
}

/** A full-width section on sand or the near-black band. */
export function Band({
  tone = 'sand',
  kicker,
  title,
  children,
}: {
  tone?: 'sand' | 'dark'
  kicker?: string
  title: string
  children?: ReactNode
}) {
  return (
    <section className="design-harness-band" data-tone={tone}>
      {kicker ? <p className="design-harness-band__kicker">{kicker}</p> : null}
      <h2 className="design-harness-band__title">{title}</h2>
      {children}
    </section>
  )
}

/** The deep forest card that closes a page with one action. */
export function CtaCard({
  title,
  description,
  action,
  media,
}: {
  title: string
  description?: string
  action: ReactNode
  /** Shown in a white panel on the right. */
  media?: ReactNode
}) {
  return (
    <section className="design-harness-cta" data-media={media ? 'true' : undefined}>
      <div className="design-harness-cta__copy">
        <h2 className="design-harness-cta__title">{title}</h2>
        {description ? <p className="design-harness-cta__text">{description}</p> : null}
        <div className="design-harness-cta__action">{action}</div>
      </div>
      {media ? <div className="design-harness-cta__media">{media}</div> : null}
    </section>
  )
}

/** An inline link, underlined in the accent. `route` stays in the harness; `href` opens a new tab. */
export function TextLink({
  className,
  children,
  ...to
}: ({ route: DesignHarnessRoute } | { href: string }) & { className?: string; children: ReactNode }) {
  const linkClass = ['design-harness-ds-link', className].filter(Boolean).join(' ')
  return 'route' in to ? (
    <a className={linkClass} href={`#/${to.route}`} onClick={go(to.route)}>
      {children}
    </a>
  ) : (
    <a className={linkClass} href={to.href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

/** One muted line under an action that writes to disk, naming the file. */
export function FinePrint({ children }: { children: ReactNode }) {
  return <p className="design-harness-fine-print">{children}</p>
}

export type PageLink = { label: string; route: DesignHarnessRoute }

/** The pages before and after this one, in sidebar order. */
export function PrevNext({ prev, next }: { prev?: PageLink; next?: PageLink }) {
  if (!prev && !next) return null
  return (
    <nav className="design-harness-prev-next" aria-label="Previous and next">
      {prev ? (
        <a
          className="design-harness-prev-next__link"
          data-side="prev"
          href={`#/${prev.route}`}
          onClick={go(prev.route)}
        >
          <span className="design-harness-prev-next__hint">
            <Icon icon={FrameArrowLeft} size="sm" />
            Previous
          </span>
          <span className="design-harness-prev-next__label">{prev.label}</span>
        </a>
      ) : (
        <span />
      )}
      {next ? (
        <a
          className="design-harness-prev-next__link"
          data-side="next"
          href={`#/${next.route}`}
          onClick={go(next.route)}
        >
          <span className="design-harness-prev-next__hint">
            Next
            <Icon icon={FrameArrowRight} size="sm" />
          </span>
          <span className="design-harness-prev-next__label">{next.label}</span>
        </a>
      ) : null}
    </nav>
  )
}

/** One skill in a list: icon, tags, name, and the group it belongs to. */
export function SkillCard({
  name,
  owner,
  tags,
  icon,
  route,
}: {
  name: string
  owner: string
  tags: string[]
  icon: TablerIconComponent
  route: DesignHarnessRoute
}) {
  return (
    <a className="design-harness-skill-card" href={`#/${route}`} onClick={go(route)}>
      <span className="design-harness-skill-card__top">
        <span className="design-harness-skill-card__icon" aria-hidden>
          <Icon icon={icon} size="sm" />
        </span>
        <span className="design-harness-skill-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="design-harness-skill-card__tag">
              {tag}
            </span>
          ))}
        </span>
      </span>
      <span className="design-harness-skill-card__name">{name}</span>
      <span className="design-harness-skill-card__owner">{owner}</span>
    </a>
  )
}

/** A titled card of counts with an optional note and a link onward. */
export function SummaryPanel({
  title,
  stats,
  note,
  link,
  children,
}: {
  title: string
  stats: [number | string, string][]
  note?: string
  link?: PageLink
  children?: ReactNode
}) {
  return (
    <Card className="design-harness-ds-summary">
      <Text variant="label" as="h2">
        {title}
      </Text>
      <dl className="design-harness-ds-summary__stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {note ? (
        <Text variant="body" as="p">
          {note}
        </Text>
      ) : null}
      {children}
      {link ? (
        <a className="design-harness-ds-summary__link" href={`#/${link.route}`} onClick={go(link.route)}>
          {link.label}
          <Icon icon={FrameArrowUpRight} size="sm" />
        </a>
      ) : null}
    </Card>
  )
}
