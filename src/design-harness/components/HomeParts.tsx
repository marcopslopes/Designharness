import type { FormEvent, MouseEvent, ReactNode } from 'react'
import { FrameArrowRight, FrameChevronRight } from '../harnessIcons'
import type { HomeShortcut } from '../homeShortcuts'
import { setDesignHarnessHash, type DesignHarnessRoute } from '../routes'
import { Field, Icon, type TablerIconComponent } from '../ui'

/** Home building blocks — used on the home page and shown live on the Harness system's pages. */

const go = (route: DesignHarnessRoute) => (event: MouseEvent) => {
  event.preventDefault()
  setDesignHarnessHash(route)
}

export function HomeSearch({
  value,
  onChange,
  onSubmit,
  canSubmit,
  shortcuts,
}: {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  canSubmit: boolean
  shortcuts: HomeShortcut[]
}) {
  return (
    <form className="design-harness-home__composer" onSubmit={onSubmit}>
      <Field
        label="Search the harness"
        placeholder="Search prototypes, the design system, skills, and the docs"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="design-harness-home__search"
      />
      <div className="design-harness-home__composer-bar">
        <div className="design-harness-home__chips">
          {shortcuts.map((shortcut) => (
            <a
              key={shortcut.route}
              className="design-harness-home__chip"
              href={`#/${shortcut.route}`}
              onClick={go(shortcut.route)}
            >
              <Icon icon={shortcut.icon} size="sm" />
              {shortcut.label}
            </a>
          ))}
        </div>
        <button
          type="submit"
          className="design-harness-home__go"
          disabled={!canSubmit}
          aria-label="Open the first match"
        >
          <Icon icon={FrameArrowRight} size="sm" />
        </button>
      </div>
    </form>
  )
}

export function HelpCard({
  title,
  description,
  route,
  icon,
  meta,
  compact,
  action,
}: {
  title: string
  description: string
  route: DesignHarnessRoute
  icon: TablerIconComponent
  meta?: string
  /** Skill-start size: sunken fill, chevron, one short line. */
  compact?: boolean
  /** Sits under the description, outside the link. Used for Copy prompt on skill cards. */
  action?: ReactNode
}) {
  const face = (
    <>
      {compact ? (
        <span className="design-harness-home__card-icon" aria-hidden>
          <Icon icon={icon} size="lg" />
        </span>
      ) : (
        <Icon icon={icon} size="sm" />
      )}
      <span className="design-harness-home__card-title">
        {title}
        {compact ? <Icon icon={FrameChevronRight} size="sm" /> : null}
      </span>
      <span className="design-harness-home__card-desc">{description}</span>
    </>
  )
  const className = compact
    ? 'design-harness-home__card design-harness-home__card--compact'
    : 'design-harness-home__card'
  if (!action) {
    return (
      <a className={className} href={`#/${route}`} onClick={go(route)}>
        {face}
        {meta && !compact ? <span className="design-harness-home__card-meta">{meta}</span> : null}
      </a>
    )
  }
  return (
    <article className={className}>
      <a className="design-harness-home__card-hit" href={`#/${route}`} onClick={go(route)}>
        {face}
      </a>
      <div className="design-harness-home__card-action">{action}</div>
      {meta && !compact ? <span className="design-harness-home__card-meta">{meta}</span> : null}
    </article>
  )
}
