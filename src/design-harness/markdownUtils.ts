import { isValidElement } from 'react'
import type { ReactNode } from 'react'

/** Flatten React children to plain text for heuristics (tables). */
export function markdownPlainText(children: ReactNode): string {
  if (children == null || typeof children === 'boolean') return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(markdownPlainText).join('')
  if (isValidElement(children)) {
    const props = children.props as { children?: ReactNode }
    if (props?.children !== undefined) return markdownPlainText(props.children)
  }
  return ''
}

/** First CSS colour token in a cell (hex, rgb(a), white/black), or a whole-cell `var(--token)` drawn live. */
export function extractColorFromCell(text: string): string | null {
  const t = text.trim()
  if (/^var\(--(?!radius-)[\w-]+\)$/.test(t)) return t
  const hex = t.match(/#([0-9a-f]{3,8})\b/i)
  if (hex) return hex[0]
  const rgba = t.match(/rgba?\([^)]+\)/i)
  if (rgba) return rgba[0]
  if (/^white$/i.test(t)) return '#ffffff'
  if (/^black$/i.test(t)) return '#000000'
  return null
}

/** Border radius preview: `4px`, `999px`, or `0px` only (single token). */
export function extractRadiusPx(text: string): string | null {
  const t = text.trim()
  if (/^\d+px$/i.test(t)) return t.toLowerCase()
  return null
}

/** Remove a leading ATX h1 so the page shell owns the document title. */
export function stripLeadingMarkdownH1(source: string): string {
  return source.replace(/^#\s+[^\n]+\n+/, '')
}

/** Drop Figma / doc attribution lines (Source, File key) — not shown in Design Harness. */
export function stripDocSourceAttribution(source: string): string {
  return source.replace(/^\*\*Source:\*\*[^\n]*\n+/gm, '').replace(/^\*\*File key:\*\*[^\n]*\n+/gm, '')
}

/** Strip YAML frontmatter and leading h1 for doc pages that supply their own title. */
export function prepareDocMarkdown(source: string): string {
  let markdown = source
  if (markdown.startsWith('---')) {
    markdown = markdown.replace(/^---[\s\S]*?---\s*\n+/, '')
  }
  return stripDocSourceAttribution(stripLeadingMarkdownH1(markdown))
}
