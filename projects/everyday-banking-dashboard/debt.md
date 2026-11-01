# Design debt register — everyday-banking-dashboard

Per-project advisories deferred from `audit` or design-critique (`ux-pattern` ± `content`). **Not** repo-wide issues — those live in `KNOWN-ISSUES.md`.

_Format: `harness/references/project-debt-register.md`_

_Items: 7 | Open: 7 | Oldest: 2026-11-01_

| ID | Date | Source | Severity | Finding | Who's affected | Suggested fix | Status |
|----|------|--------|----------|---------|----------------|---------------|--------|
| DD-001 | 2026-11-01 | ux-pattern | Major | [UX Heuristic: Consistency and standards] See all, Add money, Card, and the Payments, Cards, and Account tabs look like navigation and do nothing. | Everyday banking customer checking the home | Hide or disable a control until its screen exists. Keep Send and the transaction rows, which work. | Open |
| DD-002 | 2026-11-01 | ux-pattern | Major | [House: COMPANY-PATTERNS.md — Navigation conventions, forward chevron] Saved payee rows show a forward chevron. A tap stays on the list. | Customer choosing someone they have already paid | Drop the chevron until an amount screen exists. | Open |
| DD-003 | 2026-11-01 | ux-pattern | Minor | [House: COMPANY-PATTERNS.md — Modal and sheet patterns] The transaction sheet has no dialog role, aria-modal, or labelled title on the overlay. | Customer opening a transaction | Put role="dialog", aria-modal, and aria-labelledby on the sheet. | Open |
| DD-004 | 2026-11-01 | content | Minor | [House: content style guide — specific] "See all" names a list that is not built. | Everyday banking customer looking for older activity | Remove the label until the activity list exists. | Open |
| DD-005 | 2026-11-01 | content | Minor | [House: content style guide — plain words] Empty search says "No saved payee". | Customer searching the send list | "No one with that name." | Open |
| DD-006 | 2026-11-01 | content | Note | [House: content style guide — plain words] A card payment is "Posted" and a salary is "Money in". | Customer reading a transaction sheet | Use one pair of words, such as "Money out" and "Money in". | Open |
| DD-007 | 2026-11-01 | ux-pattern | Note | [House: COMPANY-PATTERNS.md — Responsive device frames] The example pack asks for a desktop frame. The brief is iOS only. | Someone reviewing the concept on a desk | Add a desktop frame only if this concept needs one. | Open |
