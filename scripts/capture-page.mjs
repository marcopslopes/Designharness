#!/usr/bin/env node
/**
 * Capture a live or local URL for live-page-review: screenshot, cleaned DOM,
 * and accessibility tree. Optional click-through in ONE browser session.
 *
 * Does not replace export-task-prototype.mjs (that freezes a Design Harness route
 * into a static HTML snapshot for the task folder). This script is evidence
 * for a review, not a shareable artifact.
 *
 * Usage:
 *   node scripts/capture-page.mjs --url URL --out DIR
 *   node scripts/capture-page.mjs --url URL --out DIR --device "iPhone 14"
 *   node scripts/capture-page.mjs --url URL --out DIR \
 *     --step "landing:" \
 *     --step "after-continue:role=button[name=Continue]" \
 *     --step "after-pay:text=Pay now"
 *
 * Step spec: `label:` (capture only) or `label:<click>` where click is:
 *   text=Continue
 *   role=button[name=Continue]
 *   a CSS selector
 *
 * Flags:
 *   --url       required
 *   --out       required output directory
 *   --device    Playwright device name (default: Desktop Chrome)
 *   --timeout   navigation timeout ms (default: 30000)
 *   --headed    show the browser (designer can watch)
 *   --step      repeatable; default one step named "page"
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { chromium, devices } from 'playwright'

const BROWSER_MISSING = `Playwright Chromium is not installed.

Run once from the repo root (downloads ~hundreds of MB):

  npx playwright install chromium

Then re-run the capture. Figma / screenshot reviews do not need this.
`

function parseArgs(argv) {
  const args = { steps: [], headed: false, timeout: 30000, device: 'Desktop Chrome' }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--url') args.url = argv[++i]
    else if (a === '--out') args.out = argv[++i]
    else if (a === '--device') args.device = argv[++i]
    else if (a === '--timeout') args.timeout = Number(argv[++i])
    else if (a === '--headed') args.headed = true
    else if (a === '--step') args.steps.push(argv[++i])
  }
  return args
}

function parseStep(raw) {
  const idx = raw.indexOf(':')
  if (idx === -1) return { label: raw, click: null }
  return { label: raw.slice(0, idx) || 'step', click: raw.slice(idx + 1) || null }
}

function slug(label, i) {
  const safe = String(label)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${String(i).padStart(2, '0')}-${safe || 'step'}`
}

function formatA11yTree(node, indent = 0) {
  if (!node) return ''
  const prefix = '  '.repeat(indent)
  const parts = [node.role || '']
  if (node.name) parts.push(`"${node.name}"`)
  for (const prop of ['value', 'description', 'checked', 'pressed', 'level', 'expanded']) {
    if (node[prop] !== undefined && node[prop] !== null) parts.push(`${prop}=${node[prop]}`)
  }
  if (node.disabled) parts.push('(disabled)')
  if (node.required) parts.push('(required)')
  const lines = [`${prefix}${parts.filter(Boolean).join(' ')}`]
  for (const child of node.children || []) {
    const nested = formatA11yTree(child, indent + 1)
    if (nested) lines.push(nested)
  }
  return lines.join('\n')
}

function cleanDom(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '')
}

async function clickBySpec(page, spec) {
  if (!spec) return
  if (spec.startsWith('text=')) {
    await page.getByText(spec.slice(5), { exact: false }).first().click()
    return
  }
  if (spec.startsWith('role=')) {
    const rest = spec.slice(5)
    const m = rest.match(/^([a-zA-Z]+)(?:\[name=(.+)\])?$/)
    if (!m) throw new Error(`Bad role spec: ${spec}`)
    const name = m[2] ? m[2].replace(/^["']|["']$/g, '') : undefined
    const loc = name ? page.getByRole(m[1], { name }) : page.getByRole(m[1])
    await loc.first().click()
    return
  }
  await page.locator(spec).first().click()
}

async function captureStep(page, dir) {
  mkdirSync(dir, { recursive: true })
  await page.screenshot({ path: resolve(dir, 'screenshot.png'), fullPage: true })
  const html = await page.content()
  writeFileSync(resolve(dir, 'dom.html'), cleanDom(html), 'utf8')
  let treeText = ''
  try {
    treeText = await page.locator(':root').ariaSnapshot()
  } catch {
    try {
      const snap = await page.accessibility.snapshot()
      treeText = formatA11yTree(snap)
    } catch {
      treeText = ''
    }
  }
  if (!treeText) treeText = '(No accessibility tree available for this page)'
  writeFileSync(resolve(dir, 'a11y-tree.txt'), treeText, 'utf8')
}

function writeError(outDir, message) {
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'error.txt'), message, 'utf8')
  console.error(message)
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (!args.url || !args.out) {
    console.error(
      'Usage: node scripts/capture-page.mjs --url <url> --out <dir> [--device "iPhone 14"] [--step "label:click"] [--headed]',
    )
    process.exit(1)
  }

  const outDir = resolve(args.out)
  mkdirSync(outDir, { recursive: true })

  const steps = args.steps.length > 0 ? args.steps.map(parseStep) : [{ label: 'page', click: null }]

  const deviceConfig = devices[args.device] || {}
  if (args.device !== 'Desktop Chrome' && !devices[args.device]) {
    console.error(`Unknown Playwright device "${args.device}" — using Desktop Chrome.`)
  }

  let browser
  try {
    browser = await chromium.launch({ headless: !args.headed })
  } catch (err) {
    const msg = String(err?.message || err)
    if (/Executable doesn't exist|playwright install/i.test(msg)) {
      writeError(outDir, BROWSER_MISSING)
      process.exit(1)
    }
    writeError(outDir, `Capture failed: ${msg}`)
    process.exit(1)
  }

  try {
    const context = await browser.newContext({
      ...deviceConfig,
      ignoreHTTPSErrors: true,
    })
    const page = await context.newPage()
    console.error(`Navigating to ${args.url} ...`)
    await page.goto(args.url, { waitUntil: 'networkidle', timeout: args.timeout })

    const written = []
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i]
      if (step.click) {
        console.error(`Click: ${step.click}`)
        await clickBySpec(page, step.click)
        await page.waitForTimeout(400)
      }
      const stepDir = resolve(outDir, 'steps', slug(step.label, i))
      await captureStep(page, stepDir)
      written.push(stepDir)
      console.error(`Captured ${step.label} → ${stepDir}`)
    }

    const metadata = {
      url: args.url,
      device: devices[args.device] ? args.device : 'Desktop Chrome',
      viewport: deviceConfig.viewport || { width: 1280, height: 720 },
      headed: args.headed,
      steps: steps.map((s, i) => ({
        label: s.label,
        click: s.click,
        dir: `steps/${slug(s.label, i)}`,
      })),
    }
    writeFileSync(resolve(outDir, 'metadata.json'), JSON.stringify(metadata, null, 2), 'utf8')
    console.error('Capture complete.')
    written.forEach((p) => console.log(p))
  } catch (err) {
    writeError(outDir, `Capture failed: ${err?.name || 'Error'}: ${err?.message || err}`)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()
