#!/usr/bin/env node
/**
 * PUT Confluence page body from a local file (REST API v1).
 * Accepts `.html` (storage-style fragment) or `.md` (converted with `marked`
 * to HTML before PUT so Confluence matches the repo markdown).
 * Bypasses MCP message limits for large kickoff pages.
 *
 * @see harness/skills/research-agent/setup/confluence-large-bodies.md
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { marked } from 'marked'

function parseArgs(argv) {
  /** @type {{ pageId: string; bodyFile: string; host: string; versionMessage: string; help?: boolean }} */
  const out = { pageId: '', bodyFile: '', host: '', versionMessage: '' }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--help' || a === '-h') out.help = true
    else if (a === '--page-id') out.pageId = argv[++i] ?? ''
    else if (a === '--body-file') out.bodyFile = argv[++i] ?? ''
    else if (a === '--host') out.host = argv[++i] ?? ''
    else if (a === '--version-message') out.versionMessage = argv[++i] ?? ''
  }
  return out
}

function authHeader(email, token) {
  const b64 = Buffer.from(`${email}:${token}`, 'utf8').toString('base64')
  return `Basic ${b64}`
}

async function main() {
  const args = parseArgs(process.argv)
  if (args.help) {
    console.log(`Usage:
  node scripts/confluence-put-page-body.mjs --page-id <id> --body-file <path> --host <your-org>.atlassian.net [--version-message "sync"]

  --body-file may be .md (Markdown → HTML via marked) or .html (storage HTML).

Environment (alternative to flags):
  ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN (required)
  CONFLUENCE_HOST (required — no default; find yours via the Atlassian MCP's getAccessibleAtlassianResources)
  CONFLUENCE_PAGE_ID, CONFLUENCE_BODY_FILE
`)
    process.exit(0)
  }

  const email = process.env.ATLASSIAN_EMAIL
  const token = process.env.ATLASSIAN_API_TOKEN
  const host = args.host || process.env.CONFLUENCE_HOST || ''
  if (!host) {
    console.error('Missing --host or CONFLUENCE_HOST (e.g. your-org.atlassian.net). No default is set.')
    process.exit(1)
  }
  const pageId = args.pageId || process.env.CONFLUENCE_PAGE_ID || ''
  const bodyFile = args.bodyFile || process.env.CONFLUENCE_BODY_FILE || ''
  const versionMessage =
    args.versionMessage ||
    process.env.CONFLUENCE_VERSION_MESSAGE ||
    'Briefing body sync from repo (confluence-put-page-body)'

  if (!email || !token) {
    console.error('Missing ATLASSIAN_EMAIL or ATLASSIAN_API_TOKEN')
    process.exit(1)
  }
  if (!pageId || !bodyFile) {
    console.error('Missing --page-id / CONFLUENCE_PAGE_ID or --body-file / CONFLUENCE_BODY_FILE')
    process.exit(1)
  }

  const absBody = resolve(process.cwd(), bodyFile)
  const raw = readFileSync(absBody, 'utf8')
  const html = absBody.toLowerCase().endsWith('.md') ? marked.parse(raw) : raw
  const base = `https://${host}/wiki/rest/api/content/${pageId}`

  const getUrl = `${base}?expand=body.storage,version,space,ancestors,status`
  const getRes = await fetch(getUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: authHeader(email, token),
    },
  })
  if (!getRes.ok) {
    const t = await getRes.text()
    console.error(`GET failed ${getRes.status}: ${t.slice(0, 2000)}`)
    process.exit(1)
  }

  /** @type {Record<string, unknown>} */
  const current = await getRes.json()
  const version = current.version
  if (!version || typeof version.number !== 'number') {
    console.error('Unexpected GET payload: missing version.number', JSON.stringify(current.version))
    process.exit(1)
  }

  const nextVersion = {
    number: version.number + 1,
    message: versionMessage,
    ...(typeof version.minorEdit === 'boolean' ? { minorEdit: version.minorEdit } : {}),
  }

  const putBody = {
    id: current.id,
    type: current.type,
    title: current.title,
    space: current.space,
    version: nextVersion,
    body: {
      storage: {
        value: html,
        representation: 'storage',
      },
    },
  }
  if (current.status != null) putBody.status = current.status
  if (Array.isArray(current.ancestors) && current.ancestors.length > 0) {
    putBody.ancestors = current.ancestors
  }

  const putRes = await fetch(base, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authHeader(email, token),
    },
    body: JSON.stringify(putBody),
  })

  if (!putRes.ok) {
    const t = await putRes.text()
    console.error(`PUT failed ${putRes.status}: ${t.slice(0, 4000)}`)
    process.exit(1)
  }

  const updated = await putRes.json()
  console.log(
    JSON.stringify(
      {
        ok: true,
        pageId: updated.id,
        title: updated.title,
        version: updated.version?.number,
        webUrl: updated._links?.webui ? `https://${host}${updated._links.webui}` : undefined,
      },
      null,
      2,
    ),
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
