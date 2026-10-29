import { IconChevronRight, IconSparkles, IconX } from '@tabler/icons-react'
import type { ReactNode } from 'react'
import { Icon } from './Icon'

export type CoachmarkStep = { title: string; body: string }

export type CoachmarkProps = {
  steps: CoachmarkStep[]
  step: number
  onStepChange: (step: number) => void
  onDismiss?: () => void
  target: ReactNode
}

/** A spotlight and a stepped card under a target. Kit `CoachmarkCallout`. */
export function Coachmark({ steps, step, onStepChange, onDismiss, target }: CoachmarkProps) {
  const current = steps[step] ?? steps[0]
  const last = step >= steps.length - 1
  return (
    <div className="ds-coachmark">
      <div className="ds-coachmark__target">{target}</div>
      <div className="ds-coachmark__card" role="dialog" aria-label={current.title}>
        <span className="ds-coachmark__icon" aria-hidden="true">
          <Icon icon={IconSparkles} size="xs" />
        </span>
        <span className="ds-coachmark__copy">
          <span className="ds-coachmark__title">{current.title}</span>
          <span className="ds-coachmark__body">{current.body}</span>
        </span>
        <button type="button" className="ds-coachmark__dismiss" aria-label="Dismiss" onClick={onDismiss}>
          <Icon icon={IconX} size="xs" />
        </button>
        <span className="ds-coachmark__foot">
          <span className="ds-coachmark__dots" aria-hidden="true">
            {steps.map((item, index) => (
              <span key={item.title} data-on={index === step ? 'true' : undefined} />
            ))}
          </span>
          <span className="ds-coachmark__actions">
            <button type="button" className="ds-coachmark__skip" onClick={onDismiss}>
              Skip
            </button>
            <button
              type="button"
              className="ds-coachmark__next"
              onClick={() => (last ? onDismiss?.() : onStepChange(step + 1))}
            >
              {last ? 'Got it' : 'Next'}
              <Icon icon={IconChevronRight} size="xs" />
            </button>
          </span>
        </span>
      </div>
    </div>
  )
}
