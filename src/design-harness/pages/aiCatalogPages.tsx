import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import {
  IconBooks,
  IconBuildingStore,
  IconCalendar,
  IconCopy,
  IconFile,
  IconFolder,
  IconHistory,
  IconHome,
  IconMail,
  IconMessage,
  IconPencil,
  IconPhone,
  IconPhoto,
  IconPlus,
  IconSparkles,
  IconUser,
  IconWorld,
} from '@tabler/icons-react'
import {
  Activity,
  Chip,
  ContextMenu,
  ContextMenuItem,
  Conversation,
  Icon,
  Message,
  NavBarHeader,
  PromptInput,
  Reasoning,
  Response,
  Result,
  Sheet,
  SheetAction,
  SheetMenu,
  SourceList,
  Text,
  ThisOrThat,
  ToolCall,
  Working,
  usePresence,
} from '../../../context/design-system/ds'
import type { TablerIconComponent } from '../../../context/design-system/ds'
import { CatalogGuidanceNote, DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { DesktopShell } from '../shared/DesktopShell'
import { PhoneShell } from '../shared/PhoneShell'
import studio from '../assets/examples/example-studio.jpg'
import hands from '../assets/examples/example-hands.jpg'
import tools from '../assets/examples/example-tools.jpg'
import calendar from '../assets/examples/example-calendar.jpg'

const DRAFT = `Hi Maya — Thursday at 2:00 PM is free.
Your $86 deposit stays on the booking.`

const SUGGESTIONS = ['Move it to Thursday at 2:00', 'Tell Maya the deposit stays', 'Leave Tuesday as it is']

type ToolStatus = 'running' | 'done'

type Turn = {
  id: string
  from: 'user' | 'agent'
  text: string
  reasoning?: string
  tool?: { label: string; duration?: string; status: ToolStatus }
  done?: boolean
  suggestions?: string[]
  code?: string
}

const STARTER: Turn[] = [
  { id: 'q', from: 'user', text: 'Can Maya still change Tuesday’s colour?' },
  {
    id: 'a',
    from: 'agent',
    text: 'Yes. Tuesday’s colour is inside the 24-hour window, so Maya can move it to Thursday at 2:00 PM. The $86 deposit stays on the booking.',
    reasoning: 'Tuesday’s colour is still inside the window.',
    tool: { label: 'Looked up Tuesday’s colour', duration: '600ms', status: 'done' },
    done: true,
    code: DRAFT,
    suggestions: SUGGESTIONS,
  },
]

type MenuId = 'sources' | 'connectors' | 'clients' | 'message'

const SOURCES: { label: string; detail: string; icon: TablerIconComponent }[] = [
  { label: 'Photos', detail: 'Pick from the library', icon: IconPhoto },
  { label: 'Files', detail: 'A PDF or a screenshot', icon: IconFile },
  { label: 'Use skills', detail: 'Run a skill on this', icon: IconSparkles },
  { label: 'Recent tasks', detail: 'Continue something recent', icon: IconHistory },
  { label: 'Library', detail: 'Saved notes and files', icon: IconBooks },
  { label: 'Local files', detail: 'From this computer', icon: IconFolder },
]

const CONNECTORS: { label: string; detail: string; icon: TablerIconComponent }[] = [
  { label: 'Phone', detail: 'Call or text the client', icon: IconPhone },
  { label: 'Email', detail: 'Write from the studio', icon: IconMail },
  { label: 'Calendar', detail: 'Times that are free', icon: IconCalendar },
  { label: 'Browser', detail: 'A page the client sent', icon: IconWorld },
]

const CLIENTS = ['Maya Chen', 'Jordan Hale']

function CatalogPage({
  title,
  lead,
  wide = false,
  children,
}: {
  title: string
  lead: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className={wide ? 'design-harness-ds-page design-harness-ds-page--wide' : 'design-harness-ds-page'}>
      <DesignHarnessDocPage title={title} lead={lead}>
        <CatalogGuidanceNote />
        {children}
      </DesignHarnessDocPage>
    </div>
  )
}

function pointerMotion(event: MouseEvent<HTMLButtonElement>) {
  return event.detail !== 0
}

export function MessagePage() {
  const [retried, setRetried] = useState(false)
  const [notice, setNotice] = useState('')
  return (
    <CatalogPage
      title="Message"
      lead="One turn. A person is a bubble at the end of the row. An agent is flow, with no header."
    >
      <div className="ds-ai-stage">
        <p className="ds-ai-caption">A thread</p>
        <Conversation>
          <Message
            from="user"
            actions="inline"
            onEdit={() => setNotice('Editing the message.')}
            onCopy={() => {
              void navigator.clipboard?.writeText('Can Maya still change Tuesday’s colour?')
              setNotice('Copied.')
            }}
          >
            Can Maya still change Tuesday’s colour?
          </Message>
          <Message from="agent">
            <Reasoning summary="Thought for 4s">Checking Tuesday’s colour.</Reasoning>
            <ToolCall label="Looked up Tuesday’s colour" duration="600ms" />
            <Response status="completed">
              Yes. The colour is inside the 24-hour window, and Thursday at 2:00 PM is free.
            </Response>
          </Message>
        </Conversation>
        {notice ? <p className="ds-ai-caption">{notice}</p> : null}
        <p className="ds-ai-caption">A message that failed to send</p>
        <Message from="user" status={retried ? 'sent' : 'failed'} onRetry={() => setRetried(true)}>
          Send Maya the new time.
        </Message>
        <p className="ds-ai-caption">A turn that failed</p>
        <Message from="agent" status="failed" time="2:05 PM">
          The booking service stopped answering after 30 seconds.
        </Message>
      </div>
    </CatalogPage>
  )
}

export function ConversationPage() {
  return (
    <CatalogPage title="Conversation" lead="The thread. Person turns and agent turns stack in one log.">
      <div className="ds-ai-stage">
        <Conversation>
          <Message from="user">Can Maya still change Tuesday’s colour?</Message>
          <Message from="agent">
            <Response status="completed">
              Yes. Thursday at 2:00 PM is free, and the $86 deposit stays on the booking.
            </Response>
          </Message>
        </Conversation>
      </div>
    </CatalogPage>
  )
}

export function ResponsePage() {
  const [copied, setCopied] = useState(false)
  return (
    <CatalogPage title="Response" lead="The answer: prose, a drafted note, and follow-ups.">
      <div className="ds-ai-stage">
        <Response
          status="completed"
          code={DRAFT}
          codeLabel="Note to Maya"
          onCopy={() => {
            void navigator.clipboard?.writeText(DRAFT)
            setCopied(true)
          }}
          suggestions={SUGGESTIONS.map((label) => ({ label }))}
        >
          <p>Yes. Tuesday’s colour is inside the 24-hour window, so Maya can move it to Thursday at 2:00 PM.</p>
          <ul>
            <li>Thursday at 2:00 PM is free.</li>
            <li>The $86 deposit stays on the booking.</li>
          </ul>
        </Response>
        {copied ? <p className="ds-ai-caption">Copied.</p> : null}
      </div>
    </CatalogPage>
  )
}

export function ReasoningPage() {
  return (
    <CatalogPage
      title="Reasoning"
      lead="A collapsed trail. Open it when someone wants to see how the answer was reached."
    >
      <div className="ds-ai-stage">
        <Reasoning summary="Thought for 4s">Checking Tuesday’s colour against the 24-hour window.</Reasoning>
        <Reasoning summary="Worked for 9s" defaultOpen>
          Looked up the booking, then checked Thursday at 2:00 PM.
        </Reasoning>
      </div>
    </CatalogPage>
  )
}

export function ToolCallPage() {
  return (
    <CatalogPage title="Tool call" lead="One step. Done, still running, a warning, or a failure.">
      <div className="ds-ai-stage">
        <ToolCall label="Looked up Tuesday’s colour" duration="600ms" status="done" />
        <ToolCall label="Checking Thursday at 2:00 PM" status="running" />
        <ToolCall label="Calendar was slow" detail="Retried once" duration="1.7s" status="warning" />
        <ToolCall label="Couldn’t reach the booking service" status="failed" />
      </div>
    </CatalogPage>
  )
}

export function ActivityPage() {
  return (
    <CatalogPage
      title="Activity"
      lead="The steps in a run, in order. This is the agent’s work, not the wallet activity list."
    >
      <div className="ds-ai-stage">
        <Activity label="Checking Maya’s booking">
          <ToolCall label="Read the booking" duration="0.4s" status="done" />
          <ToolCall label="Looked up Tuesday’s colour" duration="600ms" status="done" />
          <ToolCall label="Checked Thursday at 2:00 PM" status="running" />
        </Activity>
      </div>
    </CatalogPage>
  )
}

export function PromptInputPage() {
  const [recording, setRecording] = useState(true)
  return (
    <CatalogPage
      title="Prompt input"
      lead="The composer. Context sits above the field. Add, connectors, and voice sit on the bar."
    >
      <div className="ds-ai-stage">
        <p className="ds-ai-caption">Ready to send</p>
        <PromptInput
          defaultValue="Can Maya still change Tuesday’s colour?"
          context={
            <>
              <Chip size="sm" selected startIcon={<Icon icon={IconBuildingStore} size="xs" />}>
                Studio
              </Chip>
              <Chip size="sm" startIcon={<Icon icon={IconUser} size="xs" />}>
                Maya Chen
              </Chip>
            </>
          }
        />
        <p className="ds-ai-caption">More than one line</p>
        <PromptInput defaultValue="Can Maya still change Tuesday’s colour? Thursday at 2:00 PM is free, and the $86 deposit stays on the booking." />
        <p className="ds-ai-caption">Recording</p>
        <PromptInput
          recording={recording}
          onVoice={() => setRecording(true)}
          onCancelRecording={() => setRecording(false)}
          onConfirmRecording={() => setRecording(false)}
        />
        <p className="ds-ai-caption">No clients yet</p>
        <ContextMenu label="Clients">
          <p className="ds-menu__note">No clients yet</p>
          <ContextMenuItem icon={<Icon icon={IconPlus} size="sm" />}>New client</ContextMenuItem>
        </ContextMenu>
      </div>
    </CatalogPage>
  )
}

function AgentTurn({
  turn,
  layout,
  onSuggest,
  onEdit,
  onCopy,
  onOpenActions,
}: {
  turn: Turn
  layout: 'phone' | 'desktop'
  onSuggest: (label: string) => void
  onEdit: (text: string) => void
  onCopy: (text: string) => void
  onOpenActions: (text: string) => void
}) {
  if (turn.from === 'user') {
    return (
      <Message
        from="user"
        actions={layout === 'phone' ? 'menu' : 'inline'}
        onEdit={() => onEdit(turn.text)}
        onCopy={() => onCopy(turn.text)}
        onOpenActions={() => onOpenActions(turn.text)}
      >
        {turn.text}
      </Message>
    )
  }
  const working = turn.tool?.status === 'running' && !turn.text
  return (
    <Message from="agent">
      {working ? <Working steps={['Checking the booking', 'Looking at Thursday']} /> : null}
      {turn.reasoning ? <Reasoning summary="Thought for 4s">{turn.reasoning}</Reasoning> : null}
      {turn.tool && !working ? (
        <ToolCall label={turn.tool.label} duration={turn.tool.duration} status={turn.tool.status} />
      ) : null}
      {turn.text ? (
        <Response
          status={turn.done ? 'completed' : undefined}
          code={turn.code}
          codeLabel="Note to Maya"
          suggestions={turn.suggestions?.map((label) => ({ label, onSelect: () => onSuggest(label) }))}
        >
          {turn.text}
        </Response>
      ) : null}
    </Message>
  )
}

function AgentThread({ layout }: { layout: 'phone' | 'desktop' }) {
  const [turns, setTurns] = useState<Turn[]>(STARTER)
  const [draft, setDraft] = useState('')
  const [recording, setRecording] = useState(false)
  const [panel, setPanel] = useState<MenuId | null>(null)
  const [motion, setMotion] = useState(true)
  const [client, setClient] = useState('Maya Chen')
  const [messageText, setMessageText] = useState('')
  const [source, setSource] = useState<string | null>(null)
  const [connector, setConnector] = useState<string | null>(null)
  const presence = usePresence(panel !== null, motion)
  const endRef = useRef<HTMLDivElement>(null)
  const seen = useRef(turns.length)

  useEffect(() => {
    if (turns.length === seen.current) return
    seen.current = turns.length
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [turns])

  useEffect(() => {
    const pending = turns.find((turn) => turn.tool?.status === 'running')
    if (!pending) return
    const timer = window.setTimeout(() => {
      setTurns((current) =>
        current.map((turn) =>
          turn.id === pending.id
            ? {
                ...turn,
                text: 'Done. I left a note on Maya’s booking.',
                done: true,
                tool: { label: 'Checked the booking', duration: '600ms', status: 'done' },
              }
            : turn,
        ),
      )
    }, 900)
    return () => window.clearTimeout(timer)
  }, [turns])

  function closePanel(event?: MouseEvent<HTMLButtonElement>) {
    if (event) setMotion(pointerMotion(event))
    setPanel(null)
  }

  function togglePanel(event: MouseEvent<HTMLButtonElement>, next: MenuId) {
    setMotion(pointerMotion(event))
    setPanel((current) => (current === next ? null : next))
  }

  function send(text: string) {
    const id = `${Date.now()}`
    setTurns((current) => [
      ...current,
      { id: `${id}-q`, from: 'user', text },
      {
        id: `${id}-a`,
        from: 'agent',
        text: '',
        tool: { label: 'Checking the booking', status: 'running' },
      },
    ])
    setDraft('')
    setRecording(false)
  }

  const context = (
    <>
      <Chip size="sm" selected startIcon={<Icon icon={IconBuildingStore} size="xs" />}>
        Studio
      </Chip>
      <Chip size="sm" startIcon={<Icon icon={IconUser} size="xs" />} onClick={(event) => togglePanel(event, 'clients')}>
        {client}
      </Chip>
      {source ? (
        <Chip size="sm" onClick={() => setSource(null)}>
          {source}
        </Chip>
      ) : null}
      {connector ? (
        <Chip size="sm" onClick={() => setConnector(null)}>
          {connector}
        </Chip>
      ) : null}
    </>
  )

  const prompt = (
    <div className="ds-prompt-dock">
      {layout === 'desktop' && presence.mounted ? (
        <div
          className="ds-menu-pop ds-prompt-dock__menu"
          data-state={presence.state}
          data-motion={motion ? undefined : 'off'}
          onAnimationEnd={presence.onAnimationEnd}
        >
          <ThreadMenu
            panel={panel}
            onPick={(event, kind, label) => {
              setMotion(pointerMotion(event))
              if (kind === 'sources') setSource(label)
              if (kind === 'connectors') setConnector(label)
              if (kind === 'clients') setClient(label)
              setPanel(null)
            }}
          />
        </div>
      ) : null}
      <PromptInput
        value={draft}
        onValueChange={setDraft}
        onSubmit={send}
        recording={recording}
        onVoice={() => setRecording(true)}
        onCancelRecording={() => setRecording(false)}
        onConfirmRecording={() => {
          setRecording(false)
          setDraft('Move Tuesday’s colour to Thursday afternoon.')
        }}
        onAttach={(event) => togglePanel(event, 'sources')}
        onConnectors={(event) => togglePanel(event, 'connectors')}
        context={context}
      />
    </div>
  )

  const thread = (
    <Conversation label="Bookings assistant">
      {turns.map((turn) => (
        <AgentTurn
          key={turn.id}
          turn={turn}
          layout={layout}
          onSuggest={setDraft}
          onEdit={setDraft}
          onCopy={(text) => void navigator.clipboard?.writeText(text)}
          onOpenActions={(text) => {
            setMotion(true)
            setMessageText(text)
            setPanel('message')
          }}
        />
      ))}
      <div ref={endRef} />
    </Conversation>
  )

  if (layout === 'phone') {
    return (
      <PhoneShell>
        <div className="ds-pattern">
          <NavBarHeader title="Assistant" subtitle="Bookings" />
          <div className="ds-pattern__body">
            <div className="ds-thread">{thread}</div>
          </div>
          <div className="ds-pattern__bar">{prompt}</div>
          {presence.mounted ? (
            <div
              className="ds-pattern__overlay"
              data-state={presence.state}
              data-motion={motion ? undefined : 'off'}
              onAnimationEnd={presence.onAnimationEnd}
            >
              <button type="button" className="ds-pattern__scrim" aria-label="Close" onClick={closePanel} />
              <Sheet variant="action" cancelLabel="Cancel" onCancel={closePanel}>
                <ThreadSheet
                  panel={panel}
                  onPick={(event, kind, label) => {
                    setMotion(pointerMotion(event))
                    if (kind === 'sources') setSource(label)
                    if (kind === 'connectors') setConnector(label)
                    if (kind === 'clients') setClient(label)
                    setPanel(null)
                  }}
                  onMessage={(event, action) => {
                    setMotion(pointerMotion(event))
                    if (action === 'edit') setDraft(messageText)
                    if (action === 'copy') void navigator.clipboard?.writeText(messageText)
                    setPanel(null)
                  }}
                />
              </Sheet>
            </div>
          ) : null}
        </div>
      </PhoneShell>
    )
  }

  return (
    <DesktopShell
      url="app/assistant"
      tabs={[
        { id: 'today', label: 'Today', icon: <Icon icon={IconHome} size="md" />, active: false, onClick: () => {} },
        {
          id: 'calendar',
          label: 'Calendar',
          icon: <Icon icon={IconCalendar} size="md" />,
          active: false,
          onClick: () => {},
        },
        { id: 'clients', label: 'Clients', icon: <Icon icon={IconUser} size="md" />, active: false, onClick: () => {} },
        {
          id: 'assistant',
          label: 'Assistant',
          icon: <Icon icon={IconMessage} size="md" />,
          active: true,
          onClick: () => {},
        },
      ]}
    >
      <div className="ds-thread-desktop">
        <div className="ds-thread-desktop__scroll">
          <div className="ds-thread-desktop__column">{thread}</div>
        </div>
        <div className="ds-thread-desktop__dock">{prompt}</div>
      </div>
    </DesktopShell>
  )
}

function ThreadMenu({
  panel,
  onPick,
}: {
  panel: MenuId | null
  onPick: (event: MouseEvent<HTMLButtonElement>, kind: MenuId, label: string) => void
}) {
  if (panel === 'clients') {
    return (
      <ContextMenu label="Clients">
        {CLIENTS.map((label) => (
          <ContextMenuItem
            key={label}
            icon={<Icon icon={IconUser} size="sm" />}
            onClick={(event) => onPick(event, 'clients', label)}
          >
            {label}
          </ContextMenuItem>
        ))}
        <ContextMenuItem
          icon={<Icon icon={IconPlus} size="sm" />}
          onClick={(event) => onPick(event, 'clients', 'New client')}
        >
          New client
        </ContextMenuItem>
      </ContextMenu>
    )
  }
  const rows = panel === 'connectors' ? CONNECTORS : SOURCES
  const kind: MenuId = panel === 'connectors' ? 'connectors' : 'sources'
  return (
    <ContextMenu label={kind === 'connectors' ? 'Connectors' : 'Add'}>
      {rows.map((row) => (
        <ContextMenuItem
          key={row.label}
          icon={<Icon icon={row.icon} size="sm" />}
          detail={row.detail}
          onClick={(event) => onPick(event, kind, row.label)}
        >
          {row.label}
        </ContextMenuItem>
      ))}
      {kind === 'connectors' ? (
        <ContextMenuItem
          icon={<Icon icon={IconPlus} size="sm" />}
          onClick={(event) => onPick(event, 'connectors', 'Add connector')}
        >
          Add connector
        </ContextMenuItem>
      ) : null}
    </ContextMenu>
  )
}

function ThreadSheet({
  panel,
  onPick,
  onMessage,
}: {
  panel: MenuId | null
  onPick: (event: MouseEvent<HTMLButtonElement>, kind: MenuId, label: string) => void
  onMessage: (event: MouseEvent<HTMLButtonElement>, action: 'edit' | 'copy') => void
}) {
  if (panel === 'message') {
    return (
      <SheetMenu caption="Message">
        <SheetAction
          label="Edit"
          description="Put it back in the field"
          icon={<Icon icon={IconPencil} size="sm" />}
          onClick={(event) => onMessage(event, 'edit')}
        />
        <SheetAction
          label="Copy"
          description="Copy the message"
          icon={<Icon icon={IconCopy} size="sm" />}
          onClick={(event) => onMessage(event, 'copy')}
        />
      </SheetMenu>
    )
  }
  if (panel === 'clients') {
    return (
      <SheetMenu caption="Clients">
        {CLIENTS.map((label) => (
          <SheetAction
            key={label}
            label={label}
            icon={<Icon icon={IconUser} size="sm" />}
            onClick={(event) => onPick(event, 'clients', label)}
          />
        ))}
        <SheetAction
          label="New client"
          icon={<Icon icon={IconPlus} size="sm" />}
          onClick={(event) => onPick(event, 'clients', 'New client')}
        />
      </SheetMenu>
    )
  }
  const rows = panel === 'connectors' ? CONNECTORS : SOURCES
  const kind: MenuId = panel === 'connectors' ? 'connectors' : 'sources'
  return (
    <SheetMenu caption={kind === 'connectors' ? 'Connectors' : 'Add'}>
      {rows.map((row) => (
        <SheetAction
          key={row.label}
          label={row.label}
          description={row.detail}
          icon={<Icon icon={row.icon} size="sm" />}
          onClick={(event) => onPick(event, kind, row.label)}
        />
      ))}
      {kind === 'connectors' ? (
        <SheetAction
          label="Add connector"
          icon={<Icon icon={IconPlus} size="sm" />}
          onClick={(event) => onPick(event, 'connectors', 'Add connector')}
        />
      ) : null}
    </SheetMenu>
  )
}

export function ConversationScreenPage() {
  return (
    <CatalogPage
      wide
      title="Conversation screen"
      lead="The same thread on the phone and in the window. Add and connectors open a sheet on the phone, and a menu on the desktop."
    >
      <div className="ds-ai-frames">
        <div className="ds-pattern-stage">
          <div>
            <Text variant="label">Phone</Text>
            <AgentThread layout="phone" />
          </div>
        </div>
        <div>
          <Text variant="label">Desktop</Text>
          <AgentThread layout="desktop" />
        </div>
      </div>
    </CatalogPage>
  )
}

const LOOKS = [
  { id: 'warm', label: 'Warm', image: studio, alt: 'A studio in warm light' },
  { id: 'colour', label: 'Colour work', image: hands, alt: 'Hands at work' },
  { id: 'tools', label: 'The tools', image: tools, alt: 'Tools laid out' },
  { id: 'week', label: 'The week', image: calendar, alt: 'A week on the calendar' },
]

const RESULT_SOURCES = [
  { label: 'Calendar', detail: 'Thursday at 2:00 PM is open.' },
  { label: 'The booking', detail: 'The $86 deposit is already on Tuesday’s colour.' },
  { label: 'Studio hours', detail: 'Colour takes 90 minutes.' },
]

export function WorkingPage() {
  return (
    <CatalogPage title="Working" lead="A quiet hold while the agent works. One line, not a trail.">
      <div className="ds-ai-stage">
        <Working steps={['Checking Tuesday’s colour', 'Looking at Thursday']} />
      </div>
    </CatalogPage>
  )
}

export function ResultPage() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState('')
  return (
    <CatalogPage
      title="Result"
      lead="A result inside an agent turn. The claim names its source. Nothing on the card picks a winner."
    >
      <div className="ds-ai-stage">
        <Result
          name="Thursday at 2:00 PM"
          meta="Colour · 90 minutes"
          photos={[
            { src: studio, alt: 'The studio' },
            { src: hands, alt: 'Colour work' },
            { src: tools, alt: 'The tools' },
          ]}
          evidence="Thursday at 2:00 PM is free. The $86 deposit stays on the booking."
          sourceLabel="Calendar"
          sourceMore={2}
          onSource={() => setOpen((current) => !current)}
          service="Colour · $86"
          when="Thursday"
          primary={{ label: 'Move the booking', onClick: () => setPicked('Moved to Thursday at 2:00 PM.') }}
          secondary={{ label: 'Keep Tuesday', onClick: () => setPicked('Tuesday stays as it is.') }}
        />
        {open ? <SourceList items={RESULT_SOURCES} /> : null}
        {picked ? <p className="ds-ai-caption">{picked}</p> : null}
      </div>
    </CatalogPage>
  )
}

export function SourcesPage() {
  return (
    <CatalogPage
      title="Sources"
      lead="Where a claim came from. The chip sits on the result. The list is what it opens."
    >
      <div className="ds-ai-stage">
        <SourceList items={RESULT_SOURCES} />
      </div>
    </CatalogPage>
  )
}

export function ThisOrThatPage() {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState('')
  const pair = round === 0 ? LOOKS : LOOKS.slice(0, 2)
  return (
    <CatalogPage
      title="This or that"
      lead="A visual narrowing. None of these, and Either is fine, are always ways out."
    >
      <div className="ds-ai-stage">
        <ThisOrThat
          options={pair}
          canUndo={round > 0}
          onPick={(id) => setPicked(LOOKS.find((look) => look.id === id)?.label ?? '')}
          onNone={() => setPicked('None of these.')}
          onEither={() => setPicked('Either is fine.')}
          onUndo={() => {
            setRound(0)
            setPicked('')
          }}
        />
        {round === 0 ? (
          <button type="button" className="ds-source" onClick={() => setRound(1)}>
            Narrow to two
          </button>
        ) : null}
        {picked ? <p className="ds-ai-caption">{picked}</p> : null}
      </div>
    </CatalogPage>
  )
}
