# design-detector

Deterministic, zero-LLM check: does every raw colour/spacing/radius/
border-width/font value in a CSS file already have a matching token in
the project's own token sheet? Answers mechanically the question
`harness/skills/design-system/references/token-check.md` currently asks
a human/LLM to answer by reading the file.

This checks one provable, mechanical fact: does a token
exist for this value, yes or no.

## Architecture: engine + plug-in config

This is built as a **portable engine** (`core/`) plus a **per-project
config file**. Nothing under `core/`
references Northline, `context/design-system/`, or any path in this repo.

| Piece | What it knows about |
|---|---|
| `core/tokens.mjs`, `core/rules.mjs`, `core/config.mjs` | Nothing project-specific — takes a tokens path and file paths as arguments, returns findings |
| `detect.mjs` | The CLI wiring: resolves a config, calls the engine, prints results |
| `design-detector.config.json` (repo root) | **Northline's plug-in** — points the engine at `context/design-system/tokens.css` and `src/design-harness/styles/prototypes/`. Nothing here is baked into the code. |

**A different company adopting this tool** copies `scripts/design-detector/`
(the `core/` + `detect.mjs`, unmodified) into their own repo and drops
their own `design-detector.config.json` at their root, pointing at their
own token sheet and target directories. They never touch `core/`.

## Usage

```bash
# Zero-arg: reads design-detector.config.json (searches cwd upward, like
# ESLint/Prettier config resolution) for tokensPath + targetDirs
npm run design:detect

# Explicit files/dirs — bypasses config's targetDirs, still uses its tokensPath
node scripts/design-detector/detect.mjs src/design-harness/styles/prototypes/wallet-home.css

# Fully explicit, no config needed at all — this is what a first-time
# adopter with no config file yet would run
node scripts/design-detector/detect.mjs --tokens path/to/tokens.css path/to/file.css

# JSON output
npm run design:detect -- --json

# Auto-fix: rewrites only TOKEN-RAW findings (raw literal -> var(--token)).
# Never touches TOKEN-GAP/TOKEN-INVALID -- those need a human decision.
node scripts/design-detector/detect.mjs --fix src/design-harness/styles/prototypes/wallet-home.css
```

Exit codes: `0` clean, `1` usage/runtime error (including "no tokens
path resolved" — this tool has no built-in default), `2` findings
present. Same convention as `harness/skills/audit`'s Check 1–2 gate, so
this can be wired into a hook or CI step later without changing the
contract.

## Config file (`design-detector.config.json`)

```json
{
  "tokensPath": "context/design-system/tokens.css",
  "targetDirs": ["src/design-harness/styles/prototypes"],
  "extensions": [".css"],
  "propertyOverrides": { "spacing": ["padding", "margin", "gap"] }
}
```

- `tokensPath` (required for zero-arg use) — resolved relative to the
  config file's own directory.
- `targetDirs` (optional) — directories scanned recursively for
  `extensions`-matching files when no file args are given.
- `extensions` (optional, default `[".css"]`).
- `propertyOverrides` (optional) — replace the default CSS property list
  for any of `color` / `radius` / `borderWidth` / `spacing` / `fontSize`
  / `fontWeight` (see `core/rules.mjs`'s `DEFAULT_PROPERTY_SETS`) without
  forking the engine.

## What it checks (v1)

Plain CSS files only — no inline styles, no `.tsx`. For every
`property: value` declaration that isn't already `var(--...)`:

| Category | Result |
|---|---|
| Color (hex literal) | `TOKEN-RAW` (matches a **generic/reusable** token — use `var()`) or `TOKEN-GAP` (no generic match — real gap, even if a component-scoped colour happens to share the value) |
| Radius / border-width / spacing / font-size (px literal) | same two outcomes, matched **within that property's own category only**. Zero and negative values are skipped — see `core/rules.mjs` comments (negative margins are a deliberate nudge/visually-hidden technique, not a scale violation; this was confirmed as noise, not signal, on real files) |
| Font-weight | `TOKEN-INVALID` if the value isn't one of the weights actually defined in the token sheet |

**Category-aware matching, not just value matching.** A first real-file
validation pass caught `border-radius: 24px` matching
`--ds-button-height-sm` — a height token, not a radius token — purely
because both are 24px. Numerically equal values from unrelated
categories (radius vs. spacing vs. font-size vs. border-width, or a
generic colour vs. one component's own scoped colour) are never
suggested or auto-fixed, even when they'd numerically "work" — see
`core/tokens.mjs`'s module doc for the full reasoning. A cross-category
numeric coincidence is reported as `TOKEN-GAP` with a note, not a fix.

Deliberately **not** checked yet: `top/right/bottom/left` (positioning
offsets, not spacing-scale draws), inline styles, `.tsx` files,
line-height, letter-spacing, or any layer classification (DS vs. Design Harness
chrome vs. per-prototype — that judgment stays with
`harness/skills/design-system/SKILL.md`, which this tool does not
replace).

## What it does not replace

- **`harness/skills/design-system/SKILL.md`** still owns the layer rule
  (where a value *should* live) and the human gate on a real token gap.
  This script only answers "does a token exist for this value," not
  "should this code even be writing a raw value here."
- **`harness/skills/audit/SKILL.md`** still owns the two-layer
  BLOCKING/ADVISORY report format, artifact-type classification, and
  everything this script doesn't check (a11y semantics, copy, pattern
  conformance, UX craft).

**Wired in as of 2026-08-07** — `harness/skills/design-system/references/token-check.md`
step 1 and `harness/skills/audit/SKILL.md` Check 1's "Mechanical
pre-check" both call this script now for values already on disk in a
`.css` file. It doesn't replace either skill's judgment calls (layer
rule, human gate, everything outside its v1 scope above) — it replaces
re-deriving "does a token exist for this raw value" by eye.

**Hardened as of 2026-08-08** — this tool's exit code is no longer only
advisory input to an agent's judgment. Two mechanical walls now use it
directly:

- **`scripts/git-hooks/pre-commit.mjs`** — when any `.css` file is
  staged, runs `check-baseline.mjs` (the same gate as `npm run build`)
  and blocks the commit on exit `2`, so only raw values not already in
  `design-detector.baseline.json` block — editing a file that carries
  known debt doesn't.
  Installed into `.git/hooks/pre-commit` automatically by
  `scripts/install-git-hooks.mjs` (wired to `npm install`'s `prepare`
  script — zero manual step per clone). Bypassable with
  `git commit --no-verify`, on purpose and documented — a local hook is
  a tripwire. CI re-runs the check on every push and pull request
  (`npm run build` → `design:check`), so a bypass still fails there.
- **`harness/skills/audit/SKILL.md` Check 1** — the exit code is now
  explicitly authoritative: a nonzero exit on a touched `.css` file
  means the audit cannot report PASS for it, and the report must quote
  the actual exit code as evidence rather than paraphrase the result.

Same underlying tool, same exit-code contract, two different moments
(commit-time on staged files, share-time on every touched file) — so
neither surface is the one place a raw value can quietly get through.

**Build gate as of 2026-10-09** — `npm run build` runs `npm run design:check`
(`check-baseline.mjs`) first. It runs this detector over the config's
`targetDirs` and fails on any finding not in `design-detector.baseline.json`,
the committed list of known debt (matched by file + property + value +
severity, counted — not by line). Existing debt doesn't block the build;
a new raw value does. Only regenerate the list (`npm run design:check -- --update`)
after a human token-check decision, never to get a build through.

**Parsing:** declarations are split on `;`, `{` and `}` (ignoring `;`
inside brackets such as `url(data:…;base64)`), so one-line rules,
several declarations per line and values wrapped across lines are all
checked. It's still not a full CSS parser — if it drifts on real files,
move to `postcss` rather than adding more special cases.
