---
label: Setup an MCP in Cursor
hint: Install, auth, Desktop vs Cloud, ask the agent to fix.
tint: sky
---
# 01 — How to set up an MCP in Cursor

One-time-per-machine guide: install → configure → authenticate → verify in
**Agent** chat. Includes the failure modes we hit often (especially **Desktop
vs Cloud**) and copy-paste prompts to ask the agent to diagnose and fix.

---

## What an MCP is (30 seconds)

An **MCP server** lets the Cursor agent call an external product (Figma,
Slack, Datadog, …) with structured tools — not just “guess from the web.”

Two install paths:

| Path | Examples | Where you manage it |
|------|----------|---------------------|
| **Cursor plugin** | Figma, Slack, Atlassian, Miro, Datadog | Settings → **Plugins**, then Tools & MCP |
| **Custom MCP** | Mobbin, NotebookLM | `~/.cursor/mcp.json` or Tools & MCP → **Add MCP** — see [02 — Install custom MCPs](02-install-custom-mcps.md) |

---

## Happy path (plugin MCP)

### 1. Install the plugin

1. Cursor → **Settings → Plugins** (or Marketplace).
2. Search the product (e.g. **Datadog**, **Figma**).
3. **Install** / **Enable**.

### 2. Configure (when the plugin asks)

Some plugins need a domain or org before they work:

| Plugin | Typical config |
|--------|----------------|
| Datadog | Domain **`mcp.datadoghq.eu`** for an EU-hosted org (not US) — check your org's actual site |
| Others | Usually just auth |

Use the plugin’s **Configure** button if you see it.

### 3. Authenticate

1. ⌘⇧P → **Cursor Settings: Tools & MCP**.
2. Find the server row (e.g. `datadog`, `figma`).
3. Toggle **On**.
4. Click **Authenticate** / **Connect** and finish the browser login with your
   **the company** account (right org / workspace).

The agent **cannot** click OAuth for you. Auth is always on you.

### 4. Reload

⌘⇧P → **Developer: Reload Window** (or fully quit Cursor and reopen).

### 5. Verify in a **new** Agent chat

Old chats often keep a stale MCP list. Open a **new** Agent conversation and
ask something only that MCP can answer (see smoke tests below).

---

## Desktop vs Cloud (most common confusion)

| Environment | MCP list lives in | What you saw in practice |
|-------------|-------------------|---------------------------|
| **Cursor Desktop** (Mac app) | Local Plugins + Tools & MCP + `~/.cursor/mcp.json` | Plugin page can show “MCP: datadog” while Agent still has **no** tools until auth + reload |
| **Cursor Cloud** | Cloud Integrations / cloud MCP Servers panel | Datadog toggle **on** — **does not sync** to Desktop |

**Rule:** If it works in Cloud but not “here” on Desktop, fix **Desktop** auth
and Tools & MCP — do not assume Cloud copied the config.

---

## Where to look when something is wrong

Check these in order:

1. **Settings → Plugins** — Is the plugin installed and enabled?
2. **Settings → Tools & MCP** — Is there a row for that server? Toggle on?
   Needs auth / error badge?
3. **Agent chat → MCP Servers menu** (tools panel) — Is it listed and green?
4. **New chat** after reload — Did tools appear for the agent?
5. **Permissions** — Do you have a company seat (Datadog, Slack workspace,
   Figma org, etc.)?

---

## Ask the agent to fix it (recommended flow)

When you’re stuck, paste a short status + ask for a checklist. The agent can
inspect whether the MCP namespace is in its tool list and guide auth/reload.

### Prompt A — “Is it connected for you?”

```
Check whether the Datadog MCP is available in this chat.
If not, tell me exactly what to click on Desktop (Plugins vs Tools & MCP)
and what to authenticate. the company uses Datadog EU.
```

Swap `Datadog` for `Figma` / `Slack` / `NotebookLM` / etc.

### Prompt B — “Installed but I can’t use it”

```
The Datadog plugin is installed (I see it under Plugins with an MCP entry),
but the agent can’t query Datadog. Walk me through Desktop-only fix steps:
Tools & MCP, domain mcp.datadoghq.eu, Authenticate, Reload Window, new Agent chat.
Don’t assume Cloud settings apply.
```

### Prompt C — “Cloud has it, Desktop doesn’t”

```
In Cursor Cloud, Datadog shows under MCP Servers and is ON.
On Desktop I don’t see it in the Agent MCP list (or tools fail).
Diagnose Desktop vs Cloud config and give me step-by-step for Desktop only.
```

### Prompt D — “Auth / permission failure”

```
Datadog MCP authenticates but queries fail (403 / permission denied / empty).
What the company permissions do I need (e.g. MCP Read), and who should I ask?
```

### Prompt E — Custom MCP (Mobbin / NotebookLM)

```
My ~/.cursor/mcp.json has mobbin and notebooklm-mcp.
Confirm those servers are visible to you. If not, tell me how to Add MCP /
reload / authenticate. For NotebookLM, run get_health and setup_auth if needed.
```

---

## Smoke tests (copy into Agent)

| MCP | Prompt |
|-----|--------|
| Atlassian | What’s assigned to me in CORE? |
| Slack | Search Slack for “checkout” in the last 7 days (public). |
| Figma | Paste a company `figma.com/design/...` URL — what’s the frame name? |
| Miro | Paste a `miro.com/app/board/...` URL — 5-bullet summary. |
| Datadog | Any active incidents? Are checkout completion monitors OK? |
| Mobbin | Search iOS screens for “checkout with Apple Pay”. |
| NotebookLM | `get_health` — am I authenticated? List my notebooks. |
| Browser | Open https://docs.google.com and tell me if I’m signed in. |

More onboarding-oriented tests: [`tests/project-briefing-prompts.md`](../../tests/project-briefing-prompts.md).

---

## Troubleshooting table

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Plugin installed, Agent has no tools | Not authenticated, or old chat | Tools & MCP → Authenticate → Reload → **new** Agent chat |
| Works in Cloud, not Desktop | Separate configs | Repeat install/auth on Desktop |
| Tools & MCP row missing | Plugin incomplete / bad cache | Uninstall plugin → reinstall → set domain → reload |
| Needs auth forever | OAuth cancelled / wrong account | Authenticate again; pick your org's account |
| 403 / empty data | No product permission | Request access (IT/admin); Datadog needs MCP Read etc. |
| Wrong Datadog site | US domain vs EU (or your org's actual site) | Configure → correct domain → reload → re-auth |
| Custom MCP silent | Bad JSON / npx missing | Validate `~/.cursor/mcp.json`; Node/npm installed for `npx` servers |
| Miro / Slack “needsAuth” | Never finished OAuth | Tools & MCP → Authenticate |

---

## After it works

- Prefer **one MCP per ask** when possible (“use Datadog…”, “use Mobbin…”) so
  the agent doesn’t wander.
- For this repo’s gated skills, keep Atlassian + Slack + Figma + Miro healthy —
  see [`documentation/setup/mcp-setup.md`](mcp-setup.md).
- Per-product use cases and examples: [`mcps/`](mcps).

---

## Related

- [02 — Install custom MCPs](02-install-custom-mcps.md)
- [How-to index](../README.md)
- [`documentation/setup/mcp-setup.md`](mcp-setup.md)

**In Design Harness (localhost):** open
[`http://localhost:3002/#/how-to`](http://localhost:3002/#/how-to)
— same Markdown, browsable in the UI.
