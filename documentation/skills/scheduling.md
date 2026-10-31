# scheduling

<!-- generated-from-skill: do not edit -->

Standalone, on-demand meeting-scheduling capability — finds a slot, proposes it, and books only on explicit confirmation, **and** pulls real, sourced context (`projects/<slug>/`, a named ticket, the current conversation) into whatever gets drafted or booked, framed as things to cover rather than invented filler.

**Triggers:** "book a meeting with [name]" · "find time with [name] tomorrow afternoon" · "schedule a sync with [name]" · "when are we both free" · "propose a time for [meeting]"

<!-- /generated-from-skill -->

Coordinates research sessions - availability, calendar invites, reminders.

## What It Does

**Schedules research** by:
- Finding available slots
- Sending calendar invites
- Managing reminders
- Handling no-shows

**Logistics handled** - focus on research, not scheduling.

---

## When to Use

Use after recruiting:
```
"Schedule 6 usability test sessions"
"Coordinate interviews with participants"
"Set up research calendar"
```

---

## Example

```
You: "Schedule city leaderboard tests"

Input: 6 recruited participants + your availability

Output:
- Mon Aug 29, 10am: Participant 1
- Mon Aug 29, 2pm: Participant 2
- Tue Aug 30, 10am: Participant 3
- Tue Aug 30, 2pm: Participant 4
- Wed Aug 31, 10am: Participant 5
- Wed Aug 31, 2pm: Participant 6

Calendar invites sent
Zoom links created
Reminder emails scheduled (24hr before)
```

---

## Related Skills

- [screener-builder](screener-builder.md) - Recruits first
- [usability-test-guide](usability-test-guide.md) - What to do in sessions
