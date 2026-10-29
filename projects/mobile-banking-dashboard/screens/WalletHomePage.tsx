import { useState } from 'react'
import { IconBell, IconQrcode, IconSearch } from '@tabler/icons-react'
import { HeaderIconButton, LargeTitleHeader, TabBar } from '../../../context/design-system/ds'
import { PhoneShell } from '../../../src/design-harness/shared/PhoneShell'
import { walletTabBarItems } from './wallet-app-nav'
import { walletDataFor, WALLET_HOME_DATA, type WalletHomeData, type WalletLead } from './wallet-home-data'
import { WalletHoldSheet, WalletHomeBody } from './wallet-home-shared'

/**
 * Wallet home — iOS. The Wallet tab of a banking app. The hold reason opens as a sheet over the wallet.
 * `status` and `lead` are strings so presentations can set them from the URL.
 */
export type WalletHomePageProps = {
  data?: WalletHomeData
  status?: string
  lead?: WalletLead | string
  initialHoldOpen?: boolean
}

export function WalletHomePage({
  data: baseData = WALLET_HOME_DATA,
  status,
  lead,
  initialHoldOpen = false,
}: WalletHomePageProps = {}) {
  const data = walletDataFor(status, baseData)
  const [holdOpen, setHoldOpen] = useState(initialHoldOpen)
  const [holdMotion, setHoldMotion] = useState(true)
  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <PhoneShell
        overlays={
          data.hold ? (
            <WalletHoldSheet
              data={data.hold}
              open={holdOpen}
              motion={holdMotion}
              onClose={(event) => {
                setHoldMotion(event.detail !== 0)
                setHoldOpen(false)
              }}
            />
          ) : null
        }
      >
        <div className="ds-pattern">
          <div className="ds-pattern__body">
            <LargeTitleHeader
              title="Wallet"
              actions={
                <>
                  <HeaderIconButton icon={IconSearch} label="Search" />
                  <HeaderIconButton icon={IconQrcode} label="Scan" />
                  <HeaderIconButton icon={IconBell} label="Notifications" badge />
                </>
              }
            />
            <WalletHomeBody
              data={data}
              lead={lead === 'balance' ? 'balance' : 'payout'}
              onOpenHold={(event) => {
                setHoldMotion(event.detail !== 0)
                setHoldOpen(true)
              }}
              header={null}
            />
          </div>
          <div className="ds-pattern__bar">
            <TabBar value="wallet" onChange={() => {}} items={walletTabBarItems()} label="Wallet" />
          </div>
        </div>
      </PhoneShell>
    </div>
  )
}
