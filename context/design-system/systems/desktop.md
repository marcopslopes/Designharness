---
name: Desktop
badge: In progress
order: 2
platforms: desktop, web, browser, laptop
summary: The same language as Mobile, arranged for a wide window inside the browser frame.
context: Desktop web patterns [harness/skills/ui-agent/references/desktop-web-patterns.md], Writing [harness/skills/writing/SKILL.md]
skills: ui-agent, design-system, responsive-patterns
theme: Colour [from mobile], DS colours [from mobile], Typography [from mobile], Spacing [from mobile], Size [from mobile], Radius [from mobile], Border [from mobile], Scaling [from mobile], Layout grid [planned], Shadows [from mobile], Motion [from mobile], Effects [from mobile]
assets: Font [from mobile], Icons [from mobile], Images [from mobile]
ai: Conversation screen [from mobile], Message [from mobile], Conversation [from mobile], Working [from mobile], Reasoning [from mobile], Tool call [from mobile], Activity [from mobile], Response [from mobile], Result [from mobile], Sources [from mobile], This or that [from mobile], Prompt input [from mobile]
components: Action grid [from mobile], Alert [from mobile], Avatar [from mobile], Badge [from mobile], Browser frame [built: src/design-harness/shared/DesktopShell.tsx], Button [from mobile], Card [from mobile], Checkbox [from mobile], Context menu [from mobile], Chip [from mobile], Coachmark [from mobile], Controls [from mobile], Count down [from mobile], Data table [planned], Drag handle [from mobile], Empty state [from mobile], Empty screen [from mobile], Fab [built: context/design-system/ds/Fab.tsx], Filter bar [planned], Header [built: context/design-system/ds/Header.tsx], Hint [from mobile], List item [from mobile], Loader [from mobile], Page header [planned], Pagination [planned], Progress bar [from mobile], Promo card [from mobile], Radio [built: context/design-system/ds/Radio.tsx], Segmented control [built: context/design-system/ds/SegmentedControl.tsx], Selector [built: context/design-system/ds/Selector.tsx], Separator [from mobile], Settings row [from mobile], Setup checklist [from mobile], Sheet [from mobile], Sheet screen [from mobile], Side panel [planned], Skeleton [from mobile], Slider [from mobile], Stack [from mobile], Stepper [from mobile], Stat [planned], Status [planned], Swiper [from mobile], Tab bar [from mobile], Tabs [from mobile], Text [from mobile], Text field [from mobile], Toast [from mobile], Toggle [from mobile], Toolbar [from mobile], Tooltip [from mobile]
---

# Desktop

The wide-window arrangement of the same design system. Colour, type, spacing,
size, radius, border, scaling, font, and components are one catalog, so a
phone screen and a desktop screen read as one product. Desktop adds the
browser frame and the layout: columns, a table, a side panel.

## What it has

| Part | Where |
|------|-------|
| Browser frame with the app's nav down the left | `src/design-harness/shared/DesktopShell.tsx` |
| Layout and pattern rules for desktop web | `harness/skills/ui-agent/references/desktop-web-patterns.md` |
| Tokens and components | The same ones as Mobile (`context/design-system/`) |

## What's missing

- Layout notes: content width, column grid, side-panel widths, using
  Mobile's existing tokens.
- Desktop arrangements of those same components: data table, filter bar,
  status, stat, side panel.

## Spacing

Desktop uses Mobile's spacing scale. There is no second scale. A page
gets wider by using the larger steps, not by inventing new ones.

| Step | Token | Value | On a desktop page |
|------|-------|-------|-------------------|
| 00 | `--spacing-00` | 0 | Reset |
| 01 | `--spacing-01` | 2px | A hairline offset |
| 02 | `--spacing-02` | 4px | Tight stack inside a control |
| 03 | `--spacing-03` | 8px | A label and the line under it |
| 04 | `--spacing-04` | 12px | Inside a card or a table cell |
| 05 | `--spacing-05` | 16px | Between items in a row |
| 06 | `--spacing-06` | 24px | Between sections on the page |
| 07 | `--spacing-07` | 32px | Page gutter, or the foot of a long table |
| 08 | `--spacing-08` | 40px | A wider page gutter |
| 09 | `--spacing-09` | 48px | Space under the page |

The page itself stays inside `--size-layout-content-max` (1240px). That
width is a size token, documented with the layout grid when that page
is written.

The wallet desktop uses 24px between the header, the figures, and the
table, and 16px between the figures in that row.

## AI conversation

Same parts as Mobile. The thread sits in a column inside the browser frame,
and the prompt is pinned to the bottom of that column. Add, connectors, and
client choice open as menus above the prompt. Do not draw a second composer.

## Rules

- Same design system as Mobile. Do not add a second colour, type, spacing,
  size, radius, border, or component set.
- Wrap desktop screens in `DesktopShell`, passing the same tabs the phone
  uses, so both platforms share one nav.
- When the missing table, filter bar, status, and stat are built, follow
  [Quartz](https://design.how/systems/quartz) for the shape only: status is
  a word, figures sit in one strip inside a frame, colour marks a label or
  a line or the selected row, and a view has one primary action. Use
  Mobile's tokens. Leave Quartz's frost palette and type scale.
