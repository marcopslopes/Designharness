# The phone already knows who you are

*Draft — needs your edit pass before publishing.*

This login greets the customer and asks for a password. It does not ask for an email or a username.

The name on the screen is Nora Hale. I made it up.

## Asked again

A returning customer opens a banking app and gets asked who they are. On a phone they have used before, that question is already answered. The brief treats the stored identity as an assumption, not as something we checked.

I looked at N26, which greets a known person and asks only for a password. I set aside bunq, which asks for a PIN or a face. I set aside Chime and Revolut, which ask for an email or a phone number before the secret.

It sits in the same app as the everyday banking home and the send list. Onboarding stays out: sign-up, a first login on a new phone, and Forgot password.

## Evidence

There isn't any research yet.

`findings.md` records that the screen was built and clicked through in a browser. It has no interviews, no quotes, and no counts.

## What I set aside

I kept the password. I parked the PIN or face. I parked starting with an email or a phone number.

I kept the name on the screen, so you can see whose account it is before you type. I parked a screen with no name. That one hides the name when someone else is holding the phone.

## What I locked

The screen says good evening, then Nora Hale, then a password field. Forgot sits on the field. Log in is under it.

A correct password does not open a home. That home is out of scope. Sign-up is out. A first login on a new phone is out.

## What you can open

The [login](http://127.0.0.1:3002/#/playground/everyday-banking-dashboard/login) is one screen, with no tab bar. Leave the password empty and Log in asks you to enter one. Type a password and Log in stays here. Forgot stays here too.

The storyboard next to the screen says why the name is shown.

## What's left

Nothing has shipped, and nothing has been measured.

The brief's guess is that a returning customer can submit a password and leave this screen without being asked for an email or a username. That is a guess. The prototype does not leave the screen, because the next screen is not part of this project.

A new phone, or a first login, is still open. So is Forgot password.

---

**Sources used:** `artifacts/login-case-study-draft.md`, `brief.md`, `decisions.md` (2026-11-01), `findings.md` (2026-11-01), `sources.md` (N26, bunq, Chime, Revolut).
**Anti-slop pass:** run against `harness/skills/writing/references/slop-patterns.md` and `harness/references/anti-ai-writing.md`.
**Still needs:** No writing-voice file, so this is the plain default voice, not yours. Rewrite at least the opening in your own words before anyone else reads it.
