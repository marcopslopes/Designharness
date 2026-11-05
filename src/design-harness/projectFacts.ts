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

/** brief.md `## Why` — problem and goal (older briefs: "Case study summary"). Status comes from the truth block. */
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
  /** Truth-block `system` — design system ids, the first one primary. */
  systems?: string[]
  /** Truth-block `example: true` — a fictional sample, not the designer's work. */
  example?: boolean
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

/** `- **Label:** value` (or `**Label:** value`) inside a section; template `<placeholders>` count as empty. */
function briefField(section: string, label: string): string | undefined {
  const value = section.match(new RegExp(`^(?:-\\s+)?\\*\\*${label}:\\*\\*[ \\t]*(.*)$`, 'm'))?.[1]?.trim()
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

/** A one-line `key: value` in the truth block, without a trailing `# comment`. Empty means not set. */
function yamlScalar(brief: string | undefined, key: string): string | undefined {
  const block = brief ? fencedYaml(brief) : undefined
  const value = block
    ?.match(new RegExp(`^${key}:[ \\t]*(.*)$`, 'm'))?.[1]
    ?.replace(/\s+#.*$/, '')
    .trim()
  return value || undefined
}

/** Truth-block `system: mobile` or `system: desktop, mobile`. Ids are lowercased; the first is primary. */
export function briefSystems(brief: string | undefined): string[] {
  return (yamlScalar(brief, 'system') ?? '')
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((id) => unquoteYaml(id).toLowerCase())
    .filter(Boolean)
}

/** Truth-block `example: true`. */
export function briefIsExample(brief: string | undefined): boolean {
  return yamlScalar(brief, 'example')?.toLowerCase() === 'true'
}

/** What picking a design system needs from one. */
export type SystemChoice = { id: string; platforms: string[]; isDefault: boolean }

/** Where in a lowercased Platform line this system's first word appears, or -1. */
function platformMatch(system: SystemChoice, platform: string): number {
  const positions = system.platforms.map((word) => platform.search(new RegExp(`\\b${word}\\b`))).filter((i) => i >= 0)
  return positions.length ? Math.min(...positions) : -1
}

/**
 * The systems a project uses, primary first. The truth block's `system` wins;
 * an id no system has is skipped. Without one, the Platform line's words pick,
 * in the order the line names them. No match → the default system.
 */
export function projectSystemIds(
  facts: Pick<ProjectBriefFacts, 'platform' | 'systems'>,
  systems: SystemChoice[],
): string[] {
  const named = (facts.systems ?? []).filter((id) => systems.some((system) => system.id === id))
  if (named.length) return [...new Set(named)]
  const platform = (facts.platform ?? '').toLowerCase()
  const matched = systems
    .map((system) => ({ id: system.id, at: platformMatch(system, platform) }))
    .filter((match) => match.at >= 0)
    .sort((a, b) => a.at - b.at)
  if (matched.length) return matched.map((match) => match.id)
  const fallback = systems.find((system) => system.isDefault)
  return fallback ? [fallback.id] : []
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
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
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
  return kept
    .replace(/\bUNKNOWN\b/g, 'unknown')
    .replace(/\s+/g, ' ')
    .trim()
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
  const word = text
    ?.trim()
    .split(/[\s—(]/)[0]
    ?.toLowerCase()
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
  const systems = briefSystems(brief)
  return {
    status: briefStatus(brief),
    platform: fact('Platform'),
    stage: fact('Stage'),
    ...(systems.length ? { systems } : {}),
    ...(briefIsExample(brief) ? { example: true } : {}),
  }
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

/** Problem and goal from `## Why`; briefs written before it keep them under `## Case study summary`. */
export function caseStudyFromBrief(brief: string | undefined): ProjectCaseStudy | undefined {
  const why = briefSection(brief, 'Why')
  const summary = briefSection(brief, 'Case study summary')
  const problem = briefField(why, 'Problem') ?? briefField(summary, 'Problem')
  const goal = briefField(why, 'What changes') ?? briefField(summary, 'Goal')
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
  if (!caseStudy) return 'Why incomplete'
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

/** `lead` is a page's headline statement, larger than body text. */
export type BoardBlockKind = 'lead' | 'body' | 'item' | 'label' | 'callout'
/** `marker` is a list item's number, or `•` for a bullet. */
export type BoardBlock = { kind: BoardBlockKind; text: string; marker?: string }
/** `wide` takes a row of its own on a story page, at the intro's width. */
export type BoardOutlineSection = { heading: string; blocks: BoardBlock[]; wide?: boolean }
export type BoardOutline = { title: string; sections: BoardOutlineSection[] }

function plainInline(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\w)/g, '$1$2')
    .replace(/(^|\s)_([^_\n]+)_(?=\s|[.,;:!?]|$)/g, '$1$2')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * A markdown page as board pages: one per `##` section (or `###` when the page has none), each a list of
 * blocks — paragraphs, list items and table rows, sub-headings, quotes. The markdown file stays the source.
 */
export function markdownBoardOutline(source: string | undefined, fallbackTitle: string): BoardOutline {
  const body = splitFrontMatter(source ?? '')
    .body.replace(/<!--[\s\S]*?-->/g, '')
    .replace(/^\s*```[\s\S]*?^\s*```\s*$/gm, '')
  const sectionLevel = /^##\s/m.test(body) ? 2 : 3
  let title = ''
  const sections: BoardOutlineSection[] = []
  let current: BoardOutlineSection = { heading: '', blocks: [] }
  let para: string[] = []
  let paraKind: BoardBlockKind = 'body'
  let paraMarker: string | undefined
  let tableHeader = true

  const push = (kind: BoardBlockKind, raw: string, marker?: string) => {
    const text = plainInline(raw)
    if (text) current.blocks.push(marker ? { kind, text, marker } : { kind, text })
  }
  const flush = () => {
    push(paraKind, para.join(' '), paraMarker)
    para = []
    paraKind = 'body'
    paraMarker = undefined
  }
  const close = () => {
    flush()
    if (current.blocks.length) sections.push(current)
  }

  for (const raw of body.split('\n')) {
    const line = raw.trim()
    if (!line.startsWith('|')) tableHeader = true
    if (!line || /^(-{3,}|\*{3,})$/.test(line)) {
      flush()
      continue
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flush()
      const level = heading[1].length
      if (level === 1) title ||= plainInline(heading[2])
      else if (level <= sectionLevel) {
        close()
        current = { heading: plainInline(heading[2]), blocks: [] }
      } else push('label', heading[2])
      continue
    }
    if (line.startsWith('|')) {
      flush()
      if (tableHeader || /^\|[\s:|-]+\|$/.test(line)) {
        tableHeader = false
        continue
      }
      const cells = line
        .replace(/^\||\|$/g, '')
        .split('|')
        .map(plainInline)
        .filter(Boolean)
      if (cells.length) push('item', cells.join(' · '))
      continue
    }
    const item = line.match(/^(?:[-*+]|(\d+)[.)])\s+(.*)$/)
    if (item) {
      flush()
      para = [item[2]]
      paraKind = 'item'
      paraMarker = item[1] ?? '•'
      continue
    }
    if (line.startsWith('>')) {
      if (paraKind !== 'callout') flush()
      paraKind = 'callout'
      para.push(line.replace(/^>\s?/, ''))
      continue
    }
    para.push(line)
  }
  close()
  return { title: title || fallbackTitle, sections }
}

/** Truth-block `evidence`. */
export function briefEvidence(brief: string | undefined): { text: string; source?: string }[] {
  return briefItems(brief, 'evidence').map(({ text, source }) => ({ text, ...(source ? { source } : {}) }))
}

/** Dated `decisions.md` entries with a **Chosen:** line, newest first. Templates and kickoff answers have none. */
export function chosenDecisions(decisions: string | undefined): { title: string; chosen: string }[] {
  const entries = (decisions ?? '')
    .split(/^#{2,3}\s+/m)
    .slice(1)
    .reverse()
  return entries
    .flatMap((entry) => {
      const [first, ...rest] = entry.split('\n')
      const date = first.match(/^(\d{4}-\d{2}-\d{2})\s+[—–-]\s+(.*)$/)
      const chosen = rest.join('\n').match(/^\*\*Chosen:\*\*\s*(.+)$/m)?.[1]
      return date && chosen ? [{ date: date[1], title: plainInline(date[2]), chosen: plainInline(chosen) }] : []
    })
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ title, chosen }) => ({ title, chosen }))
}

/** "How we'd know" rows as one line each: metric, then baseline and target when they're set. */
function measurementLines(brief: string | undefined): string[] {
  const rows = briefSection(brief, "How we'd know")
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('|') && !/^\|[\s:|-]+\|$/.test(line))
    .slice(1)
    .map((line) =>
      line
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((cell) => plainInline(cell)),
    )
  return rows.flatMap(([layer, metric, baseline, target]) => {
    if (!metric) return []
    const known = (value?: string) => value && !/^(—|-|unknown)$/i.test(value)
    const numbers = [known(baseline) ? `now ${baseline}` : '', known(target) ? `target ${target}` : '']
      .filter(Boolean)
      .join(', ')
    return [`${layer}: ${metric}${numbers ? ` (${numbers})` : ''}`]
  })
}

const STORY_ITEMS = 4

/**
 * The project in one board page: problem, evidence, what was chosen, how we'd know, what's still open.
 * Read from the brief's truth block and summary, and from `decisions.md`. The files stay the source.
 */
export function projectStoryOutline(project: { title: string; brief?: string; decisions?: string }): BoardOutline {
  const { brief } = project
  const summary = caseStudyFromBrief(brief)
  const who = briefSection(brief, '3\\. Users & context').match(/^Who is this for:\s*(.+?)(?:\.|$)/m)?.[1]
  const item = (text: string, marker = '•'): BoardBlock => ({ kind: 'item', text: clipLine(text, 200), marker })
  const sections: BoardOutlineSection[] = [
    {
      heading: '',
      blocks: [
        ...(summary?.problem ? [{ kind: 'lead' as const, text: summary.problem }] : []),
        ...(who ? [{ kind: 'body' as const, text: `For ${who}.` }] : []),
        ...(summary?.goal ? [{ kind: 'callout' as const, text: `Goal: ${summary.goal}` }] : []),
      ],
    },
    {
      heading: 'Evidence',
      blocks: briefEvidence(brief)
        .slice(0, STORY_ITEMS)
        .map(({ text }) => item(text)),
    },
    {
      heading: 'What we chose',
      blocks: chosenDecisions(project.decisions)
        .slice(0, STORY_ITEMS)
        .map(({ title, chosen }, index) => item(`${title.replace(/:\s*/g, ' – ')}: ${chosen}`, String(index + 1))),
    },
    {
      heading: "How we'd know",
      blocks: measurementLines(brief)
        .slice(0, STORY_ITEMS + 1)
        .map((text) => item(text)),
    },
    {
      heading: 'Still open',
      blocks: presentedUnknowns(brief)
        .slice(0, STORY_ITEMS + 1)
        .map(({ text, owner, blocks }) =>
          item(`${owner ? `${owner}: ` : ''}${displayQuestion(text)}${blocks ? ` (blocks ${blocks})` : ''}`),
        ),
    },
  ]
  return { title: project.title, sections: sections.filter((section) => section.blocks.length) }
}

/** A sentence ends at punctuation followed by a space, so `findings.md` and `€1,284.50` stay whole. */
const SENTENCE = /(?:[^.!?]|[.!?](?!\s|$))+(?:[.!?]+(?=\s|$)|$)/g

const capitalised = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** The opening sentences of a paragraph, enough to carry the point: at least `min` characters, clipped at `max`. */
function opening(text: string, min = 80, max = 240): string {
  const sentences = text.match(SENTENCE)?.map((sentence) => sentence.trim()) ?? [text]
  let out = ''
  for (const sentence of sentences) {
    out = out ? `${out} ${sentence}` : sentence
    if (out.length >= min) break
  }
  return clipLine(out, max)
}

/** `**Label.** rest`, `**Label:** rest`, `**Label** — rest` or `Label: rest`. */
function labelled(paragraph: string): { label: string; rest: string } | undefined {
  const bold = paragraph.match(/^\*\*([^*]+?)[.:]?\*\*[.:]?\s*(?:[—–-]\s*)?([\s\S]*)$/)
  if (bold) return { label: bold[1].trim(), rest: bold[2].trim() }
  const plain = paragraph.match(/^([A-Z][\w '’]{1,30}):\s+([\s\S]+)$/)
  return plain ? { label: plain[1], rest: plain[2].trim() } : undefined
}

/** A case-study chapter as paragraphs, list items as their own entries, nested items folded into their parent. */
function chapterParagraphs(source: string, heading: string): string[] {
  return briefSection(source, heading)
    .replace(/^Source:.*$/gm, '')
    .split(/\n\s*\n/)
    .flatMap((block) => block.split(/\n(?=[-*]\s)/))
    .map((entry) => entry.replace(/^[-*]\s+/, '').trim())
    .filter(Boolean)
}

/** What an option paragraph settled on: its **Chosen:** clause, the chosen row of the table after it, or its opening. */
function optionLine(rest: string, table: string | undefined): string {
  const chosen = rest.match(/\*\*Chosen(?: \([^)]*\))?:\*\*\s*([\s\S]*?)(?=\s\*\*|$)/)?.[1]
  if (chosen) return opening(plainInline(chosen), 0, 200)
  const rows = (table ?? '')
    .split('\n')
    .filter((line) => line.startsWith('|') && !/^\|[\s:|-]+\|$/.test(line))
    .slice(1)
    .map((line) =>
      line
        .replace(/^\||\|$/g, '')
        .split('|')
        .map(plainInline),
    )
  const pick = rows.find((cells) => cells.some((cell) => /^chosen\b/i.test(cell)))
  if (pick) {
    const others = rows.filter((cells) => cells !== pick && cells.some((cell) => /^rejected\b/i.test(cell)))
    return `${pick[0]}${others.length ? ` (over ${others.map((cells) => cells[0]).join(', ')})` : ''}`
  }
  return opening(plainInline(rest), 120, 200)
}

/**
 * The story page read from `case-study.md` (`case-study` skill): the framing as the headline, then the arc in
 * order — problem, evidence, what we tried, what we chose, what should change, what's still open — and the
 * chapters the case study skipped. Live prototype and sources stay off the page: the board shows them beside it.
 */
export function caseStudyStoryOutline(source: string, title: string): BoardOutline {
  const chapterOne = briefSection(source, '1\\.')
  const field = (name: string) =>
    plainInline(chapterOne.match(new RegExp(`^-\\s+\\*\\*${name}:\\*\\*\\s*(.+)$`, 'm'))?.[1] ?? '')
  const item = (text: string, marker = '•'): BoardBlock => ({ kind: 'item', text: clipLine(text, 220), marker })

  const problem = chapterParagraphs(source, '2\\.').map(plainInline)

  const evidence = markdownBoardOutline(briefSection(source, '3\\.').replace(/^Source:.*$/gm, ''), '')
    .sections.flatMap((section) => section.blocks)
    .filter((block) => block.kind === 'item' || block.kind === 'callout')
    .slice(0, STORY_ITEMS)
    .map((block) => ({ ...block, text: clipLine(block.text.replace(/^\d+ · /, ''), 220) }))

  const options = chapterParagraphs(source, '4\\.')
  const tried = options.flatMap((paragraph, index) => {
    const option = labelled(paragraph)
    if (!option) return []
    const table = options[index + 1]?.startsWith('|') ? options[index + 1] : undefined
    return [`${option.label}: ${optionLine(option.rest, table)}`]
  })

  const decision = chapterParagraphs(source, '5\\.').flatMap((paragraph): BoardBlock[] => {
    const part = labelled(paragraph)
    if (!part) return []
    const text = plainInline(part.rest)
    return /^why\b/i.test(part.label)
      ? [{ kind: 'body', text: `Why: ${opening(text, 120, 280)}` }]
      : [{ kind: 'callout', text: capitalised(clipLine(text, 320)) }]
  })

  const open: string[] = []
  const change: BoardBlock[] = []
  chapterParagraphs(source, '7\\.').forEach((paragraph, index) => {
    const [first, ...nested] = paragraph.split(/\n\s*[-*]\s+/)
    const part = labelled(first)
    if (part && /^still open/i.test(part.label)) {
      open.push(...(nested.length ? nested : (part.rest.match(SENTENCE) ?? [])).map(plainInline).filter(Boolean))
    } else if (part && /^built\b/i.test(part.label)) return
    else if (part) change.push(item(`${part.label}: ${opening(plainInline(part.rest), 120, 220)}`))
    else if (index === 0) change.push({ kind: 'body', text: plainInline(first) })
    else change.push(item(opening(plainInline(first), 120, 220)))
  })

  const notYet = chapterParagraphs(source, 'Skipped').flatMap((entry) => {
    const skip = plainInline(entry).match(/^Chapter ([2-7]),\s*([^—:]+?)\s*[—:]\s*(.+)$/)
    return skip ? [item(`${skip[2]}: ${opening(skip[3], 0, 200)}`)] : []
  })

  const sections: BoardOutlineSection[] = [
    {
      heading: '',
      blocks: [
        ...(field('Framing') ? [{ kind: 'lead' as const, text: field('Framing') }] : []),
        ...(field('Intro') ? [{ kind: 'body' as const, text: field('Intro') }] : []),
        ...(field('Who') ? [{ kind: 'label' as const, text: field('Who') }] : []),
      ],
    },
    {
      heading: 'The problem',
      wide: true,
      blocks: problem.slice(0, 1).map((text) => ({ kind: 'body' as const, text: opening(text, 160, 360) })),
    },
    { heading: 'Evidence', blocks: evidence },
    {
      heading: 'What we tried',
      blocks: tried.slice(0, STORY_ITEMS).map((text, index) => item(text, String(index + 1))),
    },
    { heading: 'What we chose', blocks: decision },
    { heading: 'What should change', blocks: change.slice(0, STORY_ITEMS) },
    { heading: 'Still open', blocks: open.slice(0, STORY_ITEMS).map((text) => item(text)) },
    { heading: 'Not yet', blocks: notYet },
  ]
  return { title, sections: sections.filter((section) => section.blocks.length) }
}
