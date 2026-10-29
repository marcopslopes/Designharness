---
name: Harness
badge: Platform
order: 4
platforms:
summary: The system Design Harness itself is built with — warm off-white, blue-black pills, forest green focus, filled fields, Geist. Never used inside prototypes.
context: Harness settings [harness/references/harness-settings.md], Extra pack files [harness/references/org-pack-extra-files.md]
skills: ui-agent, design-system
theme: Colour [built: src/design-harness/styles/chrome.css], Type [built: src/design-harness/styles/chrome.css], Radius [built: src/design-harness/styles/frame-forms.css], Shadows [built: src/design-harness/styles/chrome.css], Spacing [from mobile]
assets: Font [built: @fontsource-variable/geist], Icons [built: @solar-icons/react line-duotone]
components: Button [built: src/design-harness/ui/Button.tsx], Icon button [built: src/design-harness/ui/IconButton.tsx], Arrow button [built: src/design-harness/components/DocParts.tsx], Menu button [built: src/design-harness/components/DocParts.tsx], Field [built: src/design-harness/ui/Field.tsx], Field action link [built: src/design-harness/ui/Field.tsx], Select [built: src/design-harness/components/SettingsParts.tsx], Textarea [built: src/design-harness/components/SettingsParts.tsx], File picker [built: src/design-harness/styles/settings.css], Toggle [built: src/design-harness/ui/Toggle.tsx], Toggle row [built: src/design-harness/components/SettingsParts.tsx], Segmented control [built: src/design-harness/ui/Segmented.tsx], Tabs [built: src/design-harness/ui/Tabs.tsx], Chip [built: src/design-harness/ui/Chip.tsx], Badge [built: src/design-harness/ui/Badge.tsx], Text [built: src/design-harness/ui/Text.tsx], Text link [built: src/design-harness/components/DocParts.tsx], Fine print [built: src/design-harness/components/DocParts.tsx], Callout [built: src/design-harness/ui/Callout.tsx], Card [built: src/design-harness/ui/Card.tsx], Skip link [built: src/design-harness/components/Shell.tsx], Rail [built: src/design-harness/components/Shell.tsx], Sidebar [built: src/design-harness/components/Shell.tsx], Section nav [built: src/design-harness/components/Shell.tsx], Mobile bar [built: src/design-harness/components/Shell.tsx], Command search [built: src/design-harness/components/CommandSearch.tsx], Intro tour [built: src/design-harness/components/HarnessIntro.tsx], Doc page layout [built: src/design-harness/components/DesignHarnessDocPage.tsx], Page header [built: src/design-harness/components/DesignHarnessDocPage.tsx], Table of contents [built: src/design-harness/components/DesignHarnessDocPage.tsx], Breadcrumb [built: src/design-harness/components/DocParts.tsx], Kicker [built: src/design-harness/components/DocParts.tsx], Doc actions [built: src/design-harness/components/DocToolbar.tsx], Previous and next [built: src/design-harness/components/DocParts.tsx], Page feedback [built: src/design-harness/components/DocParts.tsx], Placeholder page [built: src/design-harness/pages/DesignHarnessLabPlaceholderPage.tsx], Markdown [built: src/design-harness/components/DesignHarnessMarkdown.tsx], Doc table [built: src/design-harness/components/DesignHarnessMarkdown.tsx], Diagram frame [built: src/design-harness/components/MermaidDiagram.tsx], Screen embed [built: src/design-harness/components/ScreenEmbed.tsx], Demo stage [built: src/design-harness/styles/chrome.css], Band [built: src/design-harness/components/DocParts.tsx], CTA card [built: src/design-harness/components/DocParts.tsx], Home search [built: src/design-harness/components/HomeParts.tsx], Help card [built: src/design-harness/components/HomeParts.tsx], Project card [built: src/design-harness/components/ProjectCard.tsx], Skill card [built: src/design-harness/components/DocParts.tsx], Summary tiles [built: src/design-harness/components/DocParts.tsx], Showcase cards [built: src/design-harness/components/FoundationsShowcase.tsx], Project facts [built: src/design-harness/pages/ProjectPage.tsx], Designer avatar [built: src/design-harness/components/DesignerAvatar.tsx], Setting row [built: src/design-harness/components/SettingsParts.tsx], Settings section [built: src/design-harness/components/SettingsParts.tsx], Fact list [built: src/design-harness/components/SettingsParts.tsx], Design board [built: src/design-harness/board/BoardPage.tsx]
---

# Harness

The frame around everything: the rail, the sidebars, Settings, the home
page, and these docs. Prototypes never use it, and it never changes how a
prototype looks.

## Colour

Warm and quiet: an off-white page, white panels, blue-black for action, warm grey for
supporting text, forest green for focus. Swatches follow the theme — switch
to dark mode to see the dark values.

| Name | Token | Used for |
|------|-------|----------|
| Ink — blue-black | `var(--kit-ink)` | Text, and the primary button (the black pill) |
| Ink hover | `var(--kit-ink-70)` | Primary button hover, secondary text |
| Muted ink — warm grey | `var(--kit-ink-50)` | Hints, labels, metadata, leads |
| Accent — forest green | `var(--design-harness-accent)` | Focus rings, outlines, selected states. Lighter in dark mode |
| Canvas — warm off-white | `var(--design-harness-shell-canvas)` | Behind the panels |
| Panel | `var(--design-harness-shell-panel)` | Sidebars, pages, cards |
| Panel edge | `var(--design-harness-shell-panel-border)` | Card hairline — 6% ink |
| Sand | `var(--design-harness-sand)` | Sand bands, the light arrow button |
| Band — near-black | `var(--design-harness-band)` | The dark band |
| Deep forest | `var(--design-harness-forest-surface)` | The closing CTA card |
| Field fill | `var(--design-harness-field-fill)` | Inputs, selects, home search — sand with a touch of ink |
| Chip | `var(--design-harness-field-chip)` | Chips sitting on a field |
| Line | `var(--kit-line)` | Dividers |

Raw values live in `tokens.lab.css` as `--design-harness-warm-*` and
`--design-harness-deep-forest`: page `#fafaf9`, sand `#f3f2ee`, ink `#0d1016`,
warm grey `#68655e`, line `#e6e6e6`, deep forest `#00301e`. Dark mode has
its own set to match. No text colour is lighter than the warm grey — anything
lighter falls under 4.5:1 on the page.

The forest green's base value is `#005032` (`--design-harness-accent-base`).
The product's teal (`--kit-brand`) is not part
of the frame — it stays for prototypes. Product component demos keep the
product's own ink in light mode.

## Type

| Role | Token | Notes |
|------|-------|-------|
| Font | `--design-harness-font` | Geist, for the whole frame |
| Base size | `--type-label-size` | Frame default text size |
| Line height | `--type-body-line` | Frame default line height |

Prototypes and component demos keep the product font
(`--design-harness-product-font-text`), so a demo always looks like the product.

## Radius

| Where | Token | Value |
|-------|-------|-------|
| Fields and selects | `--radius-02` | 8px |
| Home search | `--radius-03` | 16px |
| Buttons — pill | `--radius-05` | 999px |

## Shadows

| Name | Token | Used for |
|------|-------|----------|
| Panel | `--design-harness-shell-panel-shadow` | Hairline plus a 1–2px lift on cards |
| Elevated | `--design-harness-shell-elevated` | The mobile top bar, and demos in dark mode |

Fields have no shadow — they're filled instead.

## Font

Geist Variable, from `@fontsource-variable/geist`. Set once as
`--design-harness-font`.

## Button

`<Button intent size>` from `src/design-harness/ui`. A pill
(`--radius-05`) in three intents: primary is the black pill (`--kit-ink`
fill, `--kit-paper` text, hover `--kit-ink-70`), secondary is outlined in
`--kit-line`, ghost has no edge until hover. Two sizes, `md` and `sm`;
`startIcon` and `endIcon` take an `<Icon>`. Focus gets the forest green ring
(`--design-harness-focus-ring`).

## Field

`<Field label hint invalid trailing>` from `src/design-harness/ui`. Filled
with `--design-harness-field-fill`, no resting border, `--radius-02`. On focus:
a forest green border and the forest green ring. Labels are ink; the hint
sits under the field and turns red when `invalid`. `trailing` holds one
icon at the right end.

## Toggle

`<Toggle checked>` — a switch (`role="switch"`) on a `--kit-line` track that
fills forest green when on. One size. Name it with `aria-label`, or use
Toggle row, which names it for you.

## Segmented control

`<Segmented label options value onChange>` — two to four choices on a quiet
track; the current one sits on a raised pill. It's a radio group: ← and →
move and pick, skipping disabled options. Settings uses it for theme and
for each skill's mode.

## Badge

`<Badge tone>` — a small status pill. Three tones: neutral (warm grey),
positive (forest tint), accent (ink). Two or three words at most.

## Card

`<Card>` — the quiet panel: `--design-harness-shell-panel` fill, a
`--kit-line` hairline and `--radius-03`. `as` changes the element (`section`,
`article`). Project card, Help card and Summary tiles are built on it.

## Chip

`<Chip selected size>` — a pill for filters you can stack; `selected` fills
it ink and sets `aria-pressed`. Two sizes.

## Text

`<Text variant>` — the frame's type scale in one component: `display` for
page titles, `body-large` for leads, `body`, `label`, and `muted` for hints
and metadata. `as` sets the element; it never changes the look.

## Text link

`<TextLink route>` for a page in the harness, `<TextLink href>` for anywhere
else (opens in a new tab). Underlined, in the link colour. Use it inside
running text; a link that is the whole action is a Button.

## Fine print

`<FinePrint>` — one muted, small line under an action, naming what it
writes and where. Links inside it are underlined and inherit the grey.

## Home search

One filled surface (`--design-harness-field-fill`, `--radius-03`, no shadow).
Chips sit on it as `--design-harness-field-chip` pills. Focus rings the whole box
in forest green.

## Table of contents

"On this page" beside long docs. It sale items the section you're reading as
you scroll. `DesignHarnessDocPage` adds it when a doc has two or more
`h2`s; it's pinned to the window's right edge and hidden under 1280px.
`<TableOfContents inline>` puts it in the flow instead (that's the demo).

## Doc page layout

`<DesignHarnessDocPage>` — every doc page: Page header (breadcrumb, title,
lead, meta), then the body at reading width, then the table of contents.
Pass `toc={false}` for pages that are not long reads.

## Page header

The top of a doc page: an optional breadcrumb, the title in display type, a
lead in body large, and a meta row for badges or doc actions. It's the
first part of Doc page layout, not a separate component.

## Command search

⌘K (Ctrl+K on Windows) or the rail's search button opens it over any page.
It searches prototypes, every system's theme, assets and components, the
Manual, and Context & skills — the same list the home search uses
(`src/design-harness/studioSearch.ts`).

Each result shows where it lives (Harness › Components), matched words are
highlighted in forest green, and the footer names the keys: ↑↓ select,
↵ open, esc close. It's a native `<dialog>`, so focus stays inside and Escape
or a click outside closes it.

## Intro tour

Opens the first time someone runs the harness locally (`npm run dev`), over
any page. 7 steps with progress dots: welcome, make it yours, start with a
brief, give your idea shape, get feedback, build together, start exploring.
Some steps have tabs (the same pill strip as the sidebar's tabs) inside a
quiet card. Illustrations are hairline wireframe windows built from boxes,
lines, and Tabler icons — no drawn artwork.

It's a native `<dialog>`, so focus stays inside. Skip, Escape, or finishing
all mark it seen for that browser (`design-harness-intro-seen` in local
storage). Settings › Harness › Introduction opens it again. Not shown in
published builds or `?embed=1`.

## Tabs

A row of pills on a quiet track; the current one is filled. `<Tabs>` in the
sidebar and the Intro tour; ← and → move between tabs. Pair it with a panel
through `tabsPanelProps`, or pass `hasPanel={false}` when each tab opens a
page. The All prototypes / By designer switch shares the styling but is
still its own markup.

## Icon button

A square, icon-only button with a hover fill and the forest green focus
ring. `<IconButton label>` in the rail, the sidebar's hide button, and the
mobile close. `label` is required and doubles as the tooltip; `active`
fills it for the current page.

## Rail

The narrow column on the left: the harness mark (home), search, then one
icon button per area (Prototypes, Design system, Documentation), with
Settings and the theme switch at the bottom. The current area is filled. `<Rail>` in
`components/Shell.tsx`.

## Sidebar

The panel beside the rail: the area's title, optional tabs, a "Hide
navigation" icon button, then Section nav. Hidden, the rail shows a button
to bring it back. `<Sidebar>`.

## Section nav

The grouped list of pages inside the sidebar. Groups fold open and closed,
the current page is filled, and on the sidebar's second tab a filter box
narrows the list as you type. `<SectionNav>`.

## Mobile bar

Under 900px the rail and sidebar fold into a top bar with a menu button and
the harness name. The sidebar opens as a drawer over a scrim; Escape or a
tap on the scrim closes it.

## Skip link

"Skip to content", hidden until it's focused, then jumps to the main area.

## Doc actions

Small actions on a doc's toolbar: copy, download, and replace.

## Designer avatar

A designer's photo or initials in a circle, in three sizes, for the gallery.

## Screen embed

A project screen rendered live inside a doc, framed, instead of a
screenshot that drifts.

## Diagram frame

A framed Mermaid diagram inside a doc.

## Demo stage

The quiet panel a live component sits on in the design system pages.

## Placeholder page

A "coming soon" page with a badge and one line on where to look meanwhile.

## Markdown

`<DesignHarnessMarkdown source>` — draws every doc in the harness: headings
with anchors, lists, code chips, Callouts from `> [!NOTE]`, Doc tables,
Diagram frames from `mermaid` blocks, and Screen embeds.

## Project card

`<ProjectCard>` — a card with media or an icon, a title, a badge, one line
of detail and a footer. The same card lists systems, projects and
designers.

## Summary tiles

`<SummaryPanel title stats note link>` — a Card with a row of big numbers and
their labels, an optional note, and a link to the full list. On
Foundations.

## Showcase cards

The token cards on Foundations: a live sample (a swatch, a radius, a
spacing bar) above the token's name. `ColourShowcaseGrid`,
`SpacingShowcaseGrid`, `RadiusShowcaseGrid` and the scales.

## Project facts

`<ProjectFactsStrip project>` — the row under a project's title: status,
platform, stage, designer and squad, each a label over a value. Empty
facts are left out.

## Breadcrumb

The trail to the page's parent, small and warm grey above the title, split
by slashes — the parent itself in ink. The page is the title, so it isn't
repeated. Above every system item page; pass it to `DesignHarnessDocPage` as
`breadcrumb`.

## Kicker

A small uppercase label above a heading (`.design-harness-ds-doc-kicker`). One
or two words — the section, not a sentence.

## Callout

A tinted box with an icon for something the reader must not skim past.
Two tones: info (forest tint) and warning (amber). The frame keeps one
accent, so info uses the forest green rather than blue.

In any markdown doc, start a quote with GitHub's alert marker:

```md
> [!TIP]
> `[!NOTE]`, `[!TIP]` and `[!IMPORTANT]` give info; `[!WARNING]` and `[!CAUTION]` give warning.
```

> [!TIP]
> `[!NOTE]`, `[!TIP]` and `[!IMPORTANT]` give info; `[!WARNING]` and `[!CAUTION]` give warning.

## Doc table

Plain markdown tables — the docs renderer draws them with a header row,
hairlines, and code chips for `paths`. A cell that is only a
`` `var(--token)` `` draws a live swatch.

## Menu button

A pill showing the current choice; it opens a native `popover` menu with an
icon per option and a tick on the current one. ↑↓ move, Enter picks,
Escape or a click outside closes, and focus returns to the button.

## Arrow button

A pill with a small round arrow at the end, for the one action that moves
you forward. Three tones: ink (default), forest, and light — light stays
light in both themes because it sits on forest and dark bands.

## Band

A full-width section in sand, or the near-black band for the one thing
people must not miss. Kicker, a regular-weight title with tight tracking,
then content.

## CTA card

The deep forest card that closes a page, with one light arrow button, and no
illustration.

## Field action link

`<Field action={{ label, onClick }}>` — a small "Edit" link on the right of a
field's label, once the value has been entered. For Settings fields that
are set once, like the studio name. Built; no Settings field uses it yet.

## Fine print

One muted line with an underlined link, under Settings actions that write
to files, naming the file. Built; Settings doesn't use it yet.

## Previous and next

`<PrevNext prev next>` — two cards at the end of a page: the previous page
on the left and the next on the right, in sidebar order. On every system
item page; guides are next.

## Page feedback

"Was this page helpful?" with outlined Yes and No pills (thumb icons). After
an answer it says thanks in place.

Built, but not on any page yet: answers need somewhere to go. The component
takes `onAnswer`; saving to a local log the harness reads is the next step.

## Skill card

`<SkillCard>` — a card with an icon, small tag pills, the skill's name, and
who it belongs to — for the skills list in Context & skills, tagged with
the skill's group and platform. Built; the skills list still uses Project
card.

## What's missing

Full list: `context/design-system/HARNESS-INVENTORY.md` (2026-10-12). In short:

- **Placement.** Field action link, Fine print and Skill card are built and
  demoed but not on their pages yet; Page feedback needs somewhere to send
  answers.
- **Its own tokens.** Frame tokens are split between `tokens.lab.css` and
  `chrome.css`, and dark mode works by rewriting 149 product tokens inside
  `chrome.css`.
- **A shared dialog.** Command search and the Intro tour each build their own.
- An older callout (`.design-harness-ds-doc-callout`) predates Callout and
  could move onto it.

## Rules

- Frame styles are scoped to the frame (`.design-harness-form`, named frame
  classes) so the real components in `ds/` keep their own look.
- Focus states use the forest green accent; the product's teal stays for
  prototypes.
- Never use Harness tokens inside a prototype.
- Sentence case. A view has one primary action. Status is a word, not a
  dot. Colour, type, and the forest accent stay as they are.
