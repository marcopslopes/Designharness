---
name: Mobile
badge: Default
order: 1
platforms: phone, ios, android, tablet, mobile
summary: The phone and tablet system every prototype starts with — tokens, components, and the phone frame.
context: Writing [harness/skills/writing/SKILL.md], Content [harness/skills/content/SKILL.md], Mobile shell [harness/skills/mobile-shell/SKILL.md]
skills: ui-agent, design-system, mobile-shell, icon-usage, interaction-design, motion-choreography, content
theme: Colour, DS colours, Typography, Spacing, Size, Radius, Border, Scaling, Shadows, Motion, Effects
assets: Font, Icons, Images
ai: Conversation screen, Message, Conversation, Working, Reasoning, Tool call, Activity, Response, Result, Sources, This or that, Prompt input
components: Action grid, Alert, Avatar, Badge, Button, Card, Checkbox, Chip, Coachmark, Context menu, Controls, Count down, Drag handle, Empty state, Empty screen, Fab [built: context/design-system/ds/Fab.tsx], Header [built: context/design-system/ds/Header.tsx], Hint, List item, Loader, Phone frame [built: src/design-harness/shared/PhoneShell.tsx], Progress bar, Promo card, Radio [built: context/design-system/ds/Radio.tsx], Segmented control [built: context/design-system/ds/SegmentedControl.tsx], Selector [built: context/design-system/ds/Selector.tsx], Separator, Settings row, Setup checklist, Sheet, Sheet screen, Skeleton, Slider, Stack, Stepper, Swiper, Tab bar, Tabs, Text, Text field, Toast, Toggle, Toolbar, Tooltip
---

# Mobile

The default system. A new prototype uses it unless its brief says another
platform. Everything in the harness's design-system rules
(`harness/references/design-system-rules.md` §7) is written against it.

## What it has

| Part | Where |
|------|-------|
| Tokens — colour, type, spacing, radius, size, shadows, glass, light and dark | `context/design-system/tokens.css` |
| Components — Button, TextField, Toast, Toggle, Tabs, SegmentedControl, Badge, Card, and more | `context/design-system/ds/` |
| Phone frame — bezel, status bar, floating tab bar, home indicator | `src/design-harness/shared/PhoneShell.tsx` (`mobile-shell` skill) |
| iOS settings rows and groups | `src/design-harness/shared/IosSettingsPrimitives.tsx` |
| Flows across screens | Storyboards (`*.storyboard.ts` next to a project's screens) |

## Header

Five phone headers in `context/design-system/ds/Header.tsx`.

| Variant | Use |
|---------|-----|
| Large title | Home: avatar, actions, title, search |
| Nav bar | A pushed screen: back, centered title, actions |
| Search | Field, Cancel, scope chips, recent terms |
| Tabbed | Large title plus an underline tab row |
| Context | Receipt: tinted eyebrow, title, a row of facts |

**When to use:** One of these five. Large title on a home, nav bar on a pushed screen, search when the screen is a search, tabbed when the home has an underline tab row, context on a receipt.

**Avoid:** A sixth header, or a redraw of one of these.

## Sheet

Sheet chrome and the kit variants live in `context/design-system/ds/Sheet.tsx`.

| Variant | Use |
|---------|-----|
| Form | Grabber, Cancel / title / Done, fields |
| Action | Rows with an icon, plus a detached Cancel |
| Confirmation | Glyph, title, two stacked actions |
| Picker | A snapping list; the selected row sits in a band |
| Detail | Person, facts, quick actions, one primary |
| Status | Result card with no grabber: loading, success, warning, error, info |

**When to use:** One of these sheets over the screen. Cancel closes an action sheet.

**Avoid:** A new page for that action, a grabber on a status sheet, or a sixth sheet.

## Glass chrome

Floating iOS 26 surfaces use `--kit-glass-*`. They sit over content, so the
catalog shows them on a tinted stage.

The phone frame still draws the device status bar and its own pill. Tab bar,
context menu, and toolbar are the components a screen composes. Each one
states when to use it on its own page.

## Tab bar

Selected tab in the material. Search stays separate.

**When to use:** The phone's primary destinations.

**Avoid:** A second tab bar, or search inside the material.

## Context menu

**When to use:** Long-press actions.

**Avoid:** A destructive row that is not last.

## Toolbar

**When to use:** Side actions, with status in the center.

**Avoid:** Using it as the device status bar. The phone frame draws that.

## Patterns

Composed screens in the phone frame. Empty screen and Sheet screen say when to use them.

## AI conversation

An agent thread uses these parts. Do not draw a new bubble or a new composer.

On the phone, the thread scrolls under a nav bar and the prompt sits above the home indicator. Add, connectors, and client choice open as sheets. On the desktop, the same parts sit in the browser frame, the prompt is pinned to the bottom of the column, and those choices open as menus.

Each part states when to use it on its own page.

## Message

**When to use:** One turn. A person is a bubble at the end of the row. An agent is flow, with no header. Edit, retry, and copy sit beside the bubble on the desktop, and in a sheet on the phone.

**Avoid:** A second bubble, or a header on the agent turn.

## Conversation

**When to use:** The log those turns stack in.

**Avoid:** A second thread container.

## Working

**When to use:** A quiet hold. One line, while the agent is still working.

**Avoid:** A full-screen loader in place of that line.

## Reasoning

**When to use:** The collapsed trail of how the answer was reached.

**Avoid:** Opening it unless someone asks.

## Tool call

**When to use:** One step the agent took.

**Avoid:** Several steps in one row. Those are Activity.

## Activity

**When to use:** The steps of a run, in order.

**Avoid:** A single step. That is a tool call.

## Response

**When to use:** The answer: prose, a drafted note, follow-ups.

**Avoid:** Putting the claim's source here. That is Result and Sources.

## Result

**When to use:** A card inside the turn. The claim names its source.

**Avoid:** A card that picks a winner.

## Sources

**When to use:** Where that claim came from.

**Avoid:** A source list with no claim.

## This or that

**When to use:** A visual narrowing, with a way to skip it.

**Avoid:** A choice with no skip.

## Prompt input

**When to use:** The composer: context chips, the field, add, connectors, voice, send. One line until the text wraps.

**Avoid:** A second composer. On the phone, add, connectors, and client choice open as sheets. On the desktop they open as menus.

## Empty screen

**When to use:** Large title, empty view, tab bar. Switching tabs changes the empty copy.

**Avoid:** An empty home with no title and no tab bar.

## Sheet screen

**When to use:** An action sheet over the screen. Cancel closes it.

**Avoid:** A new page for that action.

## Rules

- This is the default system for a mobile screen or a prototype. The catalog
  at `#/design-system` is the system itself. Header, tab bar, glass icons,
  sheet, and the screens below are what a build composes. They are not
  throwaway templates, and a prototype does not redraw that chrome.
- An AI conversation or an adaptive agent surface composes the parts in
  AI conversation. It does not invent a second chat kit.
- Tokens only — no raw colours or sizes in prototype CSS.
- Compose from `ds/` before writing a new component.
- Desktop uses this whole design system. It changes the arrangement, not
  the foundations or the components.
