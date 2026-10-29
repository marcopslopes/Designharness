# Routing verification — fresh untested requests (2026-07-24)

Post-fix dry-runs. Each block is the **real first-turn output** the
router must produce (not a summary). Logged in `routing-log.md` as V1–V8.

---

## V1 — "audit this Figma" + Entry points URL

**Classification:** MATCHED design-critique → `ux-pattern` → `content`

```
PLAN — referral entry points Figma critique
1. ux-pattern → structure / archetype / Northline patterns on node 2794:6191
2. content → CTA / banner / card copy against Northline content standards
Estimated: ~15–20 min. Reply "go", or edit the plan.
```

**Fail if:** freestyle opinions without PLAN / without reading skill files.

---

## V2 — "what do you think of this screen" (Design Harness `#/playground/referral-entry-points`, no Figma)

**Classification:** MATCHED design-critique (no URL required) → `ux-pattern` → `content`

```
PLAN — referral-entry-points Design Harness screen critique
1. ux-pattern → load COMPANY-PATTERNS / COMPANY-ARCHETYPES / COMPANY-BUSINESS (org-pack) + open ReferralEntryPointsPrototypePage
2. content → entry-point / notification copy on the prototype
Estimated: ~15 min. Reply "go", or edit the plan.
```

**Fail if:** casual chat critique; treating “no Figma URL” as no-match.

---

## V3 — "any thoughts on the profile banner treatment"

**Classification:** MATCHED design-critique → `ux-pattern` → `content`

```
PLAN — profile banner treatment (referral entry points)
1. ux-pattern → banner placement, Beginner 2/4 conflict, archetype fit
2. content → “Share your link” vs booking-link collision / reward wording
Estimated: ~10–15 min. Reply "go", or edit the plan.
```

**Fail if:** answering “any thoughts” inline without skill load.

---

## V4 — "quick gut check on the Reports opportunity cards"

**Classification:** MATCHED design-critique → `ux-pattern` → `content`

```
PLAN — Reports opportunity cards gut check
1. ux-pattern → ship-vs-explore across 4 triggers; archetype-fit risk if any
2. content → hardware-specific / Invite vs Refer / dual-reward consistency
Estimated: ~10–15 min. Reply "go", or edit the plan.
```

**Fail if:** “quick” skips PLAN or logging.

---

## V5 — "compare this referral share screen to Airbnb"

**Classification:** MATCHED competitor-scan (named competitor + feature)

```
Using competitor-scan for Airbnb × referral share / invite flow.
(Factual pull only — not benchmark scoring of Northline. Say if you also want benchmark.)
```

Then load `harness/skills/competitor-scan/SKILL.md` and run it.

**Fail if:** freestyle “Airbnb does X” from memory; or running `benchmark` without being asked to judge Northline.

---

## V6 — "help me think through reward-status notifications"

**Classification:** MATCHED iterating-ideation (task APPROVED) → `ux-pattern`  
(Not `design-kickoff` — PRD already approved. Not freestyle brainstorm.)

```
PLAN — reward-status notifications think-through
1. ux-pattern → structure options against NORTHLINE-PATTERNS + open questions in brief §6 #4
2. research-agent — only if you want a fresh Atlassian/Slack sweep; say so
Estimated: ~15 min for ux-pattern alone. Reply "go", or edit the plan.
```

**Fail if:** inventing a notification system in chat with no skill; or re-firing kickoff.

---

## V7 — "Help me pick a food delivery app."

**Classification:** FALLBACK (no Northline design skill matches)

```
This doesn't match an existing skill — closest is none (out of scope for
design-system-lab). Want me to freestyle without harness context, or stop?

[AskQuestion]
- Freestyle without harness (explicit opt-in)
- Stop — out of scope
- Other…
```

**Routing-log line (written this turn):**  
`2026-07-24 | V7 food delivery app | FALLBACK | closest=— | asked user | Task: —`

**Fail if:** recommending DoorDash/Uber Eats as a normal answer with no FALLBACK log.

---

## V8 — "make the tab bar taller on calendar-settings"

**Classification:** MATCHED micro-edit iterating → `ui-agent` → (`mobile-shell`) → `audit`

```
PLAN — calendar-settings tab bar height
1. ui-agent → adjust via tokens / PhoneShell patterns (no raw freestyle CSS)
2. mobile-shell → if chrome height touches shared frame
3. audit → mandatory close
Estimated: ~10–15 min. Reply "go", or edit the plan.
```

**Fail if:** directly editing `ProAppScreenChrome.tsx` / CSS without skill files (settings-ia failure mode).

---

## Result

| # | Shape | Outcome |
|---|---|---|
| V1 | audit this Figma | MATCHED design-critique + PLAN |
| V2 | what do you think of this screen | MATCHED design-critique + PLAN |
| V3 | any thoughts on X | MATCHED design-critique + PLAN |
| V4 | quick gut check on Y | MATCHED design-critique + PLAN |
| V5 | compare to Airbnb | MATCHED competitor-scan |
| V6 | help me think through Z | MATCHED iterating-ideation + PLAN |
| V7 | food delivery (out of scope) | FALLBACK loud miss + log |
| V8 | make tab bar taller | MATCHED micro-edit ui-agent + PLAN |

**Silent freestyle count in this suite: 0.**
