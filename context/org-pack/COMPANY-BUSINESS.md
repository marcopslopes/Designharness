# Northline Business Context (example pack)

Business and product context for design agents and designers starting work on any Northline surface. Use alongside `COMPANY-VOICE.md` and `COMPANY-ARCHETYPES.md`.

**Prevents: Problem drift** — right UI, wrong problem. An agent that doesn't know who's using a screen or why will guess, and the guess defaults to generic SaaS.

**Confidence: EXAMPLE — Northline is a fictional company invented for this harness so a fresh clone has a worked example. Every fact, name and number below is made up. Replace them with your own company's, keeping the same shape (Prevents / Confidence / Never do this).**

---

## What Northline is

Northline is **the stock and ordering system for independent hardware stores** — nuts and bolts, paint, tools, plumbing parts. One product, two roles:

- **Northline Counter** — the store runs its day: stock levels, supplier orders, staff shifts, the till
- **Northline Trade** — trade customers check what's in stock and place orders for pickup

**Store-first:** Northline is not a consumer shop. Most orders come from trade customers a store already knows. When a store need and a customer convenience pull in different directions, Northline protects the store's stock accuracy and margins first, then smooths the customer side around that decision.

Primary brand colour: teal (`--color-surface-brand` / `--kit-brand`, `#007078`) — see `context/design-system/tokens.css`.

---

## The three pillars

Every feature should map to one of these. If it doesn't, ask why it exists before building it.

| Pillar | Promise | What it means |
|--------|---------|---------------|
| **Honest stock** | "What's on the shelf is what's on the screen." | Counts, deliveries and adjustments — the stock figure matches the aisle. |
| **Repeat trade** | "Your regulars, kept." | Standing orders, reorder reminders and restock alerts — keeping the trade customers a store already has, rather than finding new ones. |
| **Clear margin** | "Know what you made on it." | Cost prices, markups and simple profit views — no accounting degree required. |

Direction: Northline measures success in **repeat trade orders**, not new sign-ups.

---

## Store segments

| Segment | Notes |
|---------|-------|
| **Single store** | One shop, owner behind the counter. The owner is also the buyer and the bookkeeper. |
| **Small chain** | 2–10 stores under one owner. Shared catalogue, staff permissions, per-store stock. |
| **Regional group** | Two or more regions. Reporting and pricing have to work per store and across the group. |

Key departments: **fasteners, paint, tools, plumbing, electrical**. Each has different stock shapes — paint is sold by the litre and tinted to order; fasteners are counted by the box.

For the full archetype model (how busy the store is × comfort with tools), see `COMPANY-ARCHETYPES.md`.

---

## How a store succeeds on Northline

Stores bring their own trade customers. Northline's job in the first weeks is to get those customers ordering in the app instead of phoning the counter. **Activation** (in this example) is **3 online orders within 21 days** of sign-up.

Two ways stores leave, two different problems:
- **Setup stall (first month):** the stock count is never finished, so Northline never replaces the paper stock book.
- **Quiet drift (later):** reorder reminders get switched off, regulars go back to phoning, and Northline starts to feel like a spreadsheet the store could get anywhere.

---

## Deposits — why they matter more than they look

A deposit is not just a payment feature — it's the moment a special order becomes a commitment. It's where **Northline Holds** (the policy for items ordered in specially) gets its teeth, and where the customer's card is saved for a faster checkout later.

---

## Key product areas

| Area | Purpose |
|------|---------|
| Stock | Where a store's inventory lives — counts, deliveries, adjustments |
| Northline Holds | Deposits on special orders |
| Pay and payouts | Taking payment and getting money to the store's bank |
| Reorder | Prompts to restock before an item runs out |
| Bulletins | Messages to a group of trade customers (a delivery arriving, a new line) |
| Featured | Optional paid placement for suppliers who want their line seen |
| Shelf cards | Printable labels and signs for the shop floor |
| Referral program | Store-to-store referrals |
| Margin | Simple views of what came in and what it cost |

---

## Design system

| Resource | Where | Notes |
|----------|-------|-------|
| Northline design kit (Figma) | *(replace with your Figma file key)* | Components, tokens, patterns |
| Foundations (Figma) | *(replace with your Figma file key)* | Colour, spacing, radius, typography |
| Design system lead | *(replace with your name)* | — |

---

## Content design

The content team owns voice, terminology and UX copy standards. If no content designer is assigned to your project, use `COMPANY-VOICE.md`.

---

## Localization

If your product operates in several markets, note localization implications directly in copy decisions — some product names and verbs don't survive translation (see `harness/skills/content/references/localization.md`).

---

## Key teams and channels

| Team / Channel | Notes |
|----------------|-------|
| Product Design | Store-side design |
| Product Content | Voice, copy, content guidelines |
| Design System | Tokens, components |

*(Replace with your real Slack channels / team names.)*

---

## What to open before starting any design project

1. **`COMPANY-VOICE.md`** — voice, tone, writing rules
2. **`COMPANY-ARCHETYPES.md`** — which store are you designing for
3. **`COMPANY-SOURCES.md`** — global external sources; open linked sources when the task matches
4. **`context/design-system/`** — components and tokens

---

## What Northline is not

- Not a consumer shop — Featured exists, but most stores never need it.
- Not a warehouse system — stock serves the counter, not a distribution centre.
- Not built for every store the same way — a Fully Booked store needs the opposite of what a New Opening needs.

## Competitive framing *(example — replace with your own, marked inferred vs. sourced)*

In this example, Northline differentiates on keeping regular trade customers (reorders, reminders, Holds) rather than on bringing in new ones. Flag any inferred competitive claim to product/strategy before an agent treats it as fact.

---

## Never do this

- Never design a feature without naming which of the three pillars it serves.
- Never assume one experience fits all stores — check archetype fit (`COMPANY-ARCHETYPES.md`) before finalising a flow.
- Never pitch "get more new customers" as the default value — Northline's default is keeping the ones a store has.
- Never resolve a store/customer tension in the customer's favour without saying so explicitly in the rationale.
- Never invent competitive positioning claims not in this file — mark as inferred and flag instead.
