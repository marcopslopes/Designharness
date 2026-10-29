# Northline UX Patterns (example pack)

Interaction conventions extracted from the Design Harness playground prototypes plus documented pain points. Use when building any store screen to avoid interaction drift — right components, wrong behaviour.

**Prevents: Interaction drift** — a screen built with correct visual tokens but wrong flow, wrong feedback timing, or wrong navigation convention.

**Confidence: EXAMPLE — fictional company pack. Replace "Extracted from" citations with your own prototype/codebase references once you swap this file for your product's patterns.**

---

## The two user types

The store app (Northline Counter) and the customer app (Northline Trade) are different mental models. Never design a store flow by reskinning a consumer pattern, or vice versa.

**Store staff:** task-oriented, often mid-sale or between customers, low tolerance for friction — optimize for glanceable, interruptible flows.

**Trade customer:** checks stock, orders or pays at their regular store — wants it done in a few taps.

---

## Modal and sheet patterns

**Always on a dialog:**
```tsx
role="dialog"
aria-modal="true"
aria-labelledby={titleId}
```

**Dismissal button rules:**
- **Modal overlay (can close without consequence):** × icon, `aria-label="Close dialog"`, top-right
- **Push navigation (going back in a flow):** left chevron `‹`, `aria-label="Back"`, top-left
- Never use a back chevron on a dismissible modal — that implies a multi-step flow
- Never use × on a push screen — that implies the whole surface closes

**Sheet variant (bottom sheet):** drag handle `aria-hidden` at top; hero content in the upper section; body content (steps, inputs, CTAs) below; numbered `<ol>` for sequential steps.

---

## Copy-to-clipboard feedback pattern

Three states, always: `'idle' | 'ok' | 'err'`

```tsx
const [copyStatus, setCopyStatus] = useState<'idle' | 'ok' | 'err'>('idle')
setCopyStatus(ok ? 'ok' : 'err')
window.setTimeout(() => setCopyStatus('idle'), 2000)
```

`role="status"` (not `role="alert"`) — rendered conditionally so screen readers only hear it when it appears. Short, period-terminated copy: "Copied to clipboard." / "Could not copy — try again." Never emoji.

---

## Button hierarchy in CTAs

| Position | Variant | Use |
|----------|---------|-----|
| Primary action | `primary` | The single most important action |
| Alternative channel | `secondary` | Second option |
| Tertiary / destructive | `ghost` | Low-emphasis or reversible action |

**Button gap in a CTA stack:** `--spacing-03` (8px). **Full-width CTAs:** stretch via `className`, not a `block` prop.

---

## Stack gap conventions

| Context | Gap | Value |
|---------|-----|-------|
| Default page/section layout | `--spacing-05` | 16px |
| Modal / sheet content groups | `--spacing-04` | 12px |
| CTA button stacks | `--spacing-03` | 8px |
| Icon + text inline | `--spacing-02` | 4px |

---

## Responsive device frames

Every prototype provides both a mobile and desktop view. Mobile frame: fixed `375×812px` container, scroll inside the frame. Desktop: split layout or wider canvas.

---

## Navigation conventions

Back: left chevron `‹`. Forward: right chevron `›`. Close: × icon. Tab bar: icon + label, `aria-current="page"` on the active tab. All SVG icons: `aria-hidden focusable="false"` always.

---

## Known anti-patterns (invented examples — replace with your own research)

1. **The surprise charge** — a deposit or restocking fee the customer only learns about after ordering.
2. **Settings as storage** — a feature that only works once the store finds and switches on a buried setting, with no prompt where the need arises.
3. **Two roads, one hidden cost** — a quick path and a proper path that look equally valid, where the quick one silently skips something the store needs later (a saved card, a stock note).
4. **Locked with no reason** — a greyed-out feature with no explanation of why or what unlocks it.

---

## Open gaps — flag, don't invent

- Navigation IA conventions
- Form validation timing
- Loading states (skeleton vs spinner vs shimmer)
- Drawer vs modal decision rule

---

## Never do this

- Never reskin a consumer-app interaction pattern for a store flow, or vice versa.
- Never reintroduce a documented anti-pattern in a new prototype.
- Never use `role="alert"` for non-urgent feedback.
- Never leave an SVG icon without `aria-hidden focusable="false"`.
- Never use `<ul>` for numbered sequential steps — use `<ol>`.
- Never invent a pattern for an open gap — flag it instead.
