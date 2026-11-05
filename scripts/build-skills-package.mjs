#!/usr/bin/env node
/**
 * Builds the standalone Design Skills package — a separate product from the
 * full Harness — as a plugin marketplace for Claude Code and Codex, also
 * readable by `npx skills add`.
 *
 *   node scripts/build-skills-package.mjs                     # writes ../design-skills
 *   node scripts/build-skills-package.mjs --out <dir> --version 0.2.0
 *
 * Source of truth stays in `harness/skills/`. Only git-tracked files ship.
 * Each skill is made self-contained: shared `harness/references/*` and other
 * skills' reference files it points at are copied into the skill folder and
 * the paths rewritten. Harness-only paths (ORCHESTRATOR, org pack, projects/)
 * stay as written; `references/standalone-mode.md` tells the agent what to do
 * when they're missing.
 */
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i > -1 ? process.argv[i + 1] : fallback
}
const out = path.resolve(repo, arg('out', '../design-skills'))
const version = arg('version', '0.1.0')
const owner = { name: 'Design Harness', url: 'https://github.com/marcopslopes/thedesignharness' }
const packageRepo = 'https://github.com/marcopslopes/design-skills'
const harnessRepo = 'https://github.com/marcopslopes/thedesignharness'
const site = 'https://thedesignharness.com/skills.html'
const templates = path.join(repo, 'scripts/skills-package')
const groups = JSON.parse(readFileSync(path.join(templates, 'groups.json'), 'utf8'))
const standaloneMode = readFileSync(path.join(templates, 'standalone-mode.md'), 'utf8')

const tracked = new Set(
  execFileSync('git', ['-C', repo, 'ls-files', '-z', 'harness/skills', 'harness/references'])
    .toString()
    .split('\0')
    .filter((f) => f && !f.split('/').some((p) => p.includes('.local') || p === '.DS_Store')),
)
const skills = [
  ...new Set([...tracked].map((f) => f.match(/^harness\/skills\/([^/]+)\/SKILL\.md$/)?.[1]).filter(Boolean)),
].sort()
const textFile = (f) => /\.(md|mdc|txt|json|ya?ml|csv|html?|css|mjs|js|ts|tsx|sh)$/i.test(f)
const isDir = (p) => [...tracked].some((f) => f.startsWith(p.endsWith('/') ? p : `${p}/`))

/** Where a Harness repo path lands inside one packaged skill, or null to leave the text alone. */
function target(skill, repoPath) {
  const own = `harness/skills/${skill}/`
  if (repoPath.startsWith(own)) return { to: repoPath.slice(own.length) || './' }
  let m = repoPath.match(/^harness\/references\/(.+)$/)
  if (m && tracked.has(repoPath)) return { to: `references/shared/${m[1]}`, copy: true }
  m = repoPath.match(/^harness\/skills\/([^/]+)(\/.*)?$/)
  if (m && skills.includes(m[1])) {
    const rest = (m[2] || '/').slice(1)
    if (!rest || rest === 'SKILL.md' || isDir(repoPath)) return { to: `../${m[1]}/${rest}` }
    if (tracked.has(repoPath)) return { to: `references/from-${m[1]}/${rest.replace(/^references\//, '')}`, copy: true }
  }
  return null
}

const inlinePath = /(?<![\w./-])harness\/[A-Za-z0-9_./-]*[A-Za-z0-9_/-](?![<*\w])/g
const relativeLink = /\]\((\.{1,2}\/[^)\s#]+)(#[^)\s]*)?\)/g

/** Rewrites one file's text; returns repo paths that must be copied in. */
function rewrite(skill, text, repoFile, packagedFile) {
  const copies = []
  const unresolved = []
  const fromDir = path.posix.dirname(packagedFile)
  const rel = (to) => {
    const r = path.posix.relative(fromDir, path.posix.normalize(to))
    return r.startsWith('.') ? r : `./${r}`
  }
  text = text.replace(relativeLink, (all, link, hash = '') => {
    const repoPath = path.posix.normalize(path.posix.join(path.posix.dirname(repoFile), link))
    const t = target(skill, repoPath)
    if (t) {
      if (t.copy) copies.push(repoPath)
      return `](${rel(t.to)}${hash})`
    }
    if (existsSync(path.join(repo, repoPath))) return `](${harnessRepo}/blob/main/${repoPath}${hash})`
    return all
  })
  text = text.replace(inlinePath, (repoPath) => {
    const t = target(skill, repoPath)
    if (!t) {
      unresolved.push(repoPath)
      return repoPath
    }
    if (t.copy) copies.push(repoPath)
    return t.to
  })
  return { text, copies, unresolved }
}

const preamble =
  '> **Design Skills package.** This skill comes from the Design Harness and works on its own. ' +
  "If a path it mentions isn't in your project, follow [references/standalone-mode.md](references/standalone-mode.md).\n"

function withFrontmatter(skill, text) {
  if (/^---\r?\n[\s\S]*?\r?\n---\r?\n/.test(text)) return text
  const body = text.replace(/^# .+\r?\n/, '')
  const first =
    body
      .split(/\r?\n\s*\r?\n/)
      .map((s) => s.trim())
      .find((s) => s && !/^[#*>`|-]/.test(s)) || skill
  return `---\nname: ${skill}\ndescription: ${JSON.stringify(first.replace(/\s+/g, ' '))}\n---\n\n${text}`
}

function withPreamble(text) {
  const front = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)[0]
  const body = text.slice(front.length)
  const h1 = body.match(/^(\s*# .+\r?\n)/)
  return h1 ? front + h1[1] + '\n' + preamble + body.slice(h1[1].length) : front + '\n' + preamble + '\n' + body
}

/** Finds a top-level frontmatter field: its value and the line span it occupies. */
function frontField(text, field) {
  const front = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || ''
  const lines = front.split(/\r?\n/)
  const start = lines.findIndex((l) => l.startsWith(`${field}:`))
  if (start < 0) return { value: '', lines, start, end: start }
  let end = start + 1
  while (end < lines.length && !/^[A-Za-z_-]+:/.test(lines[end])) end++
  const head = lines[start].slice(field.length + 1).trim()
  const value =
    /^[>|]/.test(head) || !head
      ? lines
          .slice(start + 1, end)
          .map((l) => l.trim())
          .filter(Boolean)
          .join(' ')
      : lines
          .slice(start, end)
          .join(' ')
          .slice(field.length + 1)
          .trim()
  return { value: value.replace(/^['"]|['"]$/g, ''), lines, start, end }
}

/** Skill loaders cap descriptions at 1024 characters; cut at the last sentence that fits. */
function fitDescription(text) {
  const { value, lines, start, end } = frontField(text, 'description')
  if (value.length <= 1024) return text
  const cut = value.slice(0, 1024)
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('.) '), cut.lastIndexOf('." '))
  const short = stop > 300 ? cut.slice(0, stop + 1) : cut.slice(0, cut.lastIndexOf(' ')) + '…'
  lines.splice(start, end - start, `description: ${JSON.stringify(short)}`)
  return text.replace(/^---\r?\n[\s\S]*?\r?\n---/, `---\n${lines.join('\n')}\n---`)
}

/** Builds one skill into `dest`; returns a report. */
function buildSkill(skill, dest) {
  const queue = [...tracked]
    .filter((f) => f.startsWith(`harness/skills/${skill}/`))
    .map((f) => [f, f.slice(`harness/skills/${skill}/`.length)])
  const done = new Set()
  const unresolved = new Set()
  while (queue.length) {
    const [repoFile, packagedFile] = queue.shift()
    if (done.has(packagedFile)) continue
    done.add(packagedFile)
    const file = path.join(dest, packagedFile)
    mkdirSync(path.dirname(file), { recursive: true })
    if (!textFile(repoFile)) {
      cpSync(path.join(repo, repoFile), file)
      continue
    }
    let text = readFileSync(path.join(repo, repoFile), 'utf8')
    if (packagedFile === 'SKILL.md') {
      text = withFrontmatter(skill, text)
      if (frontField(text, 'description').value.length > 1024) trimmed.add(skill)
      text = fitDescription(text)
    }
    const r = rewrite(skill, text, repoFile, packagedFile)
    text = packagedFile === 'SKILL.md' ? withPreamble(r.text) : r.text
    r.unresolved.forEach((u) => unresolved.add(u))
    for (const c of r.copies) queue.push([c, target(skill, c).to])
    writeFileSync(file, text)
  }
  mkdirSync(path.join(dest, 'references'), { recursive: true })
  writeFileSync(path.join(dest, 'references/standalone-mode.md'), standaloneMode)
  return { skill, files: done.size + 1, unresolved: [...unresolved] }
}
const trimmed = new Set()

const grouped = new Set(Object.values(groups).flatMap((g) => (Array.isArray(g.skills) ? g.skills : [])))
const groupSkills = (key) =>
  groups[key].skills === 'rest'
    ? skills.filter((s) => !grouped.has(s))
    : groups[key].skills.filter((s) => skills.includes(s))
const plugins = [
  {
    name: 'design-skills',
    title: 'Design Skills',
    description: `All ${skills.length} design skills: research, UX, content, accessibility, build, review, and handoff.`,
    skills,
  },
  ...Object.keys(groups).map((key) => ({
    name: `design-${key}`,
    title: groups[key].title,
    description: groups[key].description,
    skills: groupSkills(key),
  })),
]

for (const p of [
  'plugins',
  '.claude-plugin',
  '.agents',
  'assets',
  'downloads',
  'README.md',
  'CONTRIBUTING.md',
  'LICENSE',
])
  rmSync(path.join(out, p), { recursive: true, force: true })
mkdirSync(out, { recursive: true })

const reports = new Map()
for (const plugin of plugins) {
  const root = path.join(out, 'plugins', plugin.name)
  for (const skill of plugin.skills) {
    const report = buildSkill(skill, path.join(root, 'skills', skill))
    if (!reports.has(skill)) reports.set(skill, report)
  }
  const identity = {
    name: plugin.name,
    version,
    description: plugin.description,
    author: owner,
    homepage: site,
    repository: packageRepo,
    license: 'MIT',
    keywords: ['design', 'ux', 'product-design', 'research', 'accessibility', 'design-system'],
  }
  mkdirSync(path.join(root, '.claude-plugin'), { recursive: true })
  writeFileSync(path.join(root, '.claude-plugin/plugin.json'), JSON.stringify(identity, null, 2) + '\n')
  writeFileSync(
    path.join(root, 'plugin.json'),
    JSON.stringify(
      {
        $schema: 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json',
        ...identity,
        extensions: {
          'com.openai': {
            interface: {
              displayName: plugin.title,
              shortDescription: plugin.description,
              developerName: owner.name,
              category: 'Design',
              capabilities: ['Read', 'Write'],
              websiteURL: site,
            },
          },
        },
      },
      null,
      2,
    ) + '\n',
  )
}

mkdirSync(path.join(out, '.claude-plugin'), { recursive: true })
writeFileSync(
  path.join(out, '.claude-plugin/marketplace.json'),
  JSON.stringify(
    {
      name: 'design-skills',
      description:
        'Design skills for AI agents, from the Design Harness. Install all of them or one workflow at a time.',
      owner,
      plugins: plugins.map((p) => ({
        name: p.name,
        source: `./plugins/${p.name}`,
        description: p.description,
        version,
      })),
    },
    null,
    2,
  ) + '\n',
)
mkdirSync(path.join(out, '.agents/plugins'), { recursive: true })
writeFileSync(
  path.join(out, '.agents/plugins/marketplace.json'),
  JSON.stringify(
    {
      name: 'design-skills',
      interface: { displayName: 'Design Skills' },
      plugins: plugins.map((p) => ({
        name: p.name,
        source: { source: 'local', path: `./plugins/${p.name}` },
        policy: { installation: 'AVAILABLE', authentication: 'ON_INSTALL' },
        category: 'Design',
      })),
    },
    null,
    2,
  ) + '\n',
)
cpSync(path.join(repo, 'LICENSE'), path.join(out, 'LICENSE'))

const summaries = JSON.parse(readFileSync(path.join(templates, 'summaries.json'), 'utf8'))
const summary = (skill) => {
  if (summaries[skill]) return summaries[skill].replace(/\|/g, '\\|')
  const text = readFileSync(path.join(out, 'plugins/design-skills/skills', skill, 'SKILL.md'), 'utf8')
  const lead = frontField(text, 'description')
    .value.split(/\s+Triggers?\b/i)[0]
    .replace(/\s+/g, ' ')
    .trim()
  const sentence = lead.match(/^.+?[.!?](?=\s|$)/)?.[0] || lead
  const short = sentence.length > 180 ? sentence.slice(0, sentence.lastIndexOf(' ', 177)) + '…' : sentence
  return short.replace(/\|/g, '\\|')
}
const catalog = plugins
  .slice(1)
  .map((p) =>
    [
      `<details>`,
      `<summary><strong>${p.title}</strong> · ${p.skills.length} skills</summary>`,
      '',
      `${p.description} Plugin: \`${p.name}\` · [download zip](downloads/plugins/${p.name}.zip)`,
      '',
      '| Skill | What it does | Single skill |',
      '|---|---|---|',
      ...p.skills.map(
        (s) =>
          `| [\`${s}\`](plugins/design-skills/skills/${s}/SKILL.md) | ${summary(s)} | [ZIP](downloads/skills/${s}.zip) |`,
      ),
      '',
      `</details>`,
    ].join('\n'),
  )
  .join('\n\n')
writeFileSync(
  path.join(out, 'README.md'),
  readFileSync(path.join(templates, 'README.md'), 'utf8')
    .replaceAll('{{COUNT}}', String(skills.length))
    .replaceAll('{{VERSION}}', version)
    .replace('{{CATALOG}}', catalog),
)
cpSync(path.join(templates, 'assets'), path.join(out, 'assets'), { recursive: true })
cpSync(path.join(templates, 'CONTRIBUTING.md'), path.join(out, 'CONTRIBUTING.md'))

const skillZipDir = path.join(out, 'downloads/skills')
mkdirSync(skillZipDir, { recursive: true })
const skillSource = path.join(out, 'plugins/design-skills/skills')
for (const skill of skills) {
  execFileSync('zip', ['-r', '-q', path.join(skillZipDir, `${skill}.zip`), skill], { cwd: skillSource })
}
const pluginZipDir = path.join(out, 'downloads/plugins')
mkdirSync(pluginZipDir, { recursive: true })
for (const plugin of plugins) {
  execFileSync('zip', ['-r', '-q', path.join(pluginZipDir, `${plugin.name}.zip`), '.'], {
    cwd: path.join(out, 'plugins', plugin.name),
  })
}

const all = [...reports.values()]
const noisy = all.filter((r) => r.unresolved.length).sort((a, b) => b.unresolved.length - a.unresolved.length)
console.log(`Built ${plugins.length} plugins, ${skills.length} skills → ${path.relative(process.cwd(), out) || out}`)
for (const p of plugins) console.log(`  ${p.name}: ${p.skills.length}`)
if (trimmed.size)
  console.log(`Descriptions cut to 1024 chars (shorten at source to choose the wording): ${[...trimmed].join(', ')}`)
console.log(
  `Harness-only paths left for standalone-mode: ${noisy.reduce((n, r) => n + r.unresolved.length, 0)} across ${noisy.length} skills`,
)
