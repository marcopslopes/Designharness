import { useId, useState, type FormEvent } from 'react'
import {
  FrameBolt,
  FrameChart,
  FrameDownload,
  FrameEye,
  FrameFileAdd,
  FrameKey,
  FrameChat,
  FrameMoon,
  FrameRoute,
  FrameSearch,
  FrameSettings,
  FrameSun,
  FrameMonitor,
  FrameWidgets,
} from './harnessIcons'
import { DesignerAvatar } from './components/DesignerAvatar'
import { CopyAction, DocAction } from './components/DocToolbar'
import { downloadText } from './localFiles'
import { MermaidDiagram } from './components/MermaidDiagram'
import { ScreenEmbed } from './components/ScreenEmbed'
import { getVisibleGalleryDesigners } from './galleryData'
import { showHarnessIntro } from './harnessIntro'
import { CommandSearch } from './components/CommandSearch'
import {
  ArrowButton,
  Band,
  Breadcrumb,
  CtaCard,
  Kicker,
  MenuButton,
  PageFeedback,
  type MenuOption,
} from './components/DocParts'
import {
  AnnouncementBar,
  BenefitColumns,
  BigStats,
  Faq,
  FeatureRow,
  Headline,
  Hero,
  HeroStats,
  IconFeatures,
  LogoGrid,
  LogoStrip,
  MarketingFooter,
  NewsMosaic,
  ProductCards,
  Quote,
  QuoteBand,
  ReadMore,
  SplitSection,
  StatRow,
  StoryCards,
  Wordmark,
} from './components/MarketingParts'
import { RELEASE_NOTE_ENTRIES } from './howtoDocs'
import type { DesignHarnessRoute } from './routes'
import { DesignHarnessMarkdown } from './components/DesignHarnessMarkdown'
import { contextDocsOfKind } from './contextDocs'
import { DESIGN_SYSTEMS, type DesignSystemRoute } from './designSystems'
import { PROJECTS } from './projectsIndex'
import { HelpCard, HomeSearch } from './components/HomeParts'
import { HOME_SHORTCUTS } from './homeShortcuts'
import { ProjectCard } from './components/ProjectCard'
import { Fact, Section, SelectField, SettingRow, TextAreaField, ToggleRow } from './components/SettingsParts'
import { Button, Callout, Field, Icon, IconButton, Segmented, Tabs, tabsPanelProps } from './ui'

/**
 * Live demos for system items, keyed by `<system>/<group>/<item>` (the item's
 * route after `design-system/systems/`). Each renders the real component the
 * frame uses — never a copy.
 */

const ROLE_OPTIONS = [
  { value: 'product', label: 'Product design' },
  { value: 'content', label: 'Content design' },
  { value: 'research', label: 'Research' },
]

export function FieldDemo() {
  const [value, setValue] = useState('')
  return (
    <Field
      label="Studio name"
      value={value}
      placeholder="Design Harness"
      hint="Up to 40 characters."
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export function SelectDemo() {
  const [value, setValue] = useState('product')
  return (
    <SelectField
      label="Role"
      value={value}
      options={ROLE_OPTIONS}
      hint="Not set is always an option."
      onChange={setValue}
    />
  )
}

export function TextAreaDemo() {
  const [value, setValue] = useState('')
  return (
    <TextAreaField
      label="Or paste the text"
      hint="Markdown or plain text."
      rows={4}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export function FilePickerDemo() {
  return (
    <div className="design-harness-field">
      <label className="design-harness-field__label" htmlFor="design-harness-demo-file">
        Upload a file
      </label>
      <input id="design-harness-demo-file" type="file" className="design-harness-settings__file" />
    </div>
  )
}

export function ToggleRowDemo() {
  const [on, setOn] = useState(true)
  return (
    <ToggleRow
      title="Build a storyboard"
      description="After a new phone screen is built, add its storyboard. When off, ask first."
      checked={on}
      onChange={setOn}
    />
  )
}

export function SettingRowDemo() {
  const [value, setValue] = useState('on-share')
  return (
    <SettingRow
      title="Run the audit"
      description="After builds, or only when you say you're sharing."
      control={
        <Segmented
          label="Run the audit"
          value={value}
          options={[
            { value: 'after-builds', label: 'After builds' },
            { value: 'on-share', label: 'Only when I share' },
          ]}
          onChange={setValue}
        />
      }
    />
  )
}

export function SettingsSectionDemo() {
  const [on, setOn] = useState(false)
  return (
    <Section title="Harness behaviour" description="When skills stop to ask, check, or offer something.">
      <ToggleRow
        title="Mid-build taste check"
        description="On longer builds, ask one pattern question at a natural break."
        checked={on}
        onChange={setOn}
      />
    </Section>
  )
}

export function FactListDemo() {
  return (
    <dl className="design-harness-settings__facts">
      <Fact label="Tokens file" value={<code>context/design-system/tokens.css</code>} />
      <Fact label="File types" value=".css, .tsx" />
    </dl>
  )
}

export function HomeSearchDemo() {
  const [value, setValue] = useState('')
  return (
    <HomeSearch
      value={value}
      onChange={setValue}
      onSubmit={(event: FormEvent) => event.preventDefault()}
      canSubmit={Boolean(value.trim())}
      shortcuts={HOME_SHORTCUTS}
    />
  )
}

export function HelpCardDemo() {
  return (
    <div className="design-harness-home__cards">
      <HelpCard
        title="Add a file in Settings"
        description="Upload or paste a doc, say when skills should use it."
        route="design-system/systems"
        icon={FrameFileAdd}
      />
    </div>
  )
}

export function ProjectCardDemo() {
  return (
    <div className="design-harness-gallery__grid">
      <ProjectCard
        route="design-system/systems"
        title="Mobile"
        badge="Default"
        detail="The phone and tablet system every prototype starts with."
        footer="Used by 5 prototypes"
        icon={FrameWidgets}
      />
      <ProjectCard
        route="design-system/systems"
        title="Harness"
        detail="The interface you're reading this in."
        footer="Used by the harness only"
        icon={FrameWidgets}
      />
    </div>
  )
}

export function CommandSearchDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="design-harness-system__demo-row">
      <Button type="button" intent="primary" size="md" onClick={() => setOpen(true)}>
        Open command search
      </Button>
      <span className="design-harness-system__note">Or press ⌘⌫ anywhere.</span>
      <CommandSearch open={open} onClose={() => setOpen(false)} />
    </div>
  )
}

export function BreadcrumbDemo() {
  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Systems', route: 'design-system/systems' },
          { label: 'Harness', route: 'design-system/systems/harness' as DesignSystemRoute },
          { label: 'Components' },
        ]}
      />
      <p className="design-harness-system__note">Above every system item page — this one included.</p>
    </div>
  )
}

export function KickerDemo() {
  return <Kicker>Design system · Studio</Kicker>
}

export function CalloutDemo() {
  return (
    <div className="design-harness-system__demo-stack">
      <Callout>
        <p>Settings save to files in this repo, so the harness reads them in every chat.</p>
      </Callout>
      <Callout tone="warning">
        <p>Changing a system's file changes every prototype that uses it.</p>
      </Callout>
    </div>
  )
}

const DOC_TABLE = `| Setting | Where it lives | Notes |
|---|---|---|
| Studio name | \`harness.config.local.json\` | Studio identity |
| Your role | \`designer-profile.local.md\` | One of the five profile lines |`

export function DocTableDemo() {
  return <DesignHarnessMarkdown source={DOC_TABLE} />
}

export function PageFeedbackDemo() {
  return <PageFeedback />
}

const THEME_OPTIONS: MenuOption<'light' | 'dark' | 'system'>[] = [
  { value: 'light', label: 'Light', icon: FrameSun },
  { value: 'dark', label: 'Dark', icon: FrameMoon },
  { value: 'system', label: 'Match the computer', icon: FrameMonitor },
]

export function MenuDemo() {
  const [value, setValue] = useState<'light' | 'dark' | 'system'>('system')
  return <MenuButton label="Theme" value={value} options={THEME_OPTIONS} onChange={setValue} />
}

export function ArrowButtonDemo() {
  return (
    <div className="design-harness-system__demo-row">
      <ArrowButton>Start a prototype</ArrowButton>
      <ArrowButton tone="forest">Continue</ArrowButton>
      <ArrowButton tone="light">Open the docs</ArrowButton>
    </div>
  )
}

export function BandDemo() {
  return (
    <div className="design-harness-system__demo-stack">
      <Band kicker="Systems" title="One frame, every prototype">
        <p className="design-harness-band__text">A sand band breaks a long page into chapters.</p>
      </Band>
      <Band tone="dark" kicker="Rule" title="The frame never reaches a prototype">
        <p className="design-harness-band__text">The dark band is for the one thing people must not miss.</p>
      </Band>
    </div>
  )
}

export function CtaCardDemo() {
  return (
    <CtaCard
      title="Ready for the next screen?"
      description="Describe it in chat and the harness builds it on the right system."
      action={
        <ArrowButton tone="light" route="how-to">
          Read how
        </ArrowButton>
      }
    />
  )
}

const STUDIO_ROUTE = 'design-system/systems/harness' as DesignSystemRoute
const BRAND_ROUTE = 'design-system/systems/harness-brand' as DesignSystemRoute

export function WordmarkDemo() {
  return (
    <div className="design-harness-system__demo-row">
      <Wordmark size="lg" />
      <Wordmark />
      <Wordmark size="sm" />
    </div>
  )
}

export function HeadlineDemo() {
  return <Headline as="h1" text="Prototypes, *systems* and docs, in *one studio*." />
}

export function AnnouncementBarDemo() {
  return (
    <AnnouncementBar link="See what's new" route="how-to">
      The Harness system has new doc parts.
    </AnnouncementBar>
  )
}

export function HeroDemo() {
  const [value, setValue] = useState('')
  return (
    <Hero
      kicker="Design Harness / For designers"
      title="Design in *code*, keep the *craft*."
      lead="Prototypes on real components, design systems with live demos, and the docs the harness reads — side by side."
      actions={<ArrowButton route="playground">See the prototypes</ArrowButton>}
      media={
        <div className="design-harness-brand-demo__shot design-harness-form">
          <HomeSearch
            value={value}
            onChange={setValue}
            onSubmit={(event: FormEvent) => event.preventDefault()}
            canSubmit={Boolean(value.trim())}
            shortcuts={HOME_SHORTCUTS}
          />
        </div>
      }
    />
  )
}

export function SplitSectionDemo() {
  return (
    <SplitSection
      title="One frame, *every* prototype"
      columns={[
        'Each prototype picks a system — Mobile, Desktop, or Brand — and keeps its look. The frame around it never leaks in.',
        'Systems are plain files. Change one and every page that shows it follows: colour tables draw live swatches, components get live demos.',
      ]}
      aside={<Wordmark />}
    />
  )
}

export function FeatureRowDemo() {
  return (
    <Band tone="dark" kicker="How it works" title="From an ask to a screen.">
      <ReadMore route="how-to">Read the manual</ReadMore>
      <FeatureRow
        cells={[
          { title: 'Ask', text: 'Describe the screen in chat.', icon: FrameChat },
          { title: 'Route', text: 'The harness picks the skills that fit.', icon: FrameRoute },
          { title: 'Build', text: 'Real components, the project’s system.', icon: FrameWidgets },
          { title: 'Review', text: 'Open it here, share when ready.', icon: FrameEye },
        ]}
      />
    </Band>
  )
}

export function StatRowDemo() {
  const screens = PROJECTS.reduce((sum, project) => sum + project.screens.length, 0)
  return (
    <div>
      <StatRow
        stats={[
          { value: String(PROJECTS.length), label: 'Prototypes' },
          { value: String(screens), label: 'Screens' },
          { value: String(DESIGN_SYSTEMS.length), label: 'Systems' },
          { value: String(contextDocsOfKind('skill').length), label: 'Skills' },
        ]}
      />
      <p className="design-harness-system__note">Live counts from this repo — never made-up numbers.</p>
    </div>
  )
}

export function QuoteDemo() {
  return (
    <Quote name="Name" role="Role, team">
      A real quote from someone who uses Studio goes here — never a made-up one.
    </Quote>
  )
}

export function FaqDemo() {
  return (
    <Faq
      items={[
        {
          question: 'Does Studio change how a prototype looks?',
          answer: 'No. The frame has its own styles; each prototype keeps the look of its system.',
        },
        {
          question: 'Where do settings save?',
          answer:
            'To files in this repo — designer-profile.local.md and harness.config.local.json — so every chat reads them.',
        },
        {
          question: 'Can a prototype use our own brand?',
          answer: 'Yes, once the Brand system is set up with your logo, colours and type.',
        },
      ]}
    />
  )
}

export function CtaWithMediaDemo() {
  return (
    <CtaCard
      title="Start your next screen."
      description="Describe it in chat and the harness builds it on the right system."
      action={
        <ArrowButton tone="light" route="how-to">
          Read how
        </ArrowButton>
      }
      media={
        <div className="design-harness-brand-demo__shot">
          <ProjectCard
            route={STUDIO_ROUTE}
            title="Studio"
            badge="Platform"
            detail="The system Design Harness itself is built with."
            footer="Used by Design Harness"
            icon={FrameWidgets}
          />
        </div>
      }
    />
  )
}

export function FooterDemo() {
  return (
    <MarketingFooter
      columns={[
        {
          title: 'Studio',
          links: [
            { label: 'Prototypes', route: 'playground' },
            { label: 'Design system', route: 'design-system/systems' },
          ],
        },
        {
          title: 'Learn',
          links: [
            { label: 'Documentation', route: 'how-to' },
            { label: 'Harness brand', route: BRAND_ROUTE },
          ],
        },
      ]}
      finePrint="Design Harness runs on your machine, from this repo."
    />
  )
}

const RELEASE_NOTES_ROUTE = 'how-to/release-notes' as DesignHarnessRoute

const liveCounts = () => {
  const screens = PROJECTS.reduce((sum, project) => sum + project.screens.length, 0)
  return [
    { value: String(PROJECTS.length), label: 'prototypes in this repo' },
    { value: String(screens), label: 'screens across them' },
    { value: String(contextDocsOfKind('skill').length), label: 'skills the harness can run' },
  ]
}

export function ProductCardsDemo() {
  const project = PROJECTS[0]
  return (
    <ProductCards
      cards={[
        {
          title: 'Prototypes',
          text: "Real components on the project's system, opened right here.",
          route: 'playground',
          ui: project ? (
            <ProjectCard
              route={project.route}
              title={project.title}
              detail={project.facts.platform}
              footer={`${project.screens.length} screens`}
              icon={FrameWidgets}
            />
          ) : null,
        },
        {
          title: 'Systems',
          text: 'Tokens, components and rules for each kind of prototype.',
          route: 'design-system/systems',
        },
        {
          title: 'Documentation',
          text: 'Guides, and the skills the harness reads.',
          route: 'how-to',
          ui: <Callout tone="info">Start a quote with [!NOTE] to make a callout.</Callout>,
        },
        {
          title: 'Settings',
          text: 'Saved to files in this repo, so every chat reads them.',
          route: 'settings',
        },
      ]}
    />
  )
}

export function BenefitColumnsDemo() {
  return (
    <BenefitColumns
      items={[
        { title: 'Start from a sentence', text: 'Describe the screen in chat. The harness picks the skills that fit.' },
        { title: 'Stay on the system', text: "Every prototype uses its system's tokens and components." },
        { title: 'See it live', text: 'Demos on every system page run the real components.' },
        { title: 'Keep it in the repo', text: 'Settings, briefs and logs are plain files you can read.' },
      ]}
    />
  )
}

export function IconFeaturesDemo() {
  return (
    <IconFeatures
      items={[
        {
          icon: FrameBolt,
          title: 'Runs on your machine',
          text: 'Design Harness is a local app in this repo. Nothing to deploy.',
        },
        { icon: FrameKey, title: 'Nothing new to learn', text: 'Ask in chat, then open the result here.' },
        { icon: FrameChart, title: 'Grows with your systems', text: 'Add a system file and it gets its own pages.' },
      ]}
    />
  )
}

export function QuoteBandDemo() {
  return <QuoteBand brief="A designer at their desk, the harness on screen." />
}

export function BigStatsDemo() {
  return (
    <BigStats
      intro={
        <>
          <p>Prototypes, systems and docs live in one repo.</p>
          <p>These numbers are counted from it each time the page loads.</p>
        </>
      }
      stats={liveCounts()}
    />
  )
}

export function HeroStatsDemo() {
  return (
    <HeroStats
      title="Prototypes, *systems* and docs, in one studio."
      lead="Design in code on real components, with the docs the harness reads beside them."
      action={<ArrowButton route="playground">See the prototypes</ArrowButton>}
      stats={liveCounts()}
      logos={<LogoStrip count={6} />}
    />
  )
}

export function NewsroomDemo() {
  return (
    <NewsMosaic
      items={RELEASE_NOTE_ENTRIES.slice(0, 5).map((note) => ({
        date: note.date,
        title: note.title,
        brief: 'Screenshot of the change.',
        route: RELEASE_NOTES_ROUTE,
      }))}
    />
  )
}

export function StoryCardsDemo() {
  return (
    <StoryCards
      stories={[
        { tag: 'Prototypes', brief: 'Portrait of the designer.' },
        { tag: 'Systems', brief: 'Portrait of the designer.' },
        { tag: 'Docs', brief: 'Portrait of the designer.' },
      ]}
    />
  )
}

export function LogoGridDemo() {
  return <LogoGrid count={10} />
}

export function IntroTourDemo() {
  return <ArrowButton onClick={showHarnessIntro}>Open the tour</ArrowButton>
}

const TAB_DEMO = [
  { value: 'manual', label: 'Manual', text: 'Guides for each thing you can ask the harness to do.' },
  { value: 'notes', label: 'Release notes', text: 'What changed in the harness, newest first.' },
  { value: 'start', label: 'Start here', text: 'The short path for someone opening the harness for the first time.' },
]

export function TabsDemo() {
  const id = useId()
  const [value, setValue] = useState(TAB_DEMO[0].value)
  return (
    <>
      <Tabs id={id} label="Documentation sections" items={TAB_DEMO} value={value} onChange={setValue} />
      <p className="design-harness-system__note" {...tabsPanelProps(id, value)}>
        {TAB_DEMO.find((tab) => tab.value === value)?.text}
      </p>
    </>
  )
}

export function IconButtonDemo() {
  const [dark, setDark] = useState(false)
  return (
    <div className="design-harness-system__demo-row">
      <IconButton label="Search the harness">
        <Icon icon={FrameSearch} size="sm" />
      </IconButton>
      <IconButton label="Settings" active>
        <Icon icon={FrameSettings} size="sm" />
      </IconButton>
      <IconButton
        label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        aria-pressed={dark}
        onClick={() => setDark((on) => !on)}
      >
        <Icon icon={dark ? FrameSun : FrameMoon} size="sm" />
      </IconButton>
    </div>
  )
}

export function DocActionsDemo() {
  return (
    <div className="design-harness-system__demo-row">
      <CopyAction text="harness/skills/ui-agent/SKILL.md" label="Copy path" />
      <DocAction icon={FrameDownload} onClick={() => downloadText('example.md', '# Example\n')}>
        Download
      </DocAction>
    </div>
  )
}

export function DesignerAvatarDemo() {
  const designer = getVisibleGalleryDesigners()[0]
  if (!designer) return <p>No designers in the gallery yet.</p>
  return (
    <div className="design-harness-system__demo-row">
      <DesignerAvatar designer={designer} small />
      <DesignerAvatar designer={designer} />
      <DesignerAvatar designer={designer} large />
      <DesignerAvatar designer={{ ...designer, avatarUrl: undefined }} />
    </div>
  )
}

export function ScreenEmbedDemo() {
  const screen = PROJECTS.find((project) => project.screens.length)?.screens[0]
  return screen ? <ScreenEmbed screen={screen} /> : <p>No project screens yet.</p>
}

const DIAGRAM = `flowchart LR
  ask[Ask in chat] --> route{Matches a skill?}
  route -- yes --> plan[Show the plan] --> run[Run the skill]
  route -- no --> fallback[Say so and ask]`

export function DiagramFrameDemo() {
  return <MermaidDiagram source={DIAGRAM} label="How a request is routed" />
}

export function LogoStripDemo() {
  return <LogoStrip count={6} />
}
