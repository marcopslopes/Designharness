#!/usr/bin/env node
/**
 * CLI entry point. The engine (core/) is company-agnostic — it takes a
 * tokens file and some file paths and returns findings. This file's only
 * job is wiring: find a design-detector.config.json (or accept explicit
 * flags), resolve the target files, run the engine, print/exit.
 *
 * A different project plugs in by creating its own
 * design-detector.config.json at its repo root — pointing at its own
 * token sheet and target directories — not by editing anything under
 * core/. See ../../design-detector.config.json for this repo's own
 * config (Northline's plug-in, not a special case in the code).
 *
 * Usage:
 *   node scripts/design-detector/detect.mjs [--json] [--config <path>] [--tokens <path>] [<file-or-dir>...]
 *
 * Resolution order for the tokens path: --tokens flag > config's
 * tokensPath > error (this tool has no built-in default; a project must
 * plug one in). Resolution order for target files: explicit positional
 * args > config's targetDirs > error.
 *
 * Exit codes: 0 = clean, 1 = usage/runtime error, 2 = findings present.
 */
import { readFileSync, existsSync, statSync, writeFileSync } from 'node:fs'
import { resolve, dirname, isAbsolute } from 'node:path'
import { loadTokens } from './core/tokens.mjs'
import { runRules } from './core/rules.mjs'
import { findConfig, listFiles } from './core/config.mjs'

function parseArgs(argv) {
  const json = argv.includes('--json')
  const fix = argv.includes('--fix')
  const rest = argv.filter((a) => a !== '--json' && a !== '--fix')
  let configFlag = null
  let tokensFlag = null
  const positional = []
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--config') {
      configFlag = rest[++i]
      continue
    }
    if (rest[i] === '--tokens') {
      tokensFlag = rest[++i]
      continue
    }
    positional.push(rest[i])
  }
  return { json, fix, configFlag, tokensFlag, positional }
}

/**
 * Applies only TOKEN-RAW findings (a raw literal that provably already
 * equals an existing token's value) by replacing the literal with
 * var(--token) on its exact line. Never touches TOKEN-GAP or
 * TOKEN-INVALID findings — those require a human decision (nearest
 * mapping, a new Figma-backed token, or a tracked-debt deferral), not a
 * mechanical rewrite. Returns the number of literals replaced.
 */
function applyFixes(source, findings) {
  const fixable = findings.filter((f) => f.severity === 'TOKEN-RAW' && f.suggestedVar)
  if (fixable.length === 0) return { source, applied: 0 }
  const lines = source.split('\n')
  let applied = 0
  for (const f of fixable) {
    const idx = f.line - 1
    if (idx < 0 || idx >= lines.length) continue
    if (lines[idx].includes(f.value)) {
      lines[idx] = lines[idx].replace(f.value, `var(${f.suggestedVar})`)
      applied++
    }
  }
  return { source: lines.join('\n'), applied }
}

function resolveFromConfigDir(configPath, relOrAbs) {
  return isAbsolute(relOrAbs) ? relOrAbs : resolve(dirname(configPath), relOrAbs)
}

function main() {
  const { json, fix, configFlag, tokensFlag, positional } = parseArgs(process.argv.slice(2))

  const cwd = process.cwd()
  let configPath = null
  let config = {}
  if (configFlag) {
    configPath = resolve(cwd, configFlag)
    if (!existsSync(configPath)) {
      console.error(`--config points to a file that doesn't exist: ${configPath}`)
      process.exit(1)
    }
    config = JSON.parse(readFileSync(configPath, 'utf8'))
  } else {
    const found = findConfig(cwd)
    if (found) {
      configPath = found.configPath
      config = found.config
    }
  }

  const tokensPath = tokensFlag
    ? resolve(cwd, tokensFlag)
    : config.tokensPath
      ? resolveFromConfigDir(configPath, config.tokensPath)
      : null

  if (!tokensPath) {
    console.error(
      'No tokens path given. This tool has no built-in default — pass --tokens <path>, ' +
        'or create a design-detector.config.json with a "tokensPath" field. ' +
        'See scripts/design-detector/README.md.',
    )
    process.exit(1)
  }
  if (!existsSync(tokensPath)) {
    console.error(`tokens file not found: ${tokensPath}`)
    process.exit(1)
  }

  const extensions = config.extensions ?? ['.css']
  let files = positional
  if (files.length === 0) {
    if (!config.targetDirs || config.targetDirs.length === 0) {
      console.error(
        'No files given and no "targetDirs" in the config. Pass file paths explicitly, ' +
          'or add "targetDirs" to design-detector.config.json.',
      )
      process.exit(1)
    }
    files = config.targetDirs.flatMap((dir) => listFiles(resolveFromConfigDir(configPath, dir), extensions))
  } else {
    files = files.flatMap((f) => {
      const abs = resolve(cwd, f)
      if (existsSync(abs) && statSync(abs).isDirectory()) return listFiles(abs, extensions)
      return [abs]
    })
  }

  const tokens = loadTokens(tokensPath)
  const results = []
  let totalFindings = 0

  for (const absPath of files) {
    if (!existsSync(absPath)) {
      console.error(`Skipping missing file: ${absPath}`)
      continue
    }
    const source = readFileSync(absPath, 'utf8')
    const findings = runRules(source, tokens, config.propertyOverrides)

    if (fix) {
      const { source: fixedSource, applied } = applyFixes(source, findings)
      if (applied > 0) {
        writeFileSync(absPath, fixedSource, 'utf8')
        // Re-run against the fixed source so reported findings reflect
        // what's left on disk, not what was true before the write.
        const remaining = runRules(fixedSource, tokens, config.propertyOverrides)
        totalFindings += remaining.length
        results.push({ file: absPath, findings: remaining, fixedCount: applied })
        continue
      }
    }

    totalFindings += findings.length
    results.push({ file: absPath, findings })
  }

  if (json) {
    console.log(JSON.stringify({ configPath, tokensPath, results, totalFindings }, null, 2))
  } else {
    let totalFixed = 0
    for (const { file, findings, fixedCount } of results) {
      if (fixedCount) {
        console.log(`\n${file}\n  fixed ${fixedCount} raw literal(s) → var(--token)`)
        totalFixed += fixedCount
      }
      if (findings.length === 0) continue
      if (!fixedCount) console.log(`\n${file}`)
      for (const f of findings) {
        console.log(`  ${f.line}:  [${f.severity}] ${f.message}`)
      }
    }
    if (fix && totalFixed > 0) console.log(`\ndesign-detector: fixed ${totalFixed} literal(s).`)
    console.log(
      totalFindings === 0
        ? '\ndesign-detector: clean — 0 findings.'
        : `\ndesign-detector: ${totalFindings} finding(s) remaining across ${results.filter((r) => r.findings.length).length} file(s).`,
    )
  }

  process.exit(totalFindings > 0 ? 2 : 0)
}

main()
