import { useState, type ReactNode } from 'react'
import {
  IconChartBar,
  IconClock,
  IconHeart,
  IconPlus,
  IconSearch,
  IconShare,
  IconShoppingBag,
  IconStar,
  IconUser,
  IconWallet,
} from '@tabler/icons-react'
import {
  ActionGrid,
  ActionTile,
  BookingList,
  BookingListItem,
  ClientListItem,
  Coachmark,
  HintBanner,
  HintCaption,
  HintField,
  Icon,
  List,
  PromoCard,
  ServiceListItem,
  SetupChecklist,
  Slider,
  Stack,
  Stepper,
  type BookingStatus,
} from '../../../context/design-system/ds'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'

const COACH_STEPS = [
  {
    title: 'Meet the new agenda view',
    body: 'See your whole day at a glance — blocks show bookings by service.',
  },
  {
    title: 'Tap any block to manage',
    body: 'Reschedule, message, or check in a client from the calendar.',
  },
  {
    title: 'Long-press to block off',
    body: 'Drag out busy time without leaving the screen.',
  },
]

const SERVICES = [
  { name: 'Paint mix + timber cut', duration: '45 min', price: '$45', category: 'Paint dept', tint: 'brand' as const },
  { name: 'Paint coloring', duration: '2 h 30 min', price: 'from $120', category: 'Color', tint: 'premium' as const },
  { name: 'Blade sharpening', duration: '30 min', price: '$28', category: 'Tools', tint: 'amber' as const },
]

function Page({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesignHarnessDocPage title={title} lead={lead}>
        {children}
      </DesignHarnessDocPage>
    </div>
  )
}

export function StepperPage() {
  const [qty, setQty] = useState(2)
  const [people, setPeople] = useState(1)
  return (
    <Page title="Stepper" lead="Decrease and increase a number, with a floor and a ceiling.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <List>
          <div className="ds-list-item">
            <span className="ds-list-item__body">
              <span className="ds-list-item__title">Service quantity</span>
              <span className="ds-list-item__meta">Paint mix</span>
            </span>
            <Stepper label="Service quantity" value={qty} max={10} onChange={setQty} />
          </div>
          <div className="ds-list-item">
            <span className="ds-list-item__body">
              <span className="ds-list-item__title">Group size</span>
              <span className="ds-list-item__meta">1–8 people</span>
            </span>
            <Stepper label="Group size" value={people} min={1} max={8} onChange={setPeople} />
          </div>
        </List>
      </div>
    </Page>
  )
}

export function SliderPage() {
  const [duration, setDuration] = useState(45)
  return (
    <Page title="Slider" lead="A range with the current value between the ends.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <div className="ds-list" style={{ padding: 'var(--spacing-04)' }}>
          <Slider label="Duration" value={duration} min={15} max={120} unit=" min" onChange={setDuration} />
        </div>
      </div>
    </Page>
  )
}

export function ListItemPage() {
  const [on, setOn] = useState([true, true, false])
  const [booking, setBooking] = useState<BookingStatus[]>(['arrived', 'confirmed', 'pending'])
  return (
    <Page title="List item" lead="A service row, a client row, and a booking row.">
      <Stack gap="var(--spacing-06)">
        <List>
          {SERVICES.map((service, index) => (
            <ServiceListItem
              key={service.name}
              {...service}
              on={on[index]}
              onToggle={() => setOn((rows) => rows.map((value, i) => (i === index ? !value : value)))}
            />
          ))}
        </List>
        <List>
          <ClientListItem
            initials="PT"
            name="Patricia Taylor"
            phone="+1 (415) 555-0119"
            lastVisit="3 days ago"
            spend="$1,240"
            tint="brand"
            vip
          />
          <ClientListItem
            initials="AY"
            name="Anthony Y. Macintosh"
            phone="+1 (415) 555-0177"
            lastVisit="Never"
            spend="—"
            tint="amber"
            badge="New"
          />
        </List>
        <BookingList>
          <BookingListItem
            start="10:00"
            end="11:00"
            initials="PT"
            name="Patricia Taylor"
            service="Paint mix + timber cut · $45"
            status={booking[0]}
            tint="brand"
            onCheckIn={() => setBooking((rows) => ['arrived', rows[1], rows[2]])}
          />
          <BookingListItem
            start="11:30"
            end="13:00"
            initials="MB"
            name="Michael Brown"
            service="Paint coloring · from $120"
            status={booking[1]}
            tint="premium"
          />
          <BookingListItem
            start="14:00"
            end="14:30"
            initials="SK"
            name="Sarah Kim"
            service="Express key cutting · $22"
            status={booking[2]}
            tint="rose"
            onCheckIn={() => setBooking((rows) => [rows[0], rows[1], 'arrived'])}
          />
        </BookingList>
      </Stack>
    </Page>
  )
}

export function HintPage() {
  return (
    <Page title="Hint" lead="A help mark, a caption under a field, and dismissible notes.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <Stack gap="var(--spacing-04)">
          <HintField
            label="Booking buffer"
            hint="Extra minutes added after each booking. Use it for cleanup or notes."
            value="15 min"
            trailing="added after each booking"
          />
          <div>
            <HintField label="Cancellation policy" value="24 hours" trailing="free cancel" />
            <HintCaption>Clients who cancel within 24 hours are charged 50% of the service price.</HintCaption>
          </div>
          <HintBanner tone="info" title="Heads up" body="Your hours sync every 5 minutes." />
          <HintBanner tone="tip" title="Pro tip" body="Add 10–15 minutes for color services." />
          <HintBanner tone="warn" title="Almost full" body="You're booked 90% for next week." />
        </Stack>
      </div>
    </Page>
  )
}

export function CoachmarkPage() {
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(true)
  return (
    <Page title="Coachmark" lead="A spotlight on a target, then a short stepped card.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        {open ? (
          <Coachmark
            steps={COACH_STEPS}
            step={step}
            onStepChange={setStep}
            onDismiss={() => setOpen(false)}
            target={
              <span className="ds-list-item__title-row">
                <Icon icon={IconClock} size="md" />
                <span className="ds-list-item__body">
                  <span className="ds-list-item__title">Agenda view</span>
                  <span className="ds-list-item__meta">New · day timeline</span>
                </span>
              </span>
            }
          />
        ) : (
          <button
            type="button"
            className="ds-coachmark__next"
            onClick={() => {
              setStep(0)
              setOpen(true)
            }}
          >
            Show coachmark
          </button>
        )}
      </div>
    </Page>
  )
}

export function ActionGridPage() {
  return (
    <Page title="Action grid" lead="Neutral tiles, and tiles tinted by category.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <Stack gap="var(--spacing-05)">
          <ActionGrid columns={3}>
            <ActionTile icon={<Icon icon={IconWallet} size="md" />} label="Wallet" />
            <ActionTile icon={<Icon icon={IconChartBar} size="md" />} label="Reports" />
            <ActionTile icon={<Icon icon={IconShare} size="md" />} label="Share" />
          </ActionGrid>
          <ActionGrid columns={3}>
            <ActionTile tone="brand" icon={<Icon icon={IconWallet} size="md" />} label="Wallet" />
            <ActionTile tone="premium" icon={<Icon icon={IconShoppingBag} size="md" />} label="Store" />
            <ActionTile tone="amber" icon={<Icon icon={IconClock} size="md" />} label="Hours" />
            <ActionTile tone="leaf" icon={<Icon icon={IconStar} size="md" />} label="Verify" />
            <ActionTile tone="danger" icon={<Icon icon={IconHeart} size="md" />} label="Saved" />
            <ActionTile tone="ink" icon={<Icon icon={IconPlus} size="md" />} label="More" />
          </ActionGrid>
          <ActionGrid columns={2}>
            <ActionTile icon={<Icon icon={IconSearch} size="md" />} label="Discover" />
            <ActionTile icon={<Icon icon={IconUser} size="md" />} label="Clients" />
          </ActionGrid>
        </Stack>
      </div>
    </Page>
  )
}

export function PromoCardPage() {
  return (
    <Page title="Promo card" lead="A soft card with an icon, a title, and a badge.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <Stack gap="var(--spacing-04)">
          <PromoCard
            tone="premium"
            icon={<Icon icon={IconShoppingBag} size="lg" />}
            title="Store"
            badge="New"
            body="Buy products for your business directly from well-known brands."
          />
          <PromoCard
            tone="brand"
            icon={<Icon icon={IconClock} size="lg" />}
            title="Auto-rebook reminders"
            badge="Beta"
            body="Text clients 6 weeks after their last visit. Set once, never miss a rebook."
          />
        </Stack>
      </div>
    </Page>
  )
}

export function SetupChecklistPage() {
  const [done, setDone] = useState(3)
  return (
    <Page title="Setup checklist" lead="How far setup has got, and the next step.">
      <div className="design-harness-ds-demo" style={{ maxWidth: 420 }}>
        <SetupChecklist
          title="Setup checklist"
          done={done}
          total={6}
          next={done >= 6 ? 'You are set' : 'Add a service'}
          onClick={() => setDone((value) => Math.min(6, value + 1))}
        />
      </div>
    </Page>
  )
}
