import { useState, type FormEvent } from 'react'
import { Button, Text, TextField } from '../../../context/design-system/ds'
import { PhoneShell } from '../../../src/design-harness/shared/PhoneShell'

/** Password only. The phone already knows Nora. A correct password does not open a home. */
export function LoginPage() {
  const [password, setPassword] = useState('')
  const [invalid, setInvalid] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    setInvalid(password.trim().length === 0)
  }

  return (
    <div className="design-harness-ds-page design-harness-ds-page--wide">
      <PhoneShell>
        <form className="phone-shell__screen login" onSubmit={onSubmit}>
          <div className="login__hello">
            <Text as="p" variant="muted">
              Good evening,
            </Text>
            <Text as="h1" variant="display" className="login__name">
              Nora Hale
            </Text>
          </div>
          <TextField
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            invalid={invalid}
            hint={invalid ? 'Enter your password.' : undefined}
            onChange={(event) => {
              setPassword(event.target.value)
              if (invalid) setInvalid(false)
            }}
            trailing={
              <button type="button" className="login__forgot">
                Forgot?
              </button>
            }
          />
          <Button intent="primary" size="lg" fullWidth type="submit">
            Log in
          </Button>
        </form>
      </PhoneShell>
    </div>
  )
}
