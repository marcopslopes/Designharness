import { useEffect, useId, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { FrameAdd, FrameDanger } from '../harnessIcons'
import {
  Fact,
  Section,
  SelectField,
  SettingRow,
  TextAreaField,
  ToggleRow,
  type SettingInfo,
} from '../components/SettingsParts'
import { DesignHarnessDocPage } from '../components/DesignHarnessDocPage'
import { showHarnessIntro } from '../harnessIntro'
import { DEFAULT_HARNESS_CONFIG, type HarnessConfig } from '../harnessSettings'
import { Badge, Button, Callout, Field, Icon, Segmented, Text } from '../ui'

type Profile = { name: string; roleFocus: string; squad: string; platform: string; experience: string }

type Snapshot = {
  files: { profile: string; config: string }
  designer: { exists: boolean; status: string; profile: Profile }
  config: HarnessConfig
  configExists: boolean
  company: {
    source: 'local' | 'example'
    folder: string
    files: { name: string; present: boolean }[]
    extra: { name: string; header: { about: string; useWhen: string[] } | null }[]
  }
  checks: { tokensPath: string; targetDirs: string[]; extensions: string[]; acceptedDebt: number }
}

type Draft = {
  profile: Profile
  publicRepo: boolean
  harness: HarnessConfig['harness']
  behaviour: HarnessConfig['behaviour']
}

const ENDPOINT = '/__harness/settings'
const PACK_FORM_ID = 'design-harness-pack-add'

const ROLE_OPTIONS = [
  { value: 'product', label: 'Product design' },
  { value: 'content', label: 'Content design' },
  { value: 'accessibility', label: 'Accessibility' },
  { value: 'research', label: 'Research' },
  { value: 'manager', label: 'Manager' },
  { value: 'mix', label: 'Mix' },
]
const PLATFORM_OPTIONS = [
  { value: 'iOS', label: 'iOS' },
  { value: 'Android', label: 'Android' },
  { value: 'Web', label: 'Web' },
  { value: 'all', label: 'All three' },
]
const EXPERIENCE_OPTIONS = [
  { value: 'new', label: 'New to this repo' },
  { value: 'experienced', label: 'Experienced' },
]

const AUDIT_INFO: SettingInfo = {
  rows: [
    { label: 'After builds', text: 'Runs at the end of every full build. Small tweaks wait until you share.' },
    {
      label: 'Only when I share',
      text: "Waits until you say you're sharing or ask for it, or until three small edits stack up on one file.",
    },
  ],
  note: 'Either way, nothing is shared before the audit runs.',
}

const BEHAVIOUR_TOGGLES: {
  key: Exclude<keyof Draft['behaviour'], 'audit'>
  title: string
  description: string
  info: SettingInfo
}[] = [
  {
    key: 'storyboardOffer',
    title: 'Build a storyboard',
    description: 'After a new phone screen is built, add its storyboard. When off, ask first.',
    info: {
      rows: [
        { label: 'On', text: "Builds the storyboard after a new phone screen, as part of the build's plan." },
        { label: 'Off', text: 'Asks once: build it, or not now.' },
      ],
      note: "Desktop and web screens don't get one. Asking for a storyboard always works.",
    },
  },
  {
    key: 'caseStudyDraft',
    title: 'Write the case study',
    description: 'Once a project has a decision, write its case study as a draft. When off, ask first.',
    info: {
      rows: [
        {
          label: 'On',
          text: 'Once decisions.md records a chosen direction, the next build writes the case study as a draft. Once per project; it never overwrites one.',
        },
        { label: 'Off', text: 'Asks once: write it, or not now.' },
      ],
      note: 'Slides and an article are always asked about. Asking for a case study always works.',
    },
  },
  {
    key: 'variantForks',
    title: 'Build variants when the layout is unclear',
    description: 'Build 2–4 real options to pick from. When off, ask one question instead.',
    info: {
      rows: [
        {
          label: 'On',
          text: 'When the layout could go more than one way and nothing on file decides it, builds 2–4 real options to pick from.',
        },
        { label: 'Off', text: 'Asks one question naming the choice, then builds only your pick.' },
      ],
      note: 'Saying "show me options" always builds them.',
    },
  },
  {
    key: 'tasteCheckpoint',
    title: 'Mid-build taste check',
    description: 'On longer builds, ask one pattern question at a natural break.',
    info: {
      rows: [
        { label: 'On', text: 'On longer builds, asks one pattern question at a natural break.' },
        { label: 'Off', text: 'Skipped.' },
      ],
      note: '"Taste check this" always runs one.',
    },
  },
  {
    key: 'handoffNudge',
    title: 'Suggest a handoff in long chats',
    description:
      "Claude Code: from half the context window. Cursor: after about 15–20 turns. Suggests saying 'wrap up'.",
    info: {
      rows: [
        {
          label: 'On',
          text: "Claude Code's status line warns at 50% context and suggests a handoff from 60%. Cursor suggests one after about 15–20 turns on one task.",
        },
        { label: 'Off', text: 'No suggestion. The Claude Code status line still shows the percentage.' },
      ],
      note: "Saying 'wrap up' or asking for a handoff always works.",
    },
  },
  {
    key: 'gitAutopilot',
    title: 'Handle Git for me',
    description: "Each project gets its own branch. 'Wrap up' saves it, 'share this' sends it.",
    info: {
      rows: [
        {
          label: 'On',
          text: "Starting a project makes your own branch for it from main. 'Wrap up' saves that project's files, 'undo the last change' takes the last save back, and 'share this' pushes the branch and gives you the link.",
        },
        { label: 'Off', text: 'No branches, saves or pushes. You run Git yourself.' },
      ],
      note: "It never pushes unless you say share, never to main, and never with force. '- Git autopilot: off' in your designer profile also turns it off.",
    },
  },
]

function toDraft(snapshot: Snapshot): Draft {
  return {
    profile: { ...snapshot.designer.profile },
    publicRepo: snapshot.config.publicRepo,
    harness: { ...snapshot.config.harness },
    behaviour: { ...snapshot.config.behaviour },
  }
}

export function SettingsPage() {
  if (!import.meta.env.DEV) {
    return (
      <DesignHarnessDocPage
        title="Settings"
        lead="Settings are only available while the harness runs locally."
        toc={false}
      />
    )
  }
  return <LocalSettings />
}

async function readSettings(): Promise<Snapshot> {
  const response = await fetch(ENDPOINT, { cache: 'no-store' })
  const body = await response.json()
  if (!response.ok) throw new Error(body.error ?? 'Could not load settings')
  return body
}

const loadError = (cause: unknown) => (cause instanceof Error ? cause.message : 'Could not load settings')

function LocalSettings() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [draft, setDraft] = useState<Draft | null>(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const load = () => {
    setError('')
    readSettings().then(
      (body) => {
        setSnapshot(body)
        setDraft(toDraft(body))
      },
      (cause) => setError(loadError(cause)),
    )
  }

  useEffect(() => {
    let live = true
    readSettings().then(
      (body) => {
        if (!live) return
        setSnapshot(body)
        setDraft(toDraft(body))
      },
      (cause) => live && setError(loadError(cause)),
    )
    return () => {
      live = false
    }
  }, [])

  const dirty = useMemo(
    () => Boolean(snapshot && draft && JSON.stringify(toDraft(snapshot)) !== JSON.stringify(draft)),
    [snapshot, draft],
  )

  const update = <K extends keyof Draft>(group: K, patch: Partial<Draft[K]>) => {
    setSaved(false)
    setDraft((current) => (current ? { ...current, [group]: { ...current[group], ...patch } } : current))
  }

  const save = async (event: FormEvent) => {
    event.preventDefault()
    if (!draft || !snapshot) return
    setSaving(true)
    setError('')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          snapshot.designer.exists
            ? draft
            : { harness: draft.harness, behaviour: draft.behaviour, publicRepo: draft.publicRepo },
        ),
      })
      const body = await response.json()
      if (!response.ok) throw new Error(body.error ?? 'Could not save settings')
      setSnapshot(body)
      setDraft(toDraft(body))
      setSaved(true)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <DesignHarnessDocPage
      title="Settings"
      lead="Your profile, how the harness behaves, and what it reads. Saved to local files on this machine only."
    >
      {error ? (
        <Callout
          tone="danger"
          className="design-harness-settings__alert"
          action={
            <Button intent="ghost" size="sm" onClick={() => void load()}>
              Reload settings
            </Button>
          }
        >
          {error}
        </Callout>
      ) : null}
      {!snapshot || !draft ? (
        !error ? (
          <p role="status" className="design-harness-settings__status">
            Loading settings
          </p>
        ) : null
      ) : (
        <form className="design-harness-settings design-harness-form" onSubmit={save}>
          <Section
            title="Profile"
            description={`Who you are, so skills pitch their answers right. Saved to ${snapshot.files.profile}.`}
          >
            {snapshot.designer.exists ? (
              <div className="design-harness-settings__fields">
                <Field
                  label="Name"
                  value={draft.profile.name}
                  required
                  maxLength={120}
                  onChange={(event) => update('profile', { name: event.target.value })}
                />
                <SelectField
                  label="Role"
                  value={draft.profile.roleFocus}
                  options={ROLE_OPTIONS}
                  onChange={(roleFocus) => update('profile', { roleFocus })}
                />
                <Field
                  label="Squad"
                  value={draft.profile.squad}
                  placeholder="Not set"
                  maxLength={120}
                  hint="Skills ask for this the first time they need it."
                  onChange={(event) => update('profile', { squad: event.target.value })}
                />
                <SelectField
                  label="Primary platform"
                  value={draft.profile.platform}
                  options={PLATFORM_OPTIONS}
                  hint="When not set, the harness asks once per task."
                  onChange={(platform) => update('profile', { platform })}
                />
                <SelectField
                  label="Experience level"
                  value={draft.profile.experience}
                  options={EXPERIENCE_OPTIONS}
                  hint="New adds one line naming the token or component in use."
                  onChange={(experience) => update('profile', { experience })}
                />
              </div>
            ) : (
              <Text variant="muted" as="p">
                No profile yet. Start a new chat and the harness will set one up.
              </Text>
            )}
          </Section>

          <Section
            title="Harness behaviour"
            description={`When skills stop to ask, check, or offer something. Saved to ${snapshot.files.config}.`}
          >
            <ToggleRow
              title="This repo is public"
              description="Projects started from Slack, Jira, Confluence, Notion, or Drive stay on this computer."
              info={{
                rows: [
                  {
                    label: 'On',
                    text: 'A project created from those tools is saved under projects.local, which Git does not track. The fictional examples in projects stay tracked.',
                  },
                  { label: 'Off', text: 'For a private copy. Those projects go in projects, with the examples.' },
                ],
                note: 'On is the default when the setting is missing. Turning it off is for a private copy of this repo.',
              }}
              checked={draft.publicRepo}
              onChange={(on) => {
                setSaved(false)
                setDraft((current) => (current ? { ...current, publicRepo: on } : current))
              }}
            />
            <SettingRow
              title="Run the audit"
              info={AUDIT_INFO}
              description="After builds runs it at the end of every full build. Only when I share waits until you say you're sharing or ask for it."
              control={
                <Segmented
                  label="Run the audit"
                  value={draft.behaviour.audit}
                  options={[
                    { value: 'after-builds', label: 'After builds' },
                    { value: 'on-share', label: 'Only when I share' },
                  ]}
                  onChange={(audit) => update('behaviour', { audit: audit as Draft['behaviour']['audit'] })}
                />
              }
            />
            {BEHAVIOUR_TOGGLES.map((row) => (
              <ToggleRow
                key={row.key}
                title={row.title}
                description={row.description}
                info={row.info}
                checked={draft.behaviour[row.key]}
                onChange={(on) => update('behaviour', { [row.key]: on })}
              />
            ))}
          </Section>

          <Section
            title="Harness"
            description="The name and line on the home page, and the theme new browsers start in."
          >
            <div className="design-harness-settings__fields">
              <Field
                label="Harness name"
                value={draft.harness.name}
                required
                maxLength={40}
                placeholder={DEFAULT_HARNESS_CONFIG.harness.name}
                onChange={(event) => update('harness', { name: event.target.value })}
              />
              <Field
                label="Tagline"
                value={draft.harness.tagline}
                maxLength={140}
                hint="Up to 140 characters. Leave empty to hide it."
                onChange={(event) => update('harness', { tagline: event.target.value })}
              />
            </div>
            <SettingRow
              title="Default theme"
              description="Used until someone picks a theme in the sidebar on their browser."
              control={
                <Segmented
                  label="Default theme"
                  value={draft.harness.defaultTheme}
                  options={[
                    { value: 'dark', label: 'Dark' },
                    { value: 'light', label: 'Light' },
                  ]}
                  onChange={(theme) => update('harness', { defaultTheme: theme as Draft['harness']['defaultTheme'] })}
                />
              }
            />
            <SettingRow
              title="Introduction"
              description="The tour that opens the first time you run the harness."
              control={
                <Button type="button" intent="secondary" size="md" onClick={showHarnessIntro}>
                  Show introduction
                </Button>
              }
            />
          </Section>

          <Section
            title="Company context"
            description="What skills know about your company. Extra files say when to use them, so skills pick them up on their own."
            badge={
              <Badge tone={snapshot.company.source === 'local' ? 'positive' : 'neutral'}>
                {snapshot.company.source === 'local' ? 'Your company pack' : 'Example pack'}
              </Badge>
            }
          >
            <dl className="design-harness-settings__facts">
              <Fact label="Folder" value={<code>{snapshot.company.folder}</code>} />
              <Fact
                label="Files"
                value={
                  <ul className="design-harness-settings__files">
                    {snapshot.company.files.map((file) => (
                      <li key={file.name} data-present={file.present ? 'true' : 'false'}>
                        <code>{file.name}</code>
                        <span>{file.present ? 'Present' : 'Missing'}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
              {snapshot.company.extra.length ? (
                <Fact
                  label="Extra files"
                  value={
                    <ul className="design-harness-settings__extras">
                      {snapshot.company.extra.map((file) => (
                        <li key={file.name}>
                          <code>{file.name}</code>
                          {file.header ? (
                            <>
                              {file.header.about ? <span>{file.header.about}</span> : null}
                              <span className="design-harness-settings__extras-use">
                                Used when: {file.header.useWhen.join(', ') || 'not set'}
                              </span>
                            </>
                          ) : (
                            <span className="design-harness-settings__extras-warn">
                              <Icon icon={FrameDanger} size="xs" />
                              No header, so skills won't read it. Add about and use-when lines at the top.
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  }
                />
              ) : null}
            </dl>
            {snapshot.company.source === 'local' ? (
              <AddPackFile onAdded={setSnapshot} />
            ) : (
              <p className="design-harness-settings__note">
                To add files, set up your company pack first: ask the harness to build your org-pack.
              </p>
            )}
          </Section>

          <Section title="Design checks" description="What the design detector compares against. Read only.">
            <dl className="design-harness-settings__facts">
              <Fact label="Tokens file" value={<code>{snapshot.checks.tokensPath || 'Not set'}</code>} />
              <Fact
                label="Folders it scans"
                value={
                  snapshot.checks.targetDirs.length
                    ? snapshot.checks.targetDirs.map((dir) => <code key={dir}>{dir}</code>)
                    : 'None'
                }
              />
              <Fact label="File types" value={snapshot.checks.extensions.join(', ') || 'None'} />
              <Fact label="Accepted token debt" value={`${snapshot.checks.acceptedDebt} known issues`} />
            </dl>
          </Section>

          <div className="design-harness-settings__actions">
            <p role="status" className="design-harness-settings__status">
              {saving ? 'Saving' : dirty ? 'Unsaved changes' : saved ? 'Saved' : 'Your settings are up to date.'}
            </p>
            <div className="design-harness-settings__buttons">
              <Button
                type="button"
                intent="secondary"
                size="md"
                disabled={!dirty || saving}
                onClick={() => {
                  setDraft(toDraft(snapshot))
                  setSaved(false)
                }}
              >
                Discard
              </Button>
              <Button type="submit" intent="primary" size="md" disabled={!dirty || saving}>
                Save changes
              </Button>
            </div>
          </div>
        </form>
      )}
      <form id={PACK_FORM_ID} hidden />
    </DesignHarnessDocPage>
  )
}

type PackDraft = { topic: string; about: string; useWhen: string; content: string }

const EMPTY_PACK: PackDraft = { topic: '', about: '', useWhen: '', content: '' }

/** Fields join `PACK_FORM_ID` (rendered outside the settings form) through the native `form` attribute. */
function AddPackFile({ onAdded }: { onAdded: (snapshot: Snapshot) => void }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [pack, setPack] = useState<PackDraft>(EMPTY_PACK)
  const [error, setError] = useState('')
  const [added, setAdded] = useState('')
  const [adding, setAdding] = useState(false)

  const topicName = pack.topic.trim()
    ? `COMPANY-${pack.topic
        .trim()
        .toUpperCase()
        .replace(/[\s_]+/g, '-')
        .replace(/^COMPANY-/, '')
        .replace(/\.MD$/, '')}.md`
    : 'COMPANY-<NAME>.md'

  const set = (patch: Partial<PackDraft>) => setPack((current) => ({ ...current, ...patch }))

  const pickFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const content = await file.text()
    const topic = file.name.replace(/\.(md|markdown|txt)$/i, '').replace(/^COMPANY-/i, '')
    setPack((current) => ({ ...current, content, topic: current.topic || topic }))
  }

  useEffect(() => {
    const form = document.getElementById(PACK_FORM_ID)
    if (!form) return
    const submit = async (event: Event) => {
      event.preventDefault()
      setAdding(true)
      setError('')
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ packFile: pack }),
        })
        const body = await response.json()
        if (!response.ok) throw new Error(body.error ?? 'Could not add the file')
        onAdded(body)
        setAdded(topicName)
        setPack(EMPTY_PACK)
        setOpen(false)
      } catch (cause) {
        setError(cause instanceof Error ? cause.message : 'Could not add the file')
      } finally {
        setAdding(false)
      }
    }
    form.addEventListener('submit', submit)
    return () => form.removeEventListener('submit', submit)
  }, [pack, topicName, onAdded])

  if (!open) {
    return (
      <div className="design-harness-settings__pack-add">
        <Button
          type="button"
          intent="secondary"
          size="sm"
          startIcon={<Icon icon={FrameAdd} size="xs" />}
          onClick={() => setOpen(true)}
        >
          Add a file
        </Button>
        {added ? (
          <p role="status" className="design-harness-settings__note">
            Added {added}. Skills will read it when the task matches.
          </p>
        ) : null}
      </div>
    )
  }

  return (
    <div className="design-harness-settings__pack-add" role="group" aria-labelledby={`${id}-title`}>
      <p className="design-harness-settings__row-title" id={`${id}-title`}>
        Add a file to the pack
      </p>
      <div className="design-harness-settings__fields">
        <Field
          form={PACK_FORM_ID}
          label="Name"
          value={pack.topic}
          placeholder="Pricing"
          hint={`Saved as ${topicName}`}
          required
          maxLength={40}
          onChange={(event) => set({ topic: event.target.value })}
        />
        <Field
          form={PACK_FORM_ID}
          label="About"
          value={pack.about}
          placeholder="Plan names, prices, and discount rules"
          hint="One line. Shown here and read by skills."
          required
          maxLength={140}
          onChange={(event) => set({ about: event.target.value })}
        />
      </div>
      <Field
        form={PACK_FORM_ID}
        label="Use when"
        value={pack.useWhen}
        placeholder="content, checkout, pricing"
        hint="Skill names or topics, separated by commas. Skills read the file when one of these matches."
        required
        maxLength={200}
        onChange={(event) => set({ useWhen: event.target.value })}
      />
      <div className="design-harness-field">
        <label className="design-harness-field__label" htmlFor={`${id}-file`}>
          Upload a file
        </label>
        <input
          id={`${id}-file`}
          type="file"
          accept=".md,.markdown,.txt,text/markdown,text/plain"
          className="design-harness-settings__file"
          onChange={(event) => void pickFile(event)}
        />
      </div>
      <TextAreaField
        form={PACK_FORM_ID}
        label="Or paste the text"
        hint="Markdown or plain text. Saved only on this machine."
        value={pack.content}
        required
        rows={8}
        onChange={(event) => set({ content: event.target.value })}
      />
      {error ? (
        <p role="alert" className="design-harness-settings__extras-warn">
          {error}
        </p>
      ) : null}
      <div className="design-harness-settings__buttons">
        <Button
          type="button"
          intent="secondary"
          size="md"
          onClick={() => {
            setOpen(false)
            setPack(EMPTY_PACK)
            setError('')
          }}
        >
          Cancel
        </Button>
        <Button type="submit" form={PACK_FORM_ID} intent="primary" size="md" disabled={adding}>
          {adding ? 'Adding' : 'Add to pack'}
        </Button>
      </div>
    </div>
  )
}
