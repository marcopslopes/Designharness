import { useMemo, useState } from 'react'
import { IconPlus, IconSearch, IconUpload } from '@tabler/icons-react'
import { Button, Icon, Stack, Text } from '../../../../context/design-system/ds'
import { DesktopShell } from '../../../../src/design-harness/shared/DesktopShell'
import { bankAppTabs } from '../bank-app-nav'
import {
  CLIENTS,
  countBySegment,
  LAYOUT_FORK_OPTIONS,
  SEGMENTS,
  type ClientSegment,
  type ClientsListLayout,
} from '../clients-list-shared'
import { ClientsListDormantTip, ClientsListLayoutBody } from '../clients-list-layouts'

/**
 * Clients list layout fork — `ui-agent` Step 3.5 comparison page.
 *
 * Three DS-compliant list structures for the same client data. Used during
 * variant-fork gate; see `projects/clients-list-redesign/decisions.md`.
 *
 * Route: `#/playground/clients-list-layout-fork`
 */
export function ClientsListLayoutForkPage() {
  const [layout, setLayout] = useState<ClientsListLayout>('card-container')
  const [activeSegment, setActiveSegment] = useState<ClientSegment>('all')
  const [query, setQuery] = useState('')

  const filteredClients = useMemo(() => {
    return CLIENTS.filter((c) => {
      const matchesSegment = activeSegment === 'all' || c.segment === activeSegment
      const matchesQuery = c.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesSegment && matchesQuery
    })
  }, [activeSegment, query])

  const segmentCounts = useMemo(() => countBySegment(), [])

  return (
    <Stack gap="var(--spacing-05)" className="clients-list-proto__fork-stage">
      <div className="clients-list-proto__layout-tabs" role="tablist" aria-label="List layout variant">
        {LAYOUT_FORK_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={layout === opt.id}
            className="clients-list-proto__layout-tab"
            data-layout={opt.id}
            data-active={layout === opt.id}
            onClick={() => setLayout(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <DesktopShell tabs={bankAppTabs('clients')} url="app/clients">
        <div className="design-harness-ds-page design-harness-ds-page--wide clients-list-proto clients-list-proto--fork">
          <Stack gap="var(--spacing-06)">
            <header className="clients-list-proto__header">
              <Stack gap="var(--spacing-01)">
                <Text as="h1" variant="display">
                  Clients
                </Text>
                <Text as="p" variant="muted">
                  {segmentCounts.all} total · {segmentCounts.new} new this week
                </Text>
              </Stack>
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
            </header>

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

            <ClientsListLayoutBody clients={filteredClients} layout={layout} />

            <ClientsListDormantTip count={segmentCounts.dormant} className="clients-list-proto__tip" />
          </Stack>
        </div>
      </DesktopShell>
    </Stack>
  )
}
