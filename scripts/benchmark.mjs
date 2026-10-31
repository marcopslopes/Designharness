#!/usr/bin/env node
// Runs the harness benchmark: each task as a fresh Claude Code chat in a
// throwaway worktree. See harness/harness-audit/references/benchmark.md.
import { spawn, execFileSync } from 'node:child_process'
import { appendFileSync, copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const BENCH = join(ROOT, 'harness/harness-audit/benchmark')
const EVALS = join(ROOT, 'harness/harness-audit/references/eval-prompts.md')
const RESULTS = join(ROOT, 'harness/logs/benchmark-results.jsonl')
const SKILL_PATH = /harness\/skills\/([^/]+)\/SKILL\.md$/

const fixture = (name) => readFileSync(join(BENCH, name), 'utf8')
const project = 'In the mobile-banking-dashboard project,'

const TASKS = [
  {
    id: 'research',
    expect: 'research-synthesis',
    prompt: () =>
      `Here's an interview from our Northline research. Anything interesting?\n\n${fixture('interview-transcript.md')}`,
  },
  {
    id: 'kickoff',
    expect: 'design-kickoff',
    prompt: () => `Let's start a new project from this brief.\n\n${fixture('new-project-brief.md')}`,
  },
  {
    id: 'small-edit',
    expect: 'ui-agent',
    prompt: () => `${project} swap the order of the two header buttons on the wallet home screen.`,
  },
  {
    id: 'new-screen',
    expect: 'ui-agent',
    prompt: () => `${project} add a transaction details screen that opens when you tap a transaction on wallet home.`,
  },
  {
    id: 'review',
    expect: 'ux-pattern',
    prompt: () => 'Critique the wallet home screen in the mobile-banking-dashboard project before I share it.',
  },
  {
    id: 'writing',
    expect: 'content',
    prompt: () =>
      `Improve the copy and button labels on the wallet home screen in the mobile-banking-dashboard project.`,
  },
  {
    id: 'stakeholder-message',
    expect: 'none',
    prompt: () =>
      `Write the kickoff meeting message to align stakeholders, from these notes.\n\n${fixture('stakeholder-notes.md')}`,
  },
  {
    id: 'reply',
    expect: 'none',
    prompt: () => `Reply to this question.\n\n${fixture('pasted-question.md')}`,
  },
  {
    id: 'tweak',
    expect: 'ui-agent',
    prompt: () => `${project} we're working on the wallet home screen. Make the balance label 2px larger.`,
  },
  {
    id: 'fresh-clone',
    expect: 'ui-agent',
    fresh: true,
    prompt: () => `${project} swap the order of the two header buttons on the wallet home screen.`,
  },
  {
    id: 'quick-question',
    expect: 'none',
    prompt: () => 'Quick question: what is 15% of 80?',
  },
  {
    id: 'challenge-fires',
    expect: 'challenge',
    prompt: () => `${project} build the consumer-bank hero again.`,
  },
  {
    id: 'challenge-quiet',
    expect: 'quiet',
    prompt: () => `${project} swap the order of the two header buttons on the wallet home screen.`,
  },
  {
    id: 'cloud-session',
    expect: 'ui-agent',
    cloud: true,
    prompt: () => `${project} swap the order of the two header buttons on the wallet home screen.`,
  },
]

const ALLOWED = [
  'Read',
  'Glob',
  'Grep',
  'Edit',
  'Write',
  'Bash(npm run:*)',
  'Bash(node:*)',
  'Bash(rg:*)',
  'Bash(ls:*)',
  'Bash(git status:*)',
  'Bash(git diff:*)',
  'Bash(git log:*)',
]
const DENIED = ['Bash(git push:*)', 'WebFetch', 'WebSearch']

function parseArgs(argv) {
  const opts = {
    model: 'sonnet',
    budget: '3',
    routing: false,
    task: null,
    limit: Infinity,
    runs: 1,
    label: null,
    dirty: false,
  }
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === '--routing') opts.routing = true
    else if (arg === '--dirty') opts.dirty = true
    else if (arg === '--task') opts.task = argv[++i]
    else if (arg === '--model') opts.model = argv[++i]
    else if (arg === '--budget') opts.budget = argv[++i]
    else if (arg === '--label') opts.label = argv[++i]
    else if (arg === '--limit') opts.limit = Number(argv[++i])
    else if (arg === '--runs') opts.runs = Number(argv[++i])
    else throw new Error(`Unknown option: ${arg}`)
  }
  return opts
}

function routingCases() {
  const cases = []
  for (const line of readFileSync(EVALS, 'utf8').split('\n')) {
    const match = line.match(/^\| (\d+) \| "(.+?)" .*?\| `([a-z0-9-]+)`/)
    if (match) cases.push({ id: `eval-${match[1]}`, prompt: () => match[2], expect: match[3] })
  }
  return cases
}

/** A throwaway clone, so its branch ref can't move this repo's `main`. */
function makeWorktree(task, opts) {
  const dir = mkdtempSync(join(tmpdir(), 'dh-bench-'))
  execFileSync('git', ['clone', '--shared', '-q', ROOT, dir])
  execFileSync('git', ['checkout', '-q', '-B', task.fresh ? 'main' : 'bench/run', 'HEAD'], { cwd: dir })
  if (opts.dirty) {
    const diff = execFileSync('git', ['diff', 'HEAD'], { cwd: ROOT })
    if (diff.length) execFileSync('git', ['apply'], { cwd: dir, input: diff })
  }
  if (!task.fresh && !task.cloud) {
    copyFileSync(join(BENCH, 'designer-profile.fixture.md'), join(dir, 'designer-profile.local.md'))
  }
  if (existsSync(join(ROOT, 'node_modules'))) symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'))
  return dir
}

function removeWorktree(dir) {
  rmSync(dir, { recursive: true, force: true })
}

function runTask(task, opts, cwd) {
  const args = [
    '-p',
    task.prompt(),
    '--output-format',
    'stream-json',
    '--verbose',
    '--model',
    opts.model,
    '--no-session-persistence',
    '--permission-mode',
    'acceptEdits',
    '--strict-mcp-config',
    '--max-budget-usd',
    opts.budget,
    '--allowedTools',
    ...ALLOWED,
    '--disallowedTools',
    ...DENIED,
  ]
  const record = { steps: 0, tools: {}, skills: [], lastText: '', result: null }
  return new Promise((done) => {
    const child = spawn('claude', args, { cwd, stdio: ['ignore', 'pipe', 'pipe'] })
    const timer = setTimeout(() => child.kill('SIGTERM'), opts.routing ? 180_000 : 900_000)
    let buffer = ''
    child.stdout.on('data', (chunk) => {
      buffer += chunk
      let newline
      while ((newline = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, newline)
        buffer = buffer.slice(newline + 1)
        let event
        try {
          event = JSON.parse(line)
        } catch {
          continue
        }
        if (event.type === 'assistant') {
          for (const part of event.message?.content ?? []) {
            if (part.type === 'text') record.lastText += part.text + '\n'
            if (part.type !== 'tool_use') continue
            record.steps++
            record.tools[part.name] = (record.tools[part.name] ?? 0) + 1
            const skill = String(part.input?.file_path ?? '').match(SKILL_PATH)?.[1]
            if (skill && !record.skills.includes(skill)) record.skills.push(skill)
            if (skill && opts.routing) child.kill('SIGTERM')
          }
        }
        if (event.type === 'result') record.result = event
      }
    })
    child.on('close', () => {
      clearTimeout(timer)
      done(record)
    })
  })
}

function webSearches(record) {
  return (record.tools.WebSearch ?? 0) + (record.tools.WebFetch ?? 0)
}

function skillHit(task, record) {
  const searches = webSearches(record)
  const asked = /\?\s*$/.test(record.lastText.trim()) || Boolean(record.tools.AskUserQuestion)
  if (task.expect === 'none') return record.skills.length === 0 && searches === 0
  if (task.expect === 'challenge') return /parked/i.test(record.lastText)
  if (task.expect === 'quiet') {
    return record.skills.includes('ui-agent') && !/parked/i.test(record.lastText)
  }
  const found = record.skills.includes(task.expect)
  if (task.id === 'tweak') return found && record.skills.every((name) => name === 'ui-agent') && searches === 0
  return found
}

function summarize(task, opts, record, commit) {
  const result = record.result ?? {}
  const usage = result.usage ?? {}
  return {
    date: new Date().toISOString(),
    commit,
    model: opts.model,
    mode: opts.routing ? 'routing' : 'task',
    label: opts.label,
    task: task.id,
    expect: task.expect,
    hit: skillHit(task, record),
    searches: webSearches(record),
    firstSkill: record.skills[0] ?? null,
    skills: record.skills,
    steps: record.steps,
    tools: record.tools,
    turns: result.num_turns ?? null,
    durationMs: result.duration_ms ?? null,
    costUsd: result.total_cost_usd ?? null,
    input: usage.input_tokens ?? null,
    cacheRead: usage.cache_read_input_tokens ?? null,
    cacheWrite: usage.cache_creation_input_tokens ?? null,
    output: usage.output_tokens ?? null,
    endedOnQuestion: /\?\s*$/.test(record.lastText.trim()) || Boolean(record.tools.AskUserQuestion),
    error: result.is_error ? String(result.result ?? 'error').slice(0, 200) : null,
  }
}

const opts = parseArgs(process.argv.slice(2))
const pool = opts.routing ? routingCases() : TASKS
const selected = pool.filter((task) => !opts.task || task.id === opts.task).slice(0, opts.limit)
if (!selected.length) throw new Error(`No task matches "${opts.task}"`)

const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT }).toString().trim()
const rows = []
for (let run = 1; run <= opts.runs; run++) {
  for (const task of selected) {
    process.stdout.write(`${opts.label ? opts.label + ' ' : ''}${run}/${opts.runs} ${task.id} … `)
      const dir = makeWorktree(task, opts)
    try {
      const row = summarize(task, opts, await runTask(task, opts, dir), commit)
      if (task.cloud && existsSync(join(dir, 'designer-profile.local.md'))) row.hit = false
      row.run = run
      appendFileSync(RESULTS, JSON.stringify(row) + '\n')
      rows.push(row)
      console.log(row.error ?? `${row.hit ? 'hit' : 'MISS'}, ${row.steps} steps`)
    } finally {
      removeWorktree(dir)
    }
  }
}

const tokensOf = (row) => (row.input === null ? null : row.input + row.cacheRead + row.cacheWrite)
const secondsOf = (row) => (row.durationMs === null ? null : Math.round(row.durationMs / 1000))

console.table(
  rows.map((row) => ({
    run: row.run,
    task: row.task,
    expect: row.expect,
    first: row.firstSkill,
    hit: row.hit,
    skills: row.skills.join('+'),
    search: row.searches,
    steps: row.steps,
    tokensIn: tokensOf(row),
    cost: row.costUsd,
    seconds: secondsOf(row),
    asked: row.endedOnQuestion,
  })),
)

function median(values) {
  const sorted = values.filter((n) => n != null).sort((a, b) => a - b)
  if (!sorted.length) return null
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

if (opts.runs > 1) {
  const byTask = new Map()
  for (const row of rows) {
    if (!byTask.has(row.task)) byTask.set(row.task, [])
    byTask.get(row.task).push(row)
  }
  console.log(`\nmedian ${opts.label ?? ''} (${opts.runs} runs)`)
  console.table(
    [...byTask.entries()].map(([task, group]) => ({
      task,
      hits: group.filter((row) => row.hit).length + '/' + group.length,
      steps: median(group.map((row) => row.steps)),
      tokens: median(group.map(tokensOf)),
      seconds: median(group.map(secondsOf)),
    })),
  )
}
