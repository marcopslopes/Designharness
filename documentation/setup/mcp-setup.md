# MCP Setup Guide

**Model Context Protocol (MCP)** connections let the harness access your external tools.

## Connect the tools your team already uses

Skills ask for a **job**, not a brand. Connect whichever tool fills each job
for your team — you don't need all of them, and you never need two for the
same job.

| Job | Pick one | Used for |
|-----|----------|----------|
| **Docs** | Confluence, Notion, or Google Docs | Reading PRDs and research pages, writing briefs |
| **Tracker** | Jira, Linear, or GitHub Issues | Your queue, finding existing work, filing tickets |
| **Roadmap** | Jira Product Discovery, Linear projects, a Notion database, or GitHub Projects | What's planned before it becomes tickets |
| **Chat** | Slack or Microsoft Teams | Team discussions behind decisions, feedback scans |
| **Design** | Figma | Design files, design-to-code |
| **Boards** | Miro | Workshop boards |

During onboarding the harness asks which tools your team uses, checks only
those, and saves the answer to your profile:

```
- Work tools: docs=notion, tracker=linear, roadmap=linear, chat=slack
```

How each skill uses each tool: [`harness/references/work-tools.md`](../../harness/references/work-tools.md).

## Optional MCPs

These enhance specific skills but aren't required:

| MCP | Enhances | Setup |
|-----|----------|-------|
| **Calendar** (Google/Outlook) | `/scheduling` skill | Only checked when scheduling meetings |
| **Mobbin** | `/competitor-scan` skill | Falls back to web search if not connected |

---

## Step-by-Step: Cursor Setup

### 1. Open MCP Settings
- **Mac:** Cursor → Settings → MCP
- **Windows:** File → Preferences → MCP

### 2. Connect each tool you picked
For example, **Atlassian** (Jira + Confluence), **Notion**, or **Linear**:
1. Toggle the server ON
2. Click "Authenticate"
3. Sign in with your **work** account (not personal Gmail unless that's your work account)
4. Grant permissions
5. Verify shows "Connected" (not "Needs auth")

Repeat for the rest of your tools.

### 3. Verify Connections
In agent chat, try:
```
What's assigned to me?
```

If it lists your open tickets, the tracker is connected. ✅

---

## Troubleshooting

### "Needs auth" keeps appearing
1. Click through the authentication flow again
2. Make sure you're using the same account in Cursor and the service
3. Check browser cookies/session isn't blocking auth

### "Can't access [service]"
- Make sure your work account has access to that service
- Contact IT/admin if you need permissions
- You can still use the harness with limited functionality

### Onboarding won't continue
Onboarding waits until **the tools you selected** are connected. Pick
"None" to continue without any, or type `skip onboarding` to opt out
(features will be limited).

---

## What each job enables

Without a tool for a job, skills fall back instead of breaking:

| Missing job | What happens |
|-------------|--------------|
| Docs | Briefs and research drafts are written as Markdown in the project folder |
| Tracker | No live queue or workload snapshot; tickets are drafted for you to paste |
| Roadmap | The roadmap step is skipped, and the skill says so |
| Chat | Research misses team discussions; you can paste threads instead |
| Figma | Can't open Figma links from research/docs |
| Miro | Can't read workshop boards from research |

---

## Privacy & Security

- **Nothing is written without your go** - The harness reads your data and only creates pages or tickets after you confirm
- **No data stored** - Queries are live, nothing cached
- **Private content filtered** - Research skills filter sensitive chat content automatically
- **Your machine only** - MCP connections are local to your Cursor installation

---

## Related Guides

- [First-Time Onboarding](../guides/onboarding.md)
- [Workload Agent](../skills/workload-agent.md)
- [Research Agent](../skills/research-agent.md)
