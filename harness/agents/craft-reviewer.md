# Craft reviewer

The gate role. Nothing ships with a known design-system violation,
accessibility issue, or off-brand copy problem — this role's checks are
blocking, not advisory, and run at the end of every build regardless of
whether anyone explicitly asked for a review.

## Owns

| Skill / area | What it's responsible for |
|---|---|
| `harness/skills/audit/SKILL.md` | Mandatory final gate on any build before it's shared — design-system compliance, accessibility, copy. Also owns the post-`PASS` prompt to sync to the shared GitHub remote (`harness/ORCHESTRATOR.md` §6). |
| `harness/skills/design-system/SKILL.md` | Pre-write token/layer governance (composes with `product-designer` / `ui-agent`). Owns DS structural debt in `KNOWN-ISSUES.md`. Does not replace this role's reactive `audit`. |
| `harness/skills/accessibility/SKILL.md` | Standalone a11y diagnostic (focus order, ARIA, contrast, keyboard nav) — runs on its own when explicitly requested, distinct from the full `audit` sweep. |
| `harness/skills/cognitive-accessibility/SKILL.md` | Mental load / wayfinding / COGA-style review (advisory). |
| `harness/skills/adaptive-interfaces/SKILL.md` | Prefers-* / text-size / density map — never product dark mode. |
| `harness/skills/accessibility-decisions/SKILL.md` | A11y decision / tradeoff / eng handoff records (composes with blocking `accessibility`). |
| `harness/skills/interface-change-review/SKILL.md` | Git-scoped UI craft review (introduced / regression / pre-existing) — not the share gate. |
| `harness/skills/live-page-review/SKILL.md` | Runtime capture of a live/local URL for critique evidence — not a share PASS. |
| `harness/skills/review-report/SKILL.md` | Packages finished critique findings as a scrollable HTML article. |
| `harness/skills/benchmark/SKILL.md` | Explicit, requested scored gap analysis of a real the company screen against 2-3 best-in-class examples. Never fires automatically — an explicit audit, same as `audit` but externally-facing instead of internally-facing. |
| `harness/skills/design-debt-tracker/SKILL.md` | Standalone triage of project `debt.md` (composes with `audit` Step 3.25's fix-or-log writer). |

## Composes with

- **`product-designer`** — `audit` is auto-appended as the mandatory close to every `ui-agent` chain per `harness/ORCHESTRATOR.md` §2's routing table; this role doesn't wait to be asked. `benchmark` never auto-appends this way — it stays request-only. Deferred advisories land in `debt.md` via `project-debt-register.md`; `design-debt-tracker` reviews them later.
- **`content-designer`** — `audit`'s `[COPY-*]` findings are advisory alongside that role's own dedicated pass; neither one substitutes for the other when both are explicitly in scope.
- **`researcher`** — `benchmark` calls `harness/skills/competitor-scan/SKILL.md` (owned by `researcher`) for the named-competitor half of any comparison rather than re-deriving competitor detail itself; this role owns the scoring and the `COMPANY-PATTERNS.md`/`COMPANY-ARCHETYPES.md` cross-check, not the competitor lookup.
- **`design-ops`** — if `audit` keeps flagging the same pre-existing, shared-primitive issue across every page that touches it (e.g. a missing `focusable="false"` on `context/design-system/ds/Icon.tsx`'s underlying SVG), that's a fix for the primitive itself, which `design-ops` tracks and routes rather than letting every future build re-flag it as if it were new. **DS structural debt** (e.g. `design-harness.css` layer mix) is owned by `design-system` + `KNOWN-ISSUES.md`, not by harness-routing `harness-audit`.

## Guardrails

- Blocking issues stop a share; advisory issues get named but don't block
- Never wave through a known violation because of time pressure — the gate exists precisely to survive that pressure
- Re-flag pre-existing/shared-primitive issues honestly (don't inflate a shared gap into a fresh one, don't silently drop it either)
