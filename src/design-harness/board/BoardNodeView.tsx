import { memo, useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import {
  FrameArrowUpRight,
  FrameColumns,
  FrameDocument,
  FrameFile,
  FrameFit,
  FrameLinkRound,
  FrameList,
  FrameMonitor,
  FramePhone,
  FramePresentation,
  FrameStructure,
} from '../harnessIcons'
import { Icon } from '../ui'
import { fileKind, formatBytes, isPdf } from './files'
import { blobUrl } from './persistence'
import { artifactKind, embedSrc, type ArtifactKind } from './prototypes'
import type { TablerIconComponent } from '../ui'
import type { BoardNode, DrawNode, LineNode, NodePatch } from './types'
import type { ViewerTarget } from './BoardDialogs'

export type NodeViewProps = {
  node: BoardNode
  editing: boolean
  interactive: boolean
  onEdit: (id: string, patch: NodePatch) => void
  onEditEnd: () => void
  onZoomTo: (id: string) => void
  onOpen: (target: ViewerTarget) => void
}

function useBlobUrl(id: string): string | undefined {
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    let live = true
    void blobUrl(id).then((next) => {
      if (live) setUrl(next)
    })
    return () => {
      live = false
    }
  }, [id])
  return url
}

const box = (node: BoardNode): CSSProperties => ({
  left: Math.min(node.x, node.x + node.w),
  top: Math.min(node.y, node.y + node.h),
  width: Math.abs(node.w),
  height: Math.abs(node.h),
})

/** A plain textarea while editing; the same text as a div otherwise. */
function EditableText({
  value,
  editing,
  placeholder,
  label,
  onChange,
  onDone,
  className,
}: {
  value: string
  editing: boolean
  placeholder: string
  label: string
  onChange: (value: string) => void
  onDone: () => void
  className: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (!editing) return
    const area = ref.current
    if (!area) return
    area.focus()
    area.setSelectionRange(area.value.length, area.value.length)
  }, [editing])
  if (editing) {
    return (
      <textarea
        ref={ref}
        className={`${className} design-harness-board-node__input`}
        aria-label={label}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onDone}
        onKeyDown={(event) => {
          event.stopPropagation()
          if (event.key === 'Escape' || (event.key === 'Enter' && (event.metaKey || event.ctrlKey))) {
            event.preventDefault()
            onDone()
          }
        }}
      />
    )
  }
  return (
    <div className={className} data-empty={value ? undefined : 'true'}>
      {value || placeholder}
    </div>
  )
}

function LineView({ node }: { node: LineNode }) {
  const markerId = useId()
  const x1 = node.w < 0 ? -node.w : 0
  const y1 = node.h < 0 ? -node.h : 0
  return (
    <svg className="design-harness-board-node__svg" aria-hidden>
      {node.arrow ? (
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
      ) : null}
      <line
        className="design-harness-board-node__stroke"
        x1={x1}
        y1={y1}
        x2={x1 + node.w}
        y2={y1 + node.h}
        markerEnd={node.arrow ? `url(#${markerId})` : undefined}
      />
      <line className="design-harness-board-node__hit" x1={x1} y1={y1} x2={x1 + node.w} y2={y1 + node.h} />
    </svg>
  )
}

function strokePath(points: number[]): string {
  if (points.length < 2) return ''
  let d = `M ${points[0]} ${points[1]}`
  for (let i = 2; i < points.length; i += 2) d += ` L ${points[i]} ${points[i + 1]}`
  if (points.length === 2) d += ` L ${points[0] + 0.1} ${points[1]}`
  return d
}

function DrawView({ node }: { node: DrawNode }) {
  const d = strokePath(node.points)
  return (
    <svg
      className="design-harness-board-node__svg"
      viewBox={`0 0 ${Math.max(node.vw, 1)} ${Math.max(node.vh, 1)}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path className="design-harness-board-node__stroke" d={d} vectorEffect="non-scaling-stroke" />
      <path className="design-harness-board-node__hit" d={d} vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

const KIND_ICON: Record<ArtifactKind, TablerIconComponent> = {
  prototype: FramePhone,
  desktop: FrameMonitor,
  storyboard: FramePresentation,
  'case-study': FrameFile,
  slides: FramePresentation,
  article: FrameDocument,
  facts: FrameList,
  about: FrameFile,
  doc: FrameFile,
  diagram: FrameStructure,
  presentation: FrameColumns,
  link: FrameLinkRound,
}

function EmbedFrame({ src, title, interactive }: { src: string; title: string; interactive: boolean }) {
  return (
    <div className="design-harness-board-node__embed-body">
      <iframe
        className="design-harness-board-node__iframe"
        src={src}
        title={title}
        loading="lazy"
        data-board-interactive={interactive ? 'true' : undefined}
        allow="clipboard-write; fullscreen"
      />
      {interactive ? null : <div className="design-harness-board-node__shield" aria-hidden />}
    </div>
  )
}

function FileView({
  node,
  interactive,
  onOpen,
}: {
  node: Extract<BoardNode, { type: 'file' }>
  interactive: boolean
  onOpen: (target: ViewerTarget) => void
}) {
  const url = useBlobUrl(node.blobId)
  const pdf = isPdf(node.mime, node.name)
  return (
    <div className="design-harness-board-node__card">
      <header className="design-harness-board-node__card-head">
        <Icon icon={FrameFile} size="sm" />
        <span className="design-harness-board-node__card-title" title={node.name}>
          {node.name}
        </span>
        <span className="design-harness-board-node__card-meta">
          {fileKind(node.mime, node.name)} · {formatBytes(node.size)}
        </span>
        {url ? (
          <button
            type="button"
            className="design-harness-board-node__card-action"
            data-board-control="true"
            aria-label={`Open ${node.name}`}
            title="Open full size"
            onClick={() => onOpen({ label: node.name, src: pdf ? `${url}#toolbar=0&view=FitH` : url, href: url })}
          >
            <Icon icon={FrameArrowUpRight} size="sm" />
          </button>
        ) : null}
      </header>
      {pdf && url ? (
        <EmbedFrame src={`${url}#toolbar=0&view=FitH`} title={node.name} interactive={interactive} />
      ) : node.preview !== undefined ? (
        <pre className="design-harness-board-node__card-preview">{node.preview}</pre>
      ) : (
        <div className="design-harness-board-node__card-empty">
          <Icon icon={FrameFile} size="xl" />
        </div>
      )}
    </div>
  )
}

function ImageView({ node }: { node: Extract<BoardNode, { type: 'image' }> }) {
  const url = useBlobUrl(node.blobId)
  return url ? (
    <img className="design-harness-board-node__image" src={url} alt={node.name} draggable={false} />
  ) : (
    <div className="design-harness-board-node__card-empty">{node.name}</div>
  )
}

function NodeViewInner({ node, editing, interactive, onEdit, onEditEnd, onZoomTo, onOpen }: NodeViewProps) {
  const common = {
    'data-node-id': node.id,
    'data-type': node.type,
    style: box(node),
  }
  switch (node.type) {
    case 'sticky':
      return (
        <div {...common} className="design-harness-board-node" data-color={node.color}>
          <EditableText
            className="design-harness-board-node__sticky-text"
            value={node.text}
            editing={editing}
            placeholder={editing ? '' : 'Double-click to type'}
            label="Sticky note text"
            onChange={(text) => onEdit(node.id, { text })}
            onDone={onEditEnd}
          />
        </div>
      )
    case 'text':
      return (
        <div
          {...common}
          className="design-harness-board-node"
          data-color={node.color}
          data-heading={node.heading ? 'true' : undefined}
        >
          <EditableText
            className="design-harness-board-node__text"
            value={node.text}
            editing={editing}
            placeholder="Type something"
            label="Text"
            onChange={(text) => onEdit(node.id, { text })}
            onDone={onEditEnd}
          />
        </div>
      )
    case 'shape':
      return (
        <div {...common} className="design-harness-board-node" data-color={node.color} data-shape={node.shape}>
          <EditableText
            className="design-harness-board-node__shape-text"
            value={node.text}
            editing={editing}
            placeholder=""
            label="Shape text"
            onChange={(text) => onEdit(node.id, { text })}
            onDone={onEditEnd}
          />
        </div>
      )
    case 'frame':
      return (
        <div {...common} className="design-harness-board-node">
          <div className="design-harness-board-node__frame-bar">
            {editing ? (
              <input
                className="design-harness-board-node__frame-title design-harness-board-node__input"
                aria-label="Frame name"
                autoFocus
                value={node.title}
                onChange={(event) => onEdit(node.id, { title: event.target.value })}
                onBlur={onEditEnd}
                onKeyDown={(event) => {
                  event.stopPropagation()
                  if (event.key === 'Enter' || event.key === 'Escape') onEditEnd()
                }}
              />
            ) : (
              <span className="design-harness-board-node__frame-title" data-frame-title="true">
                {node.title || 'Frame'}
              </span>
            )}
            <button
              type="button"
              className="design-harness-board-node__frame-action"
              data-board-control="true"
              aria-label={`Zoom to ${node.title || 'frame'}`}
              title="Zoom to frame"
              onClick={() => onZoomTo(node.id)}
            >
              <Icon icon={FrameFit} size="xs" />
            </button>
          </div>
        </div>
      )
    case 'line':
      return (
        <div {...common} className="design-harness-board-node" data-color={node.color}>
          <LineView node={node} />
        </div>
      )
    case 'draw':
      return (
        <div {...common} className="design-harness-board-node" data-color={node.color}>
          <DrawView node={node} />
        </div>
      )
    case 'image':
      return (
        <div {...common} className="design-harness-board-node">
          <ImageView node={node} />
        </div>
      )
    case 'file':
      return (
        <div {...common} className="design-harness-board-node" data-interactive={interactive || undefined}>
          <FileView node={node} interactive={interactive} onOpen={onOpen} />
        </div>
      )
    case 'prototype':
    case 'embed': {
      const src = node.type === 'prototype' ? embedSrc(node.route) : node.url
      const open = node.type === 'prototype' ? `#/${node.route}` : node.url
      const kind = node.type === 'prototype' ? artifactKind(node.route) : 'link'
      const meta = node.type === 'prototype' ? node.project : 'Live link'
      return (
        <div {...common} className="design-harness-board-node" data-interactive={interactive || undefined}>
          <div className="design-harness-board-node__card">
            <header className="design-harness-board-node__card-head">
              <Icon icon={KIND_ICON[kind]} size="sm" />
              <span className="design-harness-board-node__card-title" title={node.label}>
                {node.label}
              </span>
              <span className="design-harness-board-node__card-meta">{meta}</span>
              <button
                type="button"
                className="design-harness-board-node__card-action"
                data-board-control="true"
                aria-label={`Open ${node.label}`}
                title="Open full size"
                onClick={() => onOpen({ label: node.label, src, href: open })}
              >
                <Icon icon={FrameArrowUpRight} size="sm" />
              </button>
            </header>
            <EmbedFrame src={src} title={`${node.label} — live`} interactive={interactive} />
          </div>
        </div>
      )
    }
    default: {
      const _exhaustive: never = node
      return _exhaustive
    }
  }
}

export const BoardNodeView = memo(NodeViewInner)
