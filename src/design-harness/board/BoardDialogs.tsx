import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { FrameDocument, FrameLinkRound, FrameMonitor, FramePhone, FramePresentation, FrameSearch } from './icons'
import { FrameArrowUpRight, FrameClose } from '../harnessIcons'
import { Icon, IconButton } from '../ui'
import { embedUrl } from './files'
import { prototypeEntries, type BoardPrototypeEntry } from './prototypes'

const KIND_ICON = {
  Screen: FramePhone,
  State: FramePhone,
  Storyboard: FramePresentation,
  Doc: FrameDocument,
} as const

/** Native modal `<dialog>` that owns focus, Escape and the backdrop — the command search's look. */
function useModal(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])
  return ref
}

/** Every project screen, state, storyboard and doc, searchable, to place as a live embed. */
export function PrototypePicker({
  open,
  onClose,
  onPick,
}: {
  open: boolean
  onClose: () => void
  onPick: (entry: BoardPrototypeEntry) => void
}) {
  const dialog = useModal(open)
  const listId = useId()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const all = useMemo(() => prototypeEntries(), [])
  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    return all.filter((entry) => {
      const hay = `${entry.label} ${entry.project} ${entry.kind} ${entry.platform ?? ''}`.toLowerCase()
      return words.every((word) => hay.includes(word))
    })
  }, [all, query])
  const optionId = (index: number) => `${listId}-${index}`

  const pick = (entry: BoardPrototypeEntry | undefined) => {
    if (!entry) return
    dialog.current?.close()
    onPick(entry)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!results.length) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((current) => (current + step + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      pick(results[active])
    }
  }

  return (
    <dialog
      ref={dialog}
      className="design-harness-command"
      aria-label="Insert a live prototype"
      onClose={() => {
        setQuery('')
        setActive(0)
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}
    >
      <div className="design-harness-command__panel">
        <label className="design-harness-command__field">
          <Icon icon={FrameSearch} size="sm" />
          <input
            className="design-harness-command__input"
            role="combobox"
            aria-label="Search prototypes"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(active) : undefined}
            placeholder="Search screens, states, storyboards and docs"
            value={query}
            autoFocus
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
          />
        </label>
        {results.length ? (
          <ul className="design-harness-command__list" role="listbox" id={listId} aria-label="Prototypes">
            {results.map((entry, index) => (
              <li
                key={entry.route}
                id={optionId(index)}
                role="option"
                aria-selected={index === active}
                className="design-harness-command__option"
                onMouseMove={() => setActive(index)}
                onClick={() => pick(entry)}
              >
                <Icon
                  icon={entry.size.w > 600 && entry.kind !== 'Doc' ? FrameMonitor : KIND_ICON[entry.kind]}
                  size="sm"
                />
                <span className="design-harness-command__text">
                  <span className="design-harness-command__label">{entry.label}</span>
                  <span className="design-harness-command__path">
                    {entry.project} › {entry.kind}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="design-harness-command__empty" role="status">
            {all.length
              ? `Nothing matches “${query.trim()}”.`
              : 'No prototypes yet. Screens in projects/<slug>/screens/ show up here.'}
          </p>
        )}
        <footer className="design-harness-command__keys" aria-hidden>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> Select
          </span>
          <span>
            <kbd>↵</kbd> Place on board
          </span>
          <span className="design-harness-command__keys-end">
            <kbd>esc</kbd> Close
          </span>
        </footer>
      </div>
    </dialog>
  )
}

export type ViewerTarget = { label: string; src: string; href: string }

/** One artifact at full size over the board, live. Escape or the backdrop closes it. */
export function ArtifactViewer({ target, onClose }: { target?: ViewerTarget; onClose: () => void }) {
  const dialog = useModal(Boolean(target))
  return (
    <dialog
      ref={dialog}
      className="design-harness-command design-harness-board-viewer"
      aria-label={target?.label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}
    >
      {target ? (
        <div className="design-harness-command__panel design-harness-board-viewer__panel">
          <header className="design-harness-board-viewer__head">
            <span className="design-harness-board-viewer__title">{target.label}</span>
            <a className="design-harness-board-viewer__link" href={target.href} target="_blank" rel="noreferrer">
              Open in a new tab
              <Icon icon={FrameArrowUpRight} size="sm" />
            </a>
            <IconButton label="Close (Esc)" onClick={() => dialog.current?.close()}>
              <Icon icon={FrameClose} size="sm" />
            </IconButton>
          </header>
          <iframe className="design-harness-board-viewer__frame" src={target.src} title={`${target.label} — live`} />
        </div>
      ) : null}
    </dialog>
  )
}

/** Paste a Figma, FigJam, Miro or any web link to embed it live. */
export function LinkDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: () => void
  onSubmit: (url: string) => void
}) {
  const dialog = useModal(open)
  const [value, setValue] = useState('')
  const valid = Boolean(embedUrl(value))
  return (
    <dialog
      ref={dialog}
      className="design-harness-command"
      aria-label="Embed a link"
      onClose={() => {
        setValue('')
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}
    >
      <form
        className="design-harness-command__panel"
        onSubmit={(event) => {
          event.preventDefault()
          if (!valid) return
          dialog.current?.close()
          onSubmit(value)
        }}
      >
        <label className="design-harness-command__field">
          <Icon icon={FrameLinkRound} size="sm" />
          <input
            className="design-harness-command__input"
            type="url"
            aria-label="Link to embed"
            placeholder="Paste a Figma, FigJam, Miro or web link"
            value={value}
            autoFocus
            onChange={(event) => setValue(event.target.value)}
          />
        </label>
        <p className="design-harness-command__empty" role="status">
          {value && !valid
            ? 'That doesn’t look like a link yet.'
            : 'Figma and Miro links open through their embed players. Some sites refuse to be embedded.'}
        </p>
        <footer className="design-harness-command__keys" aria-hidden>
          <span>
            <kbd>↵</kbd> Place on board
          </span>
          <span className="design-harness-command__keys-end">
            <kbd>esc</kbd> Close
          </span>
        </footer>
      </form>
    </dialog>
  )
}
