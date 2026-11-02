# Each screen skips a step

*Draft — needs your edit pass before publishing.*

I wanted a banking home that answers two questions before it does anything else. How much do I have. What just happened.

Send, on that home, opens a list of people I have already paid. The login in front of both asks only for a password, because the phone already knows who is holding it.

## The two questions

Everyday customers open a banking app for those two questions. The brief says a lot of bank homes bury the answer under promos, product tiles, and settings. Lloyds is the example on file: the home is mostly product tiles and promos, and the balance is not in view.

This concept puts the balance first, then the last five transactions, grouped into Today and Yesterday. One figure, labelled Available, on a current account. The names and the amounts are made up. There is no real customer data.

Sending was not in that first brief. Transfers were out. On 1 November 2026 I added the list behind Send, and left the amount, the review, and the confirmation of a payment out.

The login came the same day. A returning customer gets asked who they are again, on a phone that already knows. I started it as its own project, then moved it here, because it is the same app.

## Evidence

There isn't any research yet.

`findings.md` is a build log. It records that the home, the send list, and the login were built and clicked through in a browser. It has no interviews, no quotes, and no counts. The comparisons that follow come from the decisions and from Mobbin screens saved in `sources.md`, not from a study.

## What I set aside

I had three jobs for the home. I kept the glance: how much, and what just happened. I parked a look-ahead home, the kind that leads with the next payday and the bills. I parked a coaching home, the kind that leads with budgets and nudges.

I had two layouts. I kept one balance, then Add money, Send, and Card, then those five transactions. I parked swipeable cards for a current account and a savings account. Where savings live is still open.

Send had three audiences. I kept people I have already sent money to, so the next payment is a pick. I parked everyone in the phone contacts, including someone I have never paid. I parked a list of only the people already on this bank.

The list itself had two shapes. I kept search, an Add a recipient row, and a flat list with the account on each row. I parked a list that puts the last three people first, then everyone else A–Z, with no search. That one put a repeat payment in reach without typing. This one asks me to search.

The login had three ways in. I kept the password, as N26 does for a person it already knows. I parked a PIN or a face, the way bunq does it. I parked starting with an email or a phone number, as Chime and Revolut do.

Then the name. I kept a greeting with the name, so you can see whose account it is before you type. I parked a screen with no name. That one hides the name when someone else is holding the phone, and I gave that up.

## What I locked

The home leads with one balance and the last five transactions. Send opens a searchable list of people I have already paid. The account is on the row, so I can tell a current account from a savings account without opening a payment.

Tapping a person does not open an amount screen. That was part of the pick, not a missing link I forgot.

The login says good evening, then the name, then a password field, Forgot, and Log in. A correct password does not open the home yet. Sign-up and a first login on a new phone are out.

## What you can open

The home is the banking home screen in this project. The balance is first. Tap a transaction and a sheet shows the merchant, the amount, the account, and the day. See all is on the screen and does not open a list.

Send on that home opens the send list. Search a name. "alex" keeps Alexandra Pemberton-Clarke. A name with no match says there is no saved payee. Add a recipient asks for a name and an account, and Done stays off until both are filled. A new person lands at the top. Home on that screen comes back.

The login is one screen, with no tab bar. The name on it is Nora Hale, and I made it up. Leave the password empty and Log in asks you to enter one. Type a password and Log in stays on the screen. Forgot does nothing yet.

Each screen has a storyboard next to it if you want the reason for each step.

## What's left

Nothing has shipped, and nothing has been measured.

The brief's guess at success is this: in a quick test, a person can say their available balance and their last transaction within 5 seconds of opening the home. Those 5 seconds are a guess written into the brief. They are not a result. The login has no guess at success yet.

See all has no activity list. Savings and other accounts are not on this home. A payment still has no amount, no review, and no confirmation. A new phone, a first login, and Forgot password are still open.

---

**Sources used:** `projects/everyday-banking-dashboard/case-study.md`, `brief.md`, `decisions.md` (2026-11-01), `findings.md` (2026-11-01), `sources.md` (Lloyds home; N26, bunq, Chime, Revolut logins).
**Anti-slop pass:** run against `harness/skills/writing/references/slop-patterns.md` and `harness/references/anti-ai-writing.md`.
**Still needs:** Written from your voice file's content patterns (two-sided calls, the open friction named plainly) in plain English, not from written samples. Rewrite at least the opening in your own words before anyone else reads it. No journal entries were available.
