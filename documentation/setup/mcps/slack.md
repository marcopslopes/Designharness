---
label: Slack
hint: Search feedback threads — adds team feedback to research.
order: 2
tint: violet
---
# Slack MCP

**Type:** Cursor plugin (`plugin-slack-slack`)  
**Onboarding:** Checked only if your team uses it  
**Workspace:** your org's Slack workspace

---

## What it’s for

Search channels, read threads, and (when allowed) draft or send messages so
research and kickoff can pull **real UX feedback** without leaving Cursor.

---

## Install

1. Settings → **Plugins** → install **Slack**.
2. Tools & MCP → enable **Slack** → **Authenticate** into **the company**.
3. Reload → new Agent chat.

Verify: “Search Slack for waitlist in #signal-ux-feedback”.

---

## How to use

Prefer **search / read** for design work. Be careful with **send** — confirm
channel and draft before posting.

### Example prompts

```text
Search Slack (public + private I can access) for "checkout drop-off" in the last 30 days. Summarize themes for design.
```

```text
Read the latest thread in #signal-ux-feedback about referrals and list actionable UX issues.
```

```text
Draft (don't send) a short update to #design-team about CORE-142 status.
```

---

## Designer use cases

| Use case | Why |
|----------|-----|
| Research agent | Feedback + signal channels |
| Design kickoff | Context from product threads |
| Triage | Find who reported a UX bug |
| Status | Draft updates; human sends if unsure |

---

## Useful tools (names)

`slack_search_public`, `slack_search_public_and_private`, `slack_read_channel`,
`slack_read_thread`, `slack_send_message_draft`, `slack_send_message`, …

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| No results in private channels | Re-auth; confirm you’re in those channels |
| Can’t send | Bot scopes / permissions — use draft instead |
| Wrong workspace | Authenticate again and pick the company |

---

## Related

- [01 — Setup](../01-setup-mcp-in-cursor.md)
- [`documentation/setup/slack-routing.md`](../slack-routing.md)
