import { useState, type MouseEvent, type ReactNode } from 'react'
import {
  IconBell,
  IconCreditCard,
  IconHome,
  IconListDetails,
  IconQrcode,
  IconSearch,
  IconSend,
  IconUser,
  IconWallet,
} from '@tabler/icons-react'
import {
  Button,
  EmptyState,
  HeaderIconButton,
  Icon,
  LargeTitleHeader,
  Sheet,
  SheetAction,
  SheetMenu,
  TabBar,
  usePresence,
} from '../../../context/design-system/ds'
import { PhoneShell } from '../shared/PhoneShell'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

const TABS = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'activity', label: 'Activity', icon: IconListDetails },
  { id: 'wallet', label: 'Wallet', icon: IconWallet },
  { id: 'cards', label: 'Cards', icon: IconCreditCard },
  { id: 'account', label: 'Account', icon: IconUser },
] as const

type TabId = (typeof TABS)[number]['id']

const EMPTY: Record<TabId, { title: string; body: string; action: string }> = {
  home: { title: 'Nothing to show yet', body: 'Your balance and next payout show up here.', action: 'Add money' },
  activity: { title: 'No activity yet', body: 'Transfers and payouts will be listed here.', action: 'Move money' },
  wallet: { title: 'No payouts yet', body: 'Payouts appear here once money is on the way.', action: 'Move money' },
  cards: { title: 'No cards yet', body: 'Cards you add will show up here.', action: 'Add a card' },
  account: { title: 'You’re all set', body: 'Your details and settings live here.', action: 'Edit details' },
}

function PatternPhone({ children, bar, overlay }: { children: ReactNode; bar: ReactNode; overlay?: ReactNode }) {
  return (
    <PhoneShell>
      <div className="ds-pattern">
        <div className="ds-pattern__body">{children}</div>
        <div className="ds-pattern__bar">{bar}</div>
        {overlay}
      </div>
    </PhoneShell>
  )
}

function PatternTabs({ value, onChange }: { value: TabId; onChange: (id: string) => void }) {
  return (
    <TabBar
      value={value}
      onChange={onChange}
      items={TABS.map((tab) => ({
        id: tab.id,
        label: tab.label,
        icon: <Icon icon={tab.icon} size="md" />,
      }))}
    />
  )
}

function PatternHeader({ title }: { title: string }) {
  return (
    <LargeTitleHeader
      title={title}
      actions={
        <>
          <HeaderIconButton icon={IconSearch} label="Search" />
          <HeaderIconButton icon={IconQrcode} label="Scan" />
          <HeaderIconButton icon={IconBell} label="Notifications" badge />
        </>
      }
    />
  )
}

function PatternPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="design-harness-ds-page">
      <DesignHarnessDocPage title={title} lead={lead}>
        <div className="ds-pattern-stage">{children}</div>
      </DesignHarnessDocPage>
    </div>
  )
}

export function EmptyScreenPage() {
  const [tab, setTab] = useState<TabId>('wallet')
  const empty = EMPTY[tab]
  const current = TABS.find((item) => item.id === tab) ?? TABS[2]

  return (
    <PatternPage title="Empty screen" lead="A home screen with a large title, an empty view, and the tab bar.">
      <PatternPhone bar={<PatternTabs value={tab} onChange={(id) => setTab(id as TabId)} />}>
        <PatternHeader title={current.label} />
        <EmptyState
          title={empty.title}
          description={empty.body}
          icon={<Icon icon={current.icon} size="lg" />}
          primaryAction={
            <Button intent="primary" size="lg" fullWidth>
              {empty.action}
            </Button>
          }
        />
      </PatternPhone>
    </PatternPage>
  )
}

function pointerMotion(event: MouseEvent<HTMLButtonElement>) {
  return event.detail !== 0
}

export function SheetScreenPage() {
  const [tab, setTab] = useState<TabId>('wallet')
  const [open, setOpen] = useState(false)
  const [motion, setMotion] = useState(true)
  const presence = usePresence(open, motion)
  const title = TABS.find((item) => item.id === tab)?.label ?? 'Wallet'

  function closeSheet(event: MouseEvent<HTMLButtonElement>) {
    setMotion(pointerMotion(event))
    setOpen(false)
  }

  return (
    <PatternPage title="Sheet screen" lead="Tap Move money. The sheet rises from the bottom, and Cancel sends it back.">
      <PatternPhone
        bar={<PatternTabs value={tab} onChange={(id) => setTab(id as TabId)} />}
        overlay={
          presence.mounted ? (
            <div
              className="ds-pattern__overlay"
              data-state={presence.state}
              data-motion={motion ? undefined : 'off'}
              onAnimationEnd={presence.onAnimationEnd}
            >
              <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={closeSheet} />
              <Sheet variant="action" cancelLabel="Cancel" onCancel={closeSheet}>
                <SheetMenu caption="Move money">
                  <SheetAction
                    label="Send"
                    description="To another account"
                    icon={<Icon icon={IconSend} size="sm" />}
                    onClick={closeSheet}
                  />
                  <SheetAction
                    label="Request"
                    description="Ask someone to pay you"
                    icon={<Icon icon={IconQrcode} size="sm" />}
                    onClick={closeSheet}
                  />
                </SheetMenu>
              </Sheet>
            </div>
          ) : null
        }
      >
        <PatternHeader title={title} />
        <div className="ds-pattern__cta">
          <Button
            intent="primary"
            size="lg"
            fullWidth
            lifted
            onClick={(event) => {
              setMotion(pointerMotion(event))
              setOpen(true)
            }}
          >
            Move money
          </Button>
        </div>
      </PatternPhone>
    </PatternPage>
  )
}
