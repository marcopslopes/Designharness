# A client list that shows who needs a call today

*Draft — needs your edit pass before publishing.*

In a flat client list, a client last contacted nine months ago looks the same as one contacted two days ago. This example project starts from that assumption: a bank's relationship managers can see who their clients are, but not who needs them.

## The problem

Two groups get lost in an alphabetical list. Long-standing clients who have gone quiet, and new clients who are still settling in. Both are the people most worth a call, and both sit among everyone else with nothing to mark them out.

That problem is assumed, not observed. The project hasn't had a kickoff, no one has talked to a relationship manager, and nothing records why this matters now.

## Evidence

There isn't any yet. The project's findings are build and audit notes. They cover a removed dead link, a new empty state, and a passing audit. None of them say anything about how managers work. Everything below is a design direction waiting for research.

## Options considered

The first version wasn't a bank at all. It was a booking app's client list, with VIP, New and Inactive segments. The designer asked to move it toward banking, and it became a relationship manager's client book. The segments became Premium, New and Dormant, where dormant means no contact in six months or more. Rows now show the products each client holds and when someone last spoke to them. The prototype also got its own navigation: Home, Clients, Pipeline and Inbox.

The row layout was compared three ways, side by side: every client in one card with hairline dividers, rows straight on the page, and a separate card per client. The single card won and the main screen uses it. Why it won isn't written down, so that reasoning still needs adding.

On the phone, separate Import and Add buttons were replaced by one floating assistant button. What the assistant does hasn't been designed.

## The decision

The prototype commits to one Clients list on desktop and phone. It has Premium, New and Dormant tabs with a count on each, rows in a single card, and a tip that points the manager at dormant clients and suggests a short check-in. Both versions read from the same data file, so they show the same clients.

The goal behind it is in the brief: make dormant and new clients visible and easy to contact, so relationships don't go cold. Whether segments and a tip achieve that is open. It could work if managers act on the tip, or it could become one more banner they learn to ignore. Nothing tested so far tells the two apart.

## Outcome

Nothing has shipped and nothing has been measured. The desktop list, the phone list, three states (no clients yet, no matches, dormant) and the layout comparison are built, and the project audit passed on 10 October 2026 with no blocking issues. The brief sets no success measure, so even a test wouldn't yet have a number to beat.

## What's next

The brief lists five open questions, and they are the agenda for a kickoff:

- How do clients land in Premium — by balance, by products held, or set by the bank?
- Is six months right for every client, or should "dormant" follow each client's usual contact rhythm?
- What does "a short check-in" open — a secure message, an email, or a call booking?
- Does a new manager with no clients reach this screen, or are clients assigned first?
- Which clients would find a check-in intrusive rather than helpful?

The last one carries the most risk. A nudge that feels caring to one client can feel like a sales call to another, and the design has no answer for that yet.

---
**Sources used:** `projects/clients-list-redesign/case-study.md`, built from `brief.md`, `findings.md` (2026-10-09, 2026-10-10), `decisions.md` (2026-10-10), `log.md` (2026-10-10), `about.md`. Sample contact times (nine months, two days) come from the prototype's client data.
**Anti-slop pass:** run against `references/slop-patterns.md` and `harness/references/anti-ai-writing.md`.
**Still needs:** why the single-card layout won; a named designer and voice (written neutral because the project has no owner); the "carries the most risk" call in What's next is an editorial judgment, not from the brief, so keep it or cut it.
