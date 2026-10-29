# research-agent

Deep cross-tool discovery - searches your docs tool, tracker, chat, Figma, and Miro for existing context. Works with Confluence, Notion, or Google Docs; Jira, Linear, or GitHub Issues; Slack or Teams.

## What It Does

**Searches your tools in parallel** to find:
- Docs pages (PRDs, research summaries, decisions)
- Tickets (past work, bugs, roadmap)
- Chat threads (discussions, decisions)
- Figma files (designs, explorations)
- Miro boards (workshops, research)

**Returns structured findings** - not a dump of raw results.

---

## When to Use

Use `research-agent` when you need to:
- Find existing context on a topic
- See what's been tried before
- Understand constraints and decisions
- Avoid reinventing what already exists

### Trigger Phrases
```
"Research [topic]"
"What exists on [feature]?"
"Find context for [topic]"
"Search for [topic]"
```

---

## How It Works

### Step 1: Parallel Search
Queries every connected tool simultaneously:

**Docs (Confluence, Notion, Google Docs):**
- Searches page titles and bodies
- Reads full pages, not snippets
- Writes the draft page at the end

**Tracker (Jira, Linear, GitHub Issues):**
- Topic search, e.g. JQL `text ~ "referrals"`, a Linear text filter, or GitHub `"referrals" is:issue`
- Finds tickets, epics, bugs
- Checks status, assignee, comments

**Chat (Slack, Teams):**
- Searches configured channels (#product, #design, etc.)
- Finds threads, key messages
- Pulls decisions and context

**Figma:**
- Searches file names and descriptions
- Finds frames matching topic
- Pulls screenshots (if requested)

**Miro:**
- Searches board names and content
- Finds workshops, diagrams
- Summarizes key frames

### Step 2: Deduplication
Removes duplicates:
- Same ticket mentioned in chat
- Figma file already linked in a ticket
- Miro workshop about same topic

### Step 3: Synthesis
Organizes by:
- Recency (newest first)
- Relevance (exact match > partial match)
- Status (active > closed)

### Step 4: Structured Output
Returns findings:
```
## Tracker Results (4 tickets)
- PROJ-567: Referral MVP [Closed, 2025-12]
- PROJ-234: Growth roadmap [Active, mentions referrals]
- PROJ-890: Referral bug [Open, needs triage]
- PROJ-111: Incentive models [Closed, legal blocked]

## Chat Results (3 threads)
- #growth: "Referral drop-off at 60%" [2026-01-15]
- #product: PM approved referral v2 [2026-03-10]
- #design: "Entry points too hidden" [2025-11-20]

## Figma Results (2 files)
- Referral Entry Points exploration [Updated 2025-10]
- Growth Initiatives deck [Page 12: referrals]

## Miro Results (1 board)
- Workshop: Referral incentive models [2025-11-05]
```

---

## Use Cases

### Use Case 1: Starting New Work
```
You: "Research city leaderboard"

research-agent:
- Tracker: No tickets mentioning "city leaderboard"
- Docs: No pages found
- Chat: 1 thread in #product (feature request, 2025-06)
- Figma: No files found
- Miro: No boards found

Conclusion: Net-new feature, minimal prior context
```

### Use Case 2: Revisiting Old Work
```
You: "Research referrals"

research-agent:
- Tracker: 4 tickets (1 closed project, 2 bugs, 1 roadmap)
- Docs: 1 PRD (v1, 2025)
- Chat: 5 threads (PM approved v2, known drop-off)
- Figma: 2 explorations (not approved)
- Miro: 1 workshop (incentive models)

Conclusion: Existing context, abandoned MVP, ready for v2
```

### Use Case 3: Bug Context
```
You: "Research checkout errors"

research-agent:
- Tracker: 8 bugs (3 open, 5 closed)
- Chat: #support mentions errors (daily)
- Figma: Checkout flow last updated 2024-08
- Miro: No boards

Conclusion: Known issue cluster, needs investigation
```

---

## What You Get

### Findings File
Saved to `projects/<slug>/findings.md`:
```
# Research Findings: Referrals

Searched: 2026-08-27 14:45

## Summary
Existing referral flow has known drop-off. Prior MVP abandoned.
PM approved v2 in Q1 2026. No approved designs for v2 yet.

## Docs
[1 page found]
...

## Tickets
[4 tickets found]
...

## Chat
[3 threads found]
...

## Figma
[2 files found]
...

## Miro
[1 board found]
...

## Gaps
- No approved comp for v2
- No clear success metrics defined
- Unknown: platform priority (iOS vs web)

## Recommended Next Steps
1. Sync with PM on success criteria
2. Review old bugs before redesigning
3. Start with entry point exploration
```

---

## Chains With

`research-agent` is used by:
- **`design-kickoff`** (Step 2 - deep discovery)
- **`competitor-scan`** (as needed for context)
- **`manager-1on1-prep`** (to gather context on projects)

You can also call it standalone anytime.

---

## Search Scope

### Default Scope (Configurable)
**Docs:**
- Spaces, teamspaces, or folders your account can read

**Tracker:**
- All design boards
- All product boards

**Chat:**
- #product
- #design
- #growth
- #eng (if relevant to design)

**Figma:**
- Your organization
- Design team workspace

**Miro:**
- Design team boards

### Narrowing Scope
```
"Research referrals (chat only)"
"Research checkout (tickets + Figma only)"
```

---

## Freshness

All queries are **live** - not cached:
- Docs: Current page versions
- Tracker: Current state of tickets
- Chat: Recent threads (API limit: last 90 days by default)
- Figma: Current file state
- Miro: Current board state

**Always shows query timestamp** for freshness verification.

---

## Common Patterns

### Pattern 1: Before Building
```
"Research [topic]" →
  review findings →
  decide to build, iterate, or pause
```

### Pattern 2: Deep Dive on Known Issue
```
"Research [bug cluster]" →
  understand scope →
  prioritize fixes
```

### Pattern 3: Stakeholder Prep
```
"Research [feature]" →
  synthesize for deck →
  present with evidence
```

---

## Tips

### 1. Use Specific Terms
❌ Vague: "Research payments"  
✅ Specific: "Research wallet integration errors"

More specific = better results.

### 2. Check Gaps Section
`research-agent` explicitly calls out:
- What wasn't found
- What's unclear
- What needs follow-up

### 3. Combine With Workload
```
"Research referrals" (what exists) +
"Who's working on referrals?" (who's on it)
= Full context
```

### 4. Request Figma Screenshots
```
"Research referrals (include Figma screenshots)"
```
Gets visual previews, not just file names.

---

## Limitations

### Won't Do:
- ❌ Search beyond configured scope
- ❌ Read every chat thread (only summaries)
- ❌ Invent context that doesn't exist
- ❌ Make decisions for you

### Will Do:
- ✅ Search all 4 tools in parallel
- ✅ Deduplicate cross-references
- ✅ Flag gaps in knowledge
- ✅ Structure findings for decision-making

---

## Privacy & Security

### What Gets Accessed:
- ✅ Docs pages and tickets your account can see
- ✅ Chat channels you have access to
- ✅ Figma files in your org
- ✅ Miro boards in your team

### What Doesn't:
- ❌ Private DMs (not searchable via MCP)
- ❌ Restricted projects or spaces
- ❌ Figma files outside your org

**research-agent respects your existing permissions** - won't surface anything you can't already see.

---

## Troubleshooting

### "No results found"
**Possible reasons:**
1. Truly net-new topic (nothing exists)
2. Search terms too specific
3. Content in tools not searchable (e.g., old chat threads)

**Try:**
- Broader search terms
- Different phrasing
- Manual tool checks

### "Too many results"
**Problem:** Broad topic returns overwhelming results

**Fix:**
- Narrow scope: "Research referrals (iOS only)"
- Focus tool: "Research referrals (tickets only)"
- Be more specific: "Research referral entry points"

### "Missing a ticket I know exists"
**Problem:** Search might miss edge cases

**Check:**
- Is ticket in configured boards?
- Does ticket mention search term?
- Is ticket status searchable?

---

## Related Skills

- [design-kickoff](design-kickoff.md) - Uses research-agent in Step 2
- [workload-agent](workload-agent.md) - Who's working on found context
- [competitor-scan](competitor-scan.md) - External research

---

## Related Guides

- [MCP Setup](../setup/mcp-setup.md) - Connect your docs tool, tracker, chat, Figma, and Miro
- [Understanding Skills](../guides/understanding-skills.md)
