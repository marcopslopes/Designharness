#!/usr/bin/env node
/**
 * Builds the skill roster, the how-to skill map, each skill page's
 * description block, and the public skill count from SKILL.md frontmatter.
 *
 * Adding a skill still means three hand edits: the skill file, one §2 row,
 * and one eval case. Then run this. Pointer skills (description says
 * "Do not route here") stay on disk for old links and are left out of the count.
 *
 *   node scripts/generate-skill-surfaces.mjs
 *   node scripts/generate-skill-surfaces.mjs --check
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import path from 'node:path'

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const check = process.argv.includes('--check')
const read = (rel) => readFileSync(path.join(repo, rel), 'utf8')
const START = '<!-- generated-from-skill: do not edit -->'
const END = '<!-- /generated-from-skill -->'
const MAP_START = '<!-- generated-skill-map -->'
const MAP_END = '<!-- /generated-skill-map -->'

function descriptionOf(text) {
  const fm = text.match(/^---\n([\s\S]*?)\n---/)
  if (!fm) return ''
  const lines = fm[1].split('\n')
  const buf = []
  let on = false
  for (const line of lines) {
    if (!on) {
      if (!line.startsWith('description:')) continue
      on = true
      const rest = line.slice('description:'.length).trim()
      if (rest && rest !== '>' && rest !== '>-' && rest !== '|' && rest !== '|-') buf.push(rest)
      continue
    }
    if (/^[A-Za-z0-9_-]+:/.test(line)) break
    buf.push(line.replace(/^\s+/, ''))
  }
  return buf.join(' ').replace(/\s+/g, ' ').trim()
}

function jobOf(description) {
  const head = description.split(/Triggers on:|Triggered by:/i)[0]
  const sentence = head.split(/(?<=\.)\s/)[0] || head
  return sentence.replace(/\s+/g, ' ').trim()
}

function triggersOf(description) {
  const at = description.search(/Triggers on:|Triggered by:/i)
  if (at < 0) return []
  const slice = description.slice(at).split(/Does NOT|Not a |Never /i)[0]
  return [...slice.matchAll(/"([^"]+)"/g)].map((m) => m[1].replace(/\s+/g, ' ').trim())
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function bodyJob(text) {
  const body = text.replace(/^---\n[\s\S]*?\n---\n?/, '')
  const para = body
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line && !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('-'))
  return (para || '').replace(/\s+/g, ' ').replace(/\.$/, '.')
}

const skillsDir = path.join(repo, 'harness/skills')
const skills = readdirSync(skillsDir)
  .filter((name) => existsSync(path.join(skillsDir, name, 'SKILL.md')))
  .sort()
  .map((name) => {
    const text = read(`harness/skills/${name}/SKILL.md`)
    const description = descriptionOf(text)
    const job = jobOf(description) || bodyJob(text)
    return {
      name,
      description,
      pointer: /do not route here/i.test(description),
      job,
      triggers: triggersOf(description),
    }
  })

const counted = skills.filter((s) => !s.pointer)

function pageBlock(skill) {
  const lines = [START, '']
  if (skill.job) lines.push(skill.job, '')
  if (!skill.pointer) {
    const triggers = skill.triggers.length
      ? skill.triggers.map((t) => `"${t}"`).join(' · ')
      : 'see the routing table'
    lines.push(`**Triggers:** ${triggers}`, '')
  }
  lines.push(END)
  return lines.join('\n')
}

function withBlock(markdown, block) {
  if (markdown.includes(START) && markdown.includes(END)) {
    const re = new RegExp(`${START}[\\s\\S]*?${END}`)
    return markdown.replace(re, block)
  }
  const lines = markdown.split('\n')
  const heading = lines.findIndex((line) => line.startsWith('# '))
  const at = heading === -1 ? 0 : heading + 1
  lines.splice(at, 0, '', block, '')
  return lines.join('\n').replace(/\n{3,}/g, '\n\n')
}

const roster = [
  '# Skill roster',
  '',
  'Generated from each skill\'s description by `scripts/generate-skill-surfaces.mjs`. Do not edit.',
  'Two pointer skills stay in `harness/skills/` so old links resolve, and are not in this list.',
  '',
  '| Skill | What it does |',
  '|---|---|',
  ...counted.map((s) => `| \`${s.name}\` | ${s.job.replace(/\|/g, '\\|')} |`),
  '',
].join('\n')

const cards = counted
  .map(
    (s) =>
      `    <div class="skill-card">\n      <div class="name">${escapeHtml(s.name)}</div>\n      <div class="job">${escapeHtml(s.job)}</div>\n    </div>`,
  )
  .join('\n')
const mapBlock = `${MAP_START}\n  <div class="section-label">Every skill, from its description</div>\n  <div class="skills-grid">\n${cards}\n  </div>\n${MAP_END}`

const writes = []

function queue(rel, next) {
  const prev = existsSync(path.join(repo, rel)) ? read(rel) : null
  if (prev !== next) writes.push([rel, next])
}

mkdirSync(path.join(repo, 'documentation/generated'), { recursive: true })
queue('documentation/generated/skill-roster.md', roster)

for (const skill of skills) {
  const rel = `documentation/skills/${skill.name}.md`
  const current = existsSync(path.join(repo, rel))
    ? read(rel)
    : `# ${skill.name}\n\nThe playbook is \`harness/skills/${skill.name}/SKILL.md\`.\n`
  queue(rel, withBlock(current, pageBlock(skill)))
}

const mapRel = 'public/how-to/system-map-agents-skills.html'
let map = read(mapRel)
if (map.includes(MAP_START) && map.includes(MAP_END)) {
  map = map.replace(new RegExp(`${MAP_START}[\\s\\S]*?${MAP_END}`), mapBlock)
} else {
  const anchor = '  <div class="section-label">What stays a person\'s call, always</div>'
  if (!map.includes(anchor)) throw new Error('system map has no insertion point')
  map = map.replace(anchor, `${mapBlock}\n\n${anchor}`)
}
queue(mapRel, map)

function walkMd(dir) {
  return readdirSync(path.join(repo, dir)).flatMap((name) => {
    const rel = path.posix.join(dir, name)
    return statSync(path.join(repo, rel)).isDirectory() ? walkMd(rel) : rel.endsWith('.md') ? [rel] : []
  })
}

const countClaim = (text) =>
  text.replace(
    /(?<![\d.])(\d{2,3})(\+?(?:\*\*)?\s+(?:specialized\s+|autonomous\s+)?skills\b)/gi,
    (_, _n, rest) => `${counted.length}${rest}`,
  )
for (const rel of ['README.md', 'INSTALL.md', 'PITCH.md', 'CONTRIBUTING.md', ...walkMd('documentation')]) {
  if (!existsSync(path.join(repo, rel))) continue
  queue(rel, countClaim(read(rel)))
}

if (check) {
  if (writes.length) {
    console.error(`docs:skills — ${writes.length} generated file(s) are stale. Run: node scripts/generate-skill-surfaces.mjs`)
    for (const [rel] of writes) console.error(`  ${rel}`)
    process.exit(1)
  }
  console.log(`docs:skills — ${counted.length} skills (${skills.length - counted.length} pointers omitted), surfaces match.`)
} else {
  for (const [rel, next] of writes) writeFileSync(path.join(repo, rel), next)
  console.log(`docs:skills — wrote ${writes.length} file(s); ${counted.length} skills in the count.`)
}
