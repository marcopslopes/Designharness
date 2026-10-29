import { useEffect, useId, useRef, useState, type ChangeEvent, type ReactNode } from 'react'
import {
  FrameArrowRight,
  FrameBook,
  FrameChevronRight,
  FrameClose,
  FrameCode,
  FrameColumns,
  FrameDownload,
  FrameFile,
  FrameMonitor,
  FramePalette,
  FramePhone,
  FrameSettings,
  FrameSidebarOpen,
  FrameStars,
  FrameText,
  FrameType,
  FrameWidgets,
  FrameWindow,
} from '../harnessIcons'
import { Breadcrumb, PrevNext, type PageLink } from '../components/DocParts'
import { getSectionNavSections } from '../designHarnessNavConfig'
import { CopyAction, DocAction, ReplaceAction } from '../components/DocToolbar'
import { downloadText } from '../localFiles'
import { HelpCard } from '../components/HomeParts'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesignHarnessMarkdown } from '../components/DesignHarnessMarkdown'
import { isWideDemo, SYSTEM_DEMOS, systemDemoKey } from '../systemDemoRegistry'
import { fileName, loadDocFile, LOCAL_PACK, packFileName } from '../docFiles'
import { splitSkillFile, getContextDoc, isContextDocRoute } from '../contextDocs'
import { rewriteHowtoMarkdownLinks } from '../howtoDocs'
import { getDesignHarnessHashQuery, setDesignHarnessHash } from '../routes'
import {
  DEFAULT_SYSTEM,
  DESIGN_SYSTEMS,
  isRealItem,
  projectsUsingSystem,
  SYSTEM_GROUP_LABEL,
  systemsForProject,
  type DesignSystem,
  type SystemItem,
  type SystemItemStatus,
} from '../designSystems'
import { Badge, Button, Callout, Field, Icon, Text, type TablerIconComponent } from '../ui'
import { SharedCatalogPage } from './sharedCatalog'
import { hasSharedCatalog } from './sharedCatalogRoutes'
import introArt from '../assets/systems/intro-dark.webp'

const count = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

const systemFile = (system: DesignSystem) => `context/design-system/systems/${system.id}.md`

const SYSTEM_ICONS: Record<string, TablerIconComponent> = {
  mobile: FramePhone,
  desktop: FrameMonitor,
  brand: FramePalette,
  harness: FrameWindow,
  'harness-brand': FrameText,
}

const isExample = (system: DesignSystem) => system.badge === 'Example'

function usage(system: DesignSystem): string {
  if (isExample(system)) return 'Example — no prototypes use it'
  if (!system.platforms.length) return 'Used by Design Harness'
  const used = projectsUsingSystem(system).length
  return used ? `Used by ${count(used, 'prototype')}` : 'Not used yet'
}

const INTRO = [
  { id: 'mobile', title: 'Mobile', text: 'Phone and tablet. Every prototype starts here.' },
  { id: 'desktop', title: 'Desktop', text: 'Web screens inside the browser frame.' },
  { id: 'harness', title: 'Harness', text: 'This page’s frame. Prototypes never use it.' },
] as const

function SystemsIntro() {
  const start = DEFAULT_SYSTEM
  return (
    <section className="design-harness-systems-intro" aria-labelledby="systems-intro-title">
      <p className="design-harness-systems-intro__eyebrow">Start here</p>
      <div className="design-harness-systems-intro__card">
        <div className="design-harness-systems-intro__stage" aria-hidden>
          <img src={introArt} alt="" />
        </div>
        <div className="design-harness-systems-intro__copy">
          <h2 id="systems-intro-title" className="design-harness-systems-intro__title">
            A system for every screen
          </h2>
          <ul className="design-harness-systems-intro__points">
            {INTRO.map((item) => (
              <li key={item.id} className="design-harness-systems-intro__point">
                <span className="design-harness-systems-intro__point-icon">
                  <Icon icon={SYSTEM_ICONS[item.id] ?? FrameWindow} size="sm" />
                </span>
                <span className="design-harness-systems-intro__point-title">{item.title}</span>
                <p className="design-harness-systems-intro__point-text">{item.text}</p>
              </li>
            ))}
          </ul>
          {start ? (
            <Button
              className="design-harness-systems-intro__go"
              endIcon={<Icon icon={FrameArrowRight} size="sm" />}
              onClick={() => setDesignHarnessHash(start.route)}
            >
              Open {start.name}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

/** One card per `context/design-system/systems/*.md`. */
export function SystemsPage() {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage
        variant="list"
        title="Systems"
        lead="Tokens, components, frames, and rules for each kind of prototype. Edit a system's file to change it."
        toc={false}
      >
        <SystemsIntro />
        <div className="design-harness-home__cards">
          {DESIGN_SYSTEMS.map((system) => (
            <HelpCard
              key={system.id}
              route={system.route}
              title={system.name}
              description={system.summary}
              meta={usage(system)}
              icon={SYSTEM_ICONS[system.id] ?? FrameWindow}
            />
          ))}
        </div>
      </DesignHarnessDocPage>
    </div>
  )
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div className="design-harness-system__stat">
      <span className="design-harness-system__stat-value">{value}</span>
      <span className="design-harness-system__stat-label">{label}</span>
    </div>
  )
}

function OverviewCard({ title, stats, children }: { title: string; stats?: ReactNode; children: ReactNode }) {
  return (
    <section className="design-harness-system__card">
      <h2 className="design-harness-system__card-title">{title}</h2>
      {stats ? <div className="design-harness-system__stats">{stats}</div> : null}
      <div className="design-harness-system__card-body">{children}</div>
    </section>
  )
}

function usedByMarkdown(system: DesignSystem): string {
  const projects = projectsUsingSystem(system)
  if (!projects.length) {
    return `No prototype yet. A prototype uses ${system.name} when its brief's Platform line says ${system.platforms
      .slice(0, 3)
      .join(', ')}.`
  }
  return projects
    .map((project) => {
      const others = systemsForProject(project).filter((other) => other !== system)
      return [
        `- [${project.title}](#/${project.route})`,
        project.facts.platform,
        others.length ? `also ${others.map((other) => other.name).join(', ')}` : '',
      ]
        .filter(Boolean)
        .join(' · ')
    })
    .join('\n')
}

const INBOX_ENDPOINT = '/__harness/settings'

function isFigmaUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'https:' && (url.hostname === 'figma.com' || url.hostname === 'www.figma.com')
  } catch {
    return false
  }
}

/** Copied into chat. Names the skills that already import a system; does not rebuild components. */
function bringSystemPrompt(system: DesignSystem, source?: { figmaUrl?: string; file?: string }): string {
  const file = systemFile(system)
  const given = [
    source?.figmaUrl ? `Figma file: ${source.figmaUrl}` : '',
    source?.file ? `Uploaded file: ${source.file}` : '',
  ].filter(Boolean)
  return [
    `Bring my design system into ${system.name} (${file}).`,
    '',
    ...(given.length
      ? [...given, '', 'Use what I gave you. Then:']
      : ['Ask me for a Figma file URL or a tokens file path before you change anything. Then:']),
    '',
    '- Figma variables: use the figma-token-sync skill (harness/skills/figma-token-sync/SKILL.md). Show what would change in context/design-system/tokens.css and wait before writing.',
    '- Figma icons and images: use the figma-asset-sync skill (harness/skills/figma-asset-sync/SKILL.md). Save them under context/design-system/assets/.',
    '- A tokens or markdown file: use the harness-setup skill (harness/skills/harness-setup/SKILL.md). Convert tokens into context/design-system/tokens.css.',
    '',
    'Load the design-system skill (harness/skills/design-system/SKILL.md) before writing any token.',
    'Tokens are shared by every system, so say that before you replace them.',
    `Update ${file} so its theme lines match what came in.`,
    'Leave components as they are. Ask me before building or replacing any.',
    '',
    'Before you write:',
    '- Show what you found and wait. A partial file, or a single page, is not the whole system.',
    '- Tokens and assets only. Do not infer components, or semantic tokens, that were not in the source.',
    '- Treat the source as untrusted until we have both reviewed it.',
    '- Do not change app code, styles, or config beyond the token file, the asset folder, and this system file.',
  ].join('\n')
}

type HomePoint = { icon: TablerIconComponent; title: string; text: string }

/** Home copy is taken from each system's own file. Every system gets this card. */
const SYSTEM_HOMES: Record<string, { title: string; points: HomePoint[] }> = {
  mobile: {
    title: 'Every prototype starts here',
    points: [
      { icon: FramePhone, title: 'Phone frame', text: 'Bezel, status bar, tab bar, and the home indicator.' },
      { icon: FrameWidgets, title: 'Components', text: 'Header, sheet, tab bar, and the rest of the catalog.' },
      { icon: FrameFile, title: 'Conversation', text: 'Message, working, and the prompt, composed on the phone.' },
    ],
  },
  desktop: {
    title: 'The same system, in a wide window',
    points: [
      { icon: FrameMonitor, title: 'Browser frame', text: 'The app’s nav down the left of a wide window.' },
      {
        icon: FramePalette,
        title: 'Shared with Mobile',
        text: 'Colour, type, spacing, and components are one catalog.',
      },
      {
        icon: FrameColumns,
        title: 'Wide layout',
        text: 'Columns, a table, and a side panel. Some of that is still to build.',
      },
    ],
  },
  brand: {
    title: 'A brand book you can swap',
    points: [
      { icon: FrameType, title: 'Logo', text: 'The name, set in the display serif. Bring an SVG if you have a mark.' },
      { icon: FramePalette, title: 'Colour and type', text: 'Six colours, a display serif, and Geist for text.' },
      {
        icon: FrameWidgets,
        title: 'Marketing blocks',
        text: 'Hero, bands, and the rest of the book. Northline fills them until you swap it.',
      },
    ],
  },
  harness: {
    title: 'The frame around this page',
    points: [
      { icon: FrameSidebarOpen, title: 'Rail and sidebars', text: 'Search, the systems, skills, and the docs.' },
      {
        icon: FrameSettings,
        title: 'Home and Settings',
        text: 'The home page, and settings that stay on this machine.',
      },
      { icon: FramePhone, title: 'Not a prototype', text: 'Screens inside a prototype use Mobile or Desktop.' },
    ],
  },
  'harness-brand': {
    title: 'How the harness presents itself',
    points: [
      { icon: FrameText, title: 'Wordmark', text: 'Design Harness in Geist. No drawn mark.' },
      { icon: FrameStars, title: 'Launch pages', text: 'Hero, announcement bar, and the marketing blocks.' },
      { icon: FramePalette, title: 'Not the company brand', text: 'Company marketing uses the Brand system.' },
    ],
  },
}

/** Figma link and a local file. Copies a prompt. The file lands in an inbox; it does not become the system. */
function BringSystem({ system }: { system: DesignSystem }) {
  const [figma, setFigma] = useState('')
  const [picked, setPicked] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [copied, setCopied] = useState(false)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const figmaBad = figma.trim() !== '' && !isFigmaUrl(figma)

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])

  const reveal = (pointer: boolean) => {
    const node = dialog.current
    if (!node) return
    delete node.dataset.state
    node.dataset.motion = pointer ? 'on' : 'off'
    setOpen(true)
  }

  const dismiss = (pointer: boolean) => {
    const node = dialog.current
    if (!node?.open) return
    const travel = pointer && node.dataset.motion !== 'off'
    if (!travel || node.dataset.state === 'closed') {
      if (!travel) node.close()
      return
    }
    node.dataset.state = 'closed'
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      node.removeEventListener('animationend', onEnd)
      node.close()
    }
    const onEnd = (event: AnimationEvent) => {
      if (event.target === node) finish()
    }
    node.addEventListener('animationend', onEnd)
    window.setTimeout(finish, 400)
  }

  const pick = (event: ChangeEvent<HTMLInputElement>) => {
    setPicked(event.target.files?.[0] ?? null)
    setCopied(false)
    setNotice('')
    setError('')
  }

  const copy = async () => {
    if (figmaBad) return
    setBusy(true)
    setError('')
    setCopied(false)
    setNotice('')
    try {
      let saved = ''
      if (picked) {
        if (!import.meta.env.DEV) throw new Error('A file can be saved while the harness runs locally.')
        const response = await fetch(INBOX_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ systemSource: { name: picked.name, content: await picked.text() } }),
        })
        const body = (await response.json()) as { file?: string; error?: string }
        if (!response.ok || !body.file) throw new Error(body.error ?? 'Could not save the file')
        saved = body.file
        setNotice(`Saved to ${saved}.`)
      }
      const text = bringSystemPrompt(system, { figmaUrl: isFigmaUrl(figma) ? figma.trim() : undefined, file: saved })
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not copy the prompt')
    } finally {
      setBusy(false)
    }
  }

  const fields = (
    <>
      <Field
        label="Figma link"
        type="url"
        inputMode="url"
        value={figma}
        invalid={figmaBad}
        placeholder="https://www.figma.com/design/…"
        hint={figmaBad ? 'Use a https://figma.com link.' : 'The file that holds the variables.'}
        onChange={(event) => {
          setFigma(event.target.value)
          setCopied(false)
          setError('')
        }}
      />
      <div className="design-harness-field">
        <label className="design-harness-field__label" htmlFor={`bring-${system.id}-file`}>
          Tokens or markdown file
        </label>
        <input
          id={`bring-${system.id}-file`}
          type="file"
          accept=".md,.markdown,.css,.json,.txt,text/markdown,text/plain,text/css,application/json"
          className="design-harness-settings__file"
          onChange={pick}
        />
        <p className="design-harness-system__note">
          {picked ? picked.name : '.md, .css, or .json.'} Saved on this machine only.
        </p>
      </div>
    </>
  )

  const status = (
    <>
      {notice ? (
        <p role="status" className="design-harness-system__note">
          {notice}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="design-harness-system__note">
          {error}
        </p>
      ) : null}
    </>
  )

  const savedPath = notice.startsWith('Saved to ') ? notice.slice('Saved to '.length, -1) : ''
  const preview = bringSystemPrompt(system, {
    figmaUrl: isFigmaUrl(figma) ? figma.trim() : undefined,
    file: savedPath || undefined,
  })
    .split('\n')
    .slice(0, 6)
    .join('\n')

  return (
    <>
      <button
        type="button"
        className="design-harness-system-home__bring"
        onClick={(event) => reveal(event.detail !== 0)}
      >
        <span className="design-harness-system-home__bring-icon" aria-hidden>
          <Icon icon={FrameFile} size="sm" />
        </span>
        <span className="design-harness-system-home__bring-copy">
          <span className="design-harness-system-home__bring-title">Bring your system</span>
          <span className="design-harness-system-home__bring-text">
            A Figma link or a tokens file. Nothing changes until you paste the prompt in chat.
          </span>
        </span>
        <Icon icon={FrameChevronRight} size="sm" className="design-harness-system-home__bring-chevron" />
      </button>
      <dialog
        ref={dialog}
        className="design-harness-system-home__dialog"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onCancel={(event) => {
          event.preventDefault()
          dismiss(false)
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dismiss(event.detail !== 0)
        }}
      >
        <div className="design-harness-system-home__panel design-harness-form">
          <header className="design-harness-system-home__dialog-head">
            <div>
              <h2 id={titleId} className="design-harness-system-home__dialog-title">
                Bring your system
              </h2>
              <p className="design-harness-system-home__dialog-lead">
                Add a Figma link or a file, then copy the prompt into chat.
              </p>
            </div>
            <Button
              type="button"
              intent="ghost"
              size="md"
              aria-label="Close"
              onClick={(event) => dismiss(event.detail !== 0)}
            >
              <Icon icon={FrameClose} size="sm" />
            </Button>
          </header>
          <ol className="design-harness-system-home__steps">
            <li>
              <span className="design-harness-system-home__step-no" aria-hidden>
                1
              </span>
              <div>
                <h3 className="design-harness-system-home__step-title">Add a source</h3>
                <p className="design-harness-system-home__step-text">One is enough. Both is fine.</p>
                {fields}
              </div>
            </li>
            <li>
              <span className="design-harness-system-home__step-no" aria-hidden>
                2
              </span>
              <div>
                <h3 className="design-harness-system-home__step-title">Copy this prompt</h3>
                <p className="design-harness-system-home__step-text">
                  Paste it in chat. The system stays as it is until then.
                </p>
                <pre className="design-harness-system-home__preview">{preview}</pre>
              </div>
            </li>
          </ol>
          {status}
          <footer className="design-harness-system-home__dialog-actions">
            <Button type="button" intent="ghost" size="md" onClick={(event) => dismiss(event.detail !== 0)}>
              Close
            </Button>
            <Button type="button" intent="primary" size="md" disabled={figmaBad || busy} onClick={() => void copy()}>
              {busy ? 'Saving' : copied ? 'Copied' : 'Copy prompt'}
            </Button>
          </footer>
        </div>
      </dialog>
    </>
  )
}

/** The first screen on every system: a short card, then Bring your system. */
function SystemHome({ system }: { system: DesignSystem }) {
  const home = SYSTEM_HOMES[system.id]
  if (!home) return null
  const titleId = `${system.id}-home-title`
  return (
    <div className="design-harness-system-home">
      <section
        className="design-harness-systems-intro__card design-harness-system-home__card"
        aria-labelledby={titleId}
      >
        <div className="design-harness-systems-intro__copy">
          <h2 id={titleId} className="design-harness-systems-intro__title">
            {home.title}
          </h2>
          <ul className="design-harness-systems-intro__points">
            {home.points.map((point) => (
              <li key={point.title} className="design-harness-systems-intro__point">
                <span className="design-harness-systems-intro__point-icon">
                  <Icon icon={point.icon} size="sm" />
                </span>
                <span className="design-harness-systems-intro__point-title">{point.title}</span>
                <p className="design-harness-systems-intro__point-text">{point.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BringSystem key={system.id} system={system} />
    </div>
  )
}

/** A system's overview: what guides it, what it's made of, where it's used, then its file's notes. */
export function SystemPage({ system }: { system: DesignSystem }) {
  const { context, skills, theme, assets, components, ai } = system.items
  const realComponents = components.filter(isRealItem).length
  const placeholders = [...theme, ...assets, ...components, ...ai].filter(
    (item) => item.status === 'planned' || item.status === 'needs-input',
  ).length
  const borrowsMobile = [...theme, ...assets, ...components, ...ai].some((item) => item.status === 'from-mobile')

  return (
    <DesignHarnessDocPage
      title={system.name}
      lead={system.summary}
      meta={
        <span className="design-harness-system__meta">
          {system.badge ? <Badge>{system.badge}</Badge> : null}
          <code className="design-harness__code">{systemFile(system)}</code>
        </span>
      }
      toc={false}
    >
      <SystemHome system={system} />
      <div className="design-harness-system__cards">
        <OverviewCard
          title="Instructions"
          stats={
            <>
              <Stat value={context.length} label="Context documents" />
              <Stat value={skills.length} label="Skills" />
            </>
          }
        >
          <p>What the harness reads before it builds with {system.name}, and the skills that do the building.</p>
        </OverviewCard>

        <OverviewCard
          title="Toolkit"
          stats={
            <>
              <Stat value={components.length} label="Components" />
              {ai.length ? <Stat value={ai.length} label="AI" /> : null}
              <Stat value={system.tokenCount} label="Theme tokens" />
              <Stat value={assets.length} label="Assets" />
            </>
          }
        >
          <p>
            {realComponents} of {count(components.length, 'component')} built.{' '}
            {placeholders
              ? `${count(placeholders, 'placeholder')} mark what's still to build or bring.`
              : 'Nothing left to build.'}
          </p>
          {borrowsMobile && DEFAULT_SYSTEM && DEFAULT_SYSTEM !== system ? (
            <p className="design-harness-system__note">
              Shares the rest with <a href={`#/${DEFAULT_SYSTEM.route}`}>{DEFAULT_SYSTEM.name}</a>.
            </p>
          ) : null}
        </OverviewCard>

        <OverviewCard title="Where it's used">
          {isExample(system) ? (
            <p>Nowhere — it's an example. Prototypes start using it once you swap in your own brand.</p>
          ) : system.platforms.length ? (
            <DesignHarnessMarkdown source={usedByMarkdown(system)} />
          ) : (
            <p>Design Harness's rail, sidebars, Settings, home, and docs use this system. Prototypes never do.</p>
          )}
        </OverviewCard>
      </div>

      <DesignHarnessMarkdown source={system.source} stripLeadingH1 />
    </DesignHarnessDocPage>
  )
}

function openInPlace(target: string): string {
  const skills = isContextDocRoute(target) && getContextDoc(target).kind === 'skill'
  return `[Open it in ${skills ? 'Skills' : 'Documentation'}](#/${target})`
}

const STATUS_LABEL: Record<SystemItemStatus, string> = {
  page: 'Has a page',
  built: 'Built',
  doc: 'Document',
  'from-mobile': 'Shared',
  planned: 'Placeholder',
  'needs-input': 'Needs input',
}

const NEEDS: Record<string, string> = {
  theme: 'the values from your brand guide — colours as hex, type families and sizes',
  assets: 'the files themselves — SVG for logos and icons, licensed font files, approved images',
  components: 'a reference — a Figma frame, a live page, or a screenshot of the approved design',
}

function itemBody(system: DesignSystem, item: SystemItem, hasDemo: boolean): string {
  const ask = `To build it, ask the harness: “build the ${item.label.toLowerCase()} for the ${system.name} system”. It adds it here and updates \`${systemFile(system)}\`.`
  switch (item.status) {
    case 'page':
      return `Open the [${item.label} page](#/${item.target}).`
    case 'built':
      return hasDemo ? `Lives in \`${item.file}\`.` : `Built. Lives in \`${item.file}\`.\n\nNo demo for it yet.`
    case 'doc':
      return item.target ? `Lives in \`${item.file}\`. ${openInPlace(item.target)}` : `Lives in \`${item.file}\`.`
    case 'from-mobile':
      return item.target
        ? `Same design system. [Open ${item.label}](#/${item.target}).`
        : `Same design system as Mobile.`
    case 'needs-input':
      return `Not set up. The harness won't invent it — it needs ${NEEDS[item.group] ?? 'your material'}.\n\nShare it in chat and ask the harness to add the ${item.label.toLowerCase()} to ${system.name}.`
    case 'planned':
      return `Not built yet.\n\n${ask}`
  }
}

/** The item's neighbours in the system's sidebar. */
function neighbours(route: SystemItem['route']): { prev?: PageLink; next?: PageLink } {
  const items = getSectionNavSections('design-system', route).flatMap((section) => section.items)
  const index = items.findIndex((item) => item.route === route)
  if (index < 0) return {}
  return { prev: items[index - 1], next: items[index + 1] }
}

/** Every theme, asset, and component line in a system file has this page until it gets a real one. */
export function SystemItemPage({ system, item }: { system: DesignSystem; item: SystemItem }) {
  if (item.status === 'from-mobile' && item.target && hasSharedCatalog(item.target)) {
    return <SharedCatalogPage route={item.target} preface={item.notes} />
  }
  if (item.status === 'doc' && item.file)
    return <SystemDocPage key={item.route} system={system} item={item} file={item.file} />
  const Demo = SYSTEM_DEMOS[systemDemoKey(item.route)]
  const page = (
    <DesignHarnessDocPage
      breadcrumb={
        <Breadcrumb
          items={[
            { label: 'Systems', route: 'design-system/systems' },
            { label: system.name, route: system.route },
            { label: SYSTEM_GROUP_LABEL[item.group] },
          ]}
        />
      }
      title={item.label}
      meta={
        <span className="design-harness-system__meta">
          <Badge tone={isRealItem(item) ? 'positive' : 'neutral'}>{STATUS_LABEL[item.status]}</Badge>
        </span>
      }
      toc={false}
    >
      {Demo ? (
        <div className="design-harness-system__demo design-harness-form" role="group" aria-label={`${item.label} demo`}>
          <Demo />
        </div>
      ) : null}
      <DesignHarnessMarkdown
        source={
          item.notes
            ? [item.notes, item.file ? `Lives in \`${item.file}\`.` : itemBody(system, item, Boolean(Demo))].join(
                '\n\n',
              )
            : itemBody(system, item, Boolean(Demo))
        }
      />
      <PrevNext {...neighbours(item.route)} />
    </DesignHarnessDocPage>
  )
  return isWideDemo(item.route) ? (
    <div className="design-harness-ds-page design-harness-ds-page--wide">{page}</div>
  ) : (
    page
  )
}

const skillRoot = (file: string) => file.slice(0, file.lastIndexOf('/') + 1)

/** A file linked from this skill, still inside the skill's own folder. */
function docInSkill(skillFile: string, path: string): string | undefined {
  const root = skillRoot(skillFile)
  if (!path.startsWith(root) || !path.endsWith('.md') || path.split('/').includes('..')) return undefined
  return path
}

function resolveRelativeDoc(fromFile: string, href: string): string | undefined {
  const pathPart = href.split('#')[0]?.split('?')[0] ?? ''
  if (!pathPart || /^[a-z]+:/i.test(pathPart) || pathPart.startsWith('/') || pathPart.startsWith('#')) return undefined
  const parts = fromFile.split('/').slice(0, -1)
  for (const segment of pathPart.split('/')) {
    if (segment === '' || segment === '.') continue
    if (segment === '..') {
      parts.pop()
      continue
    }
    parts.push(segment)
  }
  return parts.join('/')
}

/** The file this system page is showing. A `doc` query keeps a linked file on the same page. */
function shownDoc(skillFile: string): string {
  const doc = getDesignHarnessHashQuery().get('doc')
  if (!doc) return skillFile
  try {
    return docInSkill(skillFile, decodeURIComponent(doc)) ?? skillFile
  } catch {
    return skillFile
  }
}

/**
 * Links in a skill file are written for the repo. Known guides become their
 * pages. A file inside this skill stays on this system page. Anything else
 * that is still a relative doc stops being a link, so it cannot fall through
 * to the home page.
 */
function rewriteSystemDocLinks(source: string, fromFile: string, skillFile: string, route: string): string {
  return source.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (full, label: string, rawHref: string) => {
    const href = rawHref.trim()
    if (!href || href.startsWith('http') || href.startsWith('#/') || href.startsWith('mailto:')) return full
    const known = rewriteHowtoMarkdownLinks(`](${href})`)
    if (known !== `](${href})`) return `[${label}${known}`
    const resolved = resolveRelativeDoc(fromFile, href)
    if (resolved) {
      const knownResolved = rewriteHowtoMarkdownLinks(`](${resolved})`)
      if (knownResolved !== `](${resolved})`) return `[${label}${knownResolved}`
      if (docInSkill(skillFile, resolved)) return `[${label}](#/${route}?doc=${encodeURIComponent(resolved)})`
    }
    return /\.md(?:$|[#?])/.test(href) ? `\`${label}\`` : full
  })
}

/** A Context or Skills line, read in place — with the same actions as a skill page. */
function SystemDocPage({ system, item, file }: { system: DesignSystem; item: SystemItem; file: string }) {
  const [raw, setRaw] = useState<string | null | undefined>()
  const [mode, setMode] = useState<'doc' | 'source'>('doc')
  const [notice, setNotice] = useState<{ tone: 'info' | 'warning'; text: string }>()
  const [shown, setShown] = useState(() => shownDoc(file))
  const packName = packFileName(shown)
  const isExample = Boolean(packName) && !shown.startsWith(LOCAL_PACK)
  const [loading, setLoading] = useState(shown)
  if (loading !== shown) {
    setLoading(shown)
    setRaw(undefined)
  }

  useEffect(() => {
    const sync = () => setShown(shownDoc(file))
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [file])

  useEffect(() => {
    let live = true
    loadDocFile(shown).then(
      (text) => live && setRaw(text),
      () => live && setRaw(null),
    )
    return () => {
      live = false
    }
  }, [shown])

  const prompt =
    item.group === 'skills'
      ? `Use the ${item.label.toLowerCase()} skill (${shown}).`
      : `Use ${shown} as context for this.`

  const topbar = (
    <div className="design-harness-skill-topbar">
      <Breadcrumb
        items={[
          { label: 'Systems', route: 'design-system/systems' },
          { label: system.name, route: system.route },
          { label: SYSTEM_GROUP_LABEL[item.group] },
        ]}
      />
      <div className="design-harness-skill-actions">
        <CopyAction label="Use in chat" text={prompt} />
        <DocAction icon={FrameDownload} disabled={!raw} onClick={() => raw && downloadText(fileName(shown), raw)}>
          Download
        </DocAction>
        <DocAction
          icon={mode === 'doc' ? FrameCode : FrameBook}
          onClick={() => setMode(mode === 'doc' ? 'source' : 'doc')}
        >
          {mode === 'doc' ? 'View source' : 'View document'}
        </DocAction>
        {packName ? (
          <ReplaceAction
            name={packName}
            onReplaced={({ file: saved, backup }) => {
              setNotice({
                tone: 'info',
                text: `Saved to \`${saved}\`.${backup ? ` The old copy is in \`${backup}\`.` : ''}${
                  isExample ? ' This page keeps showing the example until you point this line at your file.' : ''
                }`,
              })
              if (!isExample) loadDocFile(shown).then(setRaw)
            }}
            onError={(text) => setNotice({ tone: 'warning', text })}
          />
        ) : null}
      </div>
    </div>
  )

  const body = raw ? rewriteSystemDocLinks(splitSkillFile(raw).body, shown, file, item.route) : ''
  const where = [
    `Source — \`${shown}\``,
    shown === file && item.target ? openInPlace(item.target) : '',
    shown !== file ? `[Back to ${item.label}](#/${item.route})` : '',
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <DesignHarnessDocPage
      breadcrumb={topbar}
      title={item.label}
      meta={
        <span className="design-harness-system__meta">
          <Badge tone="positive">{STATUS_LABEL[item.status]}</Badge>
        </span>
      }
      toc={false}
    >
      {notice ? (
        <Callout tone={notice.tone}>
          <DesignHarnessMarkdown source={notice.text} />
        </Callout>
      ) : null}
      {isExample && import.meta.env.DEV ? (
        <Callout>
          <DesignHarnessMarkdown
            source={`This is the example pack. **Replace with yours** saves your file to \`${LOCAL_PACK}${packName}\` — the harness reads that one instead. If you already have one there, the old copy is kept in \`.backups/\`.`}
          />
        </Callout>
      ) : null}
      {item.notes ? <DesignHarnessMarkdown source={item.notes} /> : null}
      <Text variant="muted" as="div" className="design-harness-ds-doc-source-note">
        <DesignHarnessMarkdown source={where} />
      </Text>
      {raw === undefined ? (
        <Text variant="muted" as="p">
          Loading…
        </Text>
      ) : raw === null ? (
        <Callout tone="warning">
          {shown.startsWith(LOCAL_PACK)
            ? "This file is private to your machine, so it isn't part of the built site. Open it in your editor, or run the dev server to read it here."
            : 'This file is missing. Ask the harness to create it, or fix the path in the system file.'}
        </Callout>
      ) : mode === 'source' ? (
        <pre className="design-harness-ds-pre">
          <code>{raw}</code>
        </pre>
      ) : (
        <DesignHarnessMarkdown source={body} stripLeadingH1 />
      )}
    </DesignHarnessDocPage>
  )
}
