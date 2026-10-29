#!/usr/bin/env node
/**
 * Mechanical rule checks over one CSS source string: does every raw
 * colour/spacing/radius/border-width/font-size/font-weight value resolve
 * to a token already defined in the project's own token sheet?
 *
 * Company-agnostic by design: this file encodes "values must come from
 * tokens," not any specific palette, scale, or brand rule. A project
 * that wants different property coverage passes `propertyOverrides` (see
 * loadPropertySets below); it never has to fork this file to plug in.
 *
 * Deliberately NOT a port of generic AI-slop heuristics (gradient text,
 * cream palettes, side-tab borders, overused fonts...) — those encode
 * one tool's opinion about *taste*. This engine only checks the one
 * mechanical, provable fact a token sheet can settle: does a token exist
 * for this value, yes or no.
 */

// Each key here doubles as the *category* rules.mjs looks up in
// tokens.pxCategoryToVar / tokens.colorCategoryToVar — a property in
// the `radius` set only ever matches a token classified `radius`,
// never one that happens to share a numeric value from an unrelated
// category (see core/tokens.mjs's module doc for why that matters).
const DEFAULT_PROPERTY_SETS = {
  color: [
    'color',
    'background',
    'background-color',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    'fill',
    'stroke',
    'box-shadow',
  ],
  radius: [
    'border-radius',
    'border-top-left-radius',
    'border-top-right-radius',
    'border-bottom-left-radius',
    'border-bottom-right-radius',
  ],
  borderWidth: ['border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
  // Deliberately excludes top/right/bottom/left: those are positioning
  // offsets (often negative, often visually-tuned to a specific layout),
  // not draws from the spacing scale. A project can add them back via
  // propertyOverrides.spacing if that's a meaningful check for its scale.
  spacing: [
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'gap',
    'row-gap',
    'column-gap',
  ],
  fontSize: ['font-size'],
  fontWeight: ['font-weight'],
}

/** Merges caller-supplied property overrides over the defaults, category by category. */
export function loadPropertySets(overrides = {}) {
  const merged = {}
  for (const key of Object.keys(DEFAULT_PROPERTY_SETS)) {
    merged[key] = new Set(overrides[key] ?? DEFAULT_PROPERTY_SETS[key])
  }
  return merged
}

/** Strips comments; keeps line count stable so line numbers below stay accurate. */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
}

/**
 * Small declaration-block scanner: not a full CSS parser (no AST, no
 * selector context), but enough to find `property: value;` pairs with an
 * accurate line number. If this drifts on real files, upgrade to a real
 * CSS parser (`postcss`) rather than patching regexes further.
 */
function* iterDeclarations(css) {
  let segment = ''
  let segmentLine = 0
  let line = 1
  let parenDepth = 0
  for (const ch of css) {
    if (ch === '(') parenDepth++
    else if (ch === ')') parenDepth = Math.max(0, parenDepth - 1)

    const ends = ch === '{' || ch === '}' || (ch === ';' && parenDepth === 0)
    if (ends) {
      // A segment closed by `{` is a selector or at-rule prelude (`a:hover`,
      // `@media (max-width: 600px)`), never a declaration.
      if (ch !== '{') {
        const declMatch = segment.trim().match(/^([\w-]+)\s*:\s*([\s\S]+)$/)
        if (declMatch && !declMatch[1].startsWith('--')) {
          yield { property: declMatch[1].toLowerCase(), value: declMatch[2].trim(), line: segmentLine }
        }
      }
      segment = ''
      parenDepth = 0
    } else {
      if (segment.trim() === '' && !/\s/.test(ch)) segmentLine = line
      segment += ch
    }
    if (ch === '\n') line++
  }
}

function hasVar(value) {
  return /var\(--/.test(value)
}

function extractHexColors(value) {
  const matches = value.match(/#[0-9a-fA-F]{3,8}/g)
  return matches || []
}

function extractPxNumbers(value) {
  const matches = value.match(/-?[\d.]+px/g)
  return matches ? matches.map((m) => Number(m.replace('px', ''))) : []
}

/**
 * @param {string} cssSource
 * @param {{colorToVar: Map, pxToVar: Map, allowedFontWeights: Set}} tokens from core/tokens.mjs
 * @param {{color?: string[], radius?: string[], borderWidth?: string[], spacing?: string[], fontSize?: string[], fontWeight?: string[]}} [propertyOverrides]
 * @returns {Array<{ruleId: string, severity: string, line: number, property: string, value: string, message: string}>}
 */
export function runRules(cssSource, tokens, propertyOverrides = {}) {
  const props = loadPropertySets(propertyOverrides)
  const css = stripComments(cssSource)
  const findings = []

  for (const { property, value, line } of iterDeclarations(css)) {
    if (hasVar(value)) continue // already compliant, whatever the property

    if (props.color.has(property)) {
      const hexes = extractHexColors(value)
      for (const hex of hexes) {
        const norm =
          hex.toLowerCase().length === 4
            ? '#' +
              [...hex.slice(1)]
                .map((c) => c + c)
                .join('')
                .toLowerCase()
            : hex.toLowerCase()
        const byCategory = tokens.colorCategoryToVar.get(norm)
        const genericMatch = byCategory?.generic ?? []
        const componentMatch = byCategory?.component ?? []

        if (genericMatch.length > 0) {
          findings.push({
            ruleId: 'raw-color-has-token',
            severity: 'TOKEN-RAW',
            line,
            property,
            value: hex,
            suggestedVar: genericMatch[0],
            message: `${hex} matches ${genericMatch.join(' / ')} — use var(${genericMatch[0]}) instead of the raw literal.`,
          })
        } else if (componentMatch.length > 0) {
          // A component-scoped colour (e.g. one button/toast/chip state
          // fill) happens to share this value. Not auto-fixable and not
          // suggested as a fix here — reusing another component's token
          // outside its own spec is exactly the coupling this category
          // split exists to prevent. Surfaced only as context for the
          // human decision below.
          findings.push({
            ruleId: 'raw-color-no-generic-token',
            severity: 'TOKEN-GAP',
            line,
            property,
            value: hex,
            message: `${hex} has no reusable (generic) token. Note: ${componentMatch.join(' / ')} share this value but are scoped to their own component — do not reuse across components. Map to nearest generic token, add one, or log as tracked debt.`,
          })
        } else {
          findings.push({
            ruleId: 'raw-color-no-token',
            severity: 'TOKEN-GAP',
            line,
            property,
            value: hex,
            message: `${hex} has no matching token. Map to nearest, add a token first, or log as tracked debt — never invent a one-off.`,
          })
        }
      }
    }

    const pxCategory = props.radius.has(property)
      ? 'radius'
      : props.borderWidth.has(property)
        ? 'borderWidth'
        : props.spacing.has(property)
          ? 'spacing'
          : props.fontSize.has(property)
            ? 'fontSize'
            : null

    if (pxCategory) {
      const pxNums = extractPxNumbers(value)
      for (const num of pxNums) {
        // Skip zero (a zero token commonly exists and isn't worth
        // flagging) and negative values (negative margins are a
        // deliberate layout-nudge / visually-hidden technique, not a
        // draw from the scale — confirmed noise, not signal, on real
        // files during this engine's first validation pass).
        if (num <= 0) continue
        const byCategory = tokens.pxCategoryToVar.get(num)
        const categoryMatch = byCategory?.[pxCategory] ?? []
        const otherMatch = byCategory
          ? Object.entries(byCategory)
              .filter(([k]) => k !== pxCategory)
              .flatMap(([, v]) => v)
          : []

        if (categoryMatch.length > 0) {
          findings.push({
            ruleId: 'raw-px-has-token',
            severity: 'TOKEN-RAW',
            line,
            property,
            value: `${num}px`,
            suggestedVar: categoryMatch[0],
            message: `${num}px matches ${categoryMatch.join(' / ')} — use var(${categoryMatch[0]}) instead of the raw literal.`,
          })
        } else if (otherMatch.length > 0) {
          // Numerically equal to a token from a *different* category —
          // e.g. a spacing value that happens to equal a component's
          // height token. Never suggested: that's the exact mismatch a
          // first real-file pass caught (a radius property matched to
          // a height token purely on shared numeric value).
          findings.push({
            ruleId: 'raw-px-no-category-token',
            severity: 'TOKEN-GAP',
            line,
            property,
            value: `${num}px`,
            message: `${num}px has no ${pxCategory} token. Note: ${otherMatch.join(' / ')} share this value but belong to a different category (not a valid substitute here). Nearest-token judgment or a tracked-debt entry is needed.`,
          })
        } else {
          findings.push({
            ruleId: 'raw-px-no-token',
            severity: 'TOKEN-GAP',
            line,
            property,
            value: `${num}px`,
            message: `${num}px has no matching token for this property. Nearest-token judgment or a tracked-debt entry is needed — never invent a one-off.`,
          })
        }
      }
    }

    if (props.fontWeight.has(property)) {
      const num = Number(value.trim())
      if (!Number.isNaN(num) && tokens.allowedFontWeights.size > 0 && !tokens.allowedFontWeights.has(num)) {
        findings.push({
          ruleId: 'invalid-font-weight',
          severity: 'TOKEN-INVALID',
          line,
          property,
          value,
          message: `font-weight: ${num} is not one of the weights defined in the token sheet (${[...tokens.allowedFontWeights].sort((a, b) => a - b).join(', ')}).`,
        })
      }
    }
  }

  return findings
}
