import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { FrameClose } from '../harnessIcons'
import { Button, Callout, Field, Icon } from '../ui'

const ENDPOINT = '/__harness/new-project'

/**
 * Starts a project from the app: the dev server makes its folder from `projects/_template/`,
 * then opens the brief.
 * Dev only; the endpoint lives in `scripts/harness-settings-plugin.ts`.
 */
export function NewProjectButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])

  if (!import.meta.env.DEV) return null

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })
      const body = (await response.json()) as { route?: string; error?: string }
      if (!response.ok || !body.route) throw new Error(body.error ?? 'Could not start the project')
      window.location.hash = `#/${body.route}`
      window.location.reload()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not start the project')
      setBusy(false)
    }
  }

  return (
    <>
      <Button type="button" intent="primary" size="md" onClick={() => setOpen(true)}>
        New project
      </Button>
      <dialog
        ref={dialog}
        className="design-harness-system-home__dialog"
        aria-labelledby={titleId}
        onClose={() => {
          setOpen(false)
          setError('')
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}
      >
        <form
          className="design-harness-system-home__panel design-harness-form"
          onSubmit={(event) => void submit(event)}
        >
          <header className="design-harness-system-home__dialog-head">
            <div>
              <h2 id={titleId} className="design-harness-system-home__dialog-title">
                New project
              </h2>
              <p className="design-harness-system-home__dialog-lead">
                Name it, and the brief opens. Your other projects stay as they are.
              </p>
            </div>
            <Button type="button" intent="ghost" size="md" aria-label="Close" onClick={() => setOpen(false)}>
              <Icon icon={FrameClose} size="sm" />
            </Button>
          </header>
          <Field
            label="Project name"
            placeholder="Invite friends"
            value={name}
            maxLength={60}
            autoFocus
            required
            invalid={Boolean(error)}
            onChange={(event) => setName(event.target.value)}
          />
          {error ? <Callout tone="danger">{error}</Callout> : null}
          <footer className="design-harness-system-home__dialog-actions">
            <Button type="button" intent="ghost" size="md" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" intent="primary" size="md" disabled={busy || !name.trim()}>
              {busy ? 'Starting' : 'Start project'}
            </Button>
          </footer>
        </form>
      </dialog>
    </>
  )
}
