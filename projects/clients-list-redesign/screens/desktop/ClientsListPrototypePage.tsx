import { useMemo, useState } from 'react'
import { IconPlus, IconSearch, IconUpload, IconUsers } from '@tabler/icons-react'
import { Button, Card, EmptyState, Icon, Stack, Text } from '../../../../context/design-system/ds'
import { DesktopShell } from '../../../../src/design-harness/shared/DesktopShell'
import { bankAppTabs } from '../bank-app-nav'
import { CLIENTS, countBySegment, SEGMENTS, type Client, type ClientSegment } from '../clients-list-shared'
import { ClientsListDormantTip, ClientsListLayoutBody } from '../clients-list-layouts'

/**
 * Clients list — a relationship manager's client book, desktop.
 *
 * Premium / New / Dormant segments so the manager sees who's new and who they haven't
 * spoken to in a while, not just a flat directory.
 *
 * Layout: single card, rows with dividers — promoted via variant-fork gate
 * 2026-07-19 (supersedes flat-dividers pick from 2026-07-18; see decisions.md).
 *
 * Props set the starting state, so a link can open any state:
 * `?initialSegment=dormant`, `?initialQuery=Olivia`, `?clients=none`.
 */
export type ClientsListPrototypePageProps = {
  clients?: Client[] | 'none'
  initialQuery?: string
  initialSegment?: ClientSegment
}

export function ClientsListPrototypePage({
  clients: clientsProp = CLIENTS,
  initialQuery = '',
  initialSegment = 'all',
}: ClientsListPrototypePageProps = {}) {
  const clients = useMemo(() => (clientsProp === 'none' ? [] : clientsProp), [clientsProp])
  const [activeSegment, setActiveSegment] = useState<ClientSegment>(initialSegment)
  const [query, setQuery] = useState(initialQuery)

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSegment = activeSegment === 'all' || c.segment === activeSegment
      const matchesQuery = c.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesSegment && matchesQuery
    })
  }, [clients, activeSegment, query])

  const segmentCounts = useMemo(() => countBySegment(clients), [clients])
  const hasClients = clients.length > 0

  return (
    <DesktopShell tabs={bankAppTabs('clients')} url="app/clients">
      <div className="design-harness-ds-page design-harness-ds-page--wide clients-list-proto">
        <Stack gap="var(--spacing-06)">
          <header className="clients-list-proto__header">
            <Stack gap="var(--spacing-01)">
              <Text as="h1" variant="display">
                Clients
              </Text>
              {hasClients && (
                <Text as="p" variant="muted">
                  {segmentCounts.all} total · {segmentCounts.new} new this week
                </Text>
              )}
            </Stack>
            {hasClients && (
              <div className="clients-list-proto__header-actions">
                <Button variant="ghost" size="md">
                  <Icon icon={IconUpload} size="sm" />
                  Import clients
                </Button>
                <Button variant="primary" tone="sea" size="md">
                  <Icon icon={IconPlus} size="sm" />
                  Add client
                </Button>
              </div>
            )}
          </header>

          {!hasClients ? (
            <Card>
              <EmptyState
                className="clients-list-proto__empty-state"
                title="No clients assigned yet"
                description="Clients show up here once they're assigned to you. You can also add a prospect yourself."
                icon={<Icon icon={IconUsers} size="lg" />}
                primaryAction={
                  <Button intent="primary" size="md" startIcon={<Icon icon={IconPlus} size="sm" />}>
                    Add client
                  </Button>
                }
                secondaryAction={
                  <Button intent="ghost" size="md" startIcon={<Icon icon={IconUpload} size="sm" />}>
                    Import clients
                  </Button>
                }
              />
            </Card>
          ) : (
            <>
              <label className="clients-list-proto__search">
                <Icon icon={IconSearch} size="sm" className="clients-list-proto__search-icon" />
                <input
                  type="search"
                  placeholder="Search clients"
                  aria-label="Search clients"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>

              <div className="clients-list-proto__segments" role="tablist" aria-label="Client segment">
                {SEGMENTS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    role="tab"
                    aria-selected={activeSegment === s.id}
                    className="clients-list-proto__segment"
                    data-active={activeSegment === s.id}
                    onClick={() => setActiveSegment(s.id)}
                  >
                    {s.label}
                    <span className="clients-list-proto__segment-count">{segmentCounts[s.id]}</span>
                  </button>
                ))}
              </div>

              <ClientsListLayoutBody clients={filteredClients} layout="card-container" />

              <ClientsListDormantTip count={segmentCounts.dormant} className="clients-list-proto__tip" />
            </>
          )}
        </Stack>
      </div>
    </DesktopShell>
  )
}
