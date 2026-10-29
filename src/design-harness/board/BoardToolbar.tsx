import { useId, useState, type Dispatch } from 'react'
import {
  FrameAdd,
  FrameCheck,
  FrameChevronDown,
  FrameCopy,
  FrameCursorPointer,
  FrameEllipse,
  FrameHand,
  FrameHashtag,
  FrameImageAdd,
  FrameLine,
  FrameLinkRound,
  FramePen,
  FramePhone,
  FrameArrowUpRight,
  FrameSquare,
  FrameSticker,
  FrameText,
  FrameTrash,
  type TablerIconComponent,
} from './icons'
import { Icon, IconButton } from '../ui'
import { BoardPopover } from './BoardPopover'
import { closePopover } from './popover'
import type { BoardAction } from './store'
import { BOARD_COLOR_LABEL, BOARD_COLORS, type BoardColor, type BoardPage, type Tool } from './types'

export type ShapeTool = Extract<Tool, 'rect' | 'ellipse' | 'line' | 'arrow'>

const TOOLS: { tool: Tool; label: string; key: string; icon: TablerIconComponent }[] = [
  { tool: 'select', label: 'Select', key: 'V', icon: FrameCursorPointer },
  { tool: 'hand', label: 'Hand', key: 'H', icon: FrameHand },
  { tool: 'text', label: 'Text', key: 'T', icon: FrameText },
  { tool: 'frame', label: 'Frame', key: 'F', icon: FrameHashtag },
  { tool: 'sticky', label: 'Sticky note', key: 'S', icon: FrameSticker },
]

const SHAPES: { tool: ShapeTool; label: string; key: string; icon: TablerIconComponent }[] = [
  { tool: 'rect', label: 'Rectangle', key: 'R', icon: FrameSquare },
  { tool: 'ellipse', label: 'Ellipse', key: 'O', icon: FrameEllipse },
  { tool: 'line', label: 'Line', key: 'L', icon: FrameLine },
  { tool: 'arrow', label: 'Arrow', key: 'A', icon: FrameArrowUpRight },
]

export function ColorSwatches({
  value,
  onPick,
  label,
}: {
  value?: BoardColor
  onPick: (color: BoardColor) => void
  label: string
}) {
  return (
    <div className="design-harness-board-swatches" role="radiogroup" aria-label={label}>
      {BOARD_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          role="radio"
          aria-checked={value === color}
          aria-label={BOARD_COLOR_LABEL[color]}
          title={BOARD_COLOR_LABEL[color]}
          className="design-harness-board-swatch"
          data-color={color}
          onClick={() => onPick(color)}
        />
      ))}
    </div>
  )
}

function PageMenu({
  pages,
  activePageId,
  dispatch,
}: {
  pages: BoardPage[]
  activePageId: string
  dispatch: Dispatch<BoardAction>
}) {
  const id = useId()
  const [renaming, setRenaming] = useState<string>()
  const index = Math.max(
    0,
    pages.findIndex((page) => page.id === activePageId),
  )
  const active = pages[index]
  return (
    <>
      <button
        type="button"
        className="design-harness-board-pages__trigger"
        popoverTarget={id}
        aria-haspopup="menu"
        aria-expanded="false"
        title="Pages"
      >
        <span className="design-harness-board-pages__count">{index + 1}</span>
        <span className="design-harness-board-pages__name">{active?.name}</span>
        <Icon icon={FrameChevronDown} size="xs" />
      </button>
      <BoardPopover id={id} label="Pages" className="design-harness-board-pages__menu">
        {pages.map((page) => (
          <div key={page.id} className="design-harness-board-pages__row">
            {renaming === page.id ? (
              <input
                className="design-harness-board-pages__rename"
                aria-label="Page name"
                defaultValue={page.name}
                autoFocus
                onFocus={(event) => event.currentTarget.select()}
                onBlur={(event) => {
                  dispatch({ type: 'renamePage', id: page.id, name: event.currentTarget.value })
                  setRenaming(undefined)
                }}
                onKeyDown={(event) => {
                  event.stopPropagation()
                  if (event.key === 'Enter') event.currentTarget.blur()
                  if (event.key === 'Escape') {
                    event.preventDefault()
                    setRenaming(undefined)
                  }
                }}
              />
            ) : (
              <button
                type="button"
                role="menuitemradio"
                aria-checked={page.id === activePageId}
                className="design-harness-menu__item"
                onClick={() => {
                  dispatch({ type: 'switchPage', id: page.id })
                  closePopover(id)
                }}
                onDoubleClick={() => setRenaming(page.id)}
              >
                <span>{page.name}</span>
                {page.id === activePageId ? <Icon icon={FrameCheck} size="sm" /> : null}
              </button>
            )}
            <span className="design-harness-board-pages__actions">
              <IconButton label={`Rename ${page.name}`} onClick={() => setRenaming(page.id)}>
                <Icon icon={FramePen} size="xs" />
              </IconButton>
              <IconButton
                label={`Duplicate ${page.name}`}
                onClick={() => dispatch({ type: 'duplicatePage', id: page.id })}
              >
                <Icon icon={FrameCopy} size="xs" />
              </IconButton>
              <IconButton
                label={`Delete ${page.name}`}
                disabled={pages.length < 2}
                onClick={() => {
                  if (window.confirm(`Delete “${page.name}” and everything on it?`)) {
                    dispatch({ type: 'deletePage', id: page.id })
                  }
                }}
              >
                <Icon icon={FrameTrash} size="xs" />
              </IconButton>
            </span>
          </div>
        ))}
        <hr className="design-harness-board-menu__rule" />
        <button
          type="button"
          role="menuitem"
          className="design-harness-menu__item"
          onClick={() => {
            dispatch({ type: 'addPage' })
            closePopover(id)
          }}
        >
          <Icon icon={FrameAdd} size="sm" />
          <span>New page</span>
        </button>
      </BoardPopover>
    </>
  )
}

export function BoardToolbar({
  tool,
  onTool,
  shapeTool,
  penColor,
  onPenColor,
  pages,
  activePageId,
  dispatch,
  onInsertFiles,
  onInsertPrototype,
  onInsertLink,
}: {
  tool: Tool
  onTool: (tool: Tool) => void
  shapeTool: ShapeTool
  penColor: BoardColor
  onPenColor: (color: BoardColor) => void
  pages: BoardPage[]
  activePageId: string
  dispatch: Dispatch<BoardAction>
  onInsertFiles: () => void
  onInsertPrototype: () => void
  onInsertLink: () => void
}) {
  const shapeMenu = useId()
  const penMenu = useId()
  const shape = SHAPES.find((item) => item.tool === shapeTool) ?? SHAPES[0]
  return (
    <div className="design-harness-board-toolbar" role="toolbar" aria-label="Board tools">
      <PageMenu pages={pages} activePageId={activePageId} dispatch={dispatch} />
      <span className="design-harness-board-toolbar__rule" aria-hidden />
      {TOOLS.map((item) => (
        <IconButton
          key={item.tool}
          label={`${item.label} (${item.key})`}
          active={tool === item.tool}
          aria-pressed={tool === item.tool}
          onClick={() => onTool(item.tool)}
        >
          <Icon icon={item.icon} size="sm" />
        </IconButton>
      ))}
      <span className="design-harness-board-toolbar__split">
        <IconButton label="Pen (P)" active={tool === 'pen'} aria-pressed={tool === 'pen'} onClick={() => onTool('pen')}>
          <Icon icon={FramePen} size="sm" />
        </IconButton>
        <button
          type="button"
          className="design-harness-board-toolbar__more"
          popoverTarget={penMenu}
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Pen colour"
          title="Pen colour"
        >
          <Icon icon={FrameChevronDown} size="xs" />
        </button>
      </span>
      <BoardPopover id={penMenu} label="Pen colour">
        <ColorSwatches
          label="Pen colour"
          value={penColor}
          onPick={(color) => {
            onPenColor(color)
            onTool('pen')
            closePopover(penMenu)
          }}
        />
      </BoardPopover>
      <span className="design-harness-board-toolbar__split">
        <IconButton
          label={`${shape.label} (${shape.key})`}
          active={tool === shape.tool}
          aria-pressed={tool === shape.tool}
          onClick={() => onTool(shape.tool)}
        >
          <Icon icon={shape.icon} size="sm" />
        </IconButton>
        <button
          type="button"
          className="design-harness-board-toolbar__more"
          popoverTarget={shapeMenu}
          aria-haspopup="menu"
          aria-expanded="false"
          aria-label="Shapes"
          title="Shapes"
        >
          <Icon icon={FrameChevronDown} size="xs" />
        </button>
      </span>
      <BoardPopover id={shapeMenu} label="Shapes">
        {SHAPES.map((item) => (
          <button
            key={item.tool}
            type="button"
            role="menuitemradio"
            aria-checked={shapeTool === item.tool}
            className="design-harness-menu__item"
            onClick={() => {
              onTool(item.tool)
              closePopover(shapeMenu)
            }}
          >
            <Icon icon={item.icon} size="sm" />
            <span>{item.label}</span>
            <kbd className="design-harness-board-menu__key">{item.key}</kbd>
          </button>
        ))}
      </BoardPopover>
      <span className="design-harness-board-toolbar__rule" aria-hidden />
      <IconButton label="Image or file" onClick={onInsertFiles}>
        <Icon icon={FrameImageAdd} size="sm" />
      </IconButton>
      <IconButton label="Live prototype" onClick={onInsertPrototype}>
        <Icon icon={FramePhone} size="sm" />
      </IconButton>
      <IconButton label="Figma, Miro or web link" onClick={onInsertLink}>
        <Icon icon={FrameLinkRound} size="sm" />
      </IconButton>
    </div>
  )
}
