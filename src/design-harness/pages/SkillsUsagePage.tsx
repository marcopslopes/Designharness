import { useEffect, useState } from 'react'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { SummaryPanel } from '../components/DocParts'
import { Callout, Card, Text } from '../ui'

type Cell = {
  date: string
  prototype: number
  caseStudy: number
  future: boolean
}

type UsagePayload = {
  weeks: { month: string; cells: Cell[] }[]
  prototypeDays: number
  caseStudyDays: number
  bothDays: number
  skillEvents: number
  skills: { name: string; count: number }[]
  tokenTurns: number
  avgInput: number
  avgOutput: number
  avgTotal: number
  error?: string
}

const ENDPOINT = '/__harness/usage'

function cellKind(cell: Cell): 'future' | 'none' | 'prototype' | 'case' | 'both' {
  if (cell.future) return 'future'
  if (cell.prototype && cell.caseStudy) return 'both'
  if (cell.prototype) return 'prototype'
  if (cell.caseStudy) return 'case'
  return 'none'
}

function cellTitle(cell: Cell): string | undefined {
  if (cell.future) return undefined
  const when = new Date(`${cell.date}T12:00:00`).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  if (!cell.prototype && !cell.caseStudy) return `${when}. No prototype or case study.`
  const parts = []
  if (cell.prototype) parts.push(`${cell.prototype} prototype ${cell.prototype === 1 ? 'file' : 'files'}`)
  if (cell.caseStudy) parts.push(`${cell.caseStudy} case study ${cell.caseStudy === 1 ? 'file' : 'files'}`)
  return `${when}. ${parts.join(', ')}.`
}

function Year({ weeks }: { weeks: UsagePayload['weeks'] }) {
  const prototypeDays = weeks.flatMap((week) => week.cells).filter((cell) => cell.prototype).length
  const caseDays = weeks.flatMap((week) => week.cells).filter((cell) => cell.caseStudy).length
  return (
    <figure
      className="design-harness-usage-year"
      aria-label={`The last year. ${prototypeDays} days touched a prototype. ${caseDays} days touched a case study.`}
    >
      <div className="design-harness-usage-year__scroll">
        <div className="design-harness-usage-year__months" aria-hidden>
          {weeks.map((week, index) => {
            const previous = weeks.findLastIndex((item, itemIndex) => itemIndex < index && item.month)
            const show = Boolean(week.month) && (previous < 0 || index - previous >= 3)
            return <span key={week.cells[0]?.date ?? index}>{show ? week.month : ''}</span>
          })}
        </div>
        <div className="design-harness-usage-year__body">
          <div className="design-harness-usage-year__dow" aria-hidden>
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div className="design-harness-usage-year__grid">
            {weeks.flatMap((week) =>
              week.cells.map((cell) => (
                <span
                  key={cell.date}
                  className="design-harness-usage-year__cell"
                  data-kind={cellKind(cell)}
                  title={cellTitle(cell)}
                />
              )),
            )}
          </div>
        </div>
      </div>
      <figcaption className="design-harness-usage-year__legend">
        <span>
          <i data-kind="prototype" /> Prototype
        </span>
        <span>
          <i data-kind="case" /> Case study
        </span>
        <span>
          <i data-kind="both" /> Both
        </span>
      </figcaption>
    </figure>
  )
}

/** A year of project work, plus skills this machine has actually loaded. */
export function SkillsUsagePage() {
  const [data, setData] = useState<UsagePayload | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const controller = new AbortController()
    void fetch(ENDPOINT, { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        const body = (await response.json()) as UsagePayload
        if (!response.ok) throw new Error(body.error ?? 'Could not load usage')
        setData(body)
      })
      .catch((cause: unknown) => {
        if (controller.signal.aborted) return
        setError(cause instanceof Error ? cause.message : 'Could not load usage')
      })
    return () => controller.abort()
  }, [])

  const maxCount = data?.skills[0]?.count ?? 0

  return (
    <DesignHarnessDocPage
      title="Usage"
      lead="A year of prototype work and case studies in this repo, and the skills loaded on this machine."
      toc={false}
    >
      {!import.meta.env.DEV ? (
        <Callout>This view runs locally. It reads git history and the skill log on this machine.</Callout>
      ) : error ? (
        <Callout tone="warning">{error}</Callout>
      ) : !data ? (
        <Text variant="muted" as="p">
          Loading usage
        </Text>
      ) : (
        <>
          <SummaryPanel
            title="The last year"
            stats={[
              [data.prototypeDays, 'Prototype days'],
              [data.caseStudyDays, 'Case study days'],
              [data.bothDays, 'Days with both'],
              [data.skillEvents, 'Skills loaded'],
              [data.tokenTurns ? data.avgTotal.toLocaleString('en-US') : '—', 'Avg tokens / turn'],
            ]}
            note={
              data.tokenTurns
                ? `Across ${data.tokenTurns} ${data.tokenTurns === 1 ? 'turn' : 'turns'}: ${data.avgInput.toLocaleString('en-US')} input and ${data.avgOutput.toLocaleString('en-US')} output. Input already includes cached tokens.`
                : 'No finished turn has reported tokens yet. The average appears after the next reply.'
            }
          />

          <Card className="design-harness-usage">
            <Text variant="label" as="h2">
              Prototype and case study
            </Text>
            <Year weeks={data.weeks} />
            <Text variant="muted" as="p">
              A day counts when git records a change under a project. Screens are prototype work. The case study and its
              deck are case-study work.
            </Text>
          </Card>

          <Card className="design-harness-usage">
            <Text variant="label" as="h2">
              Skills loaded
            </Text>
            {data.skills.length > 0 ? (
              <ol className="design-harness-usage__bars">
                {data.skills.map((item, index) => (
                  <li key={item.name}>
                    <div className="design-harness-usage__bar-head">
                      <Text variant="body" as="span">
                        {index + 1}. {item.name}
                      </Text>
                      <Text variant="muted" as="span">
                        {item.count} {item.count === 1 ? 'load' : 'loads'}
                      </Text>
                    </div>
                    <div className="design-harness-usage__track">
                      <div
                        className="design-harness-usage__fill"
                        style={{ width: `${(item.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <Text variant="muted" as="p">
                None yet. A skill is counted the next time its SKILL.md is opened in this workspace. Older chats were
                not recorded.
              </Text>
            )}
          </Card>
        </>
      )}
    </DesignHarnessDocPage>
  )
}
