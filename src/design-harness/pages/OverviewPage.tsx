import { useMemo, useState, type FormEvent, type MouseEvent } from 'react'
import { FrameChat, FrameFileAdd, FrameFolder } from '../harnessIcons'
import { HarnessLogo } from '../components/HarnessLogo'
import { HelpCard, HomeSearch } from '../components/HomeParts'
import { HOME_SHORTCUTS } from '../homeShortcuts'
import { isContextDocRoute } from '../contextDocs'
import { searchStudio } from '../studioSearch'
import { isHowtoDocRoute } from '../howtoDocs'
import { setDesignHarnessHash, type DesignHarnessRoute } from '../routes'
import { HARNESS_NAME, HARNESS_TAGLINE } from '../harnessSettings'
import { Icon, type TablerIconComponent, Text } from '../ui'

type HomeRow = {
  label: string
  detail?: string
  route: DesignHarnessRoute
  icon: TablerIconComponent
}

/** Falls back to the harness contract page if the guide is ever removed. */
const GUIDE_ROUTE = 'how-to/guides/company-context'
const CONTRACT_ROUTE = 'context/references/org-pack-extra-files'
const CONTEXT_GUIDE: DesignHarnessRoute = isHowtoDocRoute(GUIDE_ROUTE)
  ? GUIDE_ROUTE
  : isContextDocRoute(CONTRACT_ROUTE)
    ? CONTRACT_ROUTE
    : 'how-to'

const CONTEXT_CARDS: {
  title: string
  description: string
  meta: string
  route: DesignHarnessRoute
  icon: TablerIconComponent
}[] = [
  {
    title: 'Add a file in Settings',
    description: 'Upload or paste a doc. It stays on this machine.',
    meta: 'Settings → This machine',
    route: import.meta.env.DEV ? 'settings' : CONTEXT_GUIDE,
    icon: FrameFileAdd,
  },
  {
    title: 'Tell the harness in chat',
    description: 'Say “add this to the company pack” with the doc.',
    meta: 'Chat → Company pack',
    route: CONTEXT_GUIDE,
    icon: FrameChat,
  },
  {
    title: 'Drop a file in the pack',
    description: 'A Markdown file with an about and use-when header.',
    meta: 'File → Local pack',
    route: CONTEXT_GUIDE,
    icon: FrameFolder,
  },
]

/** Home: a centred search over every prototype, design-system page, and doc. */
export function OverviewPage() {
  const [query, setQuery] = useState('')
  const normalized = query.trim().toLowerCase()

  const results = useMemo(
    (): HomeRow[] => searchStudio(normalized).map((row) => ({ ...row, detail: row.path.join(' › ') })),
    [normalized],
  )

  const openFirst = (event: FormEvent) => {
    event.preventDefault()
    const first = results[0]
    if (first) setDesignHarnessHash(first.route)
  }

  return (
    <div className="design-harness-ds-page design-harness-home">
      <div className="design-harness-home__hero">
        <span className="design-harness-home__mark" aria-hidden>
          <HarnessLogo size={48} />
        </span>
        <Text variant="display" as="h1" className="design-harness-home__title">
          {HARNESS_NAME}
        </Text>
        {HARNESS_TAGLINE ? (
          <Text variant="muted" as="p" className="design-harness-home__lead">
            {HARNESS_TAGLINE}
          </Text>
        ) : null}

        <div className="design-harness-home__search-slot" data-open={normalized ? '' : undefined}>
          <HomeSearch
            value={query}
            onChange={setQuery}
            onSubmit={openFirst}
            canSubmit={Boolean(results[0])}
            shortcuts={HOME_SHORTCUTS}
          />
          {normalized ? (
            <div className="design-harness-home__results" role="region" aria-label="Results">
              {results.length === 0 ? (
                <Text variant="muted" as="p" className="design-harness-home__empty">
                  Nothing matches “{query.trim()}”.
                </Text>
              ) : (
                <ul className="design-harness-home__list">
                  {results.map((row) => (
                    <li key={`${row.route}-${row.label}`}>
                      <a className="design-harness-home__row" href={`#/${row.route}`} onClick={go(row.route)}>
                        <span className="design-harness-home__row-icon" aria-hidden>
                          <Icon icon={row.icon} size="sm" />
                        </span>
                        <span className="design-harness-home__row-label">{row.label}</span>
                        {row.detail ? <span className="design-harness-home__row-detail">{row.detail}</span> : null}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : null}
        </div>

        <section className="design-harness-home__help" aria-label="Give the harness your company context">
          <div className="design-harness-home__cards">
            {CONTEXT_CARDS.map((card) => (
              <HelpCard key={card.title} {...card} compact />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const go = (route: DesignHarnessRoute) => (event: MouseEvent) => {
  event.preventDefault()
  setDesignHarnessHash(route)
}
