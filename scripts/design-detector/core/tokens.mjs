#!/usr/bin/env node
/**
 * Parses a CSS custom-properties file (a design token sheet) into lookup
 * maps keyed by *value* (normalized hex, px number) so rules.mjs can
 * answer "does a token already exist for this raw value?" in O(1),
 * instead of a human/LLM re-reading the file and reasoning about it
 * every time.
 *
 * Company-agnostic: takes a path to whatever tokens file the caller
 * points it at (see ../design-detector.config.json for how one project
 * plugs its own tokens in — this module has no opinion about where that
 * file lives or what it's named).
 *
 * Category-aware on purpose: a token sheet mixes two kinds of variable —
 * generic scale tokens meant to be reused anywhere (`--radius-02`,
 * `--spacing-05`, `--color-text-default`) and component-scoped tokens
 * whose value is a coincidence of that one component's spec
 * (`--ds-button-height-sm`, `--ds-toggle-inset`). Two values can be
 * numerically equal without being interchangeable — a first real-file
 * validation pass caught exactly this: `border-radius: 24px` matching
 * `--ds-button-height-sm` (a height token, wrong property entirely) purely
 * because both happen to be 24. Matching by value alone, ignoring which
 * category the property actually calls for, produces confidently wrong
 * suggestions — worse than the raw literal it's "fixing." This module
 * buckets every token by category at parse time so rules.mjs only ever
 * matches within the property's own category.
 */
import { readFileSync } from 'node:fs'

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g
const PX_DECL_RE = /^\s*(--[\w-]+)\s*:\s*(-?[\d.]+)px\s*;?\s*$/
const FONT_WEIGHT_DECL_RE = /^\s*--[\w-]*font-weight[\w-]*\s*:\s*(\d+)\s*;?\s*$/i

export const PX_CATEGORIES = ['radius', 'borderWidth', 'spacing', 'fontSize']
export const COLOR_CATEGORIES = ['generic', 'component']

/** Normalizes a hex color to lowercase 6- or 8-digit form (expands #rgb -> #rrggbb). */
export function normalizeHex(hex) {
  let h = hex.toLowerCase()
  if (h.length === 4) {
    h = '#' + [...h.slice(1)].map((c) => c + c).join('')
  }
  return h
}

/**
 * Classifies a px-valued token by what it's *for*, not just its name —
 * a project with different naming conventions overrides this via a
 * config-level category map in a future version; for now this covers
 * the common `--radius-*` / `--spacing-*` / `--border-NN` / `--font-size-*`
 * / `--type-*-size` scale-token naming convention.
 */
function classifyPxVar(varName) {
  if (/^--radius-/.test(varName)) return 'radius'
  if (/^--border-\d/.test(varName)) return 'borderWidth'
  if (/^--spacing-/.test(varName)) return 'spacing'
  if (/^--font-size-/.test(varName) || /^--type-[\w-]+-size$/.test(varName)) return 'fontSize'
  return 'other' // component-scoped or purpose-specific — never suggested across categories
}

/**
 * Classifies a colour-valued token as broadly reusable ("generic" — a
 * semantic/primitive colour meant for any surface) or scoped to one
 * component's own spec ("component" — e.g. a specific button/toast/chip
 * state fill, valid only inside that component's own implementation).
 */
function classifyColorVar(varName) {
  if (/^--color-/.test(varName)) return 'generic'
  if (/^--ds-core-/.test(varName)) return 'generic'
  if (/^--ds-primitive-/.test(varName)) return 'generic'
  if (/^--ds-additional-/.test(varName)) return 'generic'
  if (/^--ds-hovered-/.test(varName) || /^--ds-pressed-/.test(varName)) return 'generic'
  return 'component' // --ds-button-*, --ds-toggle-*, --ds-toast-*, --ds-chip-*, --ds-calendar-*, etc.
}

/**
 * @param {string} tokensPath absolute path to a CSS file defining `--*` custom properties
 * @returns {{
 *   colorToVar: Map<string,string[]>,
 *   pxToVar: Map<number,string[]>,
 *   colorCategoryToVar: Map<string, Record<'generic'|'component', string[]>>,
 *   pxCategoryToVar: Map<number, Record<'radius'|'borderWidth'|'spacing'|'fontSize'|'other', string[]>>,
 *   allowedFontWeights: Set<number>,
 * }}
 */
export function loadTokens(tokensPath) {
  const css = readFileSync(tokensPath, 'utf8')
  const colorToVar = new Map()
  const pxToVar = new Map()
  const colorCategoryToVar = new Map()
  const pxCategoryToVar = new Map()
  const allowedFontWeights = new Set()

  const lines = css.split('\n')
  for (const line of lines) {
    const pxMatch = line.match(PX_DECL_RE)
    if (pxMatch) {
      const [, varName, numStr] = pxMatch
      const num = Number(numStr)

      const list = pxToVar.get(num) || []
      list.push(varName)
      pxToVar.set(num, list)

      const category = classifyPxVar(varName)
      const byCategory = pxCategoryToVar.get(num) || {
        radius: [],
        borderWidth: [],
        spacing: [],
        fontSize: [],
        other: [],
      }
      byCategory[category].push(varName)
      pxCategoryToVar.set(num, byCategory)
    }

    const fwMatch = line.match(FONT_WEIGHT_DECL_RE)
    if (fwMatch) allowedFontWeights.add(Number(fwMatch[1]))

    const hexMatches = line.match(HEX_RE)
    if (hexMatches) {
      const varDeclMatch = line.match(/^\s*(--[\w-]+)\s*:/)
      if (varDeclMatch) {
        const varName = varDeclMatch[1]
        for (const hex of hexMatches) {
          const norm = normalizeHex(hex)

          const list = colorToVar.get(norm) || []
          if (!list.includes(varName)) list.push(varName)
          colorToVar.set(norm, list)

          const category = classifyColorVar(varName)
          const byCategory = colorCategoryToVar.get(norm) || { generic: [], component: [] }
          if (!byCategory[category].includes(varName)) byCategory[category].push(varName)
          colorCategoryToVar.set(norm, byCategory)
        }
      }
    }
  }

  return { colorToVar, pxToVar, colorCategoryToVar, pxCategoryToVar, allowedFontWeights }
}
