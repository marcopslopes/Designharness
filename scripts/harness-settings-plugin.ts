import {
  closeSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  openSync,
  readSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { slugify, start } from './git-autopilot.mjs'

/**
 * Dev-only settings API for Design Harness (`#/settings`). Reads and writes the two
 * gitignored local files the harness already trusts:
 *   - `designer-profile.local.md` — only the five profile lines, nothing else
 *   - `harness.config.local.json` — app identity + harness behaviour switches
 * Company pack and design checks are reported read-only, except that a new
 * self-describing extra pack file can be added (never overwrites), a
 * `COMPANY-*.md` file can be replaced with the old copy kept in `.backups/`,
 * and a tokens or markdown file can be saved to `context/design-system/.inbox/`.
 * `GET ?file=<name>` reads one local pack file, so its content is never bundled.
 * Contracts: `harness/references/harness-settings.md`,
 * `harness/references/org-pack-extra-files.md`.
 */

const ENDPOINT = '/__harness/settings'
const NEW_PROJECT = '/__harness/new-project'
const PROFILE_FILE = 'designer-profile.local.md'
const CONFIG_FILE = 'harness.config.local.json'
const UNSET = '<unset — deferred>'
const MAX_PACK_FILE = 250_000
const MAX_INBOX = 500_000
const INBOX = 'context/design-system/.inbox'

const COMPANY_FILES = [
  'COMPANY-BUSINESS.md',
  'COMPANY-VOICE.md',
  'COMPANY-ARCHETYPES.md',
  'COMPANY-PATTERNS.md',
  'COMPANY-SQUADS.md',
  'COMPANY-SOURCES.md',
  'COMPANY-VOCABULARY.md',
  'COMPANY-STYLE-GUIDE.md',
]

const PROFILE_FIELDS = {
  name: 'Name',
  roleFocus: 'Role focus',
  squad: 'Squad assignment',
  platform: 'Primary platform',
  experience: 'Experience level',
} as const

type ProfileKey = keyof typeof PROFILE_FIELDS
type Profile = Record<ProfileKey, string>

const ROLE_FOCUS = ['product', 'content', 'accessibility', 'research', 'manager', 'mix']
const PLATFORMS = ['iOS', 'Android', 'Web', 'all']
const EXPERIENCE = ['new', 'experienced']
const AUDIT_MODES = ['after-builds', 'on-share']
const THEMES = ['dark', 'light']

type HarnessConfig = {
  publicRepo: boolean
  harness: { name: string; tagline: string; defaultTheme: string }
  behaviour: {
    audit: string
    storyboardOffer: boolean
    caseStudyDraft: boolean
    variantForks: boolean
    tasteCheckpoint: boolean
    handoffNudge: boolean
    gitAutopilot: boolean
    shareRaw: boolean
  }
}

const DEFAULT_CONFIG: HarnessConfig = {
  publicRepo: true,
  harness: {
    name: 'Design Harness',
    tagline: 'Prototypes, the design system, and the docs, in one place.',
    defaultTheme: 'dark',
  },
  behaviour: {
    audit: 'after-builds',
    storyboardOffer: true,
    caseStudyDraft: true,
    variantForks: true,
    tasteCheckpoint: true,
    handoffNudge: true,
    gitAutopilot: false,
    shareRaw: false,
  },
}

const BEHAVIOUR_FLAGS = [
  'storyboardOffer',
  'caseStudyDraft',
  'variantForks',
  'tasteCheckpoint',
  'handoffNudge',
  'gitAutopilot',
  'shareRaw',
] as const

function readJson(file: string): unknown {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return undefined
  }
}

function readConfig(root: string): HarnessConfig {
  const raw = readJson(path.join(root, CONFIG_FILE)) as
    | (Partial<HarnessConfig> & {
        studio?: HarnessConfig['harness']
      })
    | undefined
  const identity = raw?.harness ?? raw?.studio ?? {}
  return {
    publicRepo: raw?.publicRepo !== false,
    harness: { ...DEFAULT_CONFIG.harness, ...identity },
    behaviour: { ...DEFAULT_CONFIG.behaviour, ...(raw?.behaviour ?? {}) },
  }
}

function profileLine(key: ProfileKey) {
  return new RegExp(`^- ${PROFILE_FIELDS[key]}:[ \\t]*(.*)$`, 'm')
}

function cleanProfileValue(value: string) {
  const trimmed = value.trim()
  return trimmed.startsWith('<unset') ? '' : trimmed
}

function readProfile(root: string): { exists: boolean; status: string; profile: Profile } {
  const file = path.join(root, PROFILE_FILE)
  const empty = { name: '', roleFocus: '', squad: '', platform: '', experience: '' }
  if (!existsSync(file)) return { exists: false, status: '', profile: empty }
  const text = readFileSync(file, 'utf8')
  const profile = { ...empty }
  for (const key of Object.keys(PROFILE_FIELDS) as ProfileKey[]) {
    const match = text.match(profileLine(key))
    if (match) profile[key] = cleanProfileValue(match[1])
  }
  const status = text.match(/^Status:\s*(\S+)/m)?.[1] ?? ''
  return { exists: true, status, profile }
}

const LOCAL_PACK = 'context/org-pack.local'

/** Reads only the top of the file — packs can hold large tables. */
function readPackHeader(file: string): { about: string; useWhen: string[] } | null {
  const buffer = Buffer.alloc(2048)
  const fd = openSync(file, 'r')
  const length = readSync(fd, buffer, 0, buffer.length, 0)
  closeSync(fd)
  const block = buffer.toString('utf8', 0, length).match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!block) return null
  const about = block[1].match(/^about:[ \t]*(.*)$/m)?.[1].trim() ?? ''
  const useWhen = (block[1].match(/^use-when:[ \t]*(.*)$/m)?.[1] ?? '')
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean)
  return about || useWhen.length ? { about, useWhen } : null
}

function readCompany(root: string) {
  const localDir = path.join(root, LOCAL_PACK)
  const local = existsSync(localDir)
  const dir = local ? localDir : path.join(root, 'context/org-pack')
  const present = new Set(existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : [])
  return {
    source: local ? 'local' : 'example',
    folder: local ? LOCAL_PACK : 'context/org-pack',
    files: COMPANY_FILES.map((name) => ({ name, present: present.has(name) })),
    extra: [...present]
      .filter((name) => !COMPANY_FILES.includes(name) && name !== 'README.md')
      .sort()
      .map((name) => ({ name, header: readPackHeader(path.join(dir, name)) })),
  }
}

type PackFileInput = { topic?: unknown; about?: unknown; useWhen?: unknown; content?: unknown }

function addPackFile(root: string, input: PackFileInput) {
  const localDir = path.join(root, LOCAL_PACK)
  if (!existsSync(localDir)) {
    throw new Error('Set up your company pack first — ask the harness to build your org-pack.')
  }
  const topic = text(input.topic, 'Name', 40)
    .toUpperCase()
    .replace(/[\s_]+/g, '-')
    .replace(/^COMPANY-/, '')
    .replace(/\.MD$/, '')
  if (!/^[A-Z0-9]+(-[A-Z0-9]+)*$/.test(topic)) throw new Error('Name can use letters, numbers, and hyphens')
  const name = `COMPANY-${topic}.md`
  if (COMPANY_FILES.includes(name)) throw new Error(`${name} is a standard file. Edit it directly instead.`)
  const about = text(input.about, 'About', 140)
  if (!about) throw new Error('Say what the file is about')
  const useWhen = [
    ...new Set(
      text(input.useWhen, 'Use when', 200)
        .toLowerCase()
        .split(',')
        .map((word) => word.trim())
        .filter(Boolean),
    ),
  ]
  if (!useWhen.length) throw new Error('Add at least one "use when" word')
  if (useWhen.some((word) => !/^[a-z0-9][a-z0-9 -]*$/.test(word))) {
    throw new Error('"Use when" words can use letters, numbers, spaces, and hyphens')
  }
  if (typeof input.content !== 'string' || !input.content.trim()) throw new Error('Add the file content')
  if (input.content.length > MAX_PACK_FILE) throw new Error('Content is too large (250 KB max)')
  const body = `---\nabout: ${about}\nuse-when: ${useWhen.join(', ')}\n---\n\n${input.content.trim()}\n`
  try {
    writeFileSync(path.join(localDir, name), body, { flag: 'wx' })
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST')
      throw new Error(`${name} already exists. Pick another name.`, { cause: error })
    throw error
  }
}

const PACK_NAME = /^COMPANY-[A-Z0-9]+(-[A-Z0-9]+)*\.md$/

function readLocalPackFile(root: string, name: string) {
  if (!PACK_NAME.test(name)) throw new Error('Only COMPANY-*.md files can be read')
  const file = path.join(root, LOCAL_PACK, name)
  return existsSync(file) ? { name, content: readFileSync(file, 'utf8') } : { name, content: null }
}

type ReplaceInput = { name?: unknown; content?: unknown }

/** Replaces one local pack file. The previous copy goes to `.backups/`, which the harness never reads. */
function replacePackFile(root: string, input: ReplaceInput) {
  const localDir = path.join(root, LOCAL_PACK)
  if (!existsSync(localDir)) {
    throw new Error('Set up your company pack first — ask the harness to build your org-pack.')
  }
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  if (!PACK_NAME.test(name)) throw new Error('The file must be named COMPANY-<TOPIC>.md')
  if (typeof input.content !== 'string' || !input.content.trim()) throw new Error('The file is empty')
  if (input.content.length > MAX_PACK_FILE) throw new Error('The file is too large (250 KB max)')
  const file = path.join(localDir, name)
  let backup: string | null = null
  if (existsSync(file)) {
    const backups = path.join(localDir, '.backups')
    mkdirSync(backups, { recursive: true })
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    backup = path.posix.join(LOCAL_PACK, '.backups', name.replace(/\.md$/, `.${stamp}.md`))
    copyFileSync(file, path.join(root, backup))
  }
  writeFileSync(file, `${input.content.trimEnd()}\n`)
  return { file: path.posix.join(LOCAL_PACK, name), backup }
}

const SOURCE_EXT = new Set(['.md', '.markdown', '.css', '.json', '.txt'])

/** Saves an uploaded tokens or markdown file. Inbox only — never tokens.css. */
function saveSystemSource(root: string, input: { name?: unknown; content?: unknown }) {
  const rawName = typeof input.name === 'string' ? path.basename(input.name) : ''
  const ext = path.extname(rawName).toLowerCase()
  if (!SOURCE_EXT.has(ext)) throw new Error('Use a .md, .css, .json, or .txt file')
  const stem = rawName
    .slice(0, -ext.length)
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  if (!stem) throw new Error('The file needs a name')
  if (typeof input.content !== 'string' || !input.content.trim()) throw new Error('The file is empty')
  if (input.content.length > MAX_INBOX) throw new Error('The file is too large (500 KB max)')
  const dir = path.join(root, INBOX)
  mkdirSync(dir, { recursive: true })
  let filename = `${stem}${ext}`
  if (existsSync(path.join(dir, filename))) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    filename = `${stem}.${stamp}${ext}`
  }
  const dest = path.join(dir, filename)
  if (!path.resolve(dest).startsWith(`${path.resolve(dir)}${path.sep}`)) throw new Error('Bad file name')
  writeFileSync(dest, input.content.endsWith('\n') ? input.content : `${input.content}\n`)
  return { file: path.posix.join(INBOX, filename) }
}

function readChecks(root: string) {
  const config = (readJson(path.join(root, 'design-detector.config.json')) ?? {}) as {
    tokensPath?: string
    targetDirs?: string[]
    extensions?: string[]
  }
  const baseline = (readJson(path.join(root, 'design-detector.baseline.json')) ?? {}) as { total?: number }
  return {
    tokensPath: config.tokensPath ?? '',
    targetDirs: config.targetDirs ?? [],
    extensions: config.extensions ?? [],
    acceptedDebt: baseline.total ?? 0,
  }
}

function snapshot(root: string) {
  return {
    files: { profile: PROFILE_FILE, config: CONFIG_FILE },
    designer: readProfile(root),
    config: readConfig(root),
    configExists: existsSync(path.join(root, CONFIG_FILE)),
    company: readCompany(root),
    checks: readChecks(root),
  }
}

function oneOf(value: unknown, allowed: string[], label: string): string {
  if (typeof value !== 'string' || !allowed.includes(value)) {
    throw new Error(`${label} must be one of: ${allowed.join(', ')}`)
  }
  return value
}

function text(value: unknown, label: string, max: number): string {
  if (typeof value !== 'string') throw new Error(`${label} must be text`)
  const trimmed = value.trim()
  if (trimmed.length > max) throw new Error(`${label} can be up to ${max} characters`)
  if (/[\r\n]/.test(trimmed)) throw new Error(`${label} must be one line`)
  return trimmed
}

/** Adds a missing field after the last `- Field:` line of the top block, before the first `##` section. */
function insertProfileLine(body: string, line: string) {
  const sectionStart = body.search(/^## /m)
  const head = sectionStart === -1 ? body : body.slice(0, sectionStart)
  const fields = [...head.matchAll(/^- [^:\n]+:.*$/gm)]
  const last = fields[fields.length - 1]
  if (!last || last.index === undefined) return `${body.trimEnd()}\n${line}\n`
  const at = last.index + last[0].length
  return `${body.slice(0, at)}\n${line}${body.slice(at)}`
}

function writeProfile(root: string, next: Partial<Profile>) {
  const file = path.join(root, PROFILE_FILE)
  if (!existsSync(file)) throw new Error(`${PROFILE_FILE} doesn't exist yet. Run onboarding first.`)
  const current = readProfile(root).profile
  let body = readFileSync(file, 'utf8')
  let changed = false
  for (const key of Object.keys(next) as ProfileKey[]) {
    if (!(key in PROFILE_FIELDS)) continue
    let value = text(next[key], PROFILE_FIELDS[key], 120)
    if (value && key === 'roleFocus') value = oneOf(value, ROLE_FOCUS, 'Role focus')
    if (value && key === 'platform') value = oneOf(value, PLATFORMS, 'Primary platform')
    if (value && key === 'experience') value = oneOf(value, EXPERIENCE, 'Experience level')
    if (key === 'name' && !value) throw new Error('Name is required')
    if (value === current[key]) continue
    const line = `- ${PROFILE_FIELDS[key]}: ${value || UNSET}`
    body = profileLine(key).test(body) ? body.replace(profileLine(key), () => line) : insertProfileLine(body, line)
    changed = true
  }
  if (!changed) return
  const today = new Date().toISOString().slice(0, 10)
  body = /^Last updated:.*$/m.test(body) ? body.replace(/^Last updated:.*$/m, `Last updated: ${today}`) : body
  writeFileSync(file, body)
}

function writeConfig(
  root: string,
  next: {
    harness?: Partial<HarnessConfig['harness']>
    behaviour?: Partial<HarnessConfig['behaviour']>
    publicRepo?: boolean
  },
) {
  const merged = readConfig(root)
  if (typeof next.publicRepo === 'boolean') merged.publicRepo = next.publicRepo
  if (next.harness) {
    const s = next.harness
    if (s.name !== undefined) {
      merged.harness.name = text(s.name, 'Harness name', 40)
      if (!merged.harness.name) throw new Error('Harness name is required')
    }
    if (s.tagline !== undefined) merged.harness.tagline = text(s.tagline, 'Tagline', 140)
    if (s.defaultTheme !== undefined) merged.harness.defaultTheme = oneOf(s.defaultTheme, THEMES, 'Default theme')
  }
  if (next.behaviour) {
    const b = next.behaviour
    if (b.audit !== undefined) merged.behaviour.audit = oneOf(b.audit, AUDIT_MODES, 'Audit')
    for (const flag of BEHAVIOUR_FLAGS) {
      if (b[flag] === undefined) continue
      if (typeof b[flag] !== 'boolean') throw new Error(`${flag} must be on or off`)
      merged.behaviour[flag] = b[flag]
    }
  }
  writeFileSync(path.join(root, CONFIG_FILE), `${JSON.stringify(merged, null, 2)}\n`)
}

/** "New project" in the app: the template folder. A branch only when Git autopilot is on. */
function newProject(root: string, input: { name?: unknown }) {
  const name = text(input.name, 'Project name', 60)
  const slug = slugify(name)
  if (!slug) throw new Error('Give the project a name with letters or numbers')
  if (existsSync(path.join(root, 'projects', slug))) throw new Error(`There's already a project called ${slug}.`)
  const result = start(root, slug, { scaffold: true, title: name })
  return { slug, route: `playground/${slug}/facts`, branch: result.branch, message: result.message }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > MAX_INBOX + 20_000) reject(new Error('Request too large'))
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

/** Any open website can send requests to 127.0.0.1, so only the app's own pages may use this. */
function isSameOrigin(req: IncomingMessage): boolean {
  if (req.headers['sec-fetch-site'] === 'cross-site') return false
  const origin = req.headers.origin
  if (!origin) return true
  try {
    return new URL(origin).host === req.headers.host
  } catch {
    return false
  }
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

export function harnessSettingsPlugin(): Plugin {
  let root = process.cwd()
  return {
    name: 'harness-settings',
    apply: 'serve',
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      server.middlewares.use(NEW_PROJECT, async (req, res) => {
        if (!isSameOrigin(req)) return send(res, 403, { error: 'Same-origin requests only' })
        if (req.method !== 'POST') return send(res, 405, { error: 'Use POST' })
        try {
          return send(res, 200, newProject(root, JSON.parse((await readBody(req)) || '{}')))
        } catch (error) {
          return send(res, 400, { error: error instanceof Error ? error.message : 'Could not start the project' })
        }
      })
      server.middlewares.use(ENDPOINT, async (req, res) => {
        if (!isSameOrigin(req)) return send(res, 403, { error: 'Same-origin requests only' })
        try {
          if (req.method === 'GET') {
            const name = new URL(req.url ?? '', 'http://localhost').searchParams.get('file')
            return send(res, 200, name ? readLocalPackFile(root, name) : snapshot(root))
          }
          if (req.method !== 'POST') return send(res, 405, { error: 'Use GET or POST' })
          const body = JSON.parse((await readBody(req)) || '{}') as {
            profile?: Partial<Profile>
            harness?: Partial<HarnessConfig['harness']>
            studio?: Partial<HarnessConfig['harness']> // old key — still accepted
            behaviour?: Partial<HarnessConfig['behaviour']>
            publicRepo?: boolean
            packFile?: PackFileInput
            replacePackFile?: ReplaceInput
            systemSource?: { name?: unknown; content?: unknown }
          }
          if (body.systemSource) return send(res, 200, saveSystemSource(root, body.systemSource))
          if (body.replacePackFile) return send(res, 200, replacePackFile(root, body.replacePackFile))
          if (body.packFile) addPackFile(root, body.packFile)
          if (body.profile) writeProfile(root, body.profile)
          const identity = body.harness ?? body.studio
          if (identity || body.behaviour || typeof body.publicRepo === 'boolean') {
            writeConfig(root, { harness: identity, behaviour: body.behaviour, publicRepo: body.publicRepo })
          }
          return send(res, 200, snapshot(root))
        } catch (error) {
          return send(res, 400, { error: error instanceof Error ? error.message : 'Could not save settings' })
        }
      })
    },
  }
}
