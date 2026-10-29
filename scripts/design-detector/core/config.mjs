#!/usr/bin/env node
/**
 * Resolves a `design-detector.config.json` the same way tools like
 * ESLint/Prettier do: start at a given directory, walk up toward the
 * filesystem root, use the first one found. No project-specific default
 * path lives here — a project that wants this tool plugs in by dropping
 * its own config file, not by this engine assuming where anyone's tokens
 * live.
 *
 * Config shape:
 * {
 *   "tokensPath": "path/to/tokens.css",   // required, relative to the config file's own directory
 *   "targetDirs": ["path/to/scan"],       // optional, directories to recursively scan for target files
 *   "extensions": [".css"],               // optional, default [".css"]
 *   "propertyOverrides": { ... }          // optional, see core/rules.mjs loadPropertySets
 * }
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'

export const CONFIG_FILENAME = 'design-detector.config.json'

/** @returns {{ configPath: string, config: object } | null} */
export function findConfig(startDir) {
  let dir = resolve(startDir)
  for (;;) {
    const candidate = join(dir, CONFIG_FILENAME)
    if (existsSync(candidate)) {
      const config = JSON.parse(readFileSync(candidate, 'utf8'))
      return { configPath: candidate, config }
    }
    const parent = dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

/** Recursively lists files under `dir` whose extension is in `extensions`. */
export function listFiles(dir, extensions) {
  const out = []
  const walk = (current) => {
    for (const entry of readdirSync(current)) {
      const full = join(current, entry)
      const stat = statSync(full)
      if (stat.isDirectory()) walk(full)
      else if (extensions.some((ext) => full.endsWith(ext))) out.push(full)
    }
  }
  if (existsSync(dir)) walk(dir)
  return out
}
