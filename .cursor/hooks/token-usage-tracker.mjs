#!/usr/bin/env node
/**
 * Records model token counts from Cursor's stop hook.
 * input_tokens already includes cache read and cache write, so those are stored
 * but not added again. One line per generation. Missing counts are skipped.
 */

import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
const logFile = join(root, 'harness/logs/token-usage.jsonl')

function readStdin() {
  return new Promise((resolve) => {
    const chunks = []
    process.stdin.on('data', (chunk) => chunks.push(chunk))
    process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    process.stdin.on('error', () => resolve(''))
  })
}

function alreadyLogged(generationId) {
  if (!generationId || !existsSync(logFile)) return false
  return readFileSync(logFile, 'utf8').includes(`"generationId":"${generationId}"`)
}

readStdin()
  .then((raw) => {
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      return
    }
    if (typeof data.input_tokens !== 'number' || typeof data.output_tokens !== 'number') return
    if (alreadyLogged(data.generation_id)) return
    mkdirSync(dirname(logFile), { recursive: true })
    const event = {
      timestamp: new Date().toISOString(),
      generationId: typeof data.generation_id === 'string' ? data.generation_id : '',
      model: typeof data.model === 'string' ? data.model : '',
      input: data.input_tokens,
      output: data.output_tokens,
      cacheRead: typeof data.cache_read_tokens === 'number' ? data.cache_read_tokens : 0,
      cacheWrite: typeof data.cache_write_tokens === 'number' ? data.cache_write_tokens : 0,
    }
    appendFileSync(logFile, JSON.stringify(event) + '\n')
  })
  .catch((err) => {
    console.error('Token usage tracker error:', err.message)
  })
  .finally(() => {
    console.log(JSON.stringify({}))
  })
