import { Fragment, useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { FrameArrowRight, FrameChevronRight, FrameCursorPointer, FramePerson } from '../harnessIcons'
import { HARNESS_NAME } from '../harnessSettings'
import { markHarnessIntroSeen, SHOW_HARNESS_INTRO_EVENT } from '../harnessIntro'
import { Button, Icon, Tabs, tabsPanelProps } from '../ui'

/** A wireframe window: a title bar, then labelled rows or plain lines. */
function Sketch({
  title,
  rows = [],
  lines = 0,
  thumb = false,
  swatches = false,
  tag,
  pointer = false,
}: {
  title: string
  rows?: string[]
  lines?: number
  thumb?: boolean
  swatches?: boolean
  tag?: string
  pointer?: boolean
}) {
  return (
    <div className="design-harness-intro__sketch">
      <p className="design-harness-intro__sketch-title">{title}</p>
      <div className="design-harness-intro__sketch-body">
        {thumb ? <span className="design-harness-intro__sketch-thumb" /> : null}
        <div className="design-harness-intro__sketch-content">
          {swatches ? (
            <span className="design-harness-intro__sketch-swatches">
              <span />
              <span />
              <span />
            </span>
          ) : null}
          {rows.map((row) => (
            <span key={row} className="design-harness-intro__sketch-row">
              {row}
            </span>
          ))}
          {Array.from({ length: lines }, (_, index) => (
            <span key={index} className="design-harness-intro__sketch-line" />
          ))}
          {tag ? <span className="design-harness-intro__sketch-tag">{tag}</span> : null}
        </div>
      </div>
      {pointer ? (
        <span className="design-harness-intro__pointer">
          <Icon icon={FrameCursorPointer} size="md" />
        </span>
      ) : null}
    </div>
  )
}

function Scene({ children }: { children: ReactNode }) {
  return (
    <div className="design-harness-intro__scene" aria-hidden>
      {children}
    </div>
  )
}

function Flow({ from, to }: { from: ReactNode; to: ReactNode }) {
  return (
    <Scene>
      {from}
      <span className="design-harness-intro__arrow">
        <Icon icon={FrameArrowRight} size="md" />
      </span>
      {to}
    </Scene>
  )
}

type Tab = { label: string; art: ReactNode; text: string }
type Step = { title: string; art?: ReactNode; text?: string; tabs?: Tab[] }

const STEPS: Step[] = [
  {
    title: `Welcome to ${HARNESS_NAME}`,
    art: (
      <Scene>
        <Sketch title="Your agent" rows={["Let's explore an idea."]} lines={2} />
        <Sketch title={HARNESS_NAME} thumb lines={3} pointer />
      </Scene>
    ),
    text: 'A quick tour: make the harness yours, shape your first prototype, get feedback, and share the work.',
  },
  {
    title: 'Make it yours',
    tabs: [
      {
        label: 'Design system',
        art: (
          <Flow
            from={<Sketch title="Your toolkit" swatches rows={['Button']} />}
            to={<Sketch title="Your prototype" thumb lines={3} />}
          />
        ),
        text: "Prototypes use real tokens and components. Ask your agent to bring in your team's Figma variables and components.",
      },
      {
        label: 'Company context',
        art: (
          <Flow
            from={<Sketch title="Company pack" rows={['Voice', 'Vocabulary', 'Squads']} />}
            to={<Sketch title="Every skill" lines={3} />}
          />
        ),
        text: 'The company pack tells every skill how your company talks, works, and who owns what. Ask your agent to build your org-pack.',
      },
      {
        label: 'Skills',
        art: (
          <Flow
            from={<Sketch title="Ask in plain words" rows={['Critique this flow']} />}
            to={<Sketch title="Skill" rows={['ux-pattern', 'content']} />}
          />
        ),
        text: 'Skills are the playbooks your agent follows. Ask in plain words and the harness picks the right one, then shows you the plan.',
      },
    ],
  },
  {
    title: 'Start with a brief',
    art: (
      <Flow
        from={<Sketch title="brief.md" rows={['The problem', "Who it's for", 'What we want to learn']} />}
        to={<Sketch title="Your project" thumb lines={2} tag="brief.md" />}
      />
    ),
    text: 'Ask your agent to start a project. It checks what already exists and drafts a brief that stays as context for everything after.',
  },
  {
    title: 'Give your idea shape',
    tabs: [
      {
        label: 'Breadboard',
        art: (
          <Flow
            from={<Sketch title="Places" rows={['Checkout', 'Add tip', 'Pay']} />}
            to={<Sketch title="breadboard.md" lines={3} />}
          />
        ),
        text: 'Map places, actions, and where they lead in plain text, before any pixels.',
      },
      {
        label: 'Prototype',
        art: (
          <Scene>
            <Sketch title="Feedback inbox" thumb lines={3} pointer />
          </Scene>
        ),
        text: 'Click through screens built from your design system, then refine them with your agent.',
      },
      {
        label: 'Storyboard',
        art: (
          <Scene>
            <Sketch title="Step 1" lines={2} />
            <Sketch title="Step 2" lines={2} />
            <Sketch title="Step 3" lines={2} />
          </Scene>
        ),
        text: 'Lay screens out in order to show how the whole journey hangs together.',
      },
    ],
  },
  {
    title: 'Get feedback',
    tabs: [
      {
        label: 'Critique',
        art: (
          <Flow
            from={<Sketch title="Figma or screenshot" thumb lines={2} />}
            to={<Sketch title="findings.md" rows={['First look', 'What to fix']} />}
          />
        ),
        text: "Share a Figma link or a screenshot and ask for a critique. Findings land in the project's findings file.",
      },
      {
        label: 'Audit',
        art: (
          <Flow
            from={<Sketch title="Your prototype" thumb lines={2} />}
            to={<Sketch title="Audit" rows={['Tokens', 'Accessibility', 'Copy']} />}
          />
        ),
        text: 'Before you share, the audit checks tokens, accessibility, and copy, so feedback is about the idea.',
      },
    ],
  },
  {
    title: 'Build together',
    tabs: [
      {
        label: 'Share the repo',
        art: (
          <Scene>
            <span className="design-harness-intro__person">
              <Icon icon={FramePerson} size="xl" />
            </span>
            <span className="design-harness-intro__link" />
            <Sketch title="Shared source" rows={['Code', 'Context', 'Projects']} />
            <span className="design-harness-intro__link" />
            <span className="design-harness-intro__person">
              <Icon icon={FramePerson} size="xl" />
            </span>
          </Scene>
        ),
        text: 'Push the repo yourself when teammates should have the work. The harness does not push it.',
      },
      {
        label: 'Publish',
        art: (
          <Flow
            from={<Sketch title="Your project" thumb lines={2} />}
            to={<Sketch title="Share link" rows={['Anyone with the link']} />}
          />
        ),
        text: 'Ask your agent to publish a project when you want a link anyone can open.',
      },
    ],
  },
  {
    title: 'Start exploring',
    art: (
      <Scene>
        <Sketch title="Prototypes" thumb lines={3} pointer />
        <Sketch title="Systems" swatches lines={2} />
      </Scene>
    ),
    text: 'Your prototypes, systems, and docs are all here. Press ⌘⌫ (Ctrl+Backspace on Windows) to open the command center, or ask your agent to start something new. You can replay this tour from Settings.',
  },
]

function StepTabs({ title, tabs }: { title: string; tabs: Tab[] }) {
  const id = useId()
  const [active, setActive] = useState(tabs[0].label)
  const tab = tabs.find((item) => item.label === active) ?? tabs[0]

  return (
    <>
      <Tabs
        id={id}
        label={title}
        items={tabs.map((item) => ({ value: item.label, label: item.label }))}
        value={active}
        onChange={setActive}
        className="design-harness-intro__tabs"
        tabClassName="design-harness-intro__tab"
      />
      <div className="design-harness-intro__card" {...tabsPanelProps(id, active)}>
        {tab.art}
        <p className="design-harness-intro__text">{tab.text}</p>
      </div>
    </>
  )
}

/** First-run tour of the harness. A native modal `<dialog>` owns focus and Escape; closing it in any way marks it seen. */
export function HarnessIntro({ defaultOpen }: { defaultOpen: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const [open, setOpen] = useState(defaultOpen)
  const [index, setIndex] = useState(0)
  const step = STEPS[index]
  const last = index === STEPS.length - 1

  useEffect(() => {
    const show = () => {
      setIndex(0)
      setOpen(true)
    }
    window.addEventListener(SHOW_HARNESS_INTRO_EVENT, show)
    return () => window.removeEventListener(SHOW_HARNESS_INTRO_EVENT, show)
  }, [])

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])

  const close = () => dialog.current?.close()

  return (
    <dialog
      ref={dialog}
      className="design-harness-intro"
      aria-labelledby={titleId}
      onClose={() => {
        markHarnessIntroSeen()
        setOpen(false)
      }}
    >
      <div className="design-harness-intro__panel design-harness-form">
        <ol className="design-harness-intro__progress" aria-label={`Step ${index + 1} of ${STEPS.length}`}>
          {STEPS.map((item, dot) => (
            <li
              key={item.title}
              className="design-harness-intro__dot"
              data-state={dot === index ? 'current' : dot < index ? 'done' : 'next'}
            />
          ))}
        </ol>
        <h2 id={titleId} className="design-harness-intro__title" aria-live="polite">
          {step.title}
        </h2>
        {step.tabs ? (
          <StepTabs key={index} title={step.title} tabs={step.tabs} />
        ) : (
          <Fragment key={index}>
            {step.art}
            <p className="design-harness-intro__text">{step.text}</p>
          </Fragment>
        )}
        <footer className="design-harness-intro__actions">
          <Button type="button" intent="ghost" size="md" onClick={close}>
            Skip introduction
          </Button>
          <span className="design-harness-intro__nav">
            {index > 0 ? (
              <Button
                type="button"
                intent="ghost"
                size="md"
                onClick={() => {
                  setIndex(index - 1)
                  if (index === 1) {
                    requestAnimationFrame(() =>
                      dialog.current?.querySelector<HTMLButtonElement>('.design-harness-intro__nav button')?.focus(),
                    )
                  }
                }}
              >
                Back
              </Button>
            ) : null}
            <Button
              type="button"
              intent="primary"
              size="md"
              endIcon={last ? undefined : <Icon icon={FrameChevronRight} size="sm" />}
              onClick={() => (last ? close() : setIndex(index + 1))}
            >
              {index === 0 ? 'Show me around' : last ? 'Explore the harness' : 'Next'}
            </Button>
          </span>
        </footer>
      </div>
    </dialog>
  )
}
