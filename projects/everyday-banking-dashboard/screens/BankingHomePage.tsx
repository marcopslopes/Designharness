import { useState } from 'react'
import {
  IconArrowsExchange,
  IconBell,
  IconBuildingBank,
  IconCoffee,
  IconCreditCard,
  IconDeviceTv,
  IconHome,
  IconPlus,
  IconSend,
  IconShoppingCart,
  IconTrain,
  IconUser,
} from '@tabler/icons-react'
import {
  ActionGrid,
  ActionTile,
  Button,
  Card,
  DetailSheet,
  HeaderIconButton,
  Icon,
  LargeTitleHeader,
  TabBar,
  Text,
  usePresence,
  type TablerIconComponent,
} from '../../../context/design-system/ds'
import { PhoneShell } from '../../../src/design-harness/shared/PhoneShell'

type Day = 'Today' | 'Yesterday' | 'Thursday'

type Transaction = {
  id: string
  merchant: string
  detail: string
  amount: string
  incoming: boolean
  day: Day
  icon: TablerIconComponent
}

const TRANSACTIONS: Transaction[] = [
  {
    id: 'tesco',
    merchant: 'Tesco Express',
    detail: 'Card · 08:14',
    amount: '−£18.40',
    incoming: false,
    day: 'Today',
    icon: IconShoppingCart,
  },
  {
    id: 'salary',
    merchant: 'Northwind Ltd',
    detail: 'Salary · 07:02',
    amount: '+£2,140.00',
    incoming: true,
    day: 'Today',
    icon: IconBuildingBank,
  },
  {
    id: 'tfl',
    merchant: 'TfL',
    detail: 'Card · 18:41',
    amount: '−£2.80',
    incoming: false,
    day: 'Yesterday',
    icon: IconTrain,
  },
  {
    id: 'coffee',
    merchant: 'Borough Market Coffee Roasters',
    detail: 'Card · 12:16',
    amount: '−£4.20',
    incoming: false,
    day: 'Yesterday',
    icon: IconCoffee,
  },
  {
    id: 'netflix',
    merchant: 'Netflix',
    detail: 'Direct debit · 06:00',
    amount: '−£15.99',
    incoming: false,
    day: 'Yesterday',
    icon: IconDeviceTv,
  },
]

const TABS = [
  { id: 'home', label: 'Home', icon: IconHome },
  { id: 'payments', label: 'Payments', icon: IconArrowsExchange },
  { id: 'cards', label: 'Cards', icon: IconCreditCard },
  { id: 'account', label: 'Account', icon: IconUser },
]

function daysOf(rows: Transaction[]) {
  const order: Day[] = []
  for (const row of rows) {
    if (!order.includes(row.day)) order.push(row.day)
  }
  return order.map((day) => ({ day, rows: rows.filter((row) => row.day === day) }))
}

function TransactionSheet({
  transaction,
  open,
  motion,
  onClose,
}: {
  transaction: Transaction | null
  open: boolean
  motion: boolean
  onClose: (detail: number) => void
}) {
  const presence = usePresence(open, motion)
  if (!presence.mounted || !transaction) return null
  return (
    <div
      className="ds-pattern__overlay"
      data-state={presence.state}
      data-motion={motion ? undefined : 'off'}
      onAnimationEnd={presence.onAnimationEnd}
    >
      <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={(event) => onClose(event.detail)} />
      <DetailSheet
        title={transaction.merchant}
        meta={transaction.detail}
        status={transaction.incoming ? 'Money in' : 'Posted'}
        statusIntent={transaction.incoming ? 'leaf' : 'ink'}
        facts={[
          { label: 'Amount', value: transaction.amount },
          { label: 'Account', value: 'Current ···· 4412' },
          { label: 'When', value: transaction.day },
        ]}
        primaryLabel="Done"
        onPrimary={() => onClose(0)}
      />
    </div>
  )
}

/** Everyday banking home. One balance, three actions, the last five transactions. */
export function BankingHomePage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [motion, setMotion] = useState(true)
  const open = TRANSACTIONS.find((row) => row.id === openId) ?? null

  function close(detail: number) {
    setMotion(detail !== 0)
    setOpenId(null)
  }

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <PhoneShell
        overlays={
          <TransactionSheet transaction={open} open={open !== null} motion={motion} onClose={close} />
        }
      >
        <div className="ds-pattern">
          <div className="ds-pattern__body">
            <LargeTitleHeader
              title="Home"
              actions={<HeaderIconButton icon={IconBell} label="Notifications" />}
            />
            <div className="everyday-home">
              <Card elevated className="everyday-home__hero">
                <Text as="h2" variant="muted">
                  Available
                </Text>
                <Text as="p" variant="display" className="everyday-home__amount">
                  £2,481.52
                </Text>
                <Text as="p" variant="muted">
                  Current account ···· 4412
                </Text>
              </Card>

              <ActionGrid columns={3} aria-label="Quick actions">
                <ActionTile icon={<Icon icon={IconPlus} size="md" />} label="Add money" tone="brand" />
                <ActionTile
                  icon={<Icon icon={IconSend} size="md" />}
                  label="Send"
                  tone="ink"
                  onClick={() => {
                    window.location.hash = '#/playground/everyday-banking-dashboard/send-list'
                  }}
                />
                <ActionTile icon={<Icon icon={IconCreditCard} size="md" />} label="Card" />
              </ActionGrid>

              <section className="everyday-home__activity" aria-labelledby="everyday-activity-title">
                <div className="everyday-home__section-head">
                  <Text as="h2" variant="label" id="everyday-activity-title">
                    Recent
                  </Text>
                  <Button intent="ghost" size="sm">
                    See all
                  </Button>
                </div>
                {daysOf(TRANSACTIONS).map((group) => (
                  <div key={group.day} className="everyday-home__day">
                    <Text as="h3" variant="muted" className="everyday-home__day-label">
                      {group.day}
                    </Text>
                    <ul className="everyday-home__list">
                      {group.rows.map((row) => (
                        <li key={row.id}>
                          <button
                            type="button"
                            className="everyday-home__row"
                            onClick={(event) => {
                              setMotion(event.detail !== 0)
                              setOpenId(row.id)
                            }}
                          >
                            <span className="everyday-home__row-icon" aria-hidden>
                              <Icon icon={row.icon} size="md" />
                            </span>
                            <span className="everyday-home__row-main">
                              <Text as="span" variant="body">
                                {row.merchant}
                              </Text>
                              <Text as="span" variant="muted">
                                {row.detail}
                              </Text>
                            </span>
                            <span className="everyday-home__row-amount" data-in={row.incoming ? 'true' : undefined}>
                              <Text as="span" variant="label">
                                {row.amount}
                              </Text>
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </div>
          </div>
          <div className="ds-pattern__bar">
            <TabBar
              value="home"
              onChange={() => {}}
              label="Banking"
              items={TABS.map((tab) => ({
                id: tab.id,
                label: tab.label,
                icon: <Icon icon={tab.icon} size="md" />,
              }))}
            />
          </div>
        </div>
      </PhoneShell>
    </div>
  )
}
