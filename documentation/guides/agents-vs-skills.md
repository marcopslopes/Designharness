# Agents vs skills — what each word means here

**Skills are the only unit of work.** A skill is `harness/skills/<name>/SKILL.md`:
triggers, steps, an output format, and where it writes. `harness/ORCHESTRATOR.md`
§2 matches your request to a skill, and the one AI in the chat loads and follows it.
Your preferences (`designer-context.local/preferences.md`) shape how each kind of
work comes out.

**There are no agent role files.** Earlier versions grouped skills under five
roles (researcher, product designer, content designer, craft reviewer, design
ops). Nothing loaded them, so they were retired on 1 November 2026.

**Subagents are used only where a clean context helps.** A critique can run in
separate subagents so the reviewer didn't write the design
(`harness/references/critique-isolation.md`). That is a deliberate choice inside
a skill, not a cast of characters.

You never pick an agent. You say what you want, and the orchestrator picks the skill.

## Related

| File | Role |
|------|------|
| [How the harness works](how-the-harness-works.md) | Architecture, routing, and the request flow end to end |
| [Understanding skills](understanding-skills.md) | What a skill is and how skills chain |
| `harness/ORCHESTRATOR.md` §2 | The routing table skills are matched against |
