import { useCallback, useEffect, useRef, useState } from 'react'
import { FrameArrowUpRight, FrameChevronDown, FrameChevronUp, FramePlay, FrameRefresh } from '../harnessIcons'
import { framePropsQuery } from '../presentation'
import { resolveScreenFile, type Project, type ProjectStoryboard } from '../projectsIndex'
import { getDesignHarnessHashQuery, replaceDesignHarnessHashQuery as setHashQuery } from '../routes'
import type { StoryboardStart, StoryboardTarget } from '../storyboard'
import { Icon } from '../ui'

const WAIT_MS = 4000
const POLL_MS = 60
const SETTLE_MS = 220

type Rect = { top: number; left: number; width: number; height: number }
type Mode = 'tour' | 'explore'

function find(doc: Document, target: StoryboardTarget): HTMLElement | null {
  const root: ParentNode | null = target.within ? find(doc, target.within) : doc
  if (!root) return null
  const matches = [...root.querySelectorAll<HTMLElement>(target.selector)].filter(
    (el) => !target.text || (el.textContent ?? '').includes(target.text),
  )
  return matches[target.nth ?? 0] ?? null
}

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms))

async function waitFor(doc: () => Document | null, target: StoryboardTarget, alive: () => boolean) {
  const start = performance.now()
  while (alive() && performance.now() - start < WAIT_MS) {
    const d = doc()
    const el = d ? find(d, target) : null
    if (el) return el
    await sleep(POLL_MS)
  }
  return null
}

/** Paragraphs split by a blank line; lines starting `- ` become a list. */
function NoteText({ text }: { text: string }) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((block, i) => {
      const lines = block.split('\n').map((line) => line.trim())
      return lines.every((line) => line.startsWith('- ')) ? (
        <ul key={i}>
          {lines.map((line) => (
            <li key={line}>{line.slice(2)}</li>
          ))}
        </ul>
      ) : (
        <p key={i}>{lines.join(' ')}</p>
      )
    })
}

function StartFrom({
  starts,
  current,
  onStart,
}: {
  starts: StoryboardStart[]
  current: string | null
  onStart: (start: StoryboardStart) => void
}) {
  return (
    <div className="design-harness-storyboard__starts" role="group" aria-label="Start from">
      <p className="design-harness-storyboard__starts-title">Start from</p>
      {starts.map((start) => (
        <button
          key={start.id ?? 'default'}
          type="button"
          className="design-harness-storyboard__start"
          aria-pressed={start.id === current}
          onClick={() => onStart(start)}
        >
          <Icon icon={start.id === null ? FrameRefresh : FramePlay} size="sm" />
          {start.label}
        </button>
      ))}
    </div>
  )
}

/**
 * A guided tour beside a live project screen. Each step reloads the screen,
 * runs its setup clicks inside the iframe (same origin), then spotlights the
 * element it explains. The screen stays clickable.
 */
export function StoryboardPage({ project, entry }: { project: Project; entry: ProjectStoryboard }) {
  const { storyboard } = entry
  const steps = storyboard.steps
  const screen = resolveScreenFile(storyboard.screen, project.slug)
  const [mode, setModeState] = useState<Mode>(() =>
    getDesignHarnessHashQuery().get('mode') === 'explore' ? 'explore' : 'tour',
  )
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      steps.findIndex((s) => s.id === getDesignHarnessHashQuery().get('step')),
    ),
  )
  const starts = storyboard.starts ?? []
  const [startId, setStartId] = useState<string | null>(() => {
    const id = getDesignHarnessHashQuery().get('start')
    return starts.some((s) => s.id === id) ? id : null
  })
  const start = starts.find((s) => s.id === startId)
  const [reset, setReset] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)
  const [missing, setMissing] = useState(false)
  const step = steps[index]
  const exploring = mode === 'explore'
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  /** Explore keeps whatever screen the tour left; only Reset reloads it. */
  const [frameKey, setFrameKey] = useState(`${step.id}-${reset}`)
  if (!exploring && frameKey !== `${step.id}-${reset}`) setFrameKey(`${step.id}-${reset}`)
  const [tracked, setTracked] = useState({ step, reset, exploring })
  if (tracked.step !== step || tracked.reset !== reset || tracked.exploring !== exploring) {
    setTracked({ step, reset, exploring })
    setRect(null)
    setMissing(false)
  }

  const setMode = useCallback((next: Mode) => {
    setModeState(next)
    setHashQuery({ mode: next === 'explore' ? 'explore' : null })
    if (next === 'tour') setReset((n) => n + 1)
  }, [])

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(steps.length - 1, next))
      setIndex(clamped)
      setModeState('tour')
      setReset((n) => n + 1)
      setHashQuery({ step: steps[clamped].id, mode: null })
    },
    [steps],
  )

  const chooseStart = (next: StoryboardStart) => {
    setStartId(next.id)
    setHashQuery({ start: next.id })
    go(
      Math.max(
        0,
        steps.findIndex((s) => s.id === next.step),
      ),
    )
  }

  const reload = () => {
    if (exploring) setFrameKey(`explore-${reset + 1}`)
    setReset((n) => n + 1)
  }

  useEffect(() => {
    let alive = true
    let frame = 0
    if (exploring) return
    const doc = () => iframeRef.current?.contentDocument ?? null
    const isAlive = () => alive

    const run = async () => {
      for (const action of step.setup ?? []) {
        const el = await waitFor(doc, action.click, isAlive)
        if (!alive) return
        if (!el) break
        el.click()
        await sleep(SETTLE_MS)
      }
      const first = await waitFor(doc, step.targets[0], isAlive)
      if (!alive) return
      if (!first) {
        setMissing(true)
        return
      }
      first.scrollIntoView({ block: 'center' })
      await sleep(SETTLE_MS)

      const track = () => {
        if (!alive) return
        const d = doc()
        const els = d ? step.targets.map((t) => find(d, t)).filter((el): el is HTMLElement => Boolean(el)) : []
        if (els.length === 0) {
          setRect(null)
        } else {
          const boxes = els.map((el) => el.getBoundingClientRect())
          const top = Math.min(...boxes.map((b) => b.top))
          const left = Math.min(...boxes.map((b) => b.left))
          const next = {
            top,
            left,
            width: Math.max(...boxes.map((b) => b.right)) - left,
            height: Math.max(...boxes.map((b) => b.bottom)) - top,
          }
          setRect((prev) =>
            prev &&
            Math.abs(prev.top - next.top) < 0.5 &&
            Math.abs(prev.left - next.left) < 0.5 &&
            Math.abs(prev.width - next.width) < 0.5 &&
            Math.abs(prev.height - next.height) < 0.5
              ? prev
              : next,
          )
        }
        frame = window.requestAnimationFrame(track)
      }
      track()
    }

    void run()
    return () => {
      alive = false
      window.cancelAnimationFrame(frame)
    }
  }, [step, reset, exploring])

  useEffect(() => {
    if (exploring) return
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea')) return
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault()
        go(index + 1)
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault()
        go(index - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index, exploring])

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-step="${step.id}"]`)
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [step.id])

  if (!screen) {
    return (
      <p className="design-harness-storyboard__missing">
        This storyboard points at <code>{storyboard.screen}</code>, which isn&apos;t a screen in {project.title}.
      </p>
    )
  }

  const chapters = [...new Set(steps.map((s) => s.chapter))]
  const screenHash = (embed: boolean) => {
    const query = new URLSearchParams(framePropsQuery(start?.props))
    if (!embed) query.delete('embed')
    const qs = query.toString()
    return `#/${screen.route}${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="design-harness-storyboard">
      <aside className="design-harness-storyboard__panel" aria-label="Storyboard">
        <header className="design-harness-storyboard__panel-header">
          <p className="design-harness-storyboard__eyebrow">Storyboard</p>
          <h1 className="design-harness-storyboard__title">{storyboard.title}</h1>
          <p className="design-harness-storyboard__range">
            {steps.length} steps{storyboard.subtitle ? ` · ${storyboard.subtitle}` : ''}
          </p>
          <div className="design-harness-storyboard__mode" role="group" aria-label="Storyboard mode">
            <button
              type="button"
              className="design-harness-storyboard__mode-btn"
              aria-pressed={!exploring}
              onClick={() => setMode('tour')}
            >
              Guided tour
            </button>
            <button
              type="button"
              className="design-harness-storyboard__mode-btn"
              aria-pressed={exploring}
              onClick={() => setMode('explore')}
            >
              Explore freely
            </button>
          </div>
          {exploring ? (
            <p className="design-harness-storyboard__mode-hint">
              Tap around the prototype. Pick any step to see why that part works the way it does.
            </p>
          ) : null}
        </header>
        <ol className="design-harness-storyboard__steps" ref={listRef}>
          {chapters.map((chapter) => (
            <li key={chapter} className="design-harness-storyboard__chapter">
              <p className="design-harness-storyboard__chapter-title">{chapter}</p>
              <ol className="design-harness-storyboard__chapter-steps">
                {steps.map((s, i) => {
                  if (s.chapter !== chapter) return null
                  const active = !exploring && i === index
                  return (
                    <li key={s.id} className="design-harness-storyboard__item" data-active={active ? 'true' : 'false'}>
                      <button
                        type="button"
                        className="design-harness-storyboard__step"
                        data-step={s.id}
                        aria-current={active ? 'step' : undefined}
                        onClick={() => go(i)}
                      >
                        <span className="design-harness-storyboard__step-head">
                          <span className="design-harness-storyboard__step-num">{i + 1}</span>
                          <span className="design-harness-storyboard__step-title">{s.title}</span>
                        </span>
                      </button>
                      {active ? (
                        <div className="design-harness-storyboard__step-body">
                          <p className="design-harness-storyboard__step-why">{s.why}</p>
                          {s.evidence ? <p className="design-harness-storyboard__step-evidence">{s.evidence}</p> : null}
                          {s.try ? <p className="design-harness-storyboard__step-try">Try it: {s.try}</p> : null}
                          {i === 0 && starts.length > 0 ? (
                            <StartFrom starts={starts} current={startId} onStart={chooseStart} />
                          ) : null}
                          {s.notes ? (
                            <details className="design-harness-storyboard__notes">
                              <summary className="design-harness-storyboard__notes-summary">Notes</summary>
                              <div className="design-harness-storyboard__notes-body">
                                <NoteText text={s.notes} />
                              </div>
                            </details>
                          ) : null}
                        </div>
                      ) : null}
                    </li>
                  )
                })}
              </ol>
            </li>
          ))}
        </ol>
      </aside>

      <section
        className="design-harness-storyboard__stage"
        aria-label={exploring ? 'Prototype, free exploration' : `Step ${index + 1}: ${step.title}`}
      >
        <div className="design-harness-storyboard__toolbar">
          {exploring ? (
            <span className="design-harness-storyboard__counter">Exploring freely</span>
          ) : (
            <div className="design-harness-storyboard__nav">
              <button
                type="button"
                className="design-harness-storyboard__nav-btn"
                aria-label="Previous step"
                disabled={index === 0}
                onClick={() => go(index - 1)}
              >
                <Icon icon={FrameChevronUp} size="sm" />
              </button>
              <button
                type="button"
                className="design-harness-storyboard__nav-btn"
                aria-label="Next step"
                disabled={index === steps.length - 1}
                onClick={() => go(index + 1)}
              >
                <Icon icon={FrameChevronDown} size="sm" />
              </button>
              <span className="design-harness-storyboard__counter">
                {index + 1} / {steps.length} · {step.chapter}
              </span>
            </div>
          )}
          <p className="design-harness-storyboard__source">
            {missing
              ? start?.props
                ? `Not on screen when starting from “${start.label}”.`
                : 'Could not find this on screen — the prototype may have changed.'
              : null}
          </p>
          <button type="button" className="design-harness-storyboard__open" onClick={reload}>
            <Icon icon={FrameRefresh} size="sm" />
            {exploring ? 'Reset prototype' : 'Reset step'}
          </button>
          <a className="design-harness-storyboard__open" href={screenHash(false)} target="_blank" rel="noreferrer">
            Open prototype
            <Icon icon={FrameArrowUpRight} size="sm" />
          </a>
        </div>

        <div className="design-harness-storyboard__frame">
          <iframe
            key={frameKey}
            ref={iframeRef}
            className="design-harness-storyboard__iframe"
            title={screen.label}
            src={`${window.location.pathname}${screenHash(true)}`}
          />
          {rect ? (
            <div
              className="design-harness-storyboard__spotlight"
              aria-hidden
              style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
            >
              <span className="design-harness-storyboard__spotlight-num">{index + 1}</span>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}
