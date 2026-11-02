import { chosenDecisions, markdownBoardOutline, type BoardOutline } from '../projectFacts'
import { resolveProjectRoute, type Project } from '../projectsIndex'
import type { BoardColor, BoardNode, FrameNode, TextBlock, TextNode } from './types'

const PAD = 96
const COLUMN_W = 780
const COLUMN_GAP = 96
const COLUMNS = 2
const PAGE_W = PAD * 2 + COLUMNS * COLUMN_W + (COLUMNS - 1) * COLUMN_GAP
const FULL_W = PAGE_W - PAD * 2
/** The title and intro stop at a readable line length, even on a wide page. */
const INTRO_W = Math.min(FULL_W, 1200)
const SECTION_GAP = 80
const SECTION_COLORS: BoardColor[] = ['teal', 'plum', 'amber', 'leaf', 'rose', 'yellow']

/**
 * Line height, average glyph width, vertical padding, room the marker takes on the left, and the gap after
 * each block. Mirrors `[data-block]` in board.css.
 */
const METRICS: Record<TextBlock, { line: number; glyph: number; pad: number; marker: number; gap: number }> = {
  eyebrow: { line: 20, glyph: 10, pad: 0, marker: 0, gap: 16 },
  title: { line: 56, glyph: 28, pad: 8, marker: 0, gap: 32 },
  lead: { line: 40, glyph: 16, pad: 0, marker: 0, gap: 20 },
  section: { line: 40, glyph: 18, pad: 0, marker: 52, gap: 20 },
  body: { line: 28, glyph: 10, pad: 0, marker: 0, gap: 16 },
  item: { line: 28, glyph: 10, pad: 34, marker: 40, gap: 0 },
  label: { line: 20, glyph: 10, pad: 0, marker: 0, gap: 12 },
  callout: { line: 28, glyph: 10, pad: 48, marker: 0, gap: 16 },
}

/** Markdown behind a written project page; undefined for screens, decks, diagrams and HTML reports, which stay live. */
export function writtenPageSource(project: Project, route: string): string | undefined {
  if (route === project.factsRoute) return project.brief
  if (route === project.decisionsRoute) return project.decisions
  if (route === project.route) return project.about
  const resolved = resolveProjectRoute(route)
  if (resolved?.doc?.kind === 'markdown') return resolved.doc.source
  if (resolved?.caseStudyPage && resolved.caseStudyPage.kind !== 'slides') return resolved.caseStudyPage.source
  return undefined
}

/** A source card on the board: written pages and HTML reports, read in full by opening them. */
export const COMPACT = { w: 400, h: 220 }

export const storyRoute = (project: Project) => `${project.boardRoute}#story`

export function isSourceRoute(project: Project, route: string): boolean {
  return (
    route === project.route || writtenPageSource(project, route) !== undefined || Boolean(resolveProjectRoute(route)?.report)
  )
}

/** Opening lines that describe the file, not the project. */
const PREAMBLE = /^(draft|status|source|sources|author|date|note)\b|\bfictional\b/i

/** What a source card says: the line that best sums the page up, and how many sections it has. */
export function compactSummary(route: string): { lead?: string; sections: number } {
  const project = resolveProjectRoute(route)?.project
  const source = project ? writtenPageSource(project, route) : undefined
  if (!project || !source) return { lead: project?.caseStudy?.goal, sections: 0 }
  const outline = markdownBoardOutline(source, '')
  const sections = outline.sections.length
  if (route === project.factsRoute && project.caseStudy) return { lead: project.caseStudy.problem, sections }
  if (route === project.decisionsRoute) {
    const latest = chosenDecisions(project.decisions)[0]
    if (latest) return { lead: `Latest: ${latest.chosen}`, sections }
  }
  const blocks = outline.sections.flatMap((section) => section.blocks)
  const lead =
    blocks.find((block) => block.kind === 'body' && block.text.length > 60 && !PREAMBLE.test(block.text)) ??
    blocks.find((block) => !PREAMBLE.test(block.text))
  return { lead: lead?.text, sections }
}

type Block = { block: TextBlock; text: string; marker?: string; color: BoardColor }

function blockHeight({ block, text, marker }: Block, width: number) {
  const { line, glyph, pad, marker: markerW } = METRICS[block]
  const room = width - (marker ? markerW : 0) - (block === 'callout' ? 64 : 0)
  const chars = Math.max(12, Math.floor(room / glyph))
  return Math.max(1, Math.ceil(text.length / chars)) * line + pad
}

/** Stacks blocks from `top`; items run together, everything else keeps its gap. Returns the nodes and the bottom. */
function stack(blocks: Block[], x: number, top: number, width: number, parentId: string, newId: () => string) {
  const nodes: TextNode[] = []
  let y = top
  blocks.forEach((item, index) => {
    const h = blockHeight(item, width)
    nodes.push({
      id: newId(),
      type: 'text',
      color: item.color,
      block: item.block,
      text: item.text,
      ...(item.marker ? { marker: item.marker } : {}),
      x,
      y,
      w: width,
      h,
      parentId,
    })
    const next = blocks[index + 1]?.block
    y += h + (item.block === 'item' && next === 'item' ? 0 : METRICS[item.block].gap)
  })
  return { nodes, bottom: y }
}

export type PageNodes = { frames: FrameNode[]; nodes: BoardNode[]; w: number; h: number }

/** A written page as one white board page. Undefined when the markdown has nothing to show. */
export function pageNodes(
  source: string,
  label: string,
  route: string,
  at: { x: number; y: number },
  newId: () => string,
): PageNodes | undefined {
  return outlineNodes(markdownBoardOutline(source, label), label, route, at, newId)
}

/**
 * An outline as one white board page: its title, then each section numbered and coloured, in two columns.
 * `packed` fills the shorter column; `rows` keeps reading order, two sections to a row, for a story.
 * Every heading, paragraph, list row and quote is its own text block: edit, move or delete it.
 */
export function outlineNodes(
  outline: BoardOutline,
  label: string,
  route: string,
  at: { x: number; y: number },
  newId: () => string,
  flow: 'packed' | 'rows' = 'packed',
): PageNodes | undefined {
  if (!outline.sections.length) return undefined
  const frameId = newId()

  const intro = outline.sections.find((section) => !section.heading)
  const sections = outline.sections.filter((section) => section.heading)
  const head = stack(
    [
      { block: 'eyebrow', text: label, color: 'teal' },
      { block: 'title', text: outline.title, color: 'ink' },
      ...(intro?.blocks ?? []).map((item): Block => ({ block: item.kind, text: item.text, marker: item.marker, color: 'teal' })),
    ],
    at.x + PAD,
    at.y + PAD,
    INTRO_W,
    frameId,
    newId,
  )

  const nodes: BoardNode[] = [...head.nodes]
  const columns = Array.from({ length: COLUMNS }, () => head.bottom + SECTION_GAP - METRICS.body.gap)
  let slot = 0
  sections.forEach((section, index) => {
    const color = SECTION_COLORS[index % SECTION_COLORS.length]
    const numbered = section.heading.match(/^(\d+)[.)]\s+(.*)$/)
    const blocks: Block[] = [
      { block: 'section', text: numbered?.[2] ?? section.heading, marker: numbered?.[1] ?? String(index + 1), color },
      ...section.blocks.map((item): Block => ({ block: item.kind, text: item.text, marker: item.marker, color })),
    ]
    if (flow === 'rows' && section.wide) {
      const placed = stack(blocks, at.x + PAD, Math.max(...columns), INTRO_W, frameId, newId)
      nodes.push(...placed.nodes)
      columns.fill(placed.bottom + SECTION_GAP)
      slot = 0
      return
    }
    const column = flow === 'rows' ? slot++ % COLUMNS : columns.indexOf(Math.min(...columns))
    if (flow === 'rows' && column === 0) columns.fill(Math.max(...columns))
    const x = at.x + PAD + column * (COLUMN_W + COLUMN_GAP)
    const placed = stack(blocks, x, columns[column], COLUMN_W, frameId, newId)
    nodes.push(...placed.nodes)
    columns[column] = placed.bottom + SECTION_GAP
  })

  const h = Math.max(...columns) - SECTION_GAP + PAD - at.y
  const frame: FrameNode = { id: frameId, type: 'frame', title: outline.title, source: route, x: at.x, y: at.y, w: PAGE_W, h }
  return { frames: [frame], nodes: [frame, ...nodes], w: PAGE_W, h }
}
