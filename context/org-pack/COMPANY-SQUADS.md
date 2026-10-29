# Northline squads — org map for agents & onboarding (example pack)

Canonical squad names, domains, and routing hints for `designer-onboarding`,
`research-agent`, and `design-kickoff`.

**Confidence: EXAMPLE — fictional company pack. Replace every table below with your own org chart; keep the shape (domains → squads → named designer) so onboarding's silent squad-resolve still works.**

---

## Product domains (top level)

| Domain | Product leader | Design? |
|---|---|---|
| **Store Growth** | *(replace)* | Yes — growth/onboarding/launch |
| **Core Product** | *(replace)* | Yes — core store product |
| **Trade customers** | *(replace)* | Yes — customer-side ordering |
| **Finance** | *(replace)* | Mixed — payments and margin |

---

## Design leadership (manager-role onboarding pre-fill)

| Manager | Domains led | Reports (named product designers) |
|---|---|---|
| *(replace with your design lead)* | *(replace)* | *(list named designers per domain — a squad with no named designer is correctly left blank, not guessed)* |

---

## Squads — official

### Domain: Store Growth

| Squad | Product designer | Notes |
|---|---|---|
| **Onboarding** | *(name)* | New-store setup, activation |
| **Launch** | *(name)* | Go-live, catalogue setup |
| **Plans** | — | Pricing and plan flows |

### Domain: Core Product

| Squad | Product designer | Notes |
|---|---|---|
| **Stock** | *(name)* | Inventory, reorder points |
| **Suppliers** | *(name)* | Supplier orders, deliveries |
| **Counter** | *(name)* | Till, checkout, loyalty |

### Domain: Finance

| Squad | Product designer | Notes |
|---|---|---|
| **Payments** | — | Card readers, tap to pay, payment notifications |
| **Wallet** | *(name)* | Northline Wallet: balance, payouts, transactions |

### Domain: Trade customers

| Squad | Product designer | Notes |
|---|---|---|
| **Ordering** | *(name)* | Trade customer ordering and accounts |

---

## Streams (not always their own squad)

| Stand-up label | Maps to official squad | Typical work |
|---|---|---|
| **Reports** | Suppliers | Sales reports, buying history |
| **Navigation** | Counter (cross-cutting) | IA, store profile, settings |
| **Referrals** | Counter | Store referral program |
| **Checkout** | Counter + Finance | Joint with Finance |

---

## Cross-cutting (not a product squad)

| Label | Who uses it |
|---|---|
| Content design (central) | Content team |
| Design system | Platform team |
| Research / Enablement | Research team |

---

## Squad → roadmap boards (research default)

Which roadmap boards (`COMPANY-SOURCES.md` § Roadmap boards) and tracker
containers (Jira projects, Linear teams, or GitHub repos) to search first for
each squad. Skip this section if your company has no roadmap tool.

| If profile includes… | Search first | Widen to |
|---|---|---|
| Onboarding, Launch, Plans | `CORE`, `GROW` | All roadmap boards |
| Stock, Suppliers, Counter, Navigation | `CORE` | `GROW`, `PAY` if topic spans |
| Payments, Wallet | `PAY` | `UXR` + `DES` for designer tickets |
| Ordering | `CON` | — |

---

## Onboarding → `AskQuestion` options

Offer all official squads plus common streams, grouped by domain if the list is long. Full picker list convention: `harness/designer-onboarding/references/squads.md`.

---

## Refresh protocol

1. Open your org's team directory — check version date.
2. Update tables above; bump a "Last synced" date at the top of this file.
3. Mirror onboarding labels in `harness/designer-onboarding/references/squads.md`.
