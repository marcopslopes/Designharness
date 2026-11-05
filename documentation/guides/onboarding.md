# First-Time Onboarding Guide

Complete walkthrough of your first time using the harness.

## What to Expect

**Onboarding takes a few minutes** and runs once per clone. It:
1. Asks which work tools your team uses, and checks only those
2. Asks 1 question about your role
3. Offers to import your design system and company context (up to 6 questions)
4. Shows your live queue, if a tracker is connected
5. You're ready to use the harness

---

## Before You Start

✅ **Clone the harness and open the folder in your agent**
- See [Installation Guide](../../INSTALL.md)

✅ **Connect the tools you use (optional)**
- See [MCP Setup Guide](../setup/mcp-setup.md)
- Docs, tracker, chat, Figma, Miro: connect only what your team uses
- No tools at all is fine; pick **None of these** when asked

---

## Step-by-Step Walkthrough

### Step 1: Open Agent Chat

1. Open Cursor
2. Press `Cmd+L` (Mac) or `Ctrl+L` (Windows)
3. Switch to **Agent mode** (if not already)

### Step 2: Start Onboarding

Type anything simple:
```
hi
```
or
```
help me get set up
```

### Step 3: Meet Muse

The agent introduces itself as **Muse**:

> **I'm Muse — welcome to Design Harness.**
>
> A few things I can actually do:
> - Kick off new projects with real research behind them
> - Build screens from the company's real design system
> - Catch design-system or accessibility issues before you share something
> - Ask me to schedule a meeting — I'll pull in real context
>
> I'll check which of your team's tools are connected, then ask questions to set up your harness.

### Step 4: MCP Check

Muse asks which tools your team uses, then checks only those. For example:

```
✅ Notion - Connected
✅ Linear - Connected
✅ Slack - Connected  
✅ Figma - Connected
```

**If any show ❌:**
1. Go to Cursor → Settings → MCP
2. Connect the missing one
3. Reply: `ready`

**No tools?** Pick **None of these**. Every skill falls back to what you
paste, the repo, and the web.

### Step 5: Role Question (Clickable Buttons)

One question appears as **clickable buttons**:

**"What's your primary role focus?"**
- Product design
- Content design
- Accessibility
- Research
- Manager
- Mix
- Not sure yet

Click your answer!

**If you picked Manager:** One follow-up asks who you oversee (pre-filled from company data if available).

### Step 6: Harness Setup (Auto-Runs)

Muse automatically asks **6 customization questions**:

#### Question 1: Design Tokens
> "Do you have design tokens?"

**Yes:** Paste path to your tokens file (CSS/JSON/JS)  
**No:** Uses Design Harness kit defaults (teal + plum)

#### Question 2: Brand Voice
> "Do you have brand voice guidelines?"

**Yes:** Paste path to your brand doc  
**No:** Uses Northline example

#### Question 3: User Personas
> "Do you have user personas?"

**Yes:** Paste path  
**No:** Uses defaults

#### Question 4: UX Patterns
> "Do you have documented UX patterns?"

**Yes:** Paste path  
**No:** Uses standard patterns

#### Question 5: Company Context
> "Do you have company/product context docs?"

**Yes:** Paste path  
**No:** Uses Northline example

#### Question 6: Vocabulary
> "Do you have a terminology guide?"

**Yes:** Paste path  
**No:** Uses generic terms

**Result:**
```
✓ Harness customized!

Your setup:
- Design tokens: YOUR tokens ✓
- Brand voice: Default
- User personas: YOUR personas ✓
- UX patterns: Default
- Company context: YOUR context ✓
- Vocabulary: Default
```

### Step 7: Your Workload Snapshot

Muse shows your **live queue** from the tracker:

```
Your design queue (live from Linear):
- [PROJ-123] City leaderboard design
- [PROJ-456] Referral flow improvements
- [PROJ-789] Settings redesign
```

### Step 8: Handoff

```
✓ Your profile is saved.

You're working on [PROJ-123] (city leaderboard).

What would you like to do?
[Build something] [Check a design] [Start research] [Other...]
```

**If your opening was vague:** You get clickable next-step options.  
**If specific:** Muse starts immediately.

---

## What Was Created

After onboarding, these files exist **on your machine only** (gitignored):

```
design-harness/
├── designer-profile.local.md     ← Your profile
└── context/org-pack.local/       ← Your company content (only if you imported any)
    ├── COMPANY-BUSINESS.md
    ├── COMPANY-VOICE.md
    ├── COMPANY-ARCHETYPES.md
    ├── COMPANY-PATTERNS.md
    ├── COMPANY-SQUADS.md
    └── COMPANY-SOURCES.md
```

**These never get pushed to GitHub** - they stay private.

---

## First Commands to Try

Now that you're set up:

### Check Your Workload
```
What's on my roadmap?
```
→ Live tracker snapshot from workload-agent

### Build a Screen
```
Build a city leaderboard screen
```
→ Builds using YOUR tokens (or defaults)

### Start Research
```
Kick off discovery on referral improvements
```
→ Runs full research + PRD draft

### Check a Design
```
Check this prototype before I share it
```
→ Runs quality audit

---

## Working Well

### Spend less on each request
- Plan with a stronger model, then switch to a smaller, cheaper one to build or make edits.
- Ask simple questions plainly ("how do I…", "what does X mean"). They are answered without loading skills or searching files.
- Kickoff uses your own projects only. Say "find references first" when you want Mobbin, notebooks and team docs searched.
- Start a new chat when a task changes. A long chat costs more on every turn.

### Get closer to the design system: Figma first
When a prototype keeps coming out off-system (wrong spacing, colours or components), do it in two steps:
1. "Design this screen in Figma with our library" (with a Figma file link). The agent builds it from the library's components.
2. Fix it in Figma until it looks right, then "build this Figma frame as a prototype" (with the frame link).

The prototype then starts from components that are already right, instead of guessing them.

### Ask what the agent can see
"Which sources can you see?" lists the connected tools and the company context in use. It costs almost nothing, so ask it whenever you're unsure.

### Where your work is
After a build, the reply gives the local link (`http://localhost:3002/#/…`) and the folder it saved to. "Saved on your computer, not shared yet" means only you have it. Say "give me a link" when someone else needs to open it.

---

## Updating Your Profile Later

Want to change your setup?

```
Update my profile
```
or
```
Re-run harness setup
```

Muse will let you update any field.

---

## Troubleshooting

### Onboarding Ran Again in New Chat
**This shouldn't happen.** If `designer-profile.local.md` exists, onboarding should skip.

If it keeps running:
1. Run `npm run -s harness:context`. The first line says `Profile: found` or `Profile: missing`, and the exact path it checked
2. The file must be at the repo root, next to `AGENTS.md`. A copy under `harness/` does not count
3. Check it's not empty and has `Status: ACTIVE`

### Can't Connect MCPs
See [MCP Setup Troubleshooting](../setup/mcp-setup.md#troubleshooting)

### Question Buttons Don't Appear
If you see numbered text instead of buttons:
- This is a known Cursor issue in some sessions
- Type your answer as plain text instead
- The harness still works

### Skipped Onboarding, Want to Run It
Delete `designer-profile.local.md` and start a new chat.

---

## FAQ

### Why did onboarding only ask me one thing?
On purpose. Name comes from your connected tools, and platform, squad, and
working style are asked the first time a task needs them. Say "set up my
full profile now" to answer everything at once.

### How do I fill in a field it skipped?
Say "update my profile". It edits the file in place.

### I'm a manager. Why wasn't I asked about a squad?
Managers are asked who they oversee instead, stored as `Reports:`. That
unlocks `manager-1on1-prep`, `people-coaching`, and a team view in
`workload-agent`.

### My squad was filled in without me picking it.
Your name matched one entry in `COMPANY-SQUADS.md`. If it's wrong, say
"that's not my squad" and it corrects in place.

---

## Related Guides

- [How the harness works](how-the-harness-works.md)
- [MCP Setup](../setup/mcp-setup.md)
- [Understanding Skills](understanding-skills.md)
- [Design System Usage](design-system-usage.md)
