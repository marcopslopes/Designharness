# COMPANY-ARCHETYPES.md (example pack — Northline)

**Prevents: Problem drift** — store flows built like generic flows, or built for the wrong store entirely. This is the lens an agent should check a screen against before calling it done.

**Confidence: EXAMPLE — Northline and these archetypes are invented for this harness. Replace with your own segmentation research; keep a two-dimension grid if it fits your product.**

---

## The grid

Two independent questions. Always answer both.

**How busy is the store?**

| State | What the stock looks like | Main worry |
|---|---|---|
| Quiet | Shelves fuller than the till | "Will we cover the rent this month?" |
| Steady | Most lines moving, a few slow | "Are our regulars still coming back?" |
| Fully booked | Back orders, turning jobs away | "How do we keep up without running out?" |

**How do they feel about tools?**

- **Hands-on** — tries new features, tweaks settings, likes seeing numbers.
- **Hands-off** — wants it to work and stay out of the way; changes nothing that isn't broken.

How busy the store is tells you *what problem* a store has. Comfort with tools tells you *how much of a solution* they'll accept. Never design from one question alone.

## The six archetypes

| | Hands-off | Hands-on |
|---|---|---|
| **Quiet** | **Word-of-mouth Starter** — new or rebuilding, relies on regulars, wary of paying for anything | **New Opening** — posting on social daily, wants a catalogue online yesterday |
| **Steady** | **Regulars Keeper** — same trade accounts for years, wants reminders to just run | **Shop Planner** — thinking about a second store, watches Margin weekly |
| **Fully booked** | **Stock Guardian** — wants fewer interruptions, not more; Holds and reorder points matter most | **Chain Builder** — passes overflow to other stores and needs shared stock that makes that easy |

## How to use this when building a screen

Before calling a flow done, an agent should be able to answer:

1. Which archetype(s) is this screen built for? (Name it — don't leave it implicit.)
2. What does that archetype's main worry say the screen should do?
3. Where's the gap between what the screen does and what that worry actually needs?

## Anti-pattern to flag

Most retail software assumes every store wants more visibility and more orders. True for Quiet — false for Fully booked. A Stock Guardian wants **fewer** interruptions and **more** control. A screen that pushes Featured or "get discovered" at them works against their need.

## Never do this

- Never design one flow and assume it works for "stores" as a single group — name the archetype.
- Never default to "more visibility / more orders" without checking it against the archetype's main worry.
- Never treat Hands-off and Hands-on stores with the same trade as the same user.
- Never use store count (Single / Small chain / Regional group) as a substitute for archetype — a Single store can be any of the six.
