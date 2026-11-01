# Design system skill — how it works

The **design-system** skill stops invented colours, spacing, and type **while
a screen is being built** — before they land in CSS. It also names three
places styles are allowed to live, so Design Harness catalog chrome and playground
prototypes don’t quietly become a second design system.

This doc is the human-readable guide. Agents follow the full protocol in
[`harness/skills/design-system/SKILL.md`](SKILL.md).

For the broader “token-first catalog” workflow (Figma → Design Harness → audits),
see [`ai-native-design-system.md`](../../../documentation/guides/ai-native-design-system.md).
For how *all* skills route, see [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill (full protocol) | [`harness/skills/design-system/SKILL.md`](SKILL.md) |
| Pre-write token check | [`harness/skills/design-system/references/token-check.md`](references/token-check.md) |
| Structural debt index | [`harness/skills/design-system/references/structural-debt.md`](references/structural-debt.md) |
| Durable debt log | [`KNOWN-ISSUES.md`](../../../KNOWN-ISSUES.md) · index: [`structural-debt.md`](references/structural-debt.md) |
| Tokens (source of truth) | [`context/design-system/tokens.css`](../../../context/design-system/tokens.css) |
| Lab-only tokens (not DS) | [`src/design-harness/styles/tokens.lab.css`](../../../src/design-harness/styles/tokens.lab.css) |
| Primitives | [`context/design-system/ds/`](../../../context/design-system/ds) |
| Hard rules | [`harness/references/design-system-rules.md`](../../references/design-system-rules.md) |
| Live catalog | Design Harness — `npm run dev` → Foundations / Components |
| Routing entry | [`harness/ORCHESTRATOR.md`](../../ORCHESTRATOR.md) §2 |
| Loaded by | [`ui-agent`](../ui-agent/SKILL.md) before writing CSS |
| Reactive cousin (does **not** replace this) | [`audit`](../audit/SKILL.md) Check 1 |
| Mechanical detector both use | [`scripts/design-detector/`](../../../scripts/design-detector/README.md) |
| Local commit-time wall | [`scripts/git-hooks/pre-commit.mjs`](../../../scripts/git-hooks/pre-commit.mjs) — installed via `npm install` |
| Typed-verdict validator | [`scripts/verify-audit-verdict.mjs`](../../../scripts/verify-audit-verdict.mjs) |

---

## What problem it solves

`audit` catches bad tokens **after** a prototype is built. By then the invented
value is already in the file and easy to ship by habit.

This skill closes that gap:

1. **Layer rule** — know *where* a style belongs before writing it.
2. **Token check** — know whether the value already exists in `tokens.css`.
3. **Visible debt** — structural problems live in `KNOWN-ISSUES.md`, not
   only in chat history (see `structural-debt.md`).

---

## The three layers (where styles live)

```
┌─────────────────────────────────────────────────────────────┐
│  1. Real design system                                      │
│     context/design-system/tokens.css + ds/                  │
│     Foundations + DS component tokens only.                 │
├─────────────────────────────────────────────────────────────┤
│  1b. Lab tokens (not DS)                                    │
│     src/design-harness/styles/tokens.lab.css                       │
│     Phone shell, referral heroes, screen one-offs.          │
├─────────────────────────────────────────────────────────────┤
│  2. Design Harness catalog chrome                                  │
│     src/design-harness/styles/chrome.css + phone-shell.css         │
│     Must consume tokens. Minimal own styling.               │
├─────────────────────────────────────────────────────────────┤
│  3. Per-prototype CSS                                       │
│     src/design-harness/styles/prototypes/<feature>.css             │
│     Scoped per feature; barrel: styles/index.css            │
└─────────────────────────────────────────────────────────────┘
```

**Open debt:** none for the three-layer stylesheet mix — resolved by
`src/design-harness/styles/` (see that folder’s `README.md`). New prototype CSS
goes under `prototypes/<feature>.css`, not back into a monolith.

Same split in a native app: the token package is not the feature-screen
package — same idea as (1) vs (3).

---

## When it runs

### 1. Automatically on build (usual path)

You say something like *“build me a calendar prototype”* or *“iterate this
screen.”*

1. Orchestrator routes to **`ui-agent`** (after `design-kickoff` if the
   work is net-new).
2. Before writing colour / spacing / radius / type, **`ui-agent` loads this
   skill’s token-check**.
3. Build continues with real tokens (or stops for a `[DS-TOKEN-GAP]`).
4. **`audit`** still runs at the end as the reactive gate.

You do **not** need to say “use the design-system skill.”

### 2. You ask directly (standalone)

Examples:

- “Is this a real Foundations token?”
- “Where should this style live?”
- “Check this colour against tokens.css”
- “Use the design-system skill” / `/design-system`

### 3. What does **not** auto-run it alone

- Copy-only asks → `content`
- Icon-only asks → `icon-usage`
- “Is this ready to share?” → `audit` (which still checks DS violations
  after the fact)

---

## What the token check does

Before any CSS value is written:

| Result | Action |
|--------|--------|
| Token **exists** in `tokens.css` | Use `var(--…)` (or the matching `ds` prop) |
| **Nearest** token is close enough | Use nearest; one-line note in chat |
| Real **gap** (Figma has it, we don’t) | Hard-stop — map / add to `tokens.css` / defer — **never invent** `--my-special-teal` in page CSS |

**Weights allowed:** 400, 600, 700 only (`--font-weight-regular`,
`--ds-font-weight-semibold`, `--font-weight-bold`).

**Borders today:** `--border-01`, `--border-02` only — there is no
`--border-03`.

Example agent output shape:

```
### Token check — soft lavender tip-card background

Layer: prototype
Lookup: lavender / tip surface in tokens.css
Result: GAP — no Foundations tip-lavender fill
Action: use var(--color-bg-muted) as nearest, or [DS-TOKEN-GAP] to add
        a Figma-backed token first — do not invent --color-tip-lavender
```

Full procedure: [`references/token-check.md`](references/token-check.md).

---

## How this differs from `audit`

| | **design-system** | **audit** |
|--|-------------------|-----------|
| When | While building (pre-write) | After build (session files) |
| Job | Prevent inventing / wrong layer | Catch what slipped through |
| Mandatory on share? | Loaded by `ui-agent` during build | Yes — last step of every build chain |

Both stay. One is the seatbelt; the other is the inspection.

**Since 2026-08-08, `audit` Check 1 is a hard gate, not judgment input.**
It runs `scripts/design-detector` mechanically on every touched `.css`
file; a nonzero exit code means the audit cannot report PASS for that
file, full stop — the agent doesn't get to "flag it but call it advisory
because the rest looks fine." Every audit report now also ends with a
small machine-checkable JSON block (`verdict`, `blocking_count`, …) that
`scripts/verify-audit-verdict.mjs` can validate independently, so a
PASS with a hidden blocking issue is a validation failure, not a matter
of opinion.

---

## Pre-commit hook (mechanical, not advisory)

`npm install` installs a local `pre-commit` git hook
(`scripts/git-hooks/pre-commit.mjs`, wired via `scripts/install-git-hooks.mjs`
and `package.json`'s `prepare` script — no manual step per clone). On
every commit it runs `scripts/design-detector` against whatever `.css`
files are **staged** and blocks the commit if any raw
colour/spacing/radius/font value already has a matching token in
`context/design-system/tokens.css`.

```
pre-commit: design-detector found unresolved raw values on staged .css file(s) — see findings above.
  Fix mechanically:  npm run design:detect -- --fix <file>
  Fix by hand, then: git add <file> && git commit
  Or skip this check (not recommended): git commit --no-verify
```

The hook is a **local tripwire** — `--no-verify` bypasses it on purpose. GitHub
Actions re-runs the same check on every push and pull request
(`npm run build` → `design:check`), so a bypass still fails CI. Same honesty this
repo already applies to the `preToolUse` deny hook's known race (see
`KNOWN-ISSUES.md`). It catches the common case at the earliest possible
moment; `audit`'s Check 1 (above) is still the real, harder-to-skip gate
before anything gets shared.

If the hook ever misfires or you need to re-install it after a fresh
clone: `node scripts/install-git-hooks.mjs`.

---

## What it does NOT do

- Does **not** replace `audit`, `icon-usage`, or `ui-agent`
- Does **not** invent Foundations tokens for one-off screens
- Does **not** own harness routing health (`design-ops` / `harness-audit`)

---

## Browse the real system in Design Harness

```bash
npm run dev
```

Open the Foundations hub (“Tokens in context”) and Components pages. Those
samples should use the same `tokens.css` variables this skill enforces —
colour samples via `var(--color-…)`, type via `--type-*` / `--font-size-*`.

---

## Related docs

| Doc | Role |
|-----|------|
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Full skill library + routing |
| [`ai-native-design-system.md`](../../../documentation/guides/ai-native-design-system.md) | Token-first build playbook |
| [`icon-usage`](../icon-usage/GUIDE.md) | Icon / Tabler lane (separate from colour/spacing) |
| [`context/design-system/README.md`](../../../context/design-system/README.md) | What’s in the DS folder |
| [`harness/references/design-system-rules.md`](../../references/design-system-rules.md) | Non-negotiable token / component rules |
