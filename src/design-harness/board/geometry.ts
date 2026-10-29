import type { BoardNode, Camera, Point, Rect } from './types'

export const MIN_ZOOM = 0.05
export const MAX_ZOOM = 8

export const clampZoom = (zoom: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))

export const toWorld = (camera: Camera, p: Point): Point => ({
  x: (p.x - camera.x) / camera.zoom,
  y: (p.y - camera.y) / camera.zoom,
})

/** Zoom around a screen point so the world point under it stays put. */
export function zoomAt(camera: Camera, screen: Point, nextZoom: number): Camera {
  const zoom = clampZoom(nextZoom)
  const world = toWorld(camera, screen)
  return { zoom, x: screen.x - world.x * zoom, y: screen.y - world.y * zoom }
}

/** The node's box with positive width and height (lines can run backwards). */
export function nodeBounds(node: BoardNode): Rect {
  const x = Math.min(node.x, node.x + node.w)
  const y = Math.min(node.y, node.y + node.h)
  return { x, y, w: Math.abs(node.w), h: Math.abs(node.h) }
}

export function unionBounds(rects: Rect[]): Rect | undefined {
  if (!rects.length) return undefined
  let x1 = Infinity
  let y1 = Infinity
  let x2 = -Infinity
  let y2 = -Infinity
  for (const r of rects) {
    x1 = Math.min(x1, r.x)
    y1 = Math.min(y1, r.y)
    x2 = Math.max(x2, r.x + r.w)
    y2 = Math.max(y2, r.y + r.h)
  }
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 }
}

export const rectFromPoints = (a: Point, b: Point): Rect => ({
  x: Math.min(a.x, b.x),
  y: Math.min(a.y, b.y),
  w: Math.abs(b.x - a.x),
  h: Math.abs(b.y - a.y),
})

export const intersects = (a: Rect, b: Rect) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

export const contains = (outer: Rect, inner: Rect) =>
  inner.x >= outer.x &&
  inner.y >= outer.y &&
  inner.x + inner.w <= outer.x + outer.w &&
  inner.y + inner.h <= outer.y + outer.h

export const centerOf = (r: Rect): Point => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 })

export const pointIn = (p: Point, r: Rect) => p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h

/** Camera that fits `bounds` in a `view` box with some breathing room. */
export function fitCamera(bounds: Rect, view: { w: number; h: number }, padding = 80): Camera {
  const zoom = clampZoom(
    Math.min((view.w - padding * 2) / Math.max(bounds.w, 1), (view.h - padding * 2) / Math.max(bounds.h, 1), 1),
  )
  return {
    zoom,
    x: view.w / 2 - (bounds.x + bounds.w / 2) * zoom,
    y: view.h / 2 - (bounds.y + bounds.h / 2) * zoom,
  }
}

export type Handle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'start' | 'end'

/** Resize a box by dragging one of its handles by (dx, dy) in world units. */
export function resizeRect(start: Rect, handle: Handle, dx: number, dy: number, keepRatio: boolean, min = 16): Rect {
  let { x, y, w, h } = start
  if (handle.includes('w')) {
    x = start.x + dx
    w = start.w - dx
  }
  if (handle.includes('e')) w = start.w + dx
  if (handle.includes('n')) {
    y = start.y + dy
    h = start.h - dy
  }
  if (handle === 's' || handle === 'se' || handle === 'sw') h = start.h + dy
  if (keepRatio && start.w > 0 && start.h > 0 && handle.length === 2) {
    const ratio = start.w / start.h
    if (Math.abs(w / ratio) > Math.abs(h)) h = w / ratio
    else w = h * ratio
    if (handle.includes('w')) x = start.x + start.w - w
    if (handle.includes('n')) y = start.y + start.h - h
  }
  if (w < min) {
    if (handle.includes('w')) x -= min - w
    w = min
  }
  if (h < min) {
    if (handle.includes('n')) y -= min - h
    h = min
  }
  return { x, y, w, h }
}

/** Snap a line end to 45° steps (Shift). */
export function snapAngle(dx: number, dy: number): Point {
  const length = Math.hypot(dx, dy)
  const step = Math.PI / 4
  const angle = Math.round(Math.atan2(dy, dx) / step) * step
  return { x: Math.cos(angle) * length, y: Math.sin(angle) * length }
}
