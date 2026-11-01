import type { Storyboard } from '../../../src/design-harness/storyboard'

const DECISION =
  'Designer decision 2026-11-01: the phone already knows the customer. The screen greets them by name and asks only for a password.'

export const storyboard: Storyboard = {
  title: 'Login · phone',
  subtitle: 'Password only',
  screen: 'screens/LoginPage.tsx',
  steps: [
    {
      id: 'name',
      chapter: 'Who',
      title: 'The name is already here',
      why: 'This phone has been used before, so the screen does not ask for an email or a username. The greeting is how you see you are on the right account.',
      evidence: DECISION,
      notes: `The other layout left the name off, so someone else holding the phone would not see whose it is. That one is parked.

- A new phone, or a first login, is still open
- Forgot password has no screen yet`,
      targets: [{ selector: '.login__name' }],
    },
    {
      id: 'password',
      chapter: 'The secret',
      title: 'One field',
      why: 'The only thing left to type is the password. Forgot sits on that field. Log in stays on this screen, because the home after a correct password is out of scope.',
      evidence: DECISION,
      try: 'leave it empty and tap Log in',
      targets: [{ selector: '.ds-field' }],
    },
  ],
}
