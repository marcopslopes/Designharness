/**
 * Context files — every harness instruction file becomes a page, found at
 * build time so the list never drifts from what agents actually read:
 *
 *   harness/ORCHESTRATOR.md              → #/context/orchestrator
 *   harness/references/<name>.md         → #/context/references/<name>
 *   harness/agents/<name>.md             → #/context/agents/<name>
 *   harness/skills/<name>/SKILL.md       → #/context/skills/<name>
 *   harness/<name>/SKILL.md              → #/context/skills/<name>   (harness-audit, onboarding)
 *
 * Files load when opened, not up front.
 */

const loaders = import.meta.glob<string>(
  [
    '../../harness/ORCHESTRATOR.md',
    '../../harness/references/*.md',
    '../../harness/agents/*.md',
    '../../harness/skills/*/SKILL.md',
    '../../harness/harness-audit/SKILL.md',
    '../../harness/designer-onboarding/SKILL.md',
  ],
  { query: '?raw', import: 'default' },
)

export type ContextDocKind = 'platform' | 'reference' | 'agent' | 'skill'

/** Branded so a failed `isContextDocRoute` check doesn't rule out other `context/*` strings. */
export type ContextDocRoute = `context/${string}` & { readonly __kind: 'context-doc' }

export type ContextDoc = {
  route: ContextDocRoute
  label: string
  kind: ContextDocKind
  /** Repo path, shown under the title. */
  path: string
  load: () => Promise<string>
}

const WORDS: Record<string, string> = {
  ui: 'UI',
  ux: 'UX',
  ia: 'IA',
  okr: 'OKR',
  ooux: 'OOUX',
  '1on1': '1:1',
  figma: 'Figma',
  confluence: 'Confluence',
}

function humanize(slug: string): string {
  const words = slug.split('-').map((word) => WORDS[word] ?? word)
  const [first = '', ...rest] = words
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(' ')
}

export const ORCHESTRATOR_PATH = 'harness/ORCHESTRATOR.md'

function describe(path: string): Omit<ContextDoc, 'load'> | undefined {
  const rel = path.replace(/^(\.\.\/)+/, '')
  if (rel === ORCHESTRATOR_PATH) {
    return { route: 'context/orchestrator' as ContextDocRoute, label: 'Orchestrator', kind: 'platform', path: rel }
  }
  const reference = rel.match(/^harness\/references\/(.+)\.md$/)
  if (reference) {
    const name = reference[1]
    return {
      route: `context/references/${name}` as ContextDocRoute,
      label: humanize(name),
      kind: 'reference',
      path: rel,
    }
  }
  const agent = rel.match(/^harness\/agents\/(.+)\.md$/)
  if (agent) {
    const name = agent[1]
    return { route: `context/agents/${name}` as ContextDocRoute, label: humanize(name), kind: 'agent', path: rel }
  }
  const skill = rel.match(/^harness\/(?:skills\/)?([^/]+)\/SKILL\.md$/)
  if (skill) {
    const name = skill[1]
    const kind: ContextDocKind = rel.startsWith('harness/skills/') ? 'skill' : 'platform'
    return { route: `context/skills/${name}` as ContextDocRoute, label: humanize(name), kind, path: rel }
  }
  return undefined
}

export const CONTEXT_DOCS: ContextDoc[] = Object.entries(loaders)
  .flatMap(([path, load]) => {
    const meta = describe(path)
    return meta ? [{ ...meta, load }] : []
  })
  .sort(
    (a, b) =>
      Number(b.path === ORCHESTRATOR_PATH) - Number(a.path === ORCHESTRATOR_PATH) || a.label.localeCompare(b.label),
  )

const BY_ROUTE = new Map<string, ContextDoc>(CONTEXT_DOCS.map((doc) => [doc.route, doc]))

export function isContextDocRoute(route: string): route is ContextDocRoute {
  return BY_ROUTE.has(route)
}

export function getContextDoc(route: ContextDocRoute): ContextDoc {
  return BY_ROUTE.get(route)!
}

export const contextDocsOfKind = (kind: ContextDocKind) => CONTEXT_DOCS.filter((doc) => doc.kind === kind)

export type SkillSummary = {
  purpose: string
  /** Phrases a designer says that start the skill. */
  triggers: string[]
  /** Boundaries and hand-offs to other skills. */
  notes: string[]
}

const TRIGGER_SENTENCE = /\btrigger(?:s|ed)? (?:on|by)\b|\buse (?:it )?when\b/i

/** Reads a skill's front-matter `description` as purpose → "Triggers on: …" → boundaries. */
export function summarizeSkill(description: string): SkillSummary {
  const sentences = description.split(/(?<=[.!?])\s+(?=[A-Z*`(])/).filter(Boolean)
  const firstTrigger = sentences.findIndex((s) => TRIGGER_SENTENCE.test(s))
  const purposeEnd = firstTrigger > 0 ? firstTrigger : 1
  const triggers = sentences
    .filter((s) => TRIGGER_SENTENCE.test(s))
    .flatMap((s) => [...s.matchAll(/["“]([^"”]+)["”]/g)].map((m) => m[1].trim()))
  return {
    purpose: sentences.slice(0, purposeEnd).join(' '),
    triggers: [...new Set(triggers)],
    notes: sentences.slice(purposeEnd).filter((s) => !TRIGGER_SENTENCE.test(s) && !/§|\b(?:below|above)\b/.test(s)),
  }
}

/** The one-paragraph `description` from a skill's front matter, and the body without it. */
export function splitSkillFile(raw: string): { description: string; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!match) return { description: '', body: raw.trimStart() }
  const lines = match[1].split('\n')
  const start = lines.findIndex((line) => line.startsWith('description:'))
  const parts: string[] = []
  if (start >= 0) {
    const inline = lines[start]
      .slice('description:'.length)
      .trim()
      .replace(/^[>|]-?$/, '')
    if (inline) parts.push(inline)
    for (const line of lines.slice(start + 1)) {
      if (line.trim() && !/^\s/.test(line)) break
      parts.push(line.trim())
    }
  }
  return { description: parts.filter(Boolean).join(' '), body: raw.slice(match[0].length).trimStart() }
}
