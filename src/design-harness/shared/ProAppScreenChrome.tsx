import type { ReactNode } from 'react'
import {
  IconBell,
  IconChevronRight,
  IconClipboardCheck,
  IconFilter,
  IconMessageCircle,
  IconPlus,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { Icon, Text } from '../../../context/design-system/ds'
import { useProAppLocale } from './proAppLocale'

/**
 * Shared pro-app screen chrome from Navigation / Profile prototype
 * (Figma lKsNe3YlWnsb9P07e9ZSLv). Reuse for any Design Harness flow that needs the
 * same Calendar tab shell + bottom nav — see harness/skills/mobile-shell/SKILL.md.
 */

export type { ProAppTabId, TodayProTabId } from './proAppPhoneTabs'

function ChevronRightIcon({ className }: { className?: string }) {
  return <Icon icon={IconChevronRight} size="md" className={className} />
}

function CitationPinWrapLocal({ children, pin }: { children: ReactNode; pin?: ReactNode }) {
  if (!pin) return <>{children}</>
  return (
    <span className="cal-settings-proto__citation-anchor">
      {children}
      {pin}
    </span>
  )
}

export function ProAppIconCircleButton({
  label,
  children,
  onClick,
  badge,
  badgeCount,
  bare,
}: {
  label: string
  children: ReactNode
  onClick?: () => void
  badge?: boolean
  badgeCount?: number
  bare?: boolean
}) {
  return (
    <button
      type="button"
      className={['nav-profile__icon-btn', bare ? 'nav-profile__icon-btn--bare' : null].filter(Boolean).join(' ')}
      aria-label={label}
      onClick={onClick}
    >
      {children}
      {badgeCount != null && badgeCount > 0 ? (
        <span className="nav-profile__icon-btn-badge-count" aria-hidden>
          {badgeCount}
        </span>
      ) : badge ? (
        <span className="nav-profile__icon-btn-badge" aria-hidden />
      ) : null}
    </button>
  )
}

/**
 * Apple-style floating capsule — paired icon actions in one pill
 * (e.g. Add + Settings). Uses Foundations surface + soft elevate; no glass blur
 * until a real DS token exists.
 */
export function ProAppIosCapsuleActions({
  children,
  'aria-label': ariaLabel = 'Actions',
}: {
  children: ReactNode
  'aria-label'?: string
}) {
  return (
    <div className="nav-profile__ios-capsule" role="toolbar" aria-label={ariaLabel}>
      {children}
    </div>
  )
}

export function ProAppIosCapsuleButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button type="button" className="nav-profile__ios-capsule-btn" aria-label={label} onClick={onClick}>
      {children}
    </button>
  )
}

export function ProAppTopBar({
  title,
  actions,
  titleAddon,
}: {
  title: string
  actions: ReactNode
  titleAddon?: ReactNode
}) {
  return (
    <div className="nav-profile__toolbar">
      <div className="nav-profile__toolbar-title-wrap">
        <Text as="h1" variant="display" className="nav-profile__toolbar-title">
          {title}
        </Text>
        {titleAddon}
      </div>
      <div className="nav-profile__toolbar-actions">{actions}</div>
    </div>
  )
}

/**
 * Push-nav header — circular DS-style icon buttons + centered title
 * (Notifications, Client detail, etc.). Uses `ProAppIconCircleButton` chrome.
 */
export function ProAppNavHeader({
  title,
  leading,
  trailing,
}: {
  title: string
  leading: ReactNode
  trailing?: ReactNode
}) {
  return (
    <header className="nav-profile__nav-header">
      <div className="nav-profile__nav-header-side nav-profile__nav-header-side--start">{leading}</div>
      <Text as="h1" variant="display" className="nav-profile__nav-header-title">
        {title}
      </Text>
      <div className="nav-profile__nav-header-side nav-profile__nav-header-side--end">
        {trailing ?? <span className="nav-profile__nav-header-spacer" aria-hidden />}
      </div>
    </header>
  )
}

export type ProAppCalendarScreenProps = {
  onOpenSettings: () => void
  /** Header variant that shows `staticScreenTitle` instead of the business name. */
  headerLayout?: 'default' | 'two-row'
  /** Static tab screen title (two-row layout only). */
  staticScreenTitle?: string
  businessName?: string
  hoursLabel?: string
  identityPin?: ReactNode
  gearPin?: ReactNode
}

export type ProAppCalendarAgendaScreenProps = {
  onOpenSettings: () => void
  onOpenNotifications?: () => void
  businessName?: string
  hoursLabel?: string
  /** Day-of-month highlighted as “today” in the week strip (Navigation IA four-tab proto). */
  todayDate?: number
  /** Replace default title top bar (e.g. Dashboard|Calendar chrome). */
  topChrome?: ReactNode
}

export function ProAppCalendarScreen({
  onOpenSettings,
  headerLayout = 'default',
  staticScreenTitle = 'Calendar',
  businessName = 'Northwest paint',
  hoursLabel = '10:00 – 19:00',
  identityPin,
  gearPin,
}: ProAppCalendarScreenProps) {
  const { t } = useProAppLocale()
  const identityRow =
    headerLayout === 'two-row' ? (
      <ProAppTopBar
        title={staticScreenTitle}
        titleAddon={identityPin}
        actions={
          <ProAppIconCircleButton label="Notifications" badge>
            <Icon icon={IconBell} size="md" />
          </ProAppIconCircleButton>
        }
      />
    ) : (
      <ProAppTopBar
        title={businessName}
        actions={
          <>
            <ProAppIconCircleButton label="Messages">
              <Icon icon={IconMessageCircle} size="md" />
            </ProAppIconCircleButton>
            <ProAppIconCircleButton label="Notifications" badge>
              <Icon icon={IconBell} size="md" />
            </ProAppIconCircleButton>
          </>
        }
      />
    )

  return (
    <div className="phone-shell__screen">
      {identityRow}

      <div className="nav-profile__cal-summary">
        <div>
          <button type="button" className="nav-profile__cal-today">
            {t('tab.today')} <ChevronRightIcon className="nav-profile__cal-today-chev" />
          </button>
          <Text as="p" variant="muted" className="nav-profile__cal-hours">
            {hoursLabel}
          </Text>
        </div>
        <div className="nav-profile__cal-tools">
          <ProAppIconCircleButton label={t('cal.filter')} bare>
            <Icon icon={IconFilter} size="md" />
          </ProAppIconCircleButton>
          <CitationPinWrapLocal pin={gearPin}>
            <ProAppIconCircleButton label={t('cal.settings')} bare onClick={onOpenSettings}>
              <Icon icon={IconSettings} size="md" />
            </ProAppIconCircleButton>
          </CitationPinWrapLocal>
        </div>
      </div>

      <div className="nav-profile__cal-week" role="tablist" aria-label="Week">
        {[
          { day: 'MON', date: 10 },
          { day: 'TUE', date: 11 },
          { day: 'WED', date: 12 },
          { day: 'THU', date: 13 },
          { day: 'FRI', date: 14 },
          { day: 'SAT', date: 15 },
          { day: 'SUN', date: 16 },
        ].map((d) => (
          <div key={d.date} className="nav-profile__cal-day" data-active={d.date === 10 ? 'true' : 'false'}>
            <span className="nav-profile__cal-day-label">{d.day}</span>
            <span className="nav-profile__cal-day-num">{d.date}</span>
          </div>
        ))}
      </div>

      <div className="nav-profile__cal-staff">
        {[
          { initials: 'PT', name: 'Patricia Taylor', hours: '10:00–19:00' },
          { initials: 'MB', name: 'Michael Brown', hours: '10:00–19:00' },
          { initials: 'PT', name: 'Micha…', hours: '10:00–…' },
        ].map((s, i) => (
          <div className="nav-profile__cal-staff-item" key={i}>
            <span className="nav-profile__avatar nav-profile__avatar--sm">{s.initials}</span>
            <div>
              <Text as="p" variant="label" className="nav-profile__cal-staff-name">
                {s.name}
              </Text>
              <Text as="p" variant="muted" className="nav-profile__cal-staff-hours">
                {s.hours}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <div className="nav-profile__cal-timeline">
        <div className="nav-profile__cal-appt nav-profile__cal-appt--pink">
          <Text as="p" variant="label" className="nav-profile__cal-appt-time">
            10:00 – 11:00
          </Text>
          <Text as="p" variant="body" className="nav-profile__cal-appt-title">
            John Doe · Classic hairstyle + Plumbing
          </Text>
        </div>
        <div className="nav-profile__cal-appt nav-profile__cal-appt--red">
          <Text as="p" variant="label" className="nav-profile__cal-appt-time">
            09:30 – 11:30
          </Text>
          <Text as="p" variant="body" className="nav-profile__cal-appt-title">
            Jack Doe · Classic hairstyle + Plumbing
          </Text>
        </div>
      </div>
    </div>
  )
}

/** Calendar day agenda — Navigation IA four-tab direction (hour grid, no staff row). */
export function ProAppCalendarAgendaScreen({
  onOpenSettings,
  businessName = 'Northwest paint',
  hoursLabel = '10:00 – 19:00',
  todayDate = 14,
}: ProAppCalendarAgendaScreenProps) {
  const { t } = useProAppLocale()
  const week = [
    { day: 'MON', date: 10 },
    { day: 'TUE', date: 11 },
    { day: 'WED', date: 12 },
    { day: 'THU', date: 13 },
    { day: 'FRI', date: 14 },
    { day: 'SAT', date: 15 },
    { day: 'SUN', date: 16 },
  ]

  return (
    <div className="phone-shell__screen nav-profile__cal-agenda-screen">
      <ProAppTopBar
        title={businessName}
        actions={
          <ProAppIconCircleButton label="Notifications" badge>
            <Icon icon={IconBell} size="md" />
          </ProAppIconCircleButton>
        }
      />

      <div className="nav-profile__cal-summary">
        <div>
          <button type="button" className="nav-profile__cal-today">
            {t('tab.today')} <ChevronRightIcon className="nav-profile__cal-today-chev" />
          </button>
          <Text as="p" variant="muted" className="nav-profile__cal-hours">
            {hoursLabel}
          </Text>
        </div>
        <div className="nav-profile__cal-tools">
          <ProAppIconCircleButton label={t('cal.filter')} bare>
            <Icon icon={IconFilter} size="md" />
          </ProAppIconCircleButton>
          <ProAppIconCircleButton label={t('cal.settings')} bare onClick={onOpenSettings}>
            <Icon icon={IconSettings} size="md" />
          </ProAppIconCircleButton>
        </div>
      </div>

      <div className="nav-profile__cal-week" role="tablist" aria-label="Week">
        {week.map((d) => (
          <div
            key={d.date}
            className={['nav-profile__cal-day', d.date === todayDate ? 'nav-profile__cal-day--today' : null]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="nav-profile__cal-day-label">{d.day}</span>
            <span className="nav-profile__cal-day-num">{d.date}</span>
          </div>
        ))}
      </div>

      <div className="nav-profile__cal-agenda-wrap">
        <div className="nav-profile__cal-appt nav-profile__cal-appt--violet">
          <Text as="p" variant="label" className="nav-profile__cal-appt-name">
            John Doe
          </Text>
          <Text as="p" variant="muted" className="nav-profile__cal-appt-svc">
            Classic hairstyle + Plumbing
          </Text>
          <Text as="p" variant="label" className="nav-profile__cal-appt-time nav-profile__cal-appt-time--violet">
            10:00 – 11:00
          </Text>
        </div>
        <div className="nav-profile__cal-appt nav-profile__cal-appt--red">
          <Text as="p" variant="label" className="nav-profile__cal-appt-name">
            Jack Doe
          </Text>
          <Text as="p" variant="muted" className="nav-profile__cal-appt-svc">
            Classic hairstyle
          </Text>
          <Text as="p" variant="label" className="nav-profile__cal-appt-time nav-profile__cal-appt-time--brand">
            09:30 – 11:30
          </Text>
        </div>
        {['12:00', '13:00', '14:00'].map((hour) => (
          <Text key={hour} as="p" variant="muted" className="nav-profile__cal-agenda-hour">
            {hour}
          </Text>
        ))}
      </div>
    </div>
  )
}

const IOS_CAL_GRID_START = 12 * 60
const IOS_CAL_GRID_END = 21 * 60
const IOS_CAL_GRID_SPAN = IOS_CAL_GRID_END - IOS_CAL_GRID_START
const IOS_CAL_HOUR_PX = 56

function iosTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function iosApptPosition(start: string, end: string) {
  const s = iosTimeToMinutes(start)
  const e = iosTimeToMinutes(end)
  return {
    top: `${((s - IOS_CAL_GRID_START) / IOS_CAL_GRID_SPAN) * 100}%`,
    height: `${((e - s) / IOS_CAL_GRID_SPAN) * 100}%`,
  }
}

type IosCalApptTone = 'mint' | 'lavender' | 'peach' | 'violet' | 'sea'

const IOS_CAL_STAFF = ['Johnny', 'Justas Test', 'Sasha']

const IOS_CAL_WEEK = [
  { label: 'M', date: 27, avatar: null },
  { label: 'T', date: 28, avatar: { initials: 'J', tone: 'sea' as const } },
  { label: 'W', date: 29, selected: true, avatar: { initials: 'J', tone: 'violet' as const } },
  { label: 'T', date: 30, avatar: { initials: 'JT', tone: 'mint' as const } },
  { label: 'F', date: 31, avatar: { initials: 'S', tone: 'peach' as const } },
  { label: 'S', date: 1, avatar: null },
  { label: 'S', date: 2, avatar: null },
]

const IOS_CAL_APPTS: {
  col: number
  start: string
  end: string
  client: string
  service: string
  tone: IosCalApptTone
}[] = [
  { col: 0, start: '12:00', end: '12:45', client: 'Lisa Park', service: 'Screws', tone: 'mint' },
  { col: 0, start: '13:00', end: '14:30', client: 'Emma Wilson', service: 'Sale items', tone: 'violet' },
  { col: 0, start: '16:00', end: '17:00', client: 'Olivia Brown', service: 'Braids', tone: 'mint' },
  { col: 0, start: '18:15', end: '18:45', client: 'Chris Park', service: 'Drain clearance', tone: 'peach' },
  { col: 1, start: '12:30', end: '13:15', client: 'Maya Chen', service: 'Colour match', tone: 'lavender' },
  { col: 1, start: '14:15', end: '15:30', client: 'Natalia Rodriguez', service: 'Walk-in', tone: 'lavender' },
  { col: 1, start: '16:30', end: '17:30', client: 'James Chen', service: 'Paint mix', tone: 'sea' },
  { col: 1, start: '17:00', end: '17:45', client: 'Ava Thompson', service: 'Key cutting', tone: 'peach' },
  { col: 2, start: '13:45', end: '15:00', client: 'Maria Santos', service: 'Boiler service', tone: 'peach' },
  { col: 2, start: '14:45', end: '15:30', client: 'Chris Park', service: 'Drain clearance', tone: 'lavender' },
  { col: 2, start: '15:30', end: '17:30', client: 'James Chen', service: 'Paint mix', tone: 'mint' },
  { col: 2, start: '16:15', end: '17:15', client: 'Ava Thompson', service: 'Key cutting', tone: 'lavender' },
]

/** iOS prod-style day view — multi-staff columns + time grid (Navigation IA / four-tab DS v2). */
export function ProAppCalendarIosScreen({
  onOpenSettings,
  onOpenNotifications,
  businessName = 'Northwest',
  hoursLabel = '08:00 – 17:00',
  nowLabel = '15:52',
  topChrome,
}: ProAppCalendarAgendaScreenProps & { nowLabel?: string }) {
  const { t } = useProAppLocale()
  const nowPct = ((iosTimeToMinutes(nowLabel) - IOS_CAL_GRID_START) / IOS_CAL_GRID_SPAN) * 100
  const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
  const trackHeight = (hours.length - 1) * IOS_CAL_HOUR_PX

  const calendarMain = (
    <>
      <div className="nav-profile__cal-summary">
        <div>
          <button type="button" className="nav-profile__cal-today">
            {t('tab.today')}{' '}
            <ChevronRightIcon className="nav-profile__cal-today-chev nav-profile__cal-today-chev--down" />
          </button>
          <Text as="p" variant="muted" className="nav-profile__cal-hours">
            {hoursLabel}
          </Text>
        </div>
        <div className="nav-profile__cal-tools">
          <ProAppIconCircleButton label={t('cal.filter')} bare>
            <Icon icon={IconFilter} size="md" />
          </ProAppIconCircleButton>
          <ProAppIconCircleButton label={t('cal.settings')} bare onClick={onOpenSettings}>
            <Icon icon={IconSettings} size="md" />
          </ProAppIconCircleButton>
        </div>
      </div>

      <div className="nav-profile__cal-week nav-profile__cal-week--ios" role="tablist" aria-label="Week">
        {IOS_CAL_WEEK.map((d) => (
          <div
            key={`${d.label}-${d.date}`}
            className={['nav-profile__cal-day', d.selected ? 'nav-profile__cal-day--ios-selected' : null]
              .filter(Boolean)
              .join(' ')}
          >
            <span className="nav-profile__cal-day-label">{d.label}</span>
            <span className="nav-profile__cal-day-num">{d.date}</span>
            {d.avatar ? (
              <span
                className={`nav-profile__cal-ios-staff-chip nav-profile__cal-ios-staff-chip--${d.avatar.tone}`}
                title={d.avatar.initials}
              >
                {d.avatar.initials}
              </span>
            ) : (
              <span className="nav-profile__cal-ios-staff-chip nav-profile__cal-ios-staff-chip--empty" aria-hidden />
            )}
          </div>
        ))}
      </div>

      <div className="nav-profile__cal-ios-staff-names" aria-hidden>
        {IOS_CAL_STAFF.map((name) => (
          <span key={name} className="nav-profile__cal-ios-staff-name">
            {name}
          </span>
        ))}
      </div>

      <div className="nav-profile__cal-ios-scroll">
        <div className="nav-profile__cal-ios-track" style={{ height: trackHeight, minHeight: '100%' }}>
          <div className="nav-profile__cal-ios-hours">
            {hours.map((h) => (
              <span key={h} className="nav-profile__cal-ios-hour">
                {h}
              </span>
            ))}
          </div>
          <div className="nav-profile__cal-ios-cols-wrap">
            <div className="nav-profile__cal-ios-cols">
              {IOS_CAL_STAFF.map((_, colIndex) => (
                <div key={colIndex} className="nav-profile__cal-ios-col">
                  {IOS_CAL_APPTS.filter((a) => a.col === colIndex).map((a) => (
                    <div
                      key={`${a.client}-${a.start}`}
                      className={`nav-profile__cal-ios-appt nav-profile__cal-ios-appt--${a.tone}`}
                      style={iosApptPosition(a.start, a.end)}
                    >
                      <Text as="p" variant="muted" className="nav-profile__cal-ios-appt-time">
                        {a.start} – {a.end}
                      </Text>
                      <Text as="p" variant="body" className="nav-profile__cal-ios-appt-client">
                        {a.client}
                      </Text>
                      <Text as="p" variant="muted" className="nav-profile__cal-ios-appt-svc">
                        {a.service}
                      </Text>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="nav-profile__cal-ios-now" style={{ top: `${nowPct}%` }}>
            <span className="nav-profile__cal-ios-now-pill">{nowLabel}</span>
            <span className="nav-profile__cal-ios-now-line" />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div
      className={[
        'phone-shell__screen',
        'nav-profile__cal-ios-screen',
        topChrome ? 'nav-profile__cal-ios-screen--home-chrome' : null,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {topChrome ?? (
        <ProAppTopBar
          title={businessName}
          actions={
            <>
              <ProAppIconCircleButton label="Messages">
                <Icon icon={IconMessageCircle} size="md" />
              </ProAppIconCircleButton>
              <ProAppIconCircleButton label="Notifications" badgeCount={3} onClick={onOpenNotifications}>
                <Icon icon={IconBell} size="md" />
              </ProAppIconCircleButton>
            </>
          }
        />
      )}

      {topChrome ? <div className="nav-profile__cal-ios-main">{calendarMain}</div> : calendarMain}
    </div>
  )
}

export function ProAppCalendarFabStack() {
  return (
    <div className="nav-profile__cal-fabs">
      <ProAppIconCircleButton label="Waitlist">
        <Icon icon={IconClipboardCheck} size="md" />
      </ProAppIconCircleButton>
      <button type="button" className="nav-profile__fab" aria-label="Add booking">
        <Icon icon={IconPlus} size="lg" />
      </button>
    </div>
  )
}

/** Clients tab — FAB stack like calendar (secondary + primary Add). */
export function ProAppClientsFabStack() {
  return (
    <div className="nav-profile__cal-fabs">
      <ProAppIconCircleButton label="Import clients">
        <Icon icon={IconUsers} size="md" />
      </ProAppIconCircleButton>
      <button type="button" className="nav-profile__fab" aria-label="Add client">
        <Icon icon={IconPlus} size="lg" />
      </button>
    </div>
  )
}
