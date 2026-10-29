import { useState, type MouseEvent, type ReactNode } from 'react'
import { FrameClose } from '../harnessIcons'
import { Chip, Icon } from '../../../context/design-system/ds'
import type { TablerIconComponent } from '../../../context/design-system/ds'
import { setDesignHarnessHash, type DesignHarnessRoute } from '../routes'

/** Harness brand — marketing blocks for Design Harness's own pages. Shown live on the Harness brand system. */

const go = (route: DesignHarnessRoute) => (event: MouseEvent) => {
  event.preventDefault()
  setDesignHarnessHash(route)
}

export function Wordmark({
  size = 'md',
  name = 'Design Harness',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  name?: string
}) {
  return (
    <span className="design-harness-wordmark" data-size={size}>
      {name}
    </span>
  )
}

/** A headline where `*words*` are highlighted, e.g. "Prototypes, *systems* and docs". */
export function Headline({ text, as: Tag = 'h2' }: { text: string; as?: 'h1' | 'h2' }) {
  return (
    <Tag className="design-harness-mkt-headline">
      {text
        .split(/(\*[^*]+\*)/)
        .map((part, index) => (part.startsWith('*') ? <mark key={index}>{part.slice(1, -1)}</mark> : part))}
    </Tag>
  )
}

export function ReadMore({ route, children = 'Read more' }: { route: DesignHarnessRoute; children?: ReactNode }) {
  return (
    <a className="design-harness-read-more" href={`#/${route}`} onClick={go(route)}>
      <span aria-hidden="true">↳</span> {children}
    </a>
  )
}

export type FrameShape = 'square' | 'tall' | 'wide' | 'banner'

/** An image slot: a tinted frame with the photo brief as its caption, and an optional real UI card on top. */
export function MediaFrame({
  brief,
  shape = 'wide',
  tone = 'light',
  children,
  className,
}: {
  brief: string
  shape?: FrameShape
  tone?: 'light' | 'dark'
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={['design-harness-mkt-frame', className].filter(Boolean).join(' ')}
      data-shape={shape}
      data-tone={tone}
      role="img"
      aria-label={`Photo slot: ${brief}`}
    >
      {children ? <div className="design-harness-mkt-frame__overlay">{children}</div> : null}
      <span className="design-harness-mkt-frame__brief" aria-hidden="true">
        {brief}
      </span>
    </div>
  )
}

export type ProductCard = { title: string; text: string; route?: DesignHarnessRoute; ui?: ReactNode }

/** A row of product cards — the real component, then its name and one line. */
export function ProductCards({ cards }: { cards: ProductCard[] }) {
  return (
    <ul className="design-harness-mkt-cards">
      {cards.map((card) => (
        <li key={card.title}>
          {card.ui ? <div className="design-harness-mkt-cards__ui">{card.ui}</div> : null}
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          {card.route ? <ReadMore route={card.route} /> : null}
        </li>
      ))}
    </ul>
  )
}

/** Short title-and-text columns, no borders. */
export function BenefitColumns({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="design-harness-mkt-benefits">
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

/** Icon, title, text — three across on paper. */
export function IconFeatures({ items }: { items: { icon: TablerIconComponent; title: string; text: string }[] }) {
  return (
    <ul className="design-harness-mkt-icon-features">
      {items.map((item) => (
        <li key={item.title}>
          <Icon icon={item.icon} size="lg" />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  )
}

/** A centred quote over a full-width photo slot. Without a real quote, it says so. */
export function QuoteBand({
  quote,
  name,
  role,
  brief,
}: {
  quote?: string
  name?: string
  role?: string
  brief: string
}) {
  return (
    <figure className="design-harness-mkt-quote-band">
      <MediaFrame brief={brief} shape="banner" tone="dark" className="design-harness-mkt-quote-band__frame" />
      <div className="design-harness-mkt-quote-band__copy">
        <blockquote data-placeholder={quote ? undefined : 'true'}>
          {quote ? `“${quote}”` : 'A real quote from a real customer goes here.'}
        </blockquote>
        <figcaption>
          <span>{name ?? 'Name'}</span>
          {role ?? 'Role, company'}
        </figcaption>
      </div>
    </figure>
  )
}

export type BigStat = { value: string; label: string }

function StatStack({ stats }: { stats: BigStat[] }) {
  return (
    <dl className="design-harness-mkt-stat-stack">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dd>{stat.value}</dd>
          <dt>{stat.label}</dt>
        </div>
      ))}
    </dl>
  )
}

/** Intro text on the left, big numbers stacked on the right. */
export function BigStats({ intro, stats }: { intro: ReactNode; stats: BigStat[] }) {
  return (
    <section className="design-harness-mkt-big-stats">
      <div className="design-harness-mkt-big-stats__intro">{intro}</div>
      <StatStack stats={stats} />
    </section>
  )
}

/** Logo slots. Customer logos are never drawn — each slot holds a name or says it needs one. */
export function LogoStrip({ names, count = 6 }: { names?: string[]; count?: number }) {
  const slots = names ?? Array.from({ length: count }, () => '')
  return (
    <ul className="design-harness-mkt-logo-strip" aria-label="Customers">
      {slots.map((name, index) => (
        <li key={index} data-placeholder={name ? undefined : 'true'}>
          {name || 'Logo'}
        </li>
      ))}
    </ul>
  )
}

export function LogoGrid({ names, count = 10 }: { names?: string[]; count?: number }) {
  const slots = names ?? Array.from({ length: count }, () => '')
  return (
    <ul className="design-harness-mkt-logo-grid" aria-label="Customers">
      {slots.map((name, index) => (
        <li key={index} data-placeholder={name ? undefined : 'true'}>
          {name || 'Customer logo'}
        </li>
      ))}
    </ul>
  )
}

/** Headline and action on the left, a stat stack on the right, logos underneath. */
export function HeroStats({
  title,
  lead,
  action,
  stats,
  logos,
}: {
  title: string
  lead: string
  action?: ReactNode
  stats: BigStat[]
  logos?: ReactNode
}) {
  return (
    <section className="design-harness-mkt-hero-stats">
      <div className="design-harness-mkt-hero-stats__copy">
        <Headline as="h1" text={title} />
        <p className="design-harness-mkt-lead">{lead}</p>
        {action}
      </div>
      <StatStack stats={stats} />
      {logos ? <div className="design-harness-mkt-hero-stats__logos">{logos}</div> : null}
    </section>
  )
}

export type NewsItem = { date: string; title: string; brief: string; route?: DesignHarnessRoute }

/** One lead story and four smaller ones, headline over the image. */
export function NewsMosaic({ items }: { items: NewsItem[] }) {
  return (
    <ul className="design-harness-mkt-news">
      {items.slice(0, 5).map((item, index) => {
        const body = (
          <>
            <MediaFrame brief={item.brief} shape={index === 0 ? 'tall' : 'wide'} tone="dark" />
            <span className="design-harness-mkt-news__text">
              <time>{item.date}</time>
              <strong>{item.title}</strong>
            </span>
          </>
        )
        return (
          <li key={item.title} data-lead={index === 0 ? 'true' : undefined}>
            {item.route ? (
              <a href={`#/${item.route}`} onClick={go(item.route)}>
                {body}
              </a>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}

export type Story = { tag: string; quote?: string; name?: string; role?: string; brief: string }

/** Filter chips over portrait story cards. Stories without a real quote say so. */
export function StoryCards({ stories }: { stories: Story[] }) {
  const [active, setActive] = useState('All')
  const tags = ['All', ...new Set(stories.map((story) => story.tag))]
  const shown = active === 'All' ? stories : stories.filter((story) => story.tag === active)
  return (
    <section className="design-harness-mkt-stories">
      <div className="design-harness-mkt-stories__filters" role="group" aria-label="Filter stories">
        {tags.map((tag) => (
          <Chip
            key={tag}
            size="sm"
            selected={tag === active ? 'black' : false}
            aria-pressed={tag === active}
            onClick={() => setActive(tag)}
          >
            {tag}
          </Chip>
        ))}
      </div>
      <ul>
        {shown.map((story, index) => (
          <li key={`${story.tag}-${index}`}>
            <MediaFrame brief={story.brief} shape="tall">
              <span className="design-harness-mkt-stories__tag">{story.tag}</span>
            </MediaFrame>
            <blockquote data-placeholder={story.quote ? undefined : 'true'}>
              {story.quote ?? 'A real quote goes here — never a made-up one.'}
            </blockquote>
            <p>
              <span>{story.name ?? 'Name'}</span>
              {story.role ?? 'Role, company'}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function AnnouncementBar({
  children,
  link,
  route,
}: {
  children: ReactNode
  link: string
  route: DesignHarnessRoute
}) {
  const [open, setOpen] = useState(true)
  if (!open) return null
  return (
    <div className="design-harness-announce" role="region" aria-label="Announcement">
      <span>{children}</span>
      <a href={`#/${route}`} onClick={go(route)}>
        {link} →
      </a>
      <button
        type="button"
        className="design-harness-announce__close"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
      >
        <Icon icon={FrameClose} size="sm" />
      </button>
    </div>
  )
}

export function Hero({
  kicker,
  title,
  lead,
  actions,
  media,
}: {
  kicker?: ReactNode
  title: string
  lead: string
  actions?: ReactNode
  media?: ReactNode
}) {
  return (
    <section className="design-harness-hero">
      <div className="design-harness-hero__top">
        <div>
          {kicker ? <p className="design-harness-hero__kicker">{kicker}</p> : null}
          <Headline as="h1" text={title} />
        </div>
        <div className="design-harness-hero__side">
          <p className="design-harness-mkt-lead">{lead}</p>
          {actions}
        </div>
      </div>
      {media ? <div className="design-harness-hero__media">{media}</div> : null}
    </section>
  )
}

/** Title on the left, one or two columns of text on the right, optional media below the text. */
export function SplitSection({
  title,
  columns,
  aside,
  media,
}: {
  title: string
  columns: string[]
  aside?: ReactNode
  media?: ReactNode
}) {
  return (
    <section className="design-harness-split">
      <div className="design-harness-split__left">
        <Headline text={title} />
        {aside}
      </div>
      <div className="design-harness-split__right">
        <div className="design-harness-split__columns" data-count={columns.length}>
          {columns.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        {media}
      </div>
    </section>
  )
}

export type FeatureCell = { title: string; text: string; icon?: TablerIconComponent }

/** A row of hairline-bordered cells — on sand, paper, or the dark band. */
export function FeatureRow({ cells }: { cells: FeatureCell[] }) {
  return (
    <ul className="design-harness-feature-row">
      {cells.map((cell) => (
        <li key={cell.title}>
          <h3>{cell.title}</h3>
          <p>{cell.text}</p>
          {cell.icon ? (
            <span className="design-harness-feature-row__icon">
              <Icon icon={cell.icon} size="md" />
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function StatRow({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="design-harness-stats">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function Quote({ children, name, role }: { children: ReactNode; name: string; role: string }) {
  return (
    <figure className="design-harness-quote">
      <blockquote>{children}</blockquote>
      <figcaption>
        <span>{name}</span> {role}
      </figcaption>
    </figure>
  )
}

/** Questions as native `<details>` — one opens at a time. */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="design-harness-faq">
      {items.map((item) => (
        <details key={item.question} name="design-harness-faq">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export type FooterColumn = { title: string; links: { label: string; route: DesignHarnessRoute }[] }

export function MarketingFooter({
  columns,
  finePrint,
  name,
}: {
  columns: FooterColumn[]
  finePrint: string
  name?: string
}) {
  return (
    <footer className="design-harness-mkt-footer">
      <Wordmark name={name} />
      <nav className="design-harness-mkt-footer__columns" aria-label="Footer">
        {columns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={`#/${link.route}`} onClick={go(link.route)}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <p className="design-harness-mkt-footer__fine">{finePrint}</p>
    </footer>
  )
}
