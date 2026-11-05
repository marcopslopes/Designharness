import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  examplePhrase,
  queryTerms,
  routePhrases,
  scoreSkills,
  type FinderSkill,
} from '../../src/design-harness/skillFinder.ts'

const skill = (slug: string, label: string, description: string, triggers: string[] = []): FinderSkill => ({
  slug,
  label,
  purpose: description,
  description,
  triggers,
})

const SKILLS = [
  skill('usability-test-guide', 'Usability test guide', 'Builds a session plan for testing a prototype with users.', [
    'write a usability test script',
    'help me plan a usability test',
  ]),
  skill('screener-builder', 'Screener builder', 'Builds a recruitment screener survey for a usability study.', [
    'write me a screener',
  ]),
  skill('audit', 'Audit', 'The final gate before sharing a prototype.', ['is this ready to share']),
]

test('stop words and repeats drop out of the question', () => {
  assert.deepEqual(
    queryTerms('Is there a skill for testing tests?').map((term) => term.word),
    ['testing'],
  )
})

test('a word in the trigger phrases outranks one only in the description', () => {
  const [first, second] = scoreSkills('usability test', SKILLS)
  assert.equal(first.skill.slug, 'usability-test-guide')
  assert.deepEqual(first.matched, ['usability', 'test'])
  assert.equal(second.skill.slug, 'screener-builder')
  assert.ok(first.score > second.score)
})

test('word forms match: sharing finds the share skill', () => {
  assert.equal(scoreSkills('before sharing', SKILLS)[0]?.skill.slug, 'audit')
})

test('no shared words means no match, and an empty question means none', () => {
  assert.deepEqual(scoreSkills('pricing page copy', SKILLS), [])
  assert.deepEqual(scoreSkills('what can you do', SKILLS), [])
})

test('the example is a whole phrase of two words or more that does not name the skill', () => {
  const named = skill('workload-agent', 'Workload agent', 'Snapshot.', [
    'workload agent',
    'roadmap',
    'present this to <PM',
    "what's my team working on",
  ])
  assert.equal(examplePhrase(named), "what's my team working on")
  assert.equal(examplePhrase(skill('x', 'X', 'Nothing.', ['sort'])), undefined)
})

test('the example is the trigger phrase closest to the question', () => {
  assert.equal(scoreSkills('plan a usability test', SKILLS)[0]?.example, 'help me plan a usability test')
})

test('a word found only in a description is a weak match', () => {
  const [match] = scoreSkills('recruitment', SKILLS)
  assert.equal(match.skill.slug, 'screener-builder')
  assert.equal(match.strong, false)
})

test('route tables credit quoted phrases to the first known skill in the chain', () => {
  const table = [
    '| Intent signal | Chain | Notes |',
    '|---|---|---|',
    '| **"write me a screener" / "who should I recruit"** | **`screener-builder`** | Behaviour-first. |',
    '| "build a screen / which component" | `ui-agent` → `audit` | Tweak. |',
    '| **Research and evidence** — screener · synthesis | `routes.md` § Research | Group row. |',
  ].join('\n')
  const phrases = routePhrases(table, new Set(['screener-builder', 'ui-agent', 'audit']))
  assert.deepEqual(phrases.get('screener-builder'), ['write me a screener', 'who should I recruit'])
  assert.deepEqual(phrases.get('ui-agent'), ['build a screen', 'which component'])
  assert.equal(phrases.has('audit'), false)
  assert.equal(phrases.size, 2)
})
