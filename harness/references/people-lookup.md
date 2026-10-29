# Direct team and people lookup — no skill chain

The full text of `harness/ORCHESTRATOR.md` §2c. The orchestrator keeps a short version and sends you here when this applies, so it isn't loaded in every chat.

**The gap this closes:** before this, a designer asking "who's on my
team," "who should I talk to about the checkout work," or "who owns
<a squad>" matched no row above — it either fell through to a
generic response or didn't get answered from real data at all. This is a
**lookup, not a skill chain** — no plan-gate (§3 only applies to
**more than one** skill; this is zero skills, just a direct read), no
`design-kickoff`, no `research-agent` sweep. Answer in the same turn,
directly.

**Trigger phrases** (not exhaustive — match the intent, not the exact
words): "who's on my team," "who is on [squad/domain]," "who works on
[topic]," "who should I talk to about [topic]," "who should I reach out
to about [topic]," "what team owns [X]," "who owns [X]."

**Sources, in this order — profile first, squads file second:**

1. **"What's my team" / "who's on my team"** — read `designer-profile.local.md`
   first, never re-derive from `COMPANY-SQUADS.md` if the profile already
   has the answer:
   - **`Reports:` set (manager)** → list them directly. No lookup needed
     — the profile already *is* the answer.
   - **`Squad assignment` set (IC)** → look up that squad in
     `COMPANY-SQUADS.md`'s squad tables: name the squad, its
     domain, the **Product designer** cell if it's a clean name (not a
     placeholder or an informal note — same "clean match" standard
     `designer-onboarding/SKILL.md` § Silent squad resolve already
     uses), and any PM/EM named in that squad's **Notes** column.
   - **Squad/Reports unset (deferred)** — this is a legitimate trigger
     to resolve the deferred field **now, in context**, exactly per
     `designer-onboarding/SKILL.md` § Deferred and opt-in fields (a
     downstream need hit genuine ambiguity it can't infer around) — not
     a new mechanism, just recognizing this question as a valid firing
     condition for that existing rule. **The ask itself is still a
     fixed-choice question** (a finite squad list) — use the same
     domain → squad `AskQuestion` picker already scripted in
     `designer-onboarding/references/onboarding-questions.md` §§2a–2b,
     not ad-hoc chat prose, per the repo-wide `AskQuestion` mandate
     (`harness/references/ask-question-ui.md`). If `AskQuestion` is
     genuinely absent from the session (rare), say so in one line and
     ask in plain text as a single open question — never a
     numbered/bulleted list — same carve-out this repo already applies
     everywhere else `AskQuestion` might be missing. Ask once, write the
     answer back to the profile, then answer from it.
2. **"Who should I talk to about [topic]" / "what team owns [X]"** —
   search `COMPANY-SQUADS.md` for the squad or domain that owns
   the topic, using the mappings the file already has: squad names and
   nicknames, the **Streams** table (topics that map to a squad without
   being one), and `§ Squad → roadmap boards` if the designer names a
   roadmap board or tracker key instead of a topic. Report the matched squad's PD
   (if a clean name) and PM/EM (if named in Notes).

**Honesty rule — consistent with everything else in this file, not a new
standard invented here:** if a squad has **no named PD** (the cell is
`—`, a `*(name)*` placeholder, or an informal note) or the source only
has **domain-level** names with no per-squad roster,
**say so plainly** rather than guessing or picking the closest name.
Point to the **PM or EM instead if those are known**, since the
directory's gap is specifically on the design-roster side, not
necessarily on the PM/EM side. If the file names neither a squad-level
nor domain-level contact, say that plainly too — an honest "I don't have
a name for that in `COMPANY-SQUADS.md`" beats inventing one.

**What this does not do:**

- **Never drafts or sends a message on the designer's behalf.** This
  answers "who," never "should I contact them for you" — that's a
  separate, deliberately out-of-scope proactive-habit idea (surfacing a
  cross-squad dependency unprompted and offering outreach) that needs
  its own opt-in guardrails designed before it's built. This section is
  the direct-question case only.
- **Never triggers `design-kickoff`, `research-agent`, or a plan-gate.**
  If the designer's actual ask turns out to be bigger than a "who"
  question once you're in the conversation (e.g. they follow up with
  "okay, kick off a project with them"), that's a **new** intent — match
  it against the routing table above from scratch, don't silently fold
  it into this lookup.
- **Never edits `COMPANY-SQUADS.md`.** This section is about how
  the file gets *read*, not what's in it — widening real PD/PM/EM
  coverage is the file's own § Refresh protocol, a data-sync job, not
  something this lookup does on the fly.
