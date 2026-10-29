import { useEffect, useId, useLayoutEffect, useRef, useState, type FormEvent, type MouseEvent, type PointerEvent, type ReactNode } from 'react'
import {
  IconAlertTriangle,
  IconArrowUp,
  IconCheck,
  IconChevronRight,
  IconCopy,
  IconDots,
  IconLoader2,
  IconMicrophone,
  IconPencil,
  IconPlus,
  IconPlug,
  IconRotateClockwise,
  IconX,
} from '@tabler/icons-react'
import { Button } from './Button'
import { Icon } from './Icon'

export type MessageFrom = 'user' | 'agent'
export type MessageStatus = 'sending' | 'sent' | 'failed' | 'running' | 'waiting' | 'stopped' | 'done'

const MESSAGE_STATUS_LABEL: Record<MessageStatus, string> = {
  sending: 'Sending',
  sent: 'Sent',
  failed: 'Not sent',
  running: 'Running',
  waiting: 'Waiting on you',
  stopped: 'Stopped',
  done: 'Done',
}

export type MessageActions = 'inline' | 'menu'

export type MessageProps = {
  from: MessageFrom
  children: ReactNode
  /** Quiet line under an agent turn, or beside a person turn that failed. */
  status?: MessageStatus
  time?: string
  onRetry?: () => void
  /** Desktop shows edit, retry, and copy beside the bubble. Phone opens them from a menu. */
  actions?: MessageActions
  onEdit?: () => void
  onCopy?: () => void
  onOpenActions?: () => void
}

/** One turn. A person is a bubble at the end of the row. An agent is flow, with no header. */
export function Message({ from, children, status, time, onRetry, actions, onEdit, onCopy, onOpenActions }: MessageProps) {
  const press = useRef<number | undefined>(undefined)
  const inline = actions === 'inline' && Boolean(onEdit || onCopy || onRetry)
  const menu = actions === 'menu' && Boolean(onOpenActions)

  useEffect(() => () => window.clearTimeout(press.current), [])

  function startPress(event: PointerEvent<HTMLDivElement>) {
    if (!menu || event.pointerType === 'mouse') return
    press.current = window.setTimeout(() => onOpenActions?.(), 450)
  }

  function cancelPress() {
    window.clearTimeout(press.current)
  }

  return (
    <article className="ds-message" data-from={from} data-status={status} data-actions={actions}>
      {inline ? (
        <div className="ds-message__actions">
          {onRetry ? (
            <button type="button" aria-label="Retry" onClick={onRetry}>
              <Icon icon={IconRotateClockwise} size="xs" />
            </button>
          ) : null}
          {onEdit ? (
            <button type="button" aria-label="Edit" onClick={onEdit}>
              <Icon icon={IconPencil} size="xs" />
            </button>
          ) : null}
          {onCopy ? (
            <button type="button" aria-label="Copy" onClick={onCopy}>
              <Icon icon={IconCopy} size="xs" />
            </button>
          ) : null}
        </div>
      ) : null}
      {menu ? (
        <button type="button" className="ds-message__more" aria-label="Message actions" onClick={onOpenActions}>
          <Icon icon={IconDots} size="sm" />
        </button>
      ) : null}
      <div className="ds-message__main">
        <div
          className="ds-message__body"
          onPointerDown={startPress}
          onPointerUp={cancelPress}
          onPointerLeave={cancelPress}
          onPointerMove={cancelPress}
          onContextMenu={(event) => {
            if (!menu) return
            event.preventDefault()
            onOpenActions?.()
          }}
        >
          {children}
        </div>
        {status || time ? (
          <p className="ds-message__meta">
            {status ? <span>{MESSAGE_STATUS_LABEL[status]}</span> : null}
            {time ? <span>{time}</span> : null}
            {status === 'failed' && onRetry && !inline ? (
              <button type="button" className="ds-message__retry" onClick={onRetry}>
                Retry
              </button>
            ) : null}
          </p>
        ) : null}
      </div>
    </article>
  )
}

export type ConversationProps = {
  label?: string
  children: ReactNode
}

/** The scrollable thread. Stack messages inside it. */
export function Conversation({ label = 'Conversation', children }: ConversationProps) {
  return (
    <div className="ds-conversation" role="log" aria-label={label}>
      {children}
    </div>
  )
}

export type ResponseSuggestion = {
  label: string
  onSelect?: () => void
}

export type ResponseProps = {
  children: ReactNode
  /** A fenced snippet, such as a drafted note. */
  code?: string
  codeLabel?: string
  onCopy?: () => void
  status?: 'completed' | 'failed'
  suggestions?: ResponseSuggestion[]
}

/** The answer inside an agent turn: prose, an optional snippet, and follow-ups. */
export function Response({
  children,
  code,
  codeLabel = 'Note',
  onCopy,
  status,
  suggestions,
}: ResponseProps) {
  return (
    <div className="ds-response">
      <div className="ds-response__prose">{children}</div>
      {code ? (
        <figure className="ds-response__code">
          <figcaption>
            <span>{codeLabel}</span>
            {onCopy ? (
              <button type="button" onClick={onCopy}>
                Copy
              </button>
            ) : null}
          </figcaption>
          <pre>
            <code>{code}</code>
          </pre>
        </figure>
      ) : null}
      {status ? (
        <p className="ds-response__status" data-status={status}>
          <Icon icon={status === 'completed' ? IconCheck : IconX} size="xs" />
          {status === 'completed' ? 'Done' : 'Couldn’t finish'}
        </p>
      ) : null}
      {suggestions && suggestions.length > 0 ? (
        <ul className="ds-response__suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.label}>
              <button type="button" onClick={suggestion.onSelect}>
                <span>{suggestion.label}</span>
                <Icon icon={IconChevronRight} size="sm" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export type ReasoningProps = {
  summary: string
  children?: ReactNode
  defaultOpen?: boolean
}

/** A collapsed trail of how the agent got to the answer. */
export function Reasoning({ summary, children, defaultOpen = false }: ReasoningProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <details
      className="ds-reasoning"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary>
        <Icon className="ds-reasoning__chevron" icon={IconChevronRight} size="xs" />
        <span>{summary}</span>
      </summary>
      {children ? <div className="ds-reasoning__body">{children}</div> : null}
    </details>
  )
}

export type ToolCallStatus = 'running' | 'done' | 'warning' | 'failed'

export type ToolCallProps = {
  label: string
  detail?: string
  duration?: string
  status?: ToolCallStatus
}

const TOOL_ICON = {
  running: IconLoader2,
  done: IconCheck,
  warning: IconAlertTriangle,
  failed: IconX,
} as const

/** One step the agent took. */
export function ToolCall({ label, detail, duration, status = 'done' }: ToolCallProps) {
  return (
    <div className="ds-tool" data-status={status} aria-busy={status === 'running' || undefined}>
      <span className="ds-tool__icon" aria-hidden>
        <Icon className={status === 'running' ? 'ds-tool__spin' : undefined} icon={TOOL_ICON[status]} size="xs" />
      </span>
      <span className="ds-tool__label">
        {label}
        {detail ? <span className="ds-tool__detail">{detail}</span> : null}
      </span>
      {duration ? <span className="ds-tool__time">{duration}</span> : null}
    </div>
  )
}

export type ActivityProps = {
  label?: string
  children: ReactNode
}

/** The live list of steps in a run. */
export function Activity({ label = 'Activity', children }: ActivityProps) {
  return (
    <section className="ds-activity" aria-label={label}>
      {children}
    </section>
  )
}

export type WorkingProps = {
  /** The step that is happening now. Further steps replace it, one at a time. */
  steps: string[]
}

/** A quiet hold while the agent works. One line, not a trail. */
export function Working({ steps }: WorkingProps) {
  const [index, setIndex] = useState(0)
  const step = steps[Math.min(index, steps.length - 1)] ?? ''

  useEffect(() => {
    if (index >= steps.length - 1) return
    const timer = window.setTimeout(() => setIndex((current) => current + 1), 1400)
    return () => window.clearTimeout(timer)
  }, [index, steps.length])

  return (
    <p className="ds-working" role="status">
      <span className="ds-working__dot" aria-hidden />
      <span>{step}</span>
    </p>
  )
}

export type ResultPhoto = { src: string; alt: string }
export type ResultAction = { label: string; onClick?: () => void }

export type ResultProps = {
  name: string
  meta: string
  photos?: ResultPhoto[]
  evidence: ReactNode
  sourceLabel: string
  sourceMore?: number
  onSource?: () => void
  service: string
  when: string
  primary: ResultAction
  secondary: ResultAction
}

/** A result inside an agent turn. The claim names its source. No badge picks a winner. */
export function Result({
  name,
  meta,
  photos,
  evidence,
  sourceLabel,
  sourceMore = 0,
  onSource,
  service,
  when,
  primary,
  secondary,
}: ResultProps) {
  return (
    <article className="ds-result">
      <header className="ds-result__id">
        <h3>{name}</h3>
        <p>{meta}</p>
      </header>
      {photos && photos.length > 0 ? (
        <div className="ds-result__photos">
          {photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      ) : null}
      <p className="ds-result__evidence">{evidence}</p>
      <SourceChip label={sourceLabel} more={sourceMore} onOpen={onSource} />
      <p className="ds-result__when">
        <span>{service}</span>
        <span>{when}</span>
      </p>
      <div className="ds-result__actions">
        <Button intent="primary" size="md" fullWidth type="button" onClick={primary.onClick}>
          {primary.label}
        </Button>
        <Button intent="secondary" size="md" fullWidth type="button" onClick={secondary.onClick}>
          {secondary.label}
        </Button>
      </div>
    </article>
  )
}

export type SourceChipProps = {
  label: string
  more?: number
  onOpen?: () => void
}

/** The place a claim came from. */
export function SourceChip({ label, more = 0, onOpen }: SourceChipProps) {
  const text = more > 0 ? `${label} +${more}` : label
  return (
    <button type="button" className="ds-source" onClick={onOpen}>
      {text}
    </button>
  )
}

export type SourceItem = { label: string; detail: string }

/** The sources behind one claim. */
export function SourceList({ items }: { items: SourceItem[] }) {
  return (
    <ul className="ds-sources">
      {items.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <span>{item.detail}</span>
        </li>
      ))}
    </ul>
  )
}

export type ThisOrThatOption = { id: string; label: string; image: string; alt: string }

export type ThisOrThatProps = {
  options: ThisOrThatOption[]
  onPick?: (id: string) => void
  onNone?: () => void
  onEither?: () => void
  onUndo?: () => void
  canUndo?: boolean
}

/** A visual narrowing. None of these, and Either is fine, are always ways out. */
export function ThisOrThat({ options, onPick, onNone, onEither, onUndo, canUndo = false }: ThisOrThatProps) {
  return (
    <div className="ds-choice">
      <div className="ds-choice__links">
        <button type="button" onClick={onNone}>
          {options.length > 2 ? 'None of these' : 'Neither'}
        </button>
        <button type="button" onClick={onEither}>
          Either is fine
        </button>
        {canUndo ? (
          <button type="button" onClick={onUndo}>
            Undo
          </button>
        ) : null}
      </div>
      <div className="ds-choice__grid">
        {options.map((option) => (
          <button key={option.id} type="button" className="ds-choice__option" onClick={() => onPick?.(option.id)}>
            <img src={option.image} alt={option.alt} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export type PromptInputProps = {
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  /** Chips above the field: where the agent is working, which client. */
  context?: ReactNode
  recording?: boolean
  onAttach?: (event: MouseEvent<HTMLButtonElement>) => void
  onConnectors?: (event: MouseEvent<HTMLButtonElement>) => void
  onVoice?: (event: MouseEvent<HTMLButtonElement>) => void
  onCancelRecording?: (event: MouseEvent<HTMLButtonElement>) => void
  onConfirmRecording?: (event?: MouseEvent<HTMLButtonElement>) => void
  attachLabel?: string
  connectorsLabel?: string
  voiceLabel?: string
  sendLabel?: string
  disabled?: boolean
}

/** The composer. Attach, connectors, and voice are the actions around the field. */
export function PromptInput({
  label = 'Message',
  placeholder = 'Ask about a booking',
  value,
  defaultValue = '',
  onValueChange,
  onSubmit,
  context,
  recording = false,
  onAttach,
  onConnectors,
  onVoice,
  onCancelRecording,
  onConfirmRecording,
  attachLabel = 'Add',
  connectorsLabel = 'Connectors',
  voiceLabel = 'Voice',
  sendLabel = 'Send',
  disabled = false,
}: PromptInputProps) {
  const fieldId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const fieldRef = useRef<HTMLTextAreaElement>(null)
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const [stacked, setStacked] = useState(false)
  const text = value ?? uncontrolled
  const canSend = !disabled && (recording || text.trim().length > 0)

  useLayoutEffect(() => {
    const form = formRef.current
    const field = fieldRef.current
    if (!form || !field || recording) {
      setStacked(false)
      return
    }
    const style = getComputedStyle(field)
    const canvas = document.createElement('canvas').getContext('2d')
    if (!canvas) return
    canvas.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
    const groups = form.querySelectorAll('.ds-prompt__group')
    const groupWidth = Array.from(groups).reduce((sum, group) => sum + (group as HTMLElement).offsetWidth, 0)
    const available = form.clientWidth - groupWidth - 48
    setStacked(text.includes('\n') || canvas.measureText(text).width > available)
  }, [recording, text])

  function update(next: string) {
    onValueChange?.(next)
    if (value === undefined) setUncontrolled(next)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!canSend) return
    if (recording) {
      onConfirmRecording?.()
      return
    }
    onSubmit?.(text.trim())
  }

  return (
    <form ref={formRef} className="ds-prompt" data-recording={recording || undefined} data-stacked={stacked || undefined} onSubmit={submit}>
      {context ? <div className="ds-prompt__context">{context}</div> : null}
      {recording ? null : (
        <textarea
          ref={fieldRef}
          id={fieldId}
          aria-label={label}
          rows={stacked ? 3 : 1}
          placeholder={placeholder}
          value={text}
          disabled={disabled}
          onChange={(event) => update(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              event.currentTarget.form?.requestSubmit()
            }
          }}
        />
      )}
      <div className="ds-prompt__bar">
        <div className="ds-prompt__group">
          {recording ? (
            <button type="button" className="ds-prompt__icon" aria-label="Cancel recording" onClick={(event) => onCancelRecording?.(event)}>
              <Icon icon={IconX} size="sm" />
            </button>
          ) : (
            <>
              <button type="button" className="ds-prompt__icon" aria-label={attachLabel} onClick={(event) => onAttach?.(event)}>
                <Icon icon={IconPlus} size="sm" />
              </button>
              <button type="button" className="ds-prompt__icon" aria-label={connectorsLabel} onClick={(event) => onConnectors?.(event)}>
                <Icon icon={IconPlug} size="sm" />
              </button>
            </>
          )}
        </div>
        {recording ? (
          <div className="ds-prompt__wave" role="status" aria-label="Recording">
            {Array.from({ length: 28 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        ) : null}
        <div className="ds-prompt__group">
          {recording ? (
            <button type="button" className="ds-prompt__icon" aria-label="Use this recording" onClick={(event) => onConfirmRecording?.(event)}>
              <Icon icon={IconCheck} size="sm" />
            </button>
          ) : (
            <button type="button" className="ds-prompt__icon" aria-label={voiceLabel} onClick={(event) => onVoice?.(event)}>
              <Icon icon={IconMicrophone} size="sm" />
            </button>
          )}
          <button type="submit" className="ds-prompt__send" aria-label={sendLabel} disabled={!canSend}>
            <Icon icon={IconArrowUp} size="sm" />
          </button>
        </div>
      </div>
    </form>
  )
}
