import { useState } from 'react'
import {
  IconBell,
  IconCalendar,
  IconChevronDown,
  IconChevronRight,
  IconClock,
  IconCurrencyDollar,
  IconDots,
  IconMessage,
  IconMicrophone,
  IconPhone,
  IconScissors,
  IconShare,
  IconTrash,
  IconUserPlus,
} from '@tabler/icons-react'
import {
  Avatar,
  ConfirmationSheet,
  ContextHeader,
  DetailSheet,
  HeaderIconButton,
  Icon,
  LargeTitleHeader,
  NavBarHeader,
  PickerSheet,
  SearchHeader,
  Sheet,
  SheetAction,
  SheetBody,
  SheetGroup,
  SheetHeader,
  SheetMenu,
  SheetRow,
  StatusSheet,
  TabbedHeader,
  TextField,
  Chip,
  type StatusSheetVariant,
} from '../../../context/design-system/ds'

function Sample({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ds-frame">
      <p className="design-harness-system__note">{label}</p>
      {children}
    </div>
  )
}

export function HeaderDemo() {
  const [tab, setTab] = useState('overview')
  const [query, setQuery] = useState('paint mix')
  const [recents, setRecents] = useState([
    { id: 'paint mix', label: 'paint mix' },
    { id: 'timber', label: 'timber cut' },
    { id: 'color', label: 'color' },
  ])
  const [opened, setOpened] = useState('Today')

  return (
    <>
      <Sample label="Large title">
        <LargeTitleHeader
          title="Today"
          subtitle="12 appointments"
          leading={
            <button
              type="button"
              className="ds-header__avatar-btn"
              aria-label="Profile"
              onClick={() => setOpened('Profile')}
            >
              <Avatar initials="ML" size="sm" tint="ink" />
            </button>
          }
          actions={
            <HeaderIconButton icon={IconBell} label="Notifications" badge onClick={() => setOpened('Notifications')} />
          }
          onSearch={() => setOpened('Search')}
          searchTrailing={<Icon icon={IconMicrophone} size="sm" />}
        />
      </Sample>
      <Sample label="Nav bar">
        <NavBarHeader
          title="Patricia Taylor"
          subtitle="Wed · 10:00 AM"
          onBack={() => setOpened('Back')}
          actions={
            <>
              <HeaderIconButton icon={IconShare} label="Share" onClick={() => setOpened('Share')} />
              <HeaderIconButton icon={IconDots} label="More" onClick={() => setOpened('More')} />
            </>
          }
        />
      </Sample>
      <Sample label="Search">
        <SearchHeader
          value={query}
          onChange={setQuery}
          onCancel={() => setQuery('')}
          scopes={[
            { id: 'all', label: 'All' },
            { id: 'services', label: 'Services' },
            { id: 'staff', label: 'Staff' },
            { id: 'clients', label: 'Clients' },
          ]}
          defaultScope="all"
          recents={recents}
          onRecent={(id) => setQuery(recents.find((item) => item.id === id)?.label ?? '')}
          onRemoveRecent={(id) => setRecents((items) => items.filter((item) => item.id !== id))}
        />
      </Sample>
      <Sample label="Tabbed">
        <TabbedHeader
          title="Reports"
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'sales', label: 'Sales' },
            { id: 'clients', label: 'Clients' },
            { id: 'services', label: 'Services' },
            { id: 'staff', label: 'Staff' },
          ]}
          value={tab}
          onChange={setTab}
          action={<HeaderIconButton icon={IconBell} label="Notifications" badge />}
        />
      </Sample>
      <Sample label="Context">
        <ContextHeader
          eyebrow="Booking confirmed"
          title="Appointment set"
          tone="success"
          onBack={() => setOpened('Back')}
          stats={[
            { label: 'Date', value: '12 Jun' },
            { label: 'Time', value: '10:00' },
            { label: 'Total', value: '$45' },
          ]}
          onDetails={() => setOpened('Details')}
        />
      </Sample>
      <p className="design-harness-system__note">
        Last header action: {opened}. Tab: {tab}. Query: {query || 'empty'}.
      </p>
    </>
  )
}

const DURATIONS = ['15 min', '20 min', '30 min', '45 min', '1 h', '1 h 15 min', '1 h 30 min', '2 h']

export function SheetDemo() {
  const [client, setClient] = useState('Patricia Taylor')
  const [duration, setDuration] = useState('45 min')
  const [action, setAction] = useState('none')
  const [status, setStatus] = useState<StatusSheetVariant>('success')

  return (
    <>
      <Sample label="Form">
        <Sheet>
          <SheetHeader title="New booking" onCancel={() => setAction('cancel')} onDone={() => setAction('done')} />
          <SheetBody>
            <TextField label="Client" value={client} onChange={(event) => setClient(event.target.value)} />
            <SheetGroup label="Details">
              <SheetRow
                label="Service"
                value="Paint mix + timber cut"
                icon={<Icon icon={IconChevronRight} size="xs" />}
                onClick={() => setAction('service')}
              />
              <SheetRow
                label="Date"
                value="Wed, 12 Jun"
                icon={<Icon icon={IconChevronDown} size="xs" />}
                onClick={() => setAction('date')}
              />
              <SheetRow
                label="Staff"
                value="Patricia Taylor"
                icon={<Icon icon={IconChevronRight} size="xs" />}
                onClick={() => setAction('staff')}
              />
            </SheetGroup>
          </SheetBody>
        </Sheet>
      </Sample>
      <Sample label="Action">
        <Sheet variant="action" cancelLabel="Cancel" onCancel={() => setAction('cancel')}>
          <SheetMenu caption="Wed, 12 Jun · 10:00 – 11:00" detail="Patricia Taylor · Paint mix + timber cut">
            <SheetAction
              label="Reschedule booking"
              description="Pick a new time slot"
              icon={<Icon icon={IconCalendar} size="sm" />}
              onClick={() => setAction('reschedule')}
            />
            <SheetAction
              label="Add another client"
              description="Book a group together"
              icon={<Icon icon={IconUserPlus} size="sm" />}
              onClick={() => setAction('add-client')}
            />
            <SheetAction
              label="Share booking"
              description="Send a calendar invite"
              icon={<Icon icon={IconShare} size="sm" />}
              onClick={() => setAction('share')}
            />
            <SheetAction
              label="Cancel booking"
              icon={<Icon icon={IconTrash} size="sm" />}
              destructive
              onClick={() => setAction('cancel-booking')}
            />
          </SheetMenu>
        </Sheet>
      </Sample>
      <Sample label="Confirmation">
        <ConfirmationSheet
          destructive
          title="Cancel this booking?"
          body="Patricia will be notified and the slot opens up again."
          confirmLabel="Yes, cancel booking"
          cancelLabel="Keep it"
          onConfirm={() => setAction('confirmed-cancel')}
          onCancel={() => setAction('kept')}
        />
      </Sample>
      <Sample label="Picker">
        <PickerSheet
          title="Duration"
          options={DURATIONS.map((label) => ({ value: label, label }))}
          value={duration}
          onChange={setDuration}
          onCancel={() => setAction('picker-cancel')}
          onDone={() => setAction(`picker-done ${duration}`)}
        />
      </Sample>
      <Sample label="Detail">
        <DetailSheet
          initials="PT"
          title="Patricia Taylor"
          meta="VIP · 24 visits · last 3 days ago"
          status="Confirmed"
          facts={[
            { label: 'When', value: 'Wed, 12 Jun · 10:00 – 11:00', icon: <Icon icon={IconClock} size="xs" /> },
            { label: 'Service', value: 'Paint mix + timber cut', icon: <Icon icon={IconScissors} size="xs" /> },
            { label: 'Total', value: '$45.00', icon: <Icon icon={IconCurrencyDollar} size="xs" /> },
          ]}
          actions={[
            { label: 'Message', icon: <Icon icon={IconMessage} size="sm" />, onClick: () => setAction('message') },
            { label: 'Call', icon: <Icon icon={IconPhone} size="sm" />, onClick: () => setAction('call') },
          ]}
          primaryLabel="Check in client"
          onPrimary={() => setAction('check-in')}
        />
      </Sample>
      <Sample label="Status">
        <div className="ds-header__scopes" role="group" aria-label="Status variant">
          {(['loading', 'success', 'warning', 'error', 'info'] as const).map((variant) => (
            <Chip key={variant} size="sm" selected={status === variant} onClick={() => setStatus(variant)}>
              {variant}
            </Chip>
          ))}
        </div>
        <StatusSheet
          variant={status}
          title={
            status === 'loading'
              ? 'We are processing your payment.'
              : status === 'success'
                ? 'Payment completed.'
                : status === 'warning'
                  ? 'Payment completed, but the receipt did not send.'
                  : status === 'error'
                    ? 'The card was declined.'
                    : 'An update is ready to install.'
          }
          paragraph={status === 'loading' ? undefined : 'Visa ending 4521 · $45.00'}
          onDismiss={status === 'success' || status === 'error' ? () => setAction('dismiss') : undefined}
          actions={
            status === 'warning'
              ? [
                  { label: 'Retry', tone: 'primary', onClick: () => setAction('retry') },
                  { label: 'Skip', tone: 'secondary', onClick: () => setAction('skip') },
                ]
              : status === 'info'
                ? [
                    { label: 'Install now', tone: 'primary', onClick: () => setAction('install') },
                    { label: 'Remind me later', tone: 'secondary', onClick: () => setAction('later') },
                    { label: 'Skip this version', tone: 'danger', onClick: () => setAction('skip-version') },
                  ]
                : undefined
          }
        />
      </Sample>
      <p className="design-harness-system__note">
        Last sheet action: {action}. Client: {client}. Duration: {duration}.
      </p>
    </>
  )
}
