# Case study — Banking login

Status: DRAFT — 2026-11-01 · Sources: brief.md, findings.md, decisions.md

## 1. Opening

- **Framing:** The phone already knows who is opening the app. The login should ask for a password.
- **Who:** Marco Paulo Lopes (Design). No PM. No squad. Status: draft.
- **Intro:** A login screen for a returning customer on a phone they have used before.
- **RACI:** Merged with Who. The brief names the designer and nobody else.

Source: brief.md (Ownership, Case study summary, Intent)

## 2. Problem / why now

A returning customer opens the banking app and gets asked who they are again. This phone already has that. The screen should ask only for a password.

This is its own project. The everyday banking home and send list do not include login, and that brief left onboarding out.

Source: brief.md (Why, Scope)

## 4. Options considered

**What the screen asks for.** A password, because the phone already knows the customer. Not a PIN or a face, the way you unlock the phone. Not an email or a phone number first, with the secret on a later step.

**Whether the name is on the screen.** A greeting with the name, so you can see whose account it is. Not a screen with no name. That one keeps the name off when someone else is holding the phone.

Source: decisions.md 2026-11-01; brief.md (parked)

## 5. The decision

**The decision.** The screen says good evening, then the customer's name, then a password field, Forgot, and Log in.

**Why.** The phone already knows who they are, and the name shows they are on the right account. A correct password does not open the home. Sign-up and a first login on a new phone stay out.

Source: decisions.md 2026-11-01; brief.md (Scope)

## 6. Live prototype

![Login](../screens/LoginPage.tsx)

The name is Nora Hale, and it is made up. Leave the password empty and Log in asks you to enter one. Type a password and Log in stays on this screen. Forgot does nothing yet.

- [Login storyboard](../screens/Login.storyboard.ts): why the name is on the screen, and why Log in does not leave it.

Source: findings.md 2026-11-01; screens/LoginPage.tsx

## 7. Outcome / expected change

Nothing has shipped, and nothing has been measured.

Expected: a returning customer can submit a password and leave this screen without being asked for an email or a username. The brief calls that a guess, not a result. The prototype does not leave the screen yet, because the home after a correct password is out of scope.

Still open: what a new phone, or a first login, asks for. What Forgot password does.

Source: brief.md (How we'd know, unknowns, Scope)

## 8. Sources

- [Project brief](../brief.md)
- [Mobbin references](../sources.md) — N26 for the password-only screen. bunq, Chime, and Revolut were the parked directions. No ticket.
- [Login](../screens/LoginPage.tsx)

Source: brief.md (Sources); sources.md

## Skipped

- Chapter 3, Evidence — findings.md has a build note only. No quotes, numbers, or tables.
- Journal — no entries for this project.
