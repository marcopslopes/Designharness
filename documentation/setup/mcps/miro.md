---
label: Miro
hint: Workshop boards from research links.
order: 4
tint: yellow
---
# Miro MCP

**Type:** Cursor plugin (`plugin-miro-miro`)  
**Onboarding:** Checked only if your team uses it  
**Docs:** [Miro MCP](https://developers.miro.com/docs/miro-mcp) · endpoint `https://mcp.miro.com/`

---

## What it’s for

Open workshop / research **Miro boards** linked from Confluence or Slack and
summarize structure, sticky themes, and decisions for design briefs.

---

## Install

1. Settings → **Plugins** → install **Miro** (or [Miro MCP for Cursor](https://miro.com/marketplace/miro-mcp-for-cursor/)).
2. Tools & MCP → enable → **Authenticate** with Miro (the company boards you can access).
3. Reload → new Agent chat.

Verify: paste a `miro.com/app/board/...` URL and ask for a 5-bullet summary.

---

## How to use

### Example prompts

```text
Using Miro MCP, summarize this board in 5 bullets and list open questions:
https://miro.com/app/board/...
```

```text
Extract themes from the sticky notes about provider onboarding on this Miro board.
```

---

## Designer use cases

| Use case | Why |
|----------|-----|
| Research agent | Boards linked as sources |
| Kickoff | Workshop → brief |
| Alignment | Capture decisions without reopening Miro |

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `needsAuth` | Tools & MCP → Authenticate Miro |
| Can’t open board | Request board access; re-auth |
| Empty summary | Confirm board URL and that you’re a board member |

If the agent only shows `mcp_auth` and nothing else, auth isn’t finished —
complete OAuth, reload, new chat.

---

## Related

- [01 — Setup](../01-setup-mcp-in-cursor.md)
- [`documentation/setup/mcp-setup.md`](../mcp-setup.md)
