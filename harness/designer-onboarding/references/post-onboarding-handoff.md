# Post-onboarding handoff — start the conversation

Run **immediately after** writing `designer-profile.local.md`. Use **tables**
for workload data (scannable). Use **`AskQuestion`** for the next-step menu
— never bullet the menu in chat prose.

**The handoff opens with a personalized, bolded headline — never a
generic recap-table cold-open** (re-spec 2026-07-17; this replaces the
prior "profile recap table" step entirely — see § 2 below).

Scripts: `references/onboarding-workload-scope.md` (tables, and the
side-thread detection rule § 2 below uses), `references/
handoff-menu-question.md` (menu).

Tone: `COMPANY-VOICE.md` — warm, peer-to-peer, no hype, no emoji.

**Links:** every ticket key in workload tables must be a markdown link per
`harness/references/source-links.md` — never bare `PROJ-170` in the Key column.

---

## When to use full vs short handoff

| Situation | Handoff |
|-----------|---------|
| Vague first message (`hi`, `help`) | **Full** — headline + workload tables + `AskQuestion` menu (menu fires **after** the tables — see § 5) |
| Named topic, no clear skill | **Full** |
| **Specific actionable** ask (`build the clients list`) | **Short** — mini headline + workload tables → execute, **skip** menu `AskQuestion` |
| `Status: SKIPPED` | Skip all of this |

---

## Full handoff structure

### 1. Confirm save (one line, verbatim)

> Profile's saved locally — I won't ask those setup questions again.

### 2. Personalized headline — never a generic recap-table cold-open

**Re-spec 2026-07-17: this replaces the old "profile recap table" step.**
Previously this handoff opened with a mini table (`Right now` / `Role
focus` / `Your map` / `Platform`) before the workload tables — that's the
"generic recap table cold-open" this section now exists to prevent.
Instead, **one bolded headline sentence, naming the designer and what's
already known about them**, then a short transition line, then straight
into the workload table(s) — no table before the headline.

**Self-check before this line:** it must be the literal next line after
§ 1's "Profile's saved locally" confirmation, before any table — the
same failure shape as every other soft-prose gap already fixed in this
skill (see `SKILL.md` § The greeting's Step 0a for the original case):
described here as the intended output, it still needs an explicit check
at the point it's supposed to fire, or it silently gets skipped in favor
of jumping straight to the table.

**Compose per case — exactly one of these fires:**

**A. IC, squad known, a side thread was found** (per
`onboarding-workload-scope.md` § Side-thread detection):

> **Hi [Name], you're on the [Squad] team, and it looks like you've also
> got [side-thread ticket, in a few plain words] going.**
>
> I'll keep that in mind for later — right now, here's what might need
> your attention:

**B. IC, squad known, no side thread** (Side-thread detection found
zero qualifying tickets — drop both the side-thread clause and the
"I'll keep that in mind" sentence, there's nothing to keep in mind):

> **Hi [Name], you're on the [Squad] team.**
>
> Here's what might need your attention:

**C. IC, squad unset** (no "usual work" baseline exists to name a side
thread against — skip that clause entirely, per
`onboarding-workload-scope.md` § Side-thread detection rule 1; don't
mention squad at all rather than showing an "unset" cell):

> **Hi [Name] — here's what might need your attention:**

**D. Manager, reports known:**

> **Hi [Name], you lead design across [domain(s)] — here's your team's
> status:**

**E. Manager, reports unset** (said "skip for now" at onboarding — no
guessed team, same honesty rule as everywhere else in this skill):

> **Hi [Name] — here's your team's status, once I know who's on it. Say
> "update my profile" to add your reports.**

No separate profile-recap table follows any of these — the headline
**is** the recap. If `projects/<slug>/` matches an initiative, mention it
in the transition line instead of a table row, e.g. "...right now, here's
what might need your attention (and `projects/<slug>/` already exists for
one of these)."

### 3. Workload snapshot — **tables** (mandatory)

Follow `onboarding-workload-scope.md`. Section header + timestamp, then
**up to three markdown tables** — just the personal-queue one when squad
is unset (the default), all three once squad is known (opt-in or filled
in later). Omit empty sections with one line: *"Quiet on [leg]."*

```markdown
### Workload snapshot — [YYYY-MM-DD HH:MM UTC]

*Live from [tracker] · [Full name] · [squad scope]. Say **refresh workload** for a full dump.*

#### Your queue (`DES` + `UXR`)

| Status | Key | Summary | Board |
|--------|-----|---------|-------|
| In Progress | PROJ-151 | Navigation work and discovery | DES |
| To Do | PROJ-156 | Referral tool market research | DES |
| … | | | |

#### Roadmap ([board keys])

| Stage | Key | Summary |
|-------|-----|---------|
| Make | PROJ-631 | B2B referral program foundations |
| Plan | PROJ-655 | Referral program discoverability |
| … | | |

#### Squad design in flight ([squad name])

| Status | Key | Summary | Assignee | Board |
|--------|-----|---------|----------|-------|
| In Progress | PROJ-160 | Referrals — Phase 0 testing | Jordan Lee | DES |
| On Hold | PROJ-51 | New profile design fixes | Priya Nair | DES |
| … | | | | |
```

**Design rules for tables:**

- Sort **Your queue**: In Progress → Review → To Do/Backlog/Open → On Hold
- **Key** column: markdown link — `[PROJ-151](https://your-tracker.example/PROJ-151)` per `harness/references/source-links.md`
- **Summary**: truncate at ~60 chars with `…` if needed
- Cap rows per table per `onboarding-workload-scope.md`
- **Worth a look**: one short paragraph **below** the tables (not a table) —
  cross-ref insight only, max 3 sentences

### 4. Cross-squad note (one line, below tables)

Only when relevant — see previous rules in `COMPANY-SQUADS.md` context.

### 5. Next step — **`AskQuestion` only**, and only after § 3's table(s) are already shown

**Ordering, not just content: this question fires strictly after the
workload table(s), never before or alongside them.** The designer sees
their real queue first, then gets asked what to focus on — informed by
what they just saw, not asked blind. **Self-check before calling this
tool:** at least one workload table from § 3 must already be present
above in this same response — if it isn't yet, render it first, then
call this tool.

Load `references/handoff-menu-question.md`. Run **one** `AskQuestion` with
role-ordered options.

**Forbidden in chat prose:**

```markdown
A few places to start:
- Kick off a project — …
- Build or iterate — …
…
What do you want to tackle first?
```

That copy belongs **only** in the `AskQuestion` UI.

---

## Example A — squad unset (real, live-queried data — Daniel Okafor)

**Illustrative data, modelled on a live query.** Daniel
Okafor' name only appears in Counter's informal directory note, not
a clean match, so silent squad resolve correctly leaves `Squad
assignment:` unset — per § Side-thread detection rule 1, that means the
side-thread clause is skipped too, **even though his real queue
obviously has one** (PROJ-170 "Agents design playground" next to
referrals/checkout work) — this is the rule failing safe on ungoverned
data, the same trade-off already accepted for the 3-squad silent-resolve
limit (`KNOWN-ISSUES.md`). See Example B for the same designer with squad
set via opt-in, where the clause does fire.

> Profile's saved locally — I won't ask those setup questions again.
>
> **Hi Daniel — here's what might need your attention:**
>
> ### Workload snapshot — 2026-07-17 05:50 UTC
>
> *Live from [tracker] · Daniel Okafor. Say **refresh workload** for a full dump.*
>
> #### Your queue (`DES` + `UXR`)
>
> | Status | Key | Summary | Board |
> |--------|-----|---------|-------|
> | In Progress | [PROJ-174](https://your-tracker.example/PROJ-174) | Referrals — journey per category | DES |
> | In Progress | [PROJ-170](https://your-tracker.example/PROJ-170) | Agents design playground — AI skills & design pipeline | DES |
> | In Progress | [PROJ-156](https://your-tracker.example/PROJ-156) | Referral tool market research | DES |
> | In Progress | [PROJ-96](https://your-tracker.example/PROJ-96) | Providers component revamp | DES |
> | To Do | [PROJ-169](https://your-tracker.example/PROJ-169) | Provider Settings IA — nav phase 2 | DES |
>
> Squad-matched work and roadmap will show up once I know your squad —
> mention it on your first real task, or say "set up my full profile" to
> pick it now.
>
> *(then, only after the table above, per § 5's ordering: `AskQuestion`
> "What do you want to tackle first?" — options per
> handoff-menu-question.md; **no** bullet menu in prose)*

---

## Example B — same designer, squad set via opt-in (side thread fires)

Daniel says "set up my full profile now" and picks Core Product →
Counter at 2a/2b. Now `Squad assignment:` is real, so § Side-thread
detection can run: PROJ-170's summary doesn't match Counter's
`referrals, navigation, loyalty, checkout` keyword list (leg 3), and it
doesn't appear in the rendered Roadmap/Squad-design-in-flight tables
(deduplicated out since it's already in **Your queue**) — so it qualifies.

> Profile's saved locally — I won't ask those setup questions again.
>
> **Hi Daniel, you're on the Counter team, and it looks like you've
> also got the agents design playground work going too.**
>
> I'll keep that in mind for later — right now, here's what might need
> your attention:
>
> ### Workload snapshot — 2026-07-17 05:50 UTC
>
> *Live from [tracker] · Daniel Okafor · Counter / CORE. Say **refresh workload** for a full dump.*
>
> #### Your queue (`DES` + `UXR`)
>
> | Status | Key | Summary | Board |
> |--------|-----|---------|-------|
> | In Progress | [PROJ-174](https://your-tracker.example/PROJ-174) | Referrals — journey per category | DES |
> | In Progress | [PROJ-170](https://your-tracker.example/PROJ-170) | Agents design playground — AI skills & design pipeline | DES |
> | In Progress | [PROJ-156](https://your-tracker.example/PROJ-156) | Referral tool market research | DES |
> | In Progress | [PROJ-96](https://your-tracker.example/PROJ-96) | Providers component revamp | DES |
>
> #### Roadmap (`CORE`)
>
> | Stage | Key | Summary |
> |-------|-----|---------|
> | Make | [PROJ-631](https://your-tracker.example/PROJ-631) | B2B referral program foundations |
>
> *(then, only after the tables above: `AskQuestion` "What do you want to
> tackle first?" — options per handoff-menu-question.md)*

---

## Example C — silent squad resolve, no side thread (illustrative — Priya Nair, Onboarding)

> Profile's saved locally — I won't ask those setup questions again.
>
> **Hi Priya, you're on the Onboarding team.**
>
> Here's what might need your attention:
>
> ### Workload snapshot — 2026-07-16 10:00 UTC
>
> *Live from [tracker] · Priya Nair · Onboarding / CORE, GROW.*
>
> #### Your queue (`DES` + `UXR`)
>
> | Status | Key | Summary | Board |
> |--------|-----|---------|-------|
> | In Progress | [PROJ-140](https://your-tracker.example/PROJ-140) | Lite onboarding permissions polish | DES |
>
> #### Roadmap (`CORE`, `GROW`)
>
> | Stage | Key | Summary |
> |-------|-----|---------|
> | Plan | [PROJ-88](https://your-tracker.example/PROJ-88) | Onboarding permissions revamp |
>
> *(then, only after the tables above: `AskQuestion` "What do you want to
> tackle first?" — options per handoff-menu-question.md)*

---

## Example D — manager, reports matched from COMPANY-SQUADS.md

> Profile's saved locally — I won't ask those setup questions again.
>
> **Hi Hana, you lead design across Provider Growth & Monetization
> and Core Product — here's your team's status:**
>
> ### Team snapshot — 2026-07-16 09:00 UTC
>
> *Live from [tracker] · 5 reports. Say **refresh workload** for a full dump.*
>
> #### Your team (`DES` + `UXR`)
>
> ⚠ Ana Costa — [PROJ-201](https://your-tracker.example/PROJ-201) "Waitlist redesign" hasn't moved in 9 days (past the staleness threshold — worth checking in)
>
> | Report | In progress | Review | Queued |
> |---|---|---|---|
> | Priya Nair | 1 | 0 | 2 |
> | Tom Becker | 2 | 1 | 1 |
> | Ana Costa | 1 | 0 | 0 |
> | Priya Hart | 0 | 1 | 3 |
> | Daniel Okafor | 1 | 0 | 1 |
>
> #### Roadmap (`CORE`, `GROW`)
>
> | Stage | Key | Summary |
> |-------|-----|---------|
> | Make | [PROJ-88](https://your-tracker.example/PROJ-88) | Onboarding permissions revamp |
> | Plan | [PROJ-655](https://your-tracker.example/PROJ-655) | Referral program discoverability |
>
> *(then, only after the tables above: `AskQuestion` "What do you want to
> tackle first?" — options per handoff-menu-question.md, with `1on1`
> inserted per the manager row)*

---

## Example E — short handoff (specific ask, no menu)

> Profile's saved.
>
> **Hi Daniel, you're on the Counter team.**
>
> *(minimal workload table if useful)*
>
> On it with the clients list screen.
>
> *(No `AskQuestion` menu — route to `ui-agent` directly.)*

---

## After the handoff

- `AskQuestion` pick → `harness/ORCHESTRATOR.md` §1–2
- Never duplicate the menu in a follow-up message
