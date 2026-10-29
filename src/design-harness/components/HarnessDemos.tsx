import { useState } from 'react'
import { FrameAdd, FrameArrowRight, FramePalette, FrameWand } from '../harnessIcons'
import { Button as ProductButton } from '../../../context/design-system/ds'
import { getSectionNavSections, getSectionNavTabs } from '../designHarnessNavConfig'
import { PROJECTS } from '../projectsIndex'
import type { DesignHarnessRoute } from '../routes'
import { DesignHarnessLabPlaceholderPage } from '../pages/DesignHarnessLabPlaceholderPage'
import { ProjectFactsStrip } from '../pages/ProjectPage'
import { DESIGN_SYSTEMS, SYSTEMS_INDEX_ROUTE } from '../designSystems'
import { Badge, Button, Card, Chip, Field, Icon, Segmented, Stack, Text, Toggle } from '../ui'
import { Breadcrumb, FinePrint, PrevNext, SkillCard, SummaryPanel, TextLink } from './DocParts'
import { DesignHarnessDocPage, TableOfContents } from './DesignHarnessDocPage'
import { DesignHarnessMarkdown } from './DesignHarnessMarkdown'
import { RadiusShowcaseGrid } from './FoundationsShowcase'
import { MobileBar, Rail, SectionNav, Sidebar, SkipLink } from './Shell'

/** Demos for the Harness system's own components. Each renders the real component. */

const noop = () => {}

const HARNESS_ROUTE: DesignHarnessRoute =
  DESIGN_SYSTEMS.find((system) => system.id === 'harness')?.route ?? SYSTEMS_INDEX_ROUTE

export function ButtonDemo() {
  return (
    <>
      <div className="design-harness-system__demo-row">
        <Button type="button" intent="primary">
          Save changes
        </Button>
        <Button type="button" intent="secondary">
          Discard
        </Button>
        <Button type="button" intent="ghost">
          Cancel
        </Button>
      </div>
      <div className="design-harness-system__demo-row">
        <Button type="button" intent="primary" size="sm" startIcon={<Icon icon={FrameAdd} size="sm" />}>
          New project
        </Button>
        <Button type="button" intent="secondary" size="sm" endIcon={<Icon icon={FrameArrowRight} size="sm" />}>
          Open
        </Button>
        <Button type="button" intent="primary" disabled>
          Disabled
        </Button>
      </div>
    </>
  )
}

export function FieldActionDemo() {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState('Design Harness')
  return (
    <Field
      label="Studio name"
      value={value}
      readOnly={!editing}
      action={
        editing
          ? { label: 'Done', onClick: () => setEditing(false) }
          : { label: 'Edit', onClick: () => setEditing(true) }
      }
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export function ToggleDemo() {
  const [on, setOn] = useState(true)
  return (
    <div className="design-harness-system__demo-row">
      <Toggle checked={on} aria-label="Show tour" onClick={() => setOn((value) => !value)} />
      <Toggle checked={false} aria-label="Unavailable" disabled />
    </div>
  )
}

export function SegmentedDemo() {
  const [value, setValue] = useState('light')
  return (
    <Segmented
      label="Theme"
      value={value}
      onChange={setValue}
      options={[
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System', disabled: true },
      ]}
    />
  )
}

export function BadgeDemo() {
  return (
    <div className="design-harness-system__demo-row">
      <Badge tone="neutral">Draft</Badge>
      <Badge tone="positive">Shipped</Badge>
      <Badge tone="accent">Default</Badge>
    </div>
  )
}

export function CardDemo() {
  return (
    <Card>
      <Stack gap="xs">
        <Text variant="label">Context pack</Text>
        <Text variant="muted">Seven files, last edited yesterday.</Text>
      </Stack>
    </Card>
  )
}

export function ChipDemo() {
  const [selected, setSelected] = useState<string[]>(['Mobile'])
  const toggle = (name: string) =>
    setSelected((current) => (current.includes(name) ? current.filter((n) => n !== name) : [...current, name]))
  return (
    <div className="design-harness-system__demo-row">
      {['Mobile', 'Web', 'Harness'].map((name) => (
        <Chip key={name} selected={selected.includes(name)} onClick={() => toggle(name)}>
          {name}
        </Chip>
      ))}
      <Chip size="sm">Small</Chip>
    </div>
  )
}

export function TextDemo() {
  return (
    <Stack gap="sm">
      <Text variant="display">Display</Text>
      <Text variant="body-large">Body large, for page leads.</Text>
      <Text variant="body">Body, for running text.</Text>
      <Text variant="label">Label</Text>
      <Text variant="muted">Muted, for hints and metadata.</Text>
    </Stack>
  )
}

function useDemoRoute(initial: DesignHarnessRoute) {
  return useState<DesignHarnessRoute>(initial)
}

export function RailDemo() {
  const [route, setRoute] = useDemoRoute('design-system/foundations')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <div className="design-harness-shell-demo">
      <aside className="design-harness-ds-shell-sidebar" aria-label="Rail demo" data-collapsed="true">
        <Rail
          route={route}
          theme={theme}
          showSettings
          onNavigate={setRoute}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          onCloseMobile={noop}
        />
      </aside>
    </div>
  )
}

export function SidebarDemo() {
  const [route, setRoute] = useDemoRoute('how-to')
  return (
    <div className="design-harness-shell-demo">
      <aside className="design-harness-ds-shell-sidebar" aria-label="Sidebar demo" data-collapsed="false">
        <Rail
          route={route}
          theme="light"
          showSettings={false}
          onNavigate={setRoute}
          onToggleTheme={noop}
          onCloseMobile={noop}
        />
        <Sidebar
          title="How to"
          sections={getSectionNavSections('how-to', route)}
          tabs={getSectionNavTabs('how-to', route)}
          route={route}
          docs
          onNavigate={setRoute}
          onHide={noop}
        />
      </aside>
    </div>
  )
}

export function SectionNavDemo() {
  const [route, setRoute] = useDemoRoute(HARNESS_ROUTE)
  return (
    <div className="design-harness-shell-demo">
      <SectionNav
        title="Harness"
        sections={getSectionNavSections('design-system', route)}
        route={route}
        filterable
        onNavigate={setRoute}
      />
    </div>
  )
}

export function MobileBarDemo() {
  const [open, setOpen] = useState(false)
  return <MobileBar open={open} area="Design system" onToggle={() => setOpen((o) => !o)} onHome={noop} />
}

export function SkipLinkDemo() {
  return <SkipLink />
}

export function PageHeaderDemo() {
  return (
    <DesignHarnessDocPage
      toc={false}
      breadcrumb={<Breadcrumb items={[{ label: 'How to', route: 'how-to' }, { label: 'Get started' }]} />}
      title="Get started"
      lead="Five minutes from clone to your first prototype."
      meta={<Badge tone="accent">Guide</Badge>}
    />
  )
}

const TOC_DEMO = [
  { id: 'demo-toc-why', title: 'Why it exists' },
  { id: 'demo-toc-anatomy', title: 'Anatomy' },
  { id: 'demo-toc-usage', title: 'Usage' },
]

export function TableOfContentsDemo() {
  const [active, setActive] = useState(TOC_DEMO[0].id)
  return <TableOfContents entries={TOC_DEMO} activeId={active} inline onSelect={setActive} />
}

export function DocPageLayoutDemo() {
  return (
    <DesignHarnessDocPage toc={false} title="Writing a brief" lead="What goes in, and what the agent does with it.">
      <h2>Before you start</h2>
      <p>Pick the project and paste the ticket link.</p>
      <h2>What you get</h2>
      <p>A one-page brief in the project folder.</p>
    </DesignHarnessDocPage>
  )
}

export function DemoStageDemo() {
  return (
    <div className="design-harness-ds-demo">
      <ProductButton type="button" intent="primary" size="md">
        Product button
      </ProductButton>
    </div>
  )
}

export function PlaceholderPageDemo() {
  return (
    <DesignHarnessLabPlaceholderPage
      eyebrow="Lab"
      title="Storyboards"
      description="Lay out a flow screen by screen before you build it."
      status="coming-soon"
    />
  )
}

const MARKDOWN_DEMO = `## Heading

Running text with **bold**, \`code\`, and a [link](https://example.com).

- A list item
- Another one

> **Note:** quotes that start with a label become callouts.

| Token | Use |
| --- | --- |
| \`--spacing-04\` | Gaps between fields |
`

export function MarkdownDemo() {
  return <DesignHarnessMarkdown source={MARKDOWN_DEMO} />
}

export function ProjectFactsDemo() {
  const project = PROJECTS[0]
  return project ? <ProjectFactsStrip project={project} /> : <Text variant="muted">No projects yet.</Text>
}

export function ShowcaseCardDemo() {
  return <RadiusShowcaseGrid />
}

export function SummaryTilesDemo() {
  return (
    <SummaryPanel
      title="Foundations"
      stats={[
        [42, 'Colour tokens'],
        [12, 'Spacing steps'],
        [6, 'Radii'],
      ]}
      note="Counted from the token files."
      link={{ label: 'All foundations', route: 'design-system/foundations' }}
    />
  )
}

export function TextLinkDemo() {
  return (
    <Text variant="body">
      Read the <TextLink route="how-to">how-to guides</TextLink> or the{' '}
      <TextLink href="https://tabler.io/icons">Tabler icon set</TextLink>.
    </Text>
  )
}

export function FinePrintDemo() {
  return <FinePrint>Saved to designer-profile.local.md. Only you can see it.</FinePrint>
}

export function PrevNextDemo() {
  return (
    <PrevNext
      prev={{ label: 'Foundations', route: 'design-system/foundations' }}
      next={{ label: 'How to', route: 'how-to' }}
    />
  )
}

export function SkillCardDemo() {
  return (
    <div className="design-harness-system__demo-row">
      <SkillCard name="UI agent" owner="Builds prototype screens" tags={['Build']} icon={FrameWand} route="how-to" />
      <SkillCard
        name="Design system"
        owner="Checks tokens and components"
        tags={['Review', 'Tokens']}
        icon={FramePalette}
        route="design-system/foundations"
      />
    </div>
  )
}
