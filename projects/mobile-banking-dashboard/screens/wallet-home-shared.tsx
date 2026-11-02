import { useState, type MouseEvent, type ReactNode } from 'react'
import {
  IconAlertTriangle,
  IconBuildingBank,
  IconCalendarRepeat,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconClockHour4,
  IconX,
} from '@tabler/icons-react'
import { Alert, Badge, Button, Card, EmptyState, Icon, List, SettingsRow, Sheet, Text, usePresence } from '../../../context/design-system/ds'
import {
  formatMoney,
  PAYOUT_MINIMUM,
  STAGES,
  type PastPayout,
  type PayoutStage,
  walletDirection,
  type WalletHomeData,
  type WalletLead,
} from './wallet-home-data'

/**
 * Wallet home — body of the iOS screen.
 *
 * Answers the three questions from the brief in order: how much is coming and when (next payout, with its
 * stage), what isn't ready yet (Pending, with the payout it lands in), and why some is held (On hold, reason
 * one tap away). Objects and words follow the project's conceptual model: a Payout is made of Transactions;
 * never "deposit".
 */

function PayoutTracker({ stage }: { stage: PayoutStage }) {
  const current = STAGES.findIndex((s) => s.id === stage)
  return (
    <ol className="wallet-home__tracker" aria-label="Payout progress">
      {STAGES.map((s, i) => (
        <li
          key={s.id}
          className="wallet-home__tracker-step"
          data-state={i < current ? 'done' : i === current ? 'current' : 'todo'}
          aria-current={i === current ? 'step' : undefined}
        >
          <span className="wallet-home__tracker-dot" aria-hidden />
          <span className="wallet-home__tracker-label">{s.label}</span>
        </li>
      ))}
    </ol>
  )
}

function feeAmount(payout: PastPayout) {
  const fees = payout.breakdown.filter((line) => line.label === 'Transaction fees')
  if (fees.length === 0) return null
  return Math.abs(fees.reduce((sum, line) => sum + line.amount, 0))
}

function Breakdown({ payout }: { payout: PastPayout }) {
  const returned = payout.status === 'returned'
  return (
    <dl className="wallet-home__breakdown-list">
      {payout.breakdown.map((b) => (
        <div key={b.label} className="wallet-home__breakdown-line">
          <dt>{b.label}</dt>
          <dd>{formatMoney(b.amount, true)}</dd>
        </div>
      ))}
      <div className="wallet-home__breakdown-line wallet-home__breakdown-line--total">
        <dt>{returned ? 'Returned to your balance' : 'Paid to your bank'}</dt>
        <dd>{formatMoney(payout.amount)}</dd>
      </div>
    </dl>
  )
}

function PayoutRow({ payout, defaultOpen }: { payout: PastPayout; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(Boolean(defaultOpen))
  const returned = payout.status === 'returned'
  const fees = feeAmount(payout)
  return (
    <div className="wallet-home__payout" data-open={open ? 'true' : 'false'}>
      <button
        type="button"
        className="wallet-home__row wallet-home__row--button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="wallet-home__row-icon" data-tone={returned ? 'danger' : undefined} aria-hidden>
          <Icon icon={IconBuildingBank} size="md" />
        </span>
        <span className="wallet-home__row-main">
          <Text as="span" variant="body" className="wallet-home__row-title">
            Payout · {payout.date}
          </Text>
          <Text as="span" variant="muted">
            {returned ? 'Returned by your bank' : 'Arrived'} · {payout.transactionCount} transactions
          </Text>
        </span>
        <span className="wallet-home__row-end">
          <Text as="span" variant="label" className="wallet-home__row-amount">
            {formatMoney(payout.amount)}
          </Text>
          {fees != null ? (
            <Text as="span" variant="muted" className="wallet-home__row-meta">
              Fees {formatMoney(fees)}
            </Text>
          ) : null}
        </span>
        <Icon icon={IconChevronDown} size="sm" className="wallet-home__row-chevron" />
      </button>
      {open ? (
        <div className="wallet-home__breakdown">
          <Breakdown payout={payout} />
          <Button intent="ghost" size="sm">
            View all {payout.transactionCount} transactions
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function WalletHoldSheet({
  data,
  open,
  motion,
  onClose,
}: {
  data: NonNullable<WalletHomeData['hold']>
  open: boolean
  motion: boolean
  onClose: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  const presence = usePresence(open, motion)
  if (!presence.mounted) return null
  return (
    <div
      className="wallet-home__overlay ds-pattern__overlay"
      data-state={presence.state}
      data-motion={motion ? undefined : 'off'}
      onAnimationEnd={presence.onAnimationEnd}
    >
      <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={onClose} />
      <Sheet className="wallet-home__sheet">
        <div className="wallet-home__sheet-body" role="dialog" aria-modal="true" aria-labelledby="wallet-hold-title">
          <div className="wallet-home__sheet-head">
            <Text as="h2" variant="body-large" className="wallet-home__sheet-title" id="wallet-hold-title">
              Why {formatMoney(data.amount)} is on hold
            </Text>
            <button type="button" className="wallet-home__icon-btn" aria-label="Close dialog" onClick={onClose}>
              <Icon icon={IconX} size="md" />
            </button>
          </div>
          <HoldDetails data={data} onDone={onClose} />
        </div>
      </Sheet>
    </div>
  )
}

function WalletNotSetUp() {
  return (
    <EmptyState
      icon={<Icon icon={IconBuildingBank} size="lg" />}
      title="Get paid straight to your bank"
      description="Add your bank details to receive client payments and tips. Payouts go out every Friday."
    >
      <ol className="wallet-home__setup-steps">
        <li>Add your bank account</li>
        <li>Confirm your identity</li>
        <li>Get paid every Friday</li>
      </ol>
      <Button intent="primary" size="lg" className="wallet-home__setup-cta">
        Set up payouts
      </Button>
    </EmptyState>
  )
}

function WalletStatusAlert({ data }: { data: WalletHomeData }) {
  if (data.status === 'paused') {
    return (
      <Alert
        intent="warning"
        icon={<Icon icon={IconAlertTriangle} size="md" />}
        title="Payouts are paused"
        description="Confirm your identity to restart them. Your balance is safe."
        actionLabel="Confirm identity"
      />
    )
  }
  if (data.status === 'failed') {
    const returned = data.payouts.find((p) => p.status === 'returned')
    return (
      <Alert
        intent="danger"
        icon={<Icon icon={IconAlertTriangle} size="md" />}
        title={`${returned?.date ?? 'Last'} payout returned`}
        description={`The account is closed. Update your bank details to get ${formatMoney(returned?.amount ?? 0)} in your next payout.`}
        actionLabel="Update bank details"
      />
    )
  }
  return null
}

function PayoutBadge({ data }: { data: WalletHomeData }) {
  if (data.status === 'paused')
    return (
      <Badge intent="amber" dot>
        Paused
      </Badge>
    )
  if (data.status === 'failed')
    return (
      <Badge intent="danger" dot>
        Action needed
      </Badge>
    )
  return (
    <Badge intent="brand" dot>
      {STAGES.find((s) => s.id === data.nextPayout.stage)?.label}
    </Badge>
  )
}

function DesktopPageHead({ data }: { data: WalletHomeData }) {
  return (
    <header className="wallet-home__desktop-head">
      <div>
        <Text as="h1" variant="display">
          Wallet
        </Text>
        <Text as="p" variant="muted">
          {data.nextPayout.schedule} to account {data.nextPayout.account}
        </Text>
      </div>
    </header>
  )
}

function payoutWhen(data: WalletHomeData) {
  const { status, nextPayout, available } = data
  if (status === 'paused') return 'Goes out once your identity is confirmed'
  if (status === 'failed') return 'Goes out once your bank details are updated'
  if (available < PAYOUT_MINIMUM) {
    const short = PAYOUT_MINIMUM - available
    return `${formatMoney(short)} short of the ${formatMoney(PAYOUT_MINIMUM)} minimum. Misses ${nextPayout.date}.`
  }
  return `Arrives ${nextPayout.date} · to account ${nextPayout.account}`
}

function SplitCopy({
  icon,
  label,
  amount,
  hint,
  link,
}: {
  icon: typeof IconClockHour4
  label: string
  amount: string
  hint: string
  link?: boolean
}) {
  return (
    <>
      <span className="wallet-home__split-label">
        <Icon icon={icon} size="xs" />
        {label}
      </span>
      <Text as="span" variant="label">
        {amount}
      </Text>
      <Text as="span" variant="muted" className={link ? 'wallet-home__split-hint wallet-home__split-hint--link' : 'wallet-home__split-hint'}>
        {hint}
      </Text>
    </>
  )
}

function MoneySplit({
  data,
  onOpenHold,
}: {
  data: WalletHomeData
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className="wallet-home__split">
      <Card className="wallet-home__split-tile">
        <SplitCopy
          icon={IconClockHour4}
          label="Pending"
          amount={formatMoney(data.pending)}
          hint={data.status === 'active' ? `In the ${data.followingPayoutDate} payout` : 'Not ready yet'}
        />
      </Card>
      {data.onHold > 0 ? (
        <Card className="wallet-home__split-tile wallet-home__split-tile--hold">
          <button type="button" className="wallet-home__split-hit" onClick={onOpenHold}>
            <SplitCopy
              icon={IconAlertTriangle}
              label="On hold"
              amount={formatMoney(data.onHold)}
              hint={data.hold ? `${data.hold.client} disputed ${data.hold.service}` : 'On hold'}
              link
            />
          </button>
        </Card>
      ) : null}
    </div>
  )
}

function NextPayoutHero({
  data,
  onOpenHold,
  split = true,
}: {
  data: WalletHomeData
  onOpenHold?: (event: MouseEvent<HTMLButtonElement>) => void
  /** Desktop puts Pending and On hold beside the hero, not inside it. */
  split?: boolean
}) {
  return (
    <Card elevated className="wallet-home__hero">
      <div className="wallet-home__hero-head">
        <Text as="h2" variant="muted">
          Next payout
        </Text>
        <PayoutBadge data={data} />
      </div>
      <Text as="p" variant="display" className="wallet-home__hero-amount">
        {formatMoney(data.available)}
      </Text>
      <Text as="p" variant="muted">
        {payoutWhen(data)}
      </Text>
      {data.status === 'active' ? <PayoutTracker stage={data.nextPayout.stage} /> : null}
      {split && onOpenHold ? <MoneySplit data={data} onOpenHold={onOpenHold} /> : null}
    </Card>
  )
}

/** First build, rejected in review: an Available balance on top, then a Next payout card repeating the amount. */
function BalanceFirstCards({
  data,
  onOpenHold,
}: {
  data: WalletHomeData
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <>
      <Card elevated className="wallet-home__hero">
        <Text as="h2" variant="muted">
          Available
        </Text>
        <Text as="p" variant="display" className="wallet-home__hero-amount">
        {formatMoney(data.available)}
      </Text>
        <MoneySplit data={data} onOpenHold={onOpenHold} />
      </Card>
      <Card className="wallet-home__hero">
        <div className="wallet-home__hero-head">
          <Text as="h2" variant="muted">
            Next payout
          </Text>
          <PayoutBadge data={data} />
        </div>
        <Text as="p" variant="label">
          {formatMoney(data.available)}
        </Text>
        <Text as="p" variant="muted">
          {payoutWhen(data)}
        </Text>
      </Card>
    </>
  )
}

function PendingRows({ data }: { data: WalletHomeData }) {
  return (
    <List>
      {data.pendingTransactions.map((t) => (
        <div key={t.id} className="wallet-home__row">
          <span className="wallet-home__row-main">
            <Text as="span" variant="body" className="wallet-home__row-title">
              {t.client}
            </Text>
            <Text as="span" variant="muted">
              {t.kind}
              {t.service ? ` · ${t.service}` : ''}
            </Text>
          </span>
          <span className="wallet-home__row-end">
            <Text as="span" variant="label" className="wallet-home__row-amount">
              {formatMoney(t.amount, true)}
            </Text>
            <Text as="span" variant="muted" className="wallet-home__row-meta">
              Ready {t.readyOn}
            </Text>
          </span>
        </div>
      ))}
    </List>
  )
}

function PayoutSettingsRow({ data }: { data: WalletHomeData }) {
  return (
    <SettingsRow
      title="Payout Settings"
      description={`${data.nextPayout.schedule} to account ${data.nextPayout.account}`}
      icon={<Icon icon={IconCalendarRepeat} size="md" />}
      tint="brand"
    />
  )
}

function BackToWallet({ onBack }: { onBack: () => void }) {
  return (
    <button type="button" className="wallet-home__back" onClick={onBack}>
      <Icon icon={IconChevronLeft} size="sm" />
      <Text as="span" variant="label">
        Back to wallet
      </Text>
    </button>
  )
}

function HoldDetails({
  data,
  onDone,
}: {
  data: NonNullable<WalletHomeData['hold']>
  onDone: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <>
      <Text as="p" variant="body">
        {data.client} disputed a {formatMoney(data.amount)} payment for {data.service} on {data.date}. The money stays
        on hold while their card provider reviews it.
      </Text>
      <Card className="wallet-home__sheet-next">
        <Text as="p" variant="label">
          What happens next
        </Text>
        <Text as="p" variant="muted">
          You'll hear the outcome by {data.decisionBy}. If it's resolved in your favour, the money goes into your next
          payout.
        </Text>
      </Card>
      <div className="wallet-home__sheet-actions">
        <Button intent="primary" size="lg" onClick={onDone}>
          Wait until {data.decisionBy}
        </Button>
        <Button intent="ghost" size="md" onClick={onDone}>
          Got it
        </Button>
      </div>
    </>
  )
}

function HoldLead({ data, onOpen }: { data: WalletHomeData; onOpen: () => void }) {
  if (!data.hold) return null
  return (
    <button type="button" className="wallet-home__hold-lead" onClick={onOpen}>
      <span className="wallet-home__split-label">
        <Icon icon={IconAlertTriangle} size="xs" />
        On hold
      </span>
      <Text as="span" variant="body-large">
        {formatMoney(data.onHold)}
      </Text>
      <Text as="span" variant="muted">
        {data.hold.client} disputed {data.hold.service}
      </Text>
      <Text as="span" variant="muted">
        Not in the {data.nextPayout.date} payout · Decision by {data.hold.decisionBy}
      </Text>
    </button>
  )
}

function NextPayoutButton({ data, onOpen }: { data: WalletHomeData; onOpen: () => void }) {
  return (
    <Card elevated className="wallet-home__hero">
      <button type="button" className="wallet-home__hero-hit" onClick={onOpen}>
        <div className="wallet-home__hero-head">
          <Text as="h2" variant="muted">
            Next payout
          </Text>
          <PayoutBadge data={data} />
        </div>
        <Text as="p" variant="display" className="wallet-home__hero-amount">
          {formatMoney(data.available)}
        </Text>
        <Text as="p" variant="muted">
          {payoutWhen(data)}
        </Text>
        <span className="wallet-home__see">
          <Text as="span" variant="label">
            See this payout
          </Text>
          <Icon icon={IconChevronRight} size="sm" />
        </span>
      </button>
    </Card>
  )
}

function HoldRow({
  data,
  onOpen,
}: {
  data: WalletHomeData
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  if (!data.hold) return null
  return (
    <button type="button" className="wallet-home__row wallet-home__row--button" onClick={onOpen}>
      <span className="wallet-home__row-icon" aria-hidden>
        <Icon icon={IconAlertTriangle} size="md" />
      </span>
      <span className="wallet-home__row-main">
        <Text as="span" variant="body" className="wallet-home__row-title">
          On hold
        </Text>
        <Text as="span" variant="muted">
          {data.hold.client} disputed {data.hold.service}
        </Text>
      </span>
      <span className="wallet-home__row-end">
        <Text as="span" variant="label" className="wallet-home__row-amount">
          {formatMoney(data.onHold)}
        </Text>
        <Text as="span" variant="muted" className="wallet-home__row-meta">
          Decision by {data.hold.decisionBy}
        </Text>
      </span>
    </button>
  )
}

function PayoutStatement({ payout, onOpen }: { payout: PastPayout; onOpen?: () => void }) {
  const returned = payout.status === 'returned'
  const head = (
    <>
      <span className="wallet-home__section-head">
        <Text as="span" variant="body" className="wallet-home__row-title">
          Payout · {payout.date}
        </Text>
        <Text as="span" variant="label">
          {formatMoney(payout.amount)}
        </Text>
      </span>
      <Text as="span" variant="muted">
        {returned ? 'Returned by your bank' : 'Arrived'} · {payout.transactionCount} transactions
      </Text>
    </>
  )
  return (
    <Card className="wallet-home__statement">
      {onOpen ? (
        <button type="button" className="wallet-home__hero-hit" onClick={onOpen}>
          {head}
        </button>
      ) : (
        <div className="wallet-home__hero-hit">{head}</div>
      )}
      <Breakdown payout={payout} />
    </Card>
  )
}

function OutsidePayout({
  data,
  onOpenHold,
}: {
  data: WalletHomeData
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  return (
    <section className="wallet-home__section" aria-labelledby="wallet-outside-title">
      <div className="wallet-home__section-head">
        <Text as="h2" variant="label" id="wallet-outside-title">
          Not in this payout
        </Text>
      </div>
      <Text as="p" variant="muted">
        Pending joins the {data.followingPayoutDate} payout.
      </Text>
      <PendingRows data={data} />
      <List>
        <HoldRow data={data} onOpen={onOpenHold} />
      </List>
    </section>
  )
}

function HoldPage({ data, onBack }: { data: NonNullable<WalletHomeData['hold']>; onBack: () => void }) {
  return (
    <>
      <BackToWallet onBack={onBack} />
      <Text as="h2" variant="body-large" className="wallet-home__sheet-title" id="wallet-hold-title">
        Why {formatMoney(data.amount)} is on hold
      </Text>
      <HoldDetails data={data} onDone={() => onBack()} />
    </>
  )
}

function FocusedPayout({
  data,
  focus,
  onBack,
  onOpenHold,
}: {
  data: WalletHomeData
  focus: string
  onBack: () => void
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
}) {
  if (focus === 'next') {
    return (
      <>
        <BackToWallet onBack={onBack} />
        <NextPayoutHero data={data} onOpenHold={onOpenHold} split={false} />
        <OutsidePayout data={data} onOpenHold={onOpenHold} />
      </>
    )
  }
  const payout = data.payouts.find((item) => item.id === focus)
  if (!payout) return <BackToWallet onBack={onBack} />
  return (
    <>
      <BackToWallet onBack={onBack} />
      <PayoutStatement payout={payout} />
    </>
  )
}

function HoldHome({ data, onOpenHold }: { data: WalletHomeData; onOpenHold: () => void }) {
  return (
    <>
      <HoldLead data={data} onOpen={onOpenHold} />
      <NextPayoutHero data={data} split={false} />
      <PayoutSettingsRow data={data} />
      <section className="wallet-home__section" aria-labelledby="wallet-pending-title">
        <div className="wallet-home__section-head">
          <Text as="h2" variant="label" id="wallet-pending-title">
            Pending
          </Text>
          <Text as="span" variant="muted">
            {formatMoney(data.pending)}
          </Text>
        </div>
        <PendingRows data={data} />
      </section>
      <section className="wallet-home__section" aria-labelledby="wallet-payouts-title">
        <div className="wallet-home__section-head">
          <Text as="h2" variant="label" id="wallet-payouts-title">
            Past payouts
          </Text>
        </div>
        <List>
          {data.payouts.map((p, i) => (
            <PayoutRow key={p.id} payout={p} defaultOpen={i === 0} />
          ))}
        </List>
      </section>
    </>
  )
}

function PayoutHome({
  data,
  onOpenHold,
  onOpenPayout,
}: {
  data: WalletHomeData
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
  onOpenPayout: (id: string) => void
}) {
  return (
    <>
      <PayoutSettingsRow data={data} />
      <NextPayoutButton data={data} onOpen={() => onOpenPayout('next')} />
      <section className="wallet-home__section" aria-labelledby="wallet-payouts-title">
        <div className="wallet-home__section-head">
          <Text as="h2" variant="label" id="wallet-payouts-title">
            Past payouts
          </Text>
        </div>
        {data.payouts.map((payout) => (
          <PayoutStatement key={payout.id} payout={payout} onOpen={() => onOpenPayout(payout.id)} />
        ))}
      </section>
      <OutsidePayout data={data} onOpenHold={onOpenHold} />
    </>
  )
}

function FridayGroup({
  title,
  amount,
  onOpen,
  children,
}: {
  title: string
  amount: string
  onOpen?: () => void
  children?: ReactNode
}) {
  const head = (
    <>
      <Text as="h2" variant="label">
        {title}
      </Text>
      <span className="wallet-home__section-end">
        <Text as="span" variant="muted">
          {amount}
        </Text>
        {onOpen ? <Icon icon={IconChevronRight} size="sm" /> : null}
      </span>
    </>
  )
  return (
    <section className="wallet-home__section">
      {onOpen ? (
        <button type="button" className="wallet-home__section-head wallet-home__section-head--button" onClick={onOpen}>
          {head}
        </button>
      ) : (
        <div className="wallet-home__section-head">{head}</div>
      )}
      {children}
    </section>
  )
}

function FridayHome({
  data,
  onOpenHold,
  onOpenPayout,
}: {
  data: WalletHomeData
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
  onOpenPayout: (id: string) => void
}) {
  return (
    <>
      <PayoutSettingsRow data={data} />
      {data.hold ? (
        <List>
          <HoldRow data={data} onOpen={onOpenHold} />
        </List>
      ) : null}
      <FridayGroup
        title={`Next payout · ${data.nextPayout.date}`}
        amount={formatMoney(data.available)}
        onOpen={() => onOpenPayout('next')}
      >
        <Text as="p" variant="muted">
          {payoutWhen(data)}
        </Text>
        {data.status === 'active' ? <PayoutTracker stage={data.nextPayout.stage} /> : null}
      </FridayGroup>
      {data.payouts.map((payout) => (
        <FridayGroup
          key={payout.id}
          title={`Payout · ${payout.date}`}
          amount={formatMoney(payout.amount)}
          onOpen={() => onOpenPayout(payout.id)}
        >
          <Breakdown payout={payout} />
        </FridayGroup>
      ))}
      <FridayGroup title={`${data.followingPayoutDate} · Pending`} amount={formatMoney(data.pending)}>
        <PendingRows data={data} />
      </FridayGroup>
    </>
  )
}

export function WalletHomeBody({
  data,
  header,
  lead = 'payout',
  onOpenHold,
  layout = 'phone',
  direction: directionProp,
}: {
  data: WalletHomeData
  header: ReactNode
  lead?: WalletLead
  onOpenHold: (event: MouseEvent<HTMLButtonElement>) => void
  /** Phone keeps the single column. Desktop uses a summary row and full-width tables. */
  layout?: 'phone' | 'desktop'
  /** Go-wide direction. Omitted means the current home. */
  direction?: string
}) {
  const direction = walletDirection(directionProp)
  const [focus, setFocus] = useState<string | null>(null)
  const rootClass =
    layout === 'desktop'
      ? 'wallet-home wallet-home--desktop'
      : direction === 'today'
        ? 'wallet-home wallet-home--pattern'
        : 'wallet-home wallet-home--pattern wallet-home--direction'

  if (data.status === 'not-set-up') {
    return (
      <div className={rootClass}>
        {layout === 'desktop' ? <DesktopPageHead data={data} /> : header}
        <WalletNotSetUp />
      </div>
    )
  }

  if (direction !== 'today') {
    const page =
      focus === 'hold' && data.hold ? (
        <HoldPage data={data.hold} onBack={() => setFocus(null)} />
      ) : focus ? (
        <FocusedPayout data={data} focus={focus} onBack={() => setFocus(null)} onOpenHold={onOpenHold} />
      ) : direction === 'hold' ? (
        <HoldHome data={data} onOpenHold={() => setFocus('hold')} />
      ) : direction === 'payout' ? (
        <PayoutHome data={data} onOpenHold={onOpenHold} onOpenPayout={setFocus} />
      ) : (
        <FridayHome data={data} onOpenHold={onOpenHold} onOpenPayout={setFocus} />
      )
    return (
      <div className={rootClass}>
        {layout === 'desktop' ? <DesktopPageHead data={data} /> : header}
        {focus ? null : <WalletStatusAlert data={data} />}
        {page}
      </div>
    )
  }

  const leadBlock =
    lead === 'balance' ? (
      <BalanceFirstCards data={data} onOpenHold={onOpenHold} />
    ) : (
      <NextPayoutHero data={data} onOpenHold={onOpenHold} />
    )

  const lists = (
    <>
      <PayoutSettingsRow data={data} />

      <section className="wallet-home__section" aria-labelledby="wallet-pending-title">
        <div className="wallet-home__section-head">
          <Text as="h2" variant="label" id="wallet-pending-title">
            Pending
          </Text>
          <Text as="span" variant="muted">
            {formatMoney(data.pending)}
          </Text>
        </div>
        <PendingRows data={data} />
      </section>

      <section className="wallet-home__section" aria-labelledby="wallet-payouts-title">
        <div className="wallet-home__section-head">
          <Text as="h2" variant="label" id="wallet-payouts-title">
            Past payouts
          </Text>
        </div>
        <List>
          {data.payouts.map((p, i) => (
            <PayoutRow key={p.id} payout={p} defaultOpen={i === 0} />
          ))}
        </List>
      </section>
    </>
  )

  if (layout === 'desktop') {
    return (
      <div className={rootClass}>
        <DesktopPageHead data={data} />
        <PayoutSettingsRow data={data} />
        <WalletStatusAlert data={data} />
        {lead === 'balance' ? (
          leadBlock
        ) : (
          <div className="wallet-home__desktop-stats">
            <NextPayoutHero data={data} onOpenHold={onOpenHold} split={false} />
            <MoneySplit data={data} onOpenHold={onOpenHold} />
          </div>
        )}
        <section className="wallet-home__section" aria-labelledby="wallet-pending-title">
          <div className="wallet-home__section-head">
            <Text as="h2" variant="label" id="wallet-pending-title">
              Pending
            </Text>
            <Text as="span" variant="muted">
              {formatMoney(data.pending)}
            </Text>
          </div>
          <div className="wallet-home__table-wrap">
            <table className="wallet-home__table">
              <thead>
                <tr>
                  <th scope="col">From</th>
                  <th scope="col">Type</th>
                  <th scope="col">Ready</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.pendingTransactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.client}</td>
                    <td>
                      {t.kind}
                      {t.service ? ` · ${t.service}` : ''}
                    </td>
                    <td>{t.readyOn}</td>
                    <td className="wallet-home__table-amount">{formatMoney(t.amount, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="wallet-home__section" aria-labelledby="wallet-payouts-title">
          <div className="wallet-home__section-head">
            <Text as="h2" variant="label" id="wallet-payouts-title">
              Past payouts
            </Text>
          </div>
          <List>
            {data.payouts.map((p, i) => (
              <PayoutRow key={p.id} payout={p} defaultOpen={i === 0} />
            ))}
          </List>
        </section>
      </div>
    )
  }

  return (
    <div className={rootClass}>
      {header}
      <WalletStatusAlert data={data} />
      {leadBlock}
      {lists}
    </div>
  )
}
