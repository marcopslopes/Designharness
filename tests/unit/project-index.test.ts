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
