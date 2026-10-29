import assert from 'node:assert/strict'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
// @ts-expect-error -- plain JS module without type declarations
import { runRules } from '../../scripts/design-detector/core/rules.mjs'
// @ts-expect-error -- plain JS module without type declarations
import { loadTokens } from '../../scripts/design-detector/core/tokens.mjs'

type Finding = {
  ruleId: string
  severity: string
  line: number
  property: string
  value: string
  suggestedVar?: string
}

const dir = mkdtempSync(path.join(tmpdir(), 'dh-detector-'))
const tokensPath = path.join(dir, 'tokens.css')
writeFileSync(
  tokensPath,
  `:root {
  --color-brand: #007078;
  --ds-button-fill: #ff00aa;
  --spacing-2: 8px;
  --radius-2: 8px;
  --ds-button-height-sm: 24px;
}
`,
)
const tokens = loadTokens(tokensPath)
const check = (css: string): Finding[] => runRules(css, tokens)

test('a raw colour with a token is flagged with the token to use', () => {
  const [finding, ...rest] = check('.a { color: #007078; }')
  assert.equal(rest.length, 0)
  assert.equal(finding.severity, 'TOKEN-RAW')
  assert.equal(finding.suggestedVar, '--color-brand')
})

test('short hex is matched like its long form', () => {
  const [finding] = check('.a { color: #007; }')
  assert.equal(finding.ruleId, 'raw-color-no-token')
  const file = path.join(dir, 'amber.css')
  writeFileSync(file, ':root {\n  --color-amber: #ffaa00;\n}\n')
  const [amber] = runRules('.a { color: #fa0; }', loadTokens(file))
  assert.equal(amber.suggestedVar, '--color-amber')
})

test('values that already use var() pass', () => {
  assert.deepEqual(check('.a { color: var(--color-brand); padding: var(--spacing-2); }'), [])
})

test('a colour only a component token shares is a gap, never a suggestion', () => {
  const [finding] = check('.a { background: #ff00aa; }')
  assert.equal(finding.ruleId, 'raw-color-no-generic-token')
  assert.equal(finding.severity, 'TOKEN-GAP')
  assert.equal(finding.suggestedVar, undefined)
})

test('a size is matched only within its own category', () => {
  const [spacing] = check('.a { padding: 8px; }')
  assert.equal(spacing.suggestedVar, '--spacing-2')
  const [radius] = check('.a { border-radius: 24px; }')
  assert.equal(radius.ruleId, 'raw-px-no-category-token')
  assert.equal(radius.suggestedVar, undefined)
})

test('a value with no token at all is a gap', () => {
  const [finding] = check('.a { margin: 6px; }')
  assert.equal(finding.ruleId, 'raw-px-no-token')
})

test('comments are ignored and line numbers stay right', () => {
  const findings = check('/* color: #007078; */\n.a {\n  color: #007078;\n}')
  assert.equal(findings.length, 1)
  assert.equal(findings[0].line, 3)
})

test('zero and negative sizes are not flagged', () => {
  assert.deepEqual(check('.a { margin: 0; margin-top: -4px; padding: 0px; }'), [])
})
