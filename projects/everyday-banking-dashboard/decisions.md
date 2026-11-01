# Decisions — everyday-banking-dashboard

Append-only. Each entry is dated and states the decision plus its rationale. Check here before asking the designer something that may already be answered.

<!--
### YYYY-MM-DD — <decision>

**Rationale:** <why>
**Made by:** <designer / inferred by agent, and how>

### YYYY-MM-DD — ui-agent variant fork: <fork topic>

**Chosen:** <semantic label of winning variant>
**Rejected:**
- <semantic label> — <why not>
**Rationale:** <designer quote or summary>
**Artifacts:** `artifacts/<name>.html`
**Made by:** Designer, via `AskQuestion` variant-fork gate
-->

### 2026-11-01 — Why: balance and recent activity at a glance

**Rationale:** Picked over look-ahead (Chime) and coaching (Cleo). Both are parked in the brief.
**Made by:** Designer, via kickoff AskQuestion

### 2026-11-01 — Structure: single balance, quick actions, recent activity

**Chosen:** One big balance on top, 2–3 quick actions (Add money, Send, Card), the last 5 transactions grouped by day, See all.
**Rejected:**
- Swipeable account cards (current, savings) — multi-account is still an open question in the brief
**Made by:** Designer, via structure-step AskQuestion

### 2026-11-01 — Send list: people I've already sent money to

**Chosen:** Saved payees, so the next send is a pick, not a new setup.
**Rejected:**
- Anyone in my phone contacts, including someone I've never paid
- Only people already on this bank
**Rationale:** Designer pick. The home brief had left transfers out; this adds the list behind Send.
**Made by:** Designer, via kickoff AskQuestion

### 2026-11-01 — Send list structure: search, add, flat list

**Chosen:** Search, an Add a recipient row, then a flat list. Each row is the name and the account.
**Rejected:**
- Recent three, then everyone else A–Z, with no search
**Rationale:** Tapping a person does not open an amount screen. That stays out.
**Made by:** Designer, via structure-step AskQuestion

### 2026-11-01 — Login why: password only, the phone already knows you

**Chosen:** A returning customer enters a password. No email or username on this screen.
**Rejected:**
- PIN or face, like unlocking the phone
- Email or phone first, then the secret
**Rationale:** Designer pick. Started as its own project (`banking-login`) and moved here the same day: it is the same app.
**Made by:** Designer, via kickoff AskQuestion

### 2026-11-01 — Login structure: greeting with the name

**Chosen:** Greeting with the name, a password field, Forgot, and Log in.
**Rejected:**
- No name on the screen
**Rationale:** A correct password does not open the home yet. That stays out.
**Made by:** Designer, via structure-step AskQuestion

### 2026-11-01 — Login belongs to this project

**Chosen:** The login lives here, next to the home and the send list.
**Rejected:**
- A separate `banking-login` project
**Rationale:** Same app; one project page for all of it.
**Made by:** Designer, in the harness review chat
