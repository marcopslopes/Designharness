# Icons — how to use them

**Library:** [Tabler Icons](https://tabler.io/icons) via `@tabler/icons-react`
(installed dependency, 5,900+ MIT-licensed icons).

**Primitive:** `Icon` in `context/design-system/ds` (`context/design-system/ds/Icon.tsx`) wraps every Tabler icon
so sizing, stroke weight, and colour stay token-driven and consistent.

**Never hand-draw new inline `<svg>` icon markup.** Find the closest Tabler
icon and pass it to `Icon` instead — this is what keeps every prototype's
iconography visually consistent instead of each screen inventing its own
paths and stroke widths.

## Usage

```tsx
import { IconCalendar } from '@tabler/icons-react'
import { Icon } from '../../../context/design-system/ds' // adjust the relative path to context/design-system/ds

<Icon icon={IconCalendar} size="md" />
```

| Prop        | Values                                  | Notes |
|-------------|------------------------------------------|-------|
| `icon`      | any `@tabler/icons-react` export         | PascalCase, `Icon`-prefixed, e.g. `IconGift`. Browse [tabler.io/icons](https://tabler.io/icons). Most have an outline default and a `...Filled` solid variant. |
| `size`      | `xs` \| `sm` \| `md` \| `lg` \| `xl`     | Maps to `--size-03`…`--size-07` (16/18/20/24/28px) in `context/design-system/tokens.css`. Default `md`. |
| `stroke`    | number, optional override                | Auto-scales with `size` by default (`stroke = size ÷ 16`: 1 at 16px, 1.5 at 24px, 2 at 32px — confirmed by design in Slack). Rarely needs overriding. |
| `className` | optional                                 | Icons inherit `currentColor` — set `color` on a wrapping element (or pass a className that sets it) to theme them. |

## Picking an icon

1. Think of the semantic action/object (share, calendar, settings,
   scissors for a hair-salon service, coins for rewards, etc.) rather than
   trying to pixel-match a Figma icon exactly.
2. Search [tabler.io/icons](https://tabler.io/icons) for that word.
3. Prefer the outline icon unless the design calls for a solid glyph (e.g. a
   filled rating star → `IconStarFilled`). Outline = default; fill marks
   active/selected when the pattern allows — don't mix filled everywhere or
   the active state has no signal.
4. If nothing fits well, pick the closest conceptual match — one consistent
   icon system across the app beats pixel-perfect fidelity per icon.
5. **Test at the smallest size it will render** (often `xs` / 16px). Prefer
   the `size` scale over arbitrary CSS scales — fractional scaling of a 24px
   glyph softens at 16px. If a glyph turns to mush at `xs`, pick a simpler
   Tabler sibling.

## RTL — flip only directional icons

Under `dir="rtl"`, mirror icons whose meaning is tied to reading direction;
leave the rest alone:

| Flip | Don't flip |
|------|------------|
| Back/forward arrows, nav chevrons | Logos and brand marks |
| Text-block glyphs (align, lists, indent) | Checkmarks |
| Speaker/volume waves | Physical objects (clocks, cups, pencils) |
| "Send"-style directional glyphs | Media playback (play/rewind stay LTR by convention) |

Never blanket-mirror every icon in a toolbar. Accessible names for icon-only
buttons stay with [`accessibility`](../accessibility/GUIDE.md) / audit.

## Local wrapper pattern (large prototype files)

For screens with many repeated icon usages, define a thin local wrapper per
icon so JSX call sites stay short and readable:

```tsx
import { IconGift } from '@tabler/icons-react'
import { Icon } from '../../../context/design-system/ds'

function IconGiftButton({ className }: { className?: string }) {
  return <Icon icon={IconGift} size="md" className={className} />
}
```

See `projects/mobile-banking-dashboard/screens/wallet-home-shared.tsx` for a
worked example — every icon on the wallet home follows this pattern.

## Related files

| File | Role |
|------|------|
| `context/design-system/ds/Icon.tsx` | The `Icon` primitive implementation |
| `context/design-system/ds/ds.css` | `.ds-icon` size-scale styles |
| `context/design-system/tokens.css` | `--size-00`…`--size-12` scale |
| `context/design-system/FIGMA-FOUNDATIONS-SIZE.md` | Source spec for the size scale |
| `harness/skills/icon-usage/SKILL.md` | Full icon-usage skill (shared team library) |
| `harness/ORCHESTRATOR.md` | The routing table that triggers this skill |
