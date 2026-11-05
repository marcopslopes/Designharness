import { useEffect, useMemo, useState } from 'react'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { CopyAction } from '../components/DocToolbar'
import { HelpCard } from '../components/HomeParts'
import { FrameSearch } from '../harnessIcons'
import { skillIcon } from '../skillIcons'
import { CONTEXT_DOCS, ORCHESTRATOR_PATH, splitSkillFile, summarizeSkill, type ContextDocRoute } from '../contextDocs'
import { routePhrases, scoreSkills, type FinderSkill } from '../skillFinder'
import { Callout, Chip, Field, Icon, Stack, Text } from '../ui'

const SKILL_PREFIX = 'context/skills/'
const ROUTES_PATH = 'harness/references/routes.md'
const MAX_MATCHES = 3

const EXAMPLES = [
  'plan a usability test',
  'check my screen before I share it',
  'turn interview notes into insights',
  'write the spec for engineers',
]

type FinderIndex = { skills: FinderSkill[]; routes: Map<string, ContextDocRoute> }

const plain = (text: string) => text.replace(/[`*_]/g, '').replace(/\s+/g, ' ').trim()

const firstSentence = (text: string) => (text.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0] ?? text).trim()

/** Descriptions often run "what it does — the detail"; a result card keeps the first half. */
const beforeDash = (sentence: string) => {
  const [head] = sentence.split(/\s+—\s+/)
  return head.length >= 20 && head !== sentence ? `${head.replace(/[,;:]$/, '')}.` : sentence
}

/** Every routable skill, with trigger phrases from its description and from the routing tables. */
async function loadFinderIndex(): Promise<FinderIndex> {
  const skillDocs = CONTEXT_DOCS.filter((doc) => doc.route.startsWith(SKILL_PREFIX))
  const tableDocs = CONTEXT_DOCS.filter((doc) => doc.path === ORCHESTRATOR_PATH || doc.path === ROUTES_PATH)
  const [described, tables] = await Promise.all([
    Promise.all(skillDocs.map(async (doc) => ({ doc, description: splitSkillFile(await doc.load()).description }))),
    Promise.all(tableDocs.map((doc) => doc.load())),
  ])
  const slugOf = (route: string) => route.slice(SKILL_PREFIX.length)
  const routed = routePhrases(tables.join('\n'), new Set(skillDocs.map((doc) => slugOf(doc.route))))
  const live = described.filter(({ description }) => description && !/do not route here/i.test(description))
  return {
    skills: live.map(({ doc, description }) => {
      const slug = slugOf(doc.route)
      const summary = summarizeSkill(description)
      return {
        slug,
        label: doc.label,
        purpose: beforeDash(plain(firstSentence(summary.purpose))),
        description,
        triggers: [...new Set([...(routed.get(slug) ?? []), ...summary.triggers])],
      }
    }),
    routes: new Map(live.map(({ doc }) => [slugOf(doc.route), doc.route])),
  }
}

/** Finds the skill for a task by matching the designer's words against real skill files. */
export function SkillsAssistantPage() {
  const [index, setIndex] = useState<FinderIndex | null>(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    let cancelled = false
    loadFinderIndex()
      .then((loaded) => {
        if (!cancelled) setIndex(loaded)
      })
      .catch((cause: unknown) => {
        if (!cancelled) setError(cause instanceof Error ? cause.message : 'Could not read the skills')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const matches = useMemo(() => (index ? scoreSkills(query, index.skills).slice(0, MAX_MATCHES) : []), [index, query])
  const asked = query.trim().length > 0

  return (
    <DesignHarnessDocPage
      title="Find a skill"
      lead="Say what you want to do in your own words. This page looks for your words in each skill's name, description, and the phrases that start it."
      variant="list"
      toc={false}
    >
      <Stack gap="var(--spacing-05)">
        <Field
          label="What do you want to do?"
          type="search"
          placeholder="For example, plan a usability test"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          trailing={<Icon icon={FrameSearch} size="sm" />}
        />
        {!asked ? (
          <div className="design-harness-skills__filters" role="group" aria-label="Example questions">
            {EXAMPLES.map((example) => (
              <Chip key={example} size="sm" onClick={() => setQuery(example)}>
                {example}
              </Chip>
            ))}
          </div>
        ) : null}

        {error ? (
          <Callout tone="warning">{error}</Callout>
        ) : !index ? (
          <Text variant="muted" as="p">
            Reading the skills
          </Text>
        ) : !asked ? null : matches.length === 0 ? (
          <Text variant="muted" as="p">
            No skill shares a word with that. Try other words, or <a href="#/skills">browse every skill</a>.
          </Text>
        ) : (
          <>
            <Text variant="muted" as="p">
              {matches[0].strong
                ? 'Best match first. A word in the phrases that start a skill, or in its name, counts more than one in its description.'
                : 'Nothing fits well. These skills only mention your words in their description.'}
            </Text>
            <ul className="design-harness-skills__grid">
              {matches.map(({ skill, example, matched }) => (
                <li key={skill.slug}>
                  <HelpCard
                    route={index.routes.get(skill.slug)!}
                    title={skill.label}
                    description={skill.purpose}
                    meta={[example ? `Try saying “${example}”.` : '', `Matched: ${matched.join(', ')}.`]
                      .filter(Boolean)
                      .join(' ')}
                    icon={skillIcon(skill.slug)}
                    action={example ? <CopyAction label="Copy example" text={example} /> : undefined}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </Stack>
    </DesignHarnessDocPage>
  )
}
