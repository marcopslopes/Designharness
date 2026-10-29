# Harness design system — inventory

Taken 2026-10-12. Phase 1 of making the Harness system (`systems/harness.md`)
complete: what the harness interface is actually built from today, before any
code changes. Scope is the interface only — the Harness brand (marketing)
system and the product component demo pages are out.

**Decision (2026-10-12):** the Harness owns every component it uses.
The interface stops importing from `context/design-system/ds` — those stay
for prototypes and the product demo pages.

How this was counted: every `.design-harness-*` class block in the interface
stylesheets (`chrome`, `frame-forms`, `doc-parts`, `settings`, `page-hero`,
`howto-article`, `overview-fan`, `system-map`, `skills-ui`, `harness-intro`,
`kit-*`, `howto-html`), matched against every `.tsx`/`.ts` file that uses it.
102 blocks in total.

**Status (2026-10-12, later the same day):** sections 1–3 are done. The
interface's components live in `src/design-harness/ui/` (Button, Field,
Toggle, Segmented, Badge, Card, Chip, Text, Callout, Tabs, Icon button) and
`components/` (Shell, DocParts, …). The interface no longer imports product
components; only `Stack` and `Icon` are re-exported from `ds/`. All 54
items in `systems/harness.md` are built, and each page shows a live demo.
The `frame-forms.css` overrides on product `Button` and `TextField` are
gone. Still open: section 4 (tokens) and a shared Dialog. The sections
below are the original snapshot.

## 1. Documented and built

Already in `systems/harness.md`, with a page under Harness › Components:

Primary button, Field, Select, Textarea, File picker, Toggle row, Setting row,
Settings section, Fact list, Home search, Help card, System card, Page header,
Rail, Sidebar, Table of contents, Command search, Intro tour, Breadcrumb,
Kicker, Callout, Doc table, Page feedback, Menu button, Arrow button, Band,
CTA card.

Planned but not built: Previous and next, Skill card, Field action link, Fine
print.

Two of the "built" ones aren't really Harness components: **Primary button**
and **Field** are the product `Button` and `TextField` with a
`.design-harness-form` override on top (`frame-forms.css`).

## 2. Built, reused, but not documented

Real pieces used in more than one place, with no entry in the system:

| Component | Where it lives | Used by |
|---|---|---|
| Tabs (pill strip) | `components/Tabs.tsx` (2026-10-12; was CSS only) | Sidebar tabs, Intro tour; `WorkViewToggle` still own markup |
| Icon button | `components/IconButton.tsx` (2026-10-12; was CSS only) | Rail, sidebar hide, mobile close |
| Mobile bar and scrim | `.design-harness-ds-mobile-bar`, `-mobile-scrim` | `DesignHarnessApp` |
| Skip link | `.design-harness-ds-skip` | `DesignHarnessApp` |
| Section nav (tree links, collapsible groups, inline search) | `.design-harness-ds-section-nav` (45 rules) | Sidebar |
| Doc page layout | `.design-harness-ds-page`, `-ds-doc-page` | 30 pages |
| Markdown styles | `.design-harness-ds-md` (105 rules), `-ds-md-panel` | `DesignHarnessMarkdown`, two hub pages |
| Gallery and project cards | `.design-harness-gallery` (60 rules) | 8 files — only the system card is documented |
| Designer avatar | `DesignerAvatar.tsx` | Gallery pages |
| Doc toolbar actions (copy, download, replace) | `.design-harness-skill-action`, `DocToolbar.tsx` | Context and system pages |
| Screen embed | `ScreenEmbed.tsx` | Project pages |
| Diagram frame | `.design-harness-mermaid` | `MermaidDiagram` |
| Project facts | `.design-harness-project-facts` | `ProjectPage` |
| Demo stage | `.design-harness-ds-demo` | 14 component pages |
| Showcase stage and cards | `.design-harness-showcase-*` | Foundations pages |
| Summary tiles | `.design-harness-ds-summary` | `FoundationsPage` |
| Text link | `.design-harness-ds-link` | 4 pages |
| Placeholder page | `.design-harness-lab-placeholder` | "Coming soon" pages |

## 3. Borrowed from the product design system

Interface files that import from `context/design-system/ds`:

| Product component | Interface files | Note |
|---|---|---|
| `Button` | Settings, How-to hub, Intro tour | Pill radius forced by `.design-harness-form .ds-button` |
| `TextField` | Settings, Home search, Blueprints | Fill and focus forced by `.design-harness-form .ds-field__input` |
| `Toggle` | Toggle row | |
| `SegmentedControl` | Settings | Looks different from the Harness tabs |
| `Badge` | Settings, Systems, Agent, Project card, Placeholder page | |
| `Alert` | Settings | Overlaps with Harness Callout |
| `Card` | Project card, Blueprints, Foundations | |
| `Chip` | Blueprints | |
| `Text` | 15 files | Renders product type sizes |
| `Stack` | 8 files | Layout only, no look |
| `Icon` | 13 files | Tabler wrapper, size scale only |

`Stack` and `Icon` carry no product look; the Harness can re-export them
rather than rebuild them.

## 4. Tokens

- The Harness has no token file of its own. 31 Harness tokens sit in
  `src/design-harness/styles/tokens.lab.css` next to prototype one-offs, and 59
  more are declared inside `chrome.css` and `frame-forms.css`.
- `chrome.css` redefines 149 **product** tokens (`--color-*`, `--kit-*`) for
  dark mode, from about line 3725. The interface gets its dark theme by
  rewriting the product's values rather than from Harness tokens. Most of the
  file's 94 hex and 108 `rgb()` literals are in that block.
- Interface CSS reads product tokens directly: 348 uses of `--color-*` and 26
  of `--font-family-text`. So some Harness pieces render in the product font
  and colours — the tabs are one (`--color-bg-muted`, `--font-family-text`).

## 5. Dead CSS — deleted 2026-10-12

Nothing in the repo used these, so they're gone:

- Whole files: `howto-article.css` (389 lines), `page-hero.css` (186),
  `overview-fan.css` (226).
- 44 rules in `chrome.css` (about 280 lines): `ds-token-*`, `ds-spacing-*`,
  `ds-radius-*`, `ds-spec-*`, `ds-doc-back`, `ds-doc-shell`, `ds-md-wrap`,
  `ds-foundations-hero`, `inline-link`, `font-family-grid`, and the
  `overview` block.

## 6. Proposed Phase 2 set

Harness primitives in their own folder, each with a catalog page, built on
Harness tokens only:

- **Actions:** Button (primary, secondary, ghost, text; Arrow button becomes a
  variant), Icon button (component exists; still needs Harness tokens)
- **Inputs:** Field, Select, Textarea, Toggle, Segmented control (or fold into
  Tabs)
- **Navigation:** Tabs (component exists; still needs Harness tokens)
- **Overlays:** Dialog, shared by Command search and the Intro tour
- **Display:** Badge, Card, Chip, Callout (absorbs `Alert`), Text
- **Layout:** Stack and Icon re-exported
- **Tokens:** one Harness token file — the 31 + 59 tokens above, plus a
  Harness dark theme that stops overriding product tokens

Order: tokens first, then Button and Dialog (the tour moves onto them),
then the rest. Phase 3 migrates the pages and splits `chrome.css`.
