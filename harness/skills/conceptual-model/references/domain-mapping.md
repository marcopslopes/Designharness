# Domain mapping

Before deciding what the product should model, write down how the world
already works without it: the things people deal with, the words they use
for them, the steps they go through, and how it all connects. You're
describing, not designing. The result is the raw material
`conceptual-model` turns into objects.

---

## How this differs from conceptual modeling

`conceptual-model` decides which nouns the *product* will treat as
objects. Domain mapping happens one step earlier and stays loose: it notes
how the people in the domain talk today, inconsistencies and all, before
anyone makes a product call.

**Record contradictions; don't settle them.** When two groups use
different words for the same thing, or the same word for different
things, that disagreement is a finding. It shows where the product will
eventually have to pick one meaning, and that pick happens in
`conceptual-model`. If you notice yourself choosing the "right" term
during domain work, you've moved too early. Write both down and move on.

---

## What this step should answer

- Which concepts matter here, and how do they connect?
- What do people call them, and where do the names clash?
- Which groups use the same words in different ways? Those boundaries are
  the seams the product will run into.
- Which events and processes give the work its rhythm over time?

When the domain is familiar and nobody disputes its language, skip this
and go straight to `conceptual-model`.

---

## Ground rules

- **Name clashes are findings.** Note **synonyms** (one thing, several
  names) and **polysemy** (one name, several meanings depending on who's
  speaking). In a hardware store, a manager's "order" is a purchase order
  to a supplier; a trade customer's "order" is what they buy from the
  store. Log both meanings; don't merge them.
- **Describe the domain, not the app.** If the conversation turns to
  screens or feature names ("in the app this would be…"), steer back. Ask
  how things work today, with no product in the picture.
- **Sort nouns lightly.** Something is likely an object if people deal
  with many of them, each has its own details, and people care about it
  for its own sake (the object test from Sophia Prater's OOUX). Many nouns
  turn out to be values instead: "low stock", "out of stock", and "on
  order" aren't three objects, they're values of one attribute, stock
  status. Tag each noun *object / attribute / instance-or-value /
  unclear* and keep the unclear ones; `conceptual-model` makes the final
  call.
- **Label the source.** If the map reflects what the team assumes rather
  than what research showed, say so at the top and wherever it matters.
  An assumed model can differ a lot from how users actually see things.

---

## Techniques

Choose by the question in front of you. Most domains need only a concept
map and a terminology audit.

| Technique | Reach for it when |
|---|---|
| **Concept map** (Mermaid `graph TD`/`LR`) | Nobody can yet say how the pieces fit. Loose boxes and lines show connections without forcing a structure. |
| **Terminology audit** | Names are contested. For each concept, list every name, who uses it and when, and whether it's a synonym or polysemy case. Leave the conflict open. |
| **Bounded-context mapping** | Each group is consistent internally but differs from the others. Name each group and describe where its language changes. |
| **Noun harvest** | Always, as the hand-off. Every noun you heard, tagged object / attribute / instance-or-value / unclear. |
| **Domain event storming** (Alberto Brandolini) | The domain is a sequence of steps. Lay out what happens as past-tense events on a timeline, with what causes each and what it produces. Objects with many events around them will probably need state diagrams. |
| **Expert interviews** | The knowledge is in people's heads, not in documents. Interviews bring out unwritten rules and disputed terms. |
| **Document and artifact review** | The domain runs on paperwork: invoices, delivery notes, forms, reports. Their fields show the real structure and vocabulary. |
| **Competitive analysis** | Other products already serve this domain. Their models show how others carved it up and where they disagree. Use `competitor-scan` for the structured version. |
| **Shadowing** | People can't easily explain their workflow. Watching them shows what they really do. Use `research-agent` (contextual inquiry) for the structured version. |

### Terminology audit format

| Concept (informal) | Names used | Who uses which | Synonym or polysemy? | Notes |
|---|---|---|---|---|
| [what the concept is, in plain English] | [term A / term B / term C] | [team / users / which segment] | [same thing, different names / same name, different things] | [seam this reveals] |

### Domain event storming format

Timeline of past-tense events:

```
[Event 1] → [Event 2] → [Event 3] → ...
```

For each event, note what caused it, what it produced, and which objects
gather around it (each is a possible state diagram later).

### Noun harvest format

| Noun | Object / Attribute / Instance-or-value / Unclear | Reasoning |
|---|---|---|
| | | |

---

## Running it with the designer

1. Make sure you know which domain, who works in it, and what they're
   trying to get done, with no product involved yet. Ask only what the
   designer hasn't already told you.
2. Listen for nouns (possible objects), verbs (processes), and the words
   people really use, which often differ from the team's internal terms.
3. Pick the one or two techniques that fit what's unclear right now and
   run them: a concept map for unclear connections, a terminology audit
   for disputed words, event storming for step-heavy work. Don't run
   them all.
4. Keep only what's useful: the concept map if it helped, the name clashes
   and group boundaries, the key events, and the noun harvest. This is
   working material, not a polished document.

---

## What happens next

Hand the noun harvest to `conceptual-model` Step 1 (noun foraging and the
OOUX technique). There the tagged but undecided nouns become object
definitions, relationships, states, and a shared vocabulary.

---

## Output format

```markdown
## Domain map — [domain/segment] — YYYY-MM-DD

**Source:** [research / expert interview / designer's account / team belief — label which]

### Concept map (if used)
[Mermaid graph, or prose relationship list]

### Terminology audit
| Concept | Names used | Who uses which | Synonym or polysemy | Notes |
|---|---|---|---|---|

### Bounded contexts (if found)
- [Community A] calls it [X] / [Community B] calls it [Y] — seam: [why it matters]

### Domain events (if process-heavy)
[Timeline]

### Noun harvest
| Noun | Object / Attribute / Instance-or-value / Unclear | Reasoning |
|---|---|---|

### Open contradictions (deliberately unresolved)
- [Term/concept disagreement] — resolve in `conceptual-model`, not here
```

---

The structure of this mode was inspired by [Layers of Product Design](https://github.com/jamiemill/layers-skills) by Jamie Mill.
