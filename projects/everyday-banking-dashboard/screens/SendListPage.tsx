import { useState } from 'react'
import { IconPlus, IconUser } from '@tabler/icons-react'
import {
  EmptyState,
  Icon,
  NavBarHeader,
  SettingsRow,
  Sheet,
  SheetBody,
  SheetHeader,
  TextField,
  usePresence,
} from '../../../context/design-system/ds'
import { PhoneShell } from '../../../src/design-harness/shared/PhoneShell'

const HOME_HASH = '#/playground/everyday-banking-dashboard/banking-home'

type Payee = {
  id: string
  name: string
  account: string
}

const STARTER: Payee[] = [
  { id: 'maya', name: 'Maya Chen', account: 'Current ···· 2291' },
  { id: 'samuel', name: 'Samuel Okonkwo', account: 'Current ···· 8840' },
  { id: 'priya', name: 'Priya Natarajan', account: 'Savings ···· 1104' },
  { id: 'alex', name: 'Alexandra Pemberton-Clarke', account: 'Current ···· 7763' },
  { id: 'jonah', name: 'Jonah Ellis', account: 'Current ···· 0922' },
]

function goHome() {
  window.location.hash = HOME_HASH
}

function AddPayeeSheet({
  open,
  motion,
  onClose,
  onAdd,
}: {
  open: boolean
  motion: boolean
  onClose: (detail: number) => void
  onAdd: (payee: Payee) => void
}) {
  const presence = usePresence(open, motion)
  const [name, setName] = useState('')
  const [account, setAccount] = useState('')
  if (!presence.mounted) return null
  const ready = name.trim().length > 0 && account.trim().length > 0

  function close(detail: number) {
    setName('')
    setAccount('')
    onClose(detail)
  }

  return (
    <div
      className="ds-pattern__overlay"
      data-state={presence.state}
      data-motion={motion ? undefined : 'off'}
      onAnimationEnd={presence.onAnimationEnd}
    >
      <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={(event) => close(event.detail)} />
      <Sheet variant="form">
        <SheetHeader
          title="Add a recipient"
          onCancel={() => close(0)}
          doneProps={{ disabled: !ready }}
          onDone={() => {
            if (!ready) return
            onAdd({ id: `new-${Date.now()}`, name: name.trim(), account: account.trim() })
            close(0)
          }}
        />
        <SheetBody>
          <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} />
          <TextField
            label="Account"
            hint="For example, Current ···· 2291"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
          />
        </SheetBody>
      </Sheet>
    </div>
  )
}

/** Saved payees for Send. Search, add, then a flat list. No amount screen. */
export function SendListPage() {
  const [payees, setPayees] = useState(STARTER)
  const [query, setQuery] = useState('')
  const [adding, setAdding] = useState(false)
  const [motion, setMotion] = useState(true)
  const needle = query.trim().toLowerCase()
  const shown = needle ? payees.filter((payee) => payee.name.toLowerCase().includes(needle)) : payees

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <PhoneShell
        overlays={
          <AddPayeeSheet
            open={adding}
            motion={motion}
            onClose={(detail) => {
              setMotion(detail !== 0)
              setAdding(false)
            }}
            onAdd={(payee) => setPayees((current) => [payee, ...current])}
          />
        }
      >
        <div className="ds-pattern">
          <div className="ds-pattern__body">
            <NavBarHeader title="Send" onBack={goHome} backLabel="Home" />
            <div className="send-list">
              <TextField
                label="Search"
                placeholder="Name"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <SettingsRow
                title="Add a recipient"
                icon={<Icon icon={IconPlus} size="md" />}
                tint="brand"
                onClick={(event) => {
                  setMotion(event.detail !== 0)
                  setAdding(true)
                }}
              />
              {shown.length === 0 ? (
                <EmptyState
                  title="No saved payee"
                  description="Try another name, or add a recipient."
                  icon={<Icon icon={IconUser} size="lg" />}
                />
              ) : (
                <ul className="send-list__people" aria-label="Saved payees">
                  {shown.map((payee) => (
                    <li key={payee.id}>
                      <SettingsRow
                        title={payee.name}
                        description={payee.account}
                        icon={<Icon icon={IconUser} size="md" />}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </PhoneShell>
    </div>
  )
}
