import { projectArtifactSections } from '../designHarnessNavConfig'
import { caseStudyStoryOutline, projectStoryOutline, type BoardOutline } from '../projectFacts'
import type { Project } from '../projectsIndex'
import { nodeBounds } from './geometry'
import { projectRouteSize, prototypeEntries } from './prototypes'
import { COMPACT, isSourceRoute, outlineNodes, storyRoute } from './pageNodes'
import { emptyPage, newId } from './store'
import type { BoardDoc, BoardNode, BoardPage, PrototypeNode } from './types'

const COLUMN_GAP = 160
const ROW_GAP = 320
const HEADING_WIDTH = 1200
const HEADING_HEIGHT = 80
const HEADING_GAP = 96

const TIPS = [
  'Double-click anywhere to add a sticky note. Double-click a note to edit it.',
  'Drop images, PDFs or any file from your desktop. Paste screenshots with ⌘V.',
  'Space + drag or two fingers to pan. ⌘ + scroll or pinch to zoom. ⇧1 fits everything.',
  'Insert a live prototype from the toolbar. Double-click it to tap through; Esc to stop.',
]

/** First visit: one page with a frame of tips and, when a project has screens, one live screen beside it. */
export function seedDoc(): BoardDoc {
  const page = emptyPage('Start here')
  const frameId = newId()
  const nodes: BoardNode[] = [
    { id: frameId, type: 'frame', title: 'How this board works', x: 0, y: 0, w: 920, h: 560 },
    ...TIPS.map((text, index): BoardNode => ({
      id: newId(),
      type: 'sticky',
      color: (['yellow', 'teal', 'plum', 'leaf'] as const)[index],
      text,
      x: 40 + (index % 2) * 440,
      y: 40 + Math.floor(index / 2) * 250,
      w: 400,
      h: 220,
      parentId: frameId,
    })),
  ]
  const first = prototypeEntries().find((entry) => entry.kind === 'Screen' && entry.size.w < 600)
  if (first) {
    nodes.push({
      id: newId(),
      type: 'prototype',
      route: first.route,
      label: first.label,
      project: first.project,
      x: 1000,
      y: 0,
      ...first.size,
    })
  }
  return {
    version: 1,
    pages: [{ ...page, nodes, camera: { x: 80, y: 120, zoom: 0.55 } }],
    activePageId: page.id,
    background: 'dots',
  }
}

type Artifact = { label: string; route: string }
type Section = { label: string; items: Artifact[]; compact?: boolean }

const STORY_LABEL = 'The story'
const PROTOTYPE_LABEL = 'Prototype'

const isDesktopScreen = (screen: Project['screens'][number]) => /desktop|web/i.test(screen.platform ?? screen.folder ?? '')

/** The first phone, or the only screen. It belongs in the prototype row, not beside the story. */
const leadRoute = (project: Project) =>
  (project.screens.find((screen) => !isDesktopScreen(screen)) ?? project.screens[0])?.route

/**
 * The board's rows: the story, then everything you can tap through, then the written sources as small cards.
 * `skip` leaves out routes already on the board. Each route is placed once.
 */
function boardSections(project: Project, skip = new Set<string>()): Section[] {
  const seen = new Set<string>()
  const all = projectArtifactSections(project)
    .flatMap((section) => section.items)
    .filter((item) => !seen.has(item.route) && Boolean(seen.add(item.route)))
  const live = all.filter((item) => !isSourceRoute(project, item.route))
  const sections: Section[] = [
    { label: STORY_LABEL, items: [{ label: STORY_LABEL, route: storyRoute(project) }] },
    { label: PROTOTYPE_LABEL, items: live },
    { label: 'Sources', items: all.filter((item) => isSourceRoute(project, item.route)), compact: true },
  ]
  return sections
    .map((section) => ({ ...section, items: section.items.filter((item) => !skip.has(item.route)) }))
    .filter((section) => section.items.length)
}

const boardRoutes = (project: Project) =>
  boardSections(project).flatMap((section) => section.items.map((item) => item.route))

/** One artifact on the canvas: live, or a source card. No frame around it. */
function artifactNode(project: Project, artifact: Artifact, x: number, y: number, compact?: boolean): BoardNode {
  return {
    id: newId(),
    type: 'prototype',
    route: artifact.route,
    label: artifact.label,
    project: project.title,
    ...(compact ? { compact: true } : {}),
    x,
    y,
    ...(compact ? COMPACT : projectRouteSize(artifact.route)),
  }
}

/** One row per section, each under its heading, starting at `top`. */
function layoutSections(project: Project, sections: Section[], top: number) {
  const nodes: BoardNode[] = []
  let firstRow: string[] = []
  let y = top
  for (const section of sections) {
    const heading: BoardNode = {
      id: newId(),
      type: 'text',
      heading: true,
      color: 'ink',
      text: section.label,
      x: 0,
      y,
      w: HEADING_WIDTH,
      h: HEADING_HEIGHT,
    }
    const rowTop = y + HEADING_HEIGHT + HEADING_GAP
    const row = [heading.id]
    let x = 0
    let rowHeight = 0
    nodes.push(heading)
    for (const item of section.items) {
      if (item.route === storyRoute(project)) {
        const story = storyNodes(project, { x, y: rowTop })
        if (!story) continue
        nodes.push(...story.nodes)
        row.push(...story.frames.map((frame) => frame.id))
        x += story.w + COLUMN_GAP
        rowHeight = Math.max(rowHeight, story.h)
        continue
      }
      const artifact = artifactNode(project, item, x, rowTop, section.compact)
      nodes.push(artifact)
      row.push(artifact.id)
      x += artifact.w + (section.compact ? COLUMN_GAP / 2 : COLUMN_GAP)
      rowHeight = Math.max(rowHeight, artifact.h)
    }
    if (!firstRow.length) firstRow = row
    y = rowTop + rowHeight + ROW_GAP
  }
  return { nodes, firstRow, bottom: y - ROW_GAP }
}

const hash = (text: string) => {
  let h = 5381
  for (let i = 0; i < text.length; i++) h = (h * 33 + text.charCodeAt(i)) | 0
  return (h >>> 0).toString(36)
}

/** What the story's blocks say and where they sit, relative to the page. Ids don't count. */
function storyFingerprint(frame: BoardNode, nodes: BoardNode[]): string {
  return hash(
    nodes
      .filter((node) => node.parentId === frame.id)
      .map((node) => `${node.type}|${'text' in node ? node.text : ''}|${node.x - frame.x}|${node.y - frame.y}|${node.w}|${node.h}`)
      .sort()
      .join('\n'),
  )
}

/** The project's case study, told as a story; until there is one, the brief and decisions, with a nudge to write it. */
export function storyOutline(project: Project): BoardOutline {
  const caseStudy = project.caseStudyPages.find((page) => page.kind === 'story')?.source
  if (caseStudy) return caseStudyStoryOutline(caseStudy, project.title)
  const outline = projectStoryOutline(project)
  const [intro, ...rest] = outline.sections
  const nudge = { kind: 'callout' as const, text: 'No case study yet. Ask your agent to "build the case study" to tell the full story.' }
  return intro && !intro.heading
    ? { ...outline, sections: [{ ...intro, blocks: [...intro.blocks, nudge] }, ...rest] }
    : { ...outline, sections: [{ heading: '', blocks: [nudge] }, ...outline.sections] }
}

/** The story page at `at`, stamped so a later sync can tell whether anyone changed it. */
function storyNodes(project: Project, at: { x: number; y: number }) {
  const story = outlineNodes(storyOutline(project), STORY_LABEL, storyRoute(project), at, newId, 'rows')
  if (!story) return undefined
  const frame = { ...story.frames[0], stamp: storyFingerprint(story.frames[0], story.nodes) }
  return { ...story, frames: [frame], nodes: story.nodes.map((node) => (node.id === frame.id ? frame : node)) }
}

/**
 * The page with its story rebuilt from the project's files, in place; what sat below it moves with the new height.
 * Without `force`, only a story nobody has edited or moved is rebuilt. Undefined when nothing changes.
 */
export function refreshStory(page: BoardPage, project: Project, force = false): BoardNode[] | undefined {
  const frame = page.nodes.find((node) => node.type === 'frame' && node.source === storyRoute(project))
  if (!frame || frame.type !== 'frame') return undefined
  const untouched = frame.stamp === undefined || frame.stamp === storyFingerprint(frame, page.nodes)
  if (!force && !untouched) return undefined
  const next = storyNodes(project, frame)
  if (!next) return undefined
  if (!force && next.frames[0].stamp === frame.stamp) return undefined
  const dy = next.h - frame.h
  const bottom = frame.y + frame.h
  const old = new Set([frame.id, ...page.nodes.filter((node) => node.parentId === frame.id).map((node) => node.id)])
  const rest = page.nodes
    .filter((node) => !old.has(node.id))
    .map((node) => (dy && nodeBounds(node).y >= bottom ? { ...node, y: node.y + dy } : node))
  return [...rest, ...next.nodes]
}

/** Routes a page already shows: artifacts, and the frames the story and expanded pages are made of. */
const placedRoutes = (page: BoardPage) =>
  page.nodes.flatMap((node) =>
    node.type === 'prototype' ? [node.route] : node.type === 'frame' && node.source ? [node.source] : [],
  )

/**
 * A project's board: the story first (problem, evidence, what we chose, how we'd know, still open), then the
 * prototype row, then the written sources as cards. Opens on the story. A screen is never repeated beside the story.
 */
export function projectDoc(project: Project): BoardDoc {
  const { nodes, firstRow } = layoutSections(project, boardSections(project), 0)
  const page: BoardPage = {
    ...emptyPage(project.title),
    source: project.boardRoute,
    fresh: true,
    focus: firstRow,
    seeded: boardRoutes(project),
    layout: 'story',
    nodes,
  }
  return { version: 1, pages: [page], activePageId: page.id, background: 'dots' }
}

/**
 * Take the lead screen off the story row. `reopen` means that was the only copy, so the prototype row
 * still needs it. A second copy already in that row stays, and a screen the designer deleted stays gone.
 */
function removeStoryRowLead(page: BoardPage, lead?: string): { page: BoardPage; reopen: boolean } {
  if (!lead) return { page, reopen: false }
  const storyHeading = page.nodes.find((node) => node.type === 'text' && node.heading && node.text === STORY_LABEL)
  const prototypeHeading = page.nodes.find((node) => node.type === 'text' && node.heading && node.text === PROTOTYPE_LABEL)
  const inStoryRow = (node: PrototypeNode) => {
    if (node.slot === 'story') return true
    if (!storyHeading) return false
    const top = nodeBounds(node).y
    const bottom = prototypeHeading ? prototypeHeading.y : storyHeading.y + 5000
    return top >= storyHeading.y && top < bottom
  }
  const storyCopy = page.nodes.find((node): node is PrototypeNode => node.type === 'prototype' && node.route === lead && inStoryRow(node))
  if (!storyCopy) return { page, reopen: false }
  const nodes = page.nodes.filter((node) => node.id !== storyCopy.id)
  const stillThere = nodes.some((node) => node.type === 'prototype' && node.route === lead)
  return { page: { ...page, nodes }, reopen: !stillThere }
}

/** Nodes already sitting in a section's row, between its heading and the next one. */
function sectionRowNodes(page: BoardPage, heading: BoardNode): BoardNode[] {
  const nextHeading = page.nodes
    .filter((node) => node.type === 'text' && node.heading && node.y > heading.y + 10)
    .sort((a, b) => a.y - b.y)[0]
  const rowTop = heading.y + HEADING_HEIGHT + HEADING_GAP
  const rowBottom = nextHeading ? nextHeading.y : rowTop + 4000
  return page.nodes.filter((node) => {
    if (node.id === heading.id || node.parentId) return false
    const top = nodeBounds(node).y
    return top >= rowTop - 24 && top < rowBottom - 24
  })
}

/**
 * Add a section's missing artifacts to the row it already has. Undefined when that heading isn't on the page,
 * so the caller can start the section at the bottom instead.
 */
function appendToSection(page: BoardPage, project: Project, section: Section): BoardPage | undefined {
  const heading = page.nodes.find((node) => node.type === 'text' && node.heading && node.text === section.label)
  if (!heading) return undefined
  const row = sectionRowNodes(page, heading)
  const gap = section.compact ? COLUMN_GAP / 2 : COLUMN_GAP
  const rowTop = heading.y + HEADING_HEIGHT + HEADING_GAP
  let x = row.length ? Math.max(...row.map((node) => nodeBounds(node).x + nodeBounds(node).w)) + gap : 0
  const rowBottom = row.length ? Math.max(...row.map((node) => nodeBounds(node).y + nodeBounds(node).h)) : rowTop
  const added: BoardNode[] = []
  let addedBottom = rowBottom
  for (const item of section.items) {
    if (item.route === storyRoute(project)) {
      const story = storyNodes(project, { x, y: rowTop })
      if (!story) continue
      added.push(...story.nodes)
      x += story.w + gap
      addedBottom = Math.max(addedBottom, rowTop + story.h)
      continue
    }
    const artifact = artifactNode(project, item, x, rowTop, section.compact)
    added.push(artifact)
    x += artifact.w + gap
    addedBottom = Math.max(addedBottom, artifact.y + artifact.h)
  }
  const extra = Math.max(0, addedBottom - rowBottom)
  const shifted =
    extra > 0
      ? page.nodes.map((node) => (nodeBounds(node).y >= rowBottom + 8 ? { ...node, y: node.y + extra } : node))
      : page.nodes
  return { ...page, nodes: [...shifted, ...added] }
}

/**
 * Brings a saved board up to date: artifacts made since then join their row, or the bottom if that row
 * is new. Anything placed once and deleted stays deleted. Boards from before the story row are rebuilt
 * once, and boards saved as one page per artifact become one canvas, both keeping what people added.
 */
export function syncProjectDoc(doc: BoardDoc, project: Project): BoardDoc {
  const unwrapped = { ...doc, pages: doc.pages.map(unwrapArtifactFrames) }
  const saved = unwrapped.pages.find((page) => page.source === project.boardRoute)
  if (!saved) return fromPagePerArtifact(unwrapped, project)
  if (saved.layout !== 'story') return rebuildWithStory(unwrapped, saved, project)
  const lead = leadRoute(project)
  const restoried = refreshStory(saved, project)
  if (restoried) return syncProjectDoc(withPageNodes(unwrapped, saved.id, restoried), project)
  const lifted = removeStoryRowLead(saved, lead)
  const placed = new Set<string>([
    ...(lifted.page.seeded ?? []),
    ...placedRoutes(lifted.page),
    ...unwrapped.pages.filter((page) => page.id !== lifted.page.id).flatMap(placedRoutes),
  ])
  if (lifted.reopen && lead) placed.delete(lead)
  const missing = boardSections(project, placed)
  let page = lifted.page
  const deferred: Section[] = []
  for (const section of missing) {
    const next = appendToSection(page, project, section)
    if (next) page = next
    else deferred.push(section)
  }
  const bottom = Math.max(0, ...page.nodes.map((node) => nodeBounds(node)).map((box) => box.y + box.h)) + ROW_GAP
  const added = deferred.length ? layoutSections(project, deferred, bottom).nodes : []
  const seeded = [...new Set([...placed, ...boardRoutes(project)])].filter((key) => key !== `${lead}#story`)
  if (page === saved && !added.length && seeded.length === (saved.seeded?.length ?? 0)) return unwrapped
  return {
    ...unwrapped,
    pages: unwrapped.pages.map((other) =>
      other.id === saved.id ? { ...page, nodes: [...page.nodes, ...added], seeded } : other,
    ),
  }
}

function withPageNodes(doc: BoardDoc, pageId: string, nodes: BoardNode[]): BoardDoc {
  return { ...doc, pages: doc.pages.map((page) => (page.id === pageId ? { ...page, nodes } : page)) }
}

/** A fresh story board in place of an older layout. What people added keeps its arrangement, below the sources. */
function rebuildWithStory(doc: BoardDoc, saved: BoardPage, project: Project): BoardDoc {
  const fresh = projectDoc(project).pages[0]
  const artifacts = new Set([...boardRoutes(project), ...projectArtifactSections(project).flatMap((s) => s.items.map((i) => i.route))])
  const generated = new Set(
    saved.nodes.flatMap((node) =>
      (node.type === 'prototype' && artifacts.has(node.route)) ||
      (node.type === 'frame' && node.source) ||
      (node.type === 'text' && (node.heading || node.block))
        ? [node.id]
        : [],
    ),
  )
  for (const node of saved.nodes) if (node.parentId && generated.has(node.parentId)) generated.add(node.id)
  const kept = saved.nodes.filter((node) => !generated.has(node.id))
  const top = Math.max(0, ...fresh.nodes.map((node) => nodeBounds(node)).map((r) => r.y + r.h)) + ROW_GAP
  const boxes = kept.map((node) => nodeBounds(node))
  const dx = kept.length ? -Math.min(...boxes.map((r) => r.x)) : 0
  const dy = kept.length ? top - Math.min(...boxes.map((r) => r.y)) : 0
  const moved = kept.map((node) => ({
    ...node,
    x: node.x + dx,
    y: node.y + dy,
    parentId: node.parentId && generated.has(node.parentId) ? undefined : node.parentId,
  }))
  const page: BoardPage = { ...fresh, id: saved.id, name: saved.name, nodes: [...fresh.nodes, ...moved] }
  return { ...doc, pages: doc.pages.map((other) => (other.id === saved.id ? page : other)) }
}

/** Drops the extra frame that used to sit behind each live artifact. */
function unwrapArtifactFrames(page: BoardPage): BoardPage {
  const protoLabels = new Set(page.nodes.flatMap((node) => (node.type === 'prototype' ? [node.label] : [])))
  const frames = new Set(
    page.nodes.flatMap((node) => {
      if (node.type === 'frame' && node.source) return []
      if (node.type === 'frame' && protoLabels.has(node.title)) return [node.id]
      if (node.type !== 'prototype' || !node.parentId) return []
      const parent = page.nodes.find((other) => other.id === node.parentId)
      return parent?.type === 'frame' && !parent.source ? [parent.id] : []
    }),
  )
  if (!frames.size) return page
  return {
    ...page,
    nodes: page.nodes
      .filter((node) => !frames.has(node.id))
      .map((node) => (node.parentId && frames.has(node.parentId) ? { ...node, parentId: undefined } : node)),
  }
}

function fromPagePerArtifact(doc: BoardDoc, project: Project): BoardDoc {
  const canvas = projectDoc(project).pages[0]
  const protoOf = new Map<string, BoardNode>()
  for (const node of canvas.nodes) {
    if (node.type === 'prototype') protoOf.set((node as PrototypeNode).route, node)
    if (node.type === 'frame' && node.source) protoOf.set(node.source, node)
  }
  const carried: BoardNode[] = []
  for (const page of doc.pages) {
    const proto = page.source ? protoOf.get(page.source) : undefined
    if (!proto) continue
    const seeded = page.nodes.find((node) => node.type === 'prototype' && node.route === page.source)
    const seededFrame = seeded?.parentId
    for (const node of page.nodes) {
      if (node === seeded || node.id === seededFrame) continue
      if (node.type === 'sticky' && !node.text.trim()) continue
      carried.push({
        ...node,
        x: node.x + proto.x,
        y: node.y + proto.y,
        parentId: node.parentId === seededFrame ? undefined : node.parentId,
      })
    }
  }
  const merged = { ...canvas, nodes: [...canvas.nodes, ...carried] }
  return { ...doc, pages: [merged, ...doc.pages.filter((page) => !page.source)], activePageId: merged.id }
}
