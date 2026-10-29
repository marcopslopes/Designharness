import { useEffect, useId, useRef, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { FrameChevronDown, FrameInfo } from '../harnessIcons'
import { Icon, Toggle } from '../ui'

/** Settings building blocks — used by Settings and shown live on the Harness system's pages. */

export type SettingInfo = { rows: { label: string; text: string }[]; note?: string }

/** An ⓘ next to a setting's title that opens a native `popover` saying what each choice does. */
function InfoButton({ title, info }: { title: string; info: SettingInfo }) {
  const id = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const trigger = triggerRef.current
    if (!panel || !trigger) return
    const onToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === 'open'
      trigger.setAttribute('aria-expanded', String(open))
      if (!open) return
      const box = trigger.getBoundingClientRect()
      panel.style.top = `${box.bottom + 6}px`
      panel.style.left = `${Math.min(box.left, window.innerWidth - panel.offsetWidth - 16)}px`
    }
    panel.addEventListener('toggle', onToggle)
    return () => panel.removeEventListener('toggle', onToggle)
  }, [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="design-harness-settings__info"
        popoverTarget={`${id}-info`}
        aria-label={`How "${title}" works`}
        aria-expanded="false"
      >
        <Icon icon={FrameInfo} size="sm" />
      </button>
      <div
        ref={panelRef}
        id={`${id}-info`}
        popover="auto"
        className="design-harness-menu design-harness-settings__info-panel"
      >
        <p className="design-harness-settings__info-title">{title}</p>
        <dl>
          {info.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.text}</dd>
            </div>
          ))}
        </dl>
        {info.note ? <p className="design-harness-settings__info-note">{info.note}</p> : null}
      </div>
    </>
  )
}

function RowTitle({ id, title, info }: { id?: string; title: string; info?: SettingInfo }) {
  return (
    <div className="design-harness-settings__row-title-line">
      <p className="design-harness-settings__row-title" id={id}>
        {title}
      </p>
      {info ? <InfoButton title={title} info={info} /> : null}
    </div>
  )
}

export function Section({
  title,
  description,
  badge,
  children,
}: {
  title: string
  description: string
  badge?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="design-harness-settings__section">
      <header className="design-harness-settings__section-header">
        <div className="design-harness-settings__section-title-row">
          <h2 className="design-harness-settings__section-title">{title}</h2>
          {badge}
        </div>
        <p className="design-harness-settings__section-desc">{description}</p>
      </header>
      <div className="design-harness-settings__section-body">{children}</div>
    </section>
  )
}

export function SettingRow({
  title,
  description,
  control,
  info,
}: {
  title: string
  description: string
  control: ReactNode
  info?: SettingInfo
}) {
  return (
    <div className="design-harness-settings__row">
      <div className="design-harness-settings__row-text">
        <RowTitle title={title} info={info} />
        <p className="design-harness-settings__row-desc">{description}</p>
      </div>
      {control}
    </div>
  )
}

export function ToggleRow({
  title,
  description,
  checked,
  onChange,
  info,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (on: boolean) => void
  info?: SettingInfo
}) {
  const id = useId()
  return (
    <div className="design-harness-settings__row">
      <div className="design-harness-settings__row-text">
        <RowTitle id={`${id}-title`} title={title} info={info} />
        <p className="design-harness-settings__row-desc" id={`${id}-desc`}>
          {description}
        </p>
      </div>
      <Toggle
        checked={checked}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-desc`}
        onClick={() => onChange(!checked)}
      />
    </div>
  )
}

export function SelectField({
  label,
  value,
  options,
  hint,
  onChange,
}: {
  label: string
  value: string
  options: { value: string; label: string }[]
  hint?: string
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <div className="design-harness-field design-harness-settings__select-field">
      <label className="design-harness-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="design-harness-field__shell">
        <select
          id={id}
          className="design-harness-field__input design-harness-settings__select"
          value={value}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Not set</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="design-harness-field__trailing design-harness-settings__select-chevron" aria-hidden>
          <Icon icon={FrameChevronDown} size="xs" />
        </span>
      </div>
      {hint ? (
        <span className="design-harness-field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export function TextAreaField({
  label,
  hint,
  ...textarea
}: { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <div className="design-harness-field">
      <label className="design-harness-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="design-harness-field__shell">
        <textarea
          {...textarea}
          id={id}
          className="design-harness-field__input design-harness-settings__textarea"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
      </div>
      {hint ? (
        <span className="design-harness-field__hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export function Fact({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="design-harness-settings__fact">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
