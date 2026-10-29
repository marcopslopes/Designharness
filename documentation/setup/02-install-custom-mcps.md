---
label: Install custom MCPs
hint: Mobbin URL, NotebookLM via npx, ~/.cursor/mcp.json.
tint: mint
---
# 02 — How to install custom MCPs

Use this when the server is **not** a one-click Cursor Marketplace plugin —
you add it yourself via config (or **Add MCP** in Settings).

the company designer examples already in use:

| Name in config | Purpose | Transport |
|----------------|---------|-----------|
| `mobbin` | Competitor UI screens & flows | Remote URL |
| `notebooklm-mcp` | Ask NotebookLM notebooks from Agent | Local `npx` process |

Your machine’s live config lives at:

```text
~/.cursor/mcp.json
```

Example shape (illustrative — keep secrets out of git):

```json
{
  "mcpServers": {
    "mobbin": {
      "url": "https://api.mobbin.com/mcp"
    },
    "notebooklm-mcp": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@latest"]
    }
  }
}
```

---

## Two ways to add a custom server

### A. UI (preferred if available)

1. ⌘⇧P → **Cursor Settings: Tools & MCP**.
2. **+ Add MCP** (or **New MCP Server**).
3. Choose:
   - **URL** — remote MCP (Mobbin), or
   - **Command** — local stdio server (`npx …`).
4. Save → toggle **On** → **Authenticate** if prompted.
5. ⌘⇧P → **Developer: Reload Window**.
6. Open a **new** Agent chat and smoke-test.

### B. Edit `~/.cursor/mcp.json`

1. Quit Cursor (or at least plan a full reload).
2. Edit `~/.cursor/mcp.json` (create the file if missing).
3. Add an entry under `"mcpServers"`.
4. Validate JSON (no trailing commas).
5. Reopen Cursor → Tools & MCP → confirm the server appears → Authenticate.
6. New Agent chat → smoke-test.

**Do not commit** `~/.cursor/mcp.json` into this repo — it is personal / machine-local.

---

## Remote URL MCPs (e.g. Mobbin)

```json
"mobbin": {
  "url": "https://api.mobbin.com/mcp"
}
```

1. Add the URL as above.
2. In Tools & MCP, enable **mobbin**.
3. Run **Authenticate** (Mobbin account / Pro as required by Mobbin).
4. Smoke test:

```text
Using Mobbin, search iOS screens for "referral invite friends screen".
```

Full guide: [`Optional MCPs → Mobbin`](mcps/optional.md#mobbin).

---

## Local command MCPs (e.g. NotebookLM)

```json
"notebooklm-mcp": {
  "command": "npx",
  "args": ["-y", "notebooklm-mcp@latest"]
}
```

### Prerequisites

- **Node.js** + **npm** installed (`node -v`, `npm -v`).
- Network access so `npx` can download the package on first run.
- A Google account that can use [NotebookLM](https://notebooklm.google.com/).

### First-run auth (agent-assisted)

In Agent chat after the server is on:

```text
Using NotebookLM MCP: run get_health.
If authenticated is false, run setup_auth and walk me through the browser login.
Then list_notebooks.
```

Cookies persist after a successful `setup_auth`. If auth dies later, ask the
agent to run `re_auth` or `setup_auth` again.

Full guide: [`Optional MCPs → NotebookLM`](mcps/optional.md#notebooklm).

---

## Project vs user scope

| Scope | Typical location | Use when |
|-------|------------------|----------|
| **User (global)** | `~/.cursor/mcp.json` | You want Mobbin / NotebookLM in every project (recommended for designers) |
| **Project** | `.cursor/mcp.json` in a repo (if used) | Team-shared defaults — rare here; prefer user-level for personal research tools |

This lab’s **required** product MCPs (Figma, Slack, Atlassian, Miro) are
usually installed as **plugins**, not custom JSON — see
[`documentation/setup/mcp-setup.md`](mcp-setup.md).

---

## Desktop vs Cloud again

Custom entries in **Desktop** `~/.cursor/mcp.json` are **not** automatically
available to **Cursor Cloud** agents. For Cloud, add the same servers under
Cloud Integrations / MCP Servers (or document that research MCPs are
Desktop-only for now).

---

## Ask the agent to help install / fix

```text
I want to add the NotebookLM custom MCP on Desktop.
Check if notebooklm-mcp is already in my tool list.
If not, show the exact ~/.cursor/mcp.json snippet, then after I reload,
run get_health and setup_auth.
```

```text
Mobbin is in ~/.cursor/mcp.json as a URL server but Agent can't search screens.
Check Tools & MCP status, whether mcp_auth is needed, and give me click-steps.
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Server missing after edit | Invalid JSON; reload window; confirm name under Tools & MCP |
| `npx` server fails to start | Install Node; try `npx -y notebooklm-mcp@latest` in Terminal once |
| Auth loop | Complete browser login; allow cookies; retry `setup_auth` |
| Works for you, not teammate | They need their own `mcp.json` + their own OAuth — configs don’t travel via git |
| Agent ignores Mobbin | Say “use Mobbin MCP” explicitly; confirm Pro/auth |

---

## Related

- [01 — Setup an MCP in Cursor](01-setup-mcp-in-cursor.md)
- [Optional MCPs](mcps/optional.md) (Mobbin, NotebookLM, Datadog, Browser)
