#!/usr/bin/env node
/**
 * Export a Design Harness prototype route as a static, self-contained HTML snapshot
 * into a project folder — e.g. projects/<slug>/artifacts/snapshots/<name>.html.
 *
 * Why: project folders (projects/<slug>/) hold brief.md / findings.md / decisions.md /
 * log.md as the resumable record of a task, but the actual prototype only ever
 * lived inside the running Design Harness app (src/design-harness/pages/*.tsx). This script
 * freezes a visual snapshot of a given route (CSS inlined, JS stripped) next to
 * the rest of that task's paper trail, so a PM/stakeholder can open one HTML
 * file without running `npm run dev`.
 *
 * This produces a STATIC snapshot (interactive JS removed) of whatever state
 * the route renders in by default. For a prototype with multiple tabs/views,
 * pass --click one or more times to click through states, each captured as its
 * own file (see --views below).
 *
 * Usage:
 *   node scripts/export-task-prototype.mjs \
 *     --route playground/mobile-banking-dashboard \
 *     --task mobile-banking-dashboard \
 *     --name wallet-home
 *
 *   # Multiple views (clicks a selector between captures, one file per view):
 *   node scripts/export-task-prototype.mjs \
 *     --route playground/mobile-banking-dashboard \
 *     --task mobile-banking-dashboard \
 *     --name wallet-home \
 *     --views "home:" --views "activity:button[role=tab]:has-text('Activity')"
 *
 * Flags:
 *   --route   <design-harness hash route>            required, e.g. playground/mobile-banking-dashboard
 *   --task    <project folder slug>            required, must exist under projects/
 *   --name    <base filename, no extension>   default: derived from --route
 *   --port    <dev server port>               default: 3099 (spun up if nothing is listening)
 *   --views   <label>:<optional click selector>   repeatable; default single view, no click
 *   --screenshot                               also save a PNG screenshot per view
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function parseArgs(argv) {
  const args = { views: [], screenshot: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--route') args.route = argv[++i]
    else if (a === '--task') args.task = argv[++i]
    else if (a === '--name') args.name = argv[++i]
    else if (a === '--port') args.port = Number(argv[++i])
    else if (a === '--views') args.views.push(argv[++i])
    else if (a === '--screenshot') args.screenshot = true
  }
  return args
}

async function waitForServer(port, timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://localhost:${port}/`)
      if (res.ok || res.status < 500) return true
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 300))
  }
  return false
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.route || !args.task) {
    console.error(
      'Usage: node scripts/export-task-prototype.mjs --route <design-harness-route> --task <task-slug> [--name <name>] [--views "<label>:<selector>"] [--screenshot]',
    )
    process.exit(1)
  }
  const port = args.port ?? 3099
  const name = args.name ?? args.route.replace(/^playground\//, '').replace(/\//g, '-')
  const taskDir = resolve(REPO_ROOT, 'projects', args.task)
  if (!existsSync(taskDir)) {
    console.error(`Project folder not found: projects/${args.task}/ — create it first (see projects/README.md).`)
    process.exit(1)
  }
  const artifactsDir = resolve(taskDir, 'artifacts', 'snapshots')
  mkdirSync(artifactsDir, { recursive: true })

  const views =
    args.views.length > 0
      ? args.views.map((v) => {
          const [label, selector] = v.split(/:(.*)/s)
          return { label, selector: selector || null }
        })
      : [{ label: name, selector: null }]

  let serverProcess = null
  const alreadyUp = await waitForServer(port, 1000)
  if (!alreadyUp) {
    console.log(`No server on :${port} — starting one (npm run dev -- --port ${port})...`)
    serverProcess = spawn('npm', ['run', 'dev', '--', '--port', String(port)], {
      cwd: REPO_ROOT,
      stdio: 'ignore',
      detached: true,
    })
    const up = await waitForServer(port, 20000)
    if (!up) {
      console.error(`Dev server on :${port} did not become ready in time.`)
      if (serverProcess) process.kill(-serverProcess.pid)
      process.exit(1)
    }
  }

  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } })
  const url = `http://localhost:${port}/#/${args.route}`
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  const written = []
  for (const view of views) {
    if (view.selector) {
      await page.click(view.selector)
      await page.waitForTimeout(300)
    }

    // Inline every same-origin stylesheet's text into <style> tags, drop
    // <link rel=stylesheet> and all <script> tags, so the file opens directly
    // via file:// with no server and no JS. Cross-origin fonts (Google Fonts
    // <link>) are left as-is — they degrade gracefully to a fallback font.
    const html = await page.evaluate(async () => {
      const doc = document.cloneNode(true)
      const liveSheets = Array.from(document.styleSheets)
      const styleContents = []
      for (const sheet of liveSheets) {
        try {
          const rules = Array.from(sheet.cssRules)
            .map((r) => r.cssText)
            .join('\n')
          styleContents.push(rules)
        } catch {
          // cross-origin stylesheet (e.g. Google Fonts) — leave its <link> tag as-is
        }
      }
      doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
        try {
          new URL(el.href).origin === location.origin && el.remove()
        } catch {
          /* leave non-same-origin links (fonts) in place */
        }
      })
      doc.querySelectorAll('script').forEach((el) => el.remove())
      const styleTag = doc.createElement('style')
      styleTag.textContent = styleContents.join('\n')
      doc.head.appendChild(styleTag)
      const banner = doc.createElement('div')
      banner.setAttribute(
        'style',
        'position:sticky;top:0;z-index:9999;background:#003746;color:#fff;font:14px/1.4 -apple-system,sans-serif;padding:8px 16px;',
      )
      banner.textContent = `Static snapshot — frozen from ${location.href}. Not interactive. See the task folder's brief.md for context.`
      doc.body.insertBefore(banner, doc.body.firstChild)
      return '<!doctype html>\n' + doc.documentElement.outerHTML
    })

    const fileBase = views.length > 1 ? `${name}-${view.label}` : name
    const outPath = resolve(artifactsDir, `${fileBase}.html`)
    writeFileSync(outPath, html, 'utf8')
    written.push(outPath)

    if (args.screenshot) {
      const pngPath = resolve(artifactsDir, `${fileBase}.png`)
      await page.screenshot({ path: pngPath })
      written.push(pngPath)
    }
  }

  await browser.close()
  if (serverProcess) process.kill(-serverProcess.pid)

  console.log('Wrote:')
  written.forEach((p) => console.log(`  ${p.replace(REPO_ROOT + '/', '')}`))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
