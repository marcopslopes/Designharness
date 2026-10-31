import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import {
  UPSTREAM_URL,
  addWorktree,
  branchLink,
  catchUp,
  doctor,
  resume,
  save,
  sessionLine,
  share,
  slugify,
  isNever,
  LOCAL_NOTICE,
  start,
  undo,
  updateHarness,
} from '../../scripts/git-autopilot.mjs'

const DAYS_AGO = (n: number) => `${Math.floor(Date.now() / 1000) - n * 86400} +0000`
const offline = () => ({ ok: false, detail: 'offline in tests' })

function gitIn(cwd: string, env?: Record<string, string>) {
  return (...args: string[]) =>
    execFileSync('git', args, { cwd, encoding: 'utf8', env: { ...process.env, ...env } }).trim()
}

/** A tiny repo on `main` with the project template and a designer profile, like a fresh clone. */
function repo({ profile = '- Name: Ana Silva\n' }: { profile?: string | null } = {}) {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-autopilot-'))
  const git = gitIn(root)
  git('init', '-q', '-b', 'main')
  git('config', 'user.email', 'test@example.com')
  git('config', 'user.name', 'Test Person')
  git('config', 'core.hooksPath', '/dev/null')
  const write = (file: string, body = 'x\n') => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), body)
  }
  write('projects/_template/brief.md', '# Brief — <task-slug>\n')
  write('projects/README.md', 'readme\n')
  write('harness/skill.md', 'one\n')
  write('.gitignore', '*.local\ndesigner-profile.local.md\nharness.config.local.json\n')
  git('add', '-A')
  git('commit', '-q', '-m', 'init')
  if (profile !== null) write('designer-profile.local.md', profile)
  const log = (ref = 'HEAD') => git('log', '--format=%s', '-n', '20', ref).split('\n')
  return { root, git, write, log, read: (file: string) => readFileSync(path.join(root, file), 'utf8') }
}

function bare() {
  const dir = mkdtempSync(path.join(tmpdir(), 'dh-remote-'))
  execFileSync('git', ['init', '-q', '--bare', '-b', 'main', dir])
  return dir
}

test('starting a project branches <first name>/<slug> from main and makes the folder', () => {
  const { root, git, read } = repo()
  const result = start(root, 'invite-friends', { scaffold: true, title: 'Invite friends' })
  assert.equal(result.message, 'Working on ana/invite-friends.')
  assert.equal(git('branch', '--show-current'), 'ana/invite-friends')
  assert.equal(read('projects/invite-friends/brief.md'), '# Brief — Invite friends\n')
})

test('a company project on a public repo is saved locally and never committed', () => {
  const { root, git, read } = repo()
  const result = start(root, 'payouts', { scaffold: true, title: 'Payouts', local: true })
  assert.equal(result.message, `Working on ana/payouts.\n${LOCAL_NOTICE}`)
  assert.equal(read('projects.local/payouts/brief.md'), '# Brief — Payouts\n')
  assert.equal(existsSync(path.join(root, 'projects/payouts')), false)
  assert.equal(isNever('projects.local/payouts/brief.md'), true)
  git('add', '-f', 'projects.local/payouts/brief.md')
  const saved = save(root, 'payouts', 'Leave the local folder alone.')
  assert.equal(saved.sha, null)
  assert.equal(git('diff', '--cached', '--name-only'), '')
  assert.equal(git('ls-files', 'projects.local'), '')
})

test('publicRepo off keeps a company project in tracked projects', () => {
  const { root, read, write } = repo()
  write('harness.config.local.json', JSON.stringify({ publicRepo: false }))
  const result = start(root, 'payouts', { scaffold: true, title: 'Payouts', local: true })
  assert.equal(result.message, 'Working on ana/payouts.')
  assert.equal(read('projects/payouts/brief.md'), '# Brief — Payouts\n')
  assert.equal(existsSync(path.join(root, 'projects.local/payouts')), false)
})

test('with no profile (a cloud session), the branch uses the git config name', () => {
  const { root, git } = repo({ profile: null })
  start(root, 'demo')
  assert.equal(git('branch', '--show-current'), 'test/demo')
  git('config', '--unset', 'user.name')
  assert.throws(() => start(root, 'other'), /don't know your name/)
})

test('switching projects saves the current one on its own branch, never on main', () => {
  const { root, git, write, log } = repo()
  start(root, 'first')
  write('projects/first/brief.md', 'first draft\n')
  const result = start(root, 'second')
  assert.ok(result.checkpoint)
  assert.equal(git('status', '--porcelain'), '')
  assert.equal(existsSync(path.join(root, 'projects/first')), false)
  assert.deepEqual(log('main'), ['init'])
  assert.equal(log('ana/first')[0], 'Save work in progress before starting second')
})

test('wrap up commits the project folder and gallery cards, never local files', () => {
  const { root, git, write } = repo()
  start(root, 'demo')
  write('projects/demo/brief.md', 'brief\n')
  write('src/design-harness/gallery-designers/ana-silva.ts', 'export default {}\n')
  write('designer-context.local/journal/today.md', 'private\n')
  write('harness/logs/routing-log.md', 'log\n')
  write('tmp/scratch.txt', 'tmp\n')
  const result = save(root, 'demo', 'Drafted the invite brief.')
  assert.equal(result.message, 'Saved on ana/demo: Drafted the invite brief.')
  assert.deepEqual(git('show', '--name-only', '--format=', 'HEAD').split('\n'), [
    'projects/demo/brief.md',
    'src/design-harness/gallery-designers/ana-silva.ts',
  ])
  assert.match(git('log', '-1', '--format=%B'), /Git-Autopilot: save/)
})

test("wrap up stops before touching another designer's project", () => {
  const { root, git, write } = repo()
  write('projects/theirs/brief.md', '- **Designer:** Bruno Costa\n')
  git('add', '-A')
  git('commit', '-q', '-m', 'their project')
  start(root, 'demo')
  write('projects/demo/brief.md', 'mine\n')
  write('projects/theirs/brief.md', '- **Designer:** Bruno Costa\nedited by mistake\n')
  assert.throws(
    () => save(root, 'demo', 'x'),
    /Another designer's project has changes:\n {2}projects\/theirs\/brief.md/,
  )
})

test('a harness edit on a project branch asks; "keep local" leaves it and stops asking', () => {
  const { root, git, write, read } = repo()
  start(root, 'demo')
  write('projects/demo/brief.md', 'v1\n')
  write('harness/skill.md', 'my tweak\n')
  assert.throws(() => save(root, 'demo', 'First save.'), /harness\/skill.md\nKeep them local, or suggest them/)
  const kept = save(root, 'demo', 'First save.', { harness: 'keep' })
  assert.match(kept.message ?? '', /Kept 1 harness file local/)
  assert.deepEqual(git('show', '--name-only', '--format=', 'HEAD').split('\n'), ['projects/demo/brief.md'])
  assert.equal(read('harness/skill.md'), 'my tweak\n')
  write('projects/demo/brief.md', 'v2\n')
  assert.equal(save(root, 'demo', 'Second save.').message, 'Saved on ana/demo: Second save.')
})

test('"suggest to the harness" moves the edit to its own branch from main and opens a PR upstream', () => {
  const { root, git, write, read } = repo()
  const origin = bare()
  git('remote', 'add', 'origin', 'https://github.com/team/design-harness.git')
  git('remote', 'set-url', '--push', 'origin', origin)
  git('remote', 'add', 'upstream', 'https://github.com/maintainer/design-harness.git')
  start(root, 'demo')
  write('projects/demo/brief.md', 'v1\n')
  write('harness/skill.md', 'better wording\n')
  const asked: { repo: string; head: string }[] = []
  const result = save(root, 'demo', 'First save.', {
    harness: 'suggest',
    openPr: (_root, pr) => {
      asked.push(pr)
      return 'https://github.com/maintainer/design-harness/pull/7'
    },
  })
  assert.match(result.message ?? '', /Moved the harness change to ana\/harness-demo\. Pull request: .*pull\/7/)
  assert.equal(git('branch', '--show-current'), 'ana/demo')
  assert.equal(read('harness/skill.md'), 'one\n')
  assert.deepEqual(
    gitIn(origin)('branch', '--list')
      .split('\n')
      .map((b) => b.trim()),
    ['ana/harness-demo'],
  )
  assert.equal(git('show', 'ana/harness-demo:harness/skill.md'), 'better wording')
  assert.equal(git('rev-parse', 'ana/harness-demo~1'), git('rev-parse', 'main'))
  assert.deepEqual(
    asked.map(({ repo, head }) => ({ repo, head })),
    [{ repo: 'maintainer/design-harness', head: 'team:ana/harness-demo' }],
  )
})

test('undo shows the last save, then reverts only that', () => {
  const { root, git, write, read } = repo()
  start(root, 'demo')
  write('projects/demo/brief.md', 'v1\n')
  save(root, 'demo', 'First save.')
  write('projects/demo/brief.md', 'v2\n')
  save(root, 'demo', 'Second save.')
  const preview = undo(root)
  assert.equal(preview.message, 'This will undo "Second save."')
  assert.deepEqual(preview.files, ['M\tprojects/demo/brief.md'])
  undo(root, { confirm: true })
  assert.equal(read('projects/demo/brief.md'), 'v1\n')
  undo(root, { confirm: true })
  assert.equal(existsSync(path.join(root, 'projects/demo/brief.md')), false)
  assert.equal(undo(root).message, 'Nothing to undo on this branch.')
  assert.equal(git('log', '-1', '--format=%s'), 'Undo: First save.')
  write('projects/demo/brief.md', 'v3\n')
  save(root, 'demo', 'Third save.')
  write('projects/demo/brief.md', 'unsaved\n')
  assert.throws(() => undo(root, { confirm: true }), /changes since the last save/)
})

test('resume switches to the project branch, and stays put without one', () => {
  const { root, git } = repo()
  start(root, 'demo')
  git('switch', '-q', 'main')
  assert.equal(resume(root, 'demo').message, 'Working on ana/demo.')
  assert.equal(resume(root, 'no-branch-yet').message, null)
  assert.equal(git('branch', '--show-current'), 'ana/demo')
})

test('share pushes the project branch and links to the PR form, never main', () => {
  const { root, git, write } = repo()
  const origin = bare()
  git('remote', 'add', 'origin', origin)
  assert.throws(() => share(root), /project branch/)
  start(root, 'demo')
  write('projects/demo/brief.md', 'v1\n')
  save(root, 'demo', 'First save.')
  share(root)
  assert.equal(gitIn(origin)('branch', '--list').trim(), 'ana/demo')
  assert.equal(
    branchLink('git@github.com:team/harness.git', 'ana/demo'),
    'https://github.com/team/harness/compare/main...ana/demo?expand=1',
  )
  assert.equal(
    branchLink('https://github.com/team/harness.git', 'ana/harness-x', { into: UPSTREAM_URL }),
    'https://github.com/marcopslopes/design-harness/compare/main...team:ana/harness-x?expand=1',
  )
  assert.equal(
    branchLink('https://git.example.com/team/harness.git', 'ana/demo'),
    'https://git.example.com/team/harness/tree/ana/demo',
  )
})

test('autopilot is on by default; the setting or the profile line turns it off', () => {
  const off = repo({ profile: '- Name: Ana Silva\n- Git autopilot: off\n' })
  assert.equal(start(off.root, 'demo', { scaffold: true }).message, null)
  assert.equal(off.git('branch', '--show-current'), 'main')
  assert.ok(existsSync(path.join(off.root, 'projects/demo/brief.md')))
  const config = repo()
  config.write('harness.config.local.json', JSON.stringify({ behaviour: { gitAutopilot: false } }))
  assert.equal(start(config.root, 'demo').message, null)
  assert.equal(save(config.root, 'demo', 'x').message, null)
})

test('catch-up merges main after a day behind, and stops on a conflict without merging', () => {
  const { root, git, write } = repo()
  git('remote', 'add', 'origin', 'https://example.invalid/harness.git')
  start(root, 'demo')
  write('projects/demo/brief.md', 'mine\n')
  save(root, 'demo', 'Mine.')
  git('switch', '-q', 'main')
  write('harness/new.md', 'from main\n')
  git('add', '-A')
  gitIn(root, { GIT_COMMITTER_DATE: DAYS_AGO(2) })('commit', '-q', '-m', 'main moved')
  git('switch', '-q', 'ana/demo')
  assert.equal(catchUp(root).message, 'Merged main into ana/demo (1 commit).')
  assert.ok(existsSync(path.join(root, 'harness/new.md')))

  git('switch', '-q', 'main')
  write('harness/skill.md', 'main says\n')
  git('add', '-A')
  gitIn(root, { GIT_COMMITTER_DATE: DAYS_AGO(2) })('commit', '-q', '-m', 'main edit')
  git('switch', '-q', 'ana/demo')
  write('harness/skill.md', 'branch says\n')
  git('add', '-A')
  git('commit', '-q', '-m', 'branch edit')
  const before = git('rev-parse', 'HEAD')
  const stopped = catchUp(root)
  assert.deepEqual(stopped.conflicts, ['harness/skill.md'])
  assert.match(stopped.message ?? '', /^Stopped\. .*\n {2}harness\/skill.md\nNothing was merged/)
  assert.equal(git('rev-parse', 'HEAD'), before)
  assert.equal(git('status', '--porcelain'), '')
})

test('session start warns on main and when 50+ commits behind origin/main', () => {
  const { root, git, write } = repo()
  const fetched = () => ({ ok: true, detail: '' })
  assert.equal(sessionLine(root, { fetchMain: offline }), '')
  git('remote', 'add', 'origin', 'https://example.invalid/harness.git')
  assert.equal(sessionLine(root, { fetchMain: offline }), 'On main. Project work belongs on your own branch.')
  start(root, 'demo')
  assert.equal(sessionLine(root, { fetchMain: fetched }), '')
  git('switch', '-q', 'main')
  for (let i = 0; i < 50; i += 1) {
    write('harness/count.md', `${i}\n`)
    git('add', '-A')
    git('commit', '-q', '-m', `c${i}`)
  }
  git('update-ref', 'refs/remotes/origin/main', 'main')
  git('reset', '-q', '--hard', 'HEAD~50')
  assert.equal(
    sessionLine(root, { fetchMain: fetched }),
    'On main, 50 commits behind origin/main. Project work belongs on your own branch.',
  )
  git('switch', '-q', 'ana/demo')
  write('projects/demo/brief.md', 'unsaved\n')
  assert.match(sessionLine(root, { fetchMain: fetched }), /^This branch is 50 commits behind origin\/main\./)
})

/** A fake upstream harness: a bare repo seeded from `root`'s main, plus a clone to add commits to it. */
function fakeUpstream(root: string) {
  const up = bare()
  gitIn(root)('push', '-q', up, 'main:main')
  const work = mkdtempSync(path.join(tmpdir(), 'dh-upstream-work-'))
  execFileSync('git', ['clone', '-q', up, work])
  const g = gitIn(work)
  g('config', 'user.email', 'maintainer@example.com')
  g('config', 'user.name', 'Maintainer')
  const commit = (files: Record<string, string>, message: string) => {
    for (const [file, body] of Object.entries(files)) {
      mkdirSync(path.dirname(path.join(work, file)), { recursive: true })
      writeFileSync(path.join(work, file), body)
    }
    g('add', '-A')
    g('commit', '-q', '-m', message)
    g('push', '-q', 'origin', 'main')
  }
  return { up, commit }
}

test('"update my harness" merges the new commit, keeps projects/ and local files', () => {
  const { root, git, write, read } = repo()
  const upstream = fakeUpstream(root)
  git('remote', 'add', 'upstream', upstream.up)
  start(root, 'demo')
  write('projects/demo/brief.md', 'mine\n')
  save(root, 'demo', 'Mine.')
  upstream.commit(
    {
      'harness/skill.md': 'one\nnew rule\n',
      'projects/README.md': 'readme v2\n',
      'projects/upstream-example/brief.md': 'not yours\n',
    },
    'Harness: new rule',
  )
  const result = updateHarness(root, { install: () => '' })
  assert.equal(result.merged, true)
  assert.match(
    result.message ?? '',
    /Updated ana\/demo with 1 harness commit\. Left out 1 change it had for projects\/; yours stay as they were\./,
  )
  assert.equal(read('harness/skill.md'), 'one\nnew rule\n')
  assert.equal(read('projects/README.md'), 'readme v2\n')
  assert.equal(read('projects/demo/brief.md'), 'mine\n')
  assert.equal(existsSync(path.join(root, 'projects/upstream-example')), false)
  assert.equal(read('designer-profile.local.md'), '- Name: Ana Silva\n')
  assert.equal(git('status', '--porcelain'), '')
  assert.match(updateHarness(root).message ?? '', /already has the latest harness/)
})

test('"update my harness" stops on a real conflict and lists it, merging nothing', () => {
  const { root, git, write } = repo()
  const upstream = fakeUpstream(root)
  git('remote', 'add', 'upstream', upstream.up)
  start(root, 'demo')
  write('harness/skill.md', 'team wording\n')
  git('commit', '-qam', 'team tweak')
  upstream.commit({ 'harness/skill.md': 'upstream wording\n' }, 'Harness: reword')
  const before = git('rev-parse', 'HEAD')
  const result = updateHarness(root, { install: () => '' })
  assert.equal(result.merged, false)
  assert.deepEqual(result.conflicts, ['harness/skill.md'])
  assert.match(result.message ?? '', /Stopped\..*\n {2}harness\/skill.md\nNothing was merged/)
  assert.equal(git('rev-parse', 'HEAD'), before)
  assert.equal(git('status', '--porcelain'), '')
})

test('"update my harness" adds the harness as upstream when the copy has none', () => {
  const { root, git } = repo()
  assert.throws(() => updateHarness(root, { fetch: offline }), /Added the harness as "upstream"/)
  assert.equal(git('remote', 'get-url', 'upstream'), UPSTREAM_URL)
})

test('a parallel worktree gets its own branch and reads the same profile', () => {
  const { root, git, write } = repo()
  write('designer-context.local/memory.md', 'notes\n')
  const result = addWorktree(root, 'second-project')
  assert.equal(result.branch, 'ana/second-project')
  assert.equal(gitIn(result.dest)('branch', '--show-current'), 'ana/second-project')
  assert.ok(lstatSync(path.join(result.dest, 'designer-profile.local.md')).isSymbolicLink())
  assert.equal(readFileSync(path.join(result.dest, 'designer-profile.local.md'), 'utf8'), '- Name: Ana Silva\n')
  assert.equal(readFileSync(path.join(result.dest, 'designer-context.local/memory.md'), 'utf8'), 'notes\n')
  assert.equal(git('branch', '--show-current'), 'main')
  assert.equal(start(result.dest, 'second-project').message, 'Working on ana/second-project.')
})

test('doctor lists uncommitted files with where they belong, and what it could reach', () => {
  const { root, write } = repo()
  start(root, 'demo')
  write('projects/demo/brief.md', 'x\n')
  write('harness/skill.md', 'tweak\n')
  const report = doctor(root, { fetch: offline })
  assert.match(report, /^On ana\/demo\. Git autopilot is on\./)
  assert.match(report, /projects\/demo\/brief.md — ana\/demo/)
  assert.match(report, /harness\/skill.md — a harness change, not ana\/demo/)
  assert.doesNotMatch(report, /origin/)
  assert.match(report, /Harness: no upstream remote yet/)
})

test('with no origin remote, catch-up and the session warning do nothing', () => {
  const { root, git, write } = repo()
  start(root, 'demo')
  git('switch', '-q', 'main')
  write('harness/new.md', 'from main\n')
  git('add', '-A')
  git('commit', '-q', '-m', 'main moved')
  git('switch', '-q', 'ana/demo')
  assert.equal(catchUp(root).message, null)
  assert.equal(catchUp(root).merged, false)
  assert.equal(sessionLine(root), '')
})

test('doctor still reports an origin it cannot reach', () => {
  const { root, git } = repo()
  git('remote', 'add', 'origin', 'https://example.invalid/harness.git')
  assert.match(doctor(root, { fetch: offline }), /origin: not reachable/)
})

test('project names become safe branch names', () => {
  assert.equal(slugify('Invite Friends — v2!'), 'invite-friends-v2')
  assert.throws(() => start(repo().root, '../main'), /isn't a project name/)
})
