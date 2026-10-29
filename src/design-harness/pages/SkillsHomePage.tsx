import { useEffect, useMemo, useState } from 'react'
import { CopyAction } from '../components/DocToolbar'
import { HelpCard } from '../components/HomeParts'
import { skillChatPrompt } from '../components/SkillCover'
import { FrameStars } from '../harnessIcons'
import { skillIcon } from '../skillIcons'
import { contextDocsOfKind, splitSkillFile, summarizeSkill } from '../contextDocs'
import { SKILL_GROUP_ORDER, skillGroupForRoute, type SkillGroup } from '../designHarnessNavConfig'
import { Chip, Icon, Text } from '../ui'

type GroupFilter = 'All' | SkillGroup

const FILTERS: GroupFilter[] = ['All', ...SKILL_GROUP_ORDER]

/** Real entry points, so the header is a way to start rather than a title. */
const STARTS = [
  {
    slug: 'design-kickoff',
    title: 'Start a project',
    text: 'When there is no brief yet. Research first, then the work.',
  },
  {
    slug: 'ui-agent',
    title: 'Build a screen',
    text: 'Assemble a prototype from the design system.',
  },
  {
    slug: 'audit',
    title: 'Check before sharing',
    text: 'The last pass before the work leaves your hands.',
  },
] as const

/** First sentence of a skill's purpose, so a card stays a card. */
function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?:\s|$)/)
  return (match?.[0] ?? text).trim()
}

/** The skills catalog: Craft / Product / Harness, one card per skill. */
export function SkillsHomePage() {
  const skills = useMemo(() => contextDocsOfKind('skill'), [])
  const [group, setGroup] = useState<GroupFilter>('All')
  const [purpose, setPurpose] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false
    void Promise.all(
      skills.map(async (doc) => {
        const raw = await doc.load()
        const line = firstSentence(summarizeSkill(splitSkillFile(raw).description).purpose)
        return [doc.route, line] as const
      }),
    ).then((rows) => {
      if (!cancelled) setPurpose(Object.fromEntries(rows))
    })
    return () => {
      cancelled = true
    }
  }, [skills])

  const shown = skills.filter((doc) => group === 'All' || skillGroupForRoute(doc.route) === group)

  return (
    <div className="design-harness-ds-page design-harness-home design-harness-home--docs design-harness-skills">
      <div className="design-harness-home__grid" aria-hidden />
      <div className="design-harness-home__hero">
        <div className="design-harness-skills__intro">
          <Icon icon={FrameStars} size="xl" className="design-harness-home__star" />
          <Text variant="display" as="h1" className="design-harness-home__title">
            Pick a task. Find your <span className="design-harness-skills__title-accent">skill.</span>
          </Text>
          <Text variant="muted" as="p" className="design-harness-home__lead">
            {skills.length} reusable design workflows for your AI agent. Research a problem, build a prototype, or check
            the work before sharing.
          </Text>
        </div>
        <div className="design-harness-home__cards">
          {STARTS.map((start) => (
            <a key={start.slug} className="design-harness-home__card" href={`#/context/skills/${start.slug}`}>
              <Icon icon={skillIcon(start.slug)} size="sm" />
              <span className="design-harness-home__card-title">{start.title}</span>
              <span className="design-harness-home__card-desc">{start.text}</span>
            </a>
          ))}
        </div>
        <div className="design-harness-skills__filters" role="group" aria-label="Skill groups">
          {FILTERS.map((filter) => (
            <Chip key={filter} size="sm" selected={group === filter} onClick={() => setGroup(filter)}>
              {filter}
            </Chip>
          ))}
        </div>
        {shown.length === 0 ? (
          <Text variant="muted" as="p">
            No skills match.
          </Text>
        ) : (
          <ul className="design-harness-skills__grid">
            {shown.map((doc) => (
              <li key={doc.route}>
                <HelpCard
                  route={doc.route}
                  title={doc.label}
                  description={purpose[doc.route] ?? ''}
                  meta={skillGroupForRoute(doc.route)}
                  icon={skillIcon(doc.route.replace('context/skills/', ''))}
                  action={<CopyAction label="Copy prompt" text={skillChatPrompt(doc.label, doc.path)} />}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
