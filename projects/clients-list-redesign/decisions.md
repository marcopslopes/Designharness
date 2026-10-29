- 2026-10-10 — Desktop screens wrapped in new shared `DesktopShell` (browser window + pro-app web nav from `buildProAppPhoneTabs`). Designer overrode the "no DesktopShell" rule; `desktop-web-patterns.md` and `mobile-shell/SKILL.md` updated. Build-notes intros removed from both desktop screens.
- 2026-10-10 — Reframed the example from a booking-app client list to a bank relationship manager's client book (designer asked to move it off the booking-app framing). Segments VIP/New/Inactive → Premium/New/Dormant (6+ months no contact); rows show products held + last contact; own nav in `screens/bank-app-nav.tsx` (Home, Clients, Pipeline, Inbox) instead of the shared pro-app tabs; dormant tip extracted to `ClientsListDormantTip`. Brief, about, project context and flow rewritten; private org-pack terms redacted from findings.md.
- 2026-10-10 — Added a shared Storyboard to Design Harness. Projects opt in with `screens/**/<Name>.storyboard.ts`. First one: the Clients list phone screen, 7 steps, every step marked as an assumption. Existing checkout / account-settings citation pills left as they are.

## 2026-10-10 — Storyboard offer in the harness

Designer chose that the harness offers a storyboard after a new phone screen is built (ui-agent Step 6.5). Rejected: offer only before sharing; keep ask-only.
