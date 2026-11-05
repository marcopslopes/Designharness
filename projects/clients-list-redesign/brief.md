# Brief — Clients list redesign

<!--
Truth block. status is draft: a prototype exists and kickoff was never
approved. The old bullet said EXAMPLE, which maps to draft.
-->

```yaml
status: draft
example: true
system: desktop, mobile
assumptions:
  - text: "Three segments — Premium, New and Dormant — are enough to act on."
    source: brief.md
  - text: "Dormant means no contact in 6 months or more."
    source: brief.md
  - text: "A short check-in is the right first step with a dormant client."
    source: brief.md
  - text: "A manager opens this list often enough to notice the tip."
    source: brief.md
unknowns:
  - "Success metric — the brief names none"
  - "Who requested this, and who the designer is"
  - "How clients land in Premium — balance, products held, or set by the bank"
  - "Whether 6 months is right for every client"
  - "What a short check-in opens"
  - "Whether a manager with no clients reaches this screen"
  - "Which clients would find a check-in intrusive"
evidence:
  - text: "None. Kickoff was not run. The brief says every line is an assumption read off the prototype."
    source: brief.md
parked:
  - "Flat list layout — single card won"
  - "Card per row — single card won"
```

- **Feature/surface:** A bank relationship manager's Clients list, segmented into Premium / New / Dormant
- **Platform:** Desktop web and phone
- **Stage:** existing design — example prototype
- **Sources:** none — no Figma, ticket or research behind this; every line below is an assumption read from the prototype
- **Requested by:**
- **Date opened:** not recorded (brief filled 2026-10-10)

## Ownership (structured — feeds the Team Gallery, `#/gallery`)

- **Designer:** UNKNOWN — flagged, see note below
- **Squad:**
- **Gallery:** hidden

*Designer is UNKNOWN:* this is an example project; no folder file names an owner.

## Case study summary (feeds the Team Gallery — keep this short and clean)

- **Problem:** A flat client list doesn't show relationship managers which clients need them — long-standing clients going quiet and new clients still settling in.
- **Goal:** Make dormant and new clients visible and easy to contact, so relationships don't go cold.

## Intent

Assumed, not stated by a requester. A Clients list that does more than list names: it sorts a manager's clients into Premium, New and Dormant so they can see who joined this week and who they haven't spoken to in months, and nudges them to check in with the ones drifting away.

![Clients list](screens/desktop/ClientsListPrototypePage.tsx)

## Who it's for

Assumed. Relationship managers with a book too large to keep in their head, who need to keep the clients they have. Less useful for managers with a few high-touch clients they already speak to weekly — for them it's a search box.

## Scope

In (built):

- One Clients list with search and Premium / New / Dormant segment tabs, each with a count
- Each row shows the products a client holds and when the manager last contacted them
- A tip pointing at dormant clients, suggesting a short check-in
- States: Dormant segment preselected, no clients assigned yet, no search matches
- A layout comparison (single card / flat list / card per row) — single card won
- Phone version in the app's Clients tab, with a floating assistant button (what it does isn't designed)

Out (not designed):

- The client detail page, and what "a short check-in" actually opens
- How clients get into each segment (bank rules or manager tagging)
- Import flow, bulk actions, sorting, client assignment

## Constraints

- Product UI from `context/design-system/ds` and tokens only; light mode only.
- Desktop sits in the shared `DesktopShell`, phone in `PhoneShell`; both use this project's own nav (`screens/bank-app-nav.tsx`) — Home, Clients, Pipeline, Inbox.
- Desktop and phone share one data file (`screens/clients-list-shared.ts`) so segments and counts stay in sync.
