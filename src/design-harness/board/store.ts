import { centerOf, contains, nodeBounds, pointIn } from './geometry'
import type { BoardBackground, BoardDoc, BoardNode, BoardPage, Camera, NodePatch } from './types'

export const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `n-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const HISTORY_LIMIT = 100

export const DEFAULT_CAMERA: Camera = { x: 0, y: 0, zoom: 1 }

export function emptyPage(name: string): BoardPage {
  return { id: newId(), name, nodes: [], camera: { ...DEFAULT_CAMERA } }
}

export function emptyDoc(): BoardDoc {
  const page = emptyPage('Page 1')
  return { version: 1, pages: [page], activePageId: page.id, background: 'dots' }
}

export type BoardState = {
  doc: BoardDoc
  past: BoardDoc[]
  future: BoardDoc[]
  selected: string[]
  /** False until the saved board has loaded, so autosave never overwrites it with an empty one. */
  ready: boolean
}

export type BoardAction =
  | { type: 'load'; doc: BoardDoc }
  | { type: 'checkpoint' }
  | { type: 'undo' }
  | { type: 'redo' }
  | { type: 'add'; nodes: BoardNode[]; select?: boolean }
  | { type: 'update'; patches: { id: string; patch: NodePatch }[]; history?: boolean }
  | { type: 'remove'; ids: string[] }
  | { type: 'reorder'; ids: string[]; direction: 'forward' | 'backward' | 'front' | 'back' }
  | { type: 'reparent'; ids: string[] }
  | { type: 'select'; ids: string[] }
  | { type: 'camera'; camera: Camera }
  | { type: 'addPage'; name?: string }
  | { type: 'renamePage'; id: string; name: string }
  | { type: 'deletePage'; id: string }
  | { type: 'duplicatePage'; id: string }
  | { type: 'switchPage'; id: string }
  | { type: 'background'; background: BoardBackground }

export const activePage = (doc: BoardDoc): BoardPage =>
  doc.pages.find((page) => page.id === doc.activePageId) ?? doc.pages[0]

function withPage(doc: BoardDoc, change: (page: BoardPage) => BoardPage): BoardDoc {
  const current = activePage(doc)
  return { ...doc, pages: doc.pages.map((page) => (page.id === current.id ? change(page) : page)) }
}

const withNodes = (doc: BoardDoc, change: (nodes: BoardNode[]) => BoardNode[]) =>
  withPage(doc, (page) => ({ ...page, nodes: change(page.nodes) }))

/** Frames own the nodes whose centre sits inside them; the topmost frame wins. */
export function assignParents(nodes: BoardNode[], ids?: string[]): BoardNode[] {
  const frames = nodes.filter((node) => node.type === 'frame')
  const only = ids ? new Set(ids) : undefined
  return nodes.map((node) => {
    if (node.type === 'frame' || (only && !only.has(node.id))) return node
    const bounds = nodeBounds(node)
    const center = centerOf(bounds)
    let parent: string | undefined
    for (let i = frames.length - 1; i >= 0; i--) {
      const frame = nodeBounds(frames[i])
      if (contains(frame, bounds) || pointIn(center, frame)) {
        parent = frames[i].id
        break
      }
    }
    return parent === node.parentId ? node : { ...node, parentId: parent }
  })
}

/** Ids plus every node inside the frames among them. */
export function withChildren(nodes: BoardNode[], ids: string[]): string[] {
  const set = new Set(ids)
  for (const node of nodes) if (node.parentId && set.has(node.parentId)) set.add(node.id)
  return [...set]
}

function push(state: BoardState, doc: BoardDoc): BoardState {
  return { ...state, doc, past: [...state.past, state.doc].slice(-HISTORY_LIMIT), future: [] }
}

/** Undo restores content but keeps where each page is looking. */
function restore(target: BoardDoc, current: BoardDoc): BoardDoc {
  const cameras = new Map(current.pages.map((page) => [page.id, page.camera]))
  const pages = target.pages.map((page) => ({ ...page, camera: cameras.get(page.id) ?? page.camera }))
  const keepActive = pages.some((page) => page.id === current.activePageId)
  return { ...target, pages, activePageId: keepActive ? current.activePageId : target.activePageId }
}

function reorder(nodes: BoardNode[], ids: Set<string>, direction: 'forward' | 'backward' | 'front' | 'back') {
  if (direction === 'front') return [...nodes.filter((n) => !ids.has(n.id)), ...nodes.filter((n) => ids.has(n.id))]
  if (direction === 'back') return [...nodes.filter((n) => ids.has(n.id)), ...nodes.filter((n) => !ids.has(n.id))]
  const next = [...nodes]
  if (direction === 'forward') {
    for (let i = next.length - 2; i >= 0; i--) {
      if (ids.has(next[i].id) && !ids.has(next[i + 1].id)) [next[i], next[i + 1]] = [next[i + 1], next[i]]
    }
  } else {
    for (let i = 1; i < next.length; i++) {
      if (ids.has(next[i].id) && !ids.has(next[i - 1].id)) [next[i], next[i - 1]] = [next[i - 1], next[i]]
    }
  }
  return next
}

function copyPage(page: BoardPage, name: string): BoardPage {
  const ids = new Map(page.nodes.map((node) => [node.id, newId()]))
  return {
    id: newId(),
    name,
    camera: { ...page.camera },
    nodes: page.nodes.map((node) => ({
      ...node,
      id: ids.get(node.id)!,
      parentId: node.parentId ? ids.get(node.parentId) : undefined,
    })),
  }
}

function nextPageName(doc: BoardDoc): string {
  const taken = new Set(doc.pages.map((page) => page.name))
  let n = doc.pages.length + 1
  while (taken.has(`Page ${n}`)) n++
  return `Page ${n}`
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  const { doc } = state
  switch (action.type) {
    case 'load':
      return { doc: action.doc, past: [], future: [], selected: [], ready: true }
    case 'checkpoint':
      return { ...state, past: [...state.past, doc].slice(-HISTORY_LIMIT), future: [] }
    case 'undo': {
      const previous = state.past[state.past.length - 1]
      if (!previous) return state
      return {
        ...state,
        doc: restore(previous, doc),
        past: state.past.slice(0, -1),
        future: [doc, ...state.future],
        selected: [],
      }
    }
    case 'redo': {
      const [next, ...rest] = state.future
      if (!next) return state
      return { ...state, doc: restore(next, doc), past: [...state.past, doc], future: rest, selected: [] }
    }
    case 'add': {
      const ids = action.nodes.map((node) => node.id)
      const addsFrame = action.nodes.some((node) => node.type === 'frame')
      const next = withNodes(doc, (nodes) => assignParents([...nodes, ...action.nodes], addsFrame ? undefined : ids))
      return { ...push(state, next), selected: action.select === false ? state.selected : ids }
    }
    case 'update': {
      const patches = new Map(action.patches.map(({ id, patch }) => [id, patch]))
      const next = withNodes(doc, (nodes) =>
        nodes.map((node) => {
          const patch = patches.get(node.id)
          return patch ? ({ ...node, ...patch } as BoardNode) : node
        }),
      )
      return action.history === false ? { ...state, doc: next } : push(state, next)
    }
    case 'remove': {
      if (!action.ids.length) return state
      const ids = new Set(withChildren(activePage(doc).nodes, action.ids))
      const next = withNodes(doc, (nodes) => nodes.filter((node) => !ids.has(node.id)))
      return { ...push(state, next), selected: state.selected.filter((id) => !ids.has(id)) }
    }
    case 'reorder':
      return push(
        state,
        withNodes(doc, (nodes) => reorder(nodes, new Set(action.ids), action.direction)),
      )
    case 'reparent':
      return { ...state, doc: withNodes(doc, (nodes) => assignParents(nodes, action.ids)) }
    case 'select':
      return { ...state, selected: action.ids }
    case 'camera':
      return { ...state, doc: withPage(doc, (page) => ({ ...page, camera: action.camera, fresh: undefined })) }
    case 'addPage': {
      const page = emptyPage(action.name ?? nextPageName(doc))
      return { ...push(state, { ...doc, pages: [...doc.pages, page], activePageId: page.id }), selected: [] }
    }
    case 'renamePage': {
      const name = action.name.trim()
      if (!name) return state
      return push(state, {
        ...doc,
        pages: doc.pages.map((page) => (page.id === action.id ? { ...page, name } : page)),
      })
    }
    case 'deletePage': {
      if (doc.pages.length < 2) return state
      const at = doc.pages.findIndex((page) => page.id === action.id)
      const pages = doc.pages.filter((page) => page.id !== action.id)
      const activePageId = doc.activePageId === action.id ? pages[Math.max(0, at - 1)].id : doc.activePageId
      return { ...push(state, { ...doc, pages, activePageId }), selected: [] }
    }
    case 'duplicatePage': {
      const source = doc.pages.find((page) => page.id === action.id)
      if (!source) return state
      const copy = copyPage(source, `${source.name} copy`)
      const at = doc.pages.indexOf(source)
      const pages = [...doc.pages.slice(0, at + 1), copy, ...doc.pages.slice(at + 1)]
      return { ...push(state, { ...doc, pages, activePageId: copy.id }), selected: [] }
    }
    case 'switchPage':
      if (!doc.pages.some((page) => page.id === action.id)) return state
      return { ...state, doc: { ...doc, activePageId: action.id }, selected: [] }
    case 'background':
      return { ...state, doc: { ...doc, background: action.background } }
    default: {
      const _exhaustive: never = action
      return _exhaustive
    }
  }
}

/** Fresh copies of nodes (and the children of copied frames), shifted by an offset. */
export function cloneNodes(all: BoardNode[], ids: string[], offset: number): BoardNode[] {
  const picked = withChildren(all, ids)
  const map = new Map(picked.map((id) => [id, newId()]))
  return all
    .filter((node) => map.has(node.id))
    .map((node) => ({
      ...node,
      id: map.get(node.id)!,
      x: node.x + offset,
      y: node.y + offset,
      parentId: node.parentId && map.has(node.parentId) ? map.get(node.parentId) : node.parentId,
    }))
}
