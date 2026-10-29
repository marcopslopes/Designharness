import { useState, type MouseEvent } from 'react'
import { IconCopy, IconPencil, IconTrash } from '@tabler/icons-react'
import {
  Button,
  ContextMenu,
  ContextMenuItem,
  Icon,
  SegmentedControl,
  Sheet,
  SheetAction,
  SheetMenu,
  usePresence,
} from '../../../context/design-system/ds'

function fromPointer(event: MouseEvent<HTMLButtonElement>) {
  return event.detail !== 0
}

/** Live samples for the shared motion page. */
export function MotionShowcase() {
  const [segment, setSegment] = useState('week')
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuMotion, setMenuMotion] = useState(true)
  const menu = usePresence(menuOpen, menuMotion)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetMotion, setSheetMotion] = useState(true)
  const sheet = usePresence(sheetOpen, sheetMotion)

  return (
    <div className="ds-motion-showcase">
      <div className="ds-motion-showcase__card">
        <p className="ds-motion-showcase__label">Segmented pill</p>
        <SegmentedControl
          aria-label="Range"
          value={segment}
          onChange={setSegment}
          options={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
        />
      </div>
      <div className="ds-motion-showcase__card">
        <p className="ds-motion-showcase__label">Context menu</p>
        <div className="ds-menu-anchor">
          <Button
            intent="secondary"
            onClick={(event) => {
              setMenuMotion(fromPointer(event))
              setMenuOpen((open) => !open)
            }}
          >
            Booking
          </Button>
          {menu.mounted ? (
            <div
              className="ds-menu-pop"
              data-state={menu.state}
              data-motion={menuMotion ? undefined : 'off'}
              onAnimationEnd={menu.onAnimationEnd}
            >
              <ContextMenu>
                <ContextMenuItem
                  icon={<Icon icon={IconPencil} size="sm" />}
                  onClick={(event) => {
                    setMenuMotion(fromPointer(event))
                    setMenuOpen(false)
                  }}
                >
                  Edit booking
                </ContextMenuItem>
                <ContextMenuItem
                  icon={<Icon icon={IconCopy} size="sm" />}
                  onClick={(event) => {
                    setMenuMotion(fromPointer(event))
                    setMenuOpen(false)
                  }}
                >
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem
                  destructive
                  icon={<Icon icon={IconTrash} size="sm" />}
                  onClick={(event) => {
                    setMenuMotion(fromPointer(event))
                    setMenuOpen(false)
                  }}
                >
                  Delete booking
                </ContextMenuItem>
              </ContextMenu>
            </div>
          ) : null}
        </div>
      </div>
      <div className="ds-motion-showcase__card ds-motion-stage">
        <p className="ds-motion-showcase__label">Sheet</p>
        <Button
          intent="primary"
          onClick={(event) => {
            setSheetMotion(fromPointer(event))
            setSheetOpen(true)
          }}
        >
          Move money
        </Button>
        {sheet.mounted ? (
          <div
            className="ds-pattern__overlay"
            data-state={sheet.state}
            data-motion={sheetMotion ? undefined : 'off'}
            onAnimationEnd={sheet.onAnimationEnd}
          >
            <button
              type="button"
              className="ds-pattern__scrim"
              aria-label="Close"
              onClick={(event) => {
                setSheetMotion(fromPointer(event))
                setSheetOpen(false)
              }}
            />
            <Sheet
              variant="action"
              cancelLabel="Cancel"
              onCancel={(event) => {
                setSheetMotion(fromPointer(event))
                setSheetOpen(false)
              }}
            >
              <SheetMenu caption="Move money">
                <SheetAction
                  label="Send"
                  description="To another account"
                  onClick={(event) => {
                    setSheetMotion(fromPointer(event))
                    setSheetOpen(false)
                  }}
                />
              </SheetMenu>
            </Sheet>
          </div>
        ) : null}
      </div>
    </div>
  )
}
