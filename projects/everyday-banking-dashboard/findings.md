# Findings — everyday-banking-dashboard

Append-only. Each entry is dated and names the skill that produced it. Never delete or rewrite a prior entry.

<!--
### YYYY-MM-DD — <skill-name>

<What was found/produced/built. Link to files/lines if code was written.>
-->

### 2026-11-01 — ui-agent

Built the iOS home at `screens/BankingHomePage.tsx`: Available balance, Add money / Send / Card, five transactions grouped by day. A row opens a detail sheet. See all and the other tabs have no destination yet.

Storyboard: `screens/BankingHome.storyboard.ts`.

Snapshot: `artifacts/snapshots/banking-home.html` and `artifacts/snapshots/banking-home.png`.

Checked in the browser: the home renders, a Tesco row opens the sheet (amount, account, day), and Done closes it. Audit deferred (on-share).

### 2026-11-01 — ui-agent

Built the send list at `screens/SendListPage.tsx`. Search, Add a recipient (form sheet), then saved payees with the account on the row. Send on the home opens it. Back returns home. Tapping a payee does not open an amount.

Storyboard: `screens/SendList.storyboard.ts`.

Snapshot: `artifacts/snapshots/send-list.html` and `artifacts/snapshots/send-list.png`.

Checked in the browser: Send opens the list, "alex" keeps Alexandra Pemberton-Clarke, a name with no match shows the empty state, Done stays off until name and account are filled, Leila Haddad lands at the top, a payee row stays on this screen, and Home goes back. Audit deferred (on-share).

### 2026-11-01 — case-study

Wrote `case-study.md` (DRAFT). Chapters 1, 2, 4, 5, 6, 7, 8. Skipped chapter 3: findings.md has no quotes, numbers, or tables. No journal entries. Send list is chapter 6, opened from the home.

### 2026-11-01 — ux-pattern → content

Design critique of the banking home and the send list it opens. Artifact: Design Harness prototype. Framing: lab.

**First look.** The home does the job that was picked: the balance is first, then recent activity, and Send opens saved payees. The structure breaks on controls that look finished and do nothing: See all, Add money, Card, and the other tabs. On the send list, each person has a forward chevron and the tap does not leave the list, which the decision allowed, and the chevron still promises a next step.

**Findings**

- Major. [UX Heuristic: Consistency and standards] [Layer: interaction] See all, Add money, Card, and the Payments, Cards, and Account tabs do not go anywhere. Only Send and a transaction row do. Source: ux-pattern.
- Major. [House: COMPANY-PATTERNS.md — Navigation conventions, forward chevron] [Layer: interaction] Saved payee rows use a chevron. Tapping one stays on the list, by decision. Source: ux-pattern.
- Minor. [House: COMPANY-PATTERNS.md — Modal and sheet patterns] [Layer: surface] The transaction sheet closes with Done and the dimmed area. It does not set role="dialog", aria-modal, or a labelled title on the overlay. Source: ux-pattern.
- Minor. [House: content style guide — specific] [Layer: surface] "See all" names a list that is not built. Source: content.
- Minor. [House: content style guide — plain words] [Layer: surface] The empty search says "No saved payee". Source: content.
- Note. [House: content style guide — plain words] [Layer: surface] A card payment is "Posted" and a salary is "Money in". Source: content.
- Note. [House: COMPANY-PATTERNS.md — Responsive device frames] [Layer: unknown] The example pack asks for a desktop frame. This brief is iOS only. Source: ux-pattern.

Non-blocking. Logged in debt.md as DD-001 through DD-007.

### 2026-11-01 — review-report

HTML report, flow template: `artifacts/reports/everyday-banking-dashboard.html`. Opens on the project page under Reviews.

### 2026-11-01 — ui-agent (login, moved from `banking-login`)

Built the iOS login at `screens/LoginPage.tsx`. Greeting "Good evening, Nora Hale", password field, Forgot, Log in. No tab bar. An empty password shows "Enter your password." A filled password stays on this screen. Forgot has no destination.

Storyboard: `screens/Login.storyboard.ts`. Snapshot: `artifacts/snapshots/login.html` and `artifacts/snapshots/login.png`.

Checked in the browser: empty Log in marks the field invalid, a password keeps the screen, Forgot stays on the screen. Audit deferred (on-share). Not part of the 2026-11-01 critique above.

### 2026-11-01 — case-study (login, moved from `banking-login`)

The login's own case study and article were written while it was a separate project. Kept as `artifacts/login-case-study-draft.md` and `artifacts/login-article-draft.md` (DRAFT). This project's `case-study.md` doesn't include the login yet.
