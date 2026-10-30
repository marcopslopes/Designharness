import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { branchLink, resume, save, share, slugify, start, undo } from '../../scripts/git-autopilot.mjs'

/** A tiny repo on `main` with the project template, like a fresh clone. */
function repo() {
  const root = mkdtempSync(path.join(tmpdir(), 'dh-autopilot-'))
  const git = (...args: string[]) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
  git('init', '-q', '-b', 'main')
  git('config', 'user.email', 'test@example.com')
  git('config', 'user.name', 'Test')
  git('config', 'core.hooksPath', '/dev/null')
  const write = (file: string, body = 'x\n') => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), body)
  }
  write('projects/_template/brief.md', '# Brief — <task-slug>\n')
  write('src/app.ts', 'one\n')
  git('add', '-A')
  git('commit', '-q', '-m', 'init')
  const log = () => git('log', '--format=%s', '-n', '20').split('\n')
  return { root, git, write, log, read: (file: string) => readFileSync(path.join(root, file), 'utf8') }
}

test('starting a project branches from main and makes the folder', () => {
  const { root, git, read } = repo()
  const result = start(root, 'invite-friends', { scaffold: true, title: 'Invite friends' })
  assert.equal(result.message, 'Working on project/invite-friends.')
  assert.equal(git('branch', '--show-current'), 'project/invite-friends')
  assert.equal(read('projects/invite-friends/brief.md'), '# Brief — Invite friends\n')
})

test('uncommitted work is committed where it was made, never carried to the new branch', () => {
  const { root, git, write, log } = repo()
  start(root, 'first')
  write('projects/first/brief.md', 'first draft\n')
  const result = start(root, 'second')
  assert.ok(result.checkpoint)
  assert.equal(git('status', '--porcelain'), '')
  assert.equal(existsSync(path.join(root, 'projects/first')), false)
  assert.deepEqual(log(), ['init'])
  assert.equal(git('log', '--format=%s', '-n', '1', 'project/first'), 'Save work in progress before starting second')
})

test('wrap up commits only the project and the src files named, never local files', () => {
  const { root, git, write } = repo()
  start(root, 'demo')
  write('projects/demo/brief.md', 'brief\n')
  write('src/app.ts', 'two\n')
  write('src/other.ts', 'not this session\n')
  write('designer-context.local/journal/today.md', 'private\n')
  write('designer-profile.local.md', 'private\n')
  write('harness/logs/routing-log.md', 'log\n')
  write('tmp/scratch.txt', 'tmp\n')
  const result = save(root, 'demo', 'Drafted the invite brief.', ['src/app.ts'])
  assert.equal(result.message, 'Saved on project/demo: Drafted the invite brief.')
  const files = git('show', '--name-only', '--format=', 'HEAD').split('\n').sort()
  assert.deepEqual(files, ['projects/demo/brief.md', 'src/app.ts'])
  assert.match(git('log', '-1', '--format=%B'), /Git-Autopilot: save/)
  assert.throws(() => save(root, 'demo', 'x', ['designer-context.local/journal/today.md']), /only save/)
  assert.throws(() => save(root, 'demo', 'x', ['package.json']), /only save/)
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
  assert.equal(read('projects/demo/brief.md'), 'v2\n')
  undo(root, { confirm: true })
  assert.equal(read('projects/demo/brief.md'), 'v1\n')
  assert.equal(undo(root).message, 'This will undo "First save."')
  undo(root, { confirm: true })
  assert.equal(existsSync(path.join(root, 'projects/demo/brief.md')), false)
  assert.equal(undo(root).message, 'Nothing to undo on this branch.')
  assert.equal(git('log', '-1', '--format=%s'), 'Undo: First save.')
})

test('undo refuses when the files it would touch have unsaved changes', () => {
  const { root, write } = repo()
  start(root, 'demo')
  write('projects/demo/brief.md', 'v1\n')
  save(root, 'demo', 'First save.')
  write('projects/demo/brief.md', 'unsaved\n')
  assert.throws(() => undo(root, { confirm: true }), /changes since the last save/)
})

test('resume switches to the project branch, and stays put without one', () => {
  const { root, git } = repo()
  start(root, 'demo')
  git('switch', '-q', 'main')
  assert.equal(resume(root, 'demo').message, 'Working on project/demo.')
  assert.equal(git('branch', '--show-current'), 'project/demo')
  assert.equal(resume(root, 'no-branch-yet').message, null)
  assert.equal(git('branch', '--show-current'), 'project/demo')
})

test('share pushes the project branch and returns its link, never main', () => {
  const { root, git, write } = repo()
  const remote = mkdtempSync(path.join(tmpdir(), 'dh-remote-'))
  execFileSync('git', ['init', '-q', '--bare', remote])
  git('remote', 'add', 'origin', remote)
  assert.throws(() => share(root), /project branch/)
  start(root, 'demo')
  write('projects/demo/brief.md', 'v1\n')
  save(root, 'demo', 'First save.')
  share(root)
  assert.equal(execFileSync('git', ['branch', '--list'], { cwd: remote, encoding: 'utf8' }).trim(), 'project/demo')
  assert.equal(
    branchLink('git@github.com:org/repo.git', 'project/demo'),
    'https://github.com/org/repo/tree/project/demo',
  )
})

test('with the setting off, nothing touches git', () => {
  const { root, git, write } = repo()
  write('harness.config.local.json', JSON.stringify({ behaviour: { gitAutopilot: false } }))
  const result = start(root, 'demo', { scaffold: true })
  assert.equal(result.message, null)
  assert.equal(git('branch', '--show-current'), 'main')
  assert.ok(existsSync(path.join(root, 'projects/demo/brief.md')))
  assert.equal(save(root, 'demo', 'x').message, null)
})

test('project names become safe branch names', () => {
  assert.equal(slugify('Invite Friends — v2!'), 'invite-friends-v2')
  assert.throws(() => start(mkdtempSync(path.join(tmpdir(), 'x-')), '../main'), /isn't a project name/)
})
