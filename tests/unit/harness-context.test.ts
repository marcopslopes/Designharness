import assert from 'node:assert/strict'
import { readFileSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const repo = path.resolve(import.meta.dirname, '../..')
const scriptPath = path.join(repo, 'scripts/harness-context.mjs')
const ctx = await import(scriptPath)

function repoWith(files: Record<string, string>) {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-context-'))
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), content)
  }
  return root
}

const brief = (yaml: string) => `# Brief — demo\n\n\`\`\`yaml\n${yaml}\n\`\`\`\n`

test('a profile at the repo root is found, with its status and role', () => {
  const root = repoWith({
    'designer-profile.local.md': '# Designer profile\n\nStatus: ACTIVE\n\n- Name: Sam\n- Role focus: manager\n',
  })
  const profile = ctx.profileFacts(root)
  assert.equal(profile.found, true)
  assert.equal(profile.path, path.join(root, 'designer-profile.local.md'))
  assert.equal(profile.status, 'ACTIVE')
  assert.equal(profile.role, 'manager')
})

test('a profile under harness/ does not count, and the root path checked is reported', () => {
  const root = repoWith({ 'harness/designer-profile.local.md': 'Status: ACTIVE\n' })
  const profile = ctx.profileFacts(root)
  assert.equal(profile.found, false)
  assert.equal(profile.path, path.join(root, 'designer-profile.local.md'))
  assert.match(
    ctx.formatSession({ ...ctx.sessionContext(root), profile }),
    /Profile: missing — checked .*designer-profile\.local\.md/,
  )
})

test('with no local pack, the example pack is used and nothing is missing', () => {
  const root = repoWith({ 'context/org-pack/COMPANY-VOICE.md': '# Voice\n' })
  const pack = ctx.orgPackFacts(root)
  assert.equal(pack.source, 'example')
  assert.deepEqual(pack.missing, [])
})

test('a partial local pack lists the missing files and never borrows from the example', () => {
  const root = repoWith({
    'context/org-pack/COMPANY-VOICE.md': '# Example voice\n',
    'context/org-pack.local/COMPANY-VOICE.md': '# Voice\n',
    'context/org-pack.local/COMPANY-PAYMENTS.md': '# Extra\n',
  })
  const pack = ctx.orgPackFacts(root)
  assert.equal(pack.source, 'local')
  assert.ok(pack.missing.includes('COMPANY-BUSINESS.md'))
  assert.ok(!pack.missing.includes('COMPANY-VOICE.md'))
  assert.equal(pack.missing.length, ctx.ORG_PACK_FILES.length - 1)
  assert.deepEqual(pack.extra, ['COMPANY-PAYMENTS.md'])
  assert.match(ctx.formatSession(ctx.sessionContext(root)), /partial, missing: .*COMPANY-BUSINESS\.md/)
})

test('a project reports status, example, system, and the last log date', () => {
  const root = repoWith({
    'projects/demo/brief.md': brief('status: draft\nexample: true\nsystem: desktop, Mobile\nassumptions: []'),
    'projects/demo/log.md':
      '| Date | Request |\n|---|---|\n| 2026-10-01 | a |\n| 2026-11-02 14:00 | b |\n| YYYY-MM-DD | |\n',
    'projects/plain/brief.md': brief('status: exploring'),
    'projects/_template/brief.md': brief('status: exploring'),
  })
  const [demo, plain] = ctx.sessionContext(root).projects
  assert.equal(demo.slug, 'demo')
  assert.equal(demo.status, 'draft')
  assert.equal(demo.example, true)
  assert.deepEqual(demo.systems, ['desktop', 'mobile'])
  assert.equal(demo.lastLog, '2026-11-02')
  assert.equal(plain.example, false)
  assert.equal('systems' in plain, false)
  assert.equal(plain.lastLog, null)
  assert.equal(ctx.sessionContext(root).projects.length, 2)
})

test('local projects are listed after tracked ones and never shown in the app', () => {
  const root = repoWith({
    'projects/demo/brief.md': brief('status: draft'),
    'projects.local/secret/brief.md': brief('status: exploring'),
  })
  const projects = ctx.sessionContext(root).projects
  assert.deepEqual(
    projects.map((p: { folder: string }) => p.folder),
    ['projects/demo', 'projects.local/secret'],
  )
  assert.equal(projects[1].page, null)
  assert.equal(projects[1].gallery.shows, false)
})

const orchestrator = `# Orchestrator

## Fast lanes

- **Critique.** "Critique" or "gut check" on work already made. "Prep me for critique" stays \`critique-prep\`.
- **Prototype.** A small tweak.

---

## 2. Routing table

| Intent signal | Chain | Notes |
|---|---|---|
| **"what is X" / "catch me up on X"** | **\`research-agent\`** | — |
| **"show me the design debt / what did we defer"** | **\`design-debt-tracker\`** | — |
| **Framing** — wayfind | \`routes.md\` § Framing | — |

### 2a. Next
`

const routes = `# Routes

## Framing and strategy

| Intent signal | Chain | Notes |
|---|---|---|
| **"help me prioritize this backlog" / "rank these tickets"** | **\`roadmap-prioritization\`** | — |
`

test('trigger phrases come from fast-lane first sentences, common rows, and routes.md', () => {
  const phrases = ctx.triggerPhrases(orchestrator, routes)
  const targets = (phrase: string) =>
    phrases.filter((p: { phrase: string }) => p.phrase === phrase).map((p: { target: string }) => p.target)
  assert.deepEqual(targets('gut check'), ['Critique fast lane'])
  assert.deepEqual(targets('Prep me for critique'), [])
  assert.deepEqual(targets('what did we defer'), ['design-debt-tracker'])
  assert.deepEqual(targets('rank these tickets'), ['roadmap-prioritization (routes.md § Framing and strategy)'])
})

test('an ask matches phrases with placeholders; one-word phrases never match alone', () => {
  const phrases = ctx.triggerPhrases(orchestrator, routes)
  assert.equal(ctx.matchAsk('Catch me up on payouts', phrases)[0].target, 'research-agent')
  assert.equal(ctx.matchAsk('Quick gut check on this?', phrases)[0].target, 'Critique fast lane')
  assert.deepEqual(ctx.matchAsk('critique this', phrases), [])
  assert.deepEqual(ctx.matchAsk('build a login screen', phrases), [])
})

test('every common row in the real ORCHESTRATOR.md still yields a trigger phrase', () => {
  const text = readFileSync(path.join(repo, 'harness/ORCHESTRATOR.md'), 'utf8')
  const phrases = ctx.triggerPhrases(text, readFileSync(path.join(repo, 'harness/references/routes.md'), 'utf8'))
  for (const target of ['design-kickoff', 'research-agent', 'ux-pattern', 'session-handoff', 'harness-audit']) {
    assert.ok(
      phrases.some((p: { target: string }) => p.target === target),
      `no phrase for ${target}`,
    )
  }
  assert.ok(phrases.some((p: { target: string }) => p.target === 'Critique fast lane'))
})

const howIWork = [
  '# How I work',
  '',
  '## Where the harness goes wrong',
  '- Asks too many questions. — seen 5, last 2026-11-03. Proposal: P2',
  '- Stops partway. — seen 1, last 2026-10-21. Proposal: none',
  '- Long text instead of visuals. — seen 4, last 2026-11-02. Proposal: P4',
  '',
  '## How I work',
  '- Short messages. — seen 9',
].join('\n')

test('learned patterns: only seen 2+, most seen first, nothing from other sections', () => {
  const root = repoWith({ 'designer-context.local/how-i-work.md': howIWork })
  const learned = ctx.learnedFacts(root, [])
  assert.deepEqual(
    learned.patterns.map((p: { pattern: string }) => p.pattern),
    ['Asks too many questions.', 'Long text instead of visuals.'],
  )
  assert.equal(learned.due, false)
  assert.match(ctx.formatLearned(learned).join('\n'), /Learned: .*how-i-work\.md[\s\S]*\(seen 5\)/)
})

test('a digest is due on the first chat, then only after 5 new chats or 7 days', () => {
  const now = Date.parse('2026-11-10T12:00:00Z')
  const lastRun = '2026-11-08T12:00:00Z'
  const chats = (n: number) => Array.from({ length: n }, (_, i) => ({ id: `c${i}`, mtime: now - 1000 }))
  assert.equal(ctx.learnedFacts(repoWith({}), chats(1), now).due, true)
  const root = repoWith({ 'designer-context.local/transcript-digest-state.json': JSON.stringify({ lastRun }) })
  assert.equal(ctx.learnedFacts(root, chats(4), now).due, false)
  assert.equal(ctx.learnedFacts(root, chats(5), now).due, true)
  assert.equal(ctx.learnedFacts(root, chats(1), Date.parse('2026-11-16T12:00:00Z')).due, true)
  assert.equal(ctx.learnedFacts(root, [], Date.parse('2026-11-30T12:00:00Z')).due, false)
  assert.match(ctx.formatLearned(ctx.learnedFacts(root, chats(5), now)).join('\n'), /Digest: due — 5 chats new/)
})
