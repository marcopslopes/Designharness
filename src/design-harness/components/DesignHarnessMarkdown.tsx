import {
  createContext,
  useContext,
  type AnchorHTMLAttributes,
  type ComponentProps,
  type PropsWithChildren,
} from 'react'
import type { Components, ExtraProps } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  extractColorFromCell,
  extractRadiusPx,
  markdownPlainText,
  prepareDocMarkdown,
  stripDocSourceAttribution,
} from '../markdownUtils'
import { resolveDocFile, resolveScreenFile } from '../projectsIndex'
import { isDocPath, isFormatPath, isScreenPath, projectHref, splitQuery } from '../projectLinks'
import { Callout, type CalloutTone } from '../ui'
import { MermaidDiagram } from './MermaidDiagram'
import { ScreenEmbed, ScreenEmbedMissing } from './ScreenEmbed'

type DesignHarnessMarkdownProps = {
  source: string
  stripLeadingH1?: boolean
  /** Resolves `screens/…` and `docs/…` paths in this doc against `projects/<projectSlug>/`. */
  projectSlug?: string
}

const ProjectSlugContext = createContext<string | undefined>(undefined)

function useProjectHref(path: string | undefined): string | undefined {
  return projectHref(path, useContext(ProjectSlugContext))
}

/** A paragraph that is only `![Label](….tsx)` or `![Label](docs/….mermaid)` is an embed, not an image. */
function soleEmbedImage(node: ExtraProps['node']): { src: string; alt: string } | undefined {
  const kids = node?.children.filter((c) => !(c.type === 'text' && c.value.trim() === '')) ?? []
  const only = kids.length === 1 ? kids[0] : undefined
  if (only?.type !== 'element' || only.tagName !== 'img') return undefined
  const src = only.properties.src
  const embeddable = typeof src === 'string' && (isScreenPath(src) || /\.mermaid$/.test(src))
  return embeddable ? { src, alt: String(only.properties.alt ?? '') } : undefined
}

function MarkdownEmbed({ src, alt }: { src: string; alt: string }) {
  const projectSlug = useContext(ProjectSlugContext)
  if (/\.mermaid$/.test(src)) {
    const doc = resolveDocFile(src, projectSlug)
    return doc ? <MermaidDiagram source={doc.source} label={alt} /> : <ScreenEmbedMissing path={src} />
  }
  const [file, query] = splitQuery(src)
  const screen = resolveScreenFile(file, projectSlug)
  return screen ? <ScreenEmbed screen={screen} label={alt} query={query} /> : <ScreenEmbedMissing path={src} />
}

function MarkdownImg({ src, alt, title }: ComponentProps<'img'>) {
  const href = useProjectHref(src)
  if (isScreenPath(src) || isDocPath(src) || isFormatPath(src))
    return <MarkdownLink href={href}>{alt || src}</MarkdownLink>
  return <img className="design-harness-ds-md__img" src={src} alt={alt} title={title} loading="lazy" />
}

function MarkdownLink({ href, children, ...rest }: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const resolvedHref = useProjectHref(href)
  const external = href?.startsWith('http')
  const sectionId = href?.startsWith('#') && !href.startsWith('#/') ? href.slice(1) : undefined
  return (
    <a
      {...rest}
      href={resolvedHref}
      className="design-harness-ds-md__a"
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(sectionId
        ? {
            onClick: (event) => {
              const target = document.getElementById(sectionId)
              if (!target) return
              event.preventDefault()
              target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            },
          }
        : {})}
    >
      {children}
    </a>
  )
}

function MarkdownTable({ children, className, ...rest }: ComponentProps<'table'>) {
  return (
    <div className="design-harness-ds-md__table-view">
      <div className="design-harness-ds-md__table-scroll">
        <table {...rest} className={['design-harness-ds-md__table', className].filter(Boolean).join(' ')}>
          {children}
        </table>
      </div>
    </div>
  )
}

function MarkdownTh(props: ComponentProps<'th'>) {
  const { className, ...rest } = props
  return <th {...rest} className={['design-harness-ds-md__th', className].filter(Boolean).join(' ')} />
}

function MarkdownTd(props: ComponentProps<'td'>) {
  const { className, children, ...rest } = props
  const text = markdownPlainText(children)
  const color = extractColorFromCell(text)
  const radius = !color ? extractRadiusPx(text) : null

  if (color) {
    return (
      <td
        {...rest}
        className={['design-harness-ds-md__td', 'design-harness-ds-md__td--visual', className]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="design-harness-ds-md__cell-visual">
          <span className="design-harness-ds-md__swatch" style={{ background: color }} title={color} />
          <span className="design-harness-ds-md__cell-copy">{children}</span>
        </span>
      </td>
    )
  }

  if (radius) {
    return (
      <td
        {...rest}
        className={['design-harness-ds-md__td', 'design-harness-ds-md__td--visual', className]
          .filter(Boolean)
          .join(' ')}
      >
        <span className="design-harness-ds-md__cell-visual">
          <span className="design-harness-ds-md__radius-preview" style={{ borderRadius: radius }} title={radius} />
          <span className="design-harness-ds-md__cell-copy">{children}</span>
        </span>
      </td>
    )
  }

  return (
    <td {...rest} className={['design-harness-ds-md__td', className].filter(Boolean).join(' ')}>
      {children}
    </td>
  )
}

function MarkdownH1({ children, className, ...rest }: ComponentProps<'h1'>) {
  return (
    <h1 {...rest} className={['design-harness-ds-md__title', className].filter(Boolean).join(' ')}>
      {children}
    </h1>
  )
}

function MarkdownH2({ children, className, ...rest }: ComponentProps<'h2'>) {
  return (
    <h2 {...rest} className={['design-harness-ds-md__section-title', className].filter(Boolean).join(' ')}>
      {children}
    </h2>
  )
}

function MarkdownH3({ children, className, ...rest }: ComponentProps<'h3'>) {
  return (
    <h3 {...rest} className={['design-harness-ds-md__h3', className].filter(Boolean).join(' ')}>
      {children}
    </h3>
  )
}

function MarkdownHr(props: ComponentProps<'hr'>) {
  return <hr {...props} className="design-harness-ds-md__hr" />
}

type MdNode = { type: string; value?: string; children?: MdNode[]; data?: { hProperties?: Record<string, string> } }

const CALLOUT_MARK = /^\[!(note|tip|important|warning|caution)\]\s*/i

/** `> [!NOTE]` / `> [!WARNING]` (GitHub's alert syntax) marks a blockquote as a callout. */
function remarkCallouts() {
  const walk = (node: MdNode) => {
    const text = node.type === 'blockquote' ? node.children?.[0]?.children?.[0] : undefined
    const match = text?.type === 'text' ? CALLOUT_MARK.exec(text.value ?? '') : null
    if (text && match) {
      text.value = text.value!.slice(match[0].length)
      const tone = /warning|caution/i.test(match[1]) ? 'warning' : 'info'
      node.data = { ...node.data, hProperties: { 'data-callout': tone } }
    }
    node.children?.forEach(walk)
  }
  return walk
}

function MarkdownBlockquote({ children, className, ...rest }: ComponentProps<'blockquote'>) {
  const tone = (rest as { 'data-callout'?: CalloutTone })['data-callout']
  if (tone) return <Callout tone={tone}>{children}</Callout>
  return (
    <blockquote {...rest} className={['design-harness-ds-md__blockquote', className].filter(Boolean).join(' ')}>
      {children}
    </blockquote>
  )
}

function MarkdownUl({ children, className, ...rest }: ComponentProps<'ul'>) {
  return (
    <ul {...rest} className={['design-harness-ds-md__ul', className].filter(Boolean).join(' ')}>
      {children}
    </ul>
  )
}

function MarkdownOl({ children, className, ...rest }: ComponentProps<'ol'>) {
  return (
    <ol {...rest} className={['design-harness-ds-md__ol', className].filter(Boolean).join(' ')}>
      {children}
    </ol>
  )
}

function MarkdownLi({ children, className, ...rest }: ComponentProps<'li'>) {
  return (
    <li {...rest} className={['design-harness-ds-md__li', className].filter(Boolean).join(' ')}>
      {children}
    </li>
  )
}

function MarkdownP({ children, className, node, ...rest }: ComponentProps<'p'> & ExtraProps) {
  const embed = soleEmbedImage(node)
  if (embed) return <MarkdownEmbed {...embed} />
  return (
    <p {...rest} className={['design-harness-ds-md__p', className].filter(Boolean).join(' ')}>
      {children}
    </p>
  )
}

/** ```mermaid fenced blocks draw as diagrams; other fences render as code. */
function MarkdownPre({ children, node, ...rest }: ComponentProps<'pre'> & ExtraProps) {
  const code = node?.children[0]
  const classes = code?.type === 'element' ? code.properties.className : undefined
  if (Array.isArray(classes) && classes.includes('language-mermaid') && code?.type === 'element') {
    const text = code.children.map((c) => (c.type === 'text' ? c.value : '')).join('')
    return <MermaidDiagram source={text} />
  }
  return <pre {...rest}>{children}</pre>
}

const markdownComponents: Partial<Components> = {
  pre: MarkdownPre,
  a: MarkdownLink,
  table: MarkdownTable,
  th: MarkdownTh,
  td: MarkdownTd,
  h1: MarkdownH1,
  h2: MarkdownH2,
  h3: MarkdownH3,
  hr: MarkdownHr,
  blockquote: MarkdownBlockquote,
  ul: MarkdownUl,
  ol: MarkdownOl,
  li: MarkdownLi,
  p: MarkdownP,
  img: MarkdownImg,
}

export function DesignHarnessMarkdown({ source, stripLeadingH1 = false, projectSlug }: DesignHarnessMarkdownProps) {
  const markdown = stripLeadingH1 ? prepareDocMarkdown(source) : stripDocSourceAttribution(source)
  return (
    <ProjectSlugContext.Provider value={projectSlug}>
      <div className="design-harness-ds-md design-harness-ds-md--spec">
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkCallouts]} components={markdownComponents}>
          {markdown}
        </ReactMarkdown>
      </div>
    </ProjectSlugContext.Provider>
  )
}
