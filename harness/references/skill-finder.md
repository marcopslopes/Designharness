# Skill finder — direct answer, no skill chain

The full text for the skill-finder row in `harness/ORCHESTRATOR.md` §2. Read
it before answering "what can you do" or "is there a skill for X".

**The gap this closes:** the harness has dozens of skills, routed by plain
words. Nothing answered "what can you do?" or "is there a skill for X?". The
ask fell through to a fallback, or got a long list of skill names the
designer can't use. This is a **lookup, not a skill chain**, the same shape
as the people lookup (`harness/references/people-lookup.md`): no plan gate,
no `design-kickoff`, no `research-agent` sweep. Answer in the same turn.

**Trigger phrases** are in the Skill finder row of `harness/ORCHESTRATOR.md`
§2. Match the intent, not the exact words: X is a kind of work, not the work
itself.

**Not this lookup:**

- The ask carries the work. "Can you help me write a screener for the
  payouts study" or "can you help with this Figma link" is a request.
  Route it to the matching row and run it. Do not describe the skill.
- "Where should I focus" or "what's the bottleneck" is `diagnostic`.
- "Which research method should I use for X" is the Research method row in
  `routes.md`.
- "What's in the harness" from a maintainer, or "audit the harness", is
  `harness-audit`.

## Sources, in this order

1. **The routing phrases.** Grep the designer's words (and close synonyms)
   in `harness/ORCHESTRATOR.md` §2 and `harness/references/routes.md`. The
   Intent column is written in designer language, so it is the best place
   to find the 1–3 candidates.
2. **The candidates' descriptions.** For each candidate, read only the
   front matter of `harness/skills/<name>/SKILL.md`: the `description`, its
   first sentence, and its "Triggers on" phrases. Do not read the body. Do
   not open every skill file. Skip any skill whose description says "Do not
   route here".

The in-app page `#/skills/assistant` runs the same match on the same files:
words from the question, scored against each skill's name, description,
and trigger phrases.

## "Is there a skill for X" — answer shape

One to three matches, best first. For each:

- **What it does**, one plain sentence, from the description's first
  sentence. Rewrite jargon.
- **What to say**, one example sentence the designer could type, taken from
  a trigger phrase and filled in for their X.

Name the skill in plain words ("the usability test guide"), never as an id
or a command to type. Then stop. Do not run the skill unless they ask.

Example:

> Yes. The usability test guide plans a test session: tasks, questions, and
> what to measure. Try saying "help me plan a usability test for the
> payouts prototype". If you need people for it first, the screener builder
> writes the recruitment survey. Try "write me a screener for this study".

## "What can you do" with no X — answer shape

About eight lines, grouped by job. Never the whole roster. One example sentence per
line, in plain words:

> I can help with most of a design project. Ask in your own words, for
> example:
>
> - **Start an idea:** "Let's start a project on payouts." I gather what's known and draft a brief.
> - **Research:** "What do we already know about invites?" or "Write me a screener for this study."
> - **Make screens:** "Build the settings screen." or "Mock up three directions so I can pick one."
> - **Critique:** "Any thoughts on this Figma?" or "Is this ready to share?"
> - **Share and hand off:** "Write the spec for engineers." or "Build a deck for this."
> - **Team:** "What's my team working on?" or "Who owns checkout?"
>
> Ask "is there a skill for X" to find something specific.

Keep the six groups. Swap an example only for one that matches a real
trigger phrase in §2 or `routes.md`.

## If nothing fits

Say so plainly: "There's no skill for that." Then name the closest one in
the same shape (what it does, what to say) and say what it does not cover.
If nothing is close, say that too. Never invent a skill, and never stretch
one to fit. Log it in `harness/logs/routing-log.md` so a missing skill shows
up in `harness-audit`:

`<date> | is there a skill for <X> | FALLBACK | closest=<name> (skill finder, no fit) | answered | Task: —`

## What this does not do

- **Never runs the skill it names.** If the designer then says "yes, do
  that", it's a new intent. Match it against §2 from scratch.
- **Never lists every skill.** The full list is the Skills page in Design
  Harness (`#/skills`).
- **Never shows ids or commands as the thing to type.** The designer types
  plain words. The router does the rest.
