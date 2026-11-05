import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'

const repo = path.resolve(import.meta.dirname, '../..')
const recall = await import(path.join(repo, 'scripts/harness-recall.mjs'))

function repoWith(files: Record<string, string>) {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-recall-'))
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), content)
  }
  return root
}

const brief = (title: string, designer: string, extra = '') =>
  `# Brief — ${title}\n\n\`\`\`yaml\nstatus: draft\n\`\`\`\n\n## Ownership\n\n- **Designer:** ${designer}\n\n${extra}\n`

const chat = (...turns: string[]) =>
  turns
    .map((t) =>
      JSON.stringify({ role: 'user', message: { content: [{ type: 'text', text: `<user_query>${t}</user_query>` }] } }),
    )
    .join('\n')

test('topic words drop filler and plurals', () => {
  assert.deepEqual(recall.terms('Build a new referral leaderboards screen for the app'), ['referral', 'leaderboard'])
})

test('a project matches when one file holds the topic, and another designer is named', () => {
  const root = repoWith({
    'projects/payouts/brief.md': brief('Payouts', 'Sam', 'Weekly payout schedule for providers.'),
    'projects/payouts/findings.md': '- Providers check the payout schedule every Monday.\n',
    'projects/other/brief.md': brief('Other', 'Sam', 'A payout link in the footer. A schedule elsewhere.'),
    'projects/scattered/brief.md': brief('Scattered', 'Sam', 'Mentions payout once.'),
    'projects/scattered/findings.md': '- Mentions schedule once.\n',
  })
  const hits = recall.recallProjects(root, recall.terms('payout schedule'), 'Marco')
  assert.deepEqual(
    hits.map((h: { folder: string }) => h.folder),
    ['projects/payouts', 'projects/other'],
  )
  assert.equal(hits[0].owner, 'by Sam')
  assert.ok(hits[0].matched.includes('findings.md'))
})

test('the inbox is searched; how-i-work and preferences are not', () => {
  const root = repoWith({
    'designer-context.local/inbox/2026-11-04-pricing-sync.md':
      '---\nkind: transcript\n---\nWe agreed the pricing page needs annual plans.\n',
    'designer-context.local/how-i-work.md': '- pricing plans pricing plans\n',
  })
  const notes = recall.recallNotes(root, recall.terms('pricing plans'))
  assert.deepEqual(
    notes.map((n: { file: string }) => n.file),
    ['designer-context.local/inbox/2026-11-04-pricing-sync.md'],
  )
})

test('past chats match typed asks only, never quote pastes', () => {
  const root = repoWith({
    'a.jsonl': chat('can we add a referral leaderboard by city?', 'go'),
    'b.jsonl': chat(`${'meeting notes '.repeat(60)} referral leaderboard`),
  })
  const transcripts = ['a', 'b'].map((id) => ({ id, file: path.join(root, `${id}.jsonl`), mtime: 0 }))
  const hits = recall.recallChats(root, recall.terms('referral leaderboard'), transcripts)
  assert.deepEqual(
    hits.map((h: { id: string }) => h.id),
    ['a'],
  )
  assert.match(hits[0].match, /referral leaderboard by city/)
})
