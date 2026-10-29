/**
 * Facts about a `projects/<slug>/` folder, read from `brief.md`, `about.md`,
 * `docs/**` text and screen file paths only. Shared by Design Harness (`projectsIndex.ts`) and
 * `scripts/studio-context.mjs`, so the app and the agent's facts agree.
 *
 * Plain functions, no imports: Node runs this file directly (type stripping),
 * so keep to erasable TypeScript — no enums, namespaces, or parameter properties.
 */

/** brief.md "Ownership" — feeds the Team Gallery. */
export type ProjectOwnership = {
  /** Unset when blank, a template placeholder, or `UNKNOWN — flagged`. */
  designer?: string
  squad?: string
  gallery: 'visible' | 'hidden'
}

/** brief.md "Case study summary" — problem and goal. Status comes from the truth block. */
export type ProjectCaseStudy = {
  problem: string
  goal: string
  /** Truth-block `status`, not a line in the case-study section. */
  status: string
}

export type ScreenFileFacts = {
  /** e.g. `/projects/clients-list-redesign/screens/ClientsListPrototypePage.tsx` */
  file: string
  slug: string
  exportName: string
  kind: 'screens' | 'states'
  /** Folder under `screens/` (not `states`) — becomes a sidebar group. */
  folder?: string
  route: `playground/${string}`
  label: string
  /** States only — label of the screen this state is named after (`ClientsListNoMatchesPage` → "Clients list"). */
  parentLabel?: string
  /** Set when this screen is one platform of a shared prototype, e.g. "iOS". */
  platform?: string
  /** Shared name of that prototype, e.g. "Wallet home". */
  platformBase?: string
}

export type DocFileFacts = {
  /** e.g. `/projects/clients-list-redesign/docs/discovery/client-segments-flow.mermaid` */
  file: string
  slug: string
  kind: 'markdown' | 'mermaid'
  /** Folder under `docs/` — becomes a sidebar group, merged with a `screens/` folder of the same name. */
  folder?: string
  route: `playground/${string}`
  label: string
}

/** Header facts shown above a project's About page. Blank and template values are left out. */
export type ProjectBriefFacts = {
  status?: string
  platform?: string
  stage?: string
}

/** `---`-fenced `key: value` lines at the top of a Markdown file, and the rest of it. */
/** The `about.md` starter copied from `projects/_template/` carries this note until someone writes it. */
export function isUnfilledStarter(raw: string): boolean {
  return /Delete this comment\./.test(raw)
}

export function splitFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/)
  if (!match) return { meta: {}, body: raw }
  const meta: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/)
    if (kv) meta[kv[1]] = kv[2].trim()
  }
  return { meta, body: raw.slice(match[0].length).trimStart() }
}

function splitWords(name: string): string[] {
  return name.split(/(?<=[a-z0-9])(?=[A-Z])/)
}

export function sentenceCase(words: string[]): string {
  const text = words.join(' ').toLowerCase()
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function screenWords(exportName: string): string[] {
  const words = splitWords(exportName.replace(/Page$/, ''))
  return words.length > 1 && words[words.length - 1] === 'Prototype' ? words.slice(0, -1) : words
}

/** Last word of a screen name, or its `screens/<folder>/`, when that word is a platform. */
const PLATFORM_LABELS: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  iphone: 'iOS',
  desktop: 'Desktop',
  mobile: 'Mobile',
  tablet: 'Tablet',
}

export const PLATFORM_ORDER = ['iOS', 'Android', 'Desktop', 'Mobile', 'Tablet']

function platformOf(words: string[], folder?: string): { base: string; platform?: string } {
  const last = words[words.length - 1]?.toLowerCase()
  if (last && PLATFORM_LABELS[last] && words.length > 1) {
    return { base: sentenceCase(words.slice(0, -1)), platform: PLATFORM_LABELS[last] }
  }
  const fromFolder = folder ? PLATFORM_LABELS[folder.toLowerCase()] : undefined
  return { base: sentenceCase(words), platform: fromFolder }
}

/**
 * Screens that share a name and differ only by platform (a trailing Android
 * or Desktop, or a `screens/desktop/` folder) become one prototype. The plain
 * one next to an Android or Desktop screen is treated as iOS.
 */
function assignPlatforms(items: ScreenFileFacts[]): ScreenFileFacts[] {
  const parsed = items
    .filter((item) => item.kind === 'screens')
    .map((item) => ({ item, ...platformOf(screenWords(item.exportName), item.folder) }))
  const groups = new Map<string, typeof parsed>()
  for (const row of parsed) {
    const key = `${row.item.slug}::${row.base}`
    groups.set(key, [...(groups.get(key) ?? []), row])
  }
  const byFile = new Map<string, { platform: string; base: string }>()
  for (const rows of groups.values()) {
    const named = rows.filter((row) => row.platform)
    if (rows.length < 2 || named.length < 1) continue
    const filled = rows.map((row) => {
      if (row.platform) return row
      const hasIos = named.some((other) => other.platform === 'iOS')
      const hasTwin = named.some((other) => other.platform === 'Android' || other.platform === 'Desktop')
      return hasTwin && !hasIos ? { ...row, platform: 'iOS' } : row
    })
    const platforms = new Set(filled.map((row) => row.platform).filter((platform) => platform !== undefined))
    if (platforms.size < 2) continue
    for (const row of filled) {
      if (row.platform) byFile.set(row.item.file, { platform: row.platform, base: row.base })
    }
  }
  return items.map((item) => {
    const hit = byFile.get(item.file)
    return hit ? { ...item, platform: hit.platform, platformBase: hit.base } : item
  })
}

/** The template heading is `# Brief — <slug>`; a bare slug falls back to the folder name. */
export function projectTitle(slug: string, brief: string | undefined): string {
  const heading = brief
    ?.match(/^#\s+(.+)$/m)?.[1]
    ?.replace(/^Brief\s*[—–-]\s*/i, '')
    .trim()
  if (!heading || /^[a-z0-9-]+$/.test(heading)) return sentenceCase(slug.split('-'))
  return heading
}

/** Body of the `## <heading>…` section, up to the next `## `. */
function briefSection(source: string | undefined, heading: string): string {
  const start = source?.search(new RegExp(`^##\\s+${heading}`, 'm')) ?? -1
  if (!source || start < 0) return ''
  const rest = source.slice(start).split('\n').slice(1).join('\n')
  const end = rest.search(/^##\s/m)
  return end < 0 ? rest : rest.slice(0, end)
}

/** `- **Label:** value` inside a section; template `<placeholders>` count as empty. */
function briefField(section: string, label: string): string | undefined {
  const value = section.match(new RegExp(`^-\\s+\\*\\*${label}:\\*\\*[ \\t]*(.*)$`, 'm'))?.[1]?.trim()
  return value && !value.startsWith('<') ? value : undefined
}

const TRUTH_STATUSES = ['exploring', 'draft', 'approved', 'closed'] as const

/**
 * First word of an old status line, before the truth block existed.
 * STUB → exploring, EXAMPLE → draft, DRAFT → draft, APPROVED → approved.
 */
const LEGACY_STATUS: Record<string, (typeof TRUTH_STATUSES)[number]> = {
  stub: 'exploring',
  example: 'draft',
  draft: 'draft',
  approved: 'approved',
  closed: 'closed',
  exploring: 'exploring',
}

function fencedYaml(brief: string): string | undefined {
  return brief.match(/```yaml\r?\n([\s\S]*?)```/)?.[1]
}

function statusFromYaml(block: string): string | undefined {
  const raw = block.match(/^status:\s*(\S+)/m)?.[1]?.toLowerCase()
  if (!raw || !(TRUTH_STATUSES as readonly string[]).includes(raw)) return undefined
  return raw
}

/** An unknown from the truth block. A plain string has no owner and blocks nothing named. */
export type TruthUnknown = {
  text: string
  owner?: string
  blocks?: string
}

function unquoteYaml(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

/** Body lines of one top-level list in the truth block. `[]` is an empty list. */
function yamlKeyList(block: string, key: string): string[] | undefined {
  const lines = block.split(/\r?\n/)
  const start = lines.findIndex((line) => new RegExp(`^${key}:`).test(line))
  if (start < 0) return undefined
  const inline = lines[start].slice(key.length + 1).trim()
  if (inline === '[]') return []
  const body: string[] = []
  for (const line of lines.slice(start + 1)) {
    if (/^\S/.test(line)) break
    if (line.trim()) body.push(line)
  }
  return body
}

/** One list item from the truth block. A plain string only has `text`. */
type TruthItem = {
  text: string
  owner?: string
  blocks?: string
  source?: string
}

/**
 * A truth-block list. A dash line is a plain string. `text:` opens an object;
 * `owner`, `blocks`, and `source` on the following lines are optional.
 */
function briefItems(brief: string | undefined, key: string): TruthItem[] {
  const block = brief ? fencedYaml(brief) : undefined
  if (!block) return []
  const lines = yamlKeyList(block, key)
  if (!lines) return []
  const items: TruthItem[] = []
  let openObject = false
  for (const line of lines) {
    const plain = line.match(/^\s+-\s+(?!text:)(.*)$/)
    if (plain) {
      const text = unquoteYaml(plain[1])
      if (text) items.push({ text })
      openObject = false
      continue
    }
    const textField = line.match(/^\s+-\s+text:\s*(.*)$/)
    if (textField) {
      const text = unquoteYaml(textField[1])
      if (text) items.push({ text })
      openObject = Boolean(text)
      continue
    }
    const field = line.match(/^\s+(owner|blocks|source):\s*(.*)$/)
    const current = items.at(-1)
    if (!field || !openObject || !current) continue
    const value = unquoteYaml(field[2])
    if (value) current[field[1] as 'owner' | 'blocks' | 'source'] = value
  }
  return items
}

/** Truth-block `unknowns`. */
export function briefUnknowns(brief: string | undefined): TruthUnknown[] {
  return briefItems(brief, 'unknowns').map(({ text, owner, blocks }) => ({
    text,
    ...(owner ? { owner } : {}),
    ...(blocks ? { blocks } : {}),
  }))
}

/** A note about the tools this session, not a question about the project. */
const TOOL_STATE = /this session|not connected/i

function questionRank(item: TruthUnknown): number {
  if (item.blocks) return 0
  if (item.owner) return 1
  return 2
}

/**
 * Unknowns as the chip and panel show them. Tool-state notes are dropped.
 * Order is blocking, then owned, then the rest, keeping brief order inside each.
 */
export function presentedUnknowns(brief: string | undefined): TruthUnknown[] {
  return briefUnknowns(brief)
    .filter((item) => !TOOL_STATE.test(item.text))
    .sort((a, b) => questionRank(a) - questionRank(b))
}

/** A clause after the dash that describes the file, not the question. */
const TEMPLATE_TAIL = /\bUNKNOWN\b|the brief names|not reviewed|this session|not connected|the designer opened/i

/** Question text for the screen. Drops a template tail and the word UNKNOWN in capitals. */
export function displayQuestion(text: string): string {
  const parts = text.split(/\s+[—–]\s+/)
  const tail = parts.slice(1).join(' ')
  const kept = parts.length > 1 && TEMPLATE_TAIL.test(tail) ? parts[0] : text
  return kept.replace(/\bUNKNOWN\b/g, 'unknown').replace(/\s+/g, ' ').trim()
}

const GALLERY_LINE_MAX = 40

function clipLine(line: string, max = GALLERY_LINE_MAX): string {
  if (line.length <= max) return line
  let cut = line.slice(0, max - 1)
  const space = cut.lastIndexOf(' ')
  if (space > 0) cut = cut.slice(0, space)
  return `${cut.trimEnd()}…`
}

/** Truth-block `assumptions`. */
export function briefAssumptions(brief: string | undefined): { text: string; source?: string }[] {
  return briefItems(brief, 'assumptions').map(({ text, source }) => ({
    text,
    ...(source ? { source } : {}),
  }))
}

/** Truth-block `parked` directions. */
export function briefParked(brief: string | undefined): string[] {
  return briefItems(brief, 'parked').map((item) => item.text)
}

const STATUS_LABEL: Record<(typeof TRUTH_STATUSES)[number], string> = {
  exploring: 'Exploring',
  draft: 'Draft',
  approved: 'Approved',
  closed: 'Closed',
}

function statusLabel(status: string): string {
  return STATUS_LABEL[status as (typeof TRUTH_STATUSES)[number]] ?? status
}

/** Chip: "{Status} · {n} blocking" when anything blocks, otherwise "{Status} · {n} open questions". */
export function truthChipLabel(brief: string | undefined): string | undefined {
  const status = briefStatus(brief)
  if (!status) return undefined
  const label = statusLabel(status)
  const items = presentedUnknowns(brief)
  const blocking = items.filter((item) => item.blocks).length
  if (blocking > 0) return `${label} · ${blocking} blocking`
  if (items.length === 0) return label
  const questions = items.length === 1 ? 'open question' : 'open questions'
  return `${label} · ${items.length} ${questions}`
}

/** "{Status} · {top question}" for a gallery or share card, kept to about 40 characters. */
export function truthLine(brief: string | undefined): string | undefined {
  const status = briefStatus(brief)
  if (!status) return undefined
  const label = statusLabel(status)
  const top = presentedUnknowns(brief)[0]
  if (!top) return label
  return clipLine(`${label} · ${displayQuestion(top.text)}`)
}

function statusFromLegacyLine(brief: string): string | undefined {
  const header = brief.split(/^##\s/m)[0] ?? ''
  const text = briefField(header, 'Status') ?? header.match(/^\*\*Status:\s*([^*\n]+)/m)?.[1]
  const word = text?.trim().split(/[\s—(]/)[0]?.toLowerCase()
  return word ? LEGACY_STATUS[word] : undefined
}

/**
 * Project status. The truth block is the source. An old `Status:` line is
 * read only when that block has no `status`, and only to map it onto the
 * same four words.
 */
export function briefStatus(brief: string | undefined): string | undefined {
  if (!brief) return undefined
  const block = fencedYaml(brief)
  if (block) {
    const fromYaml = statusFromYaml(block)
    if (fromYaml) return fromYaml
  }
  return statusFromLegacyLine(brief)
}

/** Template defaults that mean "not filled in yet". */
const UNFILLED_FACTS = new Set(['iOS / Android / web', 'discovery / existing design / pre-handoff'])

export function briefFacts(brief: string | undefined): ProjectBriefFacts {
  const header = brief?.split(/^##\s/m)[0] ?? ''
  const fact = (label: string) => {
    const value = briefField(header, label)?.replace(/\s*\(see [^)]*\)\s*$/, '')
    return value && !UNFILLED_FACTS.has(value) ? value : undefined
  }
  return { status: briefStatus(brief), platform: fact('Platform'), stage: fact('Stage') }
}

/** Plain body of a brief section (e.g. `Intent`), or `undefined` when empty or a placeholder. */
export function briefSectionText(brief: string | undefined, heading: string): string | undefined {
  const text = briefSection(brief, heading).trim()
  return text && !text.startsWith('<') ? text : undefined
}

/** Placeholders people write instead of a name; none of them is a person to group by. */
const UNRESOLVED_DESIGNER = /^(unknown|unassigned|tbd|tbc|none|n\/a|-)(?!\w)/i

export function ownershipFromBrief(brief: string | undefined): ProjectOwnership {
  const section = briefSection(brief, 'Ownership')
  const designer = briefField(section, 'Designer')
  return {
    designer: designer && !UNRESOLVED_DESIGNER.test(designer) ? designer : undefined,
    squad: briefField(section, 'Squad'),
    gallery: briefField(section, 'Gallery')?.toLowerCase().startsWith('hidden') ? 'hidden' : 'visible',
  }
}

export function caseStudyFromBrief(brief: string | undefined): ProjectCaseStudy | undefined {
  const section = briefSection(brief, 'Case study summary')
  const problem = briefField(section, 'Problem')
  const goal = briefField(section, 'Goal')
  if (!problem || !goal) return undefined
  return { problem, goal, status: briefStatus(brief) ?? '' }
}

/** Why a brief can't appear in the Team Gallery yet, or `undefined` when it can (designer card aside). */
export function galleryBlocker(
  ownership: ProjectOwnership,
  caseStudy: ProjectCaseStudy | undefined,
): string | undefined {
  if (!ownership.designer) return 'Designer unresolved'
  if (ownership.gallery === 'hidden') return 'Gallery: hidden'
  if (!caseStudy) return 'Case study summary incomplete'
  return undefined
}

/**
 * Routes and labels for every `screens/*Page.tsx`, `screens/<folder>/*Page.tsx`
 * and `screens/states/*Page.tsx` path. A state named after one of its
 * project's screens drops that prefix (`ClientsListNoMatchesPage` → "No matches").
 */
export function screenFileFacts(screenFiles: string[], stateFiles: string[]): ScreenFileFacts[] {
  const parse = (file: string) => {
    const match = file.match(/^\/projects\/([^/]+)\/screens\/(?:([^/]+)\/)?([^/]+)\.tsx$/)
    if (!match) return undefined
    const folder = match[2] && match[2] !== 'states' ? match[2] : undefined
    return { file, slug: match[1], folder, exportName: match[3], words: screenWords(match[3]) }
  }
  const screens = screenFiles.map(parse).filter((s) => s !== undefined)
  const states = stateFiles.map(parse).filter((s) => s !== undefined)

  const parentScreen = (slug: string, words: string[]) =>
    screens
      .filter((s) => s.slug === slug && s.words.length < words.length && s.words.every((w, i) => w === words[i]))
      .sort((a, b) => b.words.length - a.words.length)[0]

  return assignPlatforms(
    [
      ...screens.map((s) => ({ ...s, kind: 'screens' as const, shown: s.words, parentLabel: undefined })),
      ...states.map((s) => {
        const parent = parentScreen(s.slug, s.words)
        return {
          ...s,
          folder: undefined,
          kind: 'states' as const,
          shown: parent ? s.words.slice(parent.words.length) : s.words,
          parentLabel: parent ? sentenceCase(parent.words) : undefined,
        }
      }),
    ].map(({ file, slug, exportName, kind, folder, shown, parentLabel }) => {
      const slugPart = shown.join('-').toLowerCase()
      return {
        file,
        slug,
        exportName,
        kind,
        folder,
        route: kind === 'states' ? `playground/${slug}/state/${slugPart}` : `playground/${slug}/${slugPart}`,
        label: sentenceCase(shown),
        parentLabel,
      } as const
    }),
  )
}

function docLabel(kind: DocFileFacts['kind'], source: string, name: string): string {
  if (kind === 'mermaid') {
    const title = source.match(/^\s*accTitle:\s*(.+)$/m)?.[1]
    return title?.trim() || sentenceCase(name.split('-'))
  }
  const { meta, body } = splitFrontMatter(source)
  const h1 = body.match(/^#\s+(.+)$/m)?.[1]
  return meta.title || h1?.trim() || sentenceCase(name.split('-'))
}

/** Routes and labels for every `docs/*.{md,mermaid}` and `docs/<folder>/*.{md,mermaid}` file. */
export function docFileFacts(docs: { file: string; source: string }[]): DocFileFacts[] {
  return docs
    .map(({ file, source }) => {
      const match = file.match(/^\/projects\/([^/]+)\/docs\/(?:([^/]+)\/)?([^/]+)\.(md|mermaid)$/)
      if (!match) return undefined
      const [, slug, folder, name, ext] = match
      const kind = ext === 'mermaid' ? ('mermaid' as const) : ('markdown' as const)
      const docPath = folder ? `${folder}/${name}` : name
      return {
        file,
        slug,
        kind,
        folder,
        route: `playground/${slug}/doc/${docPath}` as const,
        label: docLabel(kind, source, name),
      }
    })
    .filter((d) => d !== undefined)
}
