# Squad list — designer onboarding (picker index)

**Deferred/opt-in only — except silent resolve.** This `AskQuestion`
picker no longer runs at onboarding by default (see `SKILL.md` §
Deferred and opt-in fields), but squad assignment itself can still end up
filled in without it: `product`/`mix` designers with a clean name match
in `COMPANY-SQUADS.md`'s directory get `Squad assignment:` set
silently at Step 1c, no picker shown at all — see `SKILL.md` § Silent
squad resolve. This picker index applies verbatim whenever the
`AskQuestion` flow itself does run: a designer opting into full setup
upfront, or a downstream skill filling the field in later because it hit
a genuine ambiguity it couldn't infer around.

**UI scripts (use these):** `references/onboarding-questions.md` — exact
domain → squad `AskQuestion` flow. **Always domain first.**

**Full org map:** `COMPANY-SQUADS.md` (canonical — synced from your org's
team directory; see that file, org-pack, for the real source link).

---

## Step 2a — Domain (if list is too long for one question)

Build both steps from the resolved `COMPANY-SQUADS.md`. The labels below
are the Northline example pack; a local pack replaces them.

| Option | Includes |
|---|---|
| Store Growth | Onboarding, Launch, Plans |
| Core Product | Stock, Suppliers, Counter + streams |
| Finance | Payments, Wallet |
| Trade customers | Ordering |
| Cross-cutting | Content, Design system, Research |

`allow_multiple: true` for **content** designers.

---

## Step 2b — Squad labels (by domain)

### Store Growth

| Label | Parent domain |
|---|---|
| Onboarding | Store Growth |
| Launch | Store Growth |
| Plans | Store Growth |

### Core Product

| Label | Parent domain | Notes |
|---|---|---|
| Stock | Core Product | Inventory, reorder points |
| Suppliers | Core Product | Supplier orders, deliveries |
| Counter | Core Product | Till, checkout, loyalty |
| Reports | Core Product → Suppliers | Stream; maps to Suppliers |
| Navigation | Core Product → Counter | Cross-cutting IA stream |
| Referrals | Core Product → Counter | Stream; maps to Counter |

### Finance

| Label |
|---|
| Payments |
| Wallet |

### Trade customers

| Label |
|---|
| Ordering |

### Cross-cutting

| Label |
|---|
| Content design (central) |
| Design system |
| Research / Enablement |
| Other / mix |

Always include **Other / mix** on the squad step.

Store **Label** exactly as picked. If a stream label was chosen, also note
parent squad in profile — see `COMPANY-SQUADS.md` § streams.

---

## Roadmap keys (research routing only)

Do not show these in onboarding UI. See `COMPANY-SQUADS.md` § Squad → roadmap boards.
