import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import type { ServerResponse } from 'node:http'
import type { Plugin } from 'vite'

/**
 * Dev-only usage API for `#/skills/usage`.
 * The year is git history under `projects/`: a screen file is prototype work,
 * a case study or its deck is case-study work. Skill counts are reads of
 * `harness/skills/<name>/SKILL.md` logged by the usage hook.
 */

const ENDPOINT = '/__harness/usage'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

type Cell = {
  date: string
  prototype: number
  caseStudy: number
  future: boolean
}

type Week = { month: string; cells: Cell[] }

export type UsagePayload = {
  weeks: Week[]
  prototypeDays: number
  caseStudyDays: number
  bothDays: number
  skillEvents: number
  skills: { name: string; count: number }[]
  tokenTurns: number
  avgInput: number
  avgOutput: number
  avgTotal: number
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function iso(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function kindOf(file: string): 'prototype' | 'caseStudy' | null {
  if (/\/case-study\.md$/.test(file) || /\/artifacts\/decks\//.test(file)) return 'caseStudy'
  if (/\/screens\//.test(file)) return 'prototype'
  return null
}

function activity(root: string, since: string): Map<string, { prototype: number; caseStudy: number }> {
  const days = new Map<string, { prototype: Set<string>; caseStudy: Set<string> }>()
  let out: string
  try {
    out = execFileSync(
      'git',
      ['log', `--since=${since}`, '--name-only', '--pretty=format:---%ad', '--date=short', '--', 'projects'],
      { cwd: root, encoding: 'utf8', maxBuffer: 10_000_000 },
    )
  } catch {
    return new Map()
  }
  let date = ''
  for (const line of out.split('\n')) {
    if (line.startsWith('---')) {
      date = line.slice(3).trim()
      continue
    }
    const file = line.trim()
    const kind = date && file ? kindOf(file) : null
    if (!kind) continue
    const bucket = days.get(date) ?? { prototype: new Set<string>(), caseStudy: new Set<string>() }
    bucket[kind].add(file)
    days.set(date, bucket)
  }
  return new Map(
    [...days.entries()].map(([day, files]) => [
      day,
      { prototype: files.prototype.size, caseStudy: files.caseStudy.size },
    ]),
  )
}

function skills(root: string): { name: string; count: number }[] {
  const log = path.join(root, 'harness/logs/skill-usage.jsonl')
  if (!existsSync(log)) return []
  const counts = new Map<string, number>()
  for (const line of readFileSync(log, 'utf8').split('\n')) {
    if (!line.trim()) continue
    try {
      const event = JSON.parse(line) as { skill?: string }
      if (!event.skill) continue
      counts.set(event.skill, (counts.get(event.skill) ?? 0) + 1)
    } catch {
      /* a torn line should not blank the year */
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

function tokenAverage(root: string): Pick<UsagePayload, 'tokenTurns' | 'avgInput' | 'avgOutput' | 'avgTotal'> {
  const empty = { tokenTurns: 0, avgInput: 0, avgOutput: 0, avgTotal: 0 }
  const log = path.join(root, 'harness/logs/token-usage.jsonl')
  if (!existsSync(log)) return empty
  const turns = new Map<string, { input: number; output: number }>()
  readFileSync(log, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      if (!line.trim()) return
      try {
        const event = JSON.parse(line) as { generationId?: string; input?: number; output?: number }
        if (typeof event.input !== 'number' || typeof event.output !== 'number') return
        turns.set(event.generationId || `line-${index}`, { input: event.input, output: event.output })
      } catch {
        /* a torn line should not blank the year */
      }
    })
  const rows = [...turns.values()]
  if (!rows.length) return empty
  const input = rows.reduce((sum, row) => sum + row.input, 0)
  const output = rows.reduce((sum, row) => sum + row.output, 0)
  const count = rows.length
  return {
    tokenTurns: count,
    avgInput: Math.round(input / count),
    avgOutput: Math.round(output / count),
    avgTotal: Math.round((input + output) / count),
  }
}

function payload(root: string): UsagePayload {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(today)
  end.setDate(end.getDate() - end.getDay())
  const start = new Date(end)
  start.setDate(start.getDate() - 52 * 7)
  const byDay = activity(root, iso(start))
  const todayIso = iso(today)
  const weeks: Week[] = []
  let prototypeDays = 0
  let caseStudyDays = 0
  let bothDays = 0
  let lastMonth = -1

  for (let week = 0; week < 53; week += 1) {
    const cells: Cell[] = []
    let month = ''
    for (let day = 0; day < 7; day += 1) {
      const date = new Date(start)
      date.setDate(start.getDate() + week * 7 + day)
      const key = iso(date)
      if (day === 0 && date.getMonth() !== lastMonth) {
        month = MONTHS[date.getMonth()]
        lastMonth = date.getMonth()
      }
      const hit = byDay.get(key) ?? { prototype: 0, caseStudy: 0 }
      const future = key > todayIso
      if (!future && hit.prototype) prototypeDays += 1
      if (!future && hit.caseStudy) caseStudyDays += 1
      if (!future && hit.prototype && hit.caseStudy) bothDays += 1
      cells.push({ date: key, prototype: future ? 0 : hit.prototype, caseStudy: future ? 0 : hit.caseStudy, future })
    }
    weeks.push({ month, cells })
  }

  const skillRows = skills(root)
  return {
    weeks,
    prototypeDays,
    caseStudyDays,
    bothDays,
    skillEvents: skillRows.reduce((sum, row) => sum + row.count, 0),
    skills: skillRows.slice(0, 8),
    ...tokenAverage(root),
  }
}

export function harnessUsagePlugin(): Plugin {
  let root = process.cwd()
  return {
    name: 'harness-usage',
    apply: 'serve',
    configResolved(config) {
      root = config.root
    },
    configureServer(server) {
      server.middlewares.use(ENDPOINT, (req, res) => {
        if (req.method !== 'GET') return send(res, 405, { error: 'Use GET' })
        try {
          return send(res, 200, payload(root))
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Could not read usage'
          return send(res, 500, { error: message })
        }
      })
    },
  }
}
