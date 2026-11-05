/** The lines of a SKILL.md one read covered: `all`, or `<offset>+<limit>`. */
export function rangeOf(input = {}) {
  const offset = Number(input.offset ?? input.start_line ?? 0) || 0
  const limit = Number(input.limit ?? 0) || 0
  return offset <= 1 && !limit ? 'all' : `${offset || 1}+${limit || 'end'}`
}

/**
 * How one read relates to earlier reads of the same skill in the same chat:
 * `first`, `part` (another range of a file already being read), or `reread`
 * (a range already read). Only `first` and `reread` count as uses.
 */
export function readKind(events, { skill, session, range }) {
  if (!session || session === 'unknown') return 'first'
  const earlier = events.filter((e) => e.skill === skill && e.session === session)
  if (!earlier.length) return 'first'
  return earlier.some((e) => (e.range ?? 'all') === range) ? 'reread' : 'part'
}

export const countsAsUse = (event) => event.kind !== 'part'
