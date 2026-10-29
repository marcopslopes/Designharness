import { useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import { FrameCheck, FrameCopy, FrameUpload } from '../harnessIcons'
import { Icon, type TablerIconComponent } from '../ui'

/** Title-row actions for doc pages — quiet text + icon buttons. */

const ENDPOINT = '/__harness/settings'

export function DocAction({
  icon,
  children,
  onClick,
  disabled,
}: {
  icon: TablerIconComponent
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button type="button" className="design-harness-skill-action" disabled={disabled} onClick={onClick}>
      <Icon icon={icon} size="sm" />
      <span>{children}</span>
    </button>
  )
}

export function CopyAction({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'err'>('idle')
  const copy = async () => {
    let ok: boolean
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
      const area = document.createElement('textarea')
      area.value = text
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.left = '-999px'
      document.body.appendChild(area)
      area.select()
      ok = document.execCommand('copy')
      area.remove()
    }
    if (!ok) {
      setState('err')
      window.prompt('Paste this into Cursor, Claude Code, or Codex:', text)
    } else {
      setState('ok')
    }
    window.setTimeout(() => setState('idle'), 2000)
  }
  return (
    <button type="button" className="design-harness-skill-action" onClick={() => void copy()}>
      <Icon icon={state === 'ok' ? FrameCheck : FrameCopy} size="sm" />
      <span aria-live="polite">{state === 'ok' ? 'Copied' : state === 'err' ? 'Copy failed' : label}</span>
    </button>
  )
}

export type ReplaceResult = { file: string; backup: string | null }

/**
 * Picks a `.md` file and saves it as `context/org-pack.local/<name>`, keeping
 * the old copy in `.backups/`. Dev server only — hidden in a build.
 */
export function ReplaceAction({
  name,
  onReplaced,
  onError,
}: {
  name: string
  onReplaced: (result: ReplaceResult) => void
  onError: (message: string) => void
}) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  if (!import.meta.env.DEV) return null

  const pick = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setBusy(true)
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replacePackFile: { name, content: await file.text() } }),
      })
      const body = (await response.json()) as ReplaceResult & { error?: string }
      if (!response.ok) throw new Error(body.error ?? 'Could not save the file')
      onReplaced(body)
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Could not save the file')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <DocAction icon={FrameUpload} disabled={busy} onClick={() => input.current?.click()}>
        {busy ? 'Saving…' : 'Replace with yours'}
      </DocAction>
      <input
        ref={input}
        type="file"
        accept=".md,text/markdown,text/plain"
        hidden
        aria-label={`Choose a file to replace ${name}`}
        onChange={(event) => void pick(event)}
      />
    </>
  )
}
