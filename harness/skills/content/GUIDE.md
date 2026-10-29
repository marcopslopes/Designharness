# Content — how it works

The **content** skill writes and reviews **product UI copy** — buttons,
errors, empty states, labels, onboarding — against house voice, vocabulary,
and localization. It is not long-form prose (`writing`) and not the
pre-share sweep (`audit`).

Agents load [`harness/skills/content/SKILL.md`](SKILL.md)
and the three house references (style guide, vocabulary, localization —
local org-pack first).

---

## Quick reference

| What | Path |
|------|------|
| Agent skill | `harness/skills/content/SKILL.md` |
| Style / vocab / locale | `harness/skills/content/references/` or `context/org-pack.local/COMPANY-STYLE-GUIDE.md` etc. |
| Routing entry | `harness/ORCHESTRATOR.md` §2 |
| Distinct from | `writing` (articles / posts), `ux-pattern` (flow structure), `audit` (share gate) |

---

## What you say

- "Does this button label sound right?"
- "Rewrite the empty state on this screen"
- "Check the error copy against house voice"

**Situations:**

| Situation | What you say |
|-----------|----------------|
| CTA / dialog | "What should the confirm button say — not just Yes/No?" |
| Settings | "Label this toggle for the ON state" |
| Search empty | "Empty state that names the query and how to get out" |
| Nearby labels | "The menu says Archive — don't let the toast invent a synonym" |
| Destructive / security | "Zero play on delete; serious on data loss" |

Acceptance: [`tests/scenarios.md`](../../../tests/scenarios.md) Scenario 71.

---

## Interface copy craft (house guide still wins)

If these conflict with `COMPANY-STYLE-GUIDE.md`, the house guide wins.

| Check | Rule of thumb |
|-------|----------------|
| Buttons | Verb-first, 1–3 words, specific — not "Learn more" / "OK" |
| Confirmations | Repeat the consequence (`Delete project` / `Cancel`), never bare Yes/No |
| Toggles | Label the ON state — not a double negative |
| Device verbs | "tap" / "click" / "select" to match the input; never "Click here" |
| Empty states | What this place is + how to fill it + one next action |
| Placeholders | Examples only (`name@example.com`); visible label always stays |
| Variables | Full templated strings with pluralization — don't concatenate around `n` |
| Errors | What happened + how to fix; no oops, no blame, no "we're having trouble" |
| Nearby copy | Match terms already on the screen / one screen over |
| "the user" | Address the reader — never "the user can…" on screen |
| Perspective | One of you / we / the app for the whole flow |
| Possessives | "Favorites" over "Your Favorites" unless "your" disambiguates |
| Settings link | Link the setting; don't describe Settings > … > Email |
| Hints | Format hint on the field *before* submit, not only in the error |
| Tone by stakes | Warm on empty/success; neutral on settings; zero play on delete; serious on data loss |
| Flows | "Get started" / "Continue" / "Done" — never "Next"; don't swap synonyms |
| Natural case | Store strings in natural case; use `text-transform` for visual ALL CAPS / title presentation |
| Smart punctuation | Curly quotes in prose; en dash for ranges; `…` not three periods; nbsp in tight value+unit pairs |

Copy reviews of an existing frame also get a Major / Minor / Note table
(Location / Before / After / Why). Not a second HIGH/MEDIUM/LOW scale.

Drafts always need a human pass for legal, locale, and named-feature terms.

---

## Related

| Doc | Role |
|-----|------|
| [`writing`](../writing/GUIDE.md) | Long-form articles / posts — not UI copy |
| [`accessibility`](../accessibility/GUIDE.md) | Labels / live regions as a11y, not wording |
| [`how-the-harness-works.md`](../../../documentation/guides/how-the-harness-works.md) | Roster |
