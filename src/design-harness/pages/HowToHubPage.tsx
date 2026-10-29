import { useMemo } from 'react'
import {
  FrameBook,
  FrameBuildings,
  FrameStars,
  FramePalette,
  FramePlug,
  FrameWand,
  FrameRoute,
  FrameSettings,
  FrameStructure,
  FramePersonCircle,
} from '../harnessIcons'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { setDesignHarnessHash } from '../routes'
import {
  GUIDE_TOPICS,
  HOWTO_DOCS,
  HOWTO_GUIDE_ROUTES,
  HOWTO_HARNESS_ROUTES,
  HOWTO_HTML,
  HOWTO_INDEX_SOURCE,
  HOWTO_MCP_ROUTES,
  HOWTO_RELEASE_NOTES_ROUTE,
  HOWTO_TOPIC_ROUTES,
  prepareHowtoArticle,
  rewriteHowtoMarkdownLinks,
} from '../howtoDocs'
import { Button, Icon, type TablerIconComponent, Text } from '../ui'

const SYSTEM_MAP_ROUTE = HOWTO_HARNESS_ROUTES[0]

type Card = { route: string; title: string; description: string; icon: TablerIconComponent }

/** Guide hints are cut from the first paragraph, so the Start-here cards get their own line. */
const START_COPY: Record<string, { description: string; icon: TablerIconComponent }> = {
  'how-to/harness-system-map': {
    description: 'See how the orchestrator, agents, skills, and human checkpoints fit together.',
    icon: FrameStructure,
  },
  'how-to/guides/agents-vs-skills': {
    description: 'What each word means here, and when the harness uses which.',
    icon: FrameRoute,
  },
  'how-to/guides/onboarding': {
    description: 'Set up your profile so the harness knows how you like to work.',
    icon: FramePersonCircle,
  },
  'how-to/guides/company-context': {
    description: 'Three ways to add docs the harness should know: Settings, chat, or a file.',
    icon: FrameBuildings,
  },
  'how-to/guides/how-the-harness-works': {
    description: 'How skills start from what you ask, chain together, and hand off.',
    icon: FrameWand,
  },
}

const START_CARDS: Card[] = [
  ...HOWTO_HARNESS_ROUTES.map((route) => ({ route, title: HOWTO_HTML[route].label, hint: HOWTO_HTML[route].hint })),
  ...HOWTO_TOPIC_ROUTES['Start here'].map((route) => ({
    route,
    title: HOWTO_DOCS[route].label,
    hint: HOWTO_DOCS[route].hint,
  })),
].map(({ route, title, hint }) => ({
  route,
  title,
  description: START_COPY[route]?.description ?? hint,
  icon: START_COPY[route]?.icon ?? FrameBook,
}))

const TOPIC_COPY: Record<string, { description: string; icon: TablerIconComponent }> = {
  'Working with the harness': {
    description: 'Variation boards, the team gallery, company sources, and the AI-native design system.',
    icon: FramePalette,
  },
  'Connect your tools': {
    description: 'Set up Figma, your docs tool, tracker, chat, and the other tools the harness reads from.',
    icon: FramePlug,
  },
  'Harness internals': {
    description: 'How the harness itself is built, for when you want to change it.',
    icon: FrameSettings,
  },
}

const TOPIC_ROUTES: { title: string; routes: string[] }[] = [
  ...GUIDE_TOPICS.filter((topic) => topic !== 'Start here' && topic !== 'Harness internals').map((topic) => ({
    title: topic,
    routes: HOWTO_TOPIC_ROUTES[topic],
  })),
  { title: 'Connect your tools', routes: [...HOWTO_GUIDE_ROUTES, ...HOWTO_MCP_ROUTES] },
  { title: 'Harness internals', routes: HOWTO_TOPIC_ROUTES['Harness internals'] },
]

/** Each topic card opens the topic's first guide; the sidebar lists the rest. */
const TOPIC_CARDS: (Card & { count: number })[] = TOPIC_ROUTES.filter((topic) => topic.routes.length > 0).map(
  (topic) => ({
    route: topic.routes[0],
    title: topic.title,
    description: TOPIC_COPY[topic.title]?.description ?? '',
    icon: TOPIC_COPY[topic.title]?.icon ?? FrameBook,
    count: topic.routes.length,
  }),
)

/** README sections the cards and sidebar already cover, or that are maintainer notes. */
const HIDDEN_README_SECTIONS = new Set(['harness-overview', 'start-here-mcps', 'per-mcp-guides', 'last-reviewed'])

export function HowToHubPage() {
  const article = useMemo(() => prepareHowtoArticle(rewriteHowtoMarkdownLinks(HOWTO_INDEX_SOURCE), 'Overview'), [])
  const extras = article.sections.filter(
    (section) => section.id !== 'overview' && !HIDDEN_README_SECTIONS.has(section.id),
  )

  return (
    <div className="design-harness-ds-page design-harness-home design-harness-home--docs">
      <div className="design-harness-home__grid" aria-hidden />
      {HOWTO_RELEASE_NOTES_ROUTE ? (
        <a className="design-harness-home__release" href={`#/${HOWTO_RELEASE_NOTES_ROUTE}`}>
          Release notes
        </a>
      ) : null}
      <div className="design-harness-home__hero">
        <Icon icon={FrameStars} size="xl" className="design-harness-home__star" />
        <Text variant="display" as="h1" className="design-harness-home__title">
          Documentation
        </Text>
        <Text variant="muted" as="p" className="design-harness-home__lead">
          How the design harness works. Each skill's own guide lives on its page in Skills.
        </Text>
        <Button intent="primary" size="sm" onClick={() => setDesignHarnessHash(SYSTEM_MAP_ROUTE)}>
          Open the system map
        </Button>

        <CardSection id="docs-home-start" title="Start here" cards={START_CARDS} />
        <CardSection id="docs-home-topics" title="Browse by topic" cards={TOPIC_CARDS} />

        {extras.map((section) => (
          <section key={section.id} className="design-harness-home__help design-harness-ds-doc-section">
            <Text variant="label" as="h2" id={section.id} className="design-harness-home__help-title">
              {section.title}
            </Text>
            <DesignHarnessMarkdown source={section.body} stripLeadingH1={false} />
          </section>
        ))}
      </div>
    </div>
  )
}

function CardSection({ id, title, cards }: { id: string; title: string; cards: (Card & { count?: number })[] }) {
  if (cards.length === 0) return null
  return (
    <section className="design-harness-home__help" aria-labelledby={id}>
      <Text variant="label" as="h2" id={id} className="design-harness-home__help-title">
        {title}
      </Text>
      <div className="design-harness-home__cards">
        {cards.map((card) => (
          <a key={card.title} className="design-harness-home__card" href={`#/${card.route}`}>
            <Icon icon={card.icon} size="sm" />
            <span className="design-harness-home__card-title">{card.title}</span>
            <span className="design-harness-home__card-desc">{card.description}</span>
            {card.count ? (
              <span className="design-harness-home__card-meta">
                {card.count} {card.count === 1 ? 'guide' : 'guides'}
              </span>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  )
}
