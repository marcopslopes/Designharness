/**
 * Skill finder — keyword scoring over each skill's name, description and the
 * phrases that start it. No embeddings: a skill matches when it shares words
 * with the question, and the score says how many and where.
 *
 * Kept free of `import.meta.glob` so the unit tests can import it under Node.
 */

export type FinderSkill = {
  slug: string
  label: string
  /** First sentence of the description, in plain words. */
  purpose: string
  description: string
  /** Phrases a designer says that start the skill. */
  triggers: string[]
}

export type FinderMatch = {
  skill: FinderSkill
  score: number
  /** Question words the skill shares, as typed. */
  matched: string[]
  /** False when the shared words sit only in the description, not in the name or a trigger phrase. */
  strong: boolean
  /** A trigger phrase to show as "try saying", preferring the one closest to the question. */
  example?: string
}

/**
 * Per question word: found in the trigger phrase that shares the most words
 * with the question, in another trigger phrase, in the name, in the
 * description. Scaled by how rare the word is across all skills, so "write"
 * counts less than "screener".
 */
const WEIGHT = { bestPhrase: 3, otherPhrase: 2, name: 3, description: 1 } as const

const STOP_WORDS = new Set(
  (
    'a about an and any are as at be can could do does for from get have help how i if in into is it its ' +
    'like me my need of on or our please should skill skills so some that the there this to use want we ' +
    'what when where which who will with would you your x'
  ).split(' '),
)

function stem(word: string): string {
  let w = word
  if (w.length > 5 && w.endsWith('ing')) w = w.slice(0, -3)
  else if (w.length > 4 && w.endsWith('ed')) w = w.slice(0, -2)
  else if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1)
  if (w.length > 3 && w.endsWith('e')) w = w.slice(0, -1)
  return w
}

const words = (text: string) => text.toLowerCase().match(/[a-z0-9]+/g) ?? []

const stems = (text: string) => new Set(words(text).map(stem))

/** Question words worth matching, each with its stem. Stop words and repeats drop out. */
export function queryTerms(query: string): { word: string; stem: string }[] {
  const terms = new Map<string, string>()
  for (const word of words(query)) {
    if (word.length > 1 && !STOP_WORDS.has(word) && !terms.has(stem(word))) terms.set(stem(word), word)
  }
  return [...terms].map(([stem, word]) => ({ word, stem }))
}

const showable = (skill: FinderSkill) => (phrase: string) => {
  const lower = phrase.toLowerCase()
  const balanced = (open: string, close: string) => phrase.split(open).length === phrase.split(close).length
  return (
    phrase.trim().split(/\s+/).length >= 2 &&
    balanced('<', '>') &&
    balanced('[', ']') &&
    !/\b(?:skill|agent)\b/.test(lower) &&
    !lower.includes(skill.label.toLowerCase())
  )
}

/** A phrase to show as "try saying": two words or more, and not the skill's own name. */
export function examplePhrase(skill: FinderSkill): string | undefined {
  return skill.triggers.find(showable(skill))
}

type Indexed = {
  skill: FinderSkill
  phrases: Set<string>[]
  name: Set<string>
  description: Set<string>
  all: Set<string>
}

function indexSkill(skill: FinderSkill): Indexed {
  const phrases = skill.triggers.map(stems)
  const name = stems(`${skill.label} ${skill.slug.replace(/-/g, ' ')}`)
  const description = stems(skill.description)
  return {
    skill,
    phrases,
    name,
    description,
    all: new Set([...name, ...description, ...phrases.flatMap((p) => [...p])]),
  }
}

export function scoreSkills(query: string, skills: FinderSkill[]): FinderMatch[] {
  const terms = queryTerms(query)
  if (terms.length === 0) return []
  const indexed = skills.map(indexSkill)
  const rarity = new Map(
    terms.map((term) => {
      const df = indexed.filter((entry) => entry.all.has(term.stem)).length
      return [term.stem, Math.log(1 + indexed.length / Math.max(df, 1))]
    }),
  )

  return indexed
    .map((entry): FinderMatch => {
      const shared = (phrase: Set<string>) => terms.filter((term) => phrase.has(term.stem)).length
      const best = entry.phrases.reduce((top, phrase, i) => (shared(phrase) > shared(entry.phrases[top]) ? i : top), 0)
      let score = 0
      let strong = false
      const matched: string[] = []
      for (const term of terms) {
        const inBest = entry.phrases[best]?.has(term.stem) ?? false
        const inOther = !inBest && entry.phrases.some((phrase) => phrase.has(term.stem))
        const inName = entry.name.has(term.stem)
        const inDescription = entry.description.has(term.stem)
        const weight =
          (inBest ? WEIGHT.bestPhrase : inOther ? WEIGHT.otherPhrase : 0) +
          (inName ? WEIGHT.name : 0) +
          (inDescription ? WEIGHT.description : 0)
        if (weight === 0) continue
        matched.push(term.word)
        strong ||= inBest || inOther || inName
        score += weight * (rarity.get(term.stem) ?? 1)
      }
      const closest = entry.skill.triggers[best]
      const example =
        closest && entry.phrases[best] && shared(entry.phrases[best]) > 0 && showable(entry.skill)(closest)
          ? closest
          : examplePhrase(entry.skill)
      return { skill: entry.skill, score, matched, strong, example }
    })
    .filter((match) => match.score > 0)
    .sort(
      (a, b) => b.score - a.score || b.matched.length - a.matched.length || a.skill.label.localeCompare(b.skill.label),
    )
}

/**
 * Trigger phrases per skill from a routing table (`ORCHESTRATOR.md` §2,
 * `routes.md`): quoted phrases in the first cell, credited to the first known
 * skill named in the Chain cell. Group rows name no skill and are skipped.
 */
export function routePhrases(markdown: string, slugs: ReadonlySet<string>): Map<string, string[]> {
  const phrases = new Map<string, string[]>()
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|')) continue
    const [, intent = '', chain = ''] = line.split('|')
    const slug = [...chain.matchAll(/`([a-z0-9-]+)`/g)].map((m) => m[1]).find((name) => slugs.has(name))
    if (!slug) continue
    const found = [...intent.matchAll(/["“]([^"”]+)["”]/g)]
      .flatMap((m) => m[1].split(/\s+\/\s+/))
      .map((phrase) => phrase.trim())
      .filter(Boolean)
    if (found.length) phrases.set(slug, [...(phrases.get(slug) ?? []), ...found])
  }
  return phrases
}
