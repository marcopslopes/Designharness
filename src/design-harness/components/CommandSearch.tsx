import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { FrameSearch } from '../harnessIcons'
import { setDesignHarnessHash } from '../routes'
import { searchStudio, type SearchRow } from '../studioSearch'
import { Icon } from '../ui'

function highlight(label: string, query: string): ReactNode {
  const words = query.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return label
  const pattern = new RegExp(`(${words.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  return label.split(pattern).map((part, index) => (index % 2 ? <mark key={index}>{part}</mark> : part))
}

/** Command center over every prototype, system, and doc. Opens with ⌘⌫ (Ctrl+Backspace). A native modal `<dialog>` owns focus, Escape, and the backdrop. */
export function CommandSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const listId = useId()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const results = useMemo(() => searchStudio(query), [query])
  const optionId = (index: number) => `${listId}-${index}`

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])

  useEffect(() => {
    const close = () => dialog.current?.close()
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  useEffect(() => {
    document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' })
  })

  const go = (row: SearchRow | undefined) => {
    if (!row) return
    dialog.current?.close()
    setDesignHarnessHash(row.route)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!results.length) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setActive((current) => (current + step + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      go(results[active])
    }
  }

  return (
    <dialog
      ref={dialog}
      className="design-harness-command"
      aria-label="Search the harness"
      onClose={() => {
        setQuery('')
        setActive(0)
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        event.preventDefault()
        dialog.current?.close()
      }}
    >
      <div className="design-harness-command__panel">
        <label className="design-harness-command__field">
          <Icon icon={FrameSearch} size="sm" />
          <input
            className="design-harness-command__input"
            role="combobox"
            aria-label="Search the harness"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? optionId(active) : undefined}
            placeholder="Search prototypes, systems, and docs"
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
          <ul className="design-harness-command__list" role="listbox" id={listId} aria-label="Results">
            {results.map((row, index) => (
              <li
                key={row.route}
                id={optionId(index)}
                role="option"
                aria-selected={index === active}
                className="design-harness-command__option"
                onMouseMove={() => setActive(index)}
                onClick={() => go(row)}
              >
                <Icon icon={row.icon} size="sm" />
                <span className="design-harness-command__text">
                  <span className="design-harness-command__label">{highlight(row.label, query)}</span>
                  <span className="design-harness-command__path">{row.path.join(' › ')}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="design-harness-command__empty" role="status">
            {query.trim() ? `Nothing matches “${query.trim()}”.` : 'Type to search prototypes, systems, and docs.'}
          </p>
        )}
        <footer className="design-harness-command__keys" aria-hidden>
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> Select
          </span>
          <span>
            <kbd>↵</kbd> Open
          </span>
          <span className="design-harness-command__keys-end">
            <kbd>esc</kbd> Close
          </span>
        </footer>
      </div>
    </dialog>
  )
}
