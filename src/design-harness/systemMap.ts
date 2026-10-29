/**
 * System map data — read from the harness files, never a hand-kept list:
 * each role is `harness/agents/<name>.md` (H1, first paragraph, and the
 * skills its "## Owns" table points at), each skill's one-liner is the
 * first sentence of its `SKILL.md` description. Skills no role owns land
 * under "Any role".
 */
import { CONTEXT_DOCS, contextDocsOfKind, splitSkillFile, summarizeSkill, type ContextDocRoute } from './contextDocs'

export type MapSkill = { route: ContextDocRoute; label: string; purpose: string }

export type MapRole = {
  /** Missing for the "Any role" group, which has no role file. */
  route?: ContextDocRoute
  name: string
  job: string
  skills: MapSkill[]
}

const ROLE_ORDER = ['researcher', 'product-designer', 'content-designer', 'craft-reviewer', 'design-ops']
const SKILL_PREFIX = 'context/skills/'
const SKILL_PATH = /harness\/(?:skills\/)?([a-z0-9-]+)\/SKILL\.md/g

const plain = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const sentences = (text: string) => plain(text).split(/(?<=[.!?])\s+/)
const firstSentence = (text: string) => sentences(text)[0] ?? ''

/** Role files open with a tag line ("The evidence role.") — keep the sentence after it too. */
const roleJob = (intro: string) => {
  const [first = '', second] = sentences(intro)
  return first.length < 40 && second ? `${first} ${second}` : first
}

const roleRank = (route: string) => {
  const at = ROLE_ORDER.indexOf(route.replace('context/agents/', ''))
  return at < 0 ? ROLE_ORDER.length : at
}

export async function loadSystemMap(): Promise<MapRole[]> {
  const skillDocs = CONTEXT_DOCS.filter((doc) => doc.route.startsWith(SKILL_PREFIX))
  const skills = new Map(
    await Promise.all(
      skillDocs.map(async (doc) => {
        const { description } = splitSkillFile(await doc.load())
        const skill: MapSkill = {
          route: doc.route,
          label: doc.label,
          purpose: firstSentence(summarizeSkill(description).purpose),
        }
        return [doc.route.slice(SKILL_PREFIX.length), skill] as const
      }),
    ),
  )

  const owned = new Set<string>()
  const roleDocs = [...contextDocsOfKind('agent')].sort((a, b) => roleRank(a.route) - roleRank(b.route))
  const roles = await Promise.all(
    roleDocs.map(async (doc): Promise<MapRole> => {
      const raw = await doc.load()
      const name = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? doc.label
      const intro =
        raw
          .replace(/^#\s+.+$/m, '')
          .trim()
          .split(/\n\s*\n/)[0] ?? ''
      const owns = raw.split(/^##\s+Owns\s*$/m)[1]?.split(/^##\s/m)[0] ?? ''
      const names = [...new Set([...owns.matchAll(SKILL_PATH)].map((m) => m[1]))].filter((n) => skills.has(n))
      names.forEach((n) => owned.add(n))
      return { route: doc.route, name, job: roleJob(intro), skills: names.map((n) => skills.get(n)!) }
    }),
  )

  const shared = [...skills].filter(([name]) => !owned.has(name)).map(([, skill]) => skill)
  return shared.length > 0
    ? [
        ...roles,
        { name: 'Any role', job: 'No single role owns these — any of them runs them on request.', skills: shared },
      ]
    : roles
}
