# Conceptual model — <task-slug>

**Status:** Draft | Validated | Provisional (awaiting <bet/research>)
**Created:** YYYY-MM-DD
**Last updated:** YYYY-MM-DD

---

## Objects

Brief list of the core objects this feature recognizes:

- **Object Name** — one-line description of what it is to the user

---

## Object definitions

### Object: <Name>

**What it is** (one sentence, user's view):
<Description independent of implementation>

**Attributes:**
- `attribute_name` (type) — <what it represents>

**Relationships:**
- belongs to one/many <Other Object> (as <role>)
- has one/many <Other Object>

**Actions** (what users can do to/with it):
- Create <Object>
- Update <specific aspect>
- Delete <Object> — <what happens to related objects?>
- <Domain-specific verbs>

**States** (if it has a lifecycle):
- <State name> — <what it means, what actions are available>

**Provisional?** <yes/no — if yes, what assumption must validate first>

---

## Relationships

<ERD diagram if visual helps, or prose list of how objects connect>

---

## Ubiquitous language

Vocabulary decisions — one name per concept, one concept per name:

| Concept | Chosen term | Rejected alternatives | Why this term | Used where |
|---------|-------------|----------------------|---------------|------------|
| <What this is> | <Chosen> | <Alt1, Alt2> | <Rationale> | UI labels, API, docs, model |

---

## Temporal decisions

<Only include rows that apply — mark N/A for those that don't>

| Decision | Answer | Notes |
|----------|--------|-------|
| Intermediate action states | <States this object passes through> | <What each means> |
| Read model lag | <Yes/No — if yes, how long> | <How it's handled> |
| Relationship temporality | <Point-in-time / Live view> | <Why> |
| Deletion semantics | <Archive / Soft / Hard / Regulatory> | <What happens to related objects> |
| History / audit trail | <What's tracked> | <Who needs to see it> |
| Optimistic vs pessimistic | <Which approach per action> | <Why> |
| Concurrent edits | <Last write wins / Lock / Merge> | <How conflicts shown> |
| Expiration | <Does this expire?> | <What happens on expiry> |
| Scheduled actions | <Can users schedule future actions?> | <How managed> |

---

## OOUX audit

<Failure modes found, if any — or "No failure modes detected">

- **Shapeshifter:** <Same object, different forms — where?>
- **Masked:** <Different objects look identical — which?>
- **Broken:** <Object data/actions scattered — flag for interaction structure work>
- **Isolated:** <Objects without visible relationships — which missing?>

---

## Open questions

<Objects/decisions that need more work>

- [ ] <Object that needs refinement>
- [ ] <Decision deferred to engineering conversation>
- [ ] <Relationship unclear between X and Y>

---

## Next steps

- [ ] Validate provisional objects via <bet/prototype/research>
- [ ] Design interaction structure based on this model
- [ ] Engineering conversation on <open questions>
- [ ] Build UI (ui-agent) once model is stable

---

## Related artifacts

- **PRD:** `brief.md`
- **Research:** `findings.md`
- **Flows:** <Link to breadboard/flow diagrams>
- **Design system:** `context/design-system/`
