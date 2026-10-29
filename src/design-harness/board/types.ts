/**
 * Design board document model. Every node lives in world coordinates
 * (`x`, `y`, `w`, `h`); the camera maps world to screen
 * (`screen = world * zoom + offset`). Array order is paint order, with
 * frames always painted beneath everything else.
 */

/** Colour names map to existing tokens in `styles/board.css` — never raw values in the document. */
export const BOARD_COLORS = ['yellow', 'teal', 'plum', 'rose', 'leaf', 'amber', 'ink', 'paper'] as const
export type BoardColor = (typeof BOARD_COLORS)[number]

export const BOARD_COLOR_LABEL: Record<BoardColor, string> = {
  yellow: 'Yellow',
  teal: 'Teal',
  plum: 'Plum',
  rose: 'Rose',
  leaf: 'Green',
  amber: 'Amber',
  ink: 'Ink',
  paper: 'White',
}

type NodeBase = {
  id: string
  x: number
  y: number
  w: number
  h: number
  /** The frame this node sits in; it moves with the frame. */
  parentId?: string
}

export type StickyNode = NodeBase & { type: 'sticky'; text: string; color: BoardColor }
export type TextNode = NodeBase & { type: 'text'; text: string; color: BoardColor; heading?: boolean }
export type FrameNode = NodeBase & { type: 'frame'; title: string }
export type ShapeNode = NodeBase & {
  type: 'shape'
  shape: 'rect' | 'ellipse'
  color: BoardColor
  text: string
}
/** A line from (x, y) to (x + w, y + h) — `w`/`h` may be negative. */
export type LineNode = NodeBase & { type: 'line'; arrow: boolean; color: BoardColor }
/** Freehand stroke. `points` are flat [x, y, …] inside a `vw` × `vh` box that scales to `w` × `h`. */
export type DrawNode = NodeBase & { type: 'draw'; points: number[]; vw: number; vh: number; color: BoardColor }
export type ImageNode = NodeBase & { type: 'image'; blobId: string; name: string }
export type FileNode = NodeBase & {
  type: 'file'
  blobId: string
  name: string
  mime: string
  size: number
  /** First characters of a text file, for the card. */
  preview?: string
}
/** A live Design Harness route (a project screen, state, doc or storyboard) in an iframe. */
export type PrototypeNode = NodeBase & { type: 'prototype'; route: string; label: string; project: string }
/** Any outside page — Figma and Miro links turn into their embed URLs. */
export type EmbedNode = NodeBase & { type: 'embed'; url: string; label: string }

export type BoardNode =
  StickyNode | TextNode | FrameNode | ShapeNode | LineNode | DrawNode | ImageNode | FileNode | PrototypeNode | EmbedNode

export type BoardNodeType = BoardNode['type']

export type Camera = { x: number; y: number; zoom: number }

export type BoardPage = {
  id: string
  name: string
  nodes: BoardNode[]
  camera: Camera
  /** Project boards: the board route on its canvas page (an artifact route on boards saved before 2026-10-28). */
  source?: string
  /** Not viewed yet — fit the camera to the content the first time the page shows. */
  fresh?: boolean
  /** What that first fit frames; everything when unset. */
  focus?: string[]
}

export type BoardBackground = 'dots' | 'plain'

export type BoardDoc = {
  version: 1
  pages: BoardPage[]
  activePageId: string
  background: BoardBackground
}

export type Tool = 'select' | 'hand' | 'text' | 'frame' | 'sticky' | 'pen' | 'rect' | 'ellipse' | 'line' | 'arrow'

export type Point = { x: number; y: number }
export type Rect = { x: number; y: number; w: number; h: number }

/** Plain distributive Partial so `update` patches stay type-safe per node. */
export type NodePatch = Partial<Omit<StickyNode, 'type'>> &
  Partial<Omit<FrameNode, 'type'>> &
  Partial<Omit<ShapeNode, 'type'>> &
  Partial<Omit<LineNode, 'type'>> &
  Partial<Omit<DrawNode, 'type'>> &
  Partial<Omit<FileNode, 'type'>> &
  Partial<Omit<PrototypeNode, 'type'>> &
  Partial<Omit<EmbedNode, 'type'>>
