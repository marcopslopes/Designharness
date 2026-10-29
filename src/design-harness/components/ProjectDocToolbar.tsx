import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { Marked, type Tokens } from 'marked'
import {
  FrameCheck,
  FrameChevronDown,
  FrameCloud,
  FrameCodeFile,
  FrameCopy,
  FrameDocument,
  FrameDownload,
  FrameFile,
} from '../harnessIcons'
import type { Project } from '../projectsIndex'
import { isDocPath, isScreenPath, projectHref } from '../projectLinks'
import { Icon, type TablerIconComponent } from '../ui'
import { Breadcrumb } from './DocParts'
import { DocAction } from './DocToolbar'
import { downloadText } from '../localFiles'

/** Breadcrumb + export actions above a project's written pages (About, facts, docs, case study). */

function absolute(href: string): string {
  return href.startsWith('#/') ? `${window.location.origin}${window.location.pathname}${href}` : href
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Markdown → HTML for files outside the app: screen and diagram embeds become links to the live page. */
function toHtml(source: string, projectSlug: string): string {
  const marked = new Marked({
    gfm: true,
    walkTokens(token) {
      if (token.type === 'image' && (isScreenPath(token.href) || isDocPath(token.href))) {
        const image = token as Tokens.Image
        const label = image.text || image.href
        Object.assign(token, {
          type: 'link',
          href: absolute(projectHref(image.href, projectSlug) ?? image.href),
          title: null,
          tokens: [{ type: 'text', raw: label, text: `Open live: ${label}` }],
        })
      } else if (token.type === 'link') {
        token.href = absolute(projectHref(token.href, projectSlug) ?? token.href)
      }
    },
  })
  return marked.parse(source, { async: false })
}

function standaloneDocument(title: string, body: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
body { font-family: system-ui, sans-serif; line-height: 1.55; max-width: 46rem; margin: 3rem auto; padding: 0 1.5rem; }
table { border-collapse: collapse; } th, td { border: 1px solid currentColor; padding: .35rem .6rem; text-align: left; }
img { max-width: 100%; }
</style>
</head>
<body>
<h1>${escapeHtml(title)}</h1>
${body}
</body>
</html>
`
}

/** For browsers that block `clipboard.write`: select the rendered HTML and copy it, so formatting survives the paste. */
function copyRenderedHtml(html: string): boolean {
  const holder = Object.assign(document.createElement('div'), { innerHTML: html, contentEditable: 'true' })
  holder.style.position = 'fixed'
  holder.style.opacity = '0'
  document.body.append(holder)
  const range = document.createRange()
  range.selectNodeContents(holder)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
  const copied = document.execCommand('copy')
  selection?.removeAllRanges()
  holder.remove()
  return copied
}

/** Markdown with the same link rewrites as `toHtml`, for apps that turn pasted Markdown into their own blocks. */
function toPortableMarkdown(title: string, source: string, projectSlug: string): string {
  const live = (href: string) => absolute(projectHref(href, projectSlug) ?? href)
  const body = source
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, (match, label: string, href: string) =>
      isScreenPath(href) || isDocPath(href) ? `[Open live: ${label || href}](${live(href)})` : match,
    )
    .replace(/(?<!!)\[([^\]]*)\]\(([^)\s]+)\)/g, (_, label: string, href: string) => `[${label}](${live(href)})`)
  return `# ${title}\n\n${body}`
}

async function copyHtml(html: string, text: string): Promise<boolean> {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ])
    return true
  } catch {
    return copyRenderedHtml(html)
  }
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const field = Object.assign(document.createElement('textarea'), { value: text })
    field.style.position = 'fixed'
    field.style.opacity = '0'
    document.body.append(field)
    field.select()
    const copied = document.execCommand('copy')
    field.remove()
    return copied
  }
}

type CopyTarget = { id: string; label: string; icon: TablerIconComponent; format: 'html' | 'markdown' }

/** Google Docs and Confluence keep formatting from pasted HTML; Notion converts pasted Markdown into cleaner blocks. */
const COPY_TARGETS: CopyTarget[] = [
  { id: 'google-docs', label: 'Google Docs', icon: FrameCloud, format: 'html' },
  { id: 'confluence', label: 'Confluence', icon: FrameFile, format: 'html' },
  { id: 'notion', label: 'Notion', icon: FrameDocument, format: 'markdown' },
]

function CopyForMenu({ title, source, projectSlug }: { title: string; source: string; projectSlug: string }) {
  const id = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<{ label: string; ok: boolean } | null>(null)

  useEffect(() => {
    const menu = menuRef.current
    const trigger = triggerRef.current
    if (!menu || !trigger) return
    const onToggle = (event: Event) => {
      const open = (event as ToggleEvent).newState === 'open'
      trigger.setAttribute('aria-expanded', String(open))
      if (!open) return
      const box = trigger.getBoundingClientRect()
      menu.style.top = `${box.bottom + 6}px`
      menu.style.left = `${Math.max(8, box.right - menu.offsetWidth)}px`
      menu.querySelector<HTMLElement>('[role="menuitem"]')?.focus()
    }
    menu.addEventListener('toggle', onToggle)
    return () => menu.removeEventListener('toggle', onToggle)
  }, [])

  const copy = async (target: CopyTarget) => {
    menuRef.current?.hidePopover()
    const ok =
      target.format === 'html'
        ? await copyHtml(`<h1>${escapeHtml(title)}</h1>${toHtml(source, projectSlug)}`, source)
        : await copyText(toPortableMarkdown(title, source, projectSlug))
    setStatus({ label: target.label, ok })
    window.setTimeout(() => setStatus(null), 2500)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('[role="menuitem"]')]
    const at = items.indexOf(document.activeElement as HTMLElement)
    const step = event.key === 'ArrowDown' ? 1 : -1
    items[(at + step + items.length) % items.length]?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="design-harness-skill-action"
        popoverTarget={`${id}-menu`}
        aria-haspopup="menu"
        aria-expanded="false"
      >
        <Icon icon={status?.ok ? FrameCheck : FrameCopy} size="sm" />
        <span aria-live="polite">
          {status ? (status.ok ? `Copied — paste into ${status.label}` : 'Copy failed') : 'Copy for…'}
        </span>
        <Icon icon={FrameChevronDown} size="sm" />
      </button>
      <div
        ref={menuRef}
        id={`${id}-menu`}
        className="design-harness-menu"
        popover="auto"
        role="menu"
        aria-label="Copy for"
        onKeyDown={onKeyDown}
      >
        {COPY_TARGETS.map((target) => (
          <button
            key={target.id}
            type="button"
            role="menuitem"
            className="design-harness-menu__item"
            onClick={() => void copy(target)}
          >
            <Icon icon={target.icon} size="sm" />
            <span>{target.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}

export function ProjectDocToolbar({
  project,
  title,
  source,
  fileName,
}: {
  project: Project
  title: string
  /** The page's Markdown; leave empty to show the breadcrumb only. */
  source?: string
  /** Download name without extension, e.g. `mobile-banking-dashboard-case-study`. */
  fileName: string
}) {
  return (
    <div className="design-harness-skill-topbar">
      <Breadcrumb
        items={[
          { label: 'Prototypes', route: 'playground' },
          { label: project.title, route: project.route },
        ]}
      />
      {source ? (
        <div className="design-harness-skill-actions">
          <DocAction icon={FrameDownload} onClick={() => downloadText(`${fileName}.md`, source)}>
            Markdown
          </DocAction>
          <DocAction
            icon={FrameCodeFile}
            onClick={() =>
              downloadText(`${fileName}.html`, standaloneDocument(title, toHtml(source, project.slug)), 'text/html')
            }
          >
            HTML
          </DocAction>
          <CopyForMenu title={title} source={source} projectSlug={project.slug} />
        </div>
      ) : null}
    </div>
  )
}
