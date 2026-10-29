import { useEffect, useId, useRef, useState, createContext, useContext, type ReactNode } from 'react'
import { FrameBrackets } from '../harnessIcons'
import { Icon, Text } from '../ui'
import { DesignHarnessMarkdown } from './DesignHarnessMarkdown'

const TOC_OPEN_KEY = 'design-harness-toc-open'

/** When-to-use notes for the catalog page currently open. */
const CatalogGuidance = createContext<string | undefined>(undefined)

export function CatalogGuidanceNote() {
  const guidance = useContext(CatalogGuidance)
  if (!guidance) return null
  return <DesignHarnessMarkdown source={guidance} />
}

function readTocOpen() {
  try {
    return window.localStorage.getItem(TOC_OPEN_KEY) !== '0'
  } catch {
    return true
  }
}

export type DesignHarnessDocPageProps = {
  /** Small trail above the title, e.g. a `Breadcrumb`. */
  breadcrumb?: ReactNode
  title?: string
  lead?: ReactNode
  meta?: ReactNode
  callout?: ReactNode
  beforeBody?: ReactNode
  /** Controls on the right of the title, e.g. a view switch. */
  actions?: ReactNode
  /** Left-hand "On this page" list, built from the page's `h2`s. Shown when there are two or more. */
  toc?: boolean
  /** `list` = a gallery or index page: smaller title and one-line lead. */
  variant?: 'doc' | 'list'
  children?: ReactNode
}

export type TocEntry = { id: string; title: string }

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64)

/** Every Design Harness page: title, one line, the content, and a collapsible "On this page" list on the left. */
export function DesignHarnessDocPage({
  breadcrumb,
  title,
  lead,
  meta,
  callout,
  beforeBody,
  actions,
  toc = true,
  variant = 'doc',
  children,
}: DesignHarnessDocPageProps) {
  const hasHeader = Boolean(breadcrumb || title || lead || meta || callout)
  const articleRef = useRef<HTMLElement>(null)
  const [entries, setEntries] = useState<TocEntry[]>([])
  const [activeId, setActiveId] = useState('')
  const [tocOpen, setTocOpen] = useState(readTocOpen)
  const tocId = useId()
  const showToc = toc && entries.length > 1

  const toggleToc = () => {
    setTocOpen((open) => {
      try {
        window.localStorage.setItem(TOC_OPEN_KEY, open ? '0' : '1')
      } catch {
        /* private mode — keep it in memory only */
      }
      return !open
    })
  }

  useEffect(() => {
    const root = articleRef.current
    if (!root || !toc) {
      setEntries([])
      return
    }
    const used = new Set<string>()
    const headings = [...root.querySelectorAll('h2')].filter((h) => h.textContent?.trim())
    const next = headings.map((heading) => {
      const text = heading.textContent!.trim()
      let id = heading.id || slug(text) || 'section'
      for (let n = 2; used.has(id); n += 1) id = `${slug(text)}-${n}`
      used.add(id)
      heading.id = id
      return { id, title: text }
    })
    setEntries((prev) => (prev.map((e) => e.id).join() === next.map((e) => e.id).join() ? prev : next))
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.find((e) => e.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '0px 0px -70% 0px' },
    )
    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [toc, children])

  return (
    <article
      ref={articleRef}
      className="design-harness-ds-doc-page"
      data-variant={variant}
      data-toc={showToc ? (tocOpen ? 'open' : 'closed') : undefined}
    >
      {showToc ? (
        <TableOfContents id={tocId} entries={entries} activeId={activeId} onSelect={setActiveId} hidden={!tocOpen} />
      ) : null}
      {hasHeader ? (
        <header className="design-harness-ds-doc-page__header">
          {breadcrumb}
          <div className="design-harness-ds-doc-page__title-row">
            <div className="design-harness-ds-doc-page__titles">
              {title ? (
                <div className="design-harness-ds-doc-page__title-line">
                  {showToc ? (
                    <button
                      type="button"
                      className="design-harness-ds-doc-toc-toggle"
                      aria-controls={tocId}
                      aria-expanded={tocOpen}
                      aria-label={tocOpen ? 'Hide "On this page"' : 'Show "On this page"'}
                      title={tocOpen ? 'Hide "On this page"' : 'Show "On this page"'}
                      onClick={toggleToc}
                    >
                      <Icon icon={FrameBrackets} size="sm" />
                    </button>
                  ) : null}
                  <Text variant="display" as="h1" className="design-harness-ds-doc-lead-title">
                    {title}
                  </Text>
                </div>
              ) : null}
              {lead ? (
                <Text variant="muted" as="p" className="design-harness-ds-doc-lead">
                  {lead}
                </Text>
              ) : null}
            </div>
            {actions ? <div className="design-harness-ds-doc-page__actions">{actions}</div> : null}
          </div>
          {meta ? <div className="design-harness-ds-doc-page__meta">{meta}</div> : null}
          {callout ? <aside className="design-harness-ds-doc-callout">{callout}</aside> : null}
        </header>
      ) : null}
      {beforeBody ? <div className="design-harness-ds-doc-page__before">{beforeBody}</div> : null}
      {children ? <div className="design-harness-ds-doc-page__body">{children}</div> : null}
    </article>
  )
}

/** "On this page": a sticky column left of the page, or `inline` in the flow. */
export function TableOfContents({
  id,
  entries,
  activeId,
  inline = false,
  hidden = false,
  onSelect,
}: {
  id?: string
  entries: TocEntry[]
  activeId: string
  inline?: boolean
  hidden?: boolean
  onSelect: (id: string) => void
}) {
  return (
    <nav
      id={id}
      className="design-harness-ds-doc-toc"
      data-inline={inline ? 'true' : undefined}
      aria-label="On this page"
      inert={hidden || undefined}
    >
      <p className="design-harness-ds-doc-toc__label">On this page</p>
      <ul className="design-harness-ds-doc-toc__list">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              className="design-harness-ds-doc-toc__link"
              data-active={activeId === entry.id ? 'true' : 'false'}
              aria-current={activeId === entry.id ? 'location' : undefined}
              onClick={() => {
                document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                onSelect(entry.id)
              }}
            >
              {entry.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
