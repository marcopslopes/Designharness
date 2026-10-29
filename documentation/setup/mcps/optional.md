---
label: Optional MCPs
hint: Datadog, Mobbin, NotebookLM, Browser — not required for onboarding.
order: 5
tint: slate
---
# Optional MCPs

These are **not** part of designer onboarding. Skills that can use them
still work without them (usually via web search or another path). Connect
one only when you already need it.

The core work tools have their own pages: [Figma](figma.md),
[Slack](slack.md), [Atlassian](atlassian.md), [Miro](miro.md).
General install: [01 — Setup](../01-setup-mcp-in-cursor.md) ·
[02 — Custom MCPs](../02-install-custom-mcps.md).

| MCP | Type | When it helps |
|-----|------|----------------|
| [Datadog](#datadog) | Cursor plugin | Prod health, monitors, funnels |
| [Mobbin](#mobbin) | Custom remote | Competitor screens / flows |
| [NotebookLM](#notebooklm) | Custom via `npx` | Research grounded on your notebooks |
| [Browser](#browser) | Built into Cursor | Google Docs, localhost smoke checks |

---

## Datadog

**Plugin:** `plugin-datadog-datadog` · [Marketplace](https://cursor.com/marketplace/mcp/datadog) · [Docs](https://docs.datadoghq.com/mcp_server/)

Live product signals from chat (monitors, incidents, dashboards). Complements
Figma — it does not replace design tools.

1. Settings → **Plugins** → install **Datadog**.
2. Configure the Datadog domain for your org (e.g. `mcp.datadoghq.eu` for EU —
   confirm before assuming).
3. Tools & MCP → enable → **Authenticate** → Reload → new Agent chat.
4. Optional: `/ddsetup` once; later `/ddconfig`, `/ddtoolsets`.

**Desktop ≠ Cloud.** Enabling Datadog under Cloud does not turn it on in the
Mac app — repeat install + auth on Desktop.

You need Datadog access (and typically **MCP Read**) for the products you
query. Ask IT if auth works but queries return 403 / empty.

```text
Any active Datadog incidents right now?
Are checkout start→complete monitors OK on web, iOS, and Android?
```

---

## Mobbin

**Custom remote** (`user-mobbin`) · endpoint `https://api.mobbin.com/mcp` ·
install via [02 — Custom MCPs](../02-install-custom-mcps.md)

Shipped-product UI: screens, flows, web sections with screenshots. Used by
`competitor-scan` and `benchmark` **only if** you already have it connected —
never required; without it those skills use web search.

```json
{
  "mcpServers": {
    "mobbin": { "url": "https://api.mobbin.com/mcp" }
  }
}
```

Save → Reload → enable **mobbin** → Authenticate (Pro may be required). Always
name a **platform** (`ios` or `web`) and a concrete journey.

```text
Using Mobbin, search iOS screens for "referral invite friends with share sheet".
Search Mobbin iOS flows for "checkout with promo code and Apple Pay". Limit 5.
```

| Tool | Use |
|------|-----|
| `search_screens` | Single screens |
| `search_flows` | Multi-step journeys |
| `search_sections` | Marketing / web sections |

---

## NotebookLM

**Custom local** (`user-notebooklm-mcp`) via `npx` · package `notebooklm-mcp@latest` ·
install via [02 — Custom MCPs](../02-install-custom-mcps.md)

Chat with Google NotebookLM notebooks from Cursor — interview notes, surveys,
PRD PDFs, research packs. Needs Node/`npx` and a Google account with NotebookLM.

```json
{
  "mcpServers": {
    "notebooklm-mcp": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@latest"]
    }
  }
}
```

First run: ask the agent to `get_health`, then `setup_auth` if needed (browser
login; cookies persist). Register a notebook share URL with `add_notebook`,
then `ask_question` — reuse `session_id` for follow-ups.

```text
add_notebook with this NotebookLM URL: https://notebooklm.google.com/notebook/...
Then ask: What are the top 5 user pain points?
```

---

## Browser

**Built-in** (`cursor-ide-browser`) — no `mcp.json` entry. Enable under Tools &
MCP if the tools are missing, then Reload.

Drive a real browser tab: open URLs, snapshot, click, type, screenshot. Use
when there is no product MCP (e.g. Google Docs) or you need to **see** a live
page / Design Harness preview. Prefer Figma / Atlassian / Slack when they
exist. Complete SSO yourself when the tab asks.

```text
Open this Google Doc and quote the first H1: https://docs.google.com/document/d/...
Navigate to http://localhost:3002 and screenshot the first viewport of Design Harness.
```

| Issue | Fix |
|-------|-----|
| Can’t see page content | Sign in; snapshot + screenshot |
| Localhost fails | Confirm `npm run dev` is running |

---

## Related

- [01 — Setup an MCP in Cursor](../01-setup-mcp-in-cursor.md)
- [02 — Install custom MCPs](../02-install-custom-mcps.md)
- [`documentation/setup/mcp-setup.md`](../mcp-setup.md) (required four + Mobbin note)
