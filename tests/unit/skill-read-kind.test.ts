import assert from 'node:assert/strict'
import path from 'node:path'
import { test } from 'node:test'

const repo = path.resolve(import.meta.dirname, '../..')
const { rangeOf, readKind, countsAsUse } = await import(path.join(repo, '.cursor/hooks/skill-read-kind.mjs'))

test('reading one SKILL.md in parts counts once; the same range again is a re-read', () => {
  const events: { skill: string; session: string; range: string; kind?: string }[] = []
  const read = (input: object, session = 's1') => {
    const range = rangeOf(input)
    const event = { skill: 'ui-agent', session, range }
    const kind = readKind(events, event)
    events.push({ ...event, kind })
    return kind
  }
  assert.equal(read({ offset: 1, limit: 200 }), 'first')
  assert.equal(read({ offset: 200, limit: 200 }), 'part')
  assert.equal(read({ offset: 1, limit: 200 }), 'reread')
  assert.equal(read({}, 's2'), 'first')
  assert.equal(read({}, 's2'), 'reread')
  assert.equal(events.filter(countsAsUse).length, 4)
  assert.equal(rangeOf({}), 'all')
})

test('an unknown session never folds reads together', () => {
  const events = [{ skill: 'audit', session: 'unknown', range: 'all' }]
  assert.equal(readKind(events, { skill: 'audit', session: 'unknown', range: 'all' }), 'first')
})
