---
label: Atlassian
hint: Jira + Confluence — powers workload and briefs when your team uses Jira.
order: 3
tint: blue
---
# Atlassian MCP (Jira + Confluence)

**Type:** Cursor plugin (`plugin-atlassian-atlassian`)  
**Onboarding:** Checked only if your team uses it  
**Cloud:** your company's Atlassian (`your-org.atlassian.net`)

---

## What it’s for

Read and update **Jira** (your design queue, comments, transitions) and
**Confluence** (PRDs, research pages) from Agent chat — the backbone of
workload snapshot, research, and kickoff.

---

## Install

1. Settings → **Plugins** → install **Atlassian**.
2. Tools & MCP → enable → **Authenticate** with your work Atlassian account.
3. Reload → new Agent chat.

Verify: “What’s assigned to me in CORE?” or `atlassianUserInfo`.

---

## How to use

### Example prompts

```text
List my open design issues with status and next action.
```

```text
Summarize https://your-org.atlassian.net/browse/CORE-142 for a design research brief.
```

```text
Search Confluence for "checkout" and list 3 relevant pages with links.
```

```text
Draft a Confluence outline for a referrals journey brief (don't publish until I say so).
```

---

## Designer use cases

| Use case | Why |
|----------|-----|
| Onboarding / workload | Live Jira snapshot into profile |
| Research | Pull PRD + linked docs |
| Kickoff | Ticket context → brief |
| Updates | Comments without opening Jira UI |

---

## Useful tools (names)

`atlassianUserInfo`, `getJiraIssue`, `searchJiraIssuesUsingJql`,
`addCommentToJiraIssue`, `getConfluencePage`, `searchConfluenceUsingCql`,
`createConfluencePage`, `search`, …

---

## Cloud ID reference

| Item | Value |
|------|-------|
| Cloud ID | *(your own — find via the Atlassian MCP's `getAccessibleAtlassianResources`)* |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Empty queue | Wrong Atlassian site / account |
| Can’t create pages | Need Confluence write on the space |
| Jira 404 | Confirm the project key (e.g. CORE) and your access |

---

## Related

- [01 — Setup](../01-setup-mcp-in-cursor.md)
- [`documentation/setup/mcp-setup.md`](../mcp-setup.md)
- [`documentation/guides/onboarding.md`](../../guides/onboarding.md)
