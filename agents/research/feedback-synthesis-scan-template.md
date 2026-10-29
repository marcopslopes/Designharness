# Chat feedback synthesis scan — draft page structure

Use this structure for every **feedback synthesis scan** page: one chat channel
(or thread collection), filtered by topic, signals tagged to a **product
taxonomy**, written as a **draft** only.

Dense tables. **Do not publish** without user confirmation.

---

## Output order (exact)

Deliver sections **1–7** in this order. Do not rename or skip.

---

## 1 · Header line

One line at the top:

`Source: Slack · Channel: #[channel-name] · Channel ID: [id] · Scanned by: Cursor agent · [YYYY-MM-DD] · Lookback: [e.g. 30d] · Market focus: [US / PL / … / global]`

---

## 2 · Info panel

Brief description of what this scan covers:

- Slack scope (channel ID, lookback window)
- **Topic filter** — only messages related to: [topic]; unrelated noise ignored
- Product taxonomy version (paste or link to the taxonomy block used)

---

## 3 · Executive summary

3–4 sentences only:

- Volume of on-topic signals (approximate count or range)
- Strongest cross-cutting theme
- Most severe risk or blocker (if any)
- Confidence note (e.g. thin channel, threads truncated, only public channel)

---

## 4 · Top issues — cross-product

Numbered list, **most critical first**. Each item: one sentence + optional
permalink to representative Slack message(s). Cross-product only (do not
duplicate deep product tables here).

1. …
2. …

---

## 5 · Positive signals

Bullet list. Concrete behaviours or praise, with Slack links where useful.

- …

---

## 6 · Recommendations

Table — only rows supported by the scan; do not invent ownership.

| Product | Action | Rationale | Priority |
| --- | --- | --- | --- |
| [code or name] | … | … | blocker / high / medium / low |

---

## 7 · Product breakdown

One **section per product** from the taxonomy (even if empty: show heading + “No
signals in this scan.”).

### Per-product table

| Signal (excerpt or paraphrase) | Theme | Sentiment | Market | User type | Priority |
| --- | --- | --- | --- | --- | --- |
| … | checkout_friction / payment_failure / feature_request / pricing_confusion / positive_signal | positive / negative / neutral | US / PL / ES / FR / GB / global | provider / consumer / unknown | blocker / high / medium / low |

**Theme values** — use exactly one of:

`checkout_friction` · `payment_failure` · `feature_request` ·
`pricing_confusion` · `positive_signal`

(Extend only if the prompt explicitly adds themes; otherwise map the closest.)

**Slack link column (optional):** add a final column `Link` if the table is not
too wide.

### Expandable sections

- **Markdown body:** use a **level-3 heading per product** (`### PP — …`) so
  the page is still readable without macros.
- **HTML body** (`contentFormat: "html"`): prefer one
  `<details><summary>PP — Prepayment</summary>…table…</details>` block per
  product so each block is natively collapsible (Confluence HTML bodies render these natively;
  Notion uses toggle blocks; Google Docs keeps the level-3 headings).

---

## Taxonomy block (paste into the prompt)

See `agents/research/taxonomy-example.md` for shape. Minimum per product line:

`CODE — Short name — markets — one-line scope`

---

## Guardrails

- **Strict topic filter** — if a message does not relate to the stated topic,
  exclude it; say how many messages were skipped for irrelevance if known.
- **No fabrication** — paraphrase from messages; do not invent quotes or
  metrics.
- **Draft only** — create the page as **draft**; never publish unless the user
  explicitly asks after review.
