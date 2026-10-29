import { IconMoodSmile, IconSparkles } from '@tabler/icons-react'
import { Badge, Card, Icon, Stack, Text } from '../../../context/design-system/ds'
import { type Client, type ClientsListLayout, segmentBadgeLabel, segmentBadgeTone } from './clients-list-shared'

type ClientRowProps = {
  client: Client
}

function ClientRow({ client }: ClientRowProps) {
  return (
    <>
      <span className="clients-list-proto__avatar">{client.initials}</span>
      <div className="clients-list-proto__info">
        <Text as="p" variant="label" className="clients-list-proto__name">
          {client.name}
        </Text>
        <Text as="p" variant="muted" className="clients-list-proto__meta">
          {client.products} · Last contact {client.lastContact}
        </Text>
      </div>
      <Badge tone={segmentBadgeTone(client.segment)}>{segmentBadgeLabel(client.segment)}</Badge>
    </>
  )
}

function ClientRowItem({ client, className }: ClientRowProps & { className?: string }) {
  return (
    <div className={['clients-list-proto__row', className].filter(Boolean).join(' ')}>
      <ClientRow client={client} />
    </div>
  )
}

type ClientsListEmptyProps = {
  className?: string
}

export function ClientsListEmpty({ className }: ClientsListEmptyProps) {
  return (
    <Stack gap="var(--spacing-03)" className={['clients-list-proto__empty', className].filter(Boolean).join(' ')}>
      <Icon icon={IconMoodSmile} size="lg" />
      <Text as="p" variant="body">
        No clients match this search yet.
      </Text>
      <Text as="p" variant="muted">
        Try a different name, or clear the segment filter.
      </Text>
    </Stack>
  )
}

/** Points the relationship manager at clients they haven't spoken to in a while. */
export function ClientsListDormantTip({ count, className }: { count: number; className?: string }) {
  if (count === 0) return null
  return (
    <Card className={className} elevated>
      <Stack direction="row" gap="var(--spacing-04)">
        <Icon icon={IconSparkles} size="lg" className="clients-list-proto__tip-icon" />
        <Stack gap="var(--spacing-01)">
          <Text as="p" variant="label">
            Check in with dormant clients
          </Text>
          <Text as="p" variant="muted">
            {count} clients haven&apos;t heard from you in 6+ months. A short check-in keeps the relationship warm
            before they move their money elsewhere.
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}

type ClientsListLayoutBodyProps = {
  clients: Client[]
  layout: ClientsListLayout
}

export function ClientsListLayoutBody({ clients, layout }: ClientsListLayoutBodyProps) {
  if (clients.length === 0) {
    return <ClientsListEmpty />
  }

  switch (layout) {
    case 'card-container':
      return (
        <Card>
          <ul className="clients-list-proto__list">
            {clients.map((c) => (
              <li key={c.name}>
                <ClientRowItem client={c} />
              </li>
            ))}
          </ul>
        </Card>
      )
    case 'flat-dividers':
      return (
        <ul className="clients-list-proto__list clients-list-proto__list--flat">
          {clients.map((c) => (
            <li key={c.name}>
              <ClientRowItem client={c} />
            </li>
          ))}
        </ul>
      )
    case 'per-row-cards':
      return (
        <ul className="clients-list-proto__list clients-list-proto__list--row-cards">
          {clients.map((c) => (
            <li key={c.name}>
              <Card className="clients-list-proto__row-card">
                <ClientRowItem client={c} className="clients-list-proto__row--in-card" />
              </Card>
            </li>
          ))}
        </ul>
      )
    default: {
      const _exhaustive: never = layout
      return _exhaustive
    }
  }
}
