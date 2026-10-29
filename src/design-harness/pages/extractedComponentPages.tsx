import { useState, type MouseEvent, type ReactNode } from 'react'
import {
  IconAlertTriangle,
  IconCalendar,
  IconCalendarPlus,
  IconCheck,
  IconCopy,
  IconCreditCard,
  IconGift,
  IconInfoCircle,
  IconPencil,
  IconSearch,
  IconShare,
  IconTag,
  IconTrash,
  IconUser,
  IconWallet,
  IconX,
} from '@tabler/icons-react'
import {
  Alert,
  Avatar,
  AvatarGroup,
  Button,
  Checkbox,
  ContextMenu,
  ContextMenuItem,
  CountDown,
  DragHandle,
  EmptyState,
  Icon,
  List,
  Loader,
  ProgressBar,
  Separator,
  SettingsGroup,
  SettingsRow,
  Skeleton,
  SkeletonCard,
  SkeletonList,
  Stack,
  Swiper,
  TabBar,
  Tabs,
  Toggle,
  usePresence,
  Toolbar,
  Tooltip,
} from '../../../context/design-system/ds'
import { SheetDemo } from '../components/MobileComponentDemos'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import type { ExtractedComponentRoute } from '../componentRoutes'
import {
  ActionGridPage,
  CoachmarkPage,
  HintPage,
  ListItemPage,
  PromoCardPage,
  SetupChecklistPage,
  SliderPage,
  StepperPage,
} from './primitiveCatalogPages'
import { EmptyScreenPage, SheetScreenPage } from './patternCatalogPages'
import {
  ActivityPage,
  ConversationPage,
  ConversationScreenPage,
  MessagePage,
  PromptInputPage,
  ReasoningPage,
  ResponsePage,
  ResultPage,
  SourcesPage,
  ThisOrThatPage,
  ToolCallPage,
  WorkingPage,
} from './aiCatalogPages'

function CatalogPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage title={title} lead={lead}>
        {children}
      </DesignHarnessDocPage>
    </div>
  )
}

function AlertPage() {
  return (
    <CatalogPage title="Alert" lead="Info, success, warning, and danger, plus an ink surface.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <Stack gap="var(--spacing-04)">
          <Alert
            intent="info"
            title="Payouts scheduled"
            description="$2,847 transfers Friday morning"
            actionLabel="View"
            icon={<Icon icon={IconInfoCircle} size="md" />}
          />
          <Alert
            intent="success"
            title="Profile published"
            description="Clients can now book online"
            actionLabel="Share"
            icon={<Icon icon={IconCheck} size="md" />}
          />
          <Alert
            intent="warning"
            title="Profile is private"
            description="Clients can't book until you enable it"
            actionLabel="Enable"
            icon={<Icon icon={IconAlertTriangle} size="md" />}
          />
          <Alert
            intent="danger"
            title="Payout failed"
            description="Update your bank details to retry"
            actionLabel="Fix"
            icon={<Icon icon={IconX} size="md" />}
          />
          <Alert
            surface="ink"
            intent="success"
            title="Service archived"
            actionLabel="Undo"
            icon={<Icon icon={IconCheck} size="sm" />}
          />
        </Stack>
      </div>
    </CatalogPage>
  )
}

function AvatarPage() {
  return (
    <CatalogPage title="Avatar" lead="Initials in sm, md, and lg, alone or in a group with a more count.">
      <div className="design-harness-ds-demo">
        <Stack gap="var(--spacing-06)">
          <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
            <Avatar size="sm" tint="brand" initials="JT" />
            <Avatar size="md" tint="premium" initials="SA" />
            <Avatar size="lg" tint="rose" initials="MR" />
          </Stack>
          <Stack direction="row" gap="var(--spacing-06)" className="design-harness__row">
            <AvatarGroup size="sm" more={5}>
              <Avatar size="sm" tint="brand" initials="JT" />
              <Avatar size="sm" tint="premium" initials="SA" />
              <Avatar size="sm" tint="rose" initials="MR" />
            </AvatarGroup>
            <AvatarGroup size="lg" more={12}>
              <Avatar size="lg" tint="brand" initials="JT" />
              <Avatar size="lg" tint="premium" initials="SA" />
              <Avatar size="lg" tint="rose" initials="MR" />
            </AvatarGroup>
          </Stack>
        </Stack>
      </div>
    </CatalogPage>
  )
}

function CountDownPage() {
  return (
    <CatalogPage title="Count down" lead="Five sizes, each with its own progress.">
      <div className="design-harness-ds-demo">
        <Stack direction="row" gap="var(--spacing-05)" className="design-harness__row">
          <CountDown size="xl" progress={0.78} />
          <CountDown size="lg" progress={0.72} />
          <CountDown size="md" progress={0.68} />
          <CountDown size="sm" progress={0.62} />
          <CountDown size="xs" progress={0.55} />
        </Stack>
      </div>
    </CatalogPage>
  )
}

const DRAG_ROWS = [
  { id: 'cut', title: 'Paint mix', meta: '45 min · $45' },
  { id: 'color', title: 'Paint coloring', meta: '2 h 30 min · from $120' },
  { id: 'sharpen', title: 'Blade sharpening', meta: '30 min · $28' },
]

function DragHandlePage() {
  const [rows, setRows] = useState(DRAG_ROWS)
  const [over, setOver] = useState<string | null>(null)

  function move(from: string, to: string) {
    if (!from || from === to) return
    setRows((current) => {
      const next = [...current]
      const fromIndex = next.findIndex((row) => row.id === from)
      const toIndex = next.findIndex((row) => row.id === to)
      if (fromIndex < 0 || toIndex < 0) return current
      const [item] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, item)
      return next
    })
  }

  return (
    <CatalogPage title="Drag handle" lead="The grabber on each cell. Drag a row to reorder the list.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <List>
          {rows.map((row) => (
            <div
              key={row.id}
              className="ds-list-item ds-drag-row"
              draggable
              data-over={over === row.id ? 'true' : undefined}
              onDragStart={(event) => event.dataTransfer.setData('text/plain', row.id)}
              onDragOver={(event) => {
                event.preventDefault()
                setOver(row.id)
              }}
              onDrop={(event) => {
                event.preventDefault()
                move(event.dataTransfer.getData('text/plain'), row.id)
                setOver(null)
              }}
              onDragEnd={() => setOver(null)}
            >
              <DragHandle aria-label={`Reorder ${row.title}`} />
              <span className="ds-list-item__body">
                <span className="ds-list-item__title">{row.title}</span>
                <span className="ds-list-item__meta">{row.meta}</span>
              </span>
            </div>
          ))}
        </List>
      </div>
    </CatalogPage>
  )
}

function TogglePage() {
  const [on, setOn] = useState(true)
  return (
    <CatalogPage title="Toggle" lead="A switch. Large is the default, small sits in a dense row.">
      <div className="design-harness-ds-demo">
        <Stack direction="row" gap="var(--spacing-05)" className="design-harness__row">
          <Toggle size="lg" checked={on} aria-label="Online booking" onClick={() => setOn((value) => !value)} />
          <Toggle
            size="sm"
            checked={on}
            aria-label="Online booking, compact"
            onClick={() => setOn((value) => !value)}
          />
          <Toggle size="lg" checked={false} aria-label="Off" />
          <Toggle size="lg" checked disabled aria-label="On, disabled" />
          <Toggle size="lg" checked={false} disabled aria-label="Off, disabled" />
          <Toggle size="lg" checked={on} label="Online booking" onClick={() => setOn((value) => !value)} />
        </Stack>
      </div>
    </CatalogPage>
  )
}

function CheckboxPage() {
  const [state, setState] = useState<'unchecked' | 'checked' | 'indeterminate'>('checked')
  return (
    <CatalogPage title="Checkbox" lead="Unchecked, checked, and mixed. Click the first one to cycle.">
      <div className="design-harness-ds-demo">
        <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
          <Checkbox
            state={state}
            aria-label="Cycle checkbox"
            onClick={() =>
              setState((current) =>
                current === 'unchecked' ? 'checked' : current === 'checked' ? 'indeterminate' : 'unchecked',
              )
            }
          />
          <Checkbox state="checked" aria-label="Checked" />
          <Checkbox state="indeterminate" aria-label="Mixed" />
          <Checkbox state="unchecked" aria-label="Unchecked" />
          <Checkbox state="unchecked" error aria-label="Error" />
          <Checkbox state="checked" disabled aria-label="Checked, disabled" />
        </Stack>
      </div>
    </CatalogPage>
  )
}

function TabBarPage() {
  const [tab, setTab] = useState('calendar')
  return (
    <CatalogPage
      title="Tab bar"
      lead="A floating glass bar. The selected tab sits in the material, and search stays separate."
    >
      <div className="ds-glass-stage">
        <TabBar
          value={tab}
          onChange={setTab}
          accessory={
            <button type="button" aria-label="Search">
              <Icon icon={IconSearch} size="md" />
            </button>
          }
          items={[
            { id: 'calendar', label: 'Calendar', icon: <Icon icon={IconCalendar} size="md" /> },
            { id: 'clients', label: 'Clients', icon: <Icon icon={IconUser} size="md" /> },
            { id: 'wallet', label: 'Wallet', icon: <Icon icon={IconWallet} size="md" /> },
          ]}
        />
      </div>
    </CatalogPage>
  )
}

function ContextMenuPage() {
  const [choice, setChoice] = useState('Edit booking')
  const [open, setOpen] = useState(false)
  const [motion, setMotion] = useState(true)
  const presence = usePresence(open, motion)

  function choose(event: MouseEvent<HTMLButtonElement>, next: string) {
    setMotion(event.detail !== 0)
    setChoice(next)
    setOpen(false)
  }

  return (
    <CatalogPage
      title="Context menu"
      lead="Press Booking. The menu grows from that button. The last row is destructive."
    >
      <div className="ds-glass-stage">
        <div className="ds-menu-anchor">
          <Button
            intent="secondary"
            onClick={(event) => {
              setMotion(event.detail !== 0)
              setOpen((value) => !value)
            }}
          >
            Booking
          </Button>
          {presence.mounted ? (
            <div
              className="ds-menu-pop"
              data-state={presence.state}
              data-motion={motion ? undefined : 'off'}
              onAnimationEnd={presence.onAnimationEnd}
            >
              <ContextMenu>
                <ContextMenuItem
                  icon={<Icon icon={IconPencil} size="sm" />}
                  onClick={(event) => choose(event, 'Edit booking')}
                >
                  Edit booking
                </ContextMenuItem>
                <ContextMenuItem
                  icon={<Icon icon={IconCopy} size="sm" />}
                  onClick={(event) => choose(event, 'Duplicate')}
                >
                  Duplicate
                </ContextMenuItem>
                <ContextMenuItem icon={<Icon icon={IconShare} size="sm" />} onClick={(event) => choose(event, 'Share')}>
                  Share
                </ContextMenuItem>
                <ContextMenuItem
                  destructive
                  icon={<Icon icon={IconTrash} size="sm" />}
                  onClick={(event) => choose(event, 'Delete booking')}
                >
                  Delete booking
                </ContextMenuItem>
              </ContextMenu>
            </div>
          ) : null}
        </div>
        <p className="ds-toolbar__status">{choice}</p>
      </div>
    </CatalogPage>
  )
}

function ToolbarPage() {
  const [count, setCount] = useState(3)
  return (
    <CatalogPage
      title="Toolbar"
      lead="A floating glass bar. Actions sit on the sides, and the status stays in the center."
    >
      <div className="ds-glass-stage">
        <Toolbar
          status={count === 0 ? 'Nothing selected' : `${count} selected`}
          leading={
            <>
              <Button intent="ghost" size="md" iconOnly aria-label="Share">
                <Icon icon={IconShare} size="sm" />
              </Button>
              <Button intent="ghost" size="md" iconOnly aria-label="Duplicate">
                <Icon icon={IconCopy} size="sm" />
              </Button>
            </>
          }
          trailing={
            <Button intent="tinted" size="sm" onClick={() => setCount(0)}>
              Done
            </Button>
          }
        />
      </div>
    </CatalogPage>
  )
}

function EmptyStatePage() {
  return (
    <CatalogPage title="Empty state" lead="A title, a short reason, and the next action.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 360 }}>
        <EmptyState
          title="Nothing on the books today"
          description="Add a walk-in or block off time to keep your day organized."
          icon={<Icon icon={IconCalendarPlus} size="lg" />}
          primaryAction={
            <Button intent="primary" size="lg" fullWidth>
              New booking
            </Button>
          }
          secondaryAction={
            <Button intent="secondary" size="lg" fullWidth>
              Import from calendar
            </Button>
          }
        />
      </div>
    </CatalogPage>
  )
}

function LoaderPage() {
  return (
    <CatalogPage title="Loader" lead="Ring, petals, and dots, in the default size and a small petals mark.">
      <div className="design-harness-ds-demo">
        <Stack direction="row" gap="var(--spacing-06)" className="design-harness__row">
          <Loader size="default" variant="ring" />
          <Loader size="default" variant="petals" />
          <Loader size="default" variant="dots" />
          <Loader size="sm" variant="petals" />
        </Stack>
      </div>
    </CatalogPage>
  )
}

function ProgressBarPage() {
  return (
    <CatalogPage title="Progress bar" lead="Brand, premium, leaf, and ink, plus an indeterminate bar.">
      <div className="design-harness-ds-demo">
        <Stack gap="var(--spacing-04)">
          <ProgressBar intent="brand" value={0.64} label="Profile completion" />
          <ProgressBar intent="premium" value={0.4} label="Premium setup" />
          <ProgressBar intent="leaf" value={0.8} label="Setup progress" />
          <ProgressBar indeterminate intent="brand" label="Syncing" />
          <ProgressBar size="sm" intent="ink" value={0.5} />
        </Stack>
      </div>
    </CatalogPage>
  )
}

function SeparatorPage() {
  return (
    <CatalogPage title="Separator" lead="A plain rule, or a rule with a label.">
      <div className="design-harness-ds-demo">
        <Stack gap="var(--spacing-04)">
          <Separator type="basic" />
          <Separator type="or" label="Text" />
          <Separator type="dark-text" label="Text" />
        </Stack>
      </div>
    </CatalogPage>
  )
}

function SettingsRowPage() {
  const [onlineBookings, setOnlineBookings] = useState(false)
  return (
    <CatalogPage title="Settings row" lead="A row with an icon and badge, and a grouped list with a toggle.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 400 }}>
        <Stack gap="var(--spacing-05)">
          <SettingsRow
            title="Loyalty Cards"
            description="Create stamp cards and track rewards"
            badge="New"
            tint="premium"
            icon={<Icon icon={IconGift} size="md" />}
          />
          <SettingsGroup label="Money">
            <SettingsRow
              density="compact"
              title="Payments & checkout"
              description="All payment settings"
              tint="brand"
              icon={<Icon icon={IconCreditCard} size="sm" />}
            />
            <SettingsRow
              density="compact"
              title="Memberships"
              description="Recurring · 0 active"
              tint="premium"
              icon={<Icon icon={IconTag} size="sm" />}
            />
            <SettingsRow
              density="compact"
              title="Online bookings"
              description={onlineBookings ? 'Currently on' : 'Currently off'}
              tint="ink"
              icon={<Icon icon={IconCalendar} size="sm" />}
              toggle
              toggleOn={onlineBookings}
              onToggleChange={setOnlineBookings}
            />
          </SettingsGroup>
        </Stack>
      </div>
    </CatalogPage>
  )
}

function SheetPage() {
  return (
    <CatalogPage
      title="Sheet"
      lead="Form, action, confirmation, picker, detail, and status. The picker keeps the selected row in the band."
    >
      <SheetDemo />
    </CatalogPage>
  )
}

function SkeletonPage() {
  return (
    <CatalogPage title="Skeleton" lead="Bars, a circle, a square, and a pill.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 360 }}>
        <Stack gap="var(--spacing-04)">
          <Skeleton shape="bar" style={{ height: 'var(--size-01)', width: '75%' }} />
          <Skeleton shape="bar" style={{ height: 'var(--size-01)', width: '50%' }} />
          <Stack direction="row" gap="var(--spacing-04)" className="design-harness__row">
            <Skeleton shape="circle" style={{ width: 'var(--size-11)', height: 'var(--size-11)' }} />
            <Skeleton shape="square" style={{ width: 'var(--size-11)', height: 'var(--size-11)' }} />
            <Skeleton
              shape="pill"
              style={{ width: 'calc(var(--size-12) + var(--size-09))', height: 'var(--size-10)' }}
            />
          </Stack>
        </Stack>
      </div>
      <Stack gap="var(--spacing-05)">
        <SkeletonList />
        <SkeletonCard />
      </Stack>
    </CatalogPage>
  )
}

function SwiperPage() {
  return (
    <CatalogPage title="Swiper" lead="Black on a light surface, white on ink.">
      <div className="design-harness-ds-demo">
        <Stack direction="row" gap="var(--spacing-06)" className="design-harness__row">
          <Swiper color="black" activeIndex={0} />
          <div
            style={{
              background: 'var(--kit-ink)',
              padding: 'var(--spacing-03)',
              borderRadius: 'var(--radius-02)',
            }}
          >
            <Swiper color="white" activeIndex={0} />
          </div>
        </Stack>
      </div>
    </CatalogPage>
  )
}

function TabsPage() {
  return (
    <CatalogPage title="Tabs" lead="A tab row with a panel for the selected section.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 480 }}>
        <Tabs
          aria-label="Profile sections"
          items={[
            { id: 'services', label: 'Services', panel: 'Content for Services' },
            { id: 'reviews', label: 'Reviews', panel: 'Content for Reviews' },
            { id: 'portfolio', label: 'Portfolio', panel: 'Content for Portfolio' },
            { id: 'details', label: 'Details', panel: 'Content for Details' },
          ]}
        />
      </div>
    </CatalogPage>
  )
}

function TooltipPage() {
  return (
    <CatalogPage title="Tooltip" lead="A short label that sits on a control.">
      <div className="design-harness-ds-demo">
        <Tooltip />
      </div>
    </CatalogPage>
  )
}

const PAGES: Record<ExtractedComponentRoute, () => ReactNode> = {
  'design-system/action-grid': ActionGridPage,
  'design-system/activity': ActivityPage,
  'design-system/alert': AlertPage,
  'design-system/coachmark': CoachmarkPage,
  'design-system/hint': HintPage,
  'design-system/list-item': ListItemPage,
  'design-system/promo-card': PromoCardPage,
  'design-system/reasoning': ReasoningPage,
  'design-system/response': ResponsePage,
  'design-system/result': ResultPage,
  'design-system/setup-checklist': SetupChecklistPage,
  'design-system/slider': SliderPage,
  'design-system/sources': SourcesPage,
  'design-system/stepper': StepperPage,
  'design-system/avatar': AvatarPage,
  'design-system/checkbox': CheckboxPage,
  'design-system/context-menu': ContextMenuPage,
  'design-system/conversation': ConversationPage,
  'design-system/conversation-screen': ConversationScreenPage,
  'design-system/count-down': CountDownPage,
  'design-system/drag-handle': DragHandlePage,
  'design-system/empty-state': EmptyStatePage,
  'design-system/empty-screen': EmptyScreenPage,
  'design-system/loader': LoaderPage,
  'design-system/message': MessagePage,
  'design-system/progress-bar': ProgressBarPage,
  'design-system/prompt-input': PromptInputPage,
  'design-system/separator': SeparatorPage,
  'design-system/settings-row': SettingsRowPage,
  'design-system/sheet': SheetPage,
  'design-system/sheet-screen': SheetScreenPage,
  'design-system/skeleton': SkeletonPage,
  'design-system/swiper': SwiperPage,
  'design-system/tab-bar': TabBarPage,
  'design-system/tabs': TabsPage,
  'design-system/this-or-that': ThisOrThatPage,
  'design-system/toggle': TogglePage,
  'design-system/tool-call': ToolCallPage,
  'design-system/toolbar': ToolbarPage,
  'design-system/tooltip': TooltipPage,
  'design-system/working': WorkingPage,
}

export function ExtractedComponentPage({ route }: { route: ExtractedComponentRoute }) {
  const Page = PAGES[route]
  return <Page />
}
