import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { Readable } from 'node:stream'
import { test } from 'node:test'
import { harnessSettingsPlugin } from '../../scripts/harness-settings-plugin.ts'

const PROFILE = `# Designer profile

Status: ACTIVE

- Name: Ada
- Role focus: product
- Squad assignment: <unset — deferred>
- Primary platform: iOS
- Experience level: new

Last updated: 2026-01-01
`

type Handler = (req: IncomingMessage, res: ServerResponse) => unknown
type Reply = { status: number; body: Record<string, unknown> }
type Request = { url?: string; body?: unknown; headers?: Record<string, string> }

/** Mounts the plugin on a fake dev server rooted in a temp folder. */
function setup() {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-settings-'))
  writeFileSync(path.join(root, 'designer-profile.local.md'), PROFILE)
  const plugin = harnessSettingsPlugin()
  const handlers: Record<string, Handler> = {}
  ;(plugin.configResolved as unknown as (config: { root: string }) => void)({ root })
  ;(plugin.configureServer as unknown as (server: unknown) => void)({
    middlewares: { use: (mount: string, fn: Handler) => void (handlers[mount] = fn) },
  })
  const call = (method: string, { url = '/', body, headers = {} }: Request = {}, endpoint = '/__harness/settings') =>
    new Promise<Reply>((resolve) => {
      const req = Object.assign(Readable.from(body === undefined ? [] : [JSON.stringify(body)]), {
        method,
        url,
        headers: { host: '127.0.0.1:3002', ...headers },
      }) as unknown as IncomingMessage
      const res = {
        statusCode: 0,
        setHeader() {},
        end(data: string) {
          resolve({ status: res.statusCode, body: JSON.parse(data) })
        },
      }
      handlers[endpoint](req, res as unknown as ServerResponse)
    })
  const read = (file: string) => readFileSync(path.join(root, file), 'utf8')
  return { root, call, read }
}

const SAME_ORIGIN = { origin: 'http://127.0.0.1:3002', 'sec-fetch-site': 'same-origin' }

test('a request from another website is refused and writes nothing', async () => {
  const { call, read } = setup()
  const reply = await call('POST', {
    body: { profile: { name: 'Mallory' } },
    headers: { origin: 'https://evil.example', 'content-type': 'text/plain' },
  })
  assert.equal(reply.status, 403)
  assert.equal(read('designer-profile.local.md'), PROFILE)
})

test('a cross-site request without an Origin header is refused', async () => {
  const { call, read } = setup()
  const reply = await call('POST', {
    body: { profile: { name: 'Mallory' } },
    headers: { 'sec-fetch-site': 'cross-site' },
  })
  assert.equal(reply.status, 403)
  assert.equal(read('designer-profile.local.md'), PROFILE)
})

test('the app reads the profile', async () => {
  const { call } = setup()
  const reply = await call('GET', { headers: SAME_ORIGIN })
  assert.equal(reply.status, 200)
  const designer = reply.body.designer as { status: string; profile: Record<string, string> }
  assert.equal(designer.status, 'ACTIVE')
  assert.equal(designer.profile.name, 'Ada')
  assert.equal(designer.profile.squad, '')
})

test('saving the profile changes only the edited line', async () => {
  const { call, read } = setup()
  const reply = await call('POST', { body: { profile: { name: 'Grace' } }, headers: SAME_ORIGIN })
  assert.equal(reply.status, 200)
  const saved = read('designer-profile.local.md')
  assert.match(saved, /^- Name: Grace$/m)
  assert.match(saved, /^- Role focus: product$/m)
  assert.match(saved, /^- Primary platform: iOS$/m)
  assert.doesNotMatch(saved, /Last updated: 2026-01-01/)
})

test('an invalid profile value is rejected and the file is unchanged', async () => {
  const { call, read } = setup()
  const reply = await call('POST', { body: { profile: { roleFocus: 'wizard' } }, headers: SAME_ORIGIN })
  assert.equal(reply.status, 400)
  assert.equal(read('designer-profile.local.md'), PROFILE)
})

test('only COMPANY-*.md files can be read from the company pack', async () => {
  const { call } = setup()
  const reply = await call('GET', { url: '/?file=../../designer-profile.local.md', headers: SAME_ORIGIN })
  assert.equal(reply.status, 400)
})

test('adding a company pack file never overwrites an existing one', async () => {
  const { root, call, read } = setup()
  mkdirSync(path.join(root, 'context/org-pack.local'), { recursive: true })
  const packFile = { topic: 'pricing', about: 'Plans and prices', useWhen: 'pricing, plans', content: 'v1' }
  assert.equal((await call('POST', { body: { packFile }, headers: SAME_ORIGIN })).status, 200)
  const again = await call('POST', { body: { packFile: { ...packFile, content: 'v2' } }, headers: SAME_ORIGIN })
  assert.equal(again.status, 400)
  assert.match(read('context/org-pack.local/COMPANY-PRICING.md'), /v1/)
})

test('an uploaded design-system file lands in the inbox, whatever path it claims', async () => {
  const { root, call } = setup()
  const reply = await call('POST', {
    body: { systemSource: { name: '../../tokens.css', content: ':root { --x: 1px; }' } },
    headers: SAME_ORIGIN,
  })
  assert.equal(reply.status, 200)
  assert.equal(reply.body.file, 'context/design-system/.inbox/tokens.css')
  assert.ok(!existsSync(path.join(root, 'tokens.css')))
})

test('a public repo is the default, and turning it off sticks', async () => {
  const { call, read } = setup()
  const first = await call('GET', { headers: SAME_ORIGIN })
  assert.equal((first.body.config as { publicRepo: boolean }).publicRepo, true)
  const saved = await call('POST', { body: { publicRepo: false }, headers: SAME_ORIGIN })
  assert.equal(saved.status, 200)
  assert.equal((saved.body.config as { publicRepo: boolean }).publicRepo, false)
  assert.match(read('harness.config.local.json'), /"publicRepo": false/)
})
