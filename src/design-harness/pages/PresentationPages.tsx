import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import {
  FrameArrowLeft,
  FrameCheck,
  FrameChevronLeft,
  FrameChevronRight,
  FrameClose,
  FrameKeyboard,
  FrameMaximize,
  FrameNotes,
} from '../harnessIcons'
import { framePropsQuery, harnessFrameSrc, type PresentationFrame, type StageScenario } from '../presentation'
import { resolveScreenFile, type Project, type ProjectPresentation } from '../projectsIndex'
import { getDesignHarnessHashQuery, replaceDesignHarnessHashQuery } from '../routes'
import { Badge, Chip, Icon, IconButton } from '../ui'

type VariantsEntry = Extract<ProjectPresentation, { kind: 'variants' }>
type CompareEntry = Extract<ProjectPresentation, { kind: 'compare' }>
type StageEntry = Extract<ProjectPresentation, { kind: 'stage' }>
type IdeasEntry = Extract<ProjectPresentation, { kind: 'ideas' }>

/** Ignores keys typed into fields or chorded with a modifier. */
function isPageKey(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey) return false
  const target = event.target
  return !(target instanceof HTMLElement && target.closest('input, textarea, select'))
}

function usePageKeys(keys: Record<string, () => void>) {
  const ref = useRef(keys)
  useLayoutEffect(() => {
    ref.current = keys
  })
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!isPageKey(event)) return
      const run = ref.current[event.key.length === 1 ? event.key.toLowerCase() : event.key]
      if (!run) return
      event.preventDefault()
      run()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}

/** Keys pressed inside a screen reach the page too, so shortcuts work after someone taps into the prototype. */
function forwardFrameKeys(iframe: HTMLIFrameElement) {
  iframe.contentWindow?.addEventListener('keydown', (event) => {
    const target = event.target as Element | null
    if (target?.closest?.('input, textarea, select, [contenteditable="true"]')) return
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: event.key,
        code: event.code,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey,
      }),
    )
  })
}

/**
 * A screen on its `?embed=1` route, drawn at its viewport size and scaled to fit the pane in both
 * directions, so one phone fills a canvas and two to four sit side by side.
 */
function FittedScreen({
  project,
  frame,
  title,
  run = 0,
}: {
  project: Project
  frame: PresentationFrame
  title: string
  /** Change it to reload the screen from its start (reset, replay). */
  run?: number
}) {
  const screen = resolveScreenFile(frame.screen, project.slug)
  const paneRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const pane = paneRef.current
    const iframe = frameRef.current
    if (!pane || !iframe) return
    const fit = () =>
      setScale(
        Math.max(
          0.3,
          Math.min((pane.clientWidth - 24) / iframe.offsetWidth, (pane.clientHeight - 24) / iframe.offsetHeight, 1.25),
        ),
      )
    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(pane)
    return () => observer.disconnect()
  }, [screen, run])

  if (!screen) {
    return (
      <p className="design-harness-present__missing">
        Screen not found: <code>{frame.screen}</code>
      </p>
    )
  }
  return (
    <div className="design-harness-present__pane" ref={paneRef}>
      <iframe
        key={run}
        ref={frameRef}
        onLoad={(event) => forwardFrameKeys(event.currentTarget)}
        className="design-harness-present__screen"
        data-viewport={frame.viewport ?? 'phone'}
        style={{ '--present-scale': scale } as CSSProperties}
        title={title}
        src={harnessFrameSrc(`${screen.route}?${framePropsQuery(frame.props)}`)}
      />
    </div>
  )
}

/** The page's shortcuts behind a keyboard button, bottom right. Stays when panels are hidden. */
function KeyMenu({ keys }: { keys: [string, string][] }) {
  return (
    <div className="design-harness-present__keys">
      <div
        id="present-key-menu"
        popover="auto"
        className="design-harness-present__popover design-harness-present__key-menu"
      >
        <p className="design-harness-present__popover-title">Keyboard shortcuts</p>
        <ul>
          {keys.map(([key, what]) => (
            <li key={key}>
              <span>{what}</span>
              <kbd>{key}</kbd>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="design-harness-present__key-button"
        popoverTarget="present-key-menu"
        aria-label="Keyboard shortcuts"
      >
        <Icon icon={FrameKeyboard} size="md" />
      </button>
    </div>
  )
}

function BackToProject({ project }: { project: Project }) {
  return (
    <a className="design-harness-present__back" href={`#/${project.route}`}>
      <Icon icon={FrameArrowLeft} size="xs" />
      {project.title}
    </a>
  )
}

/**
 * Variants: the screen on a canvas, every open question as a control in the panel beside it.
 * Settings live in the URL, so a link reopens the same combination. R resets, P hides the panel.
 */
export function VariantsPage({ project, entry }: { project: Project; entry: VariantsEntry }) {
  const { config } = entry
  const controls = config.sections.flatMap((section) => section.controls)
  const [values, setValues] = useState<Record<string, string>>(() => {
    const query = getDesignHarnessHashQuery()
    return Object.fromEntries(
      controls.map((control) => {
        const value = query.get(control.id)
        return [control.id, value && control.options.some((o) => o.id === value) ? value : control.default]
      }),
    )
  })
  const [panel, setPanel] = useState(true)

  const set = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }))
    replaceDesignHarnessHashQuery({ [id]: value === controls.find((c) => c.id === id)?.default ? null : value })
  }
  const reset = useCallback(() => {
    setValues(Object.fromEntries(controls.map((control) => [control.id, control.default])))
    replaceDesignHarnessHashQuery(Object.fromEntries(controls.map((control) => [control.id, null])))
  }, [controls])

  usePageKeys({ r: reset, p: () => setPanel((open) => !open) })

  const frame = config.frame(values)
  const note = config.note?.(values)
  const summary = controls
    .map((control) => control.options.find((o) => o.id === values[control.id])?.label)
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="design-harness-present design-harness-present--variants">
      <main className="design-harness-present__canvas" aria-label={`${config.title}: ${summary}`}>
        <FittedScreen project={project} frame={frame} title={`${config.title}: ${summary}`} />
      </main>

      {panel ? (
        <aside className="design-harness-present__panel" aria-label="Controls">
          <header className="design-harness-present__panel-header">
            <BackToProject project={project} />
            <h1 className="design-harness-present__title">{config.title}</h1>
            {config.subtitle ? <p className="design-harness-present__intro">{config.subtitle}</p> : null}
            {note ? <p className="design-harness-present__combo-note">{note}</p> : null}
          </header>
          {config.sections.map((section) => (
            <section key={section.label} className="design-harness-present__section">
              <h2 className="design-harness-present__section-title">{section.label}</h2>
              {section.controls.map((control) => {
                const showLabel = section.controls.length > 1 || control.label !== section.label
                return (
                  <div
                    key={control.id}
                    className="design-harness-present__group"
                    role="group"
                    aria-label={control.label}
                  >
                    {showLabel ? <p className="design-harness-present__group-label">{control.label}</p> : null}
                    <div className="design-harness-present__options">
                      {control.options.map((option) => (
                        <Chip
                          key={option.id}
                          size="sm"
                          selected={values[control.id] === option.id}
                          onClick={() => set(control.id, option.id)}
                        >
                          {option.label}
                        </Chip>
                      ))}
                    </div>
                    {control.note ? <p className="design-harness-present__note">{control.note}</p> : null}
                  </div>
                )
              })}
            </section>
          ))}
        </aside>
      ) : null}

      <KeyMenu
        keys={[
          ['R', 'Reset'],
          ['P', panel ? 'Hide panel' : 'Show panel'],
        ]}
      />
    </div>
  )
}

/**
 * Compare: two to four screens side by side, split by hairlines, numbered but not named so the
 * labels don't bias a first look. Names, notes and the chosen frame sit behind Notes.
 * ← → move between comparisons, R goes back to the first, P hides the bar.
 */
export function ComparePage({ project, entry }: { project: Project; entry: CompareEntry }) {
  const { comparisons } = entry.config
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      comparisons.findIndex((c) => c.id === getDesignHarnessHashQuery().get('view')),
    ),
  )
  const [bar, setBar] = useState(true)
  const comparison = comparisons[index]
  const count = comparisons.length

  const go = (next: number) => {
    if (next < 0 || next >= count) return
    setIndex(next)
    replaceDesignHarnessHashQuery({ view: next === 0 ? null : comparisons[next].id })
  }

  usePageKeys({
    ArrowRight: () => go(index + 1),
    ArrowLeft: () => go(index - 1),
    r: () => go(0),
    p: () => setBar((open) => !open),
  })

  return (
    <div className="design-harness-present design-harness-present--compare">
      {bar ? (
        <header className="design-harness-present__bar">
          <IconButton label={`Back to ${project.title}`} onClick={() => (window.location.hash = `#/${project.route}`)}>
            <Icon icon={FrameArrowLeft} size="sm" />
          </IconButton>
          <h1 className="design-harness-present__bar-title">{comparison.question}</h1>
          <button type="button" className="design-harness-present__bar-button" popoverTarget="present-compare-notes">
            <Icon icon={FrameNotes} size="sm" />
            Notes
          </button>
          {count > 1 ? (
            <div className="design-harness-present__stepper" role="group" aria-label="Comparison">
              <IconButton label="Previous comparison" disabled={index === 0} onClick={() => go(index - 1)}>
                <Icon icon={FrameChevronLeft} size="sm" />
              </IconButton>
              <IconButton label="Next comparison" disabled={index === count - 1} onClick={() => go(index + 1)}>
                <Icon icon={FrameChevronRight} size="sm" />
              </IconButton>
            </div>
          ) : null}
          <div
            id="present-compare-notes"
            popover="auto"
            className="design-harness-present__popover design-harness-present__notes"
          >
            <p className="design-harness-present__popover-title">{comparison.title}</p>
            <ol>
              {comparison.frames.map((item, i) => (
                <li key={i}>
                  <span className="design-harness-present__notes-num">{i + 1}</span>
                  <div>
                    <p className="design-harness-present__notes-label">
                      {item.label}
                      {item.chosen ? <Badge tone="positive">Chosen</Badge> : null}
                    </p>
                    {item.note ? <p className="design-harness-present__note">{item.note}</p> : null}
                  </div>
                </li>
              ))}
            </ol>
            {comparison.source ? <p className="design-harness-present__note">Source: {comparison.source}</p> : null}
          </div>
        </header>
      ) : null}

      <div
        className="design-harness-present__frames"
        style={{ '--compare-count': comparison.frames.length } as CSSProperties}
      >
        {comparison.frames.map((item, i) => (
          <section key={`${comparison.id}-${i}`} className="design-harness-present__frame" aria-label={item.label}>
            <span className="design-harness-present__frame-num" aria-hidden>
              {i + 1}
            </span>
            <FittedScreen project={project} frame={item.frame} title={item.label} />
          </section>
        ))}
      </div>

      <KeyMenu
        keys={
          count > 1
            ? [
                ['←', 'Back'],
                ['→', 'Next'],
                ['R', 'First'],
                ['P', bar ? 'Hide bar' : 'Show bar'],
              ]
            : [['P', bar ? 'Hide bar' : 'Show bar']]
        }
      />
    </div>
  )
}

function withScenario(frame: PresentationFrame, scenario?: StageScenario): PresentationFrame {
  if (!scenario) return frame
  return { ...frame, screen: scenario.screen ?? frame.screen, props: { ...frame.props, ...scenario.props } }
}

/**
 * Stage: the prototype alone, for research. Nothing on screen tells the participant what to do, and
 * nothing goes in the URL. The facilitator opens a hidden drawer with \ to jump, reset (R, only while
 * it's open) or switch scenario. Esc closes it.
 */
export function StagePage({ project, entry }: { project: Project; entry: StageEntry }) {
  const { title, mode, items, scenarios = [] } = entry.config
  const [index, setIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [open, setOpen] = useState(false)
  const [scenarioId, setScenarioId] = useState(scenarios[0]?.id)
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]))
  const item = items[index]
  const scenario = scenarios.find((s) => s.id === scenarioId)

  /** Participants can see the tab, so it names nothing about the study. */
  useEffect(() => {
    const previous = document.title
    document.title = 'Prototype'
    return () => {
      document.title = previous
    }
  }, [])

  const jump = (to: number) => {
    setIndex(to)
    setSeen((prev) => new Set(prev).add(to))
    setRun((r) => r + 1)
  }
  const reset = () => setRun((r) => r + 1)
  const fullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else document.documentElement.requestFullscreen().catch(() => {})
  }

  usePageKeys({
    '\\': () => setOpen((v) => !v),
    Escape: () => setOpen(false),
    ...(open ? { r: reset } : {}),
  })

  return (
    <div className="design-harness-present design-harness-present--stage">
      <main className="design-harness-present__canvas" aria-label="Prototype">
        <FittedScreen project={project} frame={withScenario(item.frame, scenario)} title="Prototype" run={run} />
      </main>

      {open ? (
        <aside className="design-harness-present__drawer" aria-label="Facilitator controls">
          <header className="design-harness-present__drawer-header">
            <div>
              <p className="design-harness-present__drawer-eyebrow">
                Facilitator · {mode === 'linear' ? 'guided flow' : 'concepts'}
              </p>
              <h1 className="design-harness-present__drawer-title">{title}</h1>
            </div>
            <IconButton label="Close" onClick={() => setOpen(false)}>
              <Icon icon={FrameClose} size="sm" />
            </IconButton>
          </header>

          <ol className="design-harness-present__steps">
            {items.map((it, i) => (
              <li key={it.id}>
                <button
                  type="button"
                  className="design-harness-present__step"
                  aria-current={i === index ? 'step' : undefined}
                  onClick={() => jump(i)}
                >
                  <span className="design-harness-present__step-mark">
                    {mode === 'linear' ? (
                      i + 1
                    ) : seen.has(i) && i !== index ? (
                      <Icon icon={FrameCheck} size="xs" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </span>
                  <span>
                    <span className="design-harness-present__step-name">{it.name}</span>
                    {it.note ? <span className="design-harness-present__step-note">{it.note}</span> : null}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {scenarios.length > 1 ? (
            <div className="design-harness-present__drawer-section" role="group" aria-label="Scenario">
              <p className="design-harness-present__group-label">Scenario</p>
              <div className="design-harness-present__options">
                {scenarios.map((s) => (
                  <Chip
                    key={s.id}
                    size="sm"
                    selected={s.id === scenarioId}
                    onClick={() => {
                      setScenarioId(s.id)
                      reset()
                    }}
                  >
                    {s.label}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}

          <footer className="design-harness-present__drawer-footer">
            <button type="button" className="design-harness-present__drawer-button" onClick={fullscreen}>
              <Icon icon={FrameMaximize} size="xs" />
              Fullscreen
            </button>
            <p className="design-harness-present__note">
              <kbd>\</kbd> toggles this drawer · <kbd>R</kbd> resets {mode === 'linear' ? 'the step' : 'the concept'} ·{' '}
              <kbd>Esc</kbd> closes it
            </p>
            <BackToProject project={project} />
          </footer>
        </aside>
      ) : null}
    </div>
  )
}

/**
 * Ideas: an index of independent ideas, one prototype at a time, its notes beside it.
 * ← → move (and wrap), R replays, P hides the side panels.
 */
export function IdeasPage({ project, entry }: { project: Project; entry: IdeasEntry }) {
  const { title, subtitle, items } = entry.config
  const [index, setIndex] = useState(() =>
    Math.max(
      0,
      items.findIndex((i) => i.id === getDesignHarnessHashQuery().get('item')),
    ),
  )
  const [run, setRun] = useState(0)
  const [panels, setPanels] = useState(true)
  const item = items[index]
  const groups = [...new Set(items.map((i) => i.group ?? ''))]

  const go = (next: number) => {
    const wrapped = (next + items.length) % items.length
    setIndex(wrapped)
    replaceDesignHarnessHashQuery({ item: wrapped === 0 ? null : items[wrapped].id })
  }

  usePageKeys({
    ArrowRight: () => go(index + 1),
    ArrowLeft: () => go(index - 1),
    r: () => setRun((r) => r + 1),
    p: () => setPanels((open) => !open),
  })

  return (
    <div className="design-harness-present design-harness-present--ideas">
      {panels ? (
        <aside className="design-harness-present__index" aria-label="Ideas">
          <header className="design-harness-present__index-header">
            <BackToProject project={project} />
            <h1 className="design-harness-present__index-title">{title}</h1>
            {subtitle ? <p className="design-harness-present__note">{subtitle}</p> : null}
          </header>
          <nav>
            {groups.map((group) => (
              <div key={group}>
                {group ? <p className="design-harness-present__index-group">{group}</p> : null}
                {items.map((it, i) =>
                  (it.group ?? '') === group ? (
                    <button
                      key={it.id}
                      type="button"
                      className="design-harness-present__index-item"
                      aria-current={i === index ? 'page' : undefined}
                      onClick={() => go(i)}
                    >
                      <span className="design-harness-present__index-num">{String(i + 1).padStart(2, '0')}</span>
                      {it.title}
                    </button>
                  ) : null,
                )}
              </div>
            ))}
          </nav>
        </aside>
      ) : null}

      <main className="design-harness-present__idea">
        <header className="design-harness-present__idea-header">
          <h2 className="design-harness-present__idea-title">{item.title}</h2>
          {item.group ? <p className="design-harness-present__note">{item.group}</p> : null}
        </header>
        <FittedScreen key={item.id} project={project} frame={item.frame} title={item.title} run={run} />
      </main>

      {panels ? (
        <aside className="design-harness-present__idea-notes" aria-label="Notes">
          {item.prompt ? <p className="design-harness-present__idea-prompt">{item.prompt}</p> : null}
          {item.notes?.map((note) => (
            <section key={note.title}>
              <h3 className="design-harness-present__idea-note-title">{note.title}</h3>
              <p className="design-harness-present__idea-note-body">{note.body}</p>
            </section>
          ))}
        </aside>
      ) : null}

      <KeyMenu
        keys={[
          ['←', 'Back'],
          ['→', 'Next'],
          ['R', 'Replay'],
          ['P', panels ? 'Hide panels' : 'Show panels'],
        ]}
      />
    </div>
  )
}
