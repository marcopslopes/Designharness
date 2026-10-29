import { useMemo, useState } from 'react'
import { IconMessageCircle, IconSearch, IconSparkles } from '@tabler/icons-react'
import { Badge, Icon, Text } from '../../../../context/design-system/ds'
import { PhoneShell } from '../../../../src/design-harness/shared/PhoneShell'
import {
  ProAppIosCapsuleActions,
  ProAppIosCapsuleButton,
  ProAppTopBar,
} from '../../../../src/design-harness/shared/ProAppScreenChrome'
import { bankAppTabs } from '../bank-app-nav'
import { ClientsListDormantTip, ClientsListEmpty } from '../clients-list-layouts'
import {
  CLIENTS,
  countBySegment,
  SEGMENTS,
  segmentBadgeLabel,
  segmentBadgeTone,
  type Client,
  type ClientSegment,
} from '../clients-list-shared'

/**
 * Clients list — phone version of `ClientsListPrototypePage`, in the relationship manager app's Clients tab.
 *
 * Same data, segments and copy as the desktop screen. Device chrome is `PhoneShell` with this project's
 * own tabs (`bank-app-nav.tsx`); the top bar, search and segmented control reuse the shared iOS pieces.
 * A single assistant button floats above the tab bar.
 */
export type ClientsListMobilePageProps = {
  clients?: Client[]
  initialQuery?: string
  initialSegment?: ClientSegment
}

const AVATAR_TONE: Record<Client['segment'], string> = {
  premium: 'sea',
  new: 'mint',
  dormant: 'beige',
}

export function ClientsListMobilePage({
  clients = CLIENTS,
  initialQuery = '',
  initialSegment = 'all',
}: ClientsListMobilePageProps = {}) {
  const [activeSegment, setActiveSegment] = useState<ClientSegment>(initialSegment)
  const [query, setQuery] = useState(initialQuery)

  const filteredClients = useMemo(
    () =>
      clients.filter(
        (c) =>
          (activeSegment === 'all' || c.segment === activeSegment) &&
          c.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [clients, activeSegment, query],
  )
  const segmentCounts = useMemo(() => countBySegment(clients), [clients])

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <PhoneShell
        tabs={bankAppTabs('clients')}
        floating={
          <div className="nav-profile__cal-fabs">
            <button type="button" className="nav-profile__fab" aria-label="Ask the assistant">
              <Icon icon={IconSparkles} size="xl" />
            </button>
          </div>
        }
      >
        <div className="phone-shell__screen nav-profile__clients-screen">
          <ProAppTopBar
            title="Clients"
            actions={
              <ProAppIosCapsuleActions aria-label="Client actions">
                <ProAppIosCapsuleButton label="Messages">
                  <Icon icon={IconMessageCircle} size="md" />
                </ProAppIosCapsuleButton>
              </ProAppIosCapsuleActions>
            }
          />
          <Text as="p" variant="muted">
            {segmentCounts.all} total · {segmentCounts.new} new this week
          </Text>

          <label className="nav-profile__search">
            <Icon icon={IconSearch} size="md" className="nav-profile__search-icon" />
            <input
              type="search"
              placeholder="Search clients"
              aria-label="Search clients"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>

          <div
            className="nav-profile__segmented nav-profile__segmented--surface nav-profile__segmented--scroll"
            role="tablist"
            aria-label="Client segment"
          >
            {SEGMENTS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                className="nav-profile__segmented-btn"
                aria-selected={activeSegment === s.id}
                data-active={activeSegment === s.id ? 'true' : 'false'}
                onClick={() => setActiveSegment(s.id)}
              >
                {s.label} {segmentCounts[s.id]}
              </button>
            ))}
          </div>

          {filteredClients.length === 0 ? (
            <ClientsListEmpty />
          ) : (
            <ul className="nav-profile__client-list">
              {filteredClients.map((c) => (
                <li key={c.name} className="nav-profile__client-row">
                  <span className={`nav-profile__avatar nav-profile__avatar--${AVATAR_TONE[c.segment]}`} aria-hidden>
                    {c.initials}
                  </span>
                  <div className="nav-profile__client-info">
                    <Text as="p" variant="body" className="nav-profile__client-name">
                      {c.name}
                    </Text>
                    <Text as="p" variant="muted" className="nav-profile__client-phone">
                      Last contact {c.lastContact}
                    </Text>
                  </div>
                  <Badge tone={segmentBadgeTone(c.segment)}>{segmentBadgeLabel(c.segment)}</Badge>
                </li>
              ))}
            </ul>
          )}

          <ClientsListDormantTip count={segmentCounts.dormant} />
        </div>
      </PhoneShell>
    </div>
  )
}
