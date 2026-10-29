import { useState } from 'react'
import { DesktopShell } from '../../../../src/design-harness/shared/DesktopShell'
import { walletTabs } from '../wallet-app-nav'
import { walletDataFor, WALLET_HOME_DATA, type WalletHomeData, type WalletLead } from '../wallet-home-data'
import { WalletHoldSheet, WalletHomeBody } from '../wallet-home-shared'

/**
 * Wallet home — desktop. Same banking nav as the phone, in the browser frame.
 * Figures sit in a row across the top. Pending payments are a table. Past payouts run full width.
 */
export type WalletHomeDesktopPageProps = {
  data?: WalletHomeData
  status?: string
  lead?: WalletLead | string
  initialHoldOpen?: boolean
}

export function WalletHomeDesktopPage({
  data: baseData = WALLET_HOME_DATA,
  status,
  lead,
  initialHoldOpen = false,
}: WalletHomeDesktopPageProps = {}) {
  const data = walletDataFor(status, baseData)
  const [holdOpen, setHoldOpen] = useState(initialHoldOpen)
  const [holdMotion, setHoldMotion] = useState(true)
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <DesktopShell tabs={walletTabs('wallet', 'md')} url="app/wallet">
        <WalletHomeBody
          layout="desktop"
          data={data}
          lead={lead === 'balance' ? 'balance' : 'payout'}
          onOpenHold={(event) => {
            setHoldMotion(event.detail !== 0)
            setHoldOpen(true)
          }}
          header={null}
        />
        {data.hold ? (
          <WalletHoldSheet
            data={data.hold}
            open={holdOpen}
            motion={holdMotion}
            onClose={(event) => {
              setHoldMotion(event.detail !== 0)
              setHoldOpen(false)
            }}
          />
        ) : null}
      </DesktopShell>
    </div>
  )
}
