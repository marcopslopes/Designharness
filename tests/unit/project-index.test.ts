import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import {
  docFileFacts,
  galleryBlocker,
  ownershipFromBrief,
  projectTitle,
  briefAssumptions,
  briefParked,
  briefUnknowns,
  displayQuestion,
  presentedUnknowns,
  screenFileFacts,
  truthChipLabel,
  truthLine,
  markdownBoardOutline,
  chosenDecisions,
  projectStoryOutline,
  caseStudyStoryOutline,
} from '../../src/design-harness/projectFacts.ts'

const repo = path.resolve(import.meta.dirname, '../..')

test('screens get routes and labels from their file names', () => {
  const [screen] = screenFileFacts(['/projects/demo/screens/ClientsListPage.tsx'], [])
  assert.equal(screen.route, 'playground/demo/clients-list')
  assert.equal(screen.label, 'Clients list')
  assert.equal(screen.kind, 'screens')
})

test('a state drops the name of the screen it belongs to', () => {
  const facts = screenFileFacts(
    ['/projects/demo/screens/ClientsListPage.tsx'],
    ['/projects/demo/screens/states/ClientsListNoMatchesPage.tsx'],
  )
  const state = facts.find((f) => f.kind === 'states')!
  assert.equal(state.route, 'playground/demo/state/no-matches')
  assert.equal(state.label, 'No matches')
  assert.equal(state.parentLabel, 'Clients list')
})

test('a phone screen and its desktop version pair up as one prototype', () => {
  const [phone, desktop] = screenFileFacts(
    ['/projects/demo/screens/WalletHomePage.tsx', '/projects/demo/screens/desktop/WalletHomeDesktopPage.tsx'],
    [],
  )
  assert.equal(phone.platformBase, 'Wallet home')
  assert.equal(desktop.platformBase, 'Wallet home')
  assert.equal(desktop.platform, 'Desktop')
  assert.equal(desktop.folder, 'desktop')
})

test('docs get routes, and a title from front matter or a Mermaid accTitle', () => {
  const [flow, notes] = docFileFacts([
    { file: '/projects/demo/docs/discovery/flow.mermaid', source: 'flowchart\n  accTitle: Client flow\n' },
    { file: '/projects/demo/docs/notes.md', source: '---\ntitle: Kickoff notes\n---\n# Not this' },
  ])
  assert.equal(flow.route, 'playground/demo/doc/discovery/flow')
  assert.equal(flow.label, 'Client flow')
  assert.equal(notes.label, 'Kickoff notes')
})

test('the project title comes from the brief, or the folder name', () => {
  assert.equal(projectTitle('x', '# Brief — Wallet redesign'), 'Wallet redesign')
  assert.equal(projectTitle('my-thing', '# Brief — my-thing'), 'My thing')
  assert.equal(projectTitle('my-thing', undefined), 'My thing')
})

test('an unknown designer or a hidden flag keeps a project out of the gallery', () => {
  const ownership = ownershipFromBrief(
    '## Ownership\n- **Designer:** UNKNOWN — flagged\n- **Squad:** <squad>\n- **Gallery:** hidden (draft)\n',
  )
  assert.deepEqual(ownership, { designer: undefined, squad: undefined, gallery: 'hidden' })
  assert.equal(galleryBlocker(ownership, undefined), 'Designer unresolved')
  assert.equal(galleryBlocker({ designer: 'Ada', gallery: 'hidden' }, undefined), 'Gallery: hidden')
  assert.equal(galleryBlocker({ designer: 'Ada', gallery: 'visible' }, undefined), 'Case study summary incomplete')
})

test('unknowns are plain strings or text with an optional owner and blocks', () => {
  const brief = [
    '```yaml',
    'unknowns:',
    '  - "Committed success metric"',
    '  - text: "Who owns this"',
    '    owner: "PM"',
    '    blocks: "launch decision"',
    '```',
  ].join('\n')
  assert.deepEqual(briefUnknowns(brief), [
    { text: 'Committed success metric' },
    { text: 'Who owns this', owner: 'PM', blocks: 'launch decision' },
  ])
  assert.deepEqual(briefUnknowns('```yaml\nunknowns: []\n```'), [])
})

test('a card line is the status and the first open question', () => {
  const brief = [
    '```yaml',
    'status: draft',
    'assumptions:',
    '  - text: "Three segments are enough"',
    '    source: brief.md',
    'parked:',
    '  - "Flat list"',
    'unknowns:',
    '  - "Success metric"',
    '```',
  ].join('\n')
  assert.equal(truthLine(brief), 'Draft · Success metric')
  assert.ok((truthLine(brief) ?? '').length <= 40)
  assert.deepEqual(briefAssumptions(brief), [{ text: 'Three segments are enough', source: 'brief.md' }])
  assert.deepEqual(briefParked(brief), ['Flat list'])
  assert.equal(truthLine('```yaml\nstatus: approved\nunknowns: []\n```'), 'Approved')
  assert.equal(truthChipLabel('```yaml\nstatus: approved\nunknowns: []\n```'), 'Approved')
})

test('blocking questions lead, and a session note is not a question', () => {
  const brief = [
    '```yaml',
    'status: approved',
    'unknowns:',
    '  - "Success metric — baseline and target are both UNKNOWN"',
    '  - "Jira roadmap — not connected this session"',
    '  - text: "Who owns this"',
    '    owner: "PM"',
    '  - text: "Which metric is committed"',
    '    owner: "PM"',
    '    blocks: "what the screen optimizes"',
    '```',
  ].join('\n')
  assert.deepEqual(
    presentedUnknowns(brief).map((item) => item.text),
    ['Which metric is committed', 'Who owns this', 'Success metric — baseline and target are both UNKNOWN'],
  )
  assert.equal(displayQuestion('Success metric — baseline and target are both UNKNOWN'), 'Success metric')
  assert.equal(displayQuestion('Success metric — the brief names none'), 'Success metric')
  assert.equal(
    displayQuestion('How clients land in Premium — balance, products held, or set by the bank'),
    'How clients land in Premium — balance, products held, or set by the bank',
  )
  assert.equal(truthChipLabel(brief), 'Approved · 1 blocking')
  assert.equal(truthLine(brief), 'Approved · Which metric is committed')
  assert.equal(truthChipLabel('```yaml\nstatus: draft\nunknowns:\n  - "One question"\n```'), 'Draft · 1 open question')
  assert.equal(
    truthChipLabel('```yaml\nstatus: draft\nunknowns:\n  - "One"\n  - "Two"\n```'),
    'Draft · 2 open questions',
  )
  const long = [
    '```yaml',
    'status: draft',
    'unknowns:',
    '  - "How clients land in Premium — balance, products held, or set by the bank"',
    '```',
  ].join('\n')
  const line = truthLine(long)
  assert.ok(line && line.length <= 40, line)
  assert.match(line ?? '', /^Draft · How clients/)
})

test('placeholder designers are not treated as people', () => {
  for (const placeholder of ['unassigned', 'TBD', 'None', 'n/a', '-']) {
    assert.equal(ownershipFromBrief(`## Ownership\n- **Designer:** ${placeholder}\n`).designer, undefined, placeholder)
  }
  assert.equal(ownershipFromBrief('## Ownership\n- **Designer:** Nonie Park\n').designer, 'Nonie Park')
})

test('every screen in projects/ has its own route', () => {
  const screens: string[] = []
  const states: string[] = []
  for (const slug of readdirSync(path.join(repo, 'projects'))) {
    const dir = path.join(repo, 'projects', slug, 'screens')
    if (slug.startsWith('_') || !existsSync(dir)) continue
    for (const entry of readdirSync(dir, { recursive: true, encoding: 'utf8' })) {
      if (!entry.endsWith('Page.tsx') || entry.split('/').length > 2) continue
      ;(entry.startsWith('states/') ? states : screens).push(`/projects/${slug}/screens/${entry}`)
    }
  }
  assert.ok(screens.length > 0, 'expected the example projects to have screens')
  const routes = screenFileFacts(screens, states).map((f) => f.route)
  const repeated = routes.filter((route, i) => routes.indexOf(route) !== i)
  assert.deepEqual(repeated, [])
})

test('every project brief has a title', () => {
  for (const slug of readdirSync(path.join(repo, 'projects'))) {
    const brief = path.join(repo, 'projects', slug, 'brief.md')
    if (slug.startsWith('_') || !existsSync(brief)) continue
    assert.ok(projectTitle(slug, readFileSync(brief, 'utf8')).length > 0, slug)
  }
})

test('a written page becomes board pages of text blocks; the markdown stays the source', () => {
  const page = `---
status: draft
---
# Wallet brief

<!-- guidance for the agent -->
Intro line.

## 3. Users & context
| # | When | I want to | So I can |
|---|---|---|---|
| 1 | When money is held | to see **why** | sort it out |

## How we'd know
- Support contacts per 1,000 [dashboard](https://example.com)
2. Payout disputes

> Baseline first.

\`\`\`mermaid
graph TD
\`\`\`
`
  const outline = markdownBoardOutline(page, 'Fallback')
  assert.equal(outline.title, 'Wallet brief')
  assert.deepEqual(outline.sections, [
    { heading: '', blocks: [{ kind: 'body', text: 'Intro line.' }] },
    {
      heading: '3. Users & context',
      blocks: [{ kind: 'item', text: '1 · When money is held · to see why · sort it out' }],
    },
    {
      heading: "How we'd know",
      blocks: [
        { kind: 'item', text: 'Support contacts per 1,000 dashboard', marker: '•' },
        { kind: 'item', text: 'Payout disputes', marker: '2' },
        { kind: 'callout', text: 'Baseline first.' },
      ],
    },
  ])
  assert.deepEqual(
    markdownBoardOutline('### Card style\n#### Why\n**Decision:** Flat cards.', 'Decisions').sections,
    [{ heading: 'Card style', blocks: [{ kind: 'label', text: 'Why' }, { kind: 'body', text: 'Decision: Flat cards.' }] }],
  )
})

test('the story page reads the brief summary, truth block and chosen decisions', () => {
  const brief = `
\`\`\`yaml
status: approved
unknowns:
  - text: "Does the provider send the hold reason?"
    owner: "Finance"
    blocks: "Job story 1"
evidence:
  - text: "Providers call support about blocked wallets."
    source: findings.md
\`\`\`

## Case study summary
- **Problem:** Providers can't tell where their money is.
- **Goal:** Answer how much, when, and why.

## How we'd know
| Layer | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| Outcome | Support contacts per 1,000 | unknown | 20% fewer | support tags |
`
  const decisions = `### YYYY-MM-DD — <decision>
**Chosen:** <label>

### 2026-10-16 — Platform
**Chosen:** iOS first.

### 2026-11-02 — Go wide
**Chosen:** The payout is the page.
`
  assert.deepEqual(chosenDecisions(decisions).map((d) => d.chosen), ['The payout is the page.', 'iOS first.'])
  const story = projectStoryOutline({ title: 'Wallet', brief, decisions })
  assert.deepEqual(
    story.sections.map((s) => s.heading),
    ['', 'Evidence', 'What we chose', "How we'd know", 'Still open'],
  )
  assert.equal(story.sections[0].blocks.at(-1)?.text, 'Goal: Answer how much, when, and why.')
  assert.equal(story.sections[2].blocks[0].text, 'Go wide: The payout is the page.')
  assert.equal(story.sections[3].blocks[0].text, 'Outcome: Support contacts per 1,000 (target 20% fewer)')
  assert.equal(story.sections[0].blocks[0].kind, 'lead')
  assert.equal(story.sections[4].blocks[0].text, 'Finance: Does the provider send the hold reason? (blocks Job story 1)')
})

test('a case study becomes the story: headline, problem, options, the call, what should change, gaps', () => {
  const source = `# Case study — Clients

## 1. Opening

- **Framing:** A list that shows who needs a call today.
- **Intro:** A bank's client list sorted into Premium, New and Dormant.

## 2. Problem / why now

A flat list tells managers who their clients are. It doesn't tell them who needs them.

Source: brief.md

## 4. Options considered

**Row layout** — three layouts, side by side:

| Option | What it is | Result |
|--------|------------|--------|
| One card | All rows in one card | **Chosen** |
| Flat list | No card | Rejected |

**Platform.** Android was built first. **Chosen (2026-10-16):** iOS only. Android was removed.

## 5. The decision

**Direction built:** one list, sorted into segments.

**Why:** dormant clients stay visible.

## 6. Live prototype

- \`#/playground/clients\` — the list.

## 7. Outcome / expected change

Nothing has shipped.

- **Expected:** managers check in before relationships go cold.
- **Still open:**
  - How do clients land in Premium?
  - Is 6 months right?

## Skipped

- **Chapter 1, RACI** — no people named.
- **Chapter 3, Evidence** — findings.md holds build notes only.
`
  const story = caseStudyStoryOutline(source, 'Clients')
  assert.deepEqual(
    story.sections.map((s) => s.heading),
    ['', 'The problem', 'What we tried', 'What we chose', 'What should change', 'Still open', 'Not yet'],
  )
  assert.deepEqual(story.sections[0].blocks[0], { kind: 'lead', text: 'A list that shows who needs a call today.' })
  assert.deepEqual(
    story.sections[2].blocks.map((b) => b.text),
    ['Row layout: One card (over Flat list)', 'Platform: iOS only.'],
  )
  assert.deepEqual(story.sections[3].blocks, [
    { kind: 'callout', text: 'One list, sorted into segments.' },
    { kind: 'body', text: 'Why: dormant clients stay visible.' },
  ])
  assert.equal(story.sections[4].blocks[1].text, 'Expected: managers check in before relationships go cold.')
  assert.deepEqual(story.sections[5].blocks.map((b) => b.text), ['How do clients land in Premium?', 'Is 6 months right?'])
  assert.deepEqual(story.sections[6].blocks.map((b) => b.text), ['Evidence: findings.md holds build notes only.'])
})

test('every project gets a story page on its board, headed by its framing or its problem', () => {
  for (const slug of readdirSync(path.join(repo, 'projects')).filter((name) => !name.startsWith('_'))) {
    const brief = path.join(repo, 'projects', slug, 'brief.md')
    if (!existsSync(brief)) continue
    const caseStudy = path.join(repo, 'projects', slug, 'case-study.md')
    if (existsSync(caseStudy)) {
      const story = caseStudyStoryOutline(readFileSync(caseStudy, 'utf8'), slug)
      assert.equal(story.sections[0].blocks[0]?.kind, 'lead', `${slug}: no framing headline`)
      assert.ok(story.sections.some((s) => s.heading === 'What we chose'), `${slug}: no decision`)
      continue
    }
    const decisions = path.join(repo, 'projects', slug, 'decisions.md')
    const story = projectStoryOutline({
      title: slug,
      brief: readFileSync(brief, 'utf8'),
      decisions: existsSync(decisions) ? readFileSync(decisions, 'utf8') : undefined,
    })
    assert.ok(story.sections.length > 0, `${slug}: empty story`)
    assert.equal(story.sections[0].blocks[0]?.kind, 'lead', `${slug}: no problem headline`)
  }
})
