import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent as ReactDragEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Icon, IconButton } from '../ui'
import { ArtifactViewer, LinkDialog, PrototypePicker, type ViewerTarget } from './BoardDialogs'
import { BoardNodeView } from './BoardNodeView'
import { BoardPopover } from './BoardPopover'
import { closePopover } from './popover'
import { BoardToolbar, ColorSwatches, type ShapeTool } from './BoardToolbar'
import { embedNode, nodesFromFiles } from './files'
import {
  fitCamera,
  intersects,
  nodeBounds,
  rectFromPoints,
  resizeRect,
  snapAngle,
  toWorld,
  unionBounds,
  zoomAt,
  type Handle,
} from './geometry'
import {
  FrameBringForward,
  FrameCopy,
  FrameDownload,
  FrameFit,
  FrameMenuDots,
  FrameRedo,
  FrameSendBackward,
  FrameTrash,
  FrameUndo,
  FrameUpload,
  FrameZoomIn,
  FrameZoomOut,
} from './icons'
import { downloadBlob, exportBoard, importBoard, loadDoc, MAIN_BOARD, saveDoc } from './persistence'
import type { BoardPrototypeEntry } from './prototypes'
import { activePage, boardReducer, cloneNodes, emptyDoc, newId, withChildren, type BoardState } from './store'
import { projectDoc, refreshStory, seedDoc, syncProjectDoc } from './seed'
import { pageNodes, writtenPageSource } from './pageNodes'
import { resolveProjectRoute, type Project } from '../projectsIndex'
import type { BoardColor, BoardNode, Camera, NodePatch, Point, PrototypeNode, Rect, Tool } from './types'

type Drag =
  | { kind: 'pan'; start: Point; camera: Camera }
  | { kind: 'marquee'; origin: Point; current: Point; base: string[] }
  | { kind: 'move'; origin: Point; starts: Map<string, Point>; moved: boolean }
  | { kind: 'resize'; handle: Handle; origin: Point; node: BoardNode; moved: boolean }
  | { kind: 'create'; tool: Tool; origin: Point; current: Point; shift: boolean }
  | { kind: 'draw'; points: number[] }

/** Room between the board's content and a page put on it from a source card. */
const EXPAND_GAP = 320
const CLIPBOARD_TYPE = 'application/x-design-harness-board'
const BOARD_CLIPBOARD_MARK = 'design-harness-board:'
const COLORED = new Set<BoardNode['type']>(['sticky', 'text', 'shape', 'line', 'draw'])
const EDITABLE = new Set<BoardNode['type']>(['sticky', 'text', 'shape', 'frame'])
const LIVE = new Set<BoardNode['type']>(['prototype', 'embed', 'file'])
const RATIO_LOCKED = new Set<BoardNode['type']>(['image'])
const HANDLES: Handle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']

const DEFAULT_SIZE: Partial<Record<Tool, { w: number; h: number }>> = {
  sticky: { w: 200, h: 200 },
  frame: { w: 800, h: 560 },
  rect: { w: 200, h: 140 },
  ellipse: { w: 160, h: 160 },
  text: { w: 280, h: 40 },
}

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement && (target.isContentEditable || Boolean(target.closest('input, textarea, select')))

function createNode(tool: Tool, rect: Rect, color: BoardColor): BoardNode | undefined {
  const id = newId()
  switch (tool) {
    case 'sticky':
      return { id, type: 'sticky', text: '', color, ...rect }
    case 'text':
      return { id, type: 'text', text: '', color: 'ink', ...rect }
    case 'frame':
      return { id, type: 'frame', title: 'Frame', ...rect }
    case 'rect':
    case 'ellipse':
      return { id, type: 'shape', shape: tool, color: color === 'yellow' ? 'teal' : color, text: '', ...rect }
    default:
      return undefined
  }
}

const initialState = (): BoardState => ({ doc: emptyDoc(), past: [], future: [], selected: [], ready: false })

/**
 * `#/board` — an infinite canvas of pages, notes, files and live prototypes. Saved in this browser.
 * With a `project` (`#/playground/<slug>/board`), the project is this canvas.
 */
export function BoardPage({ project }: { project?: Project }) {
  const storageKey = project ? `project:${project.slug}` : MAIN_BOARD
  const [state, dispatch] = useReducer(boardReducer, undefined, initialState)
  const { doc, selected } = state
  const page = activePage(doc)
  const camera = page.camera
  const nodes = page.nodes

  const viewport = useRef<HTMLDivElement>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const importInput = useRef<HTMLInputElement>(null)
  const [view, setView] = useState({ w: 0, h: 0 })
  const [tool, setTool] = useState<Tool>('select')
  const [shapeTool, setShapeTool] = useState<ShapeTool>('rect')
  const [stickyColor, setStickyColor] = useState<BoardColor>('yellow')
  const [penColor, setPenColor] = useState<BoardColor>('ink')
  const [editing, setEditing] = useState<string>()
  const [interactive, setInteractive] = useState<string>()
  const [spaceHeld, setSpaceHeld] = useState(false)
  const [drag, setDragState] = useState<Drag>()
  const dragRef = useRef<Drag>(undefined)
  /** Pointer capture retargets click and dblclick to the viewport, so remember what was pressed. */
  const pressedRef = useRef<HTMLElement | null>(null)
  const [picker, setPicker] = useState<'prototype' | 'link'>()
  const [viewing, setViewing] = useState<ViewerTarget>()
  const [notice, setNotice] = useState<string>()
  const zoomMenu = useId()
  const moreMenu = useId()

  const stateRef = useRef(state)
  useLayoutEffect(() => {
    stateRef.current = state
  })

  const setDrag = (next: Drag | undefined) => {
    dragRef.current = next
    setDragState(next)
  }

  const flash = useCallback((message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice((current) => (current === message ? undefined : current)), 2600)
  }, [])

  // Load once, then autosave every change shortly after it happens.
  useEffect(() => {
    let live = true
    const fresh = () => (project ? projectDoc(project) : seedDoc())
    loadDoc(storageKey)
      .then((saved) => {
        if (live)
          dispatch({ type: 'load', doc: saved && project ? syncProjectDoc(saved, project) : (saved ?? fresh()) })
      })
      .catch(() => {
        if (live) dispatch({ type: 'load', doc: fresh() })
      })
    return () => {
      live = false
    }
  }, [project, storageKey])

  useEffect(() => {
    if (!state.ready) return
    const timer = window.setTimeout(
      () => void saveDoc(storageKey, doc).catch(() => flash('Couldn’t save the board')),
      400,
    )
    return () => window.clearTimeout(timer)
  }, [doc, state.ready, flash, storageKey])

  useLayoutEffect(() => {
    const node = viewport.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) =>
      setView({ w: entry.contentRect.width, h: entry.contentRect.height }),
    )
    observer.observe(node)
    // The camera pans the board; focusing an off-screen control must not scroll the viewport underneath it.
    const unscroll = () => {
      if (node.scrollLeft || node.scrollTop) node.scrollTo(0, 0)
    }
    node.addEventListener('scroll', unscroll)
    return () => {
      observer.disconnect()
      node.removeEventListener('scroll', unscroll)
    }
  }, [])

  const screenPoint = useCallback((event: { clientX: number; clientY: number }): Point => {
    const box = viewport.current!.getBoundingClientRect()
    return { x: event.clientX - box.left, y: event.clientY - box.top }
  }, [])

  const worldPoint = useCallback(
    (event: { clientX: number; clientY: number }) => toWorld(camera, screenPoint(event)),
    [camera, screenPoint],
  )

  const setCamera = useCallback((next: Camera) => dispatch({ type: 'camera', camera: next }), [])

  const viewCenter = useCallback((): Point => toWorld(camera, { x: view.w / 2, y: view.h / 2 }), [camera, view])

  const zoomBy = useCallback(
    (factor: number) => setCamera(zoomAt(camera, { x: view.w / 2, y: view.h / 2 }, camera.zoom * factor)),
    [camera, view, setCamera],
  )

  const zoomTo = useCallback(
    (zoom: number) => setCamera(zoomAt(camera, { x: view.w / 2, y: view.h / 2 }, zoom)),
    [camera, view, setCamera],
  )

  const fitTo = useCallback(
    (ids?: string[]) => {
      const pool = ids ? nodes.filter((node) => ids.includes(node.id)) : nodes
      const bounds = unionBounds(pool.map(nodeBounds))
      if (!bounds) return setCamera({ x: view.w / 2, y: view.h / 2, zoom: 1 })
      setCamera(fitCamera(bounds, view))
    },
    [nodes, view, setCamera],
  )

  // A page nobody has opened yet shows all of its content the first time.
  // Run once per page — do not re-fit when `fitTo` changes, or zoom fights the user.
  const fitted = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (!state.ready || !page.fresh || view.w <= 0 || fitted.current === page.id) return
    fitted.current = page.id
    fitTo(page.focus)
  }, [state.ready, page.fresh, page.focus, page.id, view.w, fitTo])

  const pickTool = useCallback((next: Tool) => {
    setTool(next)
    if (next === 'rect' || next === 'ellipse' || next === 'line' || next === 'arrow') setShapeTool(next)
    setEditing(undefined)
    setInteractive(undefined)
  }, [])

  const addNodes = useCallback((added: BoardNode[]) => {
    if (added.length) dispatch({ type: 'add', nodes: added })
  }, [])

  const insertFiles = useCallback(
    async (files: File[], at?: Point) => {
      if (!files.length) return
      try {
        addNodes(await nodesFromFiles(files, at ?? viewCenter()))
      } catch {
        flash('Couldn’t add that file')
      }
    },
    [addNodes, viewCenter, flash],
  )

  const placePrototype = (entry: BoardPrototypeEntry) => {
    const center = viewCenter()
    addNodes([
      {
        id: newId(),
        type: 'prototype',
        route: entry.route,
        label: entry.label,
        project: entry.project,
        x: center.x - entry.size.w / 2,
        y: center.y - entry.size.h / 2,
        ...entry.size,
      },
    ])
  }

  const placeLink = (url: string, at?: Point) => {
    const center = at ?? viewCenter()
    const node = embedNode(url, { x: center.x - 400, y: center.y - 260 })
    if (node) addNodes([node])
  }

  // ——— Wheel and pinch: pan with two fingers, zoom with ⌘/Ctrl or a pinch ———
  useEffect(() => {
    const node = viewport.current
    if (!node) return
    const current = () => activePage(stateRef.current.doc).camera
    const onWheel = (event: WheelEvent) => {
      if (isTyping(event.target) && !(event.ctrlKey || event.metaKey)) return
      event.preventDefault()
      const cam = current()
      if (event.ctrlKey || event.metaKey) {
        const box = node.getBoundingClientRect()
        const delta = Math.max(-30, Math.min(30, event.deltaY * (event.deltaMode === 1 ? 5 : 1)))
        const factor = Math.exp(-delta * 0.01)
        dispatch({
          type: 'camera',
          camera: zoomAt(cam, { x: event.clientX - box.left, y: event.clientY - box.top }, cam.zoom * factor),
        })
      } else {
        const dx = event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX
        const dy = event.shiftKey && !event.deltaX ? 0 : event.deltaY
        dispatch({ type: 'camera', camera: { ...cam, x: cam.x - dx, y: cam.y - dy } })
      }
    }
    // Safari pinch arrives as gesture events rather than ctrl+wheel.
    let gestureStart = 1
    const onGestureStart = (event: Event) => {
      event.preventDefault()
      gestureStart = current().zoom
    }
    const onGestureChange = (event: Event) => {
      event.preventDefault()
      const gesture = event as Event & { scale: number; clientX: number; clientY: number }
      const box = node.getBoundingClientRect()
      dispatch({
        type: 'camera',
        camera: zoomAt(
          current(),
          { x: gesture.clientX - box.left, y: gesture.clientY - box.top },
          gestureStart * gesture.scale,
        ),
      })
    }
    node.addEventListener('wheel', onWheel, { passive: false })
    node.addEventListener('gesturestart', onGestureStart)
    node.addEventListener('gesturechange', onGestureChange)
    return () => {
      node.removeEventListener('wheel', onWheel)
      node.removeEventListener('gesturestart', onGestureStart)
      node.removeEventListener('gesturechange', onGestureChange)
    }
  }, [])

  // ——— Pointer: select, move, resize, marquee, create, draw, pan ———
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    pressedRef.current = target
    if (target.closest('[data-board-control], [data-board-interactive]') || isTyping(target)) return
    if (event.button !== 0 && event.button !== 1) return
    const world = worldPoint(event)
    const screen = screenPoint(event)
    const nodeEl = target.closest<HTMLElement>('[data-node-id]')
    const nodeId = nodeEl?.dataset.nodeId
    const handle = target.closest<HTMLElement>('[data-handle]')?.dataset.handle as Handle | undefined

    viewport.current?.setPointerCapture(event.pointerId)
    if (editing && editing !== nodeId) setEditing(undefined)
    if (interactive && interactive !== nodeId) setInteractive(undefined)

    if (event.button === 1 || spaceHeld || tool === 'hand') {
      event.preventDefault()
      setDrag({ kind: 'pan', start: screen, camera })
      return
    }

    if (handle && selected.length === 1) {
      const node = nodes.find((n) => n.id === selected[0])
      if (node) setDrag({ kind: 'resize', handle, origin: world, node, moved: false })
      return
    }

    if (tool === 'pen') {
      setDrag({ kind: 'draw', points: [world.x, world.y] })
      return
    }

    if (tool !== 'select') {
      setDrag({ kind: 'create', tool, origin: world, current: world, shift: event.shiftKey })
      return
    }

    if (nodeId) {
      let ids = selected
      if (event.shiftKey) {
        ids = selected.includes(nodeId) ? selected.filter((id) => id !== nodeId) : [...selected, nodeId]
      } else if (!selected.includes(nodeId)) {
        ids = [nodeId]
      }
      dispatch({ type: 'select', ids })
      if (!ids.includes(nodeId)) return
      const moving = withChildren(nodes, ids)
      const starts = new Map(
        nodes.filter((node) => moving.includes(node.id)).map((node) => [node.id, { x: node.x, y: node.y }]),
      )
      setDrag({ kind: 'move', origin: world, starts, moved: false })
      return
    }

    if (!event.shiftKey) dispatch({ type: 'select', ids: [] })
    setDrag({ kind: 'marquee', origin: world, current: world, base: event.shiftKey ? selected : [] })
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = dragRef.current
    if (!current) return
    const world = worldPoint(event)
    switch (current.kind) {
      case 'pan': {
        const screen = screenPoint(event)
        setCamera({
          ...current.camera,
          x: current.camera.x + screen.x - current.start.x,
          y: current.camera.y + screen.y - current.start.y,
        })
        return
      }
      case 'marquee': {
        const rect = rectFromPoints(current.origin, world)
        const hits = nodes.filter((node) => intersects(rect, nodeBounds(node))).map((node) => node.id)
        dispatch({ type: 'select', ids: [...new Set([...current.base, ...hits])] })
        setDrag({ ...current, current: world })
        return
      }
      case 'move': {
        const dx = world.x - current.origin.x
        const dy = world.y - current.origin.y
        if (!current.moved && Math.hypot(dx, dy) * camera.zoom < 3) return
        if (!current.moved) {
          dispatch({ type: 'checkpoint' })
          dragRef.current = { ...current, moved: true }
        }
        dispatch({
          type: 'update',
          history: false,
          patches: [...current.starts].map(([id, start]) => ({ id, patch: { x: start.x + dx, y: start.y + dy } })),
        })
        return
      }
      case 'resize': {
        if (!current.moved) {
          dispatch({ type: 'checkpoint' })
          dragRef.current = { ...current, moved: true }
        }
        const { node, handle } = current
        const dx = world.x - current.origin.x
        const dy = world.y - current.origin.y
        let patch: NodePatch
        if (node.type === 'line') {
          if (handle === 'start') {
            patch = { x: node.x + dx, y: node.y + dy, w: node.w - dx, h: node.h - dy }
          } else {
            const end = event.shiftKey ? snapAngle(node.w + dx, node.h + dy) : { x: node.w + dx, y: node.h + dy }
            patch = { w: end.x, h: end.y }
          }
        } else {
          const locked = RATIO_LOCKED.has(node.type) !== event.shiftKey
          patch = resizeRect(nodeBounds(node), handle, dx, dy, locked)
        }
        dispatch({ type: 'update', history: false, patches: [{ id: node.id, patch }] })
        return
      }
      case 'create':
        setDrag({ ...current, current: world, shift: event.shiftKey })
        return
      case 'draw': {
        const last = current.points.length - 2
        if (Math.hypot(world.x - current.points[last], world.y - current.points[last + 1]) * camera.zoom < 2) return
        setDrag({ kind: 'draw', points: [...current.points, world.x, world.y] })
        return
      }
    }
  }

  const finishCreate = (current: Extract<Drag, { kind: 'create' }>) => {
    const { origin, current: end, tool: kind } = current
    const dragged = Math.hypot(end.x - origin.x, end.y - origin.y) * camera.zoom > 6
    if (kind === 'line' || kind === 'arrow') {
      let delta = dragged ? { x: end.x - origin.x, y: end.y - origin.y } : { x: 200, y: 0 }
      if (current.shift) delta = snapAngle(delta.x, delta.y)
      addNodes([
        {
          id: newId(),
          type: 'line',
          arrow: kind === 'arrow',
          color: 'ink',
          x: origin.x,
          y: origin.y,
          w: delta.x,
          h: delta.y,
        },
      ])
    } else {
      const size = DEFAULT_SIZE[kind] ?? { w: 160, h: 120 }
      let rect = dragged ? rectFromPoints(origin, end) : { x: origin.x - size.w / 2, y: origin.y - size.h / 2, ...size }
      if (dragged && current.shift) {
        const side = Math.max(rect.w, rect.h)
        rect = { ...rect, w: side, h: side }
      }
      if (kind === 'text' && !dragged) rect = { ...rect, y: origin.y - size.h / 2 }
      if (kind === 'text') rect = { ...rect, h: Math.max(rect.h, 40) }
      const node = createNode(kind, rect, stickyColor)
      if (node) {
        addNodes([node])
        if (kind === 'sticky' || kind === 'text') {
          dispatch({ type: 'checkpoint' })
          setEditing(node.id)
        }
      }
    }
    setTool('select')
  }

  const finishDraw = (points: number[]) => {
    const xs = points.filter((_, i) => i % 2 === 0)
    const ys = points.filter((_, i) => i % 2 === 1)
    const x = Math.min(...xs)
    const y = Math.min(...ys)
    const w = Math.max(Math.max(...xs) - x, 1)
    const h = Math.max(Math.max(...ys) - y, 1)
    const local = points.map((value, i) => value - (i % 2 === 0 ? x : y))
    dispatch({
      type: 'add',
      select: false,
      nodes: [{ id: newId(), type: 'draw', points: local, vw: w, vh: h, color: penColor, x, y, w, h }],
    })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = dragRef.current
    if (viewport.current?.hasPointerCapture(event.pointerId)) viewport.current.releasePointerCapture(event.pointerId)
    setDrag(undefined)
    if (!current) return
    if (current.kind === 'move' && current.moved) dispatch({ type: 'reparent', ids: [...current.starts.keys()] })
    if (current.kind === 'resize' && current.moved) {
      dispatch({
        type: 'reparent',
        ids: current.node.type === 'frame' ? nodes.map((node) => node.id) : [current.node.id],
      })
    }
    if (current.kind === 'create') finishCreate(current)
    if (current.kind === 'draw') finishDraw(current.points)
  }

  const onDoubleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = pressedRef.current ?? (event.target as HTMLElement)
    if (target.closest('[data-board-control]') || isTyping(target)) return
    const nodeId = target.closest<HTMLElement>('[data-node-id]')?.dataset.nodeId
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) {
      if (tool !== 'select') return
      const world = worldPoint(event)
      const sticky = createNode('sticky', { x: world.x - 100, y: world.y - 100, w: 200, h: 200 }, stickyColor)
      if (sticky) {
        addNodes([sticky])
        dispatch({ type: 'checkpoint' })
        setEditing(sticky.id)
      }
      return
    }
    if (EDITABLE.has(node.type)) {
      dispatch({ type: 'select', ids: [node.id] })
      dispatch({ type: 'checkpoint' })
      setEditing(node.id)
    } else if (LIVE.has(node.type)) {
      dispatch({ type: 'select', ids: [node.id] })
      setInteractive(node.id)
    }
  }

  const onEdit = useCallback((id: string, patch: NodePatch) => {
    dispatch({ type: 'update', history: false, patches: [{ id, patch }] })
  }, [])

  const onEditEnd = useCallback(() => setEditing(undefined), [])
  const onZoomTo = useCallback((id: string) => fitTo([id]), [fitTo])
  const onRefresh = useCallback(() => {
    if (!project) return
    const next = refreshStory(page, project, true)
    if (next) dispatch({ type: 'setNodes', nodes: next })
  }, [page, project])
  const onExpand = useCallback(
    (node: PrototypeNode) => {
      const owner = resolveProjectRoute(node.route)?.project
      const source = owner ? writtenPageSource(owner, node.route) : undefined
      const others = nodes.filter((other) => other.id !== node.id).map(nodeBounds)
      const at = { x: node.x, y: Math.max(node.y, ...others.map((r) => r.y + r.h)) + EXPAND_GAP }
      const blocks = source ? pageNodes(source, node.label, node.route, at, newId) : undefined
      if (!blocks) return
      dispatch({ type: 'replace', ids: [node.id], nodes: blocks.nodes })
      setCamera(fitCamera(nodeBounds(blocks.frames[0]), view))
    },
    [nodes, view, setCamera],
  )

  // Text nodes grow with what's typed.
  useLayoutEffect(() => {
    if (!editing) return
    const node = nodes.find((n) => n.id === editing)
    if (node?.type !== 'text') return
    const area = viewport.current?.querySelector<HTMLTextAreaElement>(`[data-node-id="${editing}"] textarea`)
    if (!area) return
    area.style.height = '0'
    const height = area.scrollHeight
    area.style.height = ''
    if (Math.abs(height - node.h) > 1) onEdit(node.id, { h: height })
  }, [editing, nodes, onEdit])

  const selectedNodes = useMemo(() => nodes.filter((node) => selected.includes(node.id)), [nodes, selected])

  const duplicate = useCallback(() => {
    if (!selected.length) return
    addNodes(cloneNodes(nodes, selected, 24))
  }, [nodes, selected, addNodes])

  const remove = useCallback(() => dispatch({ type: 'remove', ids: selected }), [selected])

  // ——— Keyboard ———
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (picker) return
      if (isTyping(event.target)) return
      const command = event.metaKey || event.ctrlKey
      const key = event.key.toLowerCase()
      if (event.key === ' ' && !event.repeat) {
        setSpaceHeld(true)
        event.preventDefault()
        return
      }
      if (command && key === 'z') {
        event.preventDefault()
        dispatch({ type: event.shiftKey ? 'redo' : 'undo' })
        return
      }
      if (command && key === 'y') {
        event.preventDefault()
        dispatch({ type: 'redo' })
        return
      }
      if (command && key === 'd') {
        event.preventDefault()
        duplicate()
        return
      }
      if (command && key === 'a') {
        event.preventDefault()
        dispatch({ type: 'select', ids: nodes.map((node) => node.id) })
        return
      }
      if (command && (key === '=' || key === '+')) {
        event.preventDefault()
        zoomBy(1.25)
        return
      }
      if (command && key === '-') {
        event.preventDefault()
        zoomBy(0.8)
        return
      }
      if (command && key === '0') {
        event.preventDefault()
        zoomTo(1)
        return
      }
      if (event.shiftKey && (event.key === '!' || event.code === 'Digit1')) {
        event.preventDefault()
        fitTo()
        return
      }
      if (event.shiftKey && (event.key === '@' || event.code === 'Digit2') && selected.length) {
        event.preventDefault()
        fitTo(selected)
        return
      }
      if (command) return
      if (event.key === 'Escape') {
        setInteractive(undefined)
        setEditing(undefined)
        if (tool !== 'select') setTool('select')
        else dispatch({ type: 'select', ids: [] })
        return
      }
      if ((event.key === 'Delete' || event.key === 'Backspace') && selected.length) {
        event.preventDefault()
        remove()
        return
      }
      if (event.key === 'Enter' && selected.length === 1) {
        const node = selectedNodes[0]
        if (node && EDITABLE.has(node.type)) {
          event.preventDefault()
          dispatch({ type: 'checkpoint' })
          setEditing(node.id)
        } else if (node && LIVE.has(node.type)) {
          setInteractive(node.id)
        }
        return
      }
      if (event.key === ']' || event.key === '[') {
        if (!selected.length) return
        const direction = event.key === ']' ? (event.altKey ? 'front' : 'forward') : event.altKey ? 'back' : 'backward'
        dispatch({ type: 'reorder', ids: selected, direction })
        return
      }
      const arrows: Record<string, Point> = {
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
      }
      if (arrows[event.key] && selected.length) {
        event.preventDefault()
        const step = event.shiftKey ? 10 : 1
        const moving = withChildren(nodes, selected)
        dispatch({
          type: 'update',
          patches: nodes
            .filter((node) => moving.includes(node.id))
            .map((node) => ({
              id: node.id,
              patch: { x: node.x + arrows[event.key].x * step, y: node.y + arrows[event.key].y * step },
            })),
        })
        return
      }
      const toolKeys: Record<string, Tool> = {
        v: 'select',
        h: 'hand',
        t: 'text',
        f: 'frame',
        s: 'sticky',
        p: 'pen',
        r: 'rect',
        o: 'ellipse',
        l: 'line',
        a: 'arrow',
      }
      if (toolKeys[key] && !event.altKey) pickTool(toolKeys[key])
    }
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === ' ') setSpaceHeld(false)
    }
    const onBlur = () => setSpaceHeld(false)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [picker, nodes, selected, selectedNodes, tool, duplicate, remove, zoomBy, zoomTo, fitTo, pickTool])

  // ——— Clipboard: copy nodes between pages, paste images, links and text ———
  useEffect(() => {
    const onCopy = (event: ClipboardEvent) => {
      if (isTyping(event.target) || !selected.length || !event.clipboardData) return
      const picked = withChildren(nodes, selected)
      const payload = JSON.stringify(nodes.filter((node) => picked.includes(node.id)))
      event.clipboardData.setData(CLIPBOARD_TYPE, payload)
      event.clipboardData.setData('text/plain', BOARD_CLIPBOARD_MARK + payload)
      event.preventDefault()
    }
    const onPaste = (event: ClipboardEvent) => {
      if (isTyping(event.target) || picker || !event.clipboardData) return
      const data = event.clipboardData
      const text = data.getData('text/plain')
      const board =
        data.getData(CLIPBOARD_TYPE) ||
        (text.startsWith(BOARD_CLIPBOARD_MARK) ? text.slice(BOARD_CLIPBOARD_MARK.length) : '')
      event.preventDefault()
      if (board) {
        try {
          const copied = JSON.parse(board) as BoardNode[]
          addNodes(
            cloneNodes(
              copied,
              copied.map((node) => node.id),
              24,
            ),
          )
        } catch {
          flash('Couldn’t paste that')
        }
        return
      }
      const files = [...data.files]
      if (files.length) {
        void insertFiles(files)
        return
      }
      const trimmed = text.trim()
      if (!trimmed) return
      if (/^https?:\/\/\S+$/.test(trimmed)) {
        placeLink(trimmed)
        return
      }
      const center = viewCenter()
      const sticky = createNode('sticky', { x: center.x - 100, y: center.y - 100, w: 200, h: 200 }, stickyColor)
      if (sticky && sticky.type === 'sticky') addNodes([{ ...sticky, text: trimmed.slice(0, 2000) }])
    }
    window.addEventListener('copy', onCopy)
    window.addEventListener('paste', onPaste)
    return () => {
      window.removeEventListener('copy', onCopy)
      window.removeEventListener('paste', onPaste)
    }
  })

  // ——— Drop files and links from the desktop or another tab ———
  const onDragOver = (event: ReactDragEvent<HTMLDivElement>) => {
    const types = [...event.dataTransfer.types]
    if (types.includes('Files') || types.includes('text/uri-list')) {
      event.preventDefault()
      event.dataTransfer.dropEffect = 'copy'
    }
  }

  const onDrop = (event: ReactDragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const at = worldPoint(event)
    const files = [...event.dataTransfer.files]
    if (files.length) {
      void insertFiles(files, at)
      return
    }
    const uri = event.dataTransfer
      .getData('text/uri-list')
      .split('\n')
      .find((line) => line && !line.startsWith('#'))
    if (uri) placeLink(uri, at)
  }

  // ——— Paint ———
  const ordered = useMemo(
    () => [...nodes.filter((node) => node.type === 'frame'), ...nodes.filter((node) => node.type !== 'frame')],
    [nodes],
  )
  const toScreen = (rect: Rect): Rect => ({
    x: rect.x * camera.zoom + camera.x,
    y: rect.y * camera.zoom + camera.y,
    w: rect.w * camera.zoom,
    h: rect.h * camera.zoom,
  })
  const single = selectedNodes.length === 1 ? selectedNodes[0] : undefined
  const selectionBounds = unionBounds(selectedNodes.map(nodeBounds))
  let grid = 24 * camera.zoom
  while (grid < 16) grid *= 2
  const colorOf = single && COLORED.has(single.type) ? (single as { color: BoardColor }).color : undefined
  const showColors = selectedNodes.some((node) => COLORED.has(node.type))
  const panning = drag?.kind === 'pan'

  const draft = (() => {
    if (drag?.kind === 'create') {
      if (drag.tool === 'line' || drag.tool === 'arrow') {
        let delta = { x: drag.current.x - drag.origin.x, y: drag.current.y - drag.origin.y }
        if (drag.shift) delta = snapAngle(delta.x, delta.y)
        return {
          line: { x1: drag.origin.x, y1: drag.origin.y, x2: drag.origin.x + delta.x, y2: drag.origin.y + delta.y },
        }
      }
      return { rect: rectFromPoints(drag.origin, drag.current), ellipse: drag.tool === 'ellipse' }
    }
    if (drag?.kind === 'draw') return { points: drag.points }
    return undefined
  })()

  const marquee = drag?.kind === 'marquee' ? toScreen(rectFromPoints(drag.origin, drag.current)) : undefined

  return (
    <div className="design-harness-board" data-background={doc.background}>
      <div
        ref={viewport}
        className="design-harness-board__viewport"
        data-tool={spaceHeld ? 'hand' : tool}
        data-panning={panning ? 'true' : undefined}
        data-dragging={drag && drag.kind !== 'pan' ? 'true' : undefined}
        style={{
          backgroundSize: `${grid}px ${grid}px`,
          backgroundPosition: `${camera.x}px ${camera.y}px`,
        }}
        tabIndex={-1}
        aria-label={`Board canvas — ${page.name}`}
        role="application"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={onDoubleClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div
          className="design-harness-board__world"
          style={
            {
              transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
              '--board-zoom': camera.zoom,
            } as CSSProperties
          }
        >
          {ordered.map((node) => (
            <BoardNodeView
              key={node.id}
              node={node}
              editing={editing === node.id}
              interactive={interactive === node.id}
              onEdit={onEdit}
              onEditEnd={onEditEnd}
              onZoomTo={onZoomTo}
              onOpen={setViewing}
              onExpand={onExpand}
              onRefresh={project ? onRefresh : undefined}
            />
          ))}
          {draft?.rect ? (
            <div
              className="design-harness-board__draft"
              data-ellipse={draft.ellipse ? 'true' : undefined}
              style={{ left: draft.rect.x, top: draft.rect.y, width: draft.rect.w, height: draft.rect.h }}
            />
          ) : null}
          {draft?.line || draft?.points ? (
            <svg className="design-harness-board__draft-svg" data-color={penColor} aria-hidden>
              {draft.line ? <line {...draft.line} /> : null}
              {draft.points ? <polyline points={draft.points.join(' ')} /> : null}
            </svg>
          ) : null}
        </div>

        <div className="design-harness-board__overlay" aria-hidden>
          {selectedNodes.map((node) => {
            const r = toScreen(nodeBounds(node))
            return (
              <div
                key={node.id}
                className="design-harness-board__outline"
                data-outline={node.type}
                style={{ left: r.x, top: r.y, width: r.w, height: r.h }}
              />
            )
          })}
          {single && !drag && editing !== single.id
            ? single.type === 'line'
              ? (['start', 'end'] as const).map((handle) => (
                  <span
                    key={handle}
                    className="design-harness-board__handle"
                    data-handle={handle}
                    style={{
                      left: (single.x + (handle === 'end' ? single.w : 0)) * camera.zoom + camera.x,
                      top: (single.y + (handle === 'end' ? single.h : 0)) * camera.zoom + camera.y,
                    }}
                  />
                ))
              : HANDLES.map((handle) => {
                  const r = toScreen(nodeBounds(single))
                  const left = handle.includes('w') ? r.x : handle.includes('e') ? r.x + r.w : r.x + r.w / 2
                  const top = handle.includes('n') ? r.y : handle.includes('s') ? r.y + r.h : r.y + r.h / 2
                  return (
                    <span
                      key={handle}
                      className="design-harness-board__handle"
                      data-handle={handle}
                      style={{ left, top }}
                    />
                  )
                })
            : null}
          {selectedNodes.length > 1 && selectionBounds ? (
            <div
              className="design-harness-board__outline design-harness-board__outline--group"
              style={(() => {
                const r = toScreen(selectionBounds)
                return { left: r.x, top: r.y, width: r.w, height: r.h }
              })()}
            />
          ) : null}
          {marquee ? (
            <div
              className="design-harness-board__marquee"
              style={{ left: marquee.x, top: marquee.y, width: marquee.w, height: marquee.h }}
            />
          ) : null}
        </div>

        {state.ready && !nodes.length ? (
          <div className="design-harness-board__empty">
            <p>This page is empty.</p>
            <p>Double-click to add a sticky note, drop images or files here, or insert a live prototype.</p>
          </div>
        ) : null}
      </div>

      <BoardToolbar
        tool={tool}
        onTool={pickTool}
        shapeTool={shapeTool}
        penColor={penColor}
        onPenColor={setPenColor}
        pages={doc.pages}
        activePageId={page.id}
        dispatch={dispatch}
        onInsertFiles={() => fileInput.current?.click()}
        onInsertPrototype={() => setPicker('prototype')}
        onInsertLink={() => setPicker('link')}
      />

      <div className="design-harness-board-toolbar design-harness-board-toolbar--end" role="toolbar" aria-label="View">
        <IconButton label="Undo (⌘Z)" disabled={!state.past.length} onClick={() => dispatch({ type: 'undo' })}>
          <Icon icon={FrameUndo} size="sm" />
        </IconButton>
        <IconButton label="Redo (⇧⌘Z)" disabled={!state.future.length} onClick={() => dispatch({ type: 'redo' })}>
          <Icon icon={FrameRedo} size="sm" />
        </IconButton>
        <span className="design-harness-board-toolbar__rule" aria-hidden />
        <IconButton label="Zoom out (⌘−)" onClick={() => zoomBy(0.8)}>
          <Icon icon={FrameZoomOut} size="sm" />
        </IconButton>
        <button
          type="button"
          className="design-harness-board-toolbar__zoom"
          popoverTarget={zoomMenu}
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label={`Zoom ${Math.round(camera.zoom * 100)}%`}
          title="Zoom options"
        >
          {Math.round(camera.zoom * 100)}%
        </button>
        <IconButton label="Zoom in (⌘+)" onClick={() => zoomBy(1.25)}>
          <Icon icon={FrameZoomIn} size="sm" />
        </IconButton>
        <BoardPopover id={zoomMenu} label="Zoom" align="end">
          {[
            { label: 'Zoom to fit', key: '⇧1', run: () => fitTo() },
            { label: 'Zoom to selection', key: '⇧2', run: () => fitTo(selected), disabled: !selected.length },
            { label: 'Zoom to 50%', run: () => zoomTo(0.5) },
            { label: 'Zoom to 100%', key: '⌘0', run: () => zoomTo(1) },
            { label: 'Zoom to 200%', run: () => zoomTo(2) },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className="design-harness-menu__item"
              disabled={item.disabled}
              onClick={() => {
                item.run()
                closePopover(zoomMenu)
              }}
            >
              <span>{item.label}</span>
              {item.key ? <kbd className="design-harness-board-menu__key">{item.key}</kbd> : null}
            </button>
          ))}
        </BoardPopover>
        <IconButton label="Zoom to fit (⇧1)" onClick={() => fitTo()}>
          <Icon icon={FrameFit} size="sm" />
        </IconButton>
        <span className="design-harness-board-toolbar__rule" aria-hidden />
        <button
          type="button"
          className="design-harness-ds-shell-rail__btn"
          popoverTarget={moreMenu}
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Board options"
          title="Board options"
        >
          <Icon icon={FrameMenuDots} size="sm" />
        </button>
        <BoardPopover id={moreMenu} label="Board options" align="end">
          <button
            type="button"
            role="menuitemradio"
            aria-checked={doc.background === 'dots'}
            className="design-harness-menu__item"
            onClick={() => dispatch({ type: 'background', background: doc.background === 'dots' ? 'plain' : 'dots' })}
          >
            <span>Dotted background</span>
          </button>
          <hr className="design-harness-board-menu__rule" />
          <button
            type="button"
            role="menuitem"
            className="design-harness-menu__item"
            onClick={async () => {
              closePopover(moreMenu)
              const name = project ? `${project.slug}-board` : 'design-board'
              downloadBlob(await exportBoard(doc), `${name}-${new Date().toISOString().slice(0, 10)}.json`)
            }}
          >
            <Icon icon={FrameDownload} size="sm" />
            <span>Export board</span>
          </button>
          <button
            type="button"
            role="menuitem"
            className="design-harness-menu__item"
            onClick={() => {
              closePopover(moreMenu)
              importInput.current?.click()
            }}
          >
            <Icon icon={FrameUpload} size="sm" />
            <span>Import board</span>
          </button>
          <hr className="design-harness-board-menu__rule" />
          <button
            type="button"
            role="menuitem"
            className="design-harness-menu__item"
            disabled={!nodes.length}
            onClick={() => {
              closePopover(moreMenu)
              dispatch({ type: 'remove', ids: nodes.map((node) => node.id) })
            }}
          >
            <Icon icon={FrameTrash} size="sm" />
            <span>Clear this page</span>
          </button>
        </BoardPopover>
      </div>

      {selectedNodes.length && !drag && !editing ? (
        <div
          className="design-harness-board-toolbar design-harness-board-toolbar--selection"
          role="toolbar"
          aria-label="Selection"
        >
          <span className="design-harness-board-toolbar__count">
            {selectedNodes.length === 1 ? kindLabel(selectedNodes[0]) : `${selectedNodes.length} selected`}
          </span>
          {showColors ? (
            <ColorSwatches
              label="Colour"
              value={colorOf}
              onPick={(color) => {
                if (single?.type === 'sticky') setStickyColor(color)
                if (single?.type === 'draw') setPenColor(color)
                dispatch({
                  type: 'update',
                  patches: selectedNodes
                    .filter((node) => COLORED.has(node.type))
                    .map((node) => ({ id: node.id, patch: { color } })),
                })
              }}
            />
          ) : null}
          {single?.type === 'line' ? (
            <button
              type="button"
              className="design-harness-board-toolbar__text-button"
              aria-pressed={single.arrow}
              onClick={() =>
                dispatch({ type: 'update', patches: [{ id: single.id, patch: { arrow: !single.arrow } }] })
              }
            >
              Arrowhead
            </button>
          ) : null}
          <span className="design-harness-board-toolbar__rule" aria-hidden />
          <IconButton
            label="Bring forward (])"
            onClick={() => dispatch({ type: 'reorder', ids: selected, direction: 'forward' })}
          >
            <Icon icon={FrameBringForward} size="sm" />
          </IconButton>
          <IconButton
            label="Send backward ([)"
            onClick={() => dispatch({ type: 'reorder', ids: selected, direction: 'backward' })}
          >
            <Icon icon={FrameSendBackward} size="sm" />
          </IconButton>
          <IconButton label="Duplicate (⌘D)" onClick={duplicate}>
            <Icon icon={FrameCopy} size="sm" />
          </IconButton>
          <IconButton label="Delete (⌫)" onClick={remove}>
            <Icon icon={FrameTrash} size="sm" />
          </IconButton>
        </div>
      ) : null}

      {notice ? (
        <p className="design-harness-board__notice" role="status">
          {notice}
        </p>
      ) : null}

      <input
        ref={fileInput}
        type="file"
        multiple
        hidden
        onChange={(event) => {
          void insertFiles([...(event.target.files ?? [])])
          event.target.value = ''
        }}
      />
      <input
        ref={importInput}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={async (event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          if (!file) return
          try {
            dispatch({ type: 'load', doc: await importBoard(file) })
            flash('Board imported')
          } catch (error) {
            flash(error instanceof Error ? error.message : 'Couldn’t import that file')
          }
        }}
      />

      <PrototypePicker open={picker === 'prototype'} onClose={() => setPicker(undefined)} onPick={placePrototype} />
      <LinkDialog open={picker === 'link'} onClose={() => setPicker(undefined)} onSubmit={(url) => placeLink(url)} />
      <ArtifactViewer target={viewing} onClose={() => setViewing(undefined)} />
    </div>
  )
}

function kindLabel(node: BoardNode): string {
  switch (node.type) {
    case 'sticky':
      return 'Sticky note'
    case 'text':
      return 'Text'
    case 'frame':
      return node.title || 'Frame'
    case 'shape':
      return node.shape === 'ellipse' ? 'Ellipse' : 'Rectangle'
    case 'line':
      return node.arrow ? 'Arrow' : 'Line'
    case 'draw':
      return 'Drawing'
    case 'image':
      return 'Image'
    case 'file':
      return node.name
    case 'prototype':
      return node.label
    case 'embed':
      return node.label
  }
}
