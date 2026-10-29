# Gap inventory — silent freestyle / routing coverage

**Date:** 2026-07-24  
**Source:** `harness/logs/routing-log.md` + every `projects/*/log.md` +
`harness/harness-enforcement-handoff.md` (settings-ia)  
**Method:** Real logged requests only. Silent freestyles are inferred when
a request was answered with no skill load and no global routing-log row
(or when a later handoff explicitly documented the bypass).

---

## Corpus size (honest)

| Source | Usable request rows |
|---|---|
| `harness/logs/routing-log.md` | **1** (the 2026-07-24 Figma MISROUTE — created after the fact) |
| `projects/*/log.md` (excl. template / empty stubs) | **~16** dated request rows |
| Documented unlogged cluster | settings-ia multi-turn prototype (handoff 2026-07-15) — **N turns, 0 skill/routing rows** |

We do **not** have 30–50 global routing-log entries. The empty global log
**is itself a coverage failure**: §5 already required every decision to
land there; almost none did. Backfill of known task-log rows is part of
this audit’s fix.

---

## Per-request classification (project logs)

| Date | Request (abbrev.) | Task | Matched row? | Logged globally? | Verdict |
|---|---|---|---|---|---|
| 2026-07-06 | Build calendar + copy right | calendar-screen | Yes — iterating + content | **No** | Process gap (task log only) |
| 2026-07-06 | Clients list redesign | clients-list-redesign | Yes — iterating | **No** | Process gap |
| 2026-07-07 | Build leaderboard city by city | city-referral-leaderboard | Near-miss → corrected to kickoff | **No** | Logged in task; research almost skipped |
| 2026-07-07 | “Give me some ideas for referrals leaderboard…” | city-referral-leaderboard | **design-kickoff** (post–MR #26) | **No** | Was the pre-fix silent-ideas gap; now matched |
| 2026-07-07 | “lets build something now…” | city-referral-leaderboard | Exploratory bypass of `ui-agent` | **No** | Soft freestyle (explicit “ideas only” gate) |
| 2026-07-07 | “build prototype with right skills” | city-referral-leaderboard | Yes — formal chain | **No** | Process gap |
| 2026-07-08 | Start referral entry points… | referral-entry-points-notifications | Yes — kickoff | **No** | Process gap |
| 2026-07-08 | Gate approve + go build | referral-entry-points-notifications | Yes — iterating chain | **No** | Process gap |
| 2026-07-10 | Start in-app chat | in-app-chat | Yes — kickoff | **No** | Process gap |
| 2026-07-10 | Post-gate build | in-app-chat | Yes — iterating chain | **No** | Process gap |
| 2026-07-15 | IA taxonomy / settings-ia iterates | settings-ia | Partial early; **later turns silent** | **No** | **SILENT FREESTYLE CLUSTER** |
| 2026-07-15 | Formalize prototype path A | settings-ia | Recovery chain | **No** | Process gap |
| 2026-07-17 | Improving nav app headers | settings-ia | kickoff resume | **No** | Process gap |
| 2026-07-18 | Variant-fork harness build | clients-list-redesign | ui-agent | **No** | Process gap |
| 2026-07-22 | Gallery card trigger verify | gallery-card-trigger-verify | harness verify | **No** | Process gap |
| 2026-07-24 | Figma entry points “audit / any thoughts?” | referral-entry-points-notifications | **MISROUTE → freestyle** | Yes (retro) | **SILENT FREESTYLE** (fixed narrowly same day) |
| 2026-07-24 | Follow-ups: “how you audit / didn’t use skills / how fix” | (meta / this chat) | No row; answered directly | **No** | Meta — should have been loud fallback or design-ops/`harness-audit` |

---

## Silent freestyle inventory (the real gaps)

### G1 — Opinion / critique phrasing without a dedicated row (FIXED narrowly → expand)
- **Evidence:** 2026-07-24 Figma URL + “any thoughts?”
- **What happened:** Answered from Figma MCP + brief; no skill file; no log
- **Shape also at risk:** “what do you think of this screen”, “quick gut check”, “any thoughts on X” **without** a Figma URL (Design Harness / screenshot / named surface)

### G2 — “Give me ideas for X” on net-new (FIXED in MR #26)
- **Evidence:** city-referral-leaderboard 2026-07-07 ideas ask → now `design-kickoff`
- **Remaining hole:** same phrasing on an **already-APPROVED** task still has no row — kickoff deliberately does not fire → risk of freestyle brainstorm

### G3 — Iterative micro-edits skip classification (settings-ia)
- **Evidence:** `harness/harness-enforcement-handoff.md` — “fix tab bar”, “add citations”, etc. edited code with zero skill/routing rows
- **Shape:** small-sounding build asks on an existing prototype

### G4 — Global routing-log not written (process, not phrasing)
- **Evidence:** ~16 task-log rows vs 1 global row
- **Effect:** silent misses are invisible to `harness-audit` until someone notices by accident

### G5 — Soft fallback allows free-answer
- **Evidence:** §4 said “never silently guess” but did not force a loud “no match” + explicit freestyle opt-in + mandatory log **before** any answer
- **Effect:** agents treat unmatched asks as normal Q&A

### G6 — Meta / harness-ops asks unrouted
- **Evidence:** this session’s “how did you audit / how fix routing”
- **Should match:** `harness-audit` (exists under `harness/harness-audit/`) or loud fallback — not freestyle process advice without logging

---

## Proposed skill matches (not catch-alls)

| Gap | Routing row target | Skill(s) |
|---|---|---|
| G1 | Design critique (Figma **or** existing screen/screenshot/named surface) | `ux-pattern` → (`content` if copy) |
| G2 remainder | Ideation / think-through on **approved** iterating work | `ux-pattern` (+ `research-agent` only if they ask for fresh discovery) |
| G3 | Micro-edit / “fix / tweak / make X taller” on existing prototype | iterating `ui-agent` → … → `audit` (never raw edit) |
| G4 | §5 + always-apply Cursor rule: log every classification | n/a (enforcement) |
| G5 | Loud fallback protocol | n/a (behavior) |
| G6 | “audit the harness / routing coverage / why did it freestyle” | `harness-audit` |

Fixes applied in the same change set as this inventory.
