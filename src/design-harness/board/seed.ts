import { projectArtifactSections } from '../designHarnessNavConfig'
import type { Project } from '../projectsIndex'
import { nodeBounds } from './geometry'
import { projectRouteSize, prototypeEntries } from './prototypes'
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
type Section = { label: string; items: Artifact[] }

/** One live artifact on the canvas — no frame around it. */
function artifactNode(project: Project, artifact: Artifact, x: number, y: number): BoardNode {
  const size = projectRouteSize(artifact.route)
  return {
    id: newId(),
    type: 'prototype',
    route: artifact.route,
    label: artifact.label,
    project: project.title,
    x,
    y,
    ...size,
  }
}

/** One row of frames per section, each under its heading, starting at `top`. */
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
      const artifact = artifactNode(project, item, x, rowTop)
      nodes.push(artifact)
      row.push(artifact.id)
      x += artifact.w + COLUMN_GAP
      rowHeight = Math.max(rowHeight, artifact.h)
    }
    if (!firstRow.length) firstRow = row
    y = rowTop + rowHeight + ROW_GAP
  }
  return { nodes, firstRow }
}

/** A project's board: one canvas with every artifact live, a row per sidebar section. Opens on the first row. */
export function projectDoc(project: Project): BoardDoc {
  const { nodes, firstRow } = layoutSections(project, projectArtifactSections(project), 0)
  const page: BoardPage = {
    ...emptyPage(project.title),
    source: project.boardRoute,
    fresh: true,
    focus: firstRow,
    nodes,
  }
  return { version: 1, pages: [page], activePageId: page.id, background: 'dots' }
}

/**
 * Brings a saved board up to date: artifacts made since then join the canvas in a new row at the bottom.
 * Boards saved as one page per artifact become one canvas, keeping what people added to each page.
 */
export function syncProjectDoc(doc: BoardDoc, project: Project): BoardDoc {
  const unwrapped = { ...doc, pages: doc.pages.map(unwrapArtifactFrames) }
  const canvas = unwrapped.pages.find((page) => page.source === project.boardRoute)
  if (!canvas) return fromPagePerArtifact(unwrapped, project)
  const covered = new Set(
    doc.pages.flatMap((page) => page.nodes.flatMap((node) => (node.type === 'prototype' ? [node.route] : []))),
  )
  const missing = projectArtifactSections(project)
    .flatMap((section) => section.items)
    .filter((artifact) => !covered.has(artifact.route))
  if (!missing.length) return unwrapped
  const bottom = Math.max(0, ...canvas.nodes.map((node) => nodeBounds(node)).map((r) => r.y + r.h)) + ROW_GAP
  const { nodes } = layoutSections(project, [{ label: 'New since you last looked', items: missing }], bottom)
  return {
    ...unwrapped,
    pages: unwrapped.pages.map((page) =>
      page.id === canvas.id ? { ...page, nodes: [...page.nodes, ...nodes] } : page,
    ),
  }
}

/** Drops the extra frame that used to sit behind each live artifact. */
function unwrapArtifactFrames(page: BoardPage): BoardPage {
  const protoLabels = new Set(page.nodes.flatMap((node) => (node.type === 'prototype' ? [node.label] : [])))
  const frames = new Set(
    page.nodes.flatMap((node) => {
      if (node.type === 'frame' && protoLabels.has(node.title)) return [node.id]
      if (node.type !== 'prototype' || !node.parentId) return []
      const parent = page.nodes.find((other) => other.id === node.parentId)
      return parent?.type === 'frame' ? [parent.id] : []
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
