import { useState } from 'react'
import {
  IconBookmark,
  IconBuildingEstate,
  IconClock,
  IconCompass,
  IconGlass,
  IconMap,
  IconMapPin,
  IconSailboat,
  IconTrain,
  IconWalk,
} from '@tabler/icons-react'
import {
  Button,
  ContextHeader,
  DetailSheet,
  EmptyState,
  Icon,
  LargeTitleHeader,
  Sheet,
  SheetBody,
  SheetHeader,
  TabBar,
  Text,
  TextField,
  usePresence,
  type TablerIconComponent,
} from '../../../context/design-system/ds'
import { PhoneShell } from '../../../src/design-harness/shared/PhoneShell'

type TabId = 'trip' | 'explore' | 'saved'

type Trip = {
  from: string
  to: string
  flexibility: string
}

type Stop = {
  id: string
  time: string
  name: string
  detail: string
  kind: string
  icon: TablerIconComponent
}

type DayPlan = {
  id: string
  label: string
  date: string
  stops: Stop[]
}

const STARTER: Trip = {
  from: 'Lisbon',
  to: 'Douro Valley',
  flexibility: 'Flexible',
}

const TABS: { id: TabId; label: string; icon: TablerIconComponent }[] = [
  { id: 'trip', label: 'Trip', icon: IconMap },
  { id: 'explore', label: 'Explore', icon: IconCompass },
  { id: 'saved', label: 'Saved', icon: IconBookmark },
]

const DOURO: DayPlan[] = [
  {
    id: 'tue',
    label: 'Day 1',
    date: 'Tue 12 May',
    stops: [
      {
        id: 'train-out',
        time: '08:15',
        name: 'Alfa Pendular to Pinhão',
        detail: 'Campanhã · 3h 10m',
        kind: 'Train',
        icon: IconTrain,
      },
      {
        id: 'bomfim',
        time: '14:00',
        name: 'Quinta do Bomfim',
        detail: 'Tasting, already held',
        kind: 'Tasting',
        icon: IconGlass,
      },
    ],
  },
  {
    id: 'wed',
    label: 'Day 2',
    date: 'Wed 13 May',
    stops: [
      {
        id: 'boat',
        time: '10:30',
        name: 'Boat to Peso da Régua',
        detail: 'Leaves from Pinhão quay',
        kind: 'Boat',
        icon: IconSailboat,
      },
      {
        id: 'doc',
        time: '16:00',
        name: 'DOC, Folgosa — lunch on the river terrace',
        detail: 'Ask for a table by the window',
        kind: 'Lunch',
        icon: IconBuildingEstate,
      },
    ],
  },
  {
    id: 'thu',
    label: 'Day 3',
    date: 'Thu 14 May',
    stops: [
      {
        id: 'walk',
        time: '09:00',
        name: 'Vineyards above Pinhão',
        detail: 'A slow loop, no booking',
        kind: 'Walk',
        icon: IconWalk,
      },
      {
        id: 'train-back',
        time: '18:40',
        name: 'Train toward Lisbon',
        detail: 'Arrives Campanhã 21:50',
        kind: 'Train',
        icon: IconTrain,
      },
    ],
  },
  {
    id: 'fri',
    label: 'Day 4',
    date: 'Fri 15 May',
    stops: [
      {
        id: 'open',
        time: 'Morning',
        name: 'Lisbon, unfixed',
        detail: 'Dates can move. Nothing booked.',
        kind: 'Open',
        icon: IconClock,
      },
    ],
  },
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function planFor(trip: Trip): DayPlan[] {
  if (trip.to.trim().toLowerCase() === 'douro valley') return DOURO
  const destination = trip.to.trim() || 'the destination'
  const origin = trip.from.trim() || 'the start'
  return [
    {
      id: 'first-look',
      label: 'Day 1',
      date: trip.flexibility.trim() || 'Dates open',
      stops: [
        {
          id: 'arrive',
          time: 'Morning',
          name: `Arrive in ${destination}`,
          detail: `From ${origin}. The rest of the days are not filled in.`,
          kind: 'Arrive',
          icon: IconMapPin,
        },
      ],
    },
  ]
}

function findStop(days: DayPlan[], id: string) {
  for (const day of days) {
    const stop = day.stops.find((item) => item.id === id)
    if (stop) return { day, stop }
  }
  return null
}

function ChangeTripSheet({
  draft,
  open,
  motion,
  onDraft,
  onClose,
  onSave,
}: {
  draft: Trip
  open: boolean
  motion: boolean
  onDraft: (trip: Trip) => void
  onClose: (detail: number) => void
  onSave: () => void
}) {
  const presence = usePresence(open, motion)
  if (!presence.mounted) return null
  const ready = draft.from.trim() && draft.to.trim() && draft.flexibility.trim()

  return (
    <div
      className="ds-pattern__overlay"
      data-state={presence.state}
      data-motion={motion ? undefined : 'off'}
      onAnimationEnd={presence.onAnimationEnd}
    >
      <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={(event) => onClose(event.detail)} />
      <Sheet variant="form">
        <SheetHeader
          title="Change the trip"
          description="These three facts are what the plan was built from."
          onCancel={() => onClose(0)}
          doneProps={{ disabled: !ready }}
          onDone={() => {
            if (!ready) return
            onSave()
          }}
        />
        <SheetBody>
          <TextField
            label="Starting from"
            value={draft.from}
            onChange={(event) => onDraft({ ...draft, from: event.target.value })}
          />
          <TextField
            label="Heading to"
            value={draft.to}
            onChange={(event) => onDraft({ ...draft, to: event.target.value })}
          />
          <TextField
            label="How flexible"
            hint="Flexible, or a fixed set of dates"
            value={draft.flexibility}
            onChange={(event) => onDraft({ ...draft, flexibility: event.target.value })}
          />
        </SheetBody>
      </Sheet>
    </div>
  )
}

function StopSheet({
  hit,
  open,
  motion,
  onClose,
}: {
  hit: { day: DayPlan; stop: Stop } | null
  open: boolean
  motion: boolean
  onClose: (detail: number) => void
}) {
  const presence = usePresence(open, motion)
  if (!presence.mounted || !hit) return null
  const { day, stop } = hit
  return (
    <div
      className="ds-pattern__overlay"
      data-state={presence.state}
      data-motion={motion ? undefined : 'off'}
      onAnimationEnd={presence.onAnimationEnd}
    >
      <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={(event) => onClose(event.detail)} />
      <DetailSheet
        title={stop.name}
        meta={`${day.label} · ${day.date}`}
        status={stop.kind}
        statusIntent="neutral"
        facts={[
          { label: 'When', value: stop.time },
          { label: 'Note', value: stop.detail },
        ]}
        primaryLabel="Done"
        onPrimary={() => onClose(0)}
      />
    </div>
  )
}

/** First itinerary. The plan is on screen; the three inputs can be changed. */
export function ItineraryPage() {
  const [tab, setTab] = useState<TabId>('trip')
  const [trip, setTrip] = useState<Trip>(STARTER)
  const [draft, setDraft] = useState<Trip>(STARTER)
  const [changing, setChanging] = useState(false)
  const [stopId, setStopId] = useState<string | null>(null)
  const [motion, setMotion] = useState(true)
  const days = planFor(trip)
  const hit = stopId ? findStop(days, stopId) : null

  function begin(event: { detail: number }, next: () => void) {
    setMotion(!prefersReducedMotion() && event.detail !== 0)
    next()
  }

  function closeChange(detail: number) {
    setMotion(detail !== 0 && !prefersReducedMotion())
    setChanging(false)
    setDraft(trip)
  }

  function closeStop(detail: number) {
    setMotion(detail !== 0 && !prefersReducedMotion())
    setStopId(null)
  }

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <PhoneShell
        overlays={
          <>
            <ChangeTripSheet
              draft={draft}
              open={changing}
              motion={motion}
              onDraft={setDraft}
              onClose={closeChange}
              onSave={() => {
                setTrip({
                  from: draft.from.trim(),
                  to: draft.to.trim(),
                  flexibility: draft.flexibility.trim(),
                })
                closeChange(0)
              }}
            />
            <StopSheet hit={hit} open={hit !== null} motion={motion} onClose={closeStop} />
          </>
        }
      >
        <div className="ds-pattern travel-itinerary">
          <div className="ds-pattern__body">
            {tab === 'trip' ? (
              <>
                <ContextHeader
                  eyebrow="First plan"
                  title={trip.to}
                  tone="info"
                  stats={[
                    { label: 'From', value: trip.from },
                    { label: 'Dates', value: trip.flexibility },
                    { label: 'Days', value: String(days.length) },
                  ]}
                />
                <div className="travel-itinerary__plan">
                  <div className="travel-itinerary__head">
                    <Text as="h2" variant="label" id="travel-plan-title">
                      Plan
                    </Text>
                    <Button
                      intent="ghost"
                      size="sm"
                      className="travel-itinerary__change"
                      onClick={(event) =>
                        begin(event, () => {
                          setDraft(trip)
                          setChanging(true)
                        })
                      }
                    >
                      Change
                    </Button>
                  </div>
                  {days.map((day) => (
                    <section key={day.id} className="travel-itinerary__day" aria-labelledby={`travel-day-${day.id}`}>
                      <div className="travel-itinerary__day-label">
                        <Text as="h3" variant="muted" id={`travel-day-${day.id}`}>
                          {day.label}
                        </Text>
                        <Text as="p" variant="muted">
                          {day.date}
                        </Text>
                      </div>
                      <ul className="travel-itinerary__list">
                        {day.stops.map((stop) => (
                          <li key={stop.id}>
                            <button
                              type="button"
                              className="travel-itinerary__row"
                              onClick={(event) => begin(event, () => setStopId(stop.id))}
                            >
                              <span className="travel-itinerary__time">
                                <Text as="span" variant="label">
                                  {stop.time}
                                </Text>
                              </span>
                              <span className="travel-itinerary__row-icon" aria-hidden>
                                <Icon icon={stop.icon} size="md" />
                              </span>
                              <span className="travel-itinerary__row-main">
                                <Text as="span" variant="body">
                                  {stop.name}
                                </Text>
                                <Text as="span" variant="muted">
                                  {stop.detail}
                                </Text>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </>
            ) : (
              <>
                <LargeTitleHeader title={tab === 'explore' ? 'Explore' : 'Saved'} />
                <EmptyState
                  title={tab === 'explore' ? 'Look for a place' : 'Nothing saved'}
                  description={
                    tab === 'explore'
                      ? 'Places you find can be added to this trip. The plan you already have stays on Trip.'
                      : 'Places you keep from a trip show up here. This trip has none yet.'
                  }
                  icon={<Icon icon={tab === 'explore' ? IconCompass : IconBookmark} size="lg" />}
                />
              </>
            )}
          </div>
          <div className="ds-pattern__bar">
            <TabBar
              value={tab}
              onChange={(id) => setTab(id as TabId)}
              label="Travel"
              items={TABS.map((item) => ({
                id: item.id,
                label: item.label,
                icon: <Icon icon={item.icon} size="md" />,
              }))}
            />
          </div>
        </div>
      </PhoneShell>
    </div>
  )
}
