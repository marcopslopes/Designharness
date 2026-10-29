import { useEffect, useId, useState, type ReactNode } from 'react'
import {
  briefAssumptions,
  briefParked,
  briefStatus,
  displayQuestion,
  presentedUnknowns,
  truthChipLabel,
  type TruthUnknown,
} from '../projectFacts'
import { Toggle } from '../ui'

const HIDDEN_KEY = 'design-harness-truth-hidden'
const VISIBLE_QUESTIONS = 3

const STATUS_LABEL: Record<string, string> = {
  exploring: 'Exploring',
  draft: 'Draft',
  approved: 'Approved',
  closed: 'Closed',
}

export type TruthLayerProps = {
  brief?: string
  /**
   * The child is already the prototype stage (it must stay the screen's parent).
   * Otherwise the screen is wrapped so it still sits in the middle of the frame.
   */
  framed?: boolean
  children: ReactNode
}

/** Paper chip in the frame, outside the device. A status dot, then the open or blocking count. */
export function TruthLayer({ brief, framed = false, children }: TruthLayerProps) {
  const status = briefStatus(brief)
  const unknowns = presentedUnknowns(brief)
  const assumptions = briefAssumptions(brief)
  const parked = briefParked(brief)
  const panelId = useId()
  const [hidden, setHidden] = useState(() => {
    try {
      return window.localStorage.getItem(HIDDEN_KEY) === '1'
    } catch {
      return false
    }
  })
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [briefKey, setBriefKey] = useState(brief)
  if (brief !== briefKey) {
    setBriefKey(brief)
    setOpen(false)
    setExpanded(false)
  }

  useEffect(() => {
    try {
      window.localStorage.setItem(HIDDEN_KEY, hidden ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [hidden])

  if (!status) return <>{children}</>

  const label = truthChipLabel(brief) ?? STATUS_LABEL[status] ?? status
  const blocking = unknowns.some((item) => item.blocks)
  const shown = expanded ? unknowns : unknowns.slice(0, VISIBLE_QUESTIONS)
  const more = unknowns.length - VISIBLE_QUESTIONS
  const screen = framed ? children : <div className="design-harness-truth__screen">{children}</div>

  return (
    <div className="design-harness-truth">
      <div className="design-harness-truth__chrome">
        {hidden ? (
          <span />
        ) : (
          <button
            type="button"
            className="design-harness-truth__chip"
            data-status={status}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => {
              setOpen((value) => !value)
              setExpanded(false)
            }}
          >
            <span className="design-harness-truth__dot" data-fill={blocking ? 'half' : 'solid'} aria-hidden />
            {label}
          </button>
        )}
        <span className="design-harness-truth__hide">
          <Toggle
            checked={hidden}
            aria-label="Hide for a demo"
            onClick={() => {
              setHidden((value) => !value)
              setOpen(false)
              setExpanded(false)
            }}
          />
          Hide for a demo
        </span>
      </div>
      <div className="design-harness-truth__row">
        {screen}
        {open && !hidden ? (
          <aside id={panelId} className="design-harness-truth__panel" aria-label="What's still open">
            <TruthSection title="Open questions" items={shown} />
            {!expanded && more > 0 ? (
              <button type="button" className="design-harness-truth__more" onClick={() => setExpanded(true)}>
                Show {more} more
              </button>
            ) : null}
            {assumptions.length > 0 ? (
              <section>
                <h2>Assumptions</h2>
                <ul>
                  {assumptions.map((item) => (
                    <li key={item.text}>{displayQuestion(item.text)}</li>
                  ))}
                </ul>
              </section>
            ) : null}
            {parked.length > 0 ? (
              <section>
                <h2>Parked directions</h2>
                <ul>
                  {parked.map((item) => (
                    <li key={item}>{displayQuestion(item)}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        ) : null}
      </div>
    </div>
  )
}

function TruthSection({ title, items }: { title: string; items: TruthUnknown[] }) {
  if (items.length === 0) return null
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item.text}>
            {displayQuestion(item.text)}
            {item.owner ? <span className="design-harness-truth__owner">{item.owner}</span> : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
