# Case study — Clients list redesign

Status: DRAFT — 2026-10-15 · Sources: brief.md, findings.md, decisions.md, about.md, log.md

This is an example project. Kickoff hasn't run and nothing here comes from research: every line about users is an assumption read from the prototype.

## 1. Opening

- **Framing:** A client list that shows a relationship manager who needs a call today.
- **Who:** Designer not named · PM not named · Status: example prototype built on desktop and phone, kickoff not run
- **Intro:** A bank's Clients list sorted into Premium, New and Dormant, with a tip that points at dormant clients and suggests a short check-in.

Source: brief.md (Status, Ownership, Case study summary, Intent)

## 2. Problem / why now

An alphabetical list tells a relationship manager who their clients are. It doesn't tell them who needs them today. Long-standing clients who have gone quiet and new clients still settling in sit in the same list as everyone else, so the people most worth a call are the hardest to spot.

This is assumed, not observed. No why-now signal is recorded.

Source: brief.md (Case study summary — Problem, Intent, Who it's for)

## 4. Options considered

**Row layout** — three layouts of the same rows, compared side by side:

| Option | What it is | Result |
|--------|------------|--------|
| One card with dividers | All clients in a single card, rows split by hairlines | **Chosen** — the main screen uses it |
| Flat list | Rows straight on the page, no card | Rejected |
| Card per client | Each client in its own card | Rejected |

Why the single card won isn't recorded.

**Framing** — the first version was a booking app's client list with VIP / New / Inactive segments. The designer asked to move it off the booking-app framing and toward banking. It became a bank relationship manager's client book: Premium / New / Dormant (no contact in 6 months or more), rows showing products held and last contact, and the project's own navigation (Home, Clients, Pipeline, Inbox).

**Phone actions** — separate Import and Add buttons on the phone were replaced by one floating assistant button. What the assistant does isn't designed.

Source: about.md (Layout options); brief.md (Scope); decisions.md 2026-10-10 (reframe); log.md 2026-10-10 (phone buttons)

## 5. The decision

**Direction built:** one Clients list, desktop and phone, sorted into Premium / New / Dormant with a count on each tab, rows in a single card, and a tip that sends the manager to dormant clients.

**Why:** to make dormant and new clients visible and easy to contact, so relationships don't go cold. This is the direction the prototype takes, not a validated decision — kickoff hasn't run.

Source: brief.md (Case study summary — Goal, Scope); decisions.md 2026-10-10

## 6. Live prototype

- `#/playground/clients-list-redesign/clients-list` — desktop list. Switch between Premium, New and Dormant; search for a client.
- `#/playground/clients-list-redesign/clients-list-mobile` — the same list on a phone. Scroll the segments sideways.
- `#/playground/clients-list-redesign/clients-list?initialSegment=dormant` — opens on Dormant, with the check-in tip.
- `#/playground/clients-list-redesign/clients-list?clients=none` — a manager with no clients assigned.
- `#/playground/clients-list-redesign/clients-list?initialQuery=Olivia` — a search with no results.
- `#/playground/clients-list-redesign/clients-list-layout-fork` — the three row layouts from chapter 4.

Source: screens/ (routes from projectFacts.ts); about.md

## 7. Outcome / expected change

Nothing has shipped and nothing has been measured.

- **Built:** desktop list, phone list, three states and the layout comparison. Audit passed on 2026-10-10 with 0 blocking issues.
- **Expected:** managers notice dormant and new clients and check in before those relationships go cold. The brief sets no success measure.
- **Still open:**
  - How should clients land in Premium — by balance, by products held, or set by the bank?
  - Is 6 months right for every client, or should it follow how often each one usually talks to the bank?
  - What does "a short check-in" open — a secure message, an email, or a call booking?
  - Does a new manager with 0 clients reach this screen, or are clients assigned first?
  - Which clients would find a check-in intrusive rather than helpful?

Source: findings.md 2026-10-09, 2026-10-10 (built, audit); brief.md (Goal, Open questions)

## 8. Sources

- **Project facts** — `#/playground/clients-list-redesign/facts`
- **How a manager uses it** — `#/playground/clients-list-redesign/doc/discovery/client-segments-flow`
- **Phone storyboard** — `#/playground/clients-list-redesign/storyboard/clients-list-mobile`
- **Ticket, Figma, research** — none; the brief lists no sources

Source: brief.md (Sources); about.md

## Skipped

- **Chapter 1, RACI** — the brief names no people.
- **Chapter 3, Evidence** — findings.md holds build and audit notes only: no quotes, numbers or research. The brief says nothing here is researched.
