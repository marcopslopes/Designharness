# Breadboard — <flow-name>

**Created:** YYYY-MM-DD
**Last updated:** YYYY-MM-DD

---

## Job story

**When** <situation>,
**I want to** <motivation>,
**So I can** <outcome>

---

## Flow metadata

**Entry point:** <Where user starts>
**Success state:** <Where user ends when successful>
**Failure states:** <Where user ends on error/cancel>

---

## Places

<Use this notation: Place Name, affordances → destinations, [content]>

### Place Name
- affordance → destination
- affordance → destination
- conditional affordance → (if condition) → destination
[ Content shown in this place: brief description ]

### Another Place
- affordance → destination
[ Content ]

### Edge Case Place (error/empty/loading)
- affordance → destination
[ Content + feedback ]

---

## Conditional logic

<Document conditions explicitly>

| Affordance | Condition | Destination |
|------------|-----------|-------------|
| [Action] | if <condition> | Success Place |
| [Action] | if <other condition> | Error Place |

---

## Edge cases covered

- [ ] Validation errors (inline feedback + where it goes)
- [ ] Server errors (retry/cancel paths)
- [ ] Empty states (first-time user, no data)
- [ ] Loading states (what user sees while waiting)
- [ ] Cancel/back paths (where they go)
- [ ] Offline/timeout (what happens)

---

## Open decisions

<Unmade decisions flagged during breadboarding>

- [ ] <Affordance with unclear destination>
- [ ] <Edge case not yet designed>
- [ ] <Conditional logic needs PM input>
- [ ] <Object relationship not yet navigable>

---

## Conceptual model check

<If conceptual model exists for this feature>

**Objects in this flow:**
- <Object name> — attributes/actions intact? navigable?

**Relationships in this flow:**
- <Object A> belongs-to <Object B> — navigable?

**Vocabulary:**
- Terms match ubiquitous language from conceptual-model.md?

---

## Changes from current (if redesign)

**What's different:**
- <Change 1> — <why>
- <Change 2> — <why>

**What stayed the same:**
- <Kept X because Y>

---

## Next steps

- [ ] Review breadboard with PM/eng
- [ ] Resolve open decisions
- [ ] If model unstable: fix conceptual-model.md first
- [ ] If model stable: build with ui-agent

---

## Related artifacts

- **Conceptual model:** `conceptual-model.md` (objects/relationships/vocabulary)
- **Job story:** `brief.md` or `findings.md`
- **Screens:** (built after breadboard stable)
